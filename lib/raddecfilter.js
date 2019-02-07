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

    if(parameters.hasOwnProperty('acceptedEvents') &&
       Array.isArray(parameters.acceptedEvents)) {
      this.acceptedEvents = parameters.acceptedEvents;
    }
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
    if(this.hasAcceptedEvents &&
       !testAcceptedEvents(raddec, this.acceptedEvents)) {
      return false;
    }
    return true;
  }

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
