<script setup lang="ts">
import { ref } from 'vue';
import VideoPlayer from './components/video-player/VideoPlayer.vue';
import FileInput from './components/FileInput.vue';

const videoSrc = ref<string | undefined>(undefined);

const focusOnSrc = ref<string | undefined>(undefined);

const videoPlayerRef = ref<typeof VideoPlayer | null>(null);
const playerVisibility = ref(false);

function loadPlayer() {
    playerVisibility.value = true;
    if (videoPlayerRef.value) {
        videoPlayerRef.value.loadVideo();
        videoPlayerRef.value.loadFocusOn();
    }
}

</script>

<template>
    <div v-show="!playerVisibility">
        <FileInput
            accept="video/*"
            v-model:file-src="videoSrc"
        >Select Video</FileInput>
        <FileInput
            accept=".fon.json"
            v-model:file-src="focusOnSrc"
        >Select Focus On File</FileInput>
        <button @click="loadPlayer">load</button>
    </div>

    <div v-show="playerVisibility" class="app-container">
        <VideoPlayer
            ref="videoPlayerRef"
            :src="videoSrc"
            :focus-on="focusOnSrc"
        />
        <div class="close-btn-container">
            <button class="close-btn" @click="playerVisibility = false">
                <img src="./assets/icons/return.svg" alt="Close Video Player" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: black;
}

.app-container:hover .close-btn-container {
    opacity: 1;
    pointer-events: auto;
}

.close-btn-container {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;

    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 40px;

    opacity: 0;
    pointer-events: none;
}

.close-btn {
    background: none;
    border: none;
    padding: auto;

    height: 100%;
    width: 100%;

    color: white;
}
</style>
