import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  load(name: string): void;
  play(name: string, onComplete: (success: boolean) => void): void;
  stop(name: string): void;
  setVolume(name: string, volume: number): void;
  release(name: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SimpleSoundPlayback');
