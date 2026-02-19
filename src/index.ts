#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { scanFile, formatReport, ScanResult } from './scanner';

const args = process.argv.slice(2);
const targetPath = args[0] || '.';
const outputJson = args.includes('--json');
const failOnHigh = args.includes('--fail-on-high');

console.log(`🔍 Clarity Static Analysis Tool v2.0`);
console.log(`   Target: ${targetPath}\n`);

const results: ScanResult[] = [];

function traverseDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.clarinet') {
                traverseDirectory(fullPath);
            }
        } else if (file.endsWith('.clar')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const result = scanFile(fullPath, content);
            results.push(result);
        }
    });
}

traverseDirectory(targetPath);

if (results.length === 0) {
    console.log('⚠️  No .clar files found in target directory.');
    process.exit(0);
}

if (outputJson) {
    console.log(JSON.stringify(results, null, 2));
} else {
    console.log(formatReport(results));
}

// Exit with error code if any file fails and --fail-on-high is set
if (failOnHigh && results.some(r => !r.passed)) {
    console.log('\n🚨 Analysis failed: HIGH or CRITICAL issues detected.');
    process.exit(1);
}

console.log('\n✅ Analysis complete.');
