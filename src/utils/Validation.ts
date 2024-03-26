export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string) => {
  const match = phone.match(/\d/g);
  return match && match.length > 5;
};

export const validatePassword = (password: string) => {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
};

export const validateName = (name: string) => {
  if (name.length < 3) {
    return false;
  } else {
    return true;
  }
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (confirmPassword !== password) {
    return false;
  } else {
    return true;
  }
};

export const validateSearch = (search: string) => {
  if (search === null) {
    return false;
  } else {
    return true;
  }
};

export const getLowestAndHighestValue = (arr: any[]) => {
  const min = arr.reduce((a: number, b: number) => Math.min(a, b));
  const max = arr.reduce((a: number, b: number) => Math.max(a, b));
  return { min, max };
};
