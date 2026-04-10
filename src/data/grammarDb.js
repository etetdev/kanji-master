export const LEXICON = {
  godan: [
    // -う
    { base: '買[か]う', answerBase: 'かう', type: 'godan-u', fr: 'acheter' },
    { base: '会[あ]う', answerBase: 'あう', type: 'godan-u', fr: 'rencontrer' },
    { base: '歌[うた]う', answerBase: 'うたう', type: 'godan-u', fr: 'chanter' },
    { base: '洗[あら]う', answerBase: 'あらう', type: 'godan-u', fr: 'laver' },
    { base: '違[ちが]う', answerBase: 'ちがう', type: 'godan-u', fr: 'être différent/faux' },
    { base: '笑[わら]う', answerBase: 'わらう', type: 'godan-u', fr: 'rire/sourire' },
    { base: '手伝[てつだ]う', answerBase: 'てつだう', type: 'godan-u', fr: 'aider' },
    { base: '吸[す]う', answerBase: 'すう', type: 'godan-u', fr: 'aspirer/fumer' },
    { base: '払[はら]う', answerBase: 'はらう', type: 'godan-u', fr: 'payer' },
    // -つ
    { base: '待[ま]つ', answerBase: 'まつ', type: 'godan-tsu', fr: 'attendre' },
    { base: '立[た]つ', answerBase: 'たつ', type: 'godan-tsu', fr: 'se lever' },
    { base: '持[も]つ', answerBase: 'もつ', type: 'godan-tsu', fr: 'tenir/porter' },
    { base: '勝[か]つ', answerBase: 'かつ', type: 'godan-tsu', fr: 'gagner' },
    { base: '打[う]つ', answerBase: 'うつ', type: 'godan-tsu', fr: 'frapper' },
    // -る
    { base: '帰[かえ]る', answerBase: 'かえる', type: 'godan-ru', fr: 'rentrer' },
    { base: '走[はし]る', answerBase: 'はしる', type: 'godan-ru', fr: 'courir' },
    { base: '切[き]る', answerBase: 'きる', type: 'godan-ru', fr: 'couper' },
    { base: '知[し]る', answerBase: 'しる', type: 'godan-ru', fr: 'savoir' },
    { base: '入[はい]る', answerBase: 'はいる', type: 'godan-ru', fr: 'entrer' },
    { base: '作[つく]る', answerBase: 'つくる', type: 'godan-ru', fr: 'fabriquer' },
    { base: '座[すわ]る', answerBase: 'すわる', type: 'godan-ru', fr: 's\'asseoir' },
    { base: '乗[の]る', answerBase: 'のる', type: 'godan-ru', fr: 'monter (transport)' },
    { base: '分[わ]かる', answerBase: 'わかる', type: 'godan-ru', fr: 'comprendre' },
    { base: '終[お]わる', answerBase: 'おわる', type: 'godan-ru', fr: 'finir' },
    { base: '始[はじ]まる', answerBase: 'はじまる', type: 'godan-ru', fr: 'commencer' },
    { base: '止[と]まる', answerBase: 'とまる', type: 'godan-ru', fr: 's\'arrêter' },
    { base: '売[う]る', answerBase: 'うる', type: 'godan-ru', fr: 'vendre' },
    { base: '怒[おこ]る', answerBase: 'おこる', type: 'godan-ru', fr: 'se fâcher' },
    { base: '困[こま]る', answerBase: 'こまる', type: 'godan-ru', fr: 'être ennuyé' },
    { base: '閉[し]まる', answerBase: 'しまる', type: 'godan-ru', fr: 'se fermer' },
    { base: '戻[もど]る', answerBase: 'もどる', type: 'godan-ru', fr: 'revenir' },
    { base: '泊[と]まる', answerBase: 'とまる', type: 'godan-ru', fr: 'passer la nuit' },
    { base: '謝[あやま]る', answerBase: 'あやまる', type: 'godan-ru', fr: 's\'excuser' },
    { base: '取[と]る', answerBase: 'とる', type: 'godan-ru', fr: 'prendre' },
    { base: '頑張[がんば]る', answerBase: 'がんばる', type: 'godan-ru', fr: 'faire de son mieux' },
    // -ぶ
    { base: '遊[あそ]ぶ', answerBase: 'あそぶ', type: 'godan-bu', fr: 'jouer' },
    { base: '呼[よ]ぶ', answerBase: 'よぶ', type: 'godan-bu', fr: 'appeler' },
    { base: '飛[と]ぶ', answerBase: 'とぶ', type: 'godan-bu', fr: 'voler' },
    { base: '選[えら]ぶ', answerBase: 'えらぶ', type: 'godan-bu', fr: 'choisir' },
    { base: '運[はこ]ぶ', answerBase: 'はこぶ', type: 'godan-bu', fr: 'transporter' },
    // -む
    { base: '飲[の]む', answerBase: 'のむ', type: 'godan-mu', fr: 'boire' },
    { base: '読[よ]む', answerBase: 'よむ', type: 'godan-mu', fr: 'lire' },
    { base: '休[やす]む', answerBase: 'やすむ', type: 'godan-mu', fr: 'se reposer' },
    { base: '頼[たの]む', answerBase: 'たのむ', type: 'godan-mu', fr: 'demander' },
    { base: '込[こ]む', answerBase: 'こむ', type: 'godan-mu', fr: 'être bondé' },
    { base: '噛[か]む', answerBase: 'かむ', type: 'godan-mu', fr: 'mordre/mâcher' },
    { base: '盗[ぬす]む', answerBase: 'ぬすむ', type: 'godan-mu', fr: 'voler (dérober)' },
    // -ぬ
    { base: '死[し]ぬ', answerBase: 'しぬ', type: 'godan-nu', fr: 'mourir' },
    // -く
    { base: '書[か]く', answerBase: 'かく', type: 'godan-ku', fr: 'écrire' },
    { base: '聞[き]く', answerBase: 'きく', type: 'godan-ku', fr: 'écouter' },
    { base: '働[はたら]く', answerBase: 'はたらく', type: 'godan-ku', fr: 'travailler' },
    { base: '歩[ある]く', answerBase: 'あるく', type: 'godan-ku', fr: 'marcher' },
    { base: '泣[な]く', answerBase: 'なく', type: 'godan-ku', fr: 'pleurer' },
    { base: '咲[さ]く', answerBase: 'さく', type: 'godan-ku', fr: 'fleurir' },
    { base: '開[あ]く', answerBase: 'あく', type: 'godan-ku', fr: 's\'ouvrir' },
    { base: '空[す]く', answerBase: 'すく', type: 'godan-ku', fr: 'se vider' },
    { base: '引[ひ]く', answerBase: 'ひく', type: 'godan-ku', fr: 'tirer' },
    { base: '続[つづ]く', answerBase: 'つづく', type: 'godan-ku', fr: 'continuer' },
    { base: '届[とど]く', answerBase: 'とどく', type: 'godan-ku', fr: 'atteindre' },
    { base: '驚[おどろ]く', answerBase: 'おどろく', type: 'godan-ku', fr: 'être surpris' },
    // -いく
    { base: '行[い]く', answerBase: 'いく', type: 'godan-iku', fr: 'aller' },
    // -ぐ
    { base: '泳[およ]ぐ', answerBase: 'およぐ', type: 'godan-gu', fr: 'nager' },
    { base: '急[いそ]ぐ', answerBase: 'いそぐ', type: 'godan-gu', fr: 'se dépêcher' },
    { base: '脱[ぬ]ぐ', answerBase: 'ぬぐ', type: 'godan-gu', fr: 'enlever (vêtement)' },
    { base: '騒[さわ]ぐ', answerBase: 'さわぐ', type: 'godan-gu', fr: 'faire du bruit' },
    // -す
    { base: '話[はな]す', answerBase: 'はなす', type: 'godan-su', fr: 'parler' },
    { base: '消[け]す', answerBase: 'けす', type: 'godan-su', fr: 'éteindre' },
    { base: '出[だ]す', answerBase: 'だす', type: 'godan-su', fr: 'sortir qqch' },
    { base: '押[お]す', answerBase: 'おす', type: 'godan-su', fr: 'pousser' },
    { base: '貸[か]す', answerBase: 'かす', type: 'godan-su', fr: 'prêter' },
    { base: '直[なお]す', answerBase: 'なおす', type: 'godan-su', fr: 'réparer' },
    { base: '探[さが]す', answerBase: 'さがす', type: 'godan-su', fr: 'chercher' },
    { base: '隠[かく]す', answerBase: 'かくす', type: 'godan-su', fr: 'cacher' },
    { base: '渡[わた]す', answerBase: 'わたす', type: 'godan-su', fr: 'remettre' },
    { base: '落[お]とす', answerBase: 'おとす', type: 'godan-su', fr: 'faire tomber' },
    { base: '思[おも]い出[だ]す', answerBase: 'おもいだす', type: 'godan-su', fr: 'se souvenir' },
    { base: '沸[わ]かす', answerBase: 'わかす', type: 'godan-su', fr: 'bouillir' }
  ],
  ichidan: [
    { base: '食[た]べる', answerBase: 'たべる', type: 'ichidan', fr: 'manger' },
    { base: '見[み]る', answerBase: 'みる', type: 'ichidan', fr: 'voir' },
    { base: '起[お]きる', answerBase: 'おきる', type: 'ichidan', fr: 'se lever' },
    { base: '寝[ね]る', answerBase: 'ねる', type: 'ichidan', fr: 'dormir' },
    { base: '教[おし]える', answerBase: 'おしえる', type: 'ichidan', fr: 'enseigner' },
    { base: '開[あ]ける', answerBase: 'あける', type: 'ichidan', fr: 'ouvrir' },
    { base: '閉[し]める', answerBase: 'しめる', type: 'ichidan', fr: 'fermer' },
    { base: '疲[つか]れる', answerBase: 'つかれる', type: 'ichidan', fr: 'se fatiguer' },
    { base: '忘[わす]れる', answerBase: 'わすれる', type: 'ichidan', fr: 'oublier' },
    { base: '覚[おぼ]える', answerBase: 'おぼえる', type: 'ichidan', fr: 'mémoriser' },
    { base: '出[で]る', answerBase: 'でる', type: 'ichidan', fr: 'sortir' },
    { base: '借[か]りる', answerBase: 'かりる', type: 'ichidan', fr: 'emprunter' },
    { base: '降[お]りる', answerBase: 'おりる', type: 'ichidan', fr: 'descendre' },
    { base: '浴[あ]びる', answerBase: 'あびる', type: 'ichidan', fr: 'prendre (une douche)' },
    { base: '見[み]せる', answerBase: 'みせる', type: 'ichidan', fr: 'montrer' },
    { base: '答[こた]える', answerBase: 'こたえる', type: 'ichidan', fr: 'répondre' },
    { base: '止[と]める', answerBase: 'とめる', type: 'ichidan', fr: 'arrêter' },
    { base: '集[あつ]める', answerBase: 'あつめる', type: 'ichidan', fr: 'rassembler' },
    { base: '捨[す]てる', answerBase: 'すてる', type: 'ichidan', fr: 'jeter' },
    { base: '諦[あきら]める', answerBase: 'あきらめる', type: 'ichidan', fr: 'abandonner' },
    { base: '迎[むか]える', answerBase: 'むかえる', type: 'ichidan', fr: 'accueillir' },
    { base: '生[う]まれる', answerBase: 'うまれる', type: 'ichidan', fr: 'naître' }
  ],
  irregular: [
    { base: '来[く]る', answerBase: 'くる', type: 'irregular-kuru', fr: 'venir' },
    { base: '連[つ]れて来[く]る', answerBase: 'つれてくる', type: 'irregular-kuru', fr: 'amener (quelqu\'un)' },
    { base: '持[も]って来[く]る', answerBase: 'もってくる', type: 'irregular-kuru', fr: 'apporter (quelque chose)' },
    { base: 'する', answerBase: 'する', type: 'irregular-suru', fr: 'faire' },
    { base: '勉強[べんきょう]する', answerBase: 'べんきょうする', type: 'irregular-suru', fr: 'étudier' },
    { base: '買[か]い物[もの]する', answerBase: 'かいものする', type: 'irregular-suru', fr: 'faire les courses' },
    { base: '散歩[さんぽ]する', answerBase: 'さんぽする', type: 'irregular-suru', fr: 'se promener' },
    { base: '旅行[りょこう]する', answerBase: 'りょこうする', type: 'irregular-suru', fr: 'voyager' },
    { base: '掃除[そうじ]する', answerBase: 'そうじする', type: 'irregular-suru', fr: 'faire le ménage' },
    { base: '料理[りょうり]する', answerBase: 'りょうりする', type: 'irregular-suru', fr: 'cuisiner' },
    { base: '運転[うんてん]する', answerBase: 'うんてんする', type: 'irregular-suru', fr: 'conduire' },
    { base: '案内[あんない]する', answerBase: 'あんないする', type: 'irregular-suru', fr: 'guider' }
  ],
  adjI: [
    { base: '高[たか]い', answerBase: 'たかい', type: 'adj-i', fr: 'haut / cher' },
    { base: '新[あたら]しい', answerBase: 'あたらしい', type: 'adj-i', fr: 'nouveau' },
    { base: '大[おお]きい', answerBase: 'おおきい', type: 'adj-i', fr: 'grand' },
    { base: '安[やす]い', answerBase: 'やすい', type: 'adj-i', fr: 'pas cher' },
    { base: '面白[おもしろ]い', answerBase: 'おもしろい', type: 'adj-i', fr: 'intéressant' },
    { base: '古[ふる]い', answerBase: 'ふるい', type: 'adj-i', fr: 'vieux' },
    { base: '広[ひろ]い', answerBase: 'ひろい', type: 'adj-i', fr: 'vaste' },
    { base: '狭[せま]い', answerBase: 'せまい', type: 'adj-i', fr: 'étroit' },
    { base: '近[ちか]い', answerBase: 'ちかい', type: 'adj-i', fr: 'proche' },
    { base: '遠[とお]い', answerBase: 'とおい', type: 'adj-i', fr: 'loin' },
    { base: '重[おも]い', answerBase: 'おもい', type: 'adj-i', fr: 'lourd' },
    { base: '軽[かる]い', answerBase: 'かるい', type: 'adj-i', fr: 'léger' },
    { base: '難[むずか]しい', answerBase: 'むずかしい', type: 'adj-i', fr: 'difficile' },
    { base: '易[やさ]しい', answerBase: 'やさしい', type: 'adj-i', fr: 'facile' },
    { base: '楽[たの]しい', answerBase: 'たのしい', type: 'adj-i', fr: 'amusant' },
    { base: '嬉[うれ]しい', answerBase: 'うれしい', type: 'adj-i', fr: 'heureux' },
    { base: '悲[かな]しい', answerBase: 'かなしい', type: 'adj-i', fr: 'triste' },
    { base: '寂[さび]しい', answerBase: 'さびしい', type: 'adj-i', fr: 'seul' },
    { base: '痛[いた]い', answerBase: 'いたい', type: 'adj-i', fr: 'douloureux' },
    { base: '暑[あつ]い', answerBase: 'あつい', type: 'adj-i', fr: 'chaud (climat)' },
    { base: '寒[さむ]い', answerBase: 'さむい', type: 'adj-i', fr: 'froid (climat)' },
    { base: '暖[あたた]かい', answerBase: 'あたたかい', type: 'adj-i', fr: 'doux/chaud (climat)' },
    { base: '涼[すず]しい', answerBase: 'すずしい', type: 'adj-i', fr: 'frais' },
    { base: '美味[おい]しい', answerBase: 'おいしい', type: 'adj-i', fr: 'délicieux' },
    { base: 'まずい', answerBase: 'まずい', type: 'adj-i', fr: 'mauvais (goût)' },
    { base: '白[しろ]い', answerBase: 'しろい', type: 'adj-i', fr: 'blanc' },
    { base: '黒[くろ]い', answerBase: 'くろい', type: 'adj-i', fr: 'noir' },
    { base: '赤[あか]い', answerBase: 'あかい', type: 'adj-i', fr: 'rouge' },
    { base: '青[あお]い', answerBase: 'あおい', type: 'adj-i', fr: 'bleu/vert' },
    { base: '若[わか]い', answerBase: 'わかい', type: 'adj-i', fr: 'jeune' },
    { base: '忙[いそが]しい', answerBase: 'いそがしい', type: 'adj-i', fr: 'occupé' },
    { base: '眠[ねむ]い', answerBase: 'ねむい', type: 'adj-i', fr: 'somnolent' },
    { base: '素晴[すば]らしい', answerBase: 'すばらしい', type: 'adj-i', fr: 'merveilleux' },
    { base: '珍[めずら]しい', answerBase: 'めずらしい', type: 'adj-i', fr: 'rare' },
    { base: '厳[きび]しい', answerBase: 'きびしい', type: 'adj-i', fr: 'sévère' },
    { base: 'うるさい', answerBase: 'うるさい', type: 'adj-i', fr: 'bruyant' }
  ],
  adjNa: [
    { base: '便利[べんり]', answerBase: 'べんり', type: 'adj-na', fr: 'pratique' },
    { base: '静[しず]か', answerBase: 'しずか', type: 'adj-na', fr: 'calme' },
    { base: '有名[ゆうめい]', answerBase: 'ゆうめい', type: 'adj-na', fr: 'célèbre' },
    { base: '暇[ひま]', answerBase: 'ひま', type: 'adj-na', fr: 'libre (temps)' },
    { base: 'きれい', answerBase: 'きれい', type: 'adj-na', fr: 'beau / propre' },
    { base: 'にぎやか', answerBase: 'にぎやか', type: 'adj-na', fr: 'animé' },
    { base: '親切[しんせつ]', answerBase: 'しんせつ', type: 'adj-na', fr: 'gentil' },
    { base: '好[す]き', answerBase: 'すき', type: 'adj-na', fr: 'aimé' },
    { base: '嫌[きら]い', answerBase: 'きらい', type: 'adj-na', fr: 'détesté' },
    { base: '大切[たいせつ]', answerBase: 'たいせつ', type: 'adj-na', fr: 'important' },
    { base: '簡単[かんたん]', answerBase: 'かんたん', type: 'adj-na', fr: 'simple' },
    { base: '複雑[ふくざつ]', answerBase: 'ふくざつ', type: 'adj-na', fr: 'complexe' },
    { base: '上手[じょうず]', answerBase: 'じょうず', type: 'adj-na', fr: 'habile' },
    { base: '下手[へた]', answerBase: 'へた', type: 'adj-na', fr: 'malhabile' },
    { base: '元気[げんき]', answerBase: 'げんき', type: 'adj-na', fr: 'en forme' },
    { base: '安全[あんぜん]', answerBase: 'あんぜん', type: 'adj-na', fr: 'sûr' },
    { base: '危険[きけん]', answerBase: 'きけん', type: 'adj-na', fr: 'dangereux' },
    { base: '不便[ふべん]', answerBase: 'ふべん', type: 'adj-na', fr: 'inpratique' },
    { base: '丁寧[ていねい]', answerBase: 'ていねい', type: 'adj-na', fr: 'poli' },
    { base: '立派[りっぱ]', answerBase: 'りっぱ', type: 'adj-na', fr: 'magnifique/splendide' }
  ]
};

// Utils
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const replaceLast = (str, len, replacement) => str.slice(0, -len) + replacement;

// Te Form Generator
const getTeForm = (wordObj) => {
  const { base, answerBase, type } = wordObj;
  
  if (type.startsWith('godan')) {
    if (type === 'godan-u' || type === 'godan-tsu' || type === 'godan-ru') {
      return { q: base, a: replaceLast(answerBase, 1, 'って'), f: replaceLast(base, 1, 'って') };
    }
    if (type === 'godan-bu' || type === 'godan-mu' || type === 'godan-nu') {
      return { q: base, a: replaceLast(answerBase, 1, 'んで'), f: replaceLast(base, 1, 'んで') };
    }
    if (type === 'godan-iku') {
      return { q: base, a: replaceLast(answerBase, 1, 'って'), f: replaceLast(base, 1, 'って') };
    }
    if (type === 'godan-ku') {
      return { q: base, a: replaceLast(answerBase, 1, 'いて'), f: replaceLast(base, 1, 'いて') };
    }
    if (type === 'godan-gu') {
      return { q: base, a: replaceLast(answerBase, 1, 'いで'), f: replaceLast(base, 1, 'いで') };
    }
    if (type === 'godan-su') {
      return { q: base, a: replaceLast(answerBase, 1, 'して'), f: replaceLast(base, 1, 'して') };
    }
  } else if (type === 'ichidan') {
    return { q: base, a: replaceLast(answerBase, 1, 'て'), f: replaceLast(base, 1, 'て') };
  } else if (type === 'irregular-kuru') {
    const rootA = answerBase.replace('くる', '');
    const rootF = base.replace('来[く]る', '');
    return { q: base, a: rootA + 'きて', f: rootF + '来[き]て' };
  } else if (type === 'irregular-suru') {
    return { q: base, a: replaceLast(answerBase, 2, 'して'), f: replaceLast(base, 2, 'して') };
  }
  return { q: base, a: base, f: base };
};

// Adjectives Form Generator
const generateAdjectiveForms = (wordList, count) => {
  const questions = [];
  const formsAdjI = [
    { label: "Affirmation (présent)", modA: orig => orig + "です", modF: orig => orig + "です" },
    { label: "Affirmation (passé)", modA: orig => replaceLast(orig, 1, "かったです"), modF: orig => replaceLast(orig, 1, "かったです") },
    { label: "Négation - Écrit (présent)", modA: orig => replaceLast(orig, 1, "くありません"), modF: orig => replaceLast(orig, 1, "くありません") },
    { label: "Négation - Écrit (passé)", modA: orig => replaceLast(orig, 1, "くありませんでした"), modF: orig => replaceLast(orig, 1, "くありませんでした") },
    { label: "Négation - Oral Soutenu (présent)", modA: orig => replaceLast(orig, 1, "くありません"), modF: orig => replaceLast(orig, 1, "くありません") },
    { label: "Négation - Oral Soutenu (passé)", modA: orig => replaceLast(orig, 1, "くありませんでした"), modF: orig => replaceLast(orig, 1, "くありませんでした") },
    { label: "Négation - Oral courant (présent)", modA: orig => replaceLast(orig, 1, "くないです"), modF: orig => replaceLast(orig, 1, "くないです") },
    { label: "Négation - Oral courant (passé)", modA: orig => replaceLast(orig, 1, "くなかったです"), modF: orig => replaceLast(orig, 1, "くなかったです") },
    { label: "Forme adnominale", modA: orig => orig, modF: orig => orig },
    { label: "Forme adverbiale", modA: orig => replaceLast(orig, 1, "く"), modF: orig => replaceLast(orig, 1, "く") },
    { label: "Forme en て", modA: orig => replaceLast(orig, 1, "くて"), modF: orig => replaceLast(orig, 1, "くて") }
  ];

  const formsAdjNa = [
    { label: "Affirmation (présent)", modA: orig => orig + "です", modF: orig => orig + "です" },
    { label: "Affirmation (passé)", modA: orig => orig + "でした", modF: orig => orig + "でした" },
    { label: "Négation - Écrit (présent)", modA: orig => orig + "ではありません", modF: orig => orig + "ではありません" },
    { label: "Négation - Écrit (passé)", modA: orig => orig + "ではありませんでした", modF: orig => orig + "ではありませんでした" },
    { label: "Négation - Oral conseillé (présent)", modA: orig => orig + "じゃありません", modF: orig => orig + "じゃありません" },
    { label: "Négation - Oral conseillé (passé)", modA: orig => orig + "じゃありませんでした", modF: orig => orig + "じゃありませんでした" },
    { label: "Négation - Oral peu conseillé (présent)", modA: orig => orig + "じゃないです", modF: orig => orig + "じゃないです" },
    { label: "Négation - Oral peu conseillé (passé)", modA: orig => orig + "じゃなかったです", modF: orig => orig + "じゃなかったです" },
    { label: "Forme adnominale", modA: orig => orig + "な", modF: orig => orig + "な" },
    { label: "Forme adverbiale", modA: orig => orig + "に", modF: orig => orig + "に" },
    { label: "Forme en て", modA: orig => orig + "で", modF: orig => orig + "で" }
  ];

  for (let i = 0; i < count; i++) {
    const word = randomItem(wordList);
    const forms = word.type === 'adj-i' ? formsAdjI : formsAdjNa;
    const form = randomItem(forms);
    
    questions.push({
      item: word,
      label: form.label,
      qTarget: word.base,
      fr: word.fr,
      a: form.modA(word.answerBase),
      aDisplay: form.modF(word.base)
    });
  }
  return questions;
};

// Conversions Poli -> Neutre
const getNeutralForm = (wordObj, poliMode) => {
  // poliMode: 'masu', 'mashita', 'masen', 'desu'
  const { base, answerBase, type } = wordObj;

  // We need to construct the Poli string, and the Neutre string
  let poliA, poliF, neutreA, neutreF;

  if (poliMode === 'desu') {
    poliA = answerBase + "です";
    poliF = base + "です";
    neutreA = answerBase + "だ";
    neutreF = base + "だ";
    return { qBase: wordObj, label: "Présent poli → Neutre", qTextF: poliF, aText: neutreA, aTextF: neutreF };
  }

  // Verbs
  // helper to get base masu stem
  const getMasuStem = (wBase, wBaseAns, wType) => {
    if (wType.startsWith('godan')) {
      const eSoundMapA = {'う':'い', 'つ':'ち', 'る':'り', 'ぶ':'び', 'む':'み', 'ぬ':'に', 'く':'き', 'ぐ':'ぎ', 'す':'し'};
      const lastA = wBaseAns.slice(-1);
      return { 
        stemA: replaceLast(wBaseAns, 1, eSoundMapA[lastA]),
        stemF: replaceLast(wBase, 1, eSoundMapA[lastA])
      };
    } else if (wType === 'ichidan') {
      return { stemA: replaceLast(wBaseAns, 1, ''), stemF: replaceLast(wBase, 1, '') };
    } else if (wType === 'irregular-kuru') {
      const rootA = wBaseAns.replace('くる', '');
      const rootF = wBase.replace('来[く]る', '');
      return { stemA: rootA + 'き', stemF: rootF + '来[き]' };
    } else if (wType === 'irregular-suru') {
      return { stemA: replaceLast(wBaseAns, 2, 'し'), stemF: replaceLast(wBase, 2, 'し') };
    }
  };

  const getNaiForm = (wBase, wBaseAns, wType) => {
    if (wType === 'godan-u' || wType === 'godan-iku') {
      return { a: replaceLast(wBaseAns, 1, 'わない'), f: replaceLast(wBase, 1, 'わない') };
    } else if (wType.startsWith('godan')) {
      const aSoundMapA = {'つ':'た', 'る':'ら', 'ぶ':'ば', 'む':'ま', 'ぬ':'な', 'く':'か', 'ぐ':'が', 'す':'さ'};
      const lastA = wBaseAns.slice(-1);
      return { a: replaceLast(wBaseAns, 1, aSoundMapA[lastA] + 'ない'), f: replaceLast(wBase, 1, aSoundMapA[lastA] + 'ない') };
    } else if (wType === 'ichidan') {
      return { a: replaceLast(wBaseAns, 1, 'ない'), f: replaceLast(wBase, 1, 'ない') };
    } else if (wType === 'irregular-kuru') {
      const rootA = wBaseAns.replace('くる', '');
      const rootF = wBase.replace('来[く]る', '');
      return { a: rootA + 'こない', f: rootF + '来[こ]ない' };
    } else if (wType === 'irregular-suru') {
      return { a: replaceLast(wBaseAns, 2, 'しない'), f: replaceLast(wBase, 2, 'しない') };
    }
  };

  const { stemA, stemF } = getMasuStem(base, answerBase, type);
  
  if (poliMode === 'masu') {
    return { qBase: wordObj, label: "Forme V-ます → dictionnaire", qTextF: stemF + "ます", aText: answerBase, aTextF: base };
  } else if (poliMode === 'mashita') {
    const te = getTeForm(wordObj);
    // た is te but with a/da instead of e/de
    const taA = te.a.endsWith('で') ? replaceLast(te.a, 1, 'だ') : replaceLast(te.a, 1, 'た');
    const taF = te.f.endsWith('で') ? replaceLast(te.f, 1, 'だ') : replaceLast(te.f, 1, 'た');
    return { qBase: wordObj, label: "Forme V-ました → V-た", qTextF: stemF + "ました", aText: taA, aTextF: taF };
  } else if (poliMode === 'masen') {
    const nai = getNaiForm(base, answerBase, type);
    return { qBase: wordObj, label: "Forme V-ません → V-ない", qTextF: stemF + "ません", aText: nai.a, aTextF: nai.f };
  }
};

const getVerbConjugations = (wordObj, mode) => {
  const { base, answerBase, type } = wordObj;

  // Potentiel, Factitif, Passif, Factitif-Passif
  const conjIchidan = {
    'potentiel': { a: replaceLast(answerBase, 1, 'られる'), f: replaceLast(base, 1, 'られる') },
    'factitif': { a: replaceLast(answerBase, 1, 'させる'), f: replaceLast(base, 1, 'させる') },
    'passif': { a: replaceLast(answerBase, 1, 'られる'), f: replaceLast(base, 1, 'られる') },
    'factitif-passif': { a: replaceLast(answerBase, 1, 'させられる'), f: replaceLast(base, 1, 'させられる') }
  };

  const conjKuru = {
    'potentiel': { a: 'こられる', f: '来[こ]られる' },
    'factitif': { a: 'こさせる', f: '来[こ]させる' },
    'passif': { a: 'こられる', f: '来[こ]られる' },
    'factitif-passif': { a: 'こさせられる', f: '来[こ]させられる' }
  };

  const conjSuru = {
    'potentiel': { a: replaceLast(answerBase, 2, 'できる'), f: replaceLast(base, 2, 'できる') },
    'factitif': { a: replaceLast(answerBase, 2, 'させる'), f: replaceLast(base, 2, 'させる') },
    'passif': { a: replaceLast(answerBase, 2, 'される'), f: replaceLast(base, 2, 'される') },
    'factitif-passif': { a: replaceLast(answerBase, 2, 'させられる'), f: replaceLast(base, 2, 'させられる') }
  };

  const getGodanConj = (wBaseAns, wBase, wType, mode) => {
    const eSoundMapA = {'う':'え', 'つ':'て', 'る':'れ', 'ぶ':'べ', 'む':'め', 'ぬ':'ね', 'く':'け', 'ぐ':'げ', 'す':'せ'};
    const aSoundMapA = {'う':'わ', 'つ':'た', 'る':'ら', 'ぶ':'ば', 'む':'ま', 'ぬ':'な', 'く':'か', 'ぐ':'が', 'す':'さ'};
    const lastA = wBaseAns.slice(-1);

    if (mode === 'potentiel') {
      const eS = eSoundMapA[wType === 'godan-iku' ? 'く' : lastA];
      return { a: replaceLast(wBaseAns, 1, eS + 'る'), f: replaceLast(wBase, 1, eS + 'る') };
    }
    
    const aS = wType === 'godan-iku' ? 'か' : aSoundMapA[lastA];
    
    if (mode === 'factitif') {
      return { a: replaceLast(wBaseAns, 1, aS + 'せる'), f: replaceLast(wBase, 1, aS + 'せる') };
    }
    if (mode === 'passif') {
      return { a: replaceLast(wBaseAns, 1, aS + 'れる'), f: replaceLast(wBase, 1, aS + 'れる') };
    }
    if (mode === 'factitif-passif') {
      return { a: replaceLast(wBaseAns, 1, aS + 'せられる'), f: replaceLast(wBase, 1, aS + 'せられる') };
    }
  };

  if (type === 'ichidan') {
    return conjIchidan[mode];
  } else if (type === 'irregular-kuru') {
    const rootA = answerBase.replace('くる', '');
    const rootF = base.replace('来[く]る', '');
    const c = conjKuru[mode];
    return { a: rootA + c.a, f: rootF + c.f };
  } else if (type === 'irregular-suru') {
    return conjSuru[mode];
  } else {
    return getGodanConj(answerBase, base, type, mode);
  }
};

export const generateGrammarQuiz = (theme, count = 10) => {
  const quizItems = [];
  
  if (theme === 'te-form') {
    const pool = [...LEXICON.godan, ...LEXICON.ichidan, ...LEXICON.irregular];
    for (let i = 0; i < count; i++) {
      const word = randomItem(pool);
      const te = getTeForm(word);
      quizItems.push({
        id: `te-${i}`,
        instruction: `Donnez la forme en て du verbe suivant :`,
        questionFull: word.base,
        fr: word.fr,
        expected: te.a, // Expected romaji/kana
        answerDisplay: te.f
      });
    }
  } else if (theme === 'adj-i' || theme === 'adj-na') {
    const pool = theme === 'adj-i' ? LEXICON.adjI : LEXICON.adjNa;
    const items = generateAdjectiveForms(pool, count);
    items.forEach((it, i) => {
      quizItems.push({
        id: `adj-${i}`,
        instruction: `Conjuguez l'adjectif à la forme demandée : ${it.label}`,
        questionFull: it.qTarget,
        fr: it.fr,
        expected: it.a,
        answerDisplay: it.aDisplay
      });
    });
  } else if (theme === 'neutral') {
    const poolVerb = [...LEXICON.godan, ...LEXICON.ichidan, ...LEXICON.irregular];
    const poolNounAdj = [...LEXICON.adjNa]; // For です -> だ
    
    for (let i = 0; i < count; i++) {
      const isVerb = Math.random() > 0.3; // 70% verbs
      const modes = ['masu', 'mashita', 'masen'];
      
      let conv, word;
      if (isVerb) {
        word = randomItem(poolVerb);
        conv = getNeutralForm(word, randomItem(modes));
      } else {
        word = randomItem(poolNounAdj);
        conv = getNeutralForm(word, 'desu');
      }
      
      quizItems.push({
        id: `neutral-${i}`,
        instruction: `Convertissez cette forme polie en style neutre :`,
        instructionLabel: conv.label,
        questionFull: conv.qTextF,
        fr: word.fr,
        expected: conv.aText,
        answerDisplay: conv.aTextF
      });
    }
  } else if (theme === 'conjugaisons') {
    const pool = [...LEXICON.godan, ...LEXICON.ichidan, ...LEXICON.irregular];
    const modes = ['potentiel', 'factitif', 'passif', 'factitif-passif'];
    
    for (let i = 0; i < count; i++) {
      const mode = randomItem(modes);
      const word = randomItem(pool);
      const conj = getVerbConjugations(word, mode);
      
      const capMode = mode.charAt(0).toUpperCase() + mode.slice(1);
      
      quizItems.push({
        id: `conj-${i}`,
        instruction: `Donnez la forme ${capMode} du verbe :`,
        questionFull: word.base,
        fr: word.fr,
        expected: conj.a,
        answerDisplay: conj.f
      });
    }
  }

  return quizItems;
};
