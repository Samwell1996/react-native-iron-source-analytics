#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

#import "IronSourceAnalytics/IronSourceAnalytics.h"
#import "React/RCTConvert.h"

@interface RNIronSourceAnalytics : NSObject <RCTBridgeModule>

@end
