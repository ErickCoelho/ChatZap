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

let messagesList = [];
getMessages();
//setInterval(getMessages, 3000);

function getMessages(){
    const messagesPromise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    messagesPromise.then(loadMessages);
    messagesPromise.catch(errorMessages);
}

function errorMessages(error){
    console.log("Ococrreu um erro no carregamento das mensagens! Código: "+ error.data.status);
}

function loadMessages(response){
    messagesList = response.data;
    console.log(messagesList);
    showMessages();
    //elemento.innerHTML += `a`;

}

function showMessages(){
    const elemento = document.querySelector(".messagesContainer");
    let html = '';
    messagesList.forEach(message => {
        html += `
        <div class="message">
            <div class="hour">(${message.time})</div>
            <div class="text"><strong>${message.from}</strong> para <strong>${message.to}</strong>: ${message.text}</div>
        </div>
        `;
        /*
            from: "8"
            text: "entra na sala..."
            time: "06:19:01"
            to: "Todos"
            type: "status"
        */
    });

    html += '<div class="lastMessage"></div>';

    //console.log(html);
    elemento.innerHTML = html;
    const lastMessage = document.querySelector('.lastMessage');
    lastMessage.scrollIntoView();

}