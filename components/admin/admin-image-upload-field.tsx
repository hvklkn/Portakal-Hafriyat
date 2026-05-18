"use client";

import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const maxUploadSize = 5 * 1024 * 1024;

export function AdminImageUploadField({
  label,
  value,
  onChange,
  error,
  hint,
  placeholder = "/images/hero-excavation.png"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFile(file: File) {
    setUploadError(null);

    if (!file.type.startsWith("image/")) {
      setUploadError("Sadece gorsel dosyalari yuklenebilir.");
      return;
    }

    if (file.size > maxUploadSize) {
      setUploadError("Gorsel dosyasi en fazla 5MB olabilir.");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      const data = (await response.json().catch(() => null)) as {
        secure_url?: string;
        url?: string;
        message?: string;
      } | null;
      const uploadedUrl = data?.secure_url ?? data?.url;

      if (!response.ok || !uploadedUrl) {
        setUploadError(
          data?.message ??
            "Gorsel yuklenemedi. Manuel URL girerek devam edebilirsiniz."
        );
        return;
      }

      onChange(uploadedUrl);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setUploadError(
        "Gorsel yuklenemedi. Baglantiyi kontrol edin veya manuel URL girin."
      );
    } finally {
      setIsUploading(false);
    }
  }

  function handleManualChange(nextValue: string) {
    setUploadError(null);
    onChange(nextValue);
  }

  return (
    <div className="grid gap-3">
      <Label>{label}</Label>

      {value ? (
        <div className="overflow-hidden rounded-lg border border-border bg-muted">
          <div
            className="aspect-[16/9] bg-cover bg-center"
            style={{ backgroundImage: `url("${escapeCssUrl(value)}")` }}
            aria-label={`${label} onizleme`}
            role="img"
          />
          <div className="flex flex-col gap-3 border-t border-border bg-background p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="break-all text-xs font-medium text-muted-foreground">
              {value}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => handleManualChange("")}
            >
              <Trash2 />
              Temizle
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid min-h-40 place-items-center rounded-lg border border-dashed border-border bg-muted/45 p-6 text-center">
          <div>
            <span className="mx-auto grid size-11 place-items-center rounded-md bg-graphite-950 text-primary">
              <ImagePlus className="size-5" />
            </span>
            <p className="mt-3 text-sm font-bold">Gorsel secilmedi</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Dosya yukleyin veya asagidan URL girin.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <Input
          value={value}
          placeholder={placeholder}
          disabled={isUploading}
          onChange={(event) => handleManualChange(event.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? <Loader2 className="animate-spin" /> : <Upload />}
          {isUploading ? "Yukleniyor..." : "Dosya Sec"}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            void uploadFile(file);
          }
        }}
      />

      {hint && !error && !uploadError ? (
        <p className="text-xs leading-5 text-muted-foreground">{hint}</p>
      ) : null}
      {uploadError ? (
        <p className="text-sm font-medium text-destructive">{uploadError}</p>
      ) : null}
      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  );
}

function escapeCssUrl(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}
