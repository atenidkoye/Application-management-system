async function hash(string) {
    const buffer = new TextEncoder().encode(string);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

const submitAuthForm = async (event) => {
    event.preventDefault();
    const form = event.target;
    const passwordInputs = Array.from(form.elements).filter(el => el.type == "password");
    for (index in passwordInputs) {
        passwordInputs[index].value = await hash(passwordInputs[index].value);
    }
    form.submit();
}

const turnOff = (star) => star.classList.remove("on");
const turnOn = (star) => star.classList.add("on");

const hoverOff = (star) => star.classList.remove("hover");
const hoverOn = (star) => star.classList.add("hover");

const noteLoaded = (parent) => {
    const stars = Array.from(parent.getElementsByClassName("star"));
    stars.forEach((star, index) => {
        if (star.classList.contains("readOnly")) return
        star.addEventListener("click", () => {
            stars.forEach(turnOff);
            stars.slice(0, index + 1).forEach(turnOn);
        })
        star.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                stars.forEach(turnOff);
                stars.slice(0, index + 1).forEach(turnOn);
            }
        })
        star.addEventListener("mouseover", () => {
            stars.forEach(hoverOff);
            stars.slice(0, index + 1).forEach(hoverOn);
        })
        star.addEventListener("mouseout", () => stars.forEach(hoverOff))
    })
}

const applyStatus = (event) => {
    if (event.key == "Enter") {
        const input = event.target.querySelector("input");
        input.click();
    }
}

const deleteNote = (applicationID, authorID) => {
    const url = `/api/applications/${applicationID}/notes/${authorID}`;
    
    fetch(url, {
        method: "DELETE"
    }).then(response => location.reload());
}

const deleteCandidate = (candidateID) => {
    const url = `/candidates/${candidateID}`;
    fetch(url, {
        method: "DELETE"
    }).then(response => location.href = response.url)
}