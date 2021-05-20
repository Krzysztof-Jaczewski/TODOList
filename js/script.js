{
    let tasks = [];
    let hideDoneTask = false;
    let allTasksDone = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ]
        render();
    }

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const finishAllTasks = () => {
        allTasksDone = true;
        tasks.forEach((task, index) => {
            tasks = [
                ...tasks.slice(0, index),
                { ...task, done: true },
                ...tasks.slice(index + 1),
            ]});
      
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
                
                allTasksDone = (tasks.every(({ done }) => done)) ? true : false;

                render();
            });
        });
    }

    const bindHideTasksEvents = () => {
        if (tasks.length > 0) {
            const buttonHideDoneTasks = document.querySelector(".js-buttonHideDoneTasks");

            buttonHideDoneTasks.addEventListener("click", () => {
                toggleHideDoneTask();
            });
        }
    }
    const bindFinishTasksEvents = () => {
        if (tasks.length > 0) {
            const buttonFinishAllTasks = document.querySelector(".js-buttonFinishAllTasks");

            buttonFinishAllTasks.addEventListener("click", () => {
                finishAllTasks();
            });
        }
    }
    const renderTasks = () => {
        const tasksTransformtoHTML = tasks
            .map(task =>
                `<li class="taskList__item ${task.done && hideDoneTask ? "taskList__item--hide" : ""}">
            <button class="taskList__button js-done ">
             ${task.done ? "&#10004;" : ""}
             </button>
             <span class="taskList__span ${task.done ? "taskList__span--done" : ""}">
             ${task.content}
            </span>
            <button class="taskList__button taskList__button--remove js-remove">
            &#128465;
            </button>
          </li>`)
            .join("")


        document.querySelector(".js-tasks").innerHTML = tasksTransformtoHTML;
    }

    const renderButtons = () => {
        let sectionButtons = "";
        if (tasks.length > 0) {
            sectionButtons =
                `<button class="section__button js-buttonHideDoneTasks">
            ${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button class="section__button js-buttonFinishAllTasks
            ${allTasksDone ? "section__button--disabled" : ""} ">
            Ukończ wszystkie
            </button>
            `;
        }
        document.querySelector(".js-sectionButton").innerHTML = sectionButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindToggleDoneEvents();
        bindRemoveEvents();
        bindHideTasksEvents();
        bindFinishTasksEvents();
    };

    const textResetAndFocus = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const sanitizationOfUserText = (text) => text.replace(/</g,'&lt;');

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        newTask.value = sanitizationOfUserText(newTask.value.trim());

        if (newTask.value === "") return textResetAndFocus(newTask);

        addNewTask(newTask.value);
        textResetAndFocus(newTask);

        allTasksDone = false;
        render();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}