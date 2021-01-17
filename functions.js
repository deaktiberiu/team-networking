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
                <td><a target="_blank" href="https://github.com/${person.gitHub}">Git</a></td> 
            </tr>`;
    }

fetch('team.json')
    .then(res => res.json())
    .then(data => {
        insertPersons(data);
    });

