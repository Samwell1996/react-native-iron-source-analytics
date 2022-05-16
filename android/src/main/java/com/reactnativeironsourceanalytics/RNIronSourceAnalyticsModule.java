package com.reactnativeironsourceanalytics;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ironsource.analyticssdk.IronSourceAnalytics;
import com.ironsource.analyticssdk.userInfo.ISAnalyticsMetadata;
import com.ironsource.analyticssdk.userInfo.ISAnalyticsMetadataKey;
import com.ironsource.analyticssdk.impressionData.ISAnalyticsMediationName;
import com.ironsource.analyticssdk.userPrivacy.ISAnalyticsPrivacyRestriction;
import com.ironsource.analyticssdk.appActivity.ISAnalyticsUserActivity;
import com.ironsource.analyticssdk.userPrivacy.ISAnalyticsReason;

import org.json.JSONObject;

import java.util.ArrayList;

public class RNIronSourceAnalyticsModule extends ReactContextBaseJavaModule {
    public static final String TAG = "RNIronSourceAnalytics";

    public RNIronSourceAnalyticsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void initialize(final String appId, final Promise promise) {
      new Handler(Looper.getMainLooper()).post(new Runnable() {
        @Override
        public void run() {
          try {
            Activity activity = getCurrentActivity();
            IronSourceAnalytics.init(activity, appId);
            promise.resolve(null);
          } catch(Exception e) {
            promise.reject("Initialization failed", e);
          }
        }
      });
    }

    @ReactMethod
    public void setAppUserId(final String userId, final Promise promise) {
      new Handler(Looper.getMainLooper()).post(new Runnable() {
        @Override
        public void run() {
          try {
            IronSourceAnalytics.setAppUserId(userId);
            promise.resolve(null);
          } catch(Exception e) {
            promise.reject("setAppUserId failed", e);
          }
        }
      });
    }

    @ReactMethod
    public void setUserInfo(final Boolean isLogin, final Boolean isAchievement, final Boolean isGender, final String typeLogin, final Boolean isSubscribed, final String achievement, final String gender, final Boolean isIAPUser, final Boolean isAge, final Integer age, final Promise promise) {
      new Handler(Looper.getMainLooper()).post(new Runnable() {
        @Override
        public void run() {
           try {
              ArrayList<ISAnalyticsMetadata> metadataList = new ArrayList<>();
              metadataList.add(new ISAnalyticsMetadata(ISAnalyticsMetadataKey.IS_SUBSCRIBED, isSubscribed));
              metadataList.add(new ISAnalyticsMetadata(ISAnalyticsMetadataKey.IAP_USER, isIAPUser));

              if(isAchievement) {
                metadataList.add(new ISAnalyticsMetadata(ISAnalyticsMetadataKey.ACHIEVEMENT, achievement));
              }

              if(isGender) {
                metadataList.add(new ISAnalyticsMetadata(ISAnalyticsMetadata.GENDER.valueOf(gender)));
              }

              if(isLogin) {
                metadataList.add(new ISAnalyticsMetadata(
                ISAnalyticsMetadata.LOGIN_TYPE_VALUE.valueOf(typeLogin)));
              }

              if(isAge) {
                metadataList.add(new ISAnalyticsMetadata(ISAnalyticsMetadataKey.AGE, age));
              }

              IronSourceAnalytics.setUserInfo(metadataList);
              IronSourceAnalytics.setUserPrivacy(ISAnalyticsPrivacyRestriction.RESTRICTED_DATA, true, ISAnalyticsReason.COPPA);
              promise.resolve(null);
            } catch(Exception e) {
              promise.reject("setUserInfo failed", e);
          }
        }
      });
    }

    @ReactMethod
    public void setImpressionData(final String impressionData, final Promise promise) {
      new Handler(Looper.getMainLooper()).post(new Runnable() {
        @Override
        public void run() {
          try {
            JSONObject getAll = new JSONObject(impressionData);

            IronSourceAnalytics.updateImpressionData(ISAnalyticsMediationName.IRONSOURCE, getAll);
            promise.resolve(null);
          } catch(Exception e) {
            promise.reject("setImpressionData failed", e);
          }
        }
      });
    }

    @ReactMethod
    public void logEvent(final String key, final String value, final Promise promise) {
      new Handler(Looper.getMainLooper()).post(new Runnable() {
        @Override
        public void run() {
          try {
            ISAnalyticsUserActivity clanActivity = new ISAnalyticsUserActivity(key).property(value);
            IronSourceAnalytics.updateCustomActivity(clanActivity);

            promise.resolve(null);
          } catch(Exception e) {
            promise.reject("logEvent failed", e);
          }
        }
      });
    }
}
