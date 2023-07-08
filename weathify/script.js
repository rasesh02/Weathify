let weather={
  apikey: "f96e551c7b8b3bfdde7b62a03af2e0d8",
 //"apikey": "ecbb3886f8fe3f8258d1cae670ce6cde",
// https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=f96e551c7b8b3bfdde7b62a03af2e0d8
//https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=f96e551c7b8b3bfdde7b62a03af2e0d8
 
fetchWeather: function(city){
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apikey
        
        //"&appid="+this.apikey
       // "&units=metric&appid=" +
    ).then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => this.displayWeather(data));
 },
 displayWeather: function(data){
   const {name} =data;
   const {icon, description}=data.weather[0];
   const {temp,humidity} =data.main;
   const {speed}=data.wind;
   //console.log(name,icon, description,temp,humidity,speed);
   document.querySelector(".city").innerText="Weather in "+ name;
   document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
   document.querySelector(".description").innerText=description;
   document.querySelector(".temp").innerText=temp+ "°C";
   document.querySelector(".humidity").innerText= "Humidity :"+ humidity+"%";
   document.querySelector(".wind").innerText ="Wind speed: " + speed + " km/h";
   //document.querySelector(".weather").classList.remove("loading");
   document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
 },
 // takes the city that user enters
 search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
 }
};
// search city that is entered
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();  //make use of the search function
  });
// instead of search button, user writes the city and presses enter
document.querySelector(".search-bar").addEventListener("keyup",function() {
    if(Event.key=="Enter") {
        weather.search();
    }
})
weather.fetchWeather("Delhi");
