/* API Test case: Register As Member*/
/* Created by Runyasak */

var frisby = require('frisby')

var email = 'runyatest@gmail.com'
var password = '12345678'
var firstName = 'Runyatest'
var lastName = "Runyalastname"
var address1 = "bangkok1"
var address2 = "bangkok2"
var province = "bangkok3"
var zipcode = "10150"
var telephone_number = "029999999"
var card_name = "Runyatest"
var expirationDate = 1606780800000
var card_number = "555-555-555"

function postNewUser(){
  return frisby.create('post detail as json to create user').
    post('http://128.199.133.224/api/user/new', {          
      "email": email,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "address1": address1,
      "address2": address2,
      "province": province,
      "zipcode": zipcode,
      "telephone_number": telephone_number,
      "card_name": card_name,
      "expirationDate": expirationDate,
      "card_number": card_number
    },{json: true})
}

function setFullDetail(){
  email = 'runyatest@gmail.com'
  password = '12345678'
  firstName = 'Runyatest'
  lastName = "Runyalastname"
  address1 = "bangkok1"
  address2 = "bangkok2"
  province = "bangkok3"
  zipcode = "10150"
  telephone_number = "029999999"
  card_name = "Runyatest"
  expirationDate = 1606780800000
  card_number = "555-555-555"
}

function setNoOptionDetail(){
  email = 'runyatest@gmail.com'
  password = '12345678'
  firstName = 'Runyatest'
  lastName = "Runyalastname"
  address1 = null
  address2 = null
  province = null
  zipcode = null
  telephone_number = null
  card_name = null
  expirationDate = null
  card_number = null
}

describe('should be responsed with \"The user has created\" when register with corrected all detail\n', function(){
  email = 'runyatest11@gmail.com'
  postNewUser()
    .expectJSON({"description": "The user has created"})
      .toss()
})

describe('should be responsed with \"This email has used\" when register with used email\n', function(){
  setFullDetail()
  postNewUser()
    .expectJSON({"description": "This email has used"})
      .toss()
})

describe('should be responsed with \".....\" when register with password shorter than 8 letters', function(){
  setFullDetail()
  password = '1234567'
  postNewUser()
    .expectJSON({"description": "....."})
      .toss()
})

describe('should be responsed with \".....\" when register with password longer than 20 letters', function(){
  setFullDetail()
  password = '123456788888888888888'
  postNewUser()
    .expectJSON({"description": "....."})
      .toss()
})

describe('should be responsed with \"Password connot use special character\" when register with password including special letters', function(){
  setFullDetail()
  password = '!@#$%^&*'
  postNewUser()
    .expectJSON({"description": "Password connot use special character"})
      .toss()
})

describe('should be responsed with \"This email format cannot use\" when register with incorrect format', function(){
  setFullDetail()
  password = 'runyatest17-gmail.com'
  postNewUser()
    .expectJSON({"description": "This email format cannot use"})
      .toss()
})

describe('should be responsed with \"The user has created\" when register with detail without optional\n', function(){
  setNoOptionDetail()
  email = 'runyatest12@gmail.com'
  postNewUser()
    .expectJSON({"description": "The user has created"})
      .toss()
})