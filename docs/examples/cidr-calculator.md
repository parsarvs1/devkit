# CIDR Calculator Examples

Inputs and outputs for [CIDR Calculator](/tools/cidr-calculator). See the
[documentation](../tools/cidr-calculator.md) for the full description.

## Example 1 — A /24 network

**Input:** `192.168.1.0/24`

| Field | Value |
| --- | --- |
| CIDR | `192.168.1.0/24` |
| Network Address | `192.168.1.0` |
| Broadcast Address | `192.168.1.255` |
| Subnet Mask | `255.255.255.0` |
| Wildcard Mask | `0.0.0.255` |
| First Usable Host | `192.168.1.1` |
| Last Usable Host | `192.168.1.254` |
| Total Addresses | `256` |
| Usable Hosts | `254` |

## Example 2 — A /16 network

**Input:** `10.0.0.0/16`

| Field | Value |
| --- | --- |
| CIDR | `10.0.0.0/16` |
| Network Address | `10.0.0.0` |
| Broadcast Address | `10.0.255.255` |
| Subnet Mask | `255.255.0.0` |
| Wildcard Mask | `0.0.255.255` |
| First Usable Host | `10.0.0.1` |
| Last Usable Host | `10.0.255.254` |
| Total Addresses | `65536` |
| Usable Hosts | `65534` |

## Example 3 — A /30 point-to-point link

**Input:** `172.16.5.4/30`

| Field | Value |
| --- | --- |
| CIDR | `172.16.5.4/30` |
| Network Address | `172.16.5.4` |
| Broadcast Address | `172.16.5.7` |
| Subnet Mask | `255.255.255.252` |
| Wildcard Mask | `0.0.0.3` |
| First Usable Host | `172.16.5.5` |
| Last Usable Host | `172.16.5.6` |
| Total Addresses | `4` |
| Usable Hosts | `2` |

## Example 4 — A /31 link

**Input:** `172.16.5.0/31`

| Field | Value |
| --- | --- |
| Network Address | `172.16.5.0` |
| Broadcast Address | `172.16.5.1` |
| Subnet Mask | `255.255.255.254` |
| Wildcard Mask | `0.0.0.1` |
| First Usable Host | `172.16.5.0` |
| Last Usable Host | `172.16.5.1` |
| Total Addresses | `2` |
| Usable Hosts | `2` |

For `/31`, the first and last usable hosts equal the network and broadcast
addresses because no addresses are reserved.

## Example 5 — A /32 host route

**Input:** `172.16.5.9/32`

| Field | Value |
| --- | --- |
| Network Address | `172.16.5.9` |
| Broadcast Address | `172.16.5.9` |
| Subnet Mask | `255.255.255.255` |
| Wildcard Mask | `0.0.0.0` |
| First Usable Host | `172.16.5.9` |
| Last Usable Host | `172.16.5.9` |
| Total Addresses | `1` |
| Usable Hosts | `1` |

## Example 6 — The whole IPv4 space

**Input:** `0.0.0.0/0`

| Field | Value |
| --- | --- |
| Network Address | `0.0.0.0` |
| Broadcast Address | `255.255.255.255` |
| Subnet Mask | `0.0.0.0` |
| Wildcard Mask | `255.255.255.255` |
| First Usable Host | `0.0.0.1` |
| Last Usable Host | `255.255.255.254` |
| Total Addresses | `4294967296` |
| Usable Hosts | `4294967294` |

## Example 7 — Invalid input

**Input:** `192.168.1.0/33`

**Expected behavior:** the tool shows `Invalid CIDR block.` because the prefix
must be between `0` and `32`.

Other invalid examples: `192.168.1.0` (no prefix), `999.1.1.1/24` (octet out
of range), `not-a-cidr`.
