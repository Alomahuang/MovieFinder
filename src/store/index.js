import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basic_api_url: 'https://api.themoviedb.org/3/',
    currentLocation: '',
    activeItem: null,
    api_key: 'ee9a597328f8cb873b99161adc6bfa93',
    searchValue: null,
    movieList: null,
    search_url: 'https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&api_key=ee9a597328f8cb873b99161adc6bfa93&page=1',
    detail_url: '',
    listUpdatingTimerNumber: null,
    detailUpdatingTimerNumber: null,
    page: 1,
  },
  mutations: {
    // Update Breadcrumbs on Navbar
    UPDATELOCATION(state, location) {
      state.currentLocation = location;
    },
    UPDATEPAGE(state, page) {
      state.page = page;
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
      Axios.get(state.search_url).then((response) => {
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
  getters: {
    doneTodos: (state) => state.api_key,
  },
});
