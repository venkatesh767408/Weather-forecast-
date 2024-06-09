
wheatherform=document.querySelector(".wheatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="6f49e63f47037958c343c2e9571b354e";
wheatherform.addEventListener("submit", async event =>{
   event.preventDefault();
   const city=cityinput.value;
   if(city){
    try{
       const wheatherData=await getweatherdata(city);
       dispalyweatherinfo(wheatherData);
    }catch(error){
        displayerror(error);
    }

   }else{
    displayerror("please Enter a city")
   }
});
async function getweatherdata(city){
  const url=`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;
  const response=await fetch(url);
  const data=await response.json();
  if(!response.ok){
    throw new error("Sorry we can't fetch the Data");
  }
 return data;
  
}

function dispalyweatherinfo(data){
    const { name: city } = data.city;
    const { main: { humidity, temp }, weather: [{ description, id }] } = data.list[0];
    card.textContent="";
    card.style.display="flex";
    const citydiplay=document.createElement("h1");
    const tempdiplay=document.createElement("p");
    const humiditydiplay=document.createElement("p");
    const desdisplay=document.createElement("p");
    const wheatherEmojidisplay=document.createElement("h1");

    citydiplay.textContent=city;
    tempdiplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    humiditydiplay.textContent=`humidity:${humidity}%`;
    desdisplay.textContent=description;
    const emoji=getweatherEmoji(id);
    wheatherEmojidisplay.innerHTML=emoji;

    citydiplay.classList.add("cityDisplay");
    tempdiplay.classList.add("tempDisplay");
    humiditydiplay.classList.add("humidity");
    desdisplay.classList.add("descDisplay");
    wheatherEmojidisplay.classList.add("weatherEmoji")

    card.appendChild(citydiplay);
    card.appendChild(tempdiplay);
    card.appendChild(humiditydiplay);
    card.appendChild(desdisplay);
   card.appendChild(wheatherEmojidisplay);
    
    
}
function getweatherEmoji(id){
    console.log(id);
    switch(true){
        case id < 300:
            return "⛈️";
        case id<400:
            return "🌧️";
        case id<600:
            return "🌦️";
        case id<700:
            return "❄️";
        case id<800:
            return "🌫️";
        case id==800:
            return "☀️";
        default:
            return "☁️";
        
    }
    
}

function displayerror(message){
    const errordisplay=document.createElement('p');
    errordisplay.textContent=message;
    errordisplay.classList.add("errorDisplay");
    card.style.display='flex';
    card.appendChild(errordisplay)
    
   
    

}

          

  
