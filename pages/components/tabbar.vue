<template>
	<view>
	<u-tabbar
	  :value="current"
	  @change="onTabChange"
	  activeColor="green"
	  :fixed="true"
	  :placeholder="true"
	  :safeAreaInsetBottom="true"
      :customStyle="{ borderTop: '0.5px solid #909399', boxShadow: '0px -1px 6px rgba(0,0,0,0.2)', zIndex: 99 }"
	>
	  <u-tabbar-item class="iconfont icon-gongzitiao" :style="current ==0 ? selected : notSelected" text="账单"></u-tabbar-item>
	  <u-tabbar-item class="iconfont icon-licai1" :style="current ==1 ? selected : notSelected" text="图表"></u-tabbar-item>
	  <u-tabbar-item class="iconfont icon-add add-class"></u-tabbar-item>
	  <u-tabbar-item class="iconfont icon-leibiefenlei" :style="current ==3 ? selected : notSelected" text="类别"></u-tabbar-item>
	  <u-tabbar-item class="iconfont icon-zhanghaozhongxinzhanghaoguanli" :style="current ==4 ? selected : notSelected" text="我的"></u-tabbar-item>
	</u-tabbar>
		<add-bill :visible="showAddBill" :billForm="billForm" @close="showAddBill = false"></add-bill>
	</view>
</template>

<script>
import addBillVue from '@/pages/bill/addBill.vue';
export default {
	components:{
		'add-bill':addBillVue,
	},
	props:{
		billForm:Object
	},
	data() {
		return {
			showAddType: false,
			showAddBill: false,
			pages: ['/pages/bill/billList', '/pages/bill/selectIcon'],
			selected: 'color: green',
			notSelected: 'color: rgb(125, 126, 128);'
			
		};
	},
	computed: {
		current() {
		  return this.$globalState.tabIndex;
		}
	},
	methods: {
		onTabChange(index) {
		  if(index == 2 ){
			  this.showAddBill = true;
			  // this.showAddType = true;
			  return;
		  }
		  this.$globalState.tabIndex = index
		  console.log(this.current)
		  uni.redirectTo({
			url: this.pages[index]
		  })
		}
	}
};
</script>

<style>
.add-class{
	align-self: center;
	border-top: solid 1px #909399;
	padding-top: 5px;
	border-radius: 9937px;
	}
</style>
