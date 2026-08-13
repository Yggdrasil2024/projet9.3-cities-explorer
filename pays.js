// Le pont JS -> page. À recopier tel quel dans chaque projet S7 à S9.
const sortie = document.querySelector("#sortie");
function afficher(html) {
  sortie.innerHTML += html;
}

//declaration des constantes
const POPULATION = "ASC";
const REGION = [
  "Afrique",
  "Europe",
  "Amerique",
  "Asie",
  "Oceanie",
  "Arctique",
  "Antarctique",
];

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
          nom: item.name,
          capitale: item.capital,
          population: item.population,
          région: item.region,
          langues: item.languages
            ? item.languages.map((l) => l.name).join(", ")
            : "non specifiées",
          drapeau: item.flags.png || item.flags.svg,
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
 * fonction pour rengar
 * @param {string} POPULATION - croissante ou decroissante
 * @returns {Array} - pays rangé
 */
const sortByPopulation = (POPULATION) {
  return POPULATION === "ASC" ? PAYS.sort((a, b) => a.population - b.population) : PAYS.sort((a, b) => b.population - a.population);
}





getAllCountries();
console.log(PAYS);
