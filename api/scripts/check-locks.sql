-- Aktif Prisma bağlantılarını ve lock'ları kontrol et
-- Bu sorguyu pgAdmin'de veya psql'de çalıştırın

-- 1. Prisma ile ilgili aktif bağlantıları göster
SELECT 
    pid,
    usename,
    application_name,
    client_addr,
    state,
    query_start,
    state_change,
    LEFT(query, 100) as query_preview
FROM pg_stat_activity 
WHERE (
    application_name LIKE '%prisma%' 
    OR query LIKE '%pg_advisory_lock%'
    OR query LIKE '%migrate%'
)
AND pid != pg_backend_pid()
ORDER BY query_start;

-- 2. Aktif advisory lock'ları göster
SELECT 
    locktype,
    database,
    classid,
    objid,
    objsubid,
    pid,
    mode,
    granted
FROM pg_locks 
WHERE locktype = 'advisory'
ORDER BY pid;

