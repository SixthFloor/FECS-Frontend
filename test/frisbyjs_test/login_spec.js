var frisby = require('frisby')

frisby.create('should be responsed with user detail when login with corrected user')
  .post('http://128.199.133.224/api/authentication/login', {
      "email": "nara@gmail.com",
      "password": "12345678"
  },{json: true})
  .expectJSONTypes({
    "token": String,
    "user": {
      "id": Number,
      "email": String,
      "firstName": String,
      "lastName": String,
      "joiningDate": Number,
      function(val) {
        expect(val).toContainJsonTypes({
          "address1": function(val) { expect(val).toBeTypeOrNull(String); }
        })
      },
      function(val) {
        expect(val).toContainJsonTypes({
          "address2": function(val) { expect(val).toBeTypeOrNull(String); }
        })
      },
      function(val) {
        expect(val).toContainJsonTypes({
          "province": function(val) { expect(val).toBeTypeOrNull(String); }
        })
      },
      function(val) {
        expect(val).toContainJsonTypes({
          "zipcode": function(val) { expect(val).toBeTypeOrNull(String); }
        })
      },
      function(val) {
        expect(val).toContainJsonTypes({
          "telephone_number": function(val) { expect(val).toBeTypeOrNull(String); }
        })
      },
      function(val) {
        expect(val).toContainJsonTypes({
          "card_name": function(val) { expect(val).toBeTypeOrNull(String); }
        })
      },
      function(val) {
        expect(val).toContainJsonTypes({
          "card_number": function(val) { expect(val).toBeTypeOrNull(String); }
        })
      },
      function(val) {
        expect(val).toContainJsonTypes({
          "expirationDate": function(val) { expect(val).toBeTypeOrNull(Number); }
        })
      },
    },
  })
.toss()

frisby.create('should be responsed with internal server error when login with incorrect email')
  .post('http://128.199.133.224/api/authentication/login', {
      "email": "nara123@gmail.com",
      "password": "12345678"
  },{json: true}).
  expectJSON(
    {
      "description": "Internal Server Error"
    })
  .toss()

frisby.create('should be responsed with internal server error when login with incorrect password')
  .post('http://128.199.133.224/api/authentication/login', {
      "email": "nara123@gmail.com",
      "password": "1234567"
  },{json: true}).
  expectJSON(
    {
      "description": "Internal Server Error"
    })
  .toss()

frisby.create('should be responsed with bad request when login with email only')
  .post('http://128.199.133.224/api/authentication/login', {
      "email": "nara@gmail.com"
  },{json: true}).
  expectJSON(
    {
      "description": "Internal Server Error"
    })
  .toss()

frisby.create('should be responsed with internal server error when login with password only')
  .post('http://128.199.133.224/api/authentication/login', {
      "password": "1234567"
  },{json: true}).
  expectJSON(
    {
      "description": "Internal Server Error"
    })
  .toss()