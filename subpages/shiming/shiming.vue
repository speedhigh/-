<template>
	<view class="text-gray-800">
		<u-loading-page :loading="showLoading" loadingText="正在加载..." />
		<view v-show="!showLoading" class="p-4">
			<u--form :model="form" :rules="rules" ref="formRef">
				<u-form-item label="真实姓名" prop="srealname" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.srealname" border="none" clearable placeholder="请填写真实姓名" />
				</u-form-item>
				<u-form-item label="身份证号" prop="scardno" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.scardno" maxlength="18" border="none" clearable placeholder="请填写身份证号" />
				</u-form-item>
				<u-form-item label="手机号" prop="stelephone" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.stelephone" maxlength="11" type="number" border="none" clearable placeholder="请填写手机号" />
				</u-form-item>
			</u--form>
			<button 
				type="default" 
				class="btn-confirm rounded-full text-md mx-auto"
				:disabled="btnDisabled"
				@click="confirm"
			>
				确认修改
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				btnDisabled: false,
				form: {
					itargetid: null,
					srealname: '',
					scardno: '',
					stelephone: ''
				},
				rules: {
					srealname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
					scardno: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' },
						{ pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号', trigger: 'blur' }
					],
					stelephone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ pattern: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/, message: '请输入正确的手机号', trigger: 'blur' }
					]
				},
			}
		},
		onLoad() {
			this.getForm()
		},
		onReady() {
			this.$refs.formRef.setRules(this.rules)
		},
		methods: {
			async getForm() {
				const res = await this.$api({url: '/myidcard/get', data: {userid: uni.getStorageSync('user').id}})
				if(res.data.code === 20000) Object.assign(this.form, res.data.data)
				this.showLoading = false
			},
			confirm() {
				this.$refs.formRef.validate().then(res => {
					this.submitDisabled = true
					uni.showModal({
						content: '确认要修改实名信息吗？',
						confirmColor: '#F03E38',
						cancelColor: '#999999',
						success: (e) => {
							if(e.confirm) {
								this.$api({
									method: 'POST',
									url: '/myidcard/post',
									data: this.form
								}).then((res) => {
									if(res.data.code === 20000) uni.showModal({ showCancel:false, content: '修改成功！', confirmColor: '#F03E38', success: () => {uni.navigateBack()} })
									this.submitDisabled = false
								})
							}
							if(e.cancel) this.submitDisabled = false
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style scoped>
	.btn-confirm {
		margin-top: 48rpx;
		color: #FFFFFF;
		width: 400rpx;
		background: linear-gradient(to right, #ff5d32, #f00f23)
	}
</style>
