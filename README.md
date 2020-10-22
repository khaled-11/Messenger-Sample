![Open Source](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# 123 AI-Chatbot

This is a Facebook Messenger Node.js chatbot App with Wit.ai integration. This App is NLP based, voice-enabled, and utilizes Handover Protocol from/to the page Inbox. In this tutorial, we will explore the App features, and discuss the setup steps. Then, we will explain how to customize your unique experience, and deploy the final App. Using this sample App, you can create a unique Messenger chatbot experience, only in few minutes. 

## Overview:

### App Features:

- **Messenger Profile:** Once you successfully set up the App, it will update the Messenger profile for the page. It will update the greeting message which the user see before he start the chat with your page. Moreover, it will activate the get started button, and set up a persistent menu.
- **NLP & Voice-enabled:** The App uses [Wit.ai](https://wit.ai/) for Natural Language Processing, and for speech processing. This will make your chatbot more smarter! You can add new intents at any time from the Wit.ai App Dashboard. Also, you can keep training and improving your App after deploying the final experience.
- **Handover Protocol:** This App is ready to use handover protocol from/to the page Inbox. In the persistent menu, there is a default button that will pass the conversation to the page Inbox. The human agent can pass the conversation back to the App from the Inbox.
- **Referrer & Web Plugin:** If you want to customize a different experience for users based on the source, this App can do that! You can have a different get started message for users chatting directly with your page, users using the plugin on your website, and users with ```https://m.me/page_id?ref=``` links. Also, in the home page of this App, you can find a chat plugin sample to test.
- **Configuration File:** This App has a configuration file in JSON format. You can add new intents with multiple responses for each, in any format supported by the Messenger platform. Also, you can customize the greeting message, and the persistent menu in this file.

### Requirements:

> **Facebook Page**: You need to have a Facebook page to use with this App. When the users chat with your page, this chatbot App will take over the conversation and respond. To create a new Page, click [here](https://www.facebook.com/pages/create).

> **Facebook Developer Account**: You need to have a Facebook Developer Account to create a new App so you can integrate this experience. If you don't have an account, create a new one on the [Facebook Developers website](https://developers.facebook.com/), then click "get started" on the top right of the page.

> **Wit.ai Account**: You need a Wit.ai account to create a new Wit App and define your intents. To create one, go to [Wit.ai website](https://wit.ai/), and click "Continue with Facebook".


> **Node.js & NPM**: Node.js preferred version "latest" & NPM preferred version "latest". If you don't have them on your machine, go to [Node.js Website](https://nodejs.org/en/) to download Node.js & NPM. 

> **FFMPEG Framework**: You need to have FFMPEG framework on your machine and accessible from the command line. The installation process is different for each operating system. For windows, you can read [this article](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/) which explains how to set it up.

# Installation:

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
