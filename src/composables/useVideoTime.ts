import { ref, type Ref, watch } from "vue";
import type { PlayerContext } from "../types/video";

export function useVideoTime(videoPlayer: Ref<HTMLVideoElement | null>): PlayerContext['time'] {
    const currentTime = ref(0);
    const duration = ref(0);

    const handleTimeUpdate = () => {
        if (!videoPlayer.value) return;
        currentTime.value = videoPlayer.value.currentTime;
    }

    const handleLoadedmetadata = () => {
        if (!videoPlayer.value) return;
        duration.value = videoPlayer.value.duration;
    }

    function seek(time: number) {
        if (!videoPlayer.value) return;
        videoPlayer.value.currentTime = time;
    }

    watch(videoPlayer, (newPlayer, oldPlayer) => {
        if (oldPlayer) {
            oldPlayer.removeEventListener("timeupdate", handleTimeUpdate);
            oldPlayer.removeEventListener("loadedmetadata", handleLoadedmetadata);
        }

        if (newPlayer) {
            newPlayer.addEventListener("timeupdate", handleTimeUpdate);
            newPlayer.addEventListener("loadedmetadata", handleLoadedmetadata);
        }
    }, { immediate: true });

    return {
        currentTime,
        duration,
        seek,
    }
}
