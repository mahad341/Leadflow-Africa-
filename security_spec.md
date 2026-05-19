# LeadFlow Africa Security Specification

## 1. Data Invariants
- **Multi-tenancy**: All data (Leads, Customers, Conversations, Messages, Automations, Payments) MUST belong to an `organizationId`.
- **Identity Integrity**: A User's profile must have a `uid` matching their auth `uid`.
- **Access Control**: Users can only read/write data where `organizationId` matches their own profile's `organizationId`.
- **Admin Lock**: Only users with the `admin` role can modify `Organization` settings or `Automation` rules.
- **Message Integrity**: `senderId` on messages must match the agent's `uid` if `senderType` is `agent`.

## 2. The Dirty Dozen Payloads
1. **Org Swap**: Creating a Lead with an `organizationId` belonging to another company.
2. **Profile Hijack**: Updating another user's `User` document.
3. **Role Elevation**: An `agent` updating their own `role` to `admin`.
4. **Orphaned Message**: Creating a Message without a valid Conversation ID.
5. **PII Leak**: An agent from Org A listing Customers from Org B.
6. **Shadow Field**: Adding an `isVip: true` field to a Lead that isn't in the schema.
7. **Timestamp Spoof**: Manually setting `createdAt` to a past date instead of `serverTimestamp()`.
8. **Invalid ID**: Using a 1MB string as a Document ID to cause resource exhaustion.
9. **Cross-Tenant Status Change**: An agent from Org A updating the status of a Lead in Org B.
10. **System Field Injection**: A user trying to write to `aiSummary` which should be system-only.
11. **Malicious Automation**: Creating an Automation that sends messages to external numbers.
12. **Unauthorized Subscription Change**: A user trying to update their Org's `subscriptionPlan`.

## 3. Implementation Plan
- Standalone `isValid[Entity]` helpers for all entities in `firebase-blueprint.json`.
- Master Gate pattern ensures `organizationId` check on all paths.
- AffectedKeys check for restricted updates (e.g., only admins can change roles).
