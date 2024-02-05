# Expense Tracker

## DEMO

- <https://drive.google.com/file/d/12GeMZraacsmYMHxw3WahTNJy8drGQy3q/view?usp=drive_link>

## 紹介と使い方

- FirebaseとReactNativeを使い、家計簿アプリを作成した。

- FireBaseを使い、支出の登録、削除、編集ができる。

## 工夫した点

- ログイン・サインアップ・ログアウト機能を実装して、アドレスとパスワードを知る家族と共有できるようにした。

- リロードしてもログイン状態を保持するために、`useEffect`を使い、`onAuthStateChanged`を使って、ログイン状態を保持するようにした。

- リロードすると、日付順に並び替えるようにした。

- ログインしていない場合、ログイン画面にリダイレクトするようにした。

- 直近の支出をソートして、表示するようにした。

## 苦戦した点

- ログイン・サインアップ・ログアウト機能を実装するとナビゲーションが複雑になり、WelcomeScreenから家計簿画面に遷移するfunctionを作るのが難しかった。

## 参考にした web サイトなど

- <https://www.udemy.com/course/react-native-the-practical-guide/>

- <https://docs.expo.dev/guides/overview/>

- <https://firebase.google.com/>

- <https://ja.react.dev/>
