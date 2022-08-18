
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
var fetchbutton = document.querySelectorAll(".btn btn-primary")
var searchContainer = document.getElementById("results")
var locationEl =  document.getElementById("location")
var tempEl = document.getElementById("temp")
var skyTextEl = document.getElementById("weatherText")
var exampleZipCode = document.getElementById("exampleZipCode")
var windEl = document.getElementById("wind")

function renderLastData() {
    var cityData = localStorage.getItem("savedCity");
    var tempData = localStorage.getItem("savedTemp");
    var skyData = localStorage.getItem("savedSky");
    var windData = localStorage.getItem("savedWind");

    locationEl.textContent = ("City:   " + cityData);
    tempEl.textContent = ("Temperature:   " + tempData + "°F");
    skyTextEl.textContent = ("Weather:   " + skyData);
    windEl.textContent = ("Wind Speed:   " + windData);
}

function golfApi(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '804debc86amsh91473b414b0f4a2p1cd0cfjsncf3998336eab',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }
    }

fetch('https://golf-course-finder.p.rapidapi.com/courses?radius=10&lat=39.983334&lng=-82.983330', options)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    if(data.courses.length > 0){
        console.log(data)
        for (var i=0; i < data.courses.length; i++){
            console.log(data.courses[i].name)

        var courseName = document.createElement('li');
        courseName.textContent = data.courses[i].name+" - "+ data.courses[i].distance + " miles away";
        console.log(courseName)
        searchContainer.append(courseName)
        }}
    })
}
golfApi()

//Columbus weather fetch call
function getWeatherApi(zipCode) {
    console.log("my past data is " + zipCode)
    let param = zipCode
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${param},us&units=imperial&appid=01c6acda042379425ee30a68789c29c5`;
    //{curly ${var} brackets for user input on zip code}
    
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var wCity = data.city.name
        localStorage.setItem("savedCity", wCity)
        
        var wTemp = parseInt(data.list[0].main.temp)
        localStorage.setItem("savedTemp", wTemp)
        
        var wSky = data.list[0].weather[0].main
        localStorage.setItem("savedSky", wSky)

        var wWind = data.list[0].wind.speed
        localStorage.setItem("savedWind", wWind)
        
        renderLastData()
    })
}
    
$('.locationBtn').click( "click", function() {
    $('.modal').modal('show');
});

$(".saveBtn").on("click", function () {
   var zipCode = document.getElementById("exampleZipCode").value;
   console.log(zipCode);
   var withinDistance = document.getElementById("exampleFormControlSelect1").value;
   console.log(withinDistance);
   if (zipCode == "")
    return;
   else {
   getWeatherApi(zipCode)
   }
})