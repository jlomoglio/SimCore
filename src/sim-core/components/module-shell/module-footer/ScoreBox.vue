<template>
  <div id="score-box">
    SCORE: <span class="score">{{ score }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ScoreBox',
    computed: {
        ...mapGetters({
            score: 'getModulescore'
        })
    }
}
</script>

<style>
#score-box {
	position: absolute;
	right: 0;
	left: 830px;
    height: 50px;
	font-family: RobotoSlab-Bold;
    font-size: 16px;
    color: #FDEE1C;
    line-height: 50px;
    text-align: left;
    padding: 0px 20px;
	background: rgba(0,0,0,0.9);
}

.score {
    color: #fff;
}
</style>
