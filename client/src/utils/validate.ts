export function validateEmail(email: string) {
  if (typeof email !== 'string') {
    return false;
  }

  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export function validatePhoneNumber(phoneNumber: string) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  return phoneNumber.length >= 6;
}
