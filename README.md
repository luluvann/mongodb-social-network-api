# Social Media API using NoSQL (MongoDB/Mongoose)

## Description 
Social Media API using Express.js and Mongoose ODM for MongoDB NoSQL database

## Walktrough video
[]()

## Table of Contents

* [Walkthrough Video](#walkthrough-video)
* [User Story](#user-story)
* [Installation](#installation)
* [Usage](#usage)
* [Main Endpoints](#main-endpoints)
* [Screenshot](#screenshot)
* [Technologies](#technologies)

## User Story
````
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
````

## Installation
1. Clone the repo 
```
git@github.com:luluvann/mongodb-social-network-api.git
```
2. Open a terminal and cd to the root of the cloned repo
3. Install all dependencies
````
npm install
````
4. Start the server with the following command
````
nodemon server.js
````

## Usage 
1. Open Insomnia or Postman and test the various endpoints at http://localhost:3001/
2. Robot 3T, a GUI for MongoDB database

## Main Endpoints
- http://localhost:3001/api/users
- http://localhost:3001/api/users/:userId/friends/:friendId
- http://localhost:3001/api/thoughts
- http://localhost:3001/api/thoughts/:thoughtId/reactions/add
- http://localhost:3001/api/thoughts/:thoughtId/reactions/delete

## Screenshot
![](./screenshot.PNG

## Technologies
- MongoDB (NoSQL)
- Mongoose (ODM library)
- Express.js
