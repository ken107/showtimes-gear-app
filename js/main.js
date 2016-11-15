
window.onload = function () {
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back") {
        	tizen.application.getCurrentApplication().exit();
        }
	});
    document.querySelector('#content').addEventListener("click", function() {
    	scroll();
    });
    document.addEventListener('rotarydetent', function(e) {
    	scroll(e.detail.direction === 'CCW');
    });
    theaters.regency.getShowtimes(37).then(function(data) {
		movies = data;
		index = 0;
		update();
	});
};

var movies = null;
var index = -1;

function scroll(up) {
	if (movies) {
		index = (index + (up ? -1 : 1) + movies.length) % movies.length;
		update();
	}
}

function update() {
	var box = document.querySelector('#content');
	var movie = movies[index];
	if (movie) {
		var showtimes = movie.showtimes.map(function(showtime) {
			return showtime.time;
		});
		box.innerHTML =
			"<span class='title'>" + movie.name + "</span><br/>" +
			"<span class='showtimes'>" + showtimes.join(" | ") + "</span>";
	}
	else {
		box.innerHTML = "No data";
	}
}
