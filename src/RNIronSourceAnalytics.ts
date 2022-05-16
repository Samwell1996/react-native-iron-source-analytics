import { NativeModules, Platform } from 'react-native';

/** Types =======================================================================**/

export type IGender = 'MALE' | 'FEMALE' | 'OTHER';
export type ITypeLogin = 'GOOGLE' | 'FACEBOOK' | 'APP' | 'OTHER' | 'EMAIL';

const TypeLoginIOS = {
  FACEBOOK: 0,
  GOOGLE: 1,
  EMAIL: 2,
  APP: 3,
  OTHER: 4,
};

const GenderIOS = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
};

/**
 * Native Module Type
 * Descriptions show the function names of native SDKs.
 */
type IronSourceNativeModuleType = {
  /** Base API =============================================================**/
  /**
   * Android: init
   *     iOS: init
   *
   * Use init
   */
  initialize(appKey: string): Promise<void>;

  /**
   * Android: setUserId
   *     iOS: setUserId
   *
   * When an empty string was passed as userId, SDK falls back to default.
   */
  setAppUserId(userId: string): Promise<void>;

  /**
   * Android: setUserInfo
   *     iOS: setUserInfo
   *
   * This API sets user information. This will enable you to analyze your app’s KPIs with the users’ attributes and get insights on how to  segment your users.
   * Use this API prior to init
   */
  setUserInfo(
    isLogin: boolean,
    isAchievement: boolean,
    isGender: boolean,
    typeLogin: ITypeLogin | number,
    isSubscribed: boolean,
    achievement: string,
    gender: string | number,
    isIAPUser: boolean,
    isAge: boolean,
    age: number
  ): Promise<void>;

  /**
   * Android: setUserId
   *     iOS: setUserId
   *
   * ironSource App Analytics provides analysis of the application revenue from ads. The analysis is performed based on the impression data available via the relevant callback from your ad mediation.
   * ironSource App Analytics only supports the ironSource impression data
   */
  setImpressionData(JSON: string): Promise<void>;

  /**
   * Android: logEventFunction set custom api
   *     iOS: logEventFunction set custom api
   *
   */
  logEvent(key: string, value: string): Promise<void>;
};

/**
 * These are needed since ReactNative NativeModules does not support function overload or optional arguments.
 * Modules react native objects
 */

interface setUserInfoRNModule {
  isSubscribed?: boolean;
  achievement?: string;
  typeLogin?: ITypeLogin;
  gender?: IGender;
  isIAPUser?: boolean;
  age?: number;
}

/**
 * These are needed since ReactNative NativeModules does not support function overload or optional arguments.
 */
type InitFunction = (appKey: string) => Promise<void>;
type setUserFunction = (userId: string) => Promise<void>;
type setUserInfoFunction = ({
  isSubscribed,
  achievement,
  typeLogin,
  gender,
  isIAPUser,
  age,
}: setUserInfoRNModule) => Promise<void>;
type setImpressionDataFunction = (JSON: string) => Promise<void>;
type logEventFunction = (key: string, value: string) => Promise<void>;

type IronSourceAnalyticsType = {
  /**
   * Android: init
   *     iOS: init
   */
  init: InitFunction;

  /**
   * Android: setUserId
   *     iOS: setUserId
   */
  setUserId: setUserFunction;

  /**
   * Android: setUserInfo
   *     iOS: setUserInfo
   *
   * This API sets user information. This will enable you to analyze your app’s KPIs with the users’ attributes and get insights on how to segment your users.
   * Use this API prior to init
   */
  setUserInfo: setUserInfoFunction;

  /**
   * Android: setImpressionData
   *     iOS: setImpressionData
   *
   * ironSource App Analytics provides analysis of the application revenue from ads. The analysis is performed based on the impression data available via the relevant callback from your ad mediation.
   */
  setImpressionData: setImpressionDataFunction;

  /**
   * Android: logEventFunction set custom api
   *     iOS: logEventFunction set custom api
   *
   */
  logEvent: logEventFunction;
};

/** Module  =======================================================================**/

const { RNIronSourceAnalytics } = NativeModules;
const IronSourceNativeModule: IronSourceNativeModuleType =
  RNIronSourceAnalytics;

const init: InitFunction = async (appId: string): Promise<void> => {
  return IronSourceNativeModule.initialize(appId);
};

const setUserId: setUserFunction = async (userId: string): Promise<void> => {
  return IronSourceNativeModule.setAppUserId(userId);
};

const setUserInfo: setUserInfoFunction = async ({
  isSubscribed,
  achievement,
  typeLogin,
  gender,
  isIAPUser,
  age,
}): Promise<void> => {
  const isAndroid = Platform.OS === 'android';

  const currentLogin = isAndroid
    ? typeLogin || 'APP'
    : TypeLoginIOS[typeLogin || 'APP'];

  const currentGender = isAndroid
    ? gender || 'FEMALE'
    : GenderIOS[gender || 'FEMALE'];

  return IronSourceNativeModule.setUserInfo(
    !!typeLogin,
    !!achievement,
    !!gender,
    currentLogin,
    !!isSubscribed,
    achievement || '',
    currentGender,
    !!isIAPUser,
    !!age,
    age || 0
  );
};

const setImpressionData: setImpressionDataFunction = async (JSON: string) => {
  await IronSourceNativeModule.setImpressionData(JSON);
};

const logEvent: logEventFunction = async (key: string, value: string) => {
  await IronSourceNativeModule.logEvent(key, value);
};

/**
 * Exposed Module
 */
const mergedModule: IronSourceAnalyticsType = {
  init,
  setUserId,
  setUserInfo,
  setImpressionData,
  logEvent,
};

export const IronSourceAnalytics: Readonly<IronSourceAnalyticsType> =
  Object.freeze(mergedModule);
