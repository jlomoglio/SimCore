<template>
    <div id="continue-button" v-if="assessmentWindowIsExpanded && !assessmentSubmitted" @click="expandAssessmentWindow"></div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'AssessmentContinueButton',
        computed: mapGetters({
            assessmentWindowIsExpanded: 'getAssessmentWindowIsCollapsed',
            assessmentSubmitted: 'getSubmitAssessmentWindow'
        }),
        methods: {
            expandAssessmentWindow () {
                this.$store.commit('expandAssessmentWindow')
            }
        }
    }
</script>

<style scoped>
    #continue-button {
        position: absolute;
        right: 45px;
        bottom: 88px;
        background: url('/assets/img/buttons/horizontal/continue.png');
        background-size: 100% 100%;
        cursor: pointer;
        width: 150px;
        height: 32px;
        z-index: 25;
    }
    #continue-button:active {
        background: url('/assets/img/buttons/horizontal/continue_over.png');
        background-size: 100% 100%;
    }
</style>
