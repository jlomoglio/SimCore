// Required to import Data file and Vue
import ResponseData from '../../data/a1/a1-response-data.json'
import TaskData from '../../data/a1/a1-task-data.json'

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

// TASK 1: Action (Blue Cap)
// Select to remove the cap of the low-side service port.
const t1a1 = function() {
    this.isClickable = false
    this.$core.Activity.correct(
        ResponseData.correct.t1.vo,
        ResponseData.correct.t1.cc,
        () => {
            this.blueCapOn = false
            this.blueCapOff = true
            this.t1ShowHint = false
            this.isClickable = true
            this.t1Completed()
        }
    )
}

// TASK 1: Completed (Required)
const t1Completed = function() {
    console.log(this.currentAttempts)
    this.$core.Activity.taskComplete(
        TaskData.t1.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    this.currentPoints = 3
    this.t2()
}

// Task 2: Constructor
const t2 = function() {
    this.currentTask = 't2'

    this.$core.Activity.Audio.play(
        TaskData.t2.vo,
        TaskData.t2.cc,
        () => { this.isClickable = true }
    )
}

// TASK 2: Action (Red Cap)
// Select to remove the cap of the high-side service port.
const t2a1 = function() {
    this.isClickable = false
    this.$core.Activity.correct(
        ResponseData.correct.t1.vo,
        ResponseData.correct.t1.cc,
        () => {
            this.redCapOn = false
            this.redCapOff = true
            this.t2ShowHint = false
            this.isClickable = true
            this.t2Completed()
        }
    )
}

// TASK 2: Completed (Required)
const t2Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t2.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    this.transitionToView()
}

// Transistion To View (Required)
// This is called to transistion to next view
const transitionToView = function() {
    const vm = this
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        vm.$core.ContinueButton.hide()
        vm.$core.Activity.nextView('A1V2')
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
    t2,
    t2a1,
    t2Completed,
    transitionToView
}
