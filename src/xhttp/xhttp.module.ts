import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { XHTTP } from './xhttp'
import { CodeAPI } from './api/code.api'

@Module({
  imports: [HttpModule],
  providers: [XHTTP, CodeAPI],
  exports: [CodeAPI]
})
export class XHttpModule {}
