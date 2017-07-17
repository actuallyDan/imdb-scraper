var scrape = require('website-scraper');
var fs = require('fs');
var now = require("performance-now");

var theURL = 17000;
var movies = [];
var start = now();
var length = 100;
for(var i = 0, j = length; i < j; ++i){
var options = {
	urls: [{url: 'http://www.imdb.com/title/tt' + (theURL + i) + '/', filename: 'data.html'}],
	directory: './pages/',
	sources: []
};
scrape(options, (error, result) => {
	/* some code here */
	if(error){
		console.log(error);
		return false;
	}
	fs.readFile('./pages/data.html', (err, data)=> {
		if(err){
			console.log(err);
			return false;
		}
		var movie = {
			id: theURL + i,
			title: /<h1 itemprop="name" class="">(.+)&nbsp.+<\/h1>/.test(data) ? /<h1 itemprop="name" class="">(.+)&nbsp.+<\/h1>/.exec(data)[1] : null,
			score: /itemprop="ratingValue">(.{3})<\/span>/.test(data) ? /itemprop="ratingValue">(.{3})<\/span>/.exec(data)[1] : null,
			// rating: /<meta itemprop="contentRating" content=".+">(.+)/.test(data) ? /<meta itemprop="contentRating" content=".+">(.+)/.exec(data)[1] : null,
			runtime: /<time.+>(.+)min<\/time/.test(data) ? /<time.+>(.+)min<\/time/.exec(data)[1].trim() : null,
			genres : [],
			releaseDate: /title="See more release dates">(.+)\(/.test(data) ? /title="See more release dates">(.+)\(/.exec(data)[1].trim() : null,
			image: /<img alt=".+" title=".+" src="(http.+)" itemprop="image">/.test(data) ? /<img alt=".+" title=".+" src="(http.+)" itemprop="image">/.exec(data)[1] : null,
			desc: /<div class="summary_text" itemprop="description">\s+(.+)\s+<\/div>/.test(data) ? /<div class="summary_text" itemprop="description">\s+(.+)\s+<\/div>/.exec(data)[1] : null
		};
		var genreRE = /<span class="itemprop" itemprop="genre">(.+)<\/span>/g;
		var m;

		while (m){
				m = genreRE.exec(data);
				if (m) {
					movie.genres.push(m[1]);
				}
		};
		 fs.appendFile("movies.js", JSON.stringify(movie) + ",");
		// console.log(movie); 
		console.log((now() - start) / i);
	});
});

}