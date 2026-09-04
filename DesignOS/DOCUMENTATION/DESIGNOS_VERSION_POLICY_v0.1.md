# DesignOS Product Version Policy v0.1

## 1. Purpose

This document is the single governance source for DesignOS product-version identifiers. It separates product baselines from Spec revisions, Git identities and Releases. It defines deterministic numbering for stable increments without implementing a Version Engine.

## 2. Version Domains

- **Spec Revision:** internal revision of one logical Spec. It is not a product version.
- **DesignOS Product Version:** identifier assigned to a stable DesignOS baseline.
- **Git Commit:** immutable source snapshot identity.
- **Git Tag:** human-readable Git reference mapped to a Release commit.
- **Release:** promoted product baseline, created only by the Release process.

DOS-R003 Spec revisions never control DesignOS product-version numbering.

## 3. Product Version Format

DesignOS uses **Option B: semantic core plus descriptive suffix**:

`DesignOS vMAJOR.MINOR.PATCH-label`

The numeric core follows the project’s pre-1.0 compatibility rules. The suffix is lowercase kebab-case descriptive metadata for the stable capability set; it is not a runtime state and does not establish semantic precedence. Existing `foundation` is therefore a descriptive project/capability label, not a separately defined release channel.

## 4. Major Rule

`MAJOR` remains `0` until the defined 1.0 maturity milestone: the DesignOS Base MUST requirements and required stable lifecycle foundation are complete and the project explicitly authorizes the 1.0 transition. A breaking architectural or compatibility change before that milestone does not raise MAJOR; it is recorded as a pre-1.0 breaking change and increments MINOR under the pre-1.0 rule.

## 5. Minor Rule

Increment MINOR when an increment adds a new stable, backward-compatible product capability or completes a meaningful stable foundation capability. This includes new domain, persistence, lifecycle or approved integration capability. Reset PATCH to `0`.

## 6. Patch Rule

Increment PATCH for a stable, non-breaking correction that adds no new stable product capability: bug fixes, maintenance and documentation/governance corrections when a product baseline must be republished. PATCH does not reset or change the suffix unless the released capability label changes.

## 7. Suffix Policy

Suffixes are required for pre-1.0 stable baselines when they clarify the capability label. They must be lowercase kebab-case, short and descriptive. The suffix is display metadata only; it is not a runtime status, does not replace STABLE/RELEASED lifecycle states and does not affect semantic precedence. `foundation` is preserved as the existing descriptive label.

## 8. Git Tag Mapping

Transform the canonical product version by:

1. remove the display prefix `DesignOS `;
2. lowercase the remaining identifier;
3. prepend `designos-`.

Example: `DesignOS v0.1.0-foundation` → `designos-v0.1.0-foundation`.

## 9. Increment Classification

- **FOUNDATION / ENABLEMENT:** new stable, backward-compatible capability; MINOR increment.
- **FEATURE:** new stable capability; MINOR increment.
- **MAINTENANCE / FIX:** no new stable capability; PATCH increment.
- **BREAKING ARCHITECTURAL RELEASE:** MAJOR at/after the 1.0 maturity milestone; before 1.0 use the explicit pre-1.0 MINOR rule.
- **RELEASE-ONLY:** no product-version increment unless the Release process includes a separately classified product change.

An increment ID does not mechanically determine a version number; its approved change classification does.

## 10. Stable vs Released

`STABLE` means the increment has passed its Stable Gate and has a recorded stable version. `RELEASED` means a Release has subsequently been created and published through the Release process. Stable promotion does not itself create a Git tag or Release.

## 11. Existing v0.1.0-foundation Compatibility

The existing released identity remains immutable:

- Product version: `DesignOS v0.1.0-foundation`.
- Git tag: `designos-v0.1.0-foundation`.
- Increment: DOS-INC-001.

No renaming or replacement is permitted.

## 12. DOS-INC-002 Derivation

DOS-INC-002 adds a stable Spec revision model, durable Spec History, SQLite Spec persistence and migration `002-spec.sql`; it moves DOS-R003 from PARTIAL to FULL, is backward-compatible, introduces no external adapter, UI, breaking change or package.

- Previous version: `DesignOS v0.1.0-foundation`.
- Classification: FOUNDATION / ENABLEMENT; also a backward-compatible FEATURE.
- Rule: stable new capability → MINOR increment; PATCH resets to 0.
- Numeric result: `0.2.0`.
- Suffix decision: `spec-foundation`, lowercase kebab-case capability label.
- Final product version: **`DesignOS v0.2.0-spec-foundation`**.
- Expected Git tag: **`designos-v0.2.0-spec-foundation`**.

## 13. Future Examples

- Non-breaking bug fix after INC-002: `v0.2.1-spec-foundation`.
- New stable Issue/Fix capability: `v0.3.0-issue-fix`.
- Breaking architecture change before 1.0: next pre-1.0 MINOR, for example `v0.4.0-architecture`; explicitly recorded as breaking.
- Explicit 1.0 maturity milestone: `v1.0.0` with no suffix unless a future policy decision retains one.

## 14. Governance Rules

Every Stable Promotion must record predecessor, classification, numeric derivation, suffix decision, product version and expected Git tag. Collision checks are mandatory before tag/Release operations. Product version records do not implement runtime Version Management, Release Management or GitAdapter behavior. A policy change requires a new approved governance document/version before applying it.
