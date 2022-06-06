
// const userIDInput = document.querySelector("#UserID");
// const fileNameInput = document.querySelector("#FileName");
const userIDInput = document.getElementById("UserID");
const fileNameInput = document.getElementById("FileName");

userIDInput.addEventListener('change', (event) => {

    console.log("event", event);

    fileNameInput.value = `${event.target.value}.xml`;

    console.log("fileNameInput.value", fileNameInput.value);
});

function downloadAPI(userID) {

    fetch(`https://api.github.com/users/${userID}`)
        .then(response => console.log(response));

}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

