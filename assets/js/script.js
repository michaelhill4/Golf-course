// Finally, You must add your project to the portfolio that you created in Module 2.

var fetchbutton = document.querySelectorAll(".btn btn-primary")
var searchContainer = document.getElementById("results")
var locationEl = document.getElementById("location")
var tempEl = document.getElementById("temp")
var skyTextEl = document.getElementById("weatherText")
var exampleZipCode = document.getElementById("exampleZipCode")
var windEl = document.getElementById("wind")


function golfDetailsApi() {
        const options = {
                method: 'GET',
                headers: {
            'X-RapidAPI-Key': '804debc86amsh91473b414b0f4a2p1cd0cfjsncf3998336eab',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }

    };
    
    fetch('https://golf-course-finder.p.rapidapi.com/course/details?zip=93953&name=Pebble%20Beach%20Golf%20Links', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }

// golf course fetch call for Columbus coordinates within x mile radius
const golfApi = function (params) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '804debc86amsh91473b414b0f4a2p1cd0cfjsncf3998336eab',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }
    }
    fetch(`https://golf-course-finder.p.rapidapi.com/courses?radius=${params.radius}&lat=${params.lat}&lng=${params.long}`, options)
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


const getLongLat = function(zipCode, radius){
    var long = ""
    var lat = ""
    const apiKey = "113605930247714900398x83872"
    console.log(`passed zip code = ${zipCode}`)
    console.log(`passed radius = ${radius}`)
    fetch(`https://geocode.xyz/+${zipCode}+?json=1&auth=${apiKey}`) 
    .then(function(response){
        console.log(response)
        return response.json()
        
    })
    .then(function(data){
        console.log(data)
        console.log(`inner radius = ${radius}`)
        long = data.longt
        lat = data.latt
        // console.log(lat)
        // console.log(long)
        let params = {
            long,
            lat,
            radius
        }
        console.log(params)

        golfApi(params)
    })
}

function renderLastData() {
    var cityData = localStorage.getItem("savedCity");
    var tempData = localStorage.getItem("savedTemp");
    var skyData = localStorage.getItem("savedSky");
    var windData = localStorage.getItem("savedWind");
    
    locationEl.textContent = ("City: " + cityData);
    tempEl.textContent = ("Temperature: " + tempData + "°F");
    skyTextEl.textContent = ("Weather: " + skyData);
    windEl.textContent = ("Wind Speed: " + windData + "mph");
}

//Columbus weather fetch call
function getWeatherApi(zipCode) {
    console.log("my past data is " + zipCode)
    let param = zipCode
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${param},us&units=imperial&appid=01c6acda042379425ee30a68789c29c5`;
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var wCity = data.city.name
        localStorage.setItem("savedCity", wCity)
        
        var wTemp = data.list[0].main.temp
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
    var radius = document.getElementById("exampleFormControlSelect1").value;
   if (zipCode === "")
    return;
   else {
    getLongLat(zipCode, radius)
    getWeatherApi(zipCode)
   }
})

renderLastData()