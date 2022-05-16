#import "RNIronSourceAnalytics.h"

@implementation RNIronSourceAnalytics

RCT_EXPORT_MODULE()

// Initialize IronSourceAnalytics
RCT_EXPORT_METHOD(initialize:(NSString *)appId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject)
{
    NSLog(@"initializeIronSource called!! with key %@", appId);
    [IronSourceAnalytics initWithAppKey:appId];

    resolve(nil);
}

RCT_EXPORT_METHOD(setAppUserId:(NSString *)userId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject)
{
    NSLog(@"setAppUserId called!! with key %@", userId);
    [IronSourceAnalytics setUserId:userId];

    resolve(nil);
}

RCT_EXPORT_METHOD(setUserInfo:(BOOL)isLogin
                  isAchievement:(BOOL)isAchievement
                  isGender:(BOOL)isGender
                  typeLogin:(NSInteger)typeLogin
                  isSubscribed:(BOOL)isSubscribed
                  achievement:(NSString *)achievement
                  gender:(NSInteger)gender
                  isIAPUser:(BOOL)isIAPUser
                  isUserAge:(BOOL)isUserAge
                  age:(NSInteger)age
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject)
{
    NSMutableArray *userInfo = [NSMutableArray array];

    if(isIAPUser) {
        ISAnalyticsMetaData *userIAP = [[ISAnalyticsMetaData alloc] initWithMetaDataKey:ISAnalyticsMetaDataKey.IAP_USER boolValue:isIAPUser];

        [userInfo addObject:userIAP];
    }

    if(isSubscribed) {
        ISAnalyticsMetaData *userSubscribed = [[ISAnalyticsMetaData alloc] initWithMetaDataKey:ISAnalyticsMetaDataKey.IS_SUBSCRIBED boolValue:isSubscribed];
        [userInfo addObject:userSubscribed];
    }


    if(isGender) {
        ISAnalyticsMetaData *userGender = [[ISAnalyticsMetaData alloc] initWithGender: gender];

        [userInfo addObject:userGender];
    }

    if(isAchievement) {
        ISAnalyticsMetaData *userAchievement = [[ISAnalyticsMetaData alloc] initWithMetaDataKey:ISAnalyticsMetaDataKey.ACHIEVEMENT strValue:achievement];
        [userInfo addObject:userAchievement];
    }

    if(isLogin) {
        ISAnalyticsMetaData *userLoginType = [[ISAnalyticsMetaData alloc] initWithLoginType:typeLogin];
        [userInfo addObject:userLoginType];
    }

    if(isUserAge){
        ISAnalyticsMetaData *userAge = [[ISAnalyticsMetaData alloc] initWithMetaDataKey:ISAnalyticsMetaDataKey.AGE intValue:age];

        [userInfo addObject:userAge];
    }

    NSLog(@"setUserInfo called!! with key %@", userInfo);
    [IronSourceAnalytics setUserInfo:userInfo];

    [IronSourceAnalytics setUserPrivacy:ISAnalyticsPrivacyRestrictionRESTRICTED_DATA isRestricted:true withReason:ISAnalyticsReasonCOPPA];

    resolve(nil);
}

RCT_EXPORT_METHOD(setImpressionData:(NSString *)impressionData
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject)
{
    NSData *data = [impressionData dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *newData = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    [IronSourceAnalytics updateImpressionData:ISAnalyticsMediationNameIRONSOURCE withImpressionData:newData];
    resolve(nil);
}

RCT_EXPORT_METHOD(logEvent:(NSString *)key
                  value:(NSString *)value
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject)
{
    ISAnalyticsUserActivity *clanActivity = [[[ISAnalyticsUserActivity alloc] initWithName:key]property:value];
    [IronSourceAnalytics updateCustomActivity:clanActivity];
    resolve(nil);
}

@end
