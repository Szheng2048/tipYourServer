const http = require('http')
const fs = require('fs')
http
    .createServer(function(request, response){
        console.log(request)
        if(request.url === "/create-directory" && request.method === "GET"){
            let body = ''
            request.on('data',function(data){
                body += data.toString()
            })
            request.on("end",function(){
                let parseBody = JSON.parse(body)
                fs.mkdir(parseBody.folderName,function(error){
                    if(error){
                        response.end(error)
                    } else {
                        response.end("content folder created")
                    }
                })
            })
        } else if(request.url === "/create-text" && request.method === "GET"){
            let body = ''
            request.on("data",function (data){
                body += data.toString()
            })
            request.on('end',function(){
                let parseBody = JSON.parse(body)
                fs.writeFile(parseBody.fileName,parseBody.randomText,function(error){
                    if(error){
                        response.end(error)
                    } else {
                        response.end(parseBody.randomText)
                    }
                })
            })
        } else if(request.url === "/new-folder-and-file" && request.method === "GET"){
            let body = ''
            request.on("data",function (data){
                body += data.toString()
            })
            request.on("end",function(){
                let parseBody = JSON.parse(body) 
                fs.mkdir(parseBody.folderName, function(error){
                    if(error){
                        response.end(error)
                    } else {
                        fs.writeFile(`./content/${parseBody.secondFileName}`,parseBody.randomText,function(error){
                            if(error){
                                response.end(error)
                            } else {
                                response.end(parseBody.randomText)
                                setTimeout(function(){
                                    fs.rmdir(parseBody.folderName,{recursive:true},function(error){
                                        if(error){
                                            response.end(error)
                                        } else {
                                            response.end("File is Deleted")
                                        }
                                    })
                                },7000)
                            }
                        })
                    }
                })
            })
        }
    })
    .listen(3001,function(){
        // console.log("HelloWorld")
        console.log("Server Started!!!")
    })
