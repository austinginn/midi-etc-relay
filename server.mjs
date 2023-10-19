import UDPClient from './UDPClient.mjs';

const port = 4703;
const ip = "";

const etc = new UDPClient("172.22.0.59", 4703);

const message = 'E$pst act: 1, 1, 0\r';

etc.send(message);
