//
//  ADFNativeAdViewsBinder.h
//  AdFalconSDK
//
//  Created by Emad Jabareen on 12/29/14.
//  Copyright (c) 2014 Noqoush Mobile Media Group. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#define ADF_DATA_ID_SPONSORED 1
#define ADF_DATA_ID_DESC 2
#define ADF_DATA_ID_RATING 3
#define ADF_DATA_ID_LIKES 4
#define ADF_DATA_ID_DOWNLOADS 5
#define ADF_DATA_ID_PRICE 6
#define ADF_DATA_ID_SALEPRICE 7
#define ADF_DATA_ID_PHONE 8
#define ADF_DATA_ID_ADDRESS 9
#define ADF_DATA_ID_DESC2 10
#define ADF_DATA_ID_DISPLAYURL 11
#define ADF_DATA_ID_CTA 12
#define ADF_DATA_ID_VIEWS 13

@class ADFResponse;
@class ADFNativeAssetBase;
@interface ADFNativeAdBinder : NSObject


@property (nonatomic) NSMutableDictionary *assetsDictionary;
//@property(nonatomic, assign) CGSize sizeOfTemplate;
//@property (nonatomic, assign) CGSize sizeOfMainAsset;

//@property(nonatomic) UIButton * actionButton;

//@property(nonatomic, assign) CGFloat maxLengthOfTitle;
//@property(nonatomic, assign) CGFloat maxLengthOfDescription;


//@property(nonatomic, assign) CGSize sizeOfIcon;
//@property(nonatomic, assign) CGSize sizeOfStarRating;
//@property(nonatomic, assign) CGSize sizeOfAction;


@property (nonatomic) UIColor *starRatingEmptyColor;
@property (nonatomic) UIColor *starRatingFillingColor;

-(void) setAdChoicesView:(UIView*) imageView;

-(void) setIconImageView:(UIImageView*) imageView;
-(void) setIconImageView:(UIImageView*) imageView minSize:(CGSize) minSize;

-(void) setTitleLabel:(UILabel*) label;
-(void) setTitleLabel:(UILabel *)label maxLength:(CGFloat) maxLength;

-(void) setMainAssetView:(UIView *) view;
-(void) setMainAssetView:(UIView *) view minSize:(CGSize) minSize;

-(void) setExtraDataView:(UIView *) view dataID:(NSInteger) dataID;
-(void) setExtraDataView:(UIView *) view dataID:(NSInteger) dataID maxLength:(CGFloat) maxLength;
-(void) setExtraDataLabel:(UILabel *) label dataID:(NSInteger) dataID maxLength:(CGFloat) maxLength;
-(void) setExtraDataImageView:(UIImageView *) imageView dataID:(NSInteger) dataID minSize:(CGSize) minSize;

-(void) isValidTemplate;
-(ADFNativeAssetBase *) getViewWithKey:(NSString *) key;
@end
