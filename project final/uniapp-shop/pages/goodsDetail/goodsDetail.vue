<template>
	<view class="goodsDetail">
		<Swiper :swipers="swiperList" styleHeight="650rpx"></Swiper>
		<view class="price">
			<text class="sell_price">￥{{goodsInfo.sell_price}}</text>
			<text class="market_price">￥{{goodsInfo.market_price}}</text>
		</view>
		<view class="title">
			{{goodsInfo.title}}
		</view>
		<view class="stock">
			<view>货号：{{goodsInfo.goods_no}}</view>
			<view>库存：{{goodsInfo.stock_quantity}}</view>
		</view>
		<view class="content">
			<view class="content_title">
				详细介绍
			</view>
			<view class="box">
				<rich-text :nodes="desc.content"></rich-text>
			</view>
		</view>
		<uni-goods-nav :fill="true"  :options="options" :button-group="buttonGroup"  @click="onClick" @buttonClick="buttonClick" ></uni-goods-nav>
	</view>
</template>

<script>
	import Swiper from '../../components/Swiper.vue'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				id: null,
				swiperList: [],
				goodsInfo: [],
				desc:[],
				options: [{
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
				          text: '客服'
				        }, {
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
				          text: '店铺'
				        }, {
				          icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
				          text: '购物车',
				          info: 2
				        }],
				        buttonGroup: [{
				          text: '加入购物车',
				          backgroundColor: '#ff0000',
				          color: '#fff'
				        },
				        {
				          text: '立即购买',
				          backgroundColor: '#ffa200',
				          color: '#fff'
				        }
				        ]
			};
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			this.getSwiperList()
			this.getGoodsInfo()
			this.getDesc()
		},
		components: {
			Swiper,
			uniGoodsNav
		},
		methods: {
			async getSwiperList() {
				const res = await this.$myRequest({
					url: "/api/getthumimages/" + this.id
				})
				res.forEach(item => {
					item.img = item.src
				})
				this.swiperList = res
			},
			async getGoodsInfo() {
				const res = await this.$myRequest({
					url: "/api/goods/getinfo/" + this.id
				})
				this.goodsInfo = res[0]
			},
			async getDesc() {
				const res = await this.$myRequest({
					url: "/api/goods/getdesc/" + this.id
				})
				
				this.desc = res[0]
			},
			onClick (e) {
			        uni.showToast({
			          title: `点击${e.content.text}`,
			          icon: 'none'
			        })
			      },
			      buttonClick (e) {
			        console.log(e)
			        this.options[2].info++
			      }
			
		}

	}
</script>

<style lang="scss">
	
	.goodsDetail {
		padding-bottom: 110rpx;
		.uni-goods-nav{
			width: 100%;
			position: fixed;
			bottom: -6rpx;
			left:0;
		}
		swiper{
			height: auto;
		}
		.price {
			margin-top: 30rpx;
			padding: 0rpx 20rpx;
			.sell_price {
				color: $themeColor;
				font-size: 36rpx;
				margin-right: 20rpx;
			}
			.market_price {
				color: #ccc;
				text-decoration: line-through;
				font-size: 28rpx;
			}
		}
		.title{
			padding: 10rpx 20rpx;
			line-height: 50rpx;
		}
		.stock{
			font-size: 28rpx;
			padding: 10rpx 20rpx;
			line-height: 40rpx;
			border-top: 4rpx solid #eee;
			border-bottom: 4rpx solid #eee;
		}
		.content{
			.content_title{
				padding: 20rpx 20rpx;
				font-size: 30rpx;
				border-bottom: 1px solid #ccc;
				margin-bottom: 10rpx;
			}
			.box{
				padding: 0 20rpx;
				line-height: 50rpx;
				
			}
		}
			
	}
	
</style>
