package com.app.apna_food;

import android.media.MediaPlayer;
import android.media.PlaybackParams;
import android.os.Build;
import android.os.Environment;
import android.content.res.AssetFileDescriptor;


import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;

public class MusicPlayerModule extends ReactContextBaseJavaModule {
    private MediaPlayer mediaPlayer;

    public MusicPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MusicPlayer";
    }

    @ReactMethod
    public void play(String fileName) {
        stop();

        int resId = getReactApplicationContext().getResources().getIdentifier(fileName, "raw", getReactApplicationContext().getPackageName());
        mediaPlayer = MediaPlayer.create(getReactApplicationContext(), resId);

        mediaPlayer.start();
    }

    @ReactMethod
    public void pause() {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
        }
    }

    @ReactMethod
    public void stop() {
        if (mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.release();
            mediaPlayer = null;
        }
    }
    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void changeVoiceToAlien(String fileName) {
    stop();

    mediaPlayer = new MediaPlayer();
    PlaybackParams playbackParams = new PlaybackParams();
    playbackParams.setPitch(0.6f);

    try {
        // Remove the file path based on external storage
        int resId = getReactApplicationContext().getResources().getIdentifier(fileName, "raw", getReactApplicationContext().getPackageName());
        AssetFileDescriptor afd = getReactApplicationContext().getResources().openRawResourceFd(resId);
        if (afd != null) {
            mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            afd.close();
            mediaPlayer.prepare();
            mediaPlayer.setPlaybackParams(playbackParams);
            mediaPlayer.start();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void changeVoiceToChild(String fileName) {
    stop();

    mediaPlayer = new MediaPlayer();
    PlaybackParams playbackParams = new PlaybackParams();
    playbackParams.setPitch(1.8f);

    try {
        // Remove the file path based on external storage
        int resId = getReactApplicationContext().getResources().getIdentifier(fileName, "raw", getReactApplicationContext().getPackageName());
        AssetFileDescriptor afd = getReactApplicationContext().getResources().openRawResourceFd(resId);
        if (afd != null) {
            mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            afd.close();
            mediaPlayer.prepare();
            mediaPlayer.setPlaybackParams(playbackParams);
            mediaPlayer.start();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void speedUpVoice(String fileName) {
    stop();

    mediaPlayer = new MediaPlayer();
    PlaybackParams playbackParams = new PlaybackParams();
    playbackParams.setSpeed(2.5f);

    try {
        // Remove the file path based on external storage
        int resId = getReactApplicationContext().getResources().getIdentifier(fileName, "raw", getReactApplicationContext().getPackageName());
        AssetFileDescriptor afd = getReactApplicationContext().getResources().openRawResourceFd(resId);
        if (afd != null) {
            mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            afd.close();
            mediaPlayer.prepare();
            mediaPlayer.setPlaybackParams(playbackParams);
            mediaPlayer.start();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    public void slowDownVoice(String fileName) {
    stop();

    mediaPlayer = new MediaPlayer();
    PlaybackParams playbackParams = new PlaybackParams();
    playbackParams.setSpeed(0.4f);

    try {
        // Remove the file path based on external storage
        int resId = getReactApplicationContext().getResources().getIdentifier(fileName, "raw", getReactApplicationContext().getPackageName());
        AssetFileDescriptor afd = getReactApplicationContext().getResources().openRawResourceFd(resId);
        if (afd != null) {
            mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            afd.close();
            mediaPlayer.prepare();
            mediaPlayer.setPlaybackParams(playbackParams);
            mediaPlayer.start();
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}


}
