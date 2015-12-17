/* API Test case: Add edit product */
/* Created by Runyasak */

var request = require('request')
var frisby = require('frisby')

describe('Add edit product', function(){

  it('should be responsed with product details when add product with correct form\n', function(done){
    request.post({url:'http://128.199.133.224/api/authentication/login', json: { 
      "email":"nara@gmail.com",
      "password": "12345678"
    }}, function(err,httpResponse,body){
      var post_headers = {
        'Content-Type': 'application/json',
        'Authorization': body.token
      }
      frisby.create('post product detail as json to add product - 1')
        .addHeaders(post_headers)
        .post('http://128.199.133.224/api/product/new', {
          "name": "Runyatestk",
          "price": 200,
          "description": "This furniture is added by API testing with frisby.",
          "dimensionDescription": "Not too big and not too small."
        },{json: true})
        .inspectJSON()
        .expectJSONTypes({
          "id": Number,
          "serialNumber": String,
          "name": String,
          "price": Number,
          "description": String,
          "dimensionDescription": String,
          "quantity": Number
        })
      .toss()
      done()
    })
  })

  it('should be responsed \"This name has used\" when add exist product\n', function(done){
    request.post({url:'http://128.199.133.224/api/authentication/login', json: { 
      "email":"nara@gmail.com",
      "password": "12345678"
    }}, function(err,httpResponse,body){
      var post_headers = {
        'Content-Type': 'application/json',
        'Authorization': body.token
      }
      frisby.create('post product detail as json to add product - 2')
        .addHeaders(post_headers)
        .post('http://128.199.133.224/api/product/new', {
          "name": "Runyatestc",
          "price": 200,
          "description": "This furniture is added by API testing with frisby.",
          "dimensionDescription": "Not too big and not too small."
        },{json: true})
        .inspectJSON()
        .expectJSON({
          "description": "This name has used"
        })
      .toss()
      done()
    })
  })

  it('should be responsed \"Create FurnitureDescription failed\" when add product with incorrect form', function(done){  
    request.post({url:'http://128.199.133.224/api/authentication/login', json: { 
      "email":"nara@gmail.com",
      "password": "12345678"
    }}, function(err,httpResponse,body){
      var post_headers = {
        'Content-Type': 'application/json',
        'Authorization': body.token
      }
      frisby.create('post product detail as json to add product')
        .addHeaders(post_headers)
        .post('http://128.199.133.224/api/product/new', {
          "name": "Runyatestc",
          "price": null,
          "description": null,
          "dimensionDescription": null
        },{json: true})
        .inspectJSON()
        .expectJSON({
          "description": "Create FurnitureDescription failed"
        })
      .toss()
      done()
    })
  })

  it('should be responsed \"Bad Request\" when add product without authentication', function(done){  
    request.post({url:'http://128.199.133.224/api/authentication/login', json: { 
      "email":"nara@gmail.com",
      "password": "12345678"
    }}, function(err,httpResponse,body){
      var post_headers = {
        'Content-Type': 'application/json',
        'Authorization': null
      }
      frisby.create('post product detail as json to add product')
        .addHeaders(post_headers)
        .post('http://128.199.133.224/api/product/new', {
          "name": "Runyatest"
        },{json: true})
        .inspectJSON()
        .expectJSON({
          "description": "Bad Request"
        })
      .toss()
      done()
    })
  })

})