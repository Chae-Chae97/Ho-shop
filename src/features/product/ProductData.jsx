const Products = [
  {
    id: 1,
    name: 'マッカラン 18年 シェリーオーク',
    price: 35000,
    image: '/images/맥캘란.jpg',
    category: 'ウイスキー',
    description: 'スコットランドのスペイサイド地方のプレミアムシングルモルトウイスキーで、シェリーオーク樽で18年間熟成され、豊かで深い味わいと滑らかなフィニッシュが特徴です。',
  },
  {
    id: 2,
    name: 'グレンフィディック 18年 シングルモルト',
    price: 10500,
    image: '/images/글렌피딕.jpg',
    category: 'ウイスキー',
    description: 'フルーティーな香りとナッツの香りが調和した滑らかなシングルモルトウイスキーで、バランスの取れた味わいと長い余韻が印象的です。',
  },
  {
    id: 3,
    name: 'バルヴェニー ダブルウッド 12年',
    price: 7000,
    image: '/images/발베니.jpg',
    category: 'ウイスキー',
    description: '2種類のオーク樽で熟成させ、バニラとスパイスの風味が調和した滑らかなシングルモルトウイスキーです。',
  },
  {
    id: 4,
    name: 'ジョニーウォーカー ブルーラベル',
    price: 18000,
    image: '/images/블루라벨.jpg',
    category: 'ウイスキー',
    description: '世界的に有名なブレンデッドスコッチウイスキーの最高級ラベルで、希少な原酒を使用し、滑らかで深い味わいを誇ります。',
  },
  {
    id: 5,
    name: 'メーカーズマーク',
    price: 3000,
    image: '/images/메이커스.jpg',
    category: 'ウイスキー',
    description: 'ケンタッキーバーボンウイスキーで、甘いバニラとキャラメルの香りが特徴で、滑らかな味わいを提供します。',
  },
  {
    id: 6,
    name: 'ワイルドターキー レアブリード',
    price: 5000,
    image: '/images/와일드터키.jpg',
    category: 'ウイスキー',
    description: '豊かで強烈なバニラ、オークの香りとスパイシーな味わいが調和したプレミアムバーボンウイスキーです。',
  },
  {
    id: 7,
    name: 'バッファロートレース',
    price: 3500,
    image: '/images/버팔로.jpg',
    category: 'ウイスキー',
    description: 'アメリカのケンタッキー産バーボンウイスキーで、バランスの取れた甘さとスパイスが調和し、飲みやすい滑らかな味わいを誇ります。',
  },
  {
    id: 8,
    name: 'ウッドフォードリザーブ',
    price: 12000,
    image: '/images/우드포드.jpg',
    category: 'ウイスキー',
    description: 'プレミアムケンタッキーバーボンで、複雑なフルーツとオークの香り、スパイスが調和した深い風味を持ちます。',
  },
  {
    id: 9,
    name: '山崎 12年',
    price: 15000,
    image: '/images/야마자키.jpg',
    category: 'ウイスキー',
    description: '日本初のシングルモルトウイスキーで、花の香りと果物の香りが豊かで、滑らかな味わいと長い余韻が特徴です。',
  },
  {
    id: 10,
    name: '白州 12年',
    price: 15000,
    image: '/images/하쿠슈.jpg',
    category: 'ウイスキー',
    description: '清涼感のあるハーブと果物の香りが特徴の日本製シングルモルトウイスキーで、さわやかですっきりとした味わいを提供します。',
  },
  {
    id: 11,
    name: '響 ハーモニー',
    price: 7500,
    image: '/images/히비키.jpg',
    category: 'ウイスキー',
    description: '様々なモルトとグレーンウイスキーが調和してブレンドされた日本のウイスキーで、滑らかでエレガントな味わいと香りを誇ります。',
  },
  {
    id: 12,
    name: '甘紅露',
    price: 8200,
    image: '/images/감홍로.jpg',
    category: '伝統酒',
    description: '中国の伝統的な高粱酒で、甘くて濃厚な香りと滑らかな味わいが特徴です。',
  },
  {
    id: 13,
    name: '梨薑酒',
    price: 6100,
    image: '/images/이강주.jpg',
    category: '伝統酒',
    description: '韓国の伝統的な薬酒で、甘美な香りと滑らかな味わいが調和した薬酒です。',
  },
  {
    id: 14,
    name: '火堯 53',
    price: 5000,
    image: '/images/화요.jpg',
    category: '伝統酒',
    description: '韓国の蒸留式焼酎の代表的なブランドで、すっきりとして滑らかな喉越しが特徴です。',
  },
  {
    id: 15,
    name: '安東焼酎',
    price: 3500,
    image: '/images/안동소주.jpg',
    category: '伝統酒',
    description: '慶尚北道安東地方の伝統焼酎で、深くて濃厚な味わいと香りを誇ります。',
  },
  {
    id: 16,
    name: 'エックスレイテッド',
    price: 3600,
    image: '/images/엑스레이티드.jpg',
    category: 'リキュール',
    description: '強烈な味わいと香りを持つリキュールで、カクテルのベースとして主に使用されます。',
  },
  {
    id: 17,
    name: 'マリブ',
    price: 2900,
    image: '/images/말리부.jpg',
    category: 'リキュール',
    description: 'ココナッツの香りがする甘いラムベースのリキュールで、カクテルによく使用されます。',
  },
  {
    id: 18,
    name: 'ベイリーズ',
    price: 3200,
    image: '/images/베일리스.jpg',
    category: 'リキュール',
    description: 'アイリッシュクリームリキュールで、滑らかで甘いクリームとウイスキーの味わいが調和しています。',
  },
  {
    id: 19,
    name: 'イェーガーマイスター',
    price: 3400,
    image: '/images/예거마이스터.jpg',
    category: 'リキュール',
    description: 'ハーブとスパイスが調和したドイツ産リキュールで、強烈な味わいと独特の香りが特徴です。',
  },
  {
    id: 20,
    name: 'アグワ',
    price: 5200,
    image: '/images/아그와.jpg',
    category: 'リキュール',
    description: 'コロンビア産アカプルコアガベを使用したリキュールで、甘くてハーブの香りが特徴です。',
  },
  {
    id: 21,
    name: 'カンパリ',
    price: 3200,
    image: '/images/캄파리.jpg',
    category: 'リキュール',
    description: 'イタリア産の苦味が強いリキュールで、カクテルのベースとして広く使用されます。',
  },
];

export default Products;
