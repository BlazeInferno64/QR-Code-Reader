const uploadBg = document.querySelector(".upload-bg");
const uploadCard = document.querySelector(".upload-card");

const openUploadCard = () => {
    uploadBg.classList.remove("hide");
    uploadCard.classList.add("ani");
    uploadCard.classList.remove("hide");

    setTimeout(() => {
        uploadCard.classList.remove("down");
    }, 500);
}

const closeUploadCard = () => {
    uploadCard.classList.add("up");
    uploadCard.classList.add("anti");
    setTimeout(() => {
        uploadCard.classList.add("hide");
    }, 700);
    setTimeout(() => {
        uploadBg.classList.add("hide");
        uploadCard.classList.remove("anti");
        uploadCard.classList.add("hide");
    }, 1000);

    setTimeout(() => {
        uploadCard.classList.add("down");
        uploadCard.classList.remove("up");
        uploadCard.classList.remove("ani");
    }, 1200);
}

window.onload = (e) => {
    openUploadCard();
}