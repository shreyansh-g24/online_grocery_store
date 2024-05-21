# README

1. Install the requried version of ruby through rbenv, yarn and node. Install postgresql.

2. Setup the application
```bash
yarn install --check-files
bundle install
bundle exec rake db:create
bundle exec rake db:migrate
```

3. Run server.
```bash
foreman start -f Procfile.dev
```

4. Visit at localhost:3000.

5. Run tests.
```bash
bundle exec rails test
```
