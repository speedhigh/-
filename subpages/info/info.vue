<template>
	<view style="padding: 32rpx">
		<u--form :model="form" :rules="rules" ref="formRef">
			<u-form-item label="真实姓名" prop="realname" labelWidth="170rpx" borderBottom>
				<u--input v-model="form.realname" border="none" clearable placeholder="请填写真实姓名" />
			</u-form-item>
			<u-form-item label="身份证号" prop="realcardno" labelWidth="170rpx" borderBottom>
				<u--input v-model="form.realcardno" maxlength="18" border="none" clearable placeholder="请填写身份证号" />
			</u-form-item>
			<u-form-item label="手机号" prop="realmobile" labelWidth="170rpx" borderBottom>
				<u--input v-model="form.realmobile" maxlength="11" type="number" border="none" clearable placeholder="请填写手机号" />
			</u-form-item>
			<!--  收货地址-->
			<view class="flex items-center" style="margin-top: 60rpx; margin-bottom: 20rpx">
				<view class="bg-red-400 rounded-full" style="width: 6rpx; height: 32rpx" />
				<view class="text-base font-bold" style="margin-left: 13rpx">收货地址</view>
			</view>
			
			<u-form-item label="收货人" prop="slinkman" labelWidth="170rpx" borderBottom>
				<u--input v-model="form.slinkman" border="none" clearable placeholder="请填写收货人姓名" />
			</u-form-item>
			<u-form-item label="手机号码" prop="addressmobile" labelWidth="170rpx" borderBottom>
				<u--input v-model="form.addressmobile" maxlength="11" type="number" border="none" clearable placeholder="请填写收货人手机号" />
			</u-form-item>
			<u-form-item label="身份证号" prop="addresscardno" labelWidth="170rpx" borderBottom>
				<u--input v-model="form.addresscardno" maxlength="18" border="none" clearable placeholder="请填写收货人身份证号" />
			</u-form-item>
			<u-form-item label="所在地区" prop="addressArea" labelWidth="170rpx" borderBottom @click="areaShow">
				<u--input v-model="form.addressArea" disabled disabledColor="#ffffff" placeholder="请选择所在地区" border="none" />
				<u-icon slot="right" name="arrow-right" />
			</u-form-item>
			<u-form-item label="详细地址" prop="addressdetail" labelWidth="170rpx" borderBottom>
				<u--input v-model="form.addressdetail" border="none" clearable placeholder="请填写收货人详细地址" />
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
		<view style="margin-top: 120rpx">
			<u-button
				shape="circle" 
				text="提交" 
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
				area: {
					show: false,
					loading: false,
					province: [[], []],
					city: [],
					addresscode: ''
				},
				aeraShow: true,
				form: {
					realname: '',
					realcardno: '',
					realmobile: '',
					slinkman: '',
					addressmobile: '',
					addresscardno: '',
					addressArea: '',
					addressdetail: ''
				},
				rules: {
					realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
					realcardno: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' },
						{ pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号', trigger: 'blur' }
					],
					realmobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ pattern: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/, message: '请输入正确的手机号', trigger: 'blur' }
					],
					slinkman: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
					addressmobile: [
						{ required: true, message: '请输入收货人手机号', trigger: 'blur' },
						{ pattern: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/, message: '请输入正确的手机号', trigger: 'blur' }
					],
					addresscardno: [
						{ required: true, message: '请输入收货人身份证号', trigger: 'blur' },
						{ pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号', trigger: 'blur' }
					],
					addressArea: [
						{ required: true, message: '请选择所在地区', trigger: ['blur', 'change'] }
					],
					addressdetail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
				},
				submitDisabled: false
			}
		},
		onLoad() {
			this.getArea()
		},
		onReady() {
			this.$refs.formRef.setRules(this.rules)
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
				this.form.addressArea = p[e.indexs[0]].label + '/' + c[e.indexs[1]].label
				this.$refs.formRef.validateField('addressArea')
				this.area.show = false
			},
			submit() {
				this.$refs.formRef.validate().then(res => {
					console.log(res)
					this.submitDisabled = true
					this.postForm()
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
					this.submitDisabled = false
				})
			},
			async postForm() {
				const res = await this.$api({
					method: 'POST',
					url: '/myidcard/postAddressAndReal', 
					data: {
						realname: this.form.realname,                  // 名字
						realcardno: this.form.realcardno,              // 身份证号
						realmobile: this.form.realmobile,              // 手机号
						slinkman: this.form.slinkman,                  // 收货人
						addressmobile: this.form.addressmobile,        // 收货人手机号
						addresscardno: this.form.addresscardno,        // 收货人身份证号
						addresscode: this.area.addresscode,            // 所在地区
						addressdetail: this.form.addressdetail, 
					},
				})
				if(res.data.code === 20000) {
					uni.setStorageSync('shiming', 1)
					uni.showModal({ title: '实名认证成功！', icon: 'success', showCancel: false, success: () => {
						uni.navigateBack()
						this.submitDisabled = false
					}})
				} else {
					uni.showToast({ title: '接口请求失败!', icon: 'error' })
					this.submitDisabled = false
				}
			}
		}
	}
</script>