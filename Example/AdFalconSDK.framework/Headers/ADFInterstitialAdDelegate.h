//
//  ADFAdView.h
//  AdFalcon SDK
//
//  Created by Noqoush
//  Copyright 2011 Noqoush. All rights reserved.
//

#import <Foundation/Foundation.h>

@class ADFInterstitialAd;
@protocol ADFInterstitialAdDelegate <NSObject>
@required

/*
 *this method is fired when an ad is loaded suucessfully
 */
-(void)adfInterstitialDidLoadAd: (ADFInterstitialAd*) adfInterstitial;

/*
 *this method is fired when the interstitial is dismissed
 */
-(void)adfInterstitialDidDismissScreen: (ADFInterstitialAd*) adfInterstitial;

/*
 *this method is fired when an error is occured during loading an ad
 */
-(void)adfInterstitial: (ADFInterstitialAd*) adfInterstitial didFailWithErrorCode:(int) code message:(NSString*)message;

@optional

/*
 *this method is fired before the interstitial screen will be presented
 */
-(void)adfInterstitialWillPresentScreen: (ADFInterstitialAd*) adfInterstitial;

/*
 *this method is fired before interstitial screen will be dismissed 
 */
-(void)adfInterstitialWillDismissScreen: (ADFInterstitialAd*) adfInterstitial;

/*
 *this method is fired before app will be entered to background
 */
-(void)adfInterstitialAppWillEnterBackground:(ADFInterstitialAd*) adfInterstitial;

/*
 *this method is fired before app will be terminated
 */
-(void)adfInterstitialAppWillTerminate:(ADFInterstitialAd*) adfInterstitial;
@end
