import { ref, type Ref, watch } from "vue";
import type { PlayerContext } from "../types/video";

export function useVideoVolume(videoPlayer: Ref<HTMLVideoElement | null>): PlayerContext['volume'] {
    const volume = ref(1);
    const isMuted = ref(false);

    const handleVolumeChange = () => {
        if (!videoPlayer.value) return;
        volume.value = videoPlayer.value.volume;
        isMuted.value = videoPlayer.value.muted;
    }

    function setVolume(newVolume: number) {
        if (!videoPlayer.value) return;
        const clamped = Math.min(1, Math.max(0, newVolume));
        videoPlayer.value.volume = clamped;
    }

    function toggleMute() {
        if (!videoPlayer.value) return;
        videoPlayer.value.muted = !videoPlayer.value.muted;
    }

    watch(videoPlayer, (newPlayer, oldPlayer) => {
        if (oldPlayer) {
            oldPlayer.removeEventListener("volumechange", handleVolumeChange);
        }

        if (newPlayer) {
            newPlayer.addEventListener("volumechange", handleVolumeChange);
            // initialize element state from refs
            newPlayer.volume = volume.value;
            newPlayer.muted = isMuted.value;
        }
    }, { immediate: true });

    return {
        volume,
        isMuted,
        setVolume,
        toggleMute,
    }
}
