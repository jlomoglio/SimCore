import Vue from 'vue'
import SimModule from './SimModule'
import store from './sim-core/store/store'
import core from './sim-core/core/api'
import AudioPlayer from './sim-core/core/audio-player'
import Hint from './sim-core/directives/v-hint'

Vue.use(core)
Vue.use(AudioPlayer)

// Custom directives
Vue.directive('hint', Hint)

// Instatinate the vue instance
new Vue({
    el: '#simModule',
    created () {
        window.Vue = this
    },
    store,
    template: '<SimModule/>',
    components: { SimModule }
}).$mount('#simModule')
