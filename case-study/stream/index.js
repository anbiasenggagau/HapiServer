const fs = require('fs')
const path = require('path')

const readStream = fs.createReadStream(path.resolve(__dirname,'input.txt'),{ highWaterMark : 10 })
const writeStream = fs.createWriteStream(path.resolve(__dirname,'output.txt') )

let result = ''

readStream.on('readable', async () => {
    try{
        result = result + await readStream.read()
    } catch(error){
        console.log("Something wrong happened")
    }
})

readStream.on('end',() => {
    console.log('Done reading')

    writeStream.write(result)
    console.log('Done writing')
})
