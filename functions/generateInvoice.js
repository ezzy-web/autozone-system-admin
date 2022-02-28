

const puppeteer = require("puppeteer")
const fs = require("fs-extra")
const hbs = require("handlebars")
const moment = require("moment")
const path = require("path")
const formattedResponse = require("./utils/formattedResponse")
const { verify } = require('./utils/firebase/firebaseAuth')


const compile = async (data) => {
    const filePath = path.join(process.cwd(), "functions/utils", "invoice.hbs")
    const html = await fs.readFile(filePath, 'utf-8')
    return hbs.compile(html)(data)
}


hbs.registerHelper('dateFormat', (value, format) => {
    return moment(value).format(format)
})


exports.handler = async (event) => {

    const { token, customToken, ...data } = JSON.parse(event.body)
    const user = await verify(token, customToken)

    if (!user) {
        console.log("\n\n auth/required \n\n")
        return response(200, "auth/required", false)
    }
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        const content = await compile({ user: user.user, ... data})
        await page.setContent(content)

        const buffer = await page.pdf({
            path: './functions/utils/pdf/invoice.pdf',
            format: 'Letter'
        })
        await browser.close()

        return {
            statusCode: 200,
            body: JSON.stringify(content)
        }

    } catch (error) {
        return formattedResponse(200, "ERROR GENERATING INVOICE RELOAD AND TRY AGAIN", false)
    }

    





}