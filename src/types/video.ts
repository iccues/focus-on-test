import type {Ref} from "vue";

export interface PlayerContext {
    playback: {
        isPlaying: Ref<boolean>;
        togglePlayPause: () => void;
    };
    time: {
        currentTime: Ref<number>;
        duration: Ref<number>;
        seek: (time: number) => void;
    };
    volume: {
        volume: Ref<number>;
        isMuted: Ref<boolean>;
        setVolume: (volume: number) => void;
        toggleMute: () => void;
    };
    events: {
        onLoadedmetadata: (callback: () => void) => void;
    };
}

export interface VideoRegion {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface FocusOnData {
    version: string;
    regions: {
        start: number;
        end: number;
        region: VideoRegion;
    }[];
}