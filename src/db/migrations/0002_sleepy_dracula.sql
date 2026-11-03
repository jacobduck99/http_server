ALTER TABLE "users" ALTER COLUMN "hashed_password" SET DEFAULT 'unset';--> statement-breakpoint
UPDATE "users" SET "hashed_password" = 'unset' WHERE "hashed_password" IS NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "hashed_password" SET NOT NULL;
