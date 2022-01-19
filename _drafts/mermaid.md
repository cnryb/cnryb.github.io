

## 请求时序
``` mermaid
sequenceDiagram
    actor user
    participant cdn
    participant nginx
    participant polyfill service cluster

    user->>+cdn: get polyfill js
    cdn->>+nginx: get polfill js
    nginx->>+polyfill service cluster: get polyfill js
    polyfill service cluster->>-nginx: response polyfill js
    nginx->>-cdn: response polyfill js
    cdn->>-user: response polyfill js
```

## 请求处理流程

带箭头实线表示初次请求流程  
带箭头虚线表示初次响应流程  
不带箭头虚线表示CDN中已有缓存的情况  
带箭头的粗线表示 polyfill service cluster 服务异常

``` mermaid
%% 带箭头实线表示初次请求流程  
%% 带箭头虚线表示初次响应流程  
%% 不带箭头虚线表示CDN中已有缓存的情况  
%% 带箭头的粗线表示 polyfill service cluster 服务异常
flowchart TB
    %% 初次请求流程
    user--> |请求 polyfill js|cdn
    cdn --> |未命中缓存| nginx
    nginx --> ps[polyfill service cluster]
    ps -.-> |生成polyfill js| nginx
    nginx -.-> |添加响应头 vary| cdn
    cdn -.-> |缓存并返回| user

    %% 命中缓存了
    cdn -.- |有缓存| user

    %% PS集群崩了
    nginx ==> |状态码5xx| cdn
    cdn ==> |完整polyfill| user
```