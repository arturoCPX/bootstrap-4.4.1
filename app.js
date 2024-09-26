// Hover a las tareas
document.getElementById('tasks').addEventListener('mouseover', function(e) {
    if (e.target.closest('.card')) {
        e.target.closest('.card').style.backgroundColor = '#f0f8ff'; // Color al hacer hover
    }
});

document.getElementById('tasks').addEventListener('mouseout', function(e) {
    if (e.target.closest('.card')) {
        e.target.closest('.card').style.backgroundColor = ''; // Volver al color original
    }
});

document.getElementById('task-form').addEventListener('submit', saveTask);

function saveTask(e) {
    e.preventDefault(); // Evitar que el formulario se recargue

    // Obtener los valores del formulario
    let title = document.getElementById('title').value.trim();
    let description = document.getElementById('description').value.trim();

    // Validar que los campos no estén vacíos
    if (title === '' || description === '') {
        alert('Please fill in both fields before saving the task.');
        return; // Salir de la función si los campos están vacíos
    }

    // Crear el objeto de la tarea
    const task = {
        title,
        description
    };

    // Validar si 'tasks' existe en localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Obtener las tareas o inicializar un array vacío
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Mostrar el mensaje de éxito
    alert('Task saved successfully!');

    // Refrescar la vista de tareas y limpiar el formulario
    getTasks();
    document.getElementById('task-form').reset();
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
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
                <a href="#" class="btn btn-warning" onclick="editTask('${title}')">Edit</a>
                <a href="#" class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
            </div>
        </div>
        `;
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.title !== title); // Filtrar la tarea a eliminar
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

function editTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let task = tasks.find(task => task.title === title); // Encontrar la tarea a editar

    if (task) {
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;

        // Eliminar la tarea para que se pueda volver a agregar con los cambios
        deleteTask(title);
    }
}

// Evento de filtro de tareas
document.getElementById('filter-input').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskView = document.getElementById('tasks');
    taskView.innerHTML = ''; // Limpiar la vista de tareas

    // Filtrar las tareas que coinciden con el texto de entrada
    tasks.forEach(task => {
        if (task.title.toLowerCase().includes(filter) || task.description.toLowerCase().includes(filter)) {
            taskView.innerHTML += `
            <div class="card mb-4">
                <div class="card-body">
                    <p>${task.title} - ${task.description}</p>
                    <a href="#" class="btn btn-warning" onclick="editTask('${task.title}')">Edit</a>
                    <a href="#" class="btn btn-danger" onclick="deleteTask('${task.title}')">Delete</a>
                </div>
            </div>
            `;
        }
    });
});


// Inicializar la vista de tareas
getTasks();
