let params = new URLSearchParams(window.location.search);
let countryName = params.get("name");


if (!countryName) {
  console.error("Country name missing in URL");
}


const flagimage = document.querySelector(".country-details img");
const countryNameh1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subregion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const bordercountries = document.querySelector(".border-countries");

fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName || "")}`)
  .then(res => res.json())
  .then((data) => {

    if (!data || !data[0]) {
      console.error("No country data found");
      return;
    }

    const country = data[0];

    flagimage.src = country.flags?.svg || "";
    countryNameh1.innerText = country.name?.common || "Unknown";

    if (country.name?.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0]?.common || country.name.common;
    } else {
      nativeName.innerText = country.name.common;
    }

    population.innerText = country.population?.toLocaleString('en-PK') || "N/A";
    region.innerText = country.region || "N/A";
    subregion.innerText = country.subregion || "N/A";

    capital.innerText = country.capital ? country.capital[0] : "N/A";

    topLevelDomain.innerText = country.tld ? country.tld[0] : "N/A";

    currencies.innerText =
      Object.values(country.currencies ?? {})[0]?.name || "No Currency";

    languages.innerText =
      Object.values(country.languages ?? {}).join(", ") || "No Languages";

  
    if (country.borders) {
      country.borders.forEach((border) => {

        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then(res => res.json())
          .then(([borderCountry]) => {

            const bordercountrytag = document.createElement("a");
            bordercountrytag.innerText = borderCountry.name.common;

            bordercountrytag.href =
              `./country.html?name=${encodeURIComponent(borderCountry.name.common)}`;

            bordercountries.appendChild(bordercountrytag);
          });
      });
    }

  })
  .catch(err => console.error("Fetch error:", err));



let back = document.querySelector(".back-button");

back.addEventListener("click", () => {
  history.back();
});