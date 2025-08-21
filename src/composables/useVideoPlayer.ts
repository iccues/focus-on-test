import { type Ref } from "vue";
import type { PlayerContext } from "../types/video.ts";
import { useVideoVolume } from "./useVideoVolume.ts";
import { useVideoEvents } from "./useVideoEvents.ts";
import { useVideoPlayback } from "./useVideoPlayback.ts";
import { useVideoTime } from "./useVideoTime.ts";

export function useVideoPlayer(videoPlayer: Ref<HTMLVideoElement | null>): PlayerContext {
    const playback = useVideoPlayback(videoPlayer);

    const time = useVideoTime(videoPlayer);

    const events = useVideoEvents(videoPlayer);

    const volume = useVideoVolume(videoPlayer);

    return {
        playback,
        time,
        volume,
        events,
    }
}
