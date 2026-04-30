onload = () => {

    const login = document.getElementById("login");
    const register = document.getElementById("register");

    if (login) {
        login.onsubmit = submitAuthForm;
    } if (register) {
        register.onsubmit = submitAuthForm;
    }

    const application = document.getElementById("application");
    if (application) {
        const inputs = Array.from(application.getElementsByClassName("status-input"));
        const status = document.getElementById("status");
        const id = window.location.href.split("/").pop();
        inputs.forEach(input => {
            input.addEventListener("change", (event) => {
                status.classList = []
                status.classList.add("status");
                status.classList.add(input.value);
                status.innerHTML = `<p>${input.value}</p>`;
                fetch(`/api/applications/${id}/status`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"status": input.value})
                })
            })
        })
    }
    

    const notes = Array.from(document.getElementsByClassName("note-container"));
    notes.forEach(noteLoaded);

    const newNoteForm = document.getElementById("new-note-form");   
    if (newNoteForm) {
        const id = window.location.href.split("/").pop();
        newNoteForm.action = `/api/applications/${id}/notes`;
        newNoteForm.onsubmit = (event) => {
            let text = newNoteForm.elements[0].value;
            event.preventDefault();
            let rated = newNoteForm.getElementsByClassName("on").length;
            newNoteForm.innerHTML += `<input type="hidden" name="authorID" value="${document.getElementById("user-id").innerText}">`;
            newNoteForm.innerHTML += `<input type="hidden" name="rating" value=${rated}>`;
            newNoteForm.innerHTML += `<input type="hidden" name="text" value="${text}">`;
            newNoteForm.submit();
        }
    }

    const updateNoteForm = document.getElementById("update-note-form");   
    if (updateNoteForm) {
        const id = window.location.href.split("/").pop();
        const authorID = document.getElementById("user-id").innerText;
        const url = `/api/applications/${id}/notes/${authorID}`;
        updateNoteForm.onsubmit = (event) => {
            let text = updateNoteForm.elements[0].value;
            event.preventDefault();
            let rated = updateNoteForm.getElementsByClassName("on").length;
            updateNoteForm.innerHTML += `<input type="hidden" name="rating" value=${rated}>`;
            updateNoteForm.innerHTML += `<input type="hidden" name="text" value="${text}">`;
            const formData = new FormData(updateNoteForm);
            const body = JSON.stringify(Object.fromEntries(formData));
            fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            }).then(response => location.reload())
        }
    }
}