# ContentPulse - Content Analytics & AI Insights Platform

ContentPulse is an API-first SaaS platform that aggregates content performance metrics from blogs, emails, landing pages, and social media. It provides AI-powered insights and optimization recommendations to help teams make data-driven content decisions.

## Features

- **API-First Architecture**: RESTful API for seamless integration
- **Analytics Ingestion**: Track content metrics across channels
- **Rate Limiting**: Usage limits based on subscription tier
- **API Key Management**: Secure authentication with API keys
- **AI Insights**: OpenAI-powered recommendations
- **Usage Tracking**: Monitor API request usage
- **Dark Theme Dashboard**: Sleek, developer-friendly interface

## Tech Stack

**Backend:**
- Node.js + Express.js
- TypeScript
- MongoDB (data storage)
- Redis (caching & rate limiting)
- OpenAI API (AI insights)

**Frontend:**
- Next.js 16
- React 19
- TypeScript
- TailwindCSS + shadcn/ui

## Quick Start

### 1. Clone & Install

```bash
# Clone repository
git clone <repo-url>
cd contentpulse

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Setup Environment Variables

**Backend (.env):**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contentpulse
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=sk-your-openai-key
```

**Frontend (.env.local):**
```
BACKEND_URL=http://localhost:5000
```

### 3. Start Services

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

Backend: `http://localhost:5000`
Frontend: `http://localhost:3000`

### 4. Try It Out

1. Sign up at `http://localhost:3000/signup`
2. Go to Settings to create an API key
3. Use the key to send analytics data:

```bash
curl -X POST http://localhost:5000/api/v1/analytics/ingest \
  -H "X-API-Key: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "contentId": "blog-001",
    "contentType": "blog",
    "title": "Getting Started with ContentPulse",
    "url": "https://example.com/blog/contentpulse",
    "metrics": {
      "views": 1000,
      "clicks": 50,
      "conversions": 10,
      "engagement": 75
    }
  }'
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Create account
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/api-keys` - Create API key
- `GET /api/v1/auth/api-keys` - List API keys
- `DELETE /api/v1/auth/api-keys/:keyId` - Revoke key

### Analytics
- `POST /api/v1/analytics/ingest` - Submit metrics (requires API key)
- `GET /api/v1/analytics` - Fetch metrics (requires API key)
- `GET /api/v1/analytics/:contentId` - Get specific content (requires API key)

### Insights
- `GET /api/v1/insights` - Get AI recommendations (requires API key)

### Usage
- `GET /api/v1/usage` - View usage stats (requires auth)
- `GET /api/v1/usage/plan` - Get plan details (requires auth)

## Pricing Tiers

| Plan | Requests/Month | Price | Features |
|------|---|---|---|
| Free | 1,000 | $0 | Basic analytics |
| Pro | 50,000 | $99 | Analytics + insights |
| Enterprise | Unlimited | Custom | Everything + support |

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for cloud deployment guides (Vercel, AWS, Heroku, DigitalOcean, etc.)

## Project Structure

```
├── backend/                 # Express API server
│   ├── src/
│   │   ├── config/         # Database & environment config
│   │   ├── middleware/     # Auth, rate limiting, error handling
│   │   ├── models/         # MongoDB schemas
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helpers
│   └── package.json
│
├── app/                    # Next.js frontend
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # Frontend API routes (proxies)
│   └── layout.tsx         # Root layout
│
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   └── ui/               # shadcn/ui components
│
└── docker-compose.yml     # Local development with Docker
```

## Development

### Code Style
- TypeScript with strict mode
- ESLint configuration
- Prettier formatting

### Testing
```bash
# Backend tests (placeholder)
cd backend
npm test

# Frontend tests (placeholder)
npm test
```

### Building for Production

Backend:
```bash
cd backend
npm run build
npm start
```

Frontend:
```bash
npm run build
npm start
```

## Configuration

### Rate Limiting
Set per tier in `backend/src/middleware/rateLimiter.ts`:
- Free: 1,000 requests/month
- Pro: 50,000 requests/month  
- Enterprise: Unlimited

### Cache TTL
Redis cache expiration: 31 days (configurable)

### AI Insights
Uses GPT-3.5-turbo. Model can be changed in `backend/src/services/insightsService.ts`

## Troubleshooting

**Backend won't start:**
- Check MongoDB is running: `mongod`
- Check Redis is running: `redis-server`
- Verify ports 5000 is free

**API Key not working:**
- Ensure key header is `X-API-Key`
- Check key is active in dashboard
- Verify usage limits not exceeded

**Frontend can't connect to backend:**
- Check `BACKEND_URL` env var
- Ensure backend is running on port 5000
- Verify CORS is enabled

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit pull request

## License

MIT

## Support

For issues, feature requests, or deployment help, please open a GitHub issue or contact support@contentpulse.com
