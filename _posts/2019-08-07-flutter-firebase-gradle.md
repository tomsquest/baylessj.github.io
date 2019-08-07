---
layout: post
tags: [flutter, programming, android]
categories: []
#date: 2019-06-25 13:14:15
#excerpt: ''
#image: 'BASEURL/assets/blog/img/.png'
#description:
#permalink:
title: 'Gradle Configuration for Firebase Usage in Flutter'
---

I recently got started developing a cross-platform app in [Flutter](https://flutter.dev/), a framework developed by Google that uses the [Dart](https://dart.dev/) programming language. One major benefit of the fact that Flutter is created by Google is the _mostly_ easy integration with Google's other services. I have come across one minor exception to this rule in my attempt to integrate [Firebase](https://firebase.google.com/) with my Flutter project.

# Original Gradle Modifications

I followed along with Google's guide on modifying my app's [Gradle](https://gradle.org/) configuration files to integrate Firebase services into the app. It may seem obvious to people who have used Gradle before, but as a complete newbie to the tool I quickly ran into a few issues that were solved by paying better attention to which modifications were supposed to the be made to the `android` directory's Gradle config and which modifications were to be made to the `android/app` directory's Gradle config.

My Gradle config files after implementing the Google guide's changes were as follows:

`./android/`:

```
buildscript {
    repositories {
        google()
        jcenter()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:3.2.1'
        classpath 'com.google.gms:google-services:4.3.0'
    }
}

allprojects {
    repositories {
        google()
        jcenter()
    }
}

rootProject.buildDir = '../build'
subprojects {
    project.buildDir = "${rootProject.buildDir}/${project.name}"
}
subprojects {
    project.evaluationDependsOn(':app')
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

`./android/app/`:

```
def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withReader('UTF-8') { reader ->
        localProperties.load(reader)
    }
}

def flutterRoot = localProperties.getProperty('flutter.sdk')
if (flutterRoot == null) {
    throw new GradleException("Flutter SDK not found. Define location with flutter.sdk in the local.properties file.")
}

def flutterVersionCode = localProperties.getProperty('flutter.versionCode')
if (flutterVersionCode == null) {
    flutterVersionCode = '1'
}

def flutterVersionName = localProperties.getProperty('flutter.versionName')
if (flutterVersionName == null) {
    flutterVersionName = '1.0'
}

apply plugin: 'com.android.application'
apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"

android {
    compileSdkVersion 28

    lintOptions {
        disable 'InvalidPackage'
    }

    defaultConfig {
        applicationId "com.jonathanbayless.autodo"
        minSdkVersion 16
        targetSdkVersion 28
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig signingConfigs.debug
        }
    }
}

flutter {
    source '../..'
}

dependencies {
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
}

apply plugin: 'com.google.gms.google-services'  // Google Play services Gradle plugin
```

# Too many methods for one Dex file

After I was done making a number of silly mistakes due to not reading through the Google with enough care I was met with a build error that was not addressed in the Google guide. The addition of the `google-services` package inflated the size of the built project to the point that it exceeded the number of methods allowed in a single `.dex` file.

# todo: add an explanation on what a dex file is

The solution I found to this error consisted of two changes: enabling a build flag regarding the `.dex` generation and changing the target Android SDK.

I added the following lines:

```
multiDexEnabled true
```

```
shrinkResources true
minifyEnabled true
```

Working `./android/app/` config file:

```
def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withReader('UTF-8') { reader ->
        localProperties.load(reader)
    }
}

def flutterRoot = localProperties.getProperty('flutter.sdk')
if (flutterRoot == null) {
    throw new GradleException("Flutter SDK not found. Define location with flutter.sdk in the local.properties file.")
}

def flutterVersionCode = localProperties.getProperty('flutter.versionCode')
if (flutterVersionCode == null) {
    flutterVersionCode = '1'
}

def flutterVersionName = localProperties.getProperty('flutter.versionName')
if (flutterVersionName == null) {
    flutterVersionName = '1.0'
}

apply plugin: 'com.android.application'
apply from: "$flutterRoot/packages/flutter_tools/gradle/flutter.gradle"

android {
    compileSdkVersion 28

    lintOptions {
        disable 'InvalidPackage'
    }

    defaultConfig {
        applicationId "com.jonathanbayless.autodo"
        minSdkVersion 16
        targetSdkVersion 28
        multiDexEnabled true
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig signingConfigs.debug
            shrinkResources true
            minifyEnabled true
        }
    }
}

flutter {
    source '../..'
}

dependencies {
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
}

apply plugin: 'com.google.gms.google-services'  // Google Play services Gradle plugin
```
