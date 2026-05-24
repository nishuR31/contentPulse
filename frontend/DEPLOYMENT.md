# ContentPulse Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB
- Redis
- OpenAI API Key (optional for AI features)

### Setup Backend
```bash
cd backend
npm install
npm run dev
```

### Setup Frontend
```bash
npm install
npm run dev
```

The backend runs on `http://localhost:5000` and frontend on `http://localhost:3000`.

## Docker Deployment

### Build and Run
```bash
docker-compose up --build
```

This starts:
- Backend API on port 5000
- MongoDB for data storage
- Redis for caching and rate limiting

### Environment Variables
Create a `.env` file:
```
JWT_SECRET=your-secret-key
OPENAI_API_KEY=sk-your-openai-key
BACKEND_URL=http://localhost:5000
```

## Production Deployment

### Using Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `BACKEND_URL=https://your-backend.com`
3. Deploy

### Backend on Cloud Providers

#### AWS EC2/ECS
1. Push Docker image to ECR
2. Create ECS service with MongoDB (RDS) and Redis (ElastiCache)
3. Configure security groups and load balancer

#### Heroku
```bash
heroku login
heroku create contentpulse-api
git push heroku main
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set REDIS_URL=redis://...
heroku config:set JWT_SECRET=your-secret
```

#### DigitalOcean/Linode
1. Create droplet with Docker
2. Set up MongoDB and Redis (managed services recommended)
3. Deploy container using docker-compose

## Database Setup

### MongoDB Connection
- Local: `mongodb://localhost:27017/contentpulse`
- Atlas: `mongodb+srv://user:password@cluster.mongodb.net/contentpulse`

Run migrations if needed:
```bash
cd backend
npm run migrate
```

### Redis Connection
- Local: `redis://localhost:6379`
- Managed service: `redis://user:password@host:port`

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS for all API endpoints
- [ ] Configure CORS properly
- [ ] Set secure database credentials
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Use environment variables for secrets
- [ ] Enable API key rotation
- [ ] Set up automated backups

## Monitoring

### Logging
- Backend logs go to console (configure log aggregation in production)
- Frontend errors tracked via Vercel Analytics

### Health Checks
```bash
curl http://localhost:5000/health
```

### Metrics to Monitor
- API response times
- Rate limit usage per key
- Database query performance
- Error rates
- Cache hit rates

## Scaling

- Use database replicas for high availability
- Configure Redis persistence
- Set up API rate limiting per tier
- Use CDN for frontend assets
- Implement database indexing on frequently queried fields

## Support

For issues during deployment, check:
1. Environment variables are set correctly
2. Database connectivity (MongoDB/Redis)
3. API key validity
4. Port availability
5. Firewall rules
