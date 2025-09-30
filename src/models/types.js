/** Priority & status enums (keep in one place) */
export const PRIORITIES = /** @type {const} */ (['low','medium','high','urgent']);
export const MATTER_STATUSES = /** @type {const} */ (['Active','Pending','Closed']);
export const HEARING_STATUSES = /** @type {const} */ (['Scheduled','Adjourned','Heard','Disposed']);
export const INVOICE_STATUSES = /** @type {const} */ (['Paid','Pending','Overdue']);

/**
 * @typedef {Object} Matter
 * @property {string} id
 * @property {string} caseNo
 * @property {string} title
 * @property {string} court
 * @property {string=} nextHearing   // ISO
 * @property {typeof MATTER_STATUSES[number]} status
 * @property {typeof PRIORITIES[number]} priority
 * @property {string} client
 * @property {string=} opponent
 * @property {string=} stage
 * @property {string=} judge
 * @property {string=} filingDate    // ISO
 * @property {string=} description
 */

/**
 * @typedef {Object} Hearing
 * @property {string} id
 * @property {string} matterId
 * @property {string} dateTime       // ISO
 * @property {string=} location
 * @property {string=} courtRoom
 * @property {string=} notes
 * @property {typeof HEARING_STATUSES[number]=} status
 * @property {{ tMinus: number }[]=} reminders
 */

/**
 * @typedef {Object} Invoice
 * @property {string} id
 * @property {string} client
 * @property {number} amount
 * @property {typeof INVOICE_STATUSES[number]} status
 * @property {string} date           // ISO
 */
