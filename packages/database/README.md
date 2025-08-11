# Database

The prisma client for Postgres.

## Migrating

1. Make changes to the prisma file
2. `bun db:create-migration` to generate the migration files
3. `bun db:migrate` to apply the migration
4. `bun db:generate` to update the local client

## Future reference
If you're struggling to get prisma to connect to neon for migrations, it could be because of IPv6. We had to disable that on our EC2 to get it to resolve correctly.
