import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createDonations1605206955182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'donationLocations',
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
                    name: 'name',
                    type: 'varchar'
                },

                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },

                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2,
                },

                {
                    name: 'about',
                    type: 'text'
                },

                {
                    name: 'objects',
                    type: 'text'
                },
                
                {
                    name: 'available_hours',
                    type: 'varchar'
                },

                {
                    name: 'available_to_attend',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'city',
                    type: 'varchar',
                },

                {
                    name: 'uf',
                    type: 'varchar',
                },


                {
                    name: 'whatsapp',
                    type: 'numeric',
                },

                {
                    name: 'price',
                    type: 'varchar',
                },

                
            ],

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('donationLocations')
    }

}

