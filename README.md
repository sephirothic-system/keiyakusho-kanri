# 契約書管理サービス

markdownのリッチテキストエディターで契約書を記述し、適切に管理できるサービスです。

## 技術スタック

- **Frontend**: Next.js + React + TypeScript
- **Backend**: Next.js API Routes  
- **Database**: PostgreSQL
- **ORM**: Prisma
- **UI**: shadcn/ui + Tailwind CSS

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env`ファイルを作成し、以下の内容を追加してください：

```env
# Database
DATABASE_URL="postgresql://keiyakusho:password123@localhost:5432/keiyakusho_db?schema=public"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 3. PostgreSQLの起動

Docker Composeを使用してPostgreSQLを起動します：

```bash
docker-compose up -d
```

### 4. データベースマイグレーション

```bash
# 初回のマイグレーション
npm run db:migrate

# Prisma Clientの生成
npm run db:generate
```

### 5. 初期データの投入

```bash
npm run db:seed
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

## 利用可能なスクリプト

### データベース関連
- `npm run db:generate` - Prisma Clientの生成
- `npm run db:migrate` - マイグレーションの実行
- `npm run db:push` - スキーマをデータベースにプッシュ
- `npm run db:studio` - Prisma Studioの起動（データベースの可視化）
- `npm run db:seed` - 初期データの投入
- `npm run db:reset` - データベースのリセット

### 開発
- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - ESLintの実行

## データベーススキーマ

### 主要なモデル

#### User（ユーザー）
- id: ユーザーID
- email: メールアドレス
- name: 名前

#### Contract（契約書）
- id: 契約書ID
- title: タイトル
- content: Markdownコンテンツ
- status: ステータス（DRAFT, REVIEW, ACTIVE, EXPIRED, TERMINATED）
- contractNumber: 契約書番号
- startDate: 開始日
- endDate: 終了日
- category: カテゴリ
- versions: バージョン履歴
- attachments: 添付ファイル

#### Category（カテゴリ）
- id: カテゴリID
- name: カテゴリ名
- color: カテゴリの色

#### ContractVersion（契約書バージョン）
- id: バージョンID
- version: バージョン番号
- content: その時点のコンテンツ
- changeNote: 変更メモ

#### Attachment（添付ファイル）
- id: ファイルID
- filename: ファイル名
- originalName: 元のファイル名
- mimeType: MIMEタイプ
- size: ファイルサイズ
- path: ファイルパス

## 開発時の注意事項

1. `.env`ファイルは`.gitignore`に含まれているため、各環境で個別に作成してください
2. データベースの変更時は`npm run db:migrate`を実行してください
3. Prisma Studioで`npm run db:studio`を実行すると、ブラウザでデータベースの内容を確認できます

## トラブルシューティング

### データベース接続エラー
1. PostgreSQLが起動しているか確認：`docker-compose ps`
2. 環境変数が正しく設定されているか確認
3. データベース名・ユーザー名・パスワードが正しいか確認

### マイグレーションエラー
1. 既存のマイグレーションファイルを削除：`rm -rf prisma/migrations`
2. データベースをリセット：`npm run db:reset`
3. 新しいマイグレーションを作成：`npm run db:migrate`
