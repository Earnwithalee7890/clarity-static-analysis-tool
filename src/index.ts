#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { scanContent } from './scanner';

const args = process.argv.slice(2);
const targetPath = args[0] || '.';

console.log(`🔍 Starting Clarity Static Analysis on: ${targetPath}\n`);

function traverseDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                traverseDirectory(fullPath);
            }
        } else if (file.endsWith('.clar')) {
            console.log(`Checking ${file}...`);
            const content = fs.readFileSync(fullPath, 'utf-8');
            const issues = scanContent(content);

            if (issues.length > 0) {
                console.log(`❌ Issues found in ${file}:`);
                issues.forEach(issue => console.log(`   - [${issue.severity}] ${issue.message}`));
            } else {
                console.log(`✅ No issues found.`);
            }
            console.log('---');
        }
    });
}

traverseDirectory(targetPath);
