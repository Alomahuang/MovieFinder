<template>
  <v-col class="text-center"  v-bind:order="order" md="4" lg="3" v-if="activeItem"
  style="background: -webkit-linear-gradient(rgb(250, 205, 93),rgb(255, 185, 5));">
    <v-container class="stickyCard">
      <v-card class="mx-auto ma-4 pa-2" max-width="344">
        <div class="flip-card" @click="changeSide">
          <div class="flip-card-inner"
          :class="{'flip-card-inner-turn': !this.$store.state.sideFront}">
            <div class="detailPhotoDiv" >
              <img v-if="activeItem.backdrop_path" :src="'https://image.tmdb.org/t/p/w500/' + activeItem.backdrop_path"
              class="detailImage"/>
              <div class="detailImage no-photo"
              v-if="showNoImage">No photo</div>
            </div>
            <div class="trailer">
              <iframe width="100%" height="180" v-show="!this.$store.state.sideFront"
              style="backface-visibility:hidden" allowfullscreen="true"
              :src="'https://www.youtube.com/embed/'+ (activeItem.trailerid!=null?activeItem.trailerid:'SL_YMm9C6tw?start=67')">
              </iframe>
              <a class="poster-button">Check Poster</a>
            </div>
          </div>
        </div>
        <div style="margin-top: 220px">
          <v-row class="title mx-2 mt-4"><a class="detailTitle"
              v-bind:href="'https://www.imdb.com/title/'+this.activeItem.imdb_id"
              target="_blank">{{this.activeItem.title}}</a></v-row>
          <v-row class="mx-0 mt-0" align="center">
            <v-col md="3" sm="3" style="white-space:nowrap">
              {{getYear(this.activeItem.release_date)}}
            </v-col>
            <v-col md="9" sm="9" style="text-align:left;">
              <span v-for="(item, j) in activeItem.genres" :key="j"
                v-on:click="show_list_genre(item)" class="genre">
                {{item.name}}{{activeItem.genres.length==j+1? '':','}}
              </span>
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-rating v-bind:value="(this.activeItem.vote_average)/2" color="amber"
            dense half-increments readonly size="24"></v-rating>
            <div class="grey--text ml-4">
              {{this.activeItem.vote_average}} ({{this.activeItem.vote_count}})</div>
          </v-row>
          <v-row class="mx-2">
            <p class="text-justify">{{truncateStringValue(this.activeItem.overview, 200)}}</p>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </v-col>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    msg: String,
  },
  computed: {
    activeItem() {
      return this.$store.state.activeItem;
    },
    order() {
      let order = 12;
      switch (this.$vuetify.breakpoint.name) {
        default: order = 12;
          break;
        case 'xs': order = 1;
          break;
      }
      return order;
    },
    showNoImage() {
      if (this.activeItem.backdrop_path == null) {
        return true;
      }
      return false;
    },
  },
  methods: {
    getYear(date) {
      if (!date) return 'Unknown';
      return this.$moment(date, 'YYYY-MM-DD').format('YYYY');
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
    show_list_genre(item) {
      let queryUrl = `${this.$store.state.basic_api_url}`;
      this.$store.commit('UPDATELOCATION', item.name);
      queryUrl += `discover/movie?sort_by=popularity.desc&with_genres=${item.id}`;
      queryUrl += `&language=en-US&include_adult=false&api_key=${this.$store.state.api_key}&page=1`;
      this.$store.commit('CHANGEURL', { queryUrl, type: 1 });
      this.$store.dispatch('get_List');
      this.$store.commit('UPDATEPAGE', 1);
    },
    changeSide() {
      this.$store.commit('CHANGESIDE', !this.$store.state.sideFront);
    },
  },
};
</script>

<style scoped>
  .stickyCard {
    position: sticky;
    top: 65px;
    z-index: 999;
  }

  .detailTitle {
    color: #60bfce !important;
    text-decoration-line: none;
    text-align: left;
  }

  .genre{
    cursor:pointer;
    color: #fab54dfa;
  }

  .genre:hover{
    text-decoration: underline;
  }

  .flip-card {
  width: auto;
  }
  .detailImage {
    height: 200px;
    object-fit: cover;
    overflow-x: scroll;
    width: 100%;
  }

  .flip-card-inner {
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }

  .flip-card-inner-turn {
    transform: rotateY(180deg);
  }

  .detailPhotoDiv, .trailer {
    display: table;
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .trailer {
    background-color: #60bfce;
    height: 200px;
    transform: rotateY(180deg);
    border-radius: 10px;
  }
  .poster-button {
    color: white;
    top:-5px;
    position:relative;
  }
  .no-photo {
    vertical-align: middle;
    display: table-cell;
    overflow-x: auto;
    font-size: 30px;
  }
</style>
