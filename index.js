const fs = require('fs');
const http = require('http');
const url = require('url');

//////////////////////////////////////
// FILES

// // Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn);
//
// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// // Non-blocking way, asynchronous
// fs.readFile('./txt/start.txt', 'utf8', (err, data1) => {
//   if (err) return console.log(`ERROR!: 💥${err}`);
//
//   fs.readFile(`./txt/${data1}.txt`, 'utf8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf8', (err, data3) => {
//       console.log(`${data2}\n${data3}`);
//
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf8', err => {
//           console.log('Your file has been written 🫡')
//       })
//     })
//   })
// })
// console.log('Will read file!');

//////////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8')
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW')
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT')
  } else if (pathName === '/api') {
    res.writeHead(200, {'Content-type': 'application/json'})
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end('<h1>Page not found!</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log(`Server listening on ${server.address().port}`);
})