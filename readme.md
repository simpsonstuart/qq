# Quick Questions Front-end

* [Build Documentation](documentation/build.md)
* [Workflow](documentation/workflow.md)

## Environment Variables

See `.env.json.example`.  Rename or move to `.env.json`

Acceptable values for `PLATFORM` are: "web, ios, android".
Acceptable values for `ENVIRONMENT` are: "dev, production".

**If you add an environment variable,** you will need to add it to the `.env.json`, the `AppConfig` in `app.module.js`, **and**
the `make-env-json-file.py`.

The `make-env-json-file.py` is to grab the environment variables from the build server.

These variables are injected by the build system into Angular.  Two of them, `ENV` and `PLATFORM`, are injected directly onto the root object (`window`).

## Dev Environment

The build in the gulp file is dependent upon the `PLATFORM` environment variable in `.env.json`.

Ensure node/npm is installed using nvm.

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

```sh
source ~/.bashrc
nvm install 4.3
nvm use 4.3
```

**You might have to perform "nvm use 4.3" on every new terminal.**  Once node is installed, navigate to the directory of this repository's source and perform the following commands to install this project's dependencies:

```sh
npm install
npm install -g cordova@5.4.* gulp-cli
```

### Running the Project

To run the project, simply initate gulp, and Browsersync will serve it from the Cordova browser platform.

```sh
gulp
```
InAppBrowser also needs to be added to cordova via the command below

```sh
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add cordova-universal-links-plugin
cordova plugin add cordova-plugin-statusbar
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
