import { useState, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  load,
  play,
  stop,
  setVolume,
  release,
} from 'react-native-simple-sound-playback';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setCurrentVolume] = useState(1);
  const [status, setStatus] = useState('Ready to load sound');

  // Load sound file
  const handleLoadSound = useCallback(() => {
    try {
      load('notification_sound');
      setIsLoaded(true);
      setStatus('✅ Sound loaded successfully');
    } catch {
      setStatus('❌ Failed to load sound');
      Alert.alert('Error', 'Failed to load sound file');
    }
  }, []);

  // Play loaded sound
  const handlePlaySound = useCallback(() => {
    if (!isLoaded) {
      Alert.alert('Error', 'Please load sound first');
      return;
    }

    setIsPlaying(true);
    play('notification_sound', (success) => {
      setIsPlaying(false);
      if (success) {
        setStatus('✅ Sound playback completed');
      } else {
        setStatus('❌ Sound playback failed');
        Alert.alert('Error', 'Failed to play sound');
      }
    });
    setStatus('▶️ Playing sound...');
  }, [isLoaded]);

  // Stop sound
  const handleStopSound = useCallback(() => {
    stop('notification_sound');
    setIsPlaying(false);
    setStatus('⏹️ Sound stopped');
  }, []);

  // Adjust volume
  const handleSetVolume = useCallback(
    (newVolume: number) => {
      if (!isLoaded) {
        Alert.alert('Error', 'Please load sound first');
        return;
      }

      setVolume('notification_sound', newVolume);
      setStatus(`🔊 Volume set to ${Math.round(newVolume * 100)}%`);
    },
    [isLoaded]
  );

  // Release sound
  const handleReleaseSound = useCallback(() => {
    release('notification_sound');
    setIsLoaded(false);
    setIsPlaying(false);
    setCurrentVolume(1);
    setStatus('🗑️ Sound released from memory');
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sound Playback Demo</Text>
        <Text style={styles.subtitle}>react-native-simple-sound-playback</Text>

        {/* Status Display */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        {/* Sound State Indicators */}
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>Loaded:</Text>
            <Text style={[styles.indicatorValue, isLoaded && styles.active]}>
              {isLoaded ? '✓' : '✗'}
            </Text>
          </View>
          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>Playing:</Text>
            <Text style={[styles.indicatorValue, isPlaying && styles.active]}>
              {isPlaying ? '▶' : '⏸'}
            </Text>
          </View>
          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>Volume:</Text>
            <Text style={styles.indicatorValue}>
              {Math.round(volume * 100)}%
            </Text>
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleLoadSound}
            disabled={isLoaded}
          >
            <Text style={styles.buttonText}>📂 Load Sound</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.successButton,
              (!isLoaded || isPlaying) && styles.disabledButton,
            ]}
            onPress={handlePlaySound}
            disabled={!isLoaded || isPlaying}
          >
            <Text style={styles.buttonText}>▶️ Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.dangerButton,
              !isPlaying && styles.disabledButton,
            ]}
            onPress={handleStopSound}
            disabled={!isPlaying}
          >
            <Text style={styles.buttonText}>⏹️ Stop</Text>
          </TouchableOpacity>
        </View>

        {/* Volume Control */}
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeLabel}>Volume Control</Text>
          <View style={styles.volumeButtonGroup}>
            <TouchableOpacity
              style={[styles.volumeButton, !isLoaded && styles.disabledButton]}
              onPress={() => handleSetVolume(0)}
              disabled={!isLoaded}
            >
              <Text style={styles.volumeButtonText}>Mute (0%)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.volumeButton, !isLoaded && styles.disabledButton]}
              onPress={() => handleSetVolume(0.5)}
              disabled={!isLoaded}
            >
              <Text style={styles.volumeButtonText}>50%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.volumeButton, !isLoaded && styles.disabledButton]}
              onPress={() => handleSetVolume(1)}
              disabled={!isLoaded}
            >
              <Text style={styles.volumeButtonText}>100%</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Release Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.warningButton,
            !isLoaded && styles.disabledButton,
          ]}
          onPress={handleReleaseSound}
          disabled={!isLoaded}
        >
          <Text style={styles.buttonText}>🗑️ Release Sound</Text>
        </TouchableOpacity>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How to Use:</Text>
          <Text style={styles.infoText}>
            1. Press "📂 Load Sound" to load the audio file into memory
          </Text>
          <Text style={styles.infoText}>
            2. Press "▶️ Play" to start playback
          </Text>
          <Text style={styles.infoText}>
            3. Use volume controls to adjust the sound level
          </Text>
          <Text style={styles.infoText}>
            4. Press "⏹️ Stop" to stop the current playback
          </Text>
          <Text style={styles.infoText}>
            5. Press "🗑️ Release Sound" to free up memory when done
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  statusContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  indicator: {
    alignItems: 'center',
  },
  indicatorLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  indicatorValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ccc',
  },
  active: {
    color: '#34C759',
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  warningButton: {
    backgroundColor: '#FF9500',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  volumeContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  volumeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  volumeButtonGroup: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  volumeButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#17a2b8',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0c5460',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#0c5460',
    lineHeight: 20,
    marginBottom: 6,
  },
});
