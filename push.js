var push = require('web-push');

let vapidKeys = {
  publicKey: 'BPanIOg2KCAF4SapeX2y1lewqPYpaXTwIDDr51HHzjCAHmh2_GpeYQS43LeaOf8KkNqp_erull167m2NA9HZU5A',
  privateKey: 'R9jAj_s5AbM0oqko_wq4nXk7-Kbq0hzt1FX1mBlCWR0'
}

push.setVapidDetails('mailto:test@travtion.com',vapidKeys.publicKey, vapidKeys.privateKey )

let sub = {};

push.sendNotification(sub, "test message")