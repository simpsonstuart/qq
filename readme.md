# Quick Questions Front-end

* [Build Documentation](documentation/build.md)
* [Workflow](documentation/workflow.md)
* [Environment Variables](documentation/environment-variables.md)
* [Style Guides](documentation/style-guides.md)



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

### Plugins to install

```sh
cordova plugin add cordova-plugin-inappbrowser
cordova plugin add cordova-universal-links-plugin
cordova plugin add cordova-plugin-statusbar
cordova plugin add ./custom-plugins/plist-additions
```

### Running the Project

To run the project, simply initate gulp, and Browsersync will serve it from the Cordova browser platform.

```sh
gulp
```
