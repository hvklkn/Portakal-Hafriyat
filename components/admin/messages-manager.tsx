"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Trash2
} from "lucide-react";

import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModal } from "@/components/admin/admin-modal";
import { AdminReadStatusBadge } from "@/components/admin/admin-status-badge";
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
import type { AdminMessageItem } from "@/lib/admin-messages";
import { getPhoneHref, getWhatsAppHref } from "@/lib/contact-links";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short"
});

export function MessagesManager({ messages }: { messages: AdminMessageItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [readFilter, setReadFilter] = useState("ALL");
  const [selectedMessage, setSelectedMessage] =
    useState<AdminMessageItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminMessageItem | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const filteredMessages = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");

    return messages.filter((message) => {
      const matchesReadFilter =
        readFilter === "ALL" ||
        (readFilter === "UNREAD" && !message.isRead) ||
        (readFilter === "READ" && message.isRead);
      const searchable = [
        message.fullName,
        message.phone ?? "",
        message.email,
        message.subject ?? "",
        message.message
      ]
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      return (
        matchesReadFilter &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [messages, query, readFilter]);

  async function toggleRead(message: AdminMessageItem) {
    setNotice(null);
    setPendingId(message.id);

    const response = await fetch(`/api/admin/messages/${message.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !message.isRead })
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPendingId(null);

    if (!response.ok) {
      setNotice({
        type: "error",
        message: data?.message ?? "Mesaj durumu guncellenemedi."
      });
      return;
    }

    setNotice({
      type: "success",
      message: data?.message ?? "Mesaj durumu guncellendi."
    });
    router.refresh();
  }

  async function deleteMessage() {
    if (!deleteTarget) {
      return;
    }

    setNotice(null);
    setPendingId(deleteTarget.id);

    const response = await fetch(`/api/admin/messages/${deleteTarget.id}`, {
      method: "DELETE"
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
    } | null;

    setPendingId(null);

    if (!response.ok) {
      setNotice({
        type: "error",
        message: data?.message ?? "Mesaj silinemedi."
      });
      return;
    }

    setDeleteTarget(null);
    setNotice({
      type: "success",
      message: data?.message ?? "Mesaj basariyla silindi."
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

      <div className="grid gap-3 rounded-lg border border-border bg-background p-4 shadow-line lg:grid-cols-[1fr_220px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Ad, telefon, e-posta veya konu ara"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <select
          className="focus-ring h-11 rounded-md border border-input bg-background px-3 text-sm shadow-sm"
          value={readFilter}
          onChange={(event) => setReadFilter(event.target.value)}
        >
          <option value="ALL">Tümü</option>
          <option value="UNREAD">Okunmamış</option>
          <option value="READ">Okunmuş</option>
        </select>
      </div>

      {filteredMessages.length > 0 ? (
        <AdminTable>
          <AdminTableHead>
            <tr>
              <AdminTableHeader>Gönderen</AdminTableHeader>
              <AdminTableHeader>Telefon</AdminTableHeader>
              <AdminTableHeader>Konu</AdminTableHeader>
              <AdminTableHeader>Mesaj özeti</AdminTableHeader>
              <AdminTableHeader>Durum</AdminTableHeader>
              <AdminTableHeader>Tarih</AdminTableHeader>
              <AdminTableHeader>Aksiyonlar</AdminTableHeader>
            </tr>
          </AdminTableHead>
          <tbody>
            {filteredMessages.map((message) => (
              <AdminTableRow key={message.id}>
                <AdminTableCell className="font-black">
                  <span className={!message.isRead ? "text-signal-800" : ""}>
                    {message.fullName}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-muted-foreground">
                    {message.email}
                  </span>
                </AdminTableCell>
                <AdminTableCell>{message.phone ?? "-"}</AdminTableCell>
                <AdminTableCell>{message.subject ?? "-"}</AdminTableCell>
                <AdminTableCell className="max-w-72 text-muted-foreground">
                  {summarize(message.message)}
                </AdminTableCell>
                <AdminTableCell>
                  <AdminReadStatusBadge isRead={message.isRead} />
                </AdminTableCell>
                <AdminTableCell className="whitespace-nowrap text-muted-foreground">
                  {dateFormatter.format(message.createdAt)}
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMessage(message)}
                    >
                      <Eye />
                      Detay
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={pendingId === message.id}
                      onClick={() => toggleRead(message)}
                    >
                      {pendingId === message.id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Mail />
                      )}
                      {message.isRead ? "Okunmadı yap" : "Okundu yap"}
                    </Button>
                    {message.phone ? (
                      <>
                        <Button asChild variant="outline" size="sm">
                          <a href={getPhoneHref(message.phone)}>
                            <Phone />
                            Ara
                          </a>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={getWhatsAppHref(
                              message.phone,
                              `Merhaba ${message.fullName}, mesajiniz icin yaziyorum.`
                            )}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MessageCircle />
                            WhatsApp
                          </a>
                        </Button>
                      </>
                    ) : null}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:border-destructive/30 hover:bg-destructive/10"
                      onClick={() => setDeleteTarget(message)}
                    >
                      <Trash2 />
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
          title="Mesaj bulunamadi"
          description="Filtreleri degistirerek tekrar deneyin veya yeni mesajlar geldiginde burada goruntuleyin."
        />
      )}

      <AdminModal
        isOpen={Boolean(selectedMessage)}
        title="Mesaj Detayı"
        onClose={() => setSelectedMessage(null)}
      >
        {selectedMessage ? (
          <div className="grid gap-4 text-sm">
            <Detail label="Gönderen" value={selectedMessage.fullName} />
            <Detail label="E-posta" value={selectedMessage.email} />
            <Detail label="Telefon" value={selectedMessage.phone ?? "-"} />
            <Detail label="Konu" value={selectedMessage.subject ?? "-"} />
            <Detail label="Mesaj" value={selectedMessage.message} />
            <Detail
              label="Tarih"
              value={dateFormatter.format(selectedMessage.createdAt)}
            />
          </div>
        ) : null}
      </AdminModal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Mesajı silmek istiyor musunuz?"
        description={`${deleteTarget?.fullName ?? "Bu mesaj"} kalici olarak silinecek.`}
        confirmLabel="Sil"
        isPending={Boolean(deleteTarget && pendingId === deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteMessage}
      />
    </div>
  );
}

function summarize(value: string) {
  return value.length > 90 ? `${value.slice(0, 87).trim()}...` : value;
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
