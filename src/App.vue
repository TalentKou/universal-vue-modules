/* *
<!-- prettier-ignore -->
* File Path: \src\App.vue
 * Project Path: c:\Users\admin\projects\fontend-knowledge-repository\universal-vue-modules
 * -----
 * File Created: Wednesday, 8th September 2021 11:14:05 am
 * Author: koucaihua (koucaihua@fkhwl.com)
 * -----
 * Last Modified: Wednesday, 8th September 2021 11:43:10 am
 * Modified By: koucaihua (koucaihua@fkhwl.com>)
 * -----
 * Description: 这是一个用于组件测试的主组件
 */

<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<router-view />
	</div>
</template>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
