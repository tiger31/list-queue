<template>
    <v-card class="pb-3 ma-2">
				<v-toolbar color="transparent" dense flat>
					<v-toolbar-title>{{queue.name}}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-menu bottom left>
						<v-btn slot="activator" icon>
							<v-icon>more_horiz</v-icon>
						</v-btn>
						<v-list>
							<v-list-tile v-for="(a, i) in actions" :key="i" @click="action(a)">
								<v-icon class="pr-2">{{a.icon}}</v-icon>
								<v-list-tile-title>{{a.title}}</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-menu>
				</v-toolbar>
        <v-card-title primary-title class="pt-0">
            <div style="width: 100%">
                <div class="grey--text">
                    <div class="text-xs-right text-right">
                        <v-icon :size="22" class="pr-1">history</v-icon>
                        9 часов назад
                    </div>
                </div>
            </div>
        </v-card-title>
        <v-layout row class="mt-3">
            <v-flex xs6 class="text-xs-center">
                <div class="headline">{{queue.order.length}}</div>
                <span class="grey--text">Элементов</span>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
                <div class="headline">5</div>
                <span class="grey--text">Позиция</span>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
    export default {
        name: "queue-card",
				props: ['queue'],
				data () {
					return {
						actions: [
							{
								icon: 'delete',
								title: 'Удалить очередь',
								action: 'removeQueue'
							}
						]
					}
				},
				methods: {
					action (action) {
						this.$emit(action.action);
						this[action.action]();
					},
					removeQueue () {
						//TODO store
						console.log("should remove queue");
					}
				}
    }
</script>

<style lang="scss">
    .text-right {
        display: flex;
        align-items: center;
    }
</style>
