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

[yarn berry](https://yarnpkg.com/) 有了巨大的改变。在开始之前我们先来了解一下[corepack](https://github.com/nodejs/corepack) Node.16.9.0
https://github.com/nodejs/corepack/blob/49ea6a2/DESIGN.md#envisioned-workflow 计划把 npm 从 nodejs 安装包中移除。

# pnpm
[pnpm](https://pnpm.io/) 的出现时间比 yarn 稍晚 (yarn 在 npmjs 中的创建时间是 2012-03-21，pnpm 是 2013-03-08)。


# 参考链接
- [npm](https://www.npmjs.com/)
- [npm cli](https://github.com/npm/cli/)
- [npm documentation source](https://github.com/npm/documentation)
- [SemVer](https://semver.org/lang/zh-CN/)
- [Node.js发展史](http://www.ayqy.net/blog/node-js发展史/)
- [npm 模块安装机制简介](https://www.ruanyifeng.com/blog/2016/01/npm-install.html)
- [yarn v1](https://classic.yarnpkg.com/lang/en/)
- [yarn berry](https://yarnpkg.com/)
- [corepack](https://github.com/nodejs/corepack)
- [Why should we use pnpm?](https://www.kochan.io/nodejs/why-should-we-use-pnpm.html)
- [pnpm](https://pnpm.io/)