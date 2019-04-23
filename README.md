# Simple Calculator - Proposed Solution

Version Number: 627d7be039e0085025a51d47e42bdd970409ec1c

## General considerations 

I´ve decided code the solution using React with Redux as a main technologies and NextJS as a boilerplate.

All the tests can be found in the folder: "__tests__"
All the components in the folders: "components" and "pages"
Config files in the folder: "config"
All the actions/Reducers are defined in the file "store.js"
For the CSS/style I´ve used styled-jsx

The solution follow the flux workflow with 3 main actions: clickKey, resetCalculator and initializeStore.


## Main commands

```bash
# Install the dependencies
npm install

# Run website in dev (hot reload) mode ( http://localhost:3000 )
npm run start

# Run the tests
npm run test
