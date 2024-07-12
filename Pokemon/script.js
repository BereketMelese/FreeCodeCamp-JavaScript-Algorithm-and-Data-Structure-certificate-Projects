const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const imgContainer = document.getElementById("img-container");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const sAttack = document.getElementById("special-attack");
const sDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const circleElement = document.querySelectorAll('.circle');

const pokemonData = async() => {
    try {
        const Pname = input.value.toLowerCase();
        const Prespone = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${Pname}`);
        const result = await Prespone.json();

        imgContainer.innerHTML = `<img id="sprite" src="${result.sprites.front_default}" alt="${result.name} front default sprite">`;
        types.innerHTML = result.types.map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`).join('');
        pokemonName.textContent = `${result.name}`;
        pokemonId.textContent = `${result.id}`;
        weight.textContent = `Weight: ${result.weight}`;
        height.textContent = `Height: ${result.height}`;

        hp.textContent = result.stats[0].base_stat;
        attack.textContent = result.stats[1].base_stat;
        defense.textContent = result.stats[2].base_stat;
        sAttack.textContent = result.stats[3].base_stat;
        sDefense.textContent = result.stats[4].base_stat;
        speed.textContent = result.stats[5].base_stat;
        
        for (i = 0; i < circleElement.length; i++) {
            circleElement[i].setAttribute('data-percentage', result.stats[i].base_stat * 1);//for some reason leaving "result.stats[i].base_stat" alone causes the tests to fail
            const degrees = (result.stats[i].base_stat / 100) * 360;
            circleElement[i].style.setProperty('--percentage', `${degrees}deg`); 
        }

    } catch(err) {
        alert("Pokémon not found");
        console.log(err);
    }
};

button.addEventListener("click", e=>{
    e.preventDefault();
    pokemonData();
});


