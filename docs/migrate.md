## Firefishからの移行
確認バージョン: 1.0.3  
以下のSQLを実行してからNexkeyをインストールし、マイグレーションを行うことでFirefishからNexkeyへ移行できます。  
移行できる保証はありません。基本的に自己責任でお願いします。必ずデータのバックアップを予め行ってください。

```
ALTER TABLE "drive_file" ALTER COLUMN "userHost" TYPE character varying(128);
ALTER TABLE "user" ALTER COLUMN "host" TYPE character varying(128);
ALTER TABLE "user_profile" ALTER COLUMN "userHost" TYPE character varying(128);
ALTER TABLE "user_publickey" ALTER COLUMN "keyId" TYPE character varying(256);
ALTER TABLE "emoji" ALTER COLUMN "host" TYPE character varying(128);
ALTER TABLE "note" ALTER COLUMN "userHost" TYPE character varying(128);
ALTER TABLE "note" ALTER COLUMN "replyUserHost" TYPE character varying(128);
ALTER TABLE "note" ALTER COLUMN "renoteUserHost" TYPE character varying(128);
ALTER TABLE "instance" ALTER COLUMN "host" TYPE character varying(128);
ALTER TABLE "instance" ALTER COLUMN "iconUrl" TYPE character varying(256);
ALTER TABLE "instance" ALTER COLUMN "faviconUrl" TYPE character varying(256);
ALTER TABLE "poll" ALTER COLUMN "userHost" TYPE character varying(128);
ALTER TABLE "abuse_user_report" ALTER COLUMN "targetUserHost" TYPE character varying(128);
ALTER TABLE "abuse_user_report" ALTER COLUMN "reporterHost" TYPE character varying(128);
ALTER TABLE "following" ALTER COLUMN "followeeHost" TYPE character varying(128);
ALTER TABLE "following" ALTER COLUMN "followerHost" TYPE character varying(128);
ALTER TABLE "follow_request" ALTER COLUMN "followeeHost" TYPE character varying(128);
ALTER TABLE "follow_request" ALTER COLUMN "followerHost" TYPE character varying(128);
UPDATE meta SET "repositoryUrl" = 'https://github.com/nexryai/nexkey';
UPDATE meta SET "feedbackUrl" = 'https://github.com/nexryai/nexkey/issues';
ALTER TABLE "announcement" DROP COLUMN "isGoodNews";
ALTER TABLE "announcement" DROP COLUMN "showPopup";
ALTER TABLE "meta" DROP COLUMN "enableIdenticonGeneration";
ALTER TABLE "meta" DROP COLUMN "enableServerMachineStats";
ALTER TABLE "emoji" DROP COLUMN "height";
ALTER TABLE "emoji" DROP COLUMN "width";
ALTER TABLE "user" ADD "showTimelineReplies" boolean NOT NULL DEFAULT true;
ALTER TABLE "meta" DROP COLUMN "experimentalFeatures";
ALTER TABLE "user_profile" DROP COLUMN "preventAiLearning";
ALTER TABLE "meta" DROP COLUMN "silencedHosts";
ALTER TABLE "meta" DROP COLUMN "libreTranslateApiKey";
ALTER TABLE "meta" DROP COLUMN "libreTranslateApiUrl";
ALTER TABLE "note_edit" DROP CONSTRAINT "FK_702ad5ae993a672e4fbffbcd38c";
ALTER TABLE "note" DROP COLUMN "updatedAt";
DROP TABLE "note_edit";
ALTER TABLE "user" DROP COLUMN "speakAsCat";
delete from __chart__hashtag where ___local_users = 0 and ___remote_users = 0;
delete from __chart_day__hashtag where ___local_users = 0 and ___remote_users = 0;
ALTER TABLE "emoji" DROP COLUMN "license";
DELETE FROM "antenna" WHERE "src" = 'instances';
ALTER TABLE "antenna" DROP COLUMN "instances";
CREATE TYPE "public"."antenna_src_enum_old" AS ENUM('home', 'all', 'users', 'list', 'group');
ALTER TABLE "antenna" ALTER COLUMN "src" TYPE "public"."antenna_src_enum_old" USING "src"::"text"::"public"."antenna_src_enum_old";
DROP TYPE "public"."antenna_src_enum";
ALTER TYPE "public"."antenna_src_enum_old" RENAME TO "antenna_src_enum";
DROP INDEX "public"."IDX_a9021cc2e1feb5f72d3db6e9f5";
ALTER TABLE "abuse_user_report" DROP CONSTRAINT "FK_a9021cc2e1feb5f72d3db6e9f5f";
ALTER TABLE "poll" ALTER COLUMN "choices" TYPE character varying(128) array;
ALTER TABLE "meta" DROP COLUMN "defaultReaction";
ALTER TABLE abuse_user_report DROP CONSTRAINT fk_7f4e851a35d81b64dda28eee0;
ALTER TABLE "user" DROP COLUMN "movedToUri";
ALTER TABLE "user" DROP COLUMN "alsoKnownAs";
ALTER TABLE "sw_subscription" DROP COLUMN "sendReadMessage";
UPDATE "meta" SET "useStarForReactionFallback" = FALSE;
ALTER TABLE "page" DROP COLUMN "isPublic";
ALTER TABLE "meta" DROP COLUMN "enableGuestTimeline";
ALTER TABLE "meta" DROP COLUMN "disableRecommendedTimeline";
ALTER TABLE "meta" DROP COLUMN "recommendedInstances";
ALTER TABLE "meta" DROP COLUMN "customSplashIcons";
ALTER TABLE "meta" DROP COLUMN "customMOTD";
DROP FUNCTION note_replies;

CREATE TABLE antenna_note ( id character varying(32) NOT NULL, "noteId" character varying(32) NOT NULL, "antennaId" character varying(32) NOT NULL, read boolean DEFAULT false NOT NULL); COMMENT ON COLUMN antenna_note."noteId" IS 'The note ID.'; ALTER TABLE ONLY antenna_note ADD CONSTRAINT "PK_fb28d94d0989a3872df19fd6ef8" PRIMARY KEY (id); CREATE INDEX "IDX_0d775946662d2575dfd2068a5f" ON antenna_note USING btree ("antennaId"); CREATE UNIQUE INDEX "IDX_335a0bf3f904406f9ef3dd51c2" ON antenna_note USING btree ("noteId", "antennaId"); CREATE INDEX "IDX_9937ea48d7ae97ffb4f3f063a4" ON antenna_note USING btree (read); CREATE INDEX "IDX_bd0397be22147e17210940e125" ON antenna_note USING btree ("noteId"); ALTER TABLE ONLY antenna_note ADD CONSTRAINT "FK_0d775946662d2575dfd2068a5f5" FOREIGN KEY ("antennaId") REFERENCES antenna(id) ON DELETE CASCADE; ALTER TABLE ONLY antenna_note ADD CONSTRAINT "FK_bd0397be22147e17210940e125b" FOREIGN KEY ("noteId") REFERENCES note(id) ON DELETE CASCADE;

# ここから下はエラーが出ても無視してOK
DROP INDEX "IDX_renote_muting_createdAt
DROP INDEX "IDX_renote_muting_muteeId
DROP INDEX "IDX_renote_muting_muterId"
DROP TABLE "renote_muting"
```
