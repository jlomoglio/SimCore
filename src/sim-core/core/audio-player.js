import store from '../store/store'

// let moduleAudioPlayerIndex = 0
// let taskAudioPlayerIndex = 0

// let currentAudioPlayer = null
// let currentAudioArr = []
// let currentAudioCCArr = []
// let currentAudioArrIndex = 0

// Audio player for module level audio eg. End activity screen
let moduleAudioPlayer = document.createElement('moduleAudioPlayer')
moduleAudioPlayer = new Audio()

// Audio player for activity level tasks.
// This is the only audio player that is exposed
// to the activity developer
let taskAudioPlayer = document.createElement('taskAudioPlayer')
taskAudioPlayer = new Audio()

// Audio player for activity task rewind
let rewindTaskAudioPlayer = document.createElement('rewindTaskAudioPlayer')
rewindTaskAudioPlayer = new Audio()

let moduleAudio = {
    currentPlayer: {},
    currentIndex: 0,
    currentAudioArr: [],
    currentCCArr: null,
    callback: {},
    addToRewindPlaylist: false,
    isPlaying: false,
    isPaused: false,
    resetAudioObject: () => {
        this.currentPlayer = null
        this.currentIndex = 0
        this.currentAudioArr = []
        this.currentCCArr = null
        this.callback = {}
        this.isPlaying = false
        this.isPaused = false
    }
}

let taskAudio = {
    currentPlayer: {},
    currentIndex: 0,
    currentAudioArr: [],
    currentCCArr: null,
    callback: {},
    addToRewindPlaylist: false,
    isPlaying: false,
    isPaused: false,
    resetAudioObject: () => {
        this.currentPlayer = null
        this.currentIndex = 0
        this.currentAudioArr = []
        this.currentCCArr = null
        this.callback = {}
        this.isPlaying = false
        this.isPaused = false
    }
}

let rewindAudio = {
    currentPlayer: {},
    currentIndex: 0,
    currentAudioArr: [],
    currentCCArr: null,
    callback: {},
    addToRewindPlaylist: false,
    taskAudioArrLength: 0,
    taskAudioArrIndex: 0,
    unPauseTaskAudio: false,
    resetAudioObject: () => {
        this.currentPlayer = null
        this.currentIndex = 0
        this.currentAudioArr = []
        this.currentCCArr = null
        this.callback = {}
        this.isPlaying = false
    }
}

function playAudioSequence(audio, player, isTaskAudio) {
    if (isTaskAudio) {
        store.commit('showActivityBlockBox')
    }

    if (audio.currentCCArr && audio.currentCCArr.length > 0) {
        store.commit('showCCBar')
    }

    if (audio.currentIndex < audio.currentAudioArr.length) {
        player.src = audio.currentAudioArr[audio.currentIndex]
        player.play()

        player.onplaying = () => {
            audio.isPlaying = true
            if (audio.currentCCArr && audio.currentCCArr.length > 0) {
                store.commit('addCCBarText', audio.currentCCArr[audio.currentIndex])
            }
            if (audio.addToRewindPlaylist) {
                store.commit('setTaskPlayListLength', audio.currentAudioArr.length)
                store.commit('setTaskPlayListIndex', audio.currentIndex)
                store.commit('addToRewindPlayList',
                    {audioUrl: audio.currentAudioArr[audio.currentIndex],
                        audioCC: (audio.currentCCArr ? audio.currentCCArr[audio.currentIndex] : null) })
            }
        }

        player.onended = () => {
            audio.currentIndex += 1
            audio.isPlaying = false
            playAudioSequence(audio, player, isTaskAudio)
        }
    } else {
        audio.isPlaying = false
        store.commit('hideActivityBlockBox')
        if (audio.currentCCArr && audio.currentCCArr.length > 0) {
            store.commit('addCCBarText', '')
            store.commit('hideCCBar')
        }
        if (audio.callback) {
            audio.callback()
        }
    }
}

function playRewindAudioSequence(audio, player) {
    if (audio.currentCCArr !== null) {
        store.commit('showCCBar')
    }

    if (audio.currentIndex < audio.currentAudioArr.length) {
        player.src = audio.currentAudioArr[audio.currentIndex]
        player.play()

        player.onplaying = () => {
            rewindAudio.isPlaying = true
            rewindAudio.unPauseTaskAudio = false
            if (audio.currentCCArr && audio.currentCCArr.length > 0) {
                store.commit('addCCBarText', audio.currentCCArr[audio.currentIndex])
            }
        }

        player.onended = () => {
            rewindAudio.isPlaying = false
            audio.currentIndex += 1
            store.commit('setRewindAudioIndex', audio.currentIndex)
            playRewindAudioSequence(audio, player)
        }
    } else {
        rewindAudio.isPlaying = false

        if (audio.currentCCArr && audio.currentCCArr.length > 0) {
            store.commit('addCCBarText', '')
            store.commit('hideCCBar')
        }

        if (audio.taskAudioArrIndex < audio.taskAudioArrLength - 1) {
            rewindAudio.unPauseTaskAudio = true
            taskAudio.currentIndex += 1
            playAudioSequence(taskAudio, taskAudioPlayer)
        } else {
            if (audio.callback) {
                audio.callback()
            }
        }
    }
}

export const playAudio = (audioArr, audioCCArr = null, endSeqenceCallback = null) => {
    if (rewindAudio.isPlaying === true) {
        return false
    }
    if (moduleAudio.isPlaying) {
        moduleAudioPlayer.pause()
        taskAudioPlayer.pause()
    }

    moduleAudio.resetAudioObject()

    moduleAudio.currentIndex = 0
    moduleAudio.currentAudioArr = (Array.isArray(audioArr) ? audioArr : [audioArr])
    if (audioCCArr) {
        moduleAudio.currentCCArr = (Array.isArray(audioCCArr) ? audioCCArr : [audioCCArr])
    } else {
        moduleAudio.currentCCArr = null
    }

    moduleAudio.callback = endSeqenceCallback
    moduleAudio.addToRewindPlaylist = false

    if (store.state.audioPlayer.audioMuted) {
        moduleAudioPlayer.volume = 0
    } else {
        moduleAudioPlayer.volume = 1
    }

    playAudioSequence(moduleAudio, moduleAudioPlayer)
}

export const play = (audioArr, audioCCArr, endSeqenceCallback) => {
    if (moduleAudio.isPlaying) {
        moduleAudioPlayer.pause()
    }

    if (taskAudio.isPlaying) {
        taskAudioPlayer.pause()
        rewindTaskAudioPlayer.pause()
    }

    taskAudio.resetAudioObject()

    // Initial load of the audio player sequence
    // will check to ensure the ccBar is hidden before playing an audio sequence
    store.commit('setTaskPlayListLength', audioArr.length)

    taskAudio.currentIndex = 0
    taskAudio.currentPlayer = taskAudioPlayer
    taskAudio.currentAudioArr = (Array.isArray(audioArr) ? audioArr : [audioArr])
    if (audioCCArr) {
        taskAudio.currentCCArr = (Array.isArray(audioCCArr) ? audioCCArr : [audioCCArr])
    } else {
        taskAudio.currentCCArr = null
    }
    taskAudio.callback = endSeqenceCallback
    taskAudio.addToRewindPlaylist = true

    if (store.state.audioPlayer.audioMuted) {
        taskAudioPlayer.volume = 0
    } else {
        taskAudioPlayer.volume = 1
    }

    playAudioSequence(taskAudio, taskAudioPlayer, true)
}

export const rewindAudioPlay = () => {
    if (taskAudio.isPlaying) {
        taskAudioPlayer.pause()
    }
    if (moduleAudio.isPlaying) {
        moduleAudioPlayer.pause()
    }

    if (rewindAudio.isPlaying) {
        rewindTaskAudioPlayer.pause()
    }

    if (store.state.audioPlayer.audioMuted) {
        rewindTaskAudioPlayer.volume = 0
    } else {
        rewindTaskAudioPlayer.volume = 1
    }

    let audioCCArr = (store.state.audioPlayer.rewindAudioCCList[0] === null ? null : store.state.audioPlayer.rewindAudioCCList)
    rewindAudio.taskAudioArrLength = store.state.audioPlayer.playListArrLength
    rewindAudio.taskAudioArrIndex = store.state.audioPlayer.playListIndex
    rewindAudio.currentAudioArr = store.state.audioPlayer.rewindAudioList
    if (audioCCArr) {
        rewindAudio.currentCCArr = (Array.isArray(audioCCArr) ? audioCCArr : [audioCCArr])
    }

    rewindAudio.currentIndex = store.state.audioPlayer.rewindAudioIndex
    rewindAudio.callback = (taskAudio.callback || null)

    playRewindAudioSequence(rewindAudio, rewindTaskAudioPlayer)
}

export const pause = (player) => {
    if (player) {
        switch (player) {
        case 'moduleAudioPlayer':
            moduleAudioPlayer.pause()
            break
        case 'taskAudioPlayer':
            taskAudioPlayer.pause()
            break
        case 'rewindTaskAudioPlayer':
            rewindTaskAudioPlayer.pause()
            break
        }
    } else {
        if (moduleAudio.isPlaying) {
            moduleAudio.isPaused = true
            moduleAudio.isPlaying = false
            moduleAudioPlayer.pause()
        }
        if (taskAudio.isPlaying === true) {
            taskAudio.isPaused = true
            taskAudio.isPlaying = false
            taskAudioPlayer.pause()
        }
        if (rewindAudio.isPlaying) {
            rewindAudio.isPaused = true
            rewindAudio.isPlaying = false
            rewindTaskAudioPlayer.pause()
        }
    }
}

export const unPause = () => {
    if (taskAudio.isPaused && !rewindAudio.unPauseTaskAudio) {
        if (taskAudio.isPaused && !taskAudio.isPlaying) {
            taskAudio.isPlaying = true
            taskAudio.isPaused = false
            taskAudioPlayer.play()
        }
    }
    else if (rewindAudio.isPaused && !taskAudio.isPaused) {
        rewindAudio.isPlaying = true
        rewindAudio.isPaused = false
        rewindTaskAudioPlayer.play()
    }
}

export const mute = () => {
    store.commit('muteAudio')
    rewindTaskAudioPlayer.muted = true
    moduleAudioPlayer.muted = true
    taskAudioPlayer.muted = true
}

export const unMute = () => {
    store.commit('unmuteAudio')
    rewindTaskAudioPlayer.muted = false
    moduleAudioPlayer.muted = false
    taskAudioPlayer.muted = false
}

export const clearRewindPlayList = () => {
    store.commit('resetAudioRewindDefaults')
}

export default {
    play,
    mute,
    unMute,
    pause,
    unPause
}
