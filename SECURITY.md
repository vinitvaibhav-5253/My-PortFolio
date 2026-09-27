# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.3.x   | ✅ Active support  |
| < 0.3   | ❌ No longer supported |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please report it responsibly:

1. **Do NOT** open a public issue
2. Send an email to [vinitvaibhav5253@gmail.com](mailto:vinitvaibhav5253@gmail.com) with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
3. You will receive a response within **48 hours**

## Security Best Practices

This project follows these security practices:

- Environment variables for all sensitive configuration (API keys)
- `.env.local` is gitignored — secrets are never committed
- Client-side form validation and sanitization
- HTTPS-only deployment on Vercel
- No server-side database or authentication (static portfolio)

Thank you for helping keep this project secure! 🔒
