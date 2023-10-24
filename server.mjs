import UDPClient from './UDPClient.mjs';
import midi from 'midi';

const etc_port = 4703;
const ip = "";

const etc = new UDPClient("172.22.0.59", etc_port);

//set up midi input
const input = new midi.Input();

//log total available input ports
const avail_ports_count = input.getPortCount();
console.log(avail_ports_count);

//itterate through available ports and log names
for(let i = 0; i <= avail_ports_count; i++){
	console.log(i, input.getPortName);
}

//callback
input.on('message', (deltaTime, message) => {
	console.log(`msg: ${message} delta: ${deltaTime}`);
});


//open port if available

//







//const message = 'E$pst act: 1, 1, 0\r';

//etc.send(message);
