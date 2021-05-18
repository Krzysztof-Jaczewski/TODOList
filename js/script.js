
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
    for (let i = 0; i < tasks.length; i++) {
        tasks = [
            ...tasks.slice(0, i),
            { ...tasks[i], done: true },
            ...tasks.slice(i + 1),
        ];
    };
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
            if(tasks.filter(({done})=>done).length ===tasks.length ){
                allTasksDone = true;
                render();
            }else{
                allTasksDone = false;
                render();
            }
        });
    });
}

const bindButtonsEvents = () => {
    if (tasks.length > 0) {
        const buttonHideDoneTasks = document.querySelector(".js-buttonHideDoneTasks");
        const buttonFinishAllTasks = document.querySelector(".js-buttonFinishAllTasks");

        buttonHideDoneTasks.addEventListener("click", () => {
            toggleHideDoneTask();
        });

        buttonFinishAllTasks.addEventListener("click", () => {
            finishAllTasks();
        });
    }
}
const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
        <li class="taskList__item ${task.done && hideDoneTask ? "taskList__item--hide" : ""}">
            <button class="taskList__button js-done ">
            ${task.done ? "&#10004;" : ""}
            </button>
            <span class="taskList__span ${task.done ? "taskList__span--done" : ""}">
            ${task.content}
            </span>
            <button class="taskList__button taskList__button--remove js-remove">
            &#128465;
            </button>
        </li>
            `;

        document.querySelector(".js-tasks").innerHTML = htmlString;
    }
}

const renderButtons = () => {
    let sectionButtons = "";
    if (tasks.length > 0) {
        sectionButtons =
            `<button class="section__button js-buttonHideDoneTasks">
            ${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone" }
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
    bindButtonsEvents();
};

const textResetAndFocus = (newTask) => {
    newTask.value = "";
    newTask.focus();
}

const sanitizationOfUserText = (text) => {
    let htmlText = "";

    text = text.split("");
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "<") htmlText += "&lt";
        else if (text[i] === ">") htmlText += "&gt";
        else {
            htmlText += text[i];
        }
    }
    return htmlText;
}


const onFormSubmit = (event) => {
    event.preventDefault();
    allTasksDone=false;
    const newTask = document.querySelector(".js-newTask");
    newTask.value = sanitizationOfUserText(newTask.value.trim());

    if (newTask.value === "") return textResetAndFocus(newTask);

    addNewTask(newTask.value);
    textResetAndFocus(newTask);
    render();
}

const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
};

init();
