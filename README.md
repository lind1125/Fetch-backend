# Team-2-Project
## Fetch

[**Link to Frontend Repo**](https://github.com/SFX818/Team-2-frontend)

[**Deployed API](https://fetchbackend.herokuapp.com/)

---

### Technologies used:

* **RUNTIME ENVIRONMENT**

  * Node.js

* **FRAMEWORK**

  * Express

* **DATABASE**

  * MongoDB/Mongoose

* **Auth/Security**

  * bcryptjs
  * JSON web tokens
  * CORS

---

### General Approach

The Fetch app is, in short, Tinder for dog playdates. A user will create a profile, then create a profile for each dog that they would like to find playmates for. This meant that the primary drivers for the backend architecture was the idea of a single user of the app having multiple dogs as well as the ubiquity of a single dog's profile throughout the app. What this means in practice is that the user schema itself is very limited in its content; the only field not relate to signin/signup is the `location` field. The dog model was built separately and is associated with the user through referencing.

With the dog model as its own document, it can more easily be queried for the various ways in which the app will serve dog information and keep the code more DRY. When serving random dogs that meet the user's criteria, categorizing a dog as liked or rejected by the user dog, or displaying matche, the app only needs to query the user seeking this information, rather than the parent user of each dog being displayed.

---

### Installation instructions:

1. Run `npm i` to install dependencies
2. **For development purposes:** Open the mongo shell to drop any existing database named Fetch. Run `node seed.js` to seed the database to database named Fetch.
3. Run `nodemon` to start the server

---

### Routes:


| Verb | Endpoint | Action |
| ----------- | ----------- | ----------- |
| GET | '/' | Home page |
| GET | '/auth/signin' | Signin page **Frontend only**|
| POST | '/auth/signin' | Signin page post route √|
| GET | '/auth/signup' | Signup page **Frontend only**|
| POST | '/auth/signup' | Signup page √|
| ------ | ----------- | ----------- |
| GET | '/profile'  | View your own profile  - index shows your info and list of your dogs √|
| GET | '/profile/edit' | Edit your own profile - location, username **Frontend only**|
| PUT | '/profile' | Update your own profile - location, username √|
| DELETE | '/profile'  | Delete your own profile √|
| ------ | ----------- | ----------- |
| GET | '/profile/dogs/new' | Form to create a new dog on your own profile, posts to profile/new **Frontend only** |
| POST | '/profile/dogs/' | Create one of your dog's profile √|
| GET | '/profile/dogs/:dogid' | View data on one of your dogs (note this has to be below other routes) √|
| GET | '/profile/dogs/:dogid/edit' | Form to edit data on one of your dogs **Frontend only**|
| PUT | '/profile/dogs/:dogid' | Update one of your dog's profiles √|
| DELETE | '/profile/dogs/:dogid' | Delete one of your dog's profile √|
| ------- | ----------- | ----------- |
| GET | '/profile/dogs/:dogid/dogs' | View other dogs (random from database based on criteria) |
| PUT | '/profile/dogs/:dogid/reject' | Add a dog to your dog's rejects |
| PUT | '/profile/dogs/:dogid/like' | Add a dog to your dog's likes  |
| GET | '/profile/dogs/:dogid/matches' | View your dog's matches |

---

### ODM:

!['Fetch.jpeg'](Fetch.jpeg)

Link to ODM on Lucid Chart:

https://lucid.app/lucidchart/46ce42b4-8d28-4635-8980-9d130cf57498/edit?page=0_0#




* link to deployed api

* unsolved problems / major hurdles
