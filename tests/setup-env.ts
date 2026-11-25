// Tests always run against the dedicated test database, never the development one.
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL ?? "postgres://postgres@localhost:5432/agencyos_test";
// Separate Redis DB so a running development worker never consumes test jobs.
process.env.REDIS_URL = process.env.TEST_REDIS_URL ?? "redis://localhost:6379/1";
process.env.APP_ENCRYPTION_KEY = "test-key-0123456789abcdef0123456789abcdef";
process.env.ALLOW_MOCK_MODE = "true";
process.env.AUTH_PROVIDER = "local";
