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

## Set up Database
run `npm run migrate-up` to migrate the initial database up. There will be a admin account.
Account informations are 
```
firstname & lastname : Admin
Password is: admin.
```
## Environment
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.
```
SERVER_PORT=3000
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin123
POSTGRES_DB=new_database01
PGADMIN_DEFAULT_EMAIL=admin@admin.de
PGADMIN_DEFAULT_PASSWORD=admin
POSTGRES_URL=localhost
SECRET_PW=secret12
SALT_ROUNDS=10
```

## Start App
run `npm start` to start the application after you haved setted up your DB and connected it to your socket.

## Close Database
if you want to reset your database you just need to run `npm run migrate-down`