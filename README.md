# The Bouqs Front End Challenge 🌸 

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d74b2f7-8c18-46cc-8d56-477fc30997fd/deploy-status)](https://app.netlify.com/sites/bouqs-fe-challenge/deploys)

Thank you for allowing me the opportunity to take this challenge, I had quite a lot of fun coding this project!

## Setup to run project locally
This project requires [node.js](https://www.npmjs.com/get-npmhttps://www.npmjs.com/get-npm)
1. Clone this repo: `git clone git@github.com:hunter547/fe-code-challenge.git`
2. Once cloned, cd into the project: `cd fe-code-challenge`
3. Install project dependencies: `npm install`
4. Start app with mock api: `npm run dev:api`
5. Navigate to [http://localhost:8080/](http://localhost:8080/) in a browser

  - Client-side App - http://localhost:8080/
  - Mock API - http://localhost:8081/api/categories

## Run unit tests
1. Make sure steps 1 - 3 are completed in the section above.
2. To run all unit tests: `npm run jest`
3. To test for code coverage of all tests: `yarn jest --coverage`
4. To inspect coverage reports in depth, navigate to the coverage folder of this project

## Additional technologies/packages used:
- Redux
- Enzyme
- React-Router-Dom
- React-Modal
- React-Spinners
- React-Tooltip


## Bonus Tasks (not required):
If you're feeling extra 💪 feel free to do some bonus tasks.

&emsp; ✅ &nbsp; Add unit tests 

&emsp; ✅ &nbsp; Run your code through our linting rules  

&emsp; ✅ &nbsp; Store the user’s data so if they return to the site a few days later, they don’t have to start over again 

## Process of hosting online
1. Hosting this mock api proved an interesting challenge, being that the data is generated programmatically.
2. To see the process of hosting the backend/api on Heroku, I set up a repository and a readme here: [bouqs-challenge-backend](https://github.com/hunter547/bouqs-challenge-backend).
3. For the front-end hosting, that was very easy to do on Netlify, just pick the repository and build it to the dist folder.
4. The front-end of the project can be visited here: [https://bouqs-fe-challenge.netlify.app/](https://bouqs-fe-challenge.netlify.app/)

**Note:** If the flower grid doesn't populate right away when visiting the front-end site, please allow some time for the Heroku dynos to wake up and serve data.

## Original Submission vs Master branch
I made some changes after submitting for additional features and styling. I've been enjoying this challenge and keep thinking of new things I want to do. I understand if these changes won't be considered, so I made a "original submission" [branch](https://github.com/hunter547/fe-code-challenge/tree/original-submission). That being said, I hope you can see what else I've added. 🙂