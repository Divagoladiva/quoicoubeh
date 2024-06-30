const app = document.getElementById('app');

let data = {
    classes: []
};

// Charger les données depuis le localStorage
function loadData() {
    const savedData = localStorage.getItem('gestionClasses');
    if (savedData) {
        data = JSON.parse(savedData);
    }
}

// Sauvegarder les données dans le localStorage
function saveData() {
    localStorage.setItem('gestionClasses', JSON.stringify(data));
}

function render() {
    app.innerHTML = '';

    data.classes.forEach((classe, index) => {
        const classDiv = document.createElement('div');
        classDiv.classList.add('class');

        const title = document.createElement('h2');
        title.textContent = classe.nom;
        title.onclick = () => {
            toggleClassDetails(index);
        };

        classDiv.appendChild(title);
        app.appendChild(classDiv);
    });

    const addClassButton = document.createElement('button');
    addClassButton.textContent = 'Ajouter Classe';
    addClassButton.onclick = () => {
        const className = prompt('Nom de la classe :');
        if (className) {
            data.classes.push({ nom: className, eleves: [], visible: false });
            saveData();
            render();
        }
    };

    app.appendChild(addClassButton);
}

function toggleClassDetails(index) {
    const classe = data.classes[index];
    classe.visible = !classe.visible;
    renderClassDetails(index);
    saveData();
}

function renderClassDetails(index) {
    const classe = data.classes[index];
    const classDiv = document.createElement('div');

    if (classe.visible) {
        const addStudentButton = document.createElement('button');
        addStudentButton.textContent = 'Ajouter Élève';
        addStudentButton.onclick = () => {
            const studentName = prompt('Nom de l\'élève :');
            if (studentName) {
                classe.eleves.push({ nom: studentName, heuresDeColle: 0 });
                saveData();
                render();
            }
        };

        classDiv.appendChild(addStudentButton);

        classe.eleves.forEach((eleve, idx) => {
            const studentDiv = document.createElement('div');
            studentDiv.textContent = `${eleve.nom} - Heures de colle : ${eleve.heuresDeColle}`;

            const addHourButton = document.createElement('button');
            addHourButton.textContent = '+1h';
            addHourButton.onclick = () => {
                eleve.heuresDeColle++;
                saveData();
                render();
            };

            const removeHourButton = document.createElement('button');
            removeHourButton.textContent = '-1h';
            removeHourButton.onclick = () => {
                if (eleve.heuresDeColle > 0) eleve.heuresDeColle--;
                saveData();
                render();
            };

            studentDiv.appendChild(addHourButton);
            studentDiv.appendChild(removeHourButton);
            classDiv.appendChild(studentDiv);
        });
    }

    const classContainer = app.children[index];
    classContainer.appendChild(classDiv);
}

// Charger les données au démarrage
loadData();
render();
