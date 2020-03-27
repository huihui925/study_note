<template>
	<view class="goods_content">
		<navigator :url="'/pages/goodsDetail/goodsDetail?id='+item.id" class="goods_item" v-for="item in goods" :key="item.id">
			<view class="imgwarp">
				<image :src="item.img_url"></image>
			</view>
			<view class="goods_price">
				<text class="current_price">￥{{item.sell_price}}</text>
				<text class="del_price">￥{{item.market_price}}</text>
			</view>
			<view class="goodes_name">{{item.title}}</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: ['goods']
	}
</script>

<style lang="scss">
		.goods_content{
			display: flex;
			flex-wrap: wrap;
			padding:15rpx;
			justify-content: space-between;
		.goods_item {
			padding: 10rpx;
			width: 49%;
			background-color: #fff;
			padding-bottom: 30rpx;
			margin-bottom: 10rpx;
			.imgwarp {
				image {
					width: 100%;
					height: 330rpx;
				}
			}
		
			.goods_price {
				.current_price {
					color: $themeColor;
					font-size: 36rpx;
					margin-right: 17rpx;
				}
		
				.del_price {
					font-size: 28rpx;
					color: #ccc;
					text-decoration: line-through;
				}
			}
		
			.goodes_name {
				display: -webkit-box;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-size: 28rpx;
				line-height: 40rpx;
				padding-top: 5rpx;
			}
		}
	}
</style>
