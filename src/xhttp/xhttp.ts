import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import * as https from 'https'
import { BASE_URL, HEADERS } from './config'

@Injectable()
export class XHTTP {
  private readonly httpService: HttpService
  constructor() {
    // 创建自定义的 axios 实例
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: HEADERS,
      /*
      proxy: {
        host: 'localhost',
        port: 8888
      },
      */
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2',
        maxVersion: 'TLSv1.3'
      })
    })
    // 创建 HttpService 实例，并使用自定义的 axios 实例
    this.httpService = new HttpService(axiosInstance)
    /*
    try {
      this.httpService.axiosRef.interceptors.response.use(
        arg => {
          if (arg.data.ret !== 0) {
            throw new Error('no login')
          } else {
            return arg
          }
        },
        rej => {
          console.log(rej.data)
          throw rej
        }
      )
    } catch (e) {
      console.log(e)
    }
    */
  }

  get<T>(url: string, params: any, config?: any) {
    return this.httpService.get<{ data: T }>(url, { params, ...config })
  }
  post<T>(url: string, params: any) {
    return this.httpService.post<{ data: T }>(url, params)
  }
}
