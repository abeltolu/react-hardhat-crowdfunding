import { getAddress } from "ethers";

export function shortenAddress(address: string): string {
  try {
    const formattedAddress = getAddress(address);
    return shortenString(formattedAddress);
  } catch {
    throw new TypeError("Address can't be parsed");
  }
}

export function shortenString(str: string) {
  return str.substring(0, 6) + "..." + str.substring(str.length - 4);
}
