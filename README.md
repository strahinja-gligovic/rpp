# rpp

Razvoj Programskih Proizvoda

## Installation

Database backup file in /backup includes create schema 'rpp' assuming default postgres user. 
Set application.properties accordingly.

## Deployment

Running maven install downloads node and npm in /frontend and builds the angular2 app to ../src/main/webapp as specified in angular-cli.json. Run it as a spring boot app.
