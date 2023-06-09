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
  
  var player: AVAudioPlayer?
  
  @objc
  func play() {
    stop()
    
    guard let url = Bundle.main.url(forResource: "android_11", withExtension: "mp3") else { return }
    
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
  func changeVoiceToAlien() {
    stop()
    
    guard let url = Bundle.main.url(forResource: "android_11", withExtension: "mp3") else { return }
    
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
  func changeVoiceToChild() {
    stop()
    
    guard let url = Bundle.main.url(forResource: "android_11", withExtension: "mp3") else { return }
    
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
  func speedUpVoice() {
    stop()
    
    guard let url = Bundle.main.url(forResource: "android_11", withExtension: "mp3") else { return }
    
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
  func slowDownVoice() {
    stop()
    
    guard let url = Bundle.main.url(forResource: "android_11", withExtension: "mp3") else { return }
    
    do {
      self.player = try AVAudioPlayer(contentsOf: url)
      player?.enableRate = true
      player?.rate = 0.4
      player?.play()
    } catch {
      print("Error playing audio")
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
} 
