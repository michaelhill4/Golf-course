
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


var locationEl = document.getElementById("location")

var tempEl = document.getElementById("temp")
var skyTextEl = document.getElementById("weatherText")
var exampleZipCode = document.getElementById("exampleZipCode")
var windEl = document.getElementById("wind")
var appendCards = document.getElementById("appendCards")

function renderLastData() {
    var cityData = localStorage.getItem("savedCity");
    var tempData = localStorage.getItem("savedTemp");
    var skyData = localStorage.getItem("savedSky");
    var windData = localStorage.getItem("savedWind");

    locationEl.textContent = ("City: " + cityData);
    tempEl.textContent = ("Temperature: " + tempData + "°F");
    skyTextEl.textContent = ("Weather: " + skyData);
    windEl.textContent = ("Wind Speed: " + windData);
}

function golfDetailsApi(courseData) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '804debc86amsh91473b414b0f4a2p1cd0cfjsncf3998336eab',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }

    };
    
    fetch(`https://golf-course-finder.p.rapidapi.com/course/details?zip=${courseData.zip_code}&name=${courseData.name}`, options)
        .then(function(response){

            return response.json()
        })
        .then(function(data){

            console.log(data);
            var courseDataRender = data
            renderCard(courseDataRender)
        })
       
    }
  

const golfApi = function (params) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '804debc86amsh91473b414b0f4a2p1cd0cfjsncf3998336eab',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }
    }
fetch(`https://golf-course-finder.p.rapidapi.com/courses?radius=${params.radius}&lat=${lat}&lng=${long}`, options)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    if(data.courses.length > 0){
        
        for (var i=0; i < 10; i++){
            let courseData = data.courses[i]
            // renderCard(courseData)
            golfDetailsApi(courseData)
        
        }
        
              
    }
    
    })
}
const renderCard = function(courseDataRender){
    console.log(`The data that was passed into this function is ${courseDataRender}`)
    var cardContainer = document.createElement("div")
    var cardBodyDiv = document.createElement("div")
    var cardHeader = document.createElement("h5")
    var cardBody = document.createElement("p")
    var cardButton = document.createElement("a")
    cardContainer.append(cardBodyDiv)
    cardBodyDiv.append(cardHeader, cardBody, cardButton)
    cardContainer.setAttribute("class", "card w-25")
    cardBodyDiv.setAttribute("class", "card-body")
    cardHeader.setAttribute("class", "card-title")
    cardBody.setAttribute("class", "card-text")
    cardButton.setAttribute("class", "btn btn-primary")
    cardHeader.textContent = `${courseDataRender.course_details.result.name}`
    cardBody.textContent = `${courseDataRender.course_details.result.formatted_address}`
    cardButton.textContent = `link to course`
    cardButton.setAttribute("href",`${courseDataRender.course_details.result.url}`)
    appendCards.append(cardContainer)
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
            console.log(wCity)
            locationEl.append(wCity)

            var wTemp = parseInt(data.list[0].main.temp)
            tempEl.append(wTemp + "°F")

            var wSky = data.list[0].weather[0].main
            skyTextEl.append(wSky)
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