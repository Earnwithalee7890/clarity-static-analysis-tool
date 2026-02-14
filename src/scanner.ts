
export interface Issue {
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    message: string;
}

export function scanContent(content: string): Issue[] {
    const issues: Issue[] = [];

    // Check 1: Use of 'tx-sender' in asserts! (Phishing risk)
    if (content.includes('tx-sender') && content.includes('asserts!')) {
        issues.push({
            severity: 'MEDIUM',
            message: "Usage of 'tx-sender' in assertions can be risky. Verify if 'contract-caller' is safer."
        });
    }

    // Check 2: Unchecked return values (unwrap! missing)
    if (content.match(/\(contract-call\?/g) && !content.includes('unwrap!') && !content.includes('try!')) {
        issues.push({
            severity: 'HIGH',
            message: "Potential unchecked return value from 'contract-call?'. Use 'unwrap!' or 'try!'."
        });
    }

    // Check 3: Reading from standard-trait without validation
    if (content.includes('use-trait') && !content.includes('asserts!')) {
        issues.push({
            severity: 'LOW',
            message: "Trait usage detected. Ensure trait implementations are validated against a whitelist if necessary."
        });
    }

    // Check 4: Block height logic risks
    if (content.includes('block-height') && content.includes('==')) {
        issues.push({
            severity: 'LOW',
            message: "Strict equality check on 'block-height' can be missed. Use '>=' or '<='."
        });
    }

    return issues;
}
