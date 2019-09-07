cd android && ./gradlew clean && ./gradlew assembleRelease && open app/build/outputs/apk/release && adb install -r app/build/outputs/apk/release/app-release.apk  && echo -ne '\007' && cd ..
