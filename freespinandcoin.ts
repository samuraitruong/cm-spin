
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";

class Crawler {
  
    async execute() {
        const list = await this.getList();
        
        
        
        const data = list.map(x => {
            const m = x.url.match(/c=([^&]*)/i);
            if(m && m.length>1) {
                x.code = m[1]
            }
            console.log(x)
            return x});

        const json = JSON.stringify(data, null, 4);
        const message = {
                "message": `Update data file at: ${new Date().toISOString()} - [ci skip]`,
                "committer": {
                  "name": "Truong Nguyen`",
                  "email": "samuraitruong@hotmail.com"
                },
                sha: "",
                "content": Buffer.from(json).toString("base64")
        }
        const fileUrl = "https://api.github.com/repos/samuraitruong/cm-spin/contents/public/freespinandcoin.blogspot.com.json";
        try{
        const dataFile =  await axios.get(fileUrl);
        message.sha = dataFile.data.sha;
        }
        catch(e) {

        }
        const result = await axios.put(fileUrl, message, {
            headers: {
                authorization: "token " + process.env.GH_TOKEN
            }
        });
        console.log(result.data);
    }
    
    async getList(){
        const res = await axios.get("https://freespinandcoin.blogspot.com/2018/11/coin-master-free-spin-and-coin-links.html#todays_free_spin_and_coin_links");
        // console.log(res.headers);
        const $ = cheerio.load(res.data);
        const links = $("p.plink a").toArray();
        const results = links.map(el => {
            return {
                sourceUrl: "https://freespinandcoin.blogspot.com/2018/11/coin-master-free-spin-and-coin-links.html#todays_free_spin_and_coin_links",
                title:  $(el).text(),
                url: $(el).attr("href"),
                code:""
                // time: $(el).find(".timeago").attr("datetime")
            }
        });
        return results;
    }
   
}


(async () => {
    const updater = new Crawler();
    await updater.execute();
})();