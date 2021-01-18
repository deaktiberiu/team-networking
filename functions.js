
function insertPersons(data) {
    const tbody = document.querySelector('#list tbody'); 
    tbody.innerHTML = getPersonsHtml(data);
    }

function getPersonsHtml (persons) {
    return  persons.map(getPersonHtml).join('');    
    }

function getPersonHtml (person) {   
    return `<tr>
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td class="end-cell"><a target="_blank" href="https://github.com/${person.gitHub}">Git</a></td> 
            </tr>`;
    }

let allPersons= [];
let data = [] ;

fetch('team.json')
    .then(res => res.json())
    .then(data => {
        allPersons= data;
        insertPersons(data);
    });
    
function searchPersons(text) {
   return allPersons.filter(person => {
       return person.firstName == text;
   }); 
}

const search= document.getElementById('search'); 
search.addEventListener("input", e => {
    var text = e.target.value; 
    const filtrate = searchPersons(text);
    insertPersons(filtrate);
});

