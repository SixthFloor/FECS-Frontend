/* API Test case: Login As Member*/
/* Created by Runyasak */

var frisby = require('frisby')

var email = "nara@gmail.com"
var password = "12345678"

function postLogin(){
  return frisby.create('post email and password as json to login')
    .post('http://128.199.133.224/api/authentication/login', {
        "email": email,
        "password": password
    },{json: true})
}

function setDefaultDetail(){
  email = "nara@gmail.com"
  password = "12345678"
}

describe('should be responsed with user detail when login with corrected user\n', function(){
  postLogin()
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
    }).toss()
})

describe('should be responsed with \"Internal Server Error\" when login with incorrect email\n', function(){
  email = 'nara123@gmail.com'
  postLogin()
    .expectJSON({ "description": "Internal Server Error" })
      .toss()
})



describe('should be responsed with \"Incorrect password\" when login with incorrect password\n', function(){
  setDefaultDetail()
  password = '1234567'
  postLogin()
    .expectJSON({ "description": "Incorrect password" })
      .toss()
})

describe('should be responsed with \"Password is empty\" when login with email only\n', function(){
  setDefaultDetail()
  password = null
  postLogin()
    .expectJSON({ "description": "Password is empty" })
      .toss()
})


describe('should be responsed with \"Internal Server Error\" when login with password only\n', function(){
  setDefaultDetail()
  email = null
  postLogin()
    .expectJSON({ "description": "Internal Server Error" })
      .toss()
})

describe('should be responsed with user detail when login with uppercase email\n', function(){
  email = 'NARA@gmail.com'
  postLogin()
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
    }).toss()
})
