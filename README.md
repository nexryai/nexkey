# Nexkey
nexryaiによるMisskey v12フォーク

### 変更点
 - ベース: Atsu1125さんのv12 LTS [repo](https://github.com/atsu1125/misskey-v12/)
 - v13のデザインの改善を取り込み（cherry-picked from [taiyme frok](https://github.com/taiyme/misskey)）
 - Firefishの実装を~~パクって~~参考にSonicによる検索と過去投稿のインデックス機能を実装
 - 脆弱性のある依存関係の更新
 - v13で実装された一部機能の実装
   * RNミュート
 - インスタンスティッカーやエントランス画面周りの改善
 - オンラインユーザーを常時表示
 - 検索をexploreに統合
 - インスタンスミュートの仕様を改善
   * FFであれば適用しない、メンションには適用しないなど制限を緩和し本家より気軽に使えるようにした
   * 完全に断交したいという需要があるなら将来的にユーザー毎のインスタンスブロックを実装する予定
 - 一部UIの修正
 - パスワードハッシュをargon2に
 - 以下の機能を削除
	 * NSFW自動検出（精度が低くメモリリークの原因なため）
	 * チャンネル（連合しないため）
	 * ギャラリー（使わん）
	 * LTL（STLで代替可能なため）
### Thanks
Thanks to the developers and contributors of the original Misskey and the referenced fork!
