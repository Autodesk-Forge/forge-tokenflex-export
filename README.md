# forge-koa-vue-passport-boilerplate
A Forge application boilerplate using Vue JS for the client and Koa JS for the server backend

[![Node.js](https://img.shields.io/badge/Node.js-10.5.0-blue.svg)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/vue-3.0.0-blue.svg)](https://vuejs.org/)
[![Koa.js](https://img.shields.io/badge/koa-2.5.2-blue.svg)](https://koajs.com/)
[![npm](https://img.shields.io/badge/npm-6.4.0-blue.svg)](https://www.npmjs.com/)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://opensource.org/licenses/MIT)

[![OAuth2](https://img.shields.io/badge/OAuth2-v1-green.svg)](http://developer.autodesk.com/)

This boilerplate application can be used to quickly setup a new Autodesk Forge web application, using a Vue.js frontend server connected to a Koa.js backend server. 

The application is pre-configured to use 3-legged OAuth2 code grant login flow. 

### Thumbnail
![thumbnail](/client/public/indexpage.png)

## Demonstration

See [video demonstration](http://www.youtube.com/watch?v=N4LA44XmFm4)

**Usage**: select **login** in the navigation drawer (left). 

## Architecture

The app was designed to communicate with Autodesk and respective Forge APIs. 

## Setup

This samples requires Forge and respective client credentials.

### Forge

For using this sample, you need an Autodesk developer credentials. Visit the [Forge Developer Portal](https://developer.autodesk.com), sign up for an account, then [create an app](https://developer.autodesk.com/myapps/create). For this new app, use `https://localhost:8081/api/forge/callback/oauth` as Callback URL. Finally take note of the **Client ID** and **Client Secret**. For localhost testing:

- FORGE\_CLIENT\_ID
- FORGE\_CLIENT\_SECRET
- FORGE\_CALLBACK\_URL (optional on localhost)

### Configuration files

On the Koa server, edit the file ```server/src/configuration/default.json``` to update the ```vuehost``` value to your Vue webserver url. Finally, generate the new configuration file, by running the command ```npm run init```.

On the Vue server, edit the file ```client/src/config.js``` to update the ```koahost``` value to your Koa webserver url.

## Running locally

Make sure to have [NodeJS](https://nodejs.org) installed. Clone this project or download it. It's recommended to install [GitHub desktop](https://desktop.github.com). To clone it via command line, use the following (Terminal on MacOSX/Linux, Git Shell on Windows):

```
git clone https://github.com/mazerab/forge-koa-vue-passport-boilerplate
```

Set all FORGE_ aenvironment variables described on the **Setup** section using the following:

- Mac OSX/Linux (Terminal)

```
export VARIABLE_NAME=value
```

- Windows (use <b>Node.js command line</b> from Start menu)

```
set VARIABLE_NAME=value
```

Install the required packaged and run the application:

Backend Koa.js application
```
cd server
npm install
npm run dev
```
Frontend Vue.js application
```
cd client
npm install
npm run serve
```

Open the browser with SSL on [http://localhost:8080](http://localhost:8080)

**Important:** do not use **npm start** locally, this is intended for PRODUCTION only with HTTPS (SSL) secure cookies.

## Deployment

A deployment should have the following environment variables defined:
```
FORGE_CLIENT_ID
FORGE_CLIENT_SECRET
FORGE_CALLBACK_URL
```
### OAuth Redirect URLs

On live applications, the Forge callback URLs should use your application address instead of **localhost:8081**, something like `https://serveraddress.com/api/[FORGE or STORAGE_NAME]/callback/oauth`

## Known issues

## Tips & tricks

For local development/testing, consider use [nodemon](https://www.npmjs.com/package/nodemon) package, which auto restart your node application after any modification on your code. To install it, use:

    sudo npm install -g nodemon

Then, instead of <b>npm run dev</b>, use the following:

    npm run nodemon

Which executes <b>nodemon server.js --ignore www/</b>, where the <b>--ignore</b> parameter indicates that the app should not restart if files under <b>www</b> folder are modified.

## Troubleshooting

After installing Github desktop for Windows, on the Git Shell, if you see a ***error setting certificate verify locations*** error, use the following:

    git config --global http.sslverify "false"

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.


## Authors

Autodesk Premium Support Services

- Bastien Mazeran [@BastienMazeran](https://twitter.com/BastienMazeran)

See more at [Forge blog](https://forge.autodesk.com/blog).
