import { Module } from '@nestjs/common';
import { Modules } from '@/infra/modules/list.module';
import { Controllers } from './controllers/controllers';
import { Providers } from '@/application/useCases/providers';

@Module({
  imports: [...Modules],
  controllers: Controllers,
  providers: [...Providers],
})
export class HttpModules {}
