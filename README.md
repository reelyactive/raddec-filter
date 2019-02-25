raddec-filter
=============

Filter for raddecs based on a standardised set of parameters.


Filter properties
-----------------

The following properties are supported.

### acceptedTransmitterIdTypes

Array of transmitterIdTypes to accept.  A filtered raddec must have a transmitterIdType included in the list to pass.

```javascript
const Raddec = require('raddec');
const RaddecFilter = require('raddec-filter');

let acceptedTransmitterIdTypes = [ Raddec.identifiers.TYPE_EUI64,
                                   Raddec.identifiers.TYPE_EUI48,
                                   Raddec.identifiers.TYPE_RND48 ];

let filter = new RaddecFilter({ acceptedTransmitterIdTypes:
                                                acceptedTransmitterIdTypes });
```

### acceptedReceiverIdTypes

Array of receiverIdTypes to accept.  A filtered raddec must have its strongest receiver's receiverIdType included in the list to pass.

```javascript
const Raddec = require('raddec');
const RaddecFilter = require('raddec-filter');

let acceptedReceiverIdTypes = [ Raddec.identifiers.TYPE_EUI64,
                                Raddec.identifiers.TYPE_EUI48 ];

let filter = new RaddecFilter({ acceptedReceiverIdTypes:
                                                   acceptedReceiverIdTypes });
```

### acceptedEvents

Index list (array) of events to accept.  A filtered raddec must include _at least one_ of these events to pass.

```javascript
const Raddec = require('raddec');
const RaddecFilter = require('raddec-filter');

let acceptedEvents = [ Raddec.events.APPEARANCE, Raddec.events.DISPLACEMENT ];

let filter = new RaddecFilter({ acceptedEvents: acceptedEvents });
```


License
-------

MIT License

Copyright (c) 2019 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
