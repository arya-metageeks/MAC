const isValidEthAddress = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);
const isValidAmount = (amount: string) => /^\d+(\.\d+)?$/.test(amount);

export const isValidAllocationString = (str: string) => {
  if (!str) {
    return false;
  }
  const lines = str.trim().split("\n");

  for (let line of lines) {
    if (!line) {
      continue;
    }
    const [address, amount] = line.split(",");
    if (!isValidEthAddress(address) || !isValidAmount(amount)) {
      return false;
    }
  }
  return true;
};
