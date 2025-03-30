// add button variables to the DOM
// add list variable to the DOM so that the future jokes can be saved there
// save in locale storage
// the jokes have to remain in the page if we reload it
/* HTML
    <h1>Chuck Norris Jokes</h1>
    <button id="fetchJoke">Obtener Chiste</button>
    <ul id="jokeList"></ul>
*/

// free chick api = https://api.chucknorris.io/jokes/random

const btnJoke = document.getElementById('fetchJoke');
const list = document.getElementById('jokeList');
const btnDelAll = document.getElementById('deleteAll');
let jokeArray = loadLS();

window.addEventListener('DOMContentLoaded', () => {
    jokeArray.forEach(joke => addJokeToDOM(joke));
})


function getJoke() {
    return fetch ('https://api.chucknorris.io/jokes/random')
    .then (response => {
        if (!response.ok) throw new Error (`Erros: ${response.status}`)
            return response.json()
    })
    .then (data => {
        const jokeText = data.value;
        jokeArray.push(jokeText);
        saveToLS(jokeArray);
        addJokeToDOM(jokeText)
        })
    .catch(error => {
        const li = document.createElement('li')
        li.textContent = `Error: ${error.message}`
        list.appendChild(li);
    });
}


function addJokeToDOM(jokeText) {
    const li = document.createElement('li');
    li.textContent = jokeText;
  
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Delete joke';
  
    btnDel.addEventListener('click', () => {
      li.remove();
      jokeArray = jokeArray.filter(joke => joke !== jokeText);
      saveToLS(jokeArray);
    });
  
    li.appendChild(btnDel);
    list.appendChild(li);
  }


btnJoke.addEventListener ('click', getJoke);

btnDelAll.addEventListener('click', () => {
    list.innerHTML = '';
    jokeArray = [];
    removeFromLS();
})

function saveToLS(jokeArray) {
    localStorage.setItem('jokes', JSON.stringify(jokeArray));
}

function loadLS() {
    const store = localStorage.getItem('jokes');
    return store ? JSON.parse(store) : [];
}

function removeFromLS() {
    localStorage.removeItem('jokes');
}