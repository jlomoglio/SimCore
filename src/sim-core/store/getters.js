
export default {

	/********************************************************
	* STATE OBJECT GETTERS
	********************************************************/
    getModuleData: state => state.moduleData,
    getModule: state => state.module,
    getVideoPage: state => state.videoPage,
    getIconBar: state => state.iconBar,
    getComponents: state => state.components,
    getWidgets: state => state.widgets,
    getAudioPlayer: state => state.audioPlayer,
    getRewindAudioArr: state => state.audioPlayer.rewindAudioList,
    getRewindAudioIndex: state => state.audioPlayer.rewindAudioIndex,

	/********************************************************
	* MODULE DATA GETTERS
	********************************************************/
    getSeriesName1: state => state.moduleData.seriesName1,
    getSeriesName2: state => state.moduleData.seriesName2,
    getActivities: state => state.moduleData.activities,

	/********************************************************
	* MODULE GETTERS
	********************************************************/
    getCurrentView: state => state.module.currentView,
    getUseContentArea: state => state.module.useContentArea,
    getActivityName: state => state.module.activityName,
    getCurrentActivityId: state => state.module.currentActivityId,
    getEndActivityScreenIsShown: state => state.module.endActivityScreenIsShown,
    getCurrentActivityView: state => state.module.currentActivityView,
    getSkipToActivityId: state => state.module.skipToActivityId,
    getModuleVersion: state => state.module.version,
    getModuleType: state => state.moduleData.moduleType,
    getModuleName: state => state.moduleData.moduleName,
    getIconBarIsShown: state => state.iconBar.isShown,
    getLightBoxIsShown: state => state.module.lightBoxIsShown,
    getLightBoxMode: state => state.module.lightBoxMode,
    getActivityLightBoxIsShown: state => state.module.activityLightBoxIsShown,
    getIntroCompleted: state => state.module.introCompleted,
    getIntroScreenIsShown: state => state.module.introIsShown,
    getUseSafetyScreen: state => state.module.useSafetyScreen,
    getSafetyCompleted: state => state.module.safetyCompleted,
    getSafetyScreenIsShown: state => state.module.safetyIsShown,
    getcarVideoIsShown: state => state.module.carVideoIsShown,

    /********************************************************
     * REVIEW QUESTION GETTERS
     ********************************************************/
    getCurrentReviewQuestionsViewId: state => state.module.currentReviewQuestionsViewId,
    getReviewQuestionsSubmitted: state => state.module.reviewQuestionsSubmitted,
    getReviewQuestionsUserAnswers: state => state.module.reviewQuestionsUserAnswers,

	/********************************************************
	* VIDEO PAGE GETTERS
	********************************************************/
    getVideoSource: state => state.videoPage.videoSource,
    getLoadedVideo: state => state.videoPage.loadedVideo,
    getActiveButton: state => state.videoPage.activeButton,

	/********************************************************
	* AUDIO GETTERS
	********************************************************/
    getAudioCompleted: state => state.module.audioCompleted,
    getAudioMuted: state => state.audioPlayer.audioMuted,
    getCurrentAudioPlayer: state => state.audioPlayer.currentAudioPlayer,

    /********************************************************
	* CONTINUE BUTTON GETTERS
	********************************************************/
    getContinueButtonMode: state => state.components.continueButton.mode,
    getContinueButtonView: state => state.components.continueButton.view,
    getContinueButtonIsShown: state => state.components.continueButton.isShown,
    getContinueButtonCallback: state => state.components.continueButton.callback,

	/********************************************************
	* ICONBAR: MENU GETTERS
	********************************************************/
	// getModuleVersion: state => state.iconBar.menus.main.version,
    getMainMenuOpen: state => state.iconBar.menus.main.isOpen,
    getVideoSubMenuOpen: state => state.iconBar.menus.main.subMenus.videoSubMenuOpen,
    getVideoSubMenuItems: state => state.iconBar.menus.main.subMenus.videos,
    getOtherVideoSubMenuItems: state => state.moduleData.videos,

    getActivitySubMenuOpen: state => state.iconBar.menus.main.subMenus.activitySubMenuOpen,
    getActivitySubMenuItems: state => state.moduleData.activities,

    getVideoPopupPlayerIsShown: state => state.iconBar.menus.main.subMenus.videoPopupPlayerIsShown,
    getVideoPopupPlayerSrc: state => state.iconBar.menus.main.subMenus.videoPopupPlayerSrc,

    getSiMenuOpen: state => state.iconBar.menus.serviceInfo.isOpen,
    // getSiMenuItems: state => state.moduleData.siMenuItems,

	/********************************************************
	* ICONBAR: ICON GETTERS
	********************************************************/
    getToolTrayIconIsShown: state => state.iconBar.icons.toolTray.isShown,
    getToolTrayIconIsEnabled: state => state.iconBar.icons.toolTray.isEnabled,

    getServiceInfoIconIsShown: state => state.iconBar.icons.serviceInfo.isShown,
    getServiceInfoIconIsEnabled: state => state.iconBar.icons.serviceInfo.isEnabled,

    getPartsDepartmentIconIsShown: state => state.iconBar.icons.partsDepartment.isShown,
    getPartsDepartmentIconIsEnabled: state => state.iconBar.icons.partsDepartment.isEnabled,
    getIsPartShown: state => state.widgets.partsDepartment.partIsShown,

    getZoomIconIsShown: state => state.iconBar.icons.zoom.isShown,
    getZoomInEnabled: state => state.iconBar.icons.zoomIn.isEnabled,
    getZoomOutEnabled: state => state.iconBar.icons.zoomOut.isEnabled,
    getZoomPercent: state => state.iconBar.icons.zoom.zoomPercent,

	/********************************************************
	* COMPONENTS GETTERS
	********************************************************/
    getCCBarIsShown: state => state.components.footer.ccBar.isShown,
    getCCBarIsOn: state => state.components.footer.ccBar.isOn,
    getCCBarText: state => state.components.footer.ccBar.text,

    getCloseModuleAlertIsShown: state => state.components.closeModuleAlert.isShown,
    getSkipActivityAlertIsShown: state => state.components.skipActivityAlert.isShown,
    getActivityAlreadyCompletedIsShown: state => state.components.activityAlreadyCompleted.isShown,

    getAssessmentWindowIsShown: state => state.components.assessmentWindow.isShown,
    getAssessmentWindowIsExpanded: state => state.components.assessmentWindow.isExpanded,
    getAssessmentWindowIsCollapsed: state => state.components.assessmentWindow.isCollapsed,
    getSubmitAssessmentWindow: state => state.components.assessmentWindow.submit,
    getAssessmentWindowData: state => state.components.assessmentWindow.assessment,
    getAssessmentWindowCallback: state => state.components.assessmentWindow.callback,

    getSiWindowIsShown: state => state.components.siWindow.isShown,
    getSiWindowIsExpanded: state => state.components.siWindow.isExpanded,
    getSiWindowIsCollapsed: state => state.components.siWindow.isCollapsed,
    getSiWindowContent: state => state.components.siWindow.content,
    getSiWindowWidth: state => state.components.siWindow.width,
    getSiWindowHeight: state => state.components.siWindow.height,
    getSiWindowZoomInEnabled: state => state.components.siWindow.zoomIn.isEnabled,
    getSiWindowZoomOutEnabled: state => state.components.siWindow.zoomOut.isEnabled,
    getSiWindowZoomPercent: state => state.components.siWindow.zoomPercent,

    getModulescore: state => state.moduleData.totalScore,

	/********************************************************
	* WIDGET GETTERS
	********************************************************/
    getTaskWindowIsShown: state => state.widgets.taskWindow.isShown,
    getTaskWindowTasks: state => state.widgets.taskWindow.tasks,

    getToolTrayIsShown: state => state.widgets.toolTray.isShown,

    getPartsDepartmentPartIsShown: state => state.widgets.partsDepartment.part.isShown,
    getPartsDepartmentPartMinY: state => state.widgets.partsDepartment.part.minY,
    getPartsDepartmentPartMaxY: state => state.widgets.partsDepartment.part.maxY,
    getPartsDepartmentPartMinX: state => state.widgets.partsDepartment.part.minX,
    getPartsDepartmentPartMaxX: state => state.widgets.partsDepartment.part.maxX,
    getPartsDepartmentPartBackground: state => state.widgets.partsDepartment.part.styles.background,
    getPartsDepartmentPartWidth: state => state.widgets.partsDepartment.part.styles.width,
    getPartsDepartmentPartHeight: state => state.widgets.partsDepartment.part.styles.height,
    getPartsDepartmentPartTop: state => state.widgets.partsDepartment.part.styles.top,
    getPartsDepartmentPartLeft: state => state.widgets.partsDepartment.part.styles.left,
    getPartsDepartmentPartIsCorrectDrop: state => state.widgets.partsDepartment.part.isCorrectDrop,

    getPartsDepartmentIsShown: state => state.widgets.partsDepartment.isShown,
    getPartsDepartmentHotspotTop: state => state.widgets.partsDepartment.hotspot.top,
    getPartsDepartmentHotspotLeft: state => state.widgets.partsDepartment.hotspot.left,
    getPartsDepartmentHotspotWidth: state => state.widgets.partsDepartment.hotspot.width,
    getPartsDepartmentHotspotHeight: state => state.widgets.partsDepartment.hotspot.height,
    getPartsDepartmentHotspotBgColor: state => state.widgets.partsDepartment.hotspot.bgColor,
    getPartsDepartmentHotspotBorderRadius: state => state.widgets.partsDepartment.hotspot.borderRadius,

    getPartsDepartmentBgImage: state => state.widgets.partsDepartment.image.bgImg,
    getPartsDepartmentBgSize: state => state.widgets.partsDepartment.image.bgSize,

    getPartsDepartmentIncorrectVO: state => state.widgets.partsDepartment.incorrectVO,
    getPartsDepartmentIncorrectCC: state => state.widgets.partsDepartment.incorrectCC

	// getOtherVideoSrc: state => state.moduleData.videos.src,
	// getOtherVideoVTT: state => state.moduleData.videos.vtt,
}
