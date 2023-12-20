<template>
    <div class="playground">
        <div ref="parent" class="gamemap">
            <canvas ref="canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { GameMap } from '../assets/scripts/GameMap.js'
import { ref, onMounted } from 'vue'
export default {
    setup(){
        let parent = ref(null)
        let canvas = ref(null)
        onMounted(() => {
            new GameMap(canvas.value.getContext('2d'), parent.value)
        });
        return {
            parent,
            canvas
        }
    }
}
</script>

<style scoped>
div.playground{
    width: 60vw;
    height: 70vh;
    margin: 40px auto;
}
div.gamemap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>