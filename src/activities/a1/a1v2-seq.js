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
// TASK 1: Constructor
// turn the ignition on.
const t6 = function() {
    this.currentTask = 't6a1'
    this.$core.Activity.showLightBox()

    this.$core.Activity.Audio.play(
        TaskData.t6.vo,
        TaskData.t6.cc,
        () => { this.isClickable = true }
    )
}

// TASK 6: Turn the ignition on
const t6a1 = function() {
    let vm = this
    this.isClickable = false
    this.t1ShowHint = false
    window.setTimeout(function() {
        this.isClickable = true
        vm.t6Completed()
    }, 1000)
}

const t6Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t6.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    // Reset points
    this.currentPoints = 0
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.isClickable = false
    this.t7()
}

// TASK 7: Constructor
const t7 = function() {
    this.currentTask = 't7a1'
    this.$core.Activity.Audio.play(
        TaskData.t7.vo,
        TaskData.t7.cc,
        () => { this.isClickable = true }
    )
}

// TASK 2: put car in drive
const t7a1 = function() {
    this.isClickable = true
    this.t7Completed()
}

// TASK 7: Completed
const t7Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t7.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    // Reset points
    this.currentPoints = 0
    // Reset attempts
    this.currentAttempts = 1
    // call next task
    this.isClickable = false
    this.t8()
}

// TASK 8: Constructor.
const t8 = function() {
    this.currentTask = 't8a1'
    // brake
    this.$core.Activity.Audio.play(
        TaskData.t8.vo,
        TaskData.t8.cc,
        () => { this.isClickable = true }
    )
}

// TASK 3: Apply brake
const t8a1 = function() {
    let vm = this
    this.isClickable = false
    this.showCylinderFlow = true
    window.setTimeout(function() {
        vm.isClickable = true
    }, 1000)
}

// TASK 8: Task Completed
const t8Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t8.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    // Reset points
    this.currentPoints = 0

    // Reset attempts
    this.currentAttempts = 1
    // call next task
    this.isClickable = false
    this.t9()
}

// TASK 9: Constructor
// put car in park.
const t9 = function() {
    this.currentTask = 't9a1'
    this.$core.Activity.Audio.play(
        TaskData.t9.vo,
        TaskData.t9.cc,
        () => { this.isClickable = true }
    )
}

const t9a1 = function() {
    let vm = this
    this.isClickable = false
    window.setTimeout(function() {
        vm.isClickable = true
        vm.t9Completed()
    }, 2000)
}
const t9Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t9.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    this.currentPoints = 0
    // call next task
    this.isClickable = false
    this.t10()
}

// TASK 10: Constructor
// turn off ignition - lock
const t10 = function() {
    this.currentTask = 't10a1'
    this.currentAction = 'lock'
    this.$core.Activity.Audio.play(
        TaskData.t10.vo,
        TaskData.t10.cc,
        () => { this.isClickable = true }
    )
}

// TASK 5: Action 1 (Rotate high-side knob)
const t10a1 = function() {
    this.isClickable = false
    window.setTimeout(() => {
        this.isClickable = true
        this.t10Completed()
    })
}

// TASK 10: Completed
const t10Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t10.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    // call next task
    this.isClickable = false
    this.transitionToView()
}

// Transistion To View (Required)
// This is called to transistion to next view
const transitionToView = function() {
    const vm = this
    this.$core.ContinueButton.show()
    this.isClickable = true
    this.$core.ContinueButton.callback(() => {
        vm.$core.ContinueButton.hide()
        vm.$core.Activity.nextView('A1V3')
    })
}

// Required to export all functions created in this file.
export default {
    incorrectResponse,
    t6,
    t6a1,
    t6Completed,
    t7,
    t7a1,
    t7Completed,
    t8,
    t8a1,
    t8Completed,
    t9,
    t9a1,
    t9Completed,
    t10,
    t10a1,
    t10Completed,
    transitionToView
}
