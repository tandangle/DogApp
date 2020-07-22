const client = filestack.init("AveMruPz0SI6wtM8ddFr8z")

document.getElementsByClassName("upload")[0].addEventListener("click", function () {
    client.picker().open();
})