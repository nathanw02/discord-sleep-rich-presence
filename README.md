# discord-sleep-rich-presence
Node.js module to create a Discord Rich Presence that shows how long you have been sleeping for (from computer shutdown to computer startup)

It is recommended to use a Windows server and installing Discord on it

This module creates a web server that allows your main computer to send shutdown/startup commands which will then change your Discord presence

![Image1](https://i.gyazo.com/f497bf389e537fdc3b3320538b6d62ec.png)

![Image2](https://i.gyazo.com/dfa1a3ad79d61562374f44598d93223b.png)


## Getting started

```
npm install discord-sleep-rich-presence
```

```javascript
const SleepPresence = require('discord-sleep-rich-presence');

const clientId = '703777701370265680';

const presence = new SleepPresence(clientId);

presence.setText('Currently sleeping...');
presence.setLargeImage('name-of-large-image');
presence.setSmallImage('name-of-small-image');

const PORT = 3000
presence.create(PORT);
```

For Windows:

On your main computer, run `gpedit.msc`

Navigate to `Windows Settings > Scripts (Startup/Shutdown)`

For Startup, add a bat file script that GET requests to (ngrok link)/online

Example:

```
curl https://asdf.ngrok.io/online
```

For Shutdown, do the same, but with the path `/offline`

Example:

```
curl https://asdf.ngrok.io/offline
```


On your Windows server, install Discord and log into your account (leave Discord running)

Also install Node.js and the program you just created

Run the program on the Windows server as well
