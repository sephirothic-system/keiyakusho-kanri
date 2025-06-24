# ディレクトリ内契約書一覧への遷移機能

## 概要

トップページからディレクトリ内の契約書一覧画面に遷移できるナビゲーション機能を実装しました。

## 実装した変更

### 1. トップページの変更 (`app/page.tsx`)

#### 権限管理カードの削除と契約書閲覧カードの追加
- **削除**: 「権限を管理」カード（Shield アイコン）
- **追加**: 「契約書を閲覧」カード（Search アイコン）
- **説明文**: 「ディレクトリ内の契約書を検索・閲覧」
- **遷移先**: `/directories`（ディレクトリ一覧画面）

#### アイコンの変更
```typescript
// 変更前
import { FileText, Users, FolderOpen, Plus, Shield } from 'lucide-react'

// 変更後  
import { FileText, Users, FolderOpen, Plus, Search } from 'lucide-react'
```

#### ハンドラー関数の変更
```typescript
// 変更前
const handleManagePermissions = () => {
  router.push('/permissions')
}

// 変更後
const handleBrowseContracts = () => {
  router.push('/directories')
}
```

### 2. DirectoryTreeコンポーネントの拡張 (`components/directories/DirectoryTree.tsx`)

#### 新機能の追加
- **契約書一覧ボタン**: 各ディレクトリに「契約書一覧を見る」ボタンを追加
- **条件表示**: 契約書が存在するディレクトリのみにボタンを表示
- **視覚的識別**: Eye アイコンと青色でボタンを表示

#### インターフェースの拡張
```typescript
interface DirectoryTreeProps {
  directories: Directory[]
  onEdit: (directory: Directory) => void
  onDelete: (id: string) => void
  onCreateChild: (parentId: string) => void
  onViewContracts: (directoryId: string) => void  // 新規追加
  level?: number
}
```

#### UI要素の追加
```typescript
{contractCount > 0 && (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewContracts(directory.id)}
          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>契約書一覧を見る</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)}
```

### 3. ディレクトリ一覧ページの更新 (`app/directories/page.tsx`)

#### 契約書一覧遷移ハンドラーの追加
```typescript
// 契約書一覧に遷移
const handleViewContracts = (directoryId: string) => {
  router.push(`/directories/${directoryId}/contracts`)
}
```

#### DirectoryTreeコンポーネントの使用更新
```typescript
<DirectoryTree
  directories={directories}
  onEdit={openEditDialog}
  onDelete={handleDeleteDirectory}
  onCreateChild={openCreateDialog}
  onViewContracts={handleViewContracts}  // 新規追加
/>
```

## ユーザーフロー

### 完成した遷移フロー
1. **トップページ**: 「契約書を閲覧」カードをクリック
2. **ディレクトリ一覧**: 目的のディレクトリの「契約書一覧を見る」ボタン（👁️）をクリック
3. **契約書一覧**: そのディレクトリ内の契約書が表示される

### 視覚的な改善
- **条件付き表示**: 契約書がないディレクトリにはボタンを表示しない
- **直感的なUI**: Eye アイコンで「見る」アクションを視覚的に表現
- **ツールチップ**: ボタンの機能を明確に説明
- **色分け**: 青色で他のアクションボタンと差別化

## 技術的特徴

### コンポーネントの拡張性
- **型安全性**: TypeScriptによる厳密な型定義
- **プロパティの追加**: 既存のインターフェースを拡張
- **再帰的な対応**: 子ディレクトリにも同じ機能を適用

### ルーティング
- **Next.js App Router**: 動的ルーティング `/directories/[id]/contracts` を活用
- **型安全なナビゲーション**: useRouter フックによる安全な遷移

### UX配慮
- **条件付きレンダリング**: 契約書の有無による適切な表示制御
- **アクセシビリティ**: ツールチップによる機能説明
- **視覚的フィードバック**: ホバー効果とカラーリング

## 利用可能な機能

### 既存機能との連携
- **検索機能**: 契約書一覧での契約書名検索
- **ページネーション**: 大量の契約書の効率的な表示
- **ソート機能**: 新しい順での契約書表示
- **詳細表示**: 各契約書の詳細情報（ステータス、カテゴリ、作成者など）

### ナビゲーション機能
- **階層的な移動**: トップ → ディレクトリ一覧 → 契約書一覧
- **戻りナビゲーション**: 各画面からの戻りリンク
- **直接遷移**: URL指定での直接アクセス対応

## 削除された機能

### 権限管理機能の削除
前回実装した権限管理機能は削除されました：
- `app/permissions/page.tsx`
- `app/api/permissions/directory-access/route.ts`
- `app/api/permissions/directory-access/[id]/route.ts`
- `test/api/permissions/directory-access.test.ts`
- `PERMISSION_MANAGEMENT_FEATURE.md`

これらのファイルは現在使用されていませんが、将来必要になった場合は復活させることができます。

## 使用方法

### 基本的な使用方法
1. **契約書閲覧開始**: トップページの「契約書を閲覧」をクリック
2. **ディレクトリ選択**: ディレクトリ一覧で目的のディレクトリを確認
3. **契約書一覧表示**: 契約書があるディレクトリの👁️ボタンをクリック
4. **契約書検索・閲覧**: 一覧画面で検索や詳細閲覧を実行

### 効率的な使用法
- **契約書数の確認**: ディレクトリ一覧でバッジから契約書数を確認
- **階層構造の活用**: 親子ディレクトリの構造を利用した整理
- **検索機能の活用**: 大量の契約書から目的のものを素早く発見

この実装により、ユーザーは直感的かつ効率的にディレクトリ内の契約書にアクセスできるようになります。