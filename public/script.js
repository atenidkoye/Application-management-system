async function hash(string) {
    const buffer = new TextEncoder().encode(string);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}
onsubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const passwordInputs = Array.from(form.elements).filter(el => el.type == "password");
    for (index in passwordInputs) {
        passwordInputs[index].value = await hash(passwordInputs[index].value);
    }
    form.submit();
}