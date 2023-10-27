//MIDI-HELPER | AUSTIN GINN 2023
//prints available midi ports
import midi from 'midi';

const input = new midi.Input();

//print available midi ports:
console.log("Available midi ports:");
console.log("*****************");
const avail_ports_count = input.getPortCount();
for (let i = 0; i < avail_ports_count; i++) {
    console.log(input.getPortName(i));
}
console.log("*****************");