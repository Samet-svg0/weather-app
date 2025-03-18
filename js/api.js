// BaseUrl
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "d4dbd406439d567485abdbaaa5c46db6";



const getFlagUrl = (countryCode) =>

`https://flagcdn.com/w80/${countryCode.toLocaleLowerCase()}.png`;




//Hva durumu verilerini alan fonksiyon

const getWeather = async (city) => {

try{
    const response = await fetch(
        `${baseUrl}?q=${city}&units=metric&appid=${apiKey}&lang=tr`);
    
     const weatherData = await response.json();

     if (!response.ok) {
        throw new Error("Aratılan şehir bulunamadı");
      }

 
     


   return weatherData;
} catch (eror) {
    throw eror;


}

};






export{getWeather,getFlagUrl};