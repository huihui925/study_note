<template>
	<view>
		<GoodsList :goods='goods'></GoodsList>
		<view class="over" :hidden="isOver">
			-----我是有底线的-----
		</view>
	</view>
</template>

<script>
	import GoodsList from '../../components/GoodsList.vue'
	import {timeOut} from '../../utils/utils.js'
	export default {
		data() {
			return {
				goods:[],
				pageIndex:1,
				isOver:true
			}
		},
		onLoad(){
			this.getGoods()
		},
		onReachBottom(){
			if(this.goods.length < this.pageIndex*10){
				this.isOver=false
				return
			}
			this.pageIndex++
			this.getGoods()
		},
		onPullDownRefresh(){
			this.pullDown()
		},
		methods: {
			async getGoods(){
				const res = await this.$myRequest({
					url:'/api/getgoods?pageindex='+this.pageIndex
				})
				this.goods = this.goods.concat(res)
			},
			async pullDown(){
				this.goods=[]
				this.pageIndex=1
				this.isOver=true
				await timeOut()
				await this.getGoods()
				uni.stopPullDownRefresh()
				
			}
		},
		components:{
			GoodsList
		}
	}
</script>

<style>
page{
	background-color: #eee;
}
.over{
	text-align: center;
	line-height: 50rpx;
	font-size: 28rpx;
	}
</style>
