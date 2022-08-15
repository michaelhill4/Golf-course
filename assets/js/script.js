// golf course fetch call for Columbus coordinates within 10 mile radius
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '804debc86amsh91473b414b0f4a2p1cd0cfjsncf3998336eab',
		'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
	}
};

fetch('https://golf-course-finder.p.rapidapi.com/courses?radius=10&lat=39.983334&lng=-82.983330', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
//Columbus weather fetch call
function getWeatherApi() {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Columbus&appid=01c6acda042379425ee30a68789c29c5';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
    }

    
getWeatherApi()


