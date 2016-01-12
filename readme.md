# Quick Questions Front-end

## Dev Environment

Note that for now, the API reference in the code points to a static location, which is the url dev API.  Eventually, environment-specific configuration will be implemented using the build system.

Ensure node/npm is installed using nvm.

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
```
then

```sh
source ~/.bashrc
nvm install stable
nvm use stable
```

You might have to perform "nvm use stable" on every new terminal.  Once node is installed, navigate to the directory of this repository's source and perform the following commands to install this project's dependencies:

```sh
npm install
npm install -g cordova gulp-cli
```

### Running the Project

To run the project, you'll need to first navigate to the project source and start the gulp watch, then (in another terminal) run the browser platform for Cordova.  It is possible to develop using a typical server for the static HTML, but there are Cordova-specific items that may need to be tested in an actual Cordova environment.

```sh
gulp
```
Then, in another terminal:
```sh
cordova browser run
```

Note that any change will not immediately be reflected, and that you'll have to cancel and run the "cordova browser run" command again to see the changes.  Soon, Browsersync will be implemented to mitigate this issue, though it may be a good idea to periodically refresh anyway.

## Style Guide

### Angular

* See [John Papa's](https://github.com/johnpapa/angular-styleguide) style guide
