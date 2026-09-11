import { Question } from "@/types/exam";

export const CLF_C02_QUESTIONS: Question[] = [
  // DOMAIN 1 — CLOUD CONCEPTS (Questions 1–15)
  {
    id: 1,
    domain: "Cloud Concepts",
    topic: "Elasticity",
    questionType: "single",
    question:
      "A company hosts an application on Amazon EC2. Traffic normally averages 500 requests per minute but occasionally increases to 10,000 requests per minute for short periods. Which cloud characteristic allows the company to automatically increase and decrease resources as needed?",
    options: [
      { id: "A", text: "Durability" },
      { id: "B", text: "Elasticity" },
      { id: "C", text: "Encryption" },
      { id: "D", text: "Governance" },
    ],
    correctAnswer: ["B"],
    explanation:
      "Elasticity is the ability to dynamically acquire and release compute, storage, and networking resources as demand changes, ensuring high performance without paying for idle capacity.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 2,
    domain: "Cloud Concepts",
    topic: "Pay-as-you-go",
    questionType: "single",
    question:
      "A startup wants to avoid purchasing physical servers before knowing how much computing capacity it will need. Which AWS Cloud benefit best addresses this requirement?",
    options: [
      { id: "A", text: "Pay-as-you-go pricing" },
      { id: "B", text: "Dedicated hardware ownership" },
      { id: "C", text: "Fixed infrastructure capacity" },
      { id: "D", text: "Long-term hardware depreciation" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS operates on a consumption-based, pay-as-you-go pricing model. This eliminates the need for large upfront capital expenditures and allows businesses to adapt variable expenses as demand evolves.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 3,
    domain: "Cloud Concepts",
    topic: "Cloud Benefits",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which are common benefits of moving workloads from an on-premises data center to AWS? (Select TWO)",
    options: [
      { id: "A", text: "Elimination of all operational responsibilities" },
      { id: "B", text: "Ability to scale resources more easily" },
      { id: "C", text: "Reduced need for upfront infrastructure investment" },
      { id: "D", text: "Guaranteed zero downtime for every workload" },
      { id: "E", text: "AWS automatically determines all application architecture decisions" },
    ],
    correctAnswer: ["B", "C"],
    explanation:
      "Migrating to AWS improves scalability and transitions infrastructure spending from large capital expenditures (CapEx) to flexible operational expenses (OpEx). Under the Shared Responsibility Model, customers still retain key operational tasks and downtime is not unconditionally zero.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 4,
    domain: "Cloud Concepts",
    topic: "Availability Zones",
    questionType: "single",
    question:
      "An application must continue operating even if an individual data center becomes unavailable. Which AWS infrastructure concept should the architecture primarily use?",
    options: [
      { id: "A", text: "IAM users" },
      { id: "B", text: "Availability Zones" },
      { id: "C", text: "Edge caches" },
      { id: "D", text: "Security groups" },
    ],
    correctAnswer: ["B"],
    explanation:
      "Availability Zones (AZs) consist of one or more discrete data centers with redundant power, networking, and connectivity within an AWS Region. Deploying across multiple AZs provides fault isolation and high availability against individual data center outages.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 5,
    domain: "Cloud Concepts",
    topic: "Cloud Adoption Framework",
    questionType: "single",
    question:
      "An organization wants structured guidance for transforming its people, processes, and technology while adopting AWS Cloud. Which AWS framework is designed for this purpose?",
    options: [
      { id: "A", text: "AWS Well-Architected Framework" },
      { id: "B", text: "AWS Cloud Adoption Framework (AWS CAF)" },
      { id: "C", text: "AWS Shared Responsibility Model" },
      { id: "D", text: "AWS Trusted Advisor" },
    ],
    correctAnswer: ["B"],
    explanation:
      "The AWS Cloud Adoption Framework (AWS CAF) organizes guidance across six foundational perspectives (Business, People, Governance, Platform, Security, and Operations) to help organizations build an effective roadmap for cloud transformation.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 6,
    domain: "Cloud Concepts",
    topic: "Cloud Computing Principles",
    questionType: "multiple",
    multipleResponseCount: 3,
    question:
      "Which are principles associated with cloud computing? (Select THREE)",
    options: [
      { id: "A", text: "Provisioning resources when needed" },
      { id: "B", text: "Paying only for resources consumed" },
      { id: "C", text: "Requiring all capacity to be purchased years in advance" },
      { id: "D", text: "Rapidly scaling resources based on demand" },
      { id: "E", text: "Eliminating all software maintenance" },
    ],
    correctAnswer: ["A", "B", "D"],
    explanation:
      "Key cloud tenets include on-demand self-service, consumption-based pricing, and rapid elasticity. Long-term advance capacity purchases are not required, and software maintenance on customer workloads remains necessary.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 7,
    domain: "Cloud Concepts",
    topic: "6 Rs Migration Strategies",
    questionType: "single",
    question:
      "A company moves an existing application from its on-premises servers to Amazon EC2 with minimal changes to the application code. Which migration strategy best describes this approach?",
    options: [
      { id: "A", text: "Refactor" },
      { id: "B", text: "Replatform" },
      { id: "C", text: "Retain" },
      { id: "D", text: "Rehost" },
    ],
    correctAnswer: ["D"],
    explanation:
      "Rehosting, also known as 'lift-and-shift', moves workloads from on-premises environments to the cloud without modifying core architecture or application code.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 8,
    domain: "Cloud Concepts",
    topic: "6 Rs Migration Strategies",
    questionType: "single",
    question:
      "A company wants to move an application to AWS while making some cloud optimizations but without completely redesigning the application. Which migration strategy is most appropriate?",
    options: [
      { id: "A", text: "Replatform" },
      { id: "B", text: "Retire" },
      { id: "C", text: "Retain" },
      { id: "D", text: "Repurchase" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Replatforming (often called 'lift, tinker, and shift') involves making targeted optimizations (such as moving from a self-hosted database to Amazon RDS) to achieve cloud benefits without rewriting application core logic.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 9,
    domain: "Cloud Concepts",
    topic: "6 Rs Migration Strategies",
    questionType: "single",
    question:
      "An organization determines that an old application is no longer needed and decides not to migrate it to AWS. Which migration strategy is this?",
    options: [
      { id: "A", text: "Rehost" },
      { id: "B", text: "Retain" },
      { id: "C", text: "Retire" },
      { id: "D", text: "Refactor" },
    ],
    correctAnswer: ["C"],
    explanation:
      "Retiring involves decommissioning or turning off applications that are discovered to no longer be useful or needed in the business portfolio.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 10,
    domain: "Cloud Concepts",
    topic: "6 Rs Migration Strategies",
    questionType: "single",
    question:
      "A company completely redesigns a traditional application into a cloud-native, event-driven architecture using managed services. Which migration strategy best describes this?",
    options: [
      { id: "A", text: "Rehost" },
      { id: "B", text: "Retain" },
      { id: "C", text: "Refactor" },
      { id: "D", text: "Relocate" },
    ],
    correctAnswer: ["C"],
    explanation:
      "Refactoring (re-architecting) entails reimagining and redesigning the application architecture using cloud-native features (e.g., microservices, serverless, managed queues) to maximize agility and scalability.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 11,
    domain: "Cloud Concepts",
    topic: "Economies of Scale",
    questionType: "single",
    question:
      "Why can AWS offer lower infrastructure costs than an individual organization operating its own data center?",
    options: [
      { id: "A", text: "AWS never charges for storage" },
      { id: "B", text: "AWS benefits from economies of scale" },
      { id: "C", text: "AWS uses only free hardware" },
      { id: "D", text: "AWS provides unlimited resources at no cost" },
    ],
    correctAnswer: ["B"],
    explanation:
      "Because hundreds of thousands of customers aggregate their usage in the cloud, AWS achieves massive economies of scale, translating into higher purchasing power and regular price reductions.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 12,
    domain: "Cloud Concepts",
    topic: "CapEx vs OpEx",
    questionType: "single",
    question:
      "A business wants to replace large upfront infrastructure purchases with expenses that vary according to actual cloud usage. Which financial concept best describes this change?",
    options: [
      { id: "A", text: "Converting operating expenditure to capital expenditure" },
      { id: "B", text: "Converting capital expenditure to operating expenditure" },
      { id: "C", text: "Increasing depreciation" },
      { id: "D", text: "Eliminating all operating costs" },
    ],
    correctAnswer: ["B"],
    explanation:
      "Moving to cloud computing allows companies to trade capital expenditures (CapEx) on physical data centers and hardware for variable operational expenditures (OpEx) tied directly to consumption.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 13,
    domain: "Cloud Concepts",
    topic: "Global Infrastructure",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which AWS characteristics can help a company rapidly expand its application to users in different geographic areas? (Select TWO)",
    options: [
      { id: "A", text: "Global AWS infrastructure" },
      { id: "B", text: "AWS Regions" },
      { id: "C", text: "Mandatory single-region deployment" },
      { id: "D", text: "Physical ownership of AWS data centers" },
      { id: "E", text: "Fixed server capacity" },
    ],
    correctAnswer: ["A", "B"],
    explanation:
      "AWS provides a worldwide footprint of Regions and Edge Locations, allowing applications to deploy in multiple geographic areas in minutes, reducing latency for international users.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 14,
    domain: "Cloud Concepts",
    topic: "Agility",
    questionType: "single",
    question:
      "A development team wants to experiment with a new application without waiting weeks for procurement and installation of physical servers. Which cloud benefit most directly addresses this?",
    options: [
      { id: "A", text: "Agility" },
      { id: "B", text: "Data durability" },
      { id: "C", text: "Physical isolation" },
      { id: "D", text: "Hardware depreciation" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Cloud agility gives developers immediate access to resources, drastically reducing the time required to build, test, and release innovations from months to minutes.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 15,
    domain: "Cloud Concepts",
    topic: "Fault Tolerance",
    questionType: "single",
    question:
      "A company wants its application to continue functioning despite failure of an individual infrastructure component. Which cloud architecture principle is most relevant?",
    options: [
      { id: "A", text: "Fault tolerance" },
      { id: "B", text: "Data compression" },
      { id: "C", text: "Centralized billing" },
      { id: "D", text: "Manual provisioning" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Fault tolerance is the property that enables a system to continue operating without interruption even when one or more underlying hardware or software components experience failure.",
    difficulty: "medium",
    points: 1,
  },

  // DOMAIN 2 — SECURITY AND COMPLIANCE (Questions 16–35)
  {
    id: 16,
    domain: "Security and Compliance",
    topic: "Shared Responsibility Model",
    questionType: "single",
    question:
      "Under the AWS Shared Responsibility Model, which responsibility belongs to AWS?",
    options: [
      { id: "A", text: "Configuring customer IAM policies" },
      { id: "B", text: "Protecting the physical facilities that host AWS infrastructure" },
      { id: "C", text: "Encrypting every customer's application data automatically" },
      { id: "D", text: "Configuring customer security groups" },
    ],
    correctAnswer: ["B"],
    explanation:
      "AWS is responsible for 'Security OF the Cloud', which includes physical security of facilities, hardware, and the virtualization layer. Security IN the cloud (IAM policies, firewall rules, customer data encryption) remains the customer's duty.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 17,
    domain: "Security and Compliance",
    topic: "Shared Responsibility Model",
    questionType: "single",
    question:
      "Under the Shared Responsibility Model, which task is generally the customer's responsibility?",
    options: [
      { id: "A", text: "Maintaining AWS data center buildings" },
      { id: "B", text: "Replacing failed AWS physical disks" },
      { id: "C", text: "Configuring access permissions for customer resources" },
      { id: "D", text: "Maintaining AWS global networking hardware" },
    ],
    correctAnswer: ["C"],
    explanation:
      "Configuring access management (IAM roles, policies, and credentials) for customer resources is the customer's responsibility under 'Security IN the Cloud'.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 18,
    domain: "Security and Compliance",
    topic: "IAM Roles",
    questionType: "single",
    question:
      "A company wants users to access AWS resources using temporary credentials associated with specific permissions. Which IAM feature should it primarily use?",
    options: [
      { id: "A", text: "IAM roles" },
      { id: "B", text: "Root user only" },
      { id: "C", text: "Security groups" },
      { id: "D", text: "Route tables" },
    ],
    correctAnswer: ["A"],
    explanation:
      "IAM roles provide temporary security credentials with short-lived access that can be assumed by users, applications, or AWS services without storing long-term credentials.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 19,
    domain: "Security and Compliance",
    topic: "Account Security Best Practices",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which practices improve the security of an AWS account? (Select TWO)",
    options: [
      { id: "A", text: "Enable MFA for privileged identities" },
      { id: "B", text: "Use the root user for daily administration" },
      { id: "C", text: "Apply least-privilege permissions" },
      { id: "D", text: "Give every user AdministratorAccess" },
      { id: "E", text: "Share one password among all administrators" },
    ],
    correctAnswer: ["A", "C"],
    explanation:
      "Enabling Multi-Factor Authentication (MFA) and enforcing the principle of least privilege (granting only required permissions) are fundamental AWS security recommendations. The root user should never be used for everyday tasks.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 20,
    domain: "Security and Compliance",
    topic: "AWS CloudTrail",
    questionType: "single",
    question:
      "An administrator needs a record of API calls made in an AWS account, including who made the call and which AWS service was accessed. Which service should be used?",
    options: [
      { id: "A", text: "Amazon CloudFront" },
      { id: "B", text: "AWS CloudTrail" },
      { id: "C", text: "Amazon Inspector" },
      { id: "D", text: "Amazon Route 53" },
    ],
    correctAnswer: ["B"],
    explanation:
      "AWS CloudTrail tracks and logs user activity and API calls across AWS services, detailing caller identity, timestamp, source IP address, and request parameters for auditing and governance.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 21,
    domain: "Security and Compliance",
    topic: "Amazon GuardDuty",
    questionType: "single",
    question:
      "A security team wants a service that analyzes AWS account activity and data sources to detect potentially malicious behavior. Which service is most appropriate?",
    options: [
      { id: "A", text: "Amazon GuardDuty" },
      { id: "B", text: "Amazon S3" },
      { id: "C", text: "AWS Budgets" },
      { id: "D", text: "Amazon RDS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon GuardDuty is an intelligent threat detection service that continuously analyzes VPC Flow Logs, CloudTrail management/event logs, and DNS query logs to identify unauthorized or suspicious activities.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 22,
    domain: "Security and Compliance",
    topic: "AWS WAF",
    questionType: "single",
    question:
      "A web application is experiencing malicious HTTP requests and the team wants to create rules to block specific web attack patterns. Which service is designed for this?",
    options: [
      { id: "A", text: "AWS WAF" },
      { id: "B", text: "AWS Shield" },
      { id: "C", text: "AWS KMS" },
      { id: "D", text: "Amazon Macie" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS WAF (Web Application Firewall) protects web applications and APIs from common web exploits (such as SQL injection and cross-site scripting) by monitoring and filtering incoming HTTP/HTTPS traffic.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 23,
    domain: "Security and Compliance",
    topic: "AWS Shield",
    questionType: "single",
    question:
      "Which AWS service is primarily designed to protect applications against distributed denial-of-service attacks?",
    options: [
      { id: "A", text: "AWS Shield" },
      { id: "B", text: "AWS Config" },
      { id: "C", text: "AWS Artifact" },
      { id: "D", text: "AWS CloudFormation" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Shield is a managed Distributed Denial of Service (DDoS) protection service. AWS Shield Standard provides automatic protection against common infrastructure-layer DDoS attacks at no additional cost.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 24,
    domain: "Security and Compliance",
    topic: "AWS KMS",
    questionType: "single",
    question:
      "A company wants to create and manage encryption keys for protecting data in AWS services. Which AWS service should it consider?",
    options: [
      { id: "A", text: "AWS KMS" },
      { id: "B", text: "AWS CloudTrail" },
      { id: "C", text: "AWS Organizations" },
      { id: "D", text: "Amazon Inspector" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Key Management Service (KMS) makes it easy for customers to create, manage, and control cryptographic keys used to encrypt data across AWS workloads and integrated services.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 25,
    domain: "Security and Compliance",
    topic: "Principle of Least Privilege",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which actions support the principle of least privilege? (Select TWO)",
    options: [
      { id: "A", text: "Grant only permissions required for a task" },
      { id: "B", text: "Grant AdministratorAccess to all employees" },
      { id: "C", text: "Review permissions regularly" },
      { id: "D", text: "Use one shared administrator identity" },
      { id: "E", text: "Grant unrestricted access to simplify operations" },
    ],
    correctAnswer: ["A", "C"],
    explanation:
      "The principle of least privilege requires providing identities with only the minimal permissions needed to complete their duties, along with periodic audits to remove unneeded rights.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 26,
    domain: "Security and Compliance",
    topic: "AWS Organizations",
    questionType: "single",
    question:
      "A company wants to centrally manage multiple AWS accounts and apply governance policies across those accounts. Which service is most appropriate?",
    options: [
      { id: "A", text: "AWS Organizations" },
      { id: "B", text: "Amazon CloudFront" },
      { id: "C", text: "AWS Lambda" },
      { id: "D", text: "Amazon SQS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Organizations enables central management of multiple AWS accounts, consolidated billing, programmatic account creation, and Service Control Policies (SCPs) to establish governance guardrails.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 27,
    domain: "Security and Compliance",
    topic: "AWS Artifact",
    questionType: "single",
    question:
      "Which AWS service provides a centralized place to access AWS compliance reports and agreements?",
    options: [
      { id: "A", text: "AWS Artifact" },
      { id: "B", text: "AWS Budgets" },
      { id: "C", text: "Amazon Detective" },
      { id: "D", text: "AWS Config" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Artifact is an on-demand audit and compliance portal that gives customers direct access to AWS compliance reports (e.g., SOC, PCI, ISO) and regulatory agreements (e.g., BAA).",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 28,
    domain: "Security and Compliance",
    topic: "AWS Config",
    questionType: "single",
    question:
      "A company wants to continuously evaluate whether AWS resource configurations comply with predefined rules. Which service is designed for this purpose?",
    options: [
      { id: "A", text: "AWS Config" },
      { id: "B", text: "Amazon Route 53" },
      { id: "C", text: "Amazon SQS" },
      { id: "D", text: "AWS Pricing Calculator" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Config continuously assesses, audits, and evaluates resource configurations against desired baselines and automated rules, recording historical configuration changes over time.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 29,
    domain: "Security and Compliance",
    topic: "Amazon Macie",
    questionType: "single",
    question:
      "A company wants to discover sensitive data such as personally identifiable information stored in Amazon S3. Which AWS service is designed for this purpose?",
    options: [
      { id: "A", text: "Amazon Macie" },
      { id: "B", text: "AWS Shield" },
      { id: "C", text: "Amazon Inspector" },
      { id: "D", text: "Amazon CloudFront" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Macie is a fully managed data security and privacy service that utilizes machine learning and pattern matching to discover, classify, and protect sensitive information (PII) stored in S3.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 30,
    domain: "Security and Compliance",
    topic: "Amazon Inspector",
    questionType: "single",
    question:
      "A development team wants automated vulnerability assessments for applications running on AWS workloads. Which AWS service is appropriate?",
    options: [
      { id: "A", text: "Amazon Inspector" },
      { id: "B", text: "Amazon SNS" },
      { id: "C", text: "Amazon Athena" },
      { id: "D", text: "Amazon Route 53" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Inspector is an automated vulnerability management service that scans AWS workloads (EC2 instances, container images in ECR, and Lambda functions) for software vulnerabilities and unintended network exposure.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 31,
    domain: "Security and Compliance",
    topic: "IAM Core Concepts",
    questionType: "multiple",
    multipleResponseCount: 3,
    question:
      "Which are examples of identity and access management concepts? (Select THREE)",
    options: [
      { id: "A", text: "Users" },
      { id: "B", text: "Roles" },
      { id: "C", text: "Policies" },
      { id: "D", text: "Availability Zones" },
      { id: "E", text: "Edge locations" },
    ],
    correctAnswer: ["A", "B", "C"],
    explanation:
      "AWS IAM core entities include Users (identities for people or services), Roles (identities assumed for temporary credentials), and Policies (JSON documents that grant or deny permissions). Availability Zones and Edge locations are physical infrastructure components.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 32,
    domain: "Security and Compliance",
    topic: "Multi-Factor Authentication",
    questionType: "single",
    question:
      "A company requires administrators to provide a second authentication factor in addition to their password. Which security control provides this?",
    options: [
      { id: "A", text: "MFA" },
      { id: "B", text: "DNS" },
      { id: "C", text: "CDN" },
      { id: "D", text: "NAT" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Multi-Factor Authentication (MFA) adds an extra layer of defense by requiring users to generate an authenticator code or use a hardware security key alongside their username and password.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 33,
    domain: "Security and Compliance",
    topic: "Root User Security",
    questionType: "single",
    question:
      "Which AWS identity should generally be protected especially carefully and should not be used for routine administrative tasks?",
    options: [
      { id: "A", text: "IAM group" },
      { id: "B", text: "AWS account root user" },
      { id: "C", text: "IAM role" },
      { id: "D", text: "EC2 instance profile" },
    ],
    correctAnswer: ["B"],
    explanation:
      "The AWS account root user has unrestricted access to all resources and billing information. AWS best practice mandates locking down root access with MFA and using dedicated IAM identities for everyday administration.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 34,
    domain: "Security and Compliance",
    topic: "Security Monitoring Services",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which AWS services can help organizations detect or investigate security-related activity? (Select TWO)",
    options: [
      { id: "A", text: "Amazon GuardDuty" },
      { id: "B", text: "AWS CloudTrail" },
      { id: "C", text: "Amazon S3 Glacier" },
      { id: "D", text: "Amazon Route 53" },
      { id: "E", text: "AWS Pricing Calculator" },
    ],
    correctAnswer: ["A", "B"],
    explanation:
      "Amazon GuardDuty provides automated threat detection across AWS accounts, while AWS CloudTrail records API audit logs to support investigations and compliance audits.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 35,
    domain: "Security and Compliance",
    topic: "Shared Responsibility Model",
    questionType: "single",
    question:
      "A company's security team wants to use AWS infrastructure while retaining responsibility for how its own data and access permissions are configured. Which AWS model explains this division of responsibilities?",
    options: [
      { id: "A", text: "AWS Shared Responsibility Model" },
      { id: "B", text: "AWS Well-Architected Framework" },
      { id: "C", text: "AWS Cloud Adoption Framework" },
      { id: "D", text: "AWS Free Tier" },
    ],
    correctAnswer: ["A"],
    explanation:
      "The AWS Shared Responsibility Model establishes that AWS is responsible for the security 'of' the cloud (hardware, facilities, host software), while the customer is responsible for security 'in' the cloud (data, access configuration, guest OS patches).",
    difficulty: "easy",
    points: 1,
  },

  // DOMAIN 3 — CLOUD TECHNOLOGY AND SERVICES (Questions 36–57)
  {
    id: 36,
    domain: "Cloud Technology and Services",
    topic: "Amazon EC2",
    questionType: "single",
    question: "Which AWS service provides resizable virtual servers in the cloud?",
    options: [
      { id: "A", text: "Amazon EC2" },
      { id: "B", text: "Amazon S3" },
      { id: "C", text: "Amazon RDS" },
      { id: "D", text: "Amazon SQS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Elastic Compute Cloud (EC2) delivers scalable computing capacity in the AWS cloud, allowing organizations to launch virtual server instances with custom configurations.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 37,
    domain: "Cloud Technology and Services",
    topic: "AWS Lambda",
    questionType: "single",
    question:
      "A company has code that should run automatically in response to events without managing servers. Which AWS service is most appropriate?",
    options: [
      { id: "A", text: "Amazon EC2" },
      { id: "B", text: "AWS Lambda" },
      { id: "C", text: "Amazon EBS" },
      { id: "D", text: "Amazon VPC" },
    ],
    correctAnswer: ["B"],
    explanation:
      "AWS Lambda is a serverless compute service that runs application code in response to events and automatically manages underlying compute resources, billing only for compute time consumed.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 38,
    domain: "Cloud Technology and Services",
    topic: "Container Services",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which AWS services provide container-related compute capabilities? (Select TWO)",
    options: [
      { id: "A", text: "Amazon ECS" },
      { id: "B", text: "Amazon EKS" },
      { id: "C", text: "Amazon S3" },
      { id: "D", text: "Amazon Route 53" },
      { id: "E", text: "Amazon CloudFront" },
    ],
    correctAnswer: ["A", "B"],
    explanation:
      "Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS) are AWS's managed container orchestration engines for running Docker/Kubernetes containerized applications.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 39,
    domain: "Cloud Technology and Services",
    topic: "Amazon RDS",
    questionType: "single",
    question:
      "A company wants a managed relational database service that supports common relational database engines. Which AWS service should it consider?",
    options: [
      { id: "A", text: "Amazon RDS" },
      { id: "B", text: "Amazon DynamoDB" },
      { id: "C", text: "Amazon S3" },
      { id: "D", text: "Amazon Neptune" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Relational Database Service (RDS) manages provisioning, patching, backup, recovery, and scaling for popular database engines including PostgreSQL, MySQL, MariaDB, Oracle, and Microsoft SQL Server.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 40,
    domain: "Cloud Technology and Services",
    topic: "Amazon DynamoDB",
    questionType: "single",
    question:
      "A company needs a serverless NoSQL database that can provide highly scalable key-value and document data storage. Which service is most appropriate?",
    options: [
      { id: "A", text: "Amazon RDS" },
      { id: "B", text: "Amazon DynamoDB" },
      { id: "C", text: "Amazon EFS" },
      { id: "D", text: "Amazon Redshift" },
    ],
    correctAnswer: ["B"],
    explanation:
      "Amazon DynamoDB is a fully managed, serverless key-value and document NoSQL database designed to deliver single-digit millisecond performance at any scale.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 41,
    domain: "Cloud Technology and Services",
    topic: "Amazon S3",
    questionType: "single",
    question: "Which AWS service is designed for object storage?",
    options: [
      { id: "A", text: "Amazon S3" },
      { id: "B", text: "Amazon EBS" },
      { id: "C", text: "Amazon EFS" },
      { id: "D", text: "Amazon RDS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Simple Storage Service (S3) is an industry-leading object storage service offering 99.999999999% (11 9s) of data durability for images, backups, documents, and analytics datasets.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 42,
    domain: "Cloud Technology and Services",
    topic: "Amazon EBS",
    questionType: "single",
    question:
      "An EC2 instance needs persistent block-level storage attached to it. Which AWS service should be used?",
    options: [
      { id: "A", text: "Amazon EBS" },
      { id: "B", text: "Amazon S3" },
      { id: "C", text: "Amazon SQS" },
      { id: "D", text: "Amazon CloudFront" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Elastic Block Store (EBS) provides high-performance, persistent block storage volumes designed for use with Amazon EC2 instances.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 43,
    domain: "Cloud Technology and Services",
    topic: "Amazon EFS",
    questionType: "single",
    question:
      "Several Linux-based EC2 instances need to access the same file system concurrently. Which AWS storage service is most appropriate?",
    options: [
      { id: "A", text: "Amazon EFS" },
      { id: "B", text: "Amazon EBS" },
      { id: "C", text: "Amazon S3 Glacier" },
      { id: "D", text: "Amazon SQS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Elastic File System (EFS) provides a simple, serverless, elastic NFS file system that can be mounted concurrently by thousands of compute instances across multiple Availability Zones.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 44,
    domain: "Cloud Technology and Services",
    topic: "Amazon CloudFront",
    questionType: "single",
    question:
      "A company wants to distribute static and dynamic content globally with lower latency by caching content close to users. Which AWS service is designed for this?",
    options: [
      { id: "A", text: "Amazon CloudFront" },
      { id: "B", text: "Amazon RDS" },
      { id: "C", text: "AWS Direct Connect" },
      { id: "D", text: "AWS CloudFormation" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon CloudFront is a fast content delivery network (CDN) that securely delivers data, videos, applications, and APIs to global customers with low latency via Edge Locations.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 45,
    domain: "Cloud Technology and Services",
    topic: "Amazon Route 53",
    questionType: "single",
    question: "Which AWS service provides managed DNS and domain routing?",
    options: [
      { id: "A", text: "Amazon Route 53" },
      { id: "B", text: "Amazon CloudFront" },
      { id: "C", text: "Amazon VPC" },
      { id: "D", text: "AWS Transit Gateway" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service that translates names into IP addresses and routes internet traffic.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 46,
    domain: "Cloud Technology and Services",
    topic: "Amazon VPC",
    questionType: "single",
    question:
      "A company wants to create an isolated virtual network environment in AWS. Which service should it use?",
    options: [
      { id: "A", text: "Amazon VPC" },
      { id: "B", text: "Amazon S3" },
      { id: "C", text: "AWS IAM" },
      { id: "D", text: "Amazon SNS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Virtual Private Cloud (VPC) gives customers complete control over their logically isolated virtual network, including selection of IP address ranges, subnets, and route tables.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 47,
    domain: "Cloud Technology and Services",
    topic: "Elastic Load Balancing",
    questionType: "single",
    question:
      "A web application needs to distribute incoming traffic across multiple application servers. Which service should the company consider?",
    options: [
      { id: "A", text: "Elastic Load Balancing" },
      { id: "B", text: "Amazon S3" },
      { id: "C", text: "AWS Artifact" },
      { id: "D", text: "AWS KMS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Elastic Load Balancing (ELB) automatically distributes incoming application or network traffic across multiple targets (such as EC2 instances, containers, and IP addresses) in one or more Availability Zones.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 48,
    domain: "Cloud Technology and Services",
    topic: "EC2 Auto Scaling",
    questionType: "single",
    question:
      "A company wants the number of EC2 instances to automatically increase during traffic spikes and decrease when demand falls. Which service provides this capability?",
    options: [
      { id: "A", text: "EC2 Auto Scaling" },
      { id: "B", text: "Amazon Inspector" },
      { id: "C", text: "AWS Config" },
      { id: "D", text: "Amazon Macie" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon EC2 Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 49,
    domain: "Cloud Technology and Services",
    topic: "Serverless Architecture",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which are serverless AWS services commonly used to build applications without managing traditional servers? (Select TWO)",
    options: [
      { id: "A", text: "AWS Lambda" },
      { id: "B", text: "Amazon DynamoDB" },
      { id: "C", text: "Amazon EC2" },
      { id: "D", text: "Amazon EBS" },
      { id: "E", text: "AWS Outposts" },
    ],
    correctAnswer: ["A", "B"],
    explanation:
      "AWS Lambda and Amazon DynamoDB are native serverless services with automatic scaling, high availability built-in, and no OS or server management required.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 50,
    domain: "Cloud Technology and Services",
    topic: "Amazon SQS",
    questionType: "single",
    question:
      "A company wants to place messages into a queue so that application components can process them asynchronously. Which service should it use?",
    options: [
      { id: "A", text: "Amazon SQS" },
      { id: "B", text: "Amazon Route 53" },
      { id: "C", text: "Amazon CloudFront" },
      { id: "D", text: "AWS KMS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables software components to be decoupled and communicate asynchronously.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 51,
    domain: "Cloud Technology and Services",
    topic: "Amazon SNS",
    questionType: "single",
    question:
      "A company needs a service that can send notifications to multiple subscribers using a publish/subscribe model. Which service is appropriate?",
    options: [
      { id: "A", text: "Amazon SNS" },
      { id: "B", text: "Amazon EBS" },
      { id: "C", text: "Amazon Athena" },
      { id: "D", text: "Amazon Inspector" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Simple Notification Service (SNS) is a managed pub/sub messaging service that coordinates message delivery to subscribing endpoints such as Lambda, SQS, mobile push, and email.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 52,
    domain: "Cloud Technology and Services",
    topic: "Amazon Athena",
    questionType: "single",
    question:
      "A company has large amounts of data in Amazon S3 and wants to run SQL queries directly against the data without managing servers. Which service should it use?",
    options: [
      { id: "A", text: "Amazon Athena" },
      { id: "B", text: "Amazon EC2" },
      { id: "C", text: "Amazon RDS" },
      { id: "D", text: "Amazon Lightsail" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Athena is an interactive query service that makes it easy to analyze data directly in Amazon S3 using standard SQL, without requiring complex ETL or server infrastructure.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 53,
    domain: "Cloud Technology and Services",
    topic: "Amazon Redshift",
    questionType: "single",
    question:
      "Which AWS service is primarily used to provide managed data warehousing at scale?",
    options: [
      { id: "A", text: "Amazon Redshift" },
      { id: "B", text: "Amazon DynamoDB" },
      { id: "C", text: "Amazon EBS" },
      { id: "D", text: "Amazon Route 53" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon Redshift is AWS's fully managed, petabyte-scale cloud data warehouse designed for high-performance complex analytical queries across vast structured datasets.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 54,
    domain: "Cloud Technology and Services",
    topic: "AWS CloudFormation",
    questionType: "single",
    question:
      "A company wants to define AWS infrastructure using code so environments can be reproduced consistently. Which AWS service is designed for this?",
    options: [
      { id: "A", text: "AWS CloudFormation" },
      { id: "B", text: "Amazon CloudFront" },
      { id: "C", text: "Amazon GuardDuty" },
      { id: "D", text: "AWS Artifact" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS CloudFormation allows you to treat Infrastructure as Code (IaC) by modeling AWS and third-party resources through declarative JSON/YAML template files.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 55,
    domain: "Cloud Technology and Services",
    topic: "Global Infrastructure",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which are examples of AWS global infrastructure components? (Select TWO)",
    options: [
      { id: "A", text: "Regions" },
      { id: "B", text: "Availability Zones" },
      { id: "C", text: "IAM policies" },
      { id: "D", text: "Security groups" },
      { id: "E", text: "S3 buckets" },
    ],
    correctAnswer: ["A", "B"],
    explanation:
      "AWS global infrastructure is built upon geographic Regions, fault-isolated Availability Zones (AZs), and peripheral Edge Locations. IAM policies, security groups, and S3 buckets are resources created within the infrastructure.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 56,
    domain: "Cloud Technology and Services",
    topic: "AWS Direct Connect",
    questionType: "single",
    question:
      "A company wants to migrate a large amount of data from an on-premises data center to AWS using a dedicated network connection instead of the public internet. Which AWS service should it consider?",
    options: [
      { id: "A", text: "AWS Direct Connect" },
      { id: "B", text: "Amazon CloudFront" },
      { id: "C", text: "Amazon Route 53" },
      { id: "D", text: "AWS Lambda" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Direct Connect establishes a dedicated physical network connection from an on-premises data center directly to AWS, bypassing the public internet to deliver higher bandwidth and lower networking latency.",
    difficulty: "hard",
    points: 1,
  },
  {
    id: 57,
    domain: "Cloud Technology and Services",
    topic: "AWS Elastic Beanstalk",
    questionType: "single",
    question:
      "A company wants a fully managed service for deploying a web application without manually managing the underlying infrastructure. Which AWS service is designed specifically to simplify application deployment?",
    options: [
      { id: "A", text: "AWS Elastic Beanstalk" },
      { id: "B", text: "Amazon EBS" },
      { id: "C", text: "AWS KMS" },
      { id: "D", text: "Amazon Macie" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Elastic Beanstalk is a Platform as a Service (PaaS) that handles application deployment, capacity provisioning, load balancing, auto-scaling, and health monitoring simply by uploading code.",
    difficulty: "medium",
    points: 1,
  },

  // DOMAIN 4 — BILLING, PRICING, AND SUPPORT (Questions 58–65)
  {
    id: 58,
    domain: "Billing, Pricing, and Support",
    topic: "AWS Pricing Calculator",
    questionType: "single",
    question:
      "A company wants to estimate the expected monthly AWS cost of a proposed architecture before deploying it. Which tool should it use?",
    options: [
      { id: "A", text: "AWS Pricing Calculator" },
      { id: "B", text: "AWS CloudTrail" },
      { id: "C", text: "Amazon Inspector" },
      { id: "D", text: "AWS Artifact" },
    ],
    correctAnswer: ["A"],
    explanation:
      "The AWS Pricing Calculator is a web-based planning tool that allows organizations to model architecture use cases, evaluate service costs, and build custom budget estimates before spending money.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 59,
    domain: "Billing, Pricing, and Support",
    topic: "AWS Cost Explorer",
    questionType: "single",
    question:
      "A finance team wants to visualize historical AWS spending and identify trends in resource costs. Which service should it use?",
    options: [
      { id: "A", text: "AWS Cost Explorer" },
      { id: "B", text: "Amazon CloudFront" },
      { id: "C", text: "AWS WAF" },
      { id: "D", text: "Amazon Route 53" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Cost Explorer provides interactive charts and reports to visualize, understand, and manage AWS costs and usage over time, helping to identify spending anomalies and cost trends.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 60,
    domain: "Billing, Pricing, and Support",
    topic: "AWS Budgets",
    questionType: "single",
    question:
      "An organization wants an alert when its AWS spending reaches a predefined threshold. Which service is appropriate?",
    options: [
      { id: "A", text: "AWS Budgets" },
      { id: "B", text: "Amazon SQS" },
      { id: "C", text: "AWS Config" },
      { id: "D", text: "Amazon GuardDuty" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Budgets enables customers to set custom cost and usage limits and receive proactive email or SNS notifications when actual or forecasted spending exceeds configured thresholds.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 61,
    domain: "Billing, Pricing, and Support",
    topic: "Compute Cost Savings Options",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which purchasing options can help reduce AWS compute costs when compared with unrestricted On-Demand usage in appropriate scenarios? (Select TWO)",
    options: [
      { id: "A", text: "Savings Plans" },
      { id: "B", text: "Reserved Instances" },
      { id: "C", text: "AWS Artifact" },
      { id: "D", text: "AWS CloudTrail" },
      { id: "E", text: "Amazon Route 53" },
    ],
    correctAnswer: ["A", "B"],
    explanation:
      "Savings Plans and Reserved Instances offer significant discounts (up to 72%) off standard On-Demand pricing in exchange for committing to a consistent amount of compute usage (measured in $/hr) over a 1- or 3-year term.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 62,
    domain: "Billing, Pricing, and Support",
    topic: "Spot Instances",
    questionType: "single",
    question:
      "A workload is fault tolerant and can be interrupted without major business impact. The company wants to use spare AWS compute capacity at a potentially lower price. Which option is most appropriate?",
    options: [
      { id: "A", text: "Spot Instances" },
      { id: "B", text: "Dedicated Hosts only" },
      { id: "C", text: "On-Demand Instances only" },
      { id: "D", text: "AWS Shield" },
    ],
    correctAnswer: ["A"],
    explanation:
      "Amazon EC2 Spot Instances allow customers to take advantage of unused EC2 capacity in the AWS cloud at discounts up to 90% compared to On-Demand prices, with the condition that instances can be reclaimed by AWS with a 2-minute warning.",
    difficulty: "medium",
    points: 1,
  },
  {
    id: 63,
    domain: "Billing, Pricing, and Support",
    topic: "AWS Trusted Advisor",
    questionType: "single",
    question:
      "A company wants recommendations for improving AWS cost efficiency, security, performance, and fault tolerance. Which AWS service provides automated recommendations across these areas?",
    options: [
      { id: "A", text: "AWS Trusted Advisor" },
      { id: "B", text: "Amazon Route 53" },
      { id: "C", text: "Amazon EFS" },
      { id: "D", text: "AWS CloudFormation" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Trusted Advisor inspects your environment and delivers actionable recommendations in five categories: Cost Optimization, Performance, Security, Fault Tolerance, and Service Quotas.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 64,
    domain: "Billing, Pricing, and Support",
    topic: "Cost Management Services",
    questionType: "multiple",
    multipleResponseCount: 2,
    question:
      "Which AWS services or resources can help an organization understand and control cloud spending? (Select TWO)",
    options: [
      { id: "A", text: "AWS Cost Explorer" },
      { id: "B", text: "AWS Budgets" },
      { id: "C", text: "Amazon CloudFront" },
      { id: "D", text: "Amazon Inspector" },
      { id: "E", text: "Amazon EFS" },
    ],
    correctAnswer: ["A", "B"],
    explanation:
      "AWS Cost Explorer visualizes spending trends and forecasts future costs, while AWS Budgets tracks limits and fires automated alerts before unexpected bills accumulate.",
    difficulty: "easy",
    points: 1,
  },
  {
    id: 65,
    domain: "Billing, Pricing, and Support",
    topic: "AWS Professional Services",
    questionType: "single",
    question:
      "A company wants expert AWS guidance for designing and implementing a complex cloud architecture. Which AWS offering is designed to provide professional consulting assistance?",
    options: [
      { id: "A", text: "AWS Professional Services" },
      { id: "B", text: "Amazon S3" },
      { id: "C", text: "AWS Budgets" },
      { id: "D", text: "Amazon SQS" },
    ],
    correctAnswer: ["A"],
    explanation:
      "AWS Professional Services is a global team of experts that partners with organizations and members of the AWS Partner Network to deliver specialized guidance and enterprise cloud transformations.",
    difficulty: "medium",
    points: 1,
  },
];

export function getClientQuestions(): import("@/types/exam").ClientQuestion[] {
  return CLF_C02_QUESTIONS.map((q) => ({
    id: q.id,
    questionType: q.questionType,
    multipleResponseCount: q.multipleResponseCount,
    question: q.question,
    options: q.options,
    points: q.points,
  }));
}

