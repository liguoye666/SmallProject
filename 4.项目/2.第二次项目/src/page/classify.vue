<template>
	<!-- 课程分类列表 -->
	<div class="classify-page">
		<!-- 页头 -->
		<div class="header">
			<div class="header-ul">
				<router-link to="/">
					<div class="back"><img src="../assets/back.png"></div>
				</router-link>
				<div class="caption">前端开发</div>
				<div class="search"><img src="../assets/search.png"></div>
			</div>
		</div>
		<!-- banner图 -->
		<div class="banner"></div>
		<!-- 导航栏 -->
		<ul class="nav">
			<li v-for="item in arrList">{{item}}</li>
		</ul>
		<!-- 筛选列表 -->
		<ul class="list">
			<li class="title">
				<span>全部</span>
				<img src="../assets/arrow.png">
				<span class="line">|</span>
			</li>
			
			<li class="title">
				<span>最新</span>
				<img src="../assets/arrow.png">
				<span class="line">|</span>
			</li>
			<li class="only">
				<span>仅显示未学</span>
				<img class="under" src="../assets/under.png">
				<img class="slider" src="../assets/slider.png">
			</li>
		</ul>
		<!-- 课程列表 -->
		<ul class="course">
			<router-link to="/detail">
				<li v-for="item in courses">
					<img :src="item.imgUrl" />
					<h1>{{item.title}}</h1>
					<p>{{item.msg}}</p>
				</li>
			</router-link>
		</ul>
		<!-- 页脚 -->
		<div class="footer">
			<ul class="footer-ul">
				<li>
					<img src="../assets/web.png">
					<span>首页</span>
				</li>
				<li>
					<img src="../assets/sea.png">
					<span>发现</span>
				</li>
				<li>
					<img src="../assets/download.png">
					<span>下载</span>
				</li>
				<li>
					<img src="../assets/me.png">
					<span>我的</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	// import back from '@/assets/back.png'

	import course1 from '@/assets/course1.jpg'
	import course2 from '@/assets/course2.jpg'
	import course3 from '@/assets/course3.jpg'
	import course4 from '@/assets/course4.jpg'
	import course5 from '@/assets/course5.jpg'

	export default{
		data(){
			return{
				arrList:[],
				courses:[],
			}
		},
		mounted(){
			// 导航栏
			this.arrList=['Android','Html5','photoshop','Node.js','MongoDB','Maya','premiere','更多'];
			// 课程列表
			this.courses=[
				{
					imgUrl:course1,
					title:'实例妙解Sed和Awk的秘密',
					msg: '中级 · 330人在学',
				},
				{
					imgUrl:course2,
					title:'实例妙解Sed和Awk的秘密',
					msg: '中级 · 330人在学',
				},
				{
					imgUrl:course3,
					title:'实例妙解Sed和Awk的秘密',
					msg: '中级 · 330人在学',
				},
				{
					imgUrl:course4,
					title:'实例妙解Sed和Awk的秘密',
					msg: '中级 · 330人在学',
				},
				{
					imgUrl:course5,
					title:'实例妙解Sed和Awk的秘密',
					msg: '中级 · 330人在学',
				},
			];
		}
	}
</script>
<style scoped>
	/*页头*/
	.header {
		width: 375px;
		background: #fff;
	}

	.header-ul {
		font-size: 0;
	}

	.header-ul div {
		font-size: 16px;
		line-height: 44px;
		display: inline-block;
		height: 44px;
	}

	.header .back {
		margin-right: 16px;
		margin-left: 20px;
	}

	.header .back img {
		width: 14px;
	}

	.header .caption {
		font-size: 16px;
		color: #2b333b;
	}

	.header .search {
		margin-left: 223px;
	}

	.header .search img {
		width: 18px;
	}

	/*banner*/
	.banner {
		width: 100%;
		height: 120px;
		background: url(../assets/banner.jpg) no-repeat center;
		background-size: cover;
	}

	/*导航栏*/
	.nav {
		font-size: 12px;
		display: flex;
		box-sizing: border-box;
		width: 375px;
		height: 75px;
		padding: 10px 24px;
		color: #71777d;
		justify-content: space-between;
		align-content: space-between;
		flex-wrap: wrap;
	}

	.nav li {
		line-height: 22px;
		width: 23%;
		height: 22px;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 12% / 50%;
		box-shadow: 0 0 3px rgba(0, 0, 0, .2);
	}

	/*筛选列表*/
	.list {
		font-size: 0;
		display: flex;
		box-sizing: border-box;
		position: relative;
		width: 375px;
		color: #71777d;
		border: 1px solid #eee;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .10);
	}

	.list .title {
		font-size: 12px;
		line-height: 36px;
		position: relative;
		display: inline-block;
		box-sizing: border-box;
		width: 90px;
		height: 36px;
		padding: 0 26px;
		text-align: center;
	}

	.list .title img {
		position: absolute;
		top: 50%;
		width: 10px;
		height: 10px;
		margin-top: -5px;
		margin-left: 4px;
	}

	.list .title .line {
		font-size: 12px;
		position: absolute;
		top: 0;
		left: 100%;
		display: inline-block;
		width: 1px;
		height: 12px;
		box-shadow: inset 0 0 0 0 #b7bbbf;
	}

	.list .only {
		font-size: 12px;
		line-height: 36px;
		/*position: relative;*/
		position: absolute;
		/*left: 75px;*/
		right: 60px;
		display: inline-block;
		height: 36px;
		padding-right: 20px;
		flex-grow: 1;
		box-sizing: border-box;
	}

	.list .only .under {
		position: absolute;
		top: 50%;
		width: 24px;
		height: 8px;
		left: 60px;
		margin-top: -4px;
		margin-left: 8px;
	}

	.list .only .slider {
		position: absolute;
		top: 50%;
		width: 12px;
		height: 12px;
		margin-top: -6px;
		margin-left: 8px;
		left: 60px;
	}

	/*课程列表*/
	.course {
		margin-bottom: 30px;
		padding: 20px;
	}

	.course li {
		position: relative;
		width: 335px;
		height: 72px;
		margin-bottom: 24px;
	}

	.course li img {
		position: absolute;
		width: 108px;
		height: 72px;
	}

	.course li h1 {
		font-size: 15px;
		margin-bottom: 8px;
		padding-left: 124px;
		color: #2b333b;
	}

	.course li p {
		font-size: 12px;
		padding-left: 124px;
		color: #71777d;
	}

	/*页脚*/
	.footer {
		position: fixed;
		z-index: 3;
		bottom: 0;
		width: 375px;
		border-top: 1px solid #f3f5f7;
		background: #fff;
	}

	.footer-ul {
		display: flex;
	}

	.footer-ul li {
		font-size: 10px;
		display: flex;
		flex-direction: column;
		height: 50px;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.footer-ul li img {
		width: 24px;
	}
</style>