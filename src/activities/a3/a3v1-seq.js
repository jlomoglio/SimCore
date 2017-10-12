// Required to import Data file and Vue
import ResponseData from '../../data/a3/a3-response-data.json'
import TaskData from '../../data/a3/a3-task-data.json'
import AssessmentData from '../../data/a3/a3-assessments.json'
import Vue from 'vue'
import { TweenMax, Draggable } from 'gsap'

// Incorrect Response function calls common negitive responses
const incorrectResponse = function() {
    this.$core.Activity.Audio.response(
        ResponseData.incorrect.vo,
        ResponseData.incorrect.cc
    )
}

// TASK 1: Constructor
// Select the Charge button.
const t1 = function() {
    // Set current task
    this.currentTask = 't1'
    // Show the lightbox
    this.$core.Activity.showLightBox()
    // Update LCD screen
    this.screenTxt1 = 'REFRIG 6.34 LBS'
    this.screenTxt2 = ''
    this.screenTxt3 = 'SELECT FUNCTION'
    this.screenTxt4 = ''
    // Play task audio
    this.$core.Activity.Audio.play(
        TaskData.t1.vo,
        TaskData.t1.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
        }
    )
}

// TASK 1: Action 1 (Click Charge Button)
const t1a1 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide hint
    this.t1ShowHint = false
    // Adjust LCD Display
    this.screenTxt1 = 'CHARGE 02.00 LBS'
    this.screenTxt2 = 'CHARGE CHANGES UNIT'
    this.screenTxt3 = 'ARROWS CHANGE AMOUNT'
    this.screenTxt4 = 'START TO BEGIN'
    // Call correct response
    this.$core.Activity.correct(
        ResponseData.correct.t1.vo,
        ResponseData.correct.t1.cc,
        () => {
            // Call task narrative
            this.t1Narrative()
        }
    )
}

// TASK 1: Narrative
const t1Narrative = function() {
    this.$core.Activity.Audio.play(
        TaskData.narrative2.vo,
        TaskData.narrative2.cc,
        () => {
            // Call task completed
            this.t1Completed()
        }
    )
}

const t1Completed = function() {
    // Complete the task
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

// TASK 2: Constructor
// Select the arrow to adjust the machine to the
// correct weight of refrigerant.
const t2 = function() {
    // Set the current task
    this.currentTask = 't2'
    // Play task audio
    this.$core.Activity.Audio.play(
        TaskData.t2.vo,
        TaskData.t2.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
            // Set the current task
            this.currentTask = 't2a2'
        }
    )
}

// TASK 2: Action 2 (Click Up Button)
const t2a1 = function() {
    // Set current task
    this.currentTask = 't2a2'
    // Enable inccorect
    this.isClickable = true
    // Manage counter
    if (this.chargeCounter !== 0) {
        this.chargeCounter = (this.chargeCounter - 1)
    }
    // 02.10
    if (this.timerCounter === 0) {
        this.screenTxt1 = this.timerText[0]
    }
    // 02.10
    else if (this.timerCounter === 1) {
        this.screenTxt1 = this.timerText[1]
    }
    // 02.00
    else if (this.timerCounter === 2) {
        this.screenTxt1 = this.timerText[2]
    }
}

// TASK 2: Action 2 (Click Down Button)
const t2a2 = function() {
    // Disable incorrect
    this.isClickable = false
    // Set current task
    this.currentTask = 't2a2'
    // Check if the hint is shown
    if (this.t2a2ShowHint === true) {
        // Set the correct time
        this.screenTxt1 = this.chargeText[4]
        // Clear the hint
        this.t2a2ShowHint = false
        // Call task completed
        this.t2Completed()
    } else {
        // Increment charge counter if not correct weight
        if (this.chargeCounter !== 4) {
            this.chargeCounter = (this.chargeCounter + 1)
        }
        // 02.20
        if (this.chargeCounter === 0) {
            this.screenTxt1 = this.chargeText[0]
        }
        // 02.10
        else if (this.chargeCounter === 1) {
            this.screenTxt1 = this.chargeText[1]
        }
        // 02.00
        else if (this.chargeCounter === 2) {
            this.screenTxt1 = this.chargeText[2]
        }
        // 01.90
        else if (this.chargeCounter === 3) {
            this.screenTxt1 = this.chargeText[3]
        }
        // 01.80
        else if (this.chargeCounter === 4) {
            this.screenTxt1 = this.chargeText[4]
            // Call complete task
            this.t2Completed()
        }
    }
}

// TASK 2: Completed
const t2Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t2.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.t3()
}

// TASK 3: Constructor
// Press the Start button.
const t3 = function() {
    // Set current task
    this.currentTask = 't3'
    // Play task audio
    this.$core.Activity.Audio.play(
        TaskData.t3.vo,
        TaskData.t3.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
        }
    )
}

// TASK 3: Action 1 (Click Start Button)
const t3a1 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide hint
    this.t3ShowHint = false
    // Update LCD screen
    this.screenTxt1 = '00.00 LBS'
    this.screenTxt2 = ''
    this.screenTxt3 = 'CHARGE IN PROGRESS'
    this.screenTxt4 = 'DO NOT DISTURB!'
    // Call correct response
    this.$core.Activity.correct(
        ResponseData.correct.t3.vo,
        ResponseData.correct.t3.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
            // Call task completed
            this.t3Completed()
        }
    )
}

// TASK 3: Task Completed
const t3Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t3.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.t4()
}

// TASK 4: Constructor
// Rotate the high-side hand valve to open it.
const t4 = function() {
    // Set current task
    this.currentTask = 't4'
    // Play task audio
    this.$core.Activity.Audio.play(
        TaskData.t4.vo,
        TaskData.t4.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
            // Call next task action
            this.t4a1()
        }
    )
}

// TASK 4: Action 1 (Rotate high-side knob)
const t4a1 = function() {
    // Reassign this
    let vm = this
    // Enable Draggable on high-side knob
    Draggable.create('#knob-high', {
        type: 'rotation',
        throwProps: true,
        bounds: {
            minRotation: 0,
            maxRotation: -90
        },
        onDrag: function() {
            // Disable incorrect while dragging
            this.isClickable = false
            // Hide hint
            this.t4ShowHint = false
        },
        onRelease: function() {
            // Enable incorrect
            this.isClickable = true
            // Check that the valave is open
            if (this.rotation === 0) {
                vm.t4a3()
            }
        }
    })
}

// TASK 4: Action 2 (Click to Rotate high-side valve)
const t4a2 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide hint
    this.t4ShowHint = false
    // Auto rotate the knob
    TweenMax.set('#knob-high', {
        rotation: -90
    })
    this.t4a3()
}

// TASK 4: Action 3 (Update LCD screen)
const t4a3 = function() {
    // Call correct response
    this.$core.Activity.correct(
        ResponseData.correct.t4.vo,
        ResponseData.correct.t4.cc,
        () => {
            // Rotate needle to 70 psi
            TweenMax.to('#needle-high', 0, {
                rotation: -4
            })
            // Increase charge output from 00.00 to 01.80
            setTimeout(this.updateCharge(), 1000)
            // Rotate low-side needle to 70 psi
            TweenMax.to('#needle-low', 6.0, {
                rotation: 143
            })
        }
    )
}

// TASK 4: Action 4 (Update LCD screen)
const t4a4 = function() {
    // Update LCD screen
    this.screenTxt1 = 'CHARGED 01.80 LBS'
    this.screenTxt2 = ''
    this.screenTxt3 = 'PRESS START TO'
    this.screenTxt4 = 'EQUALIZE HOSES'
    // Complete task
    this.t4Completed()
}

// TASK 4: Task Completed
const t4Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t4.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Show continue button & call assessment
    this.$core.ContinueButton.show()
    this.$core.ContinueButton.callback(() => {
        Vue.core.ContinueButton.hide()
        this.assessment()
    })
}

// Activity 3: Assessment
const assessment = function() {
    // Config the assessment
    this.$core.Activity.Assessment.config(AssessmentData.assessment1, () => {
        // Show the assessment
        this.$core.Activity.Assessment.hide()
        // Call next task
        this.t5()
    })
    // Show the assessment
    this.$core.Activity.Assessment.show()
    // Call assessment audio
    this.$core.Activity.Audio.play(
        AssessmentData.assessment1.vo,
        null,
        () => {
            // Disable incorrect
            this.isClickable = true
        }
    )
}

// TASK 5: Constructor
// Rotate the high-side hand valve to close it.
const t5 = function() {
    // Set current task
    this.currentTask = 't5'
    // Play task audio
    this.$core.Activity.Audio.play(
        TaskData.t5.vo,
        TaskData.t5.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
            // Call next task action
            this.t5a1()
        }
    )
}

// TASK 5: Action 1 (Rotate high-side knob to close it)
const t5a1 = function() {
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
            this.isClickable = false
            // Hide hint
            this.t5ShowHint = false
        },
        onRelease: function() {
            // Enable incorrect
            this.isClickable = true
            // Check that the valave is closed
            if (this.rotation === 0) {
                // Call next task
                vm.t5a3()
            }
        }
    })
}

// TASK 5: Action 2 (Click to Rotate high-side valve)
const t5a2 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide hint
    this.t5ShowHint = false
    // Auto rotate the knob
    TweenMax.set('#knob-high', {
        rotation: 0
    })
    this.t5a3()
}

// TASK 5: Action 3 (high-side guage 0 psi)
const t5a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t5ShowHint = false
    // Update lcd display
    this.screenTxt1 = 'DISCONNECT HS HOSE'
    this.screenTxt2 = 'OPEN PANEL VALVES'
    this.screenTxt3 = 'AND START A/C MAX'
    this.screenTxt4 = 'START TO CONTINUE'
    // Call correct response
    this.$core.Activity.correct(
        ResponseData.correct.t5.vo,
        ResponseData.correct.t5.cc,
        () => {
            // Call task completed
            this.t5Completed()
        }
    )
}

// TASK 5: Task Completed
const t5Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t5.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call end activity
    this.endActivity()
}

// End Activity 2 (Required)
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
    t1,
    t1a1,
    t1Narrative,
    t1Completed,
    t2,
    t2a1,
    t2a2,
    t2Completed,
    t3,
    t3a1,
    t3Completed,
    t4,
    t4a1,
    t4a2,
    t4a3,
    t4a4,
    t4Completed,
    t5,
    t5a1,
    t5a2,
    t5a3,
    t5Completed,
    assessment,
    endActivity
}
