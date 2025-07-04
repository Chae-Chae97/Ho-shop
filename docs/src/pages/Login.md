# Login 画面定義書

### 📜 概要
<img src="../images/Login.JPG" alt="イメージ説明" width="500" height="280" />


- ユーザーがIDとパスワードを入力してサービスにログインできるページです。
- 認証成功時、ユーザーはホーム画面に移動し、失敗時には通知メッセージを受け取ります。

### 🔧 主要機能
- IDおよびパスワード入力
- ユーザー認証およびログイン処理
- ログイン成功時にホーム画面へリダイレクト

### 📥 主要コンポーネントおよびフック
- **Login**: ページ全体のレイアウトを担当するコンテナコンポーネントです。
- **LoginForm**: 実際の入力フォームUIをレンダリングし、ログインロジックを処理します。
- **useAuth**: グローバルなログイン状態を更新するために使用されます。
- **useNavigate**: ログイン成功時に別のパスへ移動するために使用されます。

### 🔍 handleSubmit( ) (in LoginForm.jsx)
- 入力されたID/パスワードと`localStorage`のユーザー情報を比較して認証を実行します。
- **認証失敗時**: 警告メッセージを表示します。
- **認証成功時**:
    1. グローバル状態を更新し(`AuthContext`)、トークンを保存します。
    2. 「ログインしました。」と通知後、ホーム画面(`/`)へ移動します。

### 💾 useState 変数および役割 (in LoginForm.jsx)
| 変数 | 説明 |
| :--- | :--- |
| `id` | ユーザーが入力したIDの値を保存します。 |
| `password` | ユーザーが入力したパスワードの値を保存します。 |