import os

bundle = "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res"
output = '''curl "http://localhost:8081/index.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"'''
assebleDebug = "cd android && ./gradlew clean assembleDebug"


os.system(bundle)
os.system(output)
os.system(assebleDebug)
