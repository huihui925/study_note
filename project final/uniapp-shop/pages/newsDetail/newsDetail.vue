<template>
	<view class="newsDetail">
		<view class="title">{{newsDetail.title}}</view>
		<view class="info">
			<text>发表时间:{{newsDetail.add_time|timeFormat}} </text>
			<text>浏览: {{newsDetail.click}}</text>
		</view>
		<rich-text class="content" :nodes="newsDetail.content">
			
		</rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsDetail:[]
			};
		},
		onLoad(options){
			const {id} = options
			this.getNewsDetail(id)
		},
		methods:{
			async getNewsDetail(id){
				const res = await this.$myRequest({
					url:"/api/getnew/"+id
				})
				this.newsDetail=res[0]
			}
		}
	}
</script>

<style lang="scss">
page{
	font-size: 28rpx;
	.newsDetail{
		padding: 20rpx;
		.title{
			text-align: center;
			line-height: 70rpx;
			font-size: 32rpx;
		}
		.info{
			display: flex;
			justify-content: space-between;
			line-height: 80rpx;
		}
	}
	
}
</style>
