const {Wit, log} = require('node-wit');
const client = new Wit({accessToken: 'WU5POVT2A3HBE3NUKYZNDSMPWXSEDRL6'});
client.message("c'est qui alain delon ???", {})
.then((data) => {
  console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
})
.catch(console.error);
