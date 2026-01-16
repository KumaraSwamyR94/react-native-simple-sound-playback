# react-native-simple-sound-playback

A simple and straightforward React Native library for playing sound clips and chimes on both iOS and Android platforms. This library provides an easy-to-use API for loading, playing, stopping, and managing audio files in your React Native applications.

## Features

- ✅ Simple API for sound playback
- ✅ Cross-platform support (iOS & Android)
- ✅ Volume control
- ✅ Sound lifecycle management (load, play, stop, release)
- ✅ Completion callbacks for sound playback events
- ✅ TypeScript support
- ✅ Built with TurboModule for optimal performance

## Installation

### Using npm

```sh
npm install react-native-simple-sound-playback
```

### Using yarn

```sh
yarn add react-native-simple-sound-playback
```

## Setup & Additional Configuration

### iOS Setup

The library uses CocoaPods for iOS dependency management. After installation, navigate to your iOS directory and install pods:

```sh
cd ios
pod install
cd ..
```

**Requirements:**
- iOS 11.0 or higher
- Xcode with Swift support

### Android Setup

The library automatically links through React Native's autolinking feature. No additional setup is required beyond the standard npm/yarn installation.

**Requirements:**
- Android API level 21 or higher
- Kotlin support enabled in your project

### Preparing Sound Files

Before using the library, ensure your sound files are properly integrated:

**iOS:** Add your audio files to Xcode's project resources (`.mp3`, `.wav`, `.m4a` formats supported)

**Android:** Place your audio files in the `android/app/src/main/res/raw/` directory

## Basic Usage Example

Here's a simple example of how to use the library in your React Native app. For a complete working implementation, see the [example app](./example/src/App.tsx):

```tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import {
  load,
  play,
  stop,
  setVolume,
  release,
} from 'react-native-simple-sound-playback';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLoadSound = () => {
    // Load the sound file (filename without extension)
    load('notification_sound');
  };

  const handlePlaySound = () => {
    // Play the loaded sound
    play('notification_sound', (success) => {
      if (success) {
        console.log('Sound playback completed successfully');
        setIsPlaying(false);
      } else {
        console.log('Sound playback failed');
      }
    });
    setIsPlaying(true);
  };

  const handleStopSound = () => {
    // Stop the currently playing sound
    stop('notification_sound');
    setIsPlaying(false);
  };

  const handleAdjustVolume = () => {
    // Set volume to 50% (0.0 to 1.0)
    setVolume('notification_sound', 0.5);
  };

  const handleReleaseSound = () => {
    // Release the sound from memory
    release('notification_sound');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Playback Example</Text>

      <Button title="Load Sound" onPress={handleLoadSound} />
      <Button
        title={isPlaying ? 'Playing...' : 'Play Sound'}
        onPress={handlePlaySound}
        disabled={isPlaying}
      />
      <Button title="Stop Sound" onPress={handleStopSound} />
      <Button title="Set Volume (50%)" onPress={handleAdjustVolume} />
      <Button title="Release Sound" onPress={handleReleaseSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
```

## Library API Reference

### `load(name: string): void`

Loads a sound file into memory for playback.

**Parameters:**
- `name` (string): The name of the sound file to load (without file extension)

**Example:**
```tsx
load('notification_sound');
load('success_chime');
```

---

### `play(name: string, onComplete: (success: boolean) => void): void`

Plays a loaded sound file.

**Parameters:**
- `name` (string): The name of the sound file to play
- `onComplete` (function): Callback function invoked when playback completes or fails
  - `success` (boolean): `true` if playback completed successfully, `false` if playback failed

**Example:**
```tsx
play('notification_sound', (success) => {
  if (success) {
    console.log('Sound played successfully');
  } else {
    console.log('Failed to play sound');
  }
});
```

---

### `stop(name: string): void`

Stops the playback of a currently playing sound.

**Parameters:**
- `name` (string): The name of the sound file to stop

**Example:**
```tsx
stop('notification_sound');
```

---

### `setVolume(name: string, volume: number): void`

Sets the volume level for a sound file.

**Parameters:**
- `name` (string): The name of the sound file
- `volume` (number): Volume level between 0.0 (mute) and 1.0 (maximum)

**Example:**
```tsx
setVolume('notification_sound', 0.75); // 75% volume
setVolume('notification_sound', 0.0);  // Mute
setVolume('notification_sound', 1.0);  // Full volume
```

---

### `release(name: string): void`

Releases a sound from memory. Call this when you're done with a sound to free up resources.

**Parameters:**
- `name` (string): The name of the sound file to release

**Example:**
```tsx
release('notification_sound');
```

## Advanced Usage Patterns

### Example App

For a complete, fully-functional example app that showcases all features of the library, check out the [example application](./example/). This example demonstrates:

- Loading and playing sound files
- Managing playback state (loaded, playing)
- Volume control with multiple presets
- Stopping playback
- Releasing sounds from memory
- Status tracking and user feedback
- Proper error handling
- UI state management with React hooks

To run the example app:

**iOS:**
```sh
cd example
cd ios
pod install
cd ..
yarn ios
```

**Android:**
```sh
cd example
yarn android
```

### Loading Multiple Sounds

```tsx
import { load, play } from 'react-native-simple-sound-playback';

// Load multiple sounds
const soundNames = ['notification', 'success', 'error', 'warning'];

soundNames.forEach(name => {
  load(name);
});

// Play specific sounds
play('success', (success) => console.log('Success sound played'));
play('error', (success) => console.log('Error sound played'));
```

### Custom Hook for Sound Management

```tsx
import { useCallback } from 'react';
import {
  load,
  play,
  stop,
  setVolume,
  release,
} from 'react-native-simple-sound-playback';

export const useSound = (soundName: string) => {
  const loadSound = useCallback(() => {
    load(soundName);
  }, [soundName]);

  const playSound = useCallback(
    (onComplete?: (success: boolean) => void) => {
      play(soundName, onComplete || (() => {}));
    },
    [soundName]
  );

  const stopSound = useCallback(() => {
    stop(soundName);
  }, [soundName]);

  const adjustVolume = useCallback((volume: number) => {
    setVolume(soundName, volume);
  }, [soundName]);

  const releaseSound = useCallback(() => {
    release(soundName);
  }, [soundName]);

  return {
    loadSound,
    playSound,
    stopSound,
    adjustVolume,
    releaseSound,
  };
};

// Usage in component
const { playSound, stopSound, adjustVolume } = useSound('notification');
```

## Important Notes

- **Sound File Names:** Always reference sound files by their name without the file extension (e.g., use `'notification_sound'` instead of `'notification_sound.mp3'`)
- **Memory Management:** Always call `release()` when you're done with a sound to prevent memory leaks
- **Volume Range:** Volume values must be between 0.0 and 1.0
- **Supported Formats:**
  - iOS: `.mp3`, `.wav`, `.m4a`, `.aac`
  - Android: `.mp3`, `.wav`, `.ogg`, `.flac`
- **Performance:** Pre-load frequently used sounds to avoid delays during playback

## Troubleshooting

### Sound Won't Play on iOS
- Ensure the audio file is added to your Xcode project's target
- Check that the file name matches exactly (case-sensitive on iOS)
- Verify that the device's mute switch is not enabled

### Sound Won't Play on Android
- Verify the audio file is in `android/app/src/main/res/raw/` directory
- Ensure the filename is lowercase without special characters
- Check that you have proper permissions in `AndroidManifest.xml`

### Xcode Build Errors
- Run `pod install` again in the iOS directory
- Clean the build folder: `Cmd + Shift + K`
- Delete derived data and rebuild

## Contributing

We welcome contributions! Please see our contributing guidelines:

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT © [react-native-simple-sound-playback](https://github.com/KumaraSwamyR94/react-native-simple-sound-playback)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)