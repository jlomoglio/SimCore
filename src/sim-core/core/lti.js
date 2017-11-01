import localStorage from 'localStorage'
import store from '../store/store'
import { getNextActivity } from './activity'
import { version } from '../../version'

// On Cengage, data is not showing up in the right place
// Data coming for Cengage mind tap json is corrupted
const GET_LTI_DATA = (window.parent.GetInputData || null)
const SEND_LTI_DATA = (window.parent.sendToLTI || null)
const EXIT_SEND_LTI_DATA = (window.parent.ExitSendDataToLTI || null)
const VIEW_MODE = (window.parent.ViewMode || '')
const LIS_PERSON_NAME_FAMILY = (window.parent.LisPersonNameFamily || '')
const LIS_PERSON_NAME_GIVEN = (window.parent.LisPersonNameGiven || '')
const RETURN_TO_BACK = (window.parent.ReturnToBack || '')

let lti = {
    MODULE_DATA: null,
    VIEW_MODE: '',
    LIS_PERSON_NAME_FAMILY: '',
    LIS_PERSON_NAME_GIVEN: ''
}

export const checkViewModeAndRedirect = () => {
    lti.VIEW_MODE = getViewMode()

    if (store.state.module.useLTIData) {
        if (version !== 'alpha') {
            if (lti.VIEW_MODE === 'completed') {
                lti.MODULE_DATA = getLTIData()
                store.commit('mutateModuleData', lti.MODULE_DATA)
                store.commit('setCurrentView', 'PerformanceReport')
            }
        }
    }
}

export const startModuleWithLTIData = (view) => {
    if (store.state.module.useLTIData && version !== 'alpha') {
        lti.MODULE_DATA = getLTIData()

        if (lti.MODULE_DATA) {
            store.commit('mutateModuleData', lti.MODULE_DATA)
        } else {
            let moduleData = store.state.moduleData
            moduleData.firstName = lti.LIS_PERSON_NAME_GIVEN
            moduleData.lastName = lti.LIS_PERSON_NAME_FAMILY

            store.commit('mutateModuleData', moduleData)
        }
        const activity = getNextActivity()

        if (activity) {
            store.commit('setCurrentView', view)
            store.commit('setCurrentActivityView', (activity.id + 'V1'))
        }
        else {
            store.commit('setCurrentView', 'ReviewQuestions')
        }
    } else {
        store.commit('setCurrentView', view)
        store.commit('setCurrentActivityView', 'A1V1')
    }
}

export const getViewMode = () => {
    if (store.state.module.useLTIData && version !== 'alpha') {
        if (version === 'development') {
            return localStorage.getItem('LTI_VIEWMODE')
        } else {
            return VIEW_MODE
        }
    }
}

export const getLTIData = () => {
    if (store.state.module.useLTIData && version !== 'alpha') {
        getLTIDataFamilyName()
        if (version === 'development') {
            if (localStorage.getItem('LTI_DATA')) {
                return JSON.parse(localStorage.getItem('LTI_DATA')).UserInput
            }
        } else {
            if (GET_LTI_DATA) {
                return GET_LTI_DATA.UserInput
            }
        }
    }
}

export const getLTIDataFamilyName = () => {
    if (store.state.module.useLTIData && version !== 'alpha') {
        if (version === 'development') {
            lti.LIS_PERSON_NAME_FAMILY = localStorage.getItem('LIS_PERSON_NAME_FAMILY')
            lti.LIS_PERSON_NAME_GIVEN = localStorage.getItem('LIS_PERSON_NAME_GIVEN')
        } else {
            lti.LIS_PERSON_NAME_FAMILY = LIS_PERSON_NAME_FAMILY
            lti.LIS_PERSON_NAME_GIVEN = LIS_PERSON_NAME_GIVEN
        }
    }
}

export const sendLTIData = () => {
    const UserInput = store.state.moduleData
    const Score = (store.state.moduleData.totalScorePercent / 100)
    if (store.state.module.useLTIData && version !== 'alpha') {
        if (version === 'development') {
            return localStorage.setItem('LTI_DATA', JSON.stringify({UserInput: UserInput, Score: Score}))
        } else {
            return SEND_LTI_DATA(Score, { UserInput })
        }
    }
}

export const endActivitySendLTIData = () => {
    if (store.state.module.useLTIData && version !== 'alpha') {
        if (version === 'development') {
            localStorage.setItem('LTI_DATA', JSON.stringify({UserInput: store.state.moduleData}))
        } else {
            EXIT_SEND_LTI_DATA({UserInput: store.state.moduleData})
        }
    }
}

export const closeModuleWindow = () => {
    if (version !== 'alpha') {
        if (version === 'development') {
            return window.close()
        } else {
            return RETURN_TO_BACK()
        }
    } else {
        return window.close()
    }
}

export default {
    sendLTIData,
    endActivitySendLTIData,
    getLTIData
}
