const app = document.getElementById('app');

let data = {
    classes: []
};

function render() {
    app.innerHTML = '';

    data.classes.forEach((classe, index) => {
        const classDiv = document.createElement('div');
        classDiv.classList.add('class');

        const title = document.createElement('h2');
        title.textContent = classe.nom;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = () => {
            data.classes.splice(index, 1);
            render();
        };

        const addStudentButton = document.createElement('button');
        addStudentButton.textContent = 'Ajouter Élève';
        addStudentButton.onclick = () => {
            const studentName = prompt('Nom de l\'élève :');
            if (studentName) {
                classe.eleves.push({ nom: studentName, heuresDeColle: 0 });
                render();
            }
        };

        classDiv.appendChild(title);
        classDiv.appendChild(addStudentButton);
        classDiv.appendChild(deleteButton);

        classe.eleves.forEach((eleve, idx) => {
            const studentDiv = document.createElement('div');
            studentDiv.textContent = `${eleve.nom} - Heures de colle : ${eleve.heuresDeColle}`;

            const addHourButton = document.createElement('button');
            addHourButton.textContent = '+1h';
            addHourButton.onclick = () => {
                eleve.heuresDeColle++;
                render();
            };

            const removeHourButton = document.createElement('button');
            removeHourButton.textContent = '-1h';
            removeHourButton.onclick = () => {
                if (eleve.heuresDeColle > 0) eleve.heuresDeColle--;
                render();
            };

            studentDiv.appendChild(addHourButton);
            studentDiv.appendChild(removeHourButton);
            classDiv.appendChild(studentDiv);
        });

        app.appendChild(classDiv);
    });

    const addClassButton = document.createElement('button');
    addClassButton.textContent = 'Ajouter Classe';
    addClassButton.onclick = () => {
        const className = prompt('Nom de la classe :');
        if (className) {
            data.classes.push({ nom: className, eleves: [] });
            render();
        }
    };

    app.appendChild(addClassButton);
}

render();
