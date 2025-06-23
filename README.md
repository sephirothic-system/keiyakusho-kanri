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

### 6. テスト環境の確認

```bash
# 単体テストの実行
npm run test

# E2Eテスト用ブラウザのインストール（初回のみ）
npx playwright install

# コードフォーマット
npm run format
```

### 7. 開発サーバーの起動

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

### テスト関連

- `npm run test` - 単体テストの実行
- `npm run test:watch` - 単体テストの監視モード
- `npm run test:coverage` - カバレッジ付きでテスト実行
- `npm run test:ui` - Vitestの UIモード
- `npm run test:e2e` - E2Eテストの実行
- `npm run test:e2e:ui` - E2EテストのUIモード
- `npm run test:e2e:headed` - ブラウザを表示してE2Eテスト実行

### コード品質

- `npm run lint` - ESLintの実行
- `npm run format` - Prettierでコードフォーマット
- `npm run format:check` - フォーマットチェック
- `npm run type-check` - TypeScriptの型チェック

### 開発

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバーの起動

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

#### Category（カテゴリ）

- id: カテゴリID
- name: カテゴリ名
- color: カテゴリの色

#### ContractVersion（契約書バージョン）

- id: バージョンID
- version: バージョン番号
- content: その時点のコンテンツ
- changeNote: 変更メモ

## 開発時の注意事項

1. `.env`ファイルは`.gitignore`に含まれているため、各環境で個別に作成してください
2. データベースの変更時は`npm run db:migrate`を実行してください
3. Prisma Studioで`npm run db:studio`を実行すると、ブラウザでデータベースの内容を確認できます
4. コミット前に`npm run test`と`npm run lint`を実行してください
5. Huskyによって、コミット時に自動的にlint-stagedが実行されます
6. E2Eテストを実行する前に、開発サーバーが起動していることを確認してください

## テスト戦略

### 単体テスト（Vitest）

- ユーティリティ関数
- カスタムフック
- ビジネスロジック
- コンポーネントの単体テスト

### E2Eテスト（Playwright）

- ユーザーフローのテスト
- 画面遷移のテスト
- フォーム送信のテスト
- APIとの統合テスト

### CI/CD

- GitHub Actionsで自動テスト実行
- プルリクエスト時のテスト実行
- メインブランチへのマージ時のテスト実行

## トラブルシューティング

### データベース接続エラー

1. PostgreSQLが起動しているか確認：`docker-compose ps`
2. 環境変数が正しく設定されているか確認
3. データベース名・ユーザー名・パスワードが正しいか確認

### マイグレーションエラー

1. 既存のマイグレーションファイルを削除：`rm -rf prisma/migrations`
2. データベースをリセット：`npm run db:reset`
3. 新しいマイグレーションを作成：`npm run db:migrate`
