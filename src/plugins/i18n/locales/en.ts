export default {
  loading: 'Loading...',
  noFace: 'Face not detected!',
  tooClose: 'You are holding the camera too close!',
  tooFar: 'You are holding the camera too far!',
  offCenter: 'Please, center your face.',
  tilted: 'Please, keep your head straight.',
  turned: 'Please, face the camera directly.',
  notLooking: 'Look directly into the camera.',
  mouthOpened: 'Please, close your mouth.',
  smiling: 'Please, don\'t smile',
  ok: 'Great, stay still!',
  faceIdError: 'Failed to verify identity',

  continue: 'Continue',
  confirm: 'Confirm',
  sending: 'Sending...',

  chooseTariff: 'Choose tariff',
  changeTariff: 'Change tariff',
  products: 'Products',
  productsSum: 'Products total',
  selectTariff: 'Select a tariff',
  initialPayment: 'Initial payment',
  totalAmount: 'Total amount',
  currency: 'UZS',
  month: 'month',
  date: 'Date',
  sum: 'Sum',
  add: 'Add',

  reloadWarning: 'Attention! If you reload the page, you will have to go through the identification process again',

  main: {
    title: 'Registration',
    enterSMS: 'Enter SMS code',
    smsWasSent: 'SMS code was sent to the phone number',
    enterSMSToContinue: 'Enter it below to continue.',
    requestCode: 'Request code again',
    resendTimer: 'Resend available in: {time}',
    resendRequest: 'You can request a resend in',
  },

  userInfo: {
    title: 'Your details',
    fullName: 'Full name',
    sex: 'Sex',
    birthDate: 'Date of birth',
    phone: 'Phone number',
    pinfl: 'PINFL',
    tin: 'TIN',
    address: 'Address',
    note: 'Please make sure that the personal data you have provided is correct and confirm it.',
  },

  form: {
    phone: 'Phone number',
    passport: 'Passport series / number',
    birthDate: 'Date of birth',
    agreement: `I agree with the terms of the <a href="#" target="_blank">public offer</a> and give my consent to the processing and use of my personal data`,
  },

  paymentsSchedule: {
    title: 'Payment schedule',
    installmentPeriod: 'Installment period',
  },

  creditCard: {
    title: 'Adding a card',
    description: 'The initial payment will be debited from the bank card you added.',
    enterCard: 'Enter card details',
  },

  confirmations: {
    warning: 'Warning!',

    hashError: 'Invalid hash',
    backToMain: 'You will be returned to the login page, all previously entered data will not be saved',

    auth: 'Please log in first',
    tariff: 'Please select a tariff first',

    accept: 'Ok',
    reject: 'Cancel',
  },

  statuses: {
    approved: {
      title: 'Approved',
      description: 'Approved description',
    },
    rejected: {
      title: 'Rejected',
      description: 'Rejected description',
    },
    close: {
      title: 'This session is no longer relevant',
      description: 'The data has expired and it can’t be used anymore. Please close the tab.',
    },
  },

  rules: {
    required: 'Required field!',
    minLength: 'Length must be greater than {opt}',
    minValue: 'Value must be greater than {opt}',
    invalidDate: 'The date is incorrect! Please enter the date in the format "day/month/year"',
  },

  toast: {
    success: 'Success',
    error: 'Error',
    warn: 'Warning',
    info: 'Information',
  },
};
