import UDPClient from './UDPClient.mjs';
import JSONFileHandler from './json-file-handler.mjs';
import midi from 'midi';

//Init file handler and load config
const configFileHandler = new JSONFileHandler('./config.json');

//load config file
const config = await loadConfig();

//etc
const etc = new UDPClient(config.etc_ip, config.etc_port);

//midi
//ch.15 - use for setting fade times. Designed to work with single note midi messages.
//note off messages will trigger preset value instantly without a fade
//ch.16 - use for loading presets with default fade values set in echotouch. Ingores note off messages.
const midi_port_name = config.midi_port_name;
const trans_midi_channel = 158; // ch.15 - see above for use cases
const push_midi_channel = 159; // ch.16 - see above for use cases

//set up midi input
const input = new midi.Input();

//get midi port index that matches name
const index = getMidiPortIndex(midi_port_name);
if (index == -1) {
	console.log("*****************");
	console.log("Midi port not found. List of available midi ports: ");
	const avail_ports_count = input.getPortCount();
	for (let i = 0; i < avail_ports_count; i++) {
		console.log(input.getPortName(i));
	}
	console.log("*****************");
	console.log("Set midi_port_name in config.json to the correct port name listed above");
	process.exit();
};

//callback for midi input
input.on('message', (deltaTime, message) => {
	console.log(`msg: ${message} delta: ${deltaTime}`);

	//midi channel with support for fade up and down times
	//midi ch.15, note = preset number, velocity = fade up time in seconds (echotouch maxes at 25 seconds)
	//any thing above 25 velocity will trigger preset default values in etc
	//0 velocity or note off will trigger preset instantly
	if (message[0] == trans_midi_channel) {
		etc.send(`E$pst act: 1,${message[1]}, ${message[2]}\r`);
		return;
	}

	//midi ch.16, note = preset number, velocity > 0
	//echotouch presets recalled using ch.16 will recall presets using default fade times set in echotouch
	//note off messages are ignored.
	if (message[0] == push_midi_channel && message[2] > 0) {
		etc.send(`E$pst act: 1,${message[1]}, 127\r`);
		return;
	}
});

//open midi port
input.openPort(index);

//error callbacks
process.on('uncaughtException', (error) => {
	console.log(`Uncaught Exception: ${error.message}`);
	process.exit(1); // Exit the application or handle it appropriately.
});

process.on('unhandledRejection', (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

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

//load config file
async function loadConfig() {
	try {
		const config = await configFileHandler.readJSON();
		console.log("Config loaded: ");
		console.log(config);
	} catch (error) {
		console.log("Error loading config file. Creating default config.json file.");

		//print available midi ports
		console.log("*****************");
		console.log("Available midi ports:");
	
		const input = new midi.Input();
		const avail_ports_count = input.getPortCount();
		for (let i = 0; i < avail_ports_count; i++) {
			console.log(input.getPortName(i));
		}
		console.log("*****************");
		console.log("Set midi_port_name in config.json to the correct port name listed above");

		//create config file
		const config = {
			etc_port: 4703,
			etc_ip: "192.168.0.2",
			midi_port_name: "",
		};

		//save config file
		await configFileHandler.saveJSON(config);
		console.log("Config.json file created with default values:");
		console.log(config);
		console.log("Edit config.json with correct values for your environment and restart server");
		process.exit();
	}
}
