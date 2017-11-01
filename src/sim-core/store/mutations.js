import { zoomIn, zoomOut } from '../core/zoom'

export default {
    /********************************************************
     * STATE OBJECT MUTATIONS
     * This section configs store.js with all the individual
     * state object files.
     ********************************************************/
    mutateModuleData: (state, moduleDataObj) => {
        state.moduleData = moduleDataObj
    },
    mutateModule: (state, moduleObj) => {
        state.module = moduleObj
    },
    mutateVideoPage: (state, videoPageObj) => {
        state.videoPage = videoPageObj
    },
    mutateIconBar: (state, iconBarObj) => {
        state.iconBar = iconBarObj
    },
    mutateComponents: (state, componentsObj) => {
        state.components = componentsObj
    },
    mutateWidgets: (state, widgetsObj) => {
        state.widgets = widgetsObj
    },
    mutateAudioPlayer: (state, audioPlayerObj) => {
        state.audioPlayer = audioPlayerObj
    },
    resetModuleDataForNewActivity: (state, dataObj) => {
        state.module.audioCompleted = true
        state.module.lightBoxIsShown = false
        state.module.lightBoxMode = 'defaultMode'
        state.components.continueButton.isShown = false
    },
    setModuleStartTime: (state, startTime) => {
        state.moduleData.startTime = startTime
    },
    addToModuleTotalTimeTaken: (state, timeTaken) => {
        state.moduleData.totalTimeTaken += timeTaken
    },
    setUseLTIData: (state, useLTIData) => {
        state.module.useLTIData = useLTIData
    },

    /********************************************************
     * AUDIO PAGE  MUTATIONS
     ********************************************************/
    setAudioCompleted: (state, audioCompleted) => {
        state.module.audioCompleted = audioCompleted
    },
    muteAudio: (state) => {
        state.audioPlayer.audioMuted = true
    },
    unmuteAudio: (state) => {
        state.audioPlayer.audioMuted = false
    },
    setCurrentAudioPlayer: (state, audioPlayer) => {
        state.audioPlayer.currentAudioPlayer = audioPlayer
    },
    setTaskPlayListIndex: (state, audioArrIndex) => {
        state.audioPlayer.playListIndex = audioArrIndex
    },
    setTaskPlayListLength: (state, audioArrLength) => {
        state.audioPlayer.playListArrLength = audioArrLength
    },
    resetAudioDefaults (state, audioObj) {
        state.audioPlayer.playListIndex = audioObj.playListIndex
        state.audioPlayer.playListArrLength = audioObj.playListArrLength
        state.audioPlayer.rewindPlayList = audioObj.rewindPlayList
        state.audioPlayer.rewindAudioIndex = audioObj.rewindAudioIndex
    },
    addToRewindPlayList: (state, { audioUrl, audioCC }) => {
        state.audioPlayer.rewindAudioList.push(audioUrl)
        state.audioPlayer.rewindAudioCCList.push(audioCC)
    },
    setRewindAudioIndex: (state, index) => {
        state.audioPlayer.rewindAudioIndex = index
    },
    resetAudioRewindDefaults (state, audioObj) {
        state.audioPlayer.rewindAudioList = []
        state.audioPlayer.rewindAudioCCList = []
        state.audioPlayer.rewindAudioIndex = 0
    },

    /********************************************************
     * VIDEO PAGE  MUTATIONS
     ********************************************************/
    setVideoSource: (state, videoSource) => {
        state.videoPage.videoSource = videoSource
    },
    setLoadedVideo: (state, loadedVideo) => {
        state.videoPage.loadedVideo = loadedVideo
    },
    setActiveButton: (state, activeButton) => {
        state.videoPage.activeButton = activeButton
    },

    /********************************************************
     * SCORE
     ********************************************************/
    setModuleScore: (state, score) => {
        state.moduleData.totalScore = score
    },
    addModuleScore: (state, score) => {
        state.moduleData.totalScore += score
    },
    addActivityScore: (state, activities) => {
        state.moduleData.activities = activities
    },
    resetActivityScore: (state, activities) => {
        state.moduleData.activities = activities
    },

    /********************************************************
     * MODULE DATA SETTINGS
     ********************************************************/
    setSeriesName1: (state, seriesName1) => {
        state.moduleData.seriesName1 = seriesName1
    },
    setSeriesName2: (state, seriesName2) => {
        state.moduleData.seriesName2 = seriesName2
    },

    /********************************************************
     * MODULE SETTINGS
     ********************************************************/
    setCurrentView: (state, view) => {
        state.module.currentView = view
    },
    setUseContentArea: (state, useContentArea) => {
        state.module.useContentArea = useContentArea
    },
    setHeaderOneLine: (state, oneLine) => {
        state.module.oneLine = oneLine
    },
    setActivityName: (state, activityName) => {
        state.module.activityName = activityName
    },
    setCurrentActivityView: (state, currentActivityView) => {
        state.module.currentActivityView = currentActivityView
    },
    setCurrentActivityId: (state, activityId) => {
        state.module.currentActivityId = activityId
    },
    setSkipToActivityId: (state, activityId) => {
        state.module.skipToActivityId = activityId
    },
    setModuleType: (state, moduleType) => {
        state.moduleData.moduleType = moduleType
    },
    setModuleName: (state, moduleName) => {
        state.moduleData.moduleName = moduleName
    },
    setEndActivityScreenIsShown: (state, isShown) => {
        state.module.lightBoxIsShown = true
        state.module.lightBoxMode = 'fullMode'
        state.module.endActivityScreenIsShown = isShown
    },
    setActivityCompleted: (state, activities) => {
        state.moduleData.activities = activities
    },

    /********************************************************
     * REVIEW QUESTIONS SETTINGS
     ********************************************************/
    setCurrentReviewQuestionsViewId: (state, viewId) => {
        state.module.currentReviewQuestionsViewId = viewId
    },
    setReviewQuestionsSubmitted: (state, submitted) => {
        state.module.reviewQuestionsSubmitted = submitted
    },
    setReviewQuestionsUserAnswers: (state, userAnswer) => {
        state.module.reviewQuestionsUserAnswers = userAnswer
    },
    setTotalReviewQuestionsScore: (state, score) => {
        state.module.totalReviewQuestionsScore += score
    },
    setTotalReviewQuestionsCount: (state, count) => {
        state.module.totalReviewQuestionsCount += count
    },

    /********************************************************
     * BUTTONS
     ********************************************************/
    nextContinueButton: (state, view) => {
        state.components.continueButton.mode = 'next'
        state.components.continueButton.view = view
    },
    endContinueButton: (state) => {
        state.components.continueButton.mode = 'end'
        state.components.continueButton.view = ''
    },
    showContinueButton: (state) => {
        state.components.continueButton.isShown = true
    },
    hideContinueButton: (state) => {
        state.components.continueButton.isShown = false
    },
    setContinueButtonCallback: (state, callback) => {
        state.components.continueButton.callback = callback
    },
    /********************************************************
     * ICONBAR
     ********************************************************/
    setIconBarIsShown: (state, isShown) => {
        state.iconBar.isShown = isShown
    },

    /********************************************************
     * ICONBAR ICONS
     ********************************************************/
    enableIconBarIcon: (state, icon) => {
        state.iconBar.icons[icon].isEnabled = true
    },
    disableIconBarIcon: (state, icon) => {
        state.iconBar.icons[icon].isEnabled = false
    },
    showIconBarIcon: (state, icon) => {
        state.iconBar.icons[icon].isShown = true
    },
    hideIconBarIcon: (state, icon) => {
        state.iconBar.icons[icon].isShown = false
    },

    zoomPercent: (state, percent) => {
        state.iconBar.icons.zoom.zoomPercent = percent
    },

    increaseZoom: (state, zoomObj) => { zoomIn(zoomObj) },
    decreaseZoom: (state, zoomObj) => { zoomOut(zoomObj) },

    /********************************************************
     * CLOSED CAPTIONIING
     ********************************************************/
    turnOnClosedCaptioning: (state) => {
        state.components.footer.ccBar.isOn = true
        state.components.footer.ccBar.isShown = true
    },
    turnOffClosedCaptioning: (state) => {
        state.components.footer.ccBar.isOn = false
        state.components.footer.ccBar.isShown = false
    },

    showCCBar: (state) => {
        if (state.components.footer.ccBar.isOn === true) {
            state.components.footer.ccBar.isShown = true
        }
    },
    hideCCBar: (state) => {
        if (state.components.footer.ccBar.isOn === true) {
            state.components.footer.ccBar.isShown = false
        }
    },
    addCCBarText: (state, text) => {
        state.components.footer.ccBar.text = text
    },

    /********************************************************
     * INTRO SCREEN: SHOW/HIDE
     ********************************************************/
    showIntroScreen: (state) => {
        state.module.introIsShown = true
        state.module.lightBoxIsShown = true
        state.module.lightBoxMode = 'defaultMode'
        state.iconBar.isShown = false
    },
    hideIntroScreen: (state) => {
        state.module.introCompleted = true
        state.module.introIsShown = false
        state.module.lightBoxIsShown = false
        state.components.footer.ccBar.isShown = false
        state.iconBar.isShown = true
    },
    introCompleted: (state, completed) => {
        state.module.introCompleted = completed
    },

    /********************************************************
     * SAFETY SCREEN
     ********************************************************/
    showSafetyScreen: (state) => {
        state.module.safetyIsShown = true
        state.module.safetyCompleted = false
        state.module.lightBoxIsShown = true
        state.iconBar.isShown = false
    },
    hideSafetyScreen: (state) => {
        state.module.safetyIsShown = false
        state.module.safetyCompleted = true
        state.module.lightBoxIsShown = false
        state.iconBar.isShown = true
    },
    safetyCompleted: (state, completed) => {
        state.module.safetyCompleted = completed
    },

    /********************************************************
     * START UP SCREENS
     ********************************************************/
    setStartUpScreensCompleted: (state, completed) => {
        state.moduleData.startUpScreensCompleted = completed
    },
    setStartUpScreensPlaying: (state, playing) => {
        state.module.startUpScreensPlaying = playing
    },

    /********************************************************
     * LIGHTBOX: TOGGLE
     ********************************************************/
    toggleLightBox: (state, mode) => {
        if (state.module.lightBoxIsShown === false) {
            state.module.lightBoxIsShown = true
            state.module.lightBoxMode = mode
        } else {
            state.module.lightBoxIsShown = false
            state.module.lightBoxMode = 'defaultMode'
        }
    },
    showLightBox: (state, mode) => {
        state.module.lightBoxIsShown = true
        state.module.lightBoxMode = mode
    },
    hideLightBox: (state) => {
        state.module.lightBoxIsShown = false
        state.module.lightBoxMode = 'defaultMode'
    },

    /********************************************************
     * ACTIVITY LIGHTBOX: TOGGLE
     ********************************************************/
    showActivityLightBox: (state) => {
        state.module.activityLightBoxIsShown = true
    },
    hideActivityLightBox: (state) => {
        state.module.activityLightBoxIsShown = false
    },

    /********************************************************
     * ACTIVITY BLOCKBOX: TOGGLE
     ********************************************************/
    showActivityBlockBox: (state) => {
        state.module.activityBlockBoxIsShown = true
    },
    hideActivityBlockBox: (state) => {
        state.module.activityBlockBoxIsShown = false
    },

    /********************************************************
     * MAIN MENU & SUB-MENUS: TOGGLE
     ********************************************************/
    toggleMainMenu: (state) => {
        if (state.iconBar.menus.main.isOpen === false) {
            state.iconBar.menus.serviceInfo.isOpen = false
            state.iconBar.menus.main.isOpen = true
            state.module.lightBoxIsShown = true
            state.module.lightBoxMode = 'menuMode'
        } else {
            state.iconBar.menus.main.isOpen = false
            state.iconBar.menus.main.subMenus.videoSubMenuOpen = false
            state.iconBar.menus.main.subMenus.activitySubMenuOpen = false
            state.module.lightBoxIsShown = false
            state.module.lightBoxMode = 'defaultMode'
        }
    },

    closeMainMenu: (state) => {
        state.iconBar.menus.main.isOpen = false
        state.iconBar.menus.main.subMenus.videoSubMenuOpen = false
        state.iconBar.menus.main.subMenus.activitySubMenuOpen = false
        state.module.lightBoxIsShown = false
        state.module.lightBoxMode = 'defaultMode'
    },

    toggleVideoSubMenu: (state) => {
        if (state.iconBar.menus.main.subMenus.videoSubMenuOpen === false) {
            state.iconBar.menus.main.subMenus.videoSubMenuOpen = true
            state.iconBar.menus.main.subMenus.activitySubMenuOpen = false
        } else {
            state.iconBar.menus.main.subMenus.videoSubMenuOpen = false
        }
    },

    toggleActivitySubMenu: (state) => {
        if (state.iconBar.menus.main.subMenus.activitySubMenuOpen === false) {
            state.iconBar.menus.main.subMenus.videoSubMenuOpen = false
            state.iconBar.menus.main.subMenus.activitySubMenuOpen = true
        } else {
            state.iconBar.menus.main.subMenus.activitySubMenuOpen = false
        }
    },

    /***************************************************************************************
     * POPUP VIDEO PLAYER: OPEN/CLOSE
     ***************************************************************************************/
    showPopupVideoPlayer: (state) => {
        state.iconBar.menus.main.subMenus.videoPopupPlayerIsShown = true
        state.module.lightBoxIsShown = true
        state.module.lightBoxMode = 'fullMode'
    },
    closePopupVideoPlayer: (state) => {
        state.iconBar.menus.main.subMenus.videoPopupPlayerIsShown = false
        state.module.lightBoxIsShown = false
        state.module.lightBoxMode = 'defaultMode'
    },
    setPopupVideoPlayerSrc: (state, src) => {
        state.iconBar.menus.main.subMenus.videoPopupPlayerSrc = src
    },

    /***************************************************************************************
     * TASK WINDOW: OPEN/CLOSE
     ***************************************************************************************/
    openTaskWindow: (state) => {
        state.widgets.taskWindow.isShown = true
    },
    closeTaskWindow: (state) => {
        state.widgets.taskWindow.isShown = false
    },

    /********************************************************
     * SERVICE INFORMATION MENU
     ********************************************************/
    toggleSiMenu: (state) => {
        if (state.iconBar.menus.serviceInfo.isOpen === false) {
            state.iconBar.menus.main.isOpen = false
            state.iconBar.menus.main.subMenus.videoSubMenuOpen = false
            state.iconBar.menus.main.subMenus.activitySubMenuOpen = false
            state.iconBar.menus.serviceInfo.isOpen = true
            state.module.lightBoxIsShown = true
            state.module.lightBoxMode = 'menuMode'
        } else {
            state.iconBar.menus.serviceInfo.isOpen = false
            state.module.lightBoxIsShown = false
            state.module.lightBoxMode = 'defaultMode'
        }
    },
    closeSiMenu: (state) => {
        state.iconBar.menus.serviceInfo.isOpen = false
        state.module.lightBoxIsShown = false
        state.module.lightBoxMode = 'defaultMode'
    },

    /********************************************************
     * ALERT BOXES (Skip Activity, Close Module)
     ********************************************************/
    showSkipActivityAlertIsShown: (state) => {
        state.components.skipActivityAlert.isShown = true
        state.iconBar.menus.main.isOpen = false
        state.iconBar.menus.main.subMenus.videoSubMenuOpen = false
        state.iconBar.menus.main.subMenus.activitySubMenuOpen = false
        state.module.lightBoxMode = 'fullMode'
    },
    hideSkipActivityAlertIsShown: (state) => {
        state.components.skipActivityAlert.isShown = false
        state.module.lightBoxIsShown = false
        state.module.lightBoxMode = 'defaultMode'
    },

    showCloseModuleAlert: (state) => {
        state.components.closeModuleAlert.isShown = true
        state.module.lightBoxIsShown = true
        state.module.lightBoxMode = 'fullMode'
    },
    hideCloseModuleAlert: (state) => {
        state.components.closeModuleAlert.isShown = false
        state.module.lightBoxIsShown = false
        state.module.lightBoxMode = 'defaultMode'
    },
    showActivityAlreadyCompletedAlert: (state) => {
        state.components.activityAlreadyCompleted.isShown = true
        state.module.lightBoxIsShown = true
        state.module.lightBoxMode = 'fullMode'
    },
    hideActivityAlreadyCompletedAlert: (state) => {
        state.components.activityAlreadyCompleted.isShown = false
        state.module.lightBoxIsShown = false
        state.module.lightBoxMode = 'defaultMode'
    },

    /********************************************************
     * TOOL TRAY
     ********************************************************/
    showToolTray: (state) => {
        state.widgets.toolTray.isShown = true
    },
    hideToolTray: (state) => {
        state.widgets.toolTray.isShown = false
    },
    setToolTrayIsShow (state, isShown) {
        state.widgets.toolTray.isShown = isShown
    },

    /********************************************************
     * PARTS DEPARTMENT
     ********************************************************/
    showPartsDepartment: (state) => {
        state.widgets.partsDepartment.isShown = true
        state.iconBar.icons.partsDepartment.isEnabled = false
    },
    hidePartsDepartment: (state) => {
        state.widgets.partsDepartment.isShown = false
        state.iconBar.icons.partsDepartment.isEnabled = true
    },
    configPartsDepartment: (state, settings) => {
        state.widgets.partsDepartment.hotspot.top = settings.hotspot.top
        state.widgets.partsDepartment.hotspot.left = settings.hotspot.left
        state.widgets.partsDepartment.hotspot.width = settings.hotspot.width
        state.widgets.partsDepartment.hotspot.height = settings.hotspot.height
        state.widgets.partsDepartment.hotspot.bgColor = settings.hotspot.bgColor
        state.widgets.partsDepartment.hotspot.borderRadius = settings.hotspot.borderRadius

        state.widgets.partsDepartment.image.bgImg = settings.image.bgImg
        state.widgets.partsDepartment.image.bgSize = settings.image.bgSize

        state.widgets.partsDepartment.incorrectVO = settings.incorrectVO
        state.widgets.partsDepartment.incorrectCC = settings.incorrectCC
    },
    showPartsDepartmentPart: (state) => {
        state.widgets.partsDepartment.part.isShown = true
    },
    hidePartsDepartmentPart: (state) => {
        state.widgets.partsDepartment.part.isShown = false
    },
    configPartsDepartmentPart: (state, settings) => {
        state.widgets.partsDepartment.part.minY = settings.minY
        state.widgets.partsDepartment.part.maxY = settings.maxY
        state.widgets.partsDepartment.part.minX = settings.minX
        state.widgets.partsDepartment.part.maxX = settings.maxX

        state.widgets.partsDepartment.part.styles.background = settings.styles.background
        state.widgets.partsDepartment.part.styles.width = settings.styles.width
        state.widgets.partsDepartment.part.styles.height = settings.styles.height
        state.widgets.partsDepartment.part.styles.top = settings.styles.top
        state.widgets.partsDepartment.part.styles.left = settings.styles.left
    },
    setPartsDepartmentPartIsCorrectDrop: (state, value) => {
        state.widgets.partsDepartment.part.isCorrectDrop = value
    },

    /********************************************************
     * ACTIVITY ASSESSMENT
     ********************************************************/
    configAssessmentWindow: (state, {assessment, callback}) => {
        state.components.assessmentWindow.assessment = assessment
        if (callback) {
            state.components.assessmentWindow.callback = callback
        }
    },
    showAssessmentWindow: (state) => {
        state.components.assessmentWindow.isShown = true
        state.components.assessmentWindow.isExpanded = true
        state.components.assessmentWindow.isCollapsed = false
    },
    hideAssessmentWindow: (state) => {
        state.components.assessmentWindow.isShown = false
        state.components.assessmentWindow.isExpanded = true
        state.components.assessmentWindow.isCollapsed = false
    },
    expandAssessmentWindow: (state) => {
        state.components.assessmentWindow.isExpanded = true
        state.components.assessmentWindow.isCollapsed = false
    },
    collapseAssessmentWindow: (state) => {
        state.components.assessmentWindow.isCollapsed = true
        state.components.assessmentWindow.isExpanded = false
    },
    submitAssessmentWindow: (state, submitted) => {
        state.components.assessmentWindow.submit = submitted
    },
    addUserAnswer: (state, userAnswer) => {
        state.components.assessmentWindow.userAnswers = userAnswer
    },

    /********************************************************
     * SERVICE INFORMATION WINDOW
     ********************************************************/
    setSiIconMenuItems: (state, items) => {
        state.iconBar.icons.serviceInfo.menuItems = items
    },
    showSiWindow: (state, options) => {
        state.components.siWindow.isShown = true
        state.components.siWindow.isExpanded = true
        state.components.siWindow.isCollapsed = false
        state.components.siWindow.content = options.content
        state.components.siWindow.fileName = options.fileName
        state.components.siWindow.width = options.width
        state.components.siWindow.height = options.height
        state.iconBar.icons.serviceInfo.isEnabled = false
    },
    hideSiWindow: (state) => {
        state.components.siWindow.isShown = false
        state.components.siWindow.isExpanded = true
        state.components.siWindow.isCollapsed = false
        state.iconBar.icons.serviceInfo.isEnabled = true
    },
    expandSiWindow: (state) => {
        state.components.siWindow.isExpanded = true
        state.components.siWindow.isCollapsed = false
    },
    collapseSiWindow: (state) => {
        state.components.siWindow.isCollapsed = true
        state.components.siWindow.isExpanded = false
    },
    enableSiWindowZoomIn: (state) => {
        state.components.siWindow.zoomIn.isEnabled = true
    },
    disableSiWindowZoomIn: (state) => {
        state.components.siWindow.zoomIn.isEnabled = false
    },
    enableSiWindowZoomOut: (state) => {
        state.components.siWindow.zoomOut.isEnabled = true
    },
    disableSiWindowZoomOut: (state) => {
        state.components.siWindow.zoomOut.isEnabled = false
    },
    setSiWindowZoomPercent: (state, percent) => {
        state.components.siWindow.zoomPercent = percent
    }
}
