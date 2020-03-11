<template>
  <v-app-bar app color="white">
  <v-row justify="center" align="center">
    <v-col lg="6">
      <img src="https://molteo.de/imgs/Logo_yellow.svg" style="max-width:180px;float:right" alt="logo"
        contain>
    </v-col>
    <v-col lg="3">
      <span class="ml-0">/ movies / {{this.$store.state.currentLocation}}</span>
    </v-col>
    <v-col lg="3">
      <div align-center center>
        <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"
          v-model="searchValue" v-on:change="search" type="text"  v-on:keyup.esc="clear"/>
      </div>
    </v-col>
  </v-row>
</v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      searchValue: null,
    };
  },
  computed: {
    counter() {
      return this.$store.state.updateCounter;
    },
  },
  methods: {
    // When users press down 'esc', let's reload POPULAR movies for them!
    clear() {
      this.searchValue = '';
      this.search();
    },
    search() {
      let queryUrl = '';
      if (this.searchValue === '') {
        this.$store.commit('UPDATELOCATION', 'Popular');
        this.$store.commit('CHANGEURL', { queryUrl, type: 1 });
        this.$store.dispatch('get_List');
      } else {
        this.$store.commit('UPDATELOCATION', `Search : ${this.searchValue}`);
        queryUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.$store.state.api_key}&language=en-US&page=1&include_adult=false&query=${this.searchValue}`;
        this.$store.commit('CHANGEURL', { queryUrl, type: 1 });
        this.$store.dispatch('get_List');
      }
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
