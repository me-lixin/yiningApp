<template>
	<u-tabbar
	  :value="current"
	  @change="onTabChange"
	  :fixed="true"
	  :placeholder="true"
	  :safeAreaInsetBottom="true"
	>
	  <u-tabbar-item icon="home" text="首页"></u-tabbar-item>
	  <u-tabbar-item icon="play-right" text="放映厅"></u-tabbar-item>
	  <u-tabbar-item icon="video" text="直播"></u-tabbar-item>
	  <u-tabbar-item icon="account" text="我的"></u-tabbar-item>
	</u-tabbar>
</template>

<script>
import util  from '@/static/js/utils.js'
export default {
	data() {
		return {
			current: 0,
			pages: ['pages/tabbar/index/home', 'pages/tabbar/add/home']
		};
	},
	onShow() {
		this.user = util.getItem("user")
		console.log(this.user.username,"用户名")
		if(!this.user){
			uni.redirectTo({
				url:'../../sign-in/sign-in',
				animationType: 'pop-in',
				animationDuration: 200
			})
		}
	},
	methods: {
		onTabChange(index) {
		  this.current = index
		  const pages = ['/pages/home/index', '/pages/account/index', '/pages/user/index']
		  uni.switchTab({
			url: pages[index]
		  })
		}
	}
};
</script>

<style>

</style>
