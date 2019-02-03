<template>
    <v-list-tile>
      <v-list-tile-action>
          <v-icon v-if="follow" color="green">star</v-icon>
          <v-icon v-if="!follow" class="select-follow" @click="$emit('follow', uniqueKey)">star</v-icon>
      </v-list-tile-action>
      <v-list-tile-title>
        <slot></slot>
      </v-list-tile-title>
      <v-list-tile-action>
	<v-btn icon>
          <v-icon @click="$emit('done', uniqueKey)">done</v-icon>
	</v-btn>
      </v-list-tile-action>
      <v-list-tile-action>
	<v-btn icon>
          <v-icon @click="$emit('removed', uniqueKey)">delete</v-icon>
	</v-btn>
      </v-list-tile-action>
    </v-list-tile>
</template>

<script>
    export default {
      name: "QueueElement",
      props: ['uniqueKey', 'follow'],
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
