# Deployment Guide

## Local Development

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/ai-study-buddy.git
cd ai-study-buddy

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run linter
npm run lint

# Run tests
npm test

# Run tests with coverage
npm run test:ci
```

## Production Deployment

### Vercel Deployment (Recommended)

Vercel is the creator of Next.js and provides seamless deployment.

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your repository
5. Configure project settings
6. Deploy

#### Step 3: Environment Variables
```bash
# In Vercel dashboard, add environment variables
# (None required for local-only operation)

# Optional for cloud AI:
NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

#### Step 4: Custom Domain
1. In Vercel dashboard → Project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
```

#### Build and Run
```bash
# Build image
docker build -t ai-study-buddy .

# Run container
docker run -p 3000:3000 ai-study-buddy
```

#### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Self-Hosted (Linux/Ubuntu)

#### Prerequisites
- Ubuntu 20.04+ / Debian 10+
- Node.js 18+
- Nginx (optional, for reverse proxy)

#### Steps

1. **SSH into server**
```bash
ssh user@your_server_ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone repository**
```bash
cd /var/www
git clone https://github.com/yourusername/ai-study-buddy.git
cd ai-study-buddy
```

4. **Install and build**
```bash
npm install
npm run build
```

5. **Install PM2 (process manager)**
```bash
sudo npm install -g pm2
```

6. **Start app with PM2**
```bash
pm2 start npm --name "ai-study-buddy" -- start
pm2 startup
pm2 save
```

7. **Setup Nginx (optional)**
```bash
sudo apt-get install nginx
```

Create `/etc/nginx/sites-available/ai-study-buddy`:
```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/ai-study-buddy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL (Let's Encrypt)**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

## Performance Optimization

### Next.js Optimizations

```javascript
// next.config.js
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Image optimization
  images: {
    unoptimized: false,
  },
  
  // Production build
  productionBrowserSourceMaps: false,
};
```

### Caching Strategies

```typescript
// Cache static assets
Cache-Control: public, max-age=31536000, immutable

// Cache HTML (revalidate frequently)
Cache-Control: public, max-age=3600, s-maxage=3600
```

### Bundle Size Optimization

```bash
# Analyze bundle
npm install --save-dev @next/bundle-analyzer

# View bundle report
ANALYZE=true npm run build
```

## Monitoring & Logging

### Application Monitoring

```typescript
// Sentry integration (optional)
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Error Tracking

```bash
# Install Sentry CLI
npm install --save-dev @sentry/cli

# Create .sentryrc.properties
[auth]
token=your_token

# Link to org
sentry-cli --org=your-org-slug --project=your-project-slug releases files upload-sourcemaps .
```

## Backup & Recovery

### Database Backup

```bash
# Export IndexedDB data (user-initiated from settings)
# Navigate to Settings → Export Data → Download JSON

# To restore:
# Upload file → Settings → Import Data
```

### Application Backup

```bash
# Backup code repository
git clone --mirror https://github.com/yourusername/ai-study-buddy.git ai-study-buddy.git

# Backup to cloud storage
aws s3 sync ./ai-study-buddy.git s3://my-backup-bucket/
```

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set secure HTTP headers
- [ ] Configure CORS properly
- [ ] Sanitize user inputs
- [ ] Validate API requests
- [ ] Rotate API keys regularly
- [ ] Enable rate limiting
- [ ] Setup firewall rules
- [ ] Regular security updates
- [ ] Monitor access logs

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Build Fails**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

**Memory Issues**
```bash
# Increase Node.js memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

**Database Locks**
```bash
# Clear IndexedDB (from browser console)
indexedDB.deleteDatabase('StudyBuddy');
```

## Performance Targets

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s

## Scaling Considerations

### Horizontal Scaling
- Stateless application (good for scaling)
- No session affinity required
- Use load balancer (nginx, HAProxy)

### Vertical Scaling
- Increase server resources
- More RAM for larger datasets
- Faster CPU for processing

### Database Scaling
- IndexedDB handled by browser
- Consider sync service for multi-device
- Cloud storage for backup

## Update & Maintenance

### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest

# Audit for vulnerabilities
npm audit
npm audit fix
```

### Deployment Strategy

```bash
# Feature branch testing
git checkout -b feature/new-feature

# Create Pull Request for review
# Merge to main after approval

# Main branch auto-deploys to production
# Tag release version
git tag -a v1.0.1 -m "Release 1.0.1"
git push origin v1.0.1
```

## Support

For deployment issues:
- Check Vercel/server logs
- Review browser console for errors
- Check network requests in DevTools
- Review documentation: ./docs
