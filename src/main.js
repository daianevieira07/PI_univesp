import { selectName, selectFilter, selectWeak, orderPokes, calc }
  from './data.js';
import data from './data/pokemon/pokemon.js';

document.getElementById("home").onclick = () => (
  window.open("index.html"));

document.getElementById("play").onclick = () => (
  window.open("https://www.pokemongo.com/pt-pt/"));

document.getElementById("btn-all").onclick = () => (
  document.location.reload(true));

window.onscroll = () => (
  scroll());

const scroll = () => {
  let btnTop = document.getElementById("btn-top")
  if (document.documentElement.scrollTop > 0) {
    btnTop.style.display = "block"
  } else {
    btnTop.style.display = "none"
  }
}
document.getElementById("btn-top").onclick = function scrollTop(evt) {
  evt.preventDefault();
  window.scrollTo(0, 0);
};

function pokemonImage(idPoke, route) {
  const way = route[idPoke];
  let box = `
      <div class="column pokemon backgray" id="pokemon${way.id}" data-id="${way.id}" >
      <img class="pokes-img" src=${way.img}>
      <p class="text">${way.name}</p>
      </div>
`;
  return box;
}

const imageHtml = (route) => {
  let htmlCards = '';
  for (let i = 0; i < route.length; i++) {
    htmlCards += pokemonImage(i, route)
  }
  document.getElementById("div-pokes").innerHTML += htmlCards;
}
imageHtml(data.pokemon);
const pokemons = document.getElementsByClassName("pokemon");
const loadModal = () => {
  for (const pokemon of pokemons) {
    pokemon.onclick = () => {
      const id = pokemon.getAttribute("data-id");
      openModal(id)
    };
  }
}
loadModal();
const openModal = (index) => {
  const way = data.pokemon.find(pokemon => pokemon.id == index)
  let box2 = `
      <div class="column-modal backgray" >
      <img src=${way.img}>
      <p> ${way.name}</p>
      <p> Tipo:${way.type}<br/>
       Candy:${way.candy}<br/>
       Altura:${way.height}<br/>
       Peso:${way.weight}<br/>
       Fraqueza:${way.weaknesses}<br/>
       Chance de captura:${way.spawn_chance}<br/>
       Evolução Anterior:${way.prev_evolution ? way.prev_evolution[0].name : "Não tem evolução"}<br/>
       Proxima Evolução:${way.next_evolution ? way.next_evolution[0].name : "Não tem evolução"}</p>
      </div>`
  let modal = document.getElementById("details");
  let span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  document.getElementById("modal1").innerHTML = box2;
  span.onclick = () => {
    modal.style.display = "none";
  }
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
    (box2);
  }
}
const clearForName = () => {
  document.getElementById("filter-type").value = "";
  document.getElementById("div-calc").innerHTML = "";
  document.getElementById("filter-weakness").value = "";
  document.getElementById("order-search").value = "";
}

const clearForType = () => {
  document.getElementById("name-pokemon").value = "";
  document.getElementById("filter-weakness").value = "";
  document.getElementById("order-search").value = "";

}
const clearForWeakness = () => {
  document.getElementById("name-pokemon").value = "";
  document.getElementById("filter-type").value = "";
  document.getElementById("div-calc").innerHTML = "";
  document.getElementById("order-search").value = "";
}

const clearForOrder = () => {
  document.getElementById("name-pokemon").value = "";
  document.getElementById("filter-type").value = "";
  document.getElementById("div-calc").innerHTML = "";
  document.getElementById("filter-weakness").value = "";
}
document.getElementById("name-pokemon").oninput = () => {
  const htmlCards = document.getElementById("div-pokes")
  htmlCards.innerHTML = ""
  const pokesName = document.getElementById("name-pokemon").value;
  const searched = selectName(data.pokemon, pokesName)
  imageHtml(searched)
  loadModal()
  clearForName()
}
document.getElementById("filter-type").onchange = () => {
  const htmlCards = document.getElementById("div-pokes")
  htmlCards.innerHTML = ""
  const filterType = document.getElementById("filter-type").value;
  const filtered = selectFilter(data.pokemon, filterType)
  imageHtml(filtered)
  loadModal()
  clearForType()
  percent()
};
const percent = () => {
  const filterType = document.getElementById("filter-type").value;
  const result = calc(data.pokemon, filterType)
  document.getElementById("div-calc").innerHTML = `Temos ${result} % de pokemons desse tipo .`
}

document.getElementById("filter-weakness").onchange = () => {
  const htmlCards = document.getElementById("div-pokes")
  htmlCards.innerHTML = ""
  const weakFilter = document.getElementById("filter-weakness").value;
  const searched = selectWeak(data.pokemon, weakFilter)
  imageHtml(searched)
  loadModal()
  clearForWeakness()
}

document.getElementById("order-search").onchange = () => {
  const htmlCards = document.getElementById("div-pokes")
  htmlCards.innerHTML = ""
  const searchOrder = document.getElementById("order-search").value;
  const ordered = orderPokes(data.pokemon, searchOrder)
  imageHtml(ordered)
  loadModal()
  clearForOrder()
}