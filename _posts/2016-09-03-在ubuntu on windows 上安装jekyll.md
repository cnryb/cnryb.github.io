---
layout: post
title:  "在ubuntu on windows 上安装jekyll"
author:	任跃兵
date:   2016/9/23 10:08:27         
categories: jekyll
---
# 已知问题 #
安装ruby之后，重新启动ubuntu on windows，输入ruby命令，提示找不到。

发现的解决办法 执行下面命令
> source /home/xxxx/.rvm/scripts/rvm

把xxxx换成自己的用户名


----------



为什么热衷于折腾jekyll呢，因为他们网站下面有句话  [GitHub Pages](https://pages.github.com/) are powered by Jekyll  
而本站就是放在[GitHub Pages](https://pages.github.com/)，戳开就是教程。 

### 环境
使用Ubuntu On Windwos,[戳这里了解详细信息](https://github.com/Microsoft/BashOnWindows)   
[这里讲述怎么打开ubuntuOnWindows](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide)   
在使用过程中，感觉这货就像是windows上的一个软件，非常方便。  
假如说你把这货玩儿坏了，可以使用命令 

	lxrun /uninstall /full  

进行卸载  
然后使用命令  

	lxrun /install 

进行安装。  
更多命令参见<https://msdn.microsoft.com/en-us/commandline/wsl/reference>

### 安装方法
本来想着在ubuntu上安装ruby，有啥好难的，使用 sudo apt-get install ruby不能就安装好了？
我开始也是这么想的……   
如果你看到了这篇文章，没准儿你碰到了跟我一样的问题。  
撰写本文时，通过上面的命令，只能安装1.9.3这个版本的，but最新版本的ruby已经2.3了，jekyll也已经嫌弃这个版本了……   
然后开始各种百度、谷歌查找怎么解决，费老劲了。忍不住在吐槽一项百度，垃圾呀……怪不得费尽心机把谷歌弄出去，不然早倒闭了。广告也就忍了，检索出来基本没啥有用的东西。   

#### 安装ruby
嗯~~在开搞之前，一定要先把ubuntu的源给修改成国内的源，不然会是非常漫长的过程，具体步骤google以下大把的都是   

尝试了两种解决方案  
1. 使用  <https://launchpad.net/~brightbox/+archive/ubuntu/ruby-ng>这里给出的方案，能够安装，但在使用gem安装的程序过程中，出现找不到命令的问题，应该时哪个地方配置除了问题了，对linux了解不多，没有多费心寻找解决方案。不过看样子应该时可行方案之一。  
1. 使用[rvm](https://rvm.io/rvm/install)安装，[Ruby enVironment (Version) Manager (RVM)](https://rvm.io/rvm/about)07年出现的东西，用起来很省心，中间需要两次输入密码进行授权。[戳这里有安装教程](https://rvm.io/rvm/install) 我用的这个。

ruby安装完成之后，需要安装ruby-dev，执行命令 rvm install ruby-dev就能安装好了

#### 安装jekyll 
<http://jekyllrb.com/>  
直接照着上面的安装就好了，新版本的貌似要安装bundler，不知道干啥用的。
只使用命令 jekyll server --force 看起来一样正常 。
这里最好把gem的源设置成国内的，不然可能会碰到伟大的长城。
我用的是这个 http://mirrors.aliyun.com/rubygems/   
下面是具体设置步骤

> gem sources --remove https://rubygems.org/  
> <del>gem sources -a https://ruby.taobao.org/ 据说淘宝的已经停止维护了，ssl证书貌似除了问题</del>  
> gem sources --add http://mirrors.aliyun.com/rubygems/  
> gem sources -l

### 异常处理

bundle install时如果碰到以下错误 

	Error details

    ArgumentError: parent directory is world writable but not sticky
      /home/ubuntu/.rvm/rubies/ruby-2.3.0-dev/lib/ruby/2.3.0/tmpdir.rb:93:in `ensure in mktmpdir'
      /home/ubuntu/.rvm/rubies/ruby-2.3.0-dev/lib/ruby/2.3.0/tmpdir.rb:95:in `mktmpdir'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/vendor/compact_index_client/lib/compact_index_client/updater.rb:29:in `update'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/vendor/compact_index_client/lib/compact_index_client.rb:64:in `update'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/vendor/compact_index_client/lib/compact_index_client.rb:55:in `update_and_parse_checksum
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/fetcher/compact_index.rb:65:in `available?'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/fetcher/compact_index.rb:15:in `call'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/fetcher/compact_index.rb:15:in `block in compact_index_request'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/fetcher.rb:154:in `use_api'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/source/rubygems.rb:331:in `block in api_fetchers'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/source/rubygems.rb:331:in `select'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/source/rubygems.rb:331:in `api_fetchers'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/source/rubygems.rb:336:in `block in remote_specs'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/index.rb:10:in `build'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/source/rubygems.rb:335:in `remote_specs'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/source/rubygems.rb:82:in `specs'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/definition.rb:211:in `block (2 levels) in index'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/definition.rb:209:in `each'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/definition.rb:209:in `block in index'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/index.rb:10:in `build'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/definition.rb:206:in `index'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/definition.rb:200:in `resolve'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/definition.rb:140:in `specs'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/definition.rb:129:in `resolve_remotely!'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/installer.rb:195:in `resolve_if_need'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/installer.rb:70:in `run'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/installer.rb:22:in `install'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/cli/install.rb:102:in `run'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/cli.rb:175:in `install'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/vendor/thor/lib/thor/command.rb:27:in `run'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/vendor/thor/lib/thor/invocation.rb:126:in `invoke_command'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/vendor/thor/lib/thor.rb:359:in `dispatch'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/vendor/thor/lib/thor/base.rb:440:in `start'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/cli.rb:11:in `start'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/exe/bundle:27:in `block in <top (required)>'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/lib/bundler/friendly_errors.rb:98:in `with_friendly_errors'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/gems/bundler-1.12.5/exe/bundle:19:in `<top (required)>'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/bin/bundle:23:in `load'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/bin/bundle:23:in `<main>'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/bin/ruby_executable_hooks:15:in `eval'
      /home/ubuntu/.rvm/gems/ruby-2.3.0-dev/bin/ruby_executable_hooks:15:in `<main>'
    
    Environment
    
      Bundler   1.12.5
      Rubygems  2.5.1
      Ruby  2.3.0p0 (2015-12-25 revision 53290) [x86_64-linux]
      GEM_HOME  /home/ubuntu/.rvm/gems/ruby-2.3.0-dev
      GEM_PATH  /home/ubuntu/.rvm/gems/ruby-2.3.0-dev:/home/ubuntu/.rvm/gems/ruby-2.3.0-dev@global
      RVM   1.27.0 (latest)
      Git   1.9.1
      rubygems-bundler (1.4.4)

尝试使用 find ~/.bundle/cache -type d -exec chmod 0755 {} +，参考 <https://github.com/bundler/bundler/issues/4599>


----------

jekyll server时如果你遇到如下错误 
>jekyll 3.2.1 | Error:  Invalid argument - Failed to watch ".sass-cache/5273553f1fac615ec884d08d8e7307b8700e1583": the given event mask contains no legal events; or fd is not an inotify file descriptor.

尝试使用 jekyll server --force ,参考 <https://github.com/jekyll/jekyll/issues/5233> 



###  参考  
1. <https://github.com/Microsoft/BashOnWindows>    
1. <https://rvm.io/rvm/install>       
1. <https://msdn.microsoft.com/en-us/commandline/wsl/install_guide>  
1. <https://msdn.microsoft.com/en-us/commandline/wsl/reference>  