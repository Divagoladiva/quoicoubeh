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

    // Header
    const header = document.createElement('h1');
    header.textContent = 'Gestion des classes';
    app.appendChild(header);

    data.classes.forEach((classe, index) => {
        const classDiv = document.createElement('div');
        classDiv.classList.add('class');

        const title = document.createElement('h2');
        title.textContent = classe.nom;

        // Gestion du clic pour afficher ou supprimer
        title.onclick = () => {
            let clickCount = 0;
            const clickHandler = () => {
                clickCount++;
                if (clickCount === 1) {
                    setTimeout(() => {
                        if (clickCount === 1) {
                            renderClassDetails(index);
                        }
                        clickCount = 0;
                    }, 300);
                }
            };
            title.ondblclick = () => {
                data.classes.splice(index, 1);
                saveData();
                render();
            };
            clickHandler();
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

        // Bouton pour ajouter et enlever des heures de colle
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

        // Bouton pour supprimer un élève
        const deleteStudentButton = document.createElement('button');
        deleteStudentButton.textContent = 'Supprimer';
        deleteStudentButton.onclick = () => {
            classe.eleves.splice(idx, 1);
            saveData();
            renderClassDetails(index);
        };

        studentDiv.appendChild(addHourButton);
        studentDiv.appendChild(removeHourButton);
        studentDiv.appendChild(deleteStudentButton);
        app.appendChild(studentDiv);
    });
}

loadData();
render();

