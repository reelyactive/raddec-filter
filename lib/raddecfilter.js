/**
 * Copyright reelyActive 2019-2020
 * We believe in an open Internet of Things
 */


/**
 * RaddecFilter Class
 * Maintain and apply filter parameters for raddecs.
 */
class RaddecFilter {

  /**
   * RaddecFilter constructor
   * @param {Object} parameters The filter parameters.
   * @constructor
   */
  constructor(parameters) {
    parameters = parameters || {};

    if(parameters.hasOwnProperty('acceptedTransmitterSignatures') &&
       Array.isArray(parameters.acceptedTransmitterSignatures)) {
      this.acceptedTransmitterSignatures =
                                     parameters.acceptedTransmitterSignatures;
    }

    if(parameters.hasOwnProperty('acceptedTransmitterIdTypes') &&
       Array.isArray(parameters.acceptedTransmitterIdTypes)) {
      this.acceptedTransmitterIdTypes = parameters.acceptedTransmitterIdTypes;
    }

    if(parameters.hasOwnProperty('acceptedReceiverSignatures') &&
       Array.isArray(parameters.acceptedReceiverSignatures)) {
      this.acceptedReceiverSignatures = parameters.acceptedReceiverSignatures;
    }

    if(parameters.hasOwnProperty('acceptedReceiverIdTypes') &&
       Array.isArray(parameters.acceptedReceiverIdTypes)) {
      this.acceptedReceiverIdTypes = parameters.acceptedReceiverIdTypes;
    }

    if(parameters.hasOwnProperty('acceptedEvents') &&
       Array.isArray(parameters.acceptedEvents)) {
      this.acceptedEvents = parameters.acceptedEvents;
    }

    if(parameters.hasOwnProperty('minRSSI') &&
       Number.isInteger(parameters.minRSSI)) {
      this.minRSSI = parameters.minRSSI;
    }

    if(parameters.hasOwnProperty('maxRSSI') &&
       Number.isInteger(parameters.maxRSSI)) {
      this.minRSSI = parameters.maxRSSI;
    }
  }

  /**
   * Does the filter observe an acceptedTransmitterSignatures parameter?
   */
  get hasAcceptedTransmitterSignatures() {
    return this.hasOwnProperty('acceptedTransmitterSignatures');
  }

  /**
   * Does the filter observe an acceptedTransmitterIdTypes parameter?
   */
  get hasAcceptedTransmitterIdTypes() {
    return this.hasOwnProperty('acceptedTransmitterIdTypes');
  }

  /**
   * Does the filter observe an acceptedReceiverSignatures parameter?
   */
  get hasAcceptedReceiverSignatures() {
    return this.hasOwnProperty('acceptedReceiverSignatures');
  }

  /**
   * Does the filter observe an acceptedReceiverIdTypes parameter?
   */
  get hasAcceptedReceiverIdTypes() {
    return this.hasOwnProperty('acceptedReceiverIdTypes');
  }

  /**
   * Does the filter observe an acceptedEvents parameter?
   */
  get hasAcceptedEvents() {
    return this.hasOwnProperty('acceptedEvents');
  }

  /**
   * Does the filter observe a minRSSI parameter?
   */
  get hasMinRSSI() {
    return this.hasOwnProperty('minRSSI');
  }

  /**
   * Does the filter observe a maxRSSI parameter?
   */
  get hasMaxRSSI() {
    return this.hasOwnProperty('maxRSSI');
  }

  /**
   * Does the given raddec pass the filters?.
   * @param {Object} raddec The raddec to test against the filters.
   */
  isPassing(raddec) {
    if(this.hasAcceptedTransmitterSignatures &&
       !testAcceptedTransmitterSignatures(this, raddec)) {
      return false;
    }
    if(this.hasAcceptedTransmitterIdTypes &&
       !testAcceptedTransmitterIdTypes(this, raddec)) {
      return false;
    }
    if(this.hasAcceptedReceiverSignatures &&
       !testAcceptedReceiverSignatures(this, raddec)) {
      return false;
    }
    if(this.hasAcceptedReceiverIdTypes &&
       !testAcceptedReceiverIdTypes(this, raddec)) {
      return false;
    }
    if(this.hasAcceptedEvents && !testAcceptedEvents(this, raddec)) {
      return false;
    }
    if(this.hasMinRSSI && !testMinRSSI(this, raddec)) {
      return false;
    }
    if(this.hasMaxRSSI && !testMaxRSSI(this, raddec)) {
      return false;
    }
    return true;
  }

}


/**
 * Test if the given raddec passes the given accepted transmitterSignatures.
 * @param {RaddecFilter} instance The filter instance.
 * @param {Raddec} raddec The given Raddec instance.
 */
function testAcceptedTransmitterSignatures(instance, raddec) {
  let acceptedTransmitterSignatures = instance.acceptedTransmitterSignatures;

  return acceptedTransmitterSignatures.includes(raddec.signature);
}


/**
 * Test if the given raddec passes the given accepted transmitterIdTypes.
 * @param {RaddecFilter} instance The filter instance.
 * @param {Raddec} raddec The given Raddec instance.
 */
function testAcceptedTransmitterIdTypes(instance, raddec) {
  let acceptedTransmitterIdTypes = instance.acceptedTransmitterIdTypes;

  return acceptedTransmitterIdTypes.includes(raddec.transmitterIdType);
}


/**
 * Test if the given raddec passes the given accepted receiverSignatures.
 * @param {RaddecFilter} instance The filter instance.
 * @param {Raddec} raddec The given Raddec instance.
 */
function testAcceptedReceiverSignatures(instance, raddec) {
  let acceptedReceiverSignatures = instance.acceptedReceiverSignatures;

  return acceptedReceiverSignatures.includes(raddec.receiverSignature);
}


/**
 * Test if the given raddec passes the given accepted receiverIdTypes.
 * @param {RaddecFilter} instance The filter instance.
 * @param {Raddec} raddec The given Raddec instance.
 */
function testAcceptedReceiverIdTypes(instance, raddec) {
  if(!Array.isArray(raddec.rssiSignature) ||
     (raddec.rssiSignature.length < 1)) {
    return false;
  }
  let strongest = raddec.rssiSignature[0];
  let acceptedReceiverIdTypes = instance.acceptedReceiverIdTypes;

  return acceptedReceiverIdTypes.includes(strongest.receiverIdType);
}


/**
 * Test if the given raddec passes the given accepted events.
 * @param {RaddecFilter} instance The filter instance.
 * @param {Raddec} raddec The given Raddec instance.
 */
function testAcceptedEvents(instance, raddec) {
  if(!raddec.hasOwnProperty('events')) {
    return false;
  }
  let acceptedEvents = instance.acceptedEvents;
  let accepted = acceptedEvents.some(event => raddec.events.includes(event));

  return accepted;
}


/**
 * Test if the given raddec passes the given minimum RSSI.
 * @param {RaddecFilter} instance The filter instance.
 * @param {Raddec} raddec The given Raddec instance.
 */
function testMinRSSI(instance, raddec) {
  if(!Array.isArray(raddec.rssiSignature) ||
     (raddec.rssiSignature.length < 1)) {
    return false;
  }
  let strongest = raddec.rssiSignature[0];

  return (strongest.rssi >= instance.minRSSI);
}


/**
 * Test if the given raddec passes the given maximum RSSI.
 * @param {RaddecFilter} instance The filter instance.
 * @param {Raddec} raddec The given Raddec instance.
 */
function testMaxRSSI(instance, raddec) {
  if(!Array.isArray(raddec.rssiSignature) ||
     (raddec.rssiSignature.length < 1)) {
    return false;
  }
  let strongest = raddec.rssiSignature[0];

  return (strongest.rssi <= instance.maxRSSI);
}


module.exports = RaddecFilter;
