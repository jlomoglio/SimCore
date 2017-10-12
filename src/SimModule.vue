<template>
    <div id="simModule">
        <component :is="currentView"></component>
        <dev-box></dev-box>
    </div>
</template>

<script>
// Data & State Properties
import ModuleDataObj from './data/module-data.json'
import ModuleObj from './sim-core/store/module.json'
import VideoPageObj from './sim-core/store/video-page.json'
import IconBarObj from './sim-core/store/icon-bar.json'
import ComponentsObj from './sim-core/store/components.json'
import WidgetsObj from './sim-core/store/widgets.json'
import AudioPlayerObj from './sim-core/store/audio-player.json'

// Page & Requried Components
import HomePage from './sim-core/components/home-page/HomePage'
import VideoPage from './sim-core/components/video-page/VideoPage'
import SimPage from './sim-core/components/sim-page/SimPage'
import ReviewQuestions from './sim-core/components/review-questions/ReviewQuestions'
import ViewScoreCard from './sim-core/components/view-score-card/ViewScoreCard'
import PerformanceReport from './sim-core/components/performance-report/PerformanceReport'
/* develblock:start */
import DevBox from './sim-core/components/DevBox'
/* develblock:end */

export default {
    name: 'SimModule',
    created () {
        this.$store.dispatch('setModuleData', ModuleDataObj)
        this.$store.dispatch('setModule', ModuleObj)
        this.$store.dispatch('setVideoPage', VideoPageObj)
        this.$store.dispatch('setIconBar', IconBarObj)
        this.$store.dispatch('setComponents', ComponentsObj)
        this.$store.dispatch('setWidgets', WidgetsObj)
        this.$store.dispatch('setAudioPlayer', AudioPlayerObj)
    },
    components: {
        /* develblock:start */
        DevBox,
        /* develblock:end */
        HomePage,
        VideoPage,
        SimPage,
        ReviewQuestions,
        ViewScoreCard,
        PerformanceReport
    },
    computed: {
        currentView () {
            return this.$store.getters.getCurrentView
        }
    },
    methods: {
        setSeriesName1 (seriesName1) {
            this.$store.commit('setSeriesName1', seriesName1)
        },
        setSeriesName2 (seriesName2) {
            this.$store.commit('setSeriesName2', seriesName2)
        },
        setModuleType (moduleType) {
            this.$store.commit('setModuleType', moduleType)
        },
        setModuleName (moduleName) {
            this.$store.commit('setModuleName', moduleName)
        }
    }
}
</script>

<style>
@import '/assets/css/fonts.css';

body {
    margin: 0;
}

p {
    display: block;
    -webkit-margin-before: 0px;
    -webkit-margin-after: 0px;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}


#simModule {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: absolute;
    width: 1000px;
    height: 625px;
    left: 50%;
    margin-left: -500px;
}

h1 {
    color: blue;
}
</style>
