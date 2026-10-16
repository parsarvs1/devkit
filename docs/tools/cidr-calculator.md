# CIDR Calculator

Compute the network details of an IPv4 CIDR block.

- Tool page: [CIDR Calculator](/tools/cidr-calculator)
- Examples: [CIDR Calculator examples](../examples/cidr-calculator.md)

## Purpose

CIDR Calculator takes an IPv4 network in CIDR notation and derives the subnet
mask, wildcard mask, network and broadcast addresses, host range, and address
counts. It is useful for network planning, firewall rules, and subnetting
exercises.

## When to use it

- Determining the usable host range of a subnet.
- Finding the subnet mask or wildcard mask for a given prefix.
- Checking how many addresses a prefix contains.
- Quickly verifying network and broadcast addresses.

## How to use it

1. Type a CIDR block into the input, for example `192.168.1.0/24`.
2. The results update immediately as you type.
3. Click the copy icon next to any row to copy that value.

## Inputs

| Input | Description |
| --- | --- |
| CIDR | An IPv4 address and prefix separated by `/`, for example `10.0.0.0/16`. The prefix must be an integer from `0` to `32`. |

## Options

There are no configurable options. The calculator is deterministic: the same
CIDR always produces the same values.

## Output

| Field | Description |
| --- | --- |
| CIDR | The normalized network address with its prefix, e.g. `192.168.1.0/24`. |
| Network Address | The first address in the block. |
| Broadcast Address | The last address in the block. |
| Subnet Mask | Dotted-decimal mask, e.g. `255.255.255.0`. |
| Wildcard Mask | The inverse of the subnet mask, e.g. `0.0.0.255`. |
| First Usable Host | First host address (equal to the network address for `/31` and `/32`). |
| Last Usable Host | Last host address (equal to the broadcast address for `/31` and `/32`). |
| Total Addresses | `2^(32 − prefix)`. |
| Usable Hosts | `total − 2` for prefixes `/0`–`/30`, `2` for `/31`, `1` for `/32`. |

## Examples

See [CIDR Calculator examples](../examples/cidr-calculator.md) for a `/24`, a
`/16`, and the special `/31` and `/32` cases.

## Edge cases

- An empty input shows no results.
- Non-empty input that is not a valid IPv4 CIDR shows the message
  `Invalid CIDR block.`
- Prefixes `/31` and `/32` do not reserve network and broadcast addresses, so
  the first/last usable host equal the network/broadcast addresses and the
  usable count is `2` and `1` respectively.
- Prefix `/0` covers the entire IPv4 space (4,294,967,296 addresses).
- Each octet is validated as `0`–`255`; the prefix must be an integer in
  `0`–`32`.

## Limitations

- IPv4 only. IPv6 CIDR blocks are not supported and will be reported invalid.
- No subnet splitting, VLSM planning, or supernetting.
- No reverse lookup (deriving a CIDR from a range).
- Leading zeros in octets are accepted as decimal digits (for example
  `01.2.3.4`), since octets are validated numerically rather than by string
  form.

## Privacy and security

All calculation happens locally in the browser. No network request is made and
no data leaves your machine.

## Related tools

- [API Tester](/tools/api-tester)
- [Tool Chaining](/tools/tool-chaining)
