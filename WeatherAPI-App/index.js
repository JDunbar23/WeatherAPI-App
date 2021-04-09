// listens for the web page being loaded / reloaded and then executes arrow function
window.addEventListener('load', ()=> {

    // set the variables
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    // use the built in navigator.geolocation function to get our current location and set our variables
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => { // get location from the browser

            // set variables from built in browser location
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // set our api variable with the api link and our unique api key
            const API = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units&appid=6f0e034af15f24cb783901d5677d3e14`;

            // fetch and display data only when it is received
            fetch(API).then(response =>{

                return response.json(); // turns received response into json file
            })
            .then(data =>{
                console.log(data); // takes the response json file and puts it in the variable data and displays it in the console

                const {temp} = data.main; // gets temp data field from the api main section and stores it in variable
                const {description} = data.weather[0]; // gets description data field from the api weather section and stores it in variable

                // set DOM elements from API
                tempDegree.textContent = Math.round(temp - 273.15);
                tempDescription.textContent = description;
                locationTimezone.textContent = data.name; // no need to store in a variable just pull it from the api
            });
        });
    }

});





// might need these if api not working locally
//const proxy = "https://cors-anywhere.herokuapp.com/";
//const API = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units&appid=6f0e034af15f24cb783901d5677d3e14`;