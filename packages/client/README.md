# Erevna (Dashboard)

This repo contains the source for the Erevna dashboard; written in React, SASS and Node.

## Getting Started

#### Yarn
```
git clone https://github.com/esentrydev/erevna_dashboard erevna
cd erevna
yarn install
yarn start
```

#### NPM
```
git clone https://github.com/esentrydev/erevna_dashboard erevna
cd erevna
npm install
npm start
```

### Building for production 
Because the project uses client-side routing, it cannot be hosted on a regular static file web server or CDN, instead, I wrote an express web server for that.

#### Yarn
```
yarn build  /* compiles all sources and produces a production ready bundle */
node server.js  /* starts an express server */
```
#### NPM
```
npm run build  /* compiles all sources and produces a production ready bundle */
node server.js```  /* starts an express server */
```

Then open [http://localhost:9000/](http://localhost:9000/) to see the production-ready erevna-dashboard. 

## Dependencies
* Python 2.7.x
Node-sass which is used to compile the SASS source requires at least Python 2.7.x to work. If you don't have python installed, head over to https://www.python.org/downloads/release/python-2715/ to install it.


#### Esentry Systems ® 2019
