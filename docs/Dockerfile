FROM ruby:2.7-rc

EXPOSE 4000

# throw errors if Gemfile has been modified since Gemfile.lock
# RUN bundle config --global frozen 1

WORKDIR /app
COPY . /app

COPY Gemfile ./
RUN bundle install

CMD jekyll serve --host 0.0.0.0 --baseurl /