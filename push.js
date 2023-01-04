const express = require('express');
const webpush = require('web-push');

const app = express();

let vapidKeys = {
  publicKey: 'BPanIOg2KCAF4SapeX2y1lewqPYpaXTwIDDr51HHzjCAHmh2_GpeYQS43LeaOf8KkNqp_erull167m2NA9HZU5A',
  privateKey: 'R9jAj_s5AbM0oqko_wq4nXk7-Kbq0hzt1FX1mBlCWR0'
}

// Set the public and private keys for the push notification
webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Set up a route to accept push notification subscriptions
app.post('/subscribe', (req, res) => {
  // Save the subscription object received from the client
  saveSubscription(req.body).then(() => {
    res.status(201).json({});
  }).catch((err) => {
    res.status(500).json({error: err});
  });
});

// Set up a route to send push notifications
app.post('/send-notification', (req, res) => {
  // Get the subscription object
  getSubscription().then((subscription) => {
    // Send the push notification
    webpush.sendNotification(subscription, 'Your Push Notification Message').catch((err) => {
      console.error(err);
    });
  });
});

// Start the server
app.listen(8000, () => {
  console.log('Server listening on port 3000');
});
