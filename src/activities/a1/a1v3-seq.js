// Required to import Data file and Vue
import ResponseData from '../../data/a1/a1-response-data.json'
import TaskData from '../../data/a1/a1-task-data.json'
import AssessmentData from '../../data/a1/a1-assessments.json'
import Vue from 'vue'

// IncorrectVO function calls common negitive responses
const incorrectResponse = function() {
    this.$core.Activity.Audio.play(
        ResponseData.incorrect.vo,
        ResponseData.incorrect.cc
    )
}
// TASK 1: Constructor
// turn the ignition on.
const t11 = function() {
    this.currentTask = 't11'
    this.$core.Activity.showLightBox()

    this.$core.Activity.Audio.play(
        TaskData.t11.vo,
        TaskData.t11.cc,
        () => { this.isClickable = true }
    )
}

// TASK 6: Turn the ignition on
const t11a1 = function() {
    let vm = this
    this.isClickable = false
    this.t1ShowHint = false
    window.setTimeout(function() {
        this.isClickable = true
        vm.t11Completed()
    }, 1000)
}

const t11Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t11.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.isClickable = false
    this.t12()
}

// TASK 2: Constructor
const t12 = function() {
    this.currentTask = 't12'
    this.currentAction = 'drive'
    this.isClickable = false
    this.$core.Activity.Audio.play(
        TaskData.t12.vo,
        TaskData.t12.cc,
        () => { this.isClickable = true }
    )
}

// TASK 2: put car in drive
const t12a1 = function() {
    this.isClickable = false
    this.currentTask = 't12a1'
    var vm = this
    // Check if the hint is shown
    window.setTimeout(function() {
        vm.isClickable = true
        vm.t12Completed()
    }, 2000)
}

// TASK 2: Completed
const t12Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t12.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // call next task
    this.isClickable = false
    this.t13()
}

// TASK 8: Constructor.
const t13 = function() {
    this.currentTask = 't13'
    // brake
    this.$core.Activity.Audio.play(
        TaskData.t13.vo,
        TaskData.t13.cc,
        () => { this.isClickable = true }
    )
}

// TASK 3: Apply brake
const t13a1 = function() {
    let vm = this
    this.isClickable = false
    this.stopRotor = true
    this.showArrows()
    window.setTimeout(function() {
        vm.isClickable = true
    }, 1000)
}

// TASK 8: Task Completed
const t13Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t13.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3

    // Reset attempts
    this.currentAttempts = 1
    // call next task
    this.isClickable = false
    this.t14()
}

// TASK 4: Constructor
// put car in park.
const t14 = function() {
    this.currentTask = 't14'
    this.currentAction = 'park'
    this.$core.Activity.Audio.play(
        TaskData.t14.vo,
        TaskData.t14.cc,
        () => { this.isClickable = true }
    )
}

const t14a1 = function() {
    this.isClickable = false
    let vm = this
    window.setTimeout(function() {
        vm.isClickable = true
        vm.t14Completed()
    }, 1000)
}
const t14Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t14.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    this.currentPoints = 3
    this.currentAttempts = 1
    // call next task
    this.isClickable = false
    this.t15()
}

// TASK 10: Constructor
// turn off ignition - lock
const t15 = function() {
    this.currentTask = 't15'
    this.currentAction = 'lock'
    this.$core.Activity.Audio.play(
        TaskData.t15.vo,
        TaskData.t15.cc,
        () => { this.isClickable = true }
    )
}

// TASK 5: Action 1 (Rotate high-side knob)
const t15a1 = function() {
    this.isClickable = false
    window.setTimeout(() => {
        this.isClickable = true
        this.t15Completed()
    })
}

// TASK 10: Completed
const t15Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t15.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // call next task
    this.isClickable = false
    // Show continue button & call assessment
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        Vue.core.ContinueButton.hide()
        this.assessment()
    })
}
// Assesment
const assessment = function() {
    // Config the assessment
    this.$core.Activity.Assessment.config(AssessmentData.assessment2, () => {
        // Disable incorrect
        this.isClickable = false
        // go to next screen
        this.transitionToView()
    })
    // Show the assessment
    this.$core.Activity.Assessment.show()
    // Call assessment audio
    this.$core.Activity.Audio.play(
        AssessmentData.assessment2.vo,
        AssessmentData.assessment2.cc,
        () => {
            // Disable incorrect
            this.isClickable = true
        }
    )
}

// Transistion To View (Required)
// This is called to transistion to next view
const transitionToView = function() {
    const vm = this
    this.$core.ContinueButton.show()
    this.isClickable = true
    this.$core.ContinueButton.callback(() => {
        this.$core.Activity.Assessment.hide()
        vm.$core.ContinueButton.hide()
        vm.$core.Activity.end()
    })
}
// Required to export all functions created in this file.
export default {
    incorrectResponse,
    t11,
    t11a1,
    t11Completed,
    t12,
    t12a1,
    t12Completed,
    t13,
    t13a1,
    t13Completed,
    t14,
    t14a1,
    t14Completed,
    t15,
    t15a1,
    t15Completed,
    transitionToView,
    assessment
}
