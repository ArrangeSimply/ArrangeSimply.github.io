// keys
const ACCIDENTAL =
{ // (NATURA)L
    P: "\u266F", // (SHAR)P
    T: "\u266D", // (FLA)T
    NATURAL: 0,
    SHARP: 1,
    FLAT: 2
};
const KEY =
{
    ET: 0, // equal temperament (major: A~L; minor: a~l)
    ACCIDENTAL: 0, // L, P, T
    SOLFEGE: 1, // solfège (major: A~G; minor: a~g)
    TONALITY:
    {
// major key & scale
        A0: "LC",
        B1: "PC",
        B2: "TD",
        C0: "LD",
        D1: "PD",
        D2: "TE",
        E0: "LE",
        F0: "LF",
        G1: "PF",
        G2: "TG",
        H0: "LG",
        I1: "PG",
        I2: "TA",
        J0: "LA",
        K1: "PA",
        K2: "TB",
        L0: "LB",
// minor key
        a0: "La",
        b2: "Tb",
        c0: "Lb",
        d0: "Lc",
        e1: "Pc",
        f0: "Ld",
        g1: "Pd",
        h0: "Le",
        i0: "Lf",
        j1: "Pf",
        k0: "Lg",
        l1: "Pg"
    }
}
const TRANSPOSITION =
{
    A: 65, // ASCII of A
    L: 76, // ASCII of L
    a: 97, // ASCII of a
    l: 108, // ASCII of l
    TET12: 12, // 12-tone equal temperament
    MAX: 5, // upper bound of changeable keys
    MIN: -6 // lower bound of changeable keys
}
// chords
const CHORD =
{
    R: "R", // root
    T: "T", // type
    B: "B"  // bass
};
const m = "m";
const m7 = "m7";
const M7 = "M7";
const mM7 = "mM7";
const M9 = "M9";
const sus2 = "sus2";
const sus27 = "7sus2";
const sus4 = "sus4";
const sus46 = "6sus4";
const sus47 = "7sus4";
const add69 = "6add9";
const add9 = "add9";
const add11 = "add11";
const aug = "aug";
const m7b5 = "m7-5";
const C = {R: "A0"};
const CD = {R: "A0", B: "C0"};
const CE = {R: "A0", B: "E0"};
const CG = {R: "A0", B: "H0"};
const C6 = {R: "A0", T: "6"};
const C6E = {R: "A0", T: "6", B: "E0"};
const C6G = {R: "A0", T: "6", B: "H0"};
const C7 = {R: "A0", T: "7"};
const C7E = {R: "A0", T: "7", B: "E0"};
const CM7 = {R: "A0", T: M7};
const CM7E = {R: "A0", T: M7, B: "E0"};
const CM7G = {R: "A0", T: M7, B: "H0"};
const CM9 = {R: "A0", T: M9};
const Cadd9 = {R: "A0", T: add9};
const Cadd9E = {R: "A0", T: add9, B: "E0"};
const Csus2 = {R: "A0", T: sus2};
const Csus2G = {R: "A0", T: sus2, B: "H0"};
const Csus4 = {R: "A0", T: sus4};
const sCm = {R: "B1", T: m};
const sCm7 = {R: "B1", T: m7};
const sCsus4Gs = {R: "B1", T: sus4, B: "I1"};
const D = {R: "C0"};
const DC = {R: "C0", B: "A0"};
const DFs = {R: "C0", B: "G1"};
const DA = {R: "C0", B: "J0"};
const D6 = {R: "C0", T: "6"};
const D6A = {R: "C0", T: "6", B: "J0"};
const D7 = {R: "C0", T: "7"};
const DM7 = {R: "C0", T: M7};
const Dadd9 = {R: "C0", T: add9};
const Dadd9Fs = {R: "C0", T: add9, B: "G1"};
const Dadd9A = {R: "C0", T: add9, B: "J0"};
const Dm = {R: "C0", T: m};
const DmF = {R: "C0", T: m, B: "F0"};
const DmA = {R: "C0", T: m, B: "J0"};
const Dm7 = {R: "C0", T: m7};
const Dm7C = {R: "C0", T: m7, B: "A0"};
const Dm7A = {R: "C0", T: m7, B: "J0"};
const Dsus2 = {R: "C0", T: sus2};
const Dsus2A = {R: "C0", T: sus2, B: "J0"};
const Dsus4 = {R: "C0", T: sus4};
const Dsus4A = {R: "C0", T: sus4, B: "J0"};
const D6sus4A = {R: "C0", T: sus46, B: "J0"};
const D7sus2 = {R: "C0", T: sus27};
const D7sus2C = {R: "C0", T: sus27, B: "A0"};
const D7sus2A = {R: "C0", T: sus27, B: "J0"};
const D7sus4 = {R: "C0", T: sus47};
const Daug = {R: "C0", T: aug};
const E = {R: "E0"};
const EGs = {R: "E0", B: "I1"};
const EB = {R: "E0", B: "L0"};
const E6 = {R: "E0", T: "6"};
const E7 = {R: "E0", T: "7"};
const E7Gs = {R: "E0", T: "7", B: "I1"};
const E7B = {R: "E0", T: "7", B: "L0"};
const Eadd9 = {R: "E0", T: add9};
const Em = {R: "E0", T: m};
const EmFs = {R: "E0", T: m, B: "G1"};
const EmG = {R: "E0", T: m, B: "H0"};
const EmB = {R: "E0", T: m, B: "L0"};
const Em7 = {R: "E0", T: m7};
const Em7D = {R: "E0", T: m7, B: "C0"};
const Em7B = {R: "E0", T: m7, B: "L0"};
const EmM7 = {R: "E0", T: mM7};
const Esus2 = {R: "E0", T: sus2};
const Esus4 = {R: "E0", T: sus4};
const Esus4B = {R: "E0", T: sus4, B: "L0"};
const E6sus4 = {R: "E0", T: sus46};
const E6sus4B = {R: "E0", T: sus46, B: "L0"};
const E7sus2 = {R: "E0", T: sus27};
const F = {R: "F0"};
const FC = {R: "F0", B: "A0"};
const FA = {R: "F0", B: "J0"};
const FM7 = {R: "F0", T: M7};
const FM7C = {R: "F0", T: M7, B: "A0"};
const Fadd9 = {R: "F0", T: add9};
const Fadd9A = {R: "F0", T: add9, B: "J0"};
const sFm = {R: "G1", T: m};
const sFmCs = {R: "G1", T: m, B: "B1"};
const sFmA = {R: "G1", T: m, B: "J0"};
const sFm7 = {R: "G1", T: m7};
const sFm7Cs = {R: "G1", T: m7, B: "B1"};
const sFm7E = {R: "G1", T: m7, B: "E0"};
const sFsus4 = {R: "G1", T: sus4};
const sF7sus4 = {R: "G1", T: sus47};
const G = {R: "H0"};
const GD = {R: "H0", B: "C0"};
const GB = {R: "H0", B: "L0"};
const G6 = {R: "H0", T: "6"};
const G7 = {R: "H0", T: "7"};
const G7D = {R: "H0", T: "7", B: "C0"};
const GM7 = {R: "H0", T: M7};
const GM7B = {R: "H0", T: M7, B: "L0"};
const GM9B = {R: "H0", T: M9, B: "L0"};
const Gadd9 = {R: "H0", T: add9};
const Gadd9D = {R: "H0", T: add9, B: "C0"};
const Gadd9B = {R: "H0", T: add9, B: "L0"};
const Gm = {R: "H0", T: m};
const Gm7 = {R: "H0", T: m7};
const Gsus2 = {R: "H0", T: sus2};
const Gsus4 = {R: "H0", T: sus4};
const Gsus4D = {R: "H0", T: sus4, B: "C0"};
const G7sus2 = {R: "H0", T: sus27};
const A = {R: "J0"};
const ACs = {R: "J0", B: "B1"};
const AE = {R: "J0", B: "E0"};
const A6 = {R: "J0", T: "6"};
const A6Cs = {R: "J0", T: "6", B: "B1"};
const A6add9 = {R: "J0", T: add69};
const A7 = {R: "J0", T: "7"};
const AM7 = {R: "J0", T: M7};
const AM7E = {R: "J0", T: M7, B: "E0"};
const Aadd9 = {R: "J0", T: add9};
const Aadd9Cs = {R: "J0", T: add9, B: "B1"};
const Am = {R: "J0", T: m};
const AmC = {R: "J0", T: m, B: "A0"};
const AmE = {R: "J0", T: m, B: "E0"};
const Am7 = {R: "J0", T: m7};
const Am7E = {R: "J0", T: m7, B: "E0"};
const Am7G = {R: "J0", T: m7, B: "H0"};
const Asus2 = {R: "J0", T: sus2};
const Asus2E = {R: "J0", T: sus2, B: "E0"};
const Asus4 = {R: "J0", T: sus4};
const A6sus4 = {R: "J0", T: sus46};
const A7sus2 = {R: "J0", T: sus27};
const A7sus2E = {R: "J0", T: sus27, B: "E0"};
const A7sus4 = {R: "J0", T: sus47};
const bB = {R: "K2"};
const bBF = {R: "K2", B: "F0"};
const bBM7 = {R: "K2", T: M7};
const bBadd9 = {R: "K2", T: add9};
const B7 = {R: "L0", T: "7"};
const Badd11 = {R: "L0", T: add11};
const Bm = {R: "L0", T: m};
const BmD = {R: "L0", T: m, B: "C0"};
const BmFs = {R: "L0", T: m, B: "G1"};
const Bm7 = {R: "L0", T: m7};
const Bm7A = {R: "L0", T: m7, B: "J0"};
const Bsus2 = {R: "L0", T: sus2};
const Bsus4 = {R: "L0", T: sus4};
const Bsus4Fs = {R: "L0", T: sus4, B: "G1"};
const B7sus2 = {R: "L0", T: sus27};
const B7sus2Fs = {R: "L0", T: sus27, B: "G1"};
const B7sus4 = {R: "L0", T: sus47};
const Bm7b5 = {R: "L0", T: m7b5};
// space
const FWS = "\u3000"; // full-width space
const DFWS = FWS + FWS; // double full-width spaces
// element
const ELEMENT =
{
    tag: 0, // HTML tags or other variations
    between: 1, // contents between tags
    href: 2,
// derivatives
    ALP: 2, // another local page
    COLLABORATORs: 2,
    ID: 3
}
const TAG =
{
    a: "a",
    article: "article",
    aside: "aside",
    audio: "audio",
    br: "br",
    details: "details",
    dl: "dl",
    dt: "dt",
    footer: "footer",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    header: "header",
    li: "li",
    link: "link",
    main: "main",
    nav: "nav",
    ol: "ol",
    option: "option",
    p: "p",
    pre: "pre",
    q: "q",
    rt: "rt",
    ruby: "ruby",
    section: "section",
    select: "select",
    small: "small",
    span: "span",
    summary: "summary",
    sup: "sup",
    ul: "ul",
    video: "video",
// derivatives
    ALP: "ALP", // Another Local Page
    BoA: "BoA", // Bookmark on ALP
    CHORD: "CHORD",
    Cs: "Cs", // COLLABORATORs
    HP: "HP", // return to the home page
    J2C: "J2C", // jump to the COLLABORATORs
    PB: "PB" // Paragraph Break
};
const LB = [TAG.br]; // Line Break
const PB = [TAG.PB];
// prefix
const UP1 = "../";
const UP2 = UP1 + UP1;
const FileType =
{
    audio: "mp3",
    video: "mp4",
    page: "html"
};
const ADDRESS =
{
    GitHub: "https://github.com",
    HomePage: "index.html"
};
const EMOJI =
{
    ANGRY: " (๑`^´๑)",
    AWKWARD: " <^_^!>",
    CRY: " (T○T)",
    LOVE: " (*^。^*)",
    SAD: " (ಠ︵ಠ)",
    SHY: " (*^▽^*)",
    SMILE: " \\(^○^)/",
    SURPRISE: " (ﾉﾟοﾟ)ﾉ"
};
const FIRST = 0;
const PAGE = "page";
const STRING = "string";
const COVER = "cover";
const ARROW = "\u2192";
const DICTIONARY =
{
    arranged: // arranged in the key of
    {
        en: "Arranged",
        ja: "調整",
        ko: "조정",
        sv: "...",
        th: "...",
        zh: "选调"
    },
    aside:
    {
        en:
        [
            "Will you do a search on the Internet when you want to practise a song? " +
            "You must be excited if you find the score. " +
            "How frustrated you felt after you had tried to play it several times but failed to do it well! " +
            "The score which you found might be",
            [
                TAG.ul,
                [
                    [
                        "difficult. (In fact, it is hardly possible.)", LB,
                        "Make it easier by yourself! Can't you？"
                    ],
                    [
                        "too easy.", LB,
                        "Are you still a beginner? Is it boring that only ABCDEFG(m)(7) are always played? " +
                        "Because the level of score-maker is:",
                        [
                            TAG.ul,
                            [
                                "low after all.",
                                [
                                    "high.", LB,
                                    "As the majority of net-friends are amateurs, they cannot read the advanced scores."
                                ]
                            ]
                        ],
                        "Polish it! Can't you either？", LB,
                        "Although basic chords are usually enough, they may not be the best. " +
                        "In special cases, they are unsuitable. " +
                        "On the other hand, several advanced chords are easier to play."
                    ],
                    [
                        "wrong at all.", LB,
                        "However it may be right. You do not know how to play whithout demos."
                    ]
                ]
            ],
            "The above are about the cases that you found scores. How will you do if not? DIY!", LB,
            "The ", [TAG.J2C, "arranger"], " of our site did not major in music, " +
            "and began to learn the arrangement a few years ago.", LB,
            "Our site is called ",
            [
                TAG.q,
                [[TAG.HP, "(Arrange)Simply"]],
            ],
            " because only chord-names are available. " +
            "However, advanced chords are probably considered besides basic ones. " +
            "As a matter of fact, it is not difficult to arrange songs. Believe yourself!", PB,
            "The idea of developing a better front-end framework evolved from the deficiencies of other websites " +
            "where chords are not aligned with lyrics. " +
            "First of all, it is fashionable for a programmer to contribute to open-source projects on ",
            [TAG.a, "GitHub", ADDRESS.GitHub],
            ". Next it is helpful in improving the skills of web programming (HTML/CSS/JS). " +
            "Last but not least, it is convenient for music lovers to create chord-scores themselves. " +
            "If you are asked to perform at a party, it is a pity that you cannot do without (remembering) scores, " +
            "isn't it? Now that is no problem! Take out your smart phone...", LB,
            "Although there are several advantages in our framework, only chord-names are available in the scores. " +
            "Appropriate strategies are adopted so that chords are well aligned with lyrics.", LB,
            "There are various styles in writing keys of songs and names of chords. " +
            "At our site they are written as follows:",
            [
                TAG.ul,
                [
                    [
                        "Keys", LB,
                        "Major keys are in upper-case letters and minor in lower-case. If accidentals exist, " +
                        "they are put on the right side of pitches, formatted as superscripts.", LB,
                        "Original keys are for reference only. Please tell us if they are wrong. " +
                        "The keys, in which songs are arranged, are decided by the ", [TAG.J2C, "arranger"], ". " +
                        "If you want to change keys, please use the function of ", [TAG.q, "transposition"],
                        " in each page, which seems superior to those in other websites!", LB,
                        "Our framework also supports the songs including modulation recently. " +
                        "Tonics are connected with arrows in the ", [TAG.q, "Original"], " or ", [TAG.q, "Arranged"],
                        " keys. In addition, those songs can be transposed perfectly!",
                    ],
                    [
                        "Accidentals within chord-names", LB,
                        "Those in roots or basses are written as superscripts on the left or right, respectively. " +
                        "The following forms:", LB,
                        ACCIDENTAL.P + "H/I" + ACCIDENTAL.P + ", ",
                        [TAG.sup, ACCIDENTAL.P], "J/",
                        [TAG.sup, ACCIDENTAL.T], "K, L",
                        [TAG.sup, ACCIDENTAL.T], "/",
                        [TAG.sup, ACCIDENTAL.T], "M, N",
                        [TAG.sup, ACCIDENTAL.T], "/O",
                        [TAG.sup, ACCIDENTAL.P], LB,
                        "are not used. But " +
                        ACCIDENTAL.T + " in a half-diminished chord is not displayed as a superscript."
                    ],
                    [
                        "Major (7+th chord)", LB,
                        "It is written as M. The forms, such as Pmaj7 and Q∆9, are not used."
                    ],
                    [
                        "Symbols", LB,
                        "Chord-names are written with letters instead of symbols like +, ○, ø, etc."
                    ]
                ]
            ],
            "Stave or tablature is not supported for the time being. But ",
            [TAG.q, "ASCII tab"], " may be considered in the future.", PB,
            "Last but not least, we are extremely grateful to the following collaborators -",
            [
                TAG.Cs,
                [
                    "Notation: Ai-ai",
                    "Demonstration: Bao",
                    "Music advisors: JasonPowders, Happy; Red",///Tiger
                    "Page designer: Chao",
                    "Tech supporters: Jay, Imperator, Ben",
                    "Dialect experts: Vivian, Cong; Ai-ai, Bao",
                    "Translators: Ben; Vivian",
                    "Vocal guiders: Mr. Yang, Ai-ai",
                    "Fans: Vice-principal Qian, Ada, Child, Conca, Shrimp..."
                ]
            ]
        ],
        ja:
        [
            "弾き語りの前、きっとネットで楽譜を探してみるだろうね！見つけた時、うれしかったね。" +
            "やってみたが、なかなかできなかったか？どうしたか？見つけた楽譜は",
            [
                TAG.ul,
                [
                    [
                        "難しい。（実は可能性が低い）", LB,
                        "自分で易しく直して。できないか？"
                    ],
                    [
                        "簡単すぎる。", LB,
                        "いつもABCDEFG(m)(7)で弾くなんて、初心者みたいな。スコアを発表した人は",
                        [
                            TAG.ul,
                            [
                                "レベルが低い。",
                                [
                                    "高いが、", LB,
                                    "皆はたいていアマチュアはずである。上級の楽譜が読み取れないためか……"
                                ]
                            ]
                        ],
                        "自分で改良してみて。できないか？", LB,
                        "一般には基本コードが十分であるが、ある特定の场合には適当ではない。" +
                        "一方で、上級コードは必ずしも弾きにくいとは限らない。"
                    ],
                    [
                        "間違っている。", LB,
                        "まあ、合っているかもしれない。模範演奏がないと、どう演奏するかわからない。"
                    ]
                ]
            ],
            "以上は楽譜を見つけた場合であり、見つけなければ／買えなければ、どう？自分でやってみるわ！", LB,
            "ご編曲いただいている", [TAG.J2C, "先生"], "の専門は音楽ではなく、" +
            "楽譜を探すのが嫌いなため、数年前からアレンジを習ってきている……", LB,
            "本サイトにコード譜しか載せていないため、「", [TAG.HP, "簡単（編曲）"], "」と名付けた。" +
            "しかし、初心者と区別するため、必ずしも基本コードだけを使うとは限らない。", LB,
            "実は難しくない！やればできるはずである。", PB,
            "楽譜の専門サイトにいくつかアクセスしたが、たいていコード名と歌詞はばらばらになってしまい、本当に読みにくいため、" +
            "自分でフロントエンド・フレームワークを作成することにした。一つには",
            [TAG.a, "GitHub", ADDRESS.GitHub], "を使ってみて、オープン・ソース・プロジェクトの貢献者になる。" +
            "二つにはWebプログラミング（HTML/CSS/JS）を練習する。三つには自分でコード譜が楽に作成できる。これは主な目的である！" +
            "もしパーティーでパフォーマンスを依頼された場合、暗譜で披露できなければ、惜しい！今は大丈夫である。スマホを出して……", LB,
            "完了された機能では、コード譜の作成しかできない。" +
            "本フレームワークでは適当な手法を用い、きれいにコード名を歌詞に揃える。", LB,
            "曲のキーとコード名については、各サイトにより異なるため、本サイトにおける書き方を説明する：",
            [
                TAG.ul,
                [
                    [
                        "調", LB,
                        "長調と短調は別々に大文字と小文字で書いてある。変化記号があれば、右に置き、上付き文字で表示する。", LB,
                        "原調はただ参考に供するだけである。合わなかったら教えてもらおうか。" +
                        "調整したキーは", [TAG.J2C, "編曲先生"], "により決められる。" +
                        "キー変更をすれば、本フレームワークの誇らしい「移調」機能を使ってもらおうか？", LB,
                        "転調がある曲にも対応するため、本フレームワークは大幅に更新されたばかりである。" +
                        "各キーは矢印でつながる。ちなみに、そのような曲も完璧に移調できる！"
                    ],
                    [
                        "コード名における変化記号", LB,
                        "上付き文字で表示する。ルートとベース音における変化記号は、別々に左と右側に書いてある。" +
                        "すなわち、以下のような書き方：", LB,
                        ACCIDENTAL.P + "H/I" + ACCIDENTAL.P + "、",
                        [TAG.sup, ACCIDENTAL.P], "J/",
                        [TAG.sup, ACCIDENTAL.T], "K、L",
                        [TAG.sup, ACCIDENTAL.T], "/",
                        [TAG.sup, ACCIDENTAL.T], "M、N",
                        [TAG.sup, ACCIDENTAL.T], "/O",
                        [TAG.sup, ACCIDENTAL.P], LB,
                        "は使用しない。一方で、減五短七の和音における" + ACCIDENTAL.T + "は上付きではない。"
                    ],
                    [
                        "長（七以上の和音）", LB,
                        "すなわちM/maj(or)。大文字のMで表示する。Pmaj7やQ∆9のような書き方は使用しない。"
                    ],
                    [
                        "記号", LB,
                        "プラスや丸や空集合などのかわりに、すべてアルファベットで書く。"
                    ]
                ]
            ],
            "現在は五線譜やタブ譜などが表示できないが、今後は新機能を追加するはずである。ASCII tabは検討中……", PB,
            "最後には下記の協力者——",
            [
                TAG.Cs,
                [
                    "天才採譜：艾々",
                    "模範演奏：中宝",
                    "音楽顧問：東山直、乐々；小紅",///泰さん
                    "画面設計：阿超",
                    "技術協力：小布、大帝、奔兒",
                    "方言達人：小映、小聡；艾々、中宝",
                    "外語翻訳：奔兒；小映",
                    "声楽指導：楊会長、艾々",
                    "応援者達：銭副校長、阿達、コドモ、コンカ、エビ……"
                ]
            ],
            "に心より感謝する！"
        ],
        ko:
        [
            "...", LB,
            "..."
        ],
        sv:
        [
            "...",
            "..."
        ],
        th:
        [
            "...",
            "..."
        ],
        zh:
        [
            "当你想弹某首歌时，一定会去网上找谱吧？（嗨，大家都是这么过来的！）搜到乐谱的那一刻，开心吧？" +
            "（弹完觉得很满足，这种情况咱就不讨论了；）练了几下，发现不对路子，失落喽！那你找的谱子大概是：",
            [
                TAG.ul,
                [
                    [
                        "太难。（其实这种情况并不多见，具体原因在下一种情况中会提及。）", LB,
                        "自己改简单点儿呀！不会？"
                    ],
                    [
                        "小儿科。", LB,
                        "弹来弹去ABCDEFG(m)(7)，跟个初学者似的，一点儿也没意思！原因取决于记谱者：",
                        [
                            TAG.ul,
                            [
                                "本身水平就有限。",
                                [
                                    "是有水平的。", LB,
                                    "但考虑到大多数网友都是业余爱好者，发布太难的，可能看不懂？所以……"
                                ]
                            ]
                        ],
                        "那自己润色下呀！不会？", LB,
                        "虽然基础和弦一般也够用了，就不是最好；在特定的场合，倒还真不能满足要求！" +
                        "另一方面，有时高级货反而还好弹。"
                    ],
                    [
                        "根本就是错的。", LB,
                        "当然也有可能客观上是对的？只是没有示范，你主观上不知道如何正确地演奏？"
                    ]
                ]
            ],
            "以上讨论的都找到谱的情况，那肯定就有找不到的啦！" +
            "总之，没有（合适的）谱子时，怎么办呢？到处留言要谱？可能没有人会理你，原因你懂得的呀！", LB,
            "其实仔细想一想，这一行为本身就是很奇怪的！既然求谱了，说明你水平不行？就算给了你谱子，你可能也弹不了，甚至都看不懂；" +
            "有点儿实力的人呢，那也不用求人了，自己编呗。所以那些求谱者，也许是为了收藏《乐谱》？", LB,
            "本站邀请的", [TAG.J2C, "编曲老师"], "并非科班出身，也是厌倦了长期的搜（垃圾）谱生涯，于数年前才开始学习编曲的……", LB,
            "本站之所以叫“", [TAG.HP, "简单（编曲）"], "”，是因为只在歌词上标注了和弦名。" +
            "而且大多采用简单的、大家都熟知却很经典的节奏，效果倒还不错啦！" +
            "不过为了摆脱初学者的队伍，和弦配得并不简单哟！而且尽可能避开各大乐谱网站与教学视频里提及的所谓《万能伴奏》。", LB,
            "其实没什么难的，相信你也可以做到！", PB,
            "看到其它网站发布的谱子上，和弦名与歌词对得参差不齐、歪歪扭扭的样子，萌生了自己动手写个前端框架的念头。一来是赶赶时髦，学着用",
            [TAG.a, "GitHub", ADDRESS.GitHub], "。借着这样一个平台，加入到开源队伍中；二来嘛，练练Web三件套（HTML/CSS/JS）；" +
            "再者自己写谱也方便，这才是开源者的主要目的！在外聚会、交友时遇到被要求即兴表演助兴的场合，因不记得谱而无法献技，" +
            "岂不把我们桃花岛的脸都丢尽了？现在好啦，掏出手机……", LB,
            "目前所完成的功能中，只对应了和弦谱的输入。本框架选用合适的编程技术，力求将和弦名与歌词对得精准。", LB,
            "鉴于歌曲的调和一部分和弦名有多种写法，先对本站采用的符号和名称进行一下说明：",
            [
                TAG.ul,
                [
                    [
                        "调", LB,
                        "大调歌曲的用大写字母表示，小调则小写。如有升降号则统一放在右边，用上标形式显示。", LB,
                        "原调仅供参考。如有错，请不吝指正；选调大都以", [TAG.J2C, "编曲老师"], "所欢喜的调儿来定。" +
                        "需要换key的网友，请使用本站特有的《变调》功能，这是本框架的《大招》之一！", LB,
                        "至于歌曲中有《转调》的情况，本框架近期也新增了《大招》对应——原调和选调中会有箭头连接各调号，并且也能完美变调！"
                    ],
                    [
                        "和弦名中的升降号", LB,
                        "上标形式显示。根音中的升降号写在左边；转位低音中的写在右边，这样貌似好看点儿？不使用形如：", LB,
                        ACCIDENTAL.P + "H/I" + ACCIDENTAL.P + "、",
                        [TAG.sup, ACCIDENTAL.P], "J/",
                        [TAG.sup, ACCIDENTAL.T], "K、L",
                        [TAG.sup, ACCIDENTAL.T], "/",
                        [TAG.sup, ACCIDENTAL.T], "M、N",
                        [TAG.sup, ACCIDENTAL.T], "/O",
                        [TAG.sup, ACCIDENTAL.P], LB,
                        "的名儿。但半减和弦中的" + ACCIDENTAL.T + "不用上标。"
                    ],
                    [
                        "大（七及以上和弦）", LB,
                        "即M/maj(or)，一律用大写M来表示。即不使用形如：Pmaj7、Q∆9的写法。"
                    ],
                    [
                        "缩略符号", LB,
                        "加号、圆圈、空集等不使用，全用字母书写。"
                    ]
                ]
            ],
            "五／六线谱暂时无法实现。今后框架的功能应该会扩充，可能考虑支持简谱和ASCII tab谱……", PB,
            "最后对于合作者们——",
            [
                TAG.Cs,
                [
                    "天才记谱：艾々",
                    "示范演奏：中宝",
                    "音乐顾问：东山直、乐々；小红",///泰哥
                    "页面设计：阿超",
                    "技术支持：小布、大帝、奔儿",
                    "方言达人：小映、小聪；艾々、中宝",
                    "外语翻译：奔儿；小映",
                    "声乐指导：杨会长、艾々",
                    "粉丝代表：钱副校长、阿达、小孩子、孔卡、虾米……"
                ]
            ],
            "表示感谢！"
        ]
    },
    colon:
    {
        en: ": ",
        ja: "：",
        ko: ": ",
        sv: ": ",
        th: ": ",
        zh: "："
    },
    demo:
    {
        en: "Demo",
        ja: "模範演奏",
        ko: "데모",
        sv: "Demo",
        th: "Demo",
        zh: "示范演奏"
    },
    footer:
    {
        en:
        [
            "Thank you for your visit to our site.", PB,
            "A front-end framework is being provided for enthusiasts of music and programming " +
            "to create chord-scores conveniently.", LB,
            "Thus our site is not the one to inquire for musical scores.", LB,
            "All of the scores and multimedia available at our site are used to test the framework.", LB,
            "Please do not reprint them!"
        ],
        ja:
        [
            "わざわざご覧いただき、誠にありがとうございます！", PB,
            "音楽とプログラミング愛好者のため、コード譜が楽に作成できるフロント・エンド・フレームワークを実装してみました。", LB,
            "楽譜を検索するため、本サイトの利用はご遠慮ください。", PB,
            "歌詞は掲載しかねます。"///
        ],
        ko:
        [
            "이 사이트를 방문해 주셔서 감사합니다.", LB,
            "모든 한국어 단어는 Google 번역으로 번역됩니다."
        ],
        sv:
        [
            "Thank you for your visit to our site.", PB,
            "All of the Swedish words are translated by ",
            [TAG.q, "Google Translate"],
            "."
        ],
        th:
        [
            "Thank you for your visit to our site.", PB,
            "All of the Thai words are translated by ",
            [TAG.q, "Google Translate"],
            "."
        ],
        zh:
        [
            "希望您会欢喜以上内容！", PB,
            "本站旨在为广大音乐或编程爱好者提供一个能方便制作和弦谱的前端框架，并非乐谱查询网站。", LB,
            "页面内所显示的谱子及多媒体，皆作为测试框架所用，请勿转载！", LB,
            "如有侵权之处，请来信告之，本站一定删除该内容。"
        ],
    },
    latest:
    {
        en: " (new)",
        ja: "（新着）",
        ko: " (새로운)",
        sv: "",
        th: "",
        zh: "（新谱置顶）"
    },
    notice:
    {
        en: "Notice",
        ja: "ご挨拶",
        ko: "알아 채다",
        sv: "...",
        th: "...",
        zh: "寄语"
    },
    original: // original key
    {
        en: "Original",
        ja: "原調",
        ko: "원래 키",
        sv: "...",
        th: "...",
        zh: "原调"
    },
    transpose:
    {
        en: "Transpose",
        ja: "移調",
        ko: "변경",
        sv: "...",
        th: "...",
        zh: "变调"
    },
    unavailable:
    {
        en: "(unavailable)",
        ja: "（未登録）",
        ko: "...",
        sv: "(unavailable)",
        th: "(unavailable)",
        zh: "（暂无）"
    }
}
