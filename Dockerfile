FROM jekyll/jekyll
WORKDIR /app
EXPOSE 80
COPY . /app/
ENTRYPOINT ["jekyll","server","-s","/app/"]