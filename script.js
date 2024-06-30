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
    app.innerHTML = '<h1>Gestion des classes</h1>';

    // Affichage des classes
    data.classes.forEach((classe, index) => {
        const classDiv = document.createElement('div');
        classDiv.classList.add('class');

        const title = document.createElement('h2');
        title.textContent = classe.nom;

        // Gestion du clic pour afficher les détails de la classe
        title.onclick = () => renderClassDetails(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => {
            data.classes.splice(index, 1);
            saveData();
            render();
        };

        classDiv.appendChild(title);
        classDiv.appendChild(deleteButton);
        app.appendChild(classDiv);
    });

    // Bouton pour ajouter une nouvelle classe
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

function renderClassDetails(classIndex) {
    const classe = data.classes[classIndex];

    app.innerHTML = `<h1>${classe.nom}</h1>`;

    // Bouton retour
    const backButton = document.createElement('button');
    backButton.textContent = 'Retour';
    backButton.onclick = render;

    // Bouton pour ajouter un élève
    const addStudentButton = document.createElement('button');
    addStudentButton.textContent = 'Ajouter Élève';
    addStudentButton.onclick = () => {
        const studentName = prompt('Nom de l\'élève :');
        if (studentName) {
            classe.eleves.push({ nom: studentName, heuresDeColle: 0 });
            saveData();
            renderClassDetails(classIndex);
        }
    };

    // Liste des élèves
    const studentsList = document.createElement('div');
    studentsList.classList.add('students-list');

    classe.eleves.forEach((eleve, studentIndex) => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student-item');

        const studentName = document.createElement('span');
        studentName.textContent = eleve.nom;
        studentName.classList.add('student-name');

        // Gestion du clic sur un élève pour afficher les détails
        studentName.onclick = () => renderStudentDetails(classIndex, studentIndex);

        studentDiv.appendChild(studentName);

        studentsList.appendChild(studentDiv);
    });

    app.appendChild(backButton);
    app.appendChild(addStudentButton);
    app.appendChild(studentsList);
}

function renderStudentDetails(classIndex, studentIndex) {
    const classe = data.classes[classIndex];
    const eleve = classe.eleves[studentIndex];

    app.innerHTML = `<h1>${eleve.nom}</h1>`;

    // Bouton retour
    const backButton = document.createElement('button');
    backButton.textContent = 'Retour';
    backButton.onclick = () => renderClassDetails(classIndex);

    // Affichage des heures de colle et boutons d'ajout/suppression
    const detentionInfo = document.createElement('div');
    detentionInfo.textContent = `Heures de colle : ${eleve.heuresDeColle}`;

    const addDetentionButton = document.createElement('button');
    addDetentionButton.textContent = '+1h';
    addDetentionButton.onclick = () => {
        eleve.heuresDeColle++;
        saveData();
        renderStudentDetails(classIndex, studentIndex);
    };

    const removeDetentionButton = document.createElement('button');
    removeDetentionButton.textContent = '-1h';
    removeDetentionButton.onclick = () => {
        if (eleve.heuresDeColle > 0) {
            eleve.heuresDeColle--;
            saveData();
            renderStudentDetails(classIndex, studentIndex);
        }
    };

    const deleteStudentButton = document.createElement('button');
    deleteStudentButton.textContent = 'Supprimer Élève';
    deleteStudentButton.onclick = () => {
        classe.eleves.splice(studentIndex, 1);
        saveData();
        renderClassDetails(classIndex);
    };

    app.appendChild(backButton);
    app.appendChild(detentionInfo);
    app.appendChild(addDetentionButton);
    app.appendChild(removeDetentionButton);
    app.appendChild(deleteStudentButton);
}

loadData();
render();
