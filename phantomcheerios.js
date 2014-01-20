var casper = require('casper').create({
  logLevel: 'debug',
  // verbose: true, Granular logs of Casper stepping through each webpage
  viewportSize: {width: 950, height: 950}
});
var system = require('system');

var loginSettings = {
  url: "https://accounts.google.com/ServiceLogin?hl=en&service=samedaycustomer&continue=https%3A%2F%2Fwww.google.com%2Fshopping%2Fexpress%2F%3Forigin%3Dsignin%23ProductDetailPlace%3Aid%3D12149828118637989316",
  email: casper.cli.get(0),
  password: casper.cli.get(1),
  authcode: casper.cli.get(2)
}

casper.start(loginSettings.url, function() {
  this.fillSelectors('form#gaia_loginform', {
      'input[name="Email"]':  loginSettings.email,
      'input[name="Passwd"]':  loginSettings.password
  }, true);

  this.echo('Logging in...');
});

casper.then(function() {

  this.waitForUrl(/SecondFactor/, function() {
    this.fillSelectors('form#gaia_secondfactorform', {
        'input[name="smsUserPin"]':  loginSettings.authcode,
    }, true);

    this.echo('Submitting two-factor auth code...');
  });
});

casper.then(function() {
  this.waitForUrl(/shopping\/express/, function() {
    this.wait(1000, function() {
        this.echo('Selecting item...');
        this.captureSelector('product.png', 'body');
        this.clickLabel('Add to cart', 'button');
        this.wait(1000, function() {
        });
    });
  }, 6000);
})

casper.thenOpen('https://www.google.com/shopping/express/#CartDeliveryOptionPlace:', function() {
  this.wait(3000, function() {
      this.echo('Checking out...');
      this.captureSelector('checkout.png', 'body');

      var message = this.evaluate(function() {
        var item = document.querySelectorAll('.GOH5230IYD a')[0].firstChild.textContent;
        var unitPrice = document.querySelectorAll('.GOH5230PYD span')[0].firstChild.textContent;
        var quantity = document.querySelectorAll('.GOH5230MYD .gwt-Label')[0].firstChild.textContent;
        var totalPrice = document.querySelectorAll('.GOH5230LYD .gwt-InlineLabel')[0].firstChild.textContent;
        return ("You've ordered " + quantity + " orderes of " + item + " (" + unitPrice + "). Your total is: " + totalPrice );
      });
      this.echo(message);
      this.clickLabel('Submit order ›', 'button');
      this.wait(1000, function() {
        this.echo("Order submitted!");
        this.captureSelector('submitted.png', 'body');
      });

  });
});

casper.run();