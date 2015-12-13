/* API Test case: View Furniture */
/* Created by Runyasak */

var request = require('request')
var frisby = require('frisby')

function expectProductDetail(serialNumber){
  frisby.create('get product detail by serial number')
    .get('http://128.199.133.224/api/product/' + serialNumber)
      .expectJSONTypes({
          "id": Number,
          "serialNumber": String,
          "name": String,
          "price": Number,
          "description": String,
          "dimensionDescription": String,
          "images": Array,
          "quantity": Number
      })
  .toss()
}

describe('test', function(){
  it("should respond with hello world", function(done) {
    request("http://128.199.133.224/api/product/all", function(error, response, body){
      furnitureAll = JSON.parse(body)
      for(var i = 0; i < furnitureAll.length; i++){
        expectProductDetail(furnitureAll[i].serialNumber)
      }
      done()
    })
  })
})