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
// faster to check for the first Child than the last one
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
function appendDT8colon(word, language, container)
{
    return appendTag8text(TAG.dt, DICTIONARY[word][language] + DICTIONARY.colon[language], container);
}
function appendBreak(container)
{
    appendTag(TAG.br, container);
}
// link
function getAnchor(original, link)
{
    return [TAG.a, original[ELEMENT.between], link];
}
function getLink(prefix, folder, file) // "file" may be "path", "base" or "path/base".
{
    var extension = folder in FileType ? FileType[folder] : folder;
    return prefix + folder + SLASH + file + DOT + extension;
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
            return getAnchor
                    (
                        original,
                        getLink(prefix, PAGE, original[ELEMENT.ALP]) + link2bookmark(original[ELEMENT.ID])
                    );
        case TAG.CHORD: // [CHORD, between]
            appendChord(original[ELEMENT.between], container);
            return [];
        case TAG.COLLABORATORS: // [COLLABORATORS, between]
            return [TAG.ul, original[ELEMENT.between], TAG.COLLABORATORS];
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
function appendList(prefix, list, container) // "list" is an array.
{
    var l; // string or array
    for (l of list) appendRecursively(prefix, [[TAG.li, l]], container);
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
                        case TAG.br:
                            break;
                        case TAG.ol:
                        case TAG.ul:
                            if (normalized.length > ELEMENT.COLLABORATORs) element.id = normalized[ELEMENT.COLLABORATORs];
                            appendList(prefix, normalized[ELEMENT.between], element);
                            break;
                        case TAG.a:
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
    return tone.charCodeAt(KEY.ET);
}
function limit2interval(number, left, right) // interval notation: [left-endpoint, right-endpoint]
{
    if (number < left) return number + TRANSPOSITION.TET12;
    else if (number > right) return number - TRANSPOSITION.TET12;
    else return number;
}
function changeTone(tone, offset, left, right)
{
    return String.fromCharCode(limit2interval(convert2ASCII(tone) + offset, left, right)); // converted to char finally
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
                appendTag8text(TAG.sup, ACCIDENTAL[t], container);
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
    var accidental = "";
    var transposed = ""; // transposed note
    var t = {};
    var tc = {};
    for (t of transposition)
    {
        if (/[O-Z]/.test(t.original)) current = changeMajorKey(t.arranged, offset);
        else current = changeTone(t.arranged, offset, TRANSPOSITION.o, TRANSPOSITION.z);
        for (tc of t.collection)
        {
            removeAllChildren(tc.element);
            tone = changeMajorKey(tc.et, offset);
            if (tone + ACCIDENTAL.NATURAL in KEY.TONALITY) accidental = ACCIDENTAL.NATURAL;
            else
                switch (current)
                {
                    case "O": case "o": //  C ~ a
                    case "T": case "t": //  F ~ d
                    case "Y": case "y": // ♭B ~ g
                    case "R": case "r": // ♭E ~ c
                    case "W": case "w": // ♭A ~ f
                    case "P": case "p": // ♭D ~ b♭
                        accidental = ACCIDENTAL.FLAT;
                        break;
                    case "V": case "v": //  G ~ e
                    case "Q": case "q": //  D ~ b
                    case "X": case "x": //  A ~ f♯
                    case "S": case "s": //  E ~ c♯
                    case "Z": case "z": //  B ~ g♯
                    case "U": case "u": // ♯F ~ d♯
                        accidental = ACCIDENTAL.SHARP;
                }
            transposed = KEY.TONALITY[tone + accidental];
            appendSpecialString(CHORD.B === tc.ln ? reverseNote(transposed) : transposed, tc.element);
        }
    }
}
// create page
function getPage(url)
{
    var splitURL = url.split(SLASH);
    var name = splitURL.pop().split(DOT).shift(); // name of current page
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
    };
    if (name in DATA) page.information = DATA[name];
    else
    {
        page.addition.prefix = UP2;
        page.addition.top = splitURL.pop();
        page.addition.path = page.addition.top + SLASH + name;
        page.information = DATA[page.addition.top].classification[name];
    }
    page.addition.language = DATA[page.addition.top].language;
    return page;
}
function appendNote(note, tone, position, collection, container)
{
    var eSPAN = appendTag(TAG.span, container);
    appendSpecialString(note, eSPAN);
    collection.push
    (
        {
            element: eSPAN,
            et: tone, // equal temperament
            ln: position // position of the lowest note
        }
    );
}
function appendChord(chord, container)
{
    var collection = [];
    var eSMALL;
    var st = ""; // small text
    appendNote(KEY.TONALITY[chord.R], chord.R, CHORD.R, collection, container);
    if (CHORD.T in chord)
    {
        if (m === chord.T) appendText(m, container);
        else
        {
            if (m === chord.T[FIRST] && m7b5 !== chord.T)
            {
                appendText(m, container);
                st = chord.T.slice(1);
            }
            else st = chord.T;
            eSMALL = appendTag(TAG.small, container);
            appendSpecialString(st, eSMALL);
        }
    }
    if (CHORD.B in chord)
    {
        appendText(SLASH, container);
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
    var eRUBY;
    var eRT;
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
        eRUBY = appendTag8text(TAG.ruby, sls.slice(to, from), container);
        eRT = appendTag(TAG.rt, eRUBY);
        if (Array.isArray(chord)) // a set of chords, which may contains (D)FWSs
            for (c of chord)
                if (STRING === typeof c) appendText(c, eRT); // (D)FWS
                else collectChords(c, collection, eRT);
        else collectChords(chord, collection, eRT); // a single chord
    }
    if (from < sls.length) appendText(sls.slice(from, sls.length), container); // add the rest of lyrics if necessary
    appendBreak(container); // line break
}
function appendScore(section, container)
{
    var ePRE = appendTag(TAG.pre, container);
    var transposition = [];
    var t = {}; // each item of transposition
    var ss = {};
    var sc = [];
    var lnl = 0; // line number of lyrics
    var lc = {}; // a line of chords
    var ll = ""; // a line of lyrics
    for (ss of section.score)
    {
        t =
        {
            original: ss.original, // original key
            arranged: "arranged" in ss ? ss.arranged : ss.original, // arranged in the key of
            collection: []
        }
        for (sc of ss.chords)
        {
            if (FIRST != lnl) appendBreak(ePRE); // paragraph break
            for (lc of sc)
            {
                ll = section.lyrics[lnl].replace(/  /g, FWS); // replace 2 white spaces with a FWS if such spaces exist
                appendLine(lc, ll, t.collection, ePRE);
                lnl++;
            }
        }
        transposition.push(t);
    }
    return transposition;
}
function appendParagraph(prefix, which, parent, container) // preface, postscript or comment
{
    var eP;
    if (which in parent)
    {
        eP = appendTag(TAG.p, container);
        appendRecursively(prefix, parent[which], eP);
    }
}
function appendSection(section, language, container)
{
    var eSECTION = appendTag(TAG.section, container);
    var eDL = appendTag(TAG.dl, eSECTION);
    var eDT;
    var eSELECT;
    var eOPTION;
    var keys = {original: "", arranged: ""};
    var which = ""; // original or arranged key
    var key = "";
    var i;
    var transposition = appendScore(section, eSECTION);
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
        eDT = appendDT8colon(which, language, eDL);
        appendSpecialString(key.slice(0, -1), eDT); // remove the last ARROW
    }
// transposition
    eDT = appendDT8colon("transpose", language, eDL);
    eSELECT = appendTag(TAG.select, eDT);
    for (i = TRANSPOSITION.MIN; i <= TRANSPOSITION.MAX; i++)
    {
        eOPTION = appendTag8text(TAG.option, i > 0 ? "+" + i : i, eSELECT);
        eOPTION.value = i;
        if (difference == i) eOPTION.selected = true;
    }
    eSELECT.onchange = function()
    {
        transpose(parseInt(this.value) - difference, transposition);
    };
}
function appendArticle(page, bookmark, container)
{
    var eARTICLE = appendTag(TAG.article, container);
    var eH2 = appendTag(TAG.h2, eARTICLE);
    var eDETAILS;
    var song = page.information.main[bookmark];
    var pa = page.addition;
    var language = COVER in song ? song.cover : pa.language;
    var eA = appendTag8text(TAG.a, song.h2, eH2);
    var sd = {}; // song.details if exists
    var multiMedia;
    eARTICLE.id = bookmark; // create bookmarks with ID attribute
    eA.href = link2bookmark(TAG.aside); // jump to the top of aside when h2 is clicked
    appendParagraph(pa.prefix, "preface", song, eARTICLE);
    appendSection(song.section, language, eARTICLE);
    appendParagraph(pa.prefix, "postscript", song, eARTICLE);
// demo
    eDETAILS = appendTag(TAG.details, eARTICLE);
    appendTag8text(TAG.summary, DICTIONARY.demo[language], eDETAILS);
    if (TAG.details in song)
    {
        sd = song.details;
        if ("demo" in sd)
        {
            multiMedia = appendTag(sd.demo, eDETAILS);
            multiMedia.src = getLink(pa.prefix, sd.demo, pa.path + SLASH + bookmark);
            multiMedia.controls = true;
            multiMedia.onmouseenter = function()
            {
                multiMedia.play();
            };
        }
        appendParagraph(pa.prefix, "comment", sd, eDETAILS);
    }
    else appendTag8text(TAG.p, DICTIONARY.unavailable[language], eDETAILS);
}
function appendMenus(addition, path, parent, container) // create menus recursively
{
    var eUL = appendTag(TAG.ul, container);
    var eLI;
    var eA;
    var menu = "";
    var child = {};
    var cp = ""; // current path
    for ([menu, child] of Object.entries(parent))
    {
        eLI = appendTag(TAG.li, eUL);
        eA = appendTag8text(TAG.a, child.nav, eLI);
        cp = path + menu;
        if (addition.top === cp)
        {
            eLI.style.backgroundColor = "crimson";
            eLI.style.color = "gold";
        }
        if (CLASSIFICATION in child) appendMenus(addition, cp + SLASH, child.classification, eLI);
        else
            if (addition.path !== cp) eA.href = getLink(addition.prefix, PAGE, cp);
    }
}
function createMain(page)
{
    var eMAIN = appendTag(TAG.main, document.body);
    var songs = page.information.main;
    var bookmarks = Object.keys(songs);
    var b1s = bookmarks.shift(); // bookmark of the first song
    var first = songs[b1s];
    var bookmark = "";
    first.h2 += DICTIONARY.arrival[COVER in first ? first.cover : page.addition.language];
    appendArticle(page, b1s, eMAIN); // append the first song
    for (bookmark of shuffle(bookmarks)) appendArticle(page, bookmark, eMAIN); // append the rest
}
function createAside(page)
{
    var eASIDE = appendTag(TAG.aside, document.body);
    var eOL = appendTag(TAG.ol, eASIDE);
    var eSMALL;
    var eLI;
    var eA;
    var id = "";
    var song = {};
    var pa = page.addition;
    eASIDE.id = TAG.aside; // create bookmarks so that the page can jump to the top of aside
    for ([id, song] of Object.entries(page.information.main))
    {
        eLI = appendTag(TAG.li, eOL);
        eA = appendTag8text(TAG.a, song.h2, eLI);
        eA.href = link2bookmark(id);
    }
    appendTag8text(TAG.h3, DICTIONARY.notice[pa.language], eASIDE);
    eSMALL = appendTag(TAG.small, eASIDE);
    appendRecursively(pa.prefix, DICTIONARY.aside[pa.language], eSMALL);
}
function createFooter(addition)
{
    var eFOOTER = appendTag(TAG.footer, document.body);
    var eSMALL = appendTag(TAG.small, eFOOTER);
    appendRecursively(addition.prefix, DICTIONARY.footer[addition.language], eSMALL);
}
function createPage(url)
{
    var eLINK = appendTag(TAG.link, document.head);
    var eNAV = appendTag(TAG.nav, document.body);
    var eHEADER = appendTag(TAG.header, document.body);
    var page = getPage(url);
    var pa = page.addition;
// link CSS
    eLINK.rel = "stylesheet";
    eLINK.type = "text/css";
    eLINK.href = getLink(pa.prefix, "css", "arrangement");
// title
    document.title = page.information.header.h1;
// create nav
    appendMenus(pa, "", DATA, eNAV);
// create header
    appendTag8text(TAG.h1, document.title, eHEADER);
// create other containers
    createMain(page);
    createAside(page);
    createFooter(pa);
}
