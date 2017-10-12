import _ from 'lodash'
import store from '../store/store'
import Vue from 'vue'
// let assessmentWindow = store.state.components.assessmentWindow

export const addUserAnswer = (answer) => {

}

export const removeUserAnswer = (answer) => {

}

export const showUserAnswersFeedback = () => {

}

const randomizeQuestionAnswers = (assessment) => {
    if (assessment.randomize) {
        let randomizeAnswers = assessment.answers.sort(function () {
            return 0.5 - Math.random()
        })
        assessment['answers'] = randomizeAnswers
    }

    return assessment
}

export const addRadioAnswer = (userAnswers, userAnswer) => {
    userAnswers = _.filter(userAnswers, (answer) => {
        return answer.qid !== userAnswer.qid
    })
    userAnswers.push(userAnswer)
    return userAnswers
}

export const addCheckboxAnswer = (userAnswers, userAnswer) => {
    // Retrieve the answer from the user's answers
    let foundUserAnswer = _.filter(userAnswers, (answer) => {
        return answer.qid === userAnswer.qid
    })[0]

    // if answer does not exist, just add it to the array.
    if (!foundUserAnswer) {
        userAnswer.answers = [{ id: userAnswer.answers.id }]
        userAnswers.push(userAnswer)
    }

    // else add answer to existing list of answers for the question.
    else {
        let answersArr = _.filter(foundUserAnswer.answers, (answer) => {
            return answer.id !== userAnswer.answers.id
        })

        // Update the user's answer located in the userAnswers array
        answersArr.push({ id: userAnswer.answers.id })
        foundUserAnswer.answers = answersArr

        // Remove user's answer from array then add the updated user answer
        userAnswers = _.filter(userAnswers, (answer) => {
            return answer.qid !== userAnswer.qid
        })

        userAnswers.push(foundUserAnswer)
    }

    return userAnswers
}

export const removeCheckboxAnswer = (userAnswers, userAnswer) => {
    let foundUserAnswer = _.filter(userAnswers, (answer) => {
        return answer.qid === userAnswer.qid
    })[0]
    let answersArr = _.filter(foundUserAnswer.answers, (answer) => {
        return answer.id !== userAnswer.answers.id
    })

    // Update the user's answer located in the userAnswers array
    foundUserAnswer.answers = answersArr

    // Remove user's answer from array then add the updated user answer
    userAnswers = _.filter(userAnswers, (answer) => {
        return answer.qid !== userAnswer.qid
    })

    // if user's answer ids is empty, the remove it from user's answers
    if (foundUserAnswer.answers.length > 0) {
        userAnswers.push(foundUserAnswer)
    }

    return userAnswers
}

export const checkAnswersWithFeedback = (assessment, userAnswers) => {
    _.forEach(userAnswers, function (userAnswer) {
        // Retrieve all correct answers from assessment question
        let correctAnswers = _.map(assessment.answers, (answer) => {
            if (answer.correct) {
                return {
                    id: answer.id,
                    correct: answer.correct
                }
            }
        }).filter((answer) => {
            return answer !== undefined
        })

        // Check user answers against the assessment correct answers
        // if any user answers does not match
        // add user answer to array and mark as false
        _.forEach(userAnswer.answers, (answer) => {
            let inAnswersArr = _.filter(correctAnswers, function (correctAnswer) {
                return correctAnswer.id === answer.id
            })

            if (inAnswersArr.length === 0) {
                correctAnswers.push({ id: answer.id, correct: false })
            }
        })

        userAnswer.answers = correctAnswers
    })

    feedback(userAnswers)
    scoring(assessment, userAnswers)
}

export const feedback = (userAnswers) => {
    const assessmentContainer = document.getElementById('assessment-window')

    userAnswers.forEach((question) => {
        let answerContainer = assessmentContainer.querySelectorAll('#question_' + question.qid + ' .answers')[0]
        question.answers.forEach((answer) => {
            if (answer.correct) {
                answerContainer.querySelectorAll('#answer_' + answer.id)[0].classList.add('correct')
            } else {
                answerContainer.querySelectorAll('#answer_' + answer.id)[0].classList.add('incorrect')
            }
        })
    })
}

export const scoring = (assessment, userAnswers) => {
    let totalScore = 0
    _.forEach(userAnswers, function (q) {
        let totalCorrectAnswers = _.filter(assessment.answers, (answer) => {
            return answer.correct === true
        }).length

        let totalSelectedAnswers = q.answers.length

        let hasIncorrect = _.filter(q.answers, (answer) => {
            return answer.correct === false
        })
        if (hasIncorrect.length === 0 && totalSelectedAnswers === totalCorrectAnswers) {
            totalScore += parseInt(assessment.possiblePoints)
        }
    })

    Vue.core.Activity.taskComplete(assessment.question, 1, totalScore)
}

export const config = (assessmentData, callback) => {
    const randomizeAssessment = randomizeQuestionAnswers(assessmentData)
    store.commit('configAssessmentWindow', { assessment: randomizeAssessment, callback: callback })
}

export const show = () => {
    store.commit('showAssessmentWindow')
}

export const hide = () => {
    store.commit('hideAssessmentWindow')
}
