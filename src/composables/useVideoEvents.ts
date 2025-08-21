import { type Ref, watch } from "vue";
import type { PlayerContext } from "../types/video";

export function useVideoEvents(videoPlayer: Ref<HTMLVideoElement | null>): PlayerContext['events'] {
    const loadedmetadataCallbacks: (() => void)[] = [];

    function onLoadedmetadata(callback: () => void) {
        loadedmetadataCallbacks.push(callback);
    }

    const handleLoadedmetadata = () => {
        loadedmetadataCallbacks.forEach(callback => callback());
    };

    watch(videoPlayer, (newPlayer, oldPlayer) => {
        if (oldPlayer) {
            oldPlayer.removeEventListener("loadedmetadata", handleLoadedmetadata);
        }

        if (newPlayer) {
            newPlayer.addEventListener("loadedmetadata", handleLoadedmetadata);
        }
    }, { immediate: true });

    return {
        onLoadedmetadata,
    }
}
