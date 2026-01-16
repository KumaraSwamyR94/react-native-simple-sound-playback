import AVFoundation
import Foundation
import React

@objc(SimpleSoundPlaybackSwift)
public class SimpleSoundPlaybackSwift: NSObject {
  private var players: [String: AVAudioPlayer] = [:]

  @objc public func load(_ name: String) {
    if players[name] != nil { return }

    guard let url = Bundle.main.url(forResource: name, withExtension: nil) else {
      return
    }

    do {
      let player = try AVAudioPlayer(contentsOf: url)
      player.prepareToPlay()
      players[name] = player
    } catch {
      // ignore
    }
  }

  @objc public func play(_ name: String, onComplete: @escaping RCTResponseSenderBlock) {
    guard let player = players[name] else {
      onComplete([false])
      return
    }

    let ok = player.play()
    onComplete([ok])
  }

  @objc public func stop(_ name: String) {
    players[name]?.stop()
  }

  @objc public func setVolume(_ name: String, volume: NSNumber) {
    players[name]?.volume = volume.floatValue
  }

  @objc public func release(_ name: String) {
    players[name] = nil
  }

  @objc public static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
