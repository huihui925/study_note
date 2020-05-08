<template>
	<NewsItem :news="news"></NewsItem>
</template>

<script>
	import NewsItem from "../../components/NewsItem.vue"
	export default {
		data() {
			return {
				news:[],
			};
		},
		onLoad(){
			this.getNews()
		},
		methods:{
			async getNews(){
				const res = await this.$myRequest({
					url:"/api/getnewslist"
				})
				this.news=res
			}
		},
		components:{
			NewsItem
		}
	}
</script>

<style lang="scss">

</style>
