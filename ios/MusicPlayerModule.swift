//
//  MusicPlayerModule.swift
//  Apna_Food
//
//  Created by MTPC-335 on 09/06/23.
//

import Foundation
import AVFoundation

@objc(MusicPlayerModule)
class MusicPlayerModule: NSObject {
  
  static var shared: MusicPlayerModule?
  
  var player: AVAudioPlayer?
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  static func moduleName() -> String {
    return "MusicPlayer"
  }
  
  @objc
  func play(_ fileName: String? = nil) {
    stop()
    
    var resourceURL: URL?
    
    if let fileName = fileName {
      resourceURL = Bundle.main.url(forResource: fileName, withExtension: "mp3")
    } else {
      resourceURL = Bundle.main.url(forResource: "android_11", withExtension: "mp3")
    }
    
    guard let url = resourceURL else { return }
    
    do {
      self.player = try AVAudioPlayer(contentsOf: url)
      player?.play()
    } catch {
      print("Error playing audio")
    }
  }
  
  @objc
  func pause() {
    player?.pause()
  }
  
  @objc
  func stop() {
    player?.stop()
    player = nil
  }
  
  @objc
  func changeVoiceToAlien(_ fileName: String? = nil) {
    stop()
    
    var resourceURL: URL?
    
    if let fileName = fileName {
      resourceURL = Bundle.main.url(forResource: fileName, withExtension: "mp3")
    } else {
      resourceURL = Bundle.main.url(forResource: "android_11", withExtension: "mp3")
    }
    
    guard let url = resourceURL else { return }
    
    do {
      self.player = try AVAudioPlayer(contentsOf: url)
      player?.enableRate = true
      player?.rate = 0.6
      player?.play()
    } catch {
      print("Error playing audio")
    }
  }
  
  @objc
  func changeVoiceToChild(_ fileName: String? = nil) {
    stop()
    
    var resourceURL: URL?
    
    if let fileName = fileName {
      resourceURL = Bundle.main.url(forResource: fileName, withExtension: "mp3")
    } else {
      resourceURL = Bundle.main.url(forResource: "android_11", withExtension: "mp3")
    }
    
    guard let url = resourceURL else { return }
    
    do {
      self.player = try AVAudioPlayer(contentsOf: url)
      player?.enableRate = true
      player?.rate = 1.8
      player?.play()
    } catch {
      print("Error playing audio")
    }
  }
  
  @objc
  func speedUpVoice(_ fileName: String? = nil) {
    stop()
    
    var resourceURL: URL?
    
    if let fileName = fileName {
      resourceURL = Bundle.main.url(forResource: fileName, withExtension: "mp3")
    } else {
      resourceURL = Bundle.main.url(forResource: "android_11", withExtension: "mp3")
    }
    
    guard let url = resourceURL else { return }
    
    do {
      self.player = try AVAudioPlayer(contentsOf: url)
      player?.enableRate = true
      player?.rate = 2.5
      player?.play()
    } catch {
      print("Error playing audio")
    }
  }
  
  @objc
  func slowDownVoice(_ fileName: String? = nil) {
    stop()
    
    var resourceURL: URL?
    
    if let fileName = fileName {
      resourceURL = Bundle.main.url(forResource: fileName, withExtension: "mp3")
    } else {
      resourceURL = Bundle.main.url(forResource: "android_11", withExtension: "mp3")
    }
    
    guard let url = resourceURL else { return }
    
    do {
      self.player = try AVAudioPlayer(contentsOf: url)
      player?.enableRate = true
      player?.rate = 0.4
      player?.play()
    } catch {
      print("Error playing audio")
    }
  }
}
