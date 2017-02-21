//
//  ADFNativeAdDelegate.h
//  AdFalconSDK
//
//  Created by Emad Jabareen on 12/29/14.
//  Copyright (c) 2014 Noqoush Mobile Media Group. All rights reserved.
//


@class ADFNativeAd;
@class ADFNativeAdActionData;

@protocol ADFNativeAdDelegate <NSObject>

@required
-(void) nativeAdDidLoad:(ADFNativeAd*) nativeAd;
//-(void) nativeAd:(ADFNativeAd*) nativeAd didFailToLoadAdWithReason:(NSString*) reason;

-(void) nativeAd:(ADFNativeAd*) nativeAd  didFailWithErrorCode:(int) code message:(NSString*) message;

@optional

-(void) nativeAdWillPresentScreen:(ADFNativeAd*) nativeAd;
-(void) nativeAdDidPresentScreen:(ADFNativeAd*) nativeAd;
-(void) nativeAdWillDismissScreen:(ADFNativeAd*) nativeAd;
-(void) nativeAdDidDismissScreen:(ADFNativeAd*) nativeAd;

-(void)applicationWillEnterBackgroundFromNativeAd:(ADFNativeAd*) nativeAd;

-(BOOL) nativeAd:(ADFNativeAd*) nativeAd handleCustomActionWithData:(NSString *)customData;

@end
