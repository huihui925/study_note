<template>
	<view class="contact">
		<image mode="widthFix" class="contact_bg" src="../../static/contactBg.png"></image>
		<view class="contact_info">
			<view class="info_phone" @click="phone">联系电话:400-618-9060(点击拔打)</view>
			<view class="info_address">地址:重庆市观音桥步行街</view>
		</view>
		<!-- longitude经度、latitude纬度 -->
		<!-- 地图通过经度和纬度确定当前坐标,因为我们这里不涉及获取当前位置,所以经度纬度写死数据 -->
		<!-- scale地图缩放级别 -->
		<!-- markers设置标记点 这是一个数组 数组里是对象-->
		<!-- <map> 组件的宽/高推荐写直接量，比如：750rpx，不要设置百分比值。 -->
		<map class="map" :longitude="longitude" :latitude="latitude" :scale="scale" :markers="covers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 106.53826,
				latitude: 29.580773,
				scale: 14,
				covers: [
					//根据经度和纬度设置标记点 最好与当前位置数据一致
					//iconPath：是标记点图片路径
					//width,height:设置标记点图片大小 数字number 单位未知
					{
						longitude: 106.53826,
						latitude: 29.580773,
						iconPath: '/static/marke.jpg',
						width: 30,
						height: 30
					}
				]
			};
		},
		methods:{
			phone(){
				uni.makePhoneCall({
					phoneNumber:"400-618-9060"
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		font-size: 30rpx;
		.contact_bg {
			width: 100%;
		}

		.contact_info {
			padding: 10rpx 20rpx;

			>view {
				border-bottom: 1rpx solid #ccc;
			}

			.info_phone {
				line-height: 70rpx;
			}

			.info_address {
				line-height: 70rpx;
			}
		}
		.map{
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
