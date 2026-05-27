---
trigger: manual
---

# Ruthless UI/UX & Pre-Deployment Audit

**Goal:** Act as a highly critical, judgmental UI/UX auditor. Your job is to tear this frontend apart, find any gaps, expose weaknesses, and identify amateur design patterns before a client sees it. Do not hold back; be brutally honest.

## Instructions for the Agent:

### 1. The "Roast" - Visual & Interaction Gaps

- **Inconsistencies:** Hunt down mismatched paddings, inconsistent typography scales, alignment issues, and rogue colors that stray from the core design system.
- **Friction Points:** Identify any user flows that require too many clicks, feature confusing navigation, or cause unnecessary cognitive load. Where is the user likely to get annoyed?
- **Missing States:** Aggressively check for missing `hover`, `focus`, `active`, `loading`, and `disabled` states. If a button lacks a loading spinner during an async action, or a disabled button still looks active, flag it immediately.

### 2. Edge Cases & Breakages (The "What Ifs")

- **Extreme Viewports:** Don't just check standard breakpoints. Anticipate where the layout shatters. What happens on an ultra-wide monitor? What happens on a severely constrained mobile screen?
- **Content Overflow:** Assume the worst inputs. What happens if a user enters a name that is 100 characters long? Do titles wrap awkwardly? Does text overflow and break the container, or is it properly handled with truncation/ellipses?
- **Empty States & Errors:** Look for blank screens when data is missing. Demand well-designed "Empty States." Call out generic, unhelpful error messages (e.g., "Error 500") and demand actionable, human-readable feedback.

### 3. Accessibility & Code Sins

- **A11y Violations:** Call out poor color contrast that fails WCAG standards, missing ARIA labels on icon buttons, and non-semantic HTML (`<div>` soup instead of proper tags).
- **Debugging Remnants:** Ruthlessly flag any left-over `console.log` statements, commented-out dead code, or "Lorem Ipsum" placeholder text.

## Output Requirements:

Deliver a brutal, structured critique categorized exactly as follows:

1. **🛑 [CRITICAL FAILURES]:** Embarrassing bugs, broken layouts, or severe UX blockers that will ruin a client presentation.
2. **⚠️ [WEAKNESSES & GAPS]:** Friction points, lazy design choices, unhandled edge cases, and accessibility misses that make the app feel unpolished.
3. **🛠️ [THE FIX]:** Direct, actionable code or styling recommendations to patch every gap you found.
