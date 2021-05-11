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
            <button class="taskList__button js-done ">${task.done ? "&#10004;" : ""}</button>
            <span class="taskList__span ${task.done ? "taskList__span--done" : ""}">${task.content}</span>
            <button class="taskList__button taskList__button--remove js-remove">&#128465;</button>
        </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const textResetAndFocus = (newTask) => {
        newTask.value = "";
        newTask.focus();
    }

    const sanitizationOfUserText = (text) => {
        let htmlText = "";

        text = text.split("");
        for (let i = 0; i < text.length; i++) {
            console.log(text[i])
            if (text[i] === "<") htmlText += "&lt";
            else if (text[i] === ">") htmlText += "&gt";
            else {
                htmlText += text[i];
            }
        }
        console.log(htmlText)
        return htmlText;
    }


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");

        if (newTask.value.trim() === "") return textResetAndFocus(newTask);;

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
}