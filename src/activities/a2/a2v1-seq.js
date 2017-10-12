// Required to import Data file and Vue
import ResponseData from '../../data/a2/a2-response-data.json'
import TaskData from '../../data/a2/a2-task-data.json'
import AssessmentData from '../../data/a2/a2-assessments.json'
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
// Select the Power button to turn the AC machine on.
const t1 = function() {
    this.currentTask = 't1'
    this.$core.Activity.showLightBox()

    this.screenTxt1 = 'REFRIG 6.34LB'
    this.screenTxt3 = 'SELECT FUNCTION'

    this.$core.Activity.Audio.play(
        TaskData.t1.vo,
        TaskData.t1.cc,
        () => { this.isClickable = true }
    )
}

// TASK 1: Action 1 (Click Vacuum Button)
const t1a1 = function() {
    let vm = this
    this.isClickable = false
    this.t1ShowHint = false

    this.screenTxt1 = 'CHECKING PRESSURES'
    this.screenTxt3 = ''

    window.setTimeout(function() {
        vm.t1Completed()
    }, 2000)
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

    this.t2()
}

// TASK 2: Constructor
// Now set the timer for 15 minutes.
const t2 = function() {
    this.currentTask = 't2a1'

    this.screenTxt1 = 'VACUUM 00:00'
    this.screenTxt2 = 'ARROWS CHANGE TIMER'
    this.screenTxt3 = 'ENTER NEW TIME OR'
    this.screenTxt4 = 'START TO CONTINUE'

    this.$core.Activity.Audio.play(
        TaskData.t2.vo,
        TaskData.t2.cc,
        () => { this.isClickable = true }
    )
}

// TASK 2: Action 2 (Click Up Button)
const t2a1 = function() {
    this.isClickable = false
    this.currentTask = 't2a1'

    // Check if the hint is shown
    if (this.t2a1ShowHint === true) {
        // Set the correct time
        this.screenTxt1 = this.timerText[3]
        // Clear the hint
        this.t2a1ShowHint = false
        // Call correct response
        this.$core.Activity.correct(
            ResponseData.correct.t2.vo,
            ResponseData.correct.t2.cc,
            () => { this.t2Completed() }
        )
    } else {
        if (this.timerCounter !== 4) {
            this.timerCounter = (this.timerCounter + 1)
        }

        // 00:00
        if (this.timerCounter === 0) {
            this.screenTxt1 = this.timerText[0]
        }
        // 05:00
        else if (this.timerCounter === 1) {
            this.screenTxt1 = this.timerText[1]
        }
        // 10:00
        else if (this.timerCounter === 2) {
            this.screenTxt1 = this.timerText[2]
        }
        // 15:00
        else if (this.timerCounter === 3) {
            this.screenTxt1 = this.timerText[3]
            this.$core.Activity.correct(
                ResponseData.correct.t2.vo,
                ResponseData.correct.t2.cc,
                () => { this.t2Completed() }
            )
        }
        // 20:00
        else if (this.timerCounter === 4) {
            this.screenTxt1 = this.timerText[4]
        }
    }
}

// TASK 2: Action 2 (Click Down Button)
const t2a2 = function() {
    this.currentTask = 't2a1'
    this.isClickable = true

    if (this.timerCounter !== 0) {
        this.timerCounter = (this.timerCounter - 1)
    }

    // 00:00
    if (this.timerCounter === 0) {
        this.screenTxt1 = this.timerText[0]
    }

    // 05:00
    else if (this.timerCounter === 1) {
        this.screenTxt1 = this.timerText[1]
    }

    // 10:00
    else if (this.timerCounter === 2) {
        this.screenTxt1 = this.timerText[2]
    }

    // 15:00
    else if (this.timerCounter === 3) {
        this.screenTxt1 = this.timerText[3]
    }

    // 20:00
    else if (this.timerCounter === 4) {
        this.screenTxt1 = this.timerText[4]
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

    this.t3()
}

// TASK 3: Constructor
// Press the Start button.
const t3 = function() {
    this.currentTask = 't3'

    this.$core.Activity.Audio.play(
        TaskData.t3.vo,
        TaskData.t3.cc,
        () => { this.isClickable = true }
    )
}

// TASK 3: Action 1 (Click Start Button)
const t3a1 = function() {
    this.isClickable = false
    let vm = this

    this.screenTxt3 = ''
    this.screenTxt4 = ''
    window.setTimeout(() => {
        vm.updateTimer()
    }, 100)
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

    this.t4()
}

// TASK 4: Constructor
// Rotate the low-side hand valve to open it.
const t4 = function() {
    this.currentTask = 't4'

    this.$core.Activity.Audio.play(
        TaskData.t4.vo,
        TaskData.t4.cc,
        () => {
            this.isClickable = true
            this.t4a1()
        }
    )
}

// TASK 4: Action 1 (Rotate low-side knob)
const t4a1 = function() {
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
                vm.t4a3()
            }
        }
    })
}

// TASK 4: Action 2 (Click to Rotate low-side valve)
const t4a2 = function() {
    TweenMax.set('#knob-low', {
        rotation: -90
    })
    this.t4a3()
}

// TASK 4: Action 3 (low-side guage 10" hg)
const t4a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t10ShowHint = false
    // Rotate needle
    TweenMax.to('#needle-low', 6.0, {
        rotation: -48
    })

    this.$core.Activity.correct(
        ResponseData.correct.t4.vo,
        ResponseData.correct.t4.cc,
        () => {
            this.isClickable = true
            this.t4Completed()
        }
    )
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
    // Call next task
    this.t5()
}

// TASK 5: Constructor
// Rotate the low-side hand valve to open it.
const t5 = function() {
    this.currentTask = 't5'

    this.$core.Activity.Audio.play(
        TaskData.t5.vo,
        TaskData.t5.cc,
        () => {
            this.isClickable = true
            this.t5a1()
        }
    )
}

// TASK 5: Action 1 (Rotate high-side knob)
const t5a1 = function() {
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
            this.isClickable = false
        },
        onRelease: function() {
            // Enable incorrect
            this.isClickable = true
            // Check that the valave is open
            if (this.rotation === -90) {
                vm.t5a3()
            }
        }
    })
}

// TASK 4: Action 2 (Click to Rotate low-side valve)
const t5a2 = function() {
    TweenMax.set('#knob-high', {
        rotation: -90
    })
    this.t5a3()
}

// TASK 4: Action 3 (high-side guage 0 psi)
const t5a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t5ShowHint = false
    // Update lcd display
    this.screenTxt1 = 'VACUUM COMPLETE'
    this.screenTxt3 = 'ANY KEY EXITS'
    // Call correct response
    this.$core.Activity.correct(
        ResponseData.correct.t4.vo,
        ResponseData.correct.t4.cc,
        () => {
            this.isClickable = true
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
    // Call next task
    this.t6()
}

// TASK 6: Constructor
// Vacuum Complete. Close Low-Side valve
const t6 = function() {
    // Set the current task
    this.currentTask = 't6'
    // Play the task audio
    this.$core.Activity.Audio.play(
        TaskData.t6.vo,
        TaskData.t6.cc,
        () => {
            // Enable incorrect
            this.isClickable = true
            // Call next task
            this.t6a1()
        }
    )
}

// TASK 6: Action 1 (Drag to Roatate low-side valve)
const t6a1 = function() {
    // Reassign this for Draggable
    let vm = this
    // Enable dragging
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
                // Call next task
                vm.t6a3()
            }
        }
    })
}

// TASK 6: Action 2 (Click to Rotate low-side valve)
const t6a2 = function() {
    // Disable incorrect
    this.isClickable = false
    // Animate knob to open position
    TweenMax.set('#knob-low', {
        rotation: 0
    })
    // Call next task
    this.t6a3()
}

// TASK 6: Action 3 (Click to Rotate low-side valve)
const t6a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t6ShowHint = false
    // Call correct response
    this.$core.Activity.correct(
        ResponseData.correct.t6.vo,
        ResponseData.correct.t6.cc,
        () => {
            // Hide hint
            this.t12ShowHint = false
            // Call next task
            this.t6Completed()
        }
    )
}

// TASK 6: Completed
const t6Completed = function() {
    // Call task completed
    this.$core.Activity.taskComplete(
        TaskData.t6.reportLabel,
        this.currentAttempts,
        this.currentPoints
    )
    // Reset points
    this.currentPoints = 3
    // Reset attempts
    this.currentAttempts = 1
    // Call next task
    this.t7()
}

// TASK 7: Constructor
// Close High-Side valve
const t7 = function() {
    // Set the currect task
    this.currentTask = 't7'
    // Call task audio
    this.$core.Activity.Audio.play(
        TaskData.t7.vo,
        TaskData.t7.cc,
        () => {
            // Enable incoorect
            this.isClickable = true
            // Call next task
            this.t7a1()
        }
    )
}

// TASK 7: Action 1 (Drag to Rotate high-side valve)
const t7a1 = function() {
    // Reassign this for Draggable
    let vm = this
    // Enable dragging
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
                this.t7a3()
            }
        }
    })
}

// TASK 7: Action 2 (Click to Rotate high-side valve)
const t7a2 = function() {
    // Disable incorrect
    this.isClickable = false
    // Animate knob to open position
    TweenMax.set('#knob-high', {
        rotation: 0
    })
    // Call next task
    this.t7a3()
}

// TASK 7: Action 3 (Click to Rotate high-side valve)
const t7a3 = function() {
    // Disable incorrect
    this.isClickable = false
    // Hide HintBox
    this.t7ShowHint = false
    // Update lcd display
    this.screenTxt1 = 'REFRIG 6.34LBS'
    this.screenTxt3 = 'SELECT FUNCTION'
    // Call correct response
    this.$core.Activity.correct(
        ResponseData.correct.t7.vo,
        ResponseData.correct.t7.cc,
        () => {
            // Hide hint
            this.t7ShowHint = false
            // Call next task
            this.t7Completed()
        }
    )
}

// TASK 7: Completed
const t7Completed = function() {
    // Complete the task
    this.$core.Activity.taskComplete(
        TaskData.t7.reportLabel,
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

// Activity 2: Assessment
const assessment = function() {
    // Config the assessment
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
    t4Completed,
    t5,
    t5a1,
    t5a2,
    t5a3,
    t5Completed,
    t6,
    t6a1,
    t6a2,
    t6a3,
    t6Completed,
    t7,
    t7a1,
    t7a2,
    t7a3,
    t7Completed,
    assessment,
    endActivity
}
