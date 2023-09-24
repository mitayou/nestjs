import { Controller, Post, UseInterceptors, UploadedFiles, Req } from '@nestjs/common'
import { UploadService } from './upload.service'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('files')
  @UseInterceptors(AnyFilesInterceptor())
  async getFile(@Req() request: Request, @UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files.length) {
      return
    }
    // 保存文件并保留文件夹路径
    let preFix = ''
    const headers = request.headers as any
    if (headers.origin) {
      preFix = headers.origin
    }
    const res = await this.uploadService.uploadMultiple(files)
    return res.map(item => preFix + '/' + item)
  }
}
