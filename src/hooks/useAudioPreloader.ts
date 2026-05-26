
import { useState, useCallback, useEffect, useRef } from 'react';
import { NativeAudio } from '@/capacitor-plugins/NativeBridge';
import { sounds } from '@/assets/audio';

interface UseAudioPreloaderResult {
  isPreloading: boolean;
  progress: number;
}

const SOUNDS_TO_PRELOAD = ['noise', 'rain', 'ocean', 'fan', 'campfire', 'space'];

/**
 * Preloads audio files incrementally using requestIdleCallback.
 * Starts immediately with the first sound, then queues the rest during idle time.
 * When user clicks a card, the audio is already cached in the browser.
 */
export const useAudioPreloader = (): UseAudioPreloaderResult => {
  const [isPreloading, setIsPreloading] = useState(true);
  const [progress, setProgress] = useState(0);
  const preloadedRef = useRef(false);

  useEffect(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;

    let cancelled = false;
    let loadedCount = 0;

    const soundsToLoad = sounds.filter(s => SOUNDS_TO_PRELOAD.includes(s.id));
    const total = soundsToLoad.length;

    async function preloadNext(index: number) {
      if (cancelled || index >= total) {
        setIsPreloading(false);
        return;
      }

      const sound = soundsToLoad[index];
      const assetId = `preload-${sound.id}`;

      try {
        await NativeAudio.preload({
          assetId,
          assetPath: `/audio/${sound.fileName}`,
          volume: 0,
          loop: sound.loop,
        });
      } catch (e) {
        console.warn(`[AudioPreloader] Failed to preload ${sound.name}:`, e);
      }

      if (!cancelled) {
        loadedCount++;
        setProgress(Math.round((loadedCount / total) * 100));
        // Queue next preload during idle time
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => preloadNext(index + 1), { timeout: 3000 });
        } else {
          setTimeout(() => preloadNext(index + 1), 100);
        }
      }
    }

    // Start preloading immediately
    preloadNext(0);

    return () => { cancelled = true; };
  }, []);

  return { isPreloading, progress };
};