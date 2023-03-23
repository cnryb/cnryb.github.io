FROM ruby

RUN gem install bundler jekyll jekyll-paginate 

WORKDIR /app
EXPOSE 4000
COPY . /app/
# ENTRYPOINT ["jekyll","server","-s","/app/"]
CMD ["jekyll","server","-s","/app/", "-H", "0.0.0.0"]