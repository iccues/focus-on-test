<script setup lang="ts">
import { ref } from 'vue';
import { VideoTransformer } from '../../services/VideoTransformer.ts';
import { vResize } from '../../directives/vResize';
import { useVideoPlayer } from '../../composables/useVideoPlayer';
import VideoPlayerControls from './VideoPlayerControls.vue';

const props = defineProps<{
    src?: string;
    focusOn?: string;
}>();

defineExpose({
    loadVideo,
    loadFocusOn,
})

function loadVideo() {
    videoElement.value?.load();
}

function loadFocusOn() {
    if (props.focusOn) {
        transformer.value.loadFocusOnData(props.focusOn);
    }
}


const transformer = ref<VideoTransformer>(new VideoTransformer());

const videoElement = ref<HTMLVideoElement | null>(null);

const playerContext = useVideoPlayer(videoElement);

playerContext.events.onLoadedmetadata(() => {
    transformer.value.setVideoSize(videoElement.value?.videoWidth ?? 0, videoElement.value?.videoHeight ?? 0);
});

const {
    time: {
        currentTime,
    },
    playback: {
        togglePlayPause,
    }
} = playerContext;


function setViewportSize(width: number, height: number) {
    transformer.value.setViewportSize(width, height);
}

</script>

<template>
    <div class="video-player__viewport" v-resize="setViewportSize">
        <video class="video-player__video"
            :style="{
                transform: transformer.getTransform(currentTime),
            }"
            @click="togglePlayPause"
            ref="videoElement"
        >
            <source :src="props.src" />
            unsupported video format
        </video>

        <video-player-controls :videoPlayer="playerContext" />

    </div>
</template>

<style lang="css" scoped>
@import '../../styles/video-player.css';
</style>
