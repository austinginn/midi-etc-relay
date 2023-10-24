import UDPClient from './UDPClient.mjs';
import midi from 'midi';

const etc_port = 4703;
const ip = "";
const midi_port_name = "U2MIDI Pro";

const etc = new UDPClient("172.22.0.59", etc_port);

//set up midi input
const input = new midi.Input();

//get midi port index that matches name
const index = getMidiPortIndex(midi_port_name);
console.log(index);
if(index == -1){ console.log("midi port not found"); return -1};




//callback
input.on('message', (deltaTime, message) => {
	console.log(`msg: ${message} delta: ${deltaTime}`);
});


//open port if available

//







//const message = 'E$pst act: 1, 1, 0\r';

//etc.send(message);


//get midi port index
function getMidiPortIndex(name){
	const avail_ports_count = input.getPortCount();
	for(let i = 0; i < avail_ports_count; i++){
		if(input.getPortName(i).includes(name)){
			return i;
		}
	}
	return -1;
}
