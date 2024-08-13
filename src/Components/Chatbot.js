import React, { useState } from 'react';
import axios from 'axios';
import botIcon from '../Assets/Icons/bot2.png'; // Add your bot icon image path here
import "../CSS/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    try {
      setMessages([...messages, { user: true, text: input }, { user: false, text: "Typing..." }]);
      const response = await axios.post('https://realestate-fullstack-backend-app-1.onrender.com/chat', { message: input });
      const botMessage = response.data.replace(/\n/g, '<br>');
      setMessages([...messages, { user: true, text: input }, { user: false, text: botMessage }]);
      setInput('');
    } catch (error) {
      console.log("Error while sending message to chatbot!", error);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot open">
          <div className="chatbot-header" onClick={toggleChatbot}>
            <h4>Chat with us</h4>
          </div>
          <div className="chatbot-body">
            <div className="messages">
              {
              messages.map((msg, index) => (
                msg.user == true ?(
                  <div key={index} id='userBlock'>
                    <p id='User'>You</p>
                    <div className={msg.user ? 'message user' : 'message bot'}>
                      <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                    </div>
                  </div>
                ):(
                  <div key={index}>
                    <p id='Bot'>Bot</p>
                    <div className={msg.user ? 'message user' : 'message bot'}>
                      <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                    </div>
                  </div>
                )
              ))}
            </div>
            <div className="input-area">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatbot-toggle" onClick={toggleChatbot}>
          <img src={botIcon} alt="Bot Icon" id='icong-bg'/>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
