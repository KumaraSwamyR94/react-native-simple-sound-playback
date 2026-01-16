#import "SimpleSoundPlayback.h"
#import <React/RCTLog.h>

#import "SimpleSoundPlayback-Swift.h"

@interface SimpleSoundPlayback ()
@property(nonatomic, strong) SimpleSoundPlaybackSwift *swiftImpl;
@end

@implementation SimpleSoundPlayback
- (instancetype)init {
  if (self = [super init]) {
    _swiftImpl = [[SimpleSoundPlaybackSwift alloc] init];
  }
  return self;
}

- (void)load:(NSString *)name {
  [_swiftImpl load:name];
}

- (void)play:(NSString *)name onComplete:(RCTResponseSenderBlock)onComplete {
  [_swiftImpl play:name onComplete:onComplete];
}

- (void)stop:(NSString *)name {
  [_swiftImpl stop:name];
}

- (void)setVolume:(NSString *)name volume:(NSNumber *)volume {
  [_swiftImpl setVolume:name volume:volume];
}

- (void)release:(NSString *)name {
  [_swiftImpl release:name];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSimpleSoundPlaybackSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"SimpleSoundPlayback";
}

@end
