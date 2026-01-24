# GitHub Setup Guide

## Creating a GitHub Repository

### Step 1: Create Repository on GitHub

1. Go to [github.com](https://github.com) and log in
2. Click **+** icon → **New repository**
3. Repository name: `ai-study-buddy`
4. Description: `Offline-first AI learning companion with optional cloud AI integration`
5. Select **Public** (to make it available to community)
6. **Do NOT** initialize with README (we already have one)
7. Click **Create repository**

### Step 2: Initial Git Setup

```bash
# Navigate to your project
cd c:\Users\Afreen\Project1

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "chore: initial project setup"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/ai-study-buddy.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Configure Repository Settings

#### Branch Protection
1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Enable:
   - Require pull request reviews before merging
   - Require status checks to pass
   - Require branches to be up to date

#### Topics
1. Go to **Settings** → **Code and automation** → **Topics**
2. Add topics:
   - `ai`
   - `learning`
   - `study`
   - `flashcards`
   - `quizzes`
   - `nextjs`
   - `nlp`

#### Visibility
- Public (for community contributions)
- Description updated

### Step 4: Add GitHub Actions (CI/CD)

Create `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build
```

### Step 5: Add Repository Details

#### Update README Front Matter
In `README.md`, add badges:

```markdown
# AI-Powered Study Buddy

[![Build and Test](https://github.com/YOUR_USERNAME/ai-study-buddy/actions/workflows/build.yml/badge.svg)](https://github.com/YOUR_USERNAME/ai-study-buddy/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

An offline-first AI learning companion...
```

### Step 6: Create Release

```bash
# Create a tag for version 1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags to GitHub
git push origin --tags
```

Then on GitHub:
1. Go to **Releases**
2. Click **Create a new release**
3. Select tag `v1.0.0`
4. Add release notes
5. Publish release

### Step 7: Enable Pages (Optional - for documentation)

1. Go to **Settings** → **Pages**
2. Select source: **Deploy from a branch**
3. Select branch: `main`
4. Select folder: `/ (root)`
5. Optionally add custom domain
6. Documentation will be available at `https://YOUR_USERNAME.github.io/ai-study-buddy/`

### Step 8: Create Issues Templates

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
---

## Description
Clear and concise description of the bug.

## Steps to Reproduce
1. 
2.
3.

## Expected Behavior
What should happen?

## Actual Behavior
What actually happened?

## Environment
- OS: 
- Browser:
- Node.js version:

## Additional Context
Any other relevant information.
```

Create `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
---

## Description
Clear description of the feature.

## Use Case
Why is this needed?

## Proposed Solution
How should this work?

## Alternatives
Other approaches considered?
```

### Step 9: Add Collaborators (Optional)

1. Go to **Settings** → **Collaborators and teams**
2. Click **Add people**
3. Search for GitHub username
4. Select role (Maintain/Write/Triage/Read)

### Step 10: Final Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] Branch protection enabled
- [ ] CI/CD workflow added
- [ ] README with badges
- [ ] LICENSE file included
- [ ] CONTRIBUTING guide added
- [ ] Issue templates created
- [ ] Topics added
- [ ] First release tagged
- [ ] GitHub Actions passing
- [ ] Collaborators invited (if applicable)

## Useful GitHub Commands

```bash
# View remote
git remote -v

# Change remote URL
git remote set-url origin https://github.com/NEW_USERNAME/ai-study-buddy.git

# Create branch
git checkout -b feature/new-feature

# Push branch
git push origin feature/new-feature

# Create pull request via CLI (if GitHub CLI installed)
gh pr create --title "My Feature" --body "Description"

# Merge pull request
git checkout main
git merge feature/new-feature
git push origin main

# Delete branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

## Promoting Your Project

### GitHub Social Sharing

1. Add in README:
   ```markdown
   ## Star History
   [![Star History Chart](https://api.star-history.com/svg?repos=YOUR_USERNAME/ai-study-buddy&type=Date)](https://star-history.com/#YOUR_USERNAME/ai-study-buddy&Date)
   ```

2. Add social links:
   ```markdown
   - [Twitter](https://twitter.com/share?url=https://github.com/YOUR_USERNAME/ai-study-buddy)
   - [LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/YOUR_USERNAME/ai-study-buddy)
   ```

### Submit to

- [Awesome lists](https://github.com/sindresorhus/awesome)
- [Product Hunt](https://producthunt.com)
- [Hacker News](https://news.ycombinator.com/submit)
- [JavaScript subreddits](https://www.reddit.com/r/javascript/)

## Support

For GitHub-specific questions:
- GitHub Documentation: https://docs.github.com
- GitHub Community: https://github.community
