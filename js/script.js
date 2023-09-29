const uploadBox = document.querySelector(".upload-box");
const qrCodeFile = document.querySelector("#file");
const qrCodeImg = document.querySelector(".img");
const qrCodeText = document.querySelector(".text");
const copyQrCodeTextBtn = document.querySelector(".copy");
const closeBtn = document.querySelector(".close");
const appCard = document.querySelector(".app")
const infoText = document.querySelector(".upload-box p");

uploadBox.addEventListener("click",(e) => {
    infoText.classList.remove("red");
    infoText.innerText = 'Uploading File...';
    qrCodeFile.click();
})

let link = 'http://api.qrserver.com/v1/read-qr-code/'

function fetchRequest(file, formData){
    fetch(link, {
        method: 'POST', body: formData
    })
    .then(res => res.json())
    .then(result => {
        infoText.classList.remove("red");
        //let files =
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
        if(!result) return;
        qrCodeText.innerText = result;
        qrCodeImg.src = URL.createObjectURL(file);
        appCard.classList.remove("hide");
        appCard.classList.add("height");
        uploadBox.classList.add("hide");
        uploadBox.classList.add("height");
    }).catch((err) => {
        qrCodeText.innerText = err;
        infoText.innerText = err;
        infoText.classList.add("red");
        setTimeout(() => {
            window.location.reload(true);
        }, 3500);
    })
}

qrCodeFile.addEventListener("change", async(e) => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append("file",file)
    fetchRequest(file, formData);
})

copyQrCodeTextBtn.addEventListener("click",(e) => {
    let text = qrCodeText.textContent;
    if(qrCodeText.value.length <= 0){
        alert("There is nothing to copy!");
    }
    else{
        alert("Successfully Copied : " + qrCodeText.value);
        navigator.clipboard.writeText(text);
    }
})

closeBtn.addEventListener("click",(e) => {
    appCard.classList.add("height");
    appCard.classList.add("hide");
    uploadBox.classList.remove("hide");  
    uploadBox.classList.remove("height");
})


