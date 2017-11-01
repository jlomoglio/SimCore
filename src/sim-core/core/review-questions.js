import _ from 'lodash'
import store from '../store/store'
import { endModuleData, setReviewQuestionModuleData, getModuleTotaltime } from './reporting'
import { sendLTIData } from './lti'

export const randomizeQuestionAnswers = (question) => {
    if (question.randomize) {
        let randomizeAnswers = question.answers.sort(function () {
            return 0.5 - Math.random()
        })
        question['answers'] = randomizeAnswers
    }
    return question
}

export const addRadioAnswer = (userAnswer) => {
    let userAnswers = store.state.module.reviewQuestionsUserAnswers

    userAnswers = _.filter(userAnswers, (answer) => {
        return answer.qid !== userAnswer.qid
    })

    userAnswers.push(userAnswer)
    store.commit('setReviewQuestionsUserAnswers', userAnswers)
}

export const addCheckboxAnswer = (userAnswer) => {
    let userAnswers = store.state.module.reviewQuestionsUserAnswers

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

    store.commit('setReviewQuestionsUserAnswers', userAnswers)
}

export const removeCheckboxAnswer = (userAnswer) => {
    let userAnswers = store.state.module.reviewQuestionsUserAnswers

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

    store.commit('setReviewQuestionsUserAnswers', userAnswers)
}

export const checkAnswersWithFeedback = (questions) => {
    let userAnswers = store.state.module.reviewQuestionsUserAnswers
    store.commit('setTotalReviewQuestionsCount', userAnswers.length)

    _.forEach(userAnswers, function (userAnswer) {
        // Get question for assessment questions
        let reviewQuestion = questions['question' + userAnswer.qid]

        // Retrieve correct answers from assessment question
        let correctAnswers = _.map(reviewQuestion.answers, (answer) => {
            if (answer.correct) {
                return {
                    id: answer.id,
                    correct: answer.correct
                }
            }
        }).filter((answer) => {
            return answer !== undefined
        })

        // make comment here
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
    scoring(questions, userAnswers)

    if (store.state.module.totalReviewQuestionsCount === _.size(questions)) {
        const module = store.state.module
        setReviewQuestionModuleData({ totalScore: module.totalReviewQuestionsScore,
            totalPossibleScore: module.totalReviewQuestionsCount })
        getModuleTotaltime()
        endModuleData()
        sendLTIData()
    }
    store.commit('setReviewQuestionsUserAnswers', [])
    store.commit('setReviewQuestionsSubmitted', true)
}

export const feedback = (userAnswers) => {
    const assessmentContainer = document.getElementById('review-questions-template')

    userAnswers.forEach((question) => {
        let answerContainer = assessmentContainer.querySelectorAll('#question_' + question.qid + ' .answers')[0]
        question.answers.forEach((answer) => {
            if (answer.correct) {
                answerContainer.querySelectorAll('#answer_' + answer.id)[0].classList.add('correct')
            } else {
                answerContainer.querySelectorAll('#answer_' + answer.id)[0].classList.add('incorrect')
            }
        })
        answerContainer.querySelectorAll('input').forEach((input) => {
            input.disabled = true
        })
    })
}

export const scoring = (questions, userAnswers) => {
    let totalScore = 0
    let question = null
    _.forEach(userAnswers, function (q) {
        question = questions['question' + q.qid]
        let totalCorrectAnswers = _.filter(question.answers, (answer) => {
            return answer.correct === true
        }).length

        let totalSelectedAnswers = q.answers.length

        let hasIncorrect = _.filter(q.answers, (answer) => {
            return answer.correct === false
        })
        if (hasIncorrect.length === 0 && totalSelectedAnswers === totalCorrectAnswers) {
            totalScore += parseInt(question.possiblePoints)
        }
    })

    store.commit('setTotalReviewQuestionsScore', totalScore)
}

export const config = (assessmentData, callback) => {
    const randomizeAssessment = randomizeQuestionAnswers(assessmentData)
    store.commit('configAssessmentWindow', { assessment: randomizeAssessment, callback: callback })
}
