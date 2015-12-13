/* API Test case: View Furniture Category*/
/* Created by Runyasak */

var frisby = require('frisby')

function expectCategory(test_content, address){
  frisby.create(test_content)
    .get(address)
      .expectJSONTypes('*', {
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

describe('should be responsed with product details from all category', function(){
  expectCategory('get API from all category', 'http://128.199.133.224/api/product/all')
})

describe('should be responsed with product details from bedroom category', function(){
  expectCategory('get API from bedroom category', 'http://128.199.133.224/api/category/product/Bedroom')
})

describe('should be responsed with product details from bathroom category', function(){
  expectCategory('get API from bathroom category', 'http://128.199.133.224/api/category/product/Bathroom')
})

describe('should be responsed with product details from dinning room category', function(){
  expectCategory('get API from dinning room category', 'http://128.199.133.224/api/category/product/Dinning%20Room')
})

describe('should be responsed with product details from kitchen category', function(){
  expectCategory('get API from kitchen category', 'http://128.199.133.224/api/category/product/Kitchen')
})

describe('should be responsed with product details from living room category', function(){
  expectCategory('get API from living room category', 'http://128.199.133.224/api/category/product/Living%20Room')
})

