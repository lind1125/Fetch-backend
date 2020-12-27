# Team-2-Project
## Fetch


### Routes:


| Verb | Endpoint | Action |
| ----------- | ----------- | ----------- |
| GET | '/' | Home page |
| GET | '/auth/signin' | Signin page √|
| POST | '/auth/signin' | Signin page post route √|
| GET | '/auth/signup' | Signup page √|
| POST | '/auth/signup' | Signup page |
| ----------- | ----------- | ----------- √|
| GET | '/profile' √| View your own profile  - index shows your info and list of your dogs|
| GET | '/profile/edit' | Edit your own profile - location,|
| PUT | '/profile' | Update your own profile |
| DELETE | '/profile' √| Delete your own profile |
| GET | '/profile/dogs/new' | Form to create a new dog on your own profile, posts to profile/new|
| POST | '/profile/dogs/newd' | Create one of your dog's profile |
| ----------- | ----------- | ----------- |
| GET | '/profile/dogs/:dogid' | View data on one of your dogs |
| GET | '/profile/dogs/:dogid/edit' | Form to edit data on one of your dogs |
| PUT | '/profile/dogs/:dogid' | Update one of your dog's profiles |
| DELETE | '/profile/dogs/:dogid' | Delete one of your dog's profile |
| ----------- | ----------- | ----------- |
| GET | '/profile/dogs/:dogid/dogs' | View other dogs (random from database based on criteria) |
| PUT | '/profile/dogs/:dogid/add' | Add a dog to your dog's likes/rejects (this one I'm not sure about) |
| GET | '/profile/dogs/:dogid/matches' | View your dog's matches |



### ODM:

!['Fetch.jpeg'](Fetch.jpeg)

Link to ODM on Lucid Chart:

https://lucid.app/lucidchart/46ce42b4-8d28-4635-8980-9d130cf57498/edit?page=0_0#
