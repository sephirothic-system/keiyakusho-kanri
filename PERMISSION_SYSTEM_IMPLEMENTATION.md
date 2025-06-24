# 権限システム実装ガイド

## 概要

特定のグループに対して、特定のディレクトリが閲覧できるように権限を付与できる機能を実装しました。管理者のみがこの操作を行うことができ、権限がないユーザーは契約書を見たり編集できません。

## 実装された機能

### 1. 管理者権限システム
- ユーザーモデルに `isAdmin` フラグを追加
- 管理者のみが権限付与・削除操作を実行可能
- 管理者は全ての契約書・ディレクトリにアクセス可能

### 2. ディレクトリアクセス権限管理
- 管理者専用API: `/api/admin/directory-access`
- グループ単位でディレクトリへのアクセス権限を設定
- READ/WRITE の2段階の権限レベル

### 3. 契約書アクセス制御
- 契約書の閲覧・編集時に権限チェックを実施
- オーナー、グループアクセス権限、管理者権限の3層構造
- 権限がないユーザーには適切なエラーレスポンス

## セットアップ手順

### 1. データベースマイグレーション

```bash
# Prismaクライアントを再生成
npm run db:generate

# マイグレーションを実行
npm run db:migrate
```

### 2. 初期管理者の作成

データベースに直接アクセスして、既存ユーザーを管理者に設定：

```sql
UPDATE users SET "isAdmin" = true WHERE email = 'admin@example.com';
```

または、Prisma Studioを使用：

```bash
npm run db:studio
```

## API仕様

### GET /api/admin/directory-access
管理者専用 - 全てのディレクトリアクセス権限を取得

**レスポンス例:**
```json
{
  "directoryAccesses": [
    {
      "id": "cuid",
      "directoryId": "dir123",
      "groupId": "grp456",
      "permission": "READ",
      "directory": {
        "id": "dir123",
        "name": "法務契約書",
        "path": "root/legal"
      },
      "group": {
        "id": "grp456",
        "name": "法務部",
        "_count": {
          "userGroups": 5
        }
      }
    }
  ]
}
```

### POST /api/admin/directory-access
管理者専用 - ディレクトリアクセス権限の付与/更新

**リクエスト例:**
```json
{
  "directoryId": "dir123",
  "groupId": "grp456",
  "permission": "READ"  // または "WRITE"
}
```

**レスポンス例:**
```json
{
  "message": "権限を付与しました",
  "directoryAccess": {
    "directory": {
      "name": "法務契約書",
      "path": "root/legal"
    },
    "group": {
      "name": "法務部"
    }
  }
}
```

### DELETE /api/admin/directory-access
管理者専用 - ディレクトリアクセス権限の削除

**パラメータ:**
- `directoryId`: ディレクトリID
- `groupId`: グループID

**例:**
```
DELETE /api/admin/directory-access?directoryId=dir123&groupId=grp456
```

## 権限システムの動作

### 権限チェックの優先順位

1. **管理者権限** - 全てのリソースに無制限アクセス
2. **オーナー権限** - 自分が作成した契約書に無制限アクセス
3. **グループ権限** - 所属グループに付与された権限でアクセス
4. **アクセス拒否** - 上記に該当しない場合

### 権限レベル

- **READ**: 契約書の閲覧のみ可能
- **WRITE**: 契約書の閲覧・編集が可能
- **管理者**: 全ての操作が可能（削除も含む）

## ライブラリ関数

### 権限チェック関数

```typescript
import {
  isAdmin,
  requireAdminPermission,
  checkContractPermission,
  checkDirectoryPermission,
  grantDirectoryAccess,
  revokeDirectoryAccess,
  getAccessibleContracts,
  getAccessibleDirectories
} from '@/lib/contract-permissions'

// 管理者権限チェック
const adminStatus = await isAdmin(userId)

// 契約書アクセス権限チェック
const permission = await checkContractPermission(userId, contractId)
if (permission.canRead) {
  // 閲覧可能
}
if (permission.canWrite) {
  // 編集可能
}

// 権限付与（管理者のみ）
const result = await grantDirectoryAccess(
  adminUserId,
  directoryId,
  groupId,
  Permission.READ
)
```

## テストコード

包括的なテストスイートを実装：

### 単体テスト
- `test/lib/admin-permissions.test.ts` - 権限システムのロジックテスト
- 管理者権限チェック
- 権限付与・削除機能
- グループベースアクセス制御
- 統合シナリオテスト

### APIテスト  
- `test/api/admin/directory-access.test.ts` - 管理者API のテスト
- 正常系・異常系の網羅的テスト
- 認証・認可のテスト
- エラーハンドリングのテスト

### テスト実行

```bash
# 全テスト実行
npm run test

# 権限システムのテストのみ
npm run test -- admin-permissions
npm run test -- directory-access
```

## 使用例

### 基本的な権限付与フロー

1. **管理者ログイン**
2. **グループとディレクトリの準備**
3. **権限付与APIの呼び出し**
   ```javascript
   // 法務部に法務ディレクトリの読み取り権限を付与
   const response = await fetch('/api/admin/directory-access', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       directoryId: 'legal-directory-id',
       groupId: 'legal-group-id',
       permission: 'READ'
     })
   })
   ```

4. **ユーザーのアクセス確認**
   - 法務部に所属するユーザーが法務ディレクトリの契約書を閲覧可能になる

### 権限レベルの変更

```javascript
// READ権限からWRITE権限に更新
const response = await fetch('/api/admin/directory-access', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    directoryId: 'legal-directory-id',
    groupId: 'legal-group-id',  
    permission: 'WRITE'  // 更新される
  })
})
```

### 権限の削除

```javascript
// 権限を完全に削除
const response = await fetch(
  `/api/admin/directory-access?directoryId=${directoryId}&groupId=${groupId}`,
  { method: 'DELETE' }
)
```

## セキュリティ考慮事項

### 実装済みセキュリティ対策

1. **管理者権限の厳格チェック** - 全ての権限管理操作で管理者権限を検証
2. **セッション認証** - NextAuth によるセッション管理
3. **入力値検証** - APIリクエストの厳格なバリデーション
4. **権限の階層化** - 管理者 > オーナー > グループ の明確な権限構造
5. **エラー情報の適切な制御** - 不正アクセス時の情報漏洩防止

### 運用時の注意事項

1. **管理者アカウントの厳重管理** - 管理者権限は必要最小限のユーザーのみに付与
2. **権限付与の記録** - 権限変更は監査ログとして記録推奨
3. **定期的な権限レビュー** - 不要な権限の定期的な見直し
4. **グループ管理の適切性** - ユーザーのグループ所属を適切に管理

## トラブルシューティング

### よくある問題

1. **型エラー (isAdmin not found)**
   ```bash
   # Prismaクライアントの再生成が必要
   npm run db:generate
   ```

2. **権限付与が反映されない**
   - ユーザーが対象グループに所属しているか確認
   - キャッシュのクリア（必要に応じて）

3. **管理者権限が動作しない**
   - データベースの `isAdmin` フラグが正しく設定されているか確認
   ```sql
   SELECT id, email, "isAdmin" FROM users WHERE "isAdmin" = true;
   ```

## 今後の拡張予定

- **細かい権限制御** - ファイル別、機能別の詳細権限
- **権限管理UI** - 管理者向けのグラフィカルな権限管理画面
- **監査ログ** - 権限変更の履歴管理
- **一括権限操作** - 複数の権限を一度に設定する機能
- **権限テンプレート** - よく使用される権限パターンのテンプレート化