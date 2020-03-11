<template>
  <div id="app">
    <v-app id="inspire">
    <navbar/>
    <v-content style="padding: 0">
        <v-row justify="center">
            <List/>
            <Detail/>
        </v-row>
    </v-content>
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import List from './components/List.vue';
import Detail from './components/Detail.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    List,
    Detail,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
