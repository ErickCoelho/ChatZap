function openSideBar(){
    const elemento1 = document.querySelector(".displaynone");
    elemento1.classList.remove("displaynone");
    const elemento2 = document.querySelector(".displaynone");
    elemento2.classList.remove("displaynone");
    getParticipants();
    setInterval(getParticipants, 10000);
}

function closeSideBar(){
    const elemento1 = document.querySelector(".sideBarBG");
    elemento1.classList.add("displaynone");
    const elemento2 = document.querySelector(".sideBar");
    elemento2.classList.add("displaynone");
    clearInterval(getParticipants);
}

function getParticipants(){
    const promiseParticipants = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promiseParticipants.then(loadParticipants);
}

function loadParticipants(response){
    participantsList = response.data;
    console.log(participantsList);
    showParticipants();
}

function showParticipants(){
    const elemento = document.querySelector(".sideBar ul")
    let html = '';
    html = `
    <li onclick="selectParticipant(this)">
        <div>
            <img src="assets/people 1.png">
            <div class="name">Todos</div>
        </div>
        <ion-icon name="checkmark" 
        `;
        if(recipient == "Todos")
            html += `
            ></ion-icon>
            </li>
            `;
        else
        html += `
            class="displaynone"></ion-icon>
            </li>
            `;


    participantsList.forEach(participant => {
        //console.log(participant.name);
        if(participant.name != userName){
            html += `
            <li onclick="selectParticipant(this)">
                <div>
                    <img src="assets/person-circle 1.png">
                    <div class="name">${participant.name}</div>
                </div>
                <ion-icon name="checkmark" 
            `;
            if(participant.name == recipient)
            html += `
                ></ion-icon>
                </li>
                `;
            else
                html += `
                class="displaynone"></ion-icon>
                </li>
                `;
        }
    });

    console.log(html);
    elemento.innerHTML = html;

}

function selectParticipant(elemento){
    const name = elemento.querySelector(".name");
    nameString = name.innerHTML;
    /*if(recipient == nameString){
        recipient = "Todos";
    }
    else{
        recipient = nameString;
    }*/
    recipient = nameString;

    //const iconElement = elemento.children[1];
    //iconElement.classList.remove("displaynone");
    showParticipants();

}


const userName = prompt("Qual é o seu nome?");
let messagesList = [];
let recipient = "Todos";
let participantsList = [];

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
    //console.log("Ococrreu um erro no Login! Código: "+ error.response.status);
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
    //alert("ERRO");
    //console.log("Ococrreu um erro na Conexão! Código: "+ error.response.status);
    userName = prompt("Seção finalizada, insira novamente seu nome:");
    clearInterval(conectionStatus);
    clearInterval(getMessages);
    login();
}

function getMessages(){
    const messagesPromise = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    messagesPromise.then(loadMessages);
    messagesPromise.catch(errorMessages);
}

function errorMessages(error){
    //alert("Ococrreu um erro no carregamento das mensagens! Código: "+ error.response.status);
    //console.log("Ococrreu um erro no carregamento das mensagens! Código: "+ error.response.status);
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


function sendMessage(){
    const text = document.getElementById('text').value;
    if(text == "")
        alert("Digite algo antes de enviar");
    else{
        //alert(text);
        const promiseSendMessage = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",
        {
            from: userName,
            to: recipient,
            text: text,
            type: "message" // ou "private_message" para o bônus
        }
        );

        promiseSendMessage.catch(sendMessageError);
        promiseSendMessage.then(sendMessageSuccess);

    }
}

function sendMessageError(){
    alert("Send Message Error!!!");
}

function sendMessageSuccess(){
    document.getElementById('text').value = "";
}

