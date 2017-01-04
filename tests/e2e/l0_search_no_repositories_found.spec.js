/*
 * Test case to look up a valid username on github using autocomplete component.
 * To execute, on terminal $> npm run test:e2e
 */
describe('Looking up an invalid username on github', function() {
  it('should display error message', function() {
    browser.get('http://localhost:8000');

    var searchBox = element(by.xpath('//input[@ng-model="searchTerm"]'));

    searchBox.sendKeys('asdf..;;;asdf;df');
    searchBox.sendKeys(protractor.Key.ENTER);

    browser.sleep(4000);

    var errorMessage = element(by.xpath('//span[@ng-if="errorMessage || errorMessage.length > 0"]'));
    expect(errorMessage.getAttribute('class')).not.toMatch('ng-hide');
  });
});
