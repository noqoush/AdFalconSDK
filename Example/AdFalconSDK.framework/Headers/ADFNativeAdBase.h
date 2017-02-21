//
//  ADFNativeAdView.h
//  Test
//
//  Created by Ahmad Dari on 1/13/15.
//  Copyright (c) 2015 Noqoush Mobile Media Group. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ADFNativeAdBase : UIView

- (void)setContext:(id) context;
- (void)addTarget:(id)target action:(SEL)action;
- (void)addDoubleClickTarget:(id)target action:(SEL)action;
- (void) clear;
@end
