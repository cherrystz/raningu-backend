# raningu-nodejs

Modules used

- express
- cors
- mongoose
- path
- http
- firebase
- bcryptjs
- jsonwebtoken
- fs

API PATH

_AUTHENTICATION_

POST /auth/login

- required json with email, password

POST /auth/register

- required json follow user_schema

_LESSONS_

GET /lessons

-get all lessons

GET /lessons/chapter:chapter

- get all in one lesson with chapter selection

GET /lessons/chapter:chapter/:id

- get one with id in one lesson with chapter selection

_QUIZS_

GET /quiz

- get all quiz

get /quiz/:quiz_id
