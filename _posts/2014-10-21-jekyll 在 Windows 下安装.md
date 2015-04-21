---
layout: post
title:  "jekyll 在 Windows 下安装"
author:	任跃兵
date:   2015/4/21 10:23:23 
categories: jekyll
---


###1. 安装ruby

Ruby <http://rubyinstaller.org/downloads/>  
选择 Add Ruby executables to your PATH


###2. 安装rubydevkit
<http://rubyinstaller.org/downloads/>  
选择对应上面安装的ruby版本的rubydevkit,解压<假设路径为 C:\RubyDevKit>
 
{% highlight Bash shell scripts %}
cd C:\RubyDevKit
ruby dk.rb init
ruby dk.rb install -f
{% endhighlight %}

###3. 安装python
python得安装2.X版本的，安装3.X可能不行。  
<https://www.python.org/download/>  
选择 Add python.exe to Path

###4*. 安装pip
在命令行测试一下，如果已经安装过了的话就不需要本步骤了。Python2.7.9安装的时候已经自动的带上个了这个。  
get-pip.py  
<https://pip.pypa.io/en/latest/installing.html>  
{% highlight python %}
python get-pip.py
{% endhighlight %}

###5. 安装Pygments
{% highlight python %}
python -m pip install Pygments
{% endhighlight %}

###6. 安装jekyll

{% highlight ruby %}
#把源修改成为淘宝的，原因想必你懂的。  
> gem sources --remove https://rubygems.org/
> gem sources -a https://ruby.taobao.org/
> gem sources -l
*** CURRENT SOURCES ***

https://ruby.taobao.org
# 请确保只有 ruby.taobao.org

gem install jekyll -V

# 安装 wdm
gem install wdm -V

{% endhighlight %}



参考资源  
Markdown 语法说明 (简体中文版)<http://wowubuntu.com/markdown>  
<http://ruby.taobao.org/>  
<http://jekyllrb.com/>  
<http://jekyllcn.com/>  
Run Jekyll on Windows <http://jekyll-windows.juthilo.com/>

在Octopress中为markdown的超链接加上target="_blank" <http://www.blogjava.net/lishunli/archive/2013/01/20/394478.html>
