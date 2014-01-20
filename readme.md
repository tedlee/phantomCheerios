phantomCheerios
===
  
**Order cheerios from the command line.**  
More specifically: a command line interface to order Cheerios (yes the cereal) from Google Shopping Express.  

### Why
I enjoy cereal. I also enjoy software that makes my life easier. phantomCheerios is a match made in whole grain oat heaven.

### What and How  

Google doesn't offer an API for Google Shopping Express so this is an albeit hacky alternative. It uses PhantomJS a wonderful little headless browser that lets you programmatically interact with websites. I used it in tadem with CasperJS a companion navigation scripting library 

### Install  
Make sure your version of brew is up-to-date  

    $ brew update  

Then install PhantomJS (1.9.2+) and CasperJS (1.1+)

    $ brew install phantomjs && brew install casperjs --devel

Now just run the bash script and you're golden

    $ sh phantomCheerios

  
### To Do  
~~Support for 2-factor auth~~  
~~Feeling lucky mode - submit the order all in one go~~  
Prompt user to choose a type of cereal  
Serendipitous Cereal Mode™ - picks a random cereal for you  
Prompt to confirm basket before final checkout  
Allow a user defined number of boxes of cereal order  


### Caveats  
phnatomCheerios operates on the assumption that you have already set up Google Wallet with default payment information and a default delivery address. Before using phantomCheerios I would recommend using Google Express Shopping through the web interface so that you ensure your defaults are properly set. If Google changes their website this will probably break. 
  
This **will** charge your default Google Wallet credit card with the amount for a box of Cheerios. Use this software at your own discretion. **Enjoy your cheerios.**
  