<template>
    <v-list-tile>
      <v-list-tile-action>
          <v-icon v-if="follow" color="green">star</v-icon>
          <v-icon v-if="!follow" class="select-follow" @click="$emit('follow', uniqueKey)">star</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>
        <slot></slot>
      </v-list-tile-title>
	<v-btn small color="info" @click="$emit('done', uniqueKey)" v-if="editable">
          <v-icon light>play_for_work</v-icon>
	  В конец
	</v-btn>
	<v-btn small color="error" @click="$emit('removed', uniqueKey)" v-if="editable">
          <v-icon light>remove_circle</v-icon>
	  Удалить
	</v-btn>
    </v-list-tile>
</template>

<script>
    export default {
      name: "QueueElement",
      props: ['uniqueKey', 'follow', "editable"],
    }
</script>

<style lang="scss">
  .queue-element {
    .select-follow {
      opacity: 0;
    }
    &:hover {
      .select-follow {
        opacity: 1;
	color: #dadada;
	&:hover {
	  color: #9a9a9a;
	}
      }
    }
  }
</style>
