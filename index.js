const http=require("http");
const fs=require("fs");

let homeContent="";
let projectContent="";

fs.readFile("./home.html",(err,home)=>{
    if (err){
        throw err;
    }
    homeContent=home;
});

fs.readFile("./project.html",(err,project)=>{
    if (err){
        throw err;
    }
    projectContent=project;
});

fs.readFile("./registration.html",(err,registration)=>{
    if (err){
        throw err;
    }
    regcontent=registration;
});
fs.readFile("./registration.js", (err, data) => {
    if (err) {
      throw err;
    }
    script = data;
  });

let args=require("minimist")(process.argv.slice(2));
let port=args.port;

http.createServer((request,response)=>{
    let url=request.url;
    response.writeHeader(200,{"Content-Type":"text/html"});
    switch(url){
        case "/project":
            response.write(projectContent);
            response.end();
            break;
        case "/registration":
            response.write(regcontent);
            response.end();
            break;
        case "/registration.js":
            response.writeHead(200,{"Content-Type":"text/javascript"});
            response.write(script);
            response.end();
            break;
        default:
            response.write(homeContent);
            response.end();
            break;
    }
}).listen(port);
