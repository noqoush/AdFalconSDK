//
//  ADFAdViewDelegate.h
//  AdFalcon SDK
//
//  Created by Emad Ziyad on 5/22/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKIT/UIKIT.h>

@class ADFAdView;
@protocol ADFAdViewDelegate <NSObject>
@optional
-(void)adViewWillLoadAd:(ADFAdView*) adView;
-(void)adViewDidLoadAd: (ADFAdView*) adView;
-(void)adView: (ADFAdView*) adView didFailWithErrorCode:(int) code message:(NSString*)message;
-(void)adViewWillPresentScreen: (ADFAdView*) adView;
-(void)adViewDidPresentScreen: (ADFAdView*) adView;
-(void)adViewWillDismissScreen: (ADFAdView*) adView;
-(void)adViewDidDismissScreen: (ADFAdView*) adView;
-(void)applicationWillTerminate:(UIApplication *)application;
-(void)applicationWillEnterBackground:(UIApplication *)application;
@end
