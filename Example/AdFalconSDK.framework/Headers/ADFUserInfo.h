//
//  ADFAdView.h
//  AdFalcon SDK
//
//  Created by Noqoush
//  Copyright 2011 Noqoush. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum
{
    kADFUserInfoGenderNone = -1,
    kADFUserInfoGenderMale = 0,
    kADFUserInfoGenderFemale
}ADFUserInfoGender;

@interface ADFUserInfo : NSObject
{

}
@property (nonatomic, copy) NSString * language;
@property (nonatomic, assign) ADFUserInfoGender gender;
@property (nonatomic, assign) int age;
@property (nonatomic, copy) NSString * postalCode;
@property (nonatomic, copy) NSString * areaCode;
@property (nonatomic, copy) NSString * countryCode;
@property (nonatomic, copy) NSDate * birthdate;
@property (nonatomic, assign) double locationLatitude;
@property (nonatomic, assign) double locationLongitude;
@property (nonatomic, assign) double locationAccuracyInMeters;



@end
