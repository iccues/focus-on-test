<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    accept?: string;
    file?: File;
    fileSrc?: string;
}>();

const emit = defineEmits<{
    (e: 'update:file', file: File | undefined): void;
    (e: 'update:fileSrc', fileSrc: string | undefined): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref<string | undefined>(undefined);
const fileSrc = ref<string | undefined>(undefined);

function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const selectedFile = target.files[0];

        if (fileSrc.value) {
            URL.revokeObjectURL(fileSrc.value);
        }

        fileSrc.value = URL.createObjectURL(selectedFile);
        fileName.value = selectedFile.name;

        emit('update:file', selectedFile);
        emit('update:fileSrc', fileSrc.value);
    }
}
</script>

<template>
    <div class="file-input__container">
        <button class="file-input__button" type="button" @click="fileInput?.click()">
            <slot />
        </button>
        <span v-if="fileName" :title="fileName">{{ fileName }}</span>
        <input
            type="file"
            ref="fileInput"
            :accept="accept"
            @change="handleFileSelect"
            style="display: none;"
            tabindex="-1"
        />
    </div>
</template>

<style scoped>
</style>
