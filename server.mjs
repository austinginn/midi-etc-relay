import UDPClient from './UDPClient.mjs';
import midi from 'midi';

//etc
const etc_port = 4703;
const etc_ip = "192.168.40.101";
const etc = new UDPClient(etc_ip, etc_port);

//midi
const midi_port_name = "U2MIDI Pro";
const trans_midi_channel = 158; // ch.15
const push_midi_channel = 159; // ch.16

//set up midi input
const input = new midi.Input();

//get midi port index that matches name
const index = getMidiPortIndex(midi_port_name);
if (index == -1) { console.log("midi port not found"); process.exit(); };

//callback for midi input
input.on('message', (deltaTime, message) => {
	console.log(`msg: ${message} delta: ${deltaTime}`);

	//midi channel with support for fade up and down times
	//midi ch.15, note = preset number, velocity = fade up time in seconds (maxed at 29 seconds)
	if (message[0] == trans_midi_channel) {
		etc.send(`E$pst act: 1,${message[1]}, ${message[2]}\r`);
		return;
	}
	
	//midi channel instant preset load
	if (message[0] == push_midi_channel && message[2] == 127) {
		etc.send(`E$pst act: 1,${message[1]}, 0\r`);
		return;
	}
});

//open midi port
input.openPort(index);

//get midi port index
function getMidiPortIndex(name) {
	const avail_ports_count = input.getPortCount();
	for (let i = 0; i < avail_ports_count; i++) {
		if (input.getPortName(i).includes(name)) {
			return i;
		}
	}
	return -1;
}
