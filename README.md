# react-native-iron-source-analytics

iron-source-analytics

## Installation

yarn install or npm install

cd ios && pod install

## Platform Setup

### Android

Follow [ironSource Knowledge Center](https://developers.ironsrc.com/ironsource-mobile/android/android-sdk/) Android integration guide for required settings.

### Gradle Repository Required

ironSource's maven url must be added to your PROJECT_ROOT/android/build.gradle.

```groovy
// PROJECT_ROOT/android/build.gradle
...
allprojects {
    repositories {
        ...
        maven { url 'https://android-sdk.is.com/' }
    }
}
...

```

## Usage

```js
import { IronSourceAnalytics } from 'react-native-iron-source-analytics';

// ...

const init = async () => {
  await IronSourceAnalytics.setUserId('APP_USER_ID');
  await IronSourceAnalytics.setUserInfo({
    isSubscribed: true,
    achievement: 'Beginner',
    typeLogin: 'GOOGLE',
    isIAPUser: true,
    gender: 'FEMALE',
    age: 18,
  });
  await IronSourceAnalytics.init(APP_KEY);
};

init();

//this function better to use from listener in mediation iron-source
//https://developers.is.com/ironsource-mobile/android/ad-revenue-measurement-integration/#step-1 - Android
//https://developers.is.com/ironsource-mobile/ios/ad-revenue-measurement-integration/#step-1 - IOS
const setImpressionData = async () => {
  await IronSourceAnalytics.setImpressionData(
    JSON.stringify({
      instanceId: '5272344',
      country: 'UA',
      ab: 'A',
      auctionId: 'dc9062c1-d551-11ec-ad2d-614a9b77c7fd_278942700',
      adNetwork: 'ironsource',
      adUnit: 'rewarded_video',
      placement: 'DefaultRewardedVideo',
      revenue: 0.00091,
      precision: 'BID',
      instanceName: 'Bidding',
      lifetimeRevenue: 0.00446,
    })
  );
};

const setCustomLogEvent = async () => {
  await IronSourceAnalytics.logEvent('event1', 'my custom event');
};
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## Support

Please support Ukraine! STOP WAR!!!
https://bank.gov.ua/ua/about/support-the-armed-forces
