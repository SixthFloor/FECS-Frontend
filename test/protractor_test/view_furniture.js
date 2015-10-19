describe('view furniture', function() {

	var allProduct = element.all(by.css(".form-group"))
  	var catalogButon = element(by.buttonText('Catalog'))

	beforeEach(function() {
		browser.get('http://localhost:3030/#')
  	})

  	it('should count all furniture', function() {
    	catalogButon.click()
    	expect(allProduct.count()).toEqual(6+1)
  	})
})


// <div class="cg-notify-message ng-scope alert alert-success cg-notify-message-center" ng-class="[$classes, 
//     $position === 'center' ? 'cg-notify-message-center' : '',
//     $position === 'left' ? 'cg-notify-message-left' : '',
//     $position === 'right' ? 'cg-notify-message-right' : '']" ng-style="{'margin-left': $centerMargin}" style="margin-left: -150px; top: 68px; margin-top: -58px; visibility: visible;">

//     <div ng-show="!$messageTemplate" class="ng-binding ng-hide">
        
//     </div>

//     <div ng-show="$messageTemplate" class="cg-notify-message-template">
        
//     <span class="ng-scope"><b>Well done!</b> Login successfully.</span></div>

//     <button type="button" class="cg-notify-close" ng-click="$close()">
//         <span aria-hidden="true">×</span>
//         <span class="cg-notify-sr-only">Close</span>
//     </button>

// </div>