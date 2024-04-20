// algorithm
function getRandomInteger(max) // [0, max)
{
    return Math.floor(Math.random() * max);
}
function shuffle(original)
{
    var i;
    var j = 0; // index of the item to be swapped
    var intermediate = "";
    var shuffled = original.slice(0); // clone and not change the original array
    for (i = original.length - 1; i > 0; i--)
    {
        j = getRandomInteger(i + 1);
        if (i != j)
        {
            intermediate = shuffled[j];
            shuffled[j] = shuffled[i];
            shuffled[i] = intermediate;
        }
    }
    return shuffled;
}
function removeAllChildren(parent)
{
// faster to check for the first child than the last one
    while (parent.firstChild) parent.lastChild.remove();
// faster to remove the last child than the first one
}
// encapsulation
function appendText(text, tag)
{
    var node = document.createTextNode(text);
    tag.appendChild(node);
}
function appendTag(tag, container) // texts not added or attributes not set yet
{
    var element = document.createElement(tag);
    container.appendChild(element);
    return element;
}
function appendTag8text(tag, text, container)
{
    var element = appendTag(tag, container);
    appendText(text, element);
    return element;
}
function appendTerm(word, language, container) // a term of original or arranged key
{
    return appendTag8text(TAG.DT, DICTIONARY[word][language] + DICTIONARY.colon[language], container);
}
function appendBreak(container)
{
    appendTag(TAG.BR, container);
}
// link
function getAnchor(original, link)
{
    return [TAG.A, original[ELEMENT.between], link];
}
function getLink(prefix, folder, file) // file may be path, base or path/base.
{
    return prefix + folder + "/" + file + "." + FileType[folder];
}
function link2bookmark(id)
{
    return "#" + id;
}
// append texts
function normalizeTag(prefix, original, container)
{
    switch (original[ELEMENT.tag])
    {
        case TAG.ALP: // [ALP, between, ALP]
            return getAnchor(original, getLink(prefix, PAGE, original[ELEMENT.ALP]));
        case TAG.BoA: // [BoA, between, ALP, ID]
            return getAnchor(original, getLink(prefix, PAGE, original[ELEMENT.ALP]) + link2bookmark(original[ELEMENT.ID]));
        case TAG.CHORD: // [CHORD, between]
            appendChord(original[ELEMENT.between], container);
            return [];
        case TAG.COLLABORATORS: // [COLLABORATORS, between]
            return [TAG.UL, original[ELEMENT.between], TAG.COLLABORATORS];
        case TAG.HP: // [HP, between]
            return getAnchor(original, prefix + ADDRESS.HomePage);
        case TAG.J2C: // [J2C, between]
            return getAnchor(original, link2bookmark(TAG.COLLABORATORS));
        case TAG.PB:
            appendBreak(container);
            return LB;
        default:
            return original;
    }
}
function appendList(prefix, list, container) // list is an array.
{
    var l; // string or array
    for (l of list) appendRecursively(prefix, [[TAG.LI, l]], container);
}
function appendRecursively(prefix, content, container)
{
    var c; // string or array
    var normalized = [];
    var tag = ""; // tag name
    var element;
    if (STRING === typeof content) appendText(content, container); // e.g. ab: "cd"
    else // array
        for (c of content)
            if (STRING === typeof c) appendText(c, container); // e.g. ab: ["cd", LB, "ef"]
            else // array
            {
                normalized = normalizeTag(prefix, c, container); // transform "c" into an HTML tag if necessary
                if (normalized.length > 0) // except TAG.CHORD
                {
                    tag = normalized[ELEMENT.tag];
                    element = appendTag(tag, container);
                    switch (tag)
                    {
                        case TAG.BR:
                            break;
                        case TAG.OL:
                        case TAG.UL:
                            if (normalized.length > ELEMENT.COLLABORATORs) element.id = normalized[ELEMENT.COLLABORATORs];
                            appendList(prefix, normalized[ELEMENT.between], element);
                            break;
                        case TAG.A:
                            element.href = normalized[ELEMENT.href];
                        default:
                            appendRecursively(prefix, normalized[ELEMENT.between], element);
                    }
                }
            }
}
// transposition
function convert2ASCII(tone)
{
    return tone.charCodeAt(KEY.TET12);
}
function limit2interval(number, left, right) // interval notation: [left-endpoint, right-endpoint]
{
    if (number < left) return number + TRANSPOSITION.TET12;
    else if (number > right) return number - TRANSPOSITION.TET12;
    else return number;
}
function changeTone(tone, offset, left, right)
{
    return String.fromCharCode(limit2interval(convert2ASCII(tone) + offset, left, right)); // char => number => char
}
function changeMajorKey(key, offset)
{
    return changeTone(key, offset, TRANSPOSITION.O, TRANSPOSITION.Z);
}
function reverseNote(name)
{
    return name[KEY.SOLFEGE] + name[KEY.ACCIDENTAL];
}
function appendSpecialString(text, container) // transformed into special characters if necessary
{
    var t = "";
    for (t of text)
        switch (t)
        {
            case "L": // (NATURA)L
                break;
            case "P": // (SHAR)P
            case "T": // (FLA)T
                appendTag8text(TAG.SUP, ACCIDENTAL[t], container);
                break;
            case "-": // used in half-diminished chords
                appendText(ACCIDENTAL.T, container);
                break;
            default:
                appendText(t, container);
        }
}
function transpose(offset, transposition)
{
    var current = ""; // current key
    var tone = "";
    var combination = ""; // tone + accidental
    var transposed = ""; // transposed note
    var t = {};
    var tc = {}; // object defined in function appendNote()
    for (t of transposition)
    {
        current = /[O-Z]/.test(t.original) ? changeMajorKey(t.arranged, offset) : changeTone(t.arranged, offset, TRANSPOSITION.o, TRANSPOSITION.z);
        for (tc of t.collection)
        {
            removeAllChildren(tc.element);
            tone = changeMajorKey(tc.tet12, offset);
            combination = tone + ACCIDENTAL.L;
            if (!(combination in KEY.TONALITY)) combination = tone + CIRCLE5[current];
            transposed = KEY.TONALITY[combination];
            appendSpecialString(CHORD.R === tc.position ? transposed : reverseNote(transposed), tc.element);
        }
    }
}
// create page
function getPage(url)
{
    var splitURL = url.split("/");
    var name = splitURL.pop().split(".").shift(); // name of current page
    var page =
    {
        information: {},
        addition:
        {
            prefix: UP1, // prefix to go up directories
            top: name, // top menu, used to highlight the current NAV link
            path: name, // effective path without extension
            language: ""
        }
    }; // had better not define intermediate variables, such as pa=page.addition
    if (name in DATA) page.information = DATA[name];
    else
    {
        page.addition.prefix = UP2;
        page.addition.top = splitURL.pop(); // pop the 2nd time
        page.addition.path = page.addition.top + "/" + name;
        page.information = DATA[page.addition.top].classification[name];
    }
    page.addition.language = DATA[page.addition.top].language;
    return page;
}
function appendNote(note, tone, flag, collection, container)
{
    var span = appendTag(TAG.SPAN, container);
    appendSpecialString(note, span);
    collection.push
    (
        {
            element: span,
            tet12: tone, // twelve-tone equal temperament
            position: flag // position of note, ROOT or BASS
        }
    );
}
function appendChord(chord, container)
{
    var collection = [];
    var small;
    var text = "";
    appendNote(KEY.TONALITY[chord.R], chord.R, CHORD.R, collection, container);
    if (CHORD.T in chord)
    {
        if (m === chord.T) appendText(m, container);
        else
        {
            if (m === chord.T[FIRST] && m7b5 !== chord.T)
            {
                appendText(m, container);
                text = chord.T.slice(1);
            }
            else text = chord.T;
            small = appendTag(TAG.SMALL, container);
            appendSpecialString(text, small);
        }
    }
    if (CHORD.B in chord)
    {
        appendText("/", container);
        appendNote(reverseNote(KEY.TONALITY[chord.B]), chord.B, CHORD.B, collection, container);
    }
    return collection;
}
function collectChords(chord, collection, container)
{
    var note = {};
    for (note of appendChord(chord, container)) collection.push(note);
}
function appendLine(chords, lyrics, collection, container) // a line of lyrics with chords
{
    var ruby;
    var rt;
    var sls = FWS + lyrics + FWS; // firstly add full-width spaces on both sides
    var difference = Object.keys(chords).pop() - sls.length; // compare the index of last chord to the length of lyrics
    var i;
    var index = "";
    var chord; // a chord (hash) or several chords with spaces (array)
    var from = 0; // starting index of the lyrics
    var to = 0; // ending index of the lyrics
    var offset = 0; // difference between "from" & "to"
    var lc = 0; // length of a chord
    var ovc = "";
    var c; // string or hash
    for (i = 0; i <= difference; i++) sls += FWS; // fill with full-width spaces///can be improved?
    for ([index, chord] of Object.entries(chords))
    {
// append lyrics without chords if necessary
        to = parseInt(index);
        if (from != to) appendText(sls.slice(from, to), container);
// calculate the offset
        if (/[\u0026-\u007a\u00c0-\u00ff]/.test(sls[to])) // half width
        {
            lc = CHORD.B in chord ? 1 : 0; // in general, not a set of chords but a single chord
            for (ovc of Object.values(chord)) lc += ovc.length;
            offset = Math.ceil(lc / 3); // at most 3 characters in the name of a chord over a half-width character
        }
        else offset = 1; // full width
// append lyrics with a chord/chords
        from = Math.min(to + offset, sls.length); // swap "from" & "to" so that the next "from" need not be set
        ruby = appendTag8text(TAG.RUBY, sls.slice(to, from), container);
        rt = appendTag(TAG.RT, ruby);
        if (Array.isArray(chord)) // a set of chords, which may contains (D)FWSs
            for (c of chord)
                if (STRING === typeof c) appendText(c, rt); // (D)FWS
                else collectChords(c, collection, rt);
        else collectChords(chord, collection, rt); // a single chord
    }
    if (from < sls.length) appendText(sls.slice(from, sls.length), container); // add the rest of lyrics if necessary
    appendBreak(container); // line break
}
function appendScore(song, container)
{
    var pre = appendTag(TAG.PRE, container);
    var transposition = [];
    var t = {}; // each item of transposition
    var ss = {};
    var sc = [];
    var lnl = 0; // line number of lyrics
    var lc = {}; // a line of chords
    var ll = ""; // a line of lyrics
    for (ss of song.score)
    {
        t =
        {
            original: ss.original, // original key
            arranged: "arranged" in ss ? ss.arranged : ss.original, // arranged in the key of
            collection: []
        }
        for (sc of ss.chords)
        {
            if (FIRST != lnl) appendBreak(pre); // paragraph break
            for (lc of sc)
            {
                ll = song.lyrics[lnl].replace(/  /g, FWS); // replace 2 white spaces with a FWS if such spaces exist
                appendLine(lc, ll, t.collection, pre);
                lnl++;
            }
        }
        transposition.push(t);
    }
    return transposition;
}
function appendParagraph(prefix, which, parent, container) // preface, postscript or comment
{
    var p;
    if (which in parent)
    {
        p = appendTag(TAG.P, container);
        appendRecursively(prefix, parent[which], p);
    }
}
function appendSection(song, language, container)
{
    var section = appendTag(TAG.SECTION, container);
    var dl = appendTag(TAG.DL, section);
    var dt;
    var select;
    var option;
    var keys = {original: "", arranged: ""};
    var which = ""; // original or arranged key
    var key = "";
    var i;
    var transposition = appendScore(song, section);
    var t = transposition[FIRST]; // used as the 1st item, or each one of "transposition"
    var difference = limit2interval // difference between arranged & original key
                        (
                            convert2ASCII(t.arranged) - convert2ASCII(t.original),
                            TRANSPOSITION.MIN,
                            TRANSPOSITION.MAX
                        );
// key
    for (t of transposition) // join keys with arrow if necessary
        for (which in keys) keys[which] += reverseNote(KEY.TONALITY[t[which]]) + ARROW;
    for ([which, key] of Object.entries(keys))
    {
        dt = appendTerm(which, language, dl);
        appendSpecialString(key.slice(0, -1), dt); // remove the last arrow
    }
// transposition
    dt = appendTerm("transpose", language, dl);
    select = appendTag(TAG.SELECT, dt);
    for (i = TRANSPOSITION.MIN; i <= TRANSPOSITION.MAX; i++)
    {
        option = appendTag8text(TAG.OPTION, i > 0 ? "+" + i : i, select);
        option.value = i;
        if (difference == i) option.selected = true;
    }
    select.onchange = function()
                        {
                            transpose(parseInt(this.value) - difference, transposition);
                        };
}
function appendArticle(page, bookmark, container)
{
    var article = appendTag(TAG.ARTICLE, container);
    var h2 = appendTag(TAG.H2, article);
    var details;
    var song = page.information.main[bookmark];
    var pa = page.addition;
    var language = COVER in song ? song.cover : pa.language;
    var a = appendTag8text(TAG.A, song.h2, h2);
    var sd = song.details;
    var sdd = sd.demo;
    var multiMedia;
    article.id = bookmark; // create bookmarks with ID attribute
    a.href = link2bookmark(TAG.ASIDE); // jump to the top of aside when h2 is clicked
    appendParagraph(pa.prefix, "preface", song, article);
    appendSection(song.section, language, article);
    appendParagraph(pa.prefix, "postscript", song, article);
// demo
    details = appendTag(TAG.DETAILS, article);
    appendTag8text(TAG.SUMMARY, DICTIONARY.demo[language], details);
    multiMedia = appendTag(sdd, details);
    multiMedia.src = getLink(pa.prefix, sdd, pa.path + "/" + bookmark);
    multiMedia.controls = true;
    multiMedia.onmouseenter = function()
                                {
                                    multiMedia.play();
                                };
    appendParagraph(pa.prefix, "comment", sd, details);
}
function appendMenus(addition, path, parent, container) // create menus recursively
{
    var ul = appendTag(TAG.UL, container);
    var li;
    var a;
    var menu = "";
    var child = {};
    var current = ""; // current path
    for ([menu, child] of Object.entries(parent))
    {
        li = appendTag(TAG.LI, ul);
        a = appendTag8text(TAG.A, child.nav, li);
        current = path + menu;
        if (addition.top === current)
        {
            li.style.backgroundColor = "crimson";
            li.style.color = "gold";
        }
        if (CLASSIFICATION in child) appendMenus(addition, current + "/", child.classification, li);
        else
            if (addition.path !== current) a.href = getLink(addition.prefix, PAGE, current);
    }
}
function createMain(page)
{
    var main = appendTag(TAG.MAIN, document.body);
    var songs = page.information.main;
    var bookmarks = Object.keys(songs);
    var b1s = bookmarks.shift(); // bookmark of the first song
    var first = songs[b1s];
    var bookmark = "";
    first.h2 += DICTIONARY.arrival[COVER in first ? first.cover : page.addition.language];
    appendArticle(page, b1s, main); // append the first song
    for (bookmark of shuffle(bookmarks)) appendArticle(page, bookmark, main); // append the rest
}
function createAside(page)
{
    var aside = appendTag(TAG.ASIDE, document.body);
    var ol = appendTag(TAG.OL, aside);
    var small;
    var li;
    var a;
    var id = "";
    var song = {};
    var pa = page.addition;
    aside.id = TAG.ASIDE; // create bookmarks so that the page can jump to the top of aside
    for ([id, song] of Object.entries(page.information.main))
    {
        li = appendTag(TAG.LI, ol);
        a = appendTag8text(TAG.A, song.h2, li);
        a.href = link2bookmark(id);
    }
    appendTag8text(TAG.H3, DICTIONARY.notice[pa.language], aside);
    small = appendTag(TAG.SMALL, aside);
    appendRecursively(pa.prefix, DICTIONARY.aside[pa.language], small);
}
function createFooter(addition)
{
    var footer = appendTag(TAG.FOOTER, document.body);
    var small = appendTag(TAG.SMALL, footer);
    appendRecursively(addition.prefix, DICTIONARY.footer[addition.language], small);
}
function createPage(url)
{
    var link = appendTag(TAG.LINK, document.head);
    var nav = appendTag(TAG.NAV, document.body);
    var header = appendTag(TAG.HEADER, document.body);
    var page = getPage(url);
    var pa = page.addition;
// link CSS///to add icon: <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
    link.rel = "stylesheet";
    link.href = getLink(pa.prefix, "css", "sidebar");
// title
    document.title = page.information.header.h1;
// create nav
    appendMenus(pa, "", DATA, nav);
// create header
    appendTag8text(TAG.H1, document.title, header);
// create other containers
    createMain(page);
    createAside(page);
    createFooter(pa);
}///!!!new styles to be added: Parallax Scrolling, Ribbon
