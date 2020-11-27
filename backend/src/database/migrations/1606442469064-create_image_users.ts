import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImageUsers1606442469064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'image_users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'path',
                    type: 'varchar'
                },

                {
                    name: 'user_id',
                    type: 'integer'
                },
        
            ],
            foreignKeys: [
                {
                    name: 'ImageUser',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('image_users')
    }

}
