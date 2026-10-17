# Android build guide

Penny Pilot shares its React/TypeScript code with the website through Capacitor. The checked-in `android/` project targets API 24+ (Android 7), compile/target API 36, and JDK 21. SQLite, Filesystem, and Share are native plugins. `android:allowBackup="true"` permits Android's backup service, subject to device/account policy; actual backup/restore still requires device validation.

## On a development machine

Install JDK 21 and the Android SDK using Android Studio or Google's official CLI. Install platform 36 and build-tools 35.0.0 and 36.0.0. Accept the applicable SDK licence in the supported installer. Configure your real SDK path via `ANDROID_HOME` or the ignored `android/local.properties`.

```sh
npm ci
npm run android:sync
cd android
./gradlew --no-daemon --max-workers=4 assembleDebug
```

The debug APK is `android/app/build/outputs/apk/debug/app-debug.apk`. A debug APK is an installable test artifact, not a production release. Install on an attached test device with `adb install -r <apk>`.

## This cloud machine

The official Android CLI archive was downloaded using TLS and checked against the checksum in Google's SDK manifest. SDK, build tools, and caches live outside the checkout:

```sh
source /workspace/.tools/android-env.sh
cd /workspace/PennyPilot
npm run android:sync
```

Java/Gradle does not automatically use this machine's HTTPS proxy environment variable. The cloud build helper parses the existing unauthenticated proxy and passes host/port as JVM properties without extracting credentials. The downloaded JDK uses `/etc/ssl/certs/java/cacerts`, the machine’s managed CA trust store, so the existing egress proxy remains trusted. TLS and artifact verification remain enabled. The Gradle wrapper is pinned with the official distribution SHA-256.

```sh
python scripts/build-android.py
```

The helper is cloud-compatible but also works without a proxy on an ordinary developer machine. `GRADLE_USER_HOME` and `ANDROID_USER_HOME` keep writable caches/keys in the intended locations. Do not commit debug or release keystores.

## Production signing

Create or use the product owner's upload key in Android Studio and configure release signing through secure local Gradle properties or CI secrets. Do not put key passwords into source, chat, or cloud install scripts. Build `bundleRelease` for Play and `assembleRelease` for a distributable signed APK. Verify package identity `in.pennypilot.learn`, certificate fingerprint, version code, supported API levels, and 16 KB page compatibility on target devices before release.

No production keystore was supplied, so a production-signed APK/AAB must not be claimed as shipped.

## Device release gates

- Cold start and sustained scrolling on a real 2 GB Android 7+ device; measure rather than assume 60 fps or <3 seconds.
- Kill the app after an answer and resume the exact saved state.
- Exercise SQLite writes and migration; export through Share, import through the file picker.
- Verify Auto Backup and transfer/reinstall recovery under an eligible Google account.
- Test TalkBack, font scaling, motion preferences, status/navigation insets, and Hindi font rendering.
- Confirm a full lesson and all calculators work in airplane mode immediately after installation.
- Test permission denial and a cancelled native share action.
