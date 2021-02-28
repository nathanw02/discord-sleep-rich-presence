'use strict'

const DiscordRPC = require('discord-rpc');
const express = require('express');
const ngrok = require('ngrok');

module.exports = class SleepPresence{
    constructor(id){
        this.id = id;
        this.activity = {
            state: 'Sleeping...',
            startTimestamp: Date.now(),
            instance: false
        }
    }

    create(port){
        var rpc = new DiscordRPC.Client({transport: 'ipc'});
        let clientId = this.id;
        rpc.login({clientId});
        rpc.on('ready', async () => {
            let url = await ngrok.connect(port);
            console.log(`Startup: ${url}/online\nShutdown: ${url}/offline`);

            const app = express();
            app.listen(port);

            app.get('/online', (req, res) => {
                rpc.clearActivity();
                res.send('Online');
            });

            app.get('/offline', (req, res) => {
                rpc.setActivity(this.activity);
                res.send('Offline');
            });

        });
    }

    setText(text){
        this.activity.state = text;
    }

    setLargeImage(key){
        this.activity.largeImageKey = key;
    }

    setSmallImage(key){
        this.activity.smallImageKey = key;
    }
}