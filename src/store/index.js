import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLocation: '',
    activeItem: null,
    api_key: 'ee9a597328f8cb873b99161adc6bfa93',
    searchValue: null,
    updateCounter: 30,
    movieList: null,
    search_url: '',
    search_url_default: 'https://api.themoviedb.org/3/discover/movie?api_key=ee9a597328f8cb873b99161adc6bfa93&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
    detail_url: '',
    listUpdatingTimerNumber: null,
    detailUpdatingTimerNumber: null,
  },
  mutations: {
    // Update Breadcrumbs on Navbar
    UPDATELOCATION(state, location) {
      state.currentLocation = location;
    },
    // Update query address to movie-db
    CHANGEURL(state, { queryUrl, type }) {
      if (type === 1) {
        state.search_url = queryUrl;
      } else {
        state.detail_url = queryUrl;
      }
    },
    UPDATELIST(state, newList) {
      state.movieList = newList;
    },
    UPDATEDETAIL(state, newDetail) {
      state.activeItem = newDetail;
    },
    CLEARDETAIL(state) {
      state.activeItem = null;
    },
    // Save the interval timer_id for destroying
    UPDATETIMER(state, { TIMER_NUMBER, type }) {
      if (type === 1) {
        state.listUpdatingTimerNumber = TIMER_NUMBER;
      } else {
        state.detailUpdatingTimerNumber = TIMER_NUMBER;
      }
    },
  },
  actions: {
    // Get movie list from the movie-db
    get_List({ commit, state }) {
      /* unlock the console.log if you want to
      check how often the movie list updates. */
      // console.log('List Updates!');
      let queryUrl = '';
      if (state.search_url !== '') {
        queryUrl = state.search_url;
      } else {
        queryUrl = state.search_url_default;
      }
      Axios.get(queryUrl).then((response) => {
        (commit('UPDATELIST', response.data.results));
      });
    },
    // Get single movie detail from the movie-db
    get_Detail({ commit, state }) {
      /* unlock the console.log if you want to
      check how often the single movie detail updates. */
      // console.log('Detail Updates!');
      Axios.get(state.detail_url).then((response) => {
        (commit('UPDATEDETAIL', response.data));
      });
    },
  },
  modules: {
  },
});
