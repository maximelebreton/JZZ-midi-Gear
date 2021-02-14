(function(global, factory) {
  /* istanbul ignore next */
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  }
  else if (typeof define === 'function' && define.amd) {
    define('JZZ.midi.Gear', ['JZZ'], factory);
  }
  else {
    factory(JZZ);
  }
})(this, function(JZZ) {

function waldorf(x) { return x[2] == 6 && x[3] == 2 && x[4] == 62; }

JZZ.MIDI.prototype.isIdResponse = function() {
  return this[0] == 0xf0 && this[1] == 0x7e && (this[3] == 6 && this[4] == 2 || waldorf(this)) && this[this.length-1] == 0xf7 && this.length > 10;
};

JZZ.MIDI.prototype.gearInfo = function() {
  if (!this.isIdResponse()) return undefined;
  var vnd;
  var mod;
  if (waldorf(this)) {
    vnd = _a2s(this.slice(4, 5));
    mod = _a2s(this.slice(5, 13));
  }
  else if (this[5]) {
    vnd = _a2s(this.slice(5, 6));
    mod = _a2s(this.slice(6, 14));
  }
  else {
    vnd = _a2s(this.slice(6, 8));
    mod = _a2s(this.slice(8, 16));
  }
  var ret = { brand: _v[vnd] };
  if (!_m[vnd]) return ret;
  for (var j = 8; j >= 4; j--) {
    var m = _m[vnd][mod.substr(0, j)];
    if (m) {
      ret.model = m.m;
      ret.descr = m.d;
      if (m.b) ret.brand = m.b;
      break;
    }
  }
  return ret;
};

JZZ.MIDI.setGearInfo = function(msg, brand, model, descr) {
  msg = JZZ.MIDI(msg);
  if (!msg.isIdResponse()) throw RangeError('Not a valid ID response');
  var vnd;
  var mod;
  if (msg[5]) {
    vnd = _a2s(msg.slice(5, 6));
    mod = _a2s(msg.slice(6, 14));
  }
  else {
    vnd = _a2s(msg.slice(6, 8));
    mod = _a2s(msg.slice(8, 16));
  }
  if (!_v[vnd]) _v[vnd] = brand;
  if (!_m[vnd]) _m[vnd] = {};
  _m[vnd][mod] = { b: brand, m: model, d: descr };
}

function _n2c(n) { return String.fromCharCode(n); }
function _a2s(a) { return a.map(_n2c).join(''); }
var _m = {};
//#begin
var _v = {
"\x01":"Sequential",
"\x02":"IDP",
"\x03":"Voyetra Turtle Beach",
"\x04":"Moog",
"\x05":"Passport Designs",
"\x06":"Lexicon",
"\x07":"Kurzweil",
"\b":"Fender",
"\t":"MIDI9",
"\n":"AKG",
"\x0b":"Voyce Music",
"\f":"WaveFrame",
"\r":"ADA",
"\x0e":"Garfield Electronics",
"\x0f":"Ensoniq",
"\x10":"Oberheim",
"\x11":"Apple",
"\x12":"Grey Matter Response",
"\x13":"Digidesign",
"\x14":"Palmtree Instruments",
"\x15":"JLCooper Electronics",
"\x16":"Lowrey",
"\x17":"Adams-Smith",
"\x18":"E-MU",
"\x19":"Harmony Systems",
"\x1a":"ART",
"\x1b":"Baldwin",
"\x1c":"Eventide",
"\x1d":"Inventronics",
"\x1e":"Key Concepts",
"\x1f":"Clarity",
" ":"Passac",
"!":"Proel Labs",
"\"":"Synthaxe",
"#":"Stepp",
"$":"Hohner",
"%":"Twister",
"&":"Ketron",
"'":"Jellinghaus",
"(":"Southworth Music Systems",
")":"PPG",
"*":"JEN",
"+":"Solid State",
",":"Audio Vertrieb",
"-":"Neve",
".":"Soundtracs",
"/":"Elka",
"0":"Dynacord",
"1":"Viscount",
"2":"Drawmer",
"3":"Clavia",
"4":"Audio Architecture",
"5":"Generalmusic",
"6":"Cheetah Marketing",
"7":"C.T.M.",
"8":"Simmons",
"9":"Soundcraft",
":":"Steinberg",
";":"Wersi",
"<":"AVAB",
"=":"Digigram",
">":"Waldorf",
"?":"Quasimidi",
"@":"Kawai",
"A":"Roland",
"B":"Korg",
"C":"Yamaha",
"D":"Casio",
"F":"Kamiya Studio",
"G":"Akai",
"H":"Victor",
"K":"Fujitsu",
"L":"Sony",
"N":"Teac",
"P":"Matsushita Electric",
"Q":"Fostex",
"R":"Zoom",
"T":"Matsushita Communication",
"U":"Suzuki",
"V":"Fuji",
"W":"Acoustic Technical Laboratory",
"Y":"Faith",
"Z":"Internet Corporation",
"\\":"Seekers",
"_":"SD Card Association",
"}":"(educational)",
"\x00\x01":"Time/Warner",
"\x00\x02":"Advanced Gravis",
"\x00\x03":"Media Vision",
"\x00\x04":"Dornes Research Group",
"\x00\x05":"K-Muse",
"\x00\x06":"Stypher",
"\x00\x07":"Digital Music",
"\x00\b":"IOTA Systems",
"\x00\t":"New England Digital",
"\x00\n":"Artisyn",
"\x00\x0b":"IVL Technologies",
"\x00\f":"Southern Music Systems",
"\x00\r":"Lake Butler Sound Company",
"\x00\x0e":"Alesis Studio Electronics",
"\x00\x0f":"Sound Creation",
"\x00\x10":"DOD Electronics",
"\x00\x11":"Studer-Editech",
"\x00\x12":"Sonus",
"\x00\x13":"Temporal Acuity Products",
"\x00\x14":"Perfect Fretworks",
"\x00\x15":"KAT",
"\x00\x16":"Opcode Systems",
"\x00\x17":"Rane",
"\x00\x18":"Anadi Electronique",
"\x00\x19":"KMX",
"\x00\x1a":"Allen & Heath Brenell",
"\x00\x1b":"Peavey Electronics",
"\x00\x1c":"360 Systems",
"\x00\x1d":"Spectrum Design and Development",
"\x00\x1e":"Marquis Music",
"\x00\x1f":"Zeta Systems",
"\x00 ":"Axxes",
"\x00!":"Orban",
"\x00\"":"Indian Valley",
"\x00#":"Triton",
"\x00$":"KTI",
"\x00%":"Breakaway Technologies",
"\x00&":"Leprecon",
"\x00'":"Harrison Systems",
"\x00(":"Future Lab",
"\x00)":"Rocktron",
"\x00*":"PianoDisc",
"\x00+":"Cannon",
"\x00,":"Reserved",
"\x00-":"Rodgers Instrument",
"\x00.":"Blue Sky Logic",
"\x00/":"Encore Electronics",
"\x000":"Uptown",
"\x001":"Voce",
"\x002":"CTI Audio",
"\x003":"S3",
"\x004":"Broderbund",
"\x005":"Allen Organ Co.",
"\x006":"Reserved",
"\x007":"Music Quest",
"\x008":"Aphex",
"\x009":"Gallien Krueger",
"\x00:":"IBM",
"\x00;":"Mark Of The Unicorn",
"\x00<":"Hotz",
"\x00=":"ETA Lighting",
"\x00>":"NSI",
"\x00?":"Ad Lib",
"\x00@":"Richmond Sound Design",
"\x00A":"Microsoft",
"\x00B":"Mindscape",
"\x00C":"Russ Jones Marketing",
"\x00D":"Intone",
"\x00E":"Advanced Remote Technologies",
"\x00F":"White Instruments",
"\x00G":"GT Electronics",
"\x00H":"Pacific Research & Engineering",
"\x00I":"Timeline Vista",
"\x00J":"Mesa Boogie",
"\x00K":"FSLI",
"\x00L":"Sequoia Development",
"\x00M":"Studio Electronics",
"\x00N":"Euphonix",
"\x00O":"InterMIDI",
"\x00P":"MIDI Solutions",
"\x00Q":"3DO Company",
"\x00R":"Lightwave Research",
"\x00S":"Micro-W",
"\x00T":"Spectral Synthesis",
"\x00U":"Lone Wolf",
"\x00V":"Studio Technologies",
"\x00W":"Peterson Electro-Musical Product",
"\x00X":"Atari",
"\x00Y":"Marion Systems",
"\x00Z":"Design Event",
"\x00[":"Winjammer Software",
"\x00\\":"AT&T",
"\x00]":"Reserved",
"\x00^":"Symetrix",
"\x00_":"MIDI the World",
"\x00`":"Spatializer",
"\x00a":"Micros 'N MIDI",
"\x00b":"Accordians International",
"\x00c":"EuPhonics",
"\x00d":"Musonix",
"\x00e":"Turtle Beach Systems",
"\x00f":"Mackie",
"\x00g":"Compuserve",
"\x00h":"BEC Technologies",
"\x00i":"QRS Music",
"\x00j":"P.G. Music",
"\x00k":"Sierra Semiconductor",
"\x00l":"EpiGraf",
"\x00m":"Electronics Diversified",
"\x00n":"Tune 1000",
"\x00o":"Advanced Micro Devices",
"\x00p":"Mediamation",
"\x00q":"Sabine",
"\x00r":"Woog Labs",
"\x00s":"Micropolis",
"\x00t":"Ta Horng Musical Instrument",
"\x00u":"e-Tek Labs",
"\x00v":"Electro-Voice",
"\x00w":"Midisoft",
"\x00x":"QSound Labs",
"\x00y":"Westrex",
"\x00z":"Nvidia",
"\x00{":"ESS Technology",
"\x00|":"Media Trix Peripherals",
"\x00}":"Brooktree",
"\x00~":"Otari",
"\x00":"Key Electronics",
"\x01\x00":"Shure",
"\x01\x01":"AuraSound",
"\x01\x02":"Crystal Semiconductor",
"\x01\x03":"Conexant",
"\x01\x04":"Silicon Graphics",
"\x01\x05":"M-Audio",
"\x01\x06":"PreSonus",
"\x01\b":"Topaz Enterprises",
"\x01\t":"Cast Lighting",
"\x01\n":"Microsoft",
"\x01\x0b":"Sonic Foundry",
"\x01\f":"Line 6",
"\x01\r":"Beatnik",
"\x01\x0e":"Van Koevering",
"\x01\x0f":"Altech Systems",
"\x01\x10":"S & S Research",
"\x01\x11":"VLSI Technology",
"\x01\x12":"Chromatic Research",
"\x01\x13":"Sapphire",
"\x01\x14":"IDRC",
"\x01\x15":"Justonic Tuning",
"\x01\x16":"TorComp Research",
"\x01\x17":"Newtek",
"\x01\x18":"Sound Sculpture",
"\x01\x19":"Walker Technical",
"\x01\x1a":"Digital Harmony",
"\x01\x1b":"InVision Interactive",
"\x01\x1c":"T-Square Design",
"\x01\x1d":"Nemesys Music Technology",
"\x01\x1e":"DBX Professional",
"\x01\x1f":"Syndyne",
"\x01 ":"Bitheadz",
"\x01!":"Cakewalk Music Software",
"\x01\"":"Analog Devices",
"\x01#":"National Semiconductor",
"\x01$":"Boom Theory",
"\x01%":"Virtual DSP",
"\x01&":"Antares Systems",
"\x01'":"Angel Software",
"\x01(":"St Louis Music",
"\x01)":"Passport Music Software",
"\x01*":"Ashley Audio",
"\x01+":"Vari-Lite",
"\x01,":"Summit Audio",
"\x01-":"Aureal Semiconductor",
"\x01.":"SeaSound",
"\x01/":"U.S. Robotics",
"\x010":"Aurisis Research",
"\x011":"Nearfield Research",
"\x012":"FM7",
"\x013":"Swivel Systems",
"\x014":"Hyperactive Audio Systems",
"\x015":"MidiLite",
"\x016":"Radikal Technologies",
"\x017":"Roger Linn Design",
"\x018":"TC-Helicon Vocal Technologies",
"\x019":"Event Electronics",
"\x01:":"Sonic Network",
"\x01;":"Realtime Music Solutions",
"\x01<":"Apogee Digital",
"\x01=":"Classical Organs",
"\x01>":"Microtools",
"\x01?":"Numark Industries",
"\x01@":"Frontier Design Group",
"\x01A":"Recordare",
"\x01B":"Starr Labs",
"\x01C":"Voyager Sound",
"\x01D":"Manifold Labs",
"\x01E":"Aviom",
"\x01F":"Mixmeister Technology",
"\x01G":"Notation Software",
"\x01H":"Mercurial Communications",
"\x01I":"Wave Arts",
"\x01J":"Logic Sequencing Devices",
"\x01K":"Axess Electronics",
"\x01L":"Muse Research",
"\x01M":"Open Labs",
"\x01N":"Guillemot",
"\x01O":"Samson Technologies",
"\x01P":"Electronic Theatre Controls",
"\x01Q":"Blackberry",
"\x01R":"Mobileer",
"\x01S":"Synthogy",
"\x01T":"Lynx Studio Technology",
"\x01U":"Damage Control Engineering",
"\x01V":"Yost Engineering",
"\x01W":"Brooks & Forsman Designs",
"\x01X":"Infinite Response",
"\x01Y":"Garritan",
"\x01Z":"Plogue Art et Technologie",
"\x01[":"RJM Music Technology",
"\x01\\":"Custom Solutions Software",
"\x01]":"Sonarcana",
"\x01^":"Centrance",
"\x01_":"Kesumo",
"\x01`":"Stanton",
"\x01a":"Livid",
"\x01b":"First Act",
"\x01c":"Pygraphics",
"\x01d":"Panadigm Innovations",
"\x01e":"Avedis Zildjian",
"\x01f":"Auvital Music",
"\x01g":"You Rock Guitar",
"\x01h":"Chris Grigg Designs",
"\x01i":"Slate Digital",
"\x01j":"Mixware",
"\x01k":"Social Entropy",
"\x01l":"Source Audio",
"\x01m":"Ernie Ball",
"\x01n":"Fishman",
"\x01o":"Custom Audio Electronics",
"\x01p":"American Audio",
"\x01q":"Mega Lite",
"\x01r":"Kilpatrick Audio",
"\x01s":"iConnectivity",
"\x01t":"Fractal Audio",
"\x01u":"NetLogic Microsystems",
"\x01v":"Music Computing",
"\x01w":"Nektar Technology",
"\x01x":"Zenph Sound Innovations",
"\x01y":"DJ TechTools",
"\x01z":"Rezonance Labs",
"\x01{":"Decibel Eleven",
"\x01|":"CNMAT",
"\x01}":"Media Overkill",
"\x01~":"Confusion Studios",
"\x01":"moForte",
"\x02\x00":"Miselu",
"\x02\x01":"Amelia's Compass",
"\x02\x02":"Zivix",
"\x02\x03":"Artiphon",
"\x02\x04":"Synclavier Digital",
"\x02\x05":"Light & Sound Control Devices",
"\x02\x06":"Retronyms",
"\x02\x07":"JS Technologies",
"\x02\b":"Quicco Sound",
"\x02\t":"A-Designs Audio",
"\x02\n":"McCarthy Music",
"\x02\x0b":"Denon DJ",
"\x02\f":"Keith Robert Murray",
"\x02\r":"Google",
"\x02\x0e":"ISP Technologies",
"\x02\x0f":"Abstrakt Instruments",
"\x02\x10":"Meris",
"\x02\x11":"Sensorpoint",
"\x02\x12":"Hi-Z Labs",
"\x02\x13":"Imitone",
"\x02\x14":"Intellijel Designs",
"\x02\x15":"Dasz Instruments",
"\x02\x16":"Remidi",
"\x02\x17":"Disaster Area Designs",
"\x02\x18":"Universal Audio",
"\x02\x19":"Carter Duncan",
"\x02\x1a":"Essential Technology",
"\x02\x1b":"Cantux Research",
"\x02\x1c":"Hummel Technologies",
"\x02\x1d":"Sensel",
"\x02\x1e":"DBML Group",
"\x02\x1f":"Madrona Labs",
"\x02 ":"Mesa Boogie",
"\x02!":"Effigy Labs",
"\x02\"":"MK2 Image",
"\x02#":"Red Panda",
"\x02$":"OnSong",
"\x02%":"Jamboxx",
"\x02&":"Electro-Harmonix",
"\x02'":"RnD64",
"\x02(":"Neunaber Technology",
"\x02)":"Kaom",
"\x02*":"Hallowell",
"\x02+":"Sound Devices",
"\x02,":"Spectrasonics",
"\x02-":"Second Sound",
"\x02.":"8eo",
"\x02/":"VIDVOX",
"\x020":"Matthews Effects",
" \x00":"Dream SAS",
" \x01":"Strand Lighting",
" \x02":"Amek Div of Harman Industries",
" \x03":"Casa Di Risparmio Di Loreto",
" \x04":"Böhm Elektronik",
" \x05":"Syntec Digital Audio",
" \x06":"Trident Audio Developments",
" \x07":"Real World Studio",
" \b":"M-Audio",
" \t":"Yes Technology",
" \n":"Audiomatica",
" \x0b":"Bontempi",
" \f":"F.B.T. Elettronica",
" \r":"MidiTemp",
" \x0e":"LA Audio",
" \x0f":"Zero 88 Lighting",
" \x10":"Micon Audio Electronics",
" \x11":"Forefront Technology",
" \x12":"Studio Audio and Video",
" \x13":"Kenton Electronics",
" \x14":"Celco",
" \x15":"ADB",
" \x16":"Marshall Products",
" \x17":"DDA",
" \x18":"BSS Audio",
" \x19":"MA Lighting Technology",
" \x1a":"Fatar",
" \x1b":"QSC Audio Products",
" \x1c":"Artisan Clasic Organ",
" \x1d":"Orla",
" \x1e":"Pinnacle Audio",
" \x1f":"TC Electronics",
"  ":"Doepfer Musikelektronik",
" !":"Creative",
" \"":"Seyddo",
" #":"LG Electronics",
" $":"Midisoft",
" %":"Samick",
" &":"Penny and Giles",
" '":"Acorn Computer",
" (":"LSC Electronics",
" )":"Novation",
" *":"Samkyung Mechatronics",
" +":"Medeli Electronics",
" ,":"Charlie Lab",
" -":"Blue Chip Music Technology",
" .":"BEE",
" /":"LG Semicon America",
" 0":"TESI",
" 1":"EMAGIC",
" 2":"Behringer",
" 3":"Access Music Electronics",
" 4":"Synoptic",
" 5":"Hanmesoft",
" 6":"Terratec Electronic",
" 7":"Proel",
" 8":"IBK MIDI",
" 9":"IRCAM",
" :":"Propellerhead Software",
" ;":"Red Sound Systems",
" <":"Elektron",
" =":"Sintefex Audio",
" >":"MAM",
" ?":"Amsaro",
" @":"Lanbox",
" A":"Mode Machines",
" B":"DSP Arts",
" C":"Phil Rees Music Tech",
" D":"Stamer Musikanlagen",
" E":"Musical Muntaner",
" F":"C-Mexx Software",
" G":"Klavis Technologies",
" H":"Noteheads",
" I":"Algorithmix",
" J":"Skrydstrup R&D",
" K":"Professional Audio",
" L":"NewWave Labs",
" M":"Vermona",
" N":"Nokia",
" O":"Wave Idea",
" P":"Hartmann",
" Q":"Lion's Tracs",
" R":"Analogue Systems",
" S":"Focal-JMlab",
" T":"Ringway Electronics",
" U":"Faith Technologies",
" V":"Showworks",
" W":"Manikin Electronic",
" X":"1 Come Tech",
" Y":"Phonic",
" Z":"Dolby Australia",
" [":"Silansys Technologies",
" \\":"Winbond Electronics",
" ]":"Cinetix Medien und Interface",
" ^":"A&G Soluzioni Digitali",
" _":"Sequentix",
" `":"Oram Pro Audio",
" a":"Be4",
" b":"Infection Music",
" c":"Central Music",
" d":"genoQs Machines",
" e":"Medialon",
" f":"Waves Audio",
" g":"Jerash Labs",
" h":"Da Fact",
" i":"Elby Designs",
" j":"Spectral Audio",
" k":"Arturia",
" l":"Vixid",
" m":"C-Thru Music",
" n":"Ya Horng Electronic",
" o":"SM Pro Audio",
" p":"OTO Machines",
" q":"ELZAB",
" r":"Blackstar Amplification",
" s":"M3i Technologies",
" t":"Gemalto",
" u":"Prostage",
" v":"Teenage Engineering",
" w":"Tobias Erichsen Consulting",
" x":"Nixer",
" y":"Hanpin Electron",
" z":"R. Sowa",
" {":"Beyond Music",
" |":"Kiss Box",
" }":"Misa Digital Technologies",
" ~":"AI Musics Technology",
" ":"Serato",
"!\x00":"Limex",
"!\x01":"Kyodday",
"!\x02":"Mutable Instruments",
"!\x03":"PreSonus Software",
"!\x04":"Ingenico",
"!\x05":"Fairlight Instruments",
"!\x06":"Musicom Lab",
"!\x07":"Modal Electronics",
"!\b":"RWA",
"!\t":"Native Instruments",
"!\n":"Naonext",
"!\x0b":"MFB",
"!\f":"Teknel Research",
"!\r":"Ploytec",
"!\x0e":"Surfin Kangaroo Studio",
"!\x0f":"Philips Electronics",
"!\x10":"ROLI",
"!\x11":"Panda-Audio",
"!\x12":"BauM Software",
"!\x13":"Machinewerks",
"!\x14":"Xiamen Elane Electronics",
"!\x15":"Marshall Amplification",
"!\x16":"Kiwitechnics",
"!\x17":"Rob Papen",
"!\x18":"Spicetone",
"!\x19":"V3Sound",
"!\x1a":"IK Multimedia",
"!\x1b":"Novalia",
"!\x1c":"Modor Music",
"!\x1d":"Ableton",
"!\x1e":"Dtronics",
"!\x1f":"ZAQ Audio",
"! ":"Muabaobao Education Technology",
"!!":"Flux Effects",
"!\"":"Audiothingies",
"!#":"Retrokits",
"!$":"Morningstar FX",
"!%":"Changsha Hotone Audio",
"!&":"Expressive",
"!'":"Expert Sleepers",
"!(":"Timecode-Vision Technology",
"!)":"Hornberg Research",
"!*":"Sonic Potions",
"!+":"Audiofront",
"!,":"Fred's Lab",
"!-":"Audio Modeling",
"!.":"C. Bechstein Digital",
"!/":"Motas Electronics",
"!0":"MIND Music Labs",
"!1":"Sonic Academy",
"!2":"Bome Software",
"!3":"AODYO",
"!4":"Pianoforce",
"!5":"Dreadbox",
"!6":"TouchKeys Instruments",
"!7":"Gigrig",
"!8":"ALM",
"!9":"CH Sound Design",
"!:":"Beat Bars",
"!;":"Blokas",
"!<":"GEWA Music",
"!=":"dadamachines",
"!>":"Augmented Instruments",
"!?":"Supercritical",
"!@":"Genki Instruments",
"!A":"Marienberg Devices",
"!B":"Supperware",
"!C":"Imoxplus",
"!D":"Swapp Technologies",
"!E":"Electra One",
"!F":"Digital Clef",
"!G":"Paul Whittington Group",
"@\x00":"Crimson Technology",
"@\x01":"Softbank",
"@\x03":"D&M Holdings"
};
_m["\x01"] = { // Sequential
"%\x01\x00\x00":{m:"Mopho",d:"Synth Module",b:"Dave Smith"}
};
_m["\x07"] = { // Kurzweil
"\x00@\x00\n":{m:"PC3LE8",d:"Performance Controller"}
};
_m["\x18"] = { // E-MU
"\x02@\x01\x00":{m:"Xboard 49",d:"USB MIDI Controller"}
};
_m[">"] = { // Waldorf
"\x0e\x00\t\x00":{m:"Microwave XT 2",d:"Synth Module"},
"\x0e\x00\x0b\x00":{m:"Microwave XT",d:"Synth Module"},
"\x13\x00\x00\x00":{m:"Blofeld",d:"Synth Module"}
};
_m["A"] = { // Roland
"\x02\x02\x00\x00":{m:"DR-880",d:"Drum Machine",b:"BOSS"},
"\x04\x02\x00\x00":{m:"RD-300SX",d:"Digital Piano"},
"\x05\x03\x00\x00":{m:"GP-10",d:"Guitar Effects Processor",b:"BOSS"},
"\x06\x02\x00\x00":{m:"GT-8",d:"Guitar Effects Processor",b:"BOSS"},
"\t\x02\x00\x00":{m:"TD-12",d:"Percussion Sound Module"},
"\x0b\x02\x00\x00":{m:"GT-PRO",d:"Guitar Effects Processor",b:"BOSS"},
"\x10\x01\x00\x00":{m:"XV-3080",d:"Synth Module"},
"\x10\x01\x02\x02":{m:"FANTOM",d:"Synthesizer"},
"\x14\x02\x00\x00":{m:"MC-808",d:"Sampling Groovebox"},
"\x16\x02\x00\x00":{m:"SH-201",d:"Synthesizer"},
"\x18\x02\x00\x00":{m:"VP-550",d:"Vocal & Ensemble Keyboard"},
"\x1a\x00\x00\x02\x00":{m:"HP-330/245",d:"Digital Piano"},
"\x1a\x00\x00\x02\x01":{m:"HP-530",d:"Digital Piano"},
"\x1a\x00\x00\x03":{m:"C-80",d:"Digital Harpsichord"},
"\x1a\x00\x00\x04":{m:"FP-9",d:"Digital Piano"},
"\x1a\x00\x00\x06\x00":{m:"HP-2",d:"Digital Piano"},
"\x1a\x00\x00\x06\x02":{m:"DP-900",d:"Digital Piano"},
"\x1a\x00\x01\x02":{m:"HP-147",d:"Digital Piano"},
"\x1a\x00\x01\x06":{m:"HP-3",d:"Digital Piano"},
"\x1a\x00\x02\x02\x00":{m:"EP-70",d:"Digital Piano"},
"\x1a\x00\x02\x02\x01":{m:"EP-90",d:"Digital Piano"},
"\x1a\x00\x02\x06":{m:"HP-7",d:"Digital Piano"},
"\x1a\x00\x03\x02":{m:"HP-237",d:"Digital Piano"},
"\x1a\x00\x04\x02":{m:"HP-147R",d:"Digital Piano"},
"\x1a\x00\x05\x02":{m:"F-90",d:"Digital Piano"},
"\x1a\x00\x06\x02\x00":{m:"F-100",d:"Digital Piano"},
"\x1a\x00\x06\x02\x01":{m:"F-30",d:"Digital Piano"},
"\x1a\x00\x06\x02\x02":{m:"F-50",d:"Digital Piano"},
"\x1a\x00\x06\x06":{m:"HP-101",d:"Digital Piano"},
"\x1c\x01\x00\x00":{m:"DR-770",d:"Drum Machine",b:"BOSS"},
"\x1c\x02\x00\x00":{m:"VG-99",d:"V-Guitar System"},
" \x01\x00\x00":{m:"TD-8",d:"Percussion Sound Module"},
"!\x02\x00\x00":{m:"V-Synth GT",d:"Synthesizer Keyboard"},
"'\x02\x00\x00\x00":{m:"Fantom-G6",d:"Music Workstation"},
"'\x02\x00\x00\x01":{m:"Fantom-G7",d:"Music Workstation"},
"'\x02\x00\x00\x02":{m:"Fantom-G8",d:"Music Workstation"},
"+\x02\x00\x00":{m:"RD-700GX",d:"Digital Stage Piano"},
",\x02\x00\x00":{m:"RD-300GX",d:"Digital Piano"},
"/\x02\x00\x00":{m:"GT-10",d:"Guitar Effects Processor",b:"BOSS"},
"3\x02\x00\x00":{m:"VS-700R",d:"Digital Audio Workstation"},
"6\x02\x00\x00":{m:"GW-8",d:"Workstation"},
"9\x02\x00\x00":{m:"V-Piano",d:"Digital Piano"},
"9\x02\x02\x00":{m:"V-Piano Grand (GP-7)",d:"Digital Piano"},
":\x01\x00\x00":{m:"FP-3",d:"Digital Piano"},
":\x02\x00\x00":{m:"JUNO-Di",d:"Synthesizer"},
";\x02\x00\x00":{m:"VP-770",d:"Vocal & Ensemble Keyboard"},
"?\x01\x00\x00":{m:"TD-6V",d:"Percussion Sound Module"},
"A\x01\x00\x00":{m:"DR-670",d:"Drum Machine",b:"BOSS"},
"A\x02\x00\x00":{m:"GAIA SH-01",d:"Synthesizer"},
"B\x00\x00\x07":{m:"SC-8820",d:"Sound Module"},
"B\x00\x00\b":{m:"KR-577/977/1077",d:"Digital Piano"},
"B\x00\x00\r":{m:"KR-5",d:"Digital Piano"},
"B\x00\x00\x0e\x00":{m:"KR-7",d:"Digital Piano"},
"B\x00\x00\x0e\x01":{m:"KF-7",d:"Digital Piano"},
"B\x00\x00\x0f\x00":{m:"KR-15",d:"Digital Piano"},
"B\x00\x00\x0f\x01":{m:"KR-15/17",d:"Digital Piano"},
"B\x00\x00\x11\x00":{m:"RG-7",d:"Digital Piano"},
"B\x00\x00\x11\x01":{m:"RG-3",d:"Digital Piano"},
"B\x00\x00\x12":{m:"KR-107",d:"Digital Piano"},
"B\x00\x00\x16\x02":{m:"HP-205",d:"Digital Piano"},
"B\x00\x00\x16\x03":{m:"HP-203",d:"Digital Piano"},
"B\x00\x00\x16\x04":{m:"FP-7",d:"Digital Piano"},
"B\x00\x00\x16\x05":{m:"FP-4",d:"Digital Piano"},
"B\x00\x00\x16\x06":{m:"HP-201",d:"Digital Piano"},
"B\x00\x00\x17\x00":{m:"AT-800",d:"Organ"},
"B\x00\x00\x17\x01":{m:"AT-900",d:"Organ"},
"B\x00\x00\x17\x02":{m:"AT-900C",d:"Organ"},
"B\x00\x00\x18\x00":{m:"AT-100",d:"Organ"},
"B\x00\x00\x18\x01":{m:"AT-300",d:"Organ"},
"B\x00\x00\x18\x02":{m:"AT-500",d:"Organ"},
"B\x00\x00\x18\x03":{m:"AT-75",d:"Organ"},
"B\x00\x00\x19":{m:"RK-300",d:"Keyboard"},
"B\x00\x00\x1a":{m:"RM-700",d:"Digital Piano"},
"B\x00\x00\x1e\x01":{m:"HP-507",d:"Digital Piano"},
"B\x00\x00\x1e\x02":{m:"HP-505",d:"Digital Piano"},
"B\x00\x00\x1e\x03":{m:"HP-503",d:"Digital Piano"},
"B\x00\x00\x1e\x04":{m:"DP90/DP90S",d:"Digital Piano"},
"B\x00\x00\x1e\x05":{m:"HPi-50",d:"Digital Piano"},
"B\x00\x01\x03":{m:"E-500(OR)/E-500/E-300/KR-75",d:"Intelligent Keyboard"},
"B\x00\x01\t":{m:"HP-557R",d:"Digital Piano"},
"B\x00\x01\x1b\x00":{m:"HP302/HP305",d:"Digital Piano"},
"B\x00\x01\x1b\x01":{m:"HP307",d:"Digital Piano"},
"B\x00\x01\x1b\x02":{m:"RG-1F/RG-3F",d:"Digital Piano"},
"B\x00\x01\x1b\x03":{m:"LX-10F",d:"Digital Piano"},
"B\x00\x01\x1b\x04":{m:"DP990F",d:"Digital Piano"},
"B\x00\x01\x1b\x05":{m:"HPi-7F",d:"Digital Piano"},
"B\x00\x01\x1b\x06":{m:"HPi-6F",d:"Digital Piano"},
"B\x00\x01\x1b\x07":{m:"FP-7F",d:"Digital Piano"},
"B\x00\x01\x1b\b":{m:"FP-4F",d:"Digital Piano"},
"B\x00\x02\x03\x02":{m:"HP-555G",d:"Digital Piano"},
"B\x00\x02\x03\x03":{m:"KR375",d:"Digital Piano"},
"B\x00\x02\t\x00":{m:"KR-377",d:"Digital Piano"},
"B\x00\x02\t\x01":{m:"KF-90",d:"Digital Piano"},
"B\x00\x04\x03":{m:"E-600",d:"Intelligent Keyboard"},
"B\x00\x05\x03":{m:"AT-30R",d:"Organ"},
"B\x00\x06\x03":{m:"KR-277",d:"Digital Piano"},
"B\x00\x07\x03":{m:"HPi-5",d:"Digital Piano"},
"B\x02\x00\x00":{m:"VR-700",d:"Combo Keyboard"},
"H\x01\x00\x00":{m:"SD-90",d:"Studio Canvas",b:"Edirol"},
"J\x01\x00\x00":{m:"SH-32",d:"Synthesizer Module"},
"L\x02\x00\x00":{m:"JUNO-Gi",d:"Mobile Synthesizer with Digital Recorder"},
"M\x01\x00\x00":{m:"VK-8",d:"Combo Organ"},
"P\x02\x00\x00":{m:"RD-700NX",d:"Digital Piano"},
"Q\x02\x00\x00":{m:"RD-300NX",d:"Digital Piano"},
"U\x02\x00\x00":{m:"JUPITER-80",d:"Synthesizer"},
"Y\x01\x00\x00":{m:"MC-909",d:"Sampling Groovebox"},
"Y\x02\x00\x00":{m:"BR-80",d:"Digital Recorder",b:"BOSS"},
"`\x01\x00\x00":{m:"FP-5",d:"Digital Piano"},
"`\x02\x00\x00":{m:"GT-100",d:"Amp Effects Processor",b:"BOSS"},
"b\x00\x00\x00\x00":{m:"AT-20R",d:"Organ"},
"b\x00\x00\x00\x01":{m:"AT-30R",d:"Organ"},
"b\x00\x00\x04\x00":{m:"AT-800",d:"Organ"},
"b\x00\x00\x04\x01":{m:"AT-900",d:"Organ"},
"b\x00\x00\x04\x02":{m:"AT-900C",d:"Organ"},
"b\x00\x00\x05\x00":{m:"AT-100",d:"Organ"},
"b\x00\x00\x05\x01":{m:"AT-300",d:"Organ"},
"b\x00\x00\x05\x02":{m:"AT-500",d:"Organ"},
"b\x00\x00\x05\x03":{m:"AT-75",d:"Organ"},
"c\x02\x00\x00":{m:"JUPITER-50",d:"Synthesizer"},
"d\x01\x00\x00":{m:"RS-70",d:"Synthesizer"},
"d\x01\x01\x00\x00\x01\x00\x00":{m:"RS-50",d:"Synthesizer"},
"d\x01\x01\x00\x00\x01\x00\x01":{m:"JUNO-D",d:"Synthesizer"},
"d\x02\x00\x00":{m:"INTEGRA-7",d:"Sound Module"},
"o\x01\x00\x00":{m:"FP-2",d:"Digital Piano"},
"z\x01\x00\x00":{m:"TD-20",d:"Percussion Sound Module"}
};
_m["B"] = { // Korg
"\x15\x01\x17\x00":{m:"Krome",d:"Music Workstation"},
"\x19\x00\x00\x00":{m:"M1",d:"Music Workstation"},
"P\x00\x0e\x00":{m:"Triton Pro",d:"Music Workstation/Sampler"},
"P\x00=\x00":{m:"Triton Extreme",d:"Music Workstation/Sampler"},
"`\x00e\x00":{m:"Pa1000",d:"Professional Arranger"},
"h\x00\x17\x00":{m:"Kronos 61",d:"Music Workstation"},
"}\x00\x00\x00":{m:"R3",d:"Synthesizer Vocoder"},
"~\x00\x00\x00":{m:"microKORG XL",d:"Synthesizer"}
};
_m["C"] = { // Yamaha
"\x00A\x00\x03":{m:"MU100/MU100R/MU128",d:"Tone Generator"},
"\x00A\x02\x05":{m:"AN200",d:"Synthesizer"},
"\x00A\x02U":{m:"QY70",d:"Sequencer"},
"\x00A\x03\x05":{m:"DX200",d:"Synthesizer"},
"\x00A\x044":{m:"QY100",d:"Sequencer"},
"\x00A\x05*":{m:"S90",d:"Synthesizer"},
"\x00A\x19\x06":{m:"MOTIF-RACK ES",d:"Tone Generator"},
"\x00A\x1a\x02":{m:"AN1x",d:"Synthesizer"},
"\x00A\x1b\x04":{m:"MU2000",d:"Tone Generator"},
"\x00A\x1c\x04":{m:"MU1000",d:"Tone Generator"},
"\x00A\x1d\x03":{m:"RM1x",d:"Sequence Remixer"},
"\x00A#\x04":{m:"S30",d:"Synthesizer"},
"\x00A2\x06":{m:"S90ES",d:"Synthesizer"},
"\x00A3\x06":{m:"MO6",d:"Synthesizer"},
"\x00A4\x06":{m:"MO8",d:"Synthesizer"},
"\x00A5\x06":{m:"MOTIF XS6",d:"Synthesizer"},
"\x00A6\x06":{m:"MOTIF XS7",d:"Synthesizer"},
"\x00A7\x02":{m:"MU90",d:"Tone Generator"},
"\x00A7\x06":{m:"MOTIF XS8",d:"Synthesizer"},
"\x00A?\x06":{m:"CP5",d:"Stage Piano"},
"\x00A@\x06":{m:"CP50",d:"Stage Piano"},
"\x00AD\x06":{m:"MOX6",d:"Synthesizer"},
"\x00AE\x06":{m:"MOX8",d:"Synthesizer"},
"\x00AF\x01":{m:"MU50",d:"Tone Generator"},
"\x00AG\x06":{m:"MX49",d:"Synthesizer"},
"\x00AH\x01":{m:"QS300",d:"Synthesizer"},
"\x00AL\x01":{m:"EOS B900",d:"Keyboard"},
"\x00AO\x03":{m:"CS2x",d:"Synthesizer"},
"\x00AQ\x03":{m:"MU15",d:"Tone Generator"},
"\x00AR\x02":{m:"MU90R",d:"Tone Generator"},
"\x00AX\x04":{m:"MOTIF-RACK",d:"Tone Generator"},
"\x00Ab\x01":{m:"SDX3000",d:"Keyboard"},
"\x00Ak\x01":{m:"CBX-K1XG",d:"Keyboard"},
"\x00Aw\x04":{m:"S03",d:"Synthesizer"},
"\x00A|\x04":{m:"MOTIF6",d:"Synthesizer"},
"\x00A}\x04":{m:"MOTIF7",d:"Synthesizer"},
"\x00A~\x04":{m:"MOTIF8",d:"Synthesizer"},
"\x00C,\x17":{m:"CP33",d:"Stage Piano"},
"\x00CB\x15":{m:"P-120",d:"Digital Piano"},
"\x00Cf\x19":{m:"P-155",d:"Digital Piano"},
"\x00D+\x19":{m:"NP-31",d:"Portable Keyboard"},
"\x00DE\x17":{m:"MM6",d:"Synthesizer"},
"\x00Ls\x07":{m:"DTXTREME",d:"Drum Module"}
};
_m["G"] = { // Akai
"\x15\x00\x19\x00":{m:"Push",d:"MIDI Controller"},
"%\x00\x19\x00":{m:"MPK261",d:"Performance Keyboard Controller"},
"m\x00\x19\x00":{m:"EWI USB",d:"USB Wind Instrument"}
};
_m["\x01\f"] = { // Line 6
"\x03\x00\x03\x00":{m:"Flextone III",d:"Guitar Effects Processor"},
"$\x00\x02\x00":{m:"THR30II",d:"Guitar Amp",b:"Yamaha"}
};
_m["\x01a"] = { // Livid
"\x01\x00\x01\x00":{m:"Brain v1",d:"Do-It-Yourself Kit"},
"\x01\x00\x02\x00":{m:"Ohm64",d:"MIDI Controller"},
"\x01\x00\x03\x00":{m:"block",d:"MIDI Controller"},
"\x01\x00\x04\x00":{m:"Code",d:"MIDI Controller"},
"\x01\x00\x07\x00":{m:"OhmRGB",d:"MIDI Controller"},
"\x01\x00\b\x00":{m:"CNTRL:R",d:"MIDI Controller"},
"\x01\x00\t\x00":{m:"Brain v2",d:"Do-It-Yourself Kit"},
"\x01\x00\x0b\x00":{m:"Alias8",d:"MIDI Controller"},
"\x01\x00\f\x00":{m:"Base",d:"MIDI Controller"},
"\x01\x00\r\x00":{m:"Brain Jr",d:"Do-It-Yourself Kit"}
};
_m["\x01n"] = { // Fishman
"\x00\x01\x00\x01":{m:"TriplePlay",d:"Guitar Controller"},
"\x00\x01\x00\x02":{m:"TriplePlay",d:"Guitar Controller"}
};
_m["\x01q"] = { // Mega Lite
"\x01\x00\x10\x00":{m:"Enlighten",d:"DMX Control"}
};
_m["\x01v"] = { // Music Computing
"\x01\x00\x05\x00":{m:"DAW",d:"MIDI Controller"}
};
_m["\x01y"] = { // DJ TechTools
"\x03\x00\x01\x00":{m:"Midi Fighter 3D",d:"MIDI Controller"},
"\x04\x00\x01\x00":{m:"Midi Fighter Spectra",d:"MIDI Controller"},
"\x05\x00\x01\x00":{m:"Midi Fighter Twister",d:"MIDI Controller"}
};
_m[" \b"] = { // M-Audio
"c\x0e\x1a\x03":{m:"Axiom 61",d:"MIDI Controller"}
};
_m[" )"] = { // Novation
"\x01\x00!\x00":{m:"Nova",d:"Synth Module"}
};
_m["!\x1d"] = { // Ableton
"g2\x02\x00":{m:"Push 2",d:"MIDI Controller"}
};
//#end
});
