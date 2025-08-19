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
<li>AWS Account with admin permissions</li>
<li>Registered domain name (or purchase through Route 53)</li>
<li>IAM user with appropriate permissions (avoid root account)</li>

<p>Required AWS Services</p>
<li>AWS Amplify (Frontend)</li>
<li>AWS Elastic Beanstalk (Backend)</li>
<li>Amazon RDS (Database)</li>
<li>AWS Certificate Manager (SSL)</li>
<li>Amazon Route 53 (DNS)</li>
<li>Amazon CloudFront (CDN)</li>
<li>IAM (Permissions)</li>


