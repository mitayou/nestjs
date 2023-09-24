class FileUtils {
  traverseDirectory(directory, obj = {}, path = '') {
    return new Promise((resolve, reject) => {
      const reader = directory.createReader()
      reader.readEntries(entries => {
        const promises = []

        entries.forEach(entry => {
          if (entry.isFile) {
            promises.push(
              new Promise((resolve, reject) => {
                entry.file(function (file) {
                  const fullPath = path + entry.name
                  // obj.append('files[]', file, fullPath)
                  obj[fullPath] = file
                  resolve()
                })
              })
            )
          } else if (entry.isDirectory) {
            promises.push(this.traverseDirectory(entry, obj, path + entry.name + '/'))
          }
        })

        Promise.all(promises)
          .then(() => resolve(obj))
          .catch(error => reject(error))
      })
    })
  }

  /**
   * 定义一个函数，接受一个数字参数 bytes，输出最大能表达的单位
   * @param bytes 字节数
   * @returns 直观数据大小
   */
  convertBytes(bytes) {
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
    result = bytes + ' ' + units[index]
    // 返回结果字符串
    return result
  }
}

class Upload {
  constructor() {
    this.fileUtils = new FileUtils()
  }
  async httpUpload(files, type = 'array', uploadingFn, uploadedFn) {
    const formData = new FormData()
    if (type === 'keyValuePair') {
      for (const key in files) {
        const name = await new Blob([key], {
          type: 'text/plain;charset=UTF-8'
        }).text()
        formData.append(encodeURI(name), files[key])
      }
    } else {
      for (let index = 0; index < files.length; index++) {
        const item = files[index]
        const name = await new Blob([item.webkitRelativePath], {
          type: 'text/plain;charset=UTF-8'
        }).text()
        formData.append(encodeURI(name), item)
      }
    }
    formData.append('name', 'uploadTest')
    const xhr = new XMLHttpRequest()
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    let previousBytesLoaded = 0
    let previousTime = new Date().getTime()

    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const currentBytesLoaded = event.loaded
        const currentTime = new Date().getTime()
        const totalBytes = event.total

        const percentComplete = (currentBytesLoaded / totalBytes) * 100

        // 计算上传速度
        const bytesUploaded = currentBytesLoaded - previousBytesLoaded
        const timeElapsed = currentTime - previousTime

        const uploadSpeed = bytesUploaded / (timeElapsed / 1000) // 瞬时上传速度（字节/秒）
        const speed = this.fileUtils.convertBytes(uploadSpeed)
        console.log('上传进度：' + percentComplete.toFixed(2) + '%  上传速度：' + speed + '/秒')
        previousBytesLoaded = currentBytesLoaded
        previousTime = currentTime

        if (uploadingFn && typeof uploadingFn === 'function') {
          uploadingFn({
            total: totalBytes,
            current: currentBytesLoaded,
            percentComplete: percentComplete.toFixed(2),
            speed
          })
        }
      }
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText)
        uploadedFn && uploadedFn(xhr)
      }
    }
    xhr.open('POST', './upload/files')
    xhr.send(formData)
  }
}

class DomEvent {
  constructor() {
    this.doms = {
      uploadEle: document.querySelector('.upload'),
      btnUpload: document.querySelector('.btn-upload'),
      dragContent: document.querySelector('.drag-content')
    }
    this.upload = new Upload()
  }
  bindEvent() {
    this.doms.btnUpload.addEventListener('click', () => {
      this.handlerConfirmBtn()
    })
    this.doms.dragContent.addEventListener('dragenter', event => {
      event.preventDefault()
      event.stopPropagation()
      console.log(event)
      this.doms.dragContent.classList.add('active')
    })
    this.doms.dragContent.addEventListener('dragover', event => {
      event.preventDefault()
      event.stopPropagation()
      // console.log(event)
    })
    this.doms.dragContent.addEventListener('dragleave', async event => {
      event.preventDefault()
      event.stopPropagation()
      this.doms.dragContent.classList.remove('active')
    })
    this.doms.dragContent.addEventListener('drop', async event => {
      event.preventDefault()
      event.stopPropagation()
      this.doms.dragContent.classList.remove('active')
      const files = event.dataTransfer.items
      if (files.length === 0) {
        return
      }
      const arrFiles = []
      for (let index = 0; index < files.length; index++) {
        const file = files[index].webkitGetAsEntry()
        const objFile = await this.upload.fileUtils.traverseDirectory(file)
        arrFiles.push(objFile)
      }
      this.upload.httpUpload(...arrFiles, 'keyValuePair')
    })
  }
  handlerConfirmBtn() {
    const { uploadEle } = this.doms
    if (!uploadEle.files.length) {
      return
    }
    console.log([...uploadEle.files].map(item => item.webkitRelativePath))
    this.upload.httpUpload([...uploadEle.files])
  }
}

function main() {
  const domEvent = new DomEvent()
  domEvent.bindEvent()
}

main()
