<template>
	<view class="news">
		<navigator :url="'/pages/newsDetail/newsDetail?id='+item.id" class="news_item" v-for="item in newNews" :key="item.id">
			<image :src="item.img_url" mode="widthFix"></image>
			<view class="news_info">
				<view class="title">{{item.title}}</view>
				<view class="time">
					<text>发表时间: {{item.add_time|timeFormat}}</text>
					<text>浏览: {{item.click}}次</text>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newNews:[]
			};
		},
		props: ['news'],
		created() {
		},
		watch:{
			news(newVal){
				this.newNews = newVal
			}
		}
		
	}
</script>

<style lang="scss">
	.news {
		.news_item {
			padding: 10rpx 20rpx;
			display: flex;
			border-bottom: 1rpx solid $themeColor;

			image {
				flex: 3;
			}

			.news_info {
				padding: 0 20rpx;
				flex: 6;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				.title{
					font-size: 30rpx;
				}
				.time {
					display: flex;
					justify-content: space-between;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
