<!--
## 12.x.x (unreleased)

### Improvements

### Bugfixes

You should also include the user name that made the change.
-->

## 12.119.2-fix.6.3 (2024/02/04)
### Bugfixes
- インスタンスミュートが一部（アンテナ・通知などに）効かないのを修正 @atsu1125
- `cc followers`を正しい公開範囲で解釈できるよう修正 @trwnh
- isBot判定が正しく行われるように @Mar0xy
- メール配信が管理者によって無効化されているなら配送を行わないように @atsu1125

## 12.119.2-fix.6.2 (2023/12/27)
### Improvements
- 自分のインスタンスのノート探索速度を向上 @atsu1125
- ノートの編集アクティビティを受信して処理するように @atsu1125

### Bugfixes
- Appは管理者/モデレータ権限を使えないように @mei23
- メンションの宛先追加候補表示が消えないのを修正 @Qwreey
- ローカルのみや非公開のピン留めはAP公開しないように @mei23
- カスケード削除される投稿の削除をストリーミングにも送信するように @atsu1125

## 12.119.2-fix.6.1 (2023/11/29)
### Improvements
- クライアントで正しく自分のインスタンスのドメイン名が表示されるように @Candinya
- クイックアクションから管理者がメールアドレスでユーザーを検索できるように @syuilo @atsu1125

### Bugfixes
- サイレンスされているときに無効な公開範囲をクライアントで選ばないように @ozelotdev @atsu1125
- ストリーミングのチャンネル名を修正 @atsu1125
- 通知音の再生時に端末のメディア再生を停止しないように @samunohito @anatawa12 @kakkokari-gtyih @acid-chicken @atsu1125
- リモートユーザーのHTTP署名のチェックを適切に行っていないのを修正 @atsu1125

## 12.119.2-fix.6.0 (2023/11/09)
### Bugfixes
- ドメインブロックがサブドメインに反映されないのを修正 @atsu1125
- ドメインブロックのスイッチが動かないのを修正 @atsu1125
- メールドメインブロックがサブドメインに反映されないのを修正 @atsu1125
- 絵文字追加の重複チェックを修正 @atsu1125

## 12.119.2-fix.5.9 (2023/11/04)
### Improvements
- ブロックしているユーザーからのリノートは受信しないように @atsu1125
- マイグレーションを簡単にロールバックできるように @MomentQYC
- NodejsとDockerのDebianのOSをバージョンアップ @atsu1125
- 2段階認証のバックアップコードを利用できるように @syuilo @CyberRex0

### Bugfixes
- 連合なしのアンケートが配送されないように @mei23
- ノート作成時のローカルのみチェックを追加 @atsu1125
- 絵文字を重複して追加できないように @nenohi @atsu1125
- リノートの公開範囲をチェックするように @anatawa12
- アカウント削除ジョブが止まらないように @atsu1125
- リノート解除がストリーミングに流れてこないのを修正 @atsu1125
- フォロワーのみのリノートが連合しないのを修正 @saschanaz
- フォロワー解除の応答に含まれるユーザーが逆なのを改善 @atsu1125
- 凍結されたユーザーにメール通知を送らないように @atsu1125
- メール通知のユーザーネームがnullである可能性を考慮する @atsu1125
- リノートをリノートできてしまわないように修正 @mei23
- MkGoogleのクエリを正しくエンコードできるように修正 @kakkokari-gtyih @syuilo
- 標準テーマと同じIDを使用してインストールできてしまう問題を修正 @syuilo

## 12.119.2-fix.5.8 (2023/10/02)
### Improvements
- 配送を再試行してもよいHTTPステータスコードを見直し @atsu1125
- ジョブキューのapBackoffの計算方法と再試行頻度を変更 @atsu1125
- WebHookのSecretが空でも許容する @xtexChooser
- メールで通知を受け取る機能を復旧 @atsu1125
- メールを送るときは基本的にキューにする @atsu1125
- Node v16.20.2 @atsu1125

### Bugfixes
- 凍結されているユーザーがusers/showのリクエストに含まれる場合に適当なユーザーを返すのを修正 @u1-liquid
- BullBoardの認証をバイパスしてしまわないように @syuilo
- 削除されているユーザーのレスポンスを改善 @atsu1125
- 通報を解決するダイアログが削除するように見えるのを修正 @atsu1125
- AiScriptでMk:apiが外部と通信できる問題を修正 @FineArchs
- '.well-known/host-meta.json' は 'application/json' で応答 @xtexChooser
- WebHookは"'Content-Type': 'application/json'"で送出 @xtexChooser
- プラグインの権限一覧が表示されないのを修正 @kakkokari-gtyih
- モデレーション機能有効化のi18n @atsu1125
- BotもしくはAdminとしてログインしていることの警告を削除 @atsu1125
- クライアント設定バックアップ削除のi18n @taiyme
- TagCloudウィジェットと管理画面でアイコンのないインスタンスがあると動作しなくなるのを修正 @atsu1125

## 12.119.2-fix.5.7 (2023/09/03)
### Improvements
- 通知クライアント設定のリファクタ @atsu1125

### Bugfixes
- 絵文字のファイルがドライブから削除されないようにするコードの修正 @atsu1125
- モバイル版の広告表示画面の移動 @atsu1125

## 12.119.2-fix.5.6 (2023/08/17)
### Improvements
- アカウントの登録日を他のインスタンスが読めるように @atsu1125
- ユーザーのドライブの使用量をモデレータが読めるように @atsu1125
- オフラインの画面にリロードボタンを追加 @atsu1125
- アンテナの一部機能を復活 @atsu1125
- モデレーション操作の昇格を分かりやすくスイッチで行えるように @atsu1125
- モデレータが操作し得ない管理者向けのメニューは表示しないように @atsu1125
- フォロー・フォロー解除イベントでタイムラインのリロードを行わないように @atsu1125
- アンテナ・検索機能を設定ファイルで無効化できるように @atsu1125
- モデレーションログを管理画面で見られるように @atsu1125
- モデレーションログはユーザーIDや操作種別によってフィルタできるように @atsu1125
- リノートはノートのデフォルト公開範囲にて行うように @atsu1125
- ユーザーがアクティブな広告一覧を表示するページを追加 @atsu1125
- argon2パスワードハッシュに対応できるように @atsu1125
  - このフォークでは引き続き従来のbcryptをパスワードハッシュとして用いるため後方互換性があります
  - 他のargon2をパスワードハッシュとして用いるフォークからこのフォークへのポータビリティを確保する目的です

### Bugfixes
- フォロー数・フォロワー数を隠しているのを他のインスタンスに反映できるように @atsu1125
- ユーザーリストタイムラインにミュートブロックなどが効くように @atsu1125
- 公開投稿が連合タイムラインに出ないことがあるのを修正 @atsu1125
- 空のアンテナは作成も編集もできないように @atsu1125
- インスタンスのブロック状態をモデレータが正しく認識できるように @atsu1125
- お知らせのURLを空にできないのを修正 @atsu1125
- お知らせ・広告を10件よりも多く管理画面で閲覧できるように @atsu1125
- ワードミュートがサブノートに反映されないのを修正 @atsu1125
- ユーザーが削除されているはずなら適切に404エラーと返す @atsu1125

## 12.119.2-fix.5.5 (2023/06/22)
### Improvements
- 閉鎖された他のインスタンスの全ユーザーの削除をできるように @atsu1125
- リレーに対して古いノート作成アクティビティなどは送らないように @atsu1125
- 配送状況と受信状況に応じて自動的に配送を停止再開できるように @atsu1125
- 時限ミュートの期間を確認できるように @atsu1125
- ユーザー削除を確実に行えるように変更 @atsu1125
- カスタム絵文字のファイルを間違って消してしまわないように @atsu1125
- ユーザー・インスタンスへのモデレーション操作をデフォルトで隠すように（管理画面のSudoボタンを押すと表示される） @atsu1125
- インスタンスに対する全てのフォロー解除のボタンを追加 @atsu1125
- チャンネルを削除できるボタンを追加 @atsu1125
- 運営上の通知を匿名でユーザーに送る機能を追加 @atsu1125
- フォロー承認制を解除した際に一気に承認する挙動をやめる @atsu1125
- 全てのファイルを削除のボタンを追加 @atsu1125
- Mastodonから返ってくる４０１がPermenentじゃないかもなので再試行 @atsu1125

### Bugfixes
- latestStatusとlatestRequestRecievedAtが取得できてないのを修正 @atsu1125
- ブロックに関するフィルタ処理をストリーミングに効くように @atsu1125
- 凍結済みと削除済みのユーザーをなるべく隠すように @atsu1125
- 全てのファイルを削除のAPIを修復 @atsu1125

## 12.119.2-fix.5.4 (2023/05/19)
### Improvements
- お知らせと広告の登録日時と期限を管理画面で表示できるように @atsu1125

## 12.119.2-fix.5.3 (2023/05/19)
### Improvements
- 期限切れの広告も管理画面には表示 @atsu1125
- フォロワーがサイレンスされているならフォローリクエストを発行 @atsu1125
- サイレンスされているアカウントをおすすめに表示しないように @atsu1125
- 特定のインスタンスに対するフォロー全解除は管理者だけ実行可能に @atsu1125
- 通報解決時とリレー解除時にダイアログするように @atsu1125

### Bugfixes
- 広告とお知らせの追加時に増殖してしまわないように @atsu1125
- 凍結済みか削除済みのアカウントにフォローされないように @atsu1125
- ブロックする際にフォロワー解除を送信するように @atsu1125
- ブロックしているアカウントから通知をもらわないように @atsu1125
- すでに機能していないタイムトラベル機能を削除 @atsu1125

## 12.119.2-fix.5.2 (2023/03/08)

## Bugfixes
- 未ログイン状態でノートが見れないのを修正 @atsu1125

## 12.119.2-fix.5.1 (2023/03/02)
### Improvements
- Botとしてログインしていることをデフォルトで警告（設定で無効化可能） @atsu1125
- Botアカウントを特定する機能 @atsu1125
- Adminとしてログインしていることを警告できる機能（デフォルトで無効） @atsu1125
- アニメーションのない標準的なMFMを完全に無効化できるように @atsu1125

### Bugfixes
- ローカルタイムライン・グローバルタイムラインを正常に閉鎖できていないのを修正 @atsu1125

## 12.119.2-fix.5 (2023/02/28)
### Improvements
- インスタンスドメインブロックはサブドメインにも適用するように @atsu1125
- メールドメインブロック機能を追加（⚠️Metaテーブルへカラム追加マイグレーションあり） @atsu1125
- デフォルトでブラーは無効に @atsu1125
- デフォルトでピコピコ鳴らさないように @atsu1125
- デフォルトでダークモード @atsu1125
- デフォルトの適用テーマを変更（デフォルトを変更しているインスタンスには影響ない） @atsu1125
- モデレータがユーザーのメールアドレスの登録状態を確認可能に（メールアドレスは読めない） @atsu1125
- 自動で折り畳む機能を改善（$[x3 $[x4を含む、添付ファイルが５つ以上、URLが４つ以上に適用） @atsu1125
- 招待制なことを強調 @atsu1125

### Bugfixes
- Fix validation for security @atsu1125

## 12.119.2-fix.4 (2023/02/25)
### Improvements
- モデレータが管理者権限を行使してGUIからリノートを削除できるように @atsu1125
- モデレータが管理者権限を行使してページを削除できるように @atsu1125
- チャンネル作成者がAPIからチャンネル削除できるように @atsu1125
- モデレータが管理者権限を行使してAPIからチャンネルを削除できるように @atsu1125

### Bugfixes
- Follow Security Advisory @atsu1125 @mei23
- お知らせの登録日時のデザインをまともに @atsu1125

## 12.119.2-fix.3 (2023/02/23)
### Improvements
- フォロー、フォロワーのページでフォローされていることを表示 @nenohi @syuilo
- バージョンチェックは起動時に弾くんじゃなくてインストール時に弾く @mei23
- お知らせの登録日時を表示 @atsu1125
- フォロワー解除の際にダイアログを表示 @atsu1125
- パスワードリセットの際にダイアログを表示 @atsu1125
- 全てのファイルを削除を安全に @atsu1125
- モデレータが投稿を削除するステップを改善 @atsu1125
- オンラインユーザー数を/aboutと/admin/overviewに表示 @atsu1125
- プロフィールとインスタンス情報のウィジェットを追加 @atsu1125

### Bugfixes
- Follow Security Advisory @atsu1125 @mei23
- fix: 一部の状態のファイルをドロップしてアップロードできない場合がある問題を修正 @m-hayabusa
- add webhookId to api request @m-hayabusa
- statement_timeoutの初期値を10秒から300秒に（タイムライン・アカウント削除が動くように） @atsu1125
- TODOとか出るの消す @atsu1125
- /featuredの消し忘れ @atsu1125

## 12.119.2-fix.2 (2023/01/24)
### Improvements
- Add Group (but only moderator can create new group) @atsu1125

## 12.119.2-fix.1 (2023/01/21)
### Bugfixes
- fix(client): インスタンスティッカーのfaviconを読み込む際に偽サイト警告が出ることがあるのを修正 @syuilo
- fix(client): clarify to use props.url @futchitwo

## 12.119.2 (2022/12/04)
### Bugfixes
- Server: Backported versions mitigate isn't working @mei23

## 12.119.1 (2022/12/03)
### Bugfixes
- Server: Mitigate AP reference chain DoS vector @skehmatics

## 12.119.0 (2022/09/10)

### Improvements
- Client: Add following badge to user preview popup @nvisser
- Client: mobile twitter url can be used as widget @caipira113
- Client: Improve clock widget @syuilo

### Bugfixes
- マイグレーションに失敗する問題を修正
- Server: 他人の通知を既読にできる可能性があるのを修正 @syuilo
- Client: アクセストークン管理画面、アカウント管理画面表示できないのを修正 @futchitwo

## 12.118.1 (2022/08/08)

### Bugfixes
- Client: can not show some setting pages @syuilo

## 12.118.0 (2022/08/07)

### Improvements
- Client: 設定のバックアップ/リストア機能
- Client: Add vi-VN language support
- Client: Add unix time widget @syuilo

### Bugfixes
- Server: リモートユーザーを正しくブロックできるように修正する @xianonn
- Client: 一度作ったwebhookの設定画面を開こうとするとページがフリーズする @syuilo
- Client: MiAuth認証ページが機能していない @syuilo
- Client: 一部のアプリからファイルを投稿フォームへドロップできない場合がある問題を修正 @m-hayabusa

## 12.117.1 (2022/07/19)

### Improvements
- Client: UIのブラッシュアップ @syuilo

### Bugfixes
- Server: ファイルのアップロードに失敗することがある問題を修正 @acid-chicken
- Client: リアクションピッカーがアプリ内ウィンドウの後ろに表示されてしまう問題を修正 @syuilo
- Client: ユーザー情報の取得の再試行を修正 @xianonn
- Client: MFMチートシートの挙動を修正 @syuilo
- Client: 「インスタンスからのお知らせを受け取る」の設定を変更できない問題を修正 @syuilo

## 12.117.0 (2022/07/18)

### Improvements
- Client: ウィンドウを最大化できるように @syuilo
- Client: Shiftキーを押した状態でリンクをクリックするとアプリ内ウィンドウで開くように @syuilo
- Client: デッキを使用している際、Ctrlキーを押した状態でリンクをクリックするとページ遷移を強制できるように @syuilo
- Client: UIのブラッシュアップ @syuilo

## 12.116.1 (2022/07/17)

### Bugfixes
- Client: デッキUI時に ページで表示 ボタンが機能しない問題を修正 @syuilo
- Error During Migration Run to 12.111.x

## 12.116.0 (2022/07/16)

### Improvements
- Client: registry editor @syuilo
- Client: UIのブラッシュアップ @syuilo

### Bugfixes
- Error During Migration Run to 12.111.x
- Server: TypeError: Cannot convert undefined or null to object @syuilo

## 12.115.0 (2022/07/16)

### Improvements
- Client: Deckのプロファイル切り替えを簡単に @syuilo
- Client: UIのブラッシュアップ @syuilo

## 12.114.0 (2022/07/15)

### Improvements
- RSSティッカーで表示順序をシャッフルできるように @syuilo

### Bugfixes
- クライアントが起動しなくなることがある問題を修正 @syuilo

## 12.113.0 (2022/07/13)

### Improvements
- Support <plain> syntax for MFM

### Bugfixes
- Server: Fix crash at startup if TensorFlow is not supported @mei23
- Client: URLエンコードされたルーティングを修正

## 12.112.3 (2022/07/09)

### Improvements
- Make active email validation configurable

### Bugfixes
- Server: Fix Attempts to update all notifications @mei23

## 12.112.2 (2022/07/08)

### Bugfixes
- Fix Docker doesn't work @mei23  
  Still not working on arm64 environment. (See 12.112.0)

## 12.112.1 (2022/07/07)
same as 12.112.0

## 12.112.0 (2022/07/07)

### Known issues
- 現在arm64環境ではインストールに失敗します。これは次のバージョンで修正される予定です。

### Changes
- ハイライトがみつけるに統合されました
- カスタム絵文字ページはインスタンス情報ページに統合されました
- 連合ページはインスタンス情報ページに統合されました
- メンション一覧ページは通知一覧ページに統合されました
- ダイレクト投稿一覧ページは通知一覧ページに統合されました
- メニューからアンテナタイムラインを表示する方法は廃止され、タイムライン上部のアイコンからアクセスするようになりました
- メニューからリストタイムラインを表示する方法は廃止され、タイムライン上部のアイコンからアクセスするようになりました

### Improvements
- Server: Allow GET method for some endpoints @syuilo
- Server: Auto NSFW detection @syuilo
- Server: Add rate limit to i/notifications @tamaina
- Client: Improve control panel @syuilo
- Client: Show warning in control panel when there is an unresolved abuse report @syuilo
- Client: Statusbars @syuilo
- Client: Add instance-cloud widget @syuilo
- Client: Add rss-ticker widget @syuilo
- Client: Removing entries from a clip @futchitwo
- Client: Poll highlights in explore page @syuilo
- Client: Improve deck UI @syuilo
- Client: Word mute also checks content warnings @Johann150
- Client: メニューからページをリロードできるように @syuilo
- Client: Improve emoji picker performance @syuilo
- Client: For notes with specified visibility, show recipients when hovering over visibility symbol. @Johann150
- Client: Make widgets available again on a tablet @syuilo
- ユーザーにモデレーションメモを残せる機能 @syuilo
- Make possible to delete an account by admin @syuilo
- Improve player detection in URL preview @mei23
- Add Badge Image to Push Notification #8012 @tamaina
- Server: Improve performance
- Server: Supports IPv6 on Redis transport. @mei23  
  IPv4/IPv6 is used by default. You can tune this behavior via `redis.family`.
- Server: Add possibility to log IP addresses of users @syuilo
- Add additional drive capacity change support @CyberRex0

### Bugfixes
- Server: Fix GenerateVideoThumbnail failed @mei23
- Server: Ensure temp directory cleanup @Johann150
- favicons of federated instances not showing @syuilo
- Admin: The checkbox for blocking an instance works again @Johann150
- Client: Prevent access to user pages when not logged in @pixeldesu @Johann150
- Client: Disable some hotkeys (e.g. for creating a post) for not logged in users @pixeldesu
- Client: Ask users that are not logged in to log in when trying to vote in a poll @Johann150
- Instance mutes also apply in antennas etc. @Johann150

## 12.111.1 (2022/06/13)

### Bugfixes
- some fixes of multiple notification read @tamaina
- some GenerateVideoThumbnail failed @Johann150
- Client: デッキでウィジェットの情報が保存されない問題を修正 @syuilo
- Client: ギャラリーの投稿を開こうとすると編集画面が表示される @futchitwo

## 12.111.0 (2022/06/11)
### Note
- Node.js 16.15.0 or later is required

### Improvements
- Supports Unicode Emoji 14.0 @mei23
- プッシュ通知を複数アカウント対応に #7667 @tamaina
- プッシュ通知にクリックやactionを設定 #7667 @tamaina
- ドライブに画像ファイルをアップロードするときオリジナル画像を破棄してwebpublicのみ保持するオプション @tamaina
- Server: always remove completed tasks of job queue @Johann150
- Client: アバターの設定で画像をクロップできるように @syuilo
- Client: make emoji stand out more on reaction button @Johann150
- Client: display URL of QR code for TOTP registration @tamaina
- Client: render quote renote CWs as MFM @pixeldesu
- API: notifications/readは配列でも受け付けるように #7667 @tamaina
- API: ユーザー検索で、クエリがusernameの条件を満たす場合はusernameもLIKE検索するように @tamaina
- MFM: Allow speed changes in all animated MFMs @Johann150
- The theme color is now better validated. @Johann150
  Your own theme color may be unset if it was in an invalid format.
  Admins should check their instance settings if in doubt.
- Perform port diagnosis at startup only when Listen fails @mei23
- Rate limiting is now also usable for non-authenticated users. @Johann150 @mei23
  Admins should make sure the reverse proxy sets the `X-Forwarded-For` header to the original address.

### Bugfixes
- Server: keep file order of note attachement @Johann150
- Server: fix missing foreign key for reports leading to reports page being unusable @Johann150
- Server: fix internal in-memory caching @Johann150
- Server: prevent crash when processing certain PNGs @syuilo
- Server: Fix unable to generate video thumbnails @mei23
- Server: Fix `Cannot find module` issue @mei23
- Federation: Add rel attribute to host-meta @mei23
- Federation: add id for activitypub follows @Johann150
- Federation: use `source` instead of `_misskey_content` @Johann150
- Federation: ensure resolver does not fetch local resources via HTTP(S) @Johann150
- Federation: correctly render empty note text @Johann150
- Federation: Fix quote renotes containing no text being federated correctly @Johann150
- Federation: remove duplicate br tag/newline @Johann150
- Federation: add missing authorization checks @Johann150
- Client: fix profile picture height in mentions @tamaina
- Client: fix abuse reports page to be able to show all reports @Johann150
- Client: fix settings page @tamaina
- Client: fix profile tabs @futchitwo
- Client: fix popout URL @futchitwo
- Client: correctly handle MiAuth URLs with query string @sn0w
- Client: ノート詳細ページの新しいノートを表示する機能の動作が正しくなるように修正する @xianonn
- MFM: more animated functions support `speed` parameter @futchitwo
- MFM: limit large MFM @Johann150

## 12.110.1 (2022/04/23)

### Bugfixes
- Fix GOP rendering @syuilo
- Improve performance of antenna, clip, and list @xianonn

## 12.110.0 (2022/04/11)

### Improvements
- Improve webhook @syuilo
- Client: Show loading icon on splash screen @syuilo

### Bugfixes
- API: parameter validation of users/show was wrong
- Federation: リモートインスタンスへのダイレクト投稿が届かない問題を修正 @syuilo

## 12.109.2 (2022/04/03)

### Bugfixes
- API: admin/update-meta was not working @syuilo
- Client: テーマを切り替えたり読み込んだりするとmeta[name="theme-color"]のcontentがundefinedになる問題を修正 @tamaina

## 12.109.1 (2022/04/02)

### Bugfixes
- API: Renoteが行えない問題を修正

## 12.109.0 (2022/04/02)

### Improvements
- Webhooks @syuilo
- Bull Dashboardを組み込み、ジョブキューの確認や操作を行えるように @syuilo
  - Bull Dashboardを開くには、最初だけ一旦ログアウトしてから再度管理者権限を持つアカウントでログインする必要があります
- Check that installed Node.js version fulfills version requirement @ThatOneCalculator
- Server: overall performance improvements @syuilo
- Federation: avoid duplicate activity delivery @Johann150
- Federation: limit federation of reactions on direct notes @Johann150
- Client: タッチパッド・タッチスクリーンでのデッキの操作性を向上 @tamaina

### Bugfixes
- email address validation was not working @ybw2016v
- API: fix endpoint endpoint @Johann150
- API: fix admin/meta endpoint @syuilo
- API: improved validation and documentation for endpoints that accept different variants of input @Johann150
- API: `notes/create`: The `mediaIds` property is now deprecated. @Johann150
  - Use `fileIds` instead, it has the same behaviour.
- Client: URIエンコーディングが異常でdecodeURIComponentが失敗するとURLが表示できなくなる問題を修正 @tamaina

## 12.108.1 (2022/03/12)

### Bugfixes
- リレーが動作しない問題を修正 @xianonn
- ulidを使用していると動作しない問題を修正 @syuilo
- 外部からOGPが正しく取得できない問題を修正 @syuilo
- instance can not get the files from other instance when there are items in allowedPrivateNetworks in .config/default.yml @ybw2016v

## 12.108.0 (2022/03/09)

### NOTE
このバージョンからNode v16.14.0以降が必要です

### Changes
- ノートの最大文字数を設定できる機能が廃止され、デフォルトで一律3000文字になりました @syuilo
- Misskey can no longer terminate HTTPS connections. @Johann150
  - If you did not use a reverse proxy (e.g. nginx) before, you will probably need to adjust
    your configuration file and set up a reverse proxy. The `https` configuration key is no
    longer recognized!

### Improvements
- インスタンスデフォルトテーマを設定できるように @syuilo
- ミュートに期限を設定できるように @syuilo
- アンケートが終了したときに通知が作成されるように @syuilo
- プロフィールの追加情報を最大16まで保存できるように @syuilo
- 連合チャートにPub&Subを追加 @syuilo
- 連合チャートにActiveを追加 @syuilo
- デフォルトで10秒以上時間がかかるデータベースへのクエリは中断されるように @syuilo
	- 設定ファイルの`db.extra`に`statement_timeout`を設定することでタイムアウト時間を変更できます
- Client: スプラッシュスクリーンにインスタンスのアイコンを表示するように @syuilo

### Bugfixes
- Client: リアクションピッカーの高さが低くなったまま戻らないことがあるのを修正 @syuilo
- Client: ユーザー名オートコンプリートが正しく動作しない問題を修正 @syuilo
- Client: タッチ操作だとウィジェットの編集がしにくいのを修正 @xianonn
- Client: register_note_view_interruptor()が動かないのを修正 @syuilo
- Client: iPhone X以降(?)でページの内容が全て表示しきれないのを修正 @tamaina
- Client: fix image caption on mobile @nullobsi

## 12.107.0 (2022/02/12)

### Improvements
- クライアント: テーマを追加 @syuilo

### Bugfixes
- API: stats APIで内部エラーが発生する問題を修正 @syuilo
- クライアント: ソフトミュートですべてがマッチしてしまう場合があるのを修正 @tamaina
- クライアント: デバイスのスクリーンのセーフエリアを考慮するように @syuilo
- クライアント: 一部環境でサイドバーの投稿ボタンが表示されない問題を修正 @syuilo

## 12.106.3 (2022/02/11)

### Improvements
- クライアント: スマートフォンでの余白を調整 @syuilo

### Bugfixes
- クライアント: ノートの詳細が表示されない問題を修正 @syuilo

## 12.106.2 (2022/02/11)

### Bugfixes
- クライアント: 削除したノートがタイムラインから自動で消えない問題を修正 @syuilo
- クライアント: リアクション数が正しくないことがある問題を修正 @syuilo
- 一部環境でマイグレーションが動作しない問題を修正 @syuilo

## 12.106.1 (2022/02/11)

### Bugfixes
- クライアント: ワードミュートが保存できない問題を修正 @syuilo

## 12.106.0 (2022/02/11)

### Improvements
- Improve federation chart @syuilo
- クライアント: リアクションピッカーのサイズを設定できるように @syuilo
- クライアント: リアクションピッカーの幅、高さ制限を緩和 @syuilo
- Docker: Update to Node v16.13.2 @mei23
- Update dependencies

### Bugfixes
- validate regular expressions in word mutes @Johann150

## 12.105.0 (2022/02/09)

### Improvements
- インスタンスのテーマカラーを設定できるように @syuilo

### Bugfixes
- 一部環境でマイグレーションが失敗する問題を修正 @syuilo

## 12.104.0 (2022/02/09)

### Note
ビルドする前に`npm run clean`を実行してください。

このリリースはマイグレーションの規模が大きいため、インスタンスによってはマイグレーションに時間がかかる可能性があります。
マイグレーションが終わらない場合は、チャートの情報はリセットされてしまいますが`__chart__`で始まるテーブルの**レコード**を全て削除(テーブル自体は消さないでください)してから再度試す方法もあります。

### Improvements
- チャートエンジンの強化 @syuilo
	- テーブルサイズの削減
	- notes/instance/perUserNotesチャートに添付ファイル付きノートの数を追加
	- activeUsersチャートに新しい項目を追加
	- federationチャートに新しい項目を追加
	- apRequestチャートを追加
	- networkチャート廃止
- クライアント: 自インスタンス情報ページでチャートを見れるように @syuilo
- クライアント: デバイスの種類を手動指定できるように @syuilo
- クライアント: UIのアイコンを更新 @syuilo
- クライアント: UIのアイコンをセルフホスティングするように @syuilo
- NodeInfo のユーザー数と投稿数の内容を見直す @xianonn

### Bugfixes
- Client: タイムライン種別を切り替えると「新しいノートがあります」の表示が残留してしまうのを修正 @tamaina
- Client: UIのサイズがおかしくなる問題の修正 @tamaina
- Client: Setting instance information of notes to always show breaks the timeline @Johann150
- Client: 環境に依っては返信する際のカーソル位置が正しくない問題を修正 @syuilo
- Client: コントロールパネルのユーザー、ファイルにて、インスタンスの表示範囲切り替えが機能しない問題を修正 @syuilo
- Client: アップデートお知らせダイアログが出ないのを修正 @syuilo
- Client: Follows/Followers Visibility changes won't be saved unless clicking on an other checkbox @Johann150
- API: Fix API cast @mei23
- add instance favicon where it's missing @solfisher
- チャートの定期resyncが動作していない問題を修正 @syuilo

## 12.103.1 (2022/02/02)

### Bugfixes
- クライアント: ツールチップの表示位置が正しくない問題を修正

## 12.103.0 (2022/02/02)

### Improvements
- クライアント: 連合インスタンスページからインスタンス情報再取得を行えるように

### Bugfixes
- クライアント: 投稿のNSFW画像を表示したあとにリアクションが更新されると画像が非表示になる問題を修正
- クライアント: 「クリップ」ページが開かない問題を修正
- クライアント: トレンドウィジェットが動作しないのを修正
- クライアント: フェデレーションウィジェットが動作しないのを修正
- クライアント: リアクション設定で絵文字ピッカーが開かないのを修正
- クライアント: DMページでメンションが含まれる問題を修正
- クライアント: 投稿フォームのハッシュタグ保持フィールドが動作しない問題を修正
- クライアント: サイドビューが動かないのを修正
- クライアント: ensure that specified users does not get duplicates
- Add `img-src` and `media-src` directives to `Content-Security-Policy` for
  files and media proxy

## 12.102.1 (2022/01/27)
### Bugfixes
- チャットが表示できない問題を修正

## 12.102.0 (2022/01/27)

### NOTE
アップデート後、一部カスタム絵文字が表示できなくなる場合があります。その場合、一旦絵文字管理ページから絵文字を一括エクスポートし、再度コントロールパネルから一括インポートすると直ります。
⚠ 12.102.0以前にエクスポートされたzipとは互換性がありません。アップデートしてからエクスポートを行なってください。

### Changes
- Room機能が削除されました
  - 後日別リポジトリとして復活予定です
- リバーシ機能が削除されました
  - 後日別リポジトリとして復活予定です
- Chat UIが削除されました
- ノートに添付できるファイルの数が16に増えました
- カスタム絵文字にSVGを指定した場合、PNGに変換されて表示されるようになりました

### Improvements
- カスタム絵文字一括編集機能
- カスタム絵文字一括インポート
- 投稿フォームで一時的に投稿するアカウントを切り替えられるように
- Unifying Misskey-specific IRIs in JSON-LD `@context`
- クライアントのパフォーマンス向上
- セキュリティの向上

### Bugfixes
- アップロードエラー時の処理を修正

## 12.101.1 (2021/12/29)

### Bugfixes
- SVG絵文字が表示できないのを修正
- エクスポートした絵文字の拡張子がfalseになることがあるのを修正

## 12.101.0 (2021/12/29)

### Improvements
- クライアント: ノートプレビューの精度を改善
- クライアント: MFM sparkleエフェクトの改善
- クライアント: デザインの調整
- セキュリティの向上

### Bugfixes
- クライアント: 一部のコンポーネントが裏に隠れるのを修正
- fix html blockquote conversion

## 12.100.2 (2021/12/18)

### Bugfixes
- クライアント: Deckカラムの増減がページをリロードするまで正しく反映されない問題を修正
- クライアント: 一部のコンポーネントが裏に隠れるのを修正
- クライアント: カスタム絵文字一覧ページの負荷が高いのを修正

## 12.100.1 (2021/12/17)

### Bugfixes
- クライアント: デザインの調整

## 12.100.0 (2021/12/17)

### Improvements
- クライアント: モバイルでの各種メニュー、リアクションピッカーの表示を改善

### Bugfixes
- クライアント: 一部のコンポーネントが裏に隠れるのを修正

## 12.99.3 (2021/12/14)
### Bugfixes
- クライアント: オートコンプリートがダイアログの裏に隠れる問題を修正

## 12.99.2 (2021/12/14)

## 12.99.1 (2021/12/14)

## 12.99.0 (2021/12/14)

### Improvements
- Added a user-level instance mute in user settings
- フォローエクスポートでミュートしているユーザーを含めないオプションを追加
- フォローエクスポートで使われていないアカウントを含めないオプションを追加
- カスタム絵文字エクスポート機能
- チャートのパフォーマンスの改善
- グループから抜けられるように

### Bugfixes
- クライアント: タッチ機能付きディスプレイを使っていてマウス操作をしている場合に一部機能が動作しない問題を修正
- クライアント: クリップの設定を編集できない問題を修正
- クライアント: メニューなどがウィンドウの裏に隠れる問題を修正

## 12.98.0 (2021/12/03)

### Improvements
- API: /antennas/notes API で日付による絞り込みができるように
- クライアント: アンケートに投票する際に確認ダイアログを出すように
- クライアント: Renoteなノート詳細ページから元のノートページに遷移できるように
- クライアント: 画像ポップアップでクリックで閉じられるように
- クライアント: デザインの調整
- フォロワーを解除できる機能

### Bugfixes
- クライアント: LTLやGTLが無効になっている場合でもUI上にタブが表示される問題を修正
- クライアント: ログインにおいてパスワードが誤っている際のエラーメッセージが正しく表示されない問題を修正
- クライアント: リアクションツールチップ、Renoteツールチップのユーザーの並び順を修正
- クライアント: サウンドのマスターボリュームが正しく保存されない問題を修正
- クライアント: 一部環境において通知が表示されると操作不能になる問題を修正
- クライアント: モバイルでタップしたときにツールチップが表示される問題を修正
- クライアント: リモートインスタンスのノートに返信するとき、対象のノートにそのリモートインスタンス内のユーザーへのメンションが含まれていると、返信テキスト内にローカルユーザーへのメンションとして引き継がれてしまう場合がある問題を修正
- クライアント: 画像ビューワーで全体表示した時に上側の一部しか表示されない画像がある問題を修正
- API: ユーザーを取得時に条件によっては内部エラーになる問題を修正

### Changes
- クライアント: ノートにモデレーターバッジを表示するのを廃止

## 12.97.0 (2021/11/19)

### Improvements
- クライアント: 返信先やRenoteに対しても自動折りたたみされるように
- クライアント: 長いスレッドの表示を改善
- クライアント: 翻訳にもMFMを適用し、元の文章の改行などを保持するように
- クライアント: アカウント削除に確認ダイアログを出すように

### Bugfixes
- クライアント: ユーザー検索の「全て」が動作しない問題を修正
- クライアント: リアクション一覧、Renote一覧ツールチップのスタイルを修正

## 12.96.1 (2021/11/13)
### Improvements
- npm scriptの互換性を向上

## 12.96.0 (2021/11/13)

### Improvements
- フォロー/フォロワーを非公開にできるように
- インスタンスプロフィールレンダリング ready
- 通知のリアクションアイコンをホバーで拡大できるように
- RenoteボタンをホバーでRenoteしたユーザー一覧を表示するように
- 返信の際にメンションを含めるように
- 通報があったときに管理者へEメールで通知されるように
- メールアドレスのバリデーションを強化

### Bugfixes
- アカウント削除処理があると高負荷になる問題を修正
- クライアント: 長いメニューが画面からはみ出す問題を修正
- クライアント: コントロールパネルのジョブキューに個々のジョブが表示されないのを修正
- クライアント: fix missing i18n string
- fix html conversion issue with code blocks

### Changes
- ノートにモバイルからの投稿か否かの情報を含めないように

## 12.95.0 (2021/10/31)

### Improvements
- スレッドミュート機能

### Bugfixes
- リレー向けのActivityが一部実装で除外されてしまうことがあるのを修正
- 削除したノートやユーザーがリモートから参照されると復活することがあるのを修正
- クライアント: ページ編集時のドロップダウンメニューなどが動作しない問題を修正
- クライアント: コントロールパネルのカスタム絵文字タブが切り替わらないように見える問題を修正
- API: ユーザー情報の hasUnreadChannel が常に false になっている問題を修正

## 12.94.1 (2021/10/25)

### Improvements

### Bugfixes
- クライアント: ユーザーページのナビゲーションが失敗する問題を修正

## 12.94.0 (2021/10/25)

### Improvements
- クライアント: 画像ビューアを強化
- クライアント: メンションにユーザーのアバターを表示するように
- クライアント: デザインの調整
- クライアント: twemojiをセルフホスティングするように

### Bugfixes
- クライアント: CWで画像が隠されたとき、画像の高さがおかしいことになる問題を修正

### NOTE
- このバージョンから、iOS 15未満のサポートがされなくなります。対象のバージョンをお使いの方は、iOSのバージョンアップを行ってください。

## 12.93.2 (2021/10/23)

### Bugfixes
- クライアント: ウィジェットを追加できない問題を修正

## 12.93.1 (2021/10/23)

### Bugfixes
- クライアント: 通知上でローカルのリアクションが表示されないのを修正

## 12.93.0 (2021/10/23)

### Improvements
- クライアント: コントロールパネルのパフォーマンスを改善
- クライアント: 自分のリアクション一覧を見れるように
	- 設定により、リアクション一覧を全員に公開することも可能
- クライアント: ユーザー検索の精度を強化
- クライアント: 新しいライトテーマを追加
- クライアント: 新しいダークテーマを追加
- API: ユーザーのリアクション一覧を取得する users/reactions を追加
- API: users/search および users/search-by-username-and-host を強化
- ミュート及びブロックのインポートを行えるように
- クライアント: /share のクエリでリプライやファイル等の情報を渡せるように
- チャートのsyncを毎日0時に自動で行うように

### Bugfixes
- クライアント: テーマの管理が行えない問題を修正
- API: アプリケーション通知が取得できない問題を修正
- クライアント: リモートノートで意図せずローカルカスタム絵文字が使われてしまうことがあるのを修正
- ActivityPub: not reacted な Undo.Like がinboxに滞留するのを修正

### Changes
- 連合の考慮に問題があることなどが分かったため、モデレーターをブロックできない仕様を廃止しました
- データベースにログを保存しないようになりました
	- ログを永続化したい場合はsyslogを利用してください

## 12.92.0 (2021/10/16)

### Improvements
- アカウント登録にメールアドレスの設定を必須にするオプション
- クライアント: 全体的なUIのブラッシュアップ
- クライアント: MFM関数構文のサジェストを実装
- クライアント: ノート本文を投稿フォーム内でプレビューできるように
- クライアント: 未読の通知のみ表示する機能
- クライアント: 通知ページで通知の種類によるフィルタ
- クライアント: アニメーションを減らす設定の適用範囲を拡充
- クライアント: 新しいダークテーマを追加
- クライアント: テーマコンパイラに hue と saturate 関数を追加
- ActivityPub: HTML -> MFMの変換を強化
- API: グループから抜ける users/groups/leave エンドポイントを実装
- API: i/notifications に unreadOnly オプションを追加
- API: ap系のエンドポイントをログイン必須化+レートリミット追加
- MFM: Add tag syntaxes of bold <b></b> and strikethrough <s></s>

### Bugfixes
- Fix createDeleteAccountJob
- admin inbox queue does not show individual jobs
- クライアント: ヘッダーのタブが折り返される問題を修正
- クライアント: ヘッダーにタブが表示されている状態でタイトルをクリックしたときにタブ選択が表示されるのを修正
- クライアント: ユーザーページのタブが機能していない問題を修正
- クライアント: ピン留めユーザーの設定項目がない問題を修正
- クライアント: Deck UIにおいて、重ねたカラムの片方を畳んだ状態で右に出すと表示が壊れる問題を修正
- API: 管理者およびモデレーターをブロックできてしまう問題を修正
- MFM: Mentions in the link label are parsed as text
- MFM: Add a property to the URL node indicating whether it was enclosed in <>
- MFM: Disallows < and > in hashtags

### Changes
- 保守性やユーザビリティの観点から、Misskeyのコマンドラインオプションが削除されました。
	- 必要であれば、代わりに環境変数で設定することができます
- MFM: パフォーマンス、保守性、構文誤認識抑制の観点から、旧関数構文のサポートが削除されました。
	- 旧構文(`[foo bar]`)を使用せず、現行の構文(`$[foo bar]`)を使用してください。

## 12.91.0 (2021/09/22)

### Improvements
- ActivityPub: リモートユーザーのDeleteアクティビティに対応
- ActivityPub: add resolver check for blocked instance
- ActivityPub: deliverキューのメモリ使用量を削減
- API: 管理者用アカウント削除APIを実装(/admin/accounts/delete)
	- リモートユーザーの削除も可能に
- アカウントが凍結された場合に、凍結された旨を表示してからログアウトするように
- 凍結されたアカウントにログインしようとしたときに、凍結されている旨を表示するように
- リスト、アンテナタイムラインを個別ページとして分割
- UIの改善
- MFMにsparklesエフェクトを追加
- 非ログイン自は更新ダイアログを出さないように
- クライアント起動時、アップデートが利用可能な場合エラー表示およびダイアログ表示しないように

### Bugfixes
- アカウントデータのエクスポート/インポート処理ができない問題を修正
- アンテナの既読が付かない問題を修正
- popupで設定ページを表示すると、アカウントの削除ページにアクセスすることができない問題を修正
- "問題が発生しました"ウィンドウを開くと☓ボタンがなくて閉じれない問題を修正

## 12.90.1 (2021/09/05)

### Bugfixes
- Dockerfileを修正
- ノート翻訳時に公開範囲が考慮されていない問題を修正

## 12.90.0 (2021/09/04)

### Improvements
- 藍モード、および藍ウィジェット
	- クライアントに藍ちゃんを召喚することができるようになりました。
- URLからのアップロード, APの添付ファイル, 外部ファイルのプロキシ等では、Privateアドレス等へのリクエストは拒否されるようになりました。
	- developmentで動作している場合は、この制限は適用されません。
	- Proxy使用時には、この制限は適用されません。
		Proxy使用時に同等の制限を行いたい場合は、Proxy側で設定を行う必要があります。
	- `default.yml`にて`allowedPrivateNetworks`にCIDRを追加することにより、宛先ネットワークを指定してこの制限から除外することが出来ます。
- アップロード, ダウンロード出来るファイルサイズにハードリミットが適用されるようになりました。(約250MB)
	- `default.yml`にて`maxFileSize`を変更することにより、制限値を変更することが出来ます。

### Bugfixes
- 管理者が最初にサインアップするページでログインされないのを修正
- CWを維持する設定を復活
- クライアントの表示を修正

## 12.89.2 (2021/08/24)

### Bugfixes
- カスタムCSSを有効にしているとエラーになる問題を修正

## 12.89.1 (2021/08/24)

### Improvements
- クライアントのデザインの調整

### Bugfixes
- 翻訳でDeepLのProアカウントに対応していない問題を修正
- インスタンス設定でDeepLのAuth Keyが空で表示される問題を修正
- セキュリティの向上

## 12.89.0 (2021/08/21)

### Improvements
- アカウント削除の安定性を向上
- 絵文字オートコンプリートの挙動を改修
- localStorageのaccountsはindexedDBで保持するように
- ActivityPub: ジョブキューの試行タイミングを調整 (#7635)
- API: sw/unregisterを追加
- ワードミュートのドキュメントを追加
- クライアントのデザインの調整
- 依存関係の更新

### Bugfixes
- チャンネルを作成しているとアカウントを削除できないのを修正
- ノートの「削除して編集」をするとアンケートの選択肢が[object Object]になる問題を修正

## 12.88.0 (2021/08/17)

### Features
- ノートの翻訳機能を追加
  - 有効にするには、サーバー管理者がDeepLの無料アカウントを登録し、取得した認証キーを「インスタンス設定 > その他 > DeepL Auth Key」に設定する必要があります。
- Misskey更新時にダイアログを表示するように
- ジョブキューウィジェットに警報音を鳴らす設定を追加

### Improvements
- ブロックの挙動を改修
	- ブロックされたユーザーがブロックしたユーザーに対してアクション出来ないようになりました。詳細はドキュメントをご確認ください。
- UIデザインの調整
- データベースのインデックスを最適化
- Proxy使用時にKeep-Aliveをサポート
- DNSキャッシュでネガティブキャッシュをサポート
- 依存関係の更新

### Bugfixes
- タッチ操作でウィンドウを閉じることができない問題を修正
- Renoteされた時刻が投稿された時刻のように表示される問題を修正
- コントロールパネルでファイルを削除した際の表示を修正
- ActivityPub: 長いユーザーの名前や自己紹介の対応

## 12.87.0 (2021/08/12)

### Improvements
- 絵文字オートコンプリートで一文字目は最近使った絵文字をサジェストするように
- 絵文字オートコンプリートのパフォーマンスを改善
- about-misskeyページにドキュメントへのリンクを追加
- Docker: Node.jsを16.6.2に
- 依存関係の更新
- 翻訳の更新

### Bugfixes
- Misskey更新時、テーマキャッシュの影響でスタイルがおかしくなる問題を修正

## 12.86.0 (2021/08/11)

### Improvements
- ドキュメントの更新
	- ドキュメントにchangelogを追加
- ぼかし効果のオプションを追加
- Vueを3.2.1に更新
- UIの調整

### Bugfixes
- ハッシュタグ入力が空のときに#が付くのを修正
- フォローリクエストのEメール通知を修正
