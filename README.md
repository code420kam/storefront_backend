# Udacity: Storefront Backend

This is a backend API for an online shop. It exposes a RESTful-API that can be used by frontend dev.

The database schema and API route informations can be found in the [REQUIREMENTS.md](REQUIREMENTS.md).

## Get started

You can fork this repo and run the following commands at your root directory to install all packages.

`yarn` or `npm install`

### Packages

#### express
`npm i express`
`npm i --save-dev @types/express`

#### typescript
`npm i typescript`

#### db-migrate
`npm i db-migrate`

#### bcrypt
`npm i bcrypt`
`npm i --save @types/bcrypt`

#### jsonwebtoken
`npm i jsonwebtoken`
`npm i --save-dev @types/jsonwebtoken`

#### jest
`npm i jest`
`npm i --save-dev @types/jest`

#### dotenv
`npm i dotenv`

#### postgres
`npm i postgres`

#### pg
`npm i pg`
`npm i --save-dev @types/pg`

#### nodemon
`npm i nodemon`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`

#### jwt-decode
`npm i jwt-decode`

#### babel
`npm i --save-dev babel`
`npm i @types/babel`

#### Cross-Env
`npm i --save-dev cross-env`

## Environment Variables
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.
```
SERVER_PORT=3000
POSTGRES_PORT=5432
POSTGRES_USER=test_user
POSTGRES_PASSWORD=user123
POSTGRES_DB=storefront_db
POSTGRES_TEST_DB=storefront_test_db
PGADMIN_DEFAULT_EMAIL=admin@admin.de
PGADMIN_DEFAULT_PASSWORD=admin
POSTGRES_URL=localhost
SECRET_PW=secret12
SALT_ROUNDS=10
ENV=dev
```

## Start App
run `npm start` to start the application after you haved setted up your DB and connected it to your socket.

## Setup database
- Connect to default postgres database as the server's root user `psql -U postgres`
- Run following command, to create a user on psql
`CREATE USER test_user WITH PASSWORD 'user123';`
- In psql run following command to create database
`CREATE DATABASE storefront_db;`
`CREATE DATABASE storefront_test_db`
- Connect to the database and grant all privileges
    ** grant for dev database
`\c storefront_db`
`GRANT ALL PRIVILEGES ON DATABASE storefront_db TO test_user;`
    ** grant for test database
`\c storefront_test_db`
`GRANT ALL PRIVILEGES ON DATABASE storefront_test_db TO test_user;`

##### run `npm run migrate-up` to migrate the initial database up. There will be a admin account for the login: 
Account informations are 
```
firstname & lastname : Admin
Password is: admin
```

## Close Database
if you want to reset your database you just need to run `npm run migrate-down`