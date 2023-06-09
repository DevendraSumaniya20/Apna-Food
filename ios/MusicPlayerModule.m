//
//  MusicPlayerModule.m
//  Apna_Food
//
//  Created by MTPC-335 on 09/06/23.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MusicPlayerModule, NSObject)

RCT_EXTERN_METHOD(play: (NSString *)fileName)
RCT_EXTERN_METHOD(pause)
RCT_EXTERN_METHOD(stop)
RCT_EXTERN_METHOD(changeVoiceToAlien: (NSString *)fileName)
RCT_EXTERN_METHOD(changeVoiceToChild: (NSString *)fileName)
RCT_EXTERN_METHOD(speedUpVoice: (NSString *)fileName)
RCT_EXTERN_METHOD(slowDownVoice: (NSString *)fileName)

@end
