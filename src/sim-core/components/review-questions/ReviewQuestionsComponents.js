import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
    randomizeQuestionAnswers,
    checkAnswersWithFeedback
} from '../../core/review-questions'
import rqData from '../../../data/review-questions-data.json'

export const RqView = Vue.component('RqView', {
    template: `<div class="view" v-if="viewId === currentRQViewId"><slot></slot></div>`,
    props: ['viewId'],
    computed: mapGetters({
        currentRQViewId: 'getCurrentReviewQuestionsViewId'
    })

})

export const RqRow = Vue.component('RqRow', {
    template: `<div class="row"><slot></slot></div>`
})

export const RqColumn = Vue.component('RqColumn', {
    template: `<div class="column"><slot></slot></div>`
})

export const RqQuestion = Vue.component('RqQuestion', {
    template: `<div class="question" :id="'question_' + question.id">
                    <div class="question-title">
                        <span>{{ question.id }}.</span>
                        <span v-html="question.question"></span>
                    </div>
                    <div class="answers">
                    <div v-if="answer"
                         v-for="answer in question.answers"
                         :id="'answer_' + answer.id"
                         class="option"
                    >

                        <input v-if="answer.type == 'radio'"
                               :id="'question_'+ question.id +'_radioBtn_'+ answer.id"
                               type="radio"
                               :name="'question_'+ question.id"
                               :value="answer.id"
                               @click="userSelectedAnswer($event)"
                        >

                        <input v-else
                               :id="'question_'+question.id+'_radioBtn_'+ answer.id"
                               type="checkbox"
                               :name="'question_'+question.id"
                               :value="answer.id"
                               @click="userCheckedAnswer($event)"
                        >

                        <label v-bind:for="'question_'+ question.id +'_radioBtn_' + answer.id" v-html="answer.answer"></label>
                    </div>
                </div>
                </div>`,
    props: ['questionId'],
    data () {
        return {
            question: randomizeQuestionAnswers(rqData[`question${this.questionId}`])
        }
    }
})

export const RqContinue = Vue.component('RqContinue', {
    template: `<div class="btn-continue" v-if="reviewQuestionsSubmitted" @click.nativ="nextRQView()" title="Continue"></div>`,
    computed: mapGetters({
        currentRQViewId: 'getCurrentReviewQuestionsViewId',
        reviewQuestionsSubmitted: 'getReviewQuestionsSubmitted'
    }),
    methods: {
        nextRQView () {
            this.$store.commit('setReviewQuestionsSubmitted', false)
            this.$store.commit('setCurrentReviewQuestionsViewId', (this.currentRQViewId + 1))
        }
    }
})

export const RqSubmit = Vue.component('RqSubmit', {
    template: `<div class="btn-submit" v-show="showRQSubmitButton" @click="submit()" title="Submit"></div>`,
    data () {
        return {
            showRQSubmitButton: true,
            totalReviewQuestions: document.querySelectorAll('#review-questions-template .question').length
        }
    },
    computed: mapGetters({
        userAnswers: 'getReviewQuestionsUserAnswers'
    }),
    methods: {
        submit () {
            const totalReviewQuestions = document.querySelectorAll('#review-questions-template .question').length
            if (totalReviewQuestions === this.userAnswers.length) {
                this.showRQSubmitButton = false
                checkAnswersWithFeedback(rqData)
            }
        }
    }
})

export const RqViewScoreCard = Vue.component('RqViewScoreCard', {
    template: `<div class="btn-view-scorecard" v-if="reviewQuestionsSubmitted"
                @click="viewScoreCard()" title="View score card"></div>`,
    computed: mapGetters({
        reviewQuestionsSubmitted: 'getReviewQuestionsSubmitted'
    }),
    methods: {
        viewScoreCard () {
            this.$store.commit('setCurrentView', 'ViewScoreCard')
        }
    }
})
