// Required to import Data file and Vue
import ResponseData from './data/a1-response-data.json'
import TaskData from './data/a1-task-data.json'
import Vue from 'vue'

// IncorrectVO function calls common negitive responses
const incorrectResponse = function() {
    this.$core.Activity.Audio.play(
        ResponseData.incorrect.vo,
        ResponseData.incorrect.cc
    )
}

// INTRO SCREEN
const introScreen = function() {
    this.$core.Activity.showIntro()
}

// NARRATIVE
const narrative = function() {
    this.$core.Activity.Audio.play(
        TaskData.narrative1.vo,
        TaskData.narrative1.cc,
        () => { this.t1() }
    )
}

// TASK 1: Constructor
const t1 = function() {
    this.currentTask = 't1'

    this.$core.Activity.Audio.play(
        TaskData.t1.vo,
        TaskData.t1.cc,
        () => { this.isClickable = true }
    )
}

// TASK 1: Action 1 ()
const t1a1 = function() {
    this.isClickable = false
    this.$core.Activity.correct(
        ResponseData.correct.t1.vo,
        ResponseData.correct.t1.cc,
        () => {
            this.t1ShowHint = false
            this.isClickable = true
            this.t1Completed()
        }
    )
}

// TASK 1: Completed (Required)
const t1Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t1.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.t2()
}

// Transistion To View (Required)
// This is called to transistion to next view
const transitionToView = function() {
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        Vue.core.ContinueButton.hide()
        Vue.core.Activity.nextView('A1V2')
    })
}

// Required to export all functions created in this file.
export default {
    incorrectResponse,
    introScreen,
    narrative,
    t1,
    t1a1,
    t1Completed,
    transitionToView
}
