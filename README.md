# RUACH: Smart PDA (Personal Digital Assistant)

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [Development](#development)

## 🚀 Overview

RUACH Smart PDA is an intelligent personal assistant system with cloud-native architecture.

## 🏗️ Architecture

### High-Level System Architecture

```mermaid
graph TB
    subgraph "Development"
        Dev[Developers] -->|Code Push| GitHub
        GitHub[GitHub Repository<br/>smart-pda/] -->|Triggers| CI_CD
    end
    
    subgraph "CI/CD Pipeline"
        CI_CD[GitHub Actions]
        CI_CD --> CI[ci.yml<br/>Build & Test]
        CI_CD --> Terraform[terraform.yml<br/>Infra Provisioning]
        CI_CD --> Deploy[deploy.yml<br/>K8s Deployment]
    end
    
    subgraph "Infrastructure Layer"
        Terraform -->|Deploys| CloudInfra[Cloud Infrastructure]
        CloudInfra --> VPC[VPC Network]
        CloudInfra --> EC2[EC2 Instances]
        CloudInfra --> SG[Security Groups]
        CloudInfra --> K8s[Kubernetes Cluster]
    end
    
    subgraph "Application Layer"
        K8s -->|Hosts| Frontend[Frontend Service]
        K8s -->|Hosts| Backend[Backend Service]
        Frontend <-->|API Calls| Backend
    end
    
    subgraph "Monitoring"
        Prometheus[Prometheus] -->|Monitors| K8s
        Grafana[Grafana] -->|Visualizes| Prometheus
    end
```

### Component Interaction Flow

```mermaid
sequenceDiagram
    participant D as Developer
    participant GH as GitHub
    participant GA as GitHub Actions
    participant TF as Terraform
    participant K8s as Kubernetes
    participant App as Smart PDA App
    
    D->>GH: Push code changes
    GH->>GA: Trigger workflows
    GA->>GA: Run tests (ci.yml)
    GA->>TF: Provision infra (terraform.yml)
    TF->>K8s: Create/Update cluster
    GA->>K8s: Deploy new containers
    K8s->>App: Update services
    App-->>D: Application updated
```

## 📁 Project Structure

```
smart-pda/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── terraform.yml
│       └── deploy.yml
├── infra/
├── src/
├── docker/
├── scripts/
├── monitoring/
└── README.md
```

## 🛠️ Development

### Prerequisites
- Docker
- Kubernetes
- Terraform

### Local Setup
```bash
# Clone repository
git clone https://github.com/Jedidiah/Cloud_DevOps_Project.git
cd Cloud_DevOps_Project

# Start development environment
docker-compose up
```

## 📊 Monitoring
- **Prometheus**: Metrics collection
- **Grafana**: Dashboards at http://localhost:3000
- **Alerts**: Configured in `monitoring/alerts/`

## 📄 License
MIT License - see LICENSE file for details
## Setup Instructions
## CI/CD Pipeline Explanation
## Monitoring Screenshots
## Lessons Learned

