import { describe, expect, it } from "vitest";
import { modules } from "../../../src";

const IPV4_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const IPV6_REGEX = /^[0-9a-f]{4}(:[0-9a-f]{4}){7}$/;

function isValidIpv4(value: string): boolean {
  if (!IPV4_REGEX.test(value)) {
    return false;
  }

  return value.split(".").every((octet) => {
    const num = Number(octet);
    return Number.isInteger(num) && num >= 0 && num <= 255;
  });
}

function isValidIpv6(value: string): boolean {
  return IPV6_REGEX.test(value);
}

describe("internet.ipv4", () => {
  it("should return 4 dot-separated octets, each between 0 and 255", () => {
    for (let i = 0; i < 200; i++) {
      const value = modules.internet.ipv4();

      expect(value).toMatch(IPV4_REGEX);

      const octets = value.split(".");
      expect(octets).toHaveLength(4);

      for (const octet of octets) {
        const num = Number(octet);
        expect(Number.isInteger(num)).toBe(true);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(255);
      }
    }
  });
});

describe("internet.ipv6", () => {
  it("should return 8 colon-separated groups of 4 lowercase hex digits", () => {
    for (let i = 0; i < 200; i++) {
      const value = modules.internet.ipv6();

      expect(value).toMatch(IPV6_REGEX);
    }
  });
});

describe("internet.ip", () => {
  it("should return a valid ipv4 or ipv6 address", () => {
    for (let i = 0; i < 200; i++) {
      const value = modules.internet.ip();

      expect(isValidIpv4(value) || isValidIpv6(value)).toBe(true);
    }
  });
});
