
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
class Updater {
    session: any;
    cookies : string[];
    async execute() {
        const list = await this.getList();
        
        console.log( await this.getDetail(list[0]))
        // const promises = list.map(x => this.getDetail(x));
        // const data = await Promise.all(promises);
        // //const location = await this.getDetail(list[0]);

        // console.log("foudn location", list);

    }
    async getList(){
        const res = await axios.get("https://gamehunters.club/coin-master/share-links", {withCredentials: true});
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
        console.log("URL", url)
        const res = await axios.head(url, {withCredentials: true, 
            maxRedirects:0, 
            headers: {
                "cookie": "PHPSESSID=64gcri0h9f6r3al7t7k0sn74s1;"
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