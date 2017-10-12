<template>
    <div id="homePage">
        <div id="homeLogo"></div>
        <div id="homeContainer">
            <div id="mainHeading">
                <p id="line1">{{ this.$store.getters.getSeriesName1 }}</p>
                <p id="line2">{{ this.$store.getters.getSeriesName2 }}</p>
            </div>
            <div id="subHeading">{{ this.$store.getters.getModuleName }}</div>
            <buttons-home></buttons-home>
        </div>
    </div>
</template>

<script>
import ButtonsHome from './ButtonsHome'

export default {
    name: 'HomePage',
    components: {
        ButtonsHome
    }
}
</script>

<style lang="scss" scoped>
#homePage {
    position: absolute;
    width: 1000px;
    height: 625px;
    top: 0;
    left: 50%;
    margin-left: -500px;
    background: url('/assets/img/module/bg_red_car.jpg');
}

#homeLogo {
	position: absolute;
	top: 10px;
	right: 40px;
	width: 100px;
	height: 45px;
	background: url('/assets/img/module/logo.png');
	display: block;
}

#homeContainer {
	position: absolute;
    margin: auto;
	width: 1000px;
	height: 625px;
}

/* CSS Hack: Target Chrome & Safari */
#mainHeading:not(*:root) {
	font-family: RobotoSlab-Bold;
	position: absolute;
	top: 82px;
    left: 0;
	width: 1000px;
	height: auto;
	font-size : 89px;
	color: #fff;
	text-indent: 0;
    text-align: left;
}


#mainHeading {
	font-family: RobotoSlab-Bold;
	width: 1000px;
	height: auto;
	font-size : 89px;
	color: #fff;
	text-indent: 0;
    text-align: left;
}


#line1 {
    position: absolute;
    top: 0;
    left: 107px;
}

#line2 {
    position: absolute;
    top: 80px;
    left: 260px;
}

#subHeading {
	position: absolute;
	top: 275px;
    left: 260px;
    font-family: Roboto-Medium;
    font-size: 43px;
	color: #FDEE1C;
	text-transform: uppercase;
    text-align: left;
    line-height: 40px;
}
</style>
