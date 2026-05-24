export function isValidMail(email: string) {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(email);
}

export function isValidNumber(value: string): boolean {
  const numberRegex = /^[0-9]+$/;
  return numberRegex.test(value);
}

export function isValidCpf(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');

  const validateDigit = (factor: number) =>
    Array.from(cpf)
      .slice(0, factor - 1)
      .reduce((acc, curr, index) => acc + Number(curr) * (factor - index), 0);

  const digit1 = (validateDigit(10) * 10) % 11 % 10;
  const digit2 = (validateDigit(11) * 10) % 11 % 10;

  return digit1 === Number(cpf[9]) && digit2 === Number(cpf[10]);
}