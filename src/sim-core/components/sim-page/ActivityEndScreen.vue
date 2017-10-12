<template>
    <div id="activity-end-screen" v-if="this.showActivityScreen">
        <div id="content" v-html="this.content"></div>
        <div id="btn-continue" v-if="activitiesIncomplete" @click="goToNextActivity"></div>
        <div id="btn-review" v-if="!activitiesIncomplete" @click="goToReviewQuestions"></div>
    </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { goToNextActivity, goToReviewQuestions, getEOAData } from '../../core/activity'
import { playAudio } from '../../core/audio-player'

export default {
    name: 'EndActivityScreen',
    methods: {
        goToNextActivity,
        goToReviewQuestions
    },
    computed: {
        ...mapGetters({
            showActivityScreen: 'getEndActivityScreenIsShown',
            currentActivityId: 'getCurrentActivityId',
            activities: 'getActivities'
        }),
        activitiesIncomplete() {
            let incompleted = _.filter(this.activities, (activity) => { return activity.completed === false })
            return (incompleted.length > 0)
        },
        content() {
            return getEOAData(this.currentActivityId).content
        }
    },
    watch: {
        showActivityScreen(newVal) {
            if (newVal === true) {
                let eoaData = getEOAData(this.currentActivityId)
                if (eoaData) {
                    playAudio(eoaData.vo, null)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #activity-end-screen {
        background: transparent;
        height: 580px;
        left: 0;
        position: absolute;
        top: 45px;
        width: 1000px;
        z-index: 60;

        #content {
            display: block;
            position: relative;
            font-family: Roboto-Medium;
            width: 960px;
            background: #fff;
            color: #272626;
            font-size: 19px;
            height: auto;
            line-height: 25px;
            margin: 0 auto;
            padding: 20px;
            top: 230px;
            text-align: center;
            z-index: 20;
        }

        #btn-continue {
            background: rgba(0, 0, 0, 0) url('/assets/img/buttons/horizontal/continue.png') repeat scroll 0 0 / 100% 100%;
            cursor: pointer;
            display: block;
            height: 43px;
            margin: 20px auto;
            position: relative;
            width: 200px;
            top: 230px;

            &:active {
                background: rgba(0, 0, 0, 0) url('/assets/img/buttons/horizontal/continue_over.png') repeat scroll 0 0 / 100% 100%;
            }
        }
        #btn-review {
            background: rgba(0, 0, 0, 0) url('/assets/img/buttons/horizontal/review_questions.png') repeat scroll 0 0 / 100% 100%;
            cursor: pointer;
            display: block;
            height: 43px;
            margin: 20px auto;
            position: relative;
            width: 200px;
            top: 230px;

            &:active {
                background: rgba(0, 0, 0, 0) url('/assets/img/buttons/horizontal/review_questions_over.png') repeat scroll 0 0 / 100% 100%;
            }

        }
    }


</style>
