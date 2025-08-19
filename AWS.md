<h1>Patna Metro - AWS Production Deployment Guide</h1>

<h3>🏗️ AWS Architecture Overview</h3>

```
Production Architecture:
- Frontend: AWS Amplify (Auto CI/CD, HTTPS, Global CDN)
- Backend: AWS Elastic Beanstalk (Load balanced, Auto-scaling)
- Database: AWS RDS PostgreSQL (Multi-AZ deployment)
- Content Delivery: Amazon CloudFront (Global caching)
- SSL/TLS: AWS Certificate Manager (Free SSL certificates)
- Domain Management: Amazon Route 53 (DNS & Domain registration)
- Compute: EC2 instances (Managed by Elastic Beanstalk)
- Storage: Amazon S3 (For assets and backups)
```
<h3>📋 Prerequisites</h3>
<p>AWS Account Setup</p>
