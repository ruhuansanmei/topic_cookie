import curl = require('curl')
let getCookie = () => {
  return new Promise((res, rej) => {
    curl.get('http://localhost:6050?username=xxxxxx&password=xxxxxx', (err, resp, body) => {
      if (err) {
        console.log(err)
        rej(err)
      }
      res(body)
      // console.log(resp)
      // console.log('*********')
      // console.log(body)
    })
  })
  // curl.get('http://localhost:6868', (err, resp, body) => {
  //   console.log(resp)
  //   console.log('*********')
  //   console.log(body)
  // })
}
getCookie().then((res) => {
  console.log(res)
})