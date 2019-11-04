# rpp

Razvoj Programskih Proizvoda - Faculty of Technical Sciences

Web application with Spring Boot as the backend and Angular as the frontend.

The backend is a simple API which provides access to a Postgre database, and it also serves a single Angular page which contains the rest of the application.
There are is no security implemented, as per the specifications.

## Installation

Database backup file in /backup includes create schema 'rpp' assuming default postgres user. 
Set application.properties accordingly.

## Deployment

Running maven install downloads node and npm in /frontend and builds the angular2 app to ../src/main/webapp as specified in angular-cli.json. Run it as a spring boot app.
