import { getFlagUrl, getWeather } from "./api.js";
import {displayWeather, elements, hideError, hideLoader, showError, showLoader, updateThemeIcon } from "./ui.js";
import cities from "./constants.js";

const body = document.body;

// Theme attribute
const savedTheme = localStorage.getItem("data-theme") || "light";

// Body'e tema attribute'ünü aktar
body.setAttribute("data-theme", savedTheme);

console.log(savedTheme);



// Theme butonuna tıklanınca çalışacak fonksiyon
elements.themeBtn.addEventListener("click", () => {

     // Mevcut theme ya eriş
  const currentTheme = body.getAttribute("data-theme");
  console.log(currentTheme);

    // Yeni theme'yı belirle
    const newTheme = currentTheme === "light" ? "dark" : "light";

    body.setAttribute("data-theme", newTheme);

    localStorage.setItem("data-theme", newTheme);

    updateThemeIcon(savedTheme);


});





// Sayfa yüklendiği anda
document.addEventListener("DOMContentLoaded", () => {
    // Options oluştur
    createOption(cities);
  });




// Form gönderildiğinde çalışacak fonksiyon



elements.form.addEventListener("submit", async (e) => {


    e.preventDefault();
   const query = e.target[0].value.trim();

 // Eğer input boş ise fonksiyonu durdur
 if (!query) {
    alert("Şehir isminin girilmesi zorunludur.Lütfen şehir adı giriniz.");
    return;
}



   showLoader();


   try {
    const weatherData = await getWeather(query);

    const flagUrl = getFlagUrl(weatherData.sys.country);

    displayWeather(weatherData,flagUrl);
    hideError();
   } catch (eror) {
    showError();

   }finally {

    hideLoader();
    
   }

   

   
 


   

});


// Data-list için option'lar oluşturan fonksiyon
const createOption = (cities) => {
// Dışarıdan verilen şehir dizisini dön ve herbir dizi elemanı için bir option oluştur
cities.forEach((city) => {

 // Her eleman için bir option oluştur
 const option = document.createElement("option");

// Optionların value'sunu şehir adı olarak ayarla
option.value=city

 // Oluşturulan optionları html kısmındaki data-list elemanının içerisine aktar
 elements.citiesDataList.appendChild(option);


 
});
};




  



