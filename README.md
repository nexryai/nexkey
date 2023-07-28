# Nexkey
nexryaiによるMisskey v12フォーク

### 変更点
 - ベース: Atsu1125さんのv12 LTS [repo](https://github.com/atsu1125/misskey-v12/)
 - v13のデザインの改善を取り込み（cherry-picked from [taiyme frok](https://github.com/taiyme/misskey)）
 - Firefishの実装を~~パクって~~参考にSonicによる検索と過去投稿のインデックス機能を実装
 - チャンネルとギャラリー、NSFW自動検出を抹消
 - 脆弱性のある依存関係の更新
 - 旧りなっくすきーv13フォークで行った改善を取り込み
   * インスタンスティッカーやエントランス画面周りの改善
 - インスタンスミュートの仕様を改善
   * FFであれば適用しない、メンションには適用しないなど制限を緩和し本家より気軽に使えるようにした
   * 完全に断交したいという需要があるなら将来的にユーザー毎のインスタンスブロックを実装する予定

### Thanks
Thanks to the developers and contributors of the original Misskey and the referenced fork!
