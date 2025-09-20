<template>
	<u-popup :show="show" safeAreaInsetTop overlay :round="10" mode="bottom" @close="close" @open="open">
		<view class="content">
			<h3 style="margin: 10px 0 20px 0;">添加类别</h3>
			<u-button type="success" text="确定"
				style="position: absolute; width: 16vw; height: 35px;
						right: 5px; top: 5px; border-radius: 18px;color: rgba(17, 17, 17, .7);">
			</u-button>
			<u-button type="info" text="取消"
			style="position: absolute; width: 16vw; height: 35px;
			 left: 5px; top: 5px;border-radius: 18px;"
			 @click="closed"
			 >
			</u-button>
			<view class="">
				<view :class="['iconfont','item', nowIcon.icon]" style="font-size: 38px;font-size: 38px;margin-bottom: 20px;background: #5ac725;"></view>
			</view>
			  <u--input
			    placeholder="请输入类别名称(不超过4个汉字)"
			    border="surround"
				v-model="value"
				@change="onChange"
				maxlength=4
				style="background: #e5e5e5; width: 80vw;"
			    clearable
			  ></u--input>
			<view style="overflow: scroll;padding-bottom: 20vh;">
				<view class="category" v-for="(key,index) in Object.keys(icons)">
					<view style="margin:20px 0 10px 0;font-size: 20px;">{{key}}</view>
					<view style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px;">
						<view :class="['item',nowIndex == index ? 'select-color' : 'default-color']"
						 v-for="(item,index) in icons[key]" @click="onCategoryChange(item,index)">
							<view :class="['iconfont', item.icon]" style="font-size: 38px;"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import util from '@/static/js/utils.js'
import { getIconAll } from '@/api/icon.js';
import { vShow } from "vue";
	export default {
		data() {
			return {
				icons:{},
				show: true,
				value: '',
				nowIndex: '',
				nowIcon: {icon:'icon-yigui'}
			};
		},
		onShow() {
			this.getIcon();
			this.onCategoryChange(this.nowIcon,0);
		},
		methods: {
		    open() {
				this.show = true
				// console.log('open');
			},
			closed() {
				this.show = false
				// console.log('open');
			},
			getIcon(){
				getIconAll().then(res=>{
					if (res.code==200) {
						this.icons = res.data
					}
				})
			},
			onCategoryChange(item,index) {
				console.log('item',item)
				console.log('index',index)
				this.nowIcon = item;
				this.nowIndex = index;
			},

			getImgSrc(item, index) {
				if (index == this.categoryCursor) {
					return item.selectedIconSrc
				}
				return item.iconSrc
			},

			submit() {

			},
		}
	};
</script>

<style scoped>
	.input-class{
		background: #e5e5e5;
		width: 80vw;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 93vh;
		position: relative;
	}

	.category {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		margin-bottom: 10px;
	}

	.item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 55px;
		height: 55px;
		border-radius: 50%;
	}

	.select-color {
		background: #5ac725;
	}
	.default-color {
		background: #e5e5e5;
	}

</style>
