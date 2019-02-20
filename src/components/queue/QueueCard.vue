<template>
    <v-card class="pb-3 ma-2">
        <v-card-title primary-title>
            <div style="width: 100%">
                <div class="grey--text">
                    Очередь
                    <div class="text-xs-right text-right">
                        <v-icon :size="22" class="pr-1">history</v-icon>
                        9 часов назад
                    </div>
                </div>
                <div class="title font-weight-bold">{{queue.name}}</div>
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
    }
</script>

<style lang="scss">
    .text-right {
        display: flex;
        justify-content: center;
        align-items: center;
        float: right;
    }
</style>