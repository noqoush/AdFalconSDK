//
//  ADFNativeAdTemplate.h
//  AdFalconSDK
//
//  Created by Emad Jabareen on 12/29/14.
//  Copyright (c) 2014 Noqoush Mobile Media Group. All rights reserved.
//


@class ADFNativeAdBinder;
@protocol ADFNativeAdTemplate <NSObject>

@required
-(void) bindViews:(ADFNativeAdBinder*) binder;
-(CGSize) sizeForWidth:(CGFloat) width;

@optional
-(void) renderExtraData:(NSMutableArray*) extraData;

@end
