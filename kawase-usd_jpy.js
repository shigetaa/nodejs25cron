// 為替APIのURL
var API = "http://api.aoikujira.com/kawase/json/usd";

var request = require('request');
var fs = require('fs');

// Web APIにアクセス
request(API, function (err, response, body) {
	if (err || response.statusCode != 200) { console.log("ERROR"); return; }
	// JSONをJSのオブジェクトに変換
	var r = JSON.parse(body);
	var jpy = r["JPY"];
	//console.log(jpy);
	// 為替レートをファイルへ保存(ファイル名には日付をいれる)
	var t = new Date();
	var fname = "USD_JPY_" +
		t.getFullYear() + "-" + (t.getMonth() + 1) +
		"-" + t.getDay() + ".txt";
	var text = "1usd=" + jpy + "jpy";
	console.log(text);
	fs.writeFileSync(fname, text);
});
