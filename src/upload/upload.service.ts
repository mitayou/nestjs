import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

const ASSETS_BASE_PATH = 'public'
const UPLOAD_BASE_PATH = 'uploads'

@Injectable()
export class UploadService {
  /**
   * 将文件列表保存到指定目录，按照树状图保存
   * @param files 文件列表
   * @returns 文件路径列表
   */
  uploadMultiple(files: Array<Express.Multer.File>): Promise<string[]> {
    // 保存文件并保留文件夹路径
    if (!files.length) {
      return
    }
    // 逐个保存
    const pList = []
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      file.fieldname = decodeURI(file.fieldname)
      pList.push(this.saveFile(file))
    }
    return Promise.all(pList)
  }
  /**
   * 根据文件信息将文件保存到指定目录
   * @param file 文件信息
   * @returns 路径
   */
  saveFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      // 创建目录（如果不存在）
      const targetPath = path.join(ASSETS_BASE_PATH, UPLOAD_BASE_PATH, file.fieldname)
      fs.mkdir(path.dirname(targetPath), { recursive: true }, err => {
        if (err) {
          console.error('创建目录时发生错误:', err)
          reject(err)
          return
        }

        // 保存文件
        fs.writeFile(targetPath, file.buffer, err => {
          if (err) {
            console.error('保存文件时发生错误:', err)
            reject(err)
          } else {
            resolve(
              targetPath.replace(new RegExp(path.sep.replace('\\', '\\\\'), 'g'), '/').replace(new RegExp('^' + ASSETS_BASE_PATH + '/'), '')
            )
          }
        })
      })
    })
  }
}
