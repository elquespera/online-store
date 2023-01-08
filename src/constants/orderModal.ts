import { inputIDs } from '../types/index';

export const REDIRECT_INTERVAL = 5;

export const CARD_TYPES: { [index: string]: string } = {
  '4': 'visa',
  '5': 'mastercard',
  '6': 'discover',
} as const;

export const ORDER_INPUTS = [
  // Personal Details
  {
    id: inputIDs.name,
    value: '',
    placeholder: 'Name and Surname',
    hint: 'Name and surname must have 3 characters or more.',
    pattern: /^\w{3,}(\s\w{3,})+$/i,
    valid: true,
  },
  {
    id: inputIDs.phone,
    value: '',
    placeholder: 'Phone number',
    hint: 'At least 9 numbers starting with +',
    pattern: /^\+[0-9]{9,}$/,
    valid: true,
  },
  {
    id: inputIDs.address,
    value: '',
    placeholder: 'Address',
    hint: 'Address must have at least 3 words 5 characters or more each.',
    pattern: /^\w{5,}(\s\w{5,}){2,}$/i,
    valid: true,
  },
  {
    id: inputIDs.email,
    value: '',
    placeholder: 'Email',
    hint: 'Provide a valid email address: example@domain.com',
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
    valid: true,
  },

  //Credit Card Details
  {
    id: inputIDs.cardNumber,
    value: '',
    placeholder: 'Card Number',
    hint: 'Must contain 16 numbers',
    pattern: /^[0-9]{4}(\s[0-9]{4}){3}$/,
    valid: true,
  },
  {
    id: inputIDs.cardValid,
    value: '',
    placeholder: 'Valid Thru',
    hint: 'MM/YY',
    pattern: /^[0-9]{2}\/[0-9]{2}$/,
    valid: true,
  },
  {
    id: inputIDs.cardCVV,
    value: '',
    placeholder: 'CVV Code',
    hint: '3 numbers on the back of the card.',
    pattern: /^[0-9]{3}$/,
    valid: true,
  },
];
