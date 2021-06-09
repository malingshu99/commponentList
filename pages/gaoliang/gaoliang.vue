<template>
	<view>
		<view class="search">
			<input type="text" placeholder="请输入搜索内容" @input="set">
		</view>
		<view class="list">
			<view v-for="(item,index) in filterList" :key="index">
				<rich-text :nodes="item"></rich-text>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				list:[
					'helang',
					'uview',
					'uniapp',
					'1846492969',
					'helang.love@qq.com',
					'公众号 web-7258'
				],
				filterList:[]
			}
		},
		mounted(){
			// #ifdef H5
			console.log("%c 河浪原创作品，QQ:1846492969",'color:#09f;font-size:32px;');
			// #endif
			
			// #ifndef H5
			console.log("河浪原创作品，QQ:1846492969");
			// #endif
			
			this.set({detail:''});	// 默认调用显示数据，你可以无视
		},
		methods: {
			// 设置
			set(e){
				let value = e.detail.value;
				if(!value){
					this.filterList = this.list;
					return;
				}
				
				let filterArr = [];
				// 过滤出符合条件的值
				this.list.forEach((item,index)=>{
					if(item.includes(value)){
						filterArr.push(this.join(item,value));
					}
				});
								
				this.filterList = filterArr;
				console.log(this.filterList)
			},
			// 拼接
			join(str,key){
				var reg = new RegExp((`(${key})`), "gm");
				var replace = '<span style="color:#FD463E;font-weight:bold;">$1</span>';
				return str.replace(reg, replace);
			}
		}
	}
</script>
 
<style lang="scss">
.search{
	padding: 20rpx;
	background-color: #fff;
	border-bottom: #09f solid 1px;
	
	&>input{
		height: 64rpx;
	}
}
.list{
	&>view{
		padding: 20rpx;
		
		&+ view{
			border-top: #e5e5e5 solid 1px;
		}
	}
}
</style>