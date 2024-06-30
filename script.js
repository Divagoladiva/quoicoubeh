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
    data.classes.forEach((classe, classIndex) => {
        const classDiv = document.createElement('div');
        classDiv.classList.add('class');

        const title = document.createElement('h2');
        title.textContent = classe.nom;

        // Gestion du clic pour afficher les détails de la classe
        title.addEventListener('click', () => renderClassDetails(classIndex));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', () => {
            data.classes.splice(classIndex, 1);
            saveData();
            render();
        });

        classDiv.appendChild(title);
        classDiv.appendChild(deleteButton);
        app.appendChild(classDiv);
    });

    // Bouton pour ajouter une nouvelle classe
    const addClassButton = document.createElement('button');
    addClassButton.textContent = 'Ajouter Classe';
    addClassButton.addEventListener('click', () => {
        const className = prompt('Nom de la classe :');
        if (className) {
            data.classes.push({ nom: className, eleves: [] });
            saveData();
            render();
        }
    });

    app.appendChild(addClassButton);
}

function renderClassDetails(classIndex) {
    const classe = data.classes[classIndex];

    app.innerHTML = `<h1>${classe.nom}</h1>`;

    // Bouton retour
    const backButton = document.createElement('button');
    backButton.textContent = 'Retour';
    backButton.addEventListener('click', render);

    // Bouton pour ajouter un élève
    const addStudentButton = document.createElement('button');
    addStudentButton.textContent = 'Ajouter Élève';
    addStudentButton.addEventListener('click', () => {
        const studentName = prompt('Nom de l\'élève :');
        if (studentName) {
            classe.eleves.push({ nom: studentName, heuresDeColle: 0, historiqueColles: [] });
            saveData();
            renderClassDetails(classIndex);
        }
    });

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
        studentName.addEventListener('click', () => renderStudentDetails(classIndex, studentIndex));

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
    backButton.addEventListener('click', () => renderClassDetails(classIndex));

    // Affichage des heures de colle et boutons d'ajout/suppression
    const detentionInfo = document.createElement('div');
    detentionInfo.textContent = `Heures de colle : ${eleve.heuresDeColle}`;
    detentionInfo.classList.add('detention-info');

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    const addDetentionButton = document.createElement('button');
    addDetentionButton.textContent = '+1h';
    addDetentionButton.addEventListener('click', () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        
        eleve.heuresDeColle++;
        eleve.historiqueColles.push(`+1 heure de colle ${formattedDate}`);
        saveData();
        renderStudentDetails(classIndex, studentIndex);
    });

    const removeDetentionButton = document.createElement('button');
    removeDetentionButton.textContent = '-1h';
    removeDetentionButton.addEventListener('click', () => {
        if (eleve.heuresDeColle > 0) {
            eleve.heuresDeColle--;
            saveData();
            renderStudentDetails(classIndex, studentIndex);
        }
    });

    const deleteStudentButton = document.createElement('button');
    deleteStudentButton.textContent = 'Supprimer Élève';
    deleteStudentButton.addEventListener('click', () => {
        classe.eleves.splice(studentIndex, 1);
        saveData();
        renderClassDetails(classIndex);
    });

    optionsContainer.appendChild(addDetentionButton);
    optionsContainer.appendChild(removeDetentionButton);
    optionsContainer.appendChild(deleteStudentButton);

    // Affichage de l'historique des heures de colle
    const historiqueTitle = document.createElement('h3');
    historiqueTitle.textContent = 'Historique des heures de colle';

    const historiqueList = document.createElement('ul');
    eleve.historiqueColles.forEach(colle => {
        const colleItem = document.createElement('li');
        colleItem.textContent = colle;
        historiqueList.appendChild(colleItem);
    });

    app.appendChild(backButton);
    app.appendChild(detentionInfo);
    app.appendChild(optionsContainer);
    app.appendChild(historiqueTitle);
    app.appendChild(historiqueList);
}

loadData();
render();
