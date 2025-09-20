<template>
  <u-popup :show="keyShow" safeAreaInsetBottom :overlay="false" 
	mode="bottom" 
	@open="open"
	>
	<view class="keyboard-wrapper">
		<view class="input-all">
			<view class="fold-up" @click="closed">
				▼
			</view>
			<view class="input-number">
				{{billForm.amount}}
			</view>
			<u-input placeholder="点击填写备注" class="input-text">
				<u-text
					text="备注: "
					slot="prefix"
					margin="0 3px 0 0"
					type="tips"
					v-model="billForm.notes"
				></u-text>
			</u-input>		
		</view>
		<view class="row" v-for="(row, rowIndex) in keys" :key="rowIndex">
		  <view
			v-for="key in row"
			:key="key.value"
			:class="['key',key.value=='calendar' ? 'iconfont icon-rili' : '']"
			:style="key.value=='done'? color :''"
			@click="onKeyPress(key.value)"
		  >
			{{ key.label }}
		  </view>
		</view>
	</view>
	<u-datetime-picker
			:show="datetimeShow"
			v-model="billForm.createdAt"
			mode="datetime"
			@confirm="datetimeShow = false"
			@cancel="datetimeShow = false"
			@close ="datetimeShow = false"
			item-height=80
			:visible-item-count="3"
			:closeOnClickOverlay="true"	
	></u-datetime-picker>
  </u-popup>
</template>

<script>
export default {
  props: {
    keyShow: Boolean,
	existForm:Object
  },
  data() {
    return {
      // 4行4列自定义键值和显示文本
      keys: [
        [ { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: 'back', label: '⌫' } ],
        [ { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: 'calendar', label: '今天' } ],
        [ { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '.', label: '.' } ],
        [ { value: '000', label: '000' }, { value: '0', label: '0' }, { value: '00', label: '00' }, { value: 'done', label: '完成' } ],
      ],
	  color:'background:#5ac725;',
	  datetimeShow:false,
	  billForm:{}
    };
  },
  methods: {
    onKeyPress(val) {
	    console.log('val',val)
	  // 限制总长度
	  const maxLen = 10;

	  // 限制小数点后位数
	  const decimalLimitReached = () => {
		if (this.billForm.amount.includes('.')) {
		  const [intPart, decPart] = this.billForm.amount.split('.');
		  return decPart.length >= 2; // 小数部分已到2位
		}
		return false;
	  };

	  // 1. 完成
	  if (val === 'done') {
		if (parseFloat(this.billForm.amount) > 0) {
		  this.$emit('close',{billForm:this.billForm});
		}
		return;
	  }

	  // 2. 退格
	  if (val === 'back') {
		if (this.billForm.amount.length === 1) {
		  this.billForm.amount = '0';
		} else {
		  this.billForm.amount = this.billForm.amount.slice(0, -1);
		}
		return;
	  }

	  // 3. 日历
	  if (val === 'calendar') {
		this.datetimeShow = true;
		return;
	  }

	  // 4. 小数点
	  if (val === '.') {
		if (!this.billForm.amount.includes('.') && this.billForm.amount.length < maxLen) {
		  this.billForm.amount += '.';
		}
		return;
	  }

	  // 5. 数字输入（限制长度和小数位数）
	  if (!isNaN(val)) {
		if (this.billForm.amount == 0) {
		  this.billForm.amount = Number(val) +''; // 替换默认值
		} else {
		  if ((this.billForm.amount.length + val.length)  >= maxLen) return;
		  if (decimalLimitReached()) return;
		  this.billForm.amount += val; // 追加
		}
	  }
    },
	open() {
		this.billForm = this.existForm
			console.log('打开')
	},
	closed() {
			console.log('关闭')
			this.$emit('close')
	},
  },
};
</script>

<style >	
<style>
.keyboard-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0px 0 10px 0px rgba(0, 0, 0, .3);
  padding-bottom: 10px;
  background: #f8f8f8;
}
.row {
  display: flex;
  justify-content: space-between;
}
.key {
  flex: 1;
  margin: 2px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: white;
  border-radius: 6px;
  font-size: 22px;
  color: #333;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  user-select: none;
}
.key:active {
  background: #d3d3d3;
}
.input-text{
  width: 92%;   
  background: #e5e5e5;
  margin: 0 0 10px 0;
}
.input-number{
  width: 92%;       /* 宽度撑满 */
  text-align: right; /* 文字右对齐 */
  font-size: 32px;
  margin: 5px 0 5px 0;
  display: block;
}
.fold-up{
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 30px;
    color: rgba(53, 53, 53, .6);
	
}
.input-all{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}
</style>
