<template>
    <div class="module-footer">
        <closed-caption-bar></closed-caption-bar>
        <score-box></score-box>
    </div>
</template>

<script>
import ClosedCaptionBar from './ClosedCaptionBar'
import ScoreBox from './ScoreBox'

export default {
    name: 'ModuleFooter',
    components: {
        ClosedCaptionBar,
        ScoreBox
    }
}
</script>

<style scoped>
.module-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
	z-index: 11;
}
</style>
