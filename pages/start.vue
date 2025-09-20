<template>
	<view class="content">
		<image class="logo" src="/static/logo.svg"></image>
		<view class="text-area">
			<text class="title">记账</text>
		</view>
		<view class="vertical-text-area">
		  <text class="vertical-text">你不理财|</text>
		  <view class="vertical-line"></view>
		  <text class="vertical-text">|财不理你</text>
		</view>
	</view>
</template>

<script>
import util  from '@/static/js/utils.js'
	export default {
		data() {
			return {
				title: '肄宁记账'
			}
		},
		onShow() {
			this.user = util.getItem("user")
			console.log(this.user.username,"用户名")
			if(!this.user){
				uni.redirectTo({
					url:'/pages/system/longin',
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		background: url(/static/back.jpg) center;
		height: 100vh;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: -29.75rem;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

.text-area {
	position: absolute;
    position: absolute;
    right: 9.5rem;
    bottom: 5rem;
    top: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    width: 1.5rem;
    background: url(/static/sumi-border.png) no-repeat center center;
    background-size: 100% 100%;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.3125rem rgba(0, 0, 0, 0.1);
}

.title {
  writing-mode: vertical-rl; /* 从上到下，右起 */
  text-orientation: upright;
  font-size: 36rpx;
  font-weight: bold;
  color: #eef6e5;
  font-family: 'KaiTi', 'STKaiti', serif;
}
.vertical-text-area {
	position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 16.375rem;
}

.vertical-text {
	font-family: cursive;
    color: #dadccd;
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-size: 1.4rem;
    padding: 0 0.3125rem;
}

.vertical-line {
  width: 2rpx;
  height: 100%;
  background-color: #ffefef;
  margin: 0 5rpx;
}

</style>
