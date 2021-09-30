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

GET /lessons/lesson:chapter

- get all in one lesson with chapter selection

GET /lessons/lesson:chapter/:id

- get one with id in one lesson with chapter selection

POST /lessons/lesson:chapter

- add item with json follow lesson_schema

PUT /lessons/lesson:chapter

- update item with json follow lesson_schema

DELETE /lessons/lesson:chapter/:id

- delete one with id in one lesson with chapter selection
