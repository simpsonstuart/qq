REMOTE="origin"
BRANCH="master"

git fetch --all
git reset --hard $REMOTE/$BRANCH
git pull --rebase $REMOTE $BRANCH
npm install
gulp build
cordova emulate ios --target="iPad-Air" 
