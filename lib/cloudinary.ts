import "server-only";

import { createHash } from "node:crypto";

type CloudinaryUploadResponse = {
  secure_url?: string;
  public_id?: string;
  error?: {
    message?: string;
  };
};

export type CloudinaryUploadResult = {
  secureUrl: string;
  publicId: string | null;
};

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return { cloudName, apiKey, apiSecret };
}

export function isCloudinaryConfigured() {
  return Boolean(getCloudinaryConfig());
}

export async function uploadImageToCloudinary(
  file: File
): Promise<CloudinaryUploadResult> {
  const config = getCloudinaryConfig();

  if (!config) {
    throw new Error("CLOUDINARY_NOT_CONFIGURED");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "portakal-hafriyat/admin";
  const signature = createCloudinarySignature(
    {
      folder,
      timestamp
    },
    config.apiSecret
  );
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", timestamp);
  formData.append("folder", folder);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData
    }
  );
  const data = (await response.json().catch(() => null)) as
    | CloudinaryUploadResponse
    | null;

  if (!response.ok || !data?.secure_url) {
    throw new Error(data?.error?.message ?? "CLOUDINARY_UPLOAD_FAILED");
  }

  return {
    secureUrl: data.secure_url,
    publicId: data.public_id ?? null
  };
}

function createCloudinarySignature(
  params: Record<string, string>,
  apiSecret: string
) {
  const payload = Object.entries(params)
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1")
    .update(`${payload}${apiSecret}`)
    .digest("hex");
}
