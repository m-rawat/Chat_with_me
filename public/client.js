const socket=io();

let name;
let textarea=document.querySelector("#textarea");
let messageArea=document.querySelector(".message_area");

do{
    name=prompt("Enter your name");
}while(!name)

textarea.addEventListener("keyup",(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg={
    user:name,
    message:message.trim(),
    }
    
    //Append message
    appendMessage(msg,'outgoing');
    textarea.value="";

    //send to server
    socket.emit("message",msg);
}

function appendMessage(msg,type){
    let divElement=document.createElement("div");
    let className=type;
    divElement.classList.add(className,"message");

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    divElement.innerHTML=markup;
    messageArea.appendChild(divElement);
}

socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
})