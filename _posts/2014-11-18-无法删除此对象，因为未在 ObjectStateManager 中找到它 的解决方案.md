---
layout: post
title:  "无法删除此对象，因为未在 ObjectStateManager 中找到它 的解决方案"
author:	任跃兵
date:   2014/11/18 10:07:13  
categories: EntityFramework
---

    未处理System.InvalidOperationException
      HResult=-2146233079
      Message=无法删除此对象，因为未在 ObjectStateManager 中找到它。
      Source=System.Data.Entity
    
##解决方案




{% highlight C# %}
//首先把要删除的实体对象添加到当前的contenxt里面
list.ForEach(bc => entities.Entities.Attach(bc));
//然后在删除掉就好了
list.ForEach(bc => entities.Entities.Remove(bc));

//当然最后要SaveChanges
entities.SaveChanges();
{% endhighlight %}



DbSet<TEntity>.Attach 方法 msdn介绍   
<http://msdn.microsoft.com/zh-cn/library/gg696261(v=vs.113).aspx>