//module imports
const got = require('got');
const colors = require('colors');
const tough = require('tough-cookie');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const prompt = require('prompt-sync')();

//global functions
function rand(min, max) {return Math.floor(Math.random() * (max - min) + min)};

//global variables
const cookieJar = new tough.CookieJar();
const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36'
  ]
async function getSession(code, ua){
    var formData = JSON.stringify({
        id: code.toString(),
        name: "tefsft"
    })
    try {
        var getSession = await got.put('https://api.blooket.com/api/firebase/join', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Length': formData.length,
            'Content-Type': 'application/json;charset=UTF-8',
            'Host': 'api.blooket.com',
            'Origin': 'https://www.blooket.com',
            'Pragma': 'no-cache',
            'Referer': 'https://www.blooket.com/',
            'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
            'sec-ch-ua-mobile': '?0',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': ua,
        },
        body: formData,
        cookieJar: cookieJar,
        method: 'PUT'
    })
    if (getSession.statusCode === 200 && JSON.parse(getSession.body)['success'] === true){
        console.log('|'.blue, 'Successfully created a session'.green)
        var gameID = JSON.parse(getSession.body)['host']['set']
        await getGame(ua, gameID)

    }
    else {
        console.log('|'.blue, 'Failed to create session'.red)
        try {
            if (JSON.parse(getSession.body)['msg'] === 'no game'){
                console.log('|'.blue, 'No game found with the provided code'.red)
            }
            else {
                throw 'e'
            }
        } catch (e){
            console.log('|'.blue, 'Failed to get session'.red)
            console.log('|'.blue, JSON.parse(getSession.body))
        }
    }
    } catch (error){
        console.log('|'.blue, `Failed to get Session [${getSession.statusCode}]`)
    }
}
async function getGame(ua, gameID){
    try {
        var getGameReq = await got(`https://api.blooket.com/api/games?gameId=${gameID}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Host': 'api.blooket.com',
                'Origin': 'https://www.blooket.com',
                'Pragma': 'no-cache',
                'Referer': 'https://www.blooket.com/',
                'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                'sec-ch-ua-mobile': '?0',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': ua
            },
            cookieJar: cookieJar
        })
    if (getGameReq.statusCode === 200){
        console.log('|'.blue, 'Successfully got questions'.green)
        var correctAnswer = JSON.parse(getGameReq.body)['questions']
        //console.log(correctAnswer)
        for (i in correctAnswer){
            console.log('|'.blue, '-----------------------------------'.blue)
            console.log('|'.blue, `Question Name: ${correctAnswer[i]['question']}`.yellow)
            console.log('|'.blue, `Question Time Limit: ${correctAnswer[i]['timeLimit']}s`.yellow)
            console.log('|'.blue, `Question Correct Answer(s): ${correctAnswer[i]['correctAnswers']}`.green)
            console.log('|'.blue, '-----------------------------------'.blue)
        }
        main()
    }
    else {
        console.log('|'.blue, `Failed to get questions [${getGameReq.statusCode}]`.red)
    }
    } catch (error){
        console.log(error)
    }
}
async function main(){
    console.log('|'.blue, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'.brightBlue)
    console.log('|'.blue, '--------------------------------------'.brightBlue)
    console.log('|'.blue, `Blooket Scripts`.brightBlue)
    console.log('|'.blue, '--------------------------------------'.brightBlue)
    console.log('|'.blue, 'This script auto gets all the correct answers for a blooket quiz'.brightBlue)
    console.log('|'.blue, '--------------------------------------'.brightBlue)
    console.log('|'.blue, 'Developed by Venus#0071'.brightBlue)
    console.log('|'.blue, '--------------------------------------'.brightBlue)
    console.log('|'.blue, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'.brightBlue)
    var code = prompt('|'.blue + ' ' + 'Enter a game code:'.cyan.underline + ' ')
    console.log('|'.blue, 'Getting Answers...'.brightBlue)
    getSession(code, UA[rand(0, userAgents.length - 1)])
}
main()
