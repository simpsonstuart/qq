# Build

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

```bash
gulp build
cordova build ios --device --debug

```

If you have issues, try removing and adding the platform back in.

```bash
cordova platform remove ios
cordova platform add ios
```