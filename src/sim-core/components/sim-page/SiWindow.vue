<template>
    <div id="si-window"
        class="si"
        :class="{ expanded: isExpanded, collapsed: isCollapsed }"
        :style="{ width: siWidth, height: siHeight }"
        v-if="this.$store.getters.getSiWindowIsShown"
    >
        <div id="si-header">
            <span class="closeIcon" @click="closeWindow()"></span>
            <span class="minMaxIcon" :class="{ minimized: isCollapsed, maximized: isExpanded }" title="Minimize" @click="triggerMinMax()"></span>
            <span class="downloadIcon" @click="downloadFile(contentImage, contentImageFileName)"></span>
            <span class="zoomOutIcon" :class="{ active: zoomOutEnabled }" @click="zoomOut(0.5)"></span>
            <span class="zoomInIcon" :class="{ active: zoomInEnabled }" @click="zoomIn(0.5)"></span>
        </div>
        <div id="si-content" class="si-content">
            <div id="si-content-inner">
                <img id="content-image" :src="contentImage" v-if="this.$store.getters.getCurrentActivityId !== 'A3'">
                <img id="content-image2" :src="contentImage" v-else="this.$store.getters.getCurrentActivityId === 'A3'">
            </div>
        </div>
    </div>
</template>

<script>
import { Draggable } from 'gsap'
import { siZoomIn, siZoomOut } from '../../core/si-zoom'
import download from 'downloadjs'

export default {
    name: 'SiWindow',
    data() {
        return {
            // zoomPercent: 1
            zoomPanelBgImg: {
                background: null,
                backgroundSize: '100%'
            }
        }
    },
    mounted() {
        // Assign the service information window element
        let drag = document.getElementById('si-window')
        let minX = null
        let maxX = null
        let widowWidth = this.$store.getters.getSiWindowWidth
        // let windowHeight = this.siHeight
        // let windowContent = document.getElementById('si-content')
        // windowContent.style.height = windowHeight

        // Adjust x-offsets based on window size
        if (parseInt(widowWidth) < 700) {
            minX = -510
            maxX = 610
        } else {
            minX = -710
            maxX = 750
        }

        // Makes the assessment window draggable
        Draggable.create(drag, {
            type: 'x,y',
            trigger: '#si-header',
            bounds: '#activity-area',
            onDrag: function () {
                // sets the drag boundries
                this.applyBounds({
                    minY: -45,
                    maxY: 400,
                    minX: minX,
                    maxX: maxX
                })
            }
        })
    },
    computed: {
        isExpanded() {
            return this.$store.getters.getSiWindowIsExpanded
        },
        isCollapsed() {
            return this.$store.getters.getSiWindowIsCollapsed
        },
        contentImage() {
            return this.$store.getters.getSiWindowContent
        },
        contentImageFileName() {
            return this.$store.getters.getSiWindowFileName
        },
        siHeight() {
            return this.$store.getters.getSiWindowHeight
        },
        siWidth() {
            return this.$store.getters.getSiWindowWidth
        },
        zoomInEnabled() {
            return this.$store.getters.getSiWindowZoomInEnabled
        },
        zoomOutEnabled() {
            return this.$store.getters.getSiWindowZoomOutEnabled
        },
        zoomPercent() {
            return this.$store.getters.getSiWindowZoomPercent
        }
    },
    watch: {
        isExpanded(newVal) {
            this.isExpanded = newVal
        },
        isCollapsed(newVal) {
            this.isCollapsed = newVal
        },
        contentImage(neVal) {
            this.contentImage = neVal
        },
        contentImageFileName(neVal) {
            console.log(neVal)
            this.contentImageFileName = neVal
        },
        siHeight(newVal) {
            this.siHeight = newVal
        },
        siWidth(newVal) {
            return this.siWidth = newVal
        },
        zoomInEnabled(newVal) {
            return this.zoomInEnabled = newVal
        },
        zoomOutEnabled(newVal) {
            return this.zoomOutEnabled = newVal
        },
        zoomPercent(newVal) {
            return this.zoomPercent = newVal
        }
    },
    methods: {
        closeWindow() {
            this.$store.commit('hideSiWindow')
            this.isExpanded = true
            this.collapsed = false
            this.$store.commit('expandSiWindow')
            // unPause()
        },
        triggerMinMax() {
            if (this.isExpanded === true) {
                this.$store.commit('collapseSiWindow')
                this.isExpanded = false
                this.isCollapsed = true
            } else {
                this.$store.commit('expandSiWindow')
                this.isExpanded = true
                this.isCollapsed = false
            }
        },
        toggleActive() {
            if (this.zoomPercent === 1) {
                this.$store.commit('enableSiWindowZoomIn')
                this.$store.commit('disableSiWindowZoomOut')
            } else if (this.zoomPercent === 1.5) {
                this.$store.commit('enableSiWindowZoomIn')
                this.$store.commit('enableSiWindowZoomOut')
            } else if (this.zoomPercent === 2) {
                this.$store.commit('disableSiWindowZoomIn')
                this.$store.commit('enableSiWindowZoomOut')
            }
        },
        zoomIn(percent) {
            let target = document.getElementById('si-content-inner')
            siZoomIn(this.zoomPercent, {target: target, percent: percent})
            this.$store.commit('setSiWindowZoomPercent', (this.zoomPercent + percent))
            this.zoomPercent = (this.zoomPercent + percent)
            this.toggleActive()
        },
        zoomOut(percent) {
            let target = document.getElementById('si-content-inner')
            siZoomOut(this.zoomPercent, {target: target, percent: percent})
            this.$store.commit('setSiWindowZoomPercent', (this.zoomPercent - percent))
            this.zoomPercent = (this.zoomPercent - percent)
            this.toggleActive()
        },
        downloadFile(contentImage, contentImageFileName) {
            this.getDataUri(contentImage, (data) => {
                download(data, contentImageFileName, 'image/png')
            })
        },
        getDataUri(url, callback) {
            var image = new Image()

            image.onload = function () {
                var canvas = document.createElement('canvas')
                canvas.width = this.naturalWidth // or 'width' if you want a special/scaled size
                canvas.height = this.naturalHeight // or 'height' if you want a special/scaled size
                canvas.getContext('2d').drawImage(this, 0, 0)
                // Get raw image data
                // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''))
                // ... or get as Data URI
                callback(canvas.toDataURL('image/png'))
            }
            image.src = url
        }
    }
}
</script>

<style scoped>
.expanded {
	max-height: 490px;
}

.collapsed {
	max-height: 20px;
	overflow: hidden;
	-webkit-transition: max-height 0.1s;
	-moz-transition: max-height 0.1s;
	transition: max-height 0.1s;
}

#si-window {
    position: relative;
    font-family: Roboto-Bold;
	max-width: 900px;
	min-width: 400px;
    background: #FFF;
	margin: auto;
    margin-top: 110px;
	padding: 0;
    z-index: 15;
    -webkit-box-shadow: 3px 3px 10px;
    -moz-box-shadow: 3px 3px 10px;
    box-shadow: 3px 3px 10px;
	overflow: hidden;
}

#si-window > #si-header {
    position: relative;
    background: #999;
	background-size: 100%;
    width: 100%;
    height: 20px;
    cursor: move;
}

#si-window > #si-header > .closeIcon {
    width: 20px;
    height: 20px;
    float: left;
    margin-left: 10px;
    cursor: pointer;
	background: url(/assets/img/icons/close_popup.png) no-repeat 0% 0% / 100% 100%;
}

#si-window > #si-header > .zoomInIcon.active {
	opacity: 1;
	pointer-events: all;
}

#si-window > #si-header > .zoomOutIcon.active {
	opacity: 1;
	pointer-events: all;
}

#si-window > #si-header > .zoomInIcon {
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 6px;
    cursor: pointer;
	pointer-events: none;
	background: url(/assets/img/icons/increase.png) no-repeat 0% 0% / 100% 100%;
	opacity: .5;
}

#si-window > #si-header > .zoomOutIcon {
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 6px;
    cursor: pointer;
	pointer-events: none;
	background: url(/assets/img/icons/decrease.png) no-repeat 0% 0% / 100% 100%;
	opacity: .5;
}

#si-window > #si-header > .downloadIcon {
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 6px;
    cursor: pointer;
	background: url(/assets/img/icons/download_popup.png) no-repeat 0% 0% / 100% 100%;
}

#si-window > #si-header > .minMaxIcon {
    width: 20px;
    height: 20px;
    float: right;
    margin-right: 10px;
    cursor: pointer;
}

#si-window > #si-header .minMaxIcon.minimized {
    background: url(/assets/img/icons/down_icon.png) no-repeat 0% 0% / 100% 100%;
}

#si-window > #si-header .minMaxIcon.maximized {
    background: url(/assets/img/icons/up_icon.png) no-repeat 0% 0% / 100% 100%;;
}

#si-window  > #si-content {
    position: relative;
	width: 100%;
	height: 100%;
	min-height: 0;
    padding: 0;
    line-height: 16px;
    font-size: 15px;
    box-sizing: border-box;
	cursor: default;
    overflow: hidden;
}

#si-window  > #si-content-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 0;
    padding: 0;
    line-height: 16px;
    font-size: 15px;
    box-sizing: border-box;
    cursor: default;
    top: 0;
    left: 0;
    height: auto !important;
    overflow: hidden;
}

#content-image {
    width: 100%;
    height: auto;
}

#content-image2 {
    width: 100%;
    height: auto;
}
</style>
