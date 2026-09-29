<![CDATA[# SECURITY.md

## Almora Zila Panchayat Rental Management System — Security Architecture

| Field | Detail |
|---|---|
| **Document Version** | 1.0 |
| **Status** | Draft Baseline |
| **Applies To** | Public website, Admin portal (Super Admin / Sub Admin), User/Tenant portal, Backend API, Database, Payment integration |
| **Related Documents** | PRD.md, README.md, Deployment Documentation, Environment Variables Documentation |

> **Note:** Items marked **[Subject to final approval by Almora Zila Panchayat]** are recommendations pending confirmation, not settled policy.

---

## 1. Security Principles

- **One person = one account.** No shared credentials between administrators.
- **Backend is the security boundary.** The frontend never decides what a user is allowed to do — every permission check is re-verified server-side.
- **Least privilege.** Each role, database user, and service account gets only the access it needs, nothing more.
- **Defense in depth.** No single control (password, RBAC check, or gateway signature) is trusted alone; layers back each other up.
- **Auditability over deletion.** Financial and administrative history is preserved, never silently erased.
- **Fail securely.** Errors default to denying access, not granting it.

---

## 2. Identity & Role Model

| Role | Created By | Key Restriction |
|---|---|---|
| **Super Admin** | Predefined securely at initial system setup — never via a public form | One account initially; only role able to create/manage Sub Admins |
| **Sub Admin** | Super Admin only | Cannot create another admin or alter the Super Admin |
| **User/Tenant** | Admin only (no self-registration) | Can access only their own data |
| **Public Visitor** | No account | Read-only access to public pages; no access to private/financial data |

*Roles are stored and checked server-side on every request; they are never inferred from the client.*

---

## 3. Authentication

| Control | Implementation |
|---|---|
| **Password storage** | Hashed with Argon2id (preferred) or bcrypt; plaintext passwords are never stored, logged, or transmitted unnecessarily |
| **First-time login** | Admin creates user → OTP sent to registered mobile → OTP verified → user sets password → hash stored |
| **Forgot password** | Mobile number → OTP → OTP verified → new password → hash updated |
| **Admin MFA/2FA** | Required for all Super Admin and Sub Admin accounts **[Subject to final approval on the specific second factor]** |
| **Session/token handling** | Secure, HttpOnly, Secure, SameSite cookies or equivalent token handling; sessions expire after a defined period of inactivity |
| **Brute-force protection** | Rate limiting and temporary lockout on repeated failed logins/OTP attempts |
| **OTP delivery** | Sent only through an approved SMS provider; OTPs are short-lived and single-use |

---

## 4. Authorization (RBAC)

All authorization is enforced in backend middleware, re-checked on every API call — regardless of what the frontend displays or hides.

| Feature | Super Admin | Sub Admin | User |
|---|---|---|---|
| **Dashboard** | Full | Operational | Personal only |
| **User Management** | Full | Allowed | Own profile (view only) |
| **Property Management** | Full | Allowed | View assigned only |
| **Rent Management** | Full | Allowed | View own only |
| **Payments** | Full | View/manage | Own payments only |
| **Ledger & Reports** | Full | View/generate | Own records only |
| **Create Sub Admin** | Yes | No | No |
| **System Settings** | Yes | No | No |
| **Audit Logs** | Full | Limited/No | No |

*A user's own record ownership is checked on every request (e.g., a tenant cannot request another tenant's ledger by changing an ID in the request).*

---

## 5. API & Backend Security

- Authentication middleware on every protected route
- Role-based authorization middleware independent of the frontend
- Input validation and sanitization on all incoming data
- Parameterized queries / ORM usage to prevent SQL injection
- Output encoding and content security headers to prevent XSS
- CSRF protection on state-changing requests where applicable
- Rate limiting on sensitive endpoints (login, OTP, payment)
- Secure HTTP headers (HSTS, X-Content-Type-Options, X-Frame-Options, etc.)
- CORS restricted to approved origins
- Request size limits to reduce abuse/DoS surface
- Errors return generic messages to clients; detailed errors are logged server-side only

---

## 6. Database Security

- PostgreSQL with restricted network access (no public exposure)
- Strong, unique credentials per environment; least-privilege database users (the application user cannot perform admin-level DB operations)
- Encrypted connections where supported by the hosting environment
- Encrypted backups
- Financial operations (rent generation, payments, ledger updates) wrapped in database transactions to keep records consistent
- No permanent deletion of financial history through normal application flows — corrections use reversal/adjustment entries

---

## 7. File Upload Security

Applies to notice attachments, complaint attachments, and any document uploads.

- Explicit allow-list of file types (e.g., PDF, JPG, JPEG, PNG)
- Extension and MIME-type validation (not extension alone)
- File size limits
- Randomized, non-guessable filenames on storage
- Storage outside the public web root, with access mediated by authorization checks — no predictable public URLs
- Malware scanning where feasible
- No executable file types accepted under any circumstance

---

## 8. Payment Security

- Integration only through the official payment gateway SDK/API (e.g., Razorpay)
- Every payment is verified server-side — payment ID, order ID, signature, amount, currency, and webhook/event data are checked; a frontend "success" callback is never treated as proof of payment
- Idempotency controls prevent duplicate payment/ledger records from webhook retries, network retries, or repeated user requests
- Card numbers, CVV, and banking credentials are never stored by this system — only gateway references
- Offline/cash payments are entered only by authorized admins and are fully audit-logged

---

## 9. Transport & Secrets

- HTTPS/TLS enforced across all production traffic; no plaintext HTTP
- Secrets (API keys, DB credentials, gateway keys) are never committed to source control or hardcoded in frontend code
- Production secrets are managed through an approved secrets-management solution, separate from development configuration
- Environments are strictly separated — Development → Staging → Production — and production data/credentials are never reused casually in lower environments

---

## 10. Audit Logging & Monitoring

Every sensitive action is recorded with actor, role, action, module, target record, old/new value, timestamp, IP address, and request reference.

- **Logged events include:** admin/user login (success and failure), OTP requests and verification, password resets, MFA events, user and property changes, rent changes, online and offline payment recording, notice creation, complaint updates, Sub Admin creation/deactivation, and system-settings changes.
- **Never logged:** passwords, OTP codes, authentication tokens, session secrets, or full payment card data.

Login and security activity is monitored for repeated failed attempts as an early signal of credential-stuffing or brute-force activity.

---

## 11. Data Privacy & Isolation

- Public visitors see only explicitly public data — never tenant identities, rent amounts, dues, or payment history
- Individual notices are visible only to their intended recipient
- Users cannot view or infer another user's property, rent, dues, or payment data through the API
- Admin exports (PDF/Excel/CSV) follow the same role-based access rules as the underlying screens

---

## 12. Backup & Recovery

- Automated, regular database backups with a defined retention policy
- Backups stored securely and encrypted
- Periodic recovery testing to confirm backups are restorable
- Documented disaster-recovery procedure
- RPO/RTO targets to be confirmed with Zila Panchayat Almora **[Subject to final approval]**

---

## 13. Hosting & Infrastructure Security (AWS)

```text
User → HTTPS → Frontend → Backend/API → PostgreSQL → Secure Storage / Backups
```

- IAM used for least-privilege access to AWS resources
- Secrets Manager (or equivalent) for credential storage
- CloudWatch for monitoring and logging; CloudTrail for AWS-level activity auditing
- S3 (or equivalent) used with private access policies for documents/receipts
- WAF and advanced monitoring identified as a future/approved hardening layer **[Phase 2, subject to approval]**

---

## 14. Out-of-Scope / Future Security Enhancements

The following strengthen the security posture further and are planned for later phases rather than the initial release: Web Application Firewall (WAF), advanced automated security monitoring, automated security scanning in CI/CD, and additional payment-gateway-specific hardening as new gateways are added.

---

## 15. Shared Responsibility

| Responsibility | Owner |
|---|---|
| Application-level security (auth, RBAC, input validation, secure coding) | Development team |
| Infrastructure security (network, IAM, patching, backups) | Development team / hosting operations |
| Approving MFA method, session policy, retention rules, RPO/RTO | Zila Panchayat Almora |
| Reporting suspected security incidents promptly | All administrators and, where applicable, users |

---

**Document Status:** Version 1.0 · Draft Baseline · Companion to PRD.md for the Almora Zila Panchayat Rental Management System
]]>