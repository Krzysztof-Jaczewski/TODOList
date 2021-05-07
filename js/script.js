{
    const tasks = [
        {
            content: "nagrać lekcję",
            done: false,
        },
        {
            content: "zjeść pizzę",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks){
            htmlString +=`
            <li ${task.done ? "class=\"form__item form__item--line\"" : "class=\"form__item \"" }>
            ${task.content}
            </li>
            `
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const init = () => {
        render();
    };

    init();
}