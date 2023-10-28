## Overview

Midi-etc-relay is a utility built in nodejs to allow midi control of ETC Echotouch mk2 touch panels.  Midi messages are converted to ETC's UDP control scheme.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Prerequisites

Make sure you have the following prerequisites installed:

- **Node.js:** See - [nodejs.org](https://nodejs.org/) for installation instructions.
- **Platform Specific Instructions:** This utility uses node-midi which has platform specific requirements.  See the [node-midi repo](https://github.com/justinlatimer/node-midi) for more information.

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/austinginn/midi-etc-relay.git
    ```
2. Navigate to the directory:
    ```shell
    cd midi-etc-relay
    ```
3. Install dependecies (issues installing see [Prerequisites](#prerequisites)):
    ```shell
    npm install
    ```

## Configuration

1. First time run to create config file:
    ```shell
    npm run
    ```
    Read output carefully.  This will provide you with the names of the connected midi ports on your device.
2. Modify the config.json file:
    ```shell
    nano config.json
    ```
    - Edit the config file with the correct ETC Echotouch mk2 port and ip address found under *setup -> settings -> network -> string setup*
    - Edit the config file with the name of the midi port you would like to use.  This is provided during the first run.  You can view the connected midi ports at any time with:
    ```shell
    npm midi
    ```
    The final config.json file should look something like this:
    ```json
    {
        "etc_port": 4703,
        "etc_ip": "192.168.0.2",
        "midi_port_name": "U2MIDI Pro"
    }
    ```

## Usage
```shell
npm run
```
### MIDI Messages
The relay opperates on two midi channels: 15 & 16.  Learn more about the midi protocol here: [MIDI Essentials](https://ccrma.stanford.edu/~craig/articles/linuxmidi/misc/essenmidi.html)

#### MIDI Channel 15:
This channel is used for recalling presets on the Echotouch with specific fade times.  For example, to recall preset 1 on the Echotouch, with a 10 second fade, the corresponding midi message would be:
 ```
 *Channel 15*
 NOTE ON
 NOTE #1
 Velocity 10
 ```
 The note value corresponds to the preset number, and the velocity corresponds to the fade time.  The relay only supports "Space 1" on the Echotouch.

 The Echotouch mk2 supports fade times up to 25 seconds.  Any velocity value > 25 will result in the default preset fade time programmed on the Echotouch.

#### MIDI Channel 16
This channel is used for recalling presets on the Echotouch with the default fade time set in the Echotouch. NOTE OFF messages are ignored. For example, to recall preset 2 on the Echotouch, with the default fade time the corresponding midi message would be:
```
*CHANNEL 16*
NOTE ON
NOTE #2
VELOCITY 127
```
Any velocity value > 0 will work on channel 16

## Contributing
If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request, describing your changes in detail.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT License

## Contact
Hey! My name is Austin.  I specialize in creating custom AVL Integration solutions. If you're interseted in collaborating you can reach me at [austinleeginn@gmail.com](mailto:austinleeginn@gmail.com).