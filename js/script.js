{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }
    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="taskList__item">
            <span class="taskList__span js-done ">${task.done ? "&#10004;" : ""}</span>
            <span class="taskList__text ${task.done ?"taskList__text--done" : ""}">${task.content}</span>
            <span class="taskList__span taskList__span--remove js-remove">&#128465;</span>
        </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const textReset = ()=>{
        const newTask=document.querySelector(".js-newTask");
        newTask.value="";
        newTask.focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
      
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") return;

        addNewTask(newTaskContent);
        textReset();
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}