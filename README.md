# consumption-reporting-vue-koa-app

[![TokenFlex](https://img.shields.io/badge/TokenFlex-v1-green.svg)](https://forge.autodesk.com/en/docs/tokenflex/v1/overview/)
[![koa2](https://img.shields.io/badge/koa-2-green.svg)](https://github.com/koajs/koa)
[![vuetify](https://img.shields.io/badge/Vuetify-1.3-blue.svg)](https://github.com/vuetifyjs/vuetify)
[![oauth](https://img.shields.io/badge/passport--oauth-1-brightgreen.svg)](https://github.com/jaredhanson/passport-oauth)<br/>
[![travisCI](https://travis-ci.org/dukedhx/consumption-reporting-vue-koa-app.svg?branch=master)](https://travis-ci.org/dukedhx/consumption-reporting-vue-koa-app)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![codebeat badge](https://codebeat.co/badges/d26ae8ba-e166-4f2a-9357-52d7c126391a)](https://codebeat.co/projects/github-com-dukedhx-consumption-reporting-vue-koa-app-master)
[![Maintainability](https://api.codeclimate.com/v1/badges/79b42eaa59c06ec13703/maintainability)](https://codeclimate.com/github/dukedhx/consumption-reporting-vue-koa-app/maintainability)
[![MIT](https://camo.githubusercontent.com/b323cc1dc1fbf413e36d79b86abc71b68b648e4b/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f767565746966792e737667)](https://opensource.org/licenses/MIT)<br/>
[![zenhub](https://camo.githubusercontent.com/7e10f7ff8cd1064be463e8846910c6a2aa2d2567/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d616e616765645f776974682d5a656e4875622d3565363062612e737667)](https://app.zenhub.com/workspace/o/dukedhx/consumption-reporting-vue-koa-app/)
[![Stackoverflow](https://img.shields.io/badge/ask-stackoverflow-yellow.svg)](https://stackoverflow.com/questions/ask?tags=%5bautodesk-forge,forge-tokenflex)



## Description

Demonstrates how to build custom reports using Forge TokenFlex API.

Uses [3-legged oAuth2](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/) to authenticate with Forge. Uses [chart.js](http://www.chartjs.org/) and [Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial) API to create usage dashboard.

### Thumbnail
![Thumbnail](/thumbnail.png)

### [Live Demo](https://tokenflex-consumption-report.herokuapp.com)

### Pre-requisites

- Forge Account: Learn how to create a Forge Account, activate subscription and create an app at [this tutorial](http://learnforge.autodesk.io/#/account/)
- Node.js >= 8.0
- Internet connectivity to the Google Map API
- Tested to be working on: Chrome, Safari, Firefox and IE Edge
- A Google API Key for Google Maps, you can get one [here](https://developers.google.com/maps/documentation/javascript/get-api-key)

### Setup

- Create a Forge App with access to the ```Misc API```.

- Clone this project or download it. It's recommended to install [GitHub desktop](https://desktop.github.com/). To clone via command line, use the following (**Terminal** on MacOS/Linux, **Git Shell** on Windows):
```
git clone https://github.com/mazerab/consumption-reporting-vue-koa-app
```
- Initialize and install the dependencies
```bash
export FORGE_CLIENT_ID=[YOUR_CLIENT_ID]
export FORGE_CLIENT_SECRET=[YOUR_CLIENT_SECRET]
export FORGE_CALLBACK_URL=[YOUR_CALLBACK_URL]
export GoogleAPIKey=[YOUR_GOOGLEAPI_KEY]
npm install
```

### Running Locally

- To run the front end with the Vue LiveServer (see it live at http://localhost:8080/):
```bash
npm run serve
```

- To run the app in dev mode (see it live at http://localhost:5000/):
```bash
npm run dev
```

### Debug Options


To apply new Client ID/Secret or Callback URL, run below to recreate the config file
```bash
npm run init '[YOUR_CLIENT_ID]' '[YOUR_CLIENT_SECRET]' '[YOUR_CALLBACK_URL]' '[YOUR_GOOGLEAPI_KEY]'
```

To build the front end (Compiler will emit build outputs to ```./www```):
```bash
npm run build
```

To run both the front and back ends in single APP mode, you will need to have built the front end beforehand (see it live at http://localhost:8080/):
```bash
NODE_ENV=production npm run init '[YOUR_CLIENT_ID]' '[YOUR_CLIENT_SECRET]' '[YOUR_CALLBACK_URL]' '[YOUR_GOOGLEAPI_KEY]'# Settimg up prod config for first time use
npm run prod
```

To [lint](http://javascriptlint.com/) the source code:
```bash
npm run lint # eslint with Javascript Standard Style for frontend code
npm run standard # eslint with Javascript Standard Style for backend code
```

Optional Environment Variables, leave them empty for default values:
- FORGE_AUTH_URL
- FORGE_TOKEN_URL
- TOKENFLEX_PATH
- TOKENFLEX_API_HOST
- LOGOUTACCOUNT_URL
- VUE_HOST

### Deployment

To deploy this application to [Heroku](https://heroku.com/), make sure the following [config vars](https://devcenter.heroku.com/articles/config-vars) are set up correctly:
- *FORGE_CLIENT_ID*
- *FORGE_CLIENT_SECRET*
- *FORGE_CALLBACK_URL*
- *GoogleAPIKey*

And **FORGE_CALLBACK_URL** must follow the pattern below and match the one set for your Forge APP:
 ```
 <nameofyourapp>.herokuapp.com/api/forge/oauth
 ```

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/mazerab/consumption-reporting-vue-koa-app)

Watch [this video](https://www.youtube.com/watch?v=Oqa9O20Gj0c) on how to deploy samples to Heroku.

### Further Reading

Documentation:

* [Authentication API](https://forge.autodesk.com/en/docs/oauth/v2/developers_guide/overview/)

Tutorials:

Blogs:

* [Forge Blog](https://forge.autodesk.com)

Other samples:

* [Python script](https://github.com/mazerab/forge-consumption-reporting-sample) to download usage data to CSV file

For any questions regarding this sample or the technologies involved, ask a question on [Stack Overflow](https://stackoverflow.com/questions/ask?tags=%5bautodesk-forge,forge-tokenflex) or email to <a href="mailto:forge.help@autodesk.com?subject=Question on Tokenflex&body=Just have a question regarding the tokenflex-reporting-python-script sample: ">Autodesk Forge Developer Advocates</a>.

### License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.


### Authors

- Bastien Mazeran [@BastienMazeran](https://twitter.com/BastienMazeran)
- Bryan Huang [@LinkedIn](https://linkedin.com/in/bryan-huang-1447b862)

See more at [Forge blog](https://forge.autodesk.com/blog).
