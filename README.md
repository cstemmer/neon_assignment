<h1> neon assignment </h1>
This is my solution to the test assignment I got here 
https://gist.github.com/bayandin/9798d9fdf37f2ddcda2c44fd9449daba

I have implemented it in two frameworks - Cypress and Playwright. 
Cypress is the framework I use daily. I like it, because a lot of features work out of the box and it supports API testing. 

I've been meaning to dig into Playwright, as many users recommend it, but actually this weekend and this asignment was my first go with the framework. 
I was able to complete the flow of the tests using the available documentation. It is possible I have not been aware of some good practices, for which I apologize. (:

<h2>How to get Playwright tests running?</h2>

1. Clone this repo:
   <p> git clone "https://github.com/cstemmer/neon_assignment.git"</p> 

2. Run npm install

3. Inside the directory "playwright_assignment", find the directory "tests" and in it the file auth.setup
   <p> In auth.setup:</p> 
<p>   Change the value of         .fill('github username goes here')  to your github username (mine is cstemmer) </p> 
<p>   Change the value of         .fill('github password goes here')  to your github password </p> 

4. Inside the directory "playwright_assignment", find the directory "tests" and in it the file project_creation_page.spec.js
   In project_creation_page.spec.js:
   <p> Change the value of         const defaultUser = 'gmail username goes here' to google login - for example, for conrad.stemmer@gmail.com input 'conrad.stemmer'</p> 

5. The repo has 1 spec file: project_creation_page.spec.js
   Inside terminal navigate to playwright_assignment directory
   When you're there, enter the following command:
   <p> npx playwright test --ui </p> 
   <p> and launch the only test </p> 


<h2>How to get Cypress tests running?</h2>

1. Clone this repo:
   <p> git clone "https://github.com/cstemmer/neon_assignment.git"</p> 

2. Run npm install

3. Inside the directory "cypress_assignment", find the file "cypress.config.js"
   <p> Change the value of         gitHubUser: 'google login goes here' to google login - for example, for conrad.stemmer@gmail.com input 'conrad.stemmer'</p> 
   <p> Change the value of         gitHubPassword: 'password goes here' to the password that you use to access Github </p> 

4. The repo has 1 spec file: project_creation_form.cy.js
   <p> Inside terminal navigate to cypress_assignment directory</p> 
   <p> When you're there, enter the following command:</p> 
   <p> npx cypress open</p> 
   <p> and launch the only test</p> 


   
   
