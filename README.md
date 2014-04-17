events-binding
==============

EventEmitter with amqp style binding for messages

https://www.npmjs.org/package/events-binding

```javascript
var Events = require('events-binding');

var events = new Events({'maxListeners': 5});

events
    .on('apple.iPhone.*', function() {
        console.log("iPhones", arguments);
    })
    .on('android.*', function() {
        console.log("android phones", arguments);
    });

events
    .emit('apple.iPhone.5', "iPhone 5") // OK
    .emit('android.nexus.5', "Nexus 5") // OK
    .emit('apple.iPad', "iPad air");	// No listener found (listener 'apple.*' would match)

events.off('android.*');
```