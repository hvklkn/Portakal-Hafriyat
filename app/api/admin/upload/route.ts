import { NextResponse } from "next/server";

import { hasAdminSession } from "@/lib/admin-session";
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary
} from "@/lib/cloudinary";
import {
  consumeRateLimit,
  createRateLimitKey
} from "@/lib/rate-limit";

export const runtime = "nodejs";

const maxUploadSize = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const isAuthorized = await hasAdminSession();

  if (!isAuthorized) {
    return NextResponse.json(
      { message: "Bu islem icin admin oturumu gerekli." },
      { status: 401 }
    );
  }

  const rateLimit = consumeRateLimit({
    key: createRateLimitKey(request, "admin-upload"),
    limit: 20,
    windowMs: 10 * 60 * 1000
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        message:
          "Çok kısa sürede fazla görsel yükleme denendi. Lütfen birkaç dakika sonra tekrar deneyin."
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) }
      }
    );
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { message: "Gorsel yukleme yapilandirilmamis. Cloudinary env degerlerini ekleyin." },
      { status: 503 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "Yuklenecek gorsel bulunamadi." },
      { status: 422 }
    );
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { message: "Sadece gorsel dosyalari yuklenebilir." },
      { status: 422 }
    );
  }

  if (file.size > maxUploadSize) {
    return NextResponse.json(
      { message: "Gorsel dosyasi en fazla 5MB olabilir." },
      { status: 413 }
    );
  }

  try {
    const uploadedImage = await uploadImageToCloudinary(file);

    return NextResponse.json({
      secure_url: uploadedImage.secureUrl,
      url: uploadedImage.secureUrl,
      publicId: uploadedImage.publicId
    });
  } catch {
    return NextResponse.json(
      { message: "Gorsel yuklenemedi. Lutfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
