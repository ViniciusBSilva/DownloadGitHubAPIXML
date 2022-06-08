function onloadBody() {

    const userNameInput = document.getElementById("UserName");
    const fileTypeRadio = document.downloadConfig.FileType;

    [userNameInput, ...fileTypeRadio].forEach(item => {
        item.addEventListener('loadstart', eventSetFileName);
        item.addEventListener('change', eventSetFileName);
    });

    userNameInput.value = 'ViniciusBSilva'

    const fileTypeRadioJSON = document.getElementById('FileTypeJSON');
    fileTypeRadioJSON.checked = true;

    setFileName(getUserName(), getFileExtension());

} // onloadBody

function getUserName() {
    const userNameInput = document.getElementById("UserName");
    return userNameInput.value;
} // getUserName

function getFileExtension() {
    return document.querySelector('input[name="FileType"]:checked').value;
} // getFileExtension

function eventSetFileName() {
    setFileName(getUserName(), getFileExtension());
} // eventSetFileName

function setFileName(userName, extension) {
    const fileNameInput = document.getElementById("FileName");
    fileNameInput.value = `${userName}.${extension}`;
} // setFileName

function getFileName() {

    const fileNameInput = document.getElementById("FileName");
    return fileNameInput.value
} // getFileName

function downloadAPI() {

    const userName = getUserName();

    fetch(`https://api.github.com/users/${userName}`)
        .then(response => {

            if (response.status !== 200) {
                console.error(`Fetch responded with error: ${response.status}`);
                console.log("response", response);
                return;
            }

            switch (getFileExtension()) {
                case "json":
                    response.json().then(data => downloadJSON(getFileName(), data));
                    break;
                case "xml":
                    response.json().then(data => downloadXML(getFileName(), data));
                    break;

                default:
                    break;
            }

        })
        .catch(err => console.error('Fetch Error :-S', err));

} // downloadAPI

function downloadJSON(filename, dataJSON) {
    download(filename, JSON.stringify(dataJSON));
}

function downloadXML(filename, dataJSON) {
    const dataXML = json2xml(dataJSON, "");
    // const parser = new DOMParser();
    // const XMLDocument = parser.parseFromString(
    //     `<user>${dataXML}</user>`, "application/xml");
    // const serializer = new XMLSerializer()
    // const XMLDocumentString = serializer.serializeToString(XMLDocument);
    // if (!XMLDocument.querySelector("parsererror")) {
    //     download(filename, XMLDocumentString);
    // } else {
    //     console.error("Error while parsing JSON to XML");
    // }
    const XMLDocument = `<user>${dataXML}</user>`;
    download(filename, XMLDocument);
} // downloadXML

function download(filename, content) {

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
} // download