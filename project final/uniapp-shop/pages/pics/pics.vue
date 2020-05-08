<template>
	<view class="pics">
		<scroll-view class="pics_left" scroll-y show-scrollbar>
			<view :class="activeNumber==index?'pics_left_item active':'pics_left_item' " v-for="(item,index) in categoryList"
			 :key="item.id" @click="handleItemChange(index,item.id)">{{item.title}}</view>
		</scroll-view>
		<scroll-view class="pics_right" scroll-y show-scrollbar>
			<view class="right_img_warp" v-for="item in imgList" :key="item.id">
				<image :src="item.img_url" mode="widthFix" @click="handlePreviewImg(item.img_url)"></image>
				<view class="img_title">
					{{item.title}}
				</view>
			</view>
			<text v-if="imgList.length == 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [],
				activeNumber: 0,
				imgList: [],
				
			};
		},
		onLoad() {
			this.getCategoryList()
		},
		methods: {
			handlePreviewImg(currentUrl){
				
				uni.previewImage({
				  current: currentUrl, 
				  urls: this.imgList.map(item=>item.img_url)
				})
			},
			
			
			async getCategoryList() {
				const res = await this.$myRequest({
					url: "/api/getimgcategory"
				})
				this.categoryList = res
				this.getImgList(res[0].id)
			},
			handleItemChange(index, id) {
				this.activeNumber = index
				this.getImgList(id)
			},
			async getImgList(id) {
				const res = await this.$myRequest({
					url: "/api/getimages/" + id
				})
				this.imgList = res
			}

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		display: flex;
		height: 100%;

		.pics_left {
			height: 100%;
			flex: 2;
			color: #333;

			.pics_left_item {
				text-align: center;
				width: 100%;
				line-height: 120rpx;
				border-top: 1rpx solid #eee;
				border-right: 1rpx solid #eee;

				&.active {
					background-color: $themeColor;
					color: #fff;
				}
			}
		}

		.pics_right {
			height: 100%;
			flex: 5;

			.right_img_warp {
				padding: 10rpx;

				image {
					border-radius: 10rpx;
					width: 100%;
				}

				.img_title {
					width: 100%;
					line-height: 60rpx;

				}
			}
		}
	}
</style>
