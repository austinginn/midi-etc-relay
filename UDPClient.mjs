//UDP MESSAGE SEND | AUSTIN GINN 2023
//simple class to create udp socket and send messages
import dgram from 'dgram';

class UDPClient {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.client = dgram.createSocket('udp4');
    }

    send(message) {
        const buffer = Buffer.from(message);
        this.client.send(buffer, 0, buffer.length, this.port, this.ip, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Message sent to ${this.ip}:${this.port}: ${message}`);
            }
        });
    }

    close() {
        this.client.close();
    }
}

export default UDPClient;
