//
//  ADFNativeAd.h
//  AdFalconSDK
//
//  Created by Emad Jabareen on 12/29/14.
//  Copyright (c) 2014 Noqoush Mobile Media Group. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "ADFNativeAdTemplate.h"
#import "ADFTargetingParams.h"
#import "ADFNativeAdBase.h"
#import "ADFNativeAdDelegate.h"


typedef enum{
    kADFNativeAdErrorInternalServer = -1,
    kADFNativeAdErrorNoAdAvailabe = 1,
    kADFNativeAdErrorInvalidParam = 2,
    kADFNativeAdErrorMissingParam = 3,
    kADFNativeAdErrorGenericSDK = 4,
    kADFNativeAdErrorCommunication = 5,
}ADFNativeAdError;

typedef enum{
    kADFNativeAdStatusNone,
    kADFNativeAdStatusLoading,
    kADFNativeAdStatusReady,
    kADFNativeAdStatusFailed,
    kADFNativeAdStatusClicked
} ADFNativeAdStatus;


@interface ADFNativeAd : ADFNativeAdBase 

@property(nonatomic, assign, readonly) CGSize estimatedSize;
@property(nonatomic, assign, readonly) ADFNativeAdStatus status;
@property(nonatomic, assign, readonly, getter=isReadyToShow) BOOL ready;
@property(nonatomic, readonly) NSString * errorMessage;

@property (nonatomic, assign,readonly) ADFNativeAdError errorCode;

@property(nonatomic, assign) BOOL testing;
@property(nonatomic, assign) BOOL logging;

@property(nonatomic, weak) id<ADFNativeAdDelegate> delegate;

- (void) initializeWithSiteID:(NSString*) siteID adTemplateClass:(Class) adTemplateClass viewController:(UIViewController *)  viewController;
- (void) loadAdWithParams:(ADFTargetingParams*) targetingParams;

@end
