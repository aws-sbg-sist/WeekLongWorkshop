# AWS Cloud Practitioner CLF-C02
## 65-Question Original Practice Mock Examination

**Questions:** 65  
**Recommended time:** 90 minutes  
**Question types:** Multiple Choice + Multiple Response

> **Important:** These are original practice questions inspired by the AWS Certified Cloud Practitioner CLF-C02 exam objectives. They are not official AWS certification questions.

---

# DOMAIN 1 — CLOUD CONCEPTS
## Questions 1–15

### Question 1 — Single Answer
A company hosts an application on Amazon EC2. Traffic normally averages 500 requests per minute but occasionally increases to 10,000 requests per minute for short periods. Which cloud characteristic allows the company to automatically increase and decrease resources as needed?

A. Durability  
B. Elasticity  
C. Encryption  
D. Governance  

**Answer: B — Elasticity**

**Explanation:** Elasticity is the ability to dynamically acquire and release resources as demand changes.

---

### Question 2 — Single Answer
A startup wants to avoid purchasing physical servers before knowing how much computing capacity it will need. Which AWS Cloud benefit best addresses this requirement?

A. Pay-as-you-go pricing  
B. Dedicated hardware ownership  
C. Fixed infrastructure capacity  
D. Long-term hardware depreciation  

**Answer: A — Pay-as-you-go pricing**

**Explanation:** AWS allows customers to provision resources as needed and pay for consumption rather than purchasing physical infrastructure upfront.

---

### Question 3 — Multiple Response — Select TWO
Which are common benefits of moving workloads from an on-premises data center to AWS?

A. Elimination of all operational responsibilities  
B. Ability to scale resources more easily  
C. Reduced need for upfront infrastructure investment  
D. Guaranteed zero downtime for every workload  
E. AWS automatically determines all application architecture decisions  

**Answers: B, C**

**Explanation:** Cloud adoption can improve scalability and shift spending away from large upfront infrastructure purchases. It does not guarantee zero downtime or eliminate every operational responsibility.

---

### Question 4 — Single Answer
An application must continue operating even if an individual data center becomes unavailable. Which AWS infrastructure concept should the architecture primarily use?

A. IAM users  
B. Availability Zones  
C. Edge caches  
D. Security groups  

**Answer: B — Availability Zones**

**Explanation:** Availability Zones are separate infrastructure locations within an AWS Region and can be used to improve application availability.

---

### Question 5 — Single Answer
An organization wants structured guidance for transforming its people, processes, and technology while adopting AWS Cloud. Which AWS framework is designed for this purpose?

A. AWS Well-Architected Framework  
B. AWS Cloud Adoption Framework (AWS CAF)  
C. AWS Shared Responsibility Model  
D. AWS Trusted Advisor  

**Answer: B — AWS Cloud Adoption Framework (AWS CAF)**

**Explanation:** AWS CAF provides guidance for organizational transformation and cloud adoption.

---

### Question 6 — Multiple Response — Select THREE
Which are principles associated with cloud computing?

A. Provisioning resources when needed  
B. Paying only for resources consumed  
C. Requiring all capacity to be purchased years in advance  
D. Rapidly scaling resources based on demand  
E. Eliminating all software maintenance  

**Answers: A, B, D**

**Explanation:** On-demand provisioning, consumption-based economics, and rapid scaling are fundamental cloud concepts.

---

### Question 7 — Single Answer
A company moves an existing application from its on-premises servers to Amazon EC2 with minimal changes to the application code. Which migration strategy best describes this approach?

A. Refactor  
B. Replatform  
C. Retain  
D. Rehost  

**Answer: D — Rehost**

**Explanation:** Rehosting, commonly called "lift and shift," moves workloads with minimal modification.

---

### Question 8 — Single Answer
A company wants to move an application to AWS while making some cloud optimizations but without completely redesigning the application. Which migration strategy is most appropriate?

A. Replatform  
B. Retire  
C. Retain  
D. Repurchase  

**Answer: A — Replatform**

**Explanation:** Replatforming makes selected optimizations while preserving much of the existing application architecture.

---

### Question 9 — Single Answer
An organization determines that an old application is no longer needed and decides not to migrate it to AWS. Which migration strategy is this?

A. Rehost  
B. Retain  
C. Retire  
D. Refactor  

**Answer: C — Retire**

**Explanation:** Retiring means removing applications or workloads that are no longer necessary.

---

### Question 10 — Single Answer
A company completely redesigns a traditional application into a cloud-native, event-driven architecture using managed services. Which migration strategy best describes this?

A. Rehost  
B. Retain  
C. Refactor  
D. Relocate  

**Answer: C — Refactor**

**Explanation:** Refactoring involves significantly redesigning an application to take advantage of cloud-native capabilities.

---

### Question 11 — Single Answer
Why can AWS offer lower infrastructure costs than an individual organization operating its own data center?

A. AWS never charges for storage  
B. AWS benefits from economies of scale  
C. AWS uses only free hardware  
D. AWS provides unlimited resources at no cost  

**Answer: B — AWS benefits from economies of scale**

**Explanation:** AWS operates infrastructure at very large scale, which can provide purchasing and operational efficiencies.

---

### Question 12 — Single Answer
A business wants to replace large upfront infrastructure purchases with expenses that vary according to actual cloud usage. Which financial concept best describes this change?

A. Converting operating expenditure to capital expenditure  
B. Converting capital expenditure to operating expenditure  
C. Increasing depreciation  
D. Eliminating all operating costs  

**Answer: B — Converting capital expenditure to operating expenditure**

**Explanation:** Cloud computing can reduce the need for upfront capital expenditures and shift more spending toward operating expenses.

---

### Question 13 — Multiple Response — Select TWO
Which AWS characteristics can help a company rapidly expand its application to users in different geographic areas?

A. Global AWS infrastructure  
B. AWS Regions  
C. Mandatory single-region deployment  
D. Physical ownership of AWS data centers  
E. Fixed server capacity  

**Answers: A, B**

**Explanation:** AWS provides a global infrastructure consisting of Regions and other infrastructure components that support geographically distributed deployments.

---

### Question 14 — Single Answer
A development team wants to experiment with a new application without waiting weeks for procurement and installation of physical servers. Which cloud benefit most directly addresses this?

A. Agility  
B. Data durability  
C. Physical isolation  
D. Hardware depreciation  

**Answer: A — Agility**

**Explanation:** Cloud services enable teams to quickly provision resources and experiment with ideas.

---

### Question 15 — Single Answer
A company wants its application to continue functioning despite failure of an individual infrastructure component. Which cloud architecture principle is most relevant?

A. Fault tolerance  
B. Data compression  
C. Centralized billing  
D. Manual provisioning  

**Answer: A — Fault tolerance**

**Explanation:** Fault-tolerant architectures are designed to continue operating when components fail.

---

# DOMAIN 2 — SECURITY AND COMPLIANCE
## Questions 16–35

### Question 16 — Single Answer
Under the AWS Shared Responsibility Model, which responsibility belongs to AWS?

A. Configuring customer IAM policies  
B. Protecting the physical facilities that host AWS infrastructure  
C. Encrypting every customer's application data automatically  
D. Configuring customer security groups  

**Answer: B — Protecting the physical facilities that host AWS infrastructure**

**Explanation:** AWS is responsible for security of the cloud, including underlying physical infrastructure.

---

### Question 17 — Single Answer
Under the Shared Responsibility Model, which task is generally the customer's responsibility?

A. Maintaining AWS data center buildings  
B. Replacing failed AWS physical disks  
C. Configuring access permissions for customer resources  
D. Maintaining AWS global networking hardware  

**Answer: C — Configuring access permissions for customer resources**

**Explanation:** Customers are responsible for security in the cloud, including appropriate access configuration.

---

### Question 18 — Single Answer
A company wants users to access AWS resources using temporary credentials associated with specific permissions. Which IAM feature should it primarily use?

A. IAM roles  
B. Root user only  
C. Security groups  
D. Route tables  

**Answer: A — IAM roles**

**Explanation:** IAM roles provide temporary credentials and can be assumed by users, applications, or AWS services.

---

### Question 19 — Multiple Response — Select TWO
Which practices improve the security of an AWS account?

A. Enable MFA for privileged identities  
B. Use the root user for daily administration  
C. Apply least-privilege permissions  
D. Give every user AdministratorAccess  
E. Share one password among all administrators  

**Answers: A, C**

**Explanation:** MFA and least privilege are fundamental security best practices.

---

### Question 20 — Single Answer
An administrator needs a record of API calls made in an AWS account, including who made the call and which AWS service was accessed. Which service should be used?

A. Amazon CloudFront  
B. AWS CloudTrail  
C. Amazon Inspector  
D. Amazon Route 53  

**Answer: B — AWS CloudTrail**

**Explanation:** CloudTrail records AWS API activity and can help with auditing and governance.

---

### Question 21 — Single Answer
A security team wants a service that analyzes AWS account activity and data sources to detect potentially malicious behavior. Which service is most appropriate?

A. Amazon GuardDuty  
B. Amazon S3  
C. AWS Budgets  
D. Amazon RDS  

**Answer: A — Amazon GuardDuty**

**Explanation:** GuardDuty provides threat detection using AWS data sources and security intelligence.

---

### Question 22 — Single Answer
A web application is experiencing malicious HTTP requests and the team wants to create rules to block specific web attack patterns. Which service is designed for this?

A. AWS WAF  
B. AWS Shield  
C. AWS KMS  
D. Amazon Macie  

**Answer: A — AWS WAF**

**Explanation:** AWS WAF helps protect web applications by filtering and controlling web requests.

---

### Question 23 — Single Answer
Which AWS service is primarily designed to protect applications against distributed denial-of-service attacks?

A. AWS Shield  
B. AWS Config  
C. AWS Artifact  
D. AWS CloudFormation  

**Answer: A — AWS Shield**

**Explanation:** AWS Shield provides DDoS protection for AWS applications and resources.

---

### Question 24 — Single Answer
A company wants to create and manage encryption keys for protecting data in AWS services. Which AWS service should it consider?

A. AWS KMS  
B. AWS CloudTrail  
C. AWS Organizations  
D. Amazon Inspector  

**Answer: A — AWS KMS**

**Explanation:** AWS Key Management Service (KMS) lets customers create and manage cryptographic keys.

---

### Question 25 — Multiple Response — Select TWO
Which actions support the principle of least privilege?

A. Grant only permissions required for a task  
B. Grant AdministratorAccess to all employees  
C. Review permissions regularly  
D. Use one shared administrator identity  
E. Grant unrestricted access to simplify operations  

**Answers: A, C**

**Explanation:** Least privilege means providing only the permissions necessary and periodically reviewing them.

---

### Question 26 — Single Answer
A company wants to centrally manage multiple AWS accounts and apply governance policies across those accounts. Which service is most appropriate?

A. AWS Organizations  
B. Amazon CloudFront  
C. AWS Lambda  
D. Amazon SQS  

**Answer: A — AWS Organizations**

**Explanation:** AWS Organizations provides centralized management and governance of multiple AWS accounts.

---

### Question 27 — Single Answer
Which AWS service provides a centralized place to access AWS compliance reports and agreements?

A. AWS Artifact  
B. AWS Budgets  
C. Amazon Detective  
D. AWS Config  

**Answer: A — AWS Artifact**

**Explanation:** AWS Artifact provides on-demand access to AWS security and compliance documentation.

---

### Question 28 — Single Answer
A company wants to continuously evaluate whether AWS resource configurations comply with predefined rules. Which service is designed for this purpose?

A. AWS Config  
B. Amazon Route 53  
C. Amazon SQS  
D. AWS Pricing Calculator  

**Answer: A — AWS Config**

**Explanation:** AWS Config evaluates and records resource configurations and can assess compliance against rules.

---

### Question 29 — Single Answer
A company wants to discover sensitive data such as personally identifiable information stored in Amazon S3. Which AWS service is designed for this purpose?

A. Amazon Macie  
B. AWS Shield  
C. Amazon Inspector  
D. Amazon CloudFront  

**Answer: A — Amazon Macie**

**Explanation:** Amazon Macie helps discover and protect sensitive data stored in Amazon S3.

---

### Question 30 — Single Answer
A development team wants automated vulnerability assessments for applications running on AWS workloads. Which AWS service is appropriate?

A. Amazon Inspector  
B. Amazon SNS  
C. Amazon Athena  
D. Amazon Route 53  

**Answer: A — Amazon Inspector**

**Explanation:** Amazon Inspector provides automated vulnerability management and assessments for supported AWS workloads.

---

### Question 31 — Multiple Response — Select THREE
Which are examples of identity and access management concepts?

A. Users  
B. Roles  
C. Policies  
D. Availability Zones  
E. Edge locations  

**Answers: A, B, C**

**Explanation:** IAM uses identities and policies to control access to AWS resources.

---

### Question 32 — Single Answer
A company requires administrators to provide a second authentication factor in addition to their password. Which security control provides this?

A. MFA  
B. DNS  
C. CDN  
D. NAT  

**Answer: A — MFA**

**Explanation:** Multi-factor authentication adds an additional authentication factor beyond a password.

---

### Question 33 — Single Answer
Which AWS identity should generally be protected especially carefully and should not be used for routine administrative tasks?

A. IAM group  
B. AWS account root user  
C. IAM role  
D. EC2 instance profile  

**Answer: B — AWS account root user**

**Explanation:** The root user has extensive permissions and should be protected with strong controls, including MFA.

---

### Question 34 — Multiple Response — Select TWO
Which AWS services can help organizations detect or investigate security-related activity?

A. Amazon GuardDuty  
B. AWS CloudTrail  
C. Amazon S3 Glacier  
D. Amazon Route 53  
E. AWS Pricing Calculator  

**Answers: A, B**

**Explanation:** GuardDuty provides threat detection, while CloudTrail provides records of AWS API activity.

---

### Question 35 — Single Answer
A company's security team wants to use AWS infrastructure while retaining responsibility for how its own data and access permissions are configured. Which AWS model explains this division of responsibilities?

A. AWS Shared Responsibility Model  
B. AWS Well-Architected Framework  
C. AWS Cloud Adoption Framework  
D. AWS Free Tier  

**Answer: A — AWS Shared Responsibility Model**

**Explanation:** The Shared Responsibility Model explains which security responsibilities belong to AWS and which belong to the customer.

---

# DOMAIN 3 — CLOUD TECHNOLOGY AND SERVICES
## Questions 36–57

### Question 36 — Single Answer
Which AWS service provides resizable virtual servers in the cloud?

A. Amazon EC2  
B. Amazon S3  
C. Amazon RDS  
D. Amazon SQS  

**Answer: A — Amazon EC2**

**Explanation:** Amazon Elastic Compute Cloud (EC2) provides virtualized compute capacity.

---

### Question 37 — Single Answer
A company has code that should run automatically in response to events without managing servers. Which AWS service is most appropriate?

A. Amazon EC2  
B. AWS Lambda  
C. Amazon EBS  
D. Amazon VPC  

**Answer: B — AWS Lambda**

**Explanation:** Lambda runs code in response to events without requiring customers to manage servers.

---

### Question 38 — Multiple Response — Select TWO
Which AWS services provide container-related compute capabilities?

A. Amazon ECS  
B. Amazon EKS  
C. Amazon S3  
D. Amazon Route 53  
E. Amazon CloudFront  

**Answers: A, B**

**Explanation:** Amazon ECS and Amazon EKS are services for running and managing containers.

---

### Question 39 — Single Answer
A company wants a managed relational database service that supports common relational database engines. Which AWS service should it consider?

A. Amazon RDS  
B. Amazon DynamoDB  
C. Amazon S3  
D. Amazon Neptune  

**Answer: A — Amazon RDS**

**Explanation:** Amazon RDS is a managed relational database service.

---

### Question 40 — Single Answer
A company needs a serverless NoSQL database that can provide highly scalable key-value and document data storage. Which service is most appropriate?

A. Amazon RDS  
B. Amazon DynamoDB  
C. Amazon EFS  
D. Amazon Redshift  

**Answer: B — Amazon DynamoDB**

**Explanation:** DynamoDB is a managed NoSQL database supporting key-value and document models.

---

### Question 41 — Single Answer
Which AWS service is designed for object storage?

A. Amazon S3  
B. Amazon EBS  
C. Amazon EFS  
D. Amazon RDS  

**Answer: A — Amazon S3**

**Explanation:** Amazon S3 is AWS's object storage service.

---

### Question 42 — Single Answer
An EC2 instance needs persistent block-level storage attached to it. Which AWS service should be used?

A. Amazon EBS  
B. Amazon S3  
C. Amazon SQS  
D. Amazon CloudFront  

**Answer: A — Amazon EBS**

**Explanation:** Amazon Elastic Block Store provides persistent block storage volumes for compute workloads such as EC2.

---

### Question 43 — Single Answer
Several Linux-based EC2 instances need to access the same file system concurrently. Which AWS storage service is most appropriate?

A. Amazon EFS  
B. Amazon EBS  
C. Amazon S3 Glacier  
D. Amazon SQS  

**Answer: A — Amazon EFS**

**Explanation:** Amazon Elastic File System provides shared file storage that can be accessed concurrently by multiple compute resources.

---

### Question 44 — Single Answer
A company wants to distribute static and dynamic content globally with lower latency by caching content close to users. Which AWS service is designed for this?

A. Amazon CloudFront  
B. Amazon RDS  
C. AWS Direct Connect  
D. AWS CloudFormation  

**Answer: A — Amazon CloudFront**

**Explanation:** CloudFront is AWS's content delivery network (CDN).

---

### Question 45 — Single Answer
Which AWS service provides managed DNS and domain routing?

A. Amazon Route 53  
B. Amazon CloudFront  
C. Amazon VPC  
D. AWS Transit Gateway  

**Answer: A — Amazon Route 53**

**Explanation:** Route 53 is a highly available DNS and domain-name service.

---

### Question 46 — Single Answer
A company wants to create an isolated virtual network environment in AWS. Which service should it use?

A. Amazon VPC  
B. Amazon S3  
C. AWS IAM  
D. Amazon SNS  

**Answer: A — Amazon VPC**

**Explanation:** Amazon Virtual Private Cloud provides logically isolated networking environments.

---

### Question 47 — Single Answer
A web application needs to distribute incoming traffic across multiple application servers. Which service should the company consider?

A. Elastic Load Balancing  
B. Amazon S3  
C. AWS Artifact  
D. AWS KMS  

**Answer: A — Elastic Load Balancing**

**Explanation:** Elastic Load Balancing distributes incoming application traffic across targets.

---

### Question 48 — Single Answer
A company wants the number of EC2 instances to automatically increase during traffic spikes and decrease when demand falls. Which service provides this capability?

A. EC2 Auto Scaling  
B. Amazon Inspector  
C. AWS Config  
D. Amazon Macie  

**Answer: A — EC2 Auto Scaling**

**Explanation:** EC2 Auto Scaling adjusts the number of EC2 instances according to demand and configured policies.

---

### Question 49 — Multiple Response — Select TWO
Which are serverless AWS services commonly used to build applications without managing traditional servers?

A. AWS Lambda  
B. Amazon DynamoDB  
C. Amazon EC2  
D. Amazon EBS  
E. AWS Outposts  

**Answers: A, B**

**Explanation:** Lambda is serverless compute, while DynamoDB is a fully managed serverless-oriented NoSQL database service.

---

### Question 50 — Single Answer
A company wants to place messages into a queue so that application components can process them asynchronously. Which service should it use?

A. Amazon SQS  
B. Amazon Route 53  
C. Amazon CloudFront  
D. AWS KMS  

**Answer: A — Amazon SQS**

**Explanation:** Amazon Simple Queue Service provides managed message queuing and supports decoupled architectures.

---

### Question 51 — Single Answer
A company needs a service that can send notifications to multiple subscribers using a publish/subscribe model. Which service is appropriate?

A. Amazon SNS  
B. Amazon EBS  
C. Amazon Athena  
D. Amazon Inspector  

**Answer: A — Amazon SNS**

**Explanation:** Amazon Simple Notification Service supports pub/sub messaging and notifications.

---

### Question 52 — Single Answer
A company has large amounts of data in Amazon S3 and wants to run SQL queries directly against the data without managing servers. Which service should it use?

A. Amazon Athena  
B. Amazon EC2  
C. Amazon RDS  
D. Amazon Lightsail  

**Answer: A — Amazon Athena**

**Explanation:** Amazon Athena provides serverless interactive queries over data stored in services such as S3.

---

### Question 53 — Single Answer
Which AWS service is primarily used to provide managed data warehousing at scale?

A. Amazon Redshift  
B. Amazon DynamoDB  
C. Amazon EBS  
D. Amazon Route 53  

**Answer: A — Amazon Redshift**

**Explanation:** Amazon Redshift is a cloud data warehouse service.

---

### Question 54 — Single Answer
A company wants to define AWS infrastructure using code so environments can be reproduced consistently. Which AWS service is designed for this?

A. AWS CloudFormation  
B. Amazon CloudFront  
C. Amazon GuardDuty  
D. AWS Artifact  

**Answer: A — AWS CloudFormation**

**Explanation:** CloudFormation enables infrastructure-as-code deployments using templates.

---

### Question 55 — Multiple Response — Select TWO
Which are examples of AWS global infrastructure components?

A. Regions  
B. Availability Zones  
C. IAM policies  
D. Security groups  
E. S3 buckets  

**Answers: A, B**

**Explanation:** Regions and Availability Zones are foundational components of AWS global infrastructure.

---

### Question 56 — Single Answer
A company wants to migrate a large amount of data from an on-premises data center to AWS using a dedicated network connection instead of the public internet. Which AWS service should it consider?

A. AWS Direct Connect  
B. Amazon CloudFront  
C. Amazon Route 53  
D. AWS Lambda  

**Answer: A — AWS Direct Connect**

**Explanation:** AWS Direct Connect provides dedicated network connectivity between an organization's network and AWS.

---

### Question 57 — Single Answer
A company wants a fully managed service for deploying a web application without manually managing the underlying infrastructure. Which AWS service is designed specifically to simplify application deployment?

A. AWS Elastic Beanstalk  
B. Amazon EBS  
C. AWS KMS  
D. Amazon Macie  

**Answer: A — AWS Elastic Beanstalk**

**Explanation:** Elastic Beanstalk simplifies deploying and managing applications while handling underlying infrastructure resources.

---

# DOMAIN 4 — BILLING, PRICING, AND SUPPORT
## Questions 58–65

### Question 58 — Single Answer
A company wants to estimate the expected monthly AWS cost of a proposed architecture before deploying it. Which tool should it use?

A. AWS Pricing Calculator  
B. AWS CloudTrail  
C. Amazon Inspector  
D. AWS Artifact  

**Answer: A — AWS Pricing Calculator**

**Explanation:** AWS Pricing Calculator helps estimate costs for planned AWS workloads.

---

### Question 59 — Single Answer
A finance team wants to visualize historical AWS spending and identify trends in resource costs. Which service should it use?

A. AWS Cost Explorer  
B. Amazon CloudFront  
C. AWS WAF  
D. Amazon Route 53  

**Answer: A — AWS Cost Explorer**

**Explanation:** Cost Explorer helps analyze and visualize AWS costs and usage over time.

---

### Question 60 — Single Answer
An organization wants an alert when its AWS spending reaches a predefined threshold. Which service is appropriate?

A. AWS Budgets  
B. Amazon SQS  
C. AWS Config  
D. Amazon GuardDuty  

**Answer: A — AWS Budgets**

**Explanation:** AWS Budgets can monitor costs or usage and trigger alerts based on defined thresholds.

---

### Question 61 — Multiple Response — Select TWO
Which purchasing options can help reduce AWS compute costs when compared with unrestricted On-Demand usage in appropriate scenarios?

A. Savings Plans  
B. Reserved Instances  
C. AWS Artifact  
D. AWS CloudTrail  
E. Amazon Route 53  

**Answers: A, B**

**Explanation:** Savings Plans and Reserved Instances can offer discounted pricing in exchange for specific purchasing commitments or usage arrangements.

---

### Question 62 — Single Answer
A workload is fault tolerant and can be interrupted without major business impact. The company wants to use spare AWS compute capacity at a potentially lower price. Which option is most appropriate?

A. Spot Instances  
B. Dedicated Hosts only  
C. On-Demand Instances only  
D. AWS Shield  

**Answer: A — Spot Instances**

**Explanation:** Spot Instances use available AWS compute capacity and can be interrupted when AWS needs the capacity back.

---

### Question 63 — Single Answer
A company wants recommendations for improving AWS cost efficiency, security, performance, and fault tolerance. Which AWS service provides automated recommendations across these areas?

A. AWS Trusted Advisor  
B. Amazon Route 53  
C. Amazon EFS  
D. AWS CloudFormation  

**Answer: A — AWS Trusted Advisor**

**Explanation:** Trusted Advisor provides recommendations across several areas including cost optimization, security, performance, and service limits.

---

### Question 64 — Multiple Response — Select TWO
Which AWS services or resources can help an organization understand and control cloud spending?

A. AWS Cost Explorer  
B. AWS Budgets  
C. Amazon CloudFront  
D. Amazon Inspector  
E. Amazon EFS  

**Answers: A, B**

**Explanation:** Cost Explorer provides cost/usage analysis, while AWS Budgets enables threshold-based monitoring and alerts.

---

### Question 65 — Single Answer
A company wants expert AWS guidance for designing and implementing a complex cloud architecture. Which AWS offering is designed to provide professional consulting assistance?

A. AWS Professional Services  
B. Amazon S3  
C. AWS Budgets  
D. Amazon SQS  

**Answer: A — AWS Professional Services**

**Explanation:** AWS Professional Services provides consulting and specialized guidance to help customers achieve business and technical outcomes on AWS.

---

# ANSWER KEY — QUICK VIEW

| Q | Answer | Type |
|---|---|---|
| 1 | B | Single |
| 2 | A | Single |
| 3 | B, C | Multiple |
| 4 | B | Single |
| 5 | B | Single |
| 6 | A, B, D | Multiple |
| 7 | D | Single |
| 8 | A | Single |
| 9 | C | Single |
| 10 | C | Single |
| 11 | B | Single |
| 12 | B | Single |
| 13 | A, B | Multiple |
| 14 | A | Single |
| 15 | A | Single |
| 16 | B | Single |
| 17 | C | Single |
| 18 | A | Single |
| 19 | A, C | Multiple |
| 20 | B | Single |
| 21 | A | Single |
| 22 | A | Single |
| 23 | A | Single |
| 24 | A | Single |
| 25 | A, C | Multiple |
| 26 | A | Single |
| 27 | A | Single |
| 28 | A | Single |
| 29 | A | Single |
| 30 | A | Single |
| 31 | A, B, C | Multiple |
| 32 | A | Single |
| 33 | B | Single |
| 34 | A, B | Multiple |
| 35 | A | Single |
| 36 | A | Single |
| 37 | B | Single |
| 38 | A, B | Multiple |
| 39 | A | Single |
| 40 | B | Single |
| 41 | A | Single |
| 42 | A | Single |
| 43 | A | Single |
| 44 | A | Single |
| 45 | A | Single |
| 46 | A | Single |
| 47 | A | Single |
| 48 | A | Single |
| 49 | A, B | Multiple |
| 50 | A | Single |
| 51 | A | Single |
| 52 | A | Single |
| 53 | A | Single |
| 54 | A | Single |
| 55 | A, B | Multiple |
| 56 | A | Single |
| 57 | A | Single |
| 58 | A | Single |
| 59 | A | Single |
| 60 | A | Single |
| 61 | A, B | Multiple |
| 62 | A | Single |
| 63 | A | Single |
| 64 | A, B | Multiple |
| 65 | A | Single |

---

# MOCK-EXAM IMPLEMENTATION NOTES

For the web application, use the following metadata for every question:

```json
{
  "id": 1,
  "domain": "Cloud Concepts",
  "topic": "Elasticity",
  "questionType": "single",
  "question": "...",
  "options": [
    "A. ...",
    "B. ...",
    "C. ...",
    "D. ..."
  ],
  "correctAnswer": ["B"],
  "difficulty": "medium",
  "points": 1,
  "explanation": "..."
}
```

For a multiple-response question:

```json
{
  "id": 3,
  "domain": "Cloud Concepts",
  "topic": "Cloud Benefits",
  "questionType": "multiple",
  "multipleResponseCount": 2,
  "correctAnswer": ["B", "C"],
  "points": 1
}
```

## Recommended difficulty distribution

**Easy:** 16 questions  
**Medium:** 36 questions  
**Hard:** 13 questions

## Recommended scoring

For this college mock test, use:

**1 point per question**

For multiple-response questions:

**Full credit only when all correct choices are selected and no incorrect choice is selected.**

Do not use the AWS certification exam's 100–1,000 scaled scoring system for this mock. AWS's actual certification exam uses scaled scoring, with 700 as the passing score; that scoring model should not be represented as your mock exam's own scoring system.

## Suggested result calculation

```text
Score = number of correctly answered questions
Maximum Score = 65

Percentage = (Score / 65) × 100
```

Example:

```text
52 / 65
80.00%
```

For your event leaderboard, rank by:

1. Highest score
2. Lowest time used

The current CLF-C02 scope covers the four domains above and includes topics such as AWS global infrastructure, compute, databases, networking, storage, AI/ML and analytics, security, and cloud economics.