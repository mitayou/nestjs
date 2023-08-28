/**
 * 获取缩略图地址
 * @param url 带http(s)开头的url
 * @param width 缩略图宽度
 * @param height 缩略图高度
 * @returns {String} 可请求的缩略图拼接地址
 */
function minifyImg(url: string, width?: string | number, height?: string | number): string {
  const urlCheck = new RegExp('^https?://')
  // 检查是否合法的http(s)开头的url
  if (!(url && urlCheck.test(url))) {
    return ''
  }
  if (!width || !height) {
    return url
  }
  const connect = url.indexOf('?') === -1 ? '?' : '&'
  const link = url + connect + 'imageView2/3/w/' + width + '/h/' + height
  const protocol = (link.match(urlCheck) as RegExpMatchArray)[0]
  // 将协议拆分出来后,把多次重复的/替换成一个/
  return protocol + link.replace(protocol, '').replace(new RegExp('/+', 'g'), '/')
}

/**
 * 根据url获取文件名 注意：不支持获取本地路径 仅支持网络路径
 * e.g http://192.168.1.1/img/timg.786ea0eb.gif?passkey=1/2. 输出 timg.786ea0eb.gif
 * https://i.vzan.cc/zt/image/HomeImage/jpeg/2017/12/20/
 * 19530418efddd9eba34b789d4942c7d8a98b8d.jpeg?x-oss-process=image/resize,limit_0,m_fill,w_200,h_200/quality,q_100
 * @param url 传入的url地址
 * @param noSuffix 是否无需要后缀
 */
function getFileName(url: string, noSuffix: boolean) {
  if (url === null || typeof url === 'undefined') {
    return ''
  }
  const fileName = ((decodeURI(`${url}`).split('?').shift() || '').split('/').pop() || '').split('#')[0]

  // 如果需要后缀
  if (!noSuffix) {
    return fileName
  }
  // 获取.+后缀
  const suffix = fileName.substring(fileName.lastIndexOf('.'))
  // 截取以.后缀结尾的
  const reg = new RegExp(suffix + '$')
  return fileName.replace(reg, '')
}

/**
 * 获取文件后缀（扩展名，返回的数据可能为png | jpeg?a=1 | mp3）
 * @param fileName 文件名
 */
function getFileSuffix(fileName = '') {
  if (!fileName || typeof fileName !== 'string') {
    console.error('filename must be a string')
    return ''
  }
  const strNoArgsFileName = fileName.split('?').shift() || ''
  return strNoArgsFileName.substring(strNoArgsFileName.lastIndexOf('.') + 1, strNoArgsFileName.length) || strNoArgsFileName
}

/**
 * 定义一个函数，接受一个数字参数 bytes，输出最大能表达的单位
 * @param bytes 字节数
 * @returns 直观数据大小
 */
function convertBytes(bytes) {
  // 定义一个数组，存储不同单位的名称
  const units = ['B', 'KB', 'MB', 'GB']
  // 定义一个变量，存储转换后的结果
  let result = ''
  // 定义一个变量，存储当前单位的索引
  let index = 0
  // 循环判断 bytes 是否大于等于 1024
  while (bytes >= 1024) {
    // 如果是，则将 bytes 除以 1024，并保留两位小数
    bytes = (bytes / 1024).toFixed(2)
    // 将索引加一，表示进入下一个单位
    index++
    // 如果索引超过了数组的长度，则跳出循环
    if (index >= units.length) {
      break
    }
  }
  // 将 bytes 和对应的单位拼接成结果字符串
  result = bytes + '' + units[index]
  // 返回结果字符串
  return result
}

/**
 * 生成一个随机文件名，根据用户ID和5位随机字符作为参数
 * @param customId 用户ID
 * @returns 文件名
 */
function generateFileName(customId) {
  if (!customId || customId === -1 || customId === '-1') {
    customId = ''
  }
  // 拼接日期和用户ID
  const prefix = getNow() + customId
  // 定义一个字符串，包含所有不为数字的字符
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  // 定义一个空字符串，用于存放随机字符
  let suffix = ''
  // 循环五次，每次从chars中随机选取一个字符，并拼接到suffix中
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * chars.length)
    suffix += chars[index]
  }
  // 返回文件名，即前缀和后缀的组合
  return prefix + suffix
}

/**
 * 获取当前时间的日期字符串
 * YYYYMMDDHHmmss
 */
function getNow() {
  const currentDate = new Date()
  const year = currentDate.getFullYear() // 获取年份（四位数）
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 获取月份，并补零
  const day = String(currentDate.getDate()).padStart(2, '0') // 获取日期，并补零
  const hours = String(currentDate.getHours()).padStart(2, '0') // 获取小时，并补零
  const minutes = String(currentDate.getMinutes()).padStart(2, '0') // 获取分钟，并补零
  const seconds = String(currentDate.getSeconds()).padStart(2, '0') // 获取秒数，并补零

  const formattedDate = year + month + day + hours + minutes + seconds
  return formattedDate
}

export { minifyImg, getFileName, getFileSuffix, convertBytes, generateFileName }
