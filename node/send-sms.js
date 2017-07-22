var accountSid = 'ACa294a80f87ef7364448c6fda9b39ba1b'; // Your Account SID from www.twilio.com/console
var authToken = '21236a8e4f0f7e571b8980727ef40f8d';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'OMG THIS WORKS',
    to: '+18587613624',  // Text this number
    from: '+18582958045 ' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

console.log('hello world');