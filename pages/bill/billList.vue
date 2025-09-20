<template>
	<u-popup :show="true" safeAreaInsetTop mode="right">
		<u-datetime-picker :show="show" v-model="yearMonth" mode="year-month" @cancel="show=false" @confirm="onConfirm"
			@close="show=false" item-height=80 :visible-item-count="3" :closeOnClickOverlay="true"></u-datetime-picker>
		<view class="content">
			<h3 class="title">肄宁记账</h3>
			<view class="header-container">
				<view class="date-container" @click="show = true">
					<view class="date-year">
						{{formatDateYear(yearMonth)}}
					</view>
					<view class="date-month">
						{{formatDateMonth(yearMonth)}}
					</view>
				</view>
				<view class="count-container">
					<view class="out">
						<view style="color: rgba(53, 53, 53, .6);">支出</view>
						<view class="value">{{bill.totalExpense}}</view>
					</view>
					<view class="in">
						<view style="color: rgba(53, 53, 53, .6);">收入</view>
						<view style="font-size: 18px; color: black;">{{bill.totalIncome}}</view>
					</view>
				</view>
			</view>
			<view class="quick">
				<view class="quick-bill">
					<view class="quick-content" v-for="item of quickBill">
						<view :class="['iconfont','icon-back',item.icon,]"></view>
						<view style="font-size: 12px; width: 50px;text-align: center;"> {{item.amount}} </view>
						<view style="font-size: 12px; width: 50px;text-align: center;"> {{item.billTag}} </view>
					</view>
				</view>
			</view>

			<view class="content-wh">
				<view v-for="(key,index) in Object.keys(bill.days)" :key="key" class="item-list">

					<!-- 第一行：日期、星期、收入、支出 -->
					<view class="item-list-row1">
						<view>{{ formatDateMonth(yearMonth) }}月{{ key }}日</view>
						<view>星期六</view>
						<view style="display: flex;gap: 10px;">
							<view v-if="bill.days[key]['收入']" class="flex-text" 
							:style="bill.days[key]['支出'] ? 'width:50%;' : 'width:100%'">收：{{ bill.days[key]['收入']}}</view>
							<view v-if="bill.days[key]['支出']" class="flex-text" 
							:style="bill.days[key]['收入'] ? 'width:50%;' : 'width:100%;'">支：{{ bill.days[key]['支出']}}</view>
						</view>
					</view>

					<!-- 第二行：每日明细 -->
					  <view class="item-list-row2">
					    <u-swipe-action>
					      <u-swipe-action-item
					        v-for="(item, i) in bill.days[key].bils"
					        :key="item.id"
					        class="item-content"
					        :options="options2"
					        @click="onOptionClick(item, $event)"
					      >
					        <!-- 左边图标 -->
					        <view :class="['item', 'iconfont', 'item-icons', item.icon]"></view>
					
					        <!-- 中间内容 -->
					        <view>
					          {{ item.billTag }}
					          <view class="time-lable">{{ item.createdAt.substring(11) }}</view>
					        </view>
					
					        <!-- 右边金额 -->
					        <view class="flex-text" @click.stop="onSet(item)">
					          {{ item.type == '支出' ? '-' + item.amount : '+' + item.amount }}
					        </view>
					
					        <!-- 分割线 -->
					        <u-line
					          v-if="i < bill.days[key].bils.length - 1"
					          style="position: absolute; right: 14px; bottom: 0; margin: 0; width: 82%;"
					        ></u-line>
					      </u-swipe-action-item>
					    </u-swipe-action>
					  </view>

				</view>
			</view>

		</view>
		</view>
		</view>
		</view>
		<custom-tabbar :billForm="billForm"></custom-tabbar>
	</u-popup>
</template>

<script>
	import moment from 'moment'
	import util from '@/static/js/utils.js'
	import {
		findByMonth
	} from '@/api/bill.js'
	export default {
		data() {
			return {
				options2: [{
					text: '收藏',
					style: {
						backgroundColor: '#3c9cff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
				bill: {
					totalIncome: '0.00',
					totalExpense: '0.00',
					days: {}
				},
				billForm: {
					amount: '0.00',
					notes: '',
					createdAt: Number(new Date()),
				},
				show: false,
				yearMonth: Number(new Date()),
				quickBill: [{
						icon: 'icon-maozi',
						type: '1',
						amount: '8.2',
						billTag: '凉皮'
					},
					{
						icon: 'icon-maozi',
						type: '1',
						amount: '8.2',
						billTag: '凉皮'
					},
					{
						icon: 'icon-maozi',
						type: '1',
						amount: '8.2',
						billTag: '凉皮'
					},
					{
						icon: 'icon-maozi',
						type: '1',
						amount: '8.2',
						billTag: '凉皮凉皮'
					},
					{
						icon: 'icon-maozi',
						type: '1',
						amount: '8.2',
						billTag: '凉皮凉皮'
					}
				],
				username: ''
			};
		},
		onShow() {
			this.user = util.getItem("user")
			console.log(this.user.username, "用户名111")
			if (!this.user) {
				uni.redirectTo({
					url: '/pages/system/longin',
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
			this.getBills()
		},
		methods: {
			onConfirm() {
				console.log('yearMonth', this.yearMonth)
				this.show = false
			},
			toBillDetail(index, i) {},
			getBills() {
				findByMonth({
					date: util.formatDate(this.yearMonth, 'YYYY-MM'),
					userId: util.getItem('user').id
				}).then(res => {
					if (res.code == 200) {
						this.bill = res.data
					}
				})
			},
			/**
			 * 判断是否是当前日最后一条记账记录
			 * @param {Object} bills
			 * @param {Object} index
			 */
			isLastItem(bills, index) {
				if (index == bills.length - 1)
					return true
				return false
			},

			/**
			 * 格式化显示年月日
			 * @param {Object} date
			 */
			formatDate(date) {
				return util.formatDate(date, 'MM月DD日')
			},
			/**格式化显示年月
			 * @param {Object} date
			 */
			formatDateYear(date) {
				return util.formatDate(date, 'YYYY年')
			},
			formatDateMonth(date) {
				return util.formatDate(date, 'MM')
			}
		}
	};
</script>

<style>
.content {
	width: 100vw;
	min-height: 94vh;
	display: flex;
	flex-direction: column;
	background-color: #F8F8F8;
	align-items: center;
	position: relative;
}

.header-container {
	display: grid;
	grid-template-columns: 30% 70%;
	width: 100%;
	height: 100px;
	background: linear-gradient(to bottom, #8ad7c1, #F8F8F8);
	color: #FFFFFF;
	padding: 10px 0px 50px 0;
	align-items: end;
	gap: 10px;
	position: relative;
}

.date-container {
	width: 100%;
	text-align: start;
	display: flex;
	flex-direction: column;
	align-items: start;
	-webkit-padding-start: 10px;
	padding-inline-start: 15px;
}

.date-month {
	height: 30px;
	width: 114px;
	font-size: 30px;
	color: black;
	margin: -11px 0 8px 0px;
}

.date-month::after {
	content: "月 ▼";
	font-size: 16px;
}

.date-year {
	color: rgba(53, 53, 53, .6);
	padding-bottom: 10px;
}

.count-container {
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
}

.header-container .out,
.header-container .in {
	display: flex;
	flex-direction: column;
	align-items: start;
	width: 50%;
	gap: 10px;
	;
}

.value {
	font-size: 18px;
	color: black;
	position: relative;
}

.value::before {
	content: "|";
	position: absolute;
	left: -23px;
	top: -17px;
	font-size: 32px;
	font-weight: 100;
	color: rgba(53, 53, 53, .6);
}


.title {
	position: absolute;
	margin-top: 10px;
	font-size: 24px;
	font-family: sans-serif;
	font-weight: 300;
	letter-spacing: 4px;
	z-index: 1;
}

.quick {
	display: grid;
	width: 92vw;
	height: 90px;
	background-color: #f8f8f8;
	color: rgba(53, 53, 53, .6);
	align-items: center;
	position: absolute;
	top: 122px;
	z-index: 1;
	border-radius: 10px;
	box-shadow: 0px 3px 5px #d5d5d6;
}

.quick-bill {
	display: flex;
	overflow: scroll;
	gap: 10px;
	justify-content: space-evenly;
	position: relative;
}

.quick-content {
	font-size: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3px;
}

.icon-back {
	display: table;
	background: #e5e5e5;
	font-size: 40px;
	border-radius: 50%;
	color: #6dae6d;
}

.content-wh {
	margin-top: 60px;
	display: grid;
	gap: 20px;
	width: 94vw;
	padding: 20px;
	max-height: 60vh;
	overflow-y: auto;
}

.item-list {
	display: grid;
	gap: 10px;
	border-bottom: solid 1px #d5d5d6;
}

.item-list-row1 {
	display: grid;
	grid-template-columns: 15% 38% 45%;
	align-items: center;
	color: #909399;
	font-size: 11px;
}

/* 第二行：一列，占满整行 */
.item-list-row2 {
	display: grid;
	grid-template-columns: 1fr;
	gap: 10px;
	/* 每条明细间距 */
}

.item-content {
	display: grid;
	grid-template-columns: 15% 56% 25%;
	align-items: center;
	font-size: 16px;
	height: 50px;
	color: black;
	position: relative;
}
.flex-text{
	display: flex; 
	justify-content: end;
	white-space: nowrap;       /* 不换行 */
	max-width: 100%;  
}
.item-icons{
	display: flex;
	width: 35px;
	justify-content: center;
	align-items: center;
	justify-self: center;
	height: 35px;
	background: #e5e5e5;
	border-radius: 50%;
	color: #6dae6d;
}
.time-lable{
	color: #909399;
	font-size: 10px;
}
	
.u-page {
	padding: 0;
}

.u-demo-block__title {
	padding: 10px 0 2px 15px;
}

.swipe-action {
	&__content {
		 padding: 25rpx 0;

		&__text {
			 font-size: 15px;
			 color: $u-main-color;
			 padding-left: 30rpx;
		 }
	}
}
</style>