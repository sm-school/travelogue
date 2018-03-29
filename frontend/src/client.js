function getSignedRequest(file) {
    return fetch(
        `http://localhost:8080/sign-s3?fileName=${file.name}&fileType=${file.type}`
    ).then(response => {
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
    });
}

function uploadFile(file, signedRequest, url) {
    const options = {
        method: "PUT",
        body: file
    };

    return fetch(signedRequest, options).then(response => {
        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return url;
    });
}

function uploadToS3(file) {
    return getSignedRequest(file)
        .then(json => uploadFile(file, json.signedRequest, json.url))
        .then(url => {
            return url;
        })
        .catch(err => {
            console.error(err);
            return null;
        });
}

var form = document.getElementById("button1");

form.addEventListener("click", function callback(event) {
    event.preventDefault();
    console.log('click!');
    const input = document.querySelector("#file-input");
    if (!input.files || !input.files.length) {
        return;
    }

    const file = input.files;

    const fileArray = Array.from(input.files);
    fileArray.forEach(function (file) {
        let date = new Date();
        const newName =
            "username" +
            "_" +
            date.getTime() +
            "_" +
            Math.floor(Math.random() * 100) +
            "_" +
            file.name;
        const newFile = new File([file], newName, {
            type: file.type
        });
        uploadToS3(newFile).then(url => {});
    });
});