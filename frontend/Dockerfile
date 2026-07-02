# syntax=docker/dockerfile:1.7

# ---- deps stage --------------------------------------------------------
# pnpm の lockfile を使って依存だけ先にインストール（キャッシュ効かせる）。
FROM node:22-alpine AS deps
WORKDIR /app

# pnpm を corepack で有効化
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

COPY package.json pnpm-lock.yaml* ./
# pnpm 11 では native binding を含む依存（sharp 等）の build スクリプト実行が
# デフォルトでブロックされる。許可対象は package.json の pnpm.onlyBuiltDependencies で定義。
RUN pnpm install --frozen-lockfile

# ---- builder stage -----------------------------------------------------
# Next.js を standalone モードでビルド。
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js のテレメトリ無効化（ビルド時にネット叩かないように）
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# ---- runner stage ------------------------------------------------------
# 最終イメージ：standalone 出力だけを乗せる。
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Cloud Run は PORT 環境変数で待ち受けポートを渡してくる
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# 非 root ユーザーで動かす
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# standalone 出力（最小限の node_modules + サーバ起動 entry）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# public と .next/static は standalone に含まれないため別途コピー
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

# standalone の server.js を直接叩く（next start ではない）
CMD ["node", "server.js"]
