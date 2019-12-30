1、快速实现简单的访问限制
    location / {
        deny  192.168.1.100;
        allow 192.168.1.10/200;
        allow 10.110.50.16;
        deny  all;
    }
    上述配置的意思就是，首先禁止192.168.1.100访问，然后允许192.168.1.10-200 ip段内的访问（排除192.168.1.100），同时允许10.11    0.50.16这个单独ip的访问，剩下未匹配到的全部禁止访问

2、解决跨域
    #请求跨域，这里约定代理请求url path是以/apis/开头
    location ^~/apis/ {
        # 这里重写了请求，将正则匹配中的第一个()中$1的path，拼接到真正的请求后面，并用break停止后续匹配
        rewrite ^/apis/(.*)$ /$1 break;
        proxy_pass https://www.kaola.com/;
    }  


3、适配PC与移动环境 
    例：pc端站点是mysite-base.com，H5端是mysite-base-H5.com
    location / {
        # 移动、pc设备适配
        if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
            set $mobile_request '1';
        }
        if ($mobile_request = '1') {
            rewrite ^.+ http://mysite-base-H5.com;
        }
    }  

4、合并请求 