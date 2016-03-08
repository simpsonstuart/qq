# Android

### HockeyApp

* [hockey app android sdk setup](http://support.hockeyapp.net/kb/client-integration-android/hockeyapp-for-android-sdk)
* You need to [sign the app](https://cordova.apache.org/docs/en/dev/guide/platforms/android/#signing-an-app) before you upload
    * `keytool -genkey -v -keystore traqq.keystore -alias traqq -keyalg RSA -keysize 2048 -validity 10000`
* In order for the build to be signed, you need a `release-signing.properties` file in the `APPFOLDER\platforms\android` folder
    * You can review [how to set gradle properties here](https://cordova.apache.org/docs/en/dev/guide/platforms/android/#setting-gradle-properties)
    * [More information on building for release](http://ionicframework.com/docs/guide/publishing.html)

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
  
