function insertPersons(data) {
    const tbody = document.querySelector('#list tbody'); 
    tbody.innerHTML = getPersonsHtml(data);
    }



function getPersonsHtml (persons) {
    const personsLi = persons.map(function(persons){
        return `<tr>
                <td>${persons.firstName}</td>
                <td>${persons.lastName}</td>
                <td><a target="_blank" href="https://github.com/${persons.gitHub}">Git</a></td> 
            </tr>`; 
        
    });
    console.log(typeof personsLi, personsLi)
    return personsLi.join('');
    
    }

fetch('team.json')
    .then(res => res.json())
    .then(data => {
        insertPersons(data);
    });

