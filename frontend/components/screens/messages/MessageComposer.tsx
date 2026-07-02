"use client";

import type { FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";

type MessageComposerProps = {
  value: string;
  onChange: (next: string) => void;
  onSend: (body: string) => void;
};

/**
 * チャット入力欄（controlled）。textarea + 送信アイコン。
 * 「そっと」のトーンを保ちつつ動詞は素直に「送る」（CTA 規範 [[feedback-tomizawa-gravity-alignment]] 項 10a）。
 *
 * 親が value/onChange を持つので、AI 返信候補からの反映や下書きの復元が
 * Composer 外から制御できる。
 */
export function MessageComposer({ value, onChange, onSend }: MessageComposerProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    onChange("");
  };

  return (
    <form className="chat-composer" onSubmit={handleSubmit}>
      <textarea
        className="chat-composer__textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="そっと、ことばを 書く"
        rows={1}
        aria-label="メッセージを入力"
      />
      <button
        type="submit"
        className="chat-composer__send"
        disabled={!value.trim()}
        aria-label="送る"
      >
        <Icon name="send" size={20} />
      </button>
    </form>
  );
}
