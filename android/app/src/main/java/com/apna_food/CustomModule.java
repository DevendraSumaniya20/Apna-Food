package com.apna_food;


import android.provider.Settings;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomModule extends ReactContextBaseJavaModule {

    private  static ReactApplicationContext reactContext ;

        CustomModule(ReactApplicationContext context){
            super(context);
            reactContext = context ;

        }


        @ReactMethod
        public  void show(){
            Toast.makeText(reactContext , "Hello this is the Apna Food App" ,Toast.LENGTH_LONG).show();
        }
        @ReactMethod
        public  void getDeviceId (Promise promise) {

            try {

                String android_id = Settings.Secure.getString(reactContext.getContentResolver(),
                        Settings.Secure.ANDROID_ID);
                promise.resolve(android_id);
            }catch(Exception e) {
                promise.reject("Some Error is generated when the Get the Device ID" , e);
            }
        }

    @NonNull
    @Override
    public String getName() {
        return "ABC";
    }
}
