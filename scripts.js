
// const userIDInput = document.querySelector("#UserID");
const userIDInput = document.getElementById("UserID");
console.log("userIDInput", userIDInput);
// const fileNameInput = document.querySelector("#FileName");
const fileNameInput = document.getElementById("FileName");
console.log("fileNameInput", fileNameInput);

userIDInput.addEventListener('change', (event) => {

    console.log("event", event);

    fileNameInput.value = `${event.target.value}.xml`;

    console.log("fileNameInput.textContent", fileNameInput.textContent);
});

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

