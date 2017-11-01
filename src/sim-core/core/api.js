/***************************************************************************************
 *
 *
 * CORE FUNCTIONS
 *
 *
 ***************************************************************************************/
import store from '../store/store'
import { addActivityScore, addTotalActivityScore } from './scoring'
import { addReportingData } from './reporting'
import Zoom from './zoom'
import { endActivity } from './activity'
import AudioPlayer, { play, playAudio, clearRewindPlayList } from './audio-player'
import { show, hide, config } from './assessment'
import Sequencer from './sequence'

const api = {

	/***************************************************************************************
	* INSTALL CORE CLASS
	***************************************************************************************/
    install (Vue, options) {
        Vue.prototype.$core = Vue.core = this
    },

	/***************************************************************************************
	*
	* ACTIVITY DEVELOPER CORE FUNCTIONS
	*
	***************************************************************************************/

    /** CONTINUE BUTON *************************************/
    ContinueButton: {
        show: () => {
            store.commit('showContinueButton')
        },
        hide: () => {
            store.commit('hideContinueButton')
        },
        next: (view) => {
            store.commit('nextContinueButton', view)
        },
        end: () => {
            // TODO need to call mutation to displaye EOA screen
        },
        callback: (callback) => {
            store.commit('setContinueButtonCallback', callback)
        }
    },

    /** ICONBAR ********************************************
	*
	*   Icons: partsDepartment, toolTray, serviceInfo, zoom
	*   Functions: enable, disable, show, hide
    *
	*   Sample usage in activity:
	*	this.$core.IconBar.partsDepartment.show()
	*	this.$core.IconBar.partsDepartment.enable()
	*
	*******************************************************/
    IconBar: {
        PartsDepartment: {
            enable: () => {
                store.commit('enableIconBarIcon', 'partsDepartment')
            },
            disable: () => {
                store.commit('disableIconBarIcon', 'partsDepartment')
            },
            show: () => {
                store.commit('showIconBarIcon', 'partsDepartment')
            },
            hide: () => {
                store.commit('hideIconBarIcon', 'partsDepartment')
            }
        },
        ToolTray: {
            enable: () => {
                store.commit('enableIconBarIcon', 'toolTray')
            },
            disable: () => {
                store.commit('disableIconBarIcon', 'toolTray')
            },
            show: () => {
                store.commit('showIconBarIcon', 'toolTray')
            },
            hide: () => {
                store.commit('hideIconBarIcon', 'toolTray')
            }
        },
        ServiceInfo: {
            enable: () => {
                store.commit('enableIconBarIcon', 'serviceInfo')
            },
            disable: () => {
                store.commit('disableIconBarIcon', 'serviceInfo')
            },
            show: () => {
                store.commit('showIconBarIcon', 'serviceInfo')
            },
            hide: () => {
                store.commit('hideIconBarIcon', 'serviceInfo')
            }
        },
        Zoom: {
            enable: () => {
                store.commit('enableIconBarIcon', 'zoom')
                // this.zoom.enableZoom()
            },
            disable: () => {
                store.commit('disableIconBarIcon', 'zoom')
                // this.zoom.disableZoom()
            },
            show: () => {
                store.commit('showIconBarIcon', 'zoom')
            },
            hide: () => {
                store.commit('hideIconBarIcon', 'zoom')
            }
        }
    },

	/** PARTS DEPARTMENT ***********************************
	*
	*   FUNCTION: config
	*
	*   Image Folder: /assets/img/parts-department/image-file.jpg
	*
	*   Sample usage in activity:
	*	  this.$core.PartsDepartment.config({
	*		  hotspot: {
	*			  top: "220px",
	*			  left: "160px",
	*			  width: "115px",
	*			  height: "35px",
	*			  bgColor: "red",
	*		  },
	*		  image: {
	*			  bgImg: "parts_department_BCMs.jpg",
	*			  bgSize: "100%"
	*		  },
    *         incorrectVO: ResponseData.incorrect.vo,
    *	      incorrectCC: ResponseData.incorrect.cc
	*	  })
	*******************************************************/
    PartsDepartment: {
        config: (settingsObj) => {
            store.commit('configPartsDepartment', settingsObj)
        },
        Part: {
            config: (settingsObj) => {
                store.commit('configPartsDepartmentPart', settingsObj)
            },
            getPart: () => {
                return store.getters.getPartsDepartmentPartIsShown
            },
            hide: () => {
                store.commit('hidePartsDepartmentPart')
            },
            isCorrect: () => {
                return store.getters.getPartsDepartmentPartIsCorrectDrop
            }
        }
    },
    Assessment: {
        show: () => {
            store.commit('showAssessmentWindow')
        },
        hide: () => {
            store.commit('hideAssessmentWindow')
        }
    },
    ToolTray: {
        config: (toolsObj) => {
            store.commit('configToolTray', toolsObj)
        }
    },

    Activity: {
        title: (title) => {
            store.commit('setActivityName', title)
        },
        mode: (mode) => {
            if (mode === 'full') {
                store.commit('setUseContentArea', false)
            } else if (mode === 'box') {
                store.commit('setUseContentArea', true)
            }
        },
        init: (sequence, callback) => {
            Sequencer(sequence, callback)
        },
        id: (id) => {
            store.commit('setCurrentActivityId', id)
        },
        nextView: (view) => {
            store.commit('setCurrentActivityView', view)
        },
        // imported from the activity.js
        configView: (title, mode, id) => {
            api.Activity.title(title)
            api.Activity.mode(mode)
            api.Activity.id(id)
        },
        headerSingleLine: (oneLine) => {
            store.commit('setHeaderOneLine', oneLine)
        },
        showIntro: (callback) => {
            if (store.state.moduleData.startUpScreensCompleted) {
                if (callback) {
                    callback()
                }
            } else {
                store.commit('setStartUpScreensPlaying', true)
                store.commit('showIntroScreen')
            }
        },
        showSafety: () => {
            store.commit('showSafetyScreen')
        },
        safetyIsShown: () => {
            return store.getters.getSafetyScreenIsShown
        },
        introComplete: () => {
            return store.getters.getIntroCompleted
        },

        // Needed a LightBox set for activityMode
        showLightBox: () => {
            store.commit('showActivityLightBox')
        },
        hideLightBox: () => {
            store.commit('hideActivityLightBox')
        },
        correct: function(vo, cc, callback) {
            AudioPlayer.play(vo, cc, () => { callback() })
        },
        taskComplete: (label, attempts, score, type) => {
            addTotalActivityScore(type)
            addActivityScore(score)
            addReportingData({ label, attempts, score })
            clearRewindPlayList()
        },
        // imported from the activity.js
        end: endActivity,

        Audio: {
            voDone: store.getters.getAudioCompleted,
            play,
            response: playAudio,
            clearPlayList: clearRewindPlayList
        },
        Assessment: {
            config,
            show,
            hide
        }
    },
    Zoom
}

export default api
