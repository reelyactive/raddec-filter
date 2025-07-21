raddec-filter
=============

A __raddec-filter__ facilitates the filtering of radio decoding (__raddec__) data data based on a standardised set of parameters.

__raddec-filter__ is a lightweight [Node.js package](https://www.npmjs.com/package/raddec-filter) that is typically used with a [barnacles](https://github.com/reelyactive/barnacles) instance and the barnacles-x family of modules which relay __raddec__ data to specific endpoints.  Together these packages are core components of reelyActive's [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source IoT middleware.


Hello raddec-filter!
--------------------

```javascript
const Raddec = require('raddec');
const RaddecFilter = require('raddec-filter');

let parameters = {
    acceptedTransmitterSignatures: [ 'aabbccddeeff/2', '112233445566/2' ],
    acceptedTransmitterIdTypes: [ Raddec.identifiers.TYPE_EUI48 ],
    acceptedReceiverSignatures: [ '001bc50940810000/1' ],
    acceptedReceiverIdTypes: [ Raddec.identifiers.TYPE_EUI64 ],
    acceptedEvents: [ Raddec.events.APPEARANCE, Raddec.events.DISPLACEMENT ],
    acceptedPackets: [ '1234', /abcd/ ],
    minRSSI: -85,
    maxRSSI: -30
}

let filter = new RaddecFilter(parameters);

let raddec = new Raddec({ /* Raddec properties */ });

let accepted = filter.isPassing(raddec);

console.log(accepted); // true or false
```


Filter parameters
-----------------

The following parameters are supported:

### acceptedTransmitterSignatures

Array of transmitter signatures to accept.  A filtered raddec must have its transmitter signature (transmitterId and transmitterIdType) included in the list to pass.  For example, to only allow raddecs from a transmitter with EUI-48 identifier aa:bb:cc:dd:ee:ff to pass:

```javascript
let acceptedTransmitterSignatures = [ 'aabbccddeeff/2' ];
```

### acceptedTransmitterIdTypes

Array of transmitterIdTypes to accept.  See the [raddec identifier types](https://github.com/reelyactive/raddec/#identifier-types) for details.  A filtered raddec must have a transmitterIdType included in the list to pass.  For example, to only allow raddecs from transmitters with EUI-64, EUI-48 and random 48-bit identifiers to pass:

```javascript
let acceptedTransmitterIdTypes = [ Raddec.identifiers.TYPE_EUI64,
                                   Raddec.identifiers.TYPE_EUI48,
                                   Raddec.identifiers.TYPE_RND48 ];
```

### acceptedReceiverSignatures

Array of receiver signatures to accept.  A filtered raddec must have its strongest receiver's signature (receiverId and receiverIdType) included in the list to pass.  For example, to only allow raddecs with strongest receiver with EUI-64 identifier 00-1b-c5-09-40-81-00-00 to pass:

```javascript
let acceptedReceiverSignatures = [ '001bc50940810000/1' ];
```

### acceptedReceiverIdTypes

Array of receiverIdTypes to accept.  See the [raddec identifier types](https://github.com/reelyactive/raddec/#identifier-types) for details.  A filtered raddec must have its strongest receiver's receiverIdType included in the list to pass.  For example, to only allow raddecs decoded strongest by receivers with EUI-64 and EUI-48 identifiers to pass:

```javascript
let acceptedReceiverIdTypes = [ Raddec.identifiers.TYPE_EUI64,
                                Raddec.identifiers.TYPE_EUI48 ];
```

### acceptedEvents

Index list (array) of events to accept.  See the [raddec event types](https://github.com/reelyactive/raddec/#event-types) for details.  A filtered raddec must include _at least one_ of these events to pass.  For example, to only allow raddecs that correspond with appearance or displacement events to pass:

```javascript
let acceptedEvents = [ Raddec.events.APPEARANCE, Raddec.events.DISPLACEMENT ];
```

### acceptedPackets

Index list (array) of packets to accept.  Each element in the array can be either a String or a RegExp.  A filtered raddec must include _at least one_ of these packets to pass.  For example, to only allow raddecs with packets that are exactly '1234' _or_ contain 'abcd':

```javascript
let acceptedPackets = [ '1234', /abcd/ ];
```

### minRSSI and maxRSSI

Integer threshold of RSSI (signal strength) to accept.  A filtered raddec must have a strongest receiver which passes any and all thresholds.  For example, to allow only raddecs with strongest receiver having RSSI in the range of -85 to -60 dBm (inclusive):

```javascript
let minRSSI = -85;
let maxRSSI = -60;
```


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2019-2025 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
