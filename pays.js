// Le pont JS -> page. À recopier tel quel dans chaque projet S7 à S9.
const sortie = document.querySelector("#sortie");
function afficher(html) {
  sortie.innerHTML += html;
}

//declaration des constantes
const POPULATION = { ASC: "ASC", DEC: "DEC" };
const REGION = {
  AFRICA: "Africa",
  AMERICAS: "Americas",
  ASIA: "Asia",
  EUROPE: "Europe",
  OCEANIA: "Oceania",
  ANTARCTIC: "Antarctic",
};

const PAYS = [];

const PLACEHOLDER_CARD = `<article class="card loading-cards">
<div class="placeholder"></div>
<p><strong>Capitale</strong></p>
<p><strong>Capitale</strong></p>
</article>`;

/**
 * fonction pour afficher
 * @returns {string} - html, cards de chargement
 */
const displayPlaceholders = () => {
  let htmlPlaceholder = ``;
  for (let index = 0; index < 16; index++) {
    htmlPlaceholder += PLACEHOLDER_CARD;
  }
  return htmlPlaceholder;
};

/**
 * fonction qui recoupere les pays et
 * les mets dans une constante
 * @returns {boolean}
 */
const getAllCountries = async () => {
  //page de chargement
  let loader = displayPlaceholders();
  afficher(loader);

  try {
    //appel d'api
    let response = await fetch("https://countries.dev/countries");
    let data = await response.json();
    console.log(typeof data);

    //on charge les pays dans une canstante
    //pour economiser les appels d'API
    if (Array.isArray(data)) {
      data.forEach((item) => {
        PAYS.push({
          name: item.translations?.fr || item.name,
          capital: item.capital,
          population: item.population,
          region: item.region,
          languages: item.languages
            ? item.languages.map((l) => l.name).join(", ")
            : "non specifiées",
          flag: item.flags.png || item.flags.svg,
        });
      });
    } else {
      throw `une erreur s'est produite au niveau de la transformation des donnée en array`;
    }

    return true;
  } catch (error) {
    sortie.innerHTML = "";
    let errorMessage = `<div class="error-massage">
                <article class="card real-error">
                    <h2>Erreur</h2>
                    <p>une erreur s'est produite lors du chargement veuiller ressayer plus tard.</p>
                    <a href="index.html">reessayer</a>
                </article>`;
    afficher(errorMessage);
    console.log(error);
    return false;
  }
};

/**
 * fonction qui va filtre les pays par region
 *
 * @param {string} region - la region
 * @returns
 */
const filterByRegion = (region) => {
  return PAYS.filter(
    (item) => item.region.toLowerCase() === region.toLowerCase(),
  );
};

/**
 * fonction pour faire une recherche
 * un tableau
 * @param {string} term
 * @returns {Array} - le ou les pays contenant le terme
 */
const fitlerbyTerm = (term) => {
  return PAYS.filter((item) =>
    item.name.toLowerCase().includes(term.toLowerCase()),
  );
};

/**
 * fonction pour ranger les pays
 *
 * @param {Array} - les pays a ranger
 * @param {string} POPULATION - croissante ou decroissante
 * @returns {Array} - pays rangé
 */
const sortByPopulation = (pays, POPULATION) => {
  return POPULATION === "ASC"
    ? pays.sort((a, b) => a.population - b.population)
    : pays.sort((a, b) => b.population - a.population);
};

/**
 * fonction pour construire le html a afficher
 *
 * @param {Array} countries - liste de pays
 * @returns {true}
 */
const countriesToHTML = (countries) => {
  let countriesTemplate = ``;
  for (country of countries) {
    countriesTemplate += `<article class="card">
                <img src="${country.flag}" alt="drapeau ${country.name}">
                <div class="card-body">
                    <h2>${country.name}</h2>
                    <p>Capitale:<strong> ${country.capital}</strong></p>
                    <p>Nbre d'habitant: <strong>${country.population.toLocaleString("fr-FR")}</strong> Hbts</p>
                    <p>Langues:<strong> ${country.languages}</strong></p>
                </div>
            </article>`;
  }
  return countriesTemplate;
};

const launchApp = async () => {
  let allLoaded = await getAllCountries();

  if (allLoaded) {
    sortie.innerHTML = "";
    let pays = fitlerbyTerm("");
    if (pays.length === 0) {
      afficher(
        `<p class="error-massage">aucune correspondance n'a été trouvée.</p>`,
      );
    }
    let sortcountries = sortByPopulation(pays, POPULATION.DEC);
    let countries = countriesToHTML(sortcountries);
    afficher(countries);
  }
};

launchApp();
