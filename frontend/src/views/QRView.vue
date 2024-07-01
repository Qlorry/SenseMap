<template>
    <h1>This is qr page</h1>
    <div class="container">
        <video id="qr-video"></video>
    </div>

</template>

<script setup lang="ts">
import QrScanner from 'qr-scanner';
import { onMounted, ref } from 'vue';

const camQrResult = ref('');

function setResult(result: QrScanner.ScanResult) {
    console.log(result.data);
    camQrResult.value = result.data;
}

onMounted(async () => {
    const video = document.getElementById('qr-video') as HTMLVideoElement;


    // ####### Web Cam Scanning #######

    const scanner = new QrScanner(video, result => setResult(result), {
        onDecodeError: error => {
            camQrResult.value = error instanceof (Error) ? error.message : error;
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
    });

    scanner.start().then(() => {

        // QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
        //     const option = document.createElement('option');
        //     option.value = camera.id;
        //     option.text = camera.label;
        //     camList.add(option);
        // }));
    });
})


</script>

<style scoped>
div {
    margin-bottom: 16px;
}

#video-container {
    line-height: 0;
}

#video-container.example-style-1 .scan-region-highlight-svg,
#video-container.example-style-1 .code-outline-highlight {
    stroke: #64a2f3 !important;
}

#video-container.example-style-2 {
    position: relative;
    width: max-content;
    height: max-content;
    overflow: hidden;
}

#video-container.example-style-2 .scan-region-highlight {
    border-radius: 30px;
    outline: rgba(0, 0, 0, .25) solid 50vmax;
}

#video-container.example-style-2 .scan-region-highlight-svg {
    display: none;
}

#video-container.example-style-2 .code-outline-highlight {
    stroke: rgba(255, 255, 255, .5) !important;
    stroke-width: 15 !important;
    stroke-dasharray: none !important;
}

#flash-toggle {
    display: none;
}

hr {
    margin-top: 32px;
}

input[type="file"] {
    display: block;
    margin-bottom: 16px;
}
</style>