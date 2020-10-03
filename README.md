# Messenger-Sample

This is a quick Messenger Webhook Setup Sample using Node.js.

# Installation

> **requirement**: Node.js preferred version 13.9.0, Facebook Page and Messenger App.

Add Facebook Page to your Messenger App in Facebook Developers Dashboard and Generate Token. Rename .sample.env to .env and fill the information. You can find all the information in Facebook Developer Dashboard. The APP_SECRET can be found in the settings tab.

To run on your local machine, use Local Tunnel Service like NGROK and add the https:// URL in the .env file.

Run:

```
npm install
node index.js
```

The App will updated the callback URL, activate Get_Started Button and subscribe to the webhook events.

## Updating the experience

You can update the meesages.js & postback.js functions with your logic & flow.
