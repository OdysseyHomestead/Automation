# Schema Changelog

## 2024-05-07

- Initial `tasks` collection created with fields:
  - `title` (text, required)
  - `status` (select: "open" | "in_progress" | "done", default "open")
  - `dueAt` (date, optional)
  - `user` (relation to `users`, required)
  - `meta` (JSON, optional)
  - `created`/`updated` (automatic)
