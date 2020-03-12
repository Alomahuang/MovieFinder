<template>
  <v-app-bar app color="white">
  <v-row justify="center" align="center">
    <v-col md="6" sm="6">
      <img src="https://molteo.de/imgs/Logo_yellow.svg" style="max-width:180px;float:right" alt="logo"
        contain>
    </v-col>
    <v-col md="3" sm="3" class="d-none d-sm-flex">
      <span class="ml-0">/ movies / {{this.$store.state.currentLocation}}</span>
    </v-col>
    <v-col md="3" sm="3">
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
  methods: {
    // When users press down 'esc', let's reload POPULAR movies for them!
    clear() {
      this.searchValue = '';
      this.search();
    },
    search() {
      let queryUrl = `${this.$store.state.basic_api_url}`;
      if (this.searchValue === '') {
        this.$store.commit('UPDATELOCATION', 'Popular');
        queryUrl += 'discover/movie?sort_by=popularity.desc';
      } else {
        this.$store.commit('UPDATELOCATION', `Search : ${this.searchValue}`);
        queryUrl += `search/movie?query=${this.searchValue}`;
      }
      queryUrl += `&language=en-US&include_adult=false&api_key=${this.$store.state.api_key}&page=1`;
      this.$store.commit('CHANGEURL', { queryUrl, type: 1 });
      this.$store.dispatch('get_List');
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
