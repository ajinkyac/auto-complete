/*
 * Test case to look up a valid username on github using autocomplete component.
 * To execute, on terminal $> npm run test:e2e
 */

describe('Looking up a valid username on github', function() {
  it('should display list of repositories', function() {
    browser.get('http://localhost:8000');

    var searchBox = element(by.xpath('//input[@ng-model="searchTerm"]'));

    searchBox.sendKeys('ajinkyac');
    searchBox.sendKeys(protractor.Key.ENTER);

    browser.sleep(4000);

    var resultCards = element.all(by.repeater('result in results'));
    expect(resultCards.count()).toBeGreaterThan(0);
  });
});
