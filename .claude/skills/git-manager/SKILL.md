---
name: git-manager
description: |
  Git操作とGitHub PR管理のワークフロースキル。コミット作成、ブランチ管理、PR作成を支援。
  使用タイミング: (1) コミット作成時 (2) ブランチ作成・切り替え時 (3) PR作成時 (4) git操作全般
  トリガー例: 「コミットして」「PRを作成して」「ブランチを作って」「変更をプッシュして」
---

# Git Manager

## コミット作成

### Conventional Commits形式

```
<type>(<scope>): <subject>

<body>

<footer>
```

**type一覧:**
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみ
- `style`: フォーマット変更（コード動作に影響なし）
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テスト追加・修正
- `chore`: ビルド・補助ツール変更

**例:**
```
feat(auth): add JWT token refresh

- Add automatic token refresh before expiration
- Store refresh token in secure cookie

Closes #123
```

### コミット手順

1. `git status` で変更確認
2. `git diff` で差分確認
3. `git add <files>` で必要なファイルをステージング
4. `git commit -m "<message>"` でコミット

**注意:**
- `.env`や認証情報を含むファイルはコミットしない
- 大きな変更は論理的な単位で分割

## ブランチ管理

### 命名規則

```
<type>/<description>
```

**type:**
- `feature/` - 新機能
- `fix/` - バグ修正
- `hotfix/` - 緊急修正

**例:**
- `feature/add-user-auth`
- `fix/login-validation`
- `hotfix/security-patch`

### ブランチ操作

```bash
# 作成と切り替え
git checkout -b feature/xxx

# 切り替え
git checkout feature/xxx

# 削除（マージ済み）
git branch -d feature/xxx

# リモートにプッシュ
git push -u origin feature/xxx
```

## PR作成

### 手順

1. 変更をリモートにプッシュ
2. `gh pr create` でPR作成

### PR作成コマンド

```bash
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
<変更の概要を箇条書き>

## Test plan
- [ ] テスト項目1
- [ ] テスト項目2
EOF
)"
```

### PRタイトル

- 70文字以内
- Conventional Commits形式推奨
- 例: `feat(auth): add password reset flow`

## よく使うコマンド

```bash
# 状態確認
git status
git log --oneline -10

# 差分確認
git diff
git diff --staged

# リモート同期
git fetch origin
git pull origin main

# 変更取り消し
git restore <file>          # 作業ディレクトリの変更を取り消し
git restore --staged <file> # ステージングを取り消し
```
