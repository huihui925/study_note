<template>
	<view class="swiper_container">
		<swiper indicator-dots autoplay circular :style="'height:'+styleHeight">
			<swiper-item v-for="item in swipers" :key="item.id||item.img">
				<navigator url="">
					<image :src="item.img" mode="widthFix"></image>
				</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: ['swipers','styleHeight']
	}
</script>

<style lang="scss">
	.swiper_container {
		swiper {
			width: 750rpx;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
