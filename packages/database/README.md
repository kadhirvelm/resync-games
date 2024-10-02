## Migrating

1. Make changes to the prisma file
2. `yarn db:create-migration` to generate the migration files
3. `yarn db:migrate` to apply the migration
4. `yarn db:generate` to update the local client