# Quick Questions Front-end

## Environment Variables

See `.env.json.example`.  Rename or move to `.env.json`

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

**You might have to perform "nvm use stable" on every new terminal.**  Once node is installed, navigate to the directory of this repository's source and perform the following commands to install this project's dependencies:

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

More research still needs to be done on what specifically is committed to the repository for a Cordova project, but if you're getting errors during initial run about this project not being a Cordova project, then try running the following commands and see if it fixes the issue:

```sh
cordova platform remove browser
cordova platform add browser
```

There may be a better way to do this, but it should install all of the files that it needs to successfully run the project.

Note that any change will not immediately be reflected, and that you'll have to cancel and run the "cordova browser run" command again to see the changes.  Soon, Browsersync will be implemented to mitigate this issue, though it may be a good idea to periodically refresh anyway.

## Style Guide

### Angular

* See [John Papa's](https://github.com/johnpapa/angular-styleguide) style guide
