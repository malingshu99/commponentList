<template>
	<view class="content">
		<u-button type="warning" @click="autographShow =!autographShow">签字</u-button>
		<u-button type="warning" @click="toFace">身份证识别</u-button>
		<image class="logo" :src="showImg" ></image>
		
		
		<u-modal ref="sign" :clearLoading="clearLoading" :isCancelClose="false" :async-close="asyncClose"
				:mask-close-able="true" @cancel="retDraw" @confirm="subCanvas" :show-cancel-button="true"
				confirm-color="#07C160" cancel-text="撤回" confirm-text="ok" v-model="autographShow" title="签字页"
				:title-style="{color: '#333333'}">
				<view class="slot-content" style="width: 100%;">
		
					<view class="wrapper">
						<view class="handCenter">
							<canvas style="" class="handWriting" disable-scroll="true" @touchstart="uploadScaleStart"
								@touchmove="uploadScaleMove" @touchend="uploadScaleEnd" @tap="mouseDown"
								canvas-id="handWriting">
							</canvas>
						</view>
						<!-- 	<view class="showimg">
							<image v-if="showimg" :src="showimg" mode=""></image>
							<text v-else >图片展示</text>
						</view>
						<view class="buttons">
							<button @click="retDraw" class="delBtn">重写</button>
							<button @click="subCanvas" class="subBtn">保存</button>	
						</view> -->
					</view>
		
					<view v-show="showSign" class="" style="pointer-events: none;padding-top: 28rpx;width: 100%;display: flex;justify-content: center;min-height: 396rpx;position: absolute; left: 50%; top: 50%;
		transform: translate(-50%, -50%);">
						<text class="signature">此处签字</text>
					</view>
				</view>
			</u-modal>
	</view>
</template>

<script>
	import Handwriting from '@/components/js_sdk/signature.js'
	export default {
		data() {
			return {
				title: 'Hello',
				clearLoading: false,
				asyncClose: true,
				autographShow: false,
				handwriting:'',
				showImg:''
			}
		},
		onLoad() {
			this.handwriting = new Handwriting({
				lineColor: this.lineColor,
				slideValue: this.slideValue, // 0, 25, 50, 75, 100
				canvasName: 'handWriting',
			})
		},
		methods: {
			subCanvas() {
				
				this.handwriting.saveCanvas().then(res => {
					// console.log(JSON.parse(res),"123")
					this.showImg  = res
					
				})
				this.autographShow = false
			
			
			},
			uploadScaleStart(event) {
				this.showSign = false
				this.handwriting.uploadScaleStart(event)
			},
			uploadScaleMove(event) {
				this.isSign = true
				this.handwriting.uploadScaleMove(event)
			},
			uploadScaleEnd(event) {
				this.handwriting.uploadScaleEnd(event)
			},
			retDraw() {
				this.isSign = false
				let url;
				if (this.progress_status == 7) {
					url = "authorOverIs"
				} else {
					url = "authors"
				}
				this.handwriting.retDraw()
				this.$http.post(url, {
					task_log_id: this.taskDetail.task_log[0].id,
					task_id: this.taskDetail.task_log[0].id,
					task_status: 2,
					count_stars: 1
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					setTimeout(item => {
						uni.navigateBack({
							delta: 1
						})
					}, 3000)
				})
				this.autographShow = true
			},
			toFace(){
				uni.navigateTo({
					url:'/pages/index/shenfenzheng/shenfenzheng'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
