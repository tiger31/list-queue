<template>
	<div>
		<div class="headline">Списки</div>
		<div class="empty" v-if="listsCount === 0">Список пуск</div>
		<v-card class="elevation-5"  v-else>
			<v-list>
				<v-list-tile v-for="(value, key) in lists" :key="key" @click="$emit('listChoose', key)">
					<v-list-tile-title>
						{{value.name}}
					</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-card>
	</div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'

export default {
	name: "UserLists",
	props: ['lists'],
	computed: {
		listsCount () {
		  return Object.keys(this.lists).length;
		}
	},
}

</script>

<style>

</style>
