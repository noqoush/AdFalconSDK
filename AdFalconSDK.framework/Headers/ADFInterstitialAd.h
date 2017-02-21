//
//  ADFAdView.h
//  AdFalcon SDK
//
//  Created by Noqoush
//  Copyright 2011 Noqoush. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ADFAdView.h"
#import "ADFInterstitialAdDelegate.h"
#import "ADFTargetingParams.h"

@class ADFInterstitialAdViewController;
@interface ADFInterstitialAd : NSObject {
    ADFAdView * interstitialView;
    ADFTargetingParams * targetingParams;
    ADFInterstitialAdViewController * interstitialViewController;
    NSString * siteId;
    //NSObject<ADFInterstitialAdDelegate> * delegate;
    BOOL testing;
    BOOL logging;
    BOOL isReadyToPresent;
    BOOL isLoading;
    BOOL didClickAtBanner;
    int errorCode;
    NSString * description;
    BOOL isPresent;
    BOOL _statusBarHidden ;
    BOOL isUsed;
}

/*
 *this property is used to set extra targeting parameters
 */
@property (nonatomic, strong) ADFTargetingParams * targetingParams;

/*
 *this property is used to check if an ad is loaded successfully and ready to present
 */
@property (nonatomic, readonly) BOOL isReadyToPresent;

/*
 *this property is used to assign interstitial delegate
 */
@property (nonatomic, weak) NSObject<ADFInterstitialAdDelegate> * delegate;

/*
 *this property is used to assign the request as testing mode or production mode
 */
@property (nonatomic, assign) BOOL testing;
/*
 *this property is used to assign the logging mode 
 */
@property(nonatomic, assign) BOOL logging;

/*
 *this property is used to set the site ID
 */
@property (nonatomic, retain) NSString * siteId;

/*
 *this method is used to load new interstitial ad but you must fill the required properties (siteId and delegate) before calling this method
 */
-(void) loadInterstitial;

/*
 *this method is used to load new interstitial with required parameters which are site id and delegate
 */
-(void) loadInterstitialWithSiteID:(NSString*) siteID delegate:(NSObject<ADFInterstitialAdDelegate> *) delegate;

/*
 *this method is used to load new interstitial with full parameters
 *note: before uploading your application to apple store you have to change the testing flag to false
 */
-(void) loadInterstitialWithSiteID:(NSString*) siteID testing:(BOOL) testing delegate:(NSObject<ADFInterstitialAdDelegate> *) delegate
                            params:(ADFTargetingParams*) params;
/*
 *this method is used to present the interstitial from specified root view controller
 *you have to call this method when delegate fire adfInterstitialDidLoadAd method.
 */
-(void) presentFromRootViewController:(UIViewController*) rootViewController;

@end
