const API = {
    CREATE: {
        URL: "http://localhost:3000/teams-json/create",
        METHOD: "POST" // POST
    },
    READ: {
        URL: "http://localhost:3000/teams-json",
        METHOD: "GET"
    },
    UPDATE: {
        URL: "http://localhost:3000/teams-json/update",
        METHOD: "PUT"
    },
    DELETE: {
        URL: "http://localhost:3000/teams-json/delete",
        METHOD: "DELETE" // DELETE
    }
};

let editId;

function insertPersons(persons) {
    const tbody = document.querySelector('#list tbody');
    tbody.innerHTML = getPersonsHtml(persons);
}

function getPersonsHtml (persons) {
    return persons.map(getPersonHtml).join("");
}

function getPersonHtml (person) {
    const gitHub = person.gitHub;
    return `<tr>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td><a target="_blank" href="https://github.com/${gitHub}">Github</a></td>
        <td>
            <a href="#" class="edit-row" data-id="${person.id}">&#9998;</a>
            <a href="#" class="delete-row" data-id="${person.id}">&#10006;</a>           
        </td>
    </tr>`;
}

let allPersons = [];

function loadList() {
    fetch(API.READ.URL)
        .then(res => res.json())
        .then(data => {
            allPersons = data;
            insertPersons(data);
        });
}

loadList();

function searchPersons(text) {
    text = text.toLowerCase();
    console.warn("search", text);
    return allPersons.filter(person => {
        return person.firstName.toLowerCase().indexOf(text) > -1 ||
            person.lastName.toLowerCase().indexOf(text) > -1;
    });
}

function saveTeamMember() {
    const firstName = document.querySelector("#list input[name=firstName]").value;
    const lastName = document.querySelector("input[name=lastName]").value;
    const gitHub = document.querySelector("input[name=gitHub]").value;
    
    const person = {
        firstName,
        lastName,
        gitHub: gitHub
    };
   
    fetch(API.CREATE.URL, {
        method: API.CREATE.METHOD,
        headers: {
            "Content-Type": "application/json"
          },
        body: API.CREATE.METHOD === "GET" ? null : JSON.stringify(person)
    })
        .then(res => res.json())
        .then(r => {
            console.warn(r);
            if (r.success) {
                console.info('refresh list');
                loadList();
            }
        });
}

function deleteTermMember(id) {
    fetch("http://localhost:3000/teams-json/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      }).then(res => res.json()).then(
          r => {
            loadList();
          }
      );
}

function updateTeamMember() {
    const firstName = document.querySelector("#list input[name=firstName]").value;
    const lastName = document.querySelector("input[name=lastName]").value;
    const gitHub = document.querySelector("input[name=gitHub]").value;
    
    const person = {
        id: editId,
        firstName,
        lastName,
        gitHub: gitHub
    };

    fetch(API.UPDATE.URL, {
        method: API.UPDATE.METHOD,
        headers: {
            "Content-Type": "application/json"
          },
        body: API.CREATE.METHOD === "GET" ? null : JSON.stringify(person)
    })
        .then(res => res.json())
        .then(r => {
            console.warn(r);
            if (r.success) {
                console.info('refresh list');
                loadList();
            }
        });

    editId=null;
    clearImput();
}


function populateCurrTeamMember (id) {
        let person =  allPersons.find(person => person.id === id);

        editId = id;

        const firstName = document.querySelector("#list input[name=firstName]");
        const lastName = document.querySelector("input[name=lastName]");
        const gitHub = document.querySelector("input[name=gitHub]");

        firstName.value = person.firstName;
        lastName.value = person.lastName;
        gitHub.value = person.gitHub;
    }


function clearImput () {
    const firstName = document.querySelector("#list input[name=firstName]");
       const lastName = document.querySelector("input[name=lastName]");
       const gitHub = document.querySelector("input[name=gitHub]");

       firstName.value = null;
       lastName.value =null;
       gitHub.value = null;
}

function addEventListeners () {    
    const search = document.getElementById('search');
    search.addEventListener("input", e => {
        const text = e.target.value;

        const filtrate = searchPersons(text);
        console.info({filtrate})

        insertPersons(filtrate);
    });

    const saveBtn = document.querySelector("#list tfoot button");
    saveBtn.addEventListener("click", () => {
        if (editId) {
            updateTeamMember();
        }
        else {
        saveTeamMember();
        clearImput();
        }
    });

    const table = document.querySelector("#list tbody");

    table.addEventListener("click", (e) => {
        const target= e.target;
        if ( target.matches("a.delete-row")) {
            const id  = target.getAttribute("data-id");
            console.log("delete row", id);
            deleteTermMember(id)
        } else if (target.matches("a.edit-row")) {
            const id  = target.getAttribute("data-id"); 
            populateCurrTeamMember (id);
        }
    });
}

addEventListeners ();
