import store from '../store/store'
// import core from '../core/core'
import _ from 'lodash'
import { pause } from './audio-player'
import eoaData from '../../data/eoa-data.json'
import resetData from '../../data/reset-activity.json'
import { endActivitySendLTIData } from './lti'

export const getActivity = (activityId) => {
    if (store.state.moduleData) {
        return _.find(store.state.moduleData.activities, {id: activityId})
    } else {
        return 'A1'
    }
}

export const getActivityIndex = (activityId) => {
    return _.findIndex(store.state.moduleData.activities, {
        id: activityId
    })
}
export const getNextActivity = () => {
    // Get the current activity
    const currentActivityId = store.state.module.currentActivityId
    const currentActivityIndex = getActivityIndex(currentActivityId)

    if (currentActivityIndex < store.state.moduleData.activities.length) {
        return _.chain(store.state.moduleData.activities)
            .filter((activity, index) => {
                return currentActivityIndex < index
            })
            .filter((activity) => {
                return activity.completed === false
            })
            .first()
            .value()
    }
}

export const getNextIncompleteActivity = () => {
    // Find the next activity with module data activities
    // with the property of complete equals false
    return _.chain(store.state.moduleData.activities)
        .filter((activity) => {
            return activity.completed === false
        })
        .first()
        .value()
}

export const goToReviewQuestions = () => {
    pause()
    store.commit('setEndActivityScreenIsShown', false)
    store.commit('toggleLightBox', 'default')
    store.commit('setCurrentView', ('ReviewQuestions'))
}

export const goToNextActivity = () => {
    // activity object instantiation
    let nextActivity = null
    // last activity object in module data
    let lastActivity = _.last(store.state.moduleData.activities)

    // check if the last activity is completed
    if (lastActivity.completed) {
        nextActivity = getNextIncompleteActivity()
    } else {
        nextActivity = getNextActivity()
    }

    pause()
    store.commit('setEndActivityScreenIsShown', false)
    store.commit('toggleLightBox', 'default')
    store.commit('setCurrentActivityView', (nextActivity.id + 'V1'))
}

export const getEOAData = (activityId) => {
    return _.find(eoaData, {id: activityId})
}

export const resetModuleDataForNewActivity = () => {
    store.commit('resetModuleDataForNewActivity', resetData)
}

export const setActivityCompleted = () => {
    let activities = store.state.moduleData.activities
    const activityIdx = _.findIndex(activities, {
        id: store.state.module.currentActivityId
    })
    activities[activityIdx].completed = true
    store.commit('setActivityCompleted', activities)
}

export const skipActivity = (activityId) => {
    activityViewChangeReset()
    store.commit('setCurrentActivityView', (activityId + 'V1'))
}

export const endActivity = () => {
    store.commit('setEndActivityScreenIsShown', true)
    // reset audio rewind list
    store.commit('resetAudioRewindDefaults')
    setActivityCompleted()
    endActivitySendLTIData()
}

export const activityViewChangeReset = () => {
    // components
    const resetComponents = ['hideContinueButton', 'hidePartsDepartment', 'hideToolTray', 'hideSiWindow',
        'closePopupVideoPlayer', 'closeTaskWindow', 'closeMainMenu', 'closeSiMenu', 'hideAssessmentWindow',
        'hideSafetyScreen', 'hideIntroScreen', 'hideCCBar', 'hideActivityLightBox']
    resetComponents.forEach((mutations) => {
        store.commit(mutations)
    })

    // icons
    const resetIcons = ['zoom', 'serviceInfo', 'toolTray', 'partsDepartment']
    resetIcons.forEach((icon) => {
        store.state.iconBar.icons[icon].isEnabled = false
        store.state.iconBar.icons[icon].isShown = false
    })

    // alert windows
    const resetAlertWindows = ['hideSkipActivityAlertIsShown', 'hideCloseModuleAlert', 'hideActivityAlreadyCompletedAlert']
    resetAlertWindows.forEach((mutation) => {
        store.commit(mutation)
    })

    // reset audio rewind list
    store.commit('resetAudioRewindDefaults')
}
