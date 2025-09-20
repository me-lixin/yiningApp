<template>
	<u-popup :show="visible"  mode="bottom" :round="15" @open="open">
		<view style="height: 85vh;">
		<view class="content">
			<h3 style="margin: 10px 0 20px 0;">添加类别</h3>
			<u-button type="success" text="确定" @click="submit"
				style="position: fixed;
				width: 100vw;
				height: 50px;
				bottom: 0px;
				color: rgba(17, 17, 17, 0.7);
				background: #6dae6d;
				z-index: 1;
				border: none;"
						>
			</u-button>
			<u-button type="info" text="取消"
			style="position: absolute; width: 16vw; height: 35px;
			 left: 5px; top: 5px;border-radius: 18px;background-color: #f8f8f8;"
			 @click="$emit('close')"
			 >
			</u-button>
			<view class="select-plan">
				<view :class="['iconfont','item-select', form.icon]" ></view>
				<u--input
					placeholder="请输入类别名称(不超过4个汉字)"
					border="surround"
					v-model="form.name"
					@change="onChange"
					maxlength=4
					style="background: #e5e5e5; width: 80vw;"
					clearable
				></u--input>
			</view>

			<view style="overflow: scroll;padding-bottom: 20vh;">
				<view class="category" v-for="(key,index) in Object.keys(icons)">
					<view style="margin:20px 0 10px 0;font-size: 20px;">{{key}}</view>
					<view style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px;">
						<view :class="['item',form.icon == item.icon ? 'select-color' : 'default-color']"
						 v-for="(item,index) in icons[key]" @click="onCategoryChange(item)">
							<view :class="['iconfont', item.icon]" style="font-size: 38px;"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		</view>
	</u-popup>
</template>

<script>
import util  from '@/static/js/utils.js';
import { add, update } from '@/api/category.js';
import { getIconAll } from '@/api/icon.js';
import { vShow } from "vue";
export default {
	props:{
		visible: {
			type: Boolean,
		},
		typeValue: {
			type: String,
		},
		existForm:{
			type:Object
		}
	},
	data() {
		return {
			icons:{},
			form:{}
		};
	},
	methods: {
		open() {
			this.getIcon();
			if(this.existForm){
				this.form = this.existForm
			}
			console.log('打开')
		},
		closed() {
			console.log('关闭')
			this.$emit('close')
		},
		onChange(){},
		getIcon(){
			getIconAll().then(res=>{
				if (res.code==200) {
					this.icons = res.data
				}
			})
		},
		onCategoryChange(item) {
			this.form.icon = item.icon;
		},
		
		submit() {
			if(this.form.name.trim().length < 1){
				return
			}
			if(this.form.userId){
				console.log('update')
				update(this.form).then(res=>{
					if(res.code == 200){
						this.$emit('refresh')
					}
				})
			}else{
				console.log('util.getItem("user")',util.getItem("user"))
				this.form.userId = util.getItem("user").id
				this.form.type = this.typeValue
				add(this.form).then(res=>{
					if(res.code == 200){
						this.$emit('refresh')
					}
				})
			}
		}
	}
};
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 80vh;
		position: relative;
		border-radius: 15px;
		background-color: #f8f8f8;
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
	.item-select {
		font-size: 38px;
		display: flex;
		justify-content: center;
		width: 55px;
		height: 55px;
		background: #59c724;
		border-radius: 50%;
		align-items: center;
	}
	.select-plan{
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		gap: 10px;
		padding-bottom: 10px;
	}
	.select-color {
		background: #5ac725;
	}
	.default-color {
		background: #e5e5e5;
	}
	
</style>
