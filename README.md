博客地址   
<http://任跃兵.中国/>


基于Jekyll实现  

[jekyll 在 Windows 下安装](http://xn--boq33di96g.xn--fiqs8s/jekyll/jekyll-%E5%9C%A8-Windows-%E4%B8%8B%E5%AE%89%E8%A3%85/)



docker 测试方法

`docker build -t cnryb .`    
`docker run --rm -p 4000:4000 cnryb`

`--rm`：容器退出后随之将其删除。

-p 本地端口：容器端口映射

http://127.0.0.1:4000/ 就可以访问了



## 使用 docker 替代本地 jekyll
windows
```
docker run --rm -it -p 4000:4000 -v D:/code/cnryb.github.io:/srv/jekyll jekyll/jekyll  jekyll server --drafts
```

macOS
```
docker run --rm -it \
  --volume="$PWD:/srv/jekyll" \
  --publish 4000:4000 \
  jekyll/jekyll \
  jekyll serve --drafts
```
