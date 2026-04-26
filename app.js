
const countriescontainer=document.querySelector(".countries-container")
const filterByRegion=document.querySelector(".filter-by-region")
const searchInput=document.querySelector(".search-input")
const darkMode=document.querySelector(".dark-mode")
const body=document.querySelector("body")
let allcountriesData


fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,subregion,currencies,languages,borders,maps").
then((res)=>res.json()).
then((data)=>{
   rendercountries(data)
    allcountriesData=data
    console.log(allcountriesData)
})


filterByRegion.addEventListener("change",(e)=>{
   fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).
then((res)=>res.json()).
then((data)=>{
 rendercountries(data)

})
})


searchInput.addEventListener("input", (e) => {

  const value = e.target.value.toLowerCase();

  const filteredCountries = allcountriesData.filter((country) => {
    return country.name.common.toLowerCase().includes(value);
  });

  rendercountries(filteredCountries);
});




function rendercountries(data){
    countriescontainer.innerHTML=""
   data.forEach((country) => {
        const countryCard=document.createElement("a")
countryCard.classList.add("country-card")
countryCard.href = `../countrydata/country.html?name=${country.name.common}`
countryCard.innerHTML=`
               <img src="${country.flags.svg}" alt="${country.name.common}">
               <div class="card-text">
                 <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population:  </b>${country.population.toLocaleString("en-Pk")}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital[0]}</p>
               </div>
`
countriescontainer.appendChild(countryCard)
    });
}

let boolean=false

darkMode.addEventListener("click",()=>{
    if(!boolean){
        body.classList.add("dark")
        boolean=true
    }
    else{
        body.classList.remove("dark")
        boolean=false;
    }
})