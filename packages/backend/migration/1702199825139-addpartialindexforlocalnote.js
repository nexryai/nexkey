export class addpartialindexforlocalnote1702199825139 {
    constructor() {
        this.name = 'addpartialindexforlocalnote1702199825139';
    }
    async up(queryRunner) {
      await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_partial_local_noteid on note (id) WHERE "userHost" IS NULL; `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."idx_partial_local_noteid"`);
    }
}
