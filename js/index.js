
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input input");
const sendChatBtn = document.querySelector(".chat-input span");
const inputInitHeight = chatInput.scrollHeight;
let userMessage = null;
const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
 
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">person</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
}
// ----------------------
// document.addEventListener("DOMContentLoaded", () => {
//   // const inputField = document.getElementById("input");
//   const inputField = chatInput;
//   inputField.addEventListener("keydown", (e) => {
//     if (e.code === "Enter") {
//       let input = inputField.value;
//       inputField.value = "";
//       output(input);
//     }
//   });
// });

function output(input) {
  let product;

  // Regex remove non word/space chars
  // Trim trailing whitespce
  // Remove digits - not sure if this is best
  // But solves problem of entering something like 'hi1'

  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  if (compare(prompts, replies, text)) { 
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }

  // Update DOM
  addChat(input, product);
}

function fetch(input) {
  let product; 
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text .replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "").replace(/r u/g, "are you");
  if (compare(prompts, replies, text)) { 
    // Search for exact match in `prompts`
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(corona|covid|virus)/gi)) {
    // If no match, check if message contains `coronavirus`
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // If all else fails: random alternative
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
 
  return product;
}



const generateResponse = (chatElement) => {
 
  const messageElement = chatElement.querySelector("p");
   messageElement.textContent = fetch(userMessage);
   chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if(!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  setTimeout(() => {
      // Display "Thinking..." message while waiting for the response
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
  }, 600);
}
//------
chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window 
  // width is greater than 800px, handle the chat
  if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
  }
});
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
//-------

function addChat(input, product) {
  // const messagesContainer = document.getElementById("messages");
  userMessage = input; // Get user entered message and remove extra whitespace
    if(!userMessage) return;
//---------
// Clear the input textarea and set its height to default
chatInput.value = "";
chatInput.style.height = `${inputInitHeight}px`;

// Append the user's message to the chatbox
chatbox.appendChild(createChatLi(userMessage, "outgoing"));
chatbox.scrollTo(0, chatbox.scrollHeight);
//----------
  // let userDiv = document.createElement("div");
  // userDiv.id = "user";
  // userDiv.className = "user response";
  // userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
  // messagesContainer.appendChild(userDiv);

  // let botDiv = document.createElement("div");
  // let botImg = document.createElement("img");
  // let botText = document.createElement("span");
  // botDiv.id = "bot";
  // botImg.src = "bot-mini.png";
  // botImg.className = "avatar";
  // botDiv.className = "bot response";
  // botText.innerText = "Typing...";
  // botDiv.appendChild(botText);
  // botDiv.appendChild(botImg);
  // messagesContainer.appendChild(botDiv);
  // // Keep messages at most recent
  // messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
  // Fake delay to seem "real"
  setTimeout(() => {
    //------
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
    //------
    // botText.innerText = `${product}`;
    // textToSpeech(product)
  }, 2000
  )

}

function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        // Stop inner loop when input value matches prompts
        break;
      }
    }
    if (replyFound) {
      // Stop outer loop when reply is found instead of interating through the entire array
      break;
    }
  }
  return reply;
}