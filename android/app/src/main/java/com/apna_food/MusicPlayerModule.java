package com.app.apna_food;

import android.media.MediaPlayer;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
}
