# 大文件上传

## 进行切片处理

```js
const sectionFile = (file:File)=>{
  //切片的数量 
  const chunckCount = Math.ceil(fileData.value.size / CHUNCK_SIZE)
  //存储切片
  let chunks = []
  let cur = 0
  for (let i = 0; i < chunckCount; i++) {
    const blob = file.slice(cur,cur+CHUNCK_SIZE)

    chunks.push(blob)
    cur+=CHUNCK_SIZE
  }

  return chunks
}

```

## 计算文件hash值
```js
const calculateHash = (chunks:Blob[])=>{
   return new Promise((resolve)=>{
    const targets:Blob[] = [] //参与计算的切片
    const spark = new SparkMD5.ArrayBuffer()

    const fileReader = new FileReader()
    chunks.forEach((chuck,index)=>{
      if(index===0 || index===chunks.length-1){
        targets.push(chuck)
      }else{
        targets.push(chuck.slice(0,2))
        targets.push(chuck.slice(CHUNCK_SIZE/2,CHUNCK_SIZE/2+2))
        targets.push(chuck.slice(CHUNCK_SIZE-2,CHUNCK_SIZE))
      }
    })


    fileReader.readAsArrayBuffer(new Blob(targets))

    fileReader.onload = (e)=>{
      spark.append((e.target as FileReader).result)
       resolve(spark.end())
    }
   })
}
```

## 切片上传和合并切片
const uploadChunks = async(chunks:Blob[])=>{
  const data = chunks.map((chunck,index)=>{
    return {
      fileHash : fileData.value.md5,
      chunckHash : fileData.value.md5 + '-' +index,
      chunck
    }
  })

  //转换成formData
  const formDatas = data.map(item=>{
    const formData = new FormData()

    formData.append('fileHash',item.fileHash)
    formData.append('chunkHash',item.chunckHash)
    formData.append('chunk',item.chunck)

    return formData
  })

  const max = 6 //最大并发请求
  let index = 0

  const taskPool:any[] = [] //请求池
  while(index < formDatas.length){
    const task = axios({
      method:'post',
      data:formDatas[index],
      url:'http://localhost:8000/file'
    })


    task.then(()=>{
      taskPool.splice(taskPool.findIndex((item=>item===task)))
    })

    taskPool.push(task)

    if(taskPool.length === max){
      await Promise.race(taskPool)
    }

    index++

  }

  await Promise.all(taskPool)

  //通知服务器合并切片
  mergeRequest()
}

const mergeRequest = async()=>{
  let result = await axios({
    method:'post',
    headers:{
      'Content-Type':"application/json"
    },
    data:JSON.stringify({
      size:CHUNCK_SIZE,
      fileHash:fileData.value.md5,
      fileName:fileData.value.name
    })
  })
}
