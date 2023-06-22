function openSideBar(){
    const elemento1 = document.querySelector(".displaynone");
    elemento1.classList.remove("displaynone");
    const elemento2 = document.querySelector(".displaynone");
    elemento2.classList.remove("displaynone");
}

function closeSideBar(){
    const elemento1 = document.querySelector(".sideBarBG");
    elemento1.classList.add("displaynone");
    const elemento2 = document.querySelector(".sideBar");
    elemento2.classList.add("displaynone");
}