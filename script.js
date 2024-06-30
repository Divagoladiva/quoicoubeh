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

function renderClasses() {
    app.innerHTML = '<h1>Gestion des classes</h1>';

    data.classes.forEach((classe, classIndex) => {
        const classDiv = document.createElement('div');
        classDiv.classList.add('class');

        const className = document.createElement('h2');
        className.textContent = classe.nom;
        className.addEventListener('click', () => renderStudents(classIndex));

        const deleteClassButton = document.createElement('button');
        deleteClassButton.textContent = 'Supprimer Classe';
        deleteClassButton.addEventListener('click', () => {
            data.classes.splice(classIndex, 1);
            saveData();
            renderClasses();
        });

        classDiv.appendChild(className);
        classDiv.appendChild(deleteClassButton);
        app.appendChild(classDiv);
    });

    const addClassButton = document.createElement('button');
    addClassButton.textContent = 'Ajouter Classe';
    addClassButton.addEventListener('click', () => {
        const className = prompt('Nom de la classe :');
        if (className) {
            data.classes.push({ nom: className, eleves: [] });
            saveData();
            renderClasses();
        }
    });

    app.appendChild(addClassButton);
}

function renderStudents(classIndex) {
    const classe = data.classes[classIndex];

    app.innerHTML = `<h1>${classe.nom}</h1>`;

    const backButton = document.createElement('button');
    backButton.textContent = 'Retour aux Classes';
    backButton.addEventListener('click', renderClasses);

    const addStudentButton = document.createElement('button');
    addStudentButton.textContent = 'Ajouter Élève';
    addStudentButton.addEventListener('click', () => {
        const studentName = prompt('Nom de l\'élève :');
        if (studentName) {
            classe.eleves.push({ nom: studentName, heuresDeColle: 0, historiqueColles: [] });
            saveData();
            renderStudents(classIndex);
        }
    });

    const studentsList = document.createElement('ul');
    classe.eleves.forEach((eleve, studentIndex) => {
        const studentItem = document.createElement('li');
        studentItem.textContent = eleve.nom;
        studentItem.addEventListener('click', () => renderDetentions(classIndex, studentIndex));
        studentsList.appendChild(studentItem);
    });

    app.appendChild(backButton);
    app.appendChild(addStudentButton);
    app.appendChild(studentsList);
}

function renderDetentions(classIndex, studentIndex) {
    const classe = data.classes[classIndex];
    const eleve = classe.eleves[studentIndex];

    app.innerHTML = `<h1>${eleve.nom}</h1>`;

    const backButton = document.createElement('button');
    backButton.textContent = 'Retour aux Élèves';
    backButton.addEventListener('click', () => renderStudents(classIndex));

    const detentionInfo = document.createElement('p');
    detentionInfo.textContent = `Heures de colle : ${eleve.heuresDeColle}`;

    const addDetentionButton = document.createElement('button');
    addDetentionButton.textContent = '+1h de colle';
    addDetentionButton.addEventListener('click', () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        
        eleve.heuresDeColle++;
        eleve.historiqueColles.push(`+1 heure de colle ${formattedDate}`);
        saveData();
        renderDetentions(classIndex, studentIndex);
    });

    const detentionHistoryTitle = document.createElement('h3');
    detentionHistoryTitle.textContent = 'Historique des heures de colle';

    const detentionHistoryList = document.createElement('ul');
    eleve.historiqueColles.forEach(colle => {
        const colleItem = document.createElement('li');
        colleItem.textContent = colle;
        detentionHistoryList.appendChild(colleItem);
    });

    app.appendChild(backButton);
    app.appendChild(detentionInfo);
    app.appendChild(addDetentionButton);
    app.appendChild(detentionHistoryTitle);
    app.appendChild(detentionHistoryList);
}

loadData();
renderClasses();
