<template>
	<div id="assessment-window"
		class="assessment"
		:class="{ expanded: isExpanded, collapsed: isCollapsed }"
		v-if="this.$store.getters.getAssessmentWindowIsShown"
	>
        <div id="assessment-header">
            <span class="minMaxIcon" :class="{ minimized: isCollapsed, maximized: isExpanded }" title="Minimize" @click="triggerMinMax()"></span>
        </div>
        <div id="assessment-content" class="assessment-content">
            <div :id="'question_' + assessment.id" class="question">
                <div class="question-title">{{ assessment.question }}</div>
                <div class="answers">
                    <div v-if="answer"
                         v-for="answer in assessment.answers"
                         :id="'answer_' + answer.id"
                         class="option"
                    >

                        <input v-if="answer.type == 'radio'"
                               :id="'question_'+ assessment.id +'_radioBtn_'+ answer.id"
                               type="radio"
                               :name="'question_'+ assessment.id"
                               :value="answer.id"
                               @click="userSelectedAnswer($event)"
                        >

                        <input v-else
                               :id="'question_'+assessment.id+'_radioBtn_'+ answer.id"
                               type="checkbox"
                               :name="'question_'+assessment.id"
                               :value="answer.id"
                               @click="userCheckedAnswer($event)"
                        >

                        <label v-bind:for="'question_'+ assessment.id +'_radioBtn_' + answer.id">{{ answer.answer }}</label>
                    </div>
                </div>
            </div>
		</div>
        <div id="assessment-footer" v-if="isExpanded">
            <div id="submit-button" class="submit" v-show="!submitted" @click="submitAssessment"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Draggable } from 'gsap'
import { addCheckboxAnswer,
    removeCheckboxAnswer,
    addRadioAnswer,
    checkAnswersWithFeedback } from '../../../core/assessment'

export default {
    name: 'AssessmentWindow',
    updated() {
        // Assign the assessment window element height
        var drag = document.getElementById('assessment-window')

        // Makes the assessment window draggable
        Draggable.create(drag, {
            type: 'x,y',
            bounds: '#activity-area',
            zIndexBoost: false,
            onDrag: function () {
                // sets the drag boundries
                this.applyBounds({
                    minY: -5,
                    // convert returned height to int and make negitive for bottom offset
                    maxY: -(parseInt(window.getComputedStyle(drag).height) - 495),
                    minX: -690,
                    maxX: 10
                })
            }
        })
    },
    data () {
        return {
            elemHeight: null,
            userAnswers: []
        }
    },
    computed: {
        isExpanded () {
            return this.$store.getters.getAssessmentWindowIsExpanded
        },
        isCollapsed () {
            return this.$store.getters.getAssessmentWindowIsCollapsed
        },
        ...mapGetters({
            assessment: 'getAssessmentWindowData',
            callback: 'getAssessmentWindowCallback',
            submitted: 'getSubmitAssessmentWindow'
        })
    },
    watch: {
        isExpanded (newVal) {
            this.isExpanded = newVal
        },
        isCollapsed (newVal) {
            this.isCollapsed = newVal
        },
        assessment (newVal) {
            this.userAnswers = []
            this.$store.commit('submitAssessmentWindow', false)
        }
    },
    methods: {
        triggerMinMax () {
            if (this.isExpanded === true) {
                this.$store.commit('collapseAssessmentWindow')
                this.isExpanded = false
                this.isCollapsed = true
            } else {
                this.$store.commit('expandAssessmentWindow')
                this.isExpanded = true
                this.isCollapsed = false
            }
        },
        userSelectedAnswer: function (elem) {
            const qid = elem.target.parentNode.parentNode.parentNode.id.replace('question_', '')
            this.userAnswers = addRadioAnswer(this.userAnswers, {qid: qid, answers: [{ id: parseInt(elem.target.value) }]})
        },
        userCheckedAnswer: function (elem) {
            const qid = elem.target.parentNode.parentNode.parentNode.id.replace('question_', '')
            if (elem.target.checked) {
                this.userAnswers = addCheckboxAnswer(this.userAnswers, {qid: qid, answers: { id: parseInt(elem.target.value) }})
            } else {
                this.userAnswers = removeCheckboxAnswer(this.userAnswers, {qid: qid, answers: { id: parseInt(elem.target.value) }})
            }
        },
        submitAssessment: function () {
            if (this.userAnswers.length > 0) {
                checkAnswersWithFeedback(this.assessment, this.userAnswers)
                const fn = this.callback
                fn()
                this.$store.commit('submitAssessmentWindow', true)
            }
        }
    }
}
</script>

<style scoped>
.expanded {
	max-height: 600px;
}

.collapsed {
	max-height: 20px;
	overflow: hidden;

	-webkit-transition: max-height 0.1s;
	-moz-transition: max-height 0.1s;
	transition: max-height 0.1s;
}

#assessment-window {
    position: absolute;
    font-family: Roboto-Bold;
    width: 300px;
    height: auto;
    background:#FFF;
    top: 80px;
    left: 690px;
    float: right;
    z-index: 8;
    -webkit-box-shadow: 3px 3px 10px;
    -moz-box-shadow: 3px 3px 10px;
    box-shadow: 3px 3px 10px;

	cursor: default;
}

#assessment-window  > #assessment-header {
    position: relative;
    background: url(/assets/img/module/activity_bar.jpg);
	background-size: 100%;
    width: 300px;
    height: 20px;
    cursor: move;
}

#assessment-window  > #assessment-header > .minMaxIcon {
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 10px;
    cursor: pointer;
}

#assessment-window  > #assessment-header .minMaxIcon.minimized {
    background: url(/assets/img/icons/down_icon.png) no-repeat 0% 0% / 100% 100%;
}

#assessment-window  > #assessment-header .minMaxIcon.maximized {
    background: url(/assets/img/icons/up_icon.png) no-repeat 0% 0% / 100% 100%;
}

#assessment-window  > #assessment-content {
    position: relative;
    width: 300px;
    max-height: 390px;
	height: auto;
	min-height: 0;
    padding-left: 20px;
	padding-right: 20px;
    padding-bottom: 0;
	padding-top: 0;
    line-height: 16px;
    font-size: 15px;
    box-sizing: border-box;
	cursor: default;
}

#assessment-window  > #assessment-content > .question {
	position: relative;
	width: 260px;
}

#assessment-window  > #assessment-content > .question > .question-title {
	position: relative;
	width: 260px;
	margin: 20px 0px 20px -20px;
	padding-left: 10px;
	font-size: 15px;
	font-family: Roboto-Medium;
	line-height: 17px;
}

#assessment-window  > #assessment-content > .question > .answers {
	position: relative;
	width: 260px;
	margin-top: 0px;
}

#assessment-window  > #assessment-content > .question > .answers > .option {
	position: relative;
	width: 100%;
	height: 26px;
	padding-left: 30px;
	text-align: left;
}

#assessment-window  > #assessment-content > .question > .answers > .option > .tickmark {
	float: left;
	width: 26px;
	height: 26px;
	margin-left: -18px;
}

#assessment-window  > #assessment-content > .question > .answers > .option.correct {
	background: url(/assets/img/icons/tick.png) no-repeat 2px -3px;
}

#assessment-window  > #assessment-content > .question > .answers > .option.incorrect {
	background: url(/assets/img/icons/cross.png) no-repeat 2px 1px;
}

#assessment-window  > #assessment-content > .question > .answers > .option > input[type="radio"],
#assessment-window  > #assessment-content > .question > .answers > .option > input[type="checkbox"] {
    opacity:0;
    pointer-events: all;
}
#assessment-window  > #assessment-content > .question > .answers > .option > input[type="radio"]:not(old) + label {
    display: inline-block;
    margin-left: -25px;
    padding-left: 25px;
    min-height: 18px;
    background: url(/assets/img/icons/radio.png) no-repeat 0 0;
    pointer-events: all;
}
#assessment-window  > #assessment-content > .question >
.answers > .option > input[type=radio]:not(old):checked + label {
    background: url(/assets/img/icons/radio-selected.png) no-repeat 0 0;
    pointer-events: all;
}

#assessment-window  > #assessment-content > .question >
.answers > .option > input[type="checkbox"]:not(old) + label {
    display: inline-block;
    margin-left: -25px;
    padding-left: 25px;
    min-height: 18px;
    background: url(/assets/img/icons/checkbox.png) no-repeat 0 0;
    pointer-events: all;
}

#assessment-window  > #assessment-content > .question >
.answers > .option > input[type=checkbox]:not(old):checked + label {
    background: url(/assets/img/icons/checkbox_select.png) no-repeat 0 0;
}

#assessment-window > #assessment-footer {
    float: left;
    width: 100%;
    height: 32px;
	margin-top: 5px;
	margin-bottom: 20px;
    text-align: center;
}

#assessment-window #submit-button {
	position: relative;
	padding-top: 22px;
	margin: auto;
	width: 150px;
	height: 10px;
    background: url(/assets/img/buttons/horizontal/submit.png);
    background-size: 100% ;
    cursor: pointer;
    background-position-y: bottom;
}

#assessment-window .btn-continue {
    float: none;
}

#assessment-window  #submit-button:active {
    background: url(/assets/img/buttons/horizontal/submit_over.png);
    background-size: 100% 100%;
}

#assessment-window .assessment .answers .option.correct {
    background: url(/assets/img/icons/tick.png) no-repeat 2px -3px;
}

#assessment-window .assessment .answers .option.incorrect {
    background: url(/assets/img/icons/cross.png) no-repeat 0px -3px;
}
</style>
