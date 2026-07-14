# よりそい つながる Googleログイン設定記録

作成日: 2026-06-23
対象: `yorisoi-dev-477515` / Cloud Run `tsunagaru-frontend`

## 現状

- フロント実装は完了済み。
  - `frontend/lib/auth/local-auth.ts` の `continueWithGoogle()` は Firebase Auth の `GoogleAuthProvider` を使う。
  - Firebase設定は `/api/auth/firebase-config` から取得する。
- メールアドレス/パスワード登録・ログインは Firebase Auth / Identity Platform で有効化済み。
- Cloud Run には Firebase Web App 設定を環境変数として反映済み。
- 公開URL:
  - `https://tsunagaru-frontend-450637239907.asia-northeast1.run.app`
- Firebase Auth domain:
  - `yorisoi-dev-477515.firebaseapp.com`
- 2026-07-15、Firebase CLIのAuth設定デプロイでGoogleプロバイダーを有効化済み。
- Cloud Run公開画面からGoogleログインし、投稿下書きを保持したまま `/post?resume=publish` へ戻るところまで確認済み。

## 解消した問題

当初はGoogleプロバイダーが未作成で、公開画面に「このログイン方法がまだ有効化されていません。」と表示されていた。

REST API で `projects.defaultSupportedIdpConfigs/google.com` を作成しようとしたところ、OAuthクライアントが未設定のため、次のエラーで止まった。

```text
INVALID_CONFIG : client_id cannot be empty.
```

Firebase CLI 15.22.3 のAuthプロバイダー設定を使うことで、OAuthクライアントの自動作成を含めて有効化できた。秘密情報はリポジトリへ保存していない。

確認結果:

- `google.com` provider: enabled
- OAuth client: configured
- Cloud Run本番ドメイン: authorized
- `localhost` / `127.0.0.1`: authorized

## 当時検討した手動設定（現在は不要）

Google Cloud Console の `yorisoi-dev-477515` で、OAuth同意画面と Web OAuth クライアントを作成する。

### 1. OAuth同意画面

- アプリ名: `よりそい`
- ユーザーサポートメール: メディキャンバス管理アカウント
- デベロッパー連絡先: メディキャンバス管理アカウント
- 公開ステータスは、デモ用途ならまずテスト公開でもよい。

### 2. OAuthクライアント

種類:

- Web application

名前:

- `yorisoi-tsunagaru-web`

承認済み JavaScript 生成元:

```text
https://tsunagaru-frontend-450637239907.asia-northeast1.run.app
https://yorisoi-dev-477515.firebaseapp.com
```

承認済みリダイレクトURI:

```text
https://yorisoi-dev-477515.firebaseapp.com/__/auth/handler
```

## 当時のProvider登録コマンド案（現在は不要）

OAuthクライアント作成後、`clientId` と `clientSecret` をローカルの安全な場所に置き、次のように Identity Platform へ登録する。

実値をチャットやGitに貼らないこと。

```powershell
$project = "yorisoi-dev-477515"
$clientId = "<Google OAuth Web Client ID>"
$clientSecret = "<Google OAuth Web Client Secret>"
$token = gcloud auth print-access-token

$body = @{
  enabled = $true
  clientId = $clientId
  clientSecret = $clientSecret
} | ConvertTo-Json

curl.exe -X POST `
  -H "Authorization: Bearer $token" `
  -H "x-goog-user-project: $project" `
  -H "Content-Type: application/json" `
  -d $body `
  "https://identitytoolkit.googleapis.com/v2/projects/$project/defaultSupportedIdpConfigs?idpId=google.com"
```

すでに存在する場合は `PATCH` を使う。

```powershell
curl.exe -X PATCH `
  -H "Authorization: Bearer $token" `
  -H "x-goog-user-project: $project" `
  -H "Content-Type: application/json" `
  -d $body `
  "https://identitytoolkit.googleapis.com/v2/projects/$project/defaultSupportedIdpConfigs/google.com?updateMask=enabled,clientId,clientSecret"
```

## 登録後の確認

1. `/auth/login` を開く。
2. `Googleで続ける` を押す。
3. Googleのアカウント選択画面が出ることを確認する。
4. ログイン後、`/home` または `next` パラメータの画面へ戻ることを確認する。
5. Firebase Auth のユーザー一覧にGoogleユーザーが作成されることを確認する。

## 注意

- `clientSecret` はGit・README・チャットに貼らない。
- もし本番独自ドメインを使う場合、承認済み JavaScript 生成元に本番ドメインを追加する。
- Firebase Auth の authorized domains には、現在 `tsunagaru-frontend-450637239907.asia-northeast1.run.app` と `yorisoi-dev-477515.firebaseapp.com` を含めている。
