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
        deleteClassButton.textContent = 'Supprimer';
        deleteClassButton.classList.add('delete-btn');
        deleteClassButton.addEventListener('click', () => {
            data.classes.splice(classIndex, 1);
            saveData();
            renderClasses();
        });

        classDiv.appendChild(className);
        classDiv.appendChild(deleteClassButton);

        const studentsList = document.createElement('ul');
        classe.eleves.forEach((eleve, studentIndex) => {
            const studentItem = document.createElement('li');
            studentItem.textContent = eleve.nom;

            const deleteStudentButton = document.createElement('button');
            deleteStudentButton.textContent = '-';
            deleteStudentButton.classList.add('delete-btn');
            deleteStudentButton.addEventListener('click', () => {
                classe.eleves.splice(studentIndex, 1);
                saveData();
                renderStudents(classIndex);
            });

            studentItem.appendChild(deleteStudentButton);
            studentsList.appendChild(studentItem);
        });

        classDiv.appendChild(studentsList);
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

        const deleteStudentButton = document.createElement('button');
        deleteStudentButton.textContent = '-';
        deleteStudentButton.classList.add('delete-btn');
        deleteStudentButton.addEventListener('click', () => {
            classe.eleves.splice(studentIndex, 1);
            saveData();
            renderStudents(classIndex);
        });

        studentItem.appendChild(deleteStudentButton);
        studentsList.appendChild(studentItem);
    });

    app.appendChild(backButton);
    app.appendChild(addStudentButton);
    app.appendChild(studentsList);
}

loadData();
renderClasses();
