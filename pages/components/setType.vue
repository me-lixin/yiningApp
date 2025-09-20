<template>
    <u-popup :show="visible" safeAreaInsetTop mode="right" @open="open">
	  <view class="container">
		  <view class="heard">
			<u-button type="info" text="返回"
			style="position: absolute; width: 16vw; height: 35px;
			 left: 5px; top: 5px;border-radius: 18px;background: transparent;"
			 @click="closed"
			 >
			</u-button>
			<u-button type="success" text="添加" @click="onAddCateger"
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
			<view :class="['tabs',tabsSelect=='支出'?'tabs-select':'']" @click="onTabClick('支出')"> 支出 </view>
			<view :class="['tabs',tabsSelect=='收入'?'tabs-select':'']" @click="onTabClick('收入')"> 收入 </view>
		  </view>

		    <view class="content-wh">
		      <view  v-for="(item,index) in icons"
					 :key="item.id"
					 v-if="tabsSelect===item.type"
					 class="item-list" >
					<text class="iconfont icon-jianshao" style="color: #FF0000;" @click="onDelete(index)"></text>
					<text :class="['item','iconfont', item.icon]"></text>
					<text >{{ item.name }}</text>
					<text class="iconfont icon-shezhi" style="color: rgba(53, 53, 53, .6);"  @click="onSet(item)"></text>
					<text class="iconfont icon-zhiding" style="justify-self: end;color: rgba(53, 53, 53, .6);" @click="onTop(index)"></text>
				  </view>
		      </view>
		    </view>
	  </view>
	  <key-board :keyShow="keyShow" @close="keyShow = false"></key-board>
	  <add-type :visible="showAddType" :typeValue="tabsSelect" :existForm="category" @close="showAddType = false" @refresh="onRefresh"></add-type>
    </u-popup>
</template>

<script>
import draggable from 'vuedraggable'
import addTypeVue from '@/pages/components/addType.vue';
import keyBoardVue from '@/pages/components/keyboard.vue';
import {list,deleteC,sort} from '@/api/category.js'
import util  from '@/static/js/utils.js';
export default {
	components: {'draggable': draggable,
				'add-type': addTypeVue,
				'key-board': keyBoardVue,
				},
	props:{
		visible: {
			type: Boolean,
		}
	},	
  data() {
    return {
	  deleteList:[{ id: 1, name: '账单', icon: 'icon-gongzitiao' }],
	  nowIcon:{},
	  keyShow:false,
	  tabsSelect:'支出',
	  deleteShow:false,
	  showAddType:false,
	  category:{},
      icons: [],
    }
  },
  methods: {
	  closed() {
		console.log('关闭')
		sort(this.icons)
		this.$emit('close',{icons:this.icons})
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
	  onRefresh(){
		  this.getAllCategory()
		  this.showAddType = false
	  },
	  onAddCateger(){
		  sort(this.icons)
		  this.category = {
						name: '',
						icon:'icon-yigui'
					}
		  this.showAddType = true
	  },
	  onTabClick(val){
		  this.tabsSelect = val
	  },
	  onTop(index){
		  let item = this.icons.splice(index,1)[0]
		  this.icons.unshift(item)
	  },
	  onSet(item){
		  sort(this.icons)
		  this.category = item
		  this.showAddType = true;
	  },
	  onDelete(index){
		  let item = this.icons.splice(index,1);
		  deleteC(item[0].id)
	  }

  },
  mounted() {
  }
}
</script>

<style>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
}

.delete-area{
	position: fixed;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8vh;
    background: #e43f3f;
    width: 100vw;
    top: 0;
}
.delete-area::before{
    content: "拖拽到此处删除";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 23px;
    color: rgba(0, 0, 0, .3);
    z-index: 0;
    pointer-events: none;
}
.delete-area-shadow{
	box-shadow: 0 0 30px 0px #333333;
}
.heard{
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    height: 10vh;
    background: linear-gradient(to bottom, #8ad7c1, #F8F8F8);
    position: relative;
    gap: 50px;
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
    background: #e5e5e5;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.select-color {
	background: #5ac725;
}
.default-color {
	background: #e5e5e5;
}
.content-wh{
    display: grid;
    gap: 20px;
	padding: 20px;
    max-height: 78vh;  /* 最大高度限制 */
    height: auto;
	width: 90vw;
	overflow-y: auto; 
}
.item-list{
	display: grid;
	gap: 0px;
	grid-template-columns: 10% 14% 58% 9% 9%; 
	border-bottom: solid 1px rgba(53, 53, 53, .6); 
	align-items: center;
}
</style>
