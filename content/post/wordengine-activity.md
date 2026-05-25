---
title: "DiscordにWordEngineの取り組み状況を表示するPreMiD Activityを作ったので紹介"
date: 2026-05-26T01:00:00+09:00
draft: false
author: "のっつ"
description: "PreMiDの導入方法、アクティビティの追加方法を解説"
tags: ["開発", "解説"]
categories: ["開発"]
thumbnail: "/img/posts/wordengine-activity/thumbnail_wordengine.webp"
seo:
  description: "PreMiDの導入方法、アクティビティの追加方法を解説"
  canonical: "https://blog.nottsu.fun/post/wordengine-activity/"
  noindex: false
  image: "/img/posts/wordengine-activity/thumbnail_wordengine.webp"
  thumbnail: "/img/posts/wordengine-activity/thumbnail_wordengine.webp"
---
---
![](/img/posts/wordengine-activity/thumbnail_wordengine.webp)

> [!NOTE]
> 導入方法だけ読みたい方は[導入手順](/post/wordengine-activity/#導入手順)まで飛ばしてください。
## はじめに
Discordには**アクティビティ**（旧名: Rich Presence）という、今遊んでいるゲームや聴いている音楽を自分のプロフィールに表示する機能があります。
![](/img/posts/wordengine-activity/discord_activity.webp)

この機能のおかげで、自分が今何をやっているのかを友達に共有したり、逆に友達が今何をやっているのかを簡単に知ることができます。
![サーバーのユーザー一覧などで名前の下に表示されます](/img/posts/wordengine-activity/discord_activity_min.webp)

高校まではかなり仲が良い人としかDiscordは繋いでいませんでしたが、大学ではStudent Hubというものがあったり、Discordを使用しているサークルが多いという関係で、そこまで親しみがない人とも繋がりができやすくなりました。<br>つまり、自分が色んな人のアクティビティを見る機会が増えたり、自分のアクティビティが他の人に見られる機会が増えるというわけです。

ということで、せっかくなら色んな情報をアクティビティに表示させたい！と思い、弊学1,2年生必修科目のVirtual English Programで毎週取り組むことが必須となっている英語学習アプリ『WordEngine』の取り組み状況をアクティビティに表示できるようにしようと考えました。

## 先行研究（？）の調査と結論

既に同じことをしている人がいないか探してみたところ、いました。

{{< qiita url="https://qiita.com/mendoitarou_/items/8c54a30089ef2ee88ce6" >}}

ただ、こちらの方法はある程度知識がないと使うまでのセットアップが難しいということ、それに加えて作者の方がメンテナンスを終了したと宣言しているため、より簡単な方法で使えるようにしようということで、**PreMiDを利用する形で**新たに作成しました。

## PreMiDってなに？

PreMiDとは、**ブラウザで見ているWebサイトや動画の情報を、Discordのアクティビティにリアルタイムで自動表示できるブラウザ拡張機能**です。オープンソースのため、ルールに従えば誰でもアクティビティの表示対象とするウェブサイトを追加申請することができます。

![PreMiD 公式サイト - premid.app](/img/posts/wordengine-activity/premid_home.webp)

Discordにアクティビティを表示するためには、原則、任意のアプリケーションがPC版のDiscordクライアントに対して情報を送信する必要があります。（データベースに登録されているゲームの場合、Discord側がゲームの起動状況を検出して表示させています。）

しかし、PlayStationやXboxでゲームを遊んでいるという情報や、一部オンラインゲーム（スタレ, NTE等）、Spotifyなどは、それぞれのサービスのアカウントと自分のDiscordアカウントを接続することで、サーバー側で自分のDiscordアカウントに対してアクティビティの表示・更新処理を行ってくれます。<br>*※ここまでにわか知識です。間違ってたらDMかなにかで指摘してください。*

PreMiDは後者の方法でアクティビティを表示できるため、ブラウザに拡張機能をインストールして自分のDiscordアカウントとPreMiDと連携するだけでアクティビティが表示できるようになります。要は、<u>WordEngineの進捗状況を表示するためだけに専用のアプリをPCにインストールしたり起動させておいたりする必要がない</u>、ということです。

## 導入手順
> [!NOTE]
> 今回はGoogle Chromeを用いて説明しますが、Edge, Firefox, Safari, <br>その他Chromium系ブラウザでも利用可能です。OSも何でもいいはずです。

> [!IMPORTANT]
> このプログラムはWordEngineのhtmlから情報を読み取るだけなので、まず起こり得ないとは思いますが、万が一WordEngineやDiscordのアカウント、PCなど何かしらに損害が発生した場合、作者は一切の責任を負いません。<br>自己責任でご利用ください。

1. [PreMiD公式サイトのダウンロードページ](https://premid.app/ja/downloads)を開き、「Chromeに追加」ボタンをクリック
![Edgeなら「Edgeに追加」のように、ブラウザによって表示が変わります](/img/posts/wordengine-activity/01_GetPreMiD.webp)

2. Chrome ウェブストアに飛ばされるので、「Chrome に追加」をクリック
![他のブラウザでも同じような追加するボタンがあるはず](/img/posts/wordengine-activity/02_chromewebstore.webp)

3. 完了すると新しいタブで「Welcome to PreMiD」という画面が表示されるので、<br>「Get Started」→「Connect with Discord」と進む
![](/img/posts/wordengine-activity/03_welcome.webp)
![](/img/posts/wordengine-activity/04_connect.webp)

4. Discordに飛ばされるので、自分のDiscordアカウントにログイン後、「認証」をクリック
![](/img/posts/wordengine-activity/05_auth.webp)

5. PreMiDの画面に戻ったら「Choose Activities」をクリック
![アカウントが違う場合、「Use different account」でもう一度Discordのログインからやり直せます](/img/posts/wordengine-activity/06_choose.webp)

6. デフォルトのアクティビティが提案されるので、必要に応じてクリックで有効/無効を切り替えたあと、「Browse Activity Library」をクリック
![WordEngineの表示だけをしたいなら全部RemoveにしてOK](/img/posts/wordengine-activity/07_manage.webp)

7. [PreMiDのライブラリページ](https://premid.app/ja/library)に飛ばされるので、検索窓に「WordEngine」と入力
![](/img/posts/wordengine-activity/08_library.webp)

8. 検索結果のWordEngineを選択して、「Add Activity」をクリック
![](/img/posts/wordengine-activity/09_add_wordengine.webp)

9. ブラウザ右上の拡張機能アイコンからPreMiDをクリックし、「Open Extensions Page」をクリック
![青丸の場所をクリックしてピン留めすると便利（必須ではない）](/img/posts/wordengine-activity/10_permission.webp)
※画像のようなメッセージがPreMiDの画面に表示されていない場合、下記の文字列をコピーしてアドレスバーに貼り付けてください。<br>chrome://extensions/?id=agjnjboanicjcpenljmaaigopkgdnihi

10. 拡張機能の設定画面が開くので、「ユーザー スクリプトを許可する」をオンにする
![PreMiDがWordEngineで学習した単語数や取り組み中のコースなどを取得するために必要な権限です](/img/posts/wordengine-activity/11_allowuserscript.webp)

以上で完了です。<br>WordEngineを開いて画面上部にこのような表示が出てきたらDiscordにアクティビティが表示されているはずです。
![拡張機能の設定から無効にすることもできます（詳しくは後述）](/img/posts/wordengine-activity/status_display.webp)

## PreMiDの設定
PreMiDを入れると、対応しているウェブサイトでアクティビティを追加しないかという提案を表示してきますが、正直邪魔だなと思うことが多いので無効にする方法も載せておきます。

1. （先述の手順9を参照）PreMiDのメニューを開き、右上の設定アイコンをクリック
![](/img/posts/wordengine-activity/premid_menu.webp)

2. 「Language」を「日本語」に設定したあと、「アクティビティ提案」をオフにする
![WordEngineを開いたときに出てくる「ステータス表示中」の表示も消したいなら「通知」もオフに](/img/posts/wordengine-activity/premid_settings.webp)



## FAQ
- **アクティビティが表示されない**<br>Discordのアカウント設定でアクティビティを共有しない設定になっている可能性があります。「アクティビティのプライバシー」より「アクティビティを共有」がオンになっていること、「アクティビティを表示するサーバー」が「すべてのサーバーで共有」になっていることを確認してください。また、その下の「マイサーバー」でサーバー別に共有設定がオフになっていないかも確認してみてください。
![](/img/posts/wordengine-activity/activity_settings.webp)

- **WordEngineのタブやブラウザを閉じても、Discordへの表示が消えないことがある**<br>即時クリアはPreMiDのプレミアムプランの特典となっていることから、サーバー側の制約によるものと考えられます。消えるまで最長20分かかることがあるようですが、私の経験上、<u>WordEngineのタブを開いた状態で</u>そのタブを閉じるとすぐに消えてくれることが多いです。

## よき英語学習を
これがあなたのWordEngineのモチベーション向上に寄与すれば幸いです。<br>このプログラムを作る時間とこの記事を書く暇があったら何単語学習できたのか、という点には触れないでください...