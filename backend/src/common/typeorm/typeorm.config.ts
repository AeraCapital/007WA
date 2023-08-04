import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'swornim',
    password: 'janakiran',
    database: 'sassyapple',
    entities: [ "dist/**/*.entity{.ts,.js}" ],
    synchronize: true,
};