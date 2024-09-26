document.getElementById('task-form').addEventListener('submit', saveTask);

function saveTask(e) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title,
        description
    };

    // Validar que el item 'tasks' no exista en localStorage
    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        // Insertamos nuestro objeto en localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    getTaskt();
    document.getElementById('task-form').reset();
    e.preventDefault();
}

function getTaskt() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskView = document.getElementById('tasks');
    taskView.innerHTML = '';

    // Iteramos cada elemento y lo mostramos en la vista
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        taskView.innerHTML += `
        <div class="card mb-4">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a href="#" class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
            </div>
        </div>
        `;
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === title) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTaskt();
}

getTaskt();