export default {
  /********************************************************
   * STATE OBJECT ACTIONS
   ********************************************************/
    setModuleData: ({ commit }, moduleDataObj) => commit('mutateModuleData', moduleDataObj),
    setModule: ({ commit }, moduleObj) => commit('mutateModule', moduleObj),
    setVideoPage: ({ commit }, videoPageObj) => commit('mutateVideoPage', videoPageObj),
    setIconBar: ({ commit }, iconBarObj) => commit('mutateIconBar', iconBarObj),
    setComponents: ({ commit }, componentsObj) => commit('mutateComponents', componentsObj),
    setWidgets: ({ commit }, widgetsObj) => commit('mutateWidgets', widgetsObj),
    setAudioPlayer: ({ commit }, audioPlayerObj) => commit('mutateAudioPlayer', audioPlayerObj),

  /********************************************************
   * MODULE ACTIONS
   ********************************************************/
    setSeriesName1: ({ commit }, seriesName1) => commit('setSeriesName1', seriesName1),
    setSeriesName2: ({ commit }, seriesName2) => commit('setSeriesName2', seriesName2),
    setCurrentView: ({ commit }, view) => commit('setCurrentView', view),
    setUseContentArea: ({ commit }, useContentArea) => commit('setUseContentArea', useContentArea),
    setActivityName: ({ commit }, activityName) => commit('setActivityName', activityName),
    setCurrentActivityView: ({ commit }, currentActivityView) => commit('setCurrentActivityView', currentActivityView),
    setModuleType: ({ commit }, moduleType) => commit('setModuleType', moduleType),
    setModuleName: ({ commit }, moduleName) => commit('setModuleName', moduleName),

    setIconBarIsShown: ({ commit }, isShown) => commit('setIconBarIsShown', isShown),

    setLightBoxIsShown: ({ commit }, lightBoxIsShown) => commit('setLightBoxIsShown', lightBoxIsShown),
    setLightBoxMode: ({ commit }, lightBoxMode) => commit('setLightBoxMode', lightBoxMode),

    setIntroCompleted: ({ commit }, introCompleted) => commit('setIntroCompleted', introCompleted),
    setIntroScreenIsShown: ({ commit }, isShown) => commit('setIntroScreenIsShown', isShown),

  /********************************************************
   * VIDEO PAGE ACTIONS
   ********************************************************/
    setVideoSource: ({ commit }, videoSource) => commit('setVideoSource', videoSource),
    setLoadedVideo: ({ commit }, loadedVideo) => commit('setLoadedVideo', loadedVideo),
    setActiveButton: ({ commit }, activeButton) => commit('setActiveButton', activeButton),

   /********************************************************
   * AUDIO PAGE ACTIONS
   ********************************************************/
    setAudioCompleted: ({ commit }, audioCompleted) => commit('setAudioCompleted', audioCompleted),

  /********************************************************
   * ICONBAR: MENU ACTIONS
   ********************************************************/
    increaseZoom: ({ commit }, percent) => commit('increaseZoom', percent),
    decreaseZoom: ({ commit }, percent) => commit('decreaseZoom', percent),
    enableZoom: ({ commit }, isEnabled) => commit('enableZoom', isEnabled),
    disableZoom: ({ commit }, isEnabled) => commit('disableZoom', isEnabled),

  /********************************************************
   * COMPONENTS ACTIONS
   ********************************************************/
  // setCloseModuleAlertIsShown: ({ commit }, isShown) => commit('setCloseModuleAlertIsShown', isShown),

    increaseScore: ({ commit }, score) => commit('increaseScore', score),
    decreaseScore: ({ commit }, score) => commit('decreaseScore', score)
}
