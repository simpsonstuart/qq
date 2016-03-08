# Build

Currently, we are using Cordova version `5.4.x`

Install [cordova-icon](https://www.npmjs.com/package/cordova-icon) by `npm install cordova-icon -g`

## Android

### HockeyApp

* [hockey app android sdk setu](http://support.hockeyapp.net/kb/client-integration-android/hockeyapp-for-android-sdk)
* `cordova plugin add cordova-plugin-hockeyapp`
* You need to [sign the app](https://cordova.apache.org/docs/en/dev/guide/platforms/android/#signing-an-app) before you upload
    * `keytool -genkey -v -keystore [keystore_name].keystore -alias [alias_name] -keyalg RSA -keysize 2048 -validity 10000`
* In order for the build to be signed, you need a `release-signing.properties` file in the `APPFOLDER\platforms\android` folder
    * You can review [how to set gradle properties here](https://cordova.apache.org/docs/en/dev/guide/platforms/android/#setting-gradle-properties)

### Environment Setup
  * [Cordova Android Setup Guide](https://cordova.apache.org/docs/en/5.4.0/guide/platforms/android/index.html)
    * You will need to Download the [Android-SDK](http://developer.android.com/sdk/installing/index.html?pkg=tools) or [Android Studio](http://developer.android.com/sdk/index.html)
        * If using the Android-SDK, you will need to also install [SDK Plugins](http://developer.android.com/sdk/installing/adding-packages.html)
       
  * `cordova platform add android`
  
  * If you are on Ubuntu, [you need to install the following packages](http://developer.android.com/sdk/installing/index.html?pkg=tools)
  
```shell
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install libncurses5:i386 libstdc++6:i386 zlib1g:i386
```
 
### Build

#### Release


```bash
gulp build
cordova-icon
cordova build android --release
```

#### Debug


```bash
gulp build
cordova-icon
cordova build android --debug
```

Then to run on a connected device: 

```bash
cordova run android --device
```


### Problems

If you run into problems, run: 

```shell
cordova platform remove android
cordova platform add android
```
  
### Environment Setup
  * [Cordova Android Setup Guide](https://cordova.apache.org/docs/en/5.4.0/guide/platforms/android/index.html)
    * You will need to Download the [Android-SDK](http://developer.android.com/sdk/installing/index.html?pkg=tools) or [Android Studio](http://developer.android.com/sdk/index.html)
        * If using the Android-SDK, you will need to also install [SDK Plugins](http://developer.android.com/sdk/installing/adding-packages.html)
       
  * `cordova platform add android`
  
  * If you are on Ubuntu, [you need to install the following packages](http://developer.android.com/sdk/installing/index.html?pkg=tools)
  
```shell
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install libncurses5:i386 libstdc++6:i386 zlib1g:i386
```
 
### Build

#### Release


```bash
gulp build
cordova-icon
cordova build android --release
```

#### Debug


```bash
gulp build
cordova-icon
cordova build android --debug
```


### Problems

If you run into problems, run: 

```shell
cordova platform remove android
cordova platform add android
```
  

## iOS

### App Store and TestFlight Deployment

If you are uploading to the App Store or Test Flight you will need to make sure that you have the code signing certificates and profiles downloaded
from the the Apple Developer site.

Make sure you bump the version number in `config.xml` when you push a new version.

Before you upload you may need to set the provisioning profile by clicking on the project in Xcode then clicking on the "Build Settings" tab.

Then use Application Uploader to upload the application.  This can be found in Xcode -> Open Developer Tool.

Once it is uploaded, you should be able to see it in iTunes Connect.

### Setup

0. Update the Mac
1. Install Xcode
2. You may need to update the Apple WWDC key.
   * Delete the expired key from the keychain
   * Download and add the new key to the keychain
3. Go to Xcode -> Preferences -> Accounts and add your Apple Id
    * **Note:** you must have access to add and generate a new CSR so that you can download and install a signing key pair.
    You do this by loging into your apple developer account online.
    * If you do not have access, you need to contact the admin to get priviledges.

4. Click on your Apple ID -> select the `Pixel and Line` team and click view details -> click `Download All`


### Build

#### Release

#### Debug

```bash
gulp build
cordova build ios --device --debug

```


### Problems

If you have issues, try removing and adding the platform back in.

```bash
cordova platform remove ios
cordova platform add ios
```
