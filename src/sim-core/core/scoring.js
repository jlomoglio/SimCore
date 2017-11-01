import store from '../store/store'
import { getActivityIndex } from './activity'

/**
 * A method to add a score to the activity score
 * @param {int} - activityId
 * @param {int} - score
 * @returns {object} - activities
 */
export const addActivityScore = (score) => {
    let activities = store.state.moduleData.activities
    const idx = getActivityIndex(store.state.module.currentActivityId)
    activities[idx].totalScore += score
    store.commit('addModuleScore', score)
    store.commit('addActivityScore', activities)
}
export const addTotalActivityScore = (type) => {
    let taskScore = 3
    if (type && type === 'assessment') {
        taskScore = 1
    }
    let activities = store.state.moduleData.activities
    const idx = getActivityIndex(store.state.module.currentActivityId)
    activities[idx].totalPossibleScore += taskScore
    store.commit('addActivityScore', activities)
}

/**
 * A method to reset an activity score and update the module score
 * when a user skips an activity
 * @param {int} - activityId
 * @param {int} - score
 * @returns {object} - activities
 */
export const resetSkipActivityScore = () => {
    let activities = store.state.moduleData.activities
    const idx = getActivityIndex(store.state.module.currentActivityId)
    const activityScore = activities[idx].totalScore
    // Remove activity score from module score
    const updatedModuleScore = store.state.moduleData.totalScore - activityScore
    activities[idx].totalScore = 0
    activities[idx].totalPossibleScore = 0
    store.commit('setModuleScore', updatedModuleScore)
    store.commit('addActivityScore', activities)
}

export default {
    addActivityScore,
    resetSkipActivityScore
}
