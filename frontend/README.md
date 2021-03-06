# frontend

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [NVM] (https://github.com/creationix/nvm) + Version 8 of Node.js

## Installation

* `nvm install 8`
* `npm install -g ember-cli`
* `cd frontend`
* `yarn install`

## Running / Development
With Mirage Fixtures:

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

With Running Backend:

* `ember server --proxy=http://localhost:3000`
* Visit your app at [http://localhost:4200](http://localhost:4200).


### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

#### Test Server

During development run ember test server `bin/frontend-tests.sh server` and access it by webbrowser: http://localhost:7357.
For debuging add `this.pauseTest()` at the according line in the test file.

#### Console

* `rake spec:frontend:serve` (from skills)[See skills/README.md](https://github.com/puzzle/skills/blob/master/README.md)
* `ember test` (from frontend, acceptance tests are failing)
* `ember test --server`

Run a single frontend test:

* `ember test --filter="test's title"` or enter required filter in ember test server frontend

### Building

* `ember build` (development)
* `ember build --environment production` (production)
* [ember.js](https://emberjs.com/)
### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
