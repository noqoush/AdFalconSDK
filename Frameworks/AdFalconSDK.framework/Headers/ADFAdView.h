//
//  ADFAdView.h
//  AdFalcon SDK
//
//  Created by Noqoush
//  Copyright 2011 Noqoush. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ADFTargetingParams.h"
#import "ADFAdViewDelegate.h"

/*
 *life cycle 
 */
typedef enum
{
    kADFAdViewStoped = 0 ,
    kADFAdViewRunning,
    kADFAdViewDisplaySlides,
    kADFAdViewDisplayScreen,
    kADFAdViewLeaveApp,
    kADFAdViewLoading,
    kADFAdViewPause,
    kADFAdViewFail
}ADFAdViewStatus;

typedef enum
{
    kADFAdViewAnimationTypeNone = 0,
    kADFAdViewAnimationTypeTranslationYUpDown ,
    kADFAdViewAnimationTypeTranslationYDownUp,
    kADFAdViewAnimationTypeTranslationXLeftRight,
    kADFAdViewAnimationTypeTranslationXRightLeft,
    kADFAdViewAnimationTypeScaleX,
    kADFAdViewAnimationTypeScaleY
    
}ADFAdViewAnimationType;

typedef enum{
    //kADFAdViewAdUnitSize320x48 deprecated
    //kADFAdViewAdUnitSizeInterstitial deprecated
    kADFAdViewAdUnitSize320x50 = 0,
    kADFAdViewAdUnitSize300x250,
    kADFAdViewAdUnitSize468x60,
    kADFAdViewAdUnitSize728x90,
    kADFAdViewAdUnitSize120x600,
    //NEW with MRAID
    kADFAdViewAdUnitSizeAutoBanner,
    kADFAdViewAdUnitSize320x480,
    kADFAdViewAdUnitSize768x1024
}ADFAdViewAdUnitSize;

typedef enum{
    kADFAdViewErrorInternalServer = -1,
    kADFAdViewErrorNoAdAvailabe = 1,
    kADFAdViewErrorInvalidParam = 2,
    kADFAdViewErrorMissingParam = 3,
    kADFAdViewErrorGenericSDK = 4,
    kADFAdViewErrorCommunication = 5,
    kADFAdViewErrorInterstitialAlreadyUsed = 6
}ADFAdViewError;



enum {
    kADFAdViewPlacementTypeUnknown = 0,
    kADFAdViewPlacementTypeInline,
    kADFAdViewPlacementTypeInterstitial
};
typedef NSUInteger ADFAdViewPlacementType;

@class ADFAdViewManager;
@class ADFCashingManager;
@class ADFDeviceInfo;
@class MPMoviePlayerController;

@interface ADFAdView : UIView {
  
    NSString * siteId;
    int refreshDuration;
    float secondCount;
   // NSObject<ADFAdViewDelegate> * delegate;
    ADFAdViewAnimationType animationType;
    BOOL testing;
    BOOL logging;
    ADFAdViewStatus adViewStatus;
    @private
    BOOL enableActions;
    BOOL enableAutoRefresh;
    //BOOL forceStopTimers;
    BOOL forceAdViewStop;
    BOOL touched;
   // UIViewController* rootViewController;
    ADFAdViewAdUnitSize adUnitSize;
    ADFTargetingParams* targetingParams;
    ADFDeviceInfo * deviceInfo;
    ADFAdViewManager * adViewManager;
    ADFCashingManager * cashingManager;
    NSTimer * gifTimer;
    
    UIStatusBarStyle statusBarStyle;
    BOOL hideStatusBar;
    //Server settings
    int settingsDisableTestMode;
    int settingsEnableAutoRefresh;
    int settingsAutoRefreshDuration;
    
    UIButton *doubleclickButton;
    UIButton *doubleclickView;
    
    BOOL isBeaconImageDownloaded;
}

    
@property(readonly, nonatomic) ADFAdViewStatus adViewStatus;
@property(nonatomic) IBInspectable NSString * siteId;
@property(assign,   nonatomic) IBInspectable int refreshDuration;
@property(weak,   nonatomic) NSObject<ADFAdViewDelegate> * delegate;
@property(assign,   nonatomic) ADFAdViewAnimationType animationType;
@property(readonly, nonatomic) ADFAdViewAdUnitSize adUnitSize;
@property(assign,   nonatomic) IBInspectable BOOL testing;
@property(assign,   nonatomic) IBInspectable BOOL logging;
@property(assign,   nonatomic) IBInspectable BOOL autoLoading;



@property(readonly, nonatomic) ADFAdViewPlacementType placementType;
@property(nonatomic,retain) ADFTargetingParams* targetingParams;


/*
 Add adView to root view with specific size base on adUnitSize, and start getting ad from adfalcon network 
 */
-(void) initializeWithAdUnit:(ADFAdViewAdUnitSize) adUnit
                         siteId:(NSString*) siteId
                         params:(ADFTargetingParams*) params
             rootViewController:(UIViewController*) rootViewController
              enableAutorefresh:(BOOL) enableAutorefresh
                       delegate:(NSObject<ADFAdViewDelegate> *) delegate;


-(void) initializeWithPlacementType:(ADFAdViewPlacementType ) placementType
                             AdUnit:(ADFAdViewAdUnitSize) adUnit
                             siteId:(NSString*) siteId
                             params:(ADFTargetingParams*) params
                 rootViewController:(UIViewController*) rootViewController
                  enableAutorefresh:(BOOL) enableAutorefresh
                           delegate:(NSObject<ADFAdViewDelegate> *) delegate;

/*
 pause auto refresh timer, which responsible about getting ad
 */
-(void) pauseAutoRefresh;

/*
 resume auto refresh timer, which responsible about getting ad
 */
-(void) resumeAutoRefresh;

/*
 refresh the current ad
 */
-(void) refreshAd;

/*
 * this method is deprecated, we are going to leave it just in case a developer calls it by accident.
 */
-(void) dispose __attribute__((deprecated));

+(NSString*) adFalconSDKVersion;

@end
