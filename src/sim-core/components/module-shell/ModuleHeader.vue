<template>
    <div id="moduleHeader">
        <div class="series">
			{{ this.$store.getters.getSeriesName1 }} {{ this.$store.getters.getSeriesName2 }}
		</div>
        <div class="module-activity-names">
        	<span class="module-name">{{ this.$store.getters.getModuleName }}</span>
         	<span class="divider" v-if="this.$store.getters.getActivityName">/</span>
          	<span class="activity-name" v-if="this.$store.getters.getActivityName">
				{{ this.$store.getters.getActivityName }}
			</span>
        </div>
        <div id="headerLogo"></div>
    </div>
</template>

<script>
export default {
    name: 'ModuleHeader'
}
</script>

<style scoped>
#moduleHeader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    background-color: white;
}

#moduleHeader .series {
	font-family: RobotoSlab-Bold;
	position: absolute;
	float: left;
	color: #D22027;
	font-size: 19px;
	line-height: 44px;
	top: 0px;
	left: 40px;
}

#moduleHeader .module-activity-names {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: absolute;
	float: left;
	top: 0px;
	left: 290px;
	margin-bottom: 10px;
}

#moduleHeader .module-name {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: relative;
	margin-top: 10px;
	margin-right: 5px;
	float: left;
}

#moduleHeader .divider {
	margin-top: 10px;
	position: relative;
	float: left;
}

#moduleHeader .activity-name {
	font-family: Roboto-Medium;
	color: #000;
	font-size: 18px;
	position: relative;
	float: left;
	margin-top: 10px;
	margin-left: 5px;
	margin-bottom: 10px;
}

#moduleHeader #headerLogo {
	position: absolute;
	float: right;
	top:2px;
	right: 40px;
	width: 100px;
	height: 45px;
	background: url(/assets/img/module/hlogo.png);
	display: block;
}
</style>
