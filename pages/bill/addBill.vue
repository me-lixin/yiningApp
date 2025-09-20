<template>
    <u-popup :show="visible" safeAreaInsetTop mode="right" @open="open">
	  <view class="container" @touchmove="handleTouchMove">
		  <view class="heard">
			<u-button type="info" text="取消"
			style="position: absolute; width: 16vw; height: 35px;
			 left: 5px; top: 5px;border-radius: 18px;background: transparent;"
			 @click="closed"
			 >
			</u-button>
			<u-button type="success" text="管理" @click="showSetType = true"
				style="
				position: absolute;
				width: 16vw;
				height: 35px;
				right: 5px;
				top: 5px;
				border-radius: 18px;
				background: transparent;
				color: #333333;
				" >
			</u-button>
			<view :class="['tabs',tabsSelect=='支出'?'tabs-select':'']" @click="onTabClick('支出')"> 支出 </view>
			<view :class="['tabs',tabsSelect=='收入'?'tabs-select':'']" @click="onTabClick('收入')"> 收入 </view>
		  </view>

		    <view class='content-wh'>
		      <div v-for="(item,index) in icons" 
			  :key="index" 
			  v-if="tabsSelect===item.type"
			  :class="['item', nowIcon.icon == item.icon ? 'select-color' : 'default-color']"
			  @click="onCategoryChange(item)" @longpress="onDeleteArea(index)">
		        <text :class="['iconfont', item.icon]" style="font-size: 36px;"/>
		        <text class="item-font">{{ item.name }}</text>
		      </div>
			  <view style="height: 400px;" />
			  <key-board :keyShow="keyShow" :existForm="billForm" @close="handleKeyClose"></key-board>
		    </view>
			
	  </view>
	  <set-type :visible="showSetType" @close="handleClose"></set-type>
    </u-popup>
</template>

<script>
import draggable from 'vuedraggable'
import setTypeVue from '@/pages/components/setType.vue';
import keyBoardVue from '@/pages/components/keyboard.vue';
import {list,deleteC} from '@/api/category.js'
import {add,update} from '@/api/bill.js'
import util  from '@/static/js/utils.js';
export default {
	components: {'draggable': draggable,
				'set-type': setTypeVue,
				'key-board': keyBoardVue,
				},
	props:{
		visible: Boolean,
		billForm: Object
	},
  data() {
    return {
	  deleteList:[{ id: 1, name: '账单', icon: 'icon-gongzitiao' }],
	  nowIcon:{},
	  keyShow:false,
	  tabsSelect:'支出',
	  deleteShow:false,
	  showSetType:false,
      icons: [],
    }
  },
  methods: {
	  closed() {
		console.log('关闭')
		this.$emit('close')
	  },
	  open() {
	  		console.log('打开')
	  		this.getAllCategory()
	  },
	  getAllCategory(){
	  		  list(util.getItem("user").id).then(res=>{
	  		  	if(res.code == 200){
	  		  		this.icons = res.data
	  		  	}
	  		  })
	  },
	  handleKeyClose(payload){
		  if(!payload){
			  this.keyShow = false;
			  return
		  }
		  payload.billForm.type = this.tabsSelect
		  payload.billForm.billTag = this.nowIcon.name
		  payload.billForm.icon = this.nowIcon.icon
		  let date = payload.billForm.createdAt
		  console.log('date',date)
		  payload.billForm.createdAt = util.formatDate(date)
		  payload.billForm.amount = Number(payload.billForm.amount)
		  if(payload.billForm.id){
			  update(payload.billForm).then(res=>{
				  if(res.code == 200){
					  this.keyShow = false;
					  this.$emit('close')
				  }
			  })
		  }else{
			  payload.billForm.userId = util.getItem('user').id
			  add(payload.billForm).then(res=>{
				  if(res.code == 200){
					  this.keyShow = false;
					  this.$emit('close')
				  }
			})
		  }
	  },
	  handleClose(payload) {
		  this.icons = payload.icons
		  this.showSetType = false
	  },
	  onRefresh(){
	  		  this.getAllCategory()
	  		  this.showAddType = false
	  },
	  onTabClick(val){
		  this.tabsSelect = val
	  },
	  onCategoryChange(item) {
	  	this.nowIcon = item;
		this.keyShow = true;
	  },
	  onDeleteArea(index){
		  this.deleteIndex = index;
		  this.deleteShow = true;
	  },
	  onDragEnd() {
		  this.deleteShow = false
	  },
	  onIconsChange(){},
	    onChange(value) {
	      console.log('输入框变化', value);
	      // 在这里处理变化逻辑
	    },

  },
  mounted() {
  }
}
</script>

<style>
.container {
  position: relative;
  width: 100vw;
  background-color: #f8f8f8;
  height: 100dvh

}

.heard{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #8ad7c1, #F8F8F8);
    position: relative;
    gap: 50px;
	height: 10dvh
}
.tabs{
	height: 30px;
	font-size: 20px;
	padding-bottom: 5px;
}
.tabs-select{
	border-bottom: solid 2px;
	font-weight: bold;
}
.item {
	position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	margin-bottom: 20px;
}
.item-font{
	display: block;
	position: absolute;
	bottom: -20px;
	font-size: 13px;
}
.select-color {
	background: #5ac725;
}
.default-color {
	background: #e5e5e5;
}
.content-wh{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
	justify-items: center;
	justify-content: center;
	padding: 20px;
	height: auto;
	max-height: 78vh;
	width: 90vw;
	overflow-y: auto;
}

</style>
