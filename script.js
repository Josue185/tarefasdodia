document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

function addTask() {
    const taskName = document.getElementById("task-name").value;
    const taskDate = document.getElementById("task-date").value;
    const taskStatus = document.getElementById("task-status").value;

    if (taskName === "" || taskDate === "") {
        alert("Preencha a tarefa, a data e o status!");
        return;
    }

    const taskList = document.getElementById("task-list");

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = function () {
        if (checkbox.checked) {
            taskItem.classList.add("completed");
            statusSelect.value = "Concluído";
            statusSelect.disabled = true;
            taskText.contentEditable = false;
            taskDateInput.disabled = true;
        } else {
            taskItem.classList.remove("completed");
            statusSelect.disabled = false;
            taskText.contentEditable = true;
            taskDateInput.disabled = false;
        }
        saveTasksToLocalStorage();
    };

    const taskText = document.createElement("span");
    taskText.textContent = taskName;
    taskText.contentEditable = true;
    taskText.classList.add("editable-task-name");
    taskText.oninput = saveTasksToLocalStorage;

    const taskDateInput = document.createElement("input");
    taskDateInput.type = "date";
    taskDateInput.value = taskDate;
    taskDateInput.classList.add("editable-task-date");
    taskDateInput.onchange = saveTasksToLocalStorage;

    const statusSelect = document.createElement("select");
    statusSelect.classList.add("task-status-select");
    statusSelect.onchange = saveTasksToLocalStorage;

    const statuses = ["Pendente", "Em Progresso", "Concluído"];
    statuses.forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        if (status === taskStatus) option.selected = true;
        statusSelect.appendChild(option);
    });

    // Botão de exclusão
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function () {
        taskItem.remove();
        saveTasksToLocalStorage();
    };

    label.appendChild(checkbox);
    label.appendChild(taskText);
    label.appendChild(taskDateInput);
    label.appendChild(statusSelect);
    label.appendChild(deleteButton);
    taskItem.appendChild(label);
    taskList.appendChild(taskItem);

    document.getElementById("task-name").value = "";
    document.getElementById("task-date").value = "";
    document.getElementById("task-status").value = "Pendente";

    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#task-list .task-item").forEach(taskItem => {
        const taskText = taskItem.querySelector(".editable-task-name").textContent;
        const taskDate = taskItem.querySelector(".editable-task-date").value;
        const taskStatus = taskItem.querySelector(".task-status-select").value;
        const completed = taskItem.classList.contains("completed");

        tasks.push({ taskText, taskDate, taskStatus, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskName = task.taskText;
        const taskDate = task.taskDate;
        const taskStatus = task.taskStatus;

        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        if (task.completed) taskItem.classList.add("completed");

        const label = document.createElement("label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = function () {
            if (checkbox.checked) {
                taskItem.classList.add("completed");
                statusSelect.value = "Concluído";
                statusSelect.disabled = true;
                taskText.contentEditable = false;
                taskDateInput.disabled = true;
            } else {
                taskItem.classList.remove("completed");
                statusSelect.disabled = false;
                taskText.contentEditable = true;
                taskDateInput.disabled = false;
            }
            saveTasksToLocalStorage();
        };

        const taskText = document.createElement("span");
        taskText.textContent = taskName;
        taskText.contentEditable = true;
        taskText.classList.add("editable-task-name");
        taskText.oninput = saveTasksToLocalStorage;

        const taskDateInput = document.createElement("input");
        taskDateInput.type = "date";
        taskDateInput.value = taskDate;
        taskDateInput.classList.add("editable-task-date");
        taskDateInput.onchange = saveTasksToLocalStorage;

        const statusSelect = document.createElement("select");
        statusSelect.classList.add("task-status-select");
        statusSelect.onchange = saveTasksToLocalStorage;

        const statuses = ["Pendente", "Em Progresso", "Concluído"];
        statuses.forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if (status === taskStatus) option.selected = true;
            statusSelect.appendChild(option);
        });

        // Botão de exclusão
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function () {
            taskItem.remove();
            saveTasksToLocalStorage();
        };

        label.appendChild(checkbox);
        label.appendChild(taskText);
        label.appendChild(taskDateInput);
        label.appendChild(statusSelect);
        label.appendChild(deleteButton);
        taskItem.appendChild(label);
        document.getElementById("task-list").appendChild(taskItem);
    });
}
