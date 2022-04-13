<template>
	<view class="relative" style="padding: 112rpx 135rpx">
		<u-loading-page :loading="showLoading" loadingText="正在加载..." />
		<view v-show="!showLoading">
			<view class="flex justify-center">
				<u--image src="/static/images/login/logo.png" width="176rpx" height="326rpx" />
			</view>
			<view style="margin-top: 228rpx">
				<u-button text="微信用户一键注册" color="#54C56F" shape="circle" size="large" open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber"/>
			</view>
			<view class="flex items-center justify-center" style="margin-top: 40rpx">
				<u-checkbox-group @change="checkChange">
					<u-checkbox
						shape="circle"
						name="同意"
						label="我已同意授权"
						labelSize="24rpx"
						iconSize="34rpx"
						activeColor="#79A7CC"
					/>
					<text class="text-xs" style="color: #79A7CC">《木子网隐私协议》</text>
				</u-checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading: true,
				checked: false,
				showDialog: false
			}
		},
		onLoad() {
			if(!uni.getStorageSync('openid')) {
				this.getCode()
			} else {
				this.showLoading = false
			}
		},
		methods: {
			async getOpenId(code) {
				const res = await this.$api({url: '/open/getOpenId', data: { js_code: code }})
				uni.setStorageSync('openid', res.data.data.openid)
				this.showLoading = false
			},
			getCode() {
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {
									this.getOpenId(res2.code)
								},
								fail: () => {
									uni.showToast({ title:"微信登录授权失败", icon:"none" })
								}
							})
						}
					}
				})
			},
			getPhoneNumber(e) {
				console.log(uni.getStorageSync('openid'))
				if (e.target.errMsg == 'getPhoneNumber:ok') {
					if(!this.checked) {
						uni.showModal({ content: '请同意授权木子网隐私协议', showCancel: false})
						return
					}
					if(uni.getStorageSync('openid')) this.login(e.detail.code, uni.getStorageSync('openid'))
				}
			},
			
			checkChange(n) {
				this.checked = (n[0] === '同意')
			},
			async login(code, openid) {
				const res = await this.$api({ method: 'POST', url: '/open/wxlogin', data: { openid: openid, code: code}})
				if(res.data.code === 20000) {
					uni.setStorage({ key: 'token', data: res.data.data.token })
					uni.setStorage({ key: 'user', data: res.data.data.user })
					this.getshiming(res.data.data.user.id)
				}
			},
			// 是否已经实名认证
			async getshiming(userid) {
				const res = await this.$api({url: '/myidcard/get', data: { userid: userid }})
				console.log(res)
				if(res.data.code === 20000) {
					uni.setStorageSync('shiming', 1)
					uni.showModal({ content: '登录成功！', showCancel: false, success:() => {
						uni.navigateBack()
					}})
				} else if(res.data.code === 20001 && res.data.msg === "没有实名") {
					uni.setStorageSync('shiming', 0)
					uni.showModal({ content: '欢迎登录，请先进行实名认证！', showCancel: false, success:() => {
						uni.navigateTo({ url: '/subpages/info/info'})
					}})
				} else {
					uni.setStorageSync('shiming', 0)
				}
			},
		}
	}
</script>
