import type { AvatarTone, RoomTone, Voice } from "@/lib/api/types";
import type { AnimalName } from "@/lib/icons";

type PersonaPost = {
  body: string;
  timeLabel: string;
  reactions: Voice["reactions"];
};

type Persona = {
  id: string;
  name: string;
  roomName: string;
  roomTone: RoomTone;
  avatar: AnimalName;
  avatarSrc: string;
  avatarTone: AvatarTone;
  posts: PersonaPost[];
};

export const personaPostSlotMs = 45_000;

const personas: Persona[] = [
  {
    id: "persona-uc-student",
    name: "はる",
    roomName: "潰瘍性大腸炎",
    roomTone: "terra",
    avatar: "bird",
    avatarSrc: "/assets/animals/bird.png",
    avatarTone: "cream",
    posts: [
      {
        body: "朝の講義前にトイレの場所を確認してから席に座るようになりました。\nそれだけで少し安心できます。",
        timeLabel: "たった今",
        reactions: [
          { kind: "understand", label: "読んだよ", count: 18 },
          { kind: "leaf", label: "わかる", count: 12 },
        ],
      },
      {
        body: "就活の面接で病気のことを話すか、今日もメモに書いて考えています。\n正解がなくて、少し疲れます。",
        timeLabel: "4分前",
        reactions: [
          { kind: "leaf", label: "わかる", count: 15 },
          { kind: "thanks", label: "ありがとう", count: 6 },
        ],
      },
      {
        body: "今日は薬を飲む時間を忘れなかった。それだけだけど、自分の中では小さく勝ちです。",
        timeLabel: "12分前",
        reactions: [
          { kind: "acknowledge", label: "そう", count: 10 },
          { kind: "understand", label: "読んだよ", count: 8 },
        ],
      },
    ],
  },
  {
    id: "persona-cd-cook",
    name: "みずき",
    roomName: "クローン病",
    roomTone: "plum",
    avatar: "fox",
    avatarSrc: "/assets/animals/fox.png",
    avatarTone: "plum",
    posts: [
      {
        body: "実習で揚げ物を見ると、食べたい気持ちと怖さが同時に来ます。\nでも、作ることまで嫌いにはなりたくないです。",
        timeLabel: "2分前",
        reactions: [
          { kind: "understand", label: "読んだよ", count: 14 },
          { kind: "thanks", label: "ありがとう", count: 9 },
        ],
      },
      {
        body: "外食の予定がある日は、先にメニューを見ます。\n気にしすぎと言われるけど、準備しておくと帰り道が楽です。",
        timeLabel: "8分前",
        reactions: [
          { kind: "leaf", label: "わかる", count: 12 },
          { kind: "understand", label: "読んだよ", count: 7 },
        ],
      },
      {
        body: "同じ病気の人でも食べやすいメニューを、いつか自分の店で出したいです。",
        timeLabel: "15分前",
        reactions: [
          { kind: "thanks", label: "ありがとう", count: 11 },
          { kind: "hand", label: "そっと", count: 4 },
        ],
      },
    ],
  },
  {
    id: "persona-mg-accounting",
    name: "しおり",
    roomName: "重症筋無力症",
    roomTone: "plum",
    avatar: "owl",
    avatarSrc: "/assets/animals/owl.png",
    avatarTone: "plum",
    posts: [
      {
        body: "夕方になると、画面の数字が二重に見える日があります。\n午前中に大事な作業を寄せるようにしました。",
        timeLabel: "5分前",
        reactions: [
          { kind: "understand", label: "読んだよ", count: 13 },
          { kind: "leaf", label: "わかる", count: 7 },
        ],
      },
      {
        body: "上司にどこまで説明するか、何度も言葉を選び直しています。\n病名より、困る場面を伝える方が話しやすいかもしれません。",
        timeLabel: "11分前",
        reactions: [
          { kind: "thanks", label: "ありがとう", count: 8 },
          { kind: "understand", label: "読んだよ", count: 6 },
        ],
      },
      {
        body: "今日は帰り道の階段を避けて、遠回りだけどエレベーターのある出口にしました。",
        timeLabel: "18分前",
        reactions: [
          { kind: "acknowledge", label: "そう", count: 9 },
          { kind: "hand", label: "そっと", count: 3 },
        ],
      },
    ],
  },
  {
    id: "persona-ra-parent",
    name: "まどか",
    roomName: "関節リウマチ",
    roomTone: "gold",
    avatar: "bear",
    avatarSrc: "/assets/animals/bear.png",
    avatarTone: "cream",
    posts: [
      {
        body: "朝、指がこわばる日は、子どもの水筒を開けるだけで時間がかかります。\nでも今日は自分で開けてくれました。",
        timeLabel: "7分前",
        reactions: [
          { kind: "leaf", label: "わかる", count: 16 },
          { kind: "thanks", label: "ありがとう", count: 6 },
        ],
      },
      {
        body: "幼稚園の行事を休む連絡をしました。\n痛みより、申し訳なさの方が残る日があります。",
        timeLabel: "13分前",
        reactions: [
          { kind: "understand", label: "読んだよ", count: 12 },
          { kind: "hand", label: "そっと", count: 5 },
        ],
      },
      {
        body: "今日は買い物をネットにしました。手を守る選択も、ちゃんと家事だと思うことにします。",
        timeLabel: "21分前",
        reactions: [
          { kind: "acknowledge", label: "そう", count: 10 },
          { kind: "leaf", label: "わかる", count: 8 },
        ],
      },
    ],
  },
  {
    id: "persona-t1d-parent",
    name: "ゆか",
    roomName: "1型糖尿病",
    roomTone: "default",
    avatar: "turtle",
    avatarSrc: "/assets/animals/turtle.png",
    avatarTone: "moss",
    posts: [
      {
        body: "部活の日は、低血糖のことを考えて持ち物が増えます。\n本人が嫌がらない範囲を、毎回探しています。",
        timeLabel: "9分前",
        reactions: [
          { kind: "understand", label: "読んだよ", count: 12 },
          { kind: "thanks", label: "ありがとう", count: 8 },
        ],
      },
      {
        body: "修学旅行の説明会で、先生にどこまでお願いするか悩みました。\n守りたいけど、本人の自立も邪魔したくないです。",
        timeLabel: "17分前",
        reactions: [
          { kind: "leaf", label: "わかる", count: 9 },
          { kind: "hand", label: "そっと", count: 4 },
        ],
      },
      {
        body: "親の会で、同じことで悩んだ人の話を聞けました。\n検索より、誰かの経験の方が落ち着く日があります。",
        timeLabel: "24分前",
        reactions: [
          { kind: "thanks", label: "ありがとう", count: 13 },
          { kind: "understand", label: "読んだよ", count: 6 },
        ],
      },
    ],
  },
];

export function getLivePersonaVoices(slot: number): Voice[] {
  return personas.slice(0, 4).map((_, index) => {
    const personaIndex = (slot + index) % personas.length;
    const activePersona = personas[personaIndex];
    const post = activePersona.posts[(slot + index) % activePersona.posts.length];

    return {
      id: `live-${activePersona.id}-${slot}-${index}`,
      authorId: activePersona.id,
      authorName: activePersona.name,
      authorAvatar: activePersona.avatar,
      authorAvatarSrc: activePersona.avatarSrc,
      authorAvatarTone: activePersona.avatarTone,
      roomName: activePersona.roomName,
      roomTone: activePersona.roomTone,
      body: post.body,
      visibility: "all",
      reactions: post.reactions,
      commentCount: index % 2 === 0 ? 1 : 0,
      createdAt: "2026-06-21T18:00:00+09:00",
      timeLabel: post.timeLabel,
    };
  });
}

const ambientAuthors: Array<{
  id: string;
  name: string;
  avatar: AnimalName;
  avatarSrc: string;
  avatarTone: AvatarTone;
}> = [
  { id: "ambient-rina", name: "りな", avatar: "rabbit", avatarSrc: "/assets/animals/rabbit.png", avatarTone: "terra" },
  { id: "ambient-nao", name: "なお", avatar: "cat", avatarSrc: "/assets/animals/cat.png", avatarTone: "moss" },
  { id: "ambient-saki", name: "さき", avatar: "bird", avatarSrc: "/assets/animals/bird.png", avatarTone: "cream" },
  { id: "ambient-kana", name: "かな", avatar: "fox", avatarSrc: "/assets/animals/fox.png", avatarTone: "plum" },
  { id: "ambient-yuto", name: "ゆうと", avatar: "owl", avatarSrc: "/assets/animals/owl.png", avatarTone: "plum" },
  { id: "ambient-mio", name: "みお", avatar: "turtle", avatarSrc: "/assets/animals/turtle.png", avatarTone: "moss" },
  { id: "ambient-ren", name: "れん", avatar: "bear", avatarSrc: "/assets/animals/bear.png", avatarTone: "cream" },
  { id: "ambient-emi", name: "えみ", avatar: "hedgehog", avatarSrc: "/assets/animals/hedgehog.png", avatarTone: "terra" },
  { id: "ambient-akira", name: "あきら", avatar: "cat", avatarSrc: "/assets/animals/cat.png", avatarTone: "cream" },
  { id: "ambient-yoko", name: "ようこ", avatar: "rabbit", avatarSrc: "/assets/animals/rabbit.png", avatarTone: "moss" },
];

const ambientPosts: Array<{
  roomName: string;
  roomTone: RoomTone;
  body: string;
  timeLabel: string;
}> = [
  {
    roomName: "ベーチェット病",
    roomTone: "terra",
    body: "口内炎が続くと、ただの疲れなのか再燃なのか分からなくなります。\n今日は早めに休むことにしました。",
    timeLabel: "18分前",
  },
  {
    roomName: "多発性硬化症",
    roomTone: "plum",
    body: "足のしびれがある日は、駅の階段を避けるルートを先に見ます。\n遠回りでも、その方が安心できます。",
    timeLabel: "26分前",
  },
  {
    roomName: "診断前・検査待ち",
    roomTone: "plum",
    body: "病名がまだ分からない時期が、いちばん検索してしまいます。\n同じように待っている人の声があるだけで少し落ち着きます。",
    timeLabel: "34分前",
  },
  {
    roomName: "下痢・トイレの不安",
    roomTone: "plum",
    body: "初めて行く場所は、着いたら先にトイレを確認します。\nそれだけで、予定を楽しめる日があります。",
    timeLabel: "42分前",
  },
  {
    roomName: "強い疲れ・倦怠感",
    roomTone: "default",
    body: "説明しづらい疲れの日は、予定を減らす理由を考えるだけで疲れます。\n今日はひとつだけできれば十分にします。",
    timeLabel: "51分前",
  },
  {
    roomName: "乳がん",
    roomTone: "terra",
    body: "仕事の人にどこまで話すか、何度も文面を書き直しました。\n病気より、これから困る場面を伝える方が話しやすそうです。",
    timeLabel: "1時間前",
  },
  {
    roomName: "肺高血圧症",
    roomTone: "plum",
    body: "坂道を見るだけで少し緊張します。\n今日はバス停をひとつ手前にして、歩く距離を短くしました。",
    timeLabel: "1時間前",
  },
  {
    roomName: "眠れない夜",
    roomTone: "plum",
    body: "夜になると急に不安が大きくなる日があります。\n誰かの短い投稿を読むだけで、ひとりではない感じがします。",
    timeLabel: "1時間前",
  },
  {
    roomName: "医療費の不安",
    roomTone: "gold",
    body: "治療の話とお金の話が同時に来ると、頭がいっぱいになります。\n制度のことを聞くのも、勇気がいります。",
    timeLabel: "2時間前",
  },
  {
    roomName: "シェーグレン症候群",
    roomTone: "default",
    body: "乾きは見た目では伝わりにくくて、うまく説明できない日があります。\n水を持ち歩くことが、少しお守りみたいです。",
    timeLabel: "2時間前",
  },
  {
    roomName: "皮膚症状",
    roomTone: "terra",
    body: "赤みが出る日は、鏡を見る前に少し構えてしまいます。\n今日はマスクと帽子で、外に出られました。",
    timeLabel: "2時間前",
  },
  {
    roomName: "ALS",
    roomTone: "default",
    body: "できなくなったことを数える日もあります。\nでも今日は、家族と必要な支援の話を少しだけ進められました。",
    timeLabel: "3時間前",
  },
  {
    roomName: "大腸がん",
    roomTone: "gold",
    body: "検査の前日は、悪い想像ばかりしてしまいます。\n持ち物を先に準備すると、少しだけ手が動きます。",
    timeLabel: "3時間前",
  },
  {
    roomName: "関節痛・こわばり",
    roomTone: "gold",
    body: "朝の手が動きづらい日は、家事の順番を変えます。\nできない日ではなく、ゆっくり始める日と思いたいです。",
    timeLabel: "3時間前",
  },
  {
    roomName: "家族に話すこと",
    roomTone: "terra",
    body: "心配させたくなくて、元気そうに話してしまいます。\nでも本当は、少しだけ聞いてほしい日でした。",
    timeLabel: "4時間前",
  },
  {
    roomName: "外出・旅行の不安",
    roomTone: "plum",
    body: "旅行に誘われるとうれしいのに、先に体調の心配をしてしまいます。\n断る前に、短い予定なら行けるか考えています。",
    timeLabel: "4時間前",
  },
  {
    roomName: "ネフローゼ症候群",
    roomTone: "gold",
    body: "むくみが出ると、体重計に乗るのが怖くなります。\n今日は数字を見る前に、昨日より歩けたことを思い出しました。",
    timeLabel: "5時間前",
  },
  {
    roomName: "てんかん",
    roomTone: "terra",
    body: "発作のことを職場にどう伝えるか迷っています。\n全部ではなく、困る場面だけ話す練習をしています。",
    timeLabel: "5時間前",
  },
  {
    roomName: "妊娠・出産の不安",
    roomTone: "terra",
    body: "治療を続けながら将来を考えると、聞きたいことが増えます。\n診察で聞くことを、今日は3つだけメモしました。",
    timeLabel: "昨日",
  },
  {
    roomName: "患者会に行く前",
    roomTone: "default",
    body: "患者会に行ってみたい気持ちと、場違いだったらどうしようという気持ちがあります。\nまずは体験談を読むところから始めます。",
    timeLabel: "昨日",
  },
  {
    roomName: "見えづらさ",
    roomTone: "plum",
    body: "画面の文字が追いづらい日は、明るさを下げて少し休みます。\n急がない作業は、午前に回すことにしました。",
    timeLabel: "昨日",
  },
  {
    roomName: "血液がん",
    roomTone: "plum",
    body: "入院の予定が決まると、家のことが急に気になります。\n小さな準備リストを作るだけで、少し呼吸が戻ります。",
    timeLabel: "昨日",
  },
  {
    roomName: "サルコイドーシス",
    roomTone: "gold",
    body: "経過観察と言われても、何もしなくていいのか不安になります。\n次に聞くことを、忘れないように残しました。",
    timeLabel: "昨日",
  },
  {
    roomName: "通院前の不安",
    roomTone: "terra",
    body: "診察室に入ると、聞きたかったことが抜けてしまいます。\n今日はメモを一番上に置いて行きます。",
    timeLabel: "昨日",
  },
];

export function getAmbientTimelineVoices(): Voice[] {
  return ambientPosts.map((post, index) => {
    const author = ambientAuthors[index % ambientAuthors.length];
    return {
      id: `ambient-${index + 1}`,
      authorId: author.id,
      authorName: author.name,
      authorAvatar: author.avatar,
      authorAvatarSrc: author.avatarSrc,
      authorAvatarTone: author.avatarTone,
      roomName: post.roomName,
      roomTone: post.roomTone,
      body: post.body,
      visibility: "all",
      reactions: [
        { kind: "understand", label: "読んだよ", count: 6 + (index % 9) },
        { kind: "leaf", label: "わかる", count: 2 + (index % 7) },
      ],
      commentCount: index % 3 === 0 ? 1 : 0,
      createdAt: "2026-06-21T18:00:00+09:00",
      timeLabel: post.timeLabel,
    };
  });
}
