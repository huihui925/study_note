<template>
	<view class="home_container">
		<!-- 轮播区域 -->
		<Swiper :swipers="swipers" styleHeight="340rpx"></Swiper>
		<!-- 导航区域 -->
		<view class="nav_container">
			<navigator class="nav_item" url="/pages/goods/goods">
				<view class="iconfont icon-ziyuan"></view>
				<text class="name">超市</text>
			</navigator>
			<navigator class="nav_item" url="/pages/contact/contact">
				<view class="iconfont icon-guanyuwomen"></view>
				<text class="name">联系我们</text>
			</navigator>
			<navigator class="nav_item" url="/pages/pics/pics">
				<view class="iconfont icon-tupian"></view>
				<text class="name">社区图片</text>
			</navigator>
			<navigator class="nav_item" url="/pages/videos/videos">
				<view class="iconfont icon-shipin"></view>
				<text class="name">学习视频</text>
			</navigator>
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods_container">
			<view class="goods_title">
				推荐商品
			</view>
				<GoodsList :goods="goods"></GoodsList>
		</view>
	</view>
</template>

<script>
	import Swiper from '../../components/Swiper.vue'
	import GoodsList from '../../components/GoodsList.vue'
	export default {
		data() {
			return {
				swipers: [{
						"img": "https://api-hmugo-web.itheima.net/pyg/banner1.png",
						"id": 1,
					}, {
						"img": "https://api-hmugo-web.itheima.net/pyg/banner2.png",
						"id": 2,
					}, {
						"img": "https://api-hmugo-web.itheima.net/pyg/banner3.png",
						"id": 3,
					}],
				goods:[]
			}
		},
		onLoad() {
			this.getGoods()
		},
		methods: {
			//获取轮播图数据,接口失效所以写死数据
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/api/getlunbo'
				})
				this.swipers = res
			},
			//获取推荐商品的数据
			async getGoods(){
				const res = await this.$myRequest({
					url: '/api/getgoods?pageindex=1'
				})
				this.goods = res
			}
		},
		components:{
			Swiper,
			GoodsList
		}
	}
</script>

<style lang="scss">
	page{
		font-size: 30rpx;
	}
.home_container{
	Swiper{
		height: auto;
	}
	.nav_container{
		display: flex;
		justify-content: space-around;
		padding: 10rpx 0;
		navigator{
			display: flex;
			flex-direction:column;
			align-items:center;
			view{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				background-color: $themeColor;
				font-size: 50rpx;
				margin-bottom: 20rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				&.icon-tupian{
					font-size: 40rpx;
				}
			}
			text{}
		}
	}
	.hot_goods_container{
		background-color: #eee;
		margin-top: 10rpx;
		padding-top: 5rpx;
		.goods_title{
			padding:20rpx 0;
			text-align: center;
			color: $themeColor;
			background-color: #fff;
			font-size: 36rpx;
			letter-spacing: 1em;
		}
		
	}


}
</style>
