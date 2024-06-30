const app = document.getElementById('app');

let data = {
    classes: []
};

function loadData() {
    const savedData = localStorage.getItem('gestionClasses');
    if (savedData) {
        data = JSON.parse(savedData);
    }
}

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
            renderClassDetails(index);
        };

        classDiv.appendChild(title);
        app.appendChild(classDiv);
    });

    const addClassButton = document.createElement('button');
    addClassButton.textContent = 'Ajouter Classe';
    addClassButton.onclick = () => {
        const className = prompt('Nom de la classe :');
        if (className) {
            data.classes.push({ nom: className, eleves: [] });
            saveData();
            render();
        }
    };

    app.appendChild(addClassButton);
}

function renderClassDetails(index) {
    const classe = data.classes[index];
    app.innerHTML = '';

    const backButton = document.createElement('button');
    backButton.textContent = 'Retour';
    backButton.onclick = render;

    const classTitle = document.createElement('h2');
    classTitle.textContent = classe.nom;

    const addStudentButton = document.createElement('button');
    addStudentButton.textContent = 'Ajouter Élève';
    addStudentButton.onclick = () => {
        const studentName = prompt('Nom de l\'élève :');
        if (studentName) {
            classe.eleves.push({ nom: studentName, heuresDeColle: 0 });
            saveData();
            renderClassDetails(index);
        }
    };

    app.appendChild(backButton);
    app.appendChild(classTitle);
    app.appendChild(addStudentButton);

    classe.eleves.forEach((eleve, idx) => {
        const studentDiv = document.createElement('div');
        studentDiv.textContent = `${eleve.nom} - Heures de colle : ${eleve.heuresDeColle}`;

        const addHourButton = document.createElement('button');
        addHourButton.textContent = '+1h';
        addHourButton.onclick = () => {
            eleve.heuresDeColle++;
            saveData();
            renderClassDetails(index);
        };

        const removeHourButton = document.createElement('button');
        removeHourButton.textContent = '-1h';
        removeHourButton.onclick = () => {
            if (eleve.heuresDeColle > 0) eleve.heuresDeColle--;
            saveData();
            renderClassDetails(index);
        };

        studentDiv.appendChild(addHourButton);
        studentDiv.appendChild(removeHourButton);
        app.appendChild(studentDiv);
    });
}

loadData();
render();

