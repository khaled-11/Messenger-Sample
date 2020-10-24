![Open Source](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# 123 AI-Chatbot

<div align ="center">
<img width="100" height="100" src="https://techolopia.com/wp-content/uploads/2020/10/profile.jpg">
<br>
</div>
<br>

This is a Facebook Messenger Node.js chatbot App with Wit.ai integration. This App is NLP based, voice-enabled, and invokes Handover Protocol from/to the page Inbox. In this tutorial, we will explore the App features, and discuss the setup steps. Then, we will explain how to customize your unique experience, and deploy the final App. With this App, you can create a unique Messenger chatbot experience, only in few minutes.


## Overview:

### How it work:

When you connect this App to your Facebook page, it will take over the page messaging. The App will read the message, and use Wit.ai to understand the user intent from a text or voice. Then the App will respond to the user with a predefined response which we defined for each intent. Moreover, the App can pass the conversation to the page inbox if the user needs customer service. In this case, the chatbot App will listen, and won't respond to the user input. The human agent can pass the conversation back to the chatbot from the page Inbox. 
<br>
<div align ="center">
  <img width="800" height="400" src="https://techolopia.com/wp-content/uploads/2020/10/graph.jpg">
</div>

### App Features:

- **Messenger Profile:** When you setup the App, it will update the Messenger profile for the page. It will update the greeting message which the user see before he start the chat with  your page. Moreover, it will activate the get started button, and set up  a persistent menu.
- **NLP & Voice-enabled:** The App uses [Wit.ai](https://wit.ai/) for Natural Language Processing. It also supports voice recognition. This will  make your chatbot more smarter! You can add new intents at any time from the Wit.ai App Dashboard. Also, you can keep training and improving  your App while it is live.
- **Handover Protocol:** This App is ready to use handover protocol from/to the page Inbox. In the persistent menu, there is a default button that will pass the conversation to the page Inbox. The human agent can pass the conversation back to the App from the Inbox.
- **Referrer & Web Plugin:** If you want to have a different experience for specific users! This App can have a different get started message for users based on the sources.  You can use links like ```https://m.me/page_id?ref=``` or QR codes. Each can have a different experience by using different starting Message. Moreover, the home page for this page have a Chat plugin with some sample controls.
- **Configuration File:** This App has a configuration file in JSON format. You can add new intents and entities with any response type and count for each. Also, you can  customize the greeting message, and the persistent menu from this file.

### Requirements:

> **Facebook Page**: You need to have a Facebook page to use with this App. When the users chat with your page, this chatbot App will take over the conversation and respond. To create a new Page, click [here](https://www.facebook.com/pages/create).

> **Facebook Developer Account**: You need to have a Facebook Developer Account to create a new App so you can integrate this experience. If you don't have an account, create a new one on the [Facebook Developers website](https://developers.facebook.com/), then click "get started" on the top right of the page.

> **Wit.ai Account**: You need a Wit.ai account to create a new Wit App and define your intents. To create one, go to [Wit.ai website](https://wit.ai/), and click "Continue with Facebook".


> **Node.js & NPM**: Node.js preferred version "latest" & NPM preferred version "latest". If you don't have them on your machine, go to [Node.js Website](https://nodejs.org/en/) to download Node.js & NPM. 

> **FFMPEG Framework**: You need to have FFMPEG framework on your machine and remote server. This is used to transcode the audio file from the Messenger "mp4 format" to "mp3 format" for the Wit speech API. For windows, you can read [this article](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/) which explains how to set it up.

> **Local Tunnel Service**: To expose the App on your local machine to public, you need a local tunnel service. If you don't have one, download ngrok from [Ngrok.com](http://ngrok.com) website. This will gives you a link to use as a callback url, and to access the App webpages from any browser.

# Installation:

You can download and install the App on your local machine as following:

## Clone the source code:

You can download the code as zip file from the green button "Code", or clone the repository using the command line.

```
git clone https://github.com/khaled-11/Messenger-Sample.git
```

Now, whether you downloaded or cloned the Repo, go to the main folder "messenger-sample", and rename the file .sample.env to .env . Open the new .env file in any editor, and let's complete the required data.

## Updating .env file:

In the .env file, you need to add APP_ID, APP_SECRET, PAGE_ID, PAGE_ACCESS_TOKEN, VERIFY_TOKEN, WIT_KEY, and URL. For the VERIFY_TOKEN, you can enter any random string which will be used to verify the callback url. For the URL, enter the url from the local tunnel provider. If you use ngrok, run the command ```ngrok http 3370``` and copy the provided ```https://``` link. Then complete the remaining data from the Facebook Developer & Wit.ai accounts.

### Facebook Developer Account:

Once you created an account, if you did't have one, create a new App. Select "Manage Business Integrations", then click continue. When the App loads, scroll down and look in the products for "Messenger". Click setup on the Messenger Icon, and wait for the App to load. When the App loads, on the left menu, under products, you will see Messenger. Expand the menu, and click settings. Scroll down and click "Add or Remove Pages". Continue with your account and choose the page which you want to integrate with the App. Now, you will see the page and a button "Generate Token". Click this button, checnk I understand, and copy the token. This token can now control your page messaging, so don't share it with anyone. Add this token to the environment variables in the .env file. Go back to the same page, you will see the page id under the page name, copy it and add it to the variables. On the same page, you will see the App ID on the top of the page. Copy the app id, and add it to the file. Now, we need only the App secret from the Facebook Developer account. In the same App page, above products, you will see "Settings" tab. Expand the menu, and go to basic settings. You will see the App secret on the top right corner. Click "show", and copy the App secret. Add it to the file, and now we are done with what we need from the Facebook Developer account.

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
