
# CHANGELOG — Clarity Static Analysis Tool

## [2.0.0] — 2026-02-19

### Added
- **Security Scanner v2**: 10 distinct security rules (CLR-001 to CLR-010).
- **Severity Scoring**: Files receive a 0-100 security score based on issue count/severity.
- **Fail-on-High**: New `--fail-on-high` CLI flag for breaking CI builds on critical issues.
- **JSON Report**: New `--json` flag for machine-readable output.
- **CI/CD Integration**: GitHub Actions workflow (`.github/workflows/analyze.yml`) for automated checks.
- **Test Contracts**: Added `tests/safe.clar` and `tests/vulnerable.clar` for validation.

### Changed
- **Performance**: Upgraded recursive directory traversal to ignore `node_modules` and `.git`.
- **Output**: Improved colorized console report format.

### Fixed
- Fixed crash when scanning non-Clarity files.
