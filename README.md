# mytodoapp
![mytodo (1)](https://user-images.githubusercontent.com/71926129/102877836-b81cc180-448a-11eb-962d-90577015c93d.png)
AWSで公開してます。　https://alb.enjoy-mytodo.work
# 概要
・日常のtodoを作成するアプリです  

・ログインボーナスや達成ポイントでtodocardをカスタマイズできる機能、追加でtodoをする上で楽しめる機能を追加予定
# 作成目的
・活動記録、目標の明確化  

期限前日にメールを送信する機能により自分の活動記録をつけ、やる事の明確化をできるようなものを作りたかった。  

・技術のアウトプット  

SPA、orm,AWSのアウトプットを意識して作成

# 使用技術
__フロント__  
 ・javascript  
 ・ejs  
 ・css 
 
__バックエンド__  
 ・node v14.15.1 express  
 ・mysql v5.7  

__インフラ__  
・本番環境  
AWS(EC2,RDS,Route53,VPC,ALB,ACM)
nginx  

※httpアクセスはhttpsにリダイレクト  


![スクリーンショット 2020-12-13 17 41 11](https://user-images.githubusercontent.com/71926129/102876308-5e1afc80-4488-11eb-8c8b-7646cc0a860c.jpg)

・開発環境  
docker,nginx,supervisorを使用  

本番環境では作成期限のためECR,ECSではなくEC2使用

# 機能
・CRUD  
・中間テーブルによるいいね機能  
・SPA  
・管理者機能  
・jwttokenによる認証  
・外部APIの使用(追加予定)  
・node-schduleによるDB処理  

# localでの使用方法
1. app.env,mysql.envの作成  
.env.exampleに沿って作成  

2. コンテナのbuild
```bash
cd myapp 
docker-compose up -d
```
3. npmモジュールのインストール、ormのマイグレーション  
```bash
npm install
npx sequelize db:migrate
```
# 感想
今回
