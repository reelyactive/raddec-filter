/**
 * Copyright reelyActive 2019
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
   * Does the given raddec pass the filters?.
   * @param {Object} raddec The raddec to test against the filters.
   */
  isPassing(raddec) {
    if(this.hasAcceptedTransmitterSignatures &&
       !testAcceptedTransmitterSignatures(raddec,
                                        this.acceptedTransmitterSignatures)) {
      return false;
    }
    if(this.hasAcceptedTransmitterIdTypes &&
       !testAcceptedTransmitterIdTypes(raddec,
                                       this.acceptedTransmitterIdTypes)) {
      return false;
    }
    if(this.hasAcceptedReceiverSignatures &&
       !testAcceptedReceiverSignatures(raddec,
                                       this.acceptedReceiverSignatures)) {
      return false;
    }
    if(this.hasAcceptedReceiverIdTypes &&
       !testAcceptedReceiverIdTypes(raddec, this.acceptedReceiverIdTypes)) {
      return false;
    }
    if(this.hasAcceptedEvents &&
       !testAcceptedEvents(raddec, this.acceptedEvents)) {
      return false;
    }
    return true;
  }

}


/**
 * Test if the given raddec passes the given accepted transmitterSignatures.
 * @param {Raddec} instance The given Raddec instance.
 * @param {Array} acceptedTransmitterSignatures The accepted transmitterSigs.
 */
function testAcceptedTransmitterSignatures(raddec,
                                           acceptedTransmitterSignatures) {
  return acceptedTransmitterSignatures.includes(raddec.signature);
}


/**
 * Test if the given raddec passes the given accepted transmitterIdTypes.
 * @param {Raddec} instance The given Raddec instance.
 * @param {Array} acceptedTransmitterIdTypes The accepted transmitterIdTypes.
 */
function testAcceptedTransmitterIdTypes(raddec, acceptedTransmitterIdTypes) {
  return acceptedTransmitterIdTypes.includes(raddec.transmitterIdType);
}


/**
 * Test if the given raddec passes the given accepted receiverSignatures.
 * @param {Raddec} instance The given Raddec instance.
 * @param {Array} acceptedReceiverSignatures The accepted receiverSignatures.
 */
function testAcceptedReceiverSignatures(raddec, acceptedReceiverSignatures) {
  return acceptedReceiverSignatures.includes(raddec.receiverSignature);
}


/**
 * Test if the given raddec passes the given accepted receiverIdTypes.
 * @param {Raddec} instance The given Raddec instance.
 * @param {Array} acceptedReceiverIdTypes The accepted receiverIdTypes.
 */
function testAcceptedReceiverIdTypes(raddec, acceptedReceiverIdTypes) {
  if(!Array.isArray(raddec.rssiSignature) ||
     (raddec.rssiSignature.length < 1)) {
    return false;
  }
  let strongest = raddec.rssiSignature[0];

  return acceptedReceiverIdTypes.includes(strongest.receiverIdType);
}


/**
 * Test if the given raddec passes the given accepted events.
 * @param {Raddec} instance The given Raddec instance.
 * @param {Array} acceptedEvents The accepted events.
 */
function testAcceptedEvents(raddec, acceptedEvents) {
  if(!raddec.hasOwnProperty('events')) {
    return false;
  }

  let accepted = acceptedEvents.some(event => raddec.events.includes(event));

  return accepted;
}


module.exports = RaddecFilter;
