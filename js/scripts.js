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

getMessages();
//setInterval(getMessages, 3000);

function getMessages(){
    const messagesPromise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    messagesPromise.then(showMessages);
    messagesPromise.catch(errorMessages);
}

function errorMessages(error){
    console.log("Ococrreu um erro no carregamento das mensagens! Código: "+ error.data.status);
}

function showMessages(response){
    console.log(response.data);
    const messages = response.data;
    const elemento = document.querySelector("messagesContainer");
    //elemento.innerHTML += `a`;

}