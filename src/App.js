import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import web3
import { Contract, Web3} from "web3";

// import contract adress and ABI
const ADDRESS ="0x1c7a0adB88eC8Cb33c4494E32bC9Afb1dA51a108";
const ABI = [{"inputs":[{"internalType":"uint256","name":"_startingpoint","type":"uint256"},{"internalType":"string","name":"_startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const [number, setNumber] = useState("none");
  const [currentMessage, setCurrentMessage] = useState("none");
  const [newMessage, setNewMessage] = useState(" ");

  // initialize web 3 object
  const web3 = new Web3(window.ethereum);

  // initialize contract ABI and ADDRESS
  const myContract =new web3.eth.Contract(ABI , ADDRESS);

  // reading functions 
  // number
  async function getNumber(){
    const result = await myContract.methods.getNumber().call();

    setNumber(result.toString())
  }
  // message
  async function getMessage() {
    const message = await myContract.methods.message().call();
    setCurrentMessage(message);
    
  }
  // writting
  //number
  // increase number
  async function increaseNumber() {
    // connecting the wallet
    const accountsConnected = await web3.eth.requestAccounts();
    const tx = await myContract.methods.increaseNumber().send({ from: accountsConnected[0]});

    getNumber();
  }
  // decrease the number
  async function decreaseNumber() {
    const accountsPresent = await web3.eth.requestAccounts();
    const transact = await myContract.methods.decreaseNumber().send({ from: accountsPresent[0]});

    getNumber();
    
  }
  async function updateMessage() {
    const connectedAccounts = await web3.eth.requestAccounts();
    const Transaction = await myContract.methods.setMessage(newMessage).send({from: connectedAccounts[0] });
    getMessage();
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         <button onClick={getNumber}>Get Number</button> <br></br>
         
         <button onClick={increaseNumber}>Incease Number</button> <br></br>
         <button onClick={decreaseNumber}>Decrease Number</button> <br></br>
         <br></br>
         <p> Number: {number}</p>
         <button onClick={getMessage}>Get Message</button> <br></br>
         <p>Message: {currentMessage}</p> <br></br>
         <input
          type="text" 
          value={newMessage} 
          onChange={(e) =>setNewMessage(e.target.value)} 
          placeholder="Enter New Message"
          />
            <br></br>
         <button onClick={updateMessage}>Update Message </button>
         <br></br>
      </header>
    </div>
  );
}

export default App;
