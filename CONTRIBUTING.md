# Contributing to Vinit Vaibhav's Portfolio

Thank you for your interest in contributing! Here are a few guidelines to help you get started.

## 🐛 Found a Bug?

1. Check if the bug has already been reported in [Issues](https://github.com/vinitvaibhav-5253/My-PortFolio/issues)
2. If not, [create a new issue](https://github.com/vinitvaibhav-5253/My-PortFolio/issues/new) with:
   - A clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

## 💡 Want to Add a Feature?

1. [Open an issue](https://github.com/vinitvaibhav-5253/My-PortFolio/issues/new) first to discuss the idea
2. Fork the repository and create a feature branch
3. Follow the code style and conventions used in the project

## 🔧 Development Workflow

```bash
# Fork and clone
git clone https://github.com/<your-username>/My-PortFolio.git
cd My-PortFolio

# Install dependencies
npm install

# Create your feature branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev

# Before committing, ensure code quality
npm run lint
npm run format
npm run typecheck

# Commit with conventional commit messages
git commit -m "feat: add your feature description"

# Push and create PR
git push origin feature/your-feature-name
```

## 📝 Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Formatting, missing semicolons, etc. |
| `refactor:` | Code restructuring without feature change |
| `perf:` | Performance improvement |
| `chore:` | Build process or tooling changes |

## 🎨 Code Style

- **TypeScript** — Strict mode enabled
- **ESLint** — Run `npm run lint` before committing
- **Prettier** — Run `npm run format` to auto-format
- **Tailwind CSS** — Use utility classes; avoid custom CSS where possible

## 📋 Pull Request Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-reviewed the code
- [ ] No new warnings or errors
- [ ] Tests pass (if applicable)
- [ ] Updated documentation (if applicable)

---

Thank you for contributing! 🙌
