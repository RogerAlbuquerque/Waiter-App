# Fullstack study project
Project of an app to help in restaurants, divided into a mobile app that stays with the waiter in which he goes to each table and takes the orders of each customer and sends the order through the backend to the frontend app that is in the kitchen. There they look at the orders and which tables each order is for and it just changes the status if the order is being prepared, if it is on hold, or it has been completed.

### Link to the web application:
`https://waiter-app-virid.vercel.app/`

# Technologies used
* Typescript was used on everything, front, back and mobile.
* EsLint also to make the whole code more standardized and organized.

### BACKEND:
* Express
* The database was mongo only with docker
* Mongoose to do the interactions between back and mongo
* Multer was also used to be able to receive images in requests for the backend


### FRONTEND:
* React
* Axios to make requests to the backend
* Styled-components to make the styles.
* toastify to create those little text boxes when you finish something

### MOBILE:
* React-Native
* Expo to facilitate some implementations
* Axios was also used here
* Styled-Component
* toastify


# How to start the project on your machine:
1. First go to each project folder, open the terminal there and issue the `yarn` command to install all dependencies or you can use `npm install`.

2. After everything is installed, Mongo must be installed on the machine, or running in a docker container on port "27017" (This port can be changed in the "index" file inside the API folder).

3. Now in the frontend (the "fe" folder) you need to go inside the "utils" folder and change the ip inside it to the local ip of your machine. This is the base ip that axios is using to make requests.

4. Inside the mobile project folder, do the same thing in the "utils" folder, changing the ip to your machine's local ip.

5. And finally, you must have Expo Go on your cell phone to read the QRcode that will be generated when running the mobile on your PC.

After that, your project is ready to be started, now you just need to start all of them, backend, frontend, mobile and the mongo database (if you run it in a docker container as well).
To start them are the following commands:

~~~

/* Backend */
yarn start

/* Front End */
yarn dev

/* Mobile */
yarn start

~~~


# Installing mongo in a docker container on your machine
1. First you need to have docker installed on your machine, I installed it on my linux through this site `https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on- debian-9-en`

2. With docker installed, installing mongo is super simple, just type `sudo docker pull mongo` in the terminal. And mongo is installed on your machine.

3. Now we need to make it run, which is even simpler `sudo docker start mongo`. by default it will already be running on port "27017" containerized.

Now yes, it has front, back, mobile, everything running, just enjoy the APP.
