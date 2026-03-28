export interface OracleCard {
  id: number;
  name: string;
  keyword: string;
  image: string;
  cardBack: string;
  message: string;
  guidance: string;
  color: string;
}

export const cards: OracleCard[] = [
  {
    id: 1,
    name: "螢石柱",
    keyword: "專注 · 提升 · 靜心",
    image: "cards/01.jpg",
    cardBack: "cards/card-back.png",
    message:
      "對於現況若是處於雜亂的心緒，需要讓自己好好的靜下心來。給自己一個漫長的深呼吸，專心專注穩定思緒。祂希望你走到書店、圖書館，有文字資訊的任何地方，遠離電子產品，讓紙本的香氣與知識慢慢進入腦海裡。",
    guidance:
      "一個字，一段詞，一篇文。細細詳讀，才能更加速的整理自己，並提升更好的你。",
    color: "#2a1f4a",
  },
  {
    id: 2,
    name: "石榴石",
    keyword: "安穩 · 停下 · 休息",
    image: "cards/02.jpg",
    cardBack: "cards/card-back.png",
    message:
      "身體太疲累了，辛苦這陣子的你。受到環境的傷害，心靈上的缺憾，覺得自己不夠好。停下腳步好好深呼吸，該給自己一個好好休息的時間。安穩地躺在床上，享受宇宙與礦靈陪伴的療癒時光。",
    guidance:
      "願有個美夢，願休息後的你更加堅強，更加穩定。",
    color: "#3d1a1a",
  },
  {
    id: 3,
    name: "埃及預言石",
    keyword: "回歸 · 平靜 · 順其自然",
    image: "cards/03.jpg",
    cardBack: "cards/card-back.png",
    message:
      "深呼吸，閉上眼，讓自己腦海放空，讓自己回到那個當初純淨的你，不再接收現實的煩躁與慌亂。放下壓力與束縛，猶如大耳狐的耳朵傾聽那些從來沒注意過的內容。並順其自然無設限的接納宇宙給的畫面、訊息、聲音。",
    guidance:
      "接納那個最安穩的自己，最平靜的自己，心如止水的自己。",
    color: "#3a2d0d",
  },
  {
    id: 4,
    name: "藍閃石",
    keyword: "冷靜 · 修飾言語 · 同理",
    image: "cards/04.jpg",
    cardBack: "cards/card-back.png",
    message:
      "讓自己找個地方，冷靜一下。對於激烈的言語不要有過多的反應，給自己冷靜一段時間。去消化與同理，並調整與包裝自己說出來的話語。語言可以是把利刃，也可以是溫柔的雙手，與其激烈的紛爭，不如好好理解對方。",
    guidance:
      "同理對方的角度後，就可以更加穩定自己。",
    color: "#0d1f3a",
  },
  {
    id: 5,
    name: "絲絨孔雀石",
    keyword: "整理 · 療癒 · 愛自己",
    image: "cards/05.jpg",
    cardBack: "cards/card-back.png",
    message:
      "多久沒整理過去了呢？不管是多大的傷害，多大的遺憾，多少的缺失，試著去理解，冷靜去分析，並將它們放下。讓這些傷痛給予細心又溫暖的治療。藉由宇宙的能量癒合傷口，再給自己一個原諒的機會。",
    guidance:
      "未來的你才會更加成長，更加完美，更愛那個升級的自己。",
    color: "#0d2a1a",
  },
  {
    id: 6,
    name: "光譜拉長石",
    keyword: "規劃 · 夢想 · 前進",
    image: "cards/06.jpg",
    cardBack: "cards/card-back.png",
    message:
      "恭喜你，可以開始規劃夢想，就像喜鵲一樣快樂的自由自在。勇往直前不要畏懼，夢想離你不遠了，開始執行吧。好好規劃，過程會有一些意想不到的事情。不論是好是壞，都是美麗的過程，沒遇過都不會了解。",
    guidance:
      "可以很確定一切都很快樂，期待並等待豐碩果實的收成。動起來吧，規劃夢想從現在開始。",
    color: "#0d1a3a",
  },
  {
    id: 7,
    name: "藍晶石",
    keyword: "原始能量 · 直覺力 · 啟動",
    image: "cards/07.jpg",
    cardBack: "cards/card-back.png",
    message:
      "所有的生物種，都來自於大海，海洋滋養了土地，孕育了所有的生物。當然也包括你自己，擁有原始能量的身體，存有乾淨且單純的無垢能量。開啟直覺力使用這能量是最快速的路徑。",
    guidance:
      "別浪費了自身存在的原始能量，一同激發出來吧。想像海洋激發這能量，當你看見它們，就請與它們開啟連結吧。",
    color: "#031a3a",
  },
  {
    id: 8,
    name: "庭園水晶",
    keyword: "停下 · 靜心 · 大自然",
    image: "cards/08.jpg",
    cardBack: "cards/card-back.png",
    message:
      "你該去戶外走走了喔，遠離塵埃，遠離紛擾。欣賞著大自然給予的知識與能量。給自己一個與大自然相處的空間，好好呼吸，好好靜心。",
    guidance:
      "進入冥想後，翻開你與能量連結的第一頁吧。",
    color: "#0d2a0d",
  },
  {
    id: 9,
    name: "銀曜石獨角獸",
    keyword: "預備 · 新目的 · 接收訊息",
    image: "cards/09.jpg",
    cardBack: "cards/card-back.png",
    message:
      "事情告一段落了，可以開始準備新的目標囉。冥想的時候可以跟著獨角獸一同去宇宙散步，靜下心來，仔細聽身體的聲音，或是到各處翻翻書。到大自然到處散散步，隨時注意閃過的圖像或訊息。",
    guidance:
      "通常那些都是宇宙與大地給予你的禮物。想像像獨角獸一樣在訊息海裡奔馳，尋找新的目標，找尋那最想實現的夢想。",
    color: "#1a1a2d",
  },
  {
    id: 10,
    name: "銀曜石貔貅",
    keyword: "豐收 · 實現 · 成果",
    image: "cards/10.jpg",
    cardBack: "cards/card-back.png",
    message:
      "恭喜你，為自己辛苦的你給一聲歡呼吧！不管過程多艱辛，多麼壓抑，那些都過去了。新的豐收終就會到來，準備好拿桶子裝滿幸福與福氣了嗎？",
    guidance:
      "聽到錢錢在撒落叮噹聲，即將掌握這美好的時刻就是你。開始接收這豐碩的果實，品嘗這甜美又美味的成果。準備放煙火吧！",
    color: "#2d2010",
  },
  {
    id: 11,
    name: "超級七",
    keyword: "相信 · 自信 · 直覺力",
    image: "cards/11.jpg",
    cardBack: "cards/card-back.png",
    message:
      "給自己多一點信心，看著超級七礦石給予你的能量，相信自己會做得更好，才能獲得更多的訊息。靜下心來，深呼吸，宇宙將會帶領你更多的連結。",
    guidance:
      "當心如止水時，不要畏懼，不要猜忌。相信腦海的第一個訊息，那就是開啟你直覺力的最佳方法。",
    color: "#2d1a4a",
  },
  {
    id: 12,
    name: "藍閃石龍龜",
    keyword: "放鬆 · 休息 · 暫停一下",
    image: "cards/12.jpg",
    cardBack: "cards/card-back.png",
    message:
      "嘿嘿嘿～龍龜伸出小手拍拍你的肩膀說，這陣子辛苦你了，不管多難過多辛苦，是該好好放鬆一下了。",
    guidance:
      "快來快來～放鬆的日子可是很好玩的喔。我們一起去走走散散步吧。",
    color: "#0a2a2a",
  },
  {
    id: 13,
    name: "粉奧寶狐狸",
    keyword: "直覺力 · 運用 · 判斷",
    image: "cards/13.jpg",
    cardBack: "cards/card-back.png",
    message:
      "每個人都有強大的直覺力，由宇宙創造的你，來自於自身最原始的能量，只是很多內心聲音都被雜亂的世界影響。先靜心下來，運用直覺力，去細細觀察身邊的任何狀況，像狐狸一樣心思敏感。",
    guidance:
      "好好學習直覺力的運用，多練習冥想也能幫助直覺力的提升，能讓自己在生活中獲得更多的驚喜與連結。",
    color: "#3a1a2a",
  },
  {
    id: 14,
    name: "銀曜石狐狸",
    keyword: "重新 · 整理 · 提升價值",
    image: "cards/14.jpg",
    cardBack: "cards/card-back.png",
    message:
      "該重新打理自己，就像香香的狐狸那樣，把自己整理好。外在的形象變化，會讓大家有耳目一新的感覺，並且自己也會增加自信心。換個髮型，換件有質感的衣服，或是增加一點香氣在身上。",
    guidance:
      "擁有跟以往不同的氣質與質感，這些不只會讓身邊的人多欣賞你一眼，也會提升自己的自信價值。你很棒的，小小的改變第一步會更棒。",
    color: "#1a1a1a",
  },
  {
    id: 15,
    name: "水草瑪瑙獨角獸",
    keyword: "知心 · 聊天 · 對話",
    image: "cards/15.jpg",
    cardBack: "cards/card-back.png",
    message:
      "有時候，我們不需要馬上解決所有問題，只需要一個懂我們的人。好好聊聊，不必獨自承受一切情緒與壓力。找一位你信任的朋友、親人，或者是能傾聽你的人。",
    guidance:
      "讓心裡的話有個出口，說出口的那一刻，你會發現自己沒那麼孤單。因為你的存在本就值得被傾聽。",
    color: "#0d2a1a",
  },
  {
    id: 16,
    name: "銀曜石燈籠狐狸",
    keyword: "接受 · 變化 · 成長契機",
    image: "cards/16.jpg",
    cardBack: "cards/card-back.png",
    message:
      "生命總是在變動中前行，新的事物與事件或許來得突然、帶點不安，卻也可能是成長的契機。敞開心扉去迎接變化，你會發現，原來未知不一定是可怕的。",
    guidance:
      "不要抗拒變化，而是學會與它共舞，信任自己能在每一次新的經歷中找到光與力量，讓每個當下成為自我蛻變的契機。",
    color: "#2d1a0d",
  },
  {
    id: 17,
    name: "膠花狐狸",
    keyword: "流動 · 療癒 · 釋放",
    image: "cards/17.jpg",
    cardBack: "cards/card-back.png",
    message:
      "水，是最溫柔卻最強大的療癒者。它懂得流動，懂得包容，也懂得帶走不再需要的情緒與負擔。現在是時候與水的能量連結，無論是一場靜靜的泡澡、一段靠海的散步，或是端坐聆聽水聲，都能幫助你釋放壓力。",
    guidance:
      "想像你的情緒隨著水流緩緩沖刷，帶你走向更清澈、更柔軟的自己。水，是你內在重生的起點。",
    color: "#0d1f3a",
  },
  {
    id: 18,
    name: "紅紋石球",
    keyword: "準備好了 · 啟程 · 力量",
    image: "cards/18.jpg",
    cardBack: "cards/card-back.png",
    message:
      "你已經準備好了，不需要再等待完美的時機。像戰車一樣，點燃內在的意志與勇氣，全速朝著目標前進。即使路途中有不確定與挑戰，只要你堅定地前行，行動本身就是改變的催化劑。",
    guidance:
      "停止猶豫，相信自己擁有突破現狀的力量。命運早已為你準備好了跑道。",
    color: "#3d0d1a",
  },
  {
    id: 19,
    name: "太陽石",
    keyword: "初衷 · 覺察 · 智慧",
    image: "cards/19.jpg",
    cardBack: "cards/card-back.png",
    message:
      "接收宇宙傳遞的訊息並加以吸收轉化，提升感知能力與直覺判斷。強化內在連結與覺察，指引行動方向，穩定心念與情緒流動。那些看似偶然的巧合，其實蘊藏著引導與啟發。",
    guidance:
      "這張卡提醒你：信任直覺，放下懷疑，讓宇宙的頻率與你共振。透過覺察與吸收，你將更貼近真實的自己。",
    color: "#3d2a0d",
  },
  {
    id: 20,
    name: "虎眼石貓頭鷹",
    keyword: "接收 · 直覺 · 引導",
    image: "cards/20.jpg",
    cardBack: "cards/card-back.png",
    message:
      "在忙碌與目標堆疊的生活中，你常常忘記為什麼出發。請暫時放下外界的聲音，回到最初的渴望與動力。開始規劃安排休息，休息也是心靈的整頓。",
    guidance:
      "休息不是逃避，學習像貓頭鷹一樣的智慧。試著調整節奏，就能讓你走得更穩、更遠。",
    color: "#2d1a0d",
  },
];
