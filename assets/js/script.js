// Finally, You must add your project to the portfolio that you created in Module 2.

var fetchbutton = document.querySelectorAll(".btn btn-primary")
var searchContainer = document.getElementById("results")
var locationEl = document.getElementById("location")
var tempEl = document.getElementById("temp")
var skyTextEl = document.getElementById("weatherText")
var exampleZipCode = document.getElementById("exampleZipCode")
var windEl = document.getElementById("wind")

function golfDetailsApi(courseData) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3e38d9e2e5mshc43ea6ad6165a78p14752ajsn916fc14b5b60',
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
  

// golf course fetch call for Columbus coordinates within x mile radius
const golfApi = function (params) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3e38d9e2e5mshc43ea6ad6165a78p14752ajsn916fc14b5b60',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }
    }
    fetch(`https://golf-course-finder.p.rapidapi.com/courses?radius=${params.radius}&lat=${params.lat}&lng=${params.long}`, options)
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
    cardContainer.setAttribute("class", "card w-100")
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
    const apiKey = "664674705834810537856x74089"
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