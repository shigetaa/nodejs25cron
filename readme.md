# 定期的にダウンロードする

## 定期的に実行する
### Linux / Mac OS X の場合

Linux / Mac OS X の場合 で定期実行する場合
crontab コマンドを使って定期的にプログラムを実行できます。
crontab コマンドで -e オプションをつけて
crontab の設定画面をひらきます。

```bash
crontab -e
```

例えば、毎日、朝の7時に前項で作成した、`kawase-usd_jpy.js` を実行する様に設定してみます

```
0 7 * * * /usr/bin/node /path/to/kawase-usd_jpy.js
```
#### 環境変数に注意

cron の実行時には、環境変数が最低限しか設定されません。そのため、パスが通らずコマンドが実行出来ない、Node.js のモジュールパスが見つからないなどの問題が発生する事があります。
そこで、crontab では設定ファイルの冒頭で環境変数を設定できるようになっています。

```
PATH=/usr/local/bin:/usr/bin/:/bin
NODE_PATH=/usr/lib/node_modules/

0 7 * * * /usr/bin/node /path/to/kawase-usd_jpy.js
```

あるいは、同じですが、各行で個別の環境変数を設定することもできます。

```
0 7 * * * export NODE_PATH=/usr/lib/node_modules/ && /usr/bin/node /path/to/kawase-usd_jpy.js
```

#### カレントディレクトリに注意

cron 実行時には、カレントディレクトリがユーザーのホームディレクトリとなります。そのためログ等を保存する際には、フルパスを指定するか、カレントディレクトリを変更するなどの対策が必要となります。
そのため、今回のプログラムを`cron`に登録すると、為替情報がユーザーのホームディレクトリに保存されてしまうことになります。スクリプトと同じディレクトリにログファイルを保存するには、次の様な`kawase.sh`シェルスクリプトをかいて実行環境を整えたうえで`cron`に登録するといいでしょう
```bash
#!/bin/sh
// パスを設定
PATH=/usr/local/bin:/usr/bin/:/bin
NODE_PATH=/usr/lib/node_modules/
// カレントディレクトリをスクリプトのパスに変更
cd `dirname $0`
// 為替スクリプトを実行
node kawase-usd_jpy.js
```

```
0 7 * * * /path/to/kawase.sh
```

### Windows の場合

Windows の「タスクスケジューラ」には、GUIが用意されているので画面の指示に沿って、プログラミングの定期実行を設定する事ができます。