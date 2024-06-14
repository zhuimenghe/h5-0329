FROM            devops-harbor.sany.com.cn/devops/nginx:1.11.4-alpine
EXPOSE          9547

#ADD            official-website.html /opt/rental/official-website.html
ADD             web /web
ADD             nginx.conf /etc/nginx/nginx.conf

RUN             ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
