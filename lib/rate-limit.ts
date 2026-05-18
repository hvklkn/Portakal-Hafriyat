import "server-only";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  retryAfter: number;
  resetAt: Date;
};

const buckets = new Map<string, RateLimitBucket>();
let lastCleanupAt = 0;

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cloudflareIp = request.headers.get("cf-connecting-ip");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    realIp?.trim() ||
    cloudflareIp?.trim() ||
    "unknown"
  );
}

export function createRateLimitKey(request: Request, scope: string) {
  return `${scope}:${getClientIp(request)}`;
}

export function checkRateLimit({
  key,
  limit,
  windowMs
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  cleanupExpiredBuckets(now);
  const existingBucket = buckets.get(key);
  const bucket =
    existingBucket && existingBucket.resetAt > now
      ? existingBucket
      : { count: 0, resetAt: now + windowMs };

  buckets.set(key, bucket);

  const remaining = Math.max(limit - bucket.count, 0);

  return {
    success: bucket.count < limit,
    limit,
    remaining,
    retryAfter: Math.max(Math.ceil((bucket.resetAt - now) / 1000), 0),
    resetAt: new Date(bucket.resetAt)
  };
}

export function consumeRateLimit(
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  cleanupExpiredBuckets(now);
  const existingBucket = buckets.get(options.key);
  const bucket =
    existingBucket && existingBucket.resetAt > now
      ? existingBucket
      : { count: 0, resetAt: now + options.windowMs };

  bucket.count += 1;
  buckets.set(options.key, bucket);

  const remaining = Math.max(options.limit - bucket.count, 0);

  return {
    success: bucket.count <= options.limit,
    limit: options.limit,
    remaining,
    retryAfter: Math.max(Math.ceil((bucket.resetAt - now) / 1000), 0),
    resetAt: new Date(bucket.resetAt)
  };
}

export function clearRateLimit(key: string) {
  buckets.delete(key);
}

function cleanupExpiredBuckets(now: number) {
  if (now - lastCleanupAt < 60 * 1000) {
    return;
  }

  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }

  lastCleanupAt = now;
}
