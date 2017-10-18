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
    this.showContentBox = true
    this.t1()
}
// TASK 1: Constructor
// turn the ignition on.
const t1 = function() {
    this.currentTask = 't1'
    this.$core.Activity.showLightBox()

    this.$core.Activity.Audio.play(
        TaskData.t1.vo,
        TaskData.t1.cc,
        () => { this.isClickable = true }
    )
}

// TASK 1: Turn the ignition on
const t1a1 = function() {
    let vm = this
    this.isClickable = false
    this.t1ShowHint = false
    window.setTimeout(function() {
        vm.isClickable = true
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
    // call next task
    this.isClickable = false
    this.t2()
}

// TASK 2: Constructor
const t2 = function() {
    this.currentTask = 't2'
    this.isClickable = false
    this.$core.Activity.Audio.play(
        TaskData.t2.vo,
        TaskData.t2.cc,
        () => { this.isClickable = true }
    )
}

// TASK 2: put car in drive
const t2a1 = function() {
    this.isClickable = false
    this.currentTask = 't2a1'
    var vm = this
    // Check if the hint is shown
    window.setTimeout(function() {
        vm.isClickable = true
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
    // call next task
    this.isClickable = false
    this.t3()
}

// TASK 3: Constructor.
const t3 = function() {
    this.currentTask = 't3'
    this.isClickable = false
    // brake
    this.$core.Activity.Audio.play(
        TaskData.t3.vo,
        TaskData.t3.cc,
        () => { this.isClickable = true }
    )
}

// TASK 3: Apply brake
const t3a1 = function() {
    this.isClickable = false
    let vm = this
    this.showCylinderFlow = true
    window.setTimeout(function() {
        vm.isClickable = true
    }, 1000)
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
    // call next task
    this.isClickable = false
    this.t4()
}

// TASK 4: Constructor
// put car in park.
const t4 = function() {
    this.currentTask = 't4'
    this.$core.Activity.Audio.play(
        TaskData.t4.vo,
        TaskData.t4.cc,
        () => { this.isClickable = true }
    )
}

const t4a1 = function() {
    this.isClickable = false
    let vm = this
    window.setTimeout(function() {
        vm.isClickable = true
        vm.t4Completed()
    }, 1000)
}
const t4Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t3.reportLabel,
        this.currentAttempts,
        this.currentPoints = 3
    )
    this.currentPoints = 0
    // call next task
    this.isClickable = false
    this.t5()
}

// TASK 5: Constructor
// turn off ignition - lock
const t5 = function() {
    this.currentTask = 't5'
    this.currentAction = 'lock'
    this.$core.Activity.Audio.play(
        TaskData.t5.vo,
        TaskData.t5.cc,
        () => { this.isClickable = true }
    )
}

// TASK 5: turn off the ignition
const t5a1 = function() {
    this.isClickable = false
    let vm = this
    window.setTimeout(function() {
        vm.isClickable = true
        vm.t5Completed()
    }, 1000)
}

// TASK 5: Completed
const t5Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t5.reportLabel,
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
    t3,
    t3a1,
    t3Completed,
    t4,
    t4a1,
    t4Completed,
    t5,
    t5a1,
    t5Completed,
    transitionToView
}
