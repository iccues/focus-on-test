import { ref, type Ref, watch } from "vue";
import type { PlayerContext } from "../types/video";

export function useVideoPlayback(videoPlayer: Ref<HTMLVideoElement | null>): PlayerContext['playback'] {
    const isPlaying = ref(false);

    const handlePlay = () => {
        isPlaying.value = true;
    }

    const handlePause = () => {
        isPlaying.value = false;
    }

    function togglePlayPause() {
        if (!videoPlayer.value) return;
        if (videoPlayer.value.paused) {
            videoPlayer.value.play();
        } else {
            videoPlayer.value.pause();
        }
    }

    watch(videoPlayer, (newPlayer, oldPlayer) => {
        if (oldPlayer) {
            oldPlayer.removeEventListener("play", handlePlay);
            oldPlayer.removeEventListener("pause", handlePause);
        }

        if (newPlayer) {
            newPlayer.addEventListener("play", handlePlay);
            newPlayer.addEventListener("pause", handlePause);
        }
    }, { immediate: true });

    return {
        isPlaying,
        togglePlayPause,
    }
}
