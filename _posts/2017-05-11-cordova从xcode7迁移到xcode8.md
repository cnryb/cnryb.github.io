---
layout: post
title:  "cordova从xcode7迁移到xcode8"
author:	任跃兵
date:   2017/05/11         
categories: cordova

---


## 环境以开发流程

当前项目使用的cordova环境
cordova 6.1.1
cordova-ios 3.9.2（vs15自动装的不知道在哪能改，所以考虑升级到vs17，能够手动指定）
cordova-android 5.1.1

当前开发环境 windows 10 + vs15
编译环境 mac + xcode 7.3.1 + remotebuild
在windows上发出编译指令，vs帮忙打包发送数据到mac，remotebuild接受到数据，使用xcode打包完成之后，vs把打好的包下载回来并解压好，如果需要再帮忙给安装到设备上（vs安装过程会先删除设备上的app然后再安装，这个过程会上设备中的app数据也被删掉，所以我一般不用。我使用itools手动覆盖安装）

## 起因

之前插件中有swift写的，当时只能在xcode7上进行开发测试，所以只能选用低版本的swift。开发完成之后用归档的方式进行打包，安装到设备上会出现闪退的问题，由于时间问题，插件项目搁置。
近期又需要开发ios插件，对objective-c实在无爱，所以再次预选了swift。然后就开始测试swift插件在xcode8上能否成功通过。

## windows环境准备

vs 17不多说，没啥曲折的。
jdk要求8或更高，64位的也能用了
在config.xml中可以修改cordova-ios的版本，我选择的是次新版本4.3.1（测试时最新版本是4.4.0）。cordova版本6.3.1未作修改。
然后配置build.json 。这个是重点，是能在xcode8上自动编译成功的关键。主要是 developmentTeam 参照下面地址
<http://cordova.apache.org/docs/en/7.x/guide/platforms/ios/index.html#signing-an-app>

我们的项目使用的sass，如果报错说找不到某个版本的 binding.node ，来这里找 <https://github.com/sass/node-sass/releases>

## mac环境准备

删除已有的xcode7.3.1，在<https://developer.apple.com/download/more/>（需要登录）找到xcode 8.3.2（当前最新，要求系统在10.12以上）并下载，我直接放到桌面双击进行安装。
升级remotebuild到最新版本。

像我没有使把xcode安装到默认位置的需要执行下面命令，不然remotebuild找不到xcode
sudo xcode-select --switch /…/Xcode.app/Contents/Developer

下面的问题忘记错误详情是啥了，碰到问题后要仔细查看错误日志。
拷贝PackagesApplication到/…/Xcode.app/Coneten/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin
并加执行权限
chmod +x PackagesApplication 

## vs cordova项目升级

vs15的cordova项目使用vs17（我的版本15.2 26430.4）打开就会提示要不要升级过来，点击是就升上来了。

## cordova-simulate问题

vs15用的是ripple，但这个项目已经停止维护了。cordova-simulate是微软开发的替代版本，功能大致相同，都是在浏览器中模拟设备，方便开发调试。
这里还有几个已知的问题关于 cordova-simulate 的问题。
1、当动态添加header标签时，会有异常，并阻断js执行。已经提了issue <https://github.com/Microsoft/cordova-simulate/issues/237>。 可用div来替换。
2、模拟器进行屏幕转向。这个应该算是缺失的功能吧，可用 chrome 的 device toolbar 来替代。

## other

把插件用的swift语法都改成3.0版本的，用归档的方式打包没有闪退，功能待进一步测试。
在改语法的过程中编译的错误，拿着详情google，不是百度，google，能解决大部分问题。

## 附件

[PackagesApplication](http://files.cnblogs.com/files/cnryb/PackageApplication.zip)



