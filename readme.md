# Quick Questions Front-end

## Environment Variables

See `.env.json.example`.  Rename or move to `.env.json`

**If you add an environment variable,** you will need to add it to the `.env.json`, the `AppConfig` in `qq-app.js`, **and**
the `make-env-json-file.py`.

The `make-env-json-file.py` is to grab the environment variables from the build server.

## Dev Environment

The build in the gulp file is dependent upon the `PLATFORM` environment variable in `.env.json`.   Acceptable values are: "web, ios, android"

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

To run the project, simply initate gulp, and Browsersync will serve it from the Cordova browser platform.

```sh
gulp
```

More research still needs to be done on what specifically is committed to the repository for a Cordova project, but if you're getting errors during initial run about this project not being a Cordova project, then try running the following commands and see if it fixes the issue:

```sh
cordova platform remove browser
cordova platform add browser
```

There may be a better way to do this, but it should install all of the files that it needs to successfully run the project.

## Style Guide

### Angular

* See [John Papa's](https://github.com/johnpapa/angular-styleguide) style guide
