import { PoolModule } from "./pool/pool.module";
import { Module } from "./lib/decorators";

@Module({
    imports: [PoolModule],
})
export class AppModule {}
