const <template>
    <div id="videoPage">
        <module-header></module-header>
        <div id="videoContainer">
            <video-player></video-player>
            <div id="videoButtons"></div>
        </div>
        <buttons-video></buttons-video>
    </div>
</template>

<script>
import ModuleHeader from '../module-shell/ModuleHeader'
import ButtonsVideo from './ButtonsVideo'
import VideoPlayer from './VideoPlayer'

export default {
    name: 'VideoPage',
    components: {
        ModuleHeader,
        ButtonsVideo,
        VideoPlayer
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#videoPage {
    position: absolute;
    width: 1000px;
    height: 625px;
    top: 0;
    left: 50%;
    margin-left: -500px;
    background: url(/assets/img/module/bg_red_car.jpg);
}
</style>
