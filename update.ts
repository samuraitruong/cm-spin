
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import * as puppeteer from "puppeteer";
import * as crypto from "crypto";

class Updater {
    session: any;
    cookies : string[];
    phpsession :string;
    async createHashFromContent(content:string){
        return new Promise(resolve => {
        const hash = crypto.createHash('sha1');
        hash.update(content);
        resolve(hash.digest('hex'));
      });
    }

    async execute() {
        await this.getCookie();
        const list = await this.getList();
        
        //console.log( await this.getDetail(list[0]))
        const promises = list.map(x => this.getDetail(x));
        const data = await Promise.all(promises);
        console.log("foudn location", list);

        const json = JSON.stringify(data, null, 4);
        const message = {
                "message": `Update data file at ${new Date().toUTCString()}[ci skip]`,
                "committer": {
                  "name": "Truong Nguyen`",
                  "email": "samuraitruong@hotmail.com"
                },
                sha: await this.createHashFromContent(json),
                "content": Buffer.from(json).toString("base64")
        }
        const fileUrl = "https://api.github.com/repos/samuraitruong/cm-spin/contents/public/data.json";
        const dataFile =  await axios.get(fileUrl);
        message.sha = dataFile.data.sha;
        const result = await axios.put(fileUrl, message, {
            headers: {
                authorization: "token " + process.env.GH_TOKEN
            }
        });
        console.log(result.data);
    }
    async getCookie() {
        try{
            console.log("Open page in browser with puppeteer ....")
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://gamehunters.club/coin-master/share-links');
       // await page.screenshot({path: 'example.png'});
        const cookies = await page.cookies("https://gamehunters.club");
        console.log("page cookies cookies", cookies)
        const ss = cookies.find(x =>x.name === "PHPSESSID");
        this.phpsession = ss.name+ "="+ ss.value;
        console.log("Session ID", this.phpsession)
        await browser.close();
        }
        catch(err) {

        }
    }
    async getList(){
        const res = await axios.get("https://gamehunters.club/coin-master/share-links", {
            withCredentials: false,
             
            headers: {
            "referer": "https://gamehunters.club/coin-master/share-links",
            "authority": "gamehunters.club",
             "pragma": "no-cache",
             "cache-control": "no-cache",
             "upgrade-insecure-requests": "1",
             "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
             "sec-fetch-user": "?1",
             "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
             "sec-fetch-site": "same-origin",
             "sec-fetch-mode": "navigate",
            //  "accept-encoding": "gzip, deflate, br",
             "accept-language": "en-AU,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,en-GB;q=0.6,en-US;q=0.5",

        }});
        // console.log(res.headers);
        this.cookies = res.headers["set-cookie"]
        const $ = cheerio.load(res.data);
        $(".bonus-area").find(".pagination").remove();
        const links = $(".bonus-area a").toArray();
        const results = links.map(el => {
            return {
                sourceUrl: "https://gamehunters.club"+$(el).attr("href"),
                title:  $(el).find(".bonus-description span").text(),
                time: $(el).find(".timeago").attr("datetime")
            }
        });
        // console.log("results", this.cookies[1]);
        const match = this.cookies[1].match(/PHPSESSID=([^;]*);/ig);
        this.session = match[0]
        // console.log("response cookies", this.cookies, this.session);
        return results;
    }
    async getDetail(item: any) {
        const url = item.sourceUrl;
        console.log("URL", url, this.phpsession, this.session)
        const res = await axios.head(url, {withCredentials: true, 
            maxRedirects:0, 
            headers: {
                "cookie": this.phpsession|| this.session, //"PHPSESSID=64gcri0h9f6r3al7t7k0sn74s1;"
            },
            validateStatus: (status) => {
            return  status >= 200 && status < 300 || status === 302}
        },
        );
        item.url = res.headers["location"];

        const match = item.url.match(/c=(.*)/i);
        if(match && match.length >1) {
            item.code = match[1]
        }
        return item;
    }
}


(async () => {
    const updater = new Updater();
    await updater.execute();
})();