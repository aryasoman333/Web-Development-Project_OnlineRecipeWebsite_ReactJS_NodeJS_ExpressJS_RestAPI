# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Provide an example where a url DOES not represent a resource, then describe how to modify it so that it does.

##A: 
The URL of a REST service should represent a resource, which means the URL should be semantically meaningful and should represent nouns, not verbs. It should represent the exact state and type of data being fetched from the server.

EXAMPLE:

Considering an example of creating a RESTful API to fetch(search) details of a user from server.
Below is the URL that does not represent a resource:

URL: /search

app.get('/search', (req,res) =>{
    const name = req.query.name;
    if(!name || !users.findOne({name: name}))
        res.status(400).json({error: "Invalid request! Unable to fetch users details!"});
    else
        res.json(users.findOne({name: name}));
})

Below is the modification done to the URL to represent a resource:

URL: /userDetails

app.get('/userDetails', (req,res) =>{
    const name = req.query.name;
    if(!name || !users.findOne({name: name}))
        res.status(400).json({error: "Invalid request! Unable to fetch users details!"});
    else
        res.json(users.findOne({name: name}));
})

## Q: I say that "Once you go async, you have to stay async".  What does this mean?  Give an example that demonstrates.

##A: 
Async means not synchronous, that means in async code execution, the program does not wait for the completion of the async code, to run the rest of the javascript code. Both promises and callbacks are asynch. In the case of promises, the  chained promises are put into an event queue, which allows the subsequent javascript code to run, and the promises will run after the main thread has finished processing. This can lead to data descrepancies if the variables or resources in async calls are not handled in the right way, as demonstarated in below example.

example:

if(sendMessage){
  sendMessage.addEventListener('click', ()=>{
    const text = document.querySelector(".to-send").value;
    const user = document.querySelector(".send input").value;
     fetch('/messages/',{        
      method: 'POST',
      headers: new Headers({
        'content-type' : 'application/json'
      }),           
      body: JSON.stringify({text: text, username: user})
    })
     .then(response => response.json())
     .then(UserMessages => {
        displayMessages(UserMessages);
        document.querySelector(".to-send").value='This will cause a problem for async';
     });
     document.querySelector(".to-send").value='';
  });
}

In the above example => "document.querySelector(".to-send").value='';" this code will execute before the fetch promises and hence the code "document.querySelector(".to-send").value='This will cause a problem for async';" will again alter the value once the promises are completed. Hence once async we need to stay async to avoid data descrepencies and unexpected behaviours due to the asynchromous behavior.

## Q: What is a rule of thumb you can follow to understand when async code can and cannot modify your variables and/or call your methods?

##A:

Async codes are called each time and put in a wait queue, and once the remaining code is completed the async calls are taken up and completed.
The easist way to track an asynch call would be to track the progress in the browser console.
We could also use proper error handling and use understandable error messages to interpret the behaviour of async calls.

Both promises and callbacks are asynch. In the case of promises, the  chained promises are put into an event queue, which allows the subsequent javascript code to run, and the promises will run after the main thread has finished processing. This can lead to data descrepancies if the variables or resources in async calls are not handled in the right way.

## Q: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?

##A: 
We should not store the state in DOM due to below reasons:

1) Causes security issues as anyone can manipulate the data stored in DOM from the browser
2) Does not follow MVC. MVC(Model View Controller) frameworks helps keep the code clean. Hence storing the data as separate js files is a good practice to follow
3) Leads to memory leakage

## Q: What is the primary rule to follow to prevent poor web security such as injection attacks?  (This is NOT about safely storing passwords)

##A: 
The primary rule to follow to prevent poor web security is to always filter the data from user. Only the data that is allowed should be 'whitelisted' and all others should be blocked. Blacklisting bad data is not a proper solution though. By whitelisting we mean escaping the data, where we can escape any  HTML, javascript or URLs in the user input thereby avoiding injection attacks.
Validating input data is another way of preventing injection attacks. Sanitizing is also a technique used along with the other methods to ensure injection attack prevention.


## Q: What is a polyfill?  When should one be used?  Give an example of a polyfill that follows these rules.

##A: 
Few of the older browsers do not support modern functionalities. In such case, we make use of polyfill, which is a piece of code that helps get rid of these compatibility issues. If a certain feature does not exist within a browser’s Javascript engine, polyfills provides a fallback.

Polyfills should be used when modern functionalities needs to be run on older unsupported browsers that do not natively support these new functionalities.

Example of a polyfill : (Implementing polyfill for - Array forEach (JavaScript 1.6))

Array.prototype.forEach = function(callback, thisArg) {
  if(typeof(callback) !== "function") {
    throw new TypeError(callback + " is not a function!");
  }
  var len = this.length;
  for(var i = 0; i < len; i++) {
    callback.call(thisArg, this[i], i, this)
  }
}

## Q: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.

##A:
Cookies are never a good option to store data.
Passwords are best examples of information that should not be stored in cookies. The data stored in cookies are available as plain text. Hence if we store passwords, other users can easily get or decrypt our passwords which can be used in a malicious way. The same password might be even used in multiple places causing high security issues.

## Q: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.

##A:

Multiple-page-web application:
1) Contains multiple pages(and page reloads) and navigates from one page to another using server routings
2) Each page is rendered using a separate page load which makes it slower comparatively
3) Data is submitted to server using links and forms
4) Page reload is required to display the changes from server to front end
5) server-side javascript
6) Examples : Udemy.com, NEU website etc
7) Javascript need not be enabled in the browser, front-end and back-end development are tightly coupled 
8) Better security and not too prone to memory leaks

Single-page-web application:
1) Contains only a single page load at the beginning and rest of the pages are rendered using front-end javascript
2) After that no more page reloads and is faster
3) Data updates are handled by service and REST api calls where data is send back and forth the server
4) Works inside a browser and uses service calls to render changes
5) browser-side javascript
6) Examples : Gmail, Google maps etc
7) Javascript needs to be enabled in the browser
8) Less security and prone to memory leaks

## Q: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

##A:

Progressive Enhancement is a Web Design strategy that allows users to build core web content first. After that user can progressively build more layers to the web application to create an enhanced version with more advanced browser features. 
For example, initially building a multiple-page web application and then adding advanced front end javascript and using RESTful APIs to make the web application work as a single page web application can be explained as one form of Progressive Enhancement.

An SPA that uses progressive enhancement will work even when the javascript is turned off at the client-side(browser has disabled Javascript). In such scenarios, these SPAs behave like multiple-page web applications, because of progressive enhancement. 
An SPA that uses progressive enhancement will have code that executes the web application functionalities using front-end javascript(RESTful APIs) as well as backend javascript(server side page reloads) whereas the SPA without progressive Enhancement will only have front-end javascript using REST APIs.

## Q: Explain how a  REST service is or is not similar to a dynamic asset.
##A:

 Dynamic assets are constructed either immediate or for a short span, mostly not an actual file, whereas REST services are web service calls that follows REST(REpresentational State Transfer) protocols to perform various CRUD operations using the HTTP methods(GET, PUT, POST etc). 

 REST services are similar to dynamic assets as REST services are async in nature, runs in the background and creates responses in run-time. Since it is async, it starts at a particular time and gets excetued and completed some other time. 
 Dynamic asset triggers are also async in nature.

