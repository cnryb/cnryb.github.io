---
layout: post
title:  "Command failed with exit code 1解决方案"
author:	任跃兵
date:   2015/4/20 20:42:12   
categories: cordova
---

环境 visual studio community 2013  
vs2013mda_0.3.1  
自己下载安装的 nodejs 
在谷歌浏览器里面调试正常，在手机或者模拟器里面调试会有以下错误  
MDAVSCLI : error : D:\CODE\BlankCordovaApp3\BlankCordovaApp3\bld\Debug\platforms\android\cordova\build.bat: Command failed with exit code 1

下面是解决方案
原因是nodejs 版本高了，卸载换成低版本的问题就解决了  

<https://social.msdn.microsoft.com/Forums/en-US/5160b251-72a3-4823-a055-1516227d07c8/apache-cordova-blank-app-emulator-or-device-build-fail-code-1?forum=microsoftdeviceemu>  


Step 1: Try to uninstall Node.js (version 0.12)

Step 2: Install version Node.js (version 0.10.28) , http://nodejs.org/dist/v0.10.28/