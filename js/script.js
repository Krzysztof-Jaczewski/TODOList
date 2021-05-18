
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
            ...tasks.slice(index+1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {...tasks[taskIndex], done:true},
            ...tasks.slice(taskIndex+1),
        ];
        
        render();
    }
    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const finishAllTasks = ()=> {
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
            });
        });
    }
    const bindButtonsEvents = () => {
        const buttonHideDoneTasks = document.querySelector(".js-buttonHideDoneTasks");
        const buttonFinishAllTasks = document.querySelector(".js-buttonFinishAllTasks");

        // buttonHideDoneTasks.addEventListener("click", () => {
        //     toggleHideDoneTask();
        // });

        // buttonFinishAllTasks.addEventListener("click", () => {
        //     finishAllTasks();
        // });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="taskList__item ${hideDoneTask ? "taskList__item--hide":""}">
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
         if(tasks.length>0){
            sectionButtons =
                `<button class="section__button section__button--hide js-buttonHideDoneTasks">
            Ukryj ukończone
            </button>
            
            <button class="section__button section__button--hide
            ${allTasksDone ? "section__button--disabled" : ""} js-buttonFinishAllTasks" >
            Ukończ wszystkie
            </button>
            `;
        }
        document.querySelector(".js-sectionButton").innerHTML = sectionButtons;
    };

    const render = () => {
        renderButtons();
        renderTasks();

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

        const newTask = document.querySelector(".js-newTask");

        if (newTask.value.trim() === "") return textResetAndFocus(newTask);

        newTask.value = sanitizationOfUserText(newTask.value.trim());

        addNewTask(newTask.value);
        textResetAndFocus(newTask);
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
