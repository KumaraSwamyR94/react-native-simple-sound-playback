import NativeSimpleSoundPlayback from './NativeSimpleSoundPlayback';

export function load(name: string) {
  NativeSimpleSoundPlayback.load(name);
}

export function play(name: string, onComplete: (success: boolean) => void) {
  NativeSimpleSoundPlayback.play(name, onComplete);
}

export function stop(name: string) {
  NativeSimpleSoundPlayback.stop(name);
}

export function setVolume(name: string, volume: number) {
  NativeSimpleSoundPlayback.setVolume(name, volume);
}

export function release(name: string) {
  NativeSimpleSoundPlayback.release(name);
}
