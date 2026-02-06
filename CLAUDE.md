# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

**world-of-zono-v5** は、Next.js 16 の App Router アーキテクチャを使用した、React 19 と TypeScript によるアプリケーションです。

## コマンド

```bash
# 開発
npm run dev          # 開発サーバー起動 (http://localhost:3000)

# ビルド・本番
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動

# コード品質
npm run lint         # Biome リンター実行
npm run format       # Biome で自動フォーマット
```

## アーキテクチャ

### 技術スタック

- **フレームワーク:** Next.js 16 + App Router (`src/app/`)
- **React:** v19、React Compiler 有効（自動最適化）
- **スタイリング:** Tailwind CSS v4、ダークモード対応（CSS カスタムプロパティ）
- **リンター/フォーマッター:** Biome（ESLint/Prettier は使用しない）
- **CMS:** microCMS（MCP 経由で設定）

### ディレクトリ構成

- `src/app/` - Next.js App Router のページとレイアウト
- `src/components/` - 再利用可能なコンポーネント
- `src/lib/` - ユーティリティ関数
- `src/hooks/` - カスタムフック
- `public/` - 静的アセット

### 主要な設定

- **TypeScript:** Strict モード有効、パスエイリアス `@/*` → `./src/*`
- **React Compiler:** `next.config.ts` で有効化（コンポーネントの自動最適化）
- **Biome:** Next.js / React 推奨ルール、インデント 2 スペース

## コードスタイル

このプロジェクトは ESLint/Prettier ではなく Biome を使用しています。コミット前に `npm run format` を実行してください。Biome はリンターとフォーマッターを 1 つのツールで提供します。
