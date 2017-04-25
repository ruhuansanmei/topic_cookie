var casper = require('casper').create(
    {
        // verbose: true,//记录日志到控制台
        // logLevel: 'debug',//日志等级
        pageSettings: {
            loadImages: false,
            loadPlugins: false
        }
    }
)
// console.log(casper.cli.args)
var username = casper.cli.args[0]
var password = casper.cli.args[1]
// console.log(username)
// console.log(password)
var x = require('casper').selectXPath
phantom.outputEncoding = "utf-8"
casper.start('https://login.sina.com.cn/signup/signin.php',function(response){ 
    //  this.echo(this.getTitle())
    //  this.echo(phantom.cookies)
    })
casper.wait(5000,function() {
    this.evaluate(function (usr,psw) {
        // console.log(username)
        // console.log(password)
        // document.getElementById('username').value = 'xxxxx'
        // document.getElementById('password').value = 'xxxxx'
        document.getElementById('username').value = usr
        document.getElementById('password').value = psw
        document.getElementsByClassName('W_btn_a')[0].click()
    },username,password)
    
})
casper.wait(5000)
casper.thenOpen('http://d.weibo.com/100803?from=page_huati_tab',function(response) {
    // console.log(phantom.cookies)
    // console.log('response')
    // var cookies = phantom.cookies
    var cookies = this.page.cookies
    var cookie_string = []
    // console.log(cookies)
    // this.echo("cookie.length = " + cookies.length);
    for (var i in cookies) {
        // if (cookies[i].name == 'SUB') {
        //     // console.log(2312321312312321)
        //     console.log(cookies[i].value)
        // }
        // this.echo(cookies[i].name + "=" +  cookies[i].value);
        cookie_string.push(cookies[i].name + "=" +  cookies[i].value)
    }
    console.log(cookie_string.join('; '))
    // this.echo("''")
})
casper.thenOpen('http://weibo.com/p/100808a5f2b86b6ccf5c9bdd74fc336fb20a08?from=faxian_huati',function(response) {
    // console.log(phantom.cookies)
    // console.log('response')
    // var cookies = phantom.cookies
    var cookies = this.page.cookies
    var cookie_string = []
    // console.log(cookies)
    // this.echo("cookie.length = " + cookies.length);
    for (var i in cookies) {
        // if (cookies[i].name == 'SUB') {
        //     // console.log(2312321312312321)
        //     console.log(cookies[i].value)
        // }
        // this.echo(cookies[i].name + "=" +  cookies[i].value);
        cookie_string.push(cookies[i].name + "=" +  cookies[i].value)
    }
    console.log(cookie_string.join('; '))
    // this.echo("''")
})

// casper.then(function() {
//     console.log(12321312)
//     console.log()
// })

casper.run();
