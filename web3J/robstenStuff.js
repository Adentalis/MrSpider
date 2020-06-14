const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f67704ac36e94096807d62b092b874bf");
const web3 = new Web3(provider);
web3.eth.net.isListening()
   .then(() => console.log('web3 is connected'))
   .catch(e => console.log('Wow. Something went wrong'));
const abi=[{"constant":false,"inputs":[{"name":"_greeting","type":"string"}],"name":"greet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGreeting","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
const contract_Address="0x1e2eCeE26F3f34F3De4E154A6FF1D8CdF3eFF4a3";
const contract = new web3.eth.Contract(abi, contract_Address);
contract.methods.getGreeting().call().then(console.log);

console.log("Hallo Linus Torwald");