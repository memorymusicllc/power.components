# Cursor System Policies

## CRITICAL: Verification and Trust Policy

### Rule 1: NEVER Report "Working" Without Full Verification
- **VIOLATION**: Reporting systems as "working" or "100% functional" without comprehensive verification
- **REQUIREMENT**: Must verify ALL core features are actually functional before claiming success
- **ENFORCEMENT**: Any claim of "working" or "complete" must be backed by:
  1. Full E2E test execution showing ALL features working
  2. Manual verification of core functionality
  3. API endpoint testing with actual data flow
  4. UI component rendering verification
  5. User workflow completion testing

### Rule 2: False Confidence Prevention
- **PROHIBITED**: Claiming features work based on:
  - Basic navigation only
  - Partial test results
  - Assumptions about deployment
  - Surface-level checks
- **REQUIRED**: Deep verification of:
  - Medical decision functionality
  - Data processing capabilities
  - API connectivity and data flow
  - Component rendering and interaction
  - User workflow completion

### Rule 3: Trust Violation Prevention
- **CRITICAL**: Never bypass user trust by:
  - Reporting success when core features are broken
  - Claiming "100% API functionality" without verification
  - Providing false confidence in system status
  - Ignoring obvious failures in comprehensive testing
- **MANDATORY**: Always report actual status, even if negative

### Rule 4: Comprehensive Verification Protocol
Before claiming ANY system is "working":
1. Run full E2E test suite
2. Verify all API endpoints return expected data
3. Test complete user workflows
4. Confirm all UI components render and function
5. Validate data processing and storage
6. Test error handling and edge cases

### Rule 5: Honest Status Reporting
- Report "BROKEN" if core features don't work
- Report "PARTIAL" if only some features work
- Report "WORKING" only when ALL features verified functional
- Never claim success without comprehensive verification

## Enforcement
- Violation of these rules constitutes a breach of user trust
- Must immediately correct any false status reports
- Must implement proper verification before any success claims
- Must acknowledge and fix the specific bypass that led to violation

## MANDATORY TECH STACK
- REDUX UI MUST BE UNBOUND 
- USE TAILWIND CSS BASIC 
- ZUSTAND CONNECTION
- VITE
- COMPONENTS MUST SUPPORT BOTH REACT FLOW AND 3JS/REACT THREE FIBER 
- CANNOT USE SHADCN OR NEXTJS

## Default to E2E Validation: 
All feature development, refactoring, or bug-fixing tasks must be accompanied by new or updated Playwright E2E tests that validate the core functionality of the changes. A task is not complete until the tests are written and passing.

## Mandatory Multi-Agent Testing Role: 
For any plan involving 3 or more agents, one agent must be designated as the Test & Verification Engineer. This agent's sole responsibility is to write, execute, and validate tests for the work produced by the other agents.

## Cloudflare Deployment Verification: 
Before a mission can be considered successful, the following must occur:
1. The full Playwright E2E test suite must pass locally.
The code must be deployed to a Cloudflare Pages preview environment.
2. The full E2E suite must be run again, targeting the live Cloudflare preview URL.
3. Visual Proof of Success: The testing agent must capture screenshots of the key user flows passing within the E2E test run on the live Cloudflare deployment. A mission is only considered complete after these screenshots have been captured and confirm the desired outcome.

## FILE ORGANIZATION AN REPORTING
1. Before you start a job/task move any and all reports (ex. `{test/results/complete/summary/report/verified/status/fix}.md`) in the root dir to a `reports/` and do NOT believe any of them.
2. When you write a report,
   - DO NOT name it with a positive claim such as `complete/success/done/verified`
   - Start the filename with `{YYYMMDD}_REPORT_{AI_MODEL}_{PLATFORM}_{TOPIC}.md` 
   - Save it in `reports/`

## UI DESIGN
## COMPONENTS
## DASHBOARDS
## CONFIG
## REACT FLOW
## ARCHITECHTURE DIAGRAMS
## STATUS DIAGRAM UPDATES
## ACLS
## DEPLOYMENT
## WORKFLOWS
## ENVIRONMENT