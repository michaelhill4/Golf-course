// Use a CSS framework other than Bootstrap.

// Be deployed to GitHub Pages.

// Be interactive (i.e: accept and respond to user input).

// Use at least two server-side APIs.

// Does not use alerts, confirms, or prompts (use modals).

// Use client-side storage to store persistent data.

// Be responsive.

// Have a polished UI.

// Have a clean repository that meets quality coding standards (file structure, naming conventions, follows best practices for class/id-naming conventions, indentation, quality comments, etc.).

// Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

// Finally, You must add your project to the portfolio that you created in Module 2.




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


    
$('.locationBtn').click( "click", function() {
    $('.modal').modal('show');
})
// <<<<<<< HEAD
// });
// =======
// });
//f8d5d68f8802af9312f5882986939bb3c6df4f6a
