"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Loader2,
  MessageCircle,
  Phone,
  Search,
  Trash2
} from "lucide-react";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModal } from "@/components/admin/admin-modal";
import { AdminQuoteStatusBadge } from "@/components/admin/admin-status-badge";
import {
  AdminTable,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeader,
  AdminTableRow
} from "@/components/admin/admin-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AdminQuoteItem } from "@/lib/admin-quotes";
import { quoteStatuses, type QuoteStatusValue } from "@/lib/admin-quote-message-schema";
import { getPhoneHref, getWhatsAppHref } from "@/lib/contact-links";

const statusLabels: Record<QuoteStatusValue, string> = {
  NEW: "Yeni",
  CONTACTED: "Görüşüldü",
  PRICED: "Fiyat Verildi",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal"
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short"
});

export function QuoteRequestsManager({
  quotes,
  serviceTypes
}: {
  quotes: AdminQuoteItem[];
  serviceTypes: string[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [selectedQuote, setSelectedQuote] = useState<AdminQuoteItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminQuoteItem | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const filteredQuotes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

    return quotes.filter((quote) => {
      const matchesStatus =
        statusFilter === "ALL" || quote.status === statusFilter;
      const matchesService =
        serviceFilter === "ALL" || quote.serviceType === serviceFilter;
      const searchable = [
        quote.fullName,
        quote.phone,
        quote.city,
        quote.district,
        quote.serviceType
      ]
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      return (
        matchesStatus &&
        matchesService &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [query, quotes, serviceFilter, statusFilter]);

  async function updateStatus(id: string, status: QuoteStatusValue) {
    setNotice(null);
    setPendingId(id);

    const response = await fetch(`/api/admin/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPendingId(null);

    if (!response.ok) {
      setNotice({
        type: "error",
        message: data?.message ?? "Talep durumu guncellenemedi."
      });
      return;
    }

    setNotice({
      type: "success",
      message: data?.message ?? "Talep durumu guncellendi."
    });
    router.refresh();
  }

  async function deleteQuote() {
    if (!deleteTarget) {
      return;
    }

    setNotice(null);
    setPendingId(deleteTarget.id);

    const response = await fetch(`/api/admin/quotes/${deleteTarget.id}`, {
      method: "DELETE"
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPendingId(null);

    if (!response.ok) {
      setNotice({
        type: "error",
        message: data?.message ?? "Talep silinemedi."
      });
      return;
    }

    setDeleteTarget(null);
    setNotice({
      type: "success",
      message: data?.message ?? "Talep basariyla silindi."
    });
    router.refresh();
  }

  return (
    <div className="grid gap-5">
      {notice ? (
        <p
          className={
            notice.type === "success"
              ? "rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800"
              : "rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive"
          }
        >
          {notice.message}
        </p>
      ) : null}

      <div className="grid gap-3 rounded-lg border border-border bg-background p-4 shadow-line lg:grid-cols-[1fr_220px_220px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Ad, telefon, şehir veya ilçe ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <select
          className="focus-ring h-11 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="ALL">Tüm durumlar</option>
          {quoteStatuses.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
        <select
          className="focus-ring h-11 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
          value={serviceFilter}
          onChange={(event) => setServiceFilter(event.target.value)}
        >
          <option value="ALL">Tüm hizmetler</option>
          {serviceTypes.map((serviceType) => (
            <option key={serviceType} value={serviceType}>
              {serviceType}
            </option>
          ))}
        </select>
      </div>

      {filteredQuotes.length > 0 ? (
        <AdminTable>
          <AdminTableHead>
            <tr>
              <AdminTableHeader>Müşteri</AdminTableHeader>
              <AdminTableHeader>Telefon</AdminTableHeader>
              <AdminTableHeader>Hizmet</AdminTableHeader>
              <AdminTableHeader>Konum</AdminTableHeader>
              <AdminTableHeader>Durum</AdminTableHeader>
              <AdminTableHeader>Tarih</AdminTableHeader>
              <AdminTableHeader>Aksiyonlar</AdminTableHeader>
            </tr>
          </AdminTableHead>
          <tbody>
            {filteredQuotes.map((quote) => (
              <AdminTableRow key={quote.id}>
                <AdminTableCell className="font-black">
                  <span className={quote.status === "NEW" ? "text-signal-800" : ""}>
                    {quote.fullName}
                  </span>
                </AdminTableCell>
                <AdminTableCell>{quote.phone}</AdminTableCell>
                <AdminTableCell>{quote.serviceType}</AdminTableCell>
                <AdminTableCell>
                  {[quote.city, quote.district].filter(Boolean).join(" / ")}
                </AdminTableCell>
                <AdminTableCell>
                  <AdminQuoteStatusBadge status={quote.status} />
                </AdminTableCell>
                <AdminTableCell className="whitespace-nowrap text-muted-foreground">
                  {dateFormatter.format(quote.createdAt)}
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedQuote(quote)}
                    >
                      <Eye />
                      Detay
                    </Button>
                    <select
                      className="focus-ring h-9 rounded-md border border-input bg-background px-2 text-xs font-bold shadow-sm"
                      value={quote.status}
                      disabled={pendingId === quote.id}
                      onChange={(event) =>
                        updateStatus(
                          quote.id,
                          event.target.value as QuoteStatusValue
                        )
                      }
                    >
                      {quoteStatuses.map((status) => (
                        <option key={status} value={status}>
                          {statusLabels[status]}
                        </option>
                      ))}
                    </select>
                    <Button asChild variant="outline" size="sm">
                      <a href={getPhoneHref(quote.phone)}>
                        <Phone />
                        Ara
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={getWhatsAppHref(
                          quote.phone,
                          `Merhaba ${quote.fullName}, hafriyat teklif talebiniz icin yaziyorum.`
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle />
                        WhatsApp
                      </a>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:border-destructive/30 hover:bg-destructive/10"
                      onClick={() => setDeleteTarget(quote)}
                    >
                      {pendingId === quote.id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Trash2 />
                      )}
                      Sil
                    </Button>
                  </div>
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </tbody>
        </AdminTable>
      ) : (
        <AdminEmptyState
          title="Teklif talebi bulunamadi"
          description="Filtreleri degistirerek tekrar deneyin veya yeni talepler geldiginde burada goruntuleyin."
        />
      )}

      <AdminModal
        isOpen={Boolean(selectedQuote)}
        title="Teklif Talebi Detayı"
        onClose={() => setSelectedQuote(null)}
      >
        {selectedQuote ? (
          <div className="grid gap-4 text-sm">
            <Detail label="Müşteri" value={selectedQuote.fullName} />
            <Detail label="Telefon" value={selectedQuote.phone} />
            <Detail label="Hizmet" value={selectedQuote.serviceType} />
            <Detail
              label="Konum"
              value={[selectedQuote.city, selectedQuote.district]
                .filter(Boolean)
                .join(" / ")}
            />
            <Detail label="Açıklama" value={selectedQuote.description} />
            {selectedQuote.imageUrl ? (
              <Detail label="Görsel URL" value={selectedQuote.imageUrl} />
            ) : null}
            <Detail
              label="Oluşturulma"
              value={dateFormatter.format(selectedQuote.createdAt)}
            />
          </div>
        ) : null}
      </AdminModal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Teklif talebini silmek istiyor musunuz?"
        description={`${deleteTarget?.fullName ?? "Bu talep"} kalici olarak silinecek.`}
        confirmLabel="Sil"
        isPending={Boolean(deleteTarget && pendingId === deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteQuote}
      />
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/35 p-3">
      <p className="text-xs font-black uppercase tracking-normal text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 whitespace-pre-wrap leading-6">{value}</p>
    </div>
  );
}
