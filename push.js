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

app.get('/', (req, res) => {
    // Save the subscription object received from the client
    res.status(200).json({
        test:"server on"
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
app.listen(process.env.PORT, () => {
  console.log('Server listening on port ', process.env.PORT);
});

/**
 * 
 * self.addEventListener('push', function(event) {
	const notification = event.data.json();
	const title = notification.title;
	const options = {
	  body: notification.body,
	  icon: notification.icon,
	};
	event.waitUntil(self.registration.showNotification(title, options));
  });
 * 
 * ffront
 * 		function sendSubscriptionToBackend(subscription) {
			return fetch('http://localhost:8000/subscribe', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify(subscription),
			});
			}

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function() {
          console.log("Service Worker Registered");

		  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
			// Subscribe the user to push notifications
			serviceWorkerRegistration.pushManager.subscribe()
			.then(function(subscription) {
				// Send the subscription object to the backend
				sendSubscriptionToBackend(subscription);
			})
			.catch(function(error) {
				console.error(error);
			});
		});
		 
        });
      }
 */