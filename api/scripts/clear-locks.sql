-- ⚠️ DİKKAT: Bu sorgu aktif Prisma bağlantılarını sonlandırır!
-- Sadece gerçekten gerektiğinde kullanın.
-- Önce check-locks.sql ile kontrol edin.

-- 1. Prisma bağlantılarını sonlandır
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity 
WHERE (
    application_name LIKE '%prisma%' 
    OR query LIKE '%pg_advisory_lock%'
    OR query LIKE '%migrate%'
)
AND pid != pg_backend_pid();

-- 2. Tüm advisory lock'ları temizle (güvenli değil, ama bazen gerekli)
-- SELECT pg_advisory_unlock_all(); -- Dikkatli kullanın!

