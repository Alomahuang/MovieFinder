# Movie Finder

Popular movies will show up initially, and you can search movies by names.

Click on the movie, you will see the details of the movie at the right-hand side.

Every component refreshes every 2 seconds to retreive the latest information(2 seconds is way too often, but it's easier for you to check if it's working.)

## Here's how to run the site
---

You can...
1. Clone the whole branch, input command at the root folder:

```
npm run serve
```

and open the browser with url : http://localhost:8080/

**or**
2. You can go to \dist folder

If you have **http-server** already, just open cmd and input:

```
http-server
```

If you don't have please go to: https://www.npmjs.com/package/http-server 
to learn more about it.


## Required libraries of this project
--- 

- [x] vue.js
- [x] vuex.js
- [x] axios.js
- [x] vuetify.js
- [x] moment.js
- [x] ESLint with Airbnb Standard

## Required scenarios
---

- [x] Connecting to the real IMDB Database
- [x] Searching for specific movies
- [x] See details of a specific movie
- [x] Updating the information while the user is using the webapp
- [x] Using the Vuetify framework

## Functions of app explained
---

#### Show Movie List

Initially the page will load the first page of popular movies with api **Movie Discover**

Movie list will reload when users interact with search function, including searching certain words or pressing *esc*.

Movies without photos will be shown the name.

#### Search

You may search the movie with the name of movies.

If you input nothing and press enter, you will direct back to popular movies.

#### Show Detail of a movie

When you click on Movie List items, the details of the movie will show up at your right-hand side.

If you click on the Movie List empty spots(not on any items,) the details will hide and I stop the interval to retrieve for single movie details too.

## Codes explained
---

#### Navbar.vue

1. We have only one local data stored in the component **searchValue** for passing the name of movie to index.js action.
2. In the search input, after you press **enter**, you will get the result in the movie list.
3. In the search input, if you press **esc**, you will trigger clear() function, which will reload the page with Popular movies.
4. Navbar shows Breadcrumbs, which tells you which movie list is showing, like: Popular movies, or Search results.

#### List.vue

1. Both movie-list interval and single-movie-detail interval are located in this component, so be careful of all the **clearInterval** here; or you may break the refreshing design.
2. Currently I retrieve datas every 2 seconds for testing.
3. showDetail() calls api **Get Details** with movie_id.
4. clearChoose() will trigger when you click on the background of this component, which will hide the single-movie-detail(Detail.vue component.)

#### Detail.vue

1. The release date of the movie origianlly is in YYYY-MM-DD form, but I prefer just showing the year. If you want it to show in other form, you can use ```this.$moment(date, 'YYYY-MM-DD').format('Your Formate');```
2. Overview of the movie will hide the context longer than String Length 200, you can modify ```truncateStringValue(this.activeItem.overview, 200)``` to change the setting.

#### index.js

1. Use mutation and action to control the state. Always!
2. Genrally **type** in this page, 1 means Movie-list related stored states, and 2 is for Single-movie-detail stored states.

## Problems I encountered

* When I try to get states from ```this.$store.state```, even with the non-existing states like ```this.$store.state.NotExisting```, Vue Cli wouldn't warn you about this.
* I didn't understand the scenario of **Updating the information while the user is using the webapp** first, I thought what is requested is to refresh the page when the database of **The Movie DB** updates. And I can't see the relation with Vuex to it. But then I found out that twitter also updates the page continuously itself, so I can just use setInterval() to achieve retrieving latest information. The only thing needs to be avoided is not to set multiple interval and stop it when it's not necessary, to avoid the browser crashing down.

## Things to work on:

There are something I want to work on, but I will hand this version over right now:
* Query urls storage
* Add Category Search
* Pagination
