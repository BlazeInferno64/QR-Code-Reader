const qrCodeContent = document.querySelector(".qc");
const placeholder = document.querySelector(".plce");

const imgElement = document.querySelector(".img");
const copyBtn = document.querySelector(".copy");
const uploadAnotherBtn = document.querySelector(".change");

const browseQrCodesBtn = document.querySelector(".upload");
const fileInput = document.querySelector("#file")

const readFile = (file) => {
    const fr = new FileReader();

    fr.readAsDataURL(file);
    //fr.readAsText(file);
    fr.addEventListener("load",(e) => {
        imgElement.src = fr.result;
        //qrCodeContent.innerText = fr.result;
    })
}

const fetchFile = (file, formData) => {
    let link = 'httpS://api.qrserver.com/v1/read-qr-code/';
    
    fetch(link, {
        method: "POST", body: formData
    })
    .then(res => {
        return res.json();
    })
    .then(result => {
        copyBtn.classList.remove("none");
        uploadAnotherBtn.classList.remove("none");
        //console.log(result);
        err = result[0].symbol[0].error;
        if(err){
            qrCodeContent.classList.remove("no-click");
            setTimeout(() => {
                alert(`An error occured: ${err}`);
            }, 2000);
            qrCodeContent.innerText = `There was an error: ${err}`;
        }
        else{
            qrCodeContent.classList.remove("no-click");
            result = result[0].symbol[0].data;
            qrCodeContent.innerText = result;
        }

    })
    .catch((err) => {
        setTimeout(() => {
            alert(err);
        }, 2000);
        qrCodeContent.classList.add("no-click");
        console.error(err);
        qrCodeContent.innerText = err;
    })
}

qrCodeContent.addEventListener("focusin",(e) => {
    placeholder.classList.add("no");
})

qrCodeContent.addEventListener("focusout",(e) => {
    if(qrCodeContent.innerText.length <= 0){
        placeholder.classList.remove("no");
    }
})

uploadAnotherBtn.addEventListener("click",(e) => {
    openUploadCard();
})

copyBtn.addEventListener("click",(e) => {
    try {
        alert(`Sucessfully copied the text: ${qrCodeContent.innerText}`)
        console.log(`Copied: ${qrCodeContent.innerText}`);
    } catch (error) {
        alert(`Error occured while copying! Error:${error}`);
        console.error(error);
    }
})


browseQrCodesBtn.addEventListener("click",(e) => {
    fileInput.click();
})

fileInput.addEventListener("change",(e) => {
    const file = e.target.files[0];
    if(!file){
        return;
    }
    let formData = new FormData();
    formData.append("file", file);
    fetchFile(file, formData)
    closeUploadCard();
    readFile(file);
})
