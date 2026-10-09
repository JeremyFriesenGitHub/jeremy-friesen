# Security Policy

## Supported versions

Only the `main` branch, as deployed to [jeremy-friesen.com](https://jeremy-friesen.com), is supported.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Use GitHub's private vulnerability reporting instead:
**Security → Report a vulnerability** on this repository
(<https://github.com/JeremyFriesenGitHub/jeremy-friesen/security/advisories/new>).

Include what you found, how to reproduce it and, if you can, the impact. You can
expect an acknowledgement within a week.

## Dependencies

Dependabot security updates are enabled for this repository, and
`.github/dependabot.yml` schedules grouped version updates. CI runs an advisory
`npm audit --omit=dev --audit-level=high` on every build; it reports production
advisories in the job log but does not block merges on its own. Development-only
tooling that has no patched release upstream may show up in a full `npm audit`;
those packages never ship to the browser.
