let button = document.querySelector(".plus");
let rightCont = document.querySelector(".right");
let isPopupOpen = false;

button.addEventListener('click', () => {
    if (!isPopupOpen) {
        let html = `<div class="popup">
                    <form action="/submit-task" method="POST">
                <div style="margin-bottom: 2rem;">
                    <label for="taskTitle">NAME</label>
                    <input type="text" id="taskTitle" name="title" placeholder="Enter task title" required>
                </div>

                <div style="margin-bottom: 1rem;">
                    <label for="taskDesc">DESCRIPTION</label>
                    <textarea id="taskDesc" name="description" rows="4" placeholder="Enter task description"
                        required></textarea>
                </div>

                <button type="submit">Add Task</button>
            </form>
                </div>`;

        let popupDiv = document.createElement("div");
        popupDiv.innerHTML = html;
        
        isPopupOpen = true;
    } else {
        let popup = rightCont.querySelector(".popup");
        if (popup) {
            popup.classList.remove("visible");
            setTimeout(() => {
                isPopupOpen = false;
            }, 300); 
        }
    }
});