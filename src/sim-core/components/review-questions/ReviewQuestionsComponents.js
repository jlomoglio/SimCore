import Vue from 'vue'
import { mapGetters } from 'vuex'
import {
    addRadioAnswer,
    addCheckboxAnswer,
    removeCheckboxAnswer,
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
    },
    mounted: function() {
        let expectAbvAllArr = this.filterArrayItems(this.question.answers, 'notequal')
        let abvAllArr = this.filterArrayItems(this.question.answers, 'equal')
        this.question.answers = Object.assign(expectAbvAllArr)
        this.question.answers.push(abvAllArr[0])
    },

    methods: {
        filterArrayItems: function(arrayItems, eqOperators) {
            return arrayItems.map(function(item) {
                if (eqOperators === 'notequal') {
                    if (item.id !== 4) {
                        return item
                    }
                }
                if (eqOperators === 'equal') {
                    if (item.id === 4) {
                        return item
                    }
                }
            }).filter(function(item) {
                if (item) {
                    return item
                }
            })
        },
        userSelectedAnswer: function (elem) {
            const qid = elem.target.parentNode.parentNode.parentNode.id.replace('question_', '')
            addRadioAnswer({qid: qid, answers: [{id: parseInt(elem.target.value)}]})
        },
        userCheckedAnswer: function (elem) {
            const qid = elem.target.parentNode.parentNode.parentNode.id.replace('question_', '')
            if (elem.target.checked) {
                this.userAnswers = addCheckboxAnswer(this.userAnswers, {
                    qid: qid,
                    answers: {id: parseInt(elem.target.value)}
                })
            } else {
                this.userAnswers = removeCheckboxAnswer(this.userAnswers, {
                    qid: qid,
                    answers: {id: parseInt(elem.target.value)}
                })
            }
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
