package com.simplesoundplayback

import android.media.SoundPool
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

@ReactModule(name = SimpleSoundPlaybackModule.NAME)
class SimpleSoundPlaybackModule(reactContext: ReactApplicationContext) :
  NativeSimpleSoundPlaybackSpec(reactContext) {

  private val soundPool = SoundPool.Builder().setMaxStreams(5).build()
  private val sounds = mutableMapOf<String, Int>()

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun load(name: String) {
    if (sounds.containsKey(name)) return

    val resId = reactApplicationContext.resources.getIdentifier(
      name.substringBeforeLast("."),
      "raw",
      reactApplicationContext.packageName
    )

    if (resId != 0) {
      val soundId = soundPool.load(reactApplicationContext, resId, 1)
      sounds[name] = soundId
    }
  }

  @ReactMethod
  override fun play(name: String, onComplete: Callback) {
    val soundId = sounds[name]
    if (soundId == null) {
      onComplete.invoke(false)
      return
    }

    val streamId = soundPool.play(soundId, 1f, 1f, 1, 0, 1f)
    val ok = streamId != 0
    onComplete.invoke(ok)
  }

  @ReactMethod
  override fun stop(name: String) {
    sounds[name]?.let {
      soundPool.stop(it)
    }
  }

  @ReactMethod
  override fun setVolume(name: String, volume: Double) {
    sounds[name]?.let {
      soundPool.setVolume(it, volume.toFloat(), volume.toFloat())
    }
  }

  @ReactMethod
  override fun release(name: String) {
    sounds[name]?.let {
      soundPool.unload(it)
      sounds.remove(name)
    }
  }

  companion object {
    const val NAME = "SimpleSoundPlayback"
  }
}
