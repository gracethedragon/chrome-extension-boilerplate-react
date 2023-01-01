
const secrets = require('secrets')
// console.log('This is the background page.');
// console.log('Put the background scripts here.');
const axios = require("axios");
const { generateConfig } = require("util");
// // const nodemailer = require("nodemailer");
// // const CONSTANTS = require("./constants");
// const { google } = require("googleapis");

// require("dotenv").config();
console.log(secrets.CLIENT_ID)
// const oAuth2Client = new google.auth.OAuth2(
//   secrets.CLIENT_ID,
//   secrets.CLIENT_SECRET,
//   secrets.REDIRECT_URL,
  
// );

// oAuth2Client.setCredentials(secrets.REFRESH_TOKEN );

async function getUser(req, res) {
  try {
    
    const url = `https://gmail.googleapis.com/gmail/v1/users/gracekohyt@gmail.com/profile`;
    // const { token } = await oAuth2Client.getAccessToken();
    // const config = generateConfig(url, token);
    // const response = await axios(config);
    // res.json(response.data);
    console.log(url)
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}


chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
    console.log('runtime script run')
    console.log(chrome)
  });

// Set up a listener for the "focus" event, which is triggered when a tab becomes the focused tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
  // Get the URL of the focused tab
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    // Log the URL of the focused tab to the console
    console.log(tab.url);
    if (tab.url.includes("https://mail.google.com/") || tab.url.includes("https://inbox.google.com/")){
      console.log('is gmail')
      chrome.action.setBadgeText({
        text: "ON",
      });
      getUser()
    } else {
      console.log('is not')
    }
  });
});


