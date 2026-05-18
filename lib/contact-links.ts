export function getPhoneHref(phone: string) {
  return `tel:${phone.replaceAll(" ", "")}`;
}

export function getWhatsAppHref(phone?: string | null, message?: string) {
  const normalized = (phone ?? process.env.NEXT_PUBLIC_COMPANY_WHATSAPP ?? "")
    .replaceAll(" ", "")
    .replaceAll("+", "");
  const text = encodeURIComponent(
    message ?? "Merhaba, hafriyat işi için teklif almak istiyorum."
  );

  return normalized ? `https://wa.me/${normalized}?text=${text}` : "/iletisim";
}
