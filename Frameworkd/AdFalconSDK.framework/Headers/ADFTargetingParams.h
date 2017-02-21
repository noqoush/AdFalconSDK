//
//  ADFAdView.h
//  AdFalcon SDK
//
//  Created by Noqoush
//  Copyright 2011 Noqoush. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ADFUserInfo.h"


@interface ADFTargetingParams : NSObject 
{
    ADFUserInfo * userInfo;
    NSMutableArray * keywords;
    NSString * search;
    NSMutableDictionary * additionalInfo;
}

@property (nonatomic, strong) ADFUserInfo * userInfo;
@property (nonatomic, strong) NSMutableArray * keywords;
@property (nonatomic, strong) NSString * search;
@property (nonatomic, strong) NSMutableDictionary * additionalInfo;
@end
