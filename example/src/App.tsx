import * as React from 'react';

import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { IronSourceAnalytics } from 'react-native-iron-source-analytics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    width: 60,
    height: 60,
    backgroundColor: 'blue',
  },
  touchable2: {
    width: 60,
    height: 60,
    backgroundColor: 'yellow',
  },
});

const App = () => {
  const APP_KEY = Platform.OS === 'android' ? '10d75fdcd' : '1100aed35';

  const init = async () => {
    await IronSourceAnalytics.setUserId('APP_USER_ID');
    await IronSourceAnalytics.setUserInfo({
      isSubscribed: true,
      achievement: 'Beginner',
      typeLogin: 'GOOGLE',
      isIAPUser: true,
      gender: 'FEMALE',
    });
    await IronSourceAnalytics.init(APP_KEY);
  };

  React.useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={setImpressionData} />
      <TouchableOpacity style={styles.touchable2} onPress={setCustomLogEvent} />
    </View>
  );
};

export default App;
