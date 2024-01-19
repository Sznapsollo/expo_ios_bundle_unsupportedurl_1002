# expo_ios_bundle_unsupportedurl_1002
Repo simple example to reproduce 1002 unsupported URL with bundled ios - simu &amp; prod when copying database from assets to documentCache


All example is contained in App.js

- app tries to copy db (assets/test_database.db3) from assets to documentCache and display single information from db on screen (Hello)

- problem only applies to bundled ios for simulator or production

- for android & ios expo dev and for android production all works great


db3 extension has been added to assetsExtx in metro.config.js

same result was with a bit older versions of packages (these below are in my origin project). This repo was clean created so versions are slightly newer but still result is exactly same.
```
"expo": "~49.0.15",
"expo-asset": "^8.10.1",
"expo-file-system": "^15.6.0",
"expo-font": "~11.4.0",
"expo-sqlite": "^11.6.0",
"expo-status-bar": "~1.6.0",

```
