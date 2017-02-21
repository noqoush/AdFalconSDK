//
//  AdFalconSDK.h
//  AdFalconSDK
//
//  Created by Emad Jabareen on 2/19/17.
//  Copyright © 2017 Noqoush Mobile Media Group. All rights reserved.
//

#import <UIKit/UIKit.h>


//! Project version number for AdFalconSDK.
FOUNDATION_EXPORT double AdFalconSDKVersionNumber;

//! Project version string for AdFalconSDK.
FOUNDATION_EXPORT const unsigned char AdFalconSDKVersionString[];

// In this header, you should import all the public headers of your framework using statements like #import <AdFalconSDK/PublicHeader.h>


//Info
#import "ADFUserInfo.h"
#import "ADFTargetingParams.h"

//Banner
#import "ADFAdView.h"
#import "ADFAdViewDelegate.h"

//Interstitial
#import "ADFInterstitialAd.h"
#import "ADFInterstitialAdDelegate.h"

//Native Ads
#import "ADFNativeAdBase.h"
#import "ADFNativeAd.h"
#import "ADFNativeAdBinder.h"
#import "ADFNativeAdDelegate.h"
#import "ADFNativeAdTemplate.h"
