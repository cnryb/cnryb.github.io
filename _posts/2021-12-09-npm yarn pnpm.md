---
layout: post
title:  "npm yarn pnpm"
author:	任跃兵
date:   2021/12/09         
categories: front-end

---


# npm
> [npm](https://www.npmjs.com/) is the world's largest software registry.   
> npm consists of three distinct components. website，cli (Command Line Interface), and registry.

> 在本文提到的 npm 指的是 cli 。 值得一提的是，整个 npm 生态是由商业公司所掌控，目前已经被微软收购。

npm（全称 Node Package Manager，即“node包管理器”）是 Node.js 默认的、用 JavaScript 编写的软件包管理系统。在 2014 年的时候，把对自己的定义改为 [a JavaScript package manager](https://github.com/npm/cli/commit/cbb890eeacc0501ba1b8c6955f1c829c8af9f486) 。
npm 可能是大家最熟悉的 JavaScript 包管理器，用它开发的包都是用语义化版本 ([SemVer](https://semver.org/lang/zh-CN/))。使用 npm 管理的 JavaScript 包都会有一个 [package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json) 文件，这个文件用来描述包的属性，比如名字、版本、描述、入口文件、依赖的包等等。

在有 package.json 文件的目录中，执行 npm install 命令，会下载依赖的包，并且拷贝到当前目录 node_modules 中。

npm install 的大致执行过程：  
1、解析项目依赖的包。  
2、向 registry 查询包的压缩包地址。  
3、下载压缩包，放到 `~/.npm` 中。  
4、解压压缩包，放到 `./node_modules` 中。  
详细算法参考这里 [npm install algorithm](https://github.com/npm/documentation/blob/main/content/cli/v6/commands/npm-install.md#algorithm) 。

# yarn
[yarn](https://yarnpkg.com/) 只是 npm cli 的一个替代工具。它仍然使用 npm 的 registry 。主要是为了解决 npm 的一些问题，如 npm install 执行耗时长、没有离线模式、在不同时间执行得到不同的结果等等。  
我们来看一下 [yarn v1](https://classic.yarnpkg.com/lang/en/) 提供的特性。超快，有了全局缓存、使用并行操作、支持离线模式；安全，安装时校验完整性；可靠，创造了 yan.lock 文件，解决不同时间执行得到不同的结果的问题。需要特别说的是，当前的 npm (v8) 版本已经支持了 yarn.lock 文件。

[yarn berry](https://yarnpkg.com/)，也就是下一代的 yarn ， 有了巨大的改变。

在开始之前我们先来了解一下 [corepack](https://github.com/nodejs/corepack)。corepack 是 Node.js 项目和项目在开发过程中使用的包管理器之间的桥梁。更简单点理解，它是管理包管理器工具的。

corepack 的核心开发者和 yarn 的核心开发者是同一批人。他们有很大一个意图是要把 npm cli 从 node.js 的一等公民地位上拉下来，让所有的包管理器地位平等。从 Node.16.9.0 开始，corepack 已经集成到 node.js 的安装文件中了。他们还计划把 npm 从 nodejs 安装包中移除。详情参见这里 [corepack DESIGN](https://github.com/nodejs/corepack/blob/49ea6a2/DESIGN.md#envisioned-workflow)。

那么 corepack 如何使用呢？从 [node.js 的文档](https://nodejs.org/dist/latest-v16.x/docs/api/corepack.html) 中可以看到，目前的 corepack 还是实验性的功能，只支持 yarn 和 pnpm 。先执行 `corepack enable` 命令，启用 corepack 。然后在 package.json 中添加 `"packageManager": "yarn@3.1.1",`  这样就可以在项目根目录执行 yarn 了（当然，在此之前，需要卸载掉全局的 yarn ）。这时候执行的 yarn 命令就是通过 corepack 代理的。而且因为在 package.json 中指明了 packageManager，所以使用其它的包管理工具时，会直接报错（请注意，当前的 corepack 仅支持 yarn 和 pnpm ）。

记下来在把目光拉回 yarn 。你会发现上面在 packageManager 中指定的版本是 3.1.1 ，但是 npm registry 中最高版本是 2.4.3 。通过查看 [corepack 的代码](https://github.com/nodejs/corepack/blob/3b2961aaa8a8f823fcc63eada88379ca00638d7c/config.json#L80)，发现是从 https://repo.yarnpkg.com 中取的 yarn ，不知道 yarn 是不是也要对 npm registry 下手了。

我们来创建个新的项目来试一试 yarn 。就以 vite 创建的 Vue 项目为例。使用 `npm init vite@latest` 初始化一个 vite 项目之后，在 package.json 中添加 `"packageManager": "yarn@3.1.1",` 。执行 yarn 命令，安装项目的依赖。这时候，你会发现没有出现 node_modules 目录！但是执行 `yarn build` 和 `yarn dev` 依然能够正常运行。

仔细观察发现，除了多出 yarn.lock 文件之外，还多了 `.pnp.cjs` 、 `.pnp.loader.mjs` 以及 `.yarn` 目录。其中 `.pnp.cjs` 和 `.pnp.loader.mjs` 分别给 CommonJS 模块和 ES6 模块使用。里面保存的是项目依赖的包在磁盘上的位置。这里使用的是 yarn 在 2018 年 9 提出的 Plug'n'Play 。`.yarn` 目录中保存的是依赖包的 zip 文件。当项目使用依赖包时会通过 `.pnp.cjs` 或者 `.pnp.loader.mjs` 找到 `.yarn` 目录中压缩包中的位置。并不会解压 zip 文件。

这样可以实现 [Zero-Installs](https://yarnpkg.com/features/zero-installs) ，把 `.pnp.cjs` 、 `.pnp.loader.mjs` 以及 `.yarn` 目录提交到代码库，其他同学拉下代码之后，可以直接运行，无需执行安装依赖的过程。还可以确保服务器环境一定和开发环境相同。

目前看起来不太好的地方，就是只能通过 yarn 命令来执行其他命令，不然会找不到依赖的包。那怕是 `node ./index.js` ，也要改成 `yarn node ./index.js` 才能正常执行。

# pnpm
[pnpm](https://pnpm.io/) 的出现时间比 yarn 稍晚 (yarn 在 npmjs 中的创建时间是 2012-03-21，pnpm 是 2013-03-08)。它的目标也是替代 npm cli 。

它继承了 yarn v1 的各种优势，而且还创新了依赖包安装的方式。npm 和 yarn v1 都是把依赖包解压后拷贝到 node_mudules 目录下。yarn 从 npm 上的改进是，它优先使用缓存，同时处理多个依赖包。pnpm 创新性的改进是，使用链接的方式把依赖包从全局缓存链接到 node_modules 目录下，这种方式明显会比拷贝效率更高。而且是电脑上 node 项目越多效果约明显，会明显节约磁盘空间、加快安装依赖的速度。

它的劣势也来自它的优势。首先它链接的方式，在 Windows 系统下和其它系统下用的是不一样的方式，可能会出现不一致的问题。然后就是它是从全局缓存中链接过去的，一旦某次调试中，不小心修改了依赖包，那么电脑上所有的项目都会收到影响，而且极难排查问题。

# 参考链接
- [npm](https://www.npmjs.com/)
- [npm cli](https://github.com/npm/cli/)
- [npm documentation source](https://github.com/npm/documentation)
- [SemVer](https://semver.org/lang/zh-CN/)
- [Node.js 发展史](http://www.ayqy.net/blog/node-js发展史/)
- [npm 模块安装机制简介](https://www.ruanyifeng.com/blog/2016/01/npm-install.html)
- [yarn v1](https://classic.yarnpkg.com/lang/en/)
- [yarn berry](https://yarnpkg.com/)
- [corepack](https://github.com/nodejs/corepack)
- [Why should we use pnpm?](https://www.kochan.io/nodejs/why-should-we-use-pnpm.html)
- [pnpm](https://pnpm.io/)
