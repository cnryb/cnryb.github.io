---
layout: post
title:  "jekyll 在 Windows 下安装"
author:	任跃兵
date:   2014/10/21 17:00:54 
categories: jekyll
---
#jekyll 在 Windows 下安装

###1. 安装ruby

  Ruby <http://rubyinstaller.org/downloads/>  
 Add Ruby executables to your PATH


###2. 安装rubydevkit
http://rubyinstaller.org/downloads/

###3. 安装python
python得安装2.X版本的，安装3.X可能不行。  
https://www.python.org/download/

###4. 安装pip
get-pip.py  
https://pip.pypa.io/en/latest/installing.html  
{% highlight python %}
python get-pip.py
{% endhighlight %}

###5. 安装Pygments
{% highlight python %}
python -m pip install Pygments
{% endhighlight %}

###6. 安装jekyll
{% highlight javascript %}
$(document).ready(function(){
	addBlankTargetForLinks();
});

//外链新窗口打开
function addBlankTargetForLinks () {
  $('a[href^="http"]').each(function(){
		$(this).attr('target', '_blank');
	});
}
{% endhighlight %}

{% highlight C# %}
        public static ICollection<JianLingTypes> GetAllJianLingTypesWithJianLing()
        {
            using (Entities entities = new Entities())
            {
                List<JianLingTypes> allJianLingTypeses = entities.JianLingTypes.ToList();
                allJianLingTypeses.ForEach(jlt =>
                {
                    jlt.JianLing = new ObservableCollection<JianLing>(jlt.JianLing);
                });
                return new ObservableCollection<JianLingTypes>(allJianLingTypeses);
            }
        }
{% endhighlight %}

参考资源  
Markdown 语法说明 (简体中文版)<http://wowubuntu.com/markdown>  
<http://ruby.taobao.org/>  
<http://jekyllrb.com/>  
<http://jekyllcn.com/>  
Run Jekyll on Windows <http://jekyll-windows.juthilo.com/>

在Octopress中为markdown的超链接加上target="_blank" <http://www.blogjava.net/lishunli/archive/2013/01/20/394478.html>


>>> from pygments.styles import STYLE_MAP
>>> STYLE_MAP.keys()

pygmentize -f html -S default > pygments.css