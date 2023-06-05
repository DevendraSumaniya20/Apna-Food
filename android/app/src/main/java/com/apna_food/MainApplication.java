package com.app.apna_food;

import android.app.Application;

import com.apna_food.CustomModulePackage;
import com.apna_food.VoiceChangingPackage;
import com.facebook.react.BuildConfig;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  // Create an instance of ReactNativeHost
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      // Get the default list of React packages
      List<ReactPackage> packages = new PackageList(this).getPackages();

      // Add your custom module package to the list
      packages.add(new CustomModulePackage());
      packages.add(new VoiceChangingPackage());

      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    // Initialize the SoLoader
    SoLoader.init(this, /* native exopackage */ false);
  }
}
