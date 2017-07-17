# imdb-scraper

One page script to rip data from IMDB including title, year, genres, rating, artwork, runtime. 

Built with website-scraper 

## Installation

```
git clone https://github.com/actuallyDan/imdb-scraper.git
cd imdb-scraper
npm install
``` 

# Run

Simply enter ` node server.js` in a terminal. 

Note: There are over 2 million movie entries so it will probably take a while. You can modify the script to run whatever interval you'd like.

```javascript
...
var theURL = 17000; // Beginning of 1900's movies, IMDB is indexed somewhat chronologically
var movies = [];
var start = now();  // Some basic performance measures. Running an average 1 page / 0.1 seconds in my tests
var length = 100; // How many movies you want to scrape

for(var i = 0, j = length; i < j; ++i){
var options = {
...
```
