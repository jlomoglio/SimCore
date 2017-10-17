// Required to import Data file and Vue
import ResponseData from '../../data/a2/a2-response-data.json'
import TaskData from '../../data/a2/a2-task-data.json'

// IncorrectVO function calls common negitive responses
const incorrectResponse = function() {
    this.$core.Activity.Audio.play(
        ResponseData.incorrect.vo,
        ResponseData.incorrect.cc
    )
}
// TASK 1: Constructor
// turn the ignition on.
const t1 = function() {
    this.currentTask = 't1a2'
    this.$core.Activity.showLightBox()

    this.$core.Activity.Audio.play(
        TaskData.t1.vo,
        TaskData.t1.cc,
        () => { this.isClickable = true }
    )
}

// TASK 1: Turn the ignition on
const t1a2 = function() {
    let vm = this
    this.isClickable = false
    this.t1ShowHint = false
    window.setTimeout(function() {
        vm.t1Completed()
    }, 2000)
}

const t1Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t1.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    // Reset points
    this.currentPoints = 0
    // Reset attempts
    this.currentAttempts = 1

    this.t2()
}

// TASK 2: Constructor
const t2 = function() {
    this.currentTask = 't2a2'
    this.isClickable = false
    this.$core.Activity.Audio.play(
        TaskData.t2.vo,
        TaskData.t2.cc
    )
}

// TASK 2: put car in drive
const t2a2 = function() {
    this.isClickable = false
    this.currentTask = 't2a2'
    var vm = this
    console.log('task 2 action 1 drive')
    // Check if the hint is shown
    window.setTimeout(function() {
        vm.t2Completed()
    }, 2000)
}

// TASK 2: Completed
const t2Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t2.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    // Reset points
    this.currentPoints = 0
    // Reset attempts
    this.currentAttempts = 1

    this.t3()
}

// TASK 3: Constructor.
const t3 = function() {
    this.currentTask = 't3a2'
    this.isClickable = false
    // brake
    this.$core.Activity.Audio.play(
        TaskData.t3.vo,
        TaskData.t3.cc
    )
}

// TASK 3: Apply brake
const t3a2 = function() {
    this.showCylinderFlow = true
}

// TASK 3: Task Completed
const t3Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t3.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    // Reset points
    this.currentPoints = 0

    // Reset attempts
    this.currentAttempts = 1

    this.t4()
}

// TASK 4: Constructor
// put car in park.
const t4 = function() {
    this.currentTask = 't4a2'
    this.$core.Activity.Audio.play(
        TaskData.t4.vo,
        TaskData.t4.cc
    )
}

const t4a2 = function() {
    this.t4Completed()
}
const t4Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t3.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    this.currentPoints = 0
    this.t5()
}

// TASK 5: Constructor
// turn off ignition - lock
const t5 = function() {
    this.isClickable = false
    this.currentTask = 't5a2'
    this.currentAction = 'lock'
    this.$core.Activity.Audio.play(
        TaskData.t5.vo,
        TaskData.t5.cc
    )
}

// TASK 5: Action 1 (Rotate high-side knob)
const t5a2 = function() {
    this.t5Completed()
}

// TASK 5: Completed
const t5Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t5.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
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
        vm.$core.Activity.nextView('a2V2')
    })
}

// Required to export all functions created in this file.
export default {
    incorrectResponse,
    t1,
    t1a2,
    t1Completed,
    t2,
    t2a2,
    t2Completed,
    t3,
    t3a2,
    t3Completed,
    t4,
    t4a2,
    t4Completed,
    t5,
    t5a2,
    t5Completed,
    transitionToView
}
