![Open Source](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# 123 AI-Chatbot

<div align ="center">
<img width="100" height="100" src="https://techolopia.com/wp-content/uploads/2020/10/profile.jpg">
<br>
</div>
<br>

This is a Facebook Messenger Node.js chatbot App with Wit.ai  integration. This App is NLP based, voice-enabled, and invokes Handover  Protocol from/to the page Inbox. In this tutorial, we will explore the  App features, and discuss the setup steps. Then, we will explain how to  customize your unique experience, and deploy the final App. With this  App, you can create a unique Messenger chatbot experience, only in few  minutes. You don't need to write or change any code, and you can train the App using the simple Wit.ai console. You can edit the App responses and configuration from a JSON file. It is an easy and simple process!

## Overview:

### How it work:

When you connect this App to your Facebook page, it can reply to the page messaging. If the App is in control, it will read the message, and use Wit.ai to understand the user intent from the text or voice input. Then the App will respond to the user with a predefined response which you can add for each intent. Moreover, the App can pass the conversation to the page inbox if the user needs customer service. In this case, the chatbot App will listen, and won't respond to the user input. The human agent can pass the conversation back to the chatbot from the page Inbox. Besides, this App can work with [any language Wit.ai supports](https://wit.ai/faq).
<br>
<div align ="center">
  <img width="800" height="400" src="https://techolopia.com/wp-content/uploads/2020/10/graph.jpg">
</div>

### App Features:

- **Messenger Profile:** When you setup the App, it will update the Messenger profile for the page. It will update the greeting message which the user see before he start the chat with  your page. Moreover, it will activate the get started button, and set up  a persistent menu. Finally, it will subscribe the App with the page, and update the callback url.
- **NLP & Voice-enabled:** The App uses [Wit.ai](https://wit.ai/) for Natural Language Processing. It also supports voice recognition. This will  make your chatbot more smarter! You can add new intents at any time from the Wit.ai App Dashboard. Also, you can keep training and improving  your App while it is live. You will find the live data in the Wit.ai console!
- **Handover Protocol:** This App is ready to use handover protocol from/to the page Inbox. In the persistent menu, there is a default button that will pass the conversation to the page Inbox. The human agent can pass the conversation back to the App from the Inbox.
- **Referrer & Web Plugin:** If you want to have a different experience for specific users! This App can have a different get started message for users based on the sources.  You can use links like ```https://m.me/page_id?ref=``` or QR codes. Each can have a different experience by using different starting Message. Moreover, the home page for this App have a Chat plugin with some sample controls.
- **Configuration File:** This App has a configuration file in JSON format. You can add new intents and entities with any response type and count for each. Also, you can  customize the greeting message, and the persistent menu from this file.

### Requirements:

> **Facebook Page**: You need to have a Facebook page to use with this App. When the users chat with your page, this chatbot App will take over the conversation and respond. To create a new Page, click [here](https://www.facebook.com/pages/create).

> **Facebook Developer Account**:  You need a Facebook Developer Account to use this  experience. If you don't have an account, create a new one from the [Facebook Developers website](https://developers.facebook.com/). Click "get started" on the top right of the page, and complete the steps.

> **Wit.ai Account**: You need a Wit.ai account to create a new Wit App and train it for the intents. To create one, go to [Wit.ai website](https://wit.ai/), and click "Continue with Facebook".


> **Node.js & NPM**: Node.js preferred version "latest" & NPM preferred version "latest". If you don't have them on your machine, go to [Node.js Website](https://nodejs.org/en/) to download Node.js & NPM. You can use [Glitch](https://glitch.com/) to run the App without installing Node.js on your machine.

> **FFMPEG Framework**: This framework help trans code audio formats from "mp4" to "mp3". The installation is different for each operating system. For windows users, you can read [this article] (http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/) which explains how to set it up. If you cannot set it up, use [Glitch](https://glitch.com/) to run the App, and you will have it ready to use.

> **Local Tunnel Service**: To expose the App from your local machine to public, you need a local tunnel service. If you don't have one, download ngrok from [Ngrok.com](http://ngrok.com) website. This will gives you a link to use as a callback url, and to access the App webpages from any browser. If you use [Glitch](https://glitch.com/), you don't need a local tunnel service.

# Installation:

You can download and run the App on your local machine, or you can use [Glitch](https://glitch.com/):

## Local Machine:

### Fork or Clone this Repo:

If you fork the repository, this will create a copy from the repository on your GitHub account. This can help you track your personal changes. Also, you can clone this source copy without fork. Open a new terminal and run the following commands to download the Repo to your machine.

```
// Clone the source:
git clone https://github.com/khaled-11/Messenger-Sample.git

// If you forked, clone your copy:
git clone https://github.com/your-user-name/Messenger-Sample.git

```
<br>
<div align ="center">
  <img width="800" height="400" src="https://media.giphy.com/media/Hl9bupOTxJpzEWQPOQ/giphy.gif">
</div>

## Glitch:

### Import from GitGub:

Go go [Glitch website](https://glitch.com/), and create a new project. Click "import from GitHub" and enter the repository link. If you forked the Repo, enter your link ```https://github.com/your-user-name/Messenger-Sample.git```. If not, enter the link for source code repository ```https://github.com/khaled-11/Messenger-Sample.git```.

<br>
<div align ="center">
  <img width="800" height="400" src="https://media.giphy.com/media/RBXhHW3kNz5wN07meK/giphy.gif">
</div>

## Update .env file:

Whether you cloned the code on your local machine or you are using [Glitch](https://glitch.com/), we need to gather some data. In the main folder (Messenger-sample), you will see a file called .sample.env, open this file. You will see APP_ID, APP_SECRET, PAGE_ID & PAGE_ACCESS_TOKEN. We will get these information from the Facebook developer account. The VERIFY_TOKEN is any random string you choose to verify the call back URL. We will get the Wit key from the [Wit.ai](https://wit.ai/) website after we create an App. The URL field is the ```https://``` link for the App server. If you use your local machine, enter the local tunnel link. For ngrok, run the command ```ngrok http 3000``` and use the provided ```https://``` link. If you use Glitch, enter the project URL from the share button.

** If you use your local machine to run the App, rename .sample.env to .env and update the data. If you use [Glitch](https://glitch.com/), add the environment variables to the Glitch .env file.

<br>
<div align ="center">
  <img width="800" height="400" src="https://media.giphy.com/media/c4jQ9FNVolUxRGt59E/giphy.gif">
</div>

### Facebook Developer Account:

After you create an account, if you didn't have one, create a new App.  Select "Manage Business Integrations", then click continue. When the App  loads, scroll down and look in the products for "Messenger". Click  setup on the Messenger Icon, and wait for the App to load. Scroll down and click "Add or Remove  Pages". Continue with your account and choose the page which you want to  integrate with the App. Now, you will see the page and a button  "Generate Token". Click this button, check "I understand", and copy the token. This token can now control your page messaging, so don't share it with anyone. Add this token to the environment variables in the .env  file. Go back to the same page, you will see the page id under the page name, copy it and add it to the variables. On the same page, you will  see the App ID on the top of the page. Copy the app id, and add it to  the file. Now, we need only the App secret from the Facebook Developer  account. In the same App page, above products, you will see "settings"  tab. Expand the menu, and go to basic settings. You will see the App  secret on the top right corner. Click "show", and copy the App secret.  Add it to the file, and now we finished with what we need from the  Facebook Developer account. 

<br>
<div align ="center">
  <img width="800" height="400" src="https://media.giphy.com/media/niMCc72tIhat6Rdtej/giphy.gif">
</div>

### Wit.ai Account:

After you "Continue with Facebook" on the [Wit.ai](http://wit.ai) website, create "New App". Choose App name, fill the details, and click create. In the App dashboard, click "settings" tab, and copy the "Server Access Token". Add it in the WIT_KEY field in the .env file. Now we have the .env file ready!

## Download Packages & Run the App:

Run the commands below to download the required packages and start the App server.

```
npm install
node index.js
```

If everything went okay, you will see the App updating the Messenger profile and the callback url. After all the updates are done, you will see a link which you can use to test your App. If you have an open conversation with this page before, delete the conversation before you proceed. Go to the link, and you will see an updated greeting message, and the Get Started Button. When you click get started, you will see a default starting messages "three in a row". Also, you will see a persistent menu with a "Customer Service" button. This button will handover the conversation to the page inbox, but we need a quick setup to activate it. Also, we will need to add some intents and train the Wit App with some utterances to test this demo.

## Handover Protocol Setup:

Go to the Facebook page settings, then advanced Messaging. You will find "Handover Protocol" & "Messenger receiver" click "configure" then choose our App as primary receiver. Choose the page inbox as a secondary receiver, and it is now ready! Go back to the conversation and click "Customer Service" from the persistent menu. You will see a default message, and if you go to the Facebook page Inbox, you will see the conversation. You can assign the conversation to other admins or reply. Once the agent finish with the customer, click "move to done" from the inbox. Now, the handover protocol will hand the thread control back to the bot and follow with a survey.

## Adding Intents, and train the App:
