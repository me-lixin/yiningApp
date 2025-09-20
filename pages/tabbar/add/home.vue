<template>
	<view class="content">
		<view class="category" v-for="(key,index) in Object.keys(categories)" @click="onCategoryChange(index)">
			<view style="margin:20px 0 10px 0;font-size: 20px;">{{key}}</view>
			<view style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px;">
				<view class="item" v-for="(item,index) in categories[key]" @click="onCategoryChange(index)">
					<view :class="['iconfont', item.icon]" style="font-size: 38px;"></view>
				</view>
			</view>
		</view>

<!-- 
		<view class="note">
			<view class="input-container">
				<view class="label">备注</view>
				<input class="input" type="text" v-model="note"/>
			</view>
			<view class="prompt">
				<view class="item" v-for="(item,index) in notes" @click="getNote(item,index)" :class="getActiveStatus(item,index)">{{item}}</view>
			</view>
		</view> -->

		<view class="keybord">
<!-- 			<view class="keybord-top">
				<view class="left">
					<image class="icon" src="@/static/img/add/amount.png" mode=""></image>
					<text class="text">金额：</text>
				</view>
				<view class="amount">
					{{amount}}
				</view>
			</view> -->
<!-- 			<view class="keybord-content">
				<view class="row">
					<view class="item number" data-num="7" @click="getValue($event)">7</view>
					<view class="item number" data-num="8" @click="getValue($event)">8</view>
					<view class="item number" data-num="9" @click="getValue($event)">9</view>
					<view class="item number" @click="backspace()">
						<image src="@/static/img/add/backspace.png" class="icon"></image>
					</view>
				</view>

				<view class="row">
					<view class="item number" data-num="4" @click="getValue($event)">4</view>
					<view class="item number" data-num="5" @click="getValue($event)">5</view>
					<view class="item number" data-num="6" @click="getValue($event)">6</view>
					<view class="item number" data-num="+" @click="getValue($event)">+</view>
				</view>

				<view class="row">
					<view class="item number" data-num="1" @click="getValue($event)">1</view>
					<view class="item number" data-num="2" @click="getValue($event)">2</view>
					<view class="item number" data-num="3" @click="getValue($event)">3</view>
					<view class="item number" data-num="-" @click="getValue($event)">-</view>
				</view>

				<view class="row">
					<view class="item number" data-num="." @click="getValue($event)">.</view>
					<view class="item number" data-num="0" @click="getValue($event)">0</view>
					<view class="item number" data-num="=" @click="getEquals()">=</view>
					<view class="item complete" @click="submit()">完成</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import moment from "moment"
import util from '@/static/js/utils.js'
import { getIconAll } from '@/api/icon.js';
	export default {
		data() {
			return {
				username: '',
				note: '', //输入的备注信息
				amount: '0.00', //记账金额
				accounts: [], //账户类型，需要根据用户名查询
				accountIndex: 0, //账户类型数组下标
				categoryCursor: 0, //分类当前选中的下标
				categories: [], //记账分类列表
				notes: ['早餐', '晚餐', '化妆品'] //备注可选列表，需要发送交易到后台查询
			};
		},

		mounted() {
			this.user = util.getItem("user")
			getIconAll().then(res => {
			    if (res.code == 200) {
					this.categories = res.data
			    }else{
					uni.showToast({title:res.message, icon: 'error'})
				}
			  });
			// this.categories = [{
			// 		name: '购物',
			// 		iconSrc: require('@/static/img/label/normal/icon_clothes.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_clothes.png'),
			// 	},
			// 	{
			// 		name: '吃喝',
			// 		iconSrc: require('@/static/img/label/normal/icon_food.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_food.png')
			// 	}, {
			// 		name: '旅行',
			// 		iconSrc: require('@/static/img/label/normal/icon_tour.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_tour.png')
			// 	}, {
			// 		name: '日常',
			// 		iconSrc: require('@/static/img/label/normal/icon_daily.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_daily.png')
			// 	}, {
			// 		name: '交通',
			// 		iconSrc: require('@/static/img/label/normal/icon_traffic.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_traffic.png')
			// 	}, {
			// 		name: '医疗',
			// 		iconSrc: require('@/static/img/label/normal/icon_medicine.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_medicine.png')
			// 	}, {
			// 		name: '加油',
			// 		iconSrc: require('@/static/img/label/normal/icon_fuel.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_fuel.png')
			// 	}, {
			// 		name: '充值',
			// 		iconSrc: require('@/static/img/label/normal/icon_phone.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_phone.png')
			// 	}, {
			// 		name: '学习',
			// 		iconSrc: require('@/static/img/label/normal/icon_study.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_study.png')
			// 	}, {
			// 		name: '工资',
			// 		iconSrc: require('@/static/img/label/normal/icon_salary.png'),
			// 		selectedIconSrc: require('@/static/img/label/selected/icon_salary.png')
			// 	},
			// ]
			// this.getUserAccountsAndAeests();
			// this.getNotesFromServer()
			
		},

		methods: {
			onCategoryChange(index) {
				this.categoryCursor = index;
				// this.getNotesFromServer()
			},

			getNotesFromServer() {
				let that = this;
				let category = that.categories[that.categoryCursor].name
				console.log(that.categories[that.categoryCursor], "调用前")
				uniCloud.callFunction({
					name: 'getNotes',
					data: {
						category: category,
					},
					success(res) {
						console.log(res.result)
						if (res.result.code === 'success') {
							that.notes = res.result.data.notes
						}
					},
					fail(res) {
						console.log('fail', res)
					}
				})
			},
			getNote(item, index) {
				//追加note到输入框
				if (this.note.indexOf(item) == -1) {
					this.note = this.note + '#' + item + ' '
				}
			},
			getActiveStatus(item, index) {
				//如果输入框含有该note，class为item
				if (this.note.indexOf(item) != -1) {
					return 'item'
				}
				//反之为class为active
				return 'active'
			},

			getImgSrc(item, index) {
				if (index == this.categoryCursor) {
					return item.selectedIconSrc
				}
				return item.iconSrc
			},

			bindAccountChange(e) {
				this.accountIndex = e.target.value
				console.log(this.accounts[this.accountIndex])
			},
			submit() {
				if (this.amount.indexOf('-') != -1 || this.amount.indexOf('+') != -1) {
					this.getEquals()
				}
				//添加到数据率
				this.addBillToServer();
				console.log(this.amount)
			},
			/**
			 * 获取键盘值
			 * @param {Object} event
			 */
			getValue(event) {
				let value = event.currentTarget.dataset.num.toString()
				if (this.amount === '0.00') {
					this.amount = value
					return
				}
				console.log(this.amount, value)
				this.amount = this.amount + value
			},
			/**
			 * backspace
			 */
			backspace() {
				//如果是0.00  不执行
				if (this.amount === '0.00') {
					return
				}
				//删除末尾字符
				this.amount = this.amount.substr(0, this.amount.length - 1)
				//如果字符为空，展示位默认的0.00
				if (this.amount === '') {
					this.amount = '0.00'
				}
			},
			getEquals() {
				let num1 = ''
				let num2 = ''
				let operator = '+'
				let isFirstOprator = true
				// debugger
				for (let char of this.amount) {
					if (char === '+' || char === '-') {
						if (isFirstOprator) {
							isFirstOprator = false
						} else {
							if (operator === '+') {
								num1 = (parseFloat(num1) + parseFloat(num2)).toString()
							} else {
								num1 = (parseFloat(num1) - parseFloat(num2)).toString()
							}
							num2 = ''
						}
						operator = char
					} else {
						if (isFirstOprator) {
							num1 = num1 + char
						} else {
							num2 = num2 + char
						}
					}

				}
				if (operator === '+') {
					this.amount = (parseFloat(num1) + parseFloat(num2)).toString()
				} else {
					this.amount = (parseFloat(num1) - parseFloat(num2)).toString()
				}
				//如果num2位0，即计算以运算符结尾，那么将amount设置为0，不然计算结果为NAN
				if (num2 === '') {
					this.amount = '0.00'
				}
			},
			addBillToServer() {
				let that = this;
				uni.request({
					url: 'http://localhost:8013/api/asset/save', // 本地接口地址，根据实际端口/路径替换
					method: 'POST', 
					data: {
						userId: that.user.id,
						amount: util.toDecimal(that.amount),
						label: that.note,
						// account: that.accounts[that.accountIndex].name+'('+that.accounts[that.accountIndex].card_number+')',
						category: that.categories[that.categoryCursor].name,
						imgSrc: that.categories[that.categoryCursor].selectedIconSrc,
						time: moment().format("YYYY-MM-DD HH:mm:ss"),
						dateMonth: moment().format("YYYY-MM"),
						date: moment().format("YYYY-MM-DD")
						// date:'2020-11-07'
					},
					success(res) {
						console.log("添加成功", res)
						//添加成功，清空当前记账数据
						// if (res.result.code === 'success') {
							that.amount = '0.00'
							that.note = ''
						// }
					},
					fail(res) {
						console.log('fail', res)
					}
				})
			}
		}
	};
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.category {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
	}

	.category .item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background: beige;
		width: 55px;
		height: 55px;
		border-radius: 50%;
	}

	.category .item .name {
		margin: 14upx 0;
		font-size: 28upx;
	}

	.category .item .icon,
	.account .value .icon {
		height: 50upx;
		width: 50upx;
	}

	.category .item .active {
		color: #03A174;
		font-weight: bold;
	}

	.account {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: 50upx 0 0 0;
		width: 88%;
	}

	.account .label,
	.note .label {
		color: #acacac;
	}

	.account .value {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.account .value .text {
		margin: 0 0 0 15upx;
	}

	.note {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 88%;
		margin: 50upx 0 0 0;
	}

	.note .input-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.note .input-container .input {
		width: 80%;
		font-size: 24upx;
		color: #03A174;
	}

	.note .prompt {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin: 10upx 0 0 0;
	}

	.note .prompt .item {
		font-size: 24upx;
		margin: 0 0 0 18upx;
		border: solid #CCCCCC 1upx;
		border-radius: 8upx;
		padding: 2upx 6upx;
		color: #CCCCCC;

	}

	.note .prompt .active {
		border: solid #03A174 1upx;
		color: #03A174;
	}

	.money {
		width: 88%;
		height: 50upx;
		text-align: end;
		margin: 50upx 0 0 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.money .input {
		padding: 0 0 0 20upx;
		width: 150upx;
		font-size: 36upx;
	}

	.keybord {
		width: 100%;
		height: 40%;
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 0upx;
	}

	.keybord-top {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}

	.keybord-top .left {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 30%;
		padding: 0 0 0 20upx;
	}

	.keybord-top .left .icon {
		height: 40upx;
		width: 40upx;
	}

	.keybord-top .left .text {
		margin: 0 0 0 16upx;
	}

	.keybord-top .amount {
		width: 70%;
		text-align: right;
		margin: 0 10upx 0 0;
	}

	.keybord-content {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex-wrap: wrap;
		width: 100%;
		height: 85%;
		margin: 15upx 0 0 0;
	}
	
	.keybord-content .row{
		display: flex;
		flex-direction: row;
		height: 25%;
		justify-content: space-around;
	}
	
	.keybord-content .row .item{
		width: 25%;
		height: 100%;
	}

	.keybord-content .icon {
		height: 50upx;
		width: 50upx;
	}

	.keybord-content .item {
		background-color: #fbfcfb;
		border: #f4f4f4 1upx solid;
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.keybord-content .complete {
		background-color: #03a174;
		color: #FFFFFF;
	}
</style>
