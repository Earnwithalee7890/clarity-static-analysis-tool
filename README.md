# Clarity Static Analysis Tool 🛡️

A lightweight CLI tool for auditing **Clarity** smart contracts on the Stacks blockchain. It scans your `.clar` files for common security vulnerabilities and best practice violations.

## Features

- 🕵️ **Recursive Scanning**: Automatically verifies contracts in all subdirectories.
- 🚨 **Vulnerability Detection**:
  - Unchecked `contract-call?` return values.
  - Risky `tx-sender` usage (phishing vectors).
  - Strict block-height equality checks.
  - Unvalidated trait implementations.

## Usage

```bash
# Clean install
npm install

# Run scanner on current directory
npm run scan

# Run on specific folder
npm run scan ./contracts
```

## Example Output

```text
🔍 Starting Clarity Static Analysis...

Checking my-contract.clar...
❌ Issues found in my-contract.clar:
   - [HIGH] Potential unchecked return value from 'contract-call?'.
   - [MEDIUM] Usage of 'tx-sender' in assertions can be risky.
```

## License
MIT
