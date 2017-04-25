import http = require('http')
import url = require('url')
import qs = require('querystring')
import cp = require('child_process')
import path = require('path')
// var fs = require('fs')
let getCookie = (username: number | string, password: string) => {
  return new Promise((resolve, reject) => {
    let re_path = './app/casper_work.js'
    let ab_path = path.resolve(re_path)
    let cat = cp.spawn('casperjs', [ab_path, username, password])
    let result = {cookie1:"''",cookie2:"''"}
    cat.stdout.on('data', (d) => {
      // console.log(d.toString())
      let cookie = d.toString()
      console.log(cookie)
      // result = cookie
      if(result.cookie1 == "''") {
        result.cookie1 = cookie
      } else {
        result.cookie2 = cookie
      }
      // result.push[cookie]
      // console.log(result)
      // resolve(d.toString())
    })

    cat.on('exit', () => {
      resolve(result)
      console.log('cat on exit')
    })

    cat.on('close', () => {
      console.log('cat on close')
    })
    cat.stdin.write('cat on data!')
    cat.stdin.end()
  })
}

// getCookie().then((res) => {
//   console.log('成功')
//   console.log(res)
// }).catch((e) => console.log(e))
let startServer = () => {
  http.createServer((req, res) => {
    let query = url.parse(req.url).query
    console.log(query)
    let qs_parse = qs.parse(query)
    let { username, password } = qs_parse
    console.log(qs_parse)
    res.writeHead(200, { 'Content-type': 'application/json;charset=utf-8' })
    getCookie(username, password).then((result) => {
      console.log('cookie')
      console.log(result)
      // res.write(result)
      let body = JSON.stringify({cookie1:result.cookie1,cookie2:result.cookie2})
      res.end(body)
    }).catch((e) => {
      console.log(e)
      let body = JSON.stringify({ cookie1: "''",cookie2:"''" })
      res.end(body)
    })
    // .then(() => {
    //   res.end('')
    // })
    // .catch((e) => {
    //   console.log(e)
    //   let body = JSON.stringify({ result: "''" })
    // })
  }).listen(6050)
}
startServer()

export {startServer}