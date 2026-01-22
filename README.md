# Ruach: Smart PDA – DevOps Foundations

This repository tracks my Cloud & DevOps learning journey.
## DevOps Concepts
- CI: Continuous Integration
- CD: Continuous Delivery/Deployment
- IaC: Infrastructure as Code
- Tools I’ll learn: Git, Docker, AWS, Terraform, CI/CD

# Cloud_DevOps_Project Repository Layout
smart-pda/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── terraform.yml
│       └── deploy.yml
├── infra/
│   ├── terraform/
│   │   ├── modules/
│   │   │   ├── vpc/
│   │   │   ├── ec2/
│   │   │   └── security-groups/
│   │   ├── dev/
│   │   │   └── main.tf
│   │   └── prod/
│   │       └── main.tf
│   └── kubernetes/
│       ├── base/
│       ├── overlays/
│       └── monitoring/
├── src/
│   ├── frontend/
│   └── backend/
├── docker/
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── scripts/
├── monitoring/
│   ├── prometheus/
│   ├── grafana/
│   └── alerts/
└── README.md (with architecture diagram!)

## Architecture Diagram (use diagrams.net or Excalidraw)
## Setup Instructions
## CI/CD Pipeline Explanation
## Monitoring Screenshots
## Lessons Learned
