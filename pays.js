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
const PLACEHOLDER_CARD = `<article class="card loading-cards">
<div class="placeholder"></div>
<p><strong>Capitale</strong></p>
<p><strong>Capitale</strong></p>
</article>`;



