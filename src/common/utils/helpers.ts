export const generatePassword = (defaultLength = 8) => {
  const upperCases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCases = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const params = upperCases + lowerCases + numbers;
  let password = '';
  for (let i = 0; i < defaultLength; i++) {
    const random = choose(params);
    password += random;
  }
  return password;
};

const choose = (choices) => {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};
