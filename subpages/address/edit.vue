<template>
	<view class="bg-gray-200 min-h-screen text-gray-800" style="padding: 24rpx">
		<view class="bg-white rounded-md" style="padding: 0 24rpx">
			<u--form :model="form" :rules="rules" ref="formRef">
				<u-form-item label="姓名" prop="name" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.name" border="none" clearable placeholder="请填写真实姓名" />
				</u-form-item>
				<u-form-item label="手机号" prop="mobile" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.mobile" maxlength="11" type="number" border="none" clearable placeholder="请填写手机号" />
				</u-form-item>
				<u-form-item label="身份证号" prop="cardno" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.cardno" maxlength="18" border="none" clearable placeholder="请填写身份证号" />
				</u-form-item>
				<u-form-item label="所在地区" prop="addressArea" labelWidth="170rpx" borderBottom @click="areaShow">
					<u--input v-model="form.addressArea" disabled disabledColor="#ffffff" placeholder="请选择所在地区" border="none" />
					<u-icon slot="right" name="arrow-right" />
				</u-form-item>
				<u-form-item label="详细地址" prop="addressDetail" labelWidth="170rpx">
					<u--input v-model="form.addressDetail" border="none" clearable placeholder="请填写收货人详细地址" />
				</u-form-item>
			</u--form>
			<u-picker
				:show="area.show" 
				ref="pickerRef" 
				:columns="area.province" 
				keyName="label" 
				@change="changeHandler"
				@confirm="confirm"
				@cancel="area.show = false"
			/>
		</view>
		<!-- 是否设为默认地址 -->
		<view class="bg-white rounded-md flex items-center text-md" style="padding: 24rpx; margin-top: 24rpx">
			<view>设为默认收货地址</view>
			<view class="ml-auto">
				<u-switch v-model="switchValue" activeColor="#F03E38" @change="changeDtlStatus" />
			</view>
		</view>
		<view style="margin-top: 80rpx">
			<u-button
				shape="circle" 
				text="保存" 
				:disabled="submitDisabled"
				color="linear-gradient(45deg, #BA4446 0%, #A42D35 0%, #A73434 0%, #C0272E 0%, #C72D2B 0%, #D6242D 0%, #E5222C 0%, #E11629 0%, #E5222C 0%, #E61A16 0%, #F0300C 100%)"
				@click="submit"
			/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				pageFrom: '',
				operation: '',
				form: {
					name: '',
					mobile: '',
					cardno: '',
					addressArea: '',
					addressDetail: ''
				},
				rules: {
					name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
					mobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ pattern: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/, message: '请输入正确的手机号', trigger: 'blur' }
					],
					cardno: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' },
						{ pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号', trigger: 'blur' }
					],
					addressArea: [
						{ required: true, message: '请选择所在地区', trigger: ['blur', 'change'] }
					],
					addressDetail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
				},
				area: {
					show: false,
					loading: false,
					province: [[], []],
					city: [],
					addresscode: ''
				},
				submitDisabled: false,
				switchValue: false
			}
		},
		onLoad(option) {
			this.pageFrom = option.from
			this.operation = option.operation
			if(option.operation === 'creat') uni.setNavigationBarTitle({ title: '新增地址'})
			if(option.operation === 'edit') uni.setNavigationBarTitle({ title: '编辑地址'})
			this.getArea()
		},
		methods: {
			async getArea() {
				const res = await this.$api({ url: '/open/common/get_address_select' })
				res.data.data.forEach((item, index) => {
					this.area.province[0].push({ label: item.label, value: item.value, children: item.children })
					this.area.city.push([])
					item.children.forEach((city, idx) => {
						this.area.city[index].push(city.label)
					})
				})
				res.data.data[0].children.forEach((item, index) => {
					this.area.province[1].push({ label: item.label, value: item.value })
				})
				this.showLoading = false
			},
			areaShow() {
				this.area.show = true
			},
			changeHandler(e) {
				console.log(e)
				const { columnIndex, value, values, index, picker = this.$refs.pickerRef } = e
				if (columnIndex === 0) {
					picker.setColumnValues(1, this.area.city[index])
				}
			},
			confirm(e) {
				let p = this.area.province[0]
				let c = this.area.province[0][e.indexs[0]].children
				this.area.addresscode = c[e.indexs[1]].value
				this.form.addressArea = '中国 ' + p[e.indexs[0]].label + ' ' + c[e.indexs[1]].label
				this.$refs.formRef.validateField('addressArea')
				this.area.show = false
			},
			changeDtlStatus(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
</style>
