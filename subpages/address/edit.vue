<template>
	<view class="bg-gray-200 min-h-screen text-gray-800" style="padding: 24rpx">
		<!-- 1，form 表单 -->
		<view class="bg-white rounded-md" style="padding: 0 24rpx">
			<u--form :model="form" :rules="rules" ref="formRef">
				<u-form-item label="姓名" prop="name" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.name" border="none" placeholder="请填写真实姓名" />
				</u-form-item>
				<u-form-item label="手机号" prop="mobile" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.mobile" maxlength="11" type="number" border="none" placeholder="请填写手机号" />
				</u-form-item>
				<u-form-item label="身份证号" prop="cardno" labelWidth="170rpx" borderBottom>
					<u--input v-model="form.cardno" maxlength="18" border="none" placeholder="请填写身份证号" />
				</u-form-item>
				<u-form-item label="所在地区" prop="addressArea" labelWidth="170rpx" borderBottom @click="area.show = true">
					<u--input v-model="form.addressArea" disabled disabledColor="#ffffff" placeholder="请选择所在地区" border="none" />
					<u-icon slot="right" name="arrow-right" />
				</u-form-item>
				<u-form-item label="详细地址" prop="addressDetail" labelWidth="170rpx">
					<u--input v-model="form.addressDetail" border="none" placeholder="请填写收货人详细地址" />
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
		<!-- 2，是否设为默认地址(创建地址显示、编辑地址非默认显示) -->
		<view 
			v-if="itype !== 2 || operation === 'creat'" 
			class="bg-white rounded-md flex items-center text-md" 
			style="padding: 24rpx; margin-top: 24rpx"
		>
			<view>设为默认收货地址</view>
			<view class="ml-auto">
				<u-switch v-model="switchValue" activeColor="#F03E38" />
			</view>
		</view>
		<!-- 3，button 保存 -->
		<view style="margin-top: 80rpx">
			<u-button
				shape="circle"
				text="保存" 
				:disabled="saveDisabled"
				color="linear-gradient(45deg, #BA4446 0%, #A42D35 0%, #A73434 0%, #C0272E 0%, #C72D2B 0%, #D6242D 0%, #E5222C 0%, #E11629 0%, #E5222C 0%, #E61A16 0%, #F0300C 100%)"
				@click="onSave"
			/>
		</view>
		<!-- 4，button 删除 -->
		<view v-show="itype !== 2" style="margin-top: 24rpx">
			<u-button shape="circle" text="删除" @click="remove" />
		</view>
	</view>
</template>

<script>
	import { pickBy } from 'lodash'
	export default {
		data() {
			return {
				showLoading: true,
				itype: 2,  // 如果是编辑状态 且 编辑的地址不是默认地址，显示删除按钮
				operation: '',
				addressId: '',
				// 地区相关
				area: {
					show: false,
					province: [[], []],
					city: [],
					provincescode: '',
					cityscode: '',
				},
				saveDisabled: false,	// 保存
				switchValue: false,	 	// 开关
				// 表单
				form: {
					name: '',
					mobile: '',
					cardno: '',
					addressArea: '',
					addressDetail: ''
				},
				// 表单规则
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
				}
			}
		},
		onLoad(option) {
			this.operation = option.operation
			this.addressId = option.addressId
			this.getArea()
			if(option.operation === 'creat') uni.setNavigationBarTitle({ title: '新增地址'})
			if(option.operation === 'edit') {
				uni.setNavigationBarTitle({ title: '编辑地址'})
				this.getAddressDetail(option.addressId) // 获取信息
			}
		},
		onReady() {
			this.$refs.formRef.setRules(this.rules)
		},
		methods: {
			// 编辑状态，获取信息并将地址信息传入form
			async getAddressDetail(id) {
				const res = await this.$api({url: '/wxapp/useraddress/get', data: { addressid: id }})
				this.itype = res.data.data.itype
				this.form.name = res.data.data.slinkman
				this.form.mobile = res.data.data.smobile
				this.form.cardno = res.data.data.scardno
				this.form.addressArea = res.data.data.saddressname
				this.form.addressDetail = res.data.data.sdetail
			},
			// 获取省市列表
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
			// 点击省自动切市
			changeHandler(e) {
				const { columnIndex, value, values, index, picker = this.$refs.pickerRef } = e
				if (columnIndex === 0) picker.setColumnValues(1, this.area.city[index])
			},
			// 确认省市
			confirm(e) {
				let p = this.area.province[0]
				let c = this.area.province[0][e.indexs[0]].children
				this.area.cityscode = c[e.indexs[1]].value
				this.area.provincescode = this.area.province[0][e.indexs[0]].value
				this.form.addressArea = '中国 ' + p[e.indexs[0]].label + ' ' + c[e.indexs[1]].label
				this.$refs.formRef.validateField('addressArea')
				this.area.show = false
			},
			// 删除地址
			remove() {
				uni.showModal({ content:'确定要将该地址删除吗', success: () => {
					const res = this.$api({url: '/wxapp/useraddress/delete', method: 'DELETE', contentType: 'application/x-www-form-urlencoded', data: { addressid: this.addressId }})
					if(res.data.code === 20000 && uni.getStorageSync('addressId') === this.addressId) uni.removeStorageSync('addressId')
					uni.navigateBack()
				}})
			},
			// 保存
			onSave() {
				// 校验
				this.$refs.formRef.validate().then(res => {
					let data = {
						itype: this.itype === 2 ? 2 : this.switchValue ? 2 : 1,
						iuserid: uni.getStorageSync('user').id,
						cityscode: this.area.cityscode,
						provincescode: this.area.provincescode,
						scardno: this.form.cardno,
						sdetail: this.form.addressDetail,
						slinkman: this.form.name,
						smobile: this.form.mobile,
					}
					// 创建新地址
					if(this.operation === 'creat') {
						const res = this.$api({url: '/wxapp/useraddress/post', method: 'POST', data: pickBy(data)})
						uni.showModal({ content: '新增地址成功！', showCancel: false, success:() => {
							uni.navigateBack()
						}})
					}
					// 编辑地址
					if(this.operation === 'edit') {
						data.id = this.addressId
						// const res = this.$api({url: '/useraddress/put', method: 'POST', data: pickBy(data)})
						this.$api({url: '/wxapp/useraddress/put', method: 'POST', data: pickBy(data)}).then((res) => {
							if(res.data.code === 20000) {
								uni.showModal({ content: '修改地址成功！', showCancel: false, success:() => {
									uni.navigateBack()
								}})
							}
						})
					}
				}).catch(errors => {
					console.log(errors)
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style>
</style>
