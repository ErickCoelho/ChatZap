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

const userName = prompt("Qual é o seu nome?");
let messagesList = [];

login();

function login(){
    const promiseLogin = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants" ,
    {
        name: userName
    }
    );

    promiseLogin.then(successLogin);
    promiseLogin.catch(errorLogin);

}

function successLogin(){
    getMessages();
    setInterval(getMessages, 3000);
    setInterval(conectionStatus, 5000);
}

function errorLogin(error){
    console.log("Ococrreu um erro no Login! Código: "+ error.data.status);
    userName = prompt("Falha no Login, insira outro nome:");
    login();
}

function conectionStatus(){
    const promiseConectionStatus = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",
    {
        name: userName
    }
    );

    //promiseConectionStatus.then(conectionStatusSuccess);
    promiseConectionStatus.catch(conectionStatusError);
}

function conectionStatusError(error){
    console.log("Ococrreu um erro na Conexão! Código: "+ error.data.status);
}

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
}

function showMessages(){
    const elemento = document.querySelector(".messagesContainer");
    let html = '';
    messagesList.forEach(message => {
       /*html += `
        <div class="message">
            <div class="hour">(${message.time})</div>
            <div class="text"><strong>${message.from}</strong> para <strong>${message.to}</strong>: ${message.text}</div>
        </div>
        `;*/

        if(message.type == "message")
            html+= `
            <div class="message typeMessage">
                <div class="hour">(${message.time})</div>
                <div class="text"><strong>${message.from}</strong> para <strong>${message.to}</strong>: ${message.text}</div>
            </div>
            `;
        else if(message.type == "status")
            html+= `
            <div class="message typeStatus">
                <div class="hour">(${message.time})</div>
                <div class="text"><strong>${message.from}</strong> ${message.text}</div>
            </div>
            `;
        else if(message.type == "private_message" && (message.to == userName || message.to == "Todos"))
            html+= `
            <div class="message typePrivate">
                <div class="hour">(${message.time})</div>
                <div class="text"><strong>${message.from}</strong> reservadamente para <strong>${message.to}</strong>: ${message.text}</div>
            </div>
            `;
        else if(message.type == "private_message" && !(message.to == userName || message.to == "Todos"))
            html+= `
            <div class="message typePrivate">
                <div class="hour">(${message.time})</div>
                <div class="text">MENSAGEM PRIVADA</div>
            </div>
            `;
        else 
            html += `
            <div class="message typeOther">
                <div>ERROR!!!</div>
                <div class="hour">(${message.time})</div>
                <div class="text"><strong>${message.from}</strong>
            </div></div>`;



        /*
            from: "8"
            text: "entra na sala..."
            time: "06:19:01"
            to: "Todos"
            type: "status | message |"
        */
    });

    html += '<div class="lastMessage"></div>';

    //console.log(html);
    elemento.innerHTML = html;
    const lastMessage = document.querySelector('.lastMessage');
    lastMessage.scrollIntoView();

}