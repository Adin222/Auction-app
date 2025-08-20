# Industrial Internship at Atlantbh - Auction App

This application was created during my industrial internship at Atlantbh in 2024. In this file, I will explain how to run the code locally.

## Client

After cloning this repository, you will have two folders: `client` and `server`. First, navigate to the client folder:

```bash
cd client
```
Then, install the dependencies:

```bash
npm install
```
Next, create a .env file inside the client folder and add the following variables:

```env
VITE_API_BASE_URL= # your backend localhost URL (e.g., http://localhost:5000) 
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```
You will need to configure your own Firebase console if you want to test image uploads.

## Server

First, navigate to the server folder in the same way you navigated to client. Then, create a file named application.properties inside the server/src/resources directory. This file should be placed within the resources folder.

```env
spring.application.name=auctionapp

spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

client.url = --> Your client localhost url

jwt.secret = --> secret key for json web token
```
Now run command 

```bash
./mvnw clean install
```
If everything went smoothly, you can run the server with the following command:

```bash
./mvnw spring-boot:run
```
