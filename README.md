# Movie Finder

Popular movie List will show up initially, and you can search movies by names, click arrow icon to change pages.

Click on the movie, you then see the details of the movie on the right of the screen.

Both list and deail components refresh every 2 seconds to retrieve the latest information(2 seconds is way too often, but it's easier for you to check if it's working.)

## Required libraries of this project

- [x] vue.js
- [x] vuex.js
- [x] axios.js
- [x] vuetify.js
- [x] moment.js
- [x] ESLint with Airbnb Standard

## Required scenarios

- [x] Connecting to the real IMDB Database
- [x] Searching for specific movies
- [x] See details of a specific movie
- [x] Updating the information while the user is using the webapp
- [x] Using the Vuetify framework

## Here's how to run the site

###### The easy way
1. Clone \dist folder

If you have **http-server** already, open cmd.exe and input:

```
http-server
```

If you do not have it, use

```
npm install http-server
```
to install it and input the command above, then you can just run the website even in another PC.

###### Or the complete way
2. Clone the whole branch, input command at the root folder:

```
npm install
npm run serve
```

use --fix to fix linebreak-style problems if there's any.
*I fixed the issue with editing eslintrc.js, more information check Problems section*

and open the browser with url : http://localhost:8080/

3. Unit Test on Mutations

I am still figuring out tests, but really basic one's are implemented.

Just enter:
```
npm run test:unit
```

## Features

#### Show Movie List

Initially the page will load the first page of popular movies with api **Movie Discover** with parameter **sort_by=popularity.desc**

Movies without photos will be shown with their names.

#### Search

You may search the movie with the name of movies in the navbar.
If you input nothing or pressing *esc*, you will see default list : popular movies.

In movie details, you can click on the genre to search movies with the same genre.

#### Show Details of a movie

When you click on Movie List items, the details of the movie will show up at your right-hand side.

If you click on the Movie List background(not on any items,) the details will hide and it stops the interval to retrieve for single movie details too.

#### Pages

You can click on the Arrow Icon to change the page of the movie list.
Breadscrumbs show which page you're at if you change page.

## Codes explained

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
5. onResize() is used for screen view site detecting to cutomize the size of movie list poster previews.
6. page number isn't isolatedly stored, we manipuate $store.state.search_url; since page number is always at the end of this url, nextPage() and lastPage() take advantage of that, to do page changing.

#### Detail.vue

1. The release date of the movie originally is in YYYY-MM-DD form, but I prefer just showing the year. If you want it to show in other form, you can use ```this.$moment(date, 'YYYY-MM-DD').format('Your Formate');```
2. Overview of the movie will hide the context longer than String Length 200, you can modify ```truncateStringValue(this.activeItem.overview, 200)``` to change the setting.

#### index.js

1. Use mutation and action to control the state. Always!
2. Generally **type** in this page, 1 means Movie-list related stored states, and 2 is for Single-movie-detail stored states.

## Problems 

* When I try to get states from ```this.$store.state```, even with the non-existing states like ```this.$store.state.NotExisting```, Vue Cli wouldn't warn you about this. > happened to me twice!
* I didn't understand the scenario of **Updating the information while the user is using the webapp** first, I thought what is requested is to refresh the page when the database of **The Movie DB** updates. And I can't see the relation with Vuex to it. But then I found out that twitter also updates the page continuously itself, so I can just use setInterval() to achieve retrieving latest information. The only thing needs to be avoided is not to set multiple interval and stop it when it's not necessary, to avoid the browser crashing down.
* When I cloned the project from GitHub to test run. I encountered **linebreak-style** issue. The reason is:
> When developing with a lot of people all having different editors, VCS applications and operating systems it may occur that different line endings are written by either of the mentioned (might especially happen when using the windows and mac versions of SourceTree together).
> 
> The linebreaks (new lines) used in windows operating system are usually carriage returns (CR) followed by a line feed (LF) making it a carriage return line feed (CRLF) whereas Linux and Unix use a simple line feed (LF). The corresponding control sequences are "\n" (for LF) and "\r\n" for (CRLF).

so to fix it, I put ```"linebreak-style": 0,``` in eslintrc.js. The other way is to use ```npm run serve --fix``` to run the project.

## Things to work on:

There are something I want to work on, but I will hand this version over right now:
* ~~Query urls storage~~ : delete some hard-codes. 
* ~~Add Category Search~~ : now can click on categories in details
* ~~Pagination~~ implement page changer without v-pagination
* RWD: includes basic RWD
