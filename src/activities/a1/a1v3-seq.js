// Required to import Data file and Vue
import ResponseData from '../../data/a1/a1-response-data.json'
import TaskData from '../../data/a1/a1-task-data.json'
import AssessmentData from '../../data/a1/a1-assessments.json'
import Vue from 'vue'
import { TweenMax, Draggable } from 'gsap'

// Incorrect Response function calls common negitive responses
const incorrectResponse = function() {
    this.$core.Activity.Audio.response(
        ResponseData.incorrect.vo,
        ResponseData.incorrect.cc
    )
}

// TASK 7: Constructor
// Select the Power button to turn the AC machine on.
const t7 = function() {
    this.currentTask = 't7'
    this.$core.Activity.showLightBox()

    this.$core.Activity.Audio.play(
        TaskData.t7.vo,
        TaskData.t7.cc,
        () => { this.isClickable = true }
    )
}

// TASK 7: Action (Turn on the AC Machine)
const t7a1 = function() {
    this.isClickable = false

    // Power Button
    this.powerButtonOn = true

    // Light Masks
    this.lowSideMaskIsShow = false
    this.highSideMaskIsShow = false

    // Needles
    TweenMax.to('#needle-low-small', 1.0, {
        rotation: 144
    })
    TweenMax.to('#needle-high-small', 1.0, {
        rotation: 3
    })

    // Screen Text
    this.screenTxt1 = 'REFRIG 15LB 06OZ'
    this.screenTxt3 = 'SELECT FUNCTION'

    // VO & CC
    this.$core.Activity.correct(
        ResponseData.correct.t7.vo,
        ResponseData.correct.t7.cc,
        () => {
            this.t7ShowHint = false
            this.isClickable = true
            this.t7Completed()
        }
    )
}

// TASK 7: Completed (Required)
const t7Completed = function() {
    // Task Completed
    this.$core.Activity.taskComplete(
        TaskData.t7.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.isClickable = false
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        Vue.core.ContinueButton.hide()
        this.t8()
    })
}

// Task 8: Constructor
// Now, select the Recover button.
const t8 = function() {
    this.currentTask = 't8'
    this.fullPopOutIsShown = false
    this.leftRightPopOutIsShown = true
    this.screenTxt1 = 'REFRIG 15LB 06OZ'
    this.screenTxt3 = 'SELECT FUNCTION'

    this.$core.Activity.Audio.play(
        TaskData.t8.vo,
        TaskData.t8.cc,
        () => { this.isClickable = true }
    )
}

// TASK 8: Action (Click the Recover button)
// No correct response
const t8a1 = function() {
    this.isClickable = false
    this.t8ShowHint = false
    this.t8Completed()
}

// TASK 8: Completed (Required)
const t8Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t8.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.t9()
}

// Task 9: Constructor
// Select start.
const t9 = function() {
    this.currentTask = 't9'
    this.$core.Activity.Audio.play(
        TaskData.t9.vo,
        TaskData.t9.cc,
        () => { this.isClickable = true }
    )
}

// TASK 9: Action (Click the start button)
const t9a1 = function() {
    this.isClickable = false
    this.screenTxt1 = 'RECOVER IN PROGRESS'
    this.screenTxt2 = 'CLEARING'
    this.screenTxt3 = ''
    this.screenTxt4 = 'STOP TO PAUSE'
    this.$core.Activity.correct(
        ResponseData.correct.t9.vo,
        ResponseData.correct.t9.cc,
        () => {
            this.t9ShowHint = false
            this.t9Completed()
        }
    )
}

// TASK 9: Completed (Required)
const t9Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t9.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.t10()
}

// Task 10: Constructor
// Rotate the low-side hand valve to open it.
const t10 = function() {
    this.currentTask = 't10'

    this.$core.Activity.Audio.play(
        TaskData.t10.vo,
        TaskData.t10.cc,
        () => {
            this.isClickable = true
            this.t10a1()
        }
    )
}

// TASK 10: Action 1 (Rotate low-side valve)
const t10a1 = function() {
    let vm = this
    Draggable.create('#knob-low', {
        type: 'rotation',
        throwProps: true,
        bounds: {
            minRotation: 0,
            maxRotation: -90
        },
        onDrag: function() {
            // Disable incorrect while dragging
            this.isClickable = false
        },
        onRelease: function() {
            // Enable incorrect
            this.isClickable = true
            // Check that the valave is open
            if (this.rotation === -90) {
                vm.t10a3()
            }
        }
    })
}

// TASK 10: Action 2 (Click to Rotate low-side valve)
const t10a2 = function() {
    TweenMax.set('#knob-low', {
        rotation: -90
    })
    this.t10a3()
}

// TASK 10: Action (low-side guage 10" hg)
const t10a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t10ShowHint = false
    // Rotate needle
    TweenMax.to('#needle-low', 6.0, {
        rotation: -26
    })

    this.$core.Activity.correct(
        ResponseData.correct.t10.vo,
        ResponseData.correct.t10.cc,
        () => {
            this.isClickable = true
            this.t10Completed()
        }
    )
}

// TASK 10: Completed (Required)
const t10Completed = function() {
    this.$core.Activity.taskComplete(
        TaskData.t10.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.t11()
}

// Task 11: Constructor
// Rotate the high-side hand valve to open it.
const t11 = function() {
    this.currentTask = 't11'
    this.$core.Activity.Audio.play(
        TaskData.t11.vo,
        TaskData.t11.cc,
        () => {
            this.isClickable = true
            this.t11a1()
        }
    )
}

// TASK 11: Action 1 (Rotate high-side valve)
const t11a1 = function() {
    // leftPopOut Low-Side valve
    let vm = this
    Draggable.create('#knob-high', {
        type: 'rotation',
        throwProps: true,
        bounds: {
            minRotation: 0,
            maxRotation: -90
        },
        onDrag: function() {
            // Disable incorrect while dragging
            vm.isClickable = false
        },
        onRelease: function() {
            // Enable incorrect
            vm.isClickable = true
            // Check that the valave is open
            if (this.rotation === -90) {
                vm.t11a3()
            }
        }
    })
}

// TASK 11: Action 2 (Click to Rotate high-side valve)
const t11a2 = function() {
    // Animate knob to open position
    TweenMax.set('#knob-high', {
        rotation: -90
    })
    // Now call next action
    this.t11a3()
}

// TASK 11: Action 3 (high-side guage 0 psi)
const t11a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t11ShowHint = false
    // Rotate needle
    TweenMax.to('#needle-high', 5.0, {
        rotation: -49
    })

    this.$core.Activity.correct(
        ResponseData.correct.t11.vo,
        ResponseData.correct.t11.cc,
        () => {
            this.t11a4()
        }
    )
}

// TASK 11: Action 4
const t11a4 = function() {
    this.recoverUpdate1()
}

// TASK 11: Completed
// Complete task 11 and prep for task 12
const t11Completed = function() {
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
    this.t12()
}

// TASK 12: Constructor
// Recovery Complete. Close Low-Side valve
const t12 = function() {
    this.currentTask = 't12'

    this.$core.Activity.Audio.play(
        TaskData.t12.vo,
        TaskData.t12.cc,
        () => {
            this.isClickable = true
            this.t12a1()
        }
    )
}

// TASK 12: Action 1 (Drag to Roatate low-side valve)
const t12a1 = function() {
    this.isClickable = true
    let vm = this
    Draggable.create('#knob-low', {
        type: 'rotation',
        throwProps: true,
        bounds: {
            minRotation: -90,
            maxRotation: 0
        },
        onDrag: function() {
            // Disable incorrect while dragging
            vm.isClickable = false
        },
        onRelease: function() {
            // Enable incorrect
            vm.isClickable = true
            // Check that the valave is open
            if (this.rotation === 0) {
                vm.t12a3()
            }
        }
    })
}

// TASK 12: Action 2 (Click to Rotate low-side valve)
const t12a2 = function() {
    this.isClickable = false

    // Animate knob to open position
    TweenMax.set('#knob-low', {
        rotation: 0
    })
    // Call next task
    this.t12a3()
}

// TASK 12: Action 3 (Click to Rotate low-side valve)
const t12a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t12ShowHint = false

    this.$core.Activity.correct(
        ResponseData.correct.t12.vo,
        ResponseData.correct.t12.cc,
        () => {
            this.t12ShowHint = false
            this.t12Completed()
        }
    )
}

// TASK 12: Completed
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
    // Call next task
    this.t13()
}

// TASK 13: Constructor
// Close High-Side valve
const t13 = function() {
    this.currentTask = 't13'
    this.$core.Activity.Audio.play(
        TaskData.t13.vo,
        TaskData.t13.cc,
        () => {
            this.isClickable = true
            this.t13a1()
        }
    )
}

// TASK 13: Action 1 (Drag to Rotate high-side valve)
const t13a1 = function() {
    this.isClickable = true
    let vm = this
    Draggable.create('#knob-high', {
        type: 'rotation',
        throwProps: true,
        bounds: {
            minRotation: -90,
            maxRotation: 0
        },
        onDrag: function() {
            // Disable incorrect while dragging
            vm.isClickable = false
        },
        onRelease: function() {
            // Enable incorrect
            vm.isClickable = true
            // Check that the valave is open
            if (this.rotation === 0) {
                this.t13a3()
            }
        }
    })
}

// TASK 13: Action 2 (Click to Rotate high-side valve)
const t13a2 = function() {
    this.isClickable = false

    // Animate knob to open position
    TweenMax.set('#knob-high', {
        rotation: 0
    })
    // Call next task
    this.t13a3()
}

// TASK 13: Action 3 (Click to Rotate high-side valve)
const t13a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t13ShowHint = false

    // Set screen text
    this.screenTxt1 = 'REFRIG 15LB 06OZ'
    this.screenTxt2 = ''
    this.screenTxt3 = ''
    this.screenTxt4 = 'SELECT FUNCTION'

    this.$core.Activity.correct(
        ResponseData.correct.t13.vo,
        ResponseData.correct.t13.cc,
        () => {
            this.t13ShowHint = false
            this.t13Completed()
        }
    )
}

// TASK 13: Completed
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

    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        Vue.core.ContinueButton.hide()
        this.assessment()
    })
}

// Activity 1: Assessment
const assessment = function() {
    this.$core.Activity.Assessment.config(AssessmentData.assessment1, () => {
        // Call final narrative
        this.$core.Activity.Audio.play(
            TaskData.narrative3.vo,
            TaskData.narrative3.cc,
            () => {
                // Disable incorrect
                this.isClickable = false
                // End the activity
                this.endActivity()
            }
        )
    })
    this.$core.Activity.Assessment.show()

    this.$core.Activity.Audio.play(
        AssessmentData.assessment1.vo,
        null,
        () => {
            this.isClickable = true
        }
    )
}

// End Activity 1 (Required)
// This is called to end the activity
const endActivity = function() {
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        this.$core.Activity.Assessment.hide()
        Vue.core.ContinueButton.hide()
        Vue.core.Activity.end()
    })
}

// Required to export all functions created in this file.
export default {
    incorrectResponse,
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
    t10a2,
    t10a3,
    t10Completed,
    t11,
    t11a1,
    t11a2,
    t11a3,
    t11a4,
    t11Completed,
    t12,
    t12a1,
    t12a2,
    t12a3,
    t12Completed,
    t13,
    t13a1,
    t13a2,
    t13a3,
    t13Completed,
    assessment,
    endActivity
}
