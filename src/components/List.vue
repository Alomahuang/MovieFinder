<template>
  <v-col md="8" lg="9" v-bind:order="order" v-on:click.self='clearChoose'
  style="background: -webkit-linear-gradient(rgb(153, 231, 243),rgb(0, 177, 191));padding:0 40px;" >
  <v-container v-resize="onResize" v-on:keyup.right='nextPage'>
    <v-layout row wrap v-on:click.self='clearChoose'>
      <v-card class="mx-auto ma-4 pa-2 rounded-card listPhoto mt-0" max-width="180"
      v-bind:width="windowSize>500?'180px':'150px'" tile
      v-on:click="showDetail(item)" v-for="(item, i) in MovieList" :key="i">
        <div v-if="item.poster_path"> <v-img  :src="'https://image.tmdb.org/t/p/w500/' + item.poster_path"
        max-height="300px" dark></v-img></div>
        <div v-else class="listEmptyPhoto"><a style="color:rgb(255, 185, 5)">
          {{truncateStringValue(item.title,15)}}</a></div>
      </v-card>
    </v-layout>
  </v-container>
  <v-row class="stickyButton">
    <v-btn color="#ffc107" dark v-on:click='lastPage'>
        <v-icon dark>mdi-arrow-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn color="#ffc107" dark v-on:click='nextPage'>
        <v-icon dark>mdi-arrow-right</v-icon>
    </v-btn>
  </v-row>
</v-col>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      windowSize: 0,
      page: 1,
    };
  },
  computed: {
    MovieList() {
      return this.$store.state.movieList;
    },
    order() {
      let order = 1;
      switch (this.$vuetify.breakpoint.name) {
        default: order = 1;
          break;
        case 'xs': order = 12;
          break;
      }
      return order;
    },
  },
  methods: {
    init() {
      this.$store.commit('UPDATELOCATION', 'Popular');
      this.$store.dispatch('get_List');
      /* When there's an interval, this will
      abandon interval of updating our movie list */
      if (this.$store.state.detailUpdatingTimerNumber != null) {
        window.clearInterval(this.$store.state.listUpdatingTimerNumber);
      }
      /* We keep the page up to date every 2 seconds.
         In reality I would choose 30 seconds, but 2 seconds here
         is fine for checking if there's multiple intervel */
      const TIMER_NUMBER = setInterval(() => {
        this.$store.dispatch('get_List');
      }, 2000);
      this.$store.commit('UPDATETIMER', { TIMER_NUMBER, type: 1 });
    },
    showDetail(item) {
      const queryUrl = `${this.$store.state.basic_api_url}movie/${item.id}?language=en-US&api_key=${this.$store.state.api_key}`;
      this.$store.commit('CHANGEURL', { queryUrl, type: 2 });
      this.$store.dispatch('get_Detail');
      // Abandon interval of updating single movie details.
      if (this.$store.state.detailUpdatingTimerNumber != null) {
        window.clearInterval(this.$store.state.detailUpdatingTimerNumber);
      }
      const TIMER_NUMBER = setInterval(() => {
        this.$store.dispatch('get_Detail');
      }, 2000);
      this.$store.commit('UPDATETIMER', { TIMER_NUMBER, type: 2 });
    },
    // Shorten the context with this function
    truncateStringValue: (context, length) => {
      let returnValue = '';
      if (context.length) {
        returnValue = `${context.substring(0, length)}...`;
      } else {
        returnValue = context;
      }
      return returnValue;
    },
    clearChoose() {
      // Abandon interval of updating single movie details.
      if (this.$store.state.detailUpdatingTimerNumber != null) {
        window.clearInterval(this.$store.state.detailUpdatingTimerNumber);
      }
      // Here we will hide the single movie detail.
      this.$store.commit('CLEARDETAIL');
    },
    onResize() {
      this.windowSize = window.innerWidth;
    },
    nextPage() {
      let queryUrl = `${this.$store.state.search_url}`;
      const page = Number(queryUrl.slice(queryUrl.indexOf('page=') + 5)) + 1;
      queryUrl = queryUrl.slice(0, queryUrl.indexOf('page=') + 5) + page.toString();
      this.$store.commit('CHANGEURL', { queryUrl, type: 1 });
      this.$store.dispatch('get_List');
    },
    lastPage() {
      let queryUrl = `${this.$store.state.search_url}`;
      if (Number(queryUrl.slice(queryUrl.indexOf('page=') + 5)) === 1) return;
      const page = Number(queryUrl.slice(queryUrl.indexOf('page=') + 5)) - 1;
      queryUrl = queryUrl.slice(0, queryUrl.indexOf('page=') + 5) + page.toString();
      this.$store.commit('CHANGEURL', { queryUrl, type: 1 });
      this.$store.dispatch('get_List');
    },
  },
  mounted() {
    this.init();
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
  .rounded-card{
    border-radius:10px;
  }

  .stickyCard {
    position: sticky;
    top: 65px;
    z-index: 999;
  }

  .listPhoto:hover {
  animation: shake 0.3s;
  animation-iteration-count: infinite;
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(-1deg); }
  25% { transform: translate(-1px, 1px) rotate(1deg); }
  50% { transform: translate(-1px, -1px) rotate(-1deg); }
  75% { transform: translate(1px, -1px) rotate(1deg); }
  100% { transform: translate(-1px, -1px) rotate(-1deg); }
}
 .listEmptyPhoto{
  overflow: hidden;
    font-size: 75px;
    text-decoration-line: underline;
    overflow-wrap: normal;
    line-height: 80px;
    font-weight: 100;
 }
 .stickyButton {
    position: sticky;
    bottom: 5%;
    z-index: 999;
  }
</style>
