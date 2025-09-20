import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ found: false, message: "名前を指定してください" });
  }

  try {
    const url = "https://www.e-typing.ne.jp/ranking/trysc.asp"; // 実際のランキングページURLに変更
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const ranking = [];
    $("table.ranking tr").each((i, el) => {
      if (i === 0) return; // ヘッダー行スキップ
      const cols = $(el).find("td");
      const playerName = $(cols[1]).text().trim();
      const score = $(cols[2]).text().trim();
      if (playerName && score) {
        ranking.push({ name: playerName, score });
      }
    });

    const entry = ranking.find((e) => e.name === name);

    if (entry) {
      res.status(200).json({ found: true, ...entry });
    } else {
      res.status(200).json({ found: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ランキング取得に失敗しました" });
  }
}
