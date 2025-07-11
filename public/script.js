let button = document.querySelector(".plus");
let rightCont = document.querySelector(".right");
let isPopupOpen = false;
let noteCount = 0; 

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
                    <textarea id="taskDesc" name="description" rows="4" placeholder="Enter task description" required></textarea>
                </div>
                <button type="submit">Add Task</button>
            </form>
                </div>`;

        let popupDiv = document.createElement("div");
        popupDiv.innerHTML = html;
        rightCont.appendChild(popupDiv.firstChild);

        setTimeout(() => {
            let popup = rightCont.querySelector(".popup");
            if (popup) {
                popup.classList.add("visible");
            }
        }, 10);

        button.querySelector(".create-text").textContent = "Close!";
        button.querySelector(".create-text").classList.add("close");
        button.innerHTML = button.innerHTML.replace("+", "-");

        // backend link
        let form = rightCont.querySelector("form");
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = form.querySelector("#taskTitle").value;
                const description = form.querySelector("#taskDesc").value;

                fetch('/submit-task', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, description })
                })
                .then(res => res.json())
                .then(() => {
                    const noteId = Date.now();
                    const note = document.createElement("div");
                    note.className = "sticky-note";
                    note.dataset.id = noteId;
                    note.innerHTML = `<h2 class="note-title">${title}</h2><p class="note-desc">${description}</p>`;

                    // 3x3 grid positions (x, y) with 20px padding
                    const gridPositions = [
                        { x: '20px', y: '20px' },
                        { x: `calc(25vw + 20px)`, y: '20px' },
                        { x: `calc(50vw + 20px)`, y: '20px' },
                        { x: '20px', y: `calc(30vh + 20px)` },
                        { x: `calc(25vw + 20px)`, y: `calc(30vh + 20px)` },
                        { x: `calc(50vw + 20px)`, y: `calc(30vh + 20px)` },
                        { x: '20px', y: `calc(60vh + 20px)` },
                        { x: `calc(25vw + 20px)`, y: `calc(60vh + 20px)` },
                        { x: `calc(50vw + 20px)`, y: `calc(60vh + 20px)` }
                    ];
                    const position = gridPositions[noteCount % 9];
                    note.style.left = position.x;
                    note.style.top = position.y;
                    rightCont.appendChild(note);

                    noteCount++; 

                    const popup = rightCont.querySelector(".popup");
                    if (popup) {
                        popup.classList.remove("visible");
                        setTimeout(() => {
                            rightCont.removeChild(popup);
                            button.querySelector(".create-text").textContent = "Create!";
                            button.querySelector(".create-text").classList.remove("close");
                            button.innerHTML = button.innerHTML.replace("-", "+");
                            isPopupOpen = false;
                        }, 300);
                    }
                })
                .catch(err => console.error('Error:', err));
            });
        }

        isPopupOpen = true;
    } else {
        let popup = rightCont.querySelector(".popup");
        if (popup) {
            popup.classList.remove("visible");
            setTimeout(() => {
                rightCont.removeChild(popup);
                button.querySelector(".create-text").textContent = "Create!";
                button.querySelector(".create-text").classList.remove("close");
                button.innerHTML = button.innerHTML.replace("-", "+");
                isPopupOpen = false;
            }, 300);
        }
    }
});