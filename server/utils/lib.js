import cookie from 'cookie'


export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}

export function getRecentVehicleFromCookie(cookies) {
    var recents = []
    for (const [key, value] of Object.entries(cookies)) {
        if (key.includes('recent')) {
            recents.push(JSON.parse(value))
        }
    }

    recents.sort((a,b) => a.timeStamp + b.timeStamp)
    recents.reverse()
    return recents

}