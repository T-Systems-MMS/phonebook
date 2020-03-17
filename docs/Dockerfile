FROM ruby:2.7-rc@sha256:6c9c697455e096c4bbb346ec8d48de6282cfddc5ad98a6bc8c07dbb60feb7715

EXPOSE 4000

# throw errors if Gemfile has been modified since Gemfile.lock
# RUN bundle config --global frozen 1

WORKDIR /app
COPY . /app

COPY Gemfile ./
RUN bundle install

CMD jekyll serve --host 0.0.0.0 --baseurl /