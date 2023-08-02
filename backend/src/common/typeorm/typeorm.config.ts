import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'sassy-db',
    port: 5432,
    username: 'postgres',
    password: 'janakiran',
    database: 'sassyapple',
    entities: [ "dist/**/*.entity{.ts,.js}" ],
    synchronize: true,
};