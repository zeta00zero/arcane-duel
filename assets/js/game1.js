
"use strict";
const PORTRAITS={"hero":"assets/img/a84026f43788.webp","ryuga":"assets/img/807a01709fa8.webp","mira":"assets/img/43559c4816ee.webp","sakura":"assets/img/aff827b63fe9.webp","toma":"assets/img/cf2ac19e52f2.webp","lily":"assets/img/59a96e82937e.webp","player":"assets/img/209839df6ffe.webp","weiyao":"assets/img/559ef72779ff.webp","weisheng":"assets/img/576df2f9eb20.webp","keith":"assets/img/bfc0e15ef82d.webp","eryll":"assets/img/5c670cfec1d6.webp","kelvin":"assets/img/5ce68596b057.webp","ben":"assets/img/7dc6d446a9a7.webp"};
/* new5 portraits (webp 330x440). Load AFTER portraits.js */
Object.assign(PORTRAITS,{"sabrina":"assets/img/6c7650757169.webp","christopher":"assets/img/13a389fd63fe.webp","lemon":"assets/img/e3179c8dc7ed.webp","sixing":"assets/img/17877dd735d8.webp","clement":"assets/img/cc89a1f0cbd2.webp"});
/* new5b portraits (webp 330x440). Load AFTER portraits_new5.js */
Object.assign(PORTRAITS,{"darkkelvin": "assets/img/da301cf4fae3.webp", "jason": "assets/img/e6415ee4efb2.webp", "shaim": "assets/img/81b0ab7020d7.webp", "hisyam": "assets/img/cc4a488d250f.webp", "weiyao2": "assets/img/60c6879806e8.webp"});
/* new3c portraits (webp 330x440). Load AFTER portraits_new5b.js */
Object.assign(PORTRAITS,{"eunice": "assets/img/633ea63673de.webp", "kimberly": "assets/img/3b063b2dcce1.webp", "aoiyuki": "assets/img/24bfd6339cc3.webp"});
/* v10 portraits (webp 330x440): Sliver, Eryll - Dragon Deez Nutz, Huiping, Jocelyn, Mr Kenneth. Loads after portraits_new3c.js */
Object.assign(PORTRAITS,{"sliver": "assets/img/30efcada1797.webp", "eryll2": "assets/img/6584d97da003.webp", "huiping": "assets/img/cbf257d447f6.webp", "jocelyn": "assets/img/74dead87d67e.webp", "kenneth": "assets/img/9d10dd9526c8.webp"});
/* v12 portraits (webp 330x440): Keith – Rich Mode, Lemon – Vacation Mode, Weisheng – F1 Legend, G-Dragon (original design). Loads AFTER portraits_new10.js */
Object.assign(PORTRAITS,{"keith2": "assets/img/32eedc885caa.webp", "lemon2": "assets/img/993e95ab6d7f.webp", "weisheng2": "assets/img/11a3fdf68c8b.webp", "gdragon": "assets/img/aea63fbab304.webp"});
/* v15 portraits (webp 330x440): James, Clement – Trinity Titan, Uncle Ee (original designs). Loads AFTER portraits_v12.js */
Object.assign(PORTRAITS,{"james": "assets/img/6ef992ff98f6.webp", "clement2": "assets/img/c73ba9becaf4.webp", "uncleee": "assets/img/6fe64bbabf3a.webp"});
const FIELD_IMG={"castle":"assets/img/993dad9fd636.webp","dragon_lair":"assets/img/b7f382b4ffa6.webp","machine_world":"assets/img/c8ee01331b81.webp","magician_room":"assets/img/ca53f34c07b0.webp","forest":"assets/img/f768d39c9b0f.webp","fairy_lake":"assets/img/c707a147b5a8.webp","idol_stage":"assets/img/fa0c316130e7.webp","racetrack":"assets/img/ae9735cc47fe.webp","cat_cafe":"assets/img/0f590ba8dc50.webp","stadium":"assets/img/f7198f905e90.webp","robot_hangar":"assets/img/1af68fb2f6b2.webp","nemesis_coliseum":"assets/img/ab68cbf8fdf8.webp"};
/* new5 arenas (webp 1024x576). Load AFTER fields.js */
Object.assign(FIELD_IMG,{"toy_town":"assets/img/05af9bd1dc09.webp","kopitiam":"assets/img/279e98109ec8.webp","cubicle_hell":"assets/img/0732abc509af.webp","silent_theatre":"assets/img/54c293120ef6.webp","hobby_con":"assets/img/78a39026f87c.webp"});
/* new5b arenas (webp 1024x576). Load AFTER fields_new5.js */
Object.assign(FIELD_IMG,{"gloom_cathedral": "assets/img/d4a0cdcef64e.webp", "pawn_alley": "assets/img/f6932444aa86.webp", "rift_peaks": "assets/img/3b7ad85aac80.webp", "hisyam_stall": "assets/img/f7001ae16d07.webp", "derby_dome": "assets/img/07788833fa98.webp"});
/* new3c arenas (webp 1024x576). Load AFTER fields_new5b.js */
Object.assign(FIELD_IMG,{"cosy_bakery": "assets/img/0e3443ccc417.webp", "cosplay_stage": "assets/img/19a4d000aead.webp", "concert_stage": "assets/img/b4680f0c9493.webp"});
/* ================= CARD DATABASE (all names original) ================= */
const ATTR_ICON={LIGHT:"☀️",DARK:"🌑",FIRE:"🔥",WATER:"💧",EARTH:"⛰️",WIND:"🌀"};
const CARDS={};
function M(id,ch,name,level,attr,race,atk,def,art,fx,flavor,ace){CARDS[id]={id,ch,name,type:"monster",level,attr,race,atk,def,art,fx:fx||{},flavor:flavor||"",ace:!!ace};}
function SP(id,ch,name,kind,art,fx,flavor){CARDS[id]={id,ch,name,type:"spell",kind,art,fx,flavor:flavor||""};}
function TR(id,ch,name,art,fx,flavor){CARDS[id]={id,ch,name,type:"trap",kind:"Normal",art,fx,flavor:flavor||""};}
// ---------- KAITO: Warrior ----------
M("k_squire","kaito","Squire of Dawn",3,"LIGHT","Warrior",1200,1000,"🛡️",{onSummon:{k:"ssHand",race:"Warrior",maxLv:3}},"Eager to prove himself at the first light of every battle.");
M("k_recruit","kaito","Bladeguard Recruit",4,"EARTH","Warrior",1500,1300,"🪖",{guard:true},"His shield has never broken. Not once.");
M("k_lion","kaito","Lionheart Swordsman",4,"LIGHT","Warrior",1700,1100,"⚔️",{pierce:true},"His blade cuts through any wall of shields.");
M("k_banner","kaito","Banner Knight",4,"LIGHT","Warrior",1400,1200,"🚩",{aura:{race:"Warrior",atk:200}},"Where his banner flies, courage follows.");
M("k_fencer","kaito","Wandering Blademaster",4,"EARTH","Warrior",1900,800,"🤺",{},"A traveller whose duels are the stuff of tavern legends.");
M("k_wall","kaito","Shieldwall Sentinel",4,"EARTH","Warrior",800,2100,"🏰",{flip:{k:"draw",n:1}},"Hold the line. Always hold the line.");
M("k_lancer","kaito","Dawnstrike Lancer",4,"LIGHT","Warrior",1700,1200,"🔱",{onSummon:{k:"destroyST"}},"Her spear shatters curses and snares alike.");
M("k_shadow","kaito","Shadowstep Duelist",3,"EARTH","Warrior",1300,900,"🗡️",{direct:true},"Gone in a blink, and then behind you.");
M("k_captain","kaito","Knight-Captain Aldric",5,"LIGHT","Warrior",2200,1600,"💂",{onSummon:{k:"ssGY",race:"Warrior",maxLv:4}},"No soldier under his command is left behind.");
M("k_sunspear","kaito","Crusader of the Sunspear",6,"LIGHT","Warrior",2400,2000,"☀️",{pierce:true,guard:true},"Blessed armor, blinding spear.");
M("k_oath","kaito","Oathkeeper Grand Knight",7,"EARTH","Warrior",2600,2400,"🏇",{pierce:true,guard:true,onSummon:{k:"draw",n:1}},"He swore to protect the realm — and he never breaks a vow.",true);
M("k_ace","kaito","Starlight Crystal Paladin",8,"LIGHT","Warrior",3000,2500,"💎",{onSummon:{k:"destroyMon"},aura:{race:"Warrior",atk:200}},"Forged from a fallen star, its blade of crystal light ends every battle.",true);
SP("k_flag","kaito","Hero's Rally Standard","Continuous","🎌",{k:"cont",race:"Warrior",atk:300},"The whole army surges forward.");
SP("k_oathsword","kaito","Sacred Oath Blade","Equip","🗡️",{k:"equip",v:800,race:"Warrior"});
TR("k_riposte","kaito","Counterstrike Riposte","↩️",{k:"destroyAttacker",needRace:"Warrior"},"Parry, then strike true.");
// ---------- RYUGA: Dragon ----------
M("r_egg","ryuga","Ember Hatchling",2,"FIRE","Dragon",800,700,"🥚",{onDestroy:{k:"ssDeck",race:"Dragon",maxLv:4}},"When its shell cracks, something bigger answers.");
M("r_drake","ryuga","Scaleback Drake",4,"FIRE","Dragon",1700,1400,"🦎",{},"Its armored back deflects arrows like rain.");
M("r_wyvern","ryuga","Cinderwing Wyvern",4,"FIRE","Dragon",1800,1200,"🐲",{onSummon:{k:"burn",v:300}},"Each beat of its wings scatters burning ash.");
M("r_wyrmling","ryuga","Ashen Wyrmling",3,"DARK","Dragon",1300,1000,"🐍",{onSummon:{k:"search",race:"Dragon"}},"It cries out, and its elders hear.");
M("r_molten","ryuga","Molten Shell Drake",4,"FIRE","Dragon",1200,1900,"🌋",{flip:{k:"burn",v:600}},"Crack its crust and lava spills out.");
M("r_thunder","ryuga","Thunderhorn Dragon",4,"WIND","Dragon",1900,1000,"⚡",{pierce:true},"Its horn calls lightning down on the battlefield.");
M("r_elder","ryuga","Dragonkin Elder",4,"DARK","Dragon",1200,1800,"🐉",{aura:{race:"Dragon",atk:300}},"An ancient wyrm whose presence emboldens its kin.");
M("r_glide","ryuga","Skyfang Glider",3,"WIND","Dragon",1200,800,"🪶",{direct:true},"Strikes from the clouds, unseen.");
M("r_talon","ryuga","Crimson Talon Drake",5,"FIRE","Dragon",2200,1500,"🦖",{onSummon:{k:"destroyST"}},"Its talons tear through magical wards.");
M("r_obsidian","ryuga","Obsidian Horn Dragon",6,"DARK","Dragon",2500,2000,"🦏",{pierce:true},"Black scales harder than any blade.");
M("r_eclipse","ryuga","Scarlet Eclipse Wyrm",7,"DARK","Dragon",2700,2100,"🌘",{onSummon:{k:"burn",v:800},onDestroy:{k:"burn",v:500}},"When it rises, the sun itself turns red.",true);
M("r_ace","ryuga","Inferno Emperor Dragon",8,"FIRE","Dragon",3000,2500,"🔥",{onSummon:{k:"destroyAllST"},pierce:true},"The sovereign of all flame. Its roar melts mountains.",true);
SP("r_roost","ryuga","Dragon's Volcanic Roost","Continuous","🏔️",{k:"cont",race:"Dragon",atk:300},"Dragons grow mighty in the heat of the caldera.");
SP("r_breath","ryuga","Dragonfire Breath","Normal","🔥",{k:"raceBurn",race:"Dragon",v:500});
TR("r_barrier","ryuga","Wyrm Scale Barrier","🐲",{k:"shrink",v:1000,needRace:"Dragon"},"Scales harden; the strike glances off.");
// ---------- MIRA: Machine ----------
M("m_drone","mira","Cog Scout Drone",2,"EARTH","Machine",700,600,"🛸",{onSummon:{k:"draw",n:1}},"Data uplink established.");
M("m_soldier","mira","Gearwork Soldier",4,"EARTH","Machine",1700,1400,"🤖",{guard:true},"Reinforced plating, mark IV.");
M("m_turret","mira","Spark Turret",3,"LIGHT","Machine",1000,1500,"🔋",{onSummon:{k:"burn",v:400}},"Charging... firing!");
M("m_tank","mira","Steel Beetle Tank",4,"EARTH","Machine",1700,1500,"🚜",{pierce:true},"Treads that crush any barricade.");
M("m_welder","mira","Arc Welder Bot",4,"LIGHT","Machine",1800,1000,"🔧",{onSummon:{k:"destroyST"}},"It dismantles traps for breakfast.");
M("m_clock","mira","Clockwork Sentinel",4,"DARK","Machine",1000,2000,"⏱️",{flip:{k:"destroyMon"}},"Tick. Tock. Target eliminated.");
M("m_core","mira","Overclock Core",3,"LIGHT","Machine",900,900,"⚙️",{aura:{race:"Machine",atk:300}},"Pushes every nearby machine past its limits.");
M("m_assembler","mira","Assembly Drone",4,"EARTH","Machine",1400,1200,"🛠️",{onSummon:{k:"ssHand",race:"Machine",maxLv:4}},"Builds a friend on arrival.");
M("m_jet","mira","Hover Jet Interceptor",4,"WIND","Machine",1300,1000,"✈️",{direct:true},"Flies right over the front line.");
M("m_lancer","mira","Plasma Lancer Mk-II",5,"LIGHT","Machine",2100,1600,"🔫",{onSummon:{k:"burn",v:500}},"Prototype weapon. Handle with care.");
M("m_titan","mira","Titan Forge Golem",6,"EARTH","Machine",2400,2200,"🏭",{guard:true},"Built in the heart of a furnace city.");
M("m_reactor","mira","Quantum Reactor Titan",7,"DARK","Machine",2800,2000,"☢️",{onDestroy:{k:"burn",v:1000}},"Destroy it, and its core detonates.",true);
M("m_ace","mira","Omega Circuit Colossus",8,"LIGHT","Machine",3000,2800,"🦾",{onSummon:{k:"destroyWeakAll",maxAtk:1500},pierce:true},"Mira's masterpiece: a walking fortress of pure logic.",true);
SP("m_reboot","mira","Factory Reboot","Normal","🔄",{k:"revive",race:"Machine"},"System restore complete.");
SP("m_nano","mira","Nano Repair Field","Continuous","🧬",{k:"cont",race:"Machine",atk:300});
TR("m_overload","mira","Overload Feedback","🌩️",{k:"burnBack",v:1000,needRace:"Machine"},"Every hit sends the voltage back.");
// ---------- SAKURA: Spellcaster ----------
M("s_apprentice","sakura","Moonlit Apprentice",2,"DARK","Spellcaster",800,1000,"🌙",{flip:{k:"draw",n:1}},"She practices spells by the light of the moon.");
M("s_acolyte","sakura","Lunar Acolyte",3,"LIGHT","Spellcaster",1200,1200,"📿",{aura:{race:"Spellcaster",atk:200}},"Her prayers strengthen every caster nearby.");
M("s_weaver","sakura","Starweave Sorceress",4,"LIGHT","Spellcaster",1700,1300,"✨",{onSummon:{k:"burn",v:400}},"She stitches starlight into spells.");
M("s_hexer","sakura","Crescent Hexer",4,"DARK","Spellcaster",1600,1200,"🪄",{onSummon:{k:"destroyST"}},"Her hex unravels any enchantment.");
M("s_sage","sakura","Tome Keeper Sage",4,"DARK","Spellcaster",1200,1800,"📖",{onSummon:{k:"search",type:"spell"}},"Every answer is written somewhere.");
M("s_illusion","sakura","Twilight Illusionist",4,"DARK","Spellcaster",1400,1400,"🎭",{direct:true},"Which one of her is real?");
M("s_witch","sakura","Nebula Witch",4,"DARK","Spellcaster",1800,1000,"🧙‍♀️",{},"Her broom leaves trails of cosmic dust.");
M("s_mirror","sakura","Mirror Mage",3,"LIGHT","Spellcaster",1000,1600,"🪞",{flip:{k:"destroyMon"}},"Gaze into the mirror... and vanish.");
M("s_archmage","sakura","Astral Archmage",5,"LIGHT","Spellcaster",2100,1700,"🧙",{onSummon:{k:"ssGY",race:"Spellcaster",maxLv:4}},"He calls lost apprentices back from beyond.");
M("s_comet","sakura","Comet Caller",6,"LIGHT","Spellcaster",2300,2000,"☄️",{onSummon:{k:"burn",v:800}},"She pulls comets down from the night sky.");
M("s_grand","sakura","Grand Astral Sorcerer",7,"LIGHT","Spellcaster",2600,2200,"🔮",{onSummon:{k:"draw",n:2}},"Master of the seven celestial schools.",true);
M("s_ace","sakura","Lunaria, Silver Moon Empress",8,"DARK","Spellcaster",2900,2600,"🌕",{onSummon:{k:"destroyMon"},aura:{race:"Spellcaster",atk:300}},"When the full moon rises, the empress descends.",true);
SP("s_tower","sakura","Crescent Moon Tower","Continuous","🗼",{k:"cont",race:"Spellcaster",atk:300});
SP("s_ritual","sakura","Moonbeam Revival","Normal","🌙",{k:"revive",race:"Spellcaster"});
TR("s_rebound","sakura","Arcane Rebound","🌀",{k:"destroyAttacker",needRace:"Spellcaster"},"The spell returns to its sender.");
// ---------- TOMA: Beast ----------
M("t_squirrel","toma","Acorn Squirrel",2,"EARTH","Beast",700,500,"🐿️",{onDestroy:{k:"ssDeck",race:"Beast",maxLv:4}},"It always has a friend hidden nearby.");
M("t_pup","toma","Forest Pup",3,"EARTH","Beast",1200,1000,"🐶",{onSummon:{k:"ssHand",race:"Beast",maxLv:3}},"Barks once and the whole pack comes running.");
M("t_boar","toma","Thornback Boar",4,"EARTH","Beast",1800,1000,"🐗",{pierce:true},"Charges straight through hedges and walls.");
M("t_bear","toma","Moss Bear Cub",4,"EARTH","Beast",1400,1800,"🐻",{guard:true},"Fluffy, sleepy, and impossible to knock over.");
M("t_hare","toma","Swift Hare Scout",3,"WIND","Beast",1200,800,"🐇",{direct:true},"Too fast to block.");
M("t_fox","toma","Leafcloak Fox",4,"WIND","Beast",1700,1200,"🦊",{onSummon:{k:"destroyST"}},"Sniffs out hidden traps with a grin.");
M("t_wolf","toma","Packleader Wolf",4,"EARTH","Beast",1500,1300,"🐺",{aura:{race:"Beast",atk:300}},"Its howl makes the whole pack braver.");
M("t_owl","toma","Hollow Owl",3,"WIND","Beast",1000,1500,"🦉",{flip:{k:"draw",n:1}},"It sees everything from its hollow.");
M("t_tiger","toma","Wildroar Tiger",5,"EARTH","Beast",2300,1400,"🐯",{pierce:true},"Its roar flattens the tall grass.");
M("t_elk","toma","Mossy Elk Guardian",6,"EARTH","Beast",2300,2200,"🦌",{onSummon:{k:"heal",v:1000}},"Flowers bloom wherever it steps.");
M("t_kitsune","toma","Verdant Nine-Tail Kitsune",7,"WIND","Beast",2600,2000,"🦊",{onSummon:{k:"ssGY",race:"Beast",maxLv:4},direct:false},"Each of its nine tails holds a forest spirit.",true);
M("t_ace","toma","Great Spirit Bear Kumaro",8,"EARTH","Beast",3000,2600,"🐻",{pierce:true,guard:true},"The ancient guardian of the deep woods. Toma's best friend.",true);
SP("t_call","toma","Call of the Wild","Normal","📣",{k:"search",race:"Beast"});
SP("t_sanctuary","toma","Forest Sanctuary","Continuous","🌳",{k:"cont",race:"Beast",atk:300});
TR("t_bramble","toma","Bramble Ambush","🌿",{k:"destroyAttacker",needRace:"Beast"},"The undergrowth bites back.");
// ---------- LILY: Fairy ----------
M("l_sprite","lily","Petal Sprite",2,"LIGHT","Fairy",600,800,"🌸",{onSummon:{k:"heal",v:500}},"She smells like spring.");
M("l_pixie","lily","Dewdrop Pixie",3,"WATER","Fairy",1100,1200,"💧",{flip:{k:"draw",n:1}},"Sleeps inside morning dewdrops.");
M("l_ribbon","lily","Ribbon Fairy Mimi",3,"LIGHT","Fairy",1200,1000,"🎀",{onSummon:{k:"ssHand",race:"Fairy",maxLv:3}},"Ties everyone together with her ribbons!");
M("l_cloud","lily","Candy Cloud Fairy",4,"WIND","Fairy",1500,1600,"☁️",{aura:{race:"Fairy",atk:300}},"Rains sugar sprinkles on her friends.");
M("l_star","lily","Twinkle Star Fairy",4,"LIGHT","Fairy",1700,1000,"⭐",{onSummon:{k:"burn",v:500}},"Wish upon her — she bites!");
M("l_moon","lily","Moonflower Pixie",4,"LIGHT","Fairy",1700,1300,"🌼",{direct:true},"Flutters past every guard.");
M("l_rainbow","lily","Rainbow Wing Fairy",4,"WIND","Fairy",1800,900,"🌈",{onSummon:{k:"destroyST"}},"Her rainbow wings sweep traps away.");
M("l_bubble","lily","Bubble Guardian",4,"WATER","Fairy",800,2000,"🎐",{guard:true},"Pop! ...it's still there.");
M("l_angel","lily","Lullaby Angel",5,"LIGHT","Fairy",2100,1800,"👼",{onSummon:{k:"ssGY",race:"Fairy",maxLv:4}},"Her song wakes fallen friends.");
M("l_unicorn","lily","Sugarbloom Unicorn",6,"LIGHT","Fairy",2300,2100,"🦄",{onSummon:{k:"heal",v:1000}},"A rainbow mane and a heart of gold.");
M("l_seraph","lily","Stardust Wing Seraphina",7,"LIGHT","Fairy",2600,2200,"🧚",{guard:true,onSummon:{k:"draw",n:1}},"Her wings scatter stardust over the whole garden.",true);
M("l_ace","lily","Blossom Queen Fiorella",8,"LIGHT","Fairy",2800,2800,"👑",{onSummon:[{k:"heal",v:1000},{k:"destroyMon"}],aura:{race:"Fairy",atk:300}},"Queen of the Fairy Garden. Every flower bows to her.",true);
SP("l_ring","lily","Fairy Ring Dance","Continuous","💫",{k:"cont",race:"Fairy",atk:400});
SP("l_wish","lily","Wish upon a Petal","Normal","🌷",{k:"heal",v:2000});
TR("l_dust","lily","Pixie Dust Veil","✨",{k:"negate",needRace:"Fairy"},"Sparkly sparkly — miss!");
// ---------- WEI YAO: Idol ----------
M("w_trainee","weiyao","Starry-Eyed Trainee",2,"LIGHT","Idol",600,800,"🌟",{onDestroy:{k:"ssDeck",race:"Idol",maxLv:4}},"Her debut is just around the corner!");
M("w_songstress","weiyao","Melody Songstress Kanon",4,"LIGHT","Idol",1700,1200,"🎤",{onSummon:{k:"heal",v:600}},"Her voice heals every heart in the stadium.");
M("w_dancer","weiyao","Pop Step Dancer Rina",4,"WIND","Idol",1700,1000,"💃",{auraPer:{race:"Idol",atk:200}},"She dances harder the bigger the crowd.");
M("w_rock","weiyao","Rockstar Idol Aki",4,"FIRE","Idol",1800,1100,"🎸",{pierce:true},"Her guitar solos blow the roof off.");
M("w_cheer","weiyao","Cheer Captain Momo",3,"LIGHT","Idol",1100,1000,"📣",{aura:{race:"Idol",atk:300}},"Ready? Ok! Everybody, cheer!");
M("w_drum","weiyao","Beat Drummer Hana",4,"EARTH","Idol",1500,1500,"🥁",{onSummon:{k:"burn",v:500}},"Drum solo! The bass shakes the arena.");
M("w_mascot","weiyao","Fan Club Mascot Pon",3,"LIGHT","Idol",900,1600,"🧸",{flip:{k:"draw",n:1}},"The official mascot. Hugs available after the show.");
M("w_duo","weiyao","Twin-Tail Duo Lumi",4,"WATER","Idol",1500,1200,"🎀",{onSummon:{k:"ssHand",race:"Idol",maxLv:3}},"Duet time! She never sings alone.");
M("w_shy","weiyao","Backstage Idol Yuki",3,"WATER","Idol",1200,1300,"🎧",{direct:true},"Sneaks past security to sing to you directly.");
M("w_diva","weiyao","Spotlight Diva Seira",5,"LIGHT","Idol",2100,1600,"💎",{onSummon:{k:"ssGY",race:"Idol",maxLv:4}},"Encore! Encore! She brings her backup dancers back on stage.");
M("w_rising","weiyao","Rising Star Akari",6,"LIGHT","Idol",2300,1900,"✨",{auraPer:{race:"Idol",atk:200},guard:true},"Top of the charts, and she's only getting started.");
M("w_prism","weiyao","Prism Center Idol Hoshina",7,"LIGHT","Idol",2600,2100,"🌈",{onSummon:[{k:"heal",v:1000},{k:"ssHand",race:"Idol",maxLv:4}],guard:true},"The center of every stage, shining in seven colors.",true);
M("w_ace","weiyao","Galaxy Harmony Unit STELLA★9",8,"LIGHT","Idol",2800,2500,"🎆",{onSummon:{k:"ssGY",race:"Idol",maxLv:4},auraPer:{race:"Idol",atk:300}},"Nine voices, one song. Wei Yao's legendary idol group takes center stage!",true);
SP("w_encore","weiyao","Encore Live!","Normal","🎶",{k:"revive",race:"Idol"},"The crowd won't stop chanting her name.");
SP("w_glow","weiyao","Sea of Glowsticks","Continuous","🪄",{k:"cont",race:"Idol",atk:300},"Fifty thousand lights wave as one.");
TR("w_wall","weiyao","Fan Cheer Wall","📢",{k:"shrink",v:1000,needRace:"Idol"},"The fans' cheers drown out the attack!");
// ---------- SHARED ----------
SP("x_spark","shared","Spark Talisman","Normal","⚡",{k:"burn",v:500});
SP("x_meteor","shared","Meteor Shard","Normal","☄️",{k:"burn",v:1000});
SP("x_seal","shared","Banishing Seal","Normal","🧿",{k:"destroy1"});
SP("x_storm","shared","Cataclysm Storm","Normal","🌪️",{k:"destroyAll"});
SP("x_mend","shared","Mending Light","Normal","💖",{k:"heal",v:1000});
SP("x_blade","shared","Spirit Blade","Equip","🗡️",{k:"equip",v:500});
SP("x_oracle","shared","Oracle's Insight","Normal","🔮",{k:"draw",n:2});
SP("x_gust","shared","Twister Gust","Normal","🍃",{k:"destroyST1"});
SP("x_revive","shared","Revival Rite","Normal","✝️",{k:"revive"});
TR("x_veil","shared","Phantom Veil","🌫️",{k:"negate"});
TR("x_thorn","shared","Thornspike Snare","🌵",{k:"destroyAttacker"});
TR("x_aegis","shared","Aegis Ward","🛡️",{k:"noDamage"});
TR("x_hex","shared","Weakening Hex","🕯️",{k:"shrink",v:800});
TR("x_sigil","shared","Retribution Sigil","♨️",{k:"burnBack",v:800});

// ---------- QUICK-PLAY SPELLS (v4) ----------
function QP(id,ch,name,fx,flavor){CARDS[id]={id,ch,name,type:"spell",kind:"Quick-Play",art:"",fx,flavor:flavor||""};}
QP("k_parry","kaito","Valiant Parry",{k:"qNegate"},"Steel meets steel, and the blow never lands.");
QP("r_roar","ryuga","Dragonheart Roar",{k:"qBoost",v:1000,race:"Dragon"},"One roar, and the flames burn twice as hot.");
QP("m_recall","mira","Emergency Recall Protocol",{k:"qBounce"},"Unit recalled. Please try again later.");
QP("s_banish","sakura","Crescent Banishment",{k:"qDestroy",maxAtk:1900},"The crescent moon cuts the night in two.");
QP("t_ambush","toma","Thicket Ambush",{k:"qShrink",v:1000},"Surprise! The bushes were full of friends.");
QP("l_breeze","lily","Petal Breeze Blessing",{k:"qDraw",n:1,heal:1000},"A warm breeze, a shower of petals, and every scrape is gone.");
QP("w_spot","weiyao","Encore Spotlight",{k:"qBoost",v:800,race:"Idol"},"Hit the spotlight! She's not done yet!");
QP("v_brake","weisheng","Emergency Brake",{k:"qNegate"},"Smoke, sparks, and a dead stop.");
QP("c_feint","keith","Catnap Feint",{k:"qBounce"},"Was she ever really there? Nya~");
QP("n_second","kelvin","Second Wind",{k:"qDraw",n:1,heal:800},"Deep breath. The last lap starts now.");
QP("b_grid","ben","Laser Grid Lockdown",{k:"qDestroy",maxAtk:1800},"Intruder detected. Grid engaged.");
QP("x_flash","shared","Flash Barrier",{k:"qNegate"},"A wall of light, there and gone in an instant.");
QP("x_smite","shared","Thunderclap Smite",{k:"qDestroy",maxAtk:1500},"The sky answers before the enemy can.");

/* ---------- effect text ---------- */
function fxPhrase(e){if(Array.isArray(e))return e.map(fxPhrase).join(", then ");
  switch(e.k){case "burn":return `inflict ${e.v} damage to your opponent`;case "heal":return `gain ${e.v} LP`;
    case "draw":return `draw ${e.n} card${e.n>1?"s":""}`;case "destroyST":return "destroy 1 Spell/Trap your opponent controls";
    case "destroyAllST":return "destroy all Spell/Trap cards your opponent controls";
    case "destroyMon":return e.maxAtk?`destroy 1 opponent's monster with ${e.maxAtk} or less ATK`:"destroy your opponent's strongest monster";
    case "destroyWeakAll":return `destroy all of your opponent's monsters with ${e.maxAtk} or less ATK`;
    case "ssHand":return `Special Summon 1 Level ${e.maxLv} or lower ${e.race}${e.notSelf?` monster other than “${e.notSelf}”`:""} from your hand`;
    case "ssGY":return `Special Summon 1 Level ${e.maxLv} or lower ${e.race}${e.notSelf?` monster other than “${e.notSelf}”`:""} from your Graveyard`;
    case "ssDeck":return `Special Summon 1 Level ${e.maxLv} or lower ${e.race}${e.notSelf?` monster other than “${e.notSelf}”`:""} from your Deck`;
    case "search":return e.race?`add 1 ${e.race} monster from your Deck to your hand`:"add 1 Spell card from your Deck to your hand";
    case "payLP":return `pay ${e.v} LP`;
    case "payDraw":return `pay ${e.lp} LP to draw ${e.n} card${e.n>1?"s":""}`;
    case "coin":return `toss a coin. Heads: ${fxPhrase(e.h)}. Tails: ${fxPhrase(e.t)}`;
    case "weakenAll":return `every face-up monster your opponent controls loses ${e.v} ATK until the end of this turn`;
    case "drain":return `inflict ${e.v} damage to your opponent and gain ${e.v} LP`;}
  return "";}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
function cardText(c){const f=c.fx||{};const t=[];
  if(c.type==="monster"){
    if(f.onSummon)t.push(`<b>When Normal Summoned:</b> ${fxPhrase(f.onSummon)}.`);
    if(f.flip)t.push(`<b>FLIP:</b> ${cap(fxPhrase(f.flip))}.`);
    if(f.onDestroy)t.push(`<b>When destroyed:</b> ${fxPhrase(f.onDestroy)}.`);
    if(f.aura)t.push(`<b>Continuous:</b> your face-up ${f.aura.race} monsters gain ${f.aura.atk} ATK.`);
    if(f.auraPer)t.push(`<b>Fan Power:</b> gains ${f.auraPer.atk} ATK for each other face-up ${f.auraPer.race} you control.`);
    if(f.pierce)t.push(`<b>Piercing:</b> deals damage when attacking a Defense Position monster.`);
    if(f.reps)t.push(`<b>Vengeance:</b> gains ${f.reps} ATK at the start of each of your turns while face-up.`);
    if(f.double)t.push(`<b>Double Sprint:</b> can attack twice each Battle Phase.`);
    if(c.extra)t.push(`<i>Combination monster — can only be Special Summoned by its Combination spell.</i>`);
    if(f.direct)t.push(`<b>Phantom Strike:</b> can attack directly even if your opponent has monsters.`);
    if(f.guard)t.push(`<b>Stalwart:</b> the first time it would be destroyed by battle, it isn't.`);
  }else if(c.type==="spell"){
    switch(f.k){case "burn":t.push(`Inflict ${f.v} damage to your opponent.`);break;case "heal":t.push(`Gain ${f.v} LP.`);break;
      case "draw":t.push(`Draw ${f.n} cards.`);break;case "destroy1":t.push("Target 1 monster your opponent controls; destroy it.");break;
      case "destroyAll":t.push("Destroy all monsters on the field.");break;case "destroyST1":t.push("Target 1 Spell/Trap your opponent controls; destroy it.");break;
      case "equip":t.push(`Equip only to a face-up ${f.race||""} monster you control. It gains ${f.v} ATK.`.replace("  "," "));break;
      case "revive":t.push(`Special Summon your strongest ${f.race||""} monster from your Graveyard.`.replace("  "," "));break;
      case "search":t.push(`Add your strongest ${f.race} monster from your Deck to your hand.`);break;
      case "cont":t.push(`Stays on the field. Your face-up ${f.race} monsters gain ${f.atk} ATK.`);break;
      case "boost":t.push(`Target 1 face-up ${f.race||""} monster you control; it gains ${f.v} ATK until the end of this turn.`.replace("  "," "));break;
      case "fusion":t.push(`<b>Combination:</b> send ${f.mats.map(m=>CARDS[m].name).join(" + ")} from your hand and/or field to the Graveyard, then Special Summon <b>${CARDS[f.result].name}</b> (ATK ${CARDS[f.result].atk}).`);break;
      case "raceBurn":t.push(`Inflict ${f.v} damage for each face-up ${f.race} you control.`);break;
      case "qNegate":t.push("When an opponent's monster declares an attack: negate that attack.");break;
      case "qBoost":t.push(`1 face-up ${f.race?f.race+" ":""}monster you control gains ${f.v} ATK until the end of this turn (during an attack: your monster in that battle).`);break;
      case "qBounce":t.push("Return 1 monster your opponent controls to the hand (during an attack: the attacker; after a Summon: that monster).");break;
      case "qDestroy":t.push(`Destroy 1 face-up monster your opponent controls with ${f.maxAtk} or less ATK (during an attack: the attacker; after a Summon: that monster).`);break;
      case "qShrink":t.push(`1 face-up monster your opponent controls loses ${f.v} ATK until the end of this turn (during an attack: the attacker).`);break;
      case "qHeal":t.push(`Gain ${f.v} LP.`);break;
      case "qDraw":t.push(`Draw ${f.n} card${f.n>1?"s":""}${f.heal?`, then gain ${f.heal} LP`:""}.`);break;
      case "qBurn":t.push(`Inflict ${f.v} damage to your opponent.`);break;
      default:{const p=fxPhrase(f);if(p)t.push(cap(p)+".");}}
    if(c.kind==="Quick-Play")t.push("<i>Activate from your hand on your turn, or Set it and activate it on either player's turn (not the turn it was Set).</i>");
  }else{
    const pre="When an opponent's monster declares an attack"+(f.needRace?` while you control a face-up ${f.needRace}`:"")+": ";
    switch(f.k){case "negate":t.push(pre+"negate the attack and end the Battle Phase.");break;case "destroyAttacker":t.push(pre+"destroy the attacking monster.");break;
      case "noDamage":t.push(pre+"you take no battle damage from that battle.");break;case "shrink":t.push(pre+`the attacking monster loses ${f.v} ATK this turn.`);break;
      case "burnBack":t.push(pre+`inflict ${f.v} damage to your opponent.`);break;}
  }
  return t;}
function isEffect(c){return c.type==="monster"&&cardText(c).length>0;}

/* ================= CHARACTERS ================= */
const CHARS={
  you:{name:"You",img:"player",race:null,color:"#b07bff",theme:"Custom — any card in the game",
    bio:"A young duelist in a black hooded jacket who refuses to be boxed into one type. A fan of multicolor decks, you build your own deck from every card in the game.",
    quote:"Every card is a possibility. Let's see what this deck can do.",
    lines:{start:["Let's see what this deck can do.","My deck, my rules."],summon:["Go!","Your turn to shine."],ace:["Here's my trump card!"],attack:["Attack!","Straight through!"],trap:["Saw that coming."],hurt:["Not bad..."],win:["GG! That deck clicked."],lose:["Back to the deck builder..."]}},
  kaito:{name:"Kaito",img:"hero",race:"Warrior",color:"#3f8cff",theme:"Warrior — knights & swordsmen",
    bio:"An earnest, hot-blooded duelist in a navy jacket. His deck of noble knights fights shoulder to shoulder, and he never backs down from a challenge.",
    quote:"A true duelist never gives up — not while a single card remains!",
    lines:{start:["Let's have a great duel — I won't hold back!","My knights are ready!"],summon:["Stand with me, knight!","Ready your blade!"],ace:["Shine through the darkness — Starlight Crystal Paladin!","Rise, my sworn guardian!"],attack:["Charge!","Strike true!","For honor!"],trap:["Not so fast!"],hurt:["Tch... I can still fight!"],win:["That was an awesome duel!"],lose:["Next time, my sword won't miss."]}},
  ryuga:{name:"Ryuga",img:"ryuga",race:"Dragon",color:"#ff4b3a",theme:"Dragon — fire & fury",
    bio:"A fiery, prideful rival in a crimson coat who commands only dragons. He believes pure power decides every duel — and his dragons have plenty.",
    quote:"Kneel before the flames, or be reduced to ash.",
    lines:{start:["Burn to ash before my dragons!","You're not worthy of my flames."],summon:["Rise, dragon!","Spread your wings!"],ace:["ROAR, Inferno Emperor Dragon! Scorch this field!","Behold the eclipse!"],attack:["Dragonfire — consume them!","Burn!","Pathetic."],trap:["Did you think I'd fall for that?"],hurt:["Grr... a lucky hit."],win:["As expected. The dragon reigns supreme."],lose:["Impossible... my flames... extinguished?"]}},
  mira:{name:"Mira",img:"mira",race:"Machine",color:"#5fd4ff",theme:"Machine — engineered precision",
    bio:"A cool-headed engineering genius with silver-blue hair. She designs her own mechanical monsters and calculates every move in advance.",
    quote:"Your defeat has been calculated to three decimal places.",
    lines:{start:["Calculating victory probability... 97.3%.","Initiating duel protocol."],summon:["Unit deployed.","Systems online."],ace:["All systems maximum — Omega Circuit Colossus, activate!","Reactor at critical. Launch!"],attack:["Target locked.","Executing attack routine."],trap:["Countermeasure engaged."],hurt:["Unexpected variable detected..."],win:["Result: as predicted."],lose:["Error... recalculating... I lost?"]}},
  sakura:{name:"Sakura",img:"sakura",race:"Spellcaster",color:"#c77bff",theme:"Spellcaster — moonlit magic",
    bio:"A graceful moon mage with flowing pink-violet hair. Her spellcasters weave starlight and lunar sorcery, guided by the phases of the moon.",
    quote:"The moon has already foretold your defeat.",
    lines:{start:["The moon has already foretold your defeat.","Let the starlight guide us."],summon:["Come forth, my apprentice.","By moonlight, appear!"],ace:["Descend, Lunaria — Empress of the Silver Moon!","Behold the true arcane!"],attack:["Moonbeam strike!","Starfall!"],trap:["Your fate was written in the stars."],hurt:["The moon wanes... but returns."],win:["Just as the stars foretold."],lose:["The moon... has hidden its face from me."]}},
  toma:{name:"Toma",img:"toma",race:"Beast",color:"#ff9a3c",theme:"Beast — forest friends",
    bio:"A cheerful, energetic kid in an orange animal hoodie. His deck is full of forest animal friends, led by the Great Spirit Bear Kumaro.",
    quote:"Yay! Let's duel! My friends are super strong!",
    lines:{start:["Yay! Let's duel!","My animal friends are super strong!"],summon:["Come on out, buddy!","Go go go!"],ace:["KUMARO! Come help me, big bear!","The whole forest is with me!"],attack:["Get 'em!","Pounce!","Rawr!"],trap:["Gotcha! Hehe!"],hurt:["Owie... that hurt!"],win:["I won! I won! High five, Kumaro!"],lose:["Waaah... okay, one more duel!"]}},
  weiyao:{name:"Wei Yao",img:"weiyao",race:"Idol",color:"#ffcf4a",theme:"Idol — stage, songs & encores",
    bio:"A charismatic 21-year-old star idol producer in a white-and-gold stage suit and headset mic. His idol unit fights with songs, fan cheers and endless encores.",
    quote:"Lights, music, action — it's showtime, and you're my audience!",
    lines:{start:["Lights, music — it's showtime!","Welcome to my concert. Front row seats, just for you."],summon:["Take the stage!","Give them your best smile!","Next performer, please!"],ace:["The moment you've all been waiting for — STELLA★9, center stage!","Spotlights on! Shine, Hoshina!"],attack:["Hit the high note!","Encore attack!","Feel the rhythm!"],trap:["The fans have your back!"],hurt:["Even a star stumbles... the show goes on!"],win:["What a show! Thank you, everyone!"],lose:["The curtain falls... but there's always an encore."]}},
  lily:{name:"Lily",img:"lily",race:"Fairy",color:"#ff8fd0",theme:"Fairy — sparkles & petals",
    bio:"A sweet little girl with mint-green twin-tails and pink ribbons. Her fairy friends heal, sparkle and flutter — but don't underestimate the Blossom Queen!",
    quote:"Hehe~ my fairies want to play with you!",
    lines:{start:["Hehe~ my fairies want to play!","Let's have a sparkly duel!"],summon:["Come out and play~!","Ta-da!"],ace:["Bloom, Blossom Queen Fiorella! ✿","Sparkle sparkle — Seraphina!"],attack:["Fairy kiss attack!","Sparkle beam!"],trap:["Nope~! Pixie dust!"],hurt:["Hmph! That's not nice!"],win:["Yay! The fairies win~! ✿"],lose:["Uwaaa... the fairies are sleepy now..."]}}
};
/* ================= ARENAS (data-driven: add an entry + image to add a new arena) ================= */
const ARENAS={
  castle:{name:"Dawnlight Castle Courtyard",img:"castle",ambient:"torch",tint:"rgba(255,170,90,.10)"},
  dragon_lair:{name:"Molten Dragon Lair",img:"dragon_lair",ambient:"embers",tint:"rgba(255,80,30,.10)"},
  machine_world:{name:"Gearworks Circuit Arena",img:"machine_world",ambient:"circuit",tint:"rgba(60,200,255,.08)"},
  magician_room:{name:"Moonlit Arcane Study",img:"magician_room",ambient:"sparkles",tint:"rgba(170,110,255,.10)"},
  forest:{name:"Whispering Spirit Forest",img:"forest",ambient:"fireflies",tint:"rgba(120,220,90,.06)"},
  fairy_lake:{name:"Lotus Fairy Lake",img:"fairy_lake",ambient:"water",tint:"rgba(255,170,230,.08)"},
  idol_stage:{name:"Idol Concert Stage",img:"idol_stage",ambient:"spotlight",tint:"rgba(255,120,220,.06)"}
};
let CHARS_EXTRA;
// ---------- WEISHENG: Vehicle ----------
M("v_buggy","weisheng","Pit Crew Buggy",2,"EARTH","Vehicle",700,700,"🚙",{onDestroy:{k:"ssDeck",race:"Vehicle",maxLv:4}},"The pit crew always has a spare ready.");
M("v_cab","weisheng","Neon Cab Runner",3,"LIGHT","Vehicle",1200,1000,"🚕",{onSummon:{k:"ssHand",race:"Vehicle",maxLv:3}},"Picks up a friend on every corner.");
M("v_coupe","weisheng","Street Coupe Blitz",4,"FIRE","Vehicle",1700,1100,"🚗",{pierce:true},"It doesn't brake for barricades.");
M("v_patrol","weisheng","Interceptor Patrol Car",4,"LIGHT","Vehicle",1600,1400,"🚓",{onSummon:{k:"destroyST"}},"Sirens on — every trap gets pulled over.");
M("v_bike","weisheng","Drift Bike Rider",3,"WIND","Vehicle",1100,800,"🏍️",{direct:true},"Weaves through traffic and straight to the finish.");
M("v_hauler","weisheng","Iron Hauler Truck",4,"EARTH","Vehicle",1200,2100,"🚛",{guard:true},"Eighteen wheels of pure stopping power.");
M("v_pickup","weisheng","Pit Boss Pickup",4,"EARTH","Vehicle",1500,1300,"🛻",{aura:{race:"Vehicle",atk:200}},"Leads the convoy and tunes every engine.");
M("v_van","weisheng","Nitro Delivery Van",4,"DARK","Vehicle",1700,1200,"🚐",{onSummon:{k:"burn",v:500}},"Express delivery — with a nitro exhaust blast.");
M("v_racer","weisheng","Midnight Street Racer",4,"DARK","Vehicle",1800,900,"🏁",{},"Undefeated on the midnight highway.");
M("v_gt","weisheng","Crimson GT Phantom",5,"FIRE","Vehicle",2200,1500,"🏎️",{pierce:true,guard:true},"A red blur, then the roar.");
M("v_monster","weisheng","Dune Rally Monster Truck",6,"EARTH","Vehicle",2400,2100,"🚚",{onSummon:{k:"destroyMon",maxAtk:1800}},"Crushes anything smaller than its tires.");
M("v_v12","weisheng","Nightshade V12 Hypercar",7,"DARK","Vehicle",2600,2000,"🚘",{double:true},"Two laps before you finish one.",true);
M("v_ace","weisheng","Hyperion Zero Supercar",8,"LIGHT","Vehicle",3000,2400,"🏎️",{pierce:true,direct:true},"Weisheng's flagship. Zero to victory in 2.1 seconds.",true);
SP("v_nitro","weisheng","Nitro Boost","Normal","🔥",{k:"boost",v:1000,race:"Vehicle"},"Push the red button.");
SP("v_tune","weisheng","Garage Tune-Up","Equip","🔧",{k:"equip",v:700,race:"Vehicle"});
SP("v_lights","weisheng","Night Circuit Floodlights","Continuous","🌃",{k:"cont",race:"Vehicle",atk:300});
TR("v_crash","weisheng","Hairpin Turn Crash","💥",{k:"destroyAttacker",needRace:"Vehicle"},"Should have braked.");
// ---------- KEITH: Catgirl ----------
M("c_kitten","keith","Kitten Maid Mimi",2,"LIGHT","Catgirl",700,600,"🐱",{onDestroy:{k:"ssGY",race:"Catgirl",maxLv:4}},"Nine lives, and she's only used one.");
M("c_cafe","keith","Café Nekomaid Yuzu",3,"LIGHT","Catgirl",1200,1000,"☕",{onSummon:{k:"ssHand",race:"Catgirl",maxLv:3}},"Welcome home, master~ My friends are here too!");
M("c_ninja","keith","Shadowpaw Ninja Kuro",4,"DARK","Catgirl",1700,900,"🐈‍⬛",{direct:true},"Silent paws, sharp claws.");
M("c_purr","keith","Purr Idol Nyanko",4,"LIGHT","Catgirl",1500,1300,"😺",{aura:{race:"Catgirl",atk:300}},"One purr and every catgirl gets fired up.");
M("c_calico","keith","Calico Brawler Tama",4,"EARTH","Catgirl",1700,1000,"😼",{pierce:true},"Scratch first, ask questions never.");
M("c_tabby","keith","Sleepy Tabby Nemu",3,"EARTH","Catgirl",1000,1800,"😴",{flip:{k:"draw",n:1}},"Zzz... five more minutes... nya.");
M("c_lucky","keith","Lucky Charm Kitty",4,"LIGHT","Catgirl",1400,1400,"🍀",{onSummon:{k:"draw",n:1}},"Waves her paw and good fortune follows.");
M("c_alley","keith","Alleycat Scrapper Rin",4,"DARK","Catgirl",1600,1200,"😾",{onDestroy:{k:"ssGY",race:"Catgirl",maxLv:4}},"Knock her down and she lands on her feet.");
M("c_yarn","keith","Yarnball Trickster Koko",4,"WIND","Catgirl",1600,1200,"🧶",{onSummon:{k:"destroyST"}},"Unravels your plans one thread at a time.");
M("c_witch","keith","Midnight Whisker Witch",5,"DARK","Catgirl",2100,1600,"😸",{onSummon:{k:"ssGY",race:"Catgirl",maxLv:4}},"Her spell calls lost kittens home.");
M("c_tigress","keith","Tigress Catgirl Shiro",6,"EARTH","Catgirl",2400,1900,"🐅",{guard:true,pierce:true},"The fiercest of the clowder.");
M("c_queen","keith","Starlight Catgirl Queen Mewna",7,"LIGHT","Catgirl",2600,2100,"😻",{direct:true,onSummon:{k:"draw",n:1}},"She slips past every guard with a wink.",true);
M("c_ace","keith","Nine-Lives Empress Nekomata",8,"DARK","Catgirl",2900,2400,"🐈",{onSummon:{k:"ssGY",race:"Catgirl",maxLv:4},aura:{race:"Catgirl",atk:200},guard:true},"Twin-tailed sovereign of all catgirls. She has lived nine lifetimes.",true);
SP("c_catnip","keith","Catnip Frenzy","Continuous","🌿",{k:"cont",race:"Catgirl",atk:300});
SP("c_nine","keith","Nine Lives Miracle","Normal","💫",{k:"revive",race:"Catgirl"},"Did you really think that was the end? Nya~");
TR("c_box","keith","Cardboard Box Hideout","📦",{k:"negate",needRace:"Catgirl"},"If it fits, she sits — and the attack misses.");
// ---------- ERYLL: Dark Nemesis Warriors (v5 makeover) ----------
M("e_squire","eryll","Ashen Oath Squire",2,"DARK","Nemesis",800,700,"",{onDestroy:{k:"ssDeck",race:"Nemesis",maxLv:4}},"He swore his oath in ash. When he falls, another takes it up.");
M("e_acolyte","eryll","Grudgebound Acolyte",3,"DARK","Nemesis",1100,1200,"",{onSummon:{k:"ssHand",race:"Nemesis",maxLv:3}},"Every grudge she keeps calls another blade to her side.");
M("e_wraith","eryll","Shadowstep Wraith Knight",3,"DARK","Nemesis",1300,800,"",{direct:true},"It walks through shadows, and through your defenders.");
M("e_revenant","eryll","Cursed Plate Revenant",4,"DARK","Nemesis",1400,1900,"",{guard:true},"The armour is empty. The curse inside is not.");
M("e_kord","eryll","Vengeful Champion Kord",4,"FIRE","Nemesis",1600,1100,"",{reps:200},"Every wound he takes, he pays back twice.");
M("e_reaver","eryll","Blood-Moon Reaver",4,"DARK","Nemesis",1800,1000,"",{pierce:true},"Under the red moon, no shield is thick enough.");
M("e_warlord","eryll","Black Banner Warlord",4,"DARK","Nemesis",1400,1400,"",{aura:{race:"Nemesis",atk:300}},"Where his black banner rises, the vengeful march.");
M("e_hexblade","eryll","Hexblade Duelist Morrgan",4,"DARK","Nemesis",1700,1100,"",{onSummon:{k:"destroyST"}},"Her cursed blade cuts through every trap and ward.");
M("e_gravecaller","eryll","Gravecaller Dread Knight",5,"DARK","Nemesis",2100,1600,"",{onSummon:{k:"ssGY",race:"Nemesis",maxLv:4}},"No fallen comrade rests while a debt remains unpaid.");
M("e_varg","eryll","Crimson Executioner Varg",6,"DARK","Nemesis",2400,1900,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"His axe has one purpose: settling scores.");
M("e_malvorn","eryll","Dread Lord Malvorn, the Oathbreaker",7,"DARK","Nemesis",2600,2200,"",{onSummon:[{k:"heal",v:800},{k:"ssGY",race:"Nemesis",maxLv:4}],aura:{race:"Nemesis",atk:200}},"He broke every oath but one: vengeance.",true);
M("g_ace","eryll","Nemesis Monarch Brawnzor",8,"DARK","Nemesis",2800,2600,"",{reps:400,pierce:true},"Under the blood moon every grudge feeds his curse, and he only grows stronger.",true);
SP("e_pact","eryll","Blood-Moon Pact","Continuous","",{k:"cont",race:"Nemesis",atk:300},"Sealed in blood beneath the crimson moon.");
SP("e_armour","eryll","Cursed Nemesis Armour","Equip","",{k:"equip",v:800,race:"Nemesis"},"It grants terrible strength. It never comes off.");
SP("e_rally","eryll","Rise of the Vengeful","Normal","",{k:"revive",race:"Nemesis"},"The fallen rise, and they remember who struck them down.");
TR("e_oath","eryll","Oath of Retribution","",{k:"burnBack",v:1000,needRace:"Nemesis"},"Strike me, and the curse strikes you back.");
QP("e_fury","eryll","Nemesis Fury Surge",{k:"qBoost",v:1000,race:"Nemesis"},"Hatred, burning hotter than the blood moon.");
QP("e_grasp","eryll","Grasp of the Abyss",{k:"qDestroy",maxAtk:1700},"Shadow hands rise from the ground and drag the foe under.");
// ---------- KELVIN: Runner ----------
M("n_jogger","kelvin","Morning Jogger Pip",2,"WIND","Runner",900,700,"👟",{onDestroy:{k:"ssDeck",race:"Runner",maxLv:4}},"Passes the baton even as he falls.");
M("n_pacer","kelvin","Pace Setter Nia",3,"WIND","Runner",1300,900,"🏃‍♀️",{onSummon:{k:"ssHand",race:"Runner",maxLv:3}},"Sets the rhythm for the whole team.");
M("n_sprinter","kelvin","Flashstep Sprinter Rex",4,"LIGHT","Runner",1700,900,"🏃",{double:true},"Strikes twice before you blink.");
M("n_hurdler","kelvin","Hurdle Jumper Kai",4,"WIND","Runner",1600,1100,"🤸",{direct:true},"Leaps over every defender.");
M("n_marathon","kelvin","Iron Lung Marathoner",4,"EARTH","Runner",1600,1800,"🎽",{guard:true},"42 kilometers and still standing.");
M("n_anchor","kelvin","Relay Anchor Dash",4,"WIND","Runner",1700,1200,"🏅",{onSummon:{k:"ssGY",race:"Runner",maxLv:3}},"Takes the baton from fallen teammates.");
M("n_coach","kelvin","Track Coach Hayes",4,"EARTH","Runner",1600,1500,"🧢",{aura:{race:"Runner",atk:300}},"Stopwatch in hand, he pushes everyone further.");
M("n_steeple","kelvin","Steeplechase Charger",4,"EARTH","Runner",1900,1000,"🥇",{pierce:true},"Water jumps, barriers — nothing slows him.");
M("n_baton","kelvin","Baton Passer Mio",3,"WIND","Runner",1400,1000,"🎯",{onSummon:{k:"draw",n:1}},"A perfect hand-off every time.");
M("n_cheetah","kelvin","Cheetah Speedster Zara",5,"WIND","Runner",1900,1400,"🐆",{double:true},"Fastest legs on the track.");
M("n_ultra","kelvin","Ultra Marathon King",6,"EARTH","Runner",2400,2100,"🏔️",{guard:true,onSummon:{k:"heal",v:800}},"He has run across mountains and deserts.");
M("n_squad","kelvin","Golden Relay Squad",7,"LIGHT","Runner",2600,2200,"🎖️",{onSummon:{k:"ssGY",race:"Runner",maxLv:4},direct:true},"Four runners, one unstoppable team.",true);
M("n_ace","kelvin","Hypersonic Champion Aeros",8,"WIND","Runner",2900,2200,"⚡",{double:true,onSummon:{k:"burn",v:500}},"Kelvin's hero. He breaks the sound barrier at the finish line.",true);
SP("n_wind","kelvin","Second Wind","Normal","🌬️",{k:"boost",v:800,race:"Runner"},"Dig deep — final sprint!");
SP("n_spikes","kelvin","Carbon Racing Spikes","Equip","👟",{k:"equip",v:600,race:"Runner"});
SP("n_stretch","kelvin","Home Stretch Roar","Continuous","📢",{k:"cont",race:"Runner",atk:300});
TR("n_false","kelvin","False Start!","🚩",{k:"negate",needRace:"Runner"},"Back to the blocks!");
// ---------- BEN: Robot (combination) ----------
M("b_head","ben","Sentinel Head Unit",3,"LIGHT","Robot",1300,1200,"🤖",{onSummon:{k:"search",type:"spell"}},"Combination part 1/3. Its visor scans every intruder.");
M("b_arm","ben","Guardian Arm Unit",3,"EARTH","Robot",1500,1000,"🦾",{onSummon:{k:"ssHand",race:"Robot",maxLv:3}},"Combination part 2/3. It never lets go.");
M("b_leg","ben","Stomper Leg Unit",3,"EARTH","Robot",1200,1600,"🦿",{guard:true},"Combination part 3/3. Rooted like a fortress.");
M("b_core","ben","Docking Core Drone",2,"LIGHT","Robot",800,1000,"🛰️",{onDestroy:{k:"ssDeck",race:"Robot",maxLv:3}},"Calls a replacement part from the hangar.");
M("b_k9","ben","Patrol Bot K-9",4,"DARK","Robot",1800,1200,"🐕‍🦺",{onSummon:{k:"destroyST"}},"Sniffs out hidden traps on every patrol.");
M("b_cctv","ben","CCTV Watcher Bot",4,"LIGHT","Robot",1400,1800,"📹",{flip:{k:"destroyMon"}},"Caught on camera. Case closed.");
M("b_riot","ben","Riot Shield Bot",4,"EARTH","Robot",1300,2100,"🛡️",{guard:true},"Holds the line at every gate.");
M("b_stun","ben","Stun Baton Enforcer",4,"DARK","Robot",1800,1000,"🔦",{pierce:true},"Zzzap! Through any defense.");
M("b_siren","ben","Siren Alarm Bot",4,"LIGHT","Robot",1600,1300,"🚨",{aura:{race:"Robot",atk:300}},"WEE-OO! All units, power up!");
M("b_warden","ben","Iron Warden Commander",7,"DARK","Robot",2600,2300,"👮",{guard:true,onSummon:{k:"ssGY",race:"Robot",maxLv:3}},"Ben's chief of security. Rebuilds his squad on arrival.",true);
M("b_duo","ben","Twin-Link Patrol Mech",6,"LIGHT","Robot",2600,2200,"🤖",{guard:true,pierce:true},"Combination of Head + Arm units.",false);
M("b_titan","ben","Bentara Prime, Guardian Titan",9,"LIGHT","Robot",3500,3000,"🤖",{onSummon:{k:"destroyMon"},guard:true,pierce:true},"Head, Arms and Legs unite! The ultimate security robot.",true);
CARDS.b_duo.extra=true;CARDS.b_titan.extra=true;
SP("b_link","ben","Combination Protocol: Twin-Link","Normal","🔗",{k:"fusion",mats:["b_head","b_arm"],result:"b_duo"},"Docking sequence initiated.");
SP("b_full","ben","Full Combination: Bentara Prime!","Normal","⚙️",{k:"fusion",mats:["b_head","b_arm","b_leg"],result:"b_titan"},"Head! Arms! Legs! COMBINE!");
SP("b_bay","ben","Maintenance Bay","Normal","🔩",{k:"revive",race:"Robot"});
TR("b_lock","ben","Security Lockdown","🔒",{k:"negate",needRace:"Robot"},"All doors sealed. Attack denied.");
CHARS_EXTRA={
  weisheng:{name:"Weisheng",img:"weisheng",race:"Vehicle",color:"#ff3b55",theme:"Vehicle — supercars & street racers",home:"racetrack",
    bio:"A sharp-dressed businessman in glasses with a serious need for speed. His garage of racers, trucks and tuned supercars leaves rivals in the dust.",
    quote:"Time is money — and I never waste either.",
    lines:{start:["Let's make this quick. I have a meeting.","Engines warm. Let's race."],summon:["Start your engine.","Pull up!"],ace:["Zero to victory — Hyperion Zero, launch!","Full throttle, Nightshade!"],attack:["Floor it!","Overtake!","Nitro!"],trap:["You just hit a speed bump."],hurt:["A scratch on the paint. Unacceptable."],win:["Checkered flag. Profitable day."],lose:["Hm. I'll need to retune the engine."]}},
  keith:{name:"Keith",img:"keith",race:"Catgirl",color:"#ffb36b",theme:"Catgirl — nine lives & cute claws",home:"cat_cafe",
    bio:"A laid-back guy in sunglasses and a white singlet who runs with a crew of cute catgirls. They swarm, slip past defenses — and always come back for more.",
    quote:"Relax, bro. My kitties got this. Nya~",
    lines:{start:["Chill duel, yeah? My kitties are ready.","Nya~ let's go!"],summon:["Here, kitty kitty!","Go get 'em, girl!"],ace:["Bow down to the Empress — Nekomata!","Nyaa~! Queen Mewna, sparkle time!"],attack:["Claw attack!","Pounce, nya!"],trap:["Cats always land on their feet."],hurt:["Ouch... no worries, they've got nine lives."],win:["Too easy, bro. Nya~"],lose:["Aw man... the kitties need a nap."]}},
  eryll:{name:"Eryll",img:"eryll",race:"Nemesis",color:"#d0243c",theme:"Dark Nemesis Warriors — shadow knights, cursed armour & vengeance",home:"nemesis_coliseum",
    bio:"A towering Filipino warlord who rules the Blood-Moon Nemesis Coliseum. His shadow knights and cursed champions never forget a wound: the longer the duel goes, the stronger their vengeance burns.",
    quote:"Every blow you land, I remember. Every one, I repay.",
    ai:{aggro:true},
    personality:"Relentless avenger: rebuilds his warband from the Graveyard, grows his Vengeful Champions and Brawnzor every turn, punishes attacks with Oath of Retribution and answers threats with Grasp of the Abyss. Loud, proud and never backs down.",
    lines:{start:["The blood moon rises. Your reckoning begins!","Step into my coliseum, if you dare."],summon:["Rise, warrior of vengeance!","To my side, shadow knight!"],ace:["Bow before the blood moon: Nemesis Monarch Brawnzor!","Dread Lord Malvorn, break them as you broke your oaths!"],attack:["Feel my vengeance!","No mercy under the red moon!","Strike them down!"],trap:["You struck me. Now the curse strikes you!"],hurt:["Ha! Pain only feeds the curse!"],win:["The coliseum roars! Vengeance is mine!"],lose:["This grudge... I will remember it. Rematch!"]}},
  kelvin:{name:"Kelvin",img:"kelvin",race:"Runner",color:"#3fa9ff",theme:"Runner — sprints, relays & speed",home:"stadium",
    bio:"A focused, upbeat track athlete who never stops moving. His runners attack twice, leap over defenders and pass the baton when one falls.",
    quote:"On your marks... get set... you're already behind!",
    lines:{start:["On your marks!","Let's see who's faster!"],summon:["Take your lane!","Ready, set — go!"],ace:["Break the sound barrier — Hypersonic Champion Aeros!","Golden Relay Squad, bring it home!"],attack:["Sprint!","Double time!","Pass the baton!"],trap:["False start! Back to the line!"],hurt:["Just a cramp... I can still run!"],win:["Personal best! First place!"],lose:["Silver this time... I'll train harder."]}},
  ben:{name:"Ben",img:"ben",race:"Robot",color:"#59c26b",theme:"Robot — combine parts into giants",home:"robot_hangar",
    bio:"A calm, steadfast Malay security guard who commands a squad of robot units. Separately they guard the gate — combined, they become the giant Bentara Prime.",
    quote:"Security check. You shall not pass.",
    lines:{start:["Security check. Show me your deck.","Hangar doors open. All units ready."],summon:["Unit deployed.","On patrol."],ace:["Head, Arms, Legs — COMBINE! Bentara Prime!","Commander, take the gate!"],attack:["Intruder detected!","Engage!"],trap:["Lockdown activated."],hurt:["Armor damaged. Still on duty."],win:["Area secured. Have a safe day."],lose:["Hmph. Report to maintenance."]}}
};
for(const k in CHARS_EXTRA)CHARS[k]=CHARS_EXTRA[k];
Object.assign(ARENAS,{
  racetrack:{name:"Neon City Circuit",img:"racetrack",ambient:"headlights",tint:"rgba(80,120,255,.08)"},
  cat_cafe:{name:"Cat Café",img:"cat_cafe",ambient:"paws",tint:"rgba(255,190,140,.08)"},
  nemesis_coliseum:{name:"Blood-Moon Nemesis Coliseum",img:"nemesis_coliseum",ambient:"embers",tint:"rgba(170,20,40,.12)"},
  stadium:{name:"Athletics Stadium",img:"stadium",ambient:"floodlight",tint:"rgba(255,220,180,.05)"},
  robot_hangar:{name:"Security Robot Hangar",img:"robot_hangar",ambient:"warning",tint:"rgba(255,40,40,.05)"}
});

const HOME={you:null,kaito:"castle",ryuga:"dragon_lair",mira:"machine_world",sakura:"magician_room",toma:"forest",lily:"fairy_lake",weiyao:"idol_stage",weisheng:"racetrack",keith:"cat_cafe",eryll:"nemesis_coliseum",kelvin:"stadium",ben:"robot_hangar"};
for(const k in HOME)if(CHARS[k])CHARS[k].home=HOME[k];
// Character order is derived from the CHARS table, so new characters only need a CHARS entry, a portrait and their cards.
const CHAR_ORDER=Object.keys(CHARS);
function pickArena(pCh,eCh,choice){if(choice&&ARENAS[choice])return choice;if(choice==="random")return pick(Object.keys(ARENAS));
  return (CHARS[eCh]&&CHARS[eCh].home)||(CHARS[pCh]&&CHARS[pCh].home)||pick(Object.keys(ARENAS));}
function poolFor(ch){return Object.keys(CARDS).filter(id=>!CARDS[id].extra&&(ch==="you"||CARDS[id].ch===ch||CARDS[id].ch==="shared"));}
function signature(ch){return Object.keys(CARDS).filter(id=>CARDS[id].ch===ch&&!CARDS[id].extra);}
function defaultDeck(ch){const d={};
  if(ch==="you"){Object.assign(d,{k_lion:2,k_lancer:1,r_wyvern:2,r_thunder:1,m_welder:2,m_tank:1,s_weaver:2,s_witch:1,t_boar:2,t_fox:1,l_rainbow:1,l_star:1,k_recruit:1,
    k_captain:1,t_tiger:1,w_rising:1,r_ace:1,x_seal:1,x_oracle:1,x_blade:1,x_gust:1,x_revive:1,x_flash:1,x_veil:1,x_thorn:1,x_mend:1});delete d.l_star;return d;}
  const sig=signature(ch);let n=0;
  for(const id of sig){const c=CARDS[id];let k;
    if(c.type==="monster")k=c.level<=4?2:1;else k=1;
    if(c.type==="monster"&&c.level<=2)k=1;
    if(c.kind==="Quick-Play")k=2;
    d[id]=k;n+=k;}
  for(const id of ["x_seal","x_oracle","x_revive","x_thorn","x_gust","x_meteor","x_veil","x_blade"]){if(n>=30)break;d[id]=1;n++;}
  return d;}
/* ================= NEW 5 DUELISTS: Sabrina, Christopher, Lemon, Si Xing, Clement =================
   Merge: concatenate AFTER b_data.js (needs M/SP/TR/CARDS/CHARS/ARENAS/CHAR_ORDER) and BEFORE g_v3.js.
   All names are original. No emoji on cards (art field is "" — v3 uses art/<id>.webp).
   Quick-Play spells: type "spell", kind "Quick-Play", subtype "quickplay" (same shape as the v4 QP() helper). */
(function(){
const QP5=(id,ch,name,fx,flavor)=>{CARDS[id]={id,ch,name,type:"spell",kind:"Quick-Play",subtype:"quickplay",art:"",fx,flavor:flavor||""};};
// ---------- SABRINA: Chibi ----------
M("sb_bun","sabrina","Pocket Bunny Puff",2,"LIGHT","Chibi",700,700,"",{onDestroy:{k:"ssDeck",race:"Chibi",maxLv:4}},"Squeak! ...and here come her friends.");
M("sb_teddy","sabrina","Button-Eye Teddy Momo",3,"EARTH","Chibi",1100,1300,"",{onSummon:{k:"ssHand",race:"Chibi",maxLv:3}},"Every hug brings another plushie to the party.");
M("sb_ninja","sabrina","Pocket Ninja Kuno",3,"WIND","Chibi",1200,800,"",{direct:true},"Smaller than your shoelace. Faster than your eyes.");
M("sb_knight","sabrina","Tiny Tin Knight Pip",4,"EARTH","Chibi",1600,1400,"",{guard:true},"His armor is a teapot. It is very sturdy.");
M("sb_witch","sabrina","Mini Broom Witch Lulu",4,"DARK","Chibi",1600,1100,"",{onSummon:{k:"destroyST"}},"One sweep of her tiny broom and the traps are gone.");
M("sb_dino","sabrina","Rawrsaurus Plushie",4,"FIRE","Chibi",1700,1000,"",{pierce:true},"Rawr! (It means 'I love you' in dinosaur.)");
M("sb_star","sabrina","Twinkle Mascot Popo",4,"LIGHT","Chibi",1400,1300,"",{aura:{race:"Chibi",atk:300}},"When Popo waves, every chibi gets a sugar rush.");
M("sb_robo","sabrina","Wind-Up Robo Tiko",4,"EARTH","Chibi",1000,2000,"",{flip:{k:"draw",n:1}},"Turn the key and see what it finds.");
M("sb_princess","sabrina","Chibi Princess Ribbonette",5,"LIGHT","Chibi",2100,1600,"",{onSummon:{k:"ssGY",race:"Chibi",maxLv:4}},"No toy gets left in the toy box.");
M("sb_dragon","sabrina","Gumdrop Baby Dragon",6,"FIRE","Chibi",2400,1900,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"Its sneeze is mostly sprinkles. Mostly.");
M("sb_queen","sabrina","Sugar Castle Queen Pipirin",7,"LIGHT","Chibi",2600,2200,"",{onSummon:[{k:"heal",v:800},{k:"ssHand",race:"Chibi",maxLv:4}],guard:true},"Ruler of Toy Town. Bedtime is whenever she says.",true);
M("sb_ace","sabrina","Mofumofu, Giant Plushie Guardian",8,"LIGHT","Chibi",2900,2600,"",{onSummon:{k:"ssGY",race:"Chibi",maxLv:4},aura:{race:"Chibi",atk:300}},"Sabrina's biggest, softest, strongest friend.",true);
SP("sb_party","sabrina","Chibi Tea Party","Continuous","",{k:"cont",race:"Chibi",atk:300},"Tiny cups, tiny cakes, enormous power.");
SP("sb_toybox","sabrina","Overflowing Toy Box","Normal","",{k:"revive",race:"Chibi"},"Look who popped back out!");
TR("sb_hug","sabrina","Big Squishy Hug","",{k:"negate",needRace:"Chibi"},"Too cute to fight. The attack melts away.");
QP5("sb_candy","sabrina","Candy Rush",{k:"qBoost",v:800,race:"Chibi"},"One lollipop and she is unstoppable.");
QP5("sb_popup","sabrina","Pop-Up Surprise",{k:"qBounce"},"Boing! Back to the toy shelf you go.");
// ---------- CHRISTOPHER: Sua Bro ----------
M("cb_kid","christopher","Kampung Kid Ah Boy",2,"EARTH","Sua Bro",800,600,"",{onDestroy:{k:"ssDeck",race:"Sua Bro",maxLv:4}},"Kena whack already? Call my kor kor!");
M("cb_kopi","christopher","Kopi-O Kaki Ah Kow",3,"LIGHT","Sua Bro",1100,1200,"",{onSummon:{k:"ssHand",race:"Sua Bro",maxLv:3}},"Eh bro, come lah, sit down. Kopi on me.");
M("cb_slipper","christopher","Slipper Slinger Ah Seng",3,"EARTH","Sua Bro",1200,900,"",{direct:true},"His flying slipper has never once missed.");
M("cb_moto","christopher","Kapchai Rider Ah Beng",4,"WIND","Sua Bro",1700,1000,"",{pierce:true},"No helmet visor, only full-power wind in the face.");
M("cb_uncle","christopher","Singlet Uncle Ah Huat",4,"EARTH","Sua Bro",1600,1400,"",{aura:{race:"Sua Bro",atk:300}},"Everybody listen to uncle. Uncle got experience.");
M("cb_durian","christopher","Durian Farmer Bro",4,"EARTH","Sua Bro",1200,1900,"",{guard:true},"Thorny outside, soft inside. Just like the fruit.");
M("cb_karaoke","christopher","Off-Key Karaoke Bro",4,"FIRE","Sua Bro",1600,1200,"",{onSummon:{k:"burn",v:500}},"His high note does real damage.");
M("cb_fisher","christopher","Longkang Fishing Bro",4,"WATER","Sua Bro",1500,1100,"",{onSummon:{k:"draw",n:1}},"Caught nothing. Found a card. Still a win.");
M("cb_lorry","christopher","Lorry Kaki Big Bro Jo",5,"EARTH","Sua Bro",2200,1500,"",{onSummon:{k:"ssGY",race:"Sua Bro",maxLv:4}},"Got space at the back. Everybody hop on!");
M("cb_headman","christopher","Village Headman Uncle Lim",6,"EARTH","Sua Bro",2400,2100,"",{guard:true,onSummon:{k:"heal",v:800}},"He has settled every kampung quarrel since 1985.");
M("cb_five","christopher","Kopitiam Brotherhood Five",7,"EARTH","Sua Bro",2600,2200,"",{onSummon:{k:"ssGY",race:"Sua Bro",maxLv:4},guard:true},"Same table, same order, every night. Mess with one, you mess with all.",true);
M("cb_ace","christopher","Abang Besar, Kampung Legend",8,"FIRE","Sua Bro",2900,2500,"",{onSummon:{k:"destroyMon"},aura:{race:"Sua Bro",atk:200}},"The big brother of the whole kampung. Slippers on, heart of gold.",true);
SP("cb_corner","christopher","Kopitiam Corner Table","Continuous","",{k:"cont",race:"Sua Bro",atk:300},"Reserved. For the bros. Forever.");
SP("cb_dabao","christopher","Da Bao for the Bros","Normal","",{k:"revive",race:"Sua Bro"},"Takeaway, extra rice, and one more bro.");
TR("cb_bojio","christopher","Bo Jio!","",{k:"burnBack",v:1000,needRace:"Sua Bro"},"You never invite us?! Now you pay.");
QP5("cb_slipperthrow","christopher","Flying Slipper!",{k:"qDestroy",maxAtk:1800},"Whoosh. Thwack. Problem solved.");
QP5("cb_extragao","christopher","Extra Gao Kopi",{k:"qDraw",n:1,heal:500},"Thick, sweet, and strong enough to wake the dead.");
// ---------- LEMON: Office ----------
M("lm_intern","lemon","Unpaid Intern Tim",2,"LIGHT","Office",600,800,"",{onDestroy:{k:"ssDeck",race:"Office",maxLv:4}},"Don't worry, there's always another intern.");
M("lm_zombie","lemon","Triple-Shot Coffee Zombie",3,"DARK","Office",1100,1000,"",{onSummon:{k:"draw",n:1}},"Brains? No. Caffeine.");
M("lm_printer","lemon","Jammed Printer Gremlin",3,"DARK","Office",1000,1600,"",{flip:{k:"destroyMon"}},"PC LOAD LETTER? It has no idea what that means either.");
M("lm_monday","lemon","Monday Dread Phantom",4,"DARK","Office",1600,1000,"",{direct:true},"You can't block Monday. It always finds you.");
M("lm_overtime","lemon","Overtime Night-Shift Ghoul",4,"DARK","Office",1700,1100,"",{pierce:true},"It clocked out in 2019. It is still here.");
M("lm_pivot","lemon","Pivot Table Sorceress",4,"LIGHT","Office",1500,1300,"",{onSummon:{k:"destroyST"}},"She deletes your macros with one formula.");
M("lm_hr","lemon","HR Smile Enforcer",4,"LIGHT","Office",1400,1800,"",{guard:true},"Per my last email, you cannot defeat me.");
M("lm_meeting","lemon","Endless Meeting Moderator",4,"EARTH","Office",1500,1300,"",{aura:{race:"Office",atk:300}},"Let's circle back and take this offline. Forever.");
M("lm_deadline","lemon","Deadline Demon",5,"FIRE","Office",2200,1400,"",{onSummon:{k:"burn",v:600}},"Due yesterday. No extensions.");
M("lm_burnout","lemon","Burnout Inferno Clerk",6,"FIRE","Office",2400,1900,"",{onDestroy:{k:"burn",v:800}},"When she finally snaps, everyone gets singed.");
M("lm_boss","lemon","Director Grimsby, Boss from Hell",7,"DARK","Office",2700,2100,"",{onSummon:{k:"destroyMon",maxAtk:2000},guard:true},"He never takes the blame. He hands it out.",true);
M("lm_ace","lemon","Two-Weeks'-Notice Freedom Phoenix",8,"FIRE","Office",2900,2400,"",{onSummon:{k:"destroyAllST"},pierce:true},"Out of the ashes of a resignation letter, she finally flies free.",true);
SP("lm_teambuild","lemon","Mandatory Team-Building","Continuous","",{k:"cont",race:"Office",atk:300},"Fun is compulsory. Attendance is tracked.");
SP("lm_replyall","lemon","Reply-All Rant","Normal","",{k:"raceBurn",race:"Office",v:500},"Sent to the whole company. No regrets.");
TR("lm_ooo","lemon","Out-of-Office Autoreply","",{k:"negate",needRace:"Office"},"I am currently away and will not be taking that hit.");
QP5("lm_espresso","lemon","Emergency Espresso",{k:"qBoost",v:1000,race:"Office"},"Three shots. No milk. Go.");
QP5("lm_conflict","lemon","Calendar Conflict",{k:"qBounce"},"Sorry, you've been double-booked. Please reschedule.");
// ---------- SI XING: Gesture (sign language) ----------
M("sx_wave","sixing","Wave-Hello Wisp",2,"WIND","Gesture",600,800,"",{onDestroy:{k:"ssDeck",race:"Gesture",maxLv:4}},"A little wave, and a friend waves back.");
M("sx_thumb","sixing","Thumbs-Up Sprite",3,"LIGHT","Gesture",1200,1000,"",{onSummon:{k:"ssHand",race:"Gesture",maxLv:3}},"Good job! Bring a friend!");
M("sx_hush","sixing","Hush-Finger Ninja",3,"DARK","Gesture",1300,900,"",{direct:true},"Shh. You never heard it coming.");
M("sx_palm","sixing","Open-Palm Guardian",4,"EARTH","Gesture",1300,2000,"",{guard:true},"One raised palm. The whole army stops.");
M("sx_point","sixing","Pointing-Finger Archer",4,"WIND","Gesture",1700,1200,"",{onSummon:{k:"destroyST"}},"She points out your trap. Then it's gone.");
M("sx_fist","sixing","Fist-Bump Brawler",4,"FIRE","Gesture",1900,900,"",{},"Respect first. Then the punch.");
M("sx_heart","sixing","Heart-Hands Healer",4,"LIGHT","Gesture",1500,1400,"",{onSummon:{k:"heal",v:800}},"Two hands, one heart, and every wound closes.");
M("sx_ok","sixing","OK-Sign Sage",4,"LIGHT","Gesture",1400,1300,"",{aura:{race:"Gesture",atk:300}},"Everything is OK. Everyone is stronger.");
M("sx_applause","sixing","Silent Applause Spirit",5,"LIGHT","Gesture",2100,1600,"",{onSummon:{k:"ssGY",race:"Gesture",maxLv:4}},"Raised, waving hands: the loudest applause there is.");
M("sx_peace","sixing","Peace-Sign Twin Dancers",6,"WIND","Gesture",2200,1900,"",{double:true},"Two fingers up, two strikes in.");
M("sx_maestro","sixing","Maestro of a Thousand Signs",7,"LIGHT","Gesture",2600,2200,"",{onSummon:{k:"draw",n:1},guard:true},"Every gesture is a word. Every word is a spell.",true);
M("sx_ace","sixing","Thousand-Palm Silent Colossus",8,"LIGHT","Gesture",3000,2600,"",{onSummon:{k:"destroyMon"},aura:{race:"Gesture",atk:200}},"It never speaks. It doesn't need to.",true);
SP("sx_circle","sixing","Signing Circle","Continuous","",{k:"cont",race:"Gesture",atk:300},"Everyone in the circle understands each other perfectly.");
SP("sx_fingerspell","sixing","Fingerspell Summons","Normal","",{k:"search",race:"Gesture"},"Spell out a name, and they answer.");
TR("sx_stop","sixing","Palm of Stop","",{k:"shrink",v:1000,needRace:"Gesture"},"Hold it right there.");
QP5("sx_mur","sixing","Emphatic MUR!!",{k:"qNegate"},"He said MUR. He meant it.");
QP5("sx_highfive","sixing","Silent High-Five",{k:"qBoost",v:800,race:"Gesture"},"Up top. No words needed.");
// ---------- CLEMENT: Otaku mix (Mecha / Magician Girl / Dragoon) ----------
M("cl_bit","clement","Bit Funnel Drone",2,"LIGHT","Mecha",700,700,"",{onDestroy:{k:"ssDeck",race:"Mecha",maxLv:4}},"Wing-mounted remote drone. When one falls, another launches.");
M("cl_kestrel","clement","Prototype Frame Kestrel",4,"WIND","Mecha",1600,1200,"",{pierce:true},"Test pilot's notes: it goes straight through.");
M("cl_rifle","clement","Beam Rifle Trooper Frame",4,"LIGHT","Mecha",1500,1300,"",{onSummon:{k:"burn",v:500}},"Opening shot from max range.");
M("cl_shield","clement","Hobby-Kit Shield Frame",4,"EARTH","Mecha",1200,2000,"",{guard:true},"Snap-fit armor. Surprisingly unbreakable.");
M("cl_pipilu","clement","Apprentice Sorceress Pipilu",3,"LIGHT","Spellcaster",1100,1200,"",{onSummon:{k:"search",type:"spell"}},"She keeps her spellbook in a cute bunny backpack.");
M("cl_ririka","clement","Starwand Magician Girl Ririka",4,"LIGHT","Spellcaster",1600,1100,"",{onSummon:{k:"destroyST"}},"Star wand, pure heart, and a dream of riding dragons.");
M("cl_steed","clement","Azure Drake Steed",4,"WIND","Dragon",1600,1100,"",{direct:true},"A loyal sky-drake waiting for its destined rider.");
M("cl_drake","clement","Crimson Scale Drake",4,"FIRE","Dragon",1800,900,"",{},"Raw dragon power, no frills.");
M("cl_celesta","clement","Magical Mentor Celesta",5,"LIGHT","Spellcaster",2100,1600,"",{onSummon:{k:"ssGY",race:"Spellcaster",maxLv:4}},"She never lets an apprentice give up.");
M("cl_valdris","clement","Silverwing Wyvern Valdris",6,"WIND","Dragon",2400,2000,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"The silver dragon of the convention-hall legends.");
M("cl_aurora","clement","Aurora Wing Ascendant Frame",7,"LIGHT","Mecha",2600,2100,"",{double:true,onSummon:{k:"burn",v:500}},"A destiny-class battle frame with wings of pure light. Clement's grail.",true);
M("cl_dragoon","clement","Starlance Dragoon Ririka",8,"WIND","Dragon",2700,2300,"",{onSummon:{k:"destroyMon"},pierce:true},"Magician girl and dragon become one: the Starlance Dragoon.",true);
CARDS.cl_dragoon.extra=true;
SP("cl_union","clement","Dragoon Union Rite","Normal","",{k:"fusion",mats:["cl_ririka","cl_steed"],result:"cl_dragoon"},"Rider and dragon, one heart, one lance.");
SP("cl_soullink","clement","Dragoon Soul Link","Normal","",{k:"fusion",mats:["cl_pipilu","cl_drake"],result:"cl_dragoon"},"Even an apprentice can borrow a dragon's soul.");
TR("cl_beamshield","clement","Beam Shield Deploy","",{k:"shrink",v:1000,needRace:"Mecha"},"Particle shield up. Damage reduced.");
QP5("cl_overdrive","clement","Overdrive Burst",{k:"qBoost",v:1000},"Limiter released! Ten seconds of pure power.");
QP5("cl_teleport","clement","Magical Teleport Circle",{k:"qBounce"},"A sparkle, a pop, and the enemy is somewhere else.");

/* ---------- characters ---------- */
const NEW5={
  sabrina:{name:"Sabrina",img:"sabrina",race:"Chibi Doki Doki",color:"#ff9ed8",theme:"Chibi Doki Doki — tiny toys & big hearts",home:"toy_town",
    bio:"A cheerful Malay girl in a pastel hijab who collects chibi plushies. Her tiny toy army swarms the field, calls friends out of the toy box and hugs every attack away.",
    quote:"They're small, but they never give up!",
    personality:"Swarm and support: floods the board with small Chibi monsters, revives them, and protects them with hugs. Plays kindly but never lets a friend stay in the Graveyard.",
    lines:{start:["Hi hi! Let's have a fun duel!","My little friends are ready!"],summon:["Come out and play!","Ta-da! So cute!","Your turn, little one!"],ace:["Mofumofu! Big hug time!","Queen Pipirin, open the castle gates!"],attack:["Boop!","Go go, tiny team!","Cuteness attack!"],trap:["Big squishy hug! No hitting!"],hurt:["Ouch... but we're still smiling!"],win:["Yay! Everybody gets a sticker!"],lose:["Aww... the toys need a nap. Rematch?"]}},
  christopher:{name:"Christopher",img:"christopher",race:"Sua Bro",color:"#ff9a3c",theme:"Sua Bro — kampung boys, uncles & kopi",home:"kopitiam",
    bio:"A laid-back guy with a near-shaved buzz cut, low glasses and a rumpled button-up who never left his kampung crew behind. His Sua Bros are rough around the edges and a bit blur, but loyal to the last slipper.",
    quote:"Bro, relax lah. My kakis got your back.",
    personality:"Loyal brawler: keeps bringing bros back from the Graveyard, stacks numbers on the board and punishes anyone who forgets to invite him (Bo Jio!).",
    lines:{start:["Eh bro, ready or not?","Kopi already order. Can start."],summon:["Come lah, bro!","Oi, your turn!","Wah, see who's here!"],ace:["Abang Besar! Show them kampung power!","Brotherhood Five, same table, same fight!"],attack:["Steady lah!","Go, bro, go!","Whack him!"],trap:["Bo jio ah? Now you know."],hurt:["Aiyoh... pain sia."],win:["Steady bom pi pi! Kopi on me!"],lose:["Alamak... next round, confirm I win."]}},
  lemon:{name:"Lemon",img:"lemon",race:"Office",color:"#7fe0c4",theme:"Hate My Job — overtime, bosses & burnout",home:"cubicle_hell",
    bio:"A sharp office worker with long black hair, glasses and a permanent coffee. She turned every Monday, deadline and boss from hell into a monster, and she's ready to make you feel it.",
    quote:"I've survived worse than you. I've survived quarter-end.",
    personality:"Burn and grind: chips away with Deadline and Reply-All damage, removes threats with the Boss from Hell, and stalls with Out-of-Office. Dry, sarcastic, exhausted, unbreakable.",
    lines:{start:["Let's make this quick. I have a 9 a.m.","Per my last email: you lose."],summon:["Clocking in.","Another one for the team.","You're on shift."],ace:["Director Grimsby. Your next victim is over there.","I quit! Rise, Freedom Phoenix!"],attack:["Deadline's now.","This could have been an email.","Overtime attack!"],trap:["I'm out of office. Try again never."],hurt:["Ugh. Need. More. Coffee."],win:["Finally. Logging off."],lose:["...Fine. I'll take it offline."]}},
  sixing:{name:"Si Xing",img:"sixing",race:"Gesture",color:"#4fd1c5",theme:"Sign Language — hands that speak",home:"silent_theatre",
    bio:"A calm young man with short hair and glasses who only ever says \"mur\". He doesn't need more: his deck of sign and gesture spirits says everything for him, loud and clear.",
    quote:"Mur. (Let's duel.)",
    personality:"Quiet tactician: builds a steady board with OK-Sign and Signing Circle, counters attacks with Emphatic MUR!! and Palm of Stop, then finishes with the Thousand-Palm Colossus.",
    lines:{start:["Mur. (Let's duel.)","Mur! (Good luck.)"],summon:["Mur. (Go.)","Mur! (Your move, friend.)","Mur~ (Come out.)"],ace:["MUR!! (Rise, Thousand-Palm Colossus!)","Mur... MUR!! (Maestro, speak for me!)"],attack:["Mur! (Attack!)","MUR!! (There!)","Mur. (Thumbs down.)"],trap:["MUR!! (Stop right there.)"],hurt:["Mur...? (That hurt...?)"],win:["Mur! (Thank you for the duel.)","Mur~ (Thumbs up.)"],lose:["Mur... (Well played.)"]}},
  clement:{name:"Clement",img:"clement",race:"Otaku Mix",color:"#5aa8ff",theme:"Otaku — mecha, magician girls & dragoons",home:"hobby_con",
    bio:"A big-hearted, confident otaku in his favourite anime tee. He knows every episode by heart, and his deck brings his three loves together: a winged battle frame, an apprentice magician girl and the dragon she was born to ride.",
    quote:"Every great finale needs a combination scene. Watch this!",
    personality:"Combo showman: digs for the Dragoon Union spells with Pipilu, combines Ririka and her drake into the Starlance Dragoon, and backs it with the Aurora Wing frame. Plays with hype and respect.",
    lines:{start:["Episode one: you versus me. Let's go!","I've been waiting all season for this duel!"],summon:["Launch!","Transform!","Sortie!"],ace:["Rider and dragon, become one! Starlance Dragoon!","Spread your wings of light, Aurora Wing!"],attack:["Full burst!","Star lance strike!","Beam, fire!"],trap:["Beam shield, deploy!"],hurt:["That's just the mid-season twist!"],win:["Best. Finale. Ever!"],lose:["Plot armor failed me... Rematch next season!"]}}
};
for(const k in NEW5)CHARS[k]=NEW5[k];
if(typeof CHAR_ORDER!=="undefined")for(const k in NEW5)if(!CHAR_ORDER.includes(k))CHAR_ORDER.push(k);
if(typeof HOME!=="undefined")for(const k in NEW5)HOME[k]=NEW5[k].home;
Object.assign(ARENAS,{
  toy_town:{name:"Chibi Toy Town",img:"toy_town",ambient:"sparkles",tint:"rgba(255,180,230,.08)"},
  kopitiam:{name:"Kampung Kopitiam at Dusk",img:"kopitiam",ambient:"fireflies",tint:"rgba(255,150,70,.08)"},
  cubicle_hell:{name:"Cubicle Hell",img:"cubicle_hell",ambient:"circuit",tint:"rgba(60,220,190,.06)"},
  silent_theatre:{name:"The Silent Theatre",img:"silent_theatre",ambient:"spotlight",tint:"rgba(80,210,200,.06)"},
  hobby_con:{name:"Otaku Hobby Con Hall",img:"hobby_con",ambient:"spotlight",tint:"rgba(90,160,255,.07)"}
});
})();

/* v6b rule: "when destroyed" Special Summon effects can never summon a card with the same name as the destroyed card */
for(const id in CARDS){const c=CARDS[id];if(c.type!=="monster"||!c.fx||!c.fx.onDestroy)continue;[].concat(c.fx.onDestroy).forEach(f=>{if(/^ss/.test(f.k))f.notSelf=c.name;});}
/* ================= NEW 5 (batch b): Dark Kelvin, Jason, Shaim, Hisyam, Wei Yao - The 2nd Coming =================
   Concatenate AFTER data_new5.js (needs M/SP/TR/QP/CARDS/CHARS/ARENAS/CHAR_ORDER/HOME) and BEFORE assets_emb.js/g_v3.js.
   All names are original. No emoji on cards (art "" -> art/<id>.webp). New effect kinds (payLP, payDraw, coin, weakenAll, drain)
   are implemented in c_engine.js resolveFx / activateSpell, described in b_data.js fxPhrase and scored in d_ai.js. */
(function(){
const Q=(id,ch,name,fx,flavor)=>{CARDS[id]={id,ch,name,type:"spell",kind:"Quick-Play",subtype:"quickplay",art:"",fx,flavor:flavor||""};};
// ---------- DARK KELVIN: Gloomheart (melancholy gothic girls, rain, wilted roses) ----------
const GH="Gloomheart";
M("dk_drizzle","darkkelvin","Gloomheart Drizzle Girl Pipa",2,"WATER",GH,700,600,"",{onDestroy:{k:"ssDeck",race:GH,maxLv:4}},"When she fades into the rain, another grey cloud rolls in.");
M("dk_eyeliner","darkkelvin","Gloomheart Eyeliner Witch Vesper",3,"DARK",GH,1200,1100,"",{onSummon:{k:"ssHand",race:GH,maxLv:3}},"One perfect wing of eyeliner, one perfect hex.");
M("dk_umbrella","darkkelvin","Gloomheart Black-Umbrella Wanderer",3,"DARK",GH,1300,900,"",{direct:true},"She walks through every wall of rain, untouched.");
M("dk_rose","darkkelvin","Gloomheart Wilted Rose Maiden",4,"DARK",GH,1600,1200,"",{onSummon:{k:"weakenAll",v:400}},"Her petals fall, and every heart nearby grows heavy.");
M("dk_violin","darkkelvin","Gloomheart Minor-Key Violinist",4,"WATER",GH,1500,1300,"",{aura:{race:GH,atk:300}},"She only plays in minor keys. It makes everyone stronger.");
M("dk_raven","darkkelvin","Gloomheart Raven-Lace Duelist",4,"DARK",GH,1900,1000,"",{pierce:true},"Black lace, black feathers, a blade that cuts through any guard.");
M("dk_diary","darkkelvin","Gloomheart Diary-Keeper Lenore",4,"DARK",GH,1500,1500,"",{onSummon:{k:"draw",n:1}},"Every page is a sad poem. Every poem is a secret plan.");
M("dk_shatter","darkkelvin","Gloomheart Shattered-Heart Knight",4,"DARK",GH,1800,1100,"",{onDestroy:{k:"burn",v:500}},"Break her heart and the shards fly back at you.");
M("dk_veil","darkkelvin","Gloomheart Mourning-Veil Sentinel",4,"EARTH",GH,1400,1900,"",{guard:true},"Behind the black veil, she never flinches.");
M("dk_choir","darkkelvin","Gloomheart Moonless Choir Girl",5,"DARK",GH,2200,1600,"",{onSummon:{k:"ssGY",race:GH,maxLv:4}},"Her lullaby calls her sisters back from the grey.");
M("dk_storm","darkkelvin","Gloomheart Thunderstorm Sorrow Nyx",6,"WATER",GH,2400,1800,"",{onSummon:{k:"destroyMon",maxAtk:2000}},"When she finally cries, the whole sky cries with her.");
M("dk_countess","darkkelvin","Gloomheart Weeping-Rain Countess Morwyn",7,"WATER",GH,2700,2200,"",{onSummon:[{k:"weakenAll",v:500},{k:"drain",v:500}],guard:true},"Her castle has not seen the sun in a hundred years.",true);
M("dk_ace","darkkelvin","Gloomheart Requiem Diva Noctelle",8,"DARK",GH,2900,2400,"",{onSummon:{k:"destroyWeakAll",maxAtk:1500},aura:{race:GH,atk:200}},"The voice of every rainy night. Kelvin's sorrow given wings.",true);
SP("dk_rain","darkkelvin","Endless Midnight Rain","Continuous","",{k:"cont",race:GH,atk:300},"It never stops. They never want it to.");
SP("dk_letter","darkkelvin","Unsent Love Letter","Normal","",{k:"revive",race:GH},"Some feelings refuse to stay buried.");
TR("dk_tears","darkkelvin","Tears in the Rain","",{k:"shrink",v:1500,needRace:GH},"Nobody can tell she is crying. The attack loses its will.");
Q("dk_sigh","darkkelvin","Heavy Sigh",{k:"qShrink",v:1000},"A sigh so deep the enemy forgets why it was fighting.");
Q("dk_playlist","darkkelvin","Sad Song on Repeat",{k:"qDraw",n:1,heal:500},"Track 7 again. It helps, somehow.");
// ---------- JASON: Hustler ("I Need Money") ----------
const HU="Hustler";
M("js_penny","jason","Lucky Penny Sprite",2,"LIGHT",HU,700,600,"",{onDestroy:{k:"ssDeck",race:HU,maxLv:4}},"Find a penny, pick it up, and another hustler shows up.");
M("js_piggy","jason","Cracked Piggy Bank Oinkers",3,"EARTH",HU,1100,1200,"",{onSummon:{k:"ssHand",race:HU,maxLv:3}},"Shake it and a friend falls out. Never any money, though.");
M("js_flyer","jason","Side-Hustle Flyer Kid",3,"WIND",HU,1200,900,"",{direct:true},"He slips a flyer under every door, and every guard.");
M("js_scratch","jason","Scratch-Card Gambler Lou",4,"LIGHT",HU,1700,1100,"",{onSummon:{k:"coin",h:{k:"draw",n:2},t:{k:"payLP",v:500}}},"This one's the winner. Definitely. Probably.");
M("js_collector","jason","Debt Collector Big Bruno",4,"DARK",HU,1900,1000,"",{pierce:true},"Knock knock. You know why I'm here.");
M("js_loan","jason","Payday Loan Shark Finny",4,"WATER",HU,1600,1000,"",{onSummon:{k:"payDraw",lp:500,n:2}},"Easy money now, sharp teeth later.");
M("js_vending","jason","Coin-Op Vending Golem",4,"EARTH",HU,1300,1900,"",{guard:true},"Insert coin to continue. It keeps every coin.");
M("js_grind","jason","Grindset Motivator Chad",4,"FIRE",HU,1500,1300,"",{aura:{race:HU,atk:300}},"Rise and grind! Sleep is for people with savings!");
M("js_busker","jason","Tip-Jar Busker Bucky",4,"LIGHT",HU,1500,1300,"",{onSummon:{k:"heal",v:600}},"Three chords, one hat, and a surprisingly full tip jar.");
M("js_atm","jason","Overdrawn ATM Mimic",5,"DARK",HU,2200,1500,"",{onSummon:{k:"ssGY",race:HU,maxLv:4}},"Insufficient funds. Sufficient teeth.");
M("js_slot","jason","Jackpot Slot Machine Titan",6,"LIGHT",HU,2500,1800,"",{onSummon:{k:"coin",h:{k:"destroyMon"},t:{k:"destroyMon",maxAtk:1500}}},"Pull the lever. Something is getting wrecked either way.");
M("js_baron","jason","Golden Piggy Baron Oinksworth",7,"LIGHT",HU,2600,2100,"",{onSummon:{k:"payDraw",lp:500,n:2},guard:true},"Old money, gold snout, and a vault nobody has ever opened.",true);
M("js_ace","jason","Million-Coin Jackpot Dragon",8,"LIGHT",HU,2900,2400,"",{onSummon:{k:"coin",h:{k:"destroyMon"},t:{k:"destroyMon",maxAtk:2000}},pierce:true},"A dragon made of every coin Jason ever lost. Payday has finally come.",true);
SP("js_advance","jason","Emergency Payday Advance","Normal","",{k:"payDraw",lp:500,n:2},"Rent is due tomorrow. Future Jason can deal with it.");
SP("js_lottery","jason","Weekly Lottery Draw","Normal","",{k:"coin",h:{k:"draw",n:3},t:{k:"payLP",v:300}},"This week. This is the week. He can feel it.");
TR("js_norefund","jason","No Refunds!","",{k:"burnBack",v:1000,needRace:HU},"All sales are final. Especially that attack.");
Q("js_double","jason","Double or Nothing",{k:"qBoost",v:800,race:HU},"All in! ...on credit.");
Q("js_dash","jason","Dine and Dash",{k:"qBounce"},"Put it on my tab! (There is no tab.)");
// ---------- SHAIM: Ki Fighter ("Limitbreaker" martial arts super-fighters) ----------
const KF="Ki Fighter";
M("sh_pupil","shaim","Limitbreaker Dojo Pupil",2,"EARTH",KF,700,600,"",{onDestroy:{k:"ssDeck",race:KF,maxLv:4}},"He falls, and an even louder student rushes in.");
M("sh_cloud","shaim","Drifting Puffcloud Mount",3,"WIND",KF,1000,1300,"",{onSummon:{k:"ssHand",race:KF,maxLv:3}},"A fluffy golden cloud that only carries the pure of heart. And snacks.");
M("sh_monk","shaim","Limitbreaker Afterimage Monk",3,"WIND",KF,1300,900,"",{direct:true},"You hit him? No. You hit where he was a second ago.");
M("sh_raiko","shaim","Limitbreaker Raiko",4,"EARTH",KF,1900,1000,"",{},"A spiky-haired fighter with an empty stomach and a full heart.");
M("sh_blaster","shaim","Limitbreaker Ki Blaster Rhea",4,"LIGHT",KF,1600,1200,"",{onSummon:{k:"burn",v:500}},"Cupped hands, a deep breath, and a beam that lights up the valley.");
M("sh_weights","shaim","Limitbreaker Iron-Weights Trainee",4,"EARTH",KF,1300,1900,"",{guard:true},"Wears a hundred kilos of training gear. To breakfast.");
M("sh_sage","shaim","Limitbreaker Hermit Sage Oyan",4,"WIND",KF,1500,1300,"",{aura:{race:KF,atk:300}},"Lazy old master, perfect teacher. Everyone fights harder near him.");
M("sh_rival","shaim","Limitbreaker Rival Prince Vorak",4,"DARK",KF,1700,1000,"",{pierce:true},"Proud, rude and always one training arc behind. He hates that.");
M("sh_dancer","shaim","Limitbreaker Wind-Step Dancer",4,"WIND",KF,1700,1100,"",{onSummon:{k:"destroyST"}},"One spinning kick and your traps are scattered across the sky.");
M("sh_spirit","shaim","Limitbreaker Spirit-Sphere Gatherer",5,"LIGHT",KF,2100,1600,"",{onSummon:{k:"ssGY",race:KF,maxLv:4}},"Raise your hands, friends. Lend me your energy!");
M("sh_crimson","shaim","Limitbreaker Raiko, Crimson Surge",6,"FIRE",KF,2400,1800,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"First stage: red aura, burning muscles, no holding back.");
M("sh_golden","shaim","Limitbreaker Raiko, Golden Ascendant",7,"LIGHT",KF,2700,2200,"",{onSummon:{k:"destroyMon"},double:true},"Second stage: hair blazing gold, eyes like lightning. The legend wakes.",true);
CARDS.sh_golden.extra=true;
M("sh_ace","shaim","Limitbreaker Raiko, Apex Beyond Limits",8,"LIGHT",KF,3000,2400,"",{onSummon:{k:"destroyMon"},pierce:true},"Final stage: a white-gold storm of ki that splits the clouds. Shaim's lost legend returns.",true);
SP("sh_awaken","shaim","Golden Aura Awakening","Normal","",{k:"fusion",mats:["sh_raiko","sh_cloud"],result:"sh_golden"},"He rides the cloud into the sky... and comes down golden.");
SP("sh_gravity","shaim","Gravity Chamber Training","Continuous","",{k:"cont",race:KF,atk:300},"Ten times the gravity. Ten times the gains.");
TR("sh_dodge","shaim","Afterimage Dodge","",{k:"negate",needRace:KF},"Too slow. That was an afterimage.");
Q("sh_wave","shaim","Spirit Wave Cannon",{k:"qDestroy",maxAtk:1800},"Gather... focus... RELEASE!");
Q("sh_shout","shaim","Limit Release Shout",{k:"qBoost",v:1000,race:KF},"A scream that shakes the mountains. Power level: rising.");
// ---------- HISYAM: Fried Chicken ----------
const FC="Fried Chicken";
M("hf_nugget","hisyam","Crispy Nugget Chick",2,"FIRE",FC,700,600,"",{onDestroy:{k:"ssDeck",race:FC,maxLv:4}},"Small, golden, and there's always another one in the basket.");
M("hf_drum","hisyam","Drumstick Squire Ayam",3,"EARTH",FC,1100,1200,"",{onSummon:{k:"ssHand",race:FC,maxLv:3}},"Raises his drumstick shield and calls the next order.");
M("hf_wing","hisyam","Spicy Wing Ninja",3,"WIND",FC,1200,900,"",{direct:true},"So spicy, so fast, he is gone before you taste him.");
M("hf_sambal","hisyam","Sambal Flame Rooster",4,"FIRE",FC,1600,1100,"",{onSummon:{k:"burn",v:500}},"One crow, one blast of chilli fire.");
M("hf_batter","hisyam","Golden Batter Knight",4,"EARTH",FC,1300,1900,"",{guard:true},"Triple-coated armour. Crunchy outside, unbreakable inside.");
M("hf_wok","hisyam","Hot-Oil Wok Warrior",4,"FIRE",FC,1800,1000,"",{pierce:true},"Her wok is a shield, a weapon and a frying pan.");
M("hf_hen","hisyam","Kampung Hen Matriarch",4,"EARTH",FC,1500,1300,"",{aura:{race:FC,atk:300}},"Mama hen of the stall. Everyone stands taller when she clucks.");
M("hf_lemongrass","hisyam","Lemongrass Marinade Mystic",4,"WATER",FC,1600,1300,"",{onSummon:{k:"heal",v:600}},"Her secret marinade soothes every hungry soul.");
M("hf_tongs","hisyam","Fry-Tongs Duelist",4,"WIND",FC,1600,1100,"",{onSummon:{k:"destroyST"}},"Snap snap! She flips your traps right out of the oil.");
M("hf_bucket","hisyam","Family Bucket Brigade",5,"FIRE",FC,2100,1600,"",{onSummon:{k:"ssGY",race:FC,maxLv:4}},"Always room for one more piece in the family bucket.");
M("hf_chief","hisyam","Thunder-Crunch Rooster Chief",6,"FIRE",FC,2400,1800,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"When he bites, the whole night market hears the crunch.");
M("hf_king","hisyam","Pasar Malam Crispy King",7,"FIRE",FC,2600,2200,"",{onSummon:[{k:"heal",v:800},{k:"ssHand",race:FC,maxLv:4}],guard:true},"Crowned in golden batter, king of every night market.",true);
M("hf_ace","hisyam","Golden Crispy Phoenix Ayam Emas",8,"FIRE",FC,2900,2400,"",{onSummon:{k:"drain",v:800},aura:{race:FC,atk:200}},"Reborn from the hottest wok in town. Hisyam Fried Chicken's legend.",true);
SP("hf_spice","hisyam","Hisyam's Secret Spice Blend","Continuous","",{k:"cont",race:FC,atk:300},"Nobody knows the recipe. Not even Hisyam's wife.");
SP("hf_refry","hisyam","Double-Fried Comeback","Normal","",{k:"revive",race:FC},"Back into the oil, and out comes something even crispier.");
TR("hf_oil","hisyam","Hot Oil Splash!","",{k:"burnBack",v:1000,needRace:FC},"Careful, boss! Very hot!");
Q("hf_sambalx","hisyam","Extra Sambal, Boss!",{k:"qBoost",v:800,race:FC},"Extra pedas. Extra power.");
Q("hf_tapau","hisyam","Tapau to Go",{k:"qBounce"},"Packed up and sent home. Thank you, come again!");
// ---------- WEI YAO - THE 2ND COMING: Gallop Idol (horse-eared racing idol girls) ----------
const GI="Gallop Idol";
M("wz_foal","weiyao2","Gallop Idol Trainee Foalie",2,"EARTH",GI,700,600,"",{onDestroy:{k:"ssDeck",race:GI,maxLv:4}},"She trips at the gate, and her senpai takes the lane.");
M("wz_pace","weiyao2","Gallop Idol Pacemaker Mitsuki",3,"WIND",GI,1100,1200,"",{onSummon:{k:"ssHand",race:GI,maxLv:3}},"She sets the pace, then waves her teammate through.");
M("wz_sprint","weiyao2","Gallop Idol Sprinter Kirara",3,"WIND",GI,1200,900,"",{direct:true},"Out of the gate like a shooting star, straight past the defence.");
M("wz_stayer","weiyao2","Gallop Idol Stayer Rindou",4,"EARTH",GI,1300,1900,"",{guard:true},"Three thousand metres and she still has breath to sing.");
M("wz_closer","weiyao2","Gallop Idol Last-Spurt Kohaku",4,"FIRE",GI,1800,1000,"",{pierce:true},"Dead last at the final turn. First at the line.");
M("wz_step","weiyao2","Gallop Idol Double-Step Nanami",4,"WIND",GI,1500,1000,"",{double:true},"Two strides for every one of yours.");
M("wz_cheer","weiyao2","Gallop Idol Paddock Cheerleader Mone",4,"LIGHT",GI,1400,1300,"",{aura:{race:GI,atk:300}},"Her paddock cheer gets every runner's ears up.");
M("wz_singer","weiyao2","Gallop Idol Winning-Live Singer Aoi",4,"LIGHT",GI,1500,1300,"",{onSummon:{k:"heal",v:600}},"Win the race, then sing for the crowd. That's the rule.");
M("wz_gate","weiyao2","Gallop Idol Gate-Breaker Hinata",4,"FIRE",GI,1600,1100,"",{onSummon:{k:"destroyST"}},"The starting gate opens. So does your back row.");
M("wz_rival","weiyao2","Gallop Idol Rival Ace Sorane",5,"WATER",GI,2100,1600,"",{onSummon:{k:"ssGY",race:GI,maxLv:4}},"Rivals on the track, best friends at the encore.");
M("wz_crown","weiyao2","Gallop Idol Crown Hopeful Reika",6,"LIGHT",GI,2400,1900,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"Three great races, three crowns. She wants them all.");
M("wz_unit","weiyao2","Gallop Idol Grand Prix Unit Aurelia",7,"LIGHT",GI,2600,2100,"",{onSummon:{k:"ssGY",race:GI,maxLv:4},guard:true},"The gold-silk unit that headlines every Grand Prix concert.",true);
M("wz_ace","weiyao2","Hoshina, Prism Derby Champion",8,"LIGHT",GI,2900,2400,"",{onSummon:{k:"destroyMon"},auraPer:{race:GI,atk:200}},"After every loss, she kept running. Now Wei Yao's centre idol races in prism silks.",true);
SP("wz_live","weiyao2","Winning Live Concert","Continuous","",{k:"cont",race:GI,atk:300},"The race is over. The real show begins.");
SP("wz_comeback","weiyao2","Second-Coming Comeback","Normal","",{k:"revive",race:GI},"Everyone counted them out. That was the mistake.");
TR("wz_photo","weiyao2","Photo Finish!","",{k:"negate",needRace:GI},"Hold on, hold on... the judges need to see the replay.");
Q("wz_spurt","weiyao2","Final Furlong Spurt",{k:"qBoost",v:1000,race:GI},"Ears back, eyes forward, everything left in the tank.");
Q("wz_restart","weiyao2","Gate Restart",{k:"qBounce"},"False start! Everyone back to the gate.");

/* ---------- characters ---------- */
const NEW5B={
  darkkelvin:{name:"Dark Kelvin",img:"darkkelvin",race:GH,color:"#9b6bff",theme:"Gloomheart: rain, wilted roses & broken hearts",home:"gloom_cathedral",
    bio:"Kelvin, after one loss too many. The runner stopped racing toward the light and let the rain catch up with him. Now a shadowy aura follows him, and his Gloomheart girls turn sorrow into power: they weaken every foe, drain their strength and never stay gone for long.",
    quote:"Run if you want. The rain is faster.",
    personality:"Gloom control: weakens the whole enemy field with Wilted Rose and Countess Morwyn, drains LP, wipes weak monsters with the Requiem Diva and keeps calling his sisters back from the Graveyard. Quiet, brooding and still a competitor at heart.",
    lines:{start:["...Let's get this over with.","It's raining again. Fitting."],summon:["Come out of the rain.","Don't cry. Fight.","Another lonely heart."],ace:["Sing for the grey sky, Requiem Diva Noctelle!","Countess Morwyn, let it pour."],attack:["Fall.","Feel this.","Drown in it."],trap:["Tears in the rain. You won't even see them."],hurt:["...It doesn't hurt anymore."],win:["Even in the rain, I still crossed the line first."],lose:["...Maybe the sun comes out tomorrow."]}},
  jason:{name:"Jason",img:"jason",race:HU,color:"#ffd23f",theme:"I Need Money: hustles, coin flips & payday",home:"pawn_alley",
    bio:"A big, cheerful guy who tapes his trading cards to his whole body so he never loses them (and so he can sell them faster). Always broke, always hustling: his deck gambles on coin flips, pays LP for cards and bets everything on the Million-Coin Jackpot Dragon.",
    quote:"Bro, lend me 50. No, wait, I'll win it from you.",
    personality:"High-risk hustler: pays Life Points to draw extra cards, flips coins for big swings and punishes attackers with No Refunds!. Loud, lovable and one lucky toss away from glory.",
    lines:{start:["Okay okay, winner takes everything, right?","I really, really need this win."],summon:["Come on, payday!","Side hustle, activate!","This one's worth money, trust me!"],ace:["JACKPOT! Million-Coin Jackpot Dragon!","Baron Oinksworth, open the vault!"],attack:["Pay up!","Cash grab!","Collect!"],trap:["No refunds, no returns!"],hurt:["Aiyo, my wallet...!"],win:["PAYDAY! Dinner's on me! ...Can you spot me?"],lose:["Double or nothing? Please?"]}},
  shaim:{name:"Shaim",img:"shaim",race:KF,color:"#46c8ff",theme:"Limitbreaker: ki blasts, training & golden transformations",home:"rift_peaks",
    bio:"A young Malay wanderer who vanished one night and was gone for years. He came back from the unknown in a torn gi and travelling cloak, calmer, stronger and carrying a deck of Limitbreaker fighters who train, power up and transform stage after stage.",
    quote:"Where I've been doesn't matter. What I learned there does.",
    personality:"Power-up brawler: builds a strong board, fires Spirit Wave Cannons, then transforms Limitbreaker Raiko into the Golden Ascendant (Raiko + Puffcloud) and finally the Apex Beyond Limits. Calm, polite and always looking for a stronger opponent.",
    lines:{start:["I'm back. Let's see how strong you've become.","Show me your full power."],summon:["Let's train!","Step up!","Feel that energy?"],ace:["Beyond every limit: Raiko, Apex Beyond Limits!","Golden Ascendant, wake up!"],attack:["Haaaa!","Spirit wave!","Take this!"],trap:["Too slow. That was an afterimage."],hurt:["Heh. That actually hurt."],win:["Good fight. Let's spar again sometime."],lose:["I need more training... see you on the other side."]}},
  hisyam:{name:"Hisyam",img:"hisyam",race:FC,color:"#ff7a2f",theme:"Fried Chicken: crispy warriors, sambal & night-market spice",home:"hisyam_stall",
    bio:"The friendly, round-bellied boss of Hisyam Fried Chicken, the busiest stall at the pasar malam. Between orders he duels with a deck of crispy chicken warriors who heal, burn with sambal and keep coming back for a double fry.",
    quote:"Fresh from the wok! You want spicy or extra spicy?",
    personality:"Hearty midrange: keeps his LP high with marinades and the Crispy King, burns with Sambal Rooster and Hot Oil Splash, swarms with Bucket Brigade and finishes with the Golden Crispy Phoenix. Generous, loud and always smiling.",
    lines:{start:["Welcome, welcome! Table for one duel?","Oil's hot. Let's go!"],summon:["One crispy order coming up!","Fresh from the wok!","Extra crunchy!"],ace:["Rise from the wok, Golden Crispy Phoenix Ayam Emas!","Make way for the Pasar Malam Crispy King!"],attack:["Pedas!","Crunch time!","Hot oil, coming through!"],trap:["Careful, boss! Hot oil!"],hurt:["Aduh! Burnt my fingers!"],win:["Sedap! Free drumstick for you, good game!"],lose:["Aiyo... tomorrow I fry harder."]}},
  weiyao2:{name:"Wei Yao - The 2nd Coming",img:"weiyao2",race:GI,color:"#e9b949",theme:"Gallop Idol: horse idol racers, turf & winning-live concerts",home:"derby_dome",
    bio:"Wei Yao lost one time too many. Instead of quitting, he forged a suit of golden plate armour and took his idols to the racetrack. His centre idol Hoshina evolved into a horse-eared racing idol, and now his Gallop Idols win the race first and sing the encore after.",
    quote:"I lost a hundred times. This is the 2nd coming. Start the race!",
    personality:"Speed and showmanship: Gallop Idols attack twice, pierce and sprint past defenders, revive each other with Rival Ace Sorane and Grand Prix Unit Aurelia, and grow stronger together under Hoshina, Prism Derby Champion. Proud, theatrical, and much harder to beat than before.",
    lines:{start:["The gates are open. It's the 2nd coming!","Front row seats again. This time I win."],summon:["Into the starting gate!","Ears up, run your best!","Next runner, take the turf!"],ace:["Prism silks, golden track: Hoshina, Prism Derby Champion!","Grand Prix Unit Aurelia, take the stage!"],attack:["Final spurt!","Down the stretch!","Gallop!"],trap:["Photo finish! Check the replay!"],hurt:["This armour has taken worse!"],win:["First place AND the encore! Thank you, everyone!"],lose:["Not again... no. There will be a 3rd coming."]}}
};
for(const k in NEW5B)CHARS[k]=NEW5B[k];
if(typeof CHAR_ORDER!=="undefined"){for(const k in NEW5B)if(!CHAR_ORDER.includes(k))CHAR_ORDER.push(k);
  /* show the alternate forms right after the originals */
  const mv=(k,after)=>{const i=CHAR_ORDER.indexOf(k),j=CHAR_ORDER.indexOf(after);if(i<0||j<0)return;CHAR_ORDER.splice(i,1);CHAR_ORDER.splice(CHAR_ORDER.indexOf(after)+1,0,k);};
  mv("darkkelvin","kelvin");mv("weiyao2","weiyao");}
if(typeof HOME!=="undefined")for(const k in NEW5B)HOME[k]=NEW5B[k].home;
Object.assign(ARENAS,{
  gloom_cathedral:{name:"Rain-Soaked Gloom Cathedral",img:"gloom_cathedral",ambient:"rain",tint:"rgba(90,50,160,.12)"},
  pawn_alley:{name:"Payday Pawnshop Alley",img:"pawn_alley",ambient:"headlights",tint:"rgba(255,80,200,.06)"},
  rift_peaks:{name:"Lost Realm Rift Peaks",img:"rift_peaks",ambient:"pulse",tint:"rgba(80,180,255,.06)"},
  hisyam_stall:{name:"Hisyam Fried Chicken Night Market",img:"hisyam_stall",ambient:"torch",tint:"rgba(255,150,60,.07)"},
  derby_dome:{name:"Golden Derby Dome",img:"derby_dome",ambient:"spotlight",tint:"rgba(255,210,90,.07)"}
});
/* "when destroyed" Special Summons never summon a copy of the destroyed card (same rule as data_new5.js) */
for(const id in CARDS){const c=CARDS[id];if(c.ch&&NEW5B[c.ch]&&c.type==="monster"&&c.fx&&c.fx.onDestroy)[].concat(c.fx.onDestroy).forEach(f=>{if(/^ss/.test(f.k))f.notSelf=c.name;});}
})();
/* ================= NEW 3c: Eunice, Kimberly, Aoi Yuki =================
   Concatenate AFTER data_new5b.js (needs M/SP/TR/CARDS/CHARS/ARENAS/CHAR_ORDER/HOME) and BEFORE assets_emb.js/g_v3.js.
   All names are original. No emoji on cards (art "" -> art/<id>.webp). New effect kinds (onGain, lpAtk, cakeBurn, costume
   equips with setRace/grant/onEquip, equipPer, contEquip, searchEquip, battleBurn, endBurn) live in new3c_engine.js. */
(function(){
const Q=(id,ch,name,fx,flavor)=>{CARDS[id]={id,ch,name,type:"spell",kind:"Quick-Play",subtype:"quickplay",art:"",fx,flavor:flavor||""};};
// ---------- EUNICE: Hearthbake (bakery, LP recovery, payoffs for gaining LP) ----------
const BK="Bakery";
M("eu_crumb","eunice","Hearthbake Crumb Sprite",2,"EARTH",BK,1000,700,"",{onDestroy:[{k:"heal",v:500},{k:"ssDeck",race:BK,maxLv:4}]},"Brush it off the counter and two more crumbs appear.");
M("eu_dough","eunice","Hearthbake Dough Golem Kneady",3,"EARTH",BK,1500,1400,"",{onSummon:{k:"ssHand",race:BK,maxLv:3}},"Knead it, fold it, and it pulls a friend out of the bowl.");
M("eu_bun","eunice","Hearthbake Cinnamon Swirl Sprite",3,"WIND",BK,1500,900,"",{direct:true},"It drifts past every guard on a ribbon of cinnamon steam.");
M("eu_baker","eunice","Hearthbake Apprentice Baker Lumi",4,"LIGHT",BK,1800,1300,"",{onSummon:{k:"heal",v:800}},"Up at four every morning, and still smiling at the first customer.");
M("eu_croissant","eunice","Hearthbake Croissant Knight",4,"FIRE",BK,1900,1100,"",{pierce:true},"Three hundred buttery layers, and every one of them is armour.");
M("eu_oven","eunice","Hearthbake Brick Oven Guardian",4,"FIRE",BK,1600,2000,"",{guard:true},"It has been warm for a hundred years. It will not crack today.");
M("eu_sourdough","eunice","Hearthbake Sourdough Spirit",4,"LIGHT",BK,1800,1200,"",{onGain:{k:"burn",v:400}},"Feed it, and it rises. Feed it more, and it bites.");
M("eu_pastry","eunice","Hearthbake Pastry Golem",4,"EARTH",BK,1800,1500,"",{onGain:{k:"grow",v:300}},"Every sweet thing you eat makes it a little bit bigger.");
M("eu_cake","eunice","Hearthbake Shortcake Fairy",4,"LIGHT",BK,1700,1200,"",{aura:{race:BK,atk:300}},"A strawberry on top, and everyone in the kitchen stands a little taller.");
M("eu_rolling","eunice","Hearthbake Rolling-Pin Matron",5,"EARTH",BK,2300,1600,"",{onSummon:{k:"ssGY",race:BK,maxLv:4}},"No apprentice stays down for long when she starts rolling.");
M("eu_wedding","eunice","Hearthbake Wedding Cake Sentinel",6,"LIGHT",BK,2500,2000,"",{onSummon:[{k:"heal",v:500},{k:"destroyMon",maxAtk:2400}]},"Seven tiers tall, and it guards the celebration with its life.");
M("eu_patissiere","eunice","Hearthbake Grand Patissiere Celestine",7,"LIGHT",BK,2600,2200,"",{onSummon:{k:"heal",v:1200},guard:true},"Her sugar work is so fine it catches starlight.",true);
M("eu_ace","eunice","Golden Hearth Colossus Levain",8,"FIRE",BK,2700,2500,"",{lpAtk:{per:500,v:200,max:1600},onGain:{k:"burn",v:400}},"Eunice's hundred-year sourdough starter, risen into a giant of golden crust.",true);
SP("eu_warm","eunice","Always-Warm Oven","Continuous","",{k:"cont",race:BK,atk:300},"The oven never goes cold, and neither does the team.");
SP("eu_rise","eunice","Second Rise","Normal","",{k:"revive",race:BK},"Punch it down, let it rest, and it rises again.");
SP("eu_cannon","eunice","Celebration Cake Cannon","Normal","",{k:"cakeBurn",v:600,hi:1600,need:9000},"Happy birthday! Please stand back from the frosting.");
TR("eu_flour","eunice","Flour Cloud Ambush","",{k:"negate",needRace:BK},"One sneeze and the whole battlefield turns white.");
Q("eu_tea","eunice","Afternoon Tea Break",{k:"qDraw",n:1,heal:800},"Put the kettle on. The duel can wait five minutes.");
Q("eu_jam","eunice","Warm Jam Glaze",{k:"qHeal",v:1000},"Sweet, sticky, and surprisingly good for the soul.");
// ---------- KIMBERLY: Cosplayer (normal monsters + costume Equip Spells that change Type and effects) ----------
const CP="Cosplayer";
M("km_mascot","kimberly","Convention Mascot Fluffo",2,"EARTH",CP,1000,800,"",{onDestroy:{k:"ssDeck",race:CP,maxLv:4}},"Nobody knows who is inside. Nobody wants to know.");
M("km_rookie","kimberly","Rookie Cosplayer Pip",3,"LIGHT",CP,1500,1000,"",{},"First convention, first costume, first time feeling this brave.");
M("km_shy","kimberly","Shy Cosplayer Momo",3,"WIND",CP,1600,1300,"",{},"She hides behind her sketchbook until someone asks for a photo.");
M("km_seamstress","kimberly","Cosplayer Seamstress Hana",4,"LIGHT",CP,1650,1400,"",{},"She can sew a cape in an hour. A whole army in a weekend.");
M("km_propsmith","kimberly","Cosplayer Prop-Maker Dex",4,"FIRE",CP,1700,1200,"",{},"Foam, paint, glue gun and pure determination.");
M("km_runway","kimberly","Cosplayer Runway Star Gia",4,"WIND",CP,1700,1000,"",{},"Every hall becomes a catwalk the moment she walks in.");
M("km_armor","kimberly","Cosplayer Foam-Armor Smith Brick",4,"EARTH",CP,1700,1600,"",{},"His armour weighs nothing and looks like it weighs a ton.");
M("km_judge","kimberly","Cosplay Contest Judge Ophelia",4,"LIGHT",CP,1600,1200,"",{onSummon:{k:"searchEquip"}},"Ten points for craftsmanship. She always knows what you need next.");
M("km_leader","kimberly","Cosplayer Group Leader Rhea",5,"LIGHT",CP,2200,1500,"",{onSummon:{k:"ssGY",race:CP,maxLv:4}},"Group photo! Everyone back in position!");
M("km_vera","kimberly","Cosplay Grand Champion Vera",7,"LIGHT",CP,2500,2000,"",{equipPer:400,guard:true},"Three-time champion. Every costume she wears becomes legendary.",true);
M("km_ace","kimberly","Starseam Paladin Astra",8,"LIGHT",CP,2700,2300,"",{onSummon:{k:"searchEquip"},equipPer:300,pierce:true},"Kimberly's masterpiece: four hundred hours of stitching, brought to life.",true);
SP("km_c_dragon","kimberly","Crimson Dragon Knight Costume","Equip","",{k:"equip",v:700,setRace:"Dragon",setAttr:"FIRE",grant:{pierce:true}},"Wings of red satin, horns of foam, and a roar that is entirely real.");
SP("km_c_ninja","kimberly","Midnight Ninja Costume","Equip","",{k:"equip",v:600,setRace:"Warrior",setAttr:"DARK",grant:{direct:true}},"Black cloth, soft boots, and suddenly no one can see you.");
SP("km_c_mecha","kimberly","Super Robot Armor Costume","Equip","",{k:"equip",v:800,setRace:"Machine",setAttr:"EARTH",grant:{guard:true}},"Cardboard, craft foam and LEDs. Somehow it stops real swords.");
SP("km_c_idol","kimberly","Starlight Idol Costume","Equip","",{k:"equip",v:600,setRace:"Fairy",setAttr:"LIGHT",grant:{double:true}},"Frills, sparkles, and the energy for a double encore.");
SP("km_c_witch","kimberly","Moonlit Witch Costume","Equip","",{k:"equip",v:600,setRace:"Spellcaster",setAttr:"DARK",onEquip:{k:"draw",n:1}},"The pointed hat is the most important part. Obviously.");
SP("km_c_pirate","kimberly","Storm Pirate Captain Costume","Equip","",{k:"equip",v:600,setRace:"Warrior",setAttr:"WATER",grant:{battleBurn:400}},"A tricorn hat, a plastic cutlass, and a real taste for plunder.");
SP("km_spot","kimberly","Cosplay Contest Spotlight","Continuous","",{k:"cont",race:"Costumed",atk:400,contEquip:true},"When the spotlight finds a costume, the costume comes alive.");
SP("km_closet","kimberly","Costume Closet Raid","Normal","",{k:"searchEquip"},"Somewhere in this pile is exactly the outfit you need.");
TR("km_pose","kimberly","Photo Op Freeze!","",{k:"negate"},"Everybody hold still! Smile! Say cheese!");
Q("km_quick","kimberly","Quick-Change Booth",{k:"qBoost",v:900},"Ninety seconds behind the curtain and a whole new hero steps out.");
// ---------- AOI YUKI: Aria Armor (singing magical girls in mechanical armour, medium ATK + burn) ----------
const SG="Songstress";
M("ay_chorus","aoiyuki","Aria Armor Chorus Cadet",2,"LIGHT",SG,700,600,"",{onDestroy:{k:"ssDeck",race:SG,maxLv:4}},"Her first solo is a battle cry, and the whole choir answers.");
M("ay_dancer","aoiyuki","Aria Armor Backup Dancer Nonoka",3,"WIND",SG,1300,900,"",{onSummon:{k:"ssHand",race:SG,maxLv:3}},"She never takes the centre, but she never dances alone.");
M("ay_echo","aoiyuki","Aria Armor Echo Shadow Suzu",3,"DARK",SG,1400,800,"",{direct:true},"You hear her song a moment after she has already passed you.");
M("ay_gunner","aoiyuki","Aria Armor Twin-Gun Diva Kotone",4,"FIRE",SG,1800,1100,"",{onSummon:{k:"burn",v:500}},"Two pistols, one rhythm. Every shot lands on the beat.");
M("ay_katana","aoiyuki","Aria Armor Katana Diva Ayame",4,"WIND",SG,1900,1000,"",{battleBurn:400},"Her blade sings the high note. Her enemies hear the echo.");
M("ay_scythe","aoiyuki","Aria Armor Scythe Diva Yomi",4,"DARK",SG,1900,1200,"",{pierce:true},"A reaper's scythe in mechanical armour, singing a lullaby.");
M("ay_blades","aoiyuki","Aria Armor Blade-Dancer Mai",4,"WIND",SG,1600,1000,"",{double:true},"Six floating blades, two verses, no mercy.");
M("ay_saw","aoiyuki","Aria Armor Twin-Saw Diva Kururu",4,"EARTH",SG,1700,1200,"",{onSummon:{k:"destroyST"}},"Her twin-tails spin into saws. Do not ask how.");
M("ay_encore","aoiyuki","Aria Armor Encore Idol Shiori",4,"LIGHT",SG,1700,1300,"",{endBurn:300},"The show ends when she says it ends. Encore!");
M("ay_bass","aoiyuki","Aria Armor Bass Cannon Diva Tamaki",5,"EARTH",SG,2200,1500,"",{onSummon:{k:"ssGY",race:SG,maxLv:4}},"The low note shakes the stage, and her fallen sisters stand back up.");
M("ay_conductor","aoiyuki","Aria Armor Conductor Diva Mitsuki",6,"LIGHT",SG,2400,1800,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"One sweep of her baton and the orchestra fires.");
M("ay_reaper","aoiyuki","Aria Armor Requiem Reaper Shizuku",7,"DARK",SG,2600,2000,"",{endBurn:500,guard:true},"She sings the last song of the night, and nobody leaves early.",true);
M("ay_ace","aoiyuki","Aria Armor Fortissimo Diva Hibana",8,"FIRE",SG,2800,2200,"",{onSummon:{k:"burn",v:600},battleBurn:600,pierce:true,aura:{race:SG,atk:200}},"Armoured fists, a voice like thunder. Aoi's song given form.",true);
SP("ay_lights","aoiyuki","Live Concert Stage Lights","Continuous","",{k:"cont",race:SG,atk:300},"The lights come up and every voice gets stronger.");
SP("ay_call","aoiyuki","Encore Call","Normal","",{k:"revive",race:SG},"The crowd will not stop chanting her name.");
SP("ay_climax","aoiyuki","Climax Song Burst","Normal","",{k:"raceBurn",v:400,race:SG},"The final chorus. Everyone sings, everyone burns.");
TR("ay_howl","aoiyuki","Feedback Howl","",{k:"burnBack",v:800,needRace:SG},"Too close to the speakers. That is going to sting.");
Q("ay_unison","aoiyuki","Unison Harmony",{k:"qBoost",v:700,race:SG},"Two voices in perfect harmony hit twice as hard.");
Q("ay_note","aoiyuki","Sudden High Note",{k:"qBurn",v:800},"A note so high it cracks the air.");

const NEW3C={
  eunice:{name:"Eunice",img:"eunice",race:BK,color:"#e8a25a",theme:"Hearthbake: cosy bakery, LP recovery that turns into damage",home:"cosy_bakery",
    bio:"Eunice runs a tiny corner bakery that smells of butter and cinnamon from four in the morning. Her deck is a warm kitchen full of dough golems, croissant knights and sourdough spirits: she keeps her Life Points rising, and every bite of LP she gains turns into damage.",
    quote:"Fresh out of the oven! Careful, it's still hot.",
    personality:"Patient LP-gain control: heals with Apprentice Baker Lumi, Tea Breaks and the Grand Patissiere, punishes every heal with Sourdough Spirit and the Pastry Golem, and finishes with the Golden Hearth Colossus Levain, which grows stronger the higher her LP climbs. Gentle, cheerful and quietly unstoppable.",
    lines:{start:["Welcome in! Today's special is a duel.","Apron on, oven warm. Let's begin!"],summon:["Fresh from the oven!","One more tray, coming up!","Still warm, still rising!"],ace:["Rise, rise, rise! Golden Hearth Colossus Levain!","A hundred years of starter, all for this: Levain!","Grand Patissiere Celestine, please take the counter!"],attack:["Hot from the oven!","Butter and steel!","Taste this!"],trap:["Oops, flour everywhere!"],hurt:["Ouch! I burned my hand on that one.","That's going to need a plaster."],win:["Thank you for coming! Take a croissant for the road.","Perfectly baked. Good game!"],lose:["Ah, I let it over-proof... I'll bake a better batch next time."]}},
  kimberly:{name:"Kimberly",img:"kimberly",race:CP,color:"#26b3a8",theme:"Cosplayer: costume Equip Spells change Type and effects",home:"cosplay_stage",
    bio:"Kimberly has sewn costumes for every convention in town and won more contests than she can count. Her deck is a crew of ordinary cosplayers with no effects at all, until she dresses them up: a dragon knight costume makes them pierce, a ninja outfit lets them strike directly, robot armour makes them stalwart.",
    quote:"Hold still. This costume is going to change everything.",
    personality:"Toolbox midrange: plays plain 1300-1700 ATK cosplayers, then equips costumes that turn them into Dragons, Machines, Warriors, Fairies or Spellcasters with brand new effects. Contest Judge Ophelia and the Closet Raid fetch costumes, the Spotlight powers up every costumed monster, and Starseam Paladin Astra grows with each outfit. Precise, enthusiastic and a little bit bossy about details.",
    lines:{start:["Costume check! Okay, we're ready.","Lanyard on, glue gun charged. Let's duel!"],summon:["Next cosplayer, you're up!","Strike a pose!","Looking great, go go go!"],ace:["Four hundred hours of stitching: Starseam Paladin Astra!","Make way for the Grand Champion, Vera!"],attack:["Prop sword, real damage!","Costume power!","Photo finish!"],trap:["Hold that pose! Freeze!"],hurt:["My seams! You ripped my seams!","That's coming out of the repair budget."],win:["Best in show! Want a photo together?","Craftsmanship wins every time."],lose:["Wardrobe malfunction... I'm redoing this whole build."]}},
  aoiyuki:{name:"Aoi Yuki",img:"aoiyuki",race:SG,color:"#3f7cff",theme:"Aria Armor: singing magical-girl warriors in mechanical armour, burn",home:"concert_stage",
    bio:"Aoi Yuki is a singer who only speaks Japanese, even mid-duel. Petite but very much a grown woman with decades of stage experience, she leads the Aria Armor: magical-girl warriors in mechanical armour who fight with fists, katanas, pistols, reaper scythes and spinning saws, and burn their opponents with every song.",
    quote:"歌は、私の武器です。\n[Song is my weapon.]",
    personality:"Aggressive burn: medium-ATK Aria Armor divas attack twice, pierce and burn on summon, after battle and at the end of every turn, the Climax Song Burst cashes in a full stage, and the Fortissimo Diva Hibana punches through everything. Calm and polite off stage, fierce once the music starts.",
    lines:{start:["さあ、ライブの始まりです！\n[Now, let the live show begin!]","最後まで聴いてくださいね。\n[Please listen until the very end.]"],summon:["次の曲、いきます！\n[Next song, here we go!]","歌って、戦って！\n[Sing and fight!]","ステージへ！\n[To the stage!]"],ace:["響け、私の歌！アリアアーマー・フォルティッシモ・ディーヴァ、ヒバナ！\n[Resound, my song! Aria Armor Fortissimo Diva Hibana!]","レクイエムを、あなたに。\n[A requiem, for you.]"],attack:["届け！\n[Reach them!]","フォルティッシモ！\n[Fortissimo!]","はあっ！\n[Haah!]"],trap:["ハウリング注意ですよ。\n[Watch out for the feedback.]"],hurt:["くっ…まだ歌えます！\n[Ugh... I can still sing!]","痛っ…！\n[Ow...!]"],win:["ありがとうございました！アンコールはまた今度。\n[Thank you very much! The encore will be next time.]"],lose:["今日の歌は…届きませんでした。\n[My song didn't reach you today...]"]}}
};
for(const k in NEW3C)CHARS[k]=NEW3C[k];
if(typeof CHAR_ORDER!=="undefined"){for(const k in NEW3C)if(!CHAR_ORDER.includes(k))CHAR_ORDER.push(k);}
if(typeof HOME!=="undefined")for(const k in NEW3C)HOME[k]=NEW3C[k].home;
Object.assign(ARENAS,{
  cosy_bakery:{name:"Cosy Corner Bakery",img:"cosy_bakery",ambient:"flour",tint:"rgba(255,190,120,.07)"},
  cosplay_stage:{name:"Convention Hall Cosplay Stage",img:"cosplay_stage",ambient:"spotlight",tint:"rgba(80,220,210,.05)"},
  concert_stage:{name:"Aria Live Concert Stage",img:"concert_stage",ambient:"concert",tint:"rgba(70,110,255,.07)"}
});
/* "when destroyed" Special Summons never summon a copy of the destroyed card */
for(const id in CARDS){const c=CARDS[id];if(c.ch&&NEW3C[c.ch]&&c.type==="monster"&&c.fx&&c.fx.onDestroy)[].concat(c.fx.onDestroy).forEach(f=>{if(/^ss/.test(f.k))f.notSelf=c.name;});}
})();
/* ================= v10: Sliver, Eryll - Dragon Deez Nutz, Huiping, Jocelyn, Mr Kenneth =================
   Concatenate AFTER data_new3c.js and BEFORE k_links_data.js (k_links_data freezes defaultDeck into DECK_V8).
   All names are original. No emoji on cards (art "" -> art/<id>.webp). Only existing effect kinds are used.
   Eryll - Dragon Deez Nutz (eryll2) is an alternate mode of Eryll (k_ui9.js MODES), hidden from the ring like Dark Kelvin. */
(function(){
const Q=(id,ch,name,fx,flavor)=>{CARDS[id]={id,ch,name,type:"spell",kind:"Quick-Play",subtype:"quickplay",art:"",fx,flavor:flavor||""};};
// ---------- SLIVER: All Man Deck ("Mister" Leading Men) ----------
const LM="Leading Man";
M("sv_rio","sliver","Mister Backup Dancer Rio",3,"LIGHT",LM,1200,1000,"",{onSummon:{k:"ssHand",race:LM,maxLv:4}},"Five, six, seven, eight! He never misses a cue.");
M("sv_dex","sliver","Mister B-Boy Windmill Dex",4,"WIND",LM,1800,1000,"",{pierce:true},"One windmill, two windmills, straight through your guard.");
M("sv_alonzo","sliver","Mister Ballroom Gentleman Alonzo",4,"LIGHT",LM,1500,1300,"",{aura:{race:LM,atk:300}},"He bows, he twirls, and the whole troupe stands taller.");
M("sv_brick","sliver","Mister Bodyguard Brick",4,"EARTH",LM,1400,1900,"",{guard:true},"Nobody gets backstage. Nobody.");
M("sv_valentin","sliver","Mister Ballroom Baron Valentin",7,"DARK",LM,2700,2200,"",{onSummon:{k:"weakenAll",v:500}},"One slow tango and every rival on the floor loses their footing.");
M("sv_ace","sliver","Mister Mainstage, Grand Danseur Maximo",8,"LIGHT",LM,2900,2400,"",{onSummon:{k:"destroyMon"},aura:{race:LM,atk:200}},"The star of Sliver's troupe. She still can't stand him.",true);
SP("sv_rehearsal","sliver","Boys' Rehearsal Night","Continuous","",{k:"cont",race:LM,atk:300},"Again! From the top! ...Ugh, men.");
TR("sv_nottype","sliver","Not My Type!","",{k:"shrink",v:1500},"Rejected. The attack walks away with its head down.");
// ---------- ERYLL - DRAGON DEEZ NUTZ: Doomsday dragons ----------
const DR="Dragon";
M("e2_hatch","eryll2","Doomsday Hatchling",2,"FIRE",DR,800,700,"",{onDestroy:{k:"ssDeck",race:DR,maxLv:4}},"Crack the shell and something angrier crawls out.");
M("e2_ash","eryll2","Doomsday Ash Drake",4,"FIRE",DR,1800,1100,"",{pierce:true},"It breathes ash so hot it melts shields.");
M("e2_wyvern","eryll2","Doomsday Blood-Moon Wyvern",4,"DARK",DR,1700,1200,"",{onSummon:{k:"burn",v:400}},"When the moon turns red, it dives.");
M("e2_bulwark","eryll2","Doomsday Scale Bulwark Wyrm",4,"EARTH",DR,1300,2000,"",{guard:true},"Every scale is a shield forged in the last war.");
M("e2_hydra","eryll2","Doomsday Twin-Head Hydra Dragon",6,"DARK",DR,2400,1900,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"Two heads, two appetites, one target.");
M("e2_vharoth","eryll2","Doomsday Elder Wyrm Vharoth",7,"DARK",DR,2700,2200,"",{},"It slept beneath the world since the first dawn. It woke up hungry.");
M("e2_ace","eryll2","Doomsday Dragon Ragnavor, World-Ender",8,"DARK",DR,3000,2500,"",{onSummon:{k:"destroyMon"},onDestroy:{k:"burn",v:800}},"Molten cracks, a blood-red moon and meteors falling. Eryll's dragon of the last day.",true);
SP("e2_pact","eryll2","Dragon Master's Blood Pact","Continuous","",{k:"cont",race:DR,atk:300},"Sealed in blood under a red moon. The dragons answer only to him.");
TR("e2_scales","eryll2","Scales of Retribution","",{k:"burnBack",v:1000},"Strike the dragon and the scales strike back.");
// ---------- HUIPING: Nip Piercer ("Piercer" lances, needles & drills) ----------
const PI="Piercer";
M("hp_page","huiping","Piercer Needle Page",2,"WIND",PI,700,500,"",{onSummon:{k:"ssDeck",race:PI,maxLv:4}},"Quick as a needle, she calls the next lancer forward.");
M("hp_rapier","huiping","Piercer Rapier Fencer",4,"WIND",PI,1800,1100,"",{pierce:true},"En garde. Then straight through.");
M("hp_gorran","huiping","Piercer Spiral Drill Knight Gorran",7,"EARTH",PI,2600,2000,"",{pierce:true,tribute1:true},"His lance never stops spinning. Neither does he.");
M("hp_lyra","huiping","Piercer Skyneedle Valkyrie Lyra",7,"WIND",PI,2500,2100,"",{tribute1:true,onSummon:{k:"destroyST"}},"She dives from the clouds and pins your traps to the ground.");
M("hp_narwhal","huiping","Piercer Iron Narwhal Lancer",7,"WATER",PI,2300,2700,"",{guard:true,pierce:true,tribute1:true},"Half knight, half narwhal, all horn.");
M("hp_brannoc","huiping","Piercer Crimson Lance General Brannoc",8,"FIRE",PI,2800,2300,"",{pierce:true,onSummon:{k:"destroyMon",maxAtk:2000}},"The general of the lance legion. His charge has never been stopped.");
M("hp_ace","huiping","Piercer Sovereign Gungrael, the Heaven-Drill",8,"LIGHT",PI,3000,2400,"",{pierce:true,onSummon:{k:"destroyMon"}},"A spiral drill-lance that bores through shields, walls and the sky itself.",true);
Q("hp_pinpoint","huiping","Pinpoint Strike",{k:"qBoost",v:700},"One jab, perfectly placed.");
TR("hp_wall","huiping","Needle Wall","",{k:"shrink",v:1500},"A thousand needles rise. The attack loses its nerve.");
// ---------- JOCELYN: Stupid Deck ("Oopsie" blunderers) ----------
const OO="Oopsie";
M("jc_bunny","jocelyn","Oopsie Banana-Peel Bunny",2,"EARTH",OO,700,600,"",{onDestroy:{k:"ssDeck",race:OO,maxLv:4}},"Slipped again. Her friend tripped in to help.");
M("jc_goldfish","jocelyn","Oopsie Forgetful Goldfish",3,"WATER",OO,1200,1100,"",{onSummon:{k:"draw",n:1}},"Wait, why did I come here? Oh, right, a card!");
M("jc_knight","jocelyn","Oopsie Wrong-Way Knight",4,"EARTH",OO,1800,1000,"",{direct:true},"He charged the wrong way and somehow ended up behind your lines.");
M("jc_golem","jocelyn","Oopsie Door-Bonk Golem",4,"EARTH",OO,1400,2000,"",{guard:true},"Bonk. It walked into the door again. The door lost.");
M("jc_penguin","jocelyn","Oopsie Upside-Down Penguin",4,"WATER",OO,1900,1200,"",{},"It has no idea it is upside down. It is doing great.");
M("jc_ace","jocelyn","Oopsie Mega Blunder Bonkosaurus",8,"EARTH",OO,2800,2600,"",{onSummon:{k:"coin",h:{k:"destroyMon"},t:{k:"draw",n:1}}},"A bucket over its eyes, stars spinning round its head, and everything in its path flattened.",true);
SP("jc_brain","jocelyn","Big Brain Moment","Normal","",{k:"draw",n:2},"For one glorious second, everything made sense.");
TR("jc_trip","jocelyn","Trip Over Nothing","",{k:"shrink",v:1500},"There was nothing there. It tripped anyway.");
// ---------- MR KENNETH: GPA Deck ("Honor Roll" Scholars) ----------
const SC="Scholar";
M("kn_pixie","kenneth","Honor Roll Pop-Quiz Pixie",2,"LIGHT",SC,600,800,"",{onSummon:{k:"ssDeck",race:SC,maxLv:4}},"Pencils down! She calls the next student to the front.");
M("kn_mei","kenneth","Honor Roll Straight-A Student Mei",4,"LIGHT",SC,1500,1400,"",{onSummon:{k:"draw",n:1}},"Homework done a week early. Again.");
M("kn_bertram","kenneth","Honor Roll Hall Monitor Bertram",4,"EARTH",SC,1300,1900,"",{guard:true},"Hall pass? No hall pass, no entry.");
M("kn_grader","kenneth","Honor Roll Red-Pen Grader",4,"FIRE",SC,1700,1100,"",{onSummon:{k:"weakenAll",v:300}},"Minus three hundred. See me after class.");
M("kn_theodora","kenneth","Honor Roll Valedictorian Theodora",7,"LIGHT",SC,2600,2200,"",{onSummon:[{k:"heal",v:1000},{k:"draw",n:1}]},"Top of the class, and she gives the speech at the end.");
M("kn_ace","kenneth","Grand Examiner Golem Summa Laudis",8,"EARTH",SC,2900,2700,"",{onSummon:{k:"destroyMon",maxAtk:2000},guard:true},"A stone golem in a mortarboard with a red pen the size of a staff. It grades on no curve.",true);
SP("kn_curve","kenneth","Bell Curve","Continuous","",{k:"cont",race:SC,atk:300},"Everyone moves up a grade. Just this once.");
Q("kn_quiz","kenneth","Pop Quiz!",{k:"qShrink",v:1000},"Surprise! Nobody studied for this.");
TR("kn_detention","kenneth","Detention!","",{k:"shrink",v:1500},"You. Corner. Now. The attack goes nowhere.");

/* ---------- decks (explicit 30-card lists; signature cards + shared cards) ---------- */
const DECK_V10={
  sliver:{sv_ace:1,sv_valentin:2,sv_rio:3,sv_dex:3,sv_alonzo:3,sv_brick:3,sv_rehearsal:2,sv_nottype:2,
    x_seal:1,x_oracle:2,x_revive:1,x_thorn:1,x_gust:1,x_meteor:1,x_veil:1,x_blade:1,x_smite:1,x_mend:1},
  eryll2:{e2_ace:1,e2_vharoth:2,e2_hydra:1,e2_hatch:3,e2_ash:3,e2_wyvern:3,e2_bulwark:3,e2_pact:2,e2_scales:2,
    x_seal:1,x_oracle:2,x_revive:1,x_thorn:1,x_gust:1,x_veil:1,x_blade:1,x_smite:1,x_mend:1},
  huiping:{hp_ace:1,hp_brannoc:1,hp_gorran:2,hp_lyra:1,hp_narwhal:1,hp_page:3,hp_rapier:3,hp_pinpoint:2,hp_wall:2,
    x_seal:1,x_oracle:2,x_revive:2,x_thorn:1,x_gust:1,x_veil:1,x_blade:1,x_smite:1,x_flash:1,x_mend:1,x_meteor:1,x_aegis:1},
  jocelyn:{jc_ace:1,jc_bunny:3,jc_goldfish:3,jc_knight:3,jc_golem:3,jc_penguin:3,jc_brain:2,jc_trip:2,
    x_seal:1,x_oracle:1,x_revive:1,x_thorn:1,x_gust:1,x_meteor:1,x_veil:1,x_blade:1,x_smite:1,x_mend:1},
  kenneth:{kn_ace:1,kn_theodora:2,kn_pixie:3,kn_mei:3,kn_bertram:3,kn_grader:3,kn_curve:2,kn_quiz:2,kn_detention:2,
    x_seal:1,x_oracle:1,x_revive:1,x_thorn:1,x_gust:1,x_veil:1,x_blade:1,x_smite:1,x_mend:1}
};
window.DECK_V10=DECK_V10;
{const base=defaultDeck;defaultDeck=function(ch){return DECK_V10[ch]?Object.assign({},DECK_V10[ch]):base.apply(this,arguments);};}

/* ---------- characters ---------- */
const NEW10={
  sliver:{name:"Sliver",img:"sliver",race:LM,color:"#c9c9ff",theme:"All Man Deck: a troupe of leading men she can't stand",home:"concert_stage",
    bio:"A silver-haired stage diva who runs the flashiest all-male dance troupe in town... and openly can't stand men. Her Mister dancers pierce, guard and power each other up, while the Grand Danseur Maximo steals the spotlight she secretly wants for herself.",
    quote:"Boys, positions! ...Ugh, I hate this already.",
    personality:"Showtime beatdown: Backup Dancer Rio calls the troupe out, Alonzo and Boys' Rehearsal Night pump every Leading Man up, Ballroom Baron Valentin weakens the whole enemy floor and Grand Danseur Maximo takes centre stage. Confident, dramatic, and fed up with every man on her side.",
    lines:{start:["Boys, positions! ...Ugh, I hate this already.","Let's get this show over with."],summon:["Places, gentlemen. Try not to embarrass me.","You. Front row. Smile.","Next one, go. Quickly."],ace:["Take center stage, Maximo — and then get off it!","Valentin, one tango. Then leave."],attack:["Dance, idiots!","Five, six, seven, eight!","Hit your mark!"],trap:["Not my type. Rejected."],hurt:["Ugh, which one of you missed the cue?!"],win:["Curtain! And no, nobody gets a bow."],lose:["Men. Always letting me down."]}},
  eryll2:{name:"Eryll – Dragon Deez Nutz",img:"eryll2",race:DR,color:"#ff3b2f",theme:"Dragon Master: Doomsday dragons, blood moon & the end of the world",home:"dragon_lair",
    bio:"Eryll put away his Nemesis grudges and answered a darker call: the Dragon Master's blood pact. Wrapped in a crimson dragon-scale coat under a blood-red moon, he commands the Doomsday dragons, and when the world turns against him he simply ends it.",
    quote:"The moon is red. That means it's my turn.",
    personality:"Dragon beatdown: piercing drakes, burning wyverns and a Twin-Head Hydra clear the way for Elder Wyrm Vharoth and Doomsday Dragon Ragnavor, whose fall still burns the opponent. Cold, theatrical and ready to wipe the whole board with THE END OF WORLD.",
    lines:{start:["The moon is red. That means it's my turn.","Kneel before the Dragon Master."],summon:["Rise, dragon.","Wings out. Burn it down.","Another dragon answers."],ace:["Doomsday Dragon Ragnavor, World-Ender — end it all!","Vharoth, wake from your ancient sleep!"],attack:["Burn!","Fall!","Dragonfire!"],trap:["Strike my dragons and the scales strike back."],hurt:["You only made the dragon angry."],win:["The world ended. I'm still standing."],lose:["...Even dragons sleep sometimes."]}},
  huiping:{name:"Huiping",img:"huiping",race:PI,color:"#2fd4d0",theme:"Nip Piercer: lances, needles & spiral drills",home:"castle",
    bio:"A sharp-eyed strategist with a short black bob, glasses and a teal long coat. Her Piercer knights strike first and strike straight through: fencers, drill knights and lancers that pierce any defence, led by the Heaven-Drill Gungrael.",
    quote:"Find the weak point. Then go straight through it.",
    personality:"Heavy-hitting piercer: almost every Piercer deals piercing damage, Needle Page calls a partner from the deck, and her big Level 7 and 8 lancers do the rest. Spiral Arsenal refills her hand with her strongest knights. Calm, precise and slightly smug.",
    lines:{start:["Find the weak point. Then go straight through it.","Glasses on. Let's begin."],summon:["Lance ready.","Take the point.","Next piercer, forward!"],ace:["Bore through the heavens, Piercer Sovereign Gungrael!","Brannoc, sound the charge!"],attack:["Pierce!","Straight through!","Jab!"],trap:["Needle Wall. You walked right into it."],hurt:["Hm. A lucky hit."],win:["Exactly as calculated."],lose:["I... missed a weak point somewhere."]}},
  jocelyn:{name:"Jocelyn",img:"jocelyn",race:OO,color:"#ffd23f",theme:"Stupid Deck: Oopsie blunders that somehow work",home:"toy_town",
    bio:"A lovable airhead in a yellow hoodie, messy double buns with a pencil stuck in them and a plaster on her cheek. Her Oopsie monsters trip, forget and walk the wrong way... and somehow keep winning, especially when the Mega Blunder Bonkosaurus stumbles in.",
    quote:"Wait, which one's the attack button?",
    personality:"Accidental swarm: Banana-Peel Bunny and Forgetful Goldfish keep her hand and board full, Wrong-Way Knight attacks directly, and Bonkosaurus flips a coin to flatten a monster or draw a card. Cheerful, confused and dangerously lucky.",
    lines:{start:["Wait, which one's the attack button?","Okay! I read the rules! ...Some of them."],summon:["Ta-da! ...Is that right?","Go, go, go! Wait, not that way!","Oops! I mean, I meant to do that!"],ace:["Bonkosaurus! Try not to trip! ...Never mind!","Oopsie Mega Blunder Bonkosaurus, go!"],attack:["Charge! I think!","Bonk!","Whoops, attack!"],trap:["Oh! I set a trap? Yay!"],hurt:["Ow! Who put that there?"],win:["I won?! I WON! How did I win?"],lose:["Oopsie..."]}},
  kenneth:{name:"Mr Kenneth",img:"kenneth",race:SC,color:"#5fd38a",theme:"GPA Deck: Honor Roll scholars, red pens & detention",home:"magician_room",
    bio:"A strict, bald senior teacher with glasses, a navy tie and a red pen that has failed a thousand students. His Honor Roll scholars draw cards, guard the hallway and weaken the class, while the Grand Examiner Golem Summa Laudis grades the field.",
    quote:"Your GPA is too low to stay on my field.",
    personality:"Strict control: Straight-A Mei and Valedictorian Theodora keep his hand and LP high, Hall Monitor Bertram and the Golem guard, Red-Pen Grader weakens everything, and GPA Required expels the opponent's whole field. Stern, dry and never impressed.",
    lines:{start:["Your GPA is too low to stay on my field.","Sit down. The exam begins now."],summon:["Present.","Next student.","Honor Roll, stand up."],ace:["Grand Examiner Golem Summa Laudis, begin grading!","Theodora, give the speech."],attack:["Fail.","See me after class.","Red pen!"],trap:["Detention!"],hurt:["That will cost you marks."],win:["Passed. Barely. Class dismissed."],lose:["...I'll allow a re-sit."]}}
};
for(const k in NEW10)CHARS[k]=NEW10[k];
if(typeof CHAR_ORDER!=="undefined"){for(const k in NEW10)if(!CHAR_ORDER.includes(k))CHAR_ORDER.push(k);
  const mv=(k,after)=>{const i=CHAR_ORDER.indexOf(k),j=CHAR_ORDER.indexOf(after);if(i<0||j<0)return;CHAR_ORDER.splice(i,1);CHAR_ORDER.splice(CHAR_ORDER.indexOf(after)+1,0,k);};
  mv("eryll2","eryll");}
if(typeof HOME!=="undefined")for(const k in NEW10)HOME[k]=NEW10[k].home;
/* "when destroyed" Special Summons never summon a copy of the destroyed card (same rule as data_new5.js) */
for(const id in CARDS){const c=CARDS[id];if(c.ch&&NEW10[c.ch]&&c.type==="monster"&&c.fx&&c.fx.onDestroy)[].concat(c.fx.onDestroy).forEach(f=>{if(/^ss/.test(f.k))f.notSelf=c.name;});}
})();
/* ================= v12: Keith – Rich Mode, Lemon – Vacation Mode, Weisheng – F1 Legend, G-Dragon =================
   Concatenate AFTER data_new10.js and BEFORE k_links_data.js (k_links_data freezes defaultDeck into DECK_V8).
   Approved preview (/workspace/preview_v12). Only existing effect kinds are used; the four Links live in k_links.js.
   keith2 / lemon2 / weisheng2 are ⇄ alternate modes (k_ui9.js MODES), hidden from the ring like Dark Kelvin.
   G-Dragon is a new, fully original character (original design, not a likeness of any real person). */
(function(){
const Q=(id,ch,name,fx,flavor)=>{CARDS[id]={id,ch,name,type:"spell",kind:"Quick-Play",subtype:"quickplay",art:"",fx,flavor:flavor||""};};
// ---------- KEITH – RICH MODE: ATM / Money Bank Card ("Vault" Money) ----------
const MO="Money";
M("k2_coin","keith2","Vault Lucky Coin Sprite",2,"LIGHT",MO,700,600,"",{onDestroy:{k:"ssDeck",race:MO,maxLv:4}},"Flip it, lose it, and two more roll out of the machine.");
M("k2_atm","keith2","Vault Cash-Machine Sentinel",4,"EARTH",MO,1300,1900,"",{guard:true},"Insert card. Enter PIN. Get pummelled.");
M("k2_black","keith2","Vault Black-Card Swindler",4,"DARK",MO,1700,1000,"",{direct:true},"No limit, no queue, no velvet rope can stop him.");
M("k2_interest","keith2","Vault Interest Collector",4,"LIGHT",MO,1500,1300,"",{onSummon:{k:"heal",v:800}},"Your money works for him now.");
M("k2_teller","keith2","Vault Teller Golem",4,"EARTH",MO,1400,1400,"",{aura:{race:MO,atk:300}},"Counts every coin twice and every Money monster gets a raise.");
M("k2_goldbar","keith2","Vault Gold-Bar Behemoth",7,"EARTH",MO,2600,2200,"",{onSummon:{k:"destroyMon",maxAtk:2000}},"A thousand gold bars walking. Anything cheaper gets flattened.");
M("k2_ace","keith2","Vault Guardian Aurum Colossus",8,"EARTH",MO,2900,2600,"",{onSummon:{k:"heal",v:1000},aura:{race:MO,atk:200},guard:true},"A giant golden vault come to life, its chest a round safe door. Keith's fortune, and its bodyguard.",true);
SP("k2_interest_c","keith2","Compound Interest","Continuous","",{k:"cont",race:MO,atk:300},"Money makes money. Money monsters make more money.");
Q("k2_cashback","keith2","Cashback Bonus",{k:"qDraw",n:1,heal:500},"Spend big, get some back. Ka-ching.");
TR("k2_nsf","keith2","Insufficient Funds","",{k:"shrink",v:1500},"Transaction declined. The attack bounces.");
// ---------- LEMON – VACATION MODE: Zombie Vacation ("Holiday Zombie") ----------
const ZO="Zombie";
M("l2_sunscreen","lemon2","Holiday Zombie Sunscreen Shambler",2,"DARK",ZO,700,600,"",{onDestroy:{k:"ssGY",race:ZO,maxLv:4}},"SPF 100 and still somehow rotting. Lie down, get back up.");
M("l2_floatie","lemon2","Holiday Zombie Floatie Paddler",3,"WATER",ZO,1200,1000,"",{onSummon:{k:"ssHand",race:ZO,maxLv:3}},"Paddles in on a rubber ring and brings a friend.");
M("l2_volley","lemon2","Holiday Zombie Beach-Volley Brute",4,"EARTH",ZO,1800,1000,"",{pierce:true},"Spikes the ball. And the defence.");
M("l2_lifeguard","lemon2","Holiday Zombie Lifeguard",4,"WATER",ZO,1300,1900,"",{guard:true},"Nobody drowns on his watch. Nobody gets past either.");
M("l2_limbo","lemon2","Holiday Zombie Limbo Dancer",4,"DARK",ZO,1600,1100,"",{direct:true},"How low can he go? Under your whole field.");
M("l2_buffet","lemon2","Holiday Zombie Cruise Buffet Ghoul",7,"DARK",ZO,2600,2100,"",{onSummon:{k:"ssGY",race:ZO,maxLv:4}},"All-you-can-eat. He brought the whole tour group back for seconds.");
M("l2_ace","lemon2","Holiday Zombie Tiki Overlord Bonelua",8,"DARK",ZO,2900,2300,"",{onSummon:{k:"ssGY",race:ZO,maxLv:4},aura:{race:ZO,atk:200}},"A giant zombie in a floral shirt and sunglasses on a tiki throne. Annual leave: approved. Forever.",true);
SP("l2_resort","lemon2","All-Inclusive Resort","Continuous","",{k:"cont",race:ZO,atk:300},"Drinks included. Undeath included.");
SP("l2_wakeup","lemon2","Wake-Up Call Service","Normal","",{k:"revive",race:ZO},"Good morning! Your 7 a.m. resurrection is ready.");
TR("l2_dnd","lemon2","Do Not Disturb Sign","",{k:"negate",needRace:ZO},"Hung on the door. The attack turns around and leaves.");
// ---------- WEISHENG – F1 LEGEND: F1 racing ("Grand Prix" Racers) ----------
const RA="Racer";
M("w2_wheelman","weisheng2","Grand Prix Pit Crew Wheelman",2,"EARTH",RA,700,700,"",{onSummon:{k:"ssDeck",race:RA,maxLv:4}},"Two-second tyre change, then he waves the next car out.");
M("w2_strategist","weisheng2","Grand Prix Pit Wall Strategist",4,"LIGHT",RA,1500,1300,"",{aura:{race:RA,atk:300}},"Plan A, Plan B, and a radio call that wins the race.");
M("w2_rookie","weisheng2","Grand Prix Rookie Rocket",4,"FIRE",RA,1800,1000,"",{pierce:true},"First season, no fear, no brakes.");
M("w2_safety","weisheng2","Grand Prix Safety Car",4,"LIGHT",RA,1300,1900,"",{guard:true},"Lights on. Nobody overtakes.");
M("w2_slip","weisheng2","Grand Prix Slipstream Chaser",4,"WIND",RA,1700,1100,"",{direct:true},"Tucked in the tow, then gone past you.");
M("w2_hybrid","weisheng2","Grand Prix Turbo-Hybrid Vanguard",7,"WIND",RA,2500,2200,"",{onSummon:{k:"draw",n:1}},"Recovers energy on every corner and spends it on the straight.");
M("w2_silver","weisheng2","Grand Prix Silver Comet Monoposto",7,"LIGHT",RA,2600,2000,"",{double:true},"Two laps in the time it takes you to blink.");
M("w2_ace","weisheng2","Grand Prix Scarlet Apex Monoposto",8,"FIRE",RA,3000,2300,"",{pierce:true,onSummon:{k:"destroyMon",maxAtk:2000}},"Weisheng's red single-seater. Pole, fastest lap, chequered flag.",true);
SP("w2_pole","weisheng2","Pole Position","Continuous","",{k:"cont",race:RA,atk:300},"Start at the front. Stay at the front.");
Q("w2_drs","weisheng2","DRS Wide Open",{k:"qBoost",v:700,race:RA},"Flap open, top speed up, overtake complete.");
TR("w2_redflag","weisheng2","Red Flag!","",{k:"negate",needRace:RA},"Session stopped. That attack never happened.");
// ---------- G-DRAGON: Man Idol ("Jade Dragon" Idols — shares the existing Idol race) ----------
const ID="Idol";
M("gd_trainee","gdragon","Jade Dragon Rookie Trainee",2,"LIGHT",ID,700,600,"",{onSummon:{k:"ssDeck",race:ID,maxLv:4}},"Seven years of practice for one debut. He brought a friend.");
M("gd_lightstick","gdragon","Jade Dragon Lightstick Legion",3,"LIGHT",ID,1400,1000,"",{onSummon:{k:"heal",v:600}},"A sea of green lights. Fan-power is real power.");
M("gd_rapper","gdragon","Jade Dragon Main Rapper Kael",4,"FIRE",ID,1900,1000,"",{pierce:true},"Sixteen bars, straight through your guard.");
M("gd_vocal","gdragon","Jade Dragon Main Vocal Seren",4,"LIGHT",ID,1600,1300,"",{aura:{race:ID,atk:300}},"One high note and the whole group levels up.");
M("gd_manager","gdragon","Jade Dragon Stage Manager",4,"EARTH",ID,1500,1900,"",{guard:true},"Headset on, clipboard up. Nobody rushes the stage.");
M("gd_visual","gdragon","Jade Dragon Center Visual Haneul",7,"WIND",ID,2700,2100,"",{onSummon:{k:"destroyMon",maxAtk:1500}},"One look from the centre position and the weak ones faint.");
M("gd_ace","gdragon","Jade Dragon Encore Sovereign",8,"LIGHT",ID,2900,2400,"",{onSummon:{k:"weakenAll",v:500},aura:{race:ID,atk:200}},"An emerald dragon of light born from a stadium of fan-chants, coiling around the stage.",true);
SP("gd_fanchant","gdragon","Fanchant Roar","Continuous","",{k:"cont",race:ID,atk:300},"Every name shouted in rhythm. Every idol stands taller.");
SP("gd_comeback","gdragon","Comeback Stage","Normal","",{k:"search",race:ID},"New era, new concept, same dragon.");
TR("gd_barricade","gdragon","Security Barricade","",{k:"shrink",v:1500},"Stage security says no.");

const DECK_V12={
  keith2:{k2_ace:1,k2_goldbar:2,k2_coin:3,k2_atm:3,k2_black:3,k2_interest:2,k2_teller:2,k2_interest_c:2,k2_cashback:2,k2_nsf:2,
    x_seal:1,x_oracle:1,x_revive:1,x_thorn:1,x_gust:1,x_veil:1,x_blade:1,x_smite:1},
  lemon2:{l2_ace:1,l2_buffet:2,l2_sunscreen:3,l2_floatie:3,l2_volley:3,l2_lifeguard:2,l2_limbo:3,l2_resort:2,l2_wakeup:1,l2_dnd:2,
    x_seal:1,x_oracle:1,x_thorn:1,x_gust:1,x_veil:1,x_blade:1,x_smite:1,x_mend:1},
  weisheng2:{w2_ace:1,w2_silver:1,w2_hybrid:2,w2_wheelman:3,w2_strategist:2,w2_rookie:3,w2_safety:2,w2_slip:3,w2_pole:2,w2_drs:2,w2_redflag:2,
    x_seal:1,x_oracle:1,x_revive:1,x_thorn:1,x_gust:1,x_veil:1,x_smite:1},
  gdragon:{gd_ace:1,gd_visual:2,gd_trainee:3,gd_lightstick:2,gd_rapper:3,gd_vocal:3,gd_manager:3,gd_fanchant:2,gd_comeback:1,gd_barricade:2,
    x_seal:1,x_oracle:1,x_revive:1,x_thorn:1,x_gust:1,x_veil:1,x_blade:1,x_smite:1}
};
window.DECK_V12=DECK_V12;
{const base=defaultDeck;defaultDeck=function(ch){return DECK_V12[ch]?Object.assign({},DECK_V12[ch]):base.apply(this,arguments);};}
const NEW12={
  keith2:{name:"Keith – Rich Mode",img:"keith2",race:MO,color:"#ffc93c",theme:"Money Deck: Vault guardians, gold bars & compound interest",home:"pawn_alley",
    bio:"Keith got rich. Very rich. He still wears the sunglasses, the grin and a torn white singlet, but now there's a gold chain, a gold paw-print bank card and a vault full of gold behind him, guarded by a giant golden colossus whose chest is a safe door.",
    quote:"Relax, I can afford this duel.",
    personality:"Money control: Cash-Machine Sentinel and the Aurum Colossus guard the vault, Interest Collector and Cashback keep his LP topped up, Teller Golem and Compound Interest pay every Money monster a raise, and Hostile Takeover simply buys the opponent's best monster. Smug, generous with insults, cheap with nothing.",
    lines:{start:["Relax, I can afford this duel.","Let's make this quick. Time is money."],summon:["Put it on my tab.","Another investment.","Money talks. This one punches."],ace:["Aurum Colossus, guard the vault!","Vault Guardian Aurum Colossus, open for business!"],attack:["Cha-ching!","Pay up!","Collect!"],trap:["Transaction declined."],hurt:["Hey! That was expensive!"],win:["Profit. As always."],lose:["...Can I pay to undo that?"]}},
  lemon2:{name:"Lemon – Vacation Mode",img:"lemon2",race:ZO,color:"#ff9f43",theme:"Holiday Zombies: the workers finally took their leave",home:"fairy_lake",
    bio:"Lemon finally used her annual leave. Straw sun hat, floral shirt, a cocktail instead of coffee and her work lanyard still on as a joke. Her old office zombies came along too, and now they shamble around the beach in sunglasses and rubber rings, refusing to stay down.",
    quote:"Out of office. Permanently.",
    personality:"Graveyard recursion: Sunscreen Shambler, Buffet Ghoul and Tiki Overlord Bonelua keep pulling Holiday Zombies back from the GY, the Resort buffs the whole tour group, and Paid Leave brings three of them back at once. Relaxed, sarcastic and unbothered.",
    lines:{start:["Out of office. Permanently.","I'm on holiday. Make it quick."],summon:["Another one off the cruise ship.","Up you get, sleepyhead.","Sunscreen on? Good. Go."],ace:["Bonelua, approve my leave!","Tiki Overlord Bonelua, rise from the sand!"],attack:["Go fetch.","Beach volley!","Splash!"],trap:["Do not disturb."],hurt:["Ugh. Sand in my drink."],win:["Back to the hammock."],lose:["...I'm still not checking my email."]}},
  weisheng2:{name:"Weisheng – F1 Legend",img:"weisheng2",race:RA,color:"#ff2a2a",theme:"Grand Prix Racers: pit crews, slipstreams & a scarlet monoposto",home:"racetrack",
    bio:"Same glasses, same calm smile, but Weisheng traded the road for the circuit. In a plain red-and-white race suit with his helmet under his arm, he runs a full Grand Prix team: pit crew, strategist, safety car and a scarlet single-seater that never lifts off the throttle.",
    quote:"Lights out and away we go.",
    personality:"Speed beatdown: Pit Crew Wheelman calls a Racer from the deck, Pit Wall Strategist and Pole Position tune the whole grid, Silver Comet hits twice and the Scarlet Apex pierces through, while Box Box Box! sends the flagship car straight from the garage. Cool-headed and always on the racing line.",
    lines:{start:["Lights out and away we go.","Engines on. Let's race."],summon:["Out of the garage.","Fresh tyres, go!","Next car on track."],ace:["Scarlet Apex, push push push!","Grand Prix Scarlet Apex Monoposto, full throttle!"],attack:["Overtake!","Full send!","DRS open!"],trap:["Red flag! Session stopped."],hurt:["Ugh, track limits."],win:["P1. Chequered flag."],lose:["...We'll get them on the next lap."]}},
  gdragon:{name:"G-Dragon",img:"gdragon",race:"Idol",color:"#2ee88a",theme:"Man Idol: Jade Dragon idol group, stage crew & fan-power",home:"concert_stage",
    bio:"A headlining idol with emerald-green hair and one silver streak, golden eyes and a high-collared emerald stage coat with gold dragon embroidery. His Jade Dragon group (rapper, vocal, visual and a hard-working trainee) fills the stadium, and when the encore starts an emerald dragon of light coils around the stage.",
    quote:"Lights. Mic. Let's go.",
    personality:"Idol swarm: Rookie Trainee calls the group, Lightstick Legion heals with fan-power, Main Vocal Seren and Fanchant Roar pump every Idol up, Center Visual Haneul and the Encore Sovereign shrink the enemy, and Bang Bang Bang! clears the small fry. Charismatic, playful and always performing.",
    lines:{start:["Lights. Mic. Let's go.","Are you ready? I can't hear you!"],summon:["Next member, on stage!","Spotlight, here!","Make some noise!"],ace:["Jade Dragon Encore Sovereign — one more song!","Encore! Come on out, dragon!"],attack:["Drop the beat!","Hit it!","Bang!"],trap:["Security! No stage diving."],hurt:["Missed a step. It's fine."],win:["Thank you, goodnight!"],lose:["...Encore cancelled. For now."]}}
};
for(const k in NEW12)CHARS[k]=NEW12[k];
if(typeof CHAR_ORDER!=="undefined"){for(const k in NEW12)if(!CHAR_ORDER.includes(k))CHAR_ORDER.push(k);
  const mv=(k,after)=>{const i=CHAR_ORDER.indexOf(k),j=CHAR_ORDER.indexOf(after);if(i<0||j<0)return;CHAR_ORDER.splice(i,1);CHAR_ORDER.splice(CHAR_ORDER.indexOf(after)+1,0,k);};
  mv("keith2","keith");mv("lemon2","lemon");mv("weisheng2","weisheng");}
if(typeof HOME!=="undefined")for(const k in NEW12)HOME[k]=NEW12[k].home;
/* "when destroyed" Special Summons never summon a copy of the destroyed card (same rule as data_new5.js / data_new10.js) */
for(const id in CARDS){const c=CARDS[id];if(c.ch&&NEW12[c.ch]&&c.type==="monster"&&c.fx&&c.fx.onDestroy)[].concat(c.fx.onDestroy).forEach(f=>{if(/^ss/.test(f.k))f.notSelf=c.name;});}
window.NEW12=NEW12;
})();
/* ================= v15: James (Railmask line colours), Clement – Trinity Titan, Uncle Ee =================
   Concatenate AFTER data_v12.js and BEFORE k_links_data.js (k_links_data freezes defaultDeck into DECK_V8).
   Approved preview (/workspace/preview_v15/spec.md). Line Change, Ink Copy, the three Links and the AI live in k_v15.js.
   clement2 is the ⇄ alternate mode of Clement (k_ui9.js MODES), hidden from the ring like Dark Kelvin.
   James and Uncle Ee are new, fully original characters (original designs, not likenesses of real people). */
(function(){
const Q=(id,ch,name,fx,flavor)=>{CARDS[id]={id,ch,name,type:"spell",kind:"Quick-Play",subtype:"quickplay",art:"",fx,flavor:flavor||""};};
// ---------- JAMES: Railmask ("train mask" warriors that Line Change colour) ----------
/* Line colours (index = m.lc): 0 Red FIRE Warrior · 1 Blue WATER Machine · 2 Yellow LIGHT Spellcaster · 3 Green WIND Beast · 4 Pink EARTH Fairy.
   Every Railmask has set:"Railmask" (archetype checks use raceIs(), which also matches the set) and lc0 = its printed colour. */
const RM="Railmask";
const R=(id,name,lv,lc0,atk,def,fx,flavor,isAce)=>{const C=[["FIRE","Warrior"],["WATER","Machine"],["LIGHT","Spellcaster"],["WIND","Beast"],["EARTH","Fairy"]][lc0==null?2:lc0];
  const at=lc0==null?"LIGHT":C[0],ra=lc0==null?"Warrior":C[1];
  M(id,"james",name,lv,at,ra,atk,def,"",fx,flavor,isAce);CARDS[id].set=RM;CARDS[id].lc0=lc0==null?null:lc0;};
R("jm_caboose","Railmask Cadet Caboose",2,4,700,600,{onDestroy:{k:"ssDeck",race:RM,maxLv:4}},"The last car on the line, and the first to call for backup.");
R("jm_red","Railmask Red Engine",4,0,1700,1100,{pierce:true},"Full steam, no brakes, straight through the wall.");
R("jm_blue","Railmask Blue Coupler",4,1,1300,1800,{guard:true},"Locks onto the line and refuses to let go.");
R("jm_yellow","Railmask Yellow Signal",4,2,1500,1200,{onSummon:{k:"lineChange",n:1}},"Green means go. Yellow means change.");
R("jm_green","Railmask Green Express",4,3,1600,1000,{direct:true},"Non-stop service, every station skipped.");
R("jm_pink","Railmask Pink Sleeper",3,4,1200,1200,{onSummon:{k:"ssHand",race:RM,maxLv:3}},"Dozes in the sleeper car until a friend needs a ride.");
R("jm_junction","Railmask Junction Commander",7,0,2600,2000,{onSummon:{k:"lineChange",n:"any"}},"He throws the points and every line on the board switches at once.");
R("jm_ace","Railmask Prism Driver Omniliner",8,null,2900,2300,{onSummon:{k:"lineChange",self:true},aura:{race:RM,atk:200}},"The prism-armoured masked driver leaps from the bullet train's nose, five colours crackling in one fist.",true);
Q("jm_linechange","james","Line Change!",{k:"lineChange",n:1,atk:300},"Mind the gap. Mind the colour.");
SP("jm_ticket","james","Transfer Ticket","Normal","",{k:"lineChange",n:1,draw:1},"Change here for all other lines.");
SP("jm_network","james","Rainbow Rail Network","Continuous","",{k:"cont",race:RM,atk:300},"Five lines, one map, every train on time.");
TR("jm_brake","james","Emergency Brake","",{k:"negate",needRace:RM},"Pull the cord. Everybody stops.");
/* the colour picker shows these (real CARDS entries so online guests can render the choice); art is aliased in k_v15.js */
const LCN=[["Red Line","FIRE · Warrior · Piercing","Full power, straight through."],["Blue Line","WATER · Machine · Guard, +400 DEF","Hold the line."],
  ["Yellow Line","LIGHT · Spellcaster · draw 1 when it changes into Yellow (once per turn)","Signal change, new card."],["Green Line","WIND · Beast · can attack directly","Express service, no stops."],
  ["Pink Line","EARTH · Fairy · gain 500 LP when it changes into Pink","Take a breather, mate."]];
LCN.forEach((x,i)=>{CARDS["jm_col"+i]={id:"jm_col"+i,ch:"james",name:x[0],type:"spell",kind:"Line Colour",subtype:"normal",art:"",fx:{k:"lineColour",lc:i},flavor:x[1]+". "+x[2],token:true,retired:true,lcOpt:i};});
// ---------- CLEMENT – TRINITY TITAN: Starborne Giant (Earth, Sea & Sky) ----------
const GT="Giant";
M("c2_spark","clement2","Starborne Spark Cadet",2,"LIGHT",GT,700,600,"",{onSummon:{k:"ssDeck",race:GT,maxLv:4}},"A spark falls from the stars and something much larger answers.");
M("c2_terra","clement2","Starborne Giant Aster – Terra Form",4,"EARTH",GT,1400,1900,"",{guard:true},"Mountain-rock armour. Nothing gets past the Earth.");
M("c2_tide","clement2","Starborne Giant Aster – Tide Form",4,"WATER",GT,1500,1400,"",{onDestroy:{k:"ssGY",race:GT,maxLv:4}},"Break the wave and the sea simply comes back.");
M("c2_gale","clement2","Starborne Giant Aster – Gale Form",4,"WIND",GT,1700,1000,"",{direct:true},"Cloud wings, sky speed, straight over the front line.");
M("c2_beacon","clement2","Starborne Beacon Keeper",4,"LIGHT",GT,1500,1300,"",{aura:{race:GT,atk:300}},"Lights the coastline so every giant can find its way home.");
M("c2_storm","clement2","Starborne Giant Aster – Storm Horizon Form",7,"WIND",GT,2600,2100,"",{onSummon:{k:"destroyMon",maxAtk:1800}},"Thunderheads gather on the horizon, then crash down at once.");
M("c2_ace","clement2","Starborne Giant Aster – Trinity Form",8,"LIGHT",GT,3000,2500,"",{pierce:true,onSummon:[{k:"destroyMon",maxAtk:2000},{k:"heal",v:1000}]},"Earth legs, ocean fins, cloud wings: the star-born giant at full power, charging a green-blue-white sphere.",true);
SP("c2_convergence","clement2","Trinity Convergence","Normal","",{k:"fusion",mats:["c2_terra","c2_tide","c2_gale"],result:"c2_ace"},"Earth, Sea and Sky become one.");
SP("c2_accord","clement2","Earth-Sea-Sky Accord","Continuous","",{k:"cont",race:GT,atk:300},"Three powers, one promise.");
Q("c2_ray","clement2","Horizon Ray",{k:"qBoost",v:700,race:GT},"A beam of dawn light from the edge of the world.");
TR("c2_barrier","clement2","Planetary Barrier","",{k:"shrink",v:1500},"The whole planet pushes back.");
// ---------- UNCLE EE: Sketch (everything he draws comes to life) ----------
const SK="Sketch";
M("ue_scribbly","uncleee","Pencil Sprite Scribbly",2,"LIGHT",SK,700,600,"",{onDestroy:{k:"ssDeck",race:SK,maxLv:4}},"Erase one doodle and Uncle simply draws another.");
M("ue_rubbo","uncleee","Eraser Golem Rubbo",4,"EARTH",SK,1300,1900,"",{guard:true},"Rubs out every mistake, including yours.");
M("ue_koi","uncleee","Ink-Brush Koi",4,"WATER",SK,1500,1200,"",{onSummon:{k:"ssHand",race:SK,maxLv:3}},"One brushstroke and it swims right off the page.");
M("ue_tiger","uncleee","Charcoal Tiger",4,"DARK",SK,1800,1000,"",{pierce:true},"Smudgy stripes, sharp claws.");
M("ue_crane","uncleee","Paper Crane Flock",3,"WIND",SK,1200,900,"",{direct:true},"A thousand folds, a thousand wings, over every wall.");
M("ue_palette","uncleee","Colour Palette Spirit",4,"LIGHT",SK,1500,1300,"",{aura:{race:SK,atk:300}},"A dab of colour and every sketch looks braver.");
M("ue_phoenix","uncleee","Watercolour Phoenix",7,"FIRE",SK,2500,2100,"",{onSummon:{k:"ssGY",race:SK,maxLv:4}},"Paint it again and it rises again.");
M("ue_ace","uncleee","Masterstroke Ink Dragon Mobao",8,"DARK",SK,2900,2400,"",{onSummon:{k:"ssGY",race:SK,maxLv:4},aura:{race:SK,atk:200}},"It bursts off the unrolled sketch sheet, calligraphy body melting into rainbow watercolour scales.",true);
SP("ue_pencils","uncleee","Box of 72 Colour Pencils","Continuous","",{k:"cont",race:SK,atk:300},"Seventy-two colours, all sharpened.");
SP("ue_life","uncleee","Bring It to Life!","Normal","",{k:"revive",race:SK},"Uncle adds the last line and it opens its eyes.");
Q("ue_quick","uncleee","Quick Sketch",{k:"qBoost",v:700,race:SK},"Ten seconds, one brush, big muscles.");
TR("ue_smudge","uncleee","Oops, Smudged!","",{k:"shrink",v:1500},"Aiyah, the ink ran.");
/* Ink Copy token (Uncle Draw Also Can!): name / Attribute / keywords come from m.icSrc at runtime (k_v15.js v15Base) */
M("ue_inkcopy","uncleee","Ink Copy",4,"DARK",SK,0,0,"",{},"A perfect ink copy, still wet on the page.");CARDS.ue_inkcopy.token=true;CARDS.ue_inkcopy.retired=true;
const DECK_V15={
  james:{jm_ace:1,jm_junction:1,jm_caboose:3,jm_red:3,jm_blue:2,jm_yellow:2,jm_green:3,jm_pink:2,jm_linechange:3,jm_ticket:2,jm_network:2,jm_brake:2,
    x_seal:1,x_oracle:1,x_revive:1,x_smite:1},
  clement2:{c2_ace:1,c2_storm:1,c2_spark:3,c2_terra:3,c2_tide:3,c2_gale:3,c2_beacon:2,c2_convergence:2,c2_accord:2,c2_ray:1,c2_barrier:2,
    x_seal:1,x_oracle:1,x_revive:1,x_thorn:1,x_gust:1,x_veil:1,x_smite:1},
  uncleee:{ue_ace:1,ue_phoenix:2,ue_scribbly:3,ue_rubbo:2,ue_koi:2,ue_tiger:3,ue_crane:2,ue_palette:2,ue_pencils:2,ue_life:1,ue_quick:1,ue_smudge:2,
    x_seal:1,x_oracle:1,x_thorn:1,x_gust:1,x_veil:1,x_blade:1,x_smite:1}
};
window.DECK_V15=DECK_V15;
{const base=defaultDeck;defaultDeck=function(ch){return DECK_V15[ch]?Object.assign({},DECK_V15[ch]):base.apply(this,arguments);};}
const NEW15={
  james:{name:"James",img:"james",race:RM,color:"#e63946",theme:"Railmask: masked train warriors that Line Change colour",home:"stadium",
    bio:"A cool Londoner in a black leather biker jacket, white tee and dark jeans, with a tousled undercut and a cocky smirk. He commands the Railmask squad, five masked train warriors in five line colours, and their prism-armoured driver Omniliner, who leaps off the nose of a bullet train.",
    quote:"Mind the gap, mate.",
    personality:"Colour tricks: every Railmask can Line Change, swapping its Attribute, Type and perk mid-duel. Red pierces, Blue guards, Green goes direct, Yellow draws and Pink heals. Junction Commander switches the whole squad and Omniliner powers up with every change. Laid-back, quick-witted and always on time.",
    lines:{start:["Mind the gap, mate.","Right then. All aboard."],summon:["Next train's here.","On the platform!","Stand clear of the doors."],ace:["Omniliner, all lines, full power!","Railmask Prism Driver Omniliner, departing now!"],attack:["Full steam!","Express service!","Coming through!"],trap:["Emergency brake, mate."],hurt:["Oi! That's a delay."],win:["Arrived on time. Cheers."],lose:["...Right. Missed my train."]}},
  clement2:{name:"Clement – Trinity Titan",img:"clement2",race:GT,color:"#2ec4b6",theme:"Starborne Giant: a star-born titan of Earth, Sea & Sky",home:"rift_peaks",
    bio:"Same short black hair and big grin, but Clement now wears a navy patrol jacket with teal piping and holds a crystal capsule with three gems. He is the host of Aster, a star-born giant of charcoal and jade crystal-stone who channels the Earth, the Sea and the Sky.",
    quote:"Earth, Sea, Sky... lend me your power!",
    personality:"Three forms, one titan: Terra Form walls, Tide Form comes back from the GY, Gale Form flies over for direct hits, and Trinity Convergence fuses all three into the piercing Trinity Form. Trinity Horizon Burst clears the way. Cheerful, brave and never gives up.",
    lines:{start:["Earth, Sea, Sky... lend me your power!","Time to go big!"],summon:["Aster, a new form!","Here comes a giant!","Transform!"],ace:["Trinity Form, Aster, rise!","Starborne Giant Aster – Trinity Form, rise!"],attack:["Giant punch!","Horizon strike!","Take this!"],trap:["Planetary Barrier!"],hurt:["Ow! Even giants feel that."],win:["Mission complete! Back to the stars."],lose:["...Even giants need a rest."]}},
  uncleee:{name:"Uncle Ee",img:"uncleee",race:SK,color:"#f4a261",theme:"Sketch: drawings that come to life, ink & watercolour",home:"kopitiam",
    bio:"A friendly uncle in his late fifties with round wire glasses, salt-and-pepper hair, a pencil behind his ear and a canvas apron full of brushes. Everything he draws comes to life, from pencil sprites and charcoal tigers to Mobao, a rainbow-watercolour ink dragon that flows right off the paper.",
    quote:"Come, come, Uncle draw for you.",
    personality:"Recycled doodles: Scribbly, Watercolour Phoenix and Mobao keep bringing sketches back, Palette Spirit and the Colour Pencils pump the whole page, and Uncle Draw Also Can! inks a copy of the best monster on the field. Patient, warm and always cheerful.",
    lines:{start:["Come, come, Uncle draw for you.","Wait ah, let Uncle sharpen pencil first."],summon:["Draw one more!","Come out from the paper!","Nice or not?"],ace:["Mobao, come out from the paper!","Masterstroke Ink Dragon Mobao, come!"],attack:["Go, go!","Charge lah!","Swoosh!"],trap:["Aiyah, smudged already."],hurt:["Wah, so pain."],win:["See? Uncle draw also can."],lose:["Aiyah... never mind, draw again lah."]}}
};
for(const k in NEW15)CHARS[k]=NEW15[k];
if(typeof CHAR_ORDER!=="undefined"){for(const k in NEW15)if(!CHAR_ORDER.includes(k))CHAR_ORDER.push(k);
  const mv=(k,after)=>{const i=CHAR_ORDER.indexOf(k),j=CHAR_ORDER.indexOf(after);if(i<0||j<0)return;CHAR_ORDER.splice(i,1);CHAR_ORDER.splice(CHAR_ORDER.indexOf(after)+1,0,k);};
  mv("clement2","clement");}
if(typeof HOME!=="undefined")for(const k in NEW15)HOME[k]=NEW15[k].home;
/* "when destroyed" Special Summons never summon a copy of the destroyed card (same rule as data_new5.js / data_new10.js / data_v12.js) */
for(const id in CARDS){const c=CARDS[id];if(c.ch&&NEW15[c.ch]&&c.type==="monster"&&c.fx&&c.fx.onDestroy)[].concat(c.fx.onDestroy).forEach(f=>{if(/^ss/.test(f.k))f.notSelf=c.name;});}
/* card text for the new Line Change kind */
{const base=fxPhrase;fxPhrase=function(e){if(e&&!Array.isArray(e)&&e.k==="lineChange")return e.self?"choose this card's Line colour":e.n==="any"?"Line Change any number of Railmask monsters you control":"Line Change 1 Railmask monster you control";return base.apply(this,arguments);};}
window.NEW15=NEW15;
})();
/* ===== v9: one ace per duelist (art matched to each ace_<img>.mp4 clip) + THE DESTINY ===== */
const ACE_V9={kaito:["k_ace","k_oath","k_sunspear"],ryuga:["r_ace","r_eclipse","r_obsidian"],mira:["m_ace","m_reactor","m_titan"],sakura:["s_ace","s_grand","s_comet"],
  toma:["t_ace","t_kitsune","t_elk"],weiyao:["w_ace","w_prism","w_rising"],lily:["l_ace","l_seraph","l_unicorn"],weisheng:["v_ace","v_v12","v_monster"],
  keith:["c_ace","c_queen","c_tigress"],eryll:["g_ace","e_malvorn","e_varg"],kelvin:["n_ace","n_squad","n_ultra"],ben:["b_titan","b_warden","b_k9"],
  sabrina:["sb_ace","sb_queen","sb_dragon"],christopher:["cb_ace","cb_five","cb_headman"],lemon:["lm_ace","lm_boss","lm_burnout"],sixing:["sx_ace","sx_maestro","sx_peace"],
  clement:["cl_dragoon","cl_aurora","cl_valdris"],darkkelvin:["dk_ace","dk_countess","dk_storm"],jason:["js_ace","js_baron","js_slot"],
  shaim:["sh_ace","sh_golden","sh_crimson"],hisyam:["hf_ace","hf_king","hf_chief"],weiyao2:["wz_ace","wz_unit","wz_crown"],eunice:["eu_ace","eu_patissiere","eu_wedding"],
  kimberly:["km_ace","km_vera","km_leader"],aoiyuki:["ay_ace","ay_reaper","ay_conductor"]};
/* extra cards retired together with an ace (they only existed to summon it) */
const ACE_V9_ALSO={shaim:["sh_awaken"]};
const DECK_V8={};for(const ch in CHARS)DECK_V8[ch]=Object.assign({},defaultDeck(ch));
const RETIRED_V9=new Set();
for(const ch in ACE_V9){const [keep,drop]=ACE_V9[ch];RETIRED_V9.add(drop);for(const x of ACE_V9_ALSO[ch]||[])RETIRED_V9.add(x);}
for(const id of RETIRED_V9)if(CARDS[id])CARDS[id].retired=true;
{const baseSig=signature;signature=function(ch){return baseSig(ch).filter(id=>!CARDS[id].retired);};}
defaultDeck=function(ch){const d=Object.assign({},DECK_V8[ch]||{});const a=ACE_V9[ch];if(!a)return d;
  let n=0;for(const id of [a[1],...(ACE_V9_ALSO[ch]||[])])if(d[id]){n+=d[id];delete d[id];}
  if(n)d[a[2]]=(d[a[2]]||0)+n;return d;};
{const basePool=poolFor;poolFor=function(ch){return basePool(ch).filter(id=>!CARDS[id].retired&&!CARDS[id].token);};}
/* THE DESTINY: created only by Clement's Chronicles Link (never in a deck) */
M("cl_destiny","clement","THE DESTINY",10,"LIGHT","Mecha",4000,5000,"",{},"Dragon, magician and machine fused into one destiny-class frame. Its wings are made of pure light.");
CARDS.cl_destiny.extra=true;CARDS.cl_destiny.token=true;CARDS.cl_destiny.destiny=true;
const ART_DATA={"ay_ace":"assets/img/790cf261458f.webp","ay_bass":"assets/img/4b3431d37347.webp","ay_blades":"assets/img/27472347b4d2.webp","ay_call":"assets/img/9e614d4b4e46.webp","ay_chorus":"assets/img/716a85363c64.webp","ay_climax":"assets/img/33204181441f.webp","ay_conductor":"assets/img/193816cc245c.webp","ay_dancer":"assets/img/e002f52964e0.webp","ay_echo":"assets/img/795ab260953f.webp","ay_encore":"assets/img/b0d2b9d5a196.webp","ay_gunner":"assets/img/eeeabca4c308.webp","ay_howl":"assets/img/47ac8562e6d8.webp","ay_katana":"assets/img/6afa578b2d06.webp","ay_lights":"assets/img/6bcd5c06e9d5.webp","ay_note":"assets/img/4b319a9541f7.webp","ay_reaper":"assets/img/62cf63a8931e.webp","ay_saw":"assets/img/993c0e891ee6.webp","ay_scythe":"assets/img/e5359c3e6f90.webp","ay_unison":"assets/img/23a69b32b123.webp","b_arm":"assets/img/2bc14d43e835.webp","b_bay":"assets/img/4334a7f4ebe6.webp","b_cctv":"assets/img/3d84e0dfb3cf.webp","b_core":"assets/img/3e96c601be74.webp","b_duo":"assets/img/b72025b6d25d.webp","b_full":"assets/img/a116cfc93682.webp","b_grid":"assets/img/436545d0e607.webp","b_head":"assets/img/c0d2570336fc.webp","b_k9":"assets/img/d9d353469e8b.webp","b_leg":"assets/img/fccb651d2af1.webp","b_link":"assets/img/43cf3f89e53a.webp","b_lock":"assets/img/4d4c2a618957.webp","b_riot":"assets/img/4da1affcd2cb.webp","b_siren":"assets/img/3d07f6f9f6cd.webp","b_stun":"assets/img/96a0c7398545.webp","b_titan":"assets/img/77bf597cdcd4.webp","b_warden":"assets/img/3138571c9fe5.webp","c2_accord":"assets/img/2c3791b4f25f.webp","c2_ace":"assets/img/acf2ffd6424c.webp","c2_barrier":"assets/img/44d1a89744c2.webp","c2_beacon":"assets/img/4a8a6b9d5704.webp","c2_convergence":"assets/img/a6a766397c72.webp","c2_gale":"assets/img/0862260864a3.webp","c2_ray":"assets/img/fa1d034032a8.webp","c2_spark":"assets/img/f261f2c33fde.webp","c2_storm":"assets/img/f4e0594dd345.webp","c2_terra":"assets/img/4ce11bbe8814.webp","c2_tide":"assets/img/9952e679c763.webp","c_ace":"assets/img/e8684f614b17.webp","c_alley":"assets/img/437bfabda989.webp","c_box":"assets/img/6937e5306b75.webp","c_cafe":"assets/img/202772a95bdf.webp","c_calico":"assets/img/738b572bcbb5.webp","c_catnip":"assets/img/5335bfb02c9f.webp","c_feint":"assets/img/919b068a8f2c.webp","c_kitten":"assets/img/2d115b488f33.webp","c_lucky":"assets/img/933bfeed7417.webp","c_nine":"assets/img/c0a9fd463fef.webp","c_ninja":"assets/img/efb2647f18df.webp","c_purr":"assets/img/0cc195498bda.webp","c_queen":"assets/img/f6926b05e493.webp","c_tabby":"assets/img/457e4a786e5c.webp","c_tigress":"assets/img/d3537040fb13.webp","c_witch":"assets/img/c821931fe2c3.webp","c_yarn":"assets/img/e19a9be5f52d.webp","cb_ace":"assets/img/621bcdc4fa88.webp","cb_bojio":"assets/img/d98ee9398276.webp","cb_corner":"assets/img/dd167c49cee9.webp","cb_dabao":"assets/img/9b68157370cf.webp","cb_durian":"assets/img/e00b3368df6e.webp","cb_extragao":"assets/img/a978964100ee.webp","cb_fisher":"assets/img/3287a297ea86.webp","cb_five":"assets/img/e8c3880ec397.webp","cb_headman":"assets/img/702461ca56bd.webp","cb_karaoke":"assets/img/229f7f19e035.webp","cb_kid":"assets/img/c30d828512bb.webp","cb_kopi":"assets/img/857cb5542794.webp","cb_lorry":"assets/img/a5ded7dfda14.webp","cb_moto":"assets/img/603cf60df5a6.webp","cb_slipper":"assets/img/55940e096e5f.webp","cb_slipperthrow":"assets/img/da4298e4c750.webp","cb_uncle":"assets/img/b30c6eee6fe0.webp","cl_aurora":"assets/img/497e5aecb3e8.webp","cl_beamshield":"assets/img/d3ae545498ac.webp","cl_bit":"assets/img/49118c0da44e.webp","cl_celesta":"assets/img/cdbe998e0cc9.webp","cl_destiny":"assets/img/cf071017fe57.webp","cl_dragoon":"assets/img/3694dc6f352e.webp","cl_drake":"assets/img/4e3d10f072a4.webp","cl_kestrel":"assets/img/b09ffcce69ad.webp","cl_overdrive":"assets/img/ecf46b3dcb91.webp","cl_pipilu":"assets/img/b63501b8e628.webp","cl_rifle":"assets/img/f6145652bedf.webp","cl_ririka":"assets/img/c98224cb9ed9.webp","cl_shield":"assets/img/dfc7801a1623.webp","cl_soullink":"assets/img/7ce35af131ae.webp","cl_steed":"assets/img/f69d2f0369d5.webp","cl_teleport":"assets/img/3ab52b866698.webp","cl_union":"assets/img/54c08b66d5e2.webp","cl_valdris":"assets/img/aee22e99f154.webp","dk_ace":"assets/img/ba3b7e5c8a0a.webp","dk_choir":"assets/img/0e90084ccbdb.webp","dk_countess":"assets/img/e680e38989c2.webp","dk_diary":"assets/img/ae42fefa8413.webp","dk_drizzle":"assets/img/b40947e80a87.webp","dk_eyeliner":"assets/img/2354b3031ddd.webp","dk_letter":"assets/img/3d5be98a692b.webp","dk_playlist":"assets/img/1f6765eff6e0.webp","dk_rain":"assets/img/0a1eedb26428.webp","dk_raven":"assets/img/6f29f6882520.webp","dk_rose":"assets/img/3095d262ba1b.webp","dk_shatter":"assets/img/2960221c4d0b.webp","dk_sigh":"assets/img/615eacc1e4ac.webp","dk_storm":"assets/img/d015fd4c1945.webp","dk_tears":"assets/img/c3b0d552ec16.webp","dk_umbrella":"assets/img/04c2f5ce19ec.webp","dk_veil":"assets/img/6b3df0ae8556.webp","dk_violin":"assets/img/a11b9ae4f5be.webp","e2_ace":"assets/img/950d83db2fdc.webp","e2_ash":"assets/img/970a1037ce3a.webp","e2_bulwark":"assets/img/01963940ea3f.webp","e2_hatch":"assets/img/f0b2cf7b3e12.webp","e2_hydra":"assets/img/c638438f6b8d.webp","e2_pact":"assets/img/1c297998655d.webp","e2_scales":"assets/img/066b56226561.webp","e2_vharoth":"assets/img/939b39d2a48f.webp","e2_wyvern":"assets/img/40caf5422975.webp","e_acolyte":"assets/img/928e759be8e7.webp","e_armour":"assets/img/0d6386750b10.webp","e_fury":"assets/img/dac141f86cf9.webp","e_grasp":"assets/img/ce78910f7273.webp","e_gravecaller":"assets/img/998fdea22296.webp","e_hexblade":"assets/img/3bd5b3d13289.webp","e_kord":"assets/img/7dec37afeca9.webp","e_malvorn":"assets/img/3e5a9d7658de.webp","e_oath":"assets/img/35690a21d34e.webp","e_pact":"assets/img/40bb8d451fe7.webp","e_rally":"assets/img/f1407c15e0bb.webp","e_reaver":"assets/img/01f97bfedcb5.webp","e_revenant":"assets/img/3ca0664d0663.webp","e_squire":"assets/img/686ba7b66f43.webp","e_varg":"assets/img/99193a2a89cd.webp","e_warlord":"assets/img/2a5035764705.webp","e_wraith":"assets/img/b82d3fbb0d93.webp","eu_ace":"assets/img/48dee479985e.webp","eu_baker":"assets/img/181164d0fad6.webp","eu_bun":"assets/img/0f4ffe9bca83.webp","eu_cake":"assets/img/8c9afa32496d.webp","eu_cannon":"assets/img/17d18d85fa8b.webp","eu_croissant":"assets/img/6712ab27e9b2.webp","eu_crumb":"assets/img/96407ecc8f9d.webp","eu_dough":"assets/img/151d37dc03b9.webp","eu_flour":"assets/img/66b0caad5bf0.webp","eu_jam":"assets/img/d90d6225a531.webp","eu_oven":"assets/img/84730eea54d6.webp","eu_pastry":"assets/img/8198453835f1.webp","eu_patissiere":"assets/img/7c738b7467a8.webp","eu_rise":"assets/img/4bdcc117422f.webp","eu_rolling":"assets/img/12c5e529d180.webp","eu_sourdough":"assets/img/227eca476fc0.webp","eu_tea":"assets/img/71a91d14f38c.webp","eu_warm":"assets/img/d6a93e9c6999.webp","eu_wedding":"assets/img/63a3d0e0b852.webp","g_ace":"assets/img/7f2fb0fc5f2b.webp","gd_ace":"assets/img/6b83ab65b8b3.webp","gd_barricade":"assets/img/6297c0832da5.webp","gd_comeback":"assets/img/fd02d84494ac.webp","gd_fanchant":"assets/img/41c2a911a7f7.webp","gd_lightstick":"assets/img/922b9e68f2dc.webp","gd_manager":"assets/img/6d64e6f7c368.webp","gd_rapper":"assets/img/74c00906f1a9.webp","gd_trainee":"assets/img/46f3b8fd401a.webp","gd_visual":"assets/img/3b563fa3d6ad.webp","gd_vocal":"assets/img/76bf84100d0a.webp","hf_ace":"assets/img/672073bc4720.webp","hf_batter":"assets/img/a1e0b4230e68.webp","hf_bucket":"assets/img/b06681545b8b.webp","hf_chief":"assets/img/e84c549b9754.webp","hf_drum":"assets/img/ce2ec5f2b7e4.webp","hf_hen":"assets/img/dde8e30e03f3.webp","hf_king":"assets/img/d5b98467bd0c.webp","hf_lemongrass":"assets/img/49b2aaffabf6.webp","hf_nugget":"assets/img/4d8bcb8dc702.webp","hf_oil":"assets/img/50262357f738.webp","hf_refry":"assets/img/194e0544909e.webp","hf_sambal":"assets/img/5a42da3e9abb.webp","hf_sambalx":"assets/img/a306bd50ab70.webp","hf_spice":"assets/img/068d6bc44651.webp","hf_tapau":"assets/img/d85798cb827d.webp","hf_tongs":"assets/img/4d93ddbec609.webp","hf_wing":"assets/img/5f02464e3060.webp","hf_wok":"assets/img/5e4afca1a24d.webp","hp_ace":"assets/img/4d7df42892b5.webp","hp_brannoc":"assets/img/efc410d33394.webp","hp_gorran":"assets/img/2540feeba365.webp","hp_lyra":"assets/img/8aef90da8659.webp","hp_narwhal":"assets/img/bfbc71cda487.webp","hp_page":"assets/img/9cc1aa35608b.webp","hp_pinpoint":"assets/img/91c7cfdba66f.webp","hp_rapier":"assets/img/705b7729af09.webp","hp_wall":"assets/img/d2ab71295841.webp","jc_ace":"assets/img/c4582ebc2e86.webp","jc_brain":"assets/img/856931ed04e8.webp","jc_bunny":"assets/img/ba50c0aca476.webp","jc_goldfish":"assets/img/66f485ce06b7.webp","jc_golem":"assets/img/22b4927762fb.webp","jc_knight":"assets/img/62be31070a8c.webp","jc_penguin":"assets/img/5c9920ee12a5.webp","jc_trip":"assets/img/7b3cb4c3a7e5.webp","jm_ace":"assets/img/f888c0f788d9.webp","jm_blue":"assets/img/23d24b9bcf56.webp","jm_brake":"assets/img/efbcfa683bad.webp","jm_caboose":"assets/img/c87fede2073c.webp","jm_green":"assets/img/f5bd783ff06e.webp","jm_junction":"assets/img/6f77e2835a43.webp","jm_linechange":"assets/img/e4fada552158.webp","jm_network":"assets/img/8099fa452f23.webp","jm_pink":"assets/img/937d94fba700.webp","jm_red":"assets/img/12186f57887d.webp","jm_ticket":"assets/img/6b9368accb89.webp","jm_yellow":"assets/img/ebfe8e8ef354.webp","js_ace":"assets/img/c9370bd1b8c2.webp","js_advance":"assets/img/9d289efea51f.webp","js_atm":"assets/img/40e35a126443.webp","js_baron":"assets/img/2a9cd2a10371.webp","js_busker":"assets/img/aefced835db7.webp","js_collector":"assets/img/4ad3b04f0142.webp","js_dash":"assets/img/f7381e14eac6.webp","js_double":"assets/img/8ab90e660340.webp","js_flyer":"assets/img/4b39552a4260.webp","js_grind":"assets/img/5e0f356b570e.webp","js_loan":"assets/img/5ee6de747a13.webp","js_lottery":"assets/img/8649d44d04e3.webp","js_norefund":"assets/img/40d46bf7f114.webp","js_penny":"assets/img/225bf3ca788d.webp","js_piggy":"assets/img/3f9dc636ce50.webp","js_scratch":"assets/img/6e85600ac9d7.webp","js_slot":"assets/img/382fd810d376.webp","js_vending":"assets/img/57fce1eaa5e7.webp","k2_ace":"assets/img/6e0bfede6c24.webp","k2_atm":"assets/img/06d17704e482.webp","k2_black":"assets/img/bf04adbbad28.webp","k2_cashback":"assets/img/06d93adb17a4.webp","k2_coin":"assets/img/5e69ec02f927.webp","k2_goldbar":"assets/img/469e19136364.webp","k2_interest":"assets/img/96e692e855bd.webp","k2_interest_c":"assets/img/275e9ae2079a.webp","k2_nsf":"assets/img/71eb07e31de5.webp","k2_teller":"assets/img/892d54960995.webp","k_ace":"assets/img/e795045a51f4.webp","k_banner":"assets/img/59ac25864eee.webp","k_captain":"assets/img/83d370703392.webp","k_fencer":"assets/img/13cd35d69cd5.webp","k_flag":"assets/img/89ccdae877e9.webp","k_lancer":"assets/img/350eaf2c4dfa.webp","k_lion":"assets/img/3749d5d546a8.webp","k_oath":"assets/img/c45c81c8ba3c.webp","k_oathsword":"assets/img/cc6241f2ea15.webp","k_parry":"assets/img/0aba8d1824a4.webp","k_recruit":"assets/img/51e5483f905c.webp","k_riposte":"assets/img/cfbdce94a0e6.webp","k_shadow":"assets/img/3cc01c902d0c.webp","k_squire":"assets/img/988635ee0fa5.webp","k_sunspear":"assets/img/5be03572f530.webp","k_wall":"assets/img/3716fb45e326.webp","km_ace":"assets/img/c16bf0068185.webp","km_armor":"assets/img/1a7bee338981.webp","km_c_dragon":"assets/img/1eca12e08853.webp","km_c_idol":"assets/img/f6f1b284a66f.webp","km_c_mecha":"assets/img/fde2eb587f9b.webp","km_c_ninja":"assets/img/f6f19a90fcad.webp","km_c_pirate":"assets/img/a0b2e4288b47.webp","km_c_witch":"assets/img/e6a86d9657ef.webp","km_closet":"assets/img/8483e4eb4028.webp","km_judge":"assets/img/189f371a1698.webp","km_leader":"assets/img/fcad296f51c4.webp","km_mascot":"assets/img/12b3ed29937c.webp","km_pose":"assets/img/4173df1628a9.webp","km_propsmith":"assets/img/54e8f64907a0.webp","km_quick":"assets/img/23290d1ab7ed.webp","km_rookie":"assets/img/168c5af6ae3b.webp","km_runway":"assets/img/231c17019d53.webp","km_seamstress":"assets/img/103e4b5ab3c2.webp","km_shy":"assets/img/b4955102628d.webp","km_spot":"assets/img/46820879a6b9.webp","km_vera":"assets/img/599ab91da73f.webp","kn_ace":"assets/img/bfe8ac39ed93.webp","kn_bertram":"assets/img/cc1fe9b2b63d.webp","kn_curve":"assets/img/0ded05d51a2f.webp","kn_detention":"assets/img/e253404b42f7.webp","kn_grader":"assets/img/052a7f729b47.webp","kn_mei":"assets/img/db5e5d7f4e88.webp","kn_pixie":"assets/img/77ebe73bcf08.webp","kn_quiz":"assets/img/0bb5eab38f97.webp","kn_theodora":"assets/img/90d520144c77.webp","l2_ace":"assets/img/8e098e5e817e.webp","l2_buffet":"assets/img/c60c11c983a3.webp","l2_dnd":"assets/img/6d1bcb10d449.webp","l2_floatie":"assets/img/af7e716b22e9.webp","l2_lifeguard":"assets/img/00c61d08e21f.webp","l2_limbo":"assets/img/774fd350d95a.webp","l2_resort":"assets/img/745403ad8cd4.webp","l2_sunscreen":"assets/img/6d04165132e2.webp","l2_volley":"assets/img/c524a8db3624.webp","l2_wakeup":"assets/img/e62f06323609.webp","l_ace":"assets/img/9f5f654263ef.webp","l_angel":"assets/img/0b4fe16b79ee.webp","l_breeze":"assets/img/a77298d916e4.webp","l_bubble":"assets/img/2645e82101e8.webp","l_cloud":"assets/img/9565c4ec3bd3.webp","l_dust":"assets/img/03cca1b0f202.webp","l_moon":"assets/img/6909eb3e9245.webp","l_pixie":"assets/img/21124476ddc6.webp","l_rainbow":"assets/img/06f9e92d69f2.webp","l_ribbon":"assets/img/b3ad133a97dd.webp","l_ring":"assets/img/728ddc6ccdc2.webp","l_seraph":"assets/img/fa3da3822665.webp","l_sprite":"assets/img/bc6b00133270.webp","l_star":"assets/img/84eac1743e86.webp","l_unicorn":"assets/img/f98ab99cd082.webp","l_wish":"assets/img/425aaaeb4538.webp","lm_ace":"assets/img/7383c0204a38.webp","lm_boss":"assets/img/49b4dfc38a84.webp","lm_burnout":"assets/img/a251e1657e44.webp","lm_conflict":"assets/img/35ac1d33ad64.webp","lm_deadline":"assets/img/ad2dddf4ab7d.webp","lm_espresso":"assets/img/02f2ddd2fe5b.webp","lm_hr":"assets/img/ef27a85bd851.webp","lm_intern":"assets/img/402e9b06a14b.webp","lm_meeting":"assets/img/181dde15eabc.webp","lm_monday":"assets/img/45969e166b57.webp","lm_ooo":"assets/img/c5eecd24e4b7.webp","lm_overtime":"assets/img/a64013f37240.webp","lm_pivot":"assets/img/dfdf2786b1f4.webp","lm_printer":"assets/img/409179409f16.webp","lm_replyall":"assets/img/1a70ff261c72.webp","lm_teambuild":"assets/img/04257c014bc3.webp","lm_zombie":"assets/img/854ad70068ae.webp","m_ace":"assets/img/0b700c1e33fc.webp","m_assembler":"assets/img/7a2027adb98a.webp","m_clock":"assets/img/112313c8ea84.webp","m_core":"assets/img/5e89cb2589ee.webp","m_drone":"assets/img/02617338491c.webp","m_jet":"assets/img/cff07a17d6c2.webp","m_lancer":"assets/img/39777575df70.webp","m_nano":"assets/img/3c10feea72af.webp","m_overload":"assets/img/7eba4c213e6f.webp","m_reactor":"assets/img/241b4175e736.webp","m_reboot":"assets/img/e664115e5373.webp","m_recall":"assets/img/5bea651449ad.webp","m_soldier":"assets/img/caee51350116.webp","m_tank":"assets/img/0e85a49af32d.webp","m_titan":"assets/img/8450445962d4.webp","m_turret":"assets/img/34a00d23fd3b.webp","m_welder":"assets/img/560ff800f96a.webp","n_ace":"assets/img/4c5013b53ddc.webp","n_anchor":"assets/img/8398db4884ba.webp","n_baton":"assets/img/a637eb6c8352.webp","n_cheetah":"assets/img/a67ee8fb2306.webp","n_coach":"assets/img/7fd55fcf6d04.webp","n_false":"assets/img/1625de5f2bb9.webp","n_hurdler":"assets/img/47094660baf8.webp","n_jogger":"assets/img/abd739203333.webp","n_marathon":"assets/img/e87584b8658e.webp","n_pacer":"assets/img/949830ac36dc.webp","n_second":"assets/img/492e5ec0d3f9.webp","n_spikes":"assets/img/9c769261a646.webp","n_sprinter":"assets/img/fcc6c7120e57.webp","n_squad":"assets/img/f36ef71d95dd.webp","n_steeple":"assets/img/7479f43d11a8.webp","n_stretch":"assets/img/6f1170b5528c.webp","n_ultra":"assets/img/d42a8ca4a089.webp","n_wind":"assets/img/46e9c4a497d6.webp","r_ace":"assets/img/0bfd2d2ebba6.webp","r_barrier":"assets/img/b44603ad2420.webp","r_breath":"assets/img/c3f1e01bf639.webp","r_drake":"assets/img/067715cb7c33.webp","r_eclipse":"assets/img/ae33b97eec2d.webp","r_egg":"assets/img/ddaf883b1ec0.webp","r_elder":"assets/img/4686d450c458.webp","r_glide":"assets/img/43b3fda69ed6.webp","r_molten":"assets/img/f54240a90ec7.webp","r_obsidian":"assets/img/39e28e9aec23.webp","r_roar":"assets/img/43c90ff78d09.webp","r_roost":"assets/img/e65dcc15a248.webp","r_talon":"assets/img/c454fe8bb38d.webp","r_thunder":"assets/img/4738edd93acf.webp","r_wyrmling":"assets/img/c9b6c4bd715a.webp","r_wyvern":"assets/img/cbe977a47092.webp","s_ace":"assets/img/0a6a124100a3.webp","s_acolyte":"assets/img/5d11eedf116e.webp","s_apprentice":"assets/img/052fadfb342a.webp","s_archmage":"assets/img/2a4e1db79514.webp","s_banish":"assets/img/f5cc9e381ea3.webp","s_comet":"assets/img/f6644efeec12.webp","s_grand":"assets/img/877fe86e15f9.webp","s_hexer":"assets/img/a4703be50c7f.webp","s_illusion":"assets/img/4f966950a37c.webp","s_mirror":"assets/img/62ce6881a3f8.webp","s_rebound":"assets/img/ef8df30fa34d.webp","s_ritual":"assets/img/6606043849d5.webp","s_sage":"assets/img/a04f1f80301a.webp","s_tower":"assets/img/12983e96e2ad.webp","s_weaver":"assets/img/259fad17b02a.webp","s_witch":"assets/img/9a5ab2e0cc51.webp","sb_ace":"assets/img/4a36cb1abe53.webp","sb_bun":"assets/img/c5fd2c2ac3f3.webp","sb_candy":"assets/img/a57a6e007df7.webp","sb_dino":"assets/img/019fced86e08.webp","sb_dragon":"assets/img/28fe0507acb2.webp","sb_hug":"assets/img/402f344352a0.webp","sb_knight":"assets/img/ecb60d463cad.webp","sb_ninja":"assets/img/9d210cda054a.webp","sb_party":"assets/img/b254ca087ee5.webp","sb_popup":"assets/img/12ec8fe124f3.webp","sb_princess":"assets/img/1ccad6bce2df.webp","sb_queen":"assets/img/b45c275b30c1.webp","sb_robo":"assets/img/59055a0de964.webp","sb_star":"assets/img/2ff1737f8af5.webp","sb_teddy":"assets/img/468e50e70502.webp","sb_toybox":"assets/img/4b0c2bbd6a6d.webp","sb_witch":"assets/img/9b7fb148fbff.webp","sh_ace":"assets/img/be948dba2dbc.webp","sh_awaken":"assets/img/30cd514a9df6.webp","sh_blaster":"assets/img/e66718569d4e.webp","sh_cloud":"assets/img/99fc4827ab1c.webp","sh_crimson":"assets/img/a98f8239ff90.webp","sh_dancer":"assets/img/6cab957fa077.webp","sh_dodge":"assets/img/f144d36d2864.webp","sh_golden":"assets/img/ee6e562a539c.webp","sh_gravity":"assets/img/f7dac570a8ea.webp","sh_monk":"assets/img/6d20f3e1a636.webp","sh_pupil":"assets/img/fc357fd36573.webp","sh_raiko":"assets/img/048afafce83f.webp","sh_rival":"assets/img/97f5502a758c.webp","sh_sage":"assets/img/2c579c72f8a2.webp","sh_shout":"assets/img/6088cf8f7eca.webp","sh_spirit":"assets/img/44d247893a47.webp","sh_wave":"assets/img/f34cbc5c93d1.webp","sh_weights":"assets/img/f054d3993762.webp","sv_ace":"assets/img/8bf730886ffb.webp","sv_alonzo":"assets/img/b5ba326bbef8.webp","sv_brick":"assets/img/7311330096ba.webp","sv_dex":"assets/img/feb4074799c0.webp","sv_nottype":"assets/img/e74a1bd3df2b.webp","sv_rehearsal":"assets/img/a095c358d248.webp","sv_rio":"assets/img/d374d8e06cd5.webp","sv_valentin":"assets/img/ae0381e6a01d.webp","sx_ace":"assets/img/978e92411488.webp","sx_applause":"assets/img/1acb5f4a06a4.webp","sx_circle":"assets/img/75792a018cf0.webp","sx_fingerspell":"assets/img/443c1896e9c5.webp","sx_fist":"assets/img/1740b08c35f0.webp","sx_heart":"assets/img/0f5438b2dd7e.webp","sx_highfive":"assets/img/40c1f3393e65.webp","sx_hush":"assets/img/c1e878617a8a.webp","sx_maestro":"assets/img/143d1d90494a.webp","sx_mur":"assets/img/27eae91ce41d.webp","sx_ok":"assets/img/821af6b36577.webp","sx_palm":"assets/img/f6000f12b2c5.webp","sx_peace":"assets/img/13f8e36cd77e.webp","sx_point":"assets/img/d15936f09286.webp","sx_stop":"assets/img/111ced0184d1.webp","sx_thumb":"assets/img/ce9a4a17921e.webp","sx_wave":"assets/img/861f3b3ad176.webp","t_ace":"assets/img/1df5f42e57b9.webp","t_ambush":"assets/img/10452acc4c2a.webp","t_bear":"assets/img/6efc122b6300.webp","t_boar":"assets/img/444e055fb31e.webp","t_bramble":"assets/img/c770bc5af136.webp","t_call":"assets/img/fcbc89d5ecc5.webp","t_elk":"assets/img/934317578ffa.webp","t_fox":"assets/img/03b4e989f865.webp","t_hare":"assets/img/d3b27b856ac7.webp","t_kitsune":"assets/img/732697816ceb.webp","t_owl":"assets/img/1cf97ca32524.webp","t_pup":"assets/img/8158e8ec8e1c.webp","t_sanctuary":"assets/img/6627938bbba4.webp","t_squirrel":"assets/img/1221bb923411.webp","t_tiger":"assets/img/2130ec40fcac.webp","t_wolf":"assets/img/cbd5c57f8b86.webp","ue_ace":"assets/img/fae9b63ece9b.webp","ue_crane":"assets/img/ad6c39f10e68.webp","ue_inkcopy":"assets/img/7c296d3b6e0f.webp","ue_koi":"assets/img/95a73ffa086d.webp","ue_life":"assets/img/f17fc4a92061.webp","ue_palette":"assets/img/c3b95f795f34.webp","ue_pencils":"assets/img/47e0ec85d1a2.webp","ue_phoenix":"assets/img/74cb772b5ae8.webp","ue_quick":"assets/img/e28eaa69d0c9.webp","ue_rubbo":"assets/img/9015288f95e0.webp","ue_scribbly":"assets/img/571a5a6d190f.webp","ue_smudge":"assets/img/a3d397c765f4.webp","ue_tiger":"assets/img/2386e491e978.webp","v_ace":"assets/img/3cd0ab55b2e3.webp","v_bike":"assets/img/7cd77ba88daa.webp","v_brake":"assets/img/087636a5cde7.webp","v_buggy":"assets/img/cc6a6e02fceb.webp","v_cab":"assets/img/744117dbaef9.webp","v_coupe":"assets/img/a165919dd777.webp","v_crash":"assets/img/fb1b7713ca36.webp","v_gt":"assets/img/d7396de92469.webp","v_hauler":"assets/img/6e78cd871503.webp","v_lights":"assets/img/1b79518bc5b8.webp","v_monster":"assets/img/7677a876126a.webp","v_nitro":"assets/img/d750800202ae.webp","v_patrol":"assets/img/9d43282ffc5d.webp","v_pickup":"assets/img/98e02c04be70.webp","v_racer":"assets/img/b046860cef12.webp","v_tune":"assets/img/183771df063b.webp","v_v12":"assets/img/c5544ec73cfe.webp","v_van":"assets/img/a5b3b8c06a28.webp","w2_ace":"assets/img/05bfe16c9ae9.webp","w2_drs":"assets/img/f2964fa08215.webp","w2_hybrid":"assets/img/d77e69e57f35.webp","w2_pole":"assets/img/61196f50709c.webp","w2_redflag":"assets/img/b05046e9e9a7.webp","w2_rookie":"assets/img/d2ca20bab1be.webp","w2_safety":"assets/img/72c3c72c7984.webp","w2_silver":"assets/img/da41b5e11a6f.webp","w2_slip":"assets/img/f9b8c9f2974b.webp","w2_strategist":"assets/img/23e1bc9cc10e.webp","w2_wheelman":"assets/img/3b5aa2f07aae.webp","w_ace":"assets/img/08dfba9f8b59.webp","w_cheer":"assets/img/1b83d2dba980.webp","w_dancer":"assets/img/1a05baae763c.webp","w_diva":"assets/img/4f3905c7967a.webp","w_drum":"assets/img/f9a075885f02.webp","w_duo":"assets/img/bb4d268422fc.webp","w_encore":"assets/img/6d8af98fba33.webp","w_glow":"assets/img/9ce0438c8a6d.webp","w_mascot":"assets/img/5fa10e20aa29.webp","w_prism":"assets/img/cd5ff189fc5c.webp","w_rising":"assets/img/10793c6cc27d.webp","w_rock":"assets/img/a3e1ba68a7b9.webp","w_shy":"assets/img/8b5562092b10.webp","w_songstress":"assets/img/0f881df1602c.webp","w_spot":"assets/img/190c14e53f23.webp","w_trainee":"assets/img/62780f693107.webp","w_wall":"assets/img/9c2d208c8744.webp","wz_ace":"assets/img/a6e203048cfd.webp","wz_cheer":"assets/img/f4f1c6c31c48.webp","wz_closer":"assets/img/aa7792f518e4.webp","wz_comeback":"assets/img/8d1e913367e5.webp","wz_crown":"assets/img/4319f8f86d19.webp","wz_foal":"assets/img/1e18bcedc84a.webp","wz_gate":"assets/img/638344eaf4be.webp","wz_live":"assets/img/990c3fb870f4.webp","wz_pace":"assets/img/36b3937a95a8.webp","wz_photo":"assets/img/ef16843818c2.webp","wz_restart":"assets/img/36fb2d1dbaaa.webp","wz_rival":"assets/img/bd07a8a3184e.webp","wz_singer":"assets/img/4e46524a3fed.webp","wz_sprint":"assets/img/3de45006b7b6.webp","wz_spurt":"assets/img/a09a816077e1.webp","wz_stayer":"assets/img/f23721b1a3ca.webp","wz_step":"assets/img/e4db37fffad3.webp","wz_unit":"assets/img/404abe69a8e9.webp","x_aegis":"assets/img/03c5d2ecc9d4.webp","x_blade":"assets/img/759f22b17c9b.webp","x_flash":"assets/img/26c147be7096.webp","x_gust":"assets/img/187dd5e9ba21.webp","x_hex":"assets/img/a829164fb730.webp","x_mend":"assets/img/1f9a24fa6eac.webp","x_meteor":"assets/img/c633e6c89f4a.webp","x_oracle":"assets/img/c3c3bde409ca.webp","x_revive":"assets/img/4e81450f85c0.webp","x_seal":"assets/img/30df4e718f14.webp","x_sigil":"assets/img/884cc29f581b.webp","x_smite":"assets/img/388954b208a6.webp","x_spark":"assets/img/71234f1f4314.webp","x_storm":"assets/img/791e2af1b2f2.webp","x_thorn":"assets/img/0f978bc6ad26.webp","x_veil":"assets/img/99ebc9ebf9a0.webp"};
const EXPR_DATA={"aoiyuki_hurt":"assets/img/b1b6e1290223.webp","aoiyuki_point":"assets/img/90c27798fa73.webp","aoiyuki_talk":"assets/img/48bf3a9e6cec.webp","aoiyuki_win":"assets/img/0222a33bf06e.webp","ben_hurt":"assets/img/6dcd1b387835.webp","ben_point":"assets/img/761343e98fc8.webp","ben_talk":"assets/img/355b0aca355e.webp","ben_win":"assets/img/c7fb627e98c3.webp","christopher_hurt":"assets/img/604c498bfd16.webp","christopher_point":"assets/img/0e734f8ea0d8.webp","christopher_talk":"assets/img/1cbee1755eec.webp","christopher_win":"assets/img/2269a128cd3f.webp","clement_hurt":"assets/img/7cdd2614daac.webp","clement_point":"assets/img/196fe112310e.webp","clement_talk":"assets/img/0904162ea7ed.webp","clement_win":"assets/img/f8c7c34848da.webp","darkkelvin_hurt":"assets/img/9b87d2d27280.webp","darkkelvin_point":"assets/img/e00d80390c48.webp","darkkelvin_talk":"assets/img/98df11f70d9c.webp","darkkelvin_win":"assets/img/d2f51b48e315.webp","eryll_hurt":"assets/img/abce4c716c56.webp","eryll_point":"assets/img/2fa208b573f6.webp","eryll_talk":"assets/img/9f616e26a5c2.webp","eryll_win":"assets/img/b4c7748ad413.webp","eunice_hurt":"assets/img/86be47d94182.webp","eunice_point":"assets/img/0fc0e54a3e62.webp","eunice_talk":"assets/img/35607eef1a82.webp","eunice_win":"assets/img/da242319e46d.webp","hero_hurt":"assets/img/56dd35be631b.webp","hero_point":"assets/img/867c9de0d7aa.webp","hero_talk":"assets/img/fb170ff4dc49.webp","hero_win":"assets/img/36c969610971.webp","hisyam_hurt":"assets/img/072451e6d8ce.webp","hisyam_point":"assets/img/df79c98619fd.webp","hisyam_talk":"assets/img/913368c8f674.webp","hisyam_win":"assets/img/a2a81826388f.webp","jason_hurt":"assets/img/61cdf618ccf0.webp","jason_point":"assets/img/f9044058a601.webp","jason_talk":"assets/img/4d7ef306d6c9.webp","jason_win":"assets/img/95b89e1c18cf.webp","keith_hurt":"assets/img/eb412bc1cc87.webp","keith_point":"assets/img/58dc804e0b26.webp","keith_talk":"assets/img/18f80dc02447.webp","keith_win":"assets/img/66c890227c7d.webp","kelvin_hurt":"assets/img/ff6a39fb2ce1.webp","kelvin_point":"assets/img/11fa90ec2ffb.webp","kelvin_talk":"assets/img/c5692a8365ac.webp","kelvin_win":"assets/img/2e2a0ae8cae0.webp","kimberly_hurt":"assets/img/d7d1e3e4d38a.webp","kimberly_point":"assets/img/d0341c0d01a2.webp","kimberly_talk":"assets/img/95d8929d3a54.webp","kimberly_win":"assets/img/5e37d8c2161d.webp","lemon_hurt":"assets/img/6657db48f340.webp","lemon_point":"assets/img/b488af144849.webp","lemon_talk":"assets/img/1c400e7bf01a.webp","lemon_win":"assets/img/23e2f6d92a39.webp","lily_hurt":"assets/img/e981f14e8bbe.webp","lily_point":"assets/img/775decb84ddb.webp","lily_talk":"assets/img/e031f8a94959.webp","lily_win":"assets/img/c55df40a0856.webp","mira_hurt":"assets/img/a478e60a4927.webp","mira_point":"assets/img/a8bff8990d1f.webp","mira_talk":"assets/img/8bdec4a5f00b.webp","mira_win":"assets/img/e845ebe39471.webp","player_hurt":"assets/img/5740109187d5.webp","player_point":"assets/img/c854836d48d0.webp","player_talk":"assets/img/50c7dd5674e9.webp","player_win":"assets/img/04ccf05343db.webp","ryuga_hurt":"assets/img/63fb992847f5.webp","ryuga_point":"assets/img/2c22e56ef73b.webp","ryuga_talk":"assets/img/a68afe50d9ff.webp","ryuga_win":"assets/img/68bdef905ee2.webp","sabrina_hurt":"assets/img/9c0aeec78804.webp","sabrina_point":"assets/img/37a0555880c8.webp","sabrina_talk":"assets/img/e22335283cd8.webp","sabrina_win":"assets/img/df9694bc9167.webp","sakura_hurt":"assets/img/db41bb0e7f74.webp","sakura_point":"assets/img/c1d73d2672ac.webp","sakura_talk":"assets/img/a094376525a9.webp","sakura_win":"assets/img/238781da6c9b.webp","shaim_hurt":"assets/img/686821581953.webp","shaim_point":"assets/img/987235ecdb2b.webp","shaim_talk":"assets/img/063d3680e00c.webp","shaim_win":"assets/img/10371ddedb33.webp","sixing_hurt":"assets/img/667fb8ab3607.webp","sixing_point":"assets/img/fff8019a47ba.webp","sixing_talk":"assets/img/cb2e2dbcdd5d.webp","sixing_win":"assets/img/52c1039ec4a2.webp","toma_hurt":"assets/img/0bed365313eb.webp","toma_point":"assets/img/b34187ced738.webp","toma_talk":"assets/img/f6c62aea27f6.webp","toma_win":"assets/img/37d01b9ce5a7.webp","weisheng_hurt":"assets/img/4f782980a49b.webp","weisheng_point":"assets/img/aeb9bae1544b.webp","weisheng_talk":"assets/img/ffbc73919376.webp","weisheng_win":"assets/img/c0aa9aaa7b8f.webp","weiyao2_hurt":"assets/img/5f5057483c45.webp","weiyao2_point":"assets/img/bc4b5ebddd51.webp","weiyao2_talk":"assets/img/4b82f10fc6e8.webp","weiyao2_win":"assets/img/a1cd44d86938.webp","weiyao_hurt":"assets/img/c59e397e078a.webp","weiyao_point":"assets/img/34ce5b85e1f0.webp","weiyao_talk":"assets/img/4839eeec524e.webp","weiyao_win":"assets/img/d11122def006.webp"};
const POSTER_DATA={"ace_aoiyuki":"assets/img/f8d7e165a7f6.webp","ace_ben":"assets/img/f558dd26a923.webp","ace_christopher":"assets/img/94748b14f7da.webp","ace_clement":"assets/img/b0c0ae69c794.webp","ace_clement2":"assets/img/daa4e482182e.webp","ace_darkkelvin":"assets/img/6566c6a0bb63.webp","ace_eryll":"assets/img/4593f41e7b50.webp","ace_eryll2":"assets/img/629c1b980359.webp","ace_eunice":"assets/img/50c439368c77.webp","ace_gdragon":"assets/img/95a8f5b29c8d.webp","ace_hero":"assets/img/d1baaf8ad100.webp","ace_hisyam":"assets/img/e90d675c4b6c.webp","ace_huiping":"assets/img/1dd42abd5d33.webp","ace_james":"assets/img/6d858c5870f1.webp","ace_jason":"assets/img/26cd230016d4.webp","ace_jocelyn":"assets/img/a8e27161dca6.webp","ace_keith":"assets/img/690007a2d84a.webp","ace_keith2":"assets/img/84a2f329d8a1.webp","ace_kelvin":"assets/img/a675754d8b73.webp","ace_kenneth":"assets/img/7067bf222164.webp","ace_kimberly":"assets/img/a5fa56fc9e19.webp","ace_lemon":"assets/img/dc824a6b1eb2.webp","ace_lemon2":"assets/img/9d5606386e0e.webp","ace_lily":"assets/img/ae3ed23cb93c.webp","ace_mira":"assets/img/db7cec7655de.webp","ace_player":"assets/img/b06e63797dc6.webp","ace_ryuga":"assets/img/9478008f2751.webp","ace_sabrina":"assets/img/aa436ee5f526.webp","ace_sakura":"assets/img/599b7e69f662.webp","ace_shaim":"assets/img/d30d6a833779.webp","ace_sixing":"assets/img/318fda7e6cd4.webp","ace_sliver":"assets/img/53f1556bf1df.webp","ace_toma":"assets/img/a84b1e7ad375.webp","ace_uncleee":"assets/img/66f0b879d605.webp","ace_weisheng":"assets/img/94f4b22d16fd.webp","ace_weisheng2":"assets/img/2e20feefd976.webp","ace_weiyao":"assets/img/3b31c9aa2b12.webp","ace_weiyao2":"assets/img/a2198a7923b6.webp","win_aoiyuki":"assets/img/64e14d0cdafa.webp","win_ben":"assets/img/cb96df63bbd0.webp","win_christopher":"assets/img/550cafb82722.webp","win_clement":"assets/img/828789d9dea9.webp","win_darkkelvin":"assets/img/a954b6543958.webp","win_eryll":"assets/img/82aab4055462.webp","win_eunice":"assets/img/cf547855b96b.webp","win_hero":"assets/img/9fa0037baf31.webp","win_hisyam":"assets/img/ab72e56ed8dd.webp","win_jason":"assets/img/549901e04797.webp","win_keith":"assets/img/f9ff97a10343.webp","win_kelvin":"assets/img/a4fa9c04a146.webp","win_kimberly":"assets/img/9307d62dc5e5.webp","win_lemon":"assets/img/7c2facc38a36.webp","win_lily":"assets/img/002f297d9597.webp","win_mira":"assets/img/e5111180b29d.webp","win_player":"assets/img/e0080b98da02.webp","win_ryuga":"assets/img/6ec1b59c6155.webp","win_sabrina":"assets/img/40415f5c8c7c.webp","win_sakura":"assets/img/3ac4e6e6729a.webp","win_shaim":"assets/img/17428e6df62b.webp","win_sixing":"assets/img/7cc5a7475e56.webp","win_toma":"assets/img/ad2428b1cc04.webp","win_weisheng":"assets/img/e377901fa9a4.webp","win_weiyao":"assets/img/945797198269.webp","win_weiyao2":"assets/img/49cfa7c0fda1.webp"};
/* ================= v3: CARD ART · EXPRESSIONS · CLIPS ================= */
const ASSET="assets/";const ART_BAD={};const EXPR_BAD={};const CLIP_BAD={};
const V3={clips:true,clipSeen:{},exprT:{player:null,enemy:null},flapT:{player:null,enemy:null},mode:{player:null,enemy:null},lock:{player:false,enemy:false}};
function artSrc(id){return (typeof ART_DATA!=="undefined"&&ART_DATA[id])||ASSET+"art/"+id+".webp";}
function posterSrc(k){return (typeof POSTER_DATA!=="undefined"&&POSTER_DATA[k])||"";}
/* probe once whether external videos are reachable (single request; avoids error spam) */
const VID={state:null,wait:[]};
function probeVideo(){if(VID.state)return;VID.state="probing";const v=document.createElement("video");v.muted=true;v.preload="metadata";
  const done=ok=>{if(VID.state!=="probing")return;VID.state=ok?"ok":"bad";clearTimeout(t);v.onloadedmetadata=v.onerror=null;try{v.removeAttribute("src");v.load();}catch(e){}VID.wait.splice(0).forEach(f=>f());};
  const t=setTimeout(()=>done(false),3000);v.onloadedmetadata=()=>done(true);v.onerror=()=>done(false);v.src=ASSET+"video/ace_hero.mp4";}
function videoReady(){return new Promise(r=>{if(VID.state==="ok"||VID.state==="bad")return r(VID.state==="ok");probeVideo();VID.wait.push(()=>r(VID.state==="ok"));});}

function artImg(c){return c&&c.id&&!ART_BAD[c.id]?`<img class="cimg" src="${artSrc(c.id)}" alt="" draggable="false" decoding="async" onerror="artErr(this,'${c.id}')">`:"";}
function artErr(el,id){ART_BAD[id]=1;if(el&&el.parentNode)el.parentNode.removeChild(el);}
const EXPRS=["talk","point","hurt","win"];
function exprSrc(img,x){if(!x)return PORTRAITS[img];const k=img+"_"+x;return (typeof EXPR_DATA!=="undefined"&&EXPR_DATA[k])||ASSET+"expr/"+k+".webp";}
function preloadExpr(img){for(const x of EXPRS){const k=img+"_"+x;if(EXPR_BAD[k]||(typeof EXPR_DATA!=="undefined"&&EXPR_DATA[k]))continue;const i=new Image();i.onerror=()=>{EXPR_BAD[k]=1;};i.src=exprSrc(img,x);}}
function portHTML(s){const img=CHARS[S(s).char].img;
  return `<div class="dport ${s}" id="port-${s}" data-img="${img}" style="--c:${CHARS[S(s).char].color}"><div class="bob"><img class="pbase" src="${PORTRAITS[img]}" alt=""><img class="pover" alt="" style="opacity:0"></div><div class="exprtag"></div></div>`;}
function ensurePorts(){for(const s of ["player","enemy"]){const host=$("#duel-"+s);if(!host)continue;
  let p=host.querySelector(".dport");const img=CHARS[S(s).char].img;
  if(!p||p.dataset.img!==img){host.innerHTML=portHTML(s)+`<div class="dinfo"></div>`;preloadExpr(img);
    const ov=host.querySelector(".pover");ov.onerror=()=>{const k=ov.dataset.k;if(k)EXPR_BAD[k]=1;ov.style.opacity=0;};}}}
function portEls(s){const p=$("#port-"+s);return p?{p,ov:p.querySelector(".pover"),tag:p.querySelector(".exprtag")}:null;}
function curExpr(s){return V3.mode[s];}
function showOver(s,x,instant){const e=portEls(s);if(!e)return false;const img=e.p.dataset.img,k=img+"_"+x;
  if(EXPR_BAD[k])return false;
  if(e.ov.dataset.k!==k){e.ov.dataset.k=k;e.ov.src=exprSrc(img,x);}
  e.ov.style.transition=instant?"none":"opacity .18s ease";e.ov.style.opacity=1;e.p.dataset.expr=x;return true;}
function hideOver(s,instant){const e=portEls(s);if(!e)return;e.ov.style.transition=instant?"none":"opacity .22s ease";e.ov.style.opacity=0;e.p.dataset.expr="neutral";}
function stopFlap(s){if(V3.flapT[s]){clearInterval(V3.flapT[s]);V3.flapT[s]=null;}}
/* set a held expression (point/hurt/win). hold=0 means keep until reset */
function exprSet(s,x,hold){if(!G||!portEls(s))return;if(V3.lock[s]&&x!=="win"&&x!=="hurt")return;
  stopFlap(s);clearTimeout(V3.exprT[s]);V3.mode[s]=x;
  if(!showOver(s,x,false)){V3.mode[s]=null;return;}
  const e=portEls(s);if(e){e.p.classList.remove("jolt","pop");void e.p.offsetWidth;e.p.classList.add(x==="hurt"?"jolt":"pop");}
  if(hold)V3.exprT[s]=setTimeout(()=>{if(V3.mode[s]===x){V3.mode[s]=null;hideOver(s,false);}},hold);
  else V3.lock[s]=true;}
/* mouth flap during speech: alternate neutral/talk at ~7 fps */
function exprTalk(s,ms){if(!G||!portEls(s))return;const m=V3.mode[s];if(m==="hurt"||m==="win"||m==="point")return;
  const img=portEls(s).p.dataset.img;if(EXPR_BAD[img+"_talk"])return;
  stopFlap(s);clearTimeout(V3.exprT[s]);V3.mode[s]="talk";let open=false;
  const tick=()=>{open=!open;if(open)showOver(s,"talk",true);else hideOver(s,true);};tick();
  V3.flapT[s]=setInterval(tick,140);
  V3.exprT[s]=setTimeout(()=>{stopFlap(s);if(V3.mode[s]==="talk"){V3.mode[s]=null;hideOver(s,true);}},ms);}
function exprReset(){for(const s of ["player","enemy"]){stopFlap(s);clearTimeout(V3.exprT[s]);V3.mode[s]=null;V3.lock[s]=false;}}
/* ---------- video clips ---------- */
function clipKey(kind,s){return kind+"_"+CHARS[S(s).char].img;}
function clipClose(){const v=$("#vclip");if(v&&v._fin)v._fin();}
async function playClip(key,label){const vok=await videoReady();
  return new Promise(res=>{const L=$("#vclip");if(!L){res(false);return;}const P=posterSrc(key);
    if(!vok||CLIP_BAD[key]){if(!P){res(false);return;}
      L.innerHTML=`<div class="vbg"></div><img class="vstill kb" alt="" src="${P}"><div class="vlabel">${label||""}</div><div class="skip">Click to skip ▶</div>`;
      let ok=false;const end=()=>{if(ok)return;ok=true;L._fin=null;L.classList.remove("on");L.innerHTML="";res(false);};
      L._fin=end;L.onclick=end;L.classList.add("on");setTimeout(end,1300*Math.max(.3,SPEED));return;}
    const gid=GID;let done=false,tm=null,lt=null;
    L.innerHTML=`<div class="vbg"></div><video playsinline preload="auto" poster="${P}"></video><img class="vstill" alt=""><div class="vlabel">${label||""}</div><div class="skip">Click to skip ▶</div>`;
    const v=L.querySelector("video"),still=L.querySelector(".vstill");
    const fin=ok=>{if(done)return;done=true;clearTimeout(tm);clearTimeout(lt);L._fin=null;try{v.pause();v.removeAttribute("src");v.load();}catch(e){}
      L.classList.remove("on");L.innerHTML="";res(ok!==false);};
    L._fin=()=>fin(true);L.onclick=()=>fin(true);L.classList.add("on");
    const fallback=()=>{CLIP_BAD[key]=1;v.style.display="none";if(!P){fin(false);return;}still.src=P;still.classList.add("kb");
      clearTimeout(tm);tm=setTimeout(()=>fin(false),1400*Math.max(.3,SPEED));};
    v.onerror=fallback;v.onended=()=>fin(true);
    v.oncanplay=()=>clearTimeout(lt);
    lt=setTimeout(()=>{if(v.readyState<2)fallback();},3500);
    v.src=`${ASSET}video/${key}.mp4`;v.volume=.6;
    const p=v.play();if(p&&p.catch)p.catch(()=>{v.muted=true;v.play().catch(()=>{});});
    tm=setTimeout(()=>fin(true),9000);
    const chk=setInterval(()=>{if(done){clearInterval(chk);return;}if(gid!==GID){clearInterval(chk);fin(false);}},200);});}
async function aceClip(s){if(!V3.clips||!G||SPEED<0.5)return;const key=clipKey("ace",s);if(V3.clipSeen[key])return;V3.clipSeen[key]=1;
  await playClip(key,`${S(s).name.toUpperCase()} CALLS THE ACE!`);}
function winVideoHTML(wch){const img=CHARS[wch].img,key="win_"+img;const still=EXPR_BAD[img+"_win"]?PORTRAITS[img]:exprSrc(img,"win");
  if(CLIP_BAD[key]||!V3.clips||VID.state!=="ok")return `<img src="${still}" alt="" onerror="this.src=PORTRAITS['${img}']">`;
  return `<img class="opstill" src="${still}" alt="" onerror="this.src=PORTRAITS['${img}']"><video class="opvid" autoplay playsinline preload="auto" poster="${posterSrc(key)}" src="${ASSET}video/${key}.mp4" title="Click to skip"></video>`;}
function bindWinVideo(){const v=document.querySelector(".overbox .opvid");if(!v)return;const gid=GID;
  const end=()=>{v.classList.add("gone");setTimeout(()=>{if(v.parentNode)v.remove();},400);};
  v.onended=end;v.onclick=end;v.onerror=()=>{CLIP_BAD[v.src.split("/").pop().replace(".mp4","")]=1;end();};
  const p=v.play();if(p&&p.catch)p.catch(()=>{v.muted=true;v.play().catch(end);});
  setTimeout(()=>{if(v.isConnected&&v.readyState<2)end();},4000);}
/* ================= STATE / UTIL ================= */
const START_LP=8000, HAND_LIMIT=6;
let G=null, GID=0, UID=0, SPEED=1, SCALE=1;
const ABORT={abort:true};
const $=s=>document.querySelector(s);
const other=s=>s==="player"?"enemy":"player";
const S=s=>G.sides[s];
const isAI=s=>(G&&G.net&&typeof netIsAI==="function")?netIsAI(s):(s==="enemy"||G.auto); /*NET-HOOK 1: online duels ask i_net.js who is AI-controlled*/
const pick=a=>a[Math.floor(Math.random()*a.length)];
function sleep(ms){const gid=GID;return new Promise((res,rej)=>setTimeout(()=>{(gid!==GID||!G||G.over)?rej(ABORT):res();},ms*SPEED));}
function realSleep(ms){return new Promise(r=>setTimeout(r,ms*SPEED));}
function anim(el,kf,dur,opt){if(!el||!el.animate)return realSleep(dur);
  const a=el.animate(kf,Object.assign({duration:Math.max(1,dur*SPEED),easing:"ease-out"},opt||{}));
  return Promise.race([a.finished.catch(()=>{}),realSleep(dur+60)]);}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function mk(id,owner){const d=CARDS[id];return Object.assign({},d,{uid:++UID,id,owner,faceUp:false,pos:"atk",summonedTurn:-1,posChangedTurn:-1,attackedTurn:-1,setTurn:-1,equippedTo:null,guardUsed:false,tempAtk:0,tempTurn:-1,bonus:0,attackCount:0});}
function buildDeck(list,owner){const d=[];for(const id in list)for(let i=0;i<list[id];i++)if(CARDS[id])d.push(mk(id,owner));return shuffle(d);}
function tributesNeeded(c){return c.level>=7?2:c.level>=5?1:0;}
function mons(s){return S(s).monsters.filter(Boolean);}
function sts(s){return S(s).st.filter(Boolean);}
function freeIdx(arr){for(const i of [2,1,3,0,4])if(!arr[i])return i;return -1;}
function placeIdx(arr,pref){return pref!=null&&pref>=0&&pref<5&&!arr[pref]?pref:freeIdx(arr);}
function isQuick(c){return !!c&&c.type==="spell"&&c.kind==="Quick-Play";}
function allField(){const r=[];for(const s of ["player","enemy"]){for(const c of S(s).monsters)if(c)r.push(c);for(const c of S(s).st)if(c)r.push(c);}return r;}
function atkOf(m){let a=m.atk;
  for(const c of allField())if(c.equippedTo===m.uid)a+=c.fx.v;
  if(m.faceUp&&G.sides[m.owner]){const sd=S(m.owner);
    for(const c of sd.monsters)if(c&&c.faceUp&&c.fx.aura&&raceIs(m,c.fx.aura.race))a+=c.fx.aura.atk;
    for(const c of sd.st)if(c&&c.faceUp&&c.type==="spell"&&c.fx.k==="cont"&&raceIs(m,c.fx.race))a+=c.fx.atk;
    if(m.fx.auraPer)a+=m.fx.auraPer.atk*sd.monsters.filter(c=>c&&c!==m&&c.faceUp&&c.race===m.fx.auraPer.race).length;}
  a+=m.bonus||0;
  if(m.tempTurn===G.turn)a-=m.tempAtk;
  return Math.max(0,a);}
function addTemp(c,d){if(c.tempTurn!==G.turn){c.tempTurn=G.turn;c.tempAtk=0;}c.tempAtk+=d;}
function find(uid){if(!G)return null;for(const s of ["player","enemy"]){const sd=S(s);
  for(const z of ["hand","monsters","st","gy","deck"]){const i=sd[z].findIndex(c=>c&&c.uid===uid);if(i>=0)return {card:sd[z][i],side:s,zone:z,idx:i};}}return null;}
function log(msg,cls){G.log.unshift({msg,cls:cls||""});if(G.log.length>60)G.log.pop();renderLog();}
function sc(s){return s==="player"?"p":"e";}
function cname(c){return c.faceUp?c.name:"a face-down card";}
function raceIs(c,r){return !!c&&(c.race===r||(!!c.set&&c.set===r));}
function controlsRace(s,race){return mons(s).some(m=>m.faceUp&&raceIs(m,race));}

/* ================= DUEL SETUP ================= */
function startDuel(pChar,eChar,opts){
  opts=opts||{};GID++;UID=0;
  $("#modalLayer").innerHTML="";$("#fx").innerHTML="";$("#menuLayer").innerHTML="";$("#bubbles").innerHTML="";cineClose();
  const mkSide=(ch,side)=>({char:ch,name:(opts.names&&opts.names[side])/*NET-HOOK 2a: online display names*/||(ch==="you"?(side==="player"?playerName():"Mystery Duelist"):CHARS[ch].name),lp:START_LP,
    deck:buildDeck(opts.decks&&opts.decks[side]||deckFor(ch,side),side),hand:[],gy:[],monsters:[null,null,null,null,null],st:[null,null,null,null,null],normalSummoned:false});
  exprReset();V3.clipSeen={};probeVideo();
  G={turn:0,current:null,phase:"draw",over:false,busy:true,auto:!!opts.auto,net:!!opts.net/*NET-HOOK 2b: online duel flag*/,ui:{mode:null},log:[],battleEnded:false,winner:null,match:[pChar,eChar],
    sides:{player:mkSide(pChar,"player"),enemy:mkSide(eChar,"enemy")},stats:{aces:0,effects:0},arena:pickArena(pChar,eChar,opts.arena)};
  setArena(G.arena);
  if(opts.speed!=null)SPEED=opts.speed;
  for(let i=0;i<5;i++){S("player").hand.push(S("player").deck.pop());S("enemy").hand.push(S("enemy").deck.pop());}
  const first=opts.first||(Math.random()<.5?"player":"enemy");
  $("#coin").textContent="Coin toss: "+(first==="player"?"you go first":"rival goes first");
  log(`${S("player").name} vs ${S("enemy").name} — duel start!`,"s");log("Coin toss: "+(first==="player"?S("player").name+" goes first":S("enemy").name+" goes first")+".","s");
  showScreen("duel",true);render();
  const gid=GID;
  gameLoop(first,gid).catch(e=>{if(e!==ABORT)console.error(e);});
}
async function gameLoop(side,gid){
  speak("enemy","start");if(G.auto)setTimeout(()=>{if(G&&gid===GID)speak("player","start");},600*SPEED);
  await banner(side==="player"?"YOU GO FIRST":"RIVAL GOES FIRST");
  while(true){
    if(gid!==GID||G.over)return;
    await beginTurn(side);
    if(isAI(side)){G.busy=true;render();await aiTurn(side);}
    else{G.busy=false;render();await new Promise(r=>{G.humanEnd=r;});G.humanEnd=null;}
    await endPhase(side);
    side=other(side);
  }
}
async function beginTurn(side){
  G.turn++;G.current=side;G.battleEnded=false;G.ui={mode:null};closeMenu();
  S(side).normalSummoned=false;G.phase="draw";render();
  await banner(side==="player"?(G.auto?S("player").name.toUpperCase()+"'S TURN":"YOUR TURN"):S("enemy").name.toUpperCase()+"'S TURN",side==="player"?"#3fa9ff":"#ff4b5c");
  log(`— Turn ${G.turn}: ${S(side).name} —`,"s");
  if(G.turn===1)log("First turn: no draw.","s");
  else{if(!S(side).deck.length){log(`${S(side).name} cannot draw — deck out!`,"s");gameOver(other(side),"Deck out");await sleep(10);}
    await drawCards(side,1);}
  if(G.turn>200){gameOver(S("player").lp>=S("enemy").lp?"player":"enemy","Time limit");await sleep(10);}
  const reps=mons(side).filter(m=>m.faceUp&&m.fx.reps);
  for(const m of reps){m.bonus=(m.bonus||0)+m.fx.reps;floatText(elOf(m.uid),`+${m.fx.reps} VENGEANCE`,"heal");log(`${m.name}'s vengeance grows: +${m.fx.reps} ATK (now ${atkOf(m)}).`,sc(side));}
  if(reps.length){render();await sleep(400);}
  await sleep(250);G.phase="main1";render();
}
async function drawCards(s,n){
  for(let i=0;i<n;i++){const sd=S(s);if(!sd.deck.length)return false;
    const c=sd.deck.pop();sd.hand.push(c);render();
    const el=elOf(c.uid);if(el)await anim(el,[{transform:"translateY(40px) scale(.6)",opacity:0},{transform:"none",opacity:1}],300);
    if(s==="player"&&!G.auto)log(`You draw ${c.name}.`,"p");else log(`${sd.name} draws a card.`,sc(s));}
  return true;}
async function endPhase(side){
  G.phase="end";G.ui={mode:null};closeMenu();render();const sd=S(side);
  if(sd.hand.length>HAND_LIMIT){
    if(isAI(side)){while(sd.hand.length>HAND_LIMIT){discard(side,aiDiscardPick(side).uid);}render();}
    else{G.ui={mode:"discard"};render();await new Promise(r=>{G.discardDone=r;});G.ui={mode:null};}}
  await sleep(300);}
function discard(s,uid){const sd=S(s);const i=sd.hand.findIndex(c=>c.uid===uid);if(i<0)return;const c=sd.hand.splice(i,1)[0];toGY(c);log(`${sd.name} discards ${c.name} (hand limit).`,sc(s));}
function toGY(c){c.faceUp=true;c.pos="atk";c.equippedTo=null;c.guardUsed=false;c.tempTurn=-1;c.bonus=0;S(c.owner).gy.push(c);}

/* ================= LP / WIN ================= */
async function changeLP(s,delta){
  if(!delta)return;const sd=S(s);const from=sd.lp;sd.lp=Math.max(0,sd.lp+delta);
  const el=$("#duel-"+s);floatText(el,(delta>0?"+":"")+delta,delta>0?"heal":"dmg");
  if(delta<0)exprSet(s,"hurt",1300);
  if(delta<0&&el){el.classList.remove("shake");void el.offsetWidth;el.classList.add("shake");}
  tweenLP(s,from,sd.lp);
  log(`${sd.name} ${delta<0?"takes "+(-delta)+" damage":"gains "+delta+" LP"} (LP ${sd.lp}).`,sc(s));
  if(delta<=-1500&&sd.lp>0)speak(s,"hurt");
  if(sd.lp<=0)gameOver(other(s),"Life Points reduced to 0");
  await sleep(450);}
function tweenLP(s,from,to){const t0=performance.now(),d=Math.max(1,600*SPEED);
  const step=t=>{const k=Math.min(1,(t-t0)/d);const v=Math.round(from+(to-from)*k);const n=document.querySelector(`#duel-${s} .lpnum`);
    if(n)n.textContent=v;const b=document.querySelector(`#duel-${s} .lpbar>div`);if(b)b.style.width=Math.min(100,v/START_LP*100)+"%";if(k<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);}
function gameOver(winner,reason){
  if(G.over)return;G.over=true;G.winner=winner;G.busy=true;G.ui={mode:null};closeMenu();cineClose();
  log(`${S(winner).name} wins the duel! (${reason})`,"s");render();
  speakForce(winner,"win");speakForce(other(winner),"lose");exprSet(winner,"win",0);exprSet(other(winner),"hurt",0);
  const gid=GID;
  setTimeout(()=>{if(gid!==GID)return;showGameOver(winner,reason);},Math.max(50,1400*SPEED));}
function showGameOver(winner,reason){
  const win=winner==="player",wch=S(winner).char,lch=S(other(winner)).char;
  const W=CHARS[wch];
  $("#modalLayer").innerHTML=`<div class="modal-bg"><div class="overbox ${win?"win":"lose"} pop" style="--c:${W.color}">
    <div class="op">${winVideoHTML(wch)}</div>
    <div style="width:420px"><h1>${win?"VICTORY!":"DEFEAT"}</h1>
      <div style="font-size:20px;font-weight:bold">${S(winner).name} wins!</div>
      <div class="q">“${pick(W.lines.win)}”</div>
      <div style="margin:10px 0"><span class="lpop"><img src="${PORTRAITS[CHARS[lch].img]}" alt=""></span><span style="opacity:.8">${S(other(winner)).name}: “${pick(CHARS[lch].lines.lose)}”</span></div>
      <div style="opacity:.7">${reason} · Turn ${G.turn} · LP ${S("player").lp} – ${S("enemy").lp}</div>
      <div class="btnrow" style="justify-content:flex-start;display:flex;gap:10px;margin-top:16px">
        <button class="btn gold" id="btn-again" style="padding:10px 18px;font-size:14px">⚔ Rematch</button>
        <button class="btn" id="btn-resel" style="padding:10px 18px;font-size:14px">Character Select</button>
        <button class="btn" id="btn-tomenu" style="padding:10px 18px;font-size:14px">Main Menu</button></div></div></div></div>`;
  bindWinVideo();const m=G.match;
  const ar=G.arena;$("#btn-again").onclick=()=>showVersus(m[0],m[1],ar);
  $("#btn-resel").onclick=()=>{leaveDuel();openSelect();};
  $("#btn-tomenu").onclick=()=>{leaveDuel();showScreen("menu");};}
function leaveDuel(){GID++;clipClose();exprReset();if(G){G.over=true;}$("#modalLayer").innerHTML="";$("#fx").innerHTML="";$("#bubbles").innerHTML="";closeMenu();cineClose();}

/* ================= FX ================= */
function appPos(el){const a=$("#app").getBoundingClientRect(),r=el.getBoundingClientRect();
  return {x:(r.left+r.width/2-a.left)/SCALE,y:(r.top+r.height/2-a.top)/SCALE};}
function floatText(el,txt,cls){if(!el||!el.isConnected)return;const p=appPos(el);const d=document.createElement("div");d.className="float "+cls;d.textContent=txt;
  d.style.left=p.x+"px";d.style.top=p.y+"px";$("#fx").appendChild(d);
  anim(d,[{transform:"translate(-50%,-50%) scale(.6)",opacity:0},{transform:"translate(-50%,-90%) scale(1.25)",opacity:1,offset:.25},{transform:"translate(-50%,-220%) scale(1)",opacity:0}],1300).then(()=>d.remove());}
function impact(el){if(!el||!el.isConnected)return;const p=appPos(el);const d=document.createElement("div");d.className="impact";d.style.left=p.x+"px";d.style.top=p.y+"px";
  $("#fx").appendChild(d);anim(d,[{transform:"scale(.2)",opacity:1},{transform:"scale(1.6)",opacity:0}],450).then(()=>d.remove());}
async function banner(text,color){const d=document.createElement("div");d.className="banner";d.textContent=text;if(color)d.style.textShadow=`0 0 18px ${color},0 0 4px #000`;
  $("#fx").appendChild(d);await anim(d,[{opacity:0,transform:"scaleX(.3)"},{opacity:1,transform:"none",offset:.25},{opacity:1,offset:.75},{opacity:0,transform:"scaleX(1.3)"}],1100);d.remove();
  if(!G||G.over)throw ABORT;}
async function showcase(c,s,verb){const d=document.createElement("div");d.className="showcase";
  d.innerHTML=`<div class="who">${S(s).name} ${verb||"activates"}</div>`+cardHTML(c,{cls:"lg",noUid:true});
  $("#fx").appendChild(d);await anim(d,[{opacity:0,transform:"translate(-50%,-50%) scale(.3)"},{opacity:1,transform:"translate(-50%,-50%) scale(1)",offset:.2},{opacity:1,offset:.8},{opacity:0,transform:"translate(-50%,-50%) scale(1.1)"}],1500);
  d.remove();}
function elOf(uid){return document.querySelector(`#duel [data-uid="${uid}"]`);}
function shakeEl(sel,big){const f=$(sel);if(!f)return;const c=big?"bigshake":"shake";f.classList.remove("shake","bigshake");void f.offsetWidth;f.classList.add(c);}
async function lunge(att,tgt){if(!att||!tgt)return;const a=appPos(att),b=appPos(tgt);const dx=(b.x-a.x)*.85,dy=(b.y-a.y)*.85;
  att.style.zIndex=40;
  const p=anim(att,[{transform:"none"},{transform:`translate(${-dx*.08}px,${-dy*.08}px) scale(1.12)`,offset:.3},{transform:`translate(${dx}px,${dy}px) scale(1.12)`,offset:.6},{transform:"none"}],700,{easing:"ease-in-out"});
  await realSleep(420);impact(tgt);shakeEl("#field");await p;att.style.zIndex="";}
function speakLine(s,key){const ch=S(s).char;const L=CHARS[ch].lines[key];return L?pick(L):null;}
function speak(s,key,prob){if(!G||!isAI(s))return;if(prob!=null&&Math.random()>prob)return;speakForce(s,key);}
function speakForce(s,key){if(!G)return;const t=speakLine(s,key);if(!t)return;const box=$("#bubbles");
  const old=box.querySelector(".bubble."+s);if(old)old.remove();
  const d=document.createElement("div");d.className="bubble "+s;d.style.setProperty("--c",CHARS[S(s).char].color);d.textContent=t;box.appendChild(d);exprTalk(s,Math.min(2300,Math.max(900,t.length*55)));
  anim(d,[{opacity:0,transform:"scale(.6)"},{opacity:1,transform:"scale(1.05)",offset:.15},{opacity:1,transform:"none",offset:.85},{opacity:0}],Math.max(2600,1)).then(()=>d.remove());}

/* ================= DESTRUCTION ================= */
async function destroyMonsters(list){
  list=list.filter(c=>c&&find(c.uid)&&find(c.uid).zone==="monsters");if(!list.length)return;
  await Promise.all(list.map(c=>anim(elOf(c.uid),[{opacity:1,filter:"brightness(1)"},{opacity:1,filter:"brightness(3) saturate(0)",offset:.3},{opacity:0,transform:"scale(1.4) rotate(12deg)",filter:"brightness(2)"}],550)));
  const trig=[];
  for(const c of list){const f=find(c.uid);if(!f)continue;S(f.side).monsters[f.idx]=null;
    for(const s of ["player","enemy"])S(s).st.forEach((e,i)=>{if(e&&e.equippedTo===c.uid){S(s).st[i]=null;toGY(e);log(`${e.name} is sent to the Graveyard.`);}});
    toGY(c);log(`${c.name} is destroyed.`,sc(f.side));if(c.fx.onDestroy)trig.push(c);}
  render();await sleep(200);
  for(const c of trig){if(G.over)return;log(`${c.name}'s effect activates!`,sc(c.owner));await resolveFx(c.owner,[].concat(c.fx.onDestroy).map(f=>/^ss/.test(f.k)?Object.assign({},f,{notSelf:c.name}):f),c);}
}
async function destroySTs(list){list=list.filter(c=>c&&find(c.uid)&&find(c.uid).zone==="st");if(!list.length)return;
  await Promise.all(list.map(c=>anim(elOf(c.uid),[{opacity:1},{opacity:0,transform:"scale(1.3) rotate(-10deg)",filter:"brightness(3)"}],450)));
  for(const c of list){const f=find(c.uid);if(!f)continue;S(f.side).st[f.idx]=null;toGY(c);log(`${c.name} is destroyed.`,sc(f.side));}
  render();await sleep(150);}

/* ================= EFFECTS ================= */
function threat(m){return m.faceUp?atkOf(m):1500;}
function bestBy(arr,f){let b=null,bv=-1e9;for(const x of arr){const v=f(x);if(v>bv){bv=v;b=x;}}return b;}
async function specialSummon(s,card,from){
  const sd=S(s);const idx=freeIdx(sd.monsters);if(idx<0)return false;
  const arr=sd[from];const i=arr.indexOf(card);if(i<0)return false;arr.splice(i,1);
  if(from==="deck")shuffle(sd.deck);
  card.faceUp=true;card.pos="atk";card.summonedTurn=G.turn;card.attackedTurn=-1;card.posChangedTurn=-1;card.guardUsed=false;card.equippedTo=null;
  sd.monsters[idx]=card;log(card.extra?`${sd.name} Combination Summons ${card.name}!`:`${sd.name} Special Summons ${card.name} from the ${from==="gy"?"Graveyard":from}!`,sc(s));
  render();const el=elOf(card.uid);exprSet(s,"point",1300);
  await anim(el,[{transform:"scale(1.8)",opacity:0,filter:"brightness(3)"},{transform:"scale(1)",opacity:1,filter:"brightness(1)"}],450);impact(el);
  if(card.ace)await entrance(card,s);
  return true;}
const EXT_FX=["payLP","payDraw","coin","weakenAll","drain"];
async function resolveFx(s,fx,src){
  if(Array.isArray(fx)){for(const f of fx){if(G.over)return;await resolveFx(s,f,src);}return;}
  const o=other(s),sd=S(s);G.stats.effects++;
  if(src){const el=elOf(src.uid);if(el)anim(el,[{filter:"brightness(1)"},{filter:"brightness(2.4) drop-shadow(0 0 10px #fff)"},{filter:"brightness(1)"}],500);}
  switch(fx.k){
    case "burn":await changeLP(o,-fx.v);break;
    case "heal":await changeLP(s,fx.v);break;
    case "draw":await drawCards(s,Math.min(fx.n,sd.deck.length));break;
    case "destroyST":{const c=await requestChoice(s,sts(o).map(x=>({card:x,hidden:!x.faceUp,note:x.faceUp?"":"A Set Spell/Trap card."})),{title:`${src?src.name+": ":""}Destroy 1 Spell/Trap`,sub:"Choose a Spell/Trap card your opponent controls.",ai:l=>bestBy(l,c=>(c.faceUp?2:1)+Math.random())});if(c){impact(elOf(c.uid));await destroySTs([c]);}else log("No Spell/Trap to destroy.","s");break;}
    case "destroyAllST":{const l=sts(o);if(l.length){shakeEl("#field");await destroySTs(l);}break;}
    case "destroyMon":{const t=await requestChoice(s,mons(o).filter(m=>!fx.maxAtk||(m.faceUp&&atkOf(m)<=fx.maxAtk)).map(m=>({card:m,hidden:!m.faceUp,note:m.faceUp?"":"A face-down monster."})),{title:`${src?src.name+": ":""}Destroy 1 monster`,sub:fxSub(fx),ai:l=>bestBy(l,threat)});if(t){impact(elOf(t.uid));await destroyMonsters([t]);}else log("No valid monster to destroy.","s");break;}
    case "destroyWeakAll":{const l=mons(o).filter(m=>atkOf(m)<=fx.maxAtk);if(l.length){shakeEl("#field");await destroyMonsters(l);}break;}
    case "ssHand":case "ssGY":case "ssDeck":{const from=fx.k==="ssHand"?"hand":fx.k==="ssGY"?"gy":"deck";
      const cands=sd[from].filter(c=>c.type==="monster"&&raceIs(c,fx.race)&&c.level<=fx.maxLv&&!(fx.notSelf&&c.name===fx.notSelf));
      if(!cands.length||freeIdx(sd.monsters)<0){log("No valid monster to Special Summon.","s");break;}
      const c=await pickCard(s,cands,c=>c.atk,{title:`${src?src.name+": ":""}Special Summon from your ${from==="gy"?"Graveyard":from==="deck"?"Deck":"hand"}`,sub:fxSub(fx),optional:true,cancelLabel:"Don't summon"});
      if(!c||G.over){log(`${sd.name} chooses not to Special Summon.`,sc(s));break;}
      await specialSummon(s,c,from);if(from==="deck"){shuffle(sd.deck);log(`${sd.name} shuffles their Deck.`,sc(s));}break;}
    case "search":{const sl=sd.deck.filter(c=>fx.race?(c.type==="monster"&&raceIs(c,fx.race)&&c.level<=6):c.type==="spell");
      const c=await pickCard(s,sl,c=>(c.atk||0)+Math.random()*400,{title:`${src?src.name+": ":""}Add a card from your Deck to your hand`,sub:fxSub(fx)});
      if(c){sd.deck.splice(sd.deck.indexOf(c),1);shuffle(sd.deck);sd.hand.push(c);log(`${sd.name} adds ${isAI(s)&&s==="enemy"?"a card":c.name} to their hand and shuffles their Deck.`,sc(s));render();
        const el=elOf(c.uid);if(el)await anim(el,[{transform:"translateY(-40px)",opacity:0},{transform:"none",opacity:1}],300);}break;}
    /* v7 (new5b) effect kinds */
    case "payLP":log(`${sd.name} pays ${fx.v} LP.`,sc(s));await changeLP(s,-fx.v);break;
    case "payDraw":{if(sd.lp>fx.lp&&sd.deck.length){log(`${sd.name} pays ${fx.lp} LP to draw.`,sc(s));await changeLP(s,-fx.lp);if(!G.over)await drawCards(s,Math.min(fx.n,sd.deck.length));}else log("Not enough LP to pay: no cards drawn.","s");break;}
    case "coin":{const h=Math.random()<.5;log(`${sd.name} tosses a coin... ${h?"HEADS":"TAILS"}!`,sc(s));if(src)floatText(elOf(src.uid),h?"HEADS!":"TAILS...",h?"heal":"dmg");await sleep(450);
      const f2=h?fx.h:fx.t;if(f2&&!G.over)await resolveFx(s,f2,src);break;}
    case "weakenAll":{const l=mons(o).filter(m=>m.faceUp);if(!l.length){log("No face-up monsters to weaken.","s");break;}
      for(const m of l){addTemp(m,fx.v);floatText(elOf(m.uid),`-${fx.v} ATK`,"dmg");}log(`Every face-up monster ${S(o).name} controls loses ${fx.v} ATK this turn.`,sc(s));render();await sleep(350);break;}
    case "drain":await changeLP(o,-fx.v);if(!G.over)await changeLP(s,fx.v);break;
    default:if(typeof FX_EXT==="object"&&FX_EXT[fx.k])await FX_EXT[fx.k](s,fx,src); /* v15: external fx kinds (k_v15.js), inside the Tag seat routing */
  }
  render();}

/* ================= COMBINATION (fusion) ================= */
function fusionMats(s,f,spell){const sd=S(s);const used=new Set();const out=[];
  for(const id of f.mats){let c=sd.hand.find(x=>x.id===id&&x!==spell&&!used.has(x.uid));let zone="hand";
    if(!c){c=sd.monsters.find(x=>x&&x.id===id&&!used.has(x.uid));zone="monsters";}
    if(!c)return null;used.add(c.uid);out.push({card:c,zone});}
  return out;}
async function doFusion(s,f,spell){const sd=S(s);const mats=await fusionMatsChosen(s,f,spell);if(!mats)return;
  log(`${sd.name} combines ${mats.map(m=>m.card.name).join(" + ")}!`,sc(s));
  for(const m of mats){const el=elOf(m.card.uid);if(el)anim(el,[{opacity:1},{opacity:0,transform:"scale(.4) rotate(180deg)",filter:"brightness(3)"}],450);}
  await sleep(450);
  for(const m of mats){const c=m.card;if(m.zone==="hand")sd.hand.splice(sd.hand.indexOf(c),1);
    else{const i=sd.monsters.indexOf(c);if(i>=0)sd.monsters[i]=null;for(const ss of ["player","enemy"])S(ss).st.forEach((e,k)=>{if(e&&e.equippedTo===c.uid){S(ss).st[k]=null;toGY(e);}});}
    toGY(c);}
  render();const res=mk(f.result,s);sd.hand.push(res);
  await specialSummon(s,res,"hand");
  if(res.fx.onSummon&&!G.over){log(`${res.name}'s combination effect activates!`,sc(s));await resolveFx(s,res.fx.onSummon,res);}}

/* ================= ACTIONS ================= */
function canNormalSummon(s,c){const sd=S(s);if(sd.normalSummoned||c.type!=="monster")return false;
  const need=tributesNeeded(c);if(need===0)return freeIdx(sd.monsters)>=0;return mons(s).length>=need;}
function reviveTarget(s,f){return bestBy(S(s).gy.filter(c=>c.type==="monster"&&(!f.race||c.race===f.race)),c=>c.atk);}
function spellCanActivate(s,c,ctx){const sd=S(s),o=other(s),f=c.fx;const inSt=sd.st.includes(c);
  if(!inSt&&freeIdx(sd.st)<0)return false;
  if(inSt&&c.faceUp)return false;
  if(isQuick(c)){if(inSt?c.setTurn>=G.turn:G.current!==s)return false;return !!qTarget(s,c,ctx||{});}
  if(G.current!==s)return false;
  switch(f.k){case "destroy1":return mons(o).length>0;case "destroyAll":return mons(s).length+mons(o).length>0;
    case "destroyST1":return sts(o).length>0;
    case "equip":return mons(s).some(m=>m.faceUp&&(!f.race||m.race===f.race));case "draw":return sd.deck.length>=f.n;
    case "revive":return !!reviveTarget(s,f)&&freeIdx(sd.monsters)>=0;
    case "search":return sd.deck.some(x=>x.type==="monster"&&raceIs(x,f.race)&&x.level<=6);
    case "boost":return mons(s).some(m=>m.faceUp&&(!f.race||m.race===f.race));
    case "payDraw":return sd.lp>f.lp&&sd.deck.length>0;
    case "weakenAll":return mons(o).some(m=>m.faceUp);
    case "fusion":{const m=fusionMats(s,f,c);return !!m&&(freeIdx(sd.monsters)>=0||m.some(x=>x.zone==="monsters"));}
    default:return true;}}
async function normalSummon(s,uid,tributes,setMode,pref){
  const sd=S(s);const i=sd.hand.findIndex(c=>c.uid===uid);const c=sd.hand[i];
  if(tributes&&tributes.length){
    const tl=tributes.map(t=>find(t).card);
    log(`${sd.name} tributes ${tl.map(t=>cname(t)).join(" and ")}.`,sc(s));
    await Promise.all(tl.map(t=>anim(elOf(t.uid),[{opacity:1},{opacity:0,transform:"translateY(-30px) scale(.6)",filter:"brightness(3)"}],450)));
    for(const t of tl){const f=find(t.uid);sd.monsters[f.idx]=null;for(const ss of ["player","enemy"])S(ss).st.forEach((e,k)=>{if(e&&e.equippedTo===t.uid){S(ss).st[k]=null;toGY(e);}});toGY(t);}}
  sd.hand.splice(sd.hand.indexOf(c),1);const idx=placeIdx(sd.monsters,pref);
  c.faceUp=!setMode;c.pos=setMode?"def":"atk";c.summonedTurn=G.turn;c.attackedTurn=-1;c.posChangedTurn=-1;c.guardUsed=false;sd.monsters[idx]=c;sd.normalSummoned=true;
  log(setMode?`${sd.name} sets a monster face-down.`:`${sd.name} summons ${c.name} (ATK ${c.atk}).`,sc(s));
  render();const el=elOf(c.uid);
  if(setMode)await anim(el,[{transform:"translateX(-60px)",opacity:0},{transform:"none",opacity:1}],350);
  else{exprSet(s,"point",1300);await anim(el,[{transform:"scale(1.8)",opacity:0,filter:"brightness(3)"},{transform:"scale(1)",opacity:1,filter:"brightness(1)"}],450);impact(el);
    if(c.ace){speakForce(s,"ace");await entrance(c,s);}else speak(s,"summon",.35);
    if(c.fx.onSummon){log(`${c.name}'s effect activates!`,sc(s));await resolveFx(s,c.fx.onSummon,c);}
    if(!G.over&&find(c.uid)&&find(c.uid).zone==="monsters")await responseWindow(other(s),"summon",{summoned:c});}
  await sleep(150);}
async function setTrap(s,uid,pref){const sd=S(s);const i=sd.hand.findIndex(c=>c.uid===uid);if(i<0||freeIdx(sd.st)<0)return;const c=sd.hand.splice(i,1)[0];
  c.faceUp=false;c.setTurn=G.turn;sd.st[placeIdx(sd.st,pref)]=c;log(`${sd.name} sets a card in the Spell & Trap Zone.`,sc(s));
  render();await anim(elOf(c.uid),[{transform:"translateY(-50px)",opacity:0},{transform:"none",opacity:1}],300);await sleep(100);}
async function activateSpell(s,uid,targetUid,ctx,pref){
  const sd=S(s),o=other(s);const i=sd.hand.findIndex(c=>c.uid===uid);let c,fromSet=false;
  if(i>=0){c=sd.hand.splice(i,1)[0];sd.st[placeIdx(sd.st,pref)]=c;}
  else{const ff=find(uid);if(!ff||ff.zone!=="st"||ff.side!==s)return null;c=ff.card;fromSet=true;}
  const f=c.fx;c.faceUp=true;render();
  log(`${sd.name} activates ${fromSet?"the Set card ":""}${c.name}${isQuick(c)?" (Quick-Play)":""}!`,sc(s));
  if(fromSet){const el=elOf(c.uid);if(el)await anim(el,[{transform:"scaleX(0)"},{transform:"scaleX(1)"}],260);}
  if(ctx)speak(s,"trap",.6);
  await showcase(c,s);
  if(!ctx&&s===G.current&&!G.over){await responseWindow(o,"spell",{spell:c});if(G.over)return null;}
  if(isQuick(c)){const r=await resolveQuick(s,c,ctx||{},targetUid);const ff=find(c.uid);if(ff&&ff.zone==="st"){sd.st[ff.idx]=null;toGY(c);}render();await sleep(150);return r||{};}
  switch(f.k){
    case "burn":await changeLP(o,-f.v);break;
    case "heal":await changeLP(s,f.v);break;
    case "draw":await drawCards(s,f.n);break;
    case "destroy1":{const t=find(targetUid);if(t&&t.zone==="monsters"){impact(elOf(t.card.uid));await destroyMonsters([t.card]);}break;}
    case "destroyST1":{const t=find(targetUid);if(t&&t.zone==="st"){impact(elOf(t.card.uid));await destroySTs([t.card]);}break;}
    case "destroyAll":{shakeEl("#field");await destroyMonsters([...mons("player"),...mons("enemy")]);break;}
    case "revive":{const rl=S(s).gy.filter(x=>x.type==="monster"&&(!f.race||x.race===f.race));const t=await pickCard(s,rl,x=>x.atk,{title:`${c.name}: revive a monster`,sub:"Choose a monster in your Graveyard to Special Summon."});if(t&&!G.over)await specialSummon(s,t,"gy");break;}
    case "search":await resolveFx(s,{k:"search",race:f.race});break;
    case "raceBurn":{const n=mons(s).filter(m=>m.faceUp&&m.race===f.race).length;if(n)await changeLP(o,-f.v*n);else log("No "+f.race+" monsters — no damage.","s");break;}
    case "boost":{const t=find(targetUid);if(t&&t.zone==="monsters"){addTemp(t.card,-f.v);log(`${t.card.name} gains ${f.v} ATK this turn!`,sc(s));render();
      const el=elOf(t.card.uid);floatText(el,`+${f.v} ATK`,"heal");await anim(el,[{filter:"brightness(1)"},{filter:"brightness(2.4) hue-rotate(40deg)"},{filter:"brightness(1)"}],500);}break;}
    case "fusion":await doFusion(s,f,c);break;
    case "cont":log(`Your ${f.race} monsters gain ${f.atk} ATK while it remains.`,sc(s));render();return;
    case "equip":{const t=find(targetUid);if(t&&t.zone==="monsters"){c.equippedTo=t.card.uid;log(`${t.card.name} gains ${f.v} ATK.`,sc(s));render();
      const el=elOf(t.card.uid);floatText(el,`+${f.v} ATK`,"heal");await anim(el,[{filter:"brightness(1)"},{filter:"brightness(2.2)"},{filter:"brightness(1)"}],500);}
      else{const ff=find(c.uid);if(ff){sd.st[ff.idx]=null;toGY(c);}}render();return;}
    default:if(EXT_FX.includes(f.k))await resolveFx(s,f,c);
  }
  const ff=find(c.uid);if(ff&&ff.zone==="st"){sd.st[ff.idx]=null;toGY(c);}render();await sleep(150);}
async function changePosition(s,uid){const c=find(uid).card;c.posChangedTurn=G.turn;
  if(!c.faceUp){c.faceUp=true;c.pos="atk";log(`${S(s).name} flip summons ${c.name}!`,sc(s));render();
    await anim(elOf(uid),[{filter:"brightness(2.5)"},{filter:"brightness(1)"}],350);
    if(c.ace){speakForce(s,"ace");await entrance(c,s);}
    if(c.fx.flip){log(`FLIP: ${c.name}'s effect activates!`,sc(s));await resolveFx(s,c.fx.flip,c);}
    if(!G.over&&find(c.uid)&&find(c.uid).zone==="monsters")await responseWindow(other(s),"summon",{summoned:c});
    return;}
  c.pos=c.pos==="atk"?"def":"atk";log(`${S(s).name} switches ${c.name} to ${c.pos==="atk"?"Attack":"Defense"} Position.`,sc(s));
  render();await anim(elOf(uid),[{filter:"brightness(2.5)"},{filter:"brightness(1)"}],350);await sleep(100);}
function trapsFor(s){return S(s).st.filter(c=>c&&c.type==="trap"&&!c.faceUp&&c.setTurn<G.turn&&(!c.fx.needRace||controlsRace(s,c.fx.needRace)));}
function canAttackWith(s,c){return G.phase==="battle"&&G.current===s&&G.turn>1&&!G.battleEnded&&c&&c.faceUp&&c.pos==="atk"&&(c.attackedTurn!==G.turn||(c.fx.double&&c.attackCount<2));}
function canGoDirect(s,c){return !mons(other(s)).length||!!c.fx.direct;}
function previewBattle(att,tgt){const A=atkOf(att);
  if(!tgt)return {dmgDef:A,dmgAtt:0,killDef:false,killAtt:false};
  const guard=tgt.fx.guard&&!tgt.guardUsed;
  if(tgt.pos==="atk"){const D=atkOf(tgt);return {dmgDef:A>D?A-D:0,dmgAtt:D>A?D-A:0,killDef:A>=D&&!guard,killAtt:D>=A&&!(att.fx.guard&&!att.guardUsed)};}
  const D=tgt.def;return {dmgDef:A>D&&att.fx.pierce?A-D:0,dmgAtt:D>A?D-A:0,killDef:A>D&&!guard,killAtt:false};}
async function battleDestroy(list){const real=[];
  for(const c of list){if(c.fx.guard&&!c.guardUsed){c.guardUsed=true;floatText(elOf(c.uid),"STALWART!","info");log(`${c.name} survives thanks to Stalwart!`,sc(c.owner));}else real.push(c);}
  render();if(real.length)await destroyMonsters(real);else await sleep(300);}
async function attack(s,attUid,tgtUid){
  exprSet(s,"point",1100);const o=other(s);const att=find(attUid).card;if(att.attackedTurn===G.turn)att.attackCount++;else{att.attackedTurn=G.turn;att.attackCount=1;}
  let tgt=tgtUid?find(tgtUid).card:null;G.ui={mode:null};
  log(`${att.name} attacks ${tgt?(tgt.faceUp?tgt.name:"a face-down monster"):"directly"}!`,sc(s));
  speak(s,"attack",.3);
  render();await anim(elOf(att.uid),[{transform:"scale(1)"},{transform:"scale(1.15)"},{transform:"scale(1)"}],300);
  let noDmg=false;
  const resp=await responseWindow(o,"attack",{att,tgt});if(G.over)return;
  if(resp&&resp.negated){G.ui={mode:null};render();await sleep(300);return;}
  {const choice=resp&&resp.trap;
    if(choice){choice.faceUp=true;render();log(`${S(o).name} activates ${choice.name}!`,sc(o));speak(o,"trap",.7);
      await anim(elOf(choice.uid),[{filter:"brightness(1)"},{filter:"brightness(3)"},{filter:"brightness(1)"}],350);
      await showcase(choice,o);
      const f=find(choice.uid);if(f){S(o).st[f.idx]=null;toGY(choice);}render();
      const k=choice.fx.k;
      if(k==="negate"){floatText(elOf(att.uid),"NEGATED","info");log("The attack is negated and the Battle Phase ends.","s");G.battleEnded=true;G.phase="main2";render();await sleep(400);return;}
      if(k==="destroyAttacker"){impact(elOf(att.uid));await destroyMonsters([att]);return;}
      if(k==="noDamage")noDmg=true;
      if(k==="shrink"){addTemp(att,choice.fx.v);floatText(elOf(att.uid),`-${choice.fx.v} ATK`,"dmg");render();await sleep(300);}
      if(k==="burnBack"){await changeLP(s,-choice.fx.v);}
    }}
  const ac=find(att.uid);if(!ac||ac.zone!=="monsters")return;
  const attEl=elOf(att.uid),tgtEl=tgt?elOf(tgt.uid):$("#duel-"+o);
  await lunge(attEl,tgtEl);
  if(!tgt){if(noDmg){floatText(tgtEl,"BLOCKED","info");await sleep(400);}else await changeLP(o,-atkOf(att));return;}
  let flipped=false;
  if(!tgt.faceUp){tgt.faceUp=true;flipped=true;render();log(`The face-down monster is ${tgt.name} (DEF ${tgt.def}).`,"s");
    await anim(elOf(tgt.uid),[{transform:"scaleX(0)"},{transform:"scaleX(1)"}],350);await sleep(250);}
  const A=atkOf(att);
  if(tgt.pos==="atk"){const D=atkOf(tgt);
    if(A>D){await battleDestroy([tgt]);if(!noDmg)await changeLP(o,-(A-D));else floatText($("#duel-"+o),"BLOCKED","info");}
    else if(A<D){await battleDestroy([att]);await changeLP(s,-(D-A));}
    else{log("Equal ATK — both monsters are destroyed!","s");await battleDestroy([att,tgt]);}
  }else{const D=tgt.def;
    if(A>D){await battleDestroy([tgt]);if(att.fx.pierce){if(!noDmg){log(`${att.name} pierces through!`,sc(s));await changeLP(o,-(A-D));}else floatText($("#duel-"+o),"BLOCKED","info");}}
    else if(A<D){floatText(elOf(tgt.uid),"REPELLED","info");await changeLP(s,-(D-A));}
    else{floatText(elOf(tgt.uid),"HOLD","info");log("ATK equals DEF — nothing is destroyed.","s");await sleep(300);}}
  if(flipped&&tgt.fx.flip&&!G.over){log(`FLIP: ${tgt.name}'s effect activates!`,sc(o));await resolveFx(o,tgt.fx.flip,tgt);}
  render();}

/* ================= QUICK-PLAY SPELLS & RESPONSE WINDOWS (v4) ================= */
function onField(m){const f=m&&find(m.uid);return !!f&&f.zone==="monsters";}
/* auto-target for a quick-play: returns the card it would affect, true for untargeted effects, or null if it can't be used now */
function qTarget(s,c,ctx){const f=c.fx,o=other(s);ctx=ctx||{};
  const foe=m=>onField(m)&&m.owner===o, mine=m=>onField(m)&&m.owner===s&&m.faceUp&&(!f.race||raceIs(m,f.race));
  const pref=ok=>{if(ok(ctx.att))return ctx.att;if(ok(ctx.summoned))return ctx.summoned;return null;};
  switch(f.k){
    case "qNegate":return foe(ctx.att)?ctx.att:null;
    case "qDestroy":{const ok=m=>foe(m)&&m.faceUp&&atkOf(m)<=f.maxAtk;return pref(ok)||bestBy(mons(o).filter(ok),threat);}
    case "qBounce":{const ok=m=>foe(m);return pref(ok)||bestBy(mons(o),threat);}
    case "qShrink":{const ok=m=>foe(m)&&m.faceUp;return pref(ok)||bestBy(mons(o).filter(ok),atkOf);}
    case "qBoost":{if(ctx.att||ctx.tgt){const mm=[ctx.tgt,ctx.att].find(m=>m&&mine(m));if(mm)return mm;}return bestBy(mons(s).filter(mine),atkOf);}
    case "qHeal":case "qBurn":return true;
    case "qDraw":return S(s).deck.length>=f.n?true:null;}
  return null;}
async function bounceMonster(m){const f=find(m.uid);if(!f||f.zone!=="monsters")return;const sd=S(f.side);
  const el=elOf(m.uid);if(el)await anim(el,[{opacity:1},{opacity:0,transform:"translateY(-40px) scale(.5)",filter:"brightness(2.5)"}],420);
  sd.monsters[f.idx]=null;
  for(const s2 of ["player","enemy"])S(s2).st.forEach((e,k)=>{if(e&&e.equippedTo===m.uid){S(s2).st[k]=null;toGY(e);log(`${e.name} is sent to the Graveyard.`);}});
  if(m.extra){toGY(m);log(`${m.name} cannot return to the hand and is sent to the Graveyard.`,sc(f.side));}
  else{Object.assign(m,{faceUp:false,pos:"atk",equippedTo:null,guardUsed:false,tempAtk:0,tempTurn:-1,bonus:0,attackCount:0,attackedTurn:-1,summonedTurn:-1,posChangedTurn:-1});
    sd.hand.push(m);log(`${m.name} returns to ${sd.name}'s hand.`,sc(f.side));}
  render();await sleep(200);}
async function resolveQuick(s,c,ctx,targetUid){const f=c.fx,o=other(s);
  let t=null;if(targetUid){const tf=find(targetUid);if(tf&&tf.zone==="monsters")t=tf.card;}
  if(t){const okT=f.k==="qBoost"?(t.owner===s&&t.faceUp&&(!f.race||raceIs(t,f.race))):(t.owner===o&&(f.k==="qBounce"||t.faceUp)&&(f.k!=="qDestroy"||atkOf(t)<=f.maxAtk));
    if(!okT||["qNegate","qHeal","qBurn","qDraw"].includes(f.k))t=null;}
  if(!t&&!targetUid&&!isAI(s)&&["qDestroy","qBounce","qShrink","qBoost"].includes(f.k)){const ql=qCands(s,c,ctx);if(ql.length>1)t=await requestChoice(s,ql,{title:`${c.name}: choose a target`,sub:cardText(c)[0].replace(/<[^>]+>/g,"")});}
  if(!t)t=qTarget(s,c,ctx);
  if(!t){log(`${c.name} has no valid target.`,"s");return null;}
  switch(f.k){
    case "qNegate":{floatText(elOf(t.uid),"NEGATED","info");log(`${t.name}'s attack is negated!`,"s");await sleep(300);return {negated:true};}
    case "qDestroy":{impact(elOf(t.uid));await destroyMonsters([t]);break;}
    case "qBounce":{await bounceMonster(t);break;}
    case "qShrink":{addTemp(t,f.v);floatText(elOf(t.uid),`-${f.v} ATK`,"dmg");log(`${t.name} loses ${f.v} ATK this turn.`,sc(s));render();await sleep(300);break;}
    case "qBoost":{addTemp(t,-f.v);floatText(elOf(t.uid),`+${f.v} ATK`,"heal");log(`${t.name} gains ${f.v} ATK this turn!`,sc(s));render();
      await anim(elOf(t.uid),[{filter:"brightness(1)"},{filter:"brightness(2.4) hue-rotate(40deg)"},{filter:"brightness(1)"}],450);break;}
    case "qHeal":await changeLP(s,f.v);break;
    case "qBurn":await changeLP(o,-f.v);break;
    case "qDraw":await drawCards(s,f.n);if(f.heal)await changeLP(s,f.heal);break;}
  return {};}
function usableQuicks(r,ctx){return S(r).st.filter(c=>c&&isQuick(c)&&!c.faceUp&&c.setTurn<G.turn&&qTarget(r,c,ctx));}
/* the non-turn player may answer an attack (traps + set quick-plays), a summon or a spell (set quick-plays) */
async function responseWindow(r,kind,ctx){
  if(!G||G.over||G.current===r)return null;
  const quicks=usableQuicks(r,ctx);const traps=kind==="attack"?trapsFor(r):[];
  if(!quicks.length&&!traps.length)return null;
  let choice=null;
  if(isAI(r)){choice=(traps.length&&aiTrapChoice(r,ctx.att,ctx.tgt,traps))||(quicks.length&&aiQuickChoice(r,kind,ctx,quicks))||null;
    if(choice&&isQuick(choice))await sleep(250);}
  else{if(G.passTurn===G.turn&&!traps.length)return null;choice=await promptResponse(r,kind,ctx,traps,quicks);}
  if(!choice||G.over)return null;
  if(choice.type==="trap")return {trap:choice};
  return (await activateSpell(r,choice.uid,null,ctx))||{};}
/* ================= AI ================= */
function aiStyle(s){const c=G&&G.sides&&G.sides[s]&&CHARS[G.sides[s].char];return (c&&c.ai)||{};}
function oppMaxAtk(s){let m=0;for(const c of mons(other(s)))if(c.faceUp&&c.pos==="atk")m=Math.max(m,atkOf(c));return m;}
function oppMaxAny(s){let m=0;for(const c of mons(other(s)))m=Math.max(m,threat(c));return m;}
function aiDiscardPick(s){return S(s).hand.slice().sort((a,b)=>val(a)-val(b))[0];}
function val(c){return c.type==="monster"?c.atk+(c.level>=7?600:c.level>=5?-200:0)+(isEffect(c)?200:0):c.type==="spell"?1700:1400;}
function hasFxKind(fx,k){if(!fx)return false;if(Array.isArray(fx))return fx.some(f=>f.k===k);return fx.k===k;}
function summonFxValue(s,c){const f=c.fx.onSummon;if(!f)return 0;const arr=Array.isArray(f)?f:[f];let v=0;const o=other(s);
  for(const e of arr){switch(e.k){case "burn":v+=e.v/100;break;case "heal":v+=S(s).lp<6000?6:2;break;case "draw":v+=6*e.n;break;
    case "destroyST":case "destroyAllST":v+=sts(o).length?10:-2;break;case "destroyMon":v+=mons(o).length?15:-2;break;
    case "destroyWeakAll":v+=mons(o).filter(m=>atkOf(m)<=e.maxAtk).length*8;break;
    case "ssHand":v+=S(s).hand.some(x=>x!==c&&x.type==="monster"&&raceIs(x,e.race)&&x.level<=e.maxLv)?12:0;break;
    case "ssGY":v+=S(s).gy.some(x=>x.type==="monster"&&raceIs(x,e.race)&&x.level<=e.maxLv)?10:0;break;
    case "search":v+=6;break;
    case "payDraw":v+=S(s).lp>e.lp+2000?5*e.n:-4;break;case "payLP":v-=e.v/200;break;case "coin":v+=5;break;
    case "weakenAll":v+=mons(o).filter(m=>m.faceUp).length*4;break;case "drain":v+=e.v/80;break;}}
  return v;}
function aiPickAction(s,phaseNum){
  const sd=S(s),o=other(s),opp=S(o);const acts=[];
  const myBest=Math.max(0,...mons(s).filter(m=>m.faceUp).map(atkOf));
  const setSp=sd.st.filter(c=>c&&c.type==="spell"&&!c.faceUp);
  for(const c of [...sd.hand,...setSp]){const f=c.fx;const inHand=sd.hand.includes(c);
    if(isQuick(c)){aiQuickOwn(s,c,inHand,phaseNum,acts,myBest);continue;}
    if(c.type==="spell"&&!spellCanActivate(s,c)&&inHand&&phaseNum===2&&freeIdx(sd.st)>=0&&sts(s).length<=2&&sd.hand.length>=3&&["destroy1","destroyST1","revive","destroyAll"].includes(f.k))
      acts.push({sc:8,f:()=>setTrap(s,c.uid)});
    if(c.type==="spell"&&spellCanActivate(s,c)){
      switch(f.k){
        case "draw":if(sd.hand.length<=6)acts.push({sc:55,f:()=>activateSpell(s,c.uid)});break;
        case "search":acts.push({sc:52,f:()=>activateSpell(s,c.uid)});break;
        case "burn":acts.push({sc:opp.lp<=f.v?1000:28,f:()=>activateSpell(s,c.uid)});break;
        case "raceBurn":{const n=mons(s).filter(m=>m.faceUp&&m.race===f.race).length;if(n&&(opp.lp<=n*f.v||n>=2||sd.hand.length>=6))acts.push({sc:opp.lp<=n*f.v?1000:24+n*4,f:()=>activateSpell(s,c.uid)});break;}
        case "heal":if(sd.lp<=5500||sd.hand.length>=6)acts.push({sc:32,f:()=>activateSpell(s,c.uid)});break;
        case "destroy1":{const t=bestBy(mons(o),threat);const th=threat(t);
          if(th>=1700||th>myBest||mons(o).length===1&&sd.lp<4000)acts.push({sc:40+th/100,f:()=>activateSpell(s,c.uid,t.uid)});break;}
        case "destroyST1":{const t=bestBy(sts(o),x=>(x.faceUp&&x.fx.k==="cont"?3:1)+Math.random());if(phaseNum===1)acts.push({sc:34,f:()=>activateSpell(s,c.uid,t.uid)});break;}
        case "destroyAll":{const ov=mons(o).reduce((a,m)=>a+threat(m),0),mv=mons(s).reduce((a,m)=>a+(m.faceUp?atkOf(m):m.atk),0);
          if(mons(o).length>=2&&ov>mv+1200||mons(s).length===0&&mons(o).length>=1&&ov>=2400)acts.push({sc:60,f:()=>activateSpell(s,c.uid)});break;}
        case "revive":{const t=reviveTarget(s,f);if(t&&t.atk>=1500)acts.push({sc:44+t.atk/100,f:()=>activateSpell(s,c.uid)});break;}
        case "boost":{const t=bestBy(mons(s).filter(m=>m.faceUp&&m.pos==="atk"&&(!f.race||m.race===f.race)&&canAttackWithLater(s,m)),atkOf);
          if(t&&phaseNum===1&&G.turn>1){const om2=oppMaxAny(s);if(atkOf(t)<=om2&&atkOf(t)+f.v>om2||!mons(o).length||opp.lp<=atkOf(t)+f.v)acts.push({sc:opp.lp<=atkOf(t)+f.v&&!mons(o).length?900:38,f:()=>activateSpell(s,c.uid,t.uid)});}break;}
        case "fusion":acts.push({sc:70+CARDS[f.result].atk/100,f:()=>activateSpell(s,c.uid)});break;
        case "payDraw":if(sd.lp>f.lp+2000&&sd.hand.length<=6)acts.push({sc:50,f:()=>activateSpell(s,c.uid)});break;
        case "coin":if(sd.hand.length<=6||phaseNum===1)acts.push({sc:38,f:()=>activateSpell(s,c.uid)});break;
        case "weakenAll":if(phaseNum===1&&G.turn>1&&mons(s).some(m=>m.faceUp&&m.pos==="atk"))acts.push({sc:34,f:()=>activateSpell(s,c.uid)});break;
        case "drain":acts.push({sc:opp.lp<=f.v?1000:30,f:()=>activateSpell(s,c.uid)});break;
        case "cont":acts.push({sc:mons(s).some(m=>raceIs(m,f.race))?36:20,f:()=>activateSpell(s,c.uid)});break;
        case "equip":{const t=bestBy(mons(s).filter(m=>m.faceUp&&(!f.race||m.race===f.race)),atkOf);
          if(t&&(phaseNum===1||t.pos==="atk"))acts.push({sc:21,f:()=>activateSpell(s,c.uid,t.uid)});break;}
      }}
    if(!inHand)continue;
    if(c.type==="trap"&&freeIdx(sd.st)>=0)acts.push({sc:phaseNum===2?25:12,f:()=>setTrap(s,c.uid)});
    if(c.type==="monster"&&canNormalSummon(s,c)){
      const need=tributesNeeded(c);
      const fodder=mons(s).slice().sort((a,b)=>val(a)-val(b)).slice(0,need);
      const fsum=fodder.reduce((a,m)=>a+m.atk,0);const fmax=Math.max(0,...fodder.map(m=>m.atk));
      if(need&&c.atk<fmax+500)continue;
      const fv=summonFxValue(s,c);
      let sc2=need?46+c.atk/100-fsum/250:40+Math.max(c.atk,c.def)/120;
      const om=oppMaxAny(s);
      const aggro=aiStyle(s).aggro?300:0;
      let setMode=!(c.atk+aggro>=om||mons(o).length===0&&c.atk>=1000)&&!(need>0&&c.atk>=2400);
      if(c.fx.flip&&c.atk<om+300)setMode=true;
      if(fv>=6&&!c.fx.flip)setMode=false;
      if(!setMode)sc2+=fv;
      if(c.fx.aura&&!setMode)sc2+=mons(s).filter(m=>raceIs(m,c.fx.aura.race)).length*3;
      acts.push({sc:sc2,f:()=>normalSummon(s,c.uid,fodder.map(m=>m.uid),setMode)});
    }}
  const om=oppMaxAtk(s),oany=oppMaxAny(s);
  for(const m of mons(s)){if(m.summonedTurn===G.turn||m.posChangedTurn===G.turn)continue;
    if(!m.faceUp&&phaseNum===1&&(m.atk>oany||m.fx.flip||m.ace))acts.push({sc:26,f:()=>changePosition(s,m.uid)});
    else if(m.faceUp&&m.pos==="def"&&phaseNum===1&&atkOf(m)>oany)acts.push({sc:22,f:()=>changePosition(s,m.uid)});
    else if(m.faceUp&&m.pos==="atk"&&phaseNum===2&&atkOf(m)<om&&m.def>atkOf(m))acts.push({sc:18,f:()=>changePosition(s,m.uid)});}
  acts.sort((a,b)=>b.sc-a.sc);return acts[0]||null;}
async function aiMain(s,phaseNum){for(let k=0;k<30;k++){if(G.over)return;const a=aiPickAction(s,phaseNum);if(!a)break;await a.f();await sleep(350);}}
function aiChooseTarget(s,att){const o=other(s);const opp=mons(o);
  const A=atkOf(att);if(!opp.length)return {t:null};
  let best=null,bs=0;
  for(const t of opp){let sc2=0;const guard=t.fx.guard&&!t.guardUsed&&t.faceUp;
    if(t.faceUp&&t.pos==="atk"){const D=atkOf(t);if(A>D)sc2=(guard?30:100)+D/10+(A-D)/100;else if(A===D&&!guard&&(aiStyle(s).aggro||t.atk>=att.atk&&S(s).lp>S(o).lp))sc2=15;}
    else if(t.faceUp&&t.pos==="def"){if(A>t.def)sc2=(guard?(att.fx.pierce?35:5):60)+t.atk/20+(att.fx.pierce?(A-t.def)/50:0);}
    else{if(A>=(aiStyle(s).aggro?1700:1900))sc2=40;}
    if(sc2>bs){bs=sc2;best=t;}}
  if(att.fx.direct){const dsc=50+A/50;if(dsc>bs||S(o).lp<=A)return {t:null};}
  return best?{t:best}:null;}
async function aiBattle(s){
  const list=mons(s).filter(m=>m.faceUp&&m.pos==="atk").sort((a,b)=>atkOf(b)-atkOf(a));
  for(const m of list){for(let rep=0;rep<(m.fx.double?2:1);rep++){if(G.over||G.phase!=="battle"||G.battleEnded)return;const f=find(m.uid);if(!f||f.zone!=="monsters"||!canAttackWith(s,m))break;
    const ch=aiChooseTarget(s,m);if(!ch)break;await attack(s,m.uid,ch.t?ch.t.uid:null);await sleep(350);}}}
function canAttackWithLater(s,m){return m.attackedTurn!==G.turn||(m.fx.double&&m.attackCount<2);}
async function aiTurn(s){
  await sleep(400);await aiMain(s,1);
  if(G.turn>1){G.phase="battle";render();await sleep(500);await aiBattle(s);}
  G.phase="main2";render();await sleep(300);await aiMain(s,2);await sleep(250);}
function aiTrapChoice(o,att,tgt,traps){
  const p=previewBattle(att,tgt);const A=atkOf(att);const lethal=p.dmgDef>=S(o).lp;
  const bad=p.killDef||p.dmgDef>=1000;
  const by=k=>traps.find(t=>t.fx.k===k);
  if(lethal)return by("destroyAttacker")||by("negate")||by("noDamage")||by("shrink");
  if(bad&&A>=1500&&by("destroyAttacker"))return by("destroyAttacker");
  if(bad&&by("shrink")){const t=by("shrink");const A2=A-t.fx.v;
    if(!tgt||(tgt.pos==="atk"?atkOf(tgt)>=A2:tgt.def>=A2))return t;}
  if(bad&&by("negate"))return by("negate");
  if(p.dmgDef>=1200&&!p.killDef&&by("noDamage"))return by("noDamage");
  if(!tgt&&A>=1500&&by("noDamage"))return by("noDamage");
  if(A>=1200&&by("burnBack"))return by("burnBack");
  return null;}

/* ---------- v4: quick-play spells ---------- */
function aiQuickOwn(s,c,inHand,phaseNum,acts,myBest){const f=c.fx,o=other(s),sd=S(s),opp=S(o);
  const can=spellCanActivate(s,c);const t=can?qTarget(s,c,{}):null;
  if(t)switch(f.k){
    case "qDestroy":case "qBounce":{const th=threat(t);if(phaseNum===1&&G.turn>1&&(th>=2000&&th>myBest||f.k==="qBounce"&&t.ace))acts.push({sc:36+th/200,f:()=>activateSpell(s,c.uid)});break;}
    case "qBoost":{if(phaseNum===1&&G.turn>1&&!mons(o).length&&t.pos==="atk"&&canAttackWithLater(s,t)&&opp.lp<=atkOf(t)+f.v&&opp.lp>atkOf(t))acts.push({sc:900,f:()=>activateSpell(s,c.uid,t.uid)});break;}
    case "qHeal":if(sd.lp<=2500)acts.push({sc:30,f:()=>activateSpell(s,c.uid)});break;
    case "qBurn":if(opp.lp<=f.v)acts.push({sc:1000,f:()=>activateSpell(s,c.uid)});break;
    case "qDraw":if(inHand&&sd.hand.length<=3)acts.push({sc:30,f:()=>activateSpell(s,c.uid)});break;}
  /* reactive quick-plays are worth more Set, waiting for the opponent's turn */
  if(inHand&&freeIdx(sd.st)>=0&&sts(s).length<4)acts.push({sc:phaseNum===2?27:13,f:()=>setTrap(s,c.uid)});}
function aiQuickChoice(r,kind,ctx,quicks){const lp=S(r).lp,opp=S(other(r));
  const on=(k,m)=>quicks.find(q=>q.fx.k===k&&(!m||qTarget(r,q,ctx)===m));
  if(kind==="attack"){const att=ctx.att,tgt=ctx.tgt;const p=previewBattle(att,tgt);const A=atkOf(att);
    const lethal=p.dmgDef>=lp;const bad=lethal||p.dmgDef>=1000||(p.killDef&&tgt&&(tgt.ace||threat(tgt)>=1500));
    if(tgt&&tgt.faceUp&&tgt.pos==="atk"){
      const b=quicks.find(q=>q.fx.k==="qBoost"&&qTarget(r,q,ctx)===tgt&&atkOf(tgt)+q.fx.v>A);if(b)return b;
      const sh=quicks.find(q=>q.fx.k==="qShrink"&&qTarget(r,q,ctx)===att&&atkOf(tgt)>A-q.fx.v);if(sh&&(bad||A>=1600))return sh;}
    if(bad){const d=on("qDestroy",att);if(d)return d;
      const b=on("qBounce",att);if(b&&(lethal||A>=1700||att.ace))return b;
      const n=on("qNegate",att);if(n)return n;
      const sh=on("qShrink",att);if(sh&&(lethal||(tgt?(tgt.pos==="atk"&&tgt.faceUp?atkOf(tgt):tgt.def)>=A-sh.fx.v:A-sh.fx.v<p.dmgDef)))return sh;
      const h=on("qHeal");if(lethal&&h&&lp+h.fx.v>p.dmgDef)return h;}
    if(!tgt&&A>=1800){const d=on("qDestroy",att)||on("qNegate",att);if(d)return d;}
    return on("qDraw")||null;}
  if(kind==="summon"){const m=ctx.summoned;if(!m||!m.faceUp)return on("qDraw")||null;
    const d=on("qDestroy",m);if(d&&(atkOf(m)>=1600||m.ace))return d;
    const b=on("qBounce",m);if(b&&(m.ace||tributesNeeded(m)>0&&atkOf(m)>=2200))return b;
    return on("qDraw")||null;}
  if(kind==="spell"){const h=on("qHeal");if(h&&lp<=2000)return h;const bu=on("qBurn");if(bu&&opp.lp<=bu.fx.v)return bu;return on("qDraw")||null;}
  return null;}
/* ================= HUMAN DUEL UI ================= */
function promptTrap(o,att,tgt,traps){return new Promise(res=>{
  const p=previewBattle(att,tgt);
  $("#modalLayer").innerHTML=`<div class="modal-bg" style="background:rgba(5,3,12,.55)"><div class="modal" style="width:600px">
   <h2>⚠ Trap window</h2><p>${S(other(o)).name}'s <b>${att.name}</b> (ATK ${atkOf(att)}) attacks ${tgt?"your <b>"+tgt.name+"</b>"+(tgt.faceUp?"":" (face-down)"):"you <b>directly</b>"}!<br>
   <span style="opacity:.8">If unanswered: ${p.dmgDef?`you take ${p.dmgDef} damage`:"you take no damage"}${p.killDef?", your monster is destroyed":""}${p.dmgAtt?`, they take ${p.dmgAtt}`:""}${p.killAtt&&tgt?", the attacker is destroyed":""}.</span></p>
   <div class="gygrid" style="justify-content:center">${traps.map(t=>`<div style="display:flex;flex-direction:column;align-items:center;gap:6px;max-width:150px">${cardHTML(t,{noUid:true})}<div style="font-size:11px;text-align:center">${cardText(t)[0]}</div><button class="btn gold" data-trap="${t.uid}">Activate</button></div>`).join("")}</div>
   <div class="btnrow"><button class="btn" data-trap="0">Don't activate</button></div></div></div>`;
  document.querySelectorAll("[data-trap]").forEach(b=>b.onclick=()=>{const id=+b.dataset.trap;$("#modalLayer").innerHTML="";res(id?traps.find(t=>t.uid===id):null);});});}
function promptResponse(r,kind,ctx,traps,quicks){return new Promise(res=>{
  const foe=S(other(r)).name;let head,sub="";
  if(kind==="attack"){const att=ctx.att,tgt=ctx.tgt,p=previewBattle(att,tgt);
    head=`${foe}'s <b>${att.name}</b> (ATK ${atkOf(att)}) attacks ${tgt?"your <b>"+(tgt.faceUp?tgt.name:"face-down monster")+"</b>":"you <b>directly</b>"}!`;
    sub=`If unanswered: ${p.dmgDef?`you take ${p.dmgDef} damage`:"you take no damage"}${p.killDef?", your monster is destroyed":""}${p.dmgAtt?`, they take ${p.dmgAtt}`:""}${p.killAtt&&tgt?", the attacker is destroyed":""}.`;}
  else if(kind==="summon")head=`${foe} summons <b>${ctx.summoned.name}</b> (ATK ${atkOf(ctx.summoned)}).`;
  else head=`${foe} activates <b>${ctx.spell.name}</b>.`;
  const opts=[...traps,...quicks];
  const title=traps.length&&!quicks.length?"Trap window":quicks.length&&!traps.length?"Activate a Quick-Play?":"Activate a Trap or Quick-Play?";
  $("#modalLayer").innerHTML=`<div class="modal-bg" style="background:rgba(5,3,12,.55)"><div class="modal resp" id="respbox" style="width:${Math.min(860,Math.max(560,opts.length*170+80))}px">
   <h2>${title}</h2><p>${head}${sub?`<br><span style="opacity:.8">${sub}</span>`:""}</p>
   <div class="gygrid" style="justify-content:center">${opts.map(t=>{const tg=isQuick(t)?qTarget(r,t,ctx):null;
     return `<div class="respopt"><div style="font-size:10px">${cardHTML(t,{noUid:true})}</div><div style="font-size:11px;text-align:center">${cardText(t)[0]}${tg&&tg!==true?`<br><span style="opacity:.75">Target: ${tg.faceUp?tg.name:"face-down monster"}</span>`:""}</div><button class="btn gold" data-resp="${t.uid}">Activate</button></div>`;}).join("")}</div>
   <div class="btnrow"><button class="btn" data-resp="0">Don't activate</button>${quicks.length&&!traps.length?`<button class="btn" data-resp="-1" title="Skip Quick-Play prompts until your opponent's turn ends">Pass for this turn</button>`:""}</div></div></div>`;
  document.querySelectorAll("[data-resp]").forEach(b=>b.onclick=()=>{const id=+b.dataset.resp;$("#modalLayer").innerHTML="";if(id===-1)G.passTurn=G.turn;res(id>0?opts.find(t=>t.uid===id):null);});});}
function closeMenu(){const m=$("#menuLayer");if(m)m.innerHTML="";}
function openMenu(el,items){closeMenu();const p=appPos(el);const r=el.getBoundingClientRect();
  const d=document.createElement("div");d.className="menu";d.style.left=p.x+"px";d.style.top=(p.y-r.height/2/SCALE-6)+"px";
  items.forEach(it=>{const b=document.createElement("button");b.className="btn"+(it.cls?" "+it.cls:"");b.textContent=it.label;b.disabled=!!it.disabled;
    b.onclick=e=>{e.stopPropagation();closeMenu();if(!it.disabled)it.fn();};d.appendChild(b);});
  $("#menuLayer").appendChild(d);}
function humanTurn(){return G&&G.current==="player"&&!G.auto&&!G.busy&&!G.over;}
function act(fn){G.busy=true;closeMenu();render();Promise.resolve().then(fn).catch(e=>{if(e!==ABORT)console.error(e);}).finally(()=>{if(G&&!G.over&&G.current==="player"&&!G.auto)G.busy=false;render();});}
function inMain(){return G.phase==="main1"||G.phase==="main2";}
function onCardClick(uid,el){
  const f=find(uid);if(!f)return;const c=f.card;
  if(G.ui.mode==="discard"){if(f.side==="player"&&f.zone==="hand"){discard("player",uid);render();if(S("player").hand.length<=HAND_LIMIT&&G.discardDone)G.discardDone();}return;}
  if(!humanTurn())return;const ui=G.ui;
  if(ui.mode==="tribute"){
    if(f.side==="player"&&f.zone==="monsters"){const i=ui.chosen.indexOf(uid);if(i>=0)ui.chosen.splice(i,1);else ui.chosen.push(uid);
      if(ui.chosen.length===ui.need){const ch=ui.chosen.slice(),h=ui.handUid,sm=ui.set,pf=ui.pref;G.ui={mode:null};act(()=>normalSummon("player",h,ch,sm,pf));}else render();}
    return;}
  if(ui.mode==="target"){if(ui.valid.includes(uid)){const h=ui.handUid,pf=ui.pref;G.ui={mode:null};act(()=>activateSpell("player",h,uid,null,pf));}return;}
  if(ui.mode==="attack"){
    if(f.side==="enemy"&&f.zone==="monsters"){const a=ui.attUid;G.ui={mode:null};act(()=>attack("player",a,uid));return;}
    if(uid===ui.attUid){G.ui={mode:null};render();return;}}
  if(f.side!=="player")return;
  if(f.zone==="hand"&&(inMain()||G.phase==="battle"&&isQuick(c))){
    const items=[];const stFree=freeIdx(S("player").st)>=0;
    if(c.type==="monster"){const ok=canNormalSummon("player",c);const need=tributesNeeded(c);const why=S("player").normalSummoned?" (used)":"";
      items.push({label:`⚔ Summon${need?` (tribute ${need})`:""}${why}`,disabled:!ok,cls:"gold",fn:()=>startSummon(c,false)});
      items.push({label:`🂠 Set${need?` (tribute ${need})`:""}${why}`,disabled:!ok,fn:()=>startSummon(c,true)});}
    else if(c.type==="spell"){items.push({label:"✨ Activate",disabled:!spellCanActivate("player",c),cls:"gold",fn:()=>startSpell(c)});
      if(inMain())items.push({label:"🂠 Set",disabled:!stFree,fn:()=>act(()=>setTrap("player",c.uid))});}
    else items.push({label:"🂠 Set",disabled:freeIdx(S("player").st)<0,cls:"gold",fn:()=>act(()=>setTrap("player",c.uid))});
    items.push({label:"🔍 Inspect",fn:()=>inspect(c.uid)});
    items.push({label:"Cancel",fn:()=>{}});openMenu(el,items);return;}
  if(f.zone==="st"&&!c.faceUp&&c.type==="spell"&&(inMain()||G.phase==="battle"&&isQuick(c))){
    const ok=spellCanActivate("player",c);const why=isQuick(c)&&c.setTurn>=G.turn?" (not the turn it was Set)":"";
    openMenu(el,[{label:"✨ Activate"+why,disabled:!ok,cls:"gold",fn:()=>startSpell(c)},{label:"🔍 Inspect",fn:()=>inspect(c.uid)},{label:"Cancel",fn:()=>{}}]);return;}
  if(f.zone==="monsters"){
    if(G.phase==="battle"&&canAttackWith("player",c)){
      if(!mons("enemy").length){openMenu(el,[{label:`⚡ Direct attack (${atkOf(c)})`,cls:"red",fn:()=>act(()=>attack("player",c.uid,null))},{label:"Cancel",fn:()=>{}}]);return;}
      G.ui={mode:"attack",attUid:uid};render();return;}
    if(inMain()){const can=c.summonedTurn!==G.turn&&c.posChangedTurn!==G.turn;
      const label=!c.faceUp?"🔄 Flip Summon":c.pos==="atk"?"🛡 Change to Defense":"⚔ Change to Attack";
      openMenu(el,[{label:label+(can?"":" (not this turn)"),disabled:!can,cls:"gold",fn:()=>act(()=>changePosition("player",c.uid))},{label:"🔍 Inspect",fn:()=>inspect(c.uid)},{label:"Cancel",fn:()=>{}}]);}}}
function startSummon(c,setMode,pref){const need=tributesNeeded(c);
  if(!need){act(()=>normalSummon("player",c.uid,[],setMode,pref));return;}
  G.ui={mode:"tribute",handUid:c.uid,need,chosen:[],set:setMode,pref};render();}
function spellTargets(c){const f=c.fx;
  if(f.k==="destroy1")return mons("enemy").map(m=>m.uid);
  if(f.k==="destroyST1")return sts("enemy").map(m=>m.uid);
  if(f.k==="boost"||f.k==="equip")return mons("player").filter(m=>m.faceUp&&(!f.race||m.race===f.race)).map(m=>m.uid);
  return null;}
function startSpell(c,pref,target){const v=spellTargets(c);
  if(v&&target&&v.includes(target)){act(()=>activateSpell("player",c.uid,target,null,pref));return;}
  if(v){G.ui={mode:"target",handUid:c.uid,valid:v,pref};render();return;}
  act(()=>activateSpell("player",c.uid,isQuick(c)?target:null,null,pref));}
function phaseAct(a){if(!humanTurn())return;G.ui={mode:null};closeMenu();
  if(a==="battle"){G.phase="battle";log("You enter the Battle Phase.","p");render();}
  else if(a==="main2"){G.phase="main2";render();}
  else if(a==="end"){G.busy=true;render();if(G.humanEnd)G.humanEnd();}}

/* ================= RENDER ================= */
function cardHTML(c,o){o=o||{};
  if(o.def){const oo=Object.assign({},o,{def:false});return `<div class="def">${cardHTML(c,oo)}</div>`;}
  const uid=o.noUid?"":` data-uid="${c.uid}"`;const cls=o.cls||"";
  if(o.hidden)return `<div class="card back ${cls}"${uid}><div class="bk"></div>${o.qp?`<span class="c-qp" title="Quick-Play"></span>`:""}${o.setmark?`<div class="setmark">${o.setmark}</div>`:""}</div>`;
  const art=c.type==="monster"?"a-"+c.attr:c.type==="spell"?"a-SPELL":"a-TRAP";
  const txt=cardText(c);
  const tcls=c.type==="monster"?(c.ace?"monster effect ace":txt.length?"monster effect":"monster normal"):c.type;
  let mid,bottom="";
  if(c.type==="monster"){mid=`<div class="c-stars"><span class="c-at at-${c.attr}">${c.attr}</span><span class="st">${"★".repeat(c.level)}</span></div>`;
    const a=o.onField&&G?atkOf(c):c.atk;
    bottom=`<div class="c-type">[${c.race}${txt.length?" / Effect":""}]</div><div class="c-stats">ATK/<span class="${a>c.atk?"buff":a<c.atk?"nerf":""}">${a}</span> DEF/${c.def}</div>`;}
  else mid=`<div class="c-kind${c.kind==="Quick-Play"?" qk":""}">[${c.type==="trap"?"TRAP CARD":c.kind==="Equip"?"EQUIP SPELL":c.kind==="Continuous"?"CONT. SPELL":c.kind==="Quick-Play"?"QUICK-PLAY SPELL":"SPELL CARD"}]</div>`;
  return `<div class="card ${tcls} ${art} ${c.kind==="Quick-Play"?"quick":""} ${cls}"${uid}>
    <div class="c-name"><b>${c.name}</b>${c.kind==="Quick-Play"?`<span class="c-qp" title="Quick-Play"></span>`:""}</div>${mid}
    <div class="c-art">${artImg(c)}</div>${bottom}
    <div class="c-desc">${c.type==="monster"?`<b>${c.attr} · Level ${c.level}${c.ace?" · ACE":""}</b> · ${c.destiny?"Special Summon only (Chronicles Link)":"Tributes: "+tributesNeeded(c)}<br>`:`<b>${c.kind} ${c.type==="spell"?"Spell":"Trap"}</b><br>`}${txt.join("<br>")}${c.flavor?`${txt.length?"<br>":""}<span class="fl">${c.flavor}</span>`:""}</div></div>`;}
function duelistHTML(s){ensurePorts();const sd=S(s);const ch=CHARS[sd.char];
  const tg=s==="enemy"&&G.ui.mode==="attack"&&(()=>{const a=find(G.ui.attUid);return !mons("enemy").length||(a&&a.card.fx.direct);})();
  return `<div class="duelist ${s} ${G.current===s?"active":""} ${tg?"targetable":""}" data-lp="${s}" style="--c:${ch.color}">
   <div class="top"><div><div class="dname">${sd.name}</div><div class="dsub">${ch.race?ch.race+" Duelist":"Multicolor Duelist"}</div></div></div>
   <div class="lp">LIFE POINTS</div><div class="lpnum">${sd.lp}</div><div class="lpbar"><div style="width:${Math.min(100,sd.lp/START_LP*100)}%"></div></div>
   <div class="counts"><span>✋ ${sd.hand.length}</span><span>🂠 ${sd.deck.length}</span><span>⚰ ${sd.gy.length}</span></div></div>`;}
function render(){if(!G)return;
  const ui=G.ui,me=G.current==="player"&&!G.auto&&!G.over;
  ensurePorts();$("#duel-enemy .dinfo").innerHTML=duelistHTML("enemy");$("#duel-player .dinfo").innerHTML=duelistHTML("player");
  $("#ehand").innerHTML=S("enemy").hand.map(c=>cardHTML(c,{hidden:true})).join("");
  for(const s of ["player","enemy"]){const p=sc(s);const sd=S(s);
    $(`#${p}-m`).innerHTML=sd.monsters.map(c=>`<div class="zone mz">${c?fieldMonster(c,s):""}</div>`).join("");
    $(`#${p}-st`).innerHTML=sd.st.map(c=>`<div class="zone sz">${c?fieldST(c,s):""}</div>`).join("");
    $(`#${p}-deck`).innerHTML=(sd.deck.length?cardHTML({},{hidden:true,noUid:true}):`<div class="emptyp"></div>`)+`<div class="lbl">Deck ${sd.deck.length}</div>`;
    const top=sd.gy[sd.gy.length-1];
    $(`#${p}-gy`).innerHTML=(top?cardHTML(top,{noUid:true}):`<div class="emptyp"></div>`)+`<div class="lbl">Graveyard ${sd.gy.length}</div>`;}
  const hand=S("player").hand;const ph=$("#phand");ph.classList.toggle("many",hand.length>7);
  ph.innerHTML=hand.map(c=>{let cls="";
    if(G.auto)return cardHTML(c,{});
    if(ui.mode==="discard")cls="discardable";
    else if(me&&!G.busy&&inMain()&&!ui.mode){if(c.type==="monster"?canNormalSummon("player",c):c.type==="spell"?spellCanActivate("player",c)||freeIdx(S("player").st)>=0:freeIdx(S("player").st)>=0)cls="playable";}
    else if(me&&!G.busy&&G.phase==="battle"&&!ui.mode&&isQuick(c)&&spellCanActivate("player",c))cls="playable";
    if(ui.handUid===c.uid)cls+=" selected";return cardHTML(c,{cls});}).join("");
  const phs=[["draw","DP"],["main1","M1"],["battle","BP"],["main2","M2"],["end","EP"]];
  let btns="";
  if(me&&!G.busy){
    if(G.phase==="main1")btns+=`<button class="btn red" data-phase="battle" ${G.turn===1?"disabled title='No battle on the first turn'":""}>⚔ Battle</button>`;
    if(G.phase==="battle")btns+=`<button class="btn" data-phase="main2">Main 2 ▶</button>`;
    if(inMain()||G.phase==="battle")btns+=`<button class="btn gold" data-phase="end">End Turn ⏭</button>`;}
  $("#phasebar").innerHTML=`<div class="turninfo ${G.current==="player"?"p":"e"}">Turn ${G.turn} · ${G.current?S(G.current).name.toUpperCase():""}</div>
    <div class="phases">${phs.map(([k,l])=>`<span class="ph ${G.phase===k?"on":""} ${k==="battle"&&G.turn===1?"skip":""}">${l}</span>`).join("")}</div><div class="pbtns">${btns}</div>`;
  let hint="";
  if(G.over)hint=G.winner==="player"?"You won the duel!":"You lost the duel.";
  else if(ui.mode==="discard")hint=`Hand limit is ${HAND_LIMIT}: click ${S("player").hand.length-HAND_LIMIT} card(s) in your hand to discard.`;
  else if(ui.mode==="tribute")hint=`Select ${ui.need-ui.chosen.length} more monster(s) to tribute. (Esc to cancel)`;
  else if(ui.mode==="target")hint="Choose a target. (Esc to cancel)";
  else if(ui.mode==="attack")hint="Choose an enemy monster"+((find(ui.attUid)||{card:{fx:{}}}).card.fx.direct?" — or the rival's LP panel for a Phantom Strike":"")+" to attack. (Esc to cancel)";
  else if(G.auto)hint="Auto-duel in progress…";
  else if(G.current==="enemy")hint=`${S("enemy").name} is thinking…`;
  else if(me&&G.phase==="battle")hint="Battle Phase: drag a glowing monster onto a target (or click it) to attack.";
  else if(me&&inMain())hint=S("player").normalSummoned?"Activate or Set spells, set traps, or change positions. Then Battle or End Turn.":"Drag a card from your hand onto a zone (or click it) to Summon, Set or Activate. Right-click to inspect.";
  $("#hint").textContent=hint;}
function fieldMonster(c,s){const ui=G.ui;let cls="";const mine=s==="player";
  if(mine&&canAttackWith("player",c)&&!G.auto&&!G.busy&&!ui.mode)cls="ready";
  if(ui.mode==="attack"&&!mine)cls="targetable";
  if(ui.mode==="attack"&&ui.attUid===c.uid)cls="selected";
  if(ui.mode==="target"&&ui.valid.includes(c.uid))cls="targetable";
  if(ui.mode==="tribute"&&mine)cls=ui.chosen.includes(c.uid)?"chosen":"tributable";
  const eq=allField().filter(e=>e.equippedTo===c.uid).reduce((a,e)=>a+e.fx.v,0);
  const h=cardHTML(c,{hidden:!c.faceUp,def:c.pos==="def",onField:true,cls,setmark:mine&&!c.faceUp?"SET":""});
  return h+(eq?`<span class="equipmark">EQ +${eq}</span>`:"")+(c.faceUp&&c.fx.guard&&!c.guardUsed?`<span class="guardmark">GUARD</span>`:"");}
function fieldST(c,s){const ui=G.ui;let cls="";if(ui.mode==="target"&&ui.valid.includes(c.uid))cls="targetable";
  const mine=s==="player"&&!G.auto,me=mine&&G.current==="player"&&!G.busy&&!G.over&&!ui.mode;
  let mark="";if(mine&&!c.faceUp){mark="SET";
    if(c.type==="spell"){const ready=me&&(inMain()||G.phase==="battle"&&isQuick(c))&&spellCanActivate("player",c);
      if(ready){cls+=" activatable";mark="SET · READY";}else if(isQuick(c))mark="SET · QP";}}
  return cardHTML(c,{hidden:!c.faceUp,cls,setmark:mark,qp:!c.faceUp&&mine&&isQuick(c)});}
function renderLog(){const l=$("#log");if(l&&G)l.innerHTML=G.log.slice(0,40).map(e=>`<div class="${e.cls}">${e.msg}</div>`).join("");}
function canSee(f){const c=f.card;if(f.zone==="gy")return true;if(f.side==="player")return true;if(G.auto)return true;return c.faceUp&&f.zone!=="hand"&&f.zone!=="deck";}
function atkBreakdown(m){const parts=[];
  for(const c of allField())if(c.equippedTo===m.uid)parts.push([c.name,c.fx.v]);
  if(m.faceUp){const sd=S(m.owner);
    for(const c of sd.monsters)if(c&&c.faceUp&&c.fx.aura&&c.fx.aura.race===m.race)parts.push([c.name,c.fx.aura.atk]);
    for(const c of sd.st)if(c&&c.faceUp&&c.type==="spell"&&c.fx.k==="cont"&&c.fx.race===m.race)parts.push([c.name,c.fx.atk]);
    if(m.fx.auraPer){const n=sd.monsters.filter(c=>c&&c!==m&&c.faceUp&&c.race===m.fx.auraPer.race).length;if(n)parts.push([`Fan Power (${n} other ${m.fx.auraPer.race}${n>1?"s":""})`,n*m.fx.auraPer.atk]);}}
  if(m.bonus)parts.push(["Reps (permanent)",m.bonus]);
  if(m.tempTurn===G.turn&&m.tempAtk)parts.push(["Until end of turn",-m.tempAtk]);
  return parts;}
function detailInfo(f){const c=f.card;const zoneName={hand:"In hand",monsters:"On the field",st:"Spell & Trap Zone",gy:"In the Graveyard",deck:"Deck"}[f.zone];
  let h=`<div><b>${f.side==="player"?S("player").name:S("enemy").name}</b> · ${zoneName}</div>`;
  if(c.type==="monster"&&f.zone==="monsters"){
    h+=`<div>${c.faceUp?(c.pos==="atk"?"Attack Position":"Defense Position"):"Set face-down (Defense)"}${c.faceUp&&c.fx.guard?(c.guardUsed?" · Stalwart used":" · Stalwart ready"):""}</div>`;
    const a=atkOf(c),br=atkBreakdown(c);
    h+=`<div>Current: <b class="${a>c.atk?"up":a<c.atk?"dn":""}">ATK ${a}</b> / <b>DEF ${c.def}</b>${a!==c.atk?` <span style="opacity:.7">(base ${c.atk})</span>`:""}</div>`;
    for(const [n,v] of br)h+=`<div class="${v>0?"up":"dn"}">${v>0?"+":""}${v} ATK — ${n}</div>`;
    if(c.attackedTurn===G.turn)h+=`<div style="opacity:.7">${c.fx.double&&c.attackCount<2?"Attacked once — can attack again":"Already attacked this turn"}</div>`;}
  if(c.type==="spell"&&f.zone==="st"&&!c.faceUp){const q=isQuick(c);
    h+=`<div>Set face-down. ${q?(c.setTurn<G.turn?"Can be activated on either player's turn.":"Activatable from the next turn (either player's).")
      :"Activate it during your Main Phase."}${f.side==="player"&&G.current==="player"&&!G.auto&&spellCanActivate("player",c)?' <b class="up">Click to activate.</b>':""}</div>`;}
  if(c.type==="spell"&&f.zone==="st"&&c.equippedTo){const t=find(c.equippedTo);if(t)h+=`<div>Equipped to <b>${t.card.name}</b></div>`;}
  if(c.type==="trap"&&f.zone==="st"&&!c.faceUp)h+=`<div>${c.setTurn<G.turn?"Ready to activate on the opponent's attack":"Set this turn — usable from the opponent's next turn"}${c.fx.needRace&&!controlsRace(c.owner,c.fx.needRace)?`<br><span class="dn">Needs a face-up ${c.fx.needRace}</span>`:""}</div>`;
  return `<div class="pinfo">${h}</div>`;}
const PREVIEW_EMPTY='<div class="empty">Hover a card to see its details<br>(right-click for full view)</div>';
let prevUid=null,prevTimer=null;
function showPreview(uid){clearTimeout(prevTimer);const f=find(uid);if(!f)return;
  prevUid=uid;const c=f.card;
  $("#preview").innerHTML=canSee(f)?`<div class="pvcard">${cardHTML(c,{noUid:true,onField:f.zone==="monsters",cls:"lg"})}</div>${detailInfo(f)}`
    :`<div class="fdown">${cardHTML(c,{hidden:true,noUid:true,cls:"lg"})}</div><div class="pinfo"><b>Face-down card</b><br>${f.zone==="hand"?"A card in the opponent's hand.":f.zone==="monsters"?"A face-down monster in Defense Position.":"A Set Spell/Trap card."}</div>`;}
function hidePreview(){clearTimeout(prevTimer);prevTimer=setTimeout(()=>{prevUid=null;const p=$("#preview");if(p)p.innerHTML=PREVIEW_EMPTY;},140);}
function inspectCardHTML(c,onField){return `<div style="font-size:24px;display:flex;justify-content:center">${cardHTML(c,{noUid:true,onField,cls:"lg"})}</div>`;}
function inspect(uid){const f=find(uid);if(!f||!canSee(f))return;
  $("#modalLayer").innerHTML=`<div class="modal-bg" id="insp" style="cursor:pointer"><div>${inspectCardHTML(f.card,f.zone==="monsters")}<div style="text-align:center;margin-top:10px;opacity:.7">Click anywhere to close</div></div></div>`;
  $("#insp").onclick=()=>{$("#modalLayer").innerHTML="";};}
function showGY(s){const gy=S(s).gy;
  $("#modalLayer").innerHTML=`<div class="modal-bg"><div class="modal" style="width:960px"><h2>⚰ ${S(s).name} — Graveyard (${gy.length})</h2>
  <div class="gywrap"><div class="gygrid" id="gygrid">${gy.length?gy.map(c=>cardHTML(c,{noUid:true}).replace('<div class="card','<div data-guid="'+c.uid+'" class="card')).join(""):"<i>Empty.</i>"}</div>
  <div id="gyprev"><div style="opacity:.45;font-size:12px;margin-top:140px;text-align:center">Hover a card to see its details</div></div></div>
  <div class="btnrow"><button class="btn gold" id="btn-close-gy">Close</button></div></div></div>`;
  const gp=$("#gyprev");let t=null;
  document.querySelectorAll("#gygrid [data-guid]").forEach(el=>{el.onmouseenter=()=>{clearTimeout(t);const c=find(+el.dataset.guid);if(c)gp.innerHTML=`<div style="font-size:15px">${cardHTML(c.card,{noUid:true,cls:"lg"})}</div>`;};
    el.onmouseleave=()=>{clearTimeout(t);t=setTimeout(()=>{gp.innerHTML='<div style="opacity:.45;font-size:12px;margin-top:140px;text-align:center">Hover a card to see its details</div>';},140);};});
  $("#btn-close-gy").onclick=()=>{$("#modalLayer").innerHTML="";};}
/* ================= BOSS ENTRANCE CINEMATICS ================= */
const THEME_COL={Vehicle:"#ff3b55",Catgirl:"#ffb36b",Nemesis:"#d0243c",Runner:"#3fa9ff",Robot:"#ff3030",Idol:"#ffcf4a",Warrior:"#ffe9a8",Dragon:"#ff5a1f",Machine:"#5fd4ff",Spellcaster:"#c77bff",Beast:"#7bd36b",Fairy:"#ff9fd8"};
let cineSkip=null;
function cineClose(){clipClose();const c=$("#cine");if(c){c.classList.remove("on");c.innerHTML="";}if(cineSkip){const f=cineSkip;cineSkip=null;f();}}
function rnd(a,b){return a+Math.random()*(b-a);}
function part(layer,html,css,kf,dur,delay,opt){const d=document.createElement("div");d.className="pt";d.innerHTML=html;Object.assign(d.style,css);layer.appendChild(d);
  setTimeout(()=>{anim(d,kf,dur,Object.assign({fill:"forwards"},opt||{}));},(delay||0)*SPEED);return d;}
function themeFX(race,L){
  const W=1280,H=800;
  if(race==="Dragon"){
    part(L,"",{left:"640px",top:"370px",width:"400px",height:"400px",marginLeft:"-200px",marginTop:"-200px",borderRadius:"50%",background:"radial-gradient(circle,#fff6c0,#ff9a2b 30%,#ff3b1a 55%,transparent 70%)"},
      [{transform:"scale(0)",opacity:1},{transform:"scale(4.5)",opacity:0}],1100,150);
    for(let i=0;i<34;i++)part(L,"🔥",{left:rnd(0,W)+"px",top:(H+20)+"px",fontSize:rnd(30,80)+"px"},[{transform:"translateY(0) scale(.6)",opacity:0},{opacity:1,offset:.2},{transform:`translateY(${-rnd(300,800)}px) scale(1.3)`,opacity:0}],rnd(1200,2000),rnd(0,900));
    for(let i=0;i<40;i++)part(L,"",{left:"640px",top:"370px",width:"6px",height:"6px",borderRadius:"50%",background:"#ffb02b",boxShadow:"0 0 8px #ff6a00"},[{transform:"translate(0,0)",opacity:1},{transform:`translate(${rnd(-700,700)}px,${rnd(-450,450)}px)`,opacity:0}],rnd(800,1500),rnd(150,500));
    part(L,"ROAR!!",{left:"0",right:"0",top:"90px",textAlign:"center",fontFamily:"Impact,Arial Black,sans-serif",fontSize:"90px",color:"#ffdd99",textShadow:"0 0 30px #ff3b1a"},[{transform:"scale(3)",opacity:0},{transform:"scale(1)",opacity:1,offset:.3},{opacity:1,offset:.8},{opacity:0}],1400,500);
    setTimeout(()=>shakeEl("#stage",true),550*SPEED);
  }else if(race==="Machine"){
    let svg=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:0;top:0">`;
    for(let i=0;i<18;i++){let x=rnd(0,W),y=rnd(0,H);let d=`M${x} ${y}`;for(let k=0;k<5;k++){if(k%2)x+=rnd(-260,260);else y+=rnd(-200,200);d+=` L${x} ${y}`;}
      svg+=`<path d="${d}" fill="none" stroke="#5fd4ff" stroke-width="2.5" stroke-dasharray="1400" stroke-dashoffset="1400" style="filter:drop-shadow(0 0 4px #5fd4ff)"><animate attributeName="stroke-dashoffset" to="0" dur="${(1.2*SPEED).toFixed(3)}s" begin="${(rnd(0,.6)*SPEED).toFixed(3)}s" fill="freeze"/></path><circle cx="${x}" cy="${y}" r="5" fill="#bff3ff"/>`;}
    svg+="</svg>";part(L,svg,{left:"0",top:"0"},[{opacity:0},{opacity:1}],300,0);
    for(let b=0;b<4;b++){let x=rnd(100,W-100),y=0,pts=`${x},0`;while(y<H){y+=rnd(40,90);x+=rnd(-60,60);pts+=` ${x},${y}`;}
      part(L,`<svg width="${W}" height="${H}"><polyline points="${pts}" fill="none" stroke="#e8fbff" stroke-width="4" style="filter:drop-shadow(0 0 10px #5fd4ff)"/></svg>`,{left:"0",top:"0"},
        [{opacity:0},{opacity:1,offset:.1},{opacity:0,offset:.25},{opacity:1,offset:.35},{opacity:0}],600,300+b*350);}
    for(let i=0;i<50;i++)part(L,"",{left:"640px",top:"370px",width:"4px",height:"4px",background:"#fff59a",boxShadow:"0 0 6px #ffd000"},[{transform:"translate(0,0)",opacity:1},{transform:`translate(${rnd(-600,600)}px,${rnd(-400,400)}px)`,opacity:0}],rnd(500,1000),rnd(200,1400));
    part(L,"SYSTEM OVERDRIVE",{left:"0",right:"0",top:"100px",textAlign:"center",fontFamily:"Courier New,monospace",fontWeight:"bold",fontSize:"44px",color:"#bff3ff",letterSpacing:"8px",textShadow:"0 0 16px #5fd4ff"},[{opacity:0},{opacity:1,offset:.1},{opacity:.3,offset:.15},{opacity:1,offset:.2},{opacity:1,offset:.85},{opacity:0}],2200,200);
  }else if(race==="Spellcaster"){
    const runes="ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";let t="";for(let i=0;i<24;i++){const a=i/24*Math.PI*2;t+=`<text x="${300+Math.cos(a)*262}" y="${300+Math.sin(a)*262+8}" font-size="24" fill="#f0d8ff" text-anchor="middle">${runes[i]}</text>`;}
    const star=[];for(let i=0;i<7;i++){const a=-Math.PI/2+i*(4*Math.PI/7);star.push(`${300+Math.cos(a)*230},${300+Math.sin(a)*230}`);}
    const svg=`<svg width="600" height="600" viewBox="0 0 600 600"><g style="filter:drop-shadow(0 0 8px #c77bff)" stroke="#e7c6ff" fill="none" stroke-width="3"><circle cx="300" cy="300" r="290"/><circle cx="300" cy="300" r="240"/><circle cx="300" cy="300" r="120"/><polygon points="${star.join(" ")}"/></g>${t}</svg>`;
    part(L,svg,{left:"340px",top:"70px",width:"600px",height:"600px"},[{transform:"scale(0) rotate(0)",opacity:0},{transform:"scale(1) rotate(120deg)",opacity:1,offset:.3},{transform:"scale(1.05) rotate(360deg)",opacity:.9}],3000,0,{easing:"linear"});
    for(let i=0;i<60;i++)part(L,"✦",{left:rnd(0,W)+"px",top:rnd(0,H)+"px",fontSize:rnd(10,30)+"px",color:pick(["#fff","#e7c6ff","#bfe3ff","#ffe9a8"]),textShadow:"0 0 8px #fff"},[{opacity:0,transform:"scale(.2)"},{opacity:1,transform:"scale(1.2)",offset:.5},{opacity:0,transform:"scale(.2)"}],rnd(600,1400),rnd(0,1800));
    part(L,"",{left:"590px",top:"-50px",width:"100px",height:"900px",background:"linear-gradient(90deg,transparent,rgba(231,198,255,.7),transparent)"},[{transform:"scaleX(0)",opacity:0},{transform:"scaleX(3)",opacity:1,offset:.4},{transform:"scaleX(5)",opacity:0}],1200,250);
  }else if(race==="Beast"){
    for(let i=0;i<40;i++)part(L,pick(["🍃","🍂","🌿","🍃"]),{left:"-80px",top:rnd(0,H)+"px",fontSize:rnd(26,56)+"px"},[{transform:"translate(0,0) rotate(0)",opacity:0},{opacity:1,offset:.1},{transform:`translate(${W+160}px,${rnd(-200,200)}px) rotate(${rnd(360,900)}deg)`,opacity:.9}],rnd(1100,2000),rnd(0,1200),{easing:"ease-in"});
    for(let k=0;k<3;k++)part(L,"",{left:"260px",top:(250+k*80)+"px",width:"760px",height:"16px",borderRadius:"8px",transform:"rotate(-28deg)",
      background:"linear-gradient(90deg,transparent,#fff 20%,#ffcf7a 60%,transparent)",boxShadow:"0 0 20px #ffb02b"},
      [{clipPath:"inset(0 100% 0 0)",opacity:1},{clipPath:"inset(0 0 0 0)",opacity:1,offset:.4},{clipPath:"inset(0 0 0 0)",opacity:0}],700,700+k*110);
    setTimeout(()=>shakeEl("#stage",true),800*SPEED);
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"radial-gradient(ellipse at center,rgba(123,211,107,.35),transparent 60%)"},[{opacity:0},{opacity:1,offset:.5},{opacity:.4}],1500,0);
  }else if(race==="Warrior"){
    part(L,"",{left:"500px",top:"-20px",width:"280px",height:"840px",background:"linear-gradient(90deg,transparent,rgba(255,250,220,.9),transparent)",filter:"blur(6px)"},[{transform:"scaleY(0)",transformOrigin:"top",opacity:1},{transform:"scaleY(1)",opacity:1,offset:.35},{opacity:.25}],1600,0);
    part(L,"",{left:"640px",top:"370px",width:"1400px",height:"1400px",marginLeft:"-700px",marginTop:"-700px",borderRadius:"50%",
      background:"repeating-conic-gradient(rgba(255,240,190,.35) 0 4deg,transparent 4deg 18deg)"},[{transform:"scale(.2) rotate(0)",opacity:0},{transform:"scale(1) rotate(60deg)",opacity:1,offset:.4},{transform:"scale(1.1) rotate(120deg)",opacity:.3}],2600,200,{easing:"linear"});
    part(L,"",{left:"-200px",top:"380px",width:"1700px",height:"10px",transform:"rotate(-32deg)",background:"linear-gradient(90deg,transparent,#fff,#bfe3ff,transparent)",boxShadow:"0 0 30px #fff"},
      [{clipPath:"inset(0 100% 0 0)"},{clipPath:"inset(0 0 0 0)",offset:.5},{clipPath:"inset(0 0 0 100%)"}],600,900);
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"#fff"},[{opacity:0},{opacity:.85,offset:.2},{opacity:0}],500,1150);
    for(let i=0;i<30;i++)part(L,"✧",{left:rnd(300,980)+"px",top:rnd(100,700)+"px",fontSize:rnd(14,34)+"px",color:"#fff6d0",textShadow:"0 0 10px #ffd36b"},[{opacity:0},{opacity:1,offset:.5},{opacity:0,transform:"translateY(-60px)"}],rnd(700,1300),rnd(300,1800));
  }else if(race==="Vehicle"){
    part(L,"VROOOOM!!",{left:"0",right:"0",top:"90px",textAlign:"center",fontFamily:"Impact,Arial Black,sans-serif",fontSize:"92px",fontStyle:"italic",color:"#fff",textShadow:"0 0 20px #ff3b55,6px 0 0 #ff3b55"},[{transform:"translateX(-900px) skewX(-20deg)",opacity:0},{transform:"translateX(0) skewX(-20deg)",opacity:1,offset:.25},{opacity:1,offset:.75},{transform:"translateX(900px) skewX(-20deg)",opacity:0}],1700,150);
    for(let i=0;i<60;i++)part(L,"",{left:"0",top:rnd(0,H)+"px",width:rnd(200,600)+"px",height:rnd(2,5)+"px",background:"linear-gradient(90deg,transparent,#fff,transparent)",opacity:".8"},[{transform:"translateX(1400px)"},{transform:"translateX(-700px)"}],rnd(250,500),rnd(0,2200),{iterations:1,easing:"linear"});
    for(let i=0;i<22;i++)part(L,"",{left:rnd(200,1080)+"px",top:rnd(560,760)+"px",width:"180px",height:"180px",marginLeft:"-90px",marginTop:"-90px",borderRadius:"50%",background:"radial-gradient(circle,rgba(220,220,230,.75),rgba(160,160,170,.3) 50%,transparent 70%)",filter:"blur(6px)"},[{transform:"scale(.3)",opacity:0},{opacity:.9,offset:.3},{transform:`scale(${rnd(2,4)}) translate(${rnd(-80,80)}px,-60px)`,opacity:0}],rnd(1400,2200),rnd(200,1200));
    for(const x of [470,810])part(L,"",{left:x+"px",top:"560px",width:"260px",height:"260px",marginLeft:"-130px",marginTop:"-130px",borderRadius:"50%",background:"radial-gradient(circle,#fff,#fffbe0 25%,rgba(255,250,200,.4) 45%,transparent 70%)"},[{opacity:0,transform:"scale(.3)"},{opacity:1,transform:"scale(1.6)",offset:.15},{opacity:.2,offset:.4},{opacity:1,transform:"scale(1.2)",offset:.55},{opacity:0,transform:"scale(2)"}],1400,900);
    setTimeout(()=>shakeEl("#stage",true),300*SPEED);setTimeout(()=>shakeEl("#stage",true),1000*SPEED);
  }else if(race==="Catgirl"){
    for(let i=0;i<34;i++){const a=rnd(0,Math.PI*2),r=rnd(200,620);part(L,"🐾",{left:"640px",top:"370px",fontSize:rnd(24,60)+"px",filter:"drop-shadow(0 0 6px #ffb3d9)"},[{transform:"translate(-50%,-50%) scale(.2)",opacity:0},{opacity:1,offset:.2},{transform:`translate(calc(-50% + ${Math.cos(a)*r}px),calc(-50% + ${Math.sin(a)*r}px)) rotate(${rnd(-90,90)}deg) scale(1.1)`,opacity:0}],rnd(1000,1600),rnd(300,900));}
    for(let i=0;i<40;i++)part(L,pick(["✨","💖","✦"]),{left:rnd(100,1180)+"px",top:rnd(50,750)+"px",fontSize:rnd(14,30)+"px",color:"#ffd0ea"},[{opacity:0,transform:"scale(0)"},{opacity:1,transform:"scale(1.2)",offset:.5},{opacity:0}],rnd(500,1000),rnd(400,2200));
    part(L,'<div style="display:flex;gap:160px"><div class="cateye"></div><div class="cateye"></div></div>',{left:"0",right:"0",top:"40px",display:"flex",justifyContent:"center"},[{opacity:0,transform:"scaleY(0)"},{opacity:1,transform:"scaleY(1)",offset:.2},{opacity:1,transform:"scaleY(.1)",offset:.35},{opacity:1,transform:"scaleY(1)",offset:.45},{opacity:1,offset:.8},{opacity:0}],1500,100);
    part(L,"Nya~♡",{left:"0",right:"0",top:"200px",textAlign:"center",fontFamily:"Impact,Arial Black,sans-serif",fontSize:"80px",color:"#fff",textShadow:"0 0 18px #ff7ac8,0 0 34px #ffb36b"},[{transform:"scale(.3) rotate(-10deg)",opacity:0},{transform:"scale(1.1) rotate(4deg)",opacity:1,offset:.35},{transform:"scale(1)",opacity:1,offset:.8},{opacity:0}],1600,900);
  }else if(race==="Nemesis"){
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"radial-gradient(ellipse at 50% 40%,rgba(120,0,20,.15),rgba(20,0,8,.85) 75%)"},[{opacity:0},{opacity:1,offset:.25},{opacity:.4}],2000,0);
    part(L,"",{left:"640px",top:"220px",width:"360px",height:"360px",marginLeft:"-180px",marginTop:"-180px",borderRadius:"50%",background:"radial-gradient(circle,#ff6a6a,#b3001b 45%,#4a0010 70%,transparent 72%)",boxShadow:"0 0 120px #d0243c"},[{transform:"translateY(200px) scale(.4)",opacity:0},{transform:"translateY(0) scale(1)",opacity:1,offset:.5},{opacity:.7}],1800,0);
    for(let i=0;i<40;i++)part(L,"",{left:(640+rnd(-500,500))+"px",top:(760+rnd(-20,40))+"px",width:rnd(6,14)+"px",height:rnd(30,90)+"px",borderRadius:"50%",background:"linear-gradient(0deg,rgba(208,36,60,0),#ff3a50,#ffd0d0)",filter:"blur(1px)"},[{transform:"translateY(0) scaleY(.4)",opacity:0},{opacity:1,offset:.2},{transform:`translateY(${-rnd(300,700)}px) scaleY(1.3)`,opacity:0}],rnd(1100,2000),rnd(0,800));
    for(let k=0;k<3;k++)part(L,"",{left:"640px",top:"420px",width:"220px",height:"220px",marginLeft:"-110px",marginTop:"-110px",borderRadius:"50%",border:"5px solid #ff2a44",boxShadow:"0 0 30px #d0243c, inset 0 0 30px #d0243c"},[{transform:"scale(.2) rotate(0)",opacity:1},{transform:"scale(5) rotate(120deg)",opacity:0}],1300,300+k*280);
    for(const [x,f] of [[150,1],[1130,-1]])part(L,"",{left:x+"px",top:"200px",width:"10px",height:"440px",background:"linear-gradient(180deg,#ffd0d0,#7a0012)",boxShadow:"0 0 24px #ff2a44",transformOrigin:"50% 100%"},[{transform:`rotate(${f*70}deg)`,opacity:0},{transform:`rotate(${f*20}deg)`,opacity:1,offset:.5},{transform:`rotate(${f*20}deg)`,opacity:0}],1500,400);
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"#ff2a44"},[{opacity:0},{opacity:.45,offset:.15},{opacity:0}],450,700);
    setTimeout(()=>shakeEl("#stage",true),750*SPEED);
  }else if(race==="Runner"){
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"#fff"},[{opacity:0},{opacity:1,offset:.1},{opacity:0}],450,100);
    part(L,"BANG!",{left:"0",right:"0",top:"120px",textAlign:"center",fontFamily:"Impact,Arial Black,sans-serif",fontSize:"110px",color:"#fff",textShadow:"0 0 20px #3fa9ff,0 0 40px #fff"},[{transform:"scale(2)",opacity:0},{transform:"scale(1)",opacity:1,offset:.2},{opacity:1,offset:.5},{opacity:0,transform:"scale(1.4)"}],900,120);
    for(let i=0;i<50;i++)part(L,"",{left:"0",top:rnd(120,720)+"px",width:rnd(300,800)+"px",height:rnd(3,10)+"px",borderRadius:"5px",background:"linear-gradient(90deg,transparent,#3fa9ff,#bfe6ff)",boxShadow:"0 0 12px #3fa9ff"},[{transform:"translateX(-900px)",opacity:0},{opacity:1,offset:.2},{transform:"translateX(1500px)",opacity:0}],rnd(400,800),rnd(500,2000),{easing:"linear"});
    part(L,'<div style="height:44px;background:repeating-conic-gradient(#000 0 25%,#fff 0 50%) 0 0/44px 44px;border-top:4px solid #ffd36b;border-bottom:4px solid #ffd36b"></div><div style="text-align:center;font-family:Impact,Arial Black,sans-serif;font-size:56px;color:#ffd36b;text-shadow:0 0 14px #000;margin-top:4px">FINISH!</div>',{left:"0",width:W+"px",top:"20px"},[{transform:"translateX(100%)",opacity:1},{transform:"translateX(100%)",offset:.4},{transform:"translateX(0)",offset:.6},{transform:"translateX(0)",opacity:1}],2600,0,{easing:"ease-out"});
  }else if(race==="Robot"){
    const parts=[["🦾",-520,-300],["🦿",520,300],["🤖",0,-420],["⚙️",-560,300],["🔩",560,-300],["🛰️",0,420]];
    for(const [e,dx,dy] of parts)part(L,e,{left:"640px",top:"370px",fontSize:"110px",filter:"drop-shadow(0 0 12px #ff3030)"},[{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${rnd(-180,180)}deg)`,opacity:0},{opacity:1,offset:.15},{transform:"translate(-50%,-50%) rotate(0) scale(.6)",opacity:1,offset:.75},{transform:"translate(-50%,-50%) scale(.2)",opacity:0}],1300,0,{easing:"ease-in"});
    for(let i=0;i<40;i++)part(L,"",{left:"640px",top:"370px",width:"5px",height:"5px",background:"#ffd36b",boxShadow:"0 0 6px #ff9a2b"},[{transform:"translate(0,0)",opacity:1},{transform:`translate(${rnd(-500,500)}px,${rnd(-350,350)}px)`,opacity:0}],rnd(500,900),rnd(950,1200));
    part(L,"CLANK! — DOCKING COMPLETE",{left:"0",right:"0",top:"86px",textAlign:"center",fontFamily:"Courier New,monospace",fontWeight:"bold",fontSize:"48px",letterSpacing:"4px",color:"#e8f4ff",textShadow:"0 0 14px #ff3030"},[{opacity:0},{opacity:1,offset:.1},{opacity:.3,offset:.15},{opacity:1,offset:.2},{opacity:1,offset:.85},{opacity:0}],1700,1000);
    part(L,"",{left:"470px",top:"250px",width:"340px",height:"40px",background:"linear-gradient(90deg,transparent,#ff3030,#fff,#5fd4ff,transparent)",boxShadow:"0 0 30px #ff3030",zIndex:5},[{transform:"scaleX(0)",opacity:0},{transform:"scaleX(1.3)",opacity:1,offset:.3},{transform:"scaleX(1)",opacity:.9,offset:.6},{opacity:0}],900,1500);
    setTimeout(()=>shakeEl("#stage",true),1000*SPEED);
    for(let i=0;i<3;i++)part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"radial-gradient(ellipse at center,transparent 40%,rgba(255,0,0,.35))"},[{opacity:0},{opacity:1},{opacity:0}],400,1800+i*350);
  }else if(race==="Idol"){
    const cols=["#ff5fd2","#5fd4ff","#ffe066","#b07bff","#7bffb0"];
    for(let i=0;i<7;i++){const x=100+i*180;part(L,"",{left:x+"px",top:"-40px",width:"220px",height:"900px",marginLeft:"-110px",transformOrigin:"50% 0",
      background:`linear-gradient(180deg,${cols[i%5]}cc,${cols[i%5]}22 70%,transparent)`,clipPath:"polygon(45% 0,55% 0,100% 100%,0 100%)",mixBlendMode:"screen"},
      [{transform:`rotate(${i<3?-35:35}deg)`,opacity:0},{transform:`rotate(${i<3?20:-20}deg)`,opacity:.9,offset:.4},{transform:`rotate(${i<3?-15:15}deg)`,opacity:.9,offset:.7},{transform:"rotate(0)",opacity:.7}],2800,i*80,{easing:"ease-in-out"});}
    for(let i=0;i<6;i++)part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:`radial-gradient(circle at ${rnd(10,90)}% ${rnd(5,30)}%,${pick(cols)}88,transparent 35%)`},[{opacity:0},{opacity:1,offset:.2},{opacity:0}],400,600+i*300);
    for(let i=0;i<90;i++)part(L,"",{left:rnd(0,W)+"px",top:"-20px",width:rnd(6,12)+"px",height:rnd(10,18)+"px",background:pick(cols),borderRadius:"2px"},
      [{transform:"translate(0,0) rotate(0)",opacity:1},{transform:`translate(${rnd(-160,160)}px,${H+60}px) rotate(${rnd(360,1440)}deg)`,opacity:.9}],rnd(1800,3000),rnd(300,1500),{easing:"linear"});
    for(let i=0;i<26;i++){const a=rnd(0,Math.PI*2),r=rnd(250,560);part(L,pick(["🎵","🎶","♪","♫","💖","⭐"]),{left:"640px",top:"370px",fontSize:rnd(26,54)+"px",color:pick(cols),textShadow:"0 0 10px #fff"},
      [{transform:"translate(-50%,-50%) scale(.2)",opacity:0},{opacity:1,offset:.2},{transform:`translate(calc(-50% + ${Math.cos(a)*r}px),calc(-50% + ${Math.sin(a)*r}px)) scale(1.2)`,opacity:0}],rnd(1100,1700),rnd(500,1100));}
    part(L,"♪ SHOWTIME! ♪",{left:"0",right:"0",top:"86px",textAlign:"center",fontFamily:"Impact,Arial Black,sans-serif",fontSize:"72px",color:"#fff",textShadow:"0 0 20px #ff5fd2,0 0 40px #5fd4ff"},[{transform:"scale(2.5)",opacity:0},{transform:"scale(1)",opacity:1,offset:.3},{opacity:1,offset:.8},{opacity:0}],1800,500);
  }else if(race==="Fairy"){
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"linear-gradient(135deg,rgba(255,182,225,.55),rgba(180,255,226,.45),rgba(214,190,255,.5))"},[{opacity:0},{opacity:1}],700,0);
    for(const side of [-1,1])part(L,`<div style="width:340px;height:460px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:radial-gradient(ellipse at ${side<0?"80%":"20%"} 50%,rgba(255,255,255,.9),rgba(255,182,225,.55) 40%,rgba(180,255,226,.25) 70%,transparent 72%);filter:drop-shadow(0 0 20px #fff)"></div>`,
      {left:(side<0?330:610)+"px",top:"120px",transformOrigin:side<0?"right center":"left center"},
      [{transform:"scaleX(0) rotate(0)",opacity:0},{transform:`scaleX(1) rotate(${side*-8}deg)`,opacity:1,offset:.25},{transform:`scaleX(.6) rotate(${side*4}deg)`,offset:.45},{transform:`scaleX(1) rotate(${side*-8}deg)`,offset:.65},{transform:`scaleX(.7)`,offset:.85},{transform:`scaleX(1)`,opacity:1}],2600,100);
    for(let i=0;i<40;i++)part(L,pick(["🌸","🌸","💮","🎀"]),{left:rnd(0,W)+"px",top:"-60px",fontSize:rnd(20,44)+"px"},[{transform:"translate(0,0) rotate(0)",opacity:0},{opacity:1,offset:.1},{transform:`translate(${rnd(-200,200)}px,${H+120}px) rotate(${rnd(180,720)}deg)`,opacity:.8}],rnd(1600,2600),rnd(0,1400),{easing:"linear"});
    for(let i=0;i<50;i++)part(L,pick(["✨","⭐","💖","✦"]),{left:rnd(150,1130)+"px",top:rnd(60,740)+"px",fontSize:rnd(14,34)+"px",color:"#fff"},[{opacity:0,transform:"scale(0)"},{opacity:1,transform:"scale(1.3)",offset:.4},{opacity:0,transform:"scale(.3)"}],rnd(500,1100),rnd(200,2200));
  }}
async function entrance(card,s){
  G.stats.aces++;exprSet(s,"point",2600);await aceClip(s);if(!G||G.over)return;
  const L0=$("#cine");const col=THEME_COL[card.race]||"#ffd36b";
  L0.innerHTML=`<div class="dark"></div><div class="layer" id="cinefx"></div>
    <div class="hero a-${card.attr}" style="--g:${col}">${ART_BAD[card.id]?"":`<img class="heroimg" src="${artSrc(card.id)}" alt="" onerror="artErr(this,'${card.id}')">`}</div>
    <div class="nameb" style="--g:${col}">${card.name.toUpperCase()}<small>${S(s).name.toUpperCase()}'S ACE MONSTER</small></div>
    <div class="stats">${"★".repeat(card.level)} &nbsp; ATK ${card.atk} / DEF ${card.def}</div><div class="skip">Click to skip ▶</div>`;
  L0.classList.add("on");
  anim(L0.querySelector(".dark"),[{opacity:0},{opacity:1}],400);
  const L=$("#cinefx");themeFX(card.race,L);
  anim(L0.querySelector(".hero"),[{transform:"scale(.1) rotateY(90deg)",opacity:0,filter:"brightness(4)"},{transform:"scale(.1) rotateY(90deg)",opacity:0,offset:.25},{transform:"scale(1.15) rotateY(0)",opacity:1,filter:"brightness(2)",offset:.5},{transform:"scale(1)",opacity:1,filter:"brightness(1)"}],1600,{fill:"forwards"});
  anim(L0.querySelector(".nameb"),[{transform:"translateX(-100%)",opacity:0},{transform:"translateX(-100%)",opacity:0,offset:.4},{transform:"none",opacity:1}],1500,{fill:"forwards"});
  return new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;cineSkip=null;
      anim(L0,[{opacity:1},{opacity:0}],250).then(()=>{L0.classList.remove("on");L0.innerHTML="";L0.style.opacity="";res();});};
    cineSkip=fin;L0.onclick=fin;setTimeout(fin,3200*SPEED);});}
/* new5 theme colours + ace-entrance FX for the 5 new races. No emoji / glyph text: shapes only.
   Load AFTER e_ui.js (needs THEME_COL, themeFX, part, rnd, pick, shakeEl, SPEED). */
(function(){
Object.assign(THEME_COL,{Chibi:"#ff9ed8","Sua Bro":"#ff9a3c",Office:"#7fe0c4",Gesture:"#4fd1c5",Mecha:"#5aa8ff"});
const W=1280,H=800;
const dot=(c,s)=>({width:s+"px",height:s+"px",borderRadius:"50%",background:c,boxShadow:`0 0 ${s*1.5}px ${c}`});
const base=themeFX;
themeFX=function(race,L){
  if(race==="Chibi"){
    for(let i=0;i<40;i++){const s=rnd(14,40);part(L,"",Object.assign({left:rnd(0,W)+"px",top:(H+30)+"px",opacity:.85},dot(pick(["#ffd1ec","#ff9ed8","#bfe9ff","#fff3a8"]),s)),[{transform:"translateY(0) scale(.4)",opacity:0},{opacity:.9,offset:.2},{transform:`translateY(${-rnd(400,900)}px) scale(1.2)`,opacity:0}],rnd(1400,2400),rnd(0,800));}
    part(L,"",{left:"640px",top:"370px",width:"300px",height:"300px",marginLeft:"-150px",marginTop:"-150px",borderRadius:"50%",background:"radial-gradient(circle,#fff,#ffc2e6 40%,transparent 70%)"},[{transform:"scale(0)",opacity:1},{transform:"scale(4)",opacity:0}],1000,150);
  }else if(race==="Sua Bro"){
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"linear-gradient(180deg,rgba(255,140,40,.35),rgba(120,40,90,.25))"},[{opacity:0},{opacity:1,offset:.3},{opacity:.3}],1800,0);
    for(let i=0;i<14;i++)part(L,"",{left:rnd(100,1180)+"px",top:"760px",width:"30px",height:"120px",borderRadius:"15px",background:"linear-gradient(0deg,rgba(255,255,255,.0),rgba(255,255,255,.55))",filter:"blur(6px)"},[{transform:"translateY(0) scaleY(.5)",opacity:0},{opacity:.8,offset:.3},{transform:`translateY(${-rnd(300,600)}px) scaleY(1.4)`,opacity:0}],rnd(1500,2400),rnd(0,600));
    for(let i=0;i<30;i++)part(L,"",Object.assign({left:rnd(0,W)+"px",top:rnd(200,H)+"px"},dot("#ffe08a",6)),[{opacity:0},{opacity:1,offset:.5},{opacity:0,transform:`translate(${rnd(-80,80)}px,${rnd(-80,0)}px)`}],rnd(900,1600),rnd(0,900));
    setTimeout(()=>shakeEl("#stage",true),500*SPEED);
  }else if(race==="Office"){
    for(let i=0;i<36;i++)part(L,"",{left:rnd(0,W)+"px",top:"-60px",width:"46px",height:"60px",background:"#f4f7fb",border:"1px solid #c9d3e0",boxShadow:"0 2px 6px rgba(0,0,0,.3)"},[{transform:"translateY(0) rotate(0)",opacity:1},{transform:`translateY(${H+120}px) rotate(${rnd(-540,540)}deg) translateX(${rnd(-200,200)}px)`,opacity:.9}],rnd(1400,2600),rnd(0,900));
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"repeating-linear-gradient(0deg,rgba(127,224,196,.08) 0 2px,transparent 2px 6px)"},[{opacity:0},{opacity:1,offset:.2},{opacity:0}],1800,0);
    for(let k=0;k<3;k++)part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"#e8fff7"},[{opacity:0},{opacity:.5,offset:.15},{opacity:0}],260,500+k*320);
  }else if(race==="Gesture"){
    for(let k=0;k<5;k++)part(L,"",{left:"640px",top:"370px",width:"200px",height:"200px",marginLeft:"-100px",marginTop:"-100px",borderRadius:"50%",border:"4px solid #8ff5ea",boxShadow:"0 0 20px #4fd1c5"},[{transform:"scale(.2)",opacity:1},{transform:"scale(5)",opacity:0}],1400,k*260);
    part(L,"",{left:"540px",top:"-40px",width:"200px",height:"880px",background:"linear-gradient(90deg,transparent,rgba(220,255,250,.6),transparent)",filter:"blur(8px)"},[{transform:"scaleX(0)",opacity:0},{transform:"scaleX(1.6)",opacity:1,offset:.4},{transform:"scaleX(2.4)",opacity:0}],1800,0);
    for(let i=0;i<34;i++)part(L,"",Object.assign({left:rnd(0,W)+"px",top:rnd(0,H)+"px"},dot("#c8fff8",5)),[{opacity:0,transform:"scale(0)"},{opacity:1,transform:"scale(1.4)",offset:.5},{opacity:0}],rnd(700,1300),rnd(0,1000));
  }else if(race==="Mecha"){
    for(let i=0;i<50;i++)part(L,"",{left:"0",top:rnd(0,H)+"px",width:rnd(200,600)+"px",height:rnd(2,4)+"px",background:"linear-gradient(90deg,transparent,#bfe0ff,transparent)"},[{transform:"translateX(-700px)"},{transform:"translateX(1500px)"}],rnd(300,700),rnd(0,900));
    part(L,"",{left:"640px",top:"370px",width:"500px",height:"500px",marginLeft:"-250px",marginTop:"-250px",borderRadius:"50%",border:"6px solid #5aa8ff",boxShadow:"0 0 40px #5aa8ff, inset 0 0 40px #5aa8ff"},[{transform:"scale(0) rotate(0)",opacity:1},{transform:"scale(1.6) rotate(90deg)",opacity:0}],1200,200);
    for(let w=0;w<2;w++)part(L,"",{left:(w?660:200)+"px",top:"250px",width:"420px",height:"300px",background:`linear-gradient(${w?"70deg":"-70deg"},transparent,rgba(120,200,255,.7),transparent)`,clipPath:w?"polygon(0 40%,100% 0,70% 100%)":"polygon(100% 40%,0 0,30% 100%)",filter:"blur(2px)"},[{opacity:0,transform:"scale(.3)"},{opacity:1,transform:"scale(1)",offset:.5},{opacity:0}],1500,500);
    setTimeout(()=>shakeEl("#stage",true),700*SPEED);
  }else return base(race,L);
};
})();
/* ================= SCREENS ================= */
let CUR=null;
function showScreen(name,instant){
  const nx=$("#"+name);if(CUR===name){nx.classList.add("on","vis");return;}
  const prev=CUR?$("#"+CUR):null;CUR=name;closeMenu();
  if(prev){prev.classList.remove("vis");const p=prev;setTimeout(()=>{if(CUR!==p.id)p.classList.remove("on");},instant?0:350);}
  nx.classList.add("on");void nx.offsetWidth;requestAnimationFrame(()=>nx.classList.add("vis"));
  if(name==="menu")renderMenu();}
function store(){try{return JSON.parse(localStorage.getItem("adc_v2")||"{}");}catch(e){return {};}}
function saveStore(o){try{localStorage.setItem("adc_v2",JSON.stringify(o));return true;}catch(e){return false;}}
function playerName(){const n=(store().name||"").trim();return n||"You";}
function validDeck(ch,d){if(!d)return false;const pool=new Set(poolFor(ch));let n=0;
  for(const id in d){if(!pool.has(id)||d[id]>3||d[id]<0)return false;n+=d[id];}return n>=30&&n<=40;}
function savedDeck(ch){const d=(store().decks||{})[ch];return validDeck(ch,d)?d:null;}
function deckFor(ch,side){if(side==="player"||ch==="you"){const d=savedDeck(ch);if(d)return d;}return defaultDeck(ch);}
function aceNames(ch){return signature(ch).filter(id=>CARDS[id].ace).map(id=>CARDS[id].name);}

/* ---------- ARENA ---------- */
function setArena(id){const A=ARENAS[id];const root=$("#arena");if(!A||!root)return;
  root.querySelector(".abg").style.backgroundImage=`url(${FIELD_IMG[A.img]})`;
  root.querySelector(".tint").style.background=A.tint||"transparent";
  root.querySelector(".arenaname").textContent="✦ "+A.name.toUpperCase()+" ✦";
  const amb=root.querySelector(".amb");let h="";
  switch(A.ambient){
    case "torch":h='<div class="warm"></div>'+[[6,22],[22,14],[78,14],[94,22],[3,70],[97,70],[30,9],[70,9]].map(([x,y],i)=>`<div class="torch" style="left:${x}%;top:${y}%;animation-delay:${-i*.37}s;animation-duration:${1.2+(i%3)*.4}s"></div>`).join("");break;
    case "embers":h='<div class="lava"></div>';for(let i=0;i<34;i++)h+=`<div class="ember" style="left:${rnd(0,100)}%;--dx:${rnd(-80,80)}px;animation-duration:${rnd(7,15)}s;animation-delay:${-rnd(0,15)}s;transform:scale(${rnd(.5,1.4)})"></div>`;break;
    case "circuit":{let svg='<svg width="1280" height="800" style="position:absolute;inset:0">';const nodes=[];
      for(let i=0;i<14;i++){let x=rnd(0,1280),y=rnd(0,800),d=`M${x} ${y}`;for(let k=0;k<4;k++){if(k%2)x+=rnd(-300,300);else y+=rnd(-200,200);d+=` L${x} ${y}`;}nodes.push([x,y]);
        svg+=`<path class="cp" d="${d}" style="animation-duration:${rnd(3,7)}s;animation-delay:${-rnd(0,7)}s;opacity:.55"/>`;}
      h=svg+"</svg>"+nodes.map(([x,y],i)=>`<div class="node" style="left:${x}px;top:${y}px;animation-delay:${-i*.3}s"></div>`).join("");break;}
    case "sparkles":for(let i=0;i<40;i++)h+=`<div class="tw" style="left:${rnd(0,100)}%;top:${rnd(0,100)}%;font-size:${rnd(8,22)}px;color:${pick(["#fff","#e7c6ff","#c9a8ff","#ffe9a8"])};animation-duration:${rnd(3,7)}s;animation-delay:${-rnd(0,7)}s">✦</div>`;break;
    case "fireflies":for(let i=0;i<28;i++)h+=`<div class="fly" style="left:${rnd(0,100)}%;top:${rnd(10,95)}%;--dx:${rnd(-120,120)}px;--dy:${rnd(-90,90)}px;animation-duration:${rnd(5,11)}s;animation-delay:${-rnd(0,11)}s"></div>`;
      for(let i=0;i<8;i++)h+=`<div class="leaf" style="left:${rnd(0,100)}%;--dx:${rnd(-200,200)}px;animation-duration:${rnd(12,22)}s;animation-delay:${-rnd(0,22)}s">${pick(["🍃","🍂","🌿"])}</div>`;break;
    case "water":h='<div class="shim"></div>';for(let i=0;i<46;i++)h+=`<div class="tw" style="left:${rnd(0,100)}%;top:${rnd(42,100)}%;font-size:${rnd(6,16)}px;color:${pick(["#fff","#ffd6f0","#c8fff0"])};animation-duration:${rnd(2,5)}s;animation-delay:${-rnd(0,5)}s">✧</div>`;
      for(let i=0;i<10;i++)h+=`<div class="tw" style="left:${rnd(0,100)}%;top:${rnd(0,45)}%;font-size:${rnd(10,18)}px;color:#ffc6ea;animation-duration:${rnd(4,8)}s;animation-delay:${-rnd(0,8)}s">✦</div>`;break;
    case "headlights":for(let i=0;i<18;i++){const red=i%3===0;h+=`<div class="streak" style="top:${rnd(40,96)}%;animation-direction:${red?"normal":"reverse"};background:linear-gradient(90deg,transparent,${red?"#ff3b3b":"#fff8d0"},transparent);animation-duration:${rnd(1.5,4)}s;animation-delay:${-rnd(0,4)}s"></div>`;}break;
    case "paws":for(let i=0;i<20;i++)h+=`<div class="paw" style="left:${rnd(0,100)}%;--dx:${rnd(-60,60)}px;animation-duration:${rnd(9,16)}s;animation-delay:${-rnd(0,16)}s">🐾</div>`;
      for(let i=0;i<24;i++)h+=`<div class="tw" style="left:${rnd(0,100)}%;top:${rnd(0,100)}%;font-size:${rnd(8,16)}px;color:#ffd6ea;animation-duration:${rnd(3,6)}s;animation-delay:${-rnd(0,6)}s">✦</div>`;break;
    case "pulse":h='<div class="opulse"></div><div class="opulse" style="animation-delay:-1.5s;background:radial-gradient(ellipse at 50% 0%,rgba(255,140,30,.3),transparent 55%)"></div>';break;
    case "floodlight":for(const [x,y] of [[12,6],[30,3],[70,3],[88,6]])h+=`<div class="flood" style="left:${x}%;top:${y}%;animation-delay:${-rnd(0,5)}s;animation-duration:${rnd(3,6)}s"></div>`;break;
    case "warning":for(const [x,y] of [[4,8],[96,8],[4,92],[96,92]])h+=`<div class="warn" style="left:${x}%;top:${y}%"></div>`;h+='<div class="beacon"></div>';break;
    case "spotlight":{const cols=["#ff5fd2","#5fd4ff","#ffe066","#b07bff"];
      for(let i=0;i<6;i++)h+=`<div class="beam" style="left:${8+i*17}%;--a:${i%2?-22:22}deg;background:linear-gradient(180deg,${cols[i%4]}66,${cols[i%4]}11 70%,transparent);animation-duration:${rnd(5,9)}s;animation-delay:${-rnd(0,9)}s"></div>`;
      for(let i=0;i<36;i++)h+=`<div class="confetti" style="left:${rnd(0,100)}%;--dx:${rnd(-120,120)}px;background:${pick(cols)};animation-duration:${rnd(8,16)}s;animation-delay:${-rnd(0,16)}s"></div>`;break;}
  }
  amb.innerHTML=h;}

/* ---------- MENU ---------- */
let menuBuilt=false;
function renderMenu(){if(menuBuilt)return;menuBuilt=true;const m=$("#menu");
  let motes="";for(let i=0;i<40;i++)motes+=`<div class="mote" style="left:${rnd(0,100)}%;animation-duration:${rnd(6,14)}s;animation-delay:${-rnd(0,14)}s;transform:scale(${rnd(.4,1.4)})"></div>`;
  let cards="";for(let i=0;i<10;i++)cards+=`<div class="floatcard" style="left:${rnd(0,95)}%;animation-duration:${rnd(14,26)}s;animation-delay:${-rnd(0,26)}s"></div>`;
  const circ=(r)=>{const pts=[];for(let i=0;i<6;i++){const a=i/6*Math.PI*2;pts.push(`${380+Math.cos(a)*r},${380+Math.sin(a)*r}`);}
    return `<svg viewBox="0 0 760 760" width="100%" height="100%"><g fill="none" stroke="#ffd36b" stroke-width="2"><circle cx="380" cy="380" r="370"/><circle cx="380" cy="380" r="330" stroke-dasharray="6 10"/><polygon points="${pts.join(" ")}"/><circle cx="380" cy="380" r="${r/2}"/></g></svg>`;};
  m.innerHTML=`<div class="bgfx"><div class="aurora"></div><div class="circle">${circ(300)}</div><div class="circle circle2">${circ(240)}</div>${cards}${motes}</div>
    <div class="menuport">${CHAR_ORDER.map((c,i)=>`<img src="${PORTRAITS[CHARS[c].img]}" style="animation-delay:${-i*.7}s" alt="">`).join("")}</div>
    <div class="logo"><h1>ARCANE DUEL</h1><h2>CHRONICLES</h2><div class="tag">✦ A FANTASY CARD BATTLE ✦</div></div>
    <div class="menubtns"><button class="mbtn primary" id="m-duel">⚔ DUEL</button><button class="mbtn" id="m-deck">🂠 DECK BUILDER</button><button class="mbtn" id="m-sys">⚙ SYSTEM</button></div>
    <div class="ver">v2.0 · offline edition</div>`;
  $("#m-duel").onclick=()=>{if(typeof window.openDuelSelect==="function")window.openDuelSelect();else openSelect();};$("#m-deck").onclick=()=>openBuilder(SEL.player||"you");$("#m-sys").onclick=()=>{if(typeof window.openSystem==="function")window.openSystem();else showHelp();};}

/* ---------- CHARACTER SELECT ---------- */
const SEL={step:1,player:null,rival:null,hover:null,arena:"auto"};
function arenaPickHTML(){const chips=[["auto","Home"],...Object.keys(ARENAS).map(k=>[k,""]),["random","🎲"]];
  const label=SEL.arena==="auto"?"Rival's home arena":SEL.arena==="random"?"Random arena":ARENAS[SEL.arena].name;
  return `<div class="arenapick"><span class="lab">ARENA:</span>${chips.map(([k,l])=>`<div class="achip ${SEL.arena===k?"sel":""}" data-ar="${k}" title="${ARENAS[k]?ARENAS[k].name:l==="Home"?"Rival's home arena":"Random"}" style="${ARENAS[k]?`background-image:url(${FIELD_IMG[ARENAS[k].img]})`:"background:#2a1f4c"}">${l}</div>`).join("")}<span class="an">${label}</span></div>`;}
function openSelect(){SEL.step=1;SEL.rival=null;SEL.hover=null;showScreen("select");renderSelect();}
function renderSelect(){const el=$("#select");const step=SEL.step;
  const chosen=step===1?SEL.player:SEL.rival;const show=SEL.hover||chosen||(step===1?"you":"kaito");
  const tiles=CHAR_ORDER.map(c=>{const C=CHARS[c];const dim=step===2&&c===SEL.player;
    return `<div class="tile ${chosen===c?"sel":""} ${dim?"dim":""}" data-ch="${c}" style="--c:${C.color}"><img src="${PORTRAITS[C.img]}" alt=""><div class="tn">${c==="you"?playerName():C.name}<span class="tt">${C.race||"Multicolor"}</span></div></div>`;}).join("")
    +(step===2?`<div class="tile random ${chosen==="random"?"sel":""}" data-ch="random" style="--c:#ffd36b">🎲<div class="tn">Random<span class="tt">Surprise me</span></div></div>`:"");
  el.innerHTML=`<button class="btn backbtn" id="sel-back">◀ Back</button>
    <div class="selhead"><h2>${step===1?"CHOOSE YOUR DUELIST":"CHOOSE YOUR RIVAL"}</h2><div class="sub">${step===1?"Hover to learn about each duelist, click to select.":"Who will you face? Pick a rival or let fate decide."}</div></div>
    <div class="tiles" id="tiles">${tiles}</div><div id="seldetail">${detailHTML(show)}</div>${step===2?arenaPickHTML():""}
    <div class="selbtns">${step===1?`<button class="btn gold" id="sel-ok" ${SEL.player?"":"disabled"}>Next: Choose Rival ▶</button>`:`<button class="btn red" id="sel-ok" ${SEL.rival?"":"disabled"}>⚔ DUEL!</button>`}</div>`;
  el.querySelectorAll(".tile").forEach(t=>{const c=t.dataset.ch;
    t.onmouseenter=()=>{if(SEL.hover!==c){SEL.hover=c;$("#seldetail").innerHTML=detailHTML(c);bindName();}};
    t.onmouseleave=()=>{SEL.hover=null;$("#seldetail").innerHTML=detailHTML(chosen&&chosen!=="random"||chosen==="random"?(step===1?SEL.player:SEL.rival)||show:show);bindName();};
    t.onclick=()=>{if(step===1)SEL.player=c;else SEL.rival=c;SEL.hover=null;renderSelect();};});
  el.querySelectorAll(".achip").forEach(c=>c.onclick=()=>{SEL.arena=c.dataset.ar;renderSelect();});
  $("#sel-back").onclick=()=>{if(step===2){SEL.step=1;renderSelect();}else selectExit();};
  $("#sel-ok").onclick=()=>{if(step===1){SEL.step=2;SEL.rival=null;renderSelect();}else{let r=SEL.rival;if(r==="random")r=pick(CHAR_ORDER.filter(c=>c!==SEL.player));showVersus(SEL.player,r,SEL.arena);}};
  bindName();}
function bindName(){const i=$("#pname");if(i){i.oninput=()=>{const st=store();st.name=i.value.slice(0,16);saveStore(st);const t=document.querySelector('.tile[data-ch="you"] .tn');if(t)t.firstChild.textContent=playerName();};i.onclick=e=>e.stopPropagation();}}
function detailHTML(c){if(c==="random")return `<div class="detail pop" style="--c:#ffd36b"><div class="big" style="display:flex;align-items:center;justify-content:center;font-size:140px;background:radial-gradient(circle,#4a3b7a,#120c26)">🎲</div>
    <div class="info"><h3>RANDOM</h3><div class="theme">Any duelist except yourself</div><div class="bio">Let fate choose your opponent. Every rival has a themed deck and a unique ace monster.</div></div></div>`;
  const C=CHARS[c];const aces=aceNames(c);
  return `<div class="detail pop" style="--c:${C.color}"><div class="big"><img src="${PORTRAITS[C.img]}" alt=""></div>
    <div class="info"><h3>${c==="you"?playerName().toUpperCase():C.name.toUpperCase()}</h3><div class="theme">${C.theme}</div>
    <div class="bio">${C.bio}</div><div class="quote">“${C.quote}”</div>
    <div class="ace">${c==="you"?"Deck: built by you in the Deck Builder from every card in the game"+(savedDeck("you")?" (custom deck saved ✔)":" (default multicolor starter)"):"Ace monsters: <b>"+aces.join("</b> & <b>")+"</b>"+(savedDeck(c)?" · custom deck ✔":"")}</div>
    ${c==="you"&&SEL.step===1?`<div><input id="pname" maxlength="16" placeholder="Enter your duelist name" value="${(store().name||"").replace(/"/g,"&quot;")}"></div>`:""}</div></div>`;}

/* ---------- VERSUS ---------- */
let vsTimer=null;
function showVersus(p,e,arenaChoice){leaveDuel();const P=CHARS[p],E=CHARS[e];const v=$("#versus");const ar=pickArena(p,e,arenaChoice);const A=ARENAS[ar];
  v.innerHTML=`<div class="vbg" style="background-image:url(${FIELD_IMG[A.img]})"></div><div class="varena"><small>DUEL ARENA</small>✦ ${A.name.toUpperCase()} ✦</div><div class="half left" style="--c1:${P.color}"><img src="${PORTRAITS[P.img]}" alt=""></div><div class="half right" style="--c2:${E.color}"><img src="${PORTRAITS[E.img]}" alt=""></div>
    <div class="vs">VS</div><div class="vname vl" style="color:${P.color}">${p==="you"?playerName().toUpperCase():P.name.toUpperCase()}<small>${P.race?P.race+" Deck":"Custom Deck"}</small></div>
    <div class="vname vr" style="color:${E.color}">${E.name.toUpperCase()}<small>${E.race?E.race+" Deck":"Custom Deck"}</small></div><div class="flash"></div><div class="skip">Click to skip</div>`;
  showScreen("versus",true);
  anim(v.querySelector(".left"),[{transform:"translateX(-100%)"},{transform:"none"}],600,{easing:"cubic-bezier(.2,.9,.3,1.2)"});
  anim(v.querySelector(".right"),[{transform:"translateX(100%)"},{transform:"none"}],600,{easing:"cubic-bezier(.2,.9,.3,1.2)"});
  v.querySelector(".vs").style.opacity=0;v.querySelectorAll(".vname").forEach(n=>n.style.opacity=0);
  setTimeout(()=>{const vs=v.querySelector(".vs");if(!vs)return;vs.style.opacity=1;
    anim(vs,[{transform:"translate(-50%,-50%) scale(5) rotate(-20deg)",opacity:0},{transform:"translate(-50%,-50%) scale(.9) rotate(0)",opacity:1,offset:.7},{transform:"translate(-50%,-50%) scale(1)",opacity:1}],380,{easing:"ease-in"});
    setTimeout(()=>{anim(v.querySelector(".flash"),[{opacity:.9},{opacity:0}],400);shakeEl("#stage",true);
      v.querySelectorAll(".vname").forEach((n,i)=>{n.style.opacity=1;anim(n,[{transform:`translateY(40px)`,opacity:0},{transform:"none",opacity:1}],400);});},360*SPEED);},650*SPEED);
  let gone=false;const go=()=>{if(gone)return;gone=true;clearTimeout(vsTimer);v.onclick=null;startDuel(p,e,{arena:ar});};
  v.onclick=go;vsTimer=setTimeout(go,3000*SPEED);}

/* ---------- DECK BUILDER ---------- */
const DB={ch:"you",deck:{},filter:"all",race:"all",dirty:false};
function openBuilder(ch){DB.ch=ch;DB.deck=Object.assign({},savedDeck(ch)||defaultDeck(ch));DB.filter="all";DB.race="all";DB.dirty=false;showScreen("builder");renderBuilder();}
function deckCount(){return Object.values(DB.deck).reduce((a,b)=>a+b,0);}
function sortKey(c){return (c.type==="monster"?0:c.type==="spell"?1:2)*100000+(c.type==="monster"?c.level*1000+c.atk/10:0);}
function renderBuilder(keepScroll){const el=$("#builder");const C=CHARS[DB.ch];const pool=poolFor(DB.ch).map(id=>CARDS[id]);
  const st=document.querySelector(".bpool");const sc0=keepScroll&&st?st.scrollTop:0;
  const races=[...new Set(pool.filter(c=>c.type==="monster").map(c=>c.race))];
  const vis=pool.filter(c=>{const f=DB.filter;if(f==="monster"&&c.type!=="monster")return false;if(f==="spell"&&c.type!=="spell")return false;if(f==="trap"&&c.type!=="trap")return false;
    if(f==="effect"&&!(c.type==="monster"&&isEffect(c)))return false;if(f==="ace"&&!c.ace)return false;if(f==="equip"&&c.kind!=="Equip")return false;if(f==="cont"&&c.kind!=="Continuous")return false;if(f==="quick"&&c.kind!=="Quick-Play")return false;
    if(DB.race!=="all"&&!(c.type==="monster"&&c.race===DB.race))return false;return true;}).sort((a,b)=>sortKey(a)-sortKey(b));
  const n=deckCount();const ok=n>=30&&n<=40;
  const list=Object.keys(DB.deck).filter(id=>DB.deck[id]>0).map(id=>CARDS[id]).sort((a,b)=>sortKey(a)-sortKey(b));
  const fb=(k,l)=>`<button class="btn ${DB.filter===k?"on":""}" data-f="${k}">${l}</button>`;
  const mcount=list.filter(c=>c.type==="monster").reduce((a,c)=>a+DB.deck[c.id],0),scount=list.filter(c=>c.type==="spell").reduce((a,c)=>a+DB.deck[c.id],0);
  el.innerHTML=`<button class="btn backbtn" id="db-back">◀ Menu</button>
   <div class="bhead"><div class="bt"><h2>DECK BUILDER</h2><div style="font-size:12px;opacity:.85"><b style="color:${C.color}">${DB.ch==="you"?playerName():C.name}</b> · ${DB.ch==="you"?"pool: every card in the game":"pool: "+C.race+" signature cards + shared cards"}</div></div>
   <div class="ctabs">${CHAR_ORDER.map(c=>`<div class="ctab ${c===DB.ch?"sel":""}" data-ch="${c}" title="${CHARS[c].name}" style="--c:${CHARS[c].color}"><img src="${PORTRAITS[CHARS[c].img]}" alt=""></div>`).join("")}</div></div>
   <div class="bfilters">${fb("all","All")}${fb("monster","Monsters")}${fb("effect","Effect")}${fb("ace","Aces")}${fb("spell","Spells")}${fb("trap","Traps")}${fb("equip","Equip")}${fb("cont","Continuous")}${fb("quick","Quick-Play")}
     ${races.length>1?`<select id="db-race"><option value="all">All types</option>${races.map(r=>`<option ${DB.race===r?"selected":""}>${r}</option>`).join("")}</select>`:""}
     <span style="font-size:11px;opacity:.7;margin-left:6px">Click = add · Right-click = remove · max 3 copies</span></div>
   <div class="bpool">${vis.map(c=>`<div class="pcard" data-id="${c.id}">${cardHTML(c,{noUid:true})}${DB.deck[c.id]?`<span class="cnt">×${DB.deck[c.id]}</span>`:""}${c.ch!=="shared"&&DB.ch==="you"?`<span class="own" style="color:${CHARS[c.ch].color}">${CHARS[c.ch].name}</span>`:c.ch==="shared"?`<span class="own">Shared</span>`:""}</div>`).join("")}</div>
   <div class="bside"><div class="bprev" id="db-prev"><div style="opacity:.4;margin-top:100px;font-size:12px">Hover a card to inspect</div></div>
    <div class="dstat"><span>Deck: <span class="${ok?"ok":"bad"}">${n}</span> / 30–40</span><span style="font-size:12px;opacity:.8">M ${mcount} · S ${scount} · T ${n-mcount-scount}</span></div>
    <div class="dlist">${list.map(c=>`<div class="drow" data-id="${c.id}"><span class="sw" style="background:${c.type==="monster"?(c.ace?"#ffd36b":isEffect(c)?"#d06a2c":"#d1ad57"):c.type==="spell"?"#1d8f6c":"#b0408e"}"></span><span class="nm">${c.type==="monster"?"★"+c.level+" ":""}${c.name}</span><b>×${DB.deck[c.id]}</b><button class="btn" data-rm="${c.id}">−</button><button class="btn" data-add="${c.id}">+</button></div>`).join("")||"<i>Empty deck.</i>"}</div>
    <div class="bbtns"><button class="btn green" id="db-save" ${ok?"":"disabled"}>💾 Save Deck</button><button class="btn" id="db-reset">↺ Reset to Default</button></div>
    <div style="font-size:11px;opacity:.6;text-align:center">${savedDeck(DB.ch)?"A custom deck is saved for this duelist.":"Using the default deck."}${DB.dirty?" · <span style='color:#ffd36b'>unsaved changes</span>":""}</div></div>`;
  if(keepScroll){const nb=document.querySelector(".bpool");if(nb)nb.scrollTop=sc0;}
  $("#db-back").onclick=()=>showScreen("menu");
  el.querySelectorAll(".ctab").forEach(t=>t.onclick=()=>openBuilder(t.dataset.ch));
  el.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{DB.filter=b.dataset.f;renderBuilder();});
  const rs=$("#db-race");if(rs)rs.onchange=()=>{DB.race=rs.value;renderBuilder();};
  const prev=id=>{$("#db-prev").innerHTML=`<div>${cardHTML(CARDS[id],{noUid:true,cls:"lg"})}</div>`;};
  let dbt=null;const prevHide=()=>{clearTimeout(dbt);dbt=setTimeout(()=>{const d=$("#db-prev");if(d)d.innerHTML='<div style="opacity:.4;margin-top:100px;font-size:12px">Hover a card to inspect</div>';},140);};
  el.querySelectorAll(".pcard,.drow").forEach(p=>p.addEventListener("mouseleave",prevHide));
  el.querySelectorAll(".pcard").forEach(p=>{p.onmouseenter=()=>{clearTimeout(dbt);prev(p.dataset.id);};p.onclick=()=>dbAdd(p.dataset.id);p.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();dbRemove(p.dataset.id);};});
  el.querySelectorAll(".drow").forEach(r=>r.onmouseenter=()=>{clearTimeout(dbt);prev(r.dataset.id);});
  el.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>dbAdd(b.dataset.add));
  el.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>dbRemove(b.dataset.rm));
  $("#db-save").onclick=()=>{const st=store();st.decks=st.decks||{};st.decks[DB.ch]=Object.assign({},DB.deck);const ok2=saveStore(st);DB.dirty=false;renderBuilder(true);toast(ok2?"Deck saved!":"Could not save (storage unavailable)");};
  $("#db-reset").onclick=()=>{const st=store();if(st.decks)delete st.decks[DB.ch];saveStore(st);DB.deck=Object.assign({},defaultDeck(DB.ch));DB.dirty=false;renderBuilder(true);toast("Deck reset to default.");};}
function dbAdd(id){const n=deckCount();if((DB.deck[id]||0)>=3){toast("Max 3 copies per card.");return;}if(n>=40){toast("Deck is full (40 cards max).");return;}DB.deck[id]=(DB.deck[id]||0)+1;DB.dirty=true;renderBuilder(true);}
function dbRemove(id){if(!DB.deck[id])return;DB.deck[id]--;if(!DB.deck[id])delete DB.deck[id];DB.dirty=true;renderBuilder(true);}
function toast(t){const d=document.createElement("div");d.className="toast";d.textContent=t;$("#app").appendChild(d);setTimeout(()=>d.remove(),1600);}

/* Back from duelist select step 1: return to the screen it was opened from (Choose your duel) */
function selectExit(){if(typeof window.openDuelSelect==="function")window.openDuelSelect();else showScreen("menu");}
/* ---------- HOW TO PLAY ---------- */
function showHelp(){
  $("#modalLayer").innerHTML=`<div class="modal-bg"><div class="modal" style="width:720px">
  <h2>📜 How to Play — Arcane Duel Chronicles</h2>
  <p>Reduce your rival's <b>8000 Life Points</b> to 0. If you must draw from an empty deck, you lose. Decks hold 30–40 cards; both duelists start with 5 cards and draw 1 each turn (the first player skips that draw).</p>
  <h3>Turn phases</h3><ul><li><b>Draw → Main 1 → Battle → Main 2 → End.</b> Advance with the phase bar buttons. No Battle Phase on the very first turn. End Phase: discard down to ${HAND_LIMIT} cards.</li></ul>
  <h3>Main Phase</h3><ul>
  <li><b>One Normal Summon or Set per turn.</b> Level 1–4: no tribute · Level 5–6: tribute 1 · Level 7+: tribute 2.</li>
  <li>Summon = face-up Attack Position. Set = face-down Defense Position. Change a monster's position once per turn (not the turn it arrived); face-down monsters can be Flip Summoned.</li>
  <li><b>Spells</b> (green) are activated from your hand — Equip and Continuous spells stay on the field. <b>Traps</b> (purple) are Set and trigger on your rival's turn when they attack.</li>
  <li><b>Setting spells:</b> any spell can be Set face-down in a Spell &amp; Trap Zone. A Set Normal, Equip or Continuous spell can be activated later in your Main Phase — your Set cards show a <b>SET</b> tag, and <b>SET · READY</b> when you can click them to activate. Your rival only sees a face-down card.</li></ul>
  <h3>Quick-Play spells</h3><ul>
  <li>Marked <b>[QUICK-PLAY SPELL]</b> with a lightning-bolt badge. Activate one from your hand during your own turn (Main or Battle Phase), or Set it.</li>
  <li>A Set Quick-Play can also be activated during your rival's turn — but not on the turn it was Set. You get an <b>Activate a Quick-Play?</b> prompt when the rival declares an attack, summons a monster, or activates a spell (only if one of your Set Quick-Plays can be used; traps share the attack prompt). <b>Pass for this turn</b> stops the prompts until the rival's turn ends.</li>
  <li>Quick-Play effects pick their target automatically: during an attack they hit the attacker (or boost your monster in that battle); after a summon they hit the summoned monster.</li></ul>
  <h3>Battle Phase</h3><ul>
  <li>Each face-up Attack Position monster attacks once. Attack directly if the rival has no monsters.</li>
  <li><b>ATK vs ATK:</b> weaker monster destroyed, its controller takes the difference (tie: both destroyed). <b>ATK vs DEF:</b> if ATK &gt; DEF the defender is destroyed (no damage); if ATK &lt; DEF the attacker's controller takes the difference. Face-down monsters flip when attacked.</li></ul>
  <h3>Monster effects</h3><ul>
  <li><b>✦ When Normal Summoned</b> — triggers on a face-up Normal Summon (not when Set or Special Summoned).</li>
  <li><b>↻ FLIP</b> — triggers when flipped face-up (Flip Summon or when attacked).</li>
  <li><b>When destroyed</b> — triggers when sent to the Graveyard by battle or card effect.</li>
  <li><b>▲ Continuous</b> — boosts your face-up monsters of a type (e.g. all Dragons +300 ATK) while it stays face-up.</li>
  <li><b>➹ Piercing</b> — inflicts the difference when attacking a Defense Position monster. <b>👻 Phantom Strike</b> — may attack directly even if the rival has monsters (click the rival's LP panel). <b>🛡 Stalwart</b> — survives its first battle destruction.</li>
  <li><b>⏩ Double Sprint</b> — may attack twice each Battle Phase. <b>⬆ Reps</b> — at the start of your turn gains permanent ATK while face-up (lost when it leaves the field). <b>Fan Power</b> — gains ATK for each of your other monsters of its type.</li>
  <li><b>Boost spells</b> (e.g. Nitro Boost, Whey Shake, Tailwind) — click one of your face-up monsters: it gains ATK until end of turn.</li>
  <li><b>Combination spells</b> (Ben's robots) — send the listed parts from your hand and/or field to the Graveyard to Special Summon a giant combined robot straight from outside the deck. Parts are picked automatically (hand first).</li>
  <li>Effects choose targets automatically (the strongest valid card). <b>Special Summons</b> don't use your Normal Summon. <b>Ace monsters</b> (golden frame) get an animated summon clip (first one each duel) followed by a cinematic entrance — click to skip either. Duelist portraits react: they talk, point when summoning or attacking, flinch on damage and celebrate on victory.</li></ul>
  <h3>Duelists & decks</h3><ul><li>Each duelist has a themed deck. Edit any deck in the <b>Deck Builder</b> (30–40 cards, max 3 copies): themed duelists use their signature cards + shared cards; <b>You</b> can use every card in the game.</li></ul>
  <h3>Controls</h3><ul>
  <li><b>Drag &amp; drop</b> (mouse or touch): drag a monster from your hand onto an empty Monster Zone, then choose <b>Summon (Attack)</b> or <b>Set (face-down Defense)</b> — tributes are picked as usual. Drag a spell onto an empty Spell &amp; Trap Zone to <b>Activate</b> or <b>Set</b> it (traps: Set). Drop a spell anywhere else on the field to activate it; drop a targeting spell straight onto its target.</li>
  <li><b>Drag to attack:</b> in your Battle Phase, drag one of your Attack Position monsters onto an enemy monster, or onto the rival's portrait / LP panel for a legal direct attack. Valid drops glow, invalid ones are greyed out; dropping anywhere else snaps the card back.</li>
  <li>Clicking still works for everything. Hover a card to preview, right-click to inspect it full-size. Click a Graveyard pile to view it. Esc cancels a selection.</li></ul>
  <h3>Choosing cards for effects</h3><ul>
  <li>When one of your effects Special Summons from your Deck, hand or Graveyard, adds a card from your Deck, revives a monster, destroys a card or targets with a Quick-Play, a chooser opens. Hover a card to read it, click to select, then <b>Confirm</b>. Optional summons also offer <b>Don't summon</b>. Your Deck is shuffled afterwards.</li>
  <li>"When destroyed" summon effects can never summon another copy of the destroyed card.</li></ul>
  <h3>Sound &amp; Music</h3><ul>
  <li>Audio starts after your first click (browser rule). Use <b>SYSTEM &rarr; Sound</b> on the main menu, <b>Menu &rarr; Sound Settings</b> in a duel, or right-click the speaker button for Music / Sound-effect volume and Mute all. Left-click the speaker to mute or unmute. Settings are saved.</li>
  <li>Each arena has its own theme: heroic (castle, forest), fiery (dragon lair), techy neon (machines, robots, racetrack, hobby con), cute (fairy lake, idol stage, toy town, cat cafe), mystic (magician's room, silent theatre), dark (Nemesis Coliseum) and chill (kopitiam, office). The music dips while ace clips play.</li></ul>
  <h3>Credits</h3><ul>
  <li>All music and sound effects are original, composed and synthesised in code with the Web Audio API for this game. No third-party audio files or samples are used. See CREDITS.txt in the download.</li></ul>
  <div class="btnrow"><button class="btn gold" id="btn-close-help">Close</button></div></div></div>`;
  $("#btn-close-help").onclick=()=>{$("#modalLayer").innerHTML="";};}

/* ================= EVENTS ================= */
function cancelUI(){if(G&&G.ui.mode&&G.ui.mode!=="discard"){G.ui={mode:null};render();}closeMenu();}
document.addEventListener("click",e=>{if(CUR!=="duel"||!G)return;
  if(e.target.closest("#menuLayer")||e.target.closest("#modalLayer")||e.target.closest("#cine")||e.target.closest("#vclip"))return;
  const ph=e.target.closest("[data-phase]");if(ph){phaseAct(ph.dataset.phase);return;}
  const gy=e.target.closest("[data-gy]");if(gy){showGY(gy.dataset.gy);return;}
  const lp=e.target.closest("[data-lp]");
  if(lp&&lp.dataset.lp==="enemy"&&G.ui.mode==="attack"&&humanTurn()){const a=find(G.ui.attUid);if(a&&canGoDirect("player",a.card)){const id=G.ui.attUid;G.ui={mode:null};act(()=>attack("player",id,null));return;}}
  const ce=e.target.closest("#duel [data-uid]");
  if(ce){onCardClick(+ce.dataset.uid,ce);return;}
  cancelUI();});
document.addEventListener("contextmenu",e=>{e.preventDefault();if(CUR!=="duel"||!G)return;const ce=e.target.closest("#duel [data-uid]");if(ce&&!e.target.closest("#modalLayer")){inspect(+ce.dataset.uid);return;}cancelUI();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if($("#insp"))$("#modalLayer").innerHTML="";cancelUI();}});
document.addEventListener("mouseover",e=>{if(CUR!=="duel"||!G||(typeof DRAG!=="undefined"&&DRAG.st&&DRAG.st.on))return;const ce=e.target.closest("#duel [data-uid]");
  if(ce){const u=+ce.dataset.uid;if(u!==prevUid)showPreview(u);else clearTimeout(prevTimer);}else if(prevUid!==null)hidePreview();});
$("#btn-help").onclick=()=>showHelp();
$("#btn-quit").onclick=()=>{
  $("#modalLayer").innerHTML=`<div class="modal-bg"><div class="modal" style="width:420px;text-align:center"><h2>Leave the duel?</h2><p>The current duel will be abandoned.</p>
   <div class="btnrow"><button class="btn red" id="q-yes">Return to Menu</button><button class="btn" id="q-no">Keep Dueling</button></div></div></div>`;
  $("#q-yes").onclick=()=>{leaveDuel();showScreen("menu");};$("#q-no").onclick=()=>{$("#modalLayer").innerHTML="";};};
function fit(){SCALE=Math.min(window.innerWidth/1280,window.innerHeight/800);$("#app").style.transform=`scale(${SCALE})`;}
window.addEventListener("resize",fit);fit();

/* ================= DEBUG HOOK (hidden, for automated playtests) ================= */
window.__adc={
  quickDuel:(p,e,o)=>startDuel(p,e,o||{}),
  get state(){return G;},
  setSpeed:x=>{SPEED=x;},
  auto:on=>{G.auto=!!on;if(on&&G.current==="player"&&G.humanEnd&&!G.busy){G.busy=true;const h=G.humanEnd;aiTurn("player").then(()=>h()).catch(e=>{if(e!==ABORT)console.error(e);});}},
  chars:CHAR_ORDER,cards:CARDS,
  testEntrance:(id,side)=>entrance(Object.assign(mk(id,side||"player"),{faceUp:true}),side||"player"),
  testClip:(kind,ch)=>{const c=ch||"kaito";return playClip(kind+"_"+(CHARS[c]?CHARS[c].img:c),"TEST");},
  expr:(s,x,h)=>x==="talk"?exprTalk(s,h||1500):exprSet(s,x,h==null?1200:h),
  get v3(){return {V3,ART_BAD,EXPR_BAD,CLIP_BAD};},
  forceSummon:(id,side)=>{side=side||"player";const c=mk(id,side);S(side).hand.push(c);S(side).normalSummoned=false;return normalSummon(side,c.uid,[],false);}
};
showScreen("menu",true);
/* ================= v4: DRAG & DROP (pointer events: mouse, pen, touch) ================= */
const DRAG={st:null};
function appXY(e){const a=$("#app").getBoundingClientRect();return {x:(e.clientX-a.left)/SCALE,y:(e.clientY-a.top)/SCALE};}
function zoneIdx(z){return z&&z.parentNode?[...z.parentNode.children].indexOf(z):-1;}
function dragKind(uid){if(!humanTurn()||G.ui.mode)return null;const f=find(uid);if(!f||f.side!=="player")return null;
  if(f.zone==="hand"){if(inMain())return "hand";if(G.phase==="battle"&&isQuick(f.card))return "hand";return null;}
  if(f.zone==="monsters"&&G.phase==="battle"&&canAttackWith("player",f.card))return "attack";
  return null;}
/* which drop targets are legal for the card being dragged */
function dropPlan(d){const c=find(d.uid).card,P=S("player"),plan=[];
  const mz=[...document.querySelectorAll("#p-m .zone")],sz=[...document.querySelectorAll("#p-st .zone")],ez=[...document.querySelectorAll("#e-m .zone")],es=[...document.querySelectorAll("#e-st .zone")];
  const add=(el,ok,act)=>plan.push({el,ok,act});
  if(d.kind==="attack"){const direct=canGoDirect("player",c);
    ez.forEach((z,i)=>{const m=P&&S("enemy").monsters[i];add(z,!!m,m?{t:"attack",uid:m.uid}:null);});
    add($("#duel-enemy"),direct,{t:"direct"});
    return plan;}
  if(c.type==="monster"){const can=inMain()&&canNormalSummon("player",c);const need=tributesNeeded(c);const anyFree=P.monsters.some(x=>!x);
    mz.forEach((z,i)=>add(z,can&&(!P.monsters[i]||(!anyFree&&need>0)),{t:"summon",idx:i}));
    sz.concat(ez,es).forEach(z=>add(z,false,null));return plan;}
  const canAct=spellCanActivate("player",c),tg=c.type==="spell"?spellTargets(c):null;
  sz.forEach((z,i)=>add(z,!P.st[i]&&(c.type==="trap"?inMain():(canAct||inMain())),{t:"st",idx:i}));
  const tgt=(z,m)=>add(z,!!m&&canAct&&(tg?tg.includes(m.uid):isQuick(c)&&qTarget("player",c,{})===m),m?{t:"spellOn",uid:m.uid}:null);
  if(c.type==="spell"){mz.forEach((z,i)=>tgt(z,P.monsters[i]));ez.forEach((z,i)=>tgt(z,S("enemy").monsters[i]));
    es.forEach((z,i)=>{const t=S("enemy").st[i];add(z,!!t&&canAct&&!!tg&&tg.includes(t.uid),t?{t:"spellOn",uid:t.uid}:null);});}
  else mz.concat(ez,es).forEach(z=>add(z,false,null));
  return plan;}
function dragStart(d,e){closeMenu();d.on=true;document.body.classList.add("dragging");
  const p=appXY(e);d.plan=dropPlan(d);
  d.plan.forEach(t=>{if(t.el)t.el.classList.add(t.ok?"drop-ok":"drop-no");});
  const c=find(d.uid).card;
  if(d.kind==="attack"){d.el.classList.add("drag-att");const a=appPos(d.el);d.ax=a.x;d.ay=a.y;
    const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("class","dragarrow");svg.setAttribute("width","1280");svg.setAttribute("height","800");
    svg.innerHTML=`<defs><marker id="ahead" markerWidth="5" markerHeight="5" refX="2.6" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#ff5a4a"/></marker></defs><line x1="${a.x}" y1="${a.y}" x2="${p.x}" y2="${p.y}" stroke="#ff5a4a" stroke-width="7" stroke-linecap="round" marker-end="url(#ahead)" opacity=".9"/><circle cx="${a.x}" cy="${a.y}" r="10" fill="#ff5a4a" opacity=".8"/>`;
    $("#fx").appendChild(svg);d.arrow=svg;}
  else{const r=d.el.getBoundingClientRect();const g=d.el.cloneNode(true);g.removeAttribute("data-uid");g.classList.remove("playable","selected");g.classList.add("dragghost");
    g.style.fontSize=getComputedStyle(d.el).fontSize;g.style.left=p.x+"px";g.style.top=p.y+"px";
    d.ox=(e.clientX-r.left)/SCALE;d.oy=(e.clientY-r.top)/SCALE;g.style.marginLeft=-d.ox+"px";g.style.marginTop=-d.oy+"px";
    $("#fx").appendChild(g);d.ghost=g;d.el.classList.add("dragsrc");}
  showPreview(d.uid);}
function hoverTarget(d,e){const el=document.elementFromPoint(e.clientX,e.clientY);if(!el)return null;
  for(const t of d.plan){if(t.el&&(t.el===el||t.el.contains(el)))return t;}
  if(el.closest("#field"))return {field:true};return null;}
function dragMove(d,e){const p=appXY(e);
  if(d.ghost){d.ghost.style.left=p.x+"px";d.ghost.style.top=p.y+"px";}
  if(d.arrow){const l=d.arrow.querySelector("line");l.setAttribute("x2",p.x);l.setAttribute("y2",p.y);}
  const h=hoverTarget(d,e);const he=h&&h.el;
  if(d.hov!==he){if(d.hov)d.hov.classList.remove("drop-hover");if(he&&h.ok)he.classList.add("drop-hover");d.hov=he;}}
function dragCleanup(d){document.body.classList.remove("dragging");
  if(d.plan)d.plan.forEach(t=>{if(t.el)t.el.classList.remove("drop-ok","drop-no","drop-hover");});
  if(d.arrow)d.arrow.remove();if(d.el){d.el.classList.remove("dragsrc","drag-att");}
  DRAG.st=null;DRAG.swallow=true;setTimeout(()=>{DRAG.swallow=false;},60);hidePreview();}
function snapBack(d){const g=d.ghost;dragCleanup(d);
  if(g&&d.el&&d.el.isConnected){const r=appPos(d.el),gx=parseFloat(g.style.left)-d.ox+d.el.offsetWidth/2,gy=parseFloat(g.style.top)-d.oy+d.el.offsetHeight/2;
    anim(g,[{transform:"none"},{transform:`translate(${r.x-gx}px,${r.y-gy}px)`,opacity:.4}],220).then(()=>g.remove());}
  else if(g)g.remove();}
function dragDrop(d,e){const h=hoverTarget(d,e);const c=find(d.uid)&&find(d.uid).card;
  if(!c||!humanTurn()){snapBack(d);return;}
  if(h&&h.ok===false||!h){snapBack(d);return;}
  if(h.field){ /* dropped on the field but not on a specific zone: activate spells, otherwise snap back */
    if(c.type==="spell"&&spellCanActivate("player",c)){if(d.ghost)d.ghost.remove();dragCleanup(d);startSpell(c);return;}
    snapBack(d);return;}
  const a=h.act;if(d.ghost)d.ghost.remove();dragCleanup(d);
  if(a.t==="attack"){act(()=>attack("player",d.uid,a.uid));return;}
  if(a.t==="direct"){act(()=>attack("player",d.uid,null));return;}
  if(a.t==="summon"){const need=tributesNeeded(c),tr=need?` (tribute ${need})`:"";
    openMenu(h.el,[{label:"Summon (Attack)"+tr,cls:"gold",fn:()=>startSummon(c,false,a.idx)},{label:"Set (face-down Defense)"+tr,fn:()=>startSummon(c,true,a.idx)},{label:"Cancel",fn:()=>{}}]);return;}
  if(a.t==="st"){const items=[];
    if(c.type==="spell")items.push({label:"Activate",cls:"gold",disabled:!spellCanActivate("player",c),fn:()=>startSpell(c,a.idx)});
    if(inMain())items.push({label:"Set",cls:c.type==="trap"?"gold":"",fn:()=>act(()=>setTrap("player",c.uid,a.idx))});
    items.push({label:"Cancel",fn:()=>{}});openMenu(h.el,items);return;}
  if(a.t==="spellOn"){startSpell(c,null,a.uid);return;}}
document.addEventListener("pointerdown",e=>{if(e.button!==0||CUR!=="duel"||!G||DRAG.st)return;
  if(e.target.closest("#menuLayer")||e.target.closest("#modalLayer"))return;
  const ce=e.target.closest("#duel [data-uid]");if(!ce)return;const uid=+ce.dataset.uid;const k=dragKind(uid);if(!k)return;
  DRAG.st={uid,kind:k,el:ce,x0:e.clientX,y0:e.clientY,pid:e.pointerId,on:false};});
document.addEventListener("pointermove",e=>{const d=DRAG.st;if(!d||e.pointerId!==d.pid)return;
  if(!d.on){if(Math.hypot(e.clientX-d.x0,e.clientY-d.y0)<7)return;if(!humanTurn()){DRAG.st=null;return;}dragStart(d,e);}
  e.preventDefault();dragMove(d,e);},{passive:false});
document.addEventListener("pointerup",e=>{const d=DRAG.st;if(!d||e.pointerId!==d.pid)return;if(!d.on){DRAG.st=null;return;}dragDrop(d,e);});
document.addEventListener("pointercancel",e=>{const d=DRAG.st;if(!d)return;if(d.on)snapBack(d);else DRAG.st=null;});
/* swallow the click that follows a drag so it doesn't open a menu / cancel */
document.addEventListener("click",e=>{if(DRAG.swallow){DRAG.swallow=false;e.stopPropagation();e.preventDefault();}},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&DRAG.st&&DRAG.st.on)snapBack(DRAG.st);});
/* ================= CHOICE UI (v6c) =================
   requestChoice(side, options, opts) -> Promise<card|null>
   The single entry point for every "choose a card" decision made by an effect.
   - side: "player" | "enemy". AI sides (isAI(side): the enemy, or the player when G.auto) never see a modal:
     they get opts.ai(cards) if given, else bestBy(cards, opts.score) if given, else the first card.
   - options: array of cards, or {card, hidden, note} objects (hidden = show the card back, e.g. a Set Spell/Trap).
   - opts: {title, sub, optional (adds a "Don't use" button, returns null), cancelLabel, confirmLabel, score, ai, src}
   Online multiplayer can wrap window.requestChoice: when `side` belongs to the remote guest, send
   {title, sub, optional, uids: options.map(o=>o.uid)} over the network and resolve with the card whose uid comes back. */
function choiceNorm(o){return o&&o.card?o:{card:o};}
function requestChoice(side,options,opts){opts=opts||{};const list=(options||[]).map(choiceNorm).filter(o=>o.card);
  if(!list.length)return Promise.resolve(null);
  if(!G||isAI(side)){const cards=list.map(o=>o.card);let c=null;
    if(opts.ai)c=opts.ai(cards);else if(opts.score)c=bestBy(cards,opts.score);else c=cards[0];return Promise.resolve(c||null);}
  if(opts.amount)return amountChoice(list,opts);
  return new Promise(res=>{const gid=GID;let sel=-1,done=false;
    const fin=v=>{if(done)return;done=true;clearInterval(watch);const m=$("#chooser");if(m)m.closest(".modal-bg").remove();res(v);};
    const prevHTML=o=>o.hidden?`<div class="pvcard">${cardHTML(o.card,{hidden:true,noUid:true,cls:"lg"})}</div><div class="pinfo"><b>Face-down card</b><br>${o.note||"A Set card."}</div>`
      :`<div class="pvcard">${cardHTML(o.card,{noUid:true,cls:"lg"})}</div>`;
    const stat=c=>c.type==="monster"?`Lv ${c.level} · ${c.race}<br>ATK ${c.atk} / DEF ${c.def}`:(c.type==="spell"?"Spell":"Trap");
    const wrap=document.createElement("div");wrap.className="modal-bg chooser-bg";
    wrap.innerHTML=`<div class="modal chooser" id="chooser"><h2>${opts.title||"Choose a card"}</h2>${opts.sub?`<p class="chsub">${opts.sub}</p>`:""}
      <div class="chbody"><div class="chgrid">${list.map((o,i)=>`<div class="chopt" data-i="${i}"><div class="cc">${cardHTML(o.card,{hidden:!!o.hidden,noUid:true})}</div>
        <div class="cn">${o.hidden?"Set card":`<b>${o.card.name}</b><br><span>${stat(o.card)}</span>`}${o.note&&!o.hidden?`<br><i>${o.note}</i>`:""}</div></div>`).join("")}</div>
      <div class="chpv" id="chpv">${prevHTML(list[0])}</div></div>
      <div class="btnrow"><button class="btn gold" id="ch-ok" disabled>${opts.confirmLabel||"Confirm"}</button>${opts.optional?`<button class="btn" id="ch-no">${opts.cancelLabel||"Don't use"}</button>`:""}</div></div>`;
    ($("#modalLayer")||document.body).appendChild(wrap);
    const pv=$("#chpv"),okb=$("#ch-ok");
    wrap.querySelectorAll(".chopt").forEach(el=>{const i=+el.dataset.i;
      el.addEventListener("mouseenter",()=>{pv.innerHTML=prevHTML(list[i]);});
      el.addEventListener("mouseleave",()=>{if(sel>=0)pv.innerHTML=prevHTML(list[sel]);});
      el.addEventListener("click",()=>{sel=i;wrap.querySelectorAll(".chopt").forEach(e=>e.classList.toggle("sel",e===el));okb.disabled=false;pv.innerHTML=prevHTML(list[i]);});
      el.addEventListener("dblclick",()=>{sel=i;fin(list[i].card);});});
    okb.onclick=()=>{if(sel>=0)fin(list[sel].card);};
    const no=$("#ch-no");if(no)no.onclick=()=>fin(null);
    const watch=setInterval(()=>{if(GID!==gid||!G||G.over||!document.body.contains(wrap))fin(null);},300);});}
/* v9h: AMOUNT chooser - opts.amount:true and options {value,label,desc} (first option = skip / 0).
   A slider + quick buttons; resolves with the chosen option object. Same #chooser modal, so the online
   guest flow (countdown, choiceEnd) works unchanged. */
function amountChoice(list,opts){return new Promise(res=>{const gid=GID;let i=0,done=false;
  if(!$("#amtcss")){const st=document.createElement("style");st.id="amtcss";st.textContent=`.chooser.amt{width:560px;max-width:92vw}
.chooser.amt .amtv{font-size:54px;font-weight:900;line-height:1;text-align:center;color:#ffd36b;text-shadow:0 0 18px rgba(255,140,60,.7);margin:10px 0 2px}
.chooser.amt .amtv small{font-size:20px;color:#ffe9c4;margin-left:6px}
.chooser.amt input[type=range]{width:100%;margin:12px 0 6px;accent-color:#ff7a3a;height:26px;cursor:pointer}
.chooser.amt .amtq{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:4px 0 8px}
.chooser.amt .amtq .btn{padding:5px 12px;font-size:13px}.chooser.amt .amtq .btn.on{outline:2px solid #ffd36b;box-shadow:0 0 12px rgba(255,211,107,.6)}
.chooser.amt .amtd{min-height:62px;padding:8px 12px;border-radius:8px;background:rgba(0,0,0,.35);border:1px solid rgba(255,211,107,.35);font-size:14px;line-height:1.4;color:#f3e6ff}`;
    document.head.appendChild(st);}
  const fin=v=>{if(done)return;done=true;clearInterval(watch);const m=$("#chooser");if(m)m.closest(".modal-bg").remove();res(v);};
  const val=o=>+(o.value||0);const quick=[0,500,1000,1500,2000];
  const wrap=document.createElement("div");wrap.className="modal-bg chooser-bg";
  wrap.innerHTML=`<div class="modal chooser amt" id="chooser"><h2>${opts.title||"Choose an amount"}</h2>${opts.sub?`<p class="chsub">${opts.sub}</p>`:""}
    <div class="amtv" id="amt-v"></div><input type="range" id="amt-r" min="0" max="${list.length-1}" step="1" value="0">
    <div class="amtq">${list.map((o,k)=>quick.includes(val(o.card))?`<button class="btn" data-k="${k}">${val(o.card)}</button>`:"").join("")}</div>
    <div class="amtd" id="amt-d"></div>
    <div class="btnrow"><button class="btn gold" id="ch-ok">${opts.confirmLabel||"Confirm"}</button><button class="btn" id="ch-no">${opts.cancelLabel||"Skip"}</button></div></div>`;
  ($("#modalLayer")||document.body).appendChild(wrap);
  const r=$("#amt-r"),v=$("#amt-v"),d=$("#amt-d"),okb=$("#ch-ok");
  const show=k=>{i=Math.max(0,Math.min(list.length-1,k|0));r.value=i;const o=list[i].card;v.innerHTML=`${val(o)}<small>${opts.unit||"LP"}</small>`;
    d.textContent=o.desc||"";okb.textContent=`${opts.confirmLabel||"Confirm"} ${val(o)} ${opts.unit||"LP"}`;okb.disabled=!val(o);
    wrap.querySelectorAll(".amtq .btn").forEach(b=>b.classList.toggle("on",+b.dataset.k===i));};
  r.oninput=()=>show(+r.value);
  wrap.querySelectorAll(".amtq .btn").forEach(b=>b.onclick=()=>show(+b.dataset.k));
  okb.onclick=()=>fin(list[i].card);$("#ch-no").onclick=()=>fin(list[0].card);
  show(Math.max(0,list.findIndex(o=>o.card.preset)));
  const watch=setInterval(()=>{if(GID!==gid||!G||G.over||!document.body.contains(wrap))fin(list[0].card);},300);});}
/* AI keeps its best pick; the human player gets the chooser */
function pickCard(s,cards,score,opts){return requestChoice(s,cards,Object.assign({score},opts||{}));}
/* combination materials: ask only when a material could come from more than one card (e.g. a copy in hand and one on the field) */
async function fusionMatsChosen(s,f,spell){const sd=S(s);if(isAI(s))return fusionMats(s,f,spell);const used=new Set(),out=[];
  for(const id of f.mats){const cands=[...sd.hand.filter(x=>x.id===id&&x!==spell&&!used.has(x.uid)).map(c=>({card:c,zone:"hand",note:"From your hand"})),
      ...sd.monsters.filter(x=>x&&x.id===id&&!used.has(x.uid)).map(c=>({card:c,zone:"monsters",note:"From your field"}))];
    if(!cands.length)return null;let pick=cands[0];
    if(cands.length>1){const c=await requestChoice(s,cands,{title:`Combination material: ${CARDS[id].name}`,sub:"Choose which copy to send to the Graveyard."});pick=cands.find(o=>o.card===c)||cands[0];}
    used.add(pick.card.uid);out.push({card:pick.card,zone:pick.zone});}
  return out;}
/* legal Quick-Play targets (mirrors qTarget) */
function qCands(s,c,ctx){const f=c.fx,o=other(s);const mine=m=>m.faceUp&&(!f.race||m.race===f.race);
  switch(f.k){case "qDestroy":return mons(o).filter(m=>m.faceUp&&atkOf(m)<=f.maxAtk);case "qBounce":return mons(o);case "qShrink":return mons(o).filter(m=>m.faceUp);case "qBoost":return mons(s).filter(mine);}
  return [];}
function fxSub(fx){const t=fxPhrase(fx)||"";return t.charAt(0).toUpperCase()+t.slice(1)+".";}
/* ================= new3c engine add-on: Eunice (LP-gain payoffs), Kimberly (costume Equip Spells), Aoi Yuki (burn) =================
   Load AFTER j_choice.js and BEFORE i_audio.js (audio + online wrappers then sit outside these wrappers).
   Every wrapper calls the function it wraps. Costume Type/Attribute/effect changes are NOT stored: they are recomputed
   from equippedTo (+ the costume's eqT order stamp) on every atkOf()/render(), so the online guest (which only receives
   primitive fields) rebuilds exactly the same state. CARDS[*].fx is never mutated.
   New kinds:
   monster fx: onGain{k:"burn"|"grow",v}  lpAtk{per,v,max,over}  equipPer:n  battleBurn:n  endBurn:n
   spell fx:   equip{v,setRace,setAttr,grant:{pierce|direct|guard|double|battleBurn},onEquip}  cont{contEquip:true,atk}
               searchEquip  cakeBurn{v,hi,need}                                                                     */
(function(){
const LP_OVER=6000;
const isGuest=()=>typeof NET!=="undefined"&&NET&&NET.role==="guest"&&G&&G.net;
const isCostume=c=>c&&c.type==="spell"&&c.fx&&c.fx.k==="equip"&&(c.fx.setRace||c.fx.grant||c.fx.onEquip);
/* ---------- costumes: deterministic recompute ---------- */
const FXC=new Map();
function costumesOn(m){const out=[];for(const s of ["player","enemy"])for(const c of S(s).st)if(c&&c.faceUp&&c.equippedTo===m.uid&&isCostume(c))out.push(c);
  return out.sort((a,b)=>(a.eqT||0)-(b.eqT||0)||a.uid-b.uid);}
/* v15: v15Base(m) = the printed card adjusted for Line Change colour / Ink Copy source (cached objects, so identity checks stay stable) */
const V15B=m=>typeof v15Base==="function"?v15Base(m):CARDS[m.id];
function restore(m){const b=V15B(m);if(!b||b.type!=="monster")return;if(m.race!==b.race)m.race=b.race;if(m.attr!==b.attr)m.attr=b.attr;if(m.fx!==b.fx)m.fx=b.fx;}
function applyCostumes(){if(!G||!G.sides)return;
  for(const s of ["player","enemy"])for(const m of S(s).monsters){if(!m||!m.id||!CARDS[m.id])continue;
    const cs=costumesOn(m);if(!cs.length){restore(m);continue;}
    const b=V15B(m);let race=b.race,attr=b.attr;const key=m.id+"|"+(m.lc!=null?m.lc:"")+"|"+(m.icSrc!=null?m.icSrc:"")+"|"+cs.map(c=>c.id).join(",");
    for(const c of cs){if(c.fx.setRace)race=c.fx.setRace;if(c.fx.setAttr)attr=c.fx.setAttr;}
    let fx=FXC.get(key);if(!fx){fx=Object.assign({},b.fx);for(const c of cs)if(c.fx.grant)for(const k in c.fx.grant)fx[k]=k==="battleBurn"?(fx[k]||0)+c.fx.grant[k]:c.fx.grant[k];fx.costumed=cs.map(c=>c.name);FXC.set(key,fx);}
    m.race=race;m.attr=attr;m.fx=fx;}}
function restoreOffField(){if(!G||!G.sides)return;for(const s of ["player","enemy"])for(const z of ["hand","gy","deck"])for(const c of S(s)[z])if(c&&c.type==="monster"&&c.id&&CARDS[c.id])restore(c);}
window.applyCostumes=applyCostumes;
/* ---------- ATK ---------- */
const equipCount=m=>allField().filter(c=>c.equippedTo===m.uid&&c.type==="spell").length;
function lpBonus(m){const f=m.fx.lpAtk;if(!f||!m.faceUp||!G.sides[m.owner])return 0;const over=S(m.owner).lp-(f.over!=null?f.over:LP_OVER);return over>0?Math.min(f.max,Math.floor(over/f.per)*f.v):0;}
const baseAtkOf=atkOf;
atkOf=function(m){applyCostumes();let a=baseAtkOf(m);if(!m||!m.fx||!G||!G.sides)return a;
  let add=0;const n=(m.fx.equipPer||G.sides[m.owner]&&S(m.owner).st.some(c=>c&&c.faceUp&&c.fx&&c.fx.contEquip))?equipCount(m):0;
  if(m.fx.equipPer&&n)add+=m.fx.equipPer*n;
  if(n&&m.faceUp&&G.sides[m.owner])for(const c of S(m.owner).st)if(c&&c.faceUp&&c.fx&&c.fx.contEquip)add+=c.fx.atk;
  add+=lpBonus(m);
  return Math.max(0,a+add);};
const baseRender=render;
render=function(){if(G&&G.sides){applyCostumes();restoreOffField();}return baseRender.apply(this,arguments);};
const baseToGY=toGY;
toGY=function(c){const r=baseToGY.apply(this,arguments);if(c&&c.type==="monster")restore(c);return r;};
/* ---------- LP gain payoffs ---------- */
const baseChangeLP=changeLP;
changeLP=async function(s,delta){await baseChangeLP.apply(this,arguments);
  if(!(delta>0)||!G||G.over||G._gainLock||isGuest())return;
  const trig=mons(s).filter(m=>m.faceUp&&m.fx&&m.fx.onGain);if(!trig.length)return;
  G._gainLock=true;
  try{for(const m of trig){if(G.over)break;const f=find(m.uid);if(!f||f.zone!=="monsters")continue;const g=m.fx.onGain;const el=elOf(m.uid);
      if(el)anim(el,[{filter:"brightness(1)"},{filter:"brightness(2.4) drop-shadow(0 0 10px #ffd27a)"},{filter:"brightness(1)"}],450);
      if(g.k==="grow"){m.bonus=(m.bonus||0)+g.v;floatText(el,`+${g.v} ATK`,"heal");log(`${m.name} rises: +${g.v} ATK (now ${atkOf(m)}).`,sc(s));render();await sleep(300);}
      else if(g.k==="burn"){log(`${m.name}: LP gained, so ${S(other(s)).name} takes ${g.v} damage!`,sc(s));await changeLP(other(s),-g.v);}}}
  finally{if(G)G._gainLock=false;}};
/* ---------- end-of-turn burn ---------- */
const baseEndPhase=endPhase;
endPhase=async function(side){
  if(G&&!G.over&&!isGuest()){const l=mons(side).filter(m=>m.faceUp&&m.fx&&m.fx.endBurn);
    for(const m of l){if(G.over)return;const f=find(m.uid);if(!f||f.zone!=="monsters")continue;
      const el=elOf(m.uid);if(el)anim(el,[{filter:"brightness(1)"},{filter:"brightness(2.6) drop-shadow(0 0 12px #6fa0ff)"},{filter:"brightness(1)"}],450);
      log(`${m.name}'s encore: ${m.fx.endBurn} damage!`,sc(side));await changeLP(other(side),-m.fx.endBurn);}}
  return baseEndPhase.apply(this,arguments);};
/* ---------- battle burn ---------- */
const baseAttack=attack;
attack=async function(s,attUid,tgtUid){applyCostumes();
  const af=find(attUid),tf=tgtUid?find(tgtUid):null;const att=af&&af.card,tgt=tf&&tf.card;const bb=att&&att.fx&&att.fx.battleBurn;
  const r=await baseAttack.apply(this,arguments);
  if(bb&&tgt&&G&&!G.over&&!isGuest()){const f=find(tgt.uid);if(f&&f.zone==="gy"){log(`${att.name} destroyed a monster: ${bb} extra damage!`,sc(s));await changeLP(other(s),-bb);}}
  return r;};
/* ---------- new effect kinds ---------- */
EXT_FX.push("searchEquip","cakeBurn");
const equipsIn=s=>S(s).deck.filter(c=>c.type==="spell"&&c.kind==="Equip");
const baseResolve=resolveFx;
resolveFx=async function(s,fx,src){
  if(!fx||Array.isArray(fx)||(fx.k!=="searchEquip"&&fx.k!=="cakeBurn"))return baseResolve.apply(this,arguments);
  const sd=S(s),o=other(s);G.stats.effects++;
  if(src){const el=elOf(src.uid);if(el)anim(el,[{filter:"brightness(1)"},{filter:"brightness(2.4) drop-shadow(0 0 10px #fff)"},{filter:"brightness(1)"}],500);}
  if(fx.k==="searchEquip"){const l=equipsIn(s);if(!l.length){log("No Equip Spell left in the Deck.","s");render();return;}
    const held=new Set(sd.hand.map(c=>c.id));
    const c=await pickCard(s,l,c=>(held.has(c.id)?0:300)+(c.fx.grant&&c.fx.grant.pierce?120:0)+(c.fx.grant&&c.fx.grant.double?110:0)+(c.fx.v||0)/4+Math.random()*80,
      {title:`${src?src.name+": ":""}Add 1 Equip Spell from your Deck to your hand`,sub:"Choose a costume (Equip Spell)."});
    if(c&&!G.over){sd.deck.splice(sd.deck.indexOf(c),1);shuffle(sd.deck);sd.hand.push(c);log(`${sd.name} adds ${isAI(s)&&s==="enemy"?"an Equip Spell":c.name} to their hand and shuffles their Deck.`,sc(s));render();
      const el=elOf(c.uid);if(el)await anim(el,[{transform:"translateY(-40px)",opacity:0},{transform:"none",opacity:1}],300);}}
  else{const d=sd.lp>=fx.need?fx.hi:fx.v;log(`${sd.name}'s cake cannon fires${d===fx.hi?" at full power":""}!`,sc(s));await changeLP(o,-d);}
  render();};
const baseCan=spellCanActivate;
spellCanActivate=function(s,c,ctx){const r=baseCan.apply(this,arguments);if(!r||!c||!c.fx)return r;
  if(c.fx.k==="searchEquip")return equipsIn(s).length>0;return r;};
const baseActivate=activateSpell;
activateSpell=async function(s,uid,targetUid,ctx,pref){
  const ff=find(uid);const c=ff&&ff.card;const cos=isCostume(c)?c:null;
  const r=await baseActivate.apply(this,arguments);
  if(cos&&G&&!G.over&&!isGuest()){const e=find(cos.uid);
    if(e&&e.zone==="st"&&cos.equippedTo){G._eqN=(G._eqN||0)+1;cos.eqT=G._eqN;const t=find(cos.equippedTo);applyCostumes();render();
      if(t){const m=t.card;const g=cos.fx.grant||{};const gl=Object.keys(g).map(k=>GRANT_NAME[k]||k);
        log(`${m.name} puts on the ${cos.name}: it is now ${/^[AEIOU]/.test(m.attr)?"an":"a"} ${m.attr} ${m.race}${gl.length?" with "+gl.join(", "):""}!`,sc(s));
        const el=elOf(m.uid);if(el){floatText(el,m.race.toUpperCase(),"info");anim(el,[{filter:"brightness(1) hue-rotate(0deg)"},{filter:"brightness(2.2) hue-rotate(180deg)"},{filter:"brightness(1) hue-rotate(360deg)"}],650);}
        await sleep(350);}
      if(cos.fx.onEquip&&!G.over){log(`${cos.name}'s effect activates!`,sc(s));await resolveFx(s,cos.fx.onEquip,cos);}}}
  return r;};
/* ---------- text ---------- */
const GRANT_NAME={pierce:"Piercing",direct:"Phantom Strike",guard:"Stalwart",double:"Double Sprint",battleBurn:"Battle Burn"};
const GRANT_TXT={pierce:"Piercing (deals damage to Defense Position monsters)",direct:"Phantom Strike (can attack directly)",guard:"Stalwart (survives its first battle destruction)",double:"Double Sprint (can attack twice)"};
const baseFxPhrase=fxPhrase;
fxPhrase=function(e){if(e&&!Array.isArray(e)){if(e.k==="searchEquip")return "add 1 Equip Spell from your Deck to your hand";if(e.k==="cakeBurn")return `inflict ${e.v} damage to your opponent (${e.hi} instead if you have ${e.need} or more LP)`;}return baseFxPhrase.apply(this,arguments);};
const baseCardText=cardText;
cardText=function(c){const f=(c&&c.fx)||{};
  if(c&&c.type==="spell"){
    if(isCostume(c)){const g=f.grant||{};const parts=[`it gains ${f.v} ATK`];
      if(f.setRace)parts.push(`its Type becomes ${f.setRace}${f.setAttr?" and its Attribute becomes "+f.setAttr:""}`);
      for(const k in g)parts.push(k==="battleBurn"?`it gains Battle Burn (after it destroys a monster by battle, inflict ${g[k]} damage)`:`it gains ${GRANT_TXT[k]||k}`);
      const t=[`<b>Costume:</b> equip only to a face-up monster you control; ${parts.join(", ")}.`];
      if(f.onEquip)t.push(`When equipped: ${fxPhrase(f.onEquip)}.`);return t;}
    if(f.k==="cont"&&f.contEquip)return [`Stays on the field. Each face-up monster you control that has an Equip Spell equipped gains ${f.atk} ATK.`];
    if(f.k==="searchEquip")return ["Add 1 Equip Spell (costume) from your Deck to your hand."];
    if(f.k==="cakeBurn")return [`Inflict ${f.v} damage to your opponent. If you have ${f.need} or more LP, inflict ${f.hi} damage instead.`];}
  const t=baseCardText.apply(this,arguments);
  if(c&&c.type==="monster"){
    if(f.onGain)t.push(f.onGain.k==="burn"?`<b>Fresh Batch:</b> each time you gain LP, inflict ${f.onGain.v} damage to your opponent.`:`<b>Rising Dough:</b> each time you gain LP, this card gains ${f.onGain.v} ATK.`);
    if(f.lpAtk)t.push(`<b>Hearth Power:</b> gains ${f.lpAtk.v} ATK for every ${f.lpAtk.per} LP you have above ${f.lpAtk.over!=null?f.lpAtk.over:LP_OVER} (max +${f.lpAtk.max}).`);
    if(f.equipPer)t.push(`<b>Costume Master:</b> gains ${f.equipPer} ATK for each Equip Spell equipped to it.`);
    if(f.battleBurn)t.push(`<b>Battle Burn:</b> after this card destroys a monster by battle, inflict ${f.battleBurn} damage.`);
    if(f.endBurn)t.push(`<b>Encore:</b> at the end of your turn, inflict ${f.endBurn} damage to your opponent.`);
    if(f.costumed)t.push(`<i>Wearing: ${f.costumed.join(", ")}.</i>`);}
  return t;};
/* ---------- AI ---------- */
const baseSFV=summonFxValue;
summonFxValue=function(s,c){let v=baseSFV.apply(this,arguments);const f=c.fx.onSummon;if(f)for(const e of [].concat(f))if(e.k==="searchEquip")v+=equipsIn(s).length?8:0;
  if(c.fx.lpAtk)v+=lpBonus(Object.assign({},c,{faceUp:true,owner:s}))/150;return v;};
function costumeScore(f,m,s){const o=other(s);let v=0;const g=f.grant||{};const om=Math.max(0,...mons(o).filter(x=>x.faceUp).map(atkOf));
  if(g.pierce)v+=mons(o).some(x=>x.pos==="def"||!x.faceUp)?6:2;if(g.direct)v+=mons(o).length&&om>=atkOf(m)?7:1;
  if(g.guard)v+=om>=atkOf(m)?5:2;if(g.double)v+=!mons(o).length||om<atkOf(m)+f.v?7:2;if(g.battleBurn)v+=mons(o).length?4:1;if(f.onEquip)v+=5;
  return v;}
const baseAI=aiPickAction;
aiPickAction=function(s,phaseNum){applyCostumes();const b=baseAI.apply(this,arguments);const acts=b?[b]:[];const sd=S(s),o=other(s),opp=S(o);
  for(const c of sd.hand){if(c.type!=="spell"||!spellCanActivate(s,c))continue;const f=c.fx;
    if(isCostume(c)){const cands=mons(s).filter(m=>m.faceUp&&m.pos==="atk"&&(phaseNum===1||m.fx.guard===undefined));
      const t=bestBy(mons(s).filter(m=>m.faceUp),m=>atkOf(m)+(m.pos==="atk"?400:0)-costumesOn(m).length*500+(m.fx.equipPer?900:0)+(m.summonedTurn===G.turn&&phaseNum===2?-300:0));
      if(t&&(phaseNum===1&&G.turn>1||t.pos==="atk"||f.onEquip))acts.push({sc:(phaseNum===1?30:22)+costumeScore(f,t,s),f:()=>activateSpell(s,c.uid,t.uid)});void cands;}
    else if(f.k==="searchEquip")acts.push({sc:50,f:()=>activateSpell(s,c.uid)});
    else if(f.k==="cakeBurn"){const d=sd.lp>=f.need?f.hi:f.v;
      if(opp.lp<=d)acts.push({sc:1000,f:()=>activateSpell(s,c.uid)});else if(d===f.hi)acts.push({sc:40,f:()=>activateSpell(s,c.uid)});else if(sd.hand.length>=6||G.turn>=16)acts.push({sc:18,f:()=>activateSpell(s,c.uid)});}
    else if(f.k==="cont"&&f.contEquip){const n=mons(s).filter(m=>m.faceUp&&costumesOn(m).length).length;acts.push({sc:n?36+n*2:sd.hand.some(x=>isCostume(x))&&mons(s).length?15:6,f:()=>activateSpell(s,c.uid)});}}
  /* Eunice: cash in healing Quick-Plays while an LP-gain payoff is on the field */
  if(mons(s).some(m=>m.faceUp&&m.fx.onGain||m.faceUp&&m.fx.lpAtk))for(const c of [...sd.hand,...sd.st.filter(x=>x&&!x.faceUp&&x.type==="spell")])
    if(isQuick(c)&&(c.fx.k==="qHeal"||c.fx.k==="qDraw"&&c.fx.heal)&&spellCanActivate(s,c)&&(sd.hand.includes(c)||c.setTurn<G.turn))acts.push({sc:31,f:()=>activateSpell(s,c.uid)});
  acts.sort((a,b)=>b.sc-a.sc);
  /* costume-equip scores below base "set" actions are dropped: avoid replacing base choice with junk */
  return acts[0]||null;};
/* JP + EN speech bubbles */
const st=document.createElement("style");st.textContent=".bubble{white-space:pre-line}.overbox .q{white-space:pre-line}";document.head.appendChild(st);
})();
/* ================= AUDIO (v6c engine, guitar-rock themes v9c/v9d) =================
   100% procedural: all music and sound effects are synthesised live with the Web Audio API
   (original compositions written in code for Arcane Duel Chronicles). No samples, no third-party audio files. */
const AUDIO=(()=>{
const KEY="adc_audio_v1";
const set={music:.55,sfx:.75,mute:false};
try{const s=JSON.parse(localStorage.getItem(KEY)||"{}");if(s&&typeof s==="object"){if(isFinite(s.music))set.music=Math.max(0,Math.min(1,+s.music));if(isFinite(s.sfx))set.sfx=Math.max(0,Math.min(1,+s.sfx));set.mute=!!s.mute;}}catch(e){}
const A={ok:!!(window.AudioContext||window.webkitAudioContext),ctx:null,unlocked:false,set,log:[],counts:{},cur:null,want:"menu",ducks:{},err:null};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(set));}catch(e){}};
/* ---------- tiny deterministic RNG ---------- */
const rng=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const mf=m=>440*Math.pow(2,(m-69)/12);
/* ---------- per-context caches ---------- */
const NB=new WeakMap(),PW=new WeakMap();
function noiseBuf(c){let b=NB.get(c);if(!b){b=c.createBuffer(1,c.sampleRate*1.5,c.sampleRate);const d=b.getChannelData(0);let r=rng(7);for(let i=0;i<d.length;i++)d[i]=r()*2-1;NB.set(c,b);}return b;}
function pulse(c){let w=PW.get(c);if(!w){const n=32,re=new Float32Array(n),im=new Float32Array(n);for(let k=1;k<n;k++)im[k]=2/(k*Math.PI)*Math.sin(k*Math.PI*.25);w=c.createPeriodicWave(re,im);PW.set(c,w);}return w;}
/* ---------- voices ---------- */
function env(g,t,v,a,d,s,dur,r){const p=g.gain;p.setValueAtTime(0.0001,t);p.linearRampToValueAtTime(v,t+a);p.setTargetAtTime(v*s,t+a,d/3+.001);p.setValueAtTime(v*s,t+Math.max(a,dur));p.setTargetAtTime(0.0001,t+Math.max(a,dur),r/3+.001);}
function tone(c,out,t,freq,dur,o){o=o||{};const g=c.createGain();let node=g;
  if(o.lp){const f=c.createBiquadFilter();f.type="lowpass";f.frequency.setValueAtTime(o.lp,t);if(o.lpEnd)f.frequency.exponentialRampToValueAtTime(o.lpEnd,t+(o.lpT||dur));f.Q.value=o.q||.7;g.connect(f);f.connect(out);}else g.connect(out);
  const oscs=[];const dets=o.det?[-o.det,o.det]:[0];
  for(const dt of dets){const os=c.createOscillator();if(o.type==="pulse")os.setPeriodicWave(pulse(c));else os.type=o.type||"square";
    os.frequency.setValueAtTime(freq,t);if(o.slide)os.frequency.exponentialRampToValueAtTime(Math.max(20,o.slide),t+(o.slideT||dur));os.detune.value=dt;
    if(o.vib){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=o.vibR||5.5;lg.gain.value=freq*o.vib;l.connect(lg);lg.connect(os.frequency);l.start(t+.08);l.stop(t+dur+(o.r||.08)+.1);}
    os.connect(g);os.start(t);os.stop(t+dur+(o.r||.08)*4+.05);oscs.push(os);}
  env(g,t,(o.v||.15)/dets.length,o.a||.005,o.d||.1,o.s==null?.6:o.s,dur,o.r||.08);return g;}
function noise(c,out,t,dur,o){o=o||{};const s=c.createBufferSource();s.buffer=noiseBuf(c);const f=c.createBiquadFilter();f.type=o.ft||"highpass";f.frequency.setValueAtTime(o.f||5000,t);
  if(o.fEnd)f.frequency.exponentialRampToValueAtTime(o.fEnd,t+dur);f.Q.value=o.q||.8;const g=c.createGain();s.connect(f);f.connect(g);g.connect(out);
  env(g,t,o.v||.15,o.a||.002,o.d||dur*.5,o.s==null?0.0001:o.s,dur,o.r||.03);s.start(t,Math.random()*.5);s.stop(t+dur+.3);}
const DR={
  k:(c,o,t,v)=>{tone(c,o,t,150,.12,{type:"sine",slide:42,slideT:.12,v:(v||1)*.9,a:.002,d:.18,s:.0001,r:.05});},
  s:(c,o,t,v)=>{noise(c,o,t,.14,{ft:"bandpass",f:1900,q:.7,v:(v||1)*.32,d:.12});tone(c,o,t,190,.06,{type:"triangle",v:(v||1)*.18,d:.06,s:.0001});},
  h:(c,o,t,v)=>{noise(c,o,t,.035,{ft:"highpass",f:7500,v:(v||1)*.09,d:.03});},
  o:(c,o,t,v)=>{noise(c,o,t,.18,{ft:"highpass",f:6500,v:(v||1)*.07,d:.16});},
  c:(c,o,t,v)=>{for(let i=0;i<3;i++)noise(c,o,t+i*.011,.08,{ft:"bandpass",f:1300,q:1.2,v:(v||1)*.2,d:.06});},
  t:(c,o,t,v)=>{tone(c,o,t,110,.2,{type:"sine",slide:70,v:(v||1)*.5,d:.2,s:.0001});},
  b:(c,o,t,v)=>{tone(c,o,t,90,.6,{type:"sine",slide:30,slideT:.6,v:(v||1)*.9,a:.003,d:.6,s:.0001});noise(c,o,t,.5,{ft:"lowpass",f:900,v:(v||1)*.25,d:.4});}};
const INST={
  sq:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"square",v:.055*v,lp:3200,a:.006,d:.12,s:.55,r:.06,vib:.004}),
  pulse:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"pulse",v:.075*v,lp:4200,a:.004,d:.08,s:.5,r:.05}),
  brass:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"sawtooth",det:6,v:.07*v,lp:700,lpEnd:2600,lpT:.08,a:.035,d:.25,s:.7,r:.12,vib:.003}),
  lead:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"sawtooth",det:9,v:.06*v,lp:2400,q:2,a:.01,d:.15,s:.65,r:.08,vib:.005}),
  flute:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"triangle",v:.12*v,a:.04,d:.2,s:.8,r:.15,vib:.006,vibR:5}),
  bell:(c,o,t,m,d,v)=>{tone(c,o,t,mf(m),Math.min(d,.5),{type:"sine",v:.11*v,a:.002,d:.6,s:.0001,r:.4});tone(c,o,t,mf(m)*2.76,.1,{type:"sine",v:.035*v,a:.001,d:.18,s:.0001,r:.1});},
  pluck:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),Math.min(d,.25),{type:"square",v:.05*v,lp:2600,lpEnd:400,lpT:.2,a:.002,d:.15,s:.0001,r:.08}),
  marimba:(c,o,t,m,d,v)=>{tone(c,o,t,mf(m),.2,{type:"sine",v:.16*v,a:.002,d:.3,s:.0001,r:.15});tone(c,o,t,mf(m)*4,.05,{type:"sine",v:.03*v,a:.001,d:.05,s:.0001,r:.04});},
  harp:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),.4,{type:"triangle",v:.09*v,a:.002,d:.5,s:.0001,r:.3}),
  tri:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"triangle",v:.2*v,a:.005,d:.1,s:.8,r:.05}),
  sawbass:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"sawtooth",v:.09*v,lp:900,lpEnd:300,lpT:Math.max(.08,d),q:3,a:.004,d:.12,s:.6,r:.05}),
  sub:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"sine",v:.28*v,a:.01,d:.2,s:.8,r:.1}),
  strings:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"sawtooth",det:12,v:.035*v,lp:1500,a:.35,d:.4,s:.85,r:.5,vib:.003}),
  choir:(c,o,t,m,d,v)=>tone(c,o,t,mf(m),d,{type:"triangle",det:14,v:.07*v,lp:1100,a:.5,d:.5,s:.9,r:.6,vib:.006,vibR:4.5})};
/* ================= v6c MUSIC ENGINE =================
   Richer procedural synthesis: detuned multi-oscillator saw strings with filter envelopes, FM electric piano / piano / bells,
   layered pads, distorted guitar (waveshaper + cab low-pass), real drum kit (pitch-envelope kick, noise+tone snare, filtered hats),
   per-track routing with convolver reverb (generated impulse), tempo-synced delay, stereo panning and bus compression.
   Songs are composed from chord-progression sections (A/B/bridge forms, 45-90 s loops) with motif-based melodies.
   All compositions are original. */
const pan=(c,p)=>{if(!p||!c.createStereoPanner)return null;const n=c.createStereoPanner();n.pan.value=Math.max(-1,Math.min(1,p));return n;};
function vout(R,node,p,rv,dl){node.connect(busP(R,p||0));if(rv)node.connect(busS(R,"rev",rv));if(dl&&R.din)node.connect(busS(R,"din",dl));}
/* shared per-route pan / send buses (quantised) keep the node count per note low */
function busP(R,p){const k=Math.round(p*10);let n=R.P[k];if(!n){n=pan(R.c,k/10)||R.c.createGain();n.connect(R.dry);R.P[k]=n;}return n;}
function busS(R,to,v){const k=to+Math.round(v*20);let n=R.P[k];if(!n){n=R.c.createGain();n.gain.value=Math.round(v*20)/20;n.connect(R[to]);R.P[k]=n;}return n;}
/* shared looping noise voices per route (hats, snare wires, cymbals, shakers): one source each, hits are gain automation only */
function nzBus(R,key,type,f,q,p,rv,f2){let n=R.N[key];if(!n){const c=R.c,src=c.createBufferSource();src.buffer=noiseBuf(c);src.loop=true;const fl=FL(c,f,q,type);const g=c.createGain();g.gain.value=0;src.connect(fl);
  let last=fl;if(f2){const f3=FL(c,f2,.8,"bandpass");const mix=c.createGain();fl.connect(mix);fl.connect(f3);f3.connect(mix);last=mix;}last.connect(g);vout(R,g,p,rv);src.start();R.srcs.push(src);n=R.N[key]={g};}return n;}
function hitG(param,t,v,tc){param.setValueAtTime(v,t);param.setTargetAtTime(0,t+.002,tc);}
function OS(c,type,f,t,end,det){const o=c.createOscillator();if(type==="pulse")o.setPeriodicWave(pulse(c));else o.type=type;o.frequency.setValueAtTime(f,t);if(det)o.detune.setValueAtTime(det,t);o.start(t);o.stop(end);return o;}
function VG(c,t,v,a,d,s,dur,r){const g=c.createGain();env(g,t,v,a,d,s,dur,r);return g;}
function FL(c,f,q,type){const b=c.createBiquadFilter();b.type=type||"lowpass";b.frequency.value=f;b.Q.value=q==null?.7:q;return b;}
function VIB(c,t,end,rate,cents,delay,targets){if(end-t<.45)return;const l=c.createOscillator();l.frequency.value=rate;const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(cents,t+delay);l.connect(g);for(const o of targets)g.connect(o.detune);l.start(t);l.stop(end);}
function NZ(c,t,end){const s=c.createBufferSource();s.buffer=noiseBuf(c);s.loop=true;s.start(t,Math.random()*.5);s.stop(end);return s;}
const CURV=new WeakMap();function distCurve(c){let k=CURV.get(c);if(!k){const n=2048;k=new Float32Array(n);for(let i=0;i<n;i++){const x=i/(n-1)*2-1;k[i]=Math.tanh(6*x)/Math.tanh(6);}CURV.set(c,k);}return k;}
const IRS=new WeakMap();function impulse(c,secs,decay){let m=IRS.get(c);if(!m){m={};IRS.set(c,m);}const key=secs+"_"+decay;if(m[key])return m[key];
  const sr=c.sampleRate,n=Math.floor(sr*secs),b=c.createBuffer(2,n,sr),r=rng(99);
  for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);let lp=0;for(let i=0;i<n;i++){const k=i/n;const x=(r()*2-1)*Math.pow(1-k,decay);lp+=(x-lp)*(.18+.7*(1-k));d[i]=lp*(i<sr*.012?i/(sr*.012):1);}
    for(const[ms,g]of[[13,.45],[21,.32],[31,.26],[47,.2],[63,.14]]){const j=Math.floor(sr*ms/1000*(ch?1.11:1));if(j<n)d[j]+=g*(ch?-1:1)*.6;}}
  m[key]=b;return b;}
/* per-track routing: dry bus, reverb send, tempo-synced delay, two distorted guitar chains (L/R) */
function mkRoute(c,dest,revIn,bpm,T){const g=c.createGain();g.connect(dest);const dry=c.createGain();
  if(T&&T.glue){const gc=c.createDynamicsCompressor();gc.threshold.value=-16;gc.ratio.value=3;gc.knee.value=6;gc.attack.value=.006;gc.release.value=.16;dry.connect(gc);gc.connect(g);}else dry.connect(g);const rev=c.createGain();rev.connect(revIn);
  const din=c.createGain(),dl=c.createDelay(2),fb=c.createGain(),dlf=FL(c,2600),dp=pan(c,.35);dl.delayTime.value=Math.min(1.9,60/bpm*.75);fb.gain.value=.3;
  din.connect(dl);dl.connect(dlf);dlf.connect(fb);fb.connect(dl);const dg=c.createGain();dg.gain.value=.55;dlf.connect(dg);if(dp){dg.connect(dp);dp.connect(dry);}else dg.connect(dry);
  const R={c,g,dry,rev,din,fbk:fb,P:{},N:{},srcs:[],T};
  R.gtr=[-.6,.6].map(p=>{const pre=c.createGain();pre.gain.value=2.2;const hp=FL(c,120,.7,"highpass");const sh=c.createWaveShaper();sh.curve=distCurve(c);sh.oversample="2x";
    const cab=FL(c,3300,1.1),cab2=FL(c,5200,.5),mid=FL(c,450,1,"peaking"),pk=FL(c,1700,1,"peaking");mid.gain.value=-5;pk.gain.value=4;const og=c.createGain();og.gain.value=.11;
    pre.connect(hp);hp.connect(sh);sh.connect(mid);mid.connect(pk);pk.connect(cab);cab.connect(cab2);cab2.connect(og);const pn=pan(c,p);if(pn){og.connect(pn);pn.connect(dry);}else og.connect(dry);
    const s=c.createGain();s.gain.value=.1;og.connect(s);s.connect(rev);return pre;});
  R.gtrIn=c.createGain();R.gtrIn.connect(R.gtr[0]);const hz=c.createDelay(.05);hz.delayTime.value=.013;R.gtrIn.connect(hz);hz.connect(R.gtr[1]);
  return R;}
const M={
 strings:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+1.4;const g=VG(c,t,.05*v,.32,.6,.85,d,.5);const lp=FL(c,600,.6);lp.frequency.setValueAtTime(600,t);lp.frequency.linearRampToValueAtTime(2300,t+.45);lp.frequency.setTargetAtTime(1500,t+.45,.6);
   const os=[-7,7].map(dt=>{const o=OS(c,"sawtooth",f,t,end,dt);o.connect(lp);return o;});VIB(c,t,end,5.1,6,.45,os);lp.connect(g);vout(R,g,p,.45);},
 lowstr:(c,R,t,m,d,v,p)=>{M.strings(c,R,t,m,d,v*1.5,p);const g=VG(c,t,.06*v,.2,.5,.8,d,.4);OS(c,"sine",mf(m),t,t+d+1.2).connect(g);vout(R,g,0,.1);},
 violin:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.9;const g=VG(c,t,.06*v,.07,.4,.85,d,.25);const lp=FL(c,3300,.8);const os=[-6,6].map(dt=>{const o=OS(c,"sawtooth",f,t,end,dt);o.connect(lp);return o;});VIB(c,t,end,5.6,14,.22,os);lp.connect(g);vout(R,g,p,.42,.08);},
 spicc:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+.5;const g=VG(c,t,.05*v,.008,.12,.25,Math.min(d,.12),.08);const lp=FL(c,2600,.8);[-8,8].forEach(dt=>OS(c,"sawtooth",f,t,end,dt).connect(lp));lp.connect(g);vout(R,g,p,.4);},
 choir:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+2;const src=c.createGain();src.gain.value=1;const os=[-10,10].map(dt=>{const o=OS(c,"sawtooth",f,t,end,dt);o.connect(src);return o;});VIB(c,t,end,4.6,10,.4,os);
   const b1=FL(c,720,3,"bandpass"),b2=FL(c,1150,4,"bandpass"),b3=FL(c,2600,5,"bandpass");const g=VG(c,t,.11*v,.5,.6,.9,d,.7);src.connect(b1);src.connect(b2);src.connect(b3);b1.connect(g);b2.connect(g);const g3=c.createGain();g3.gain.value=.4;b3.connect(g3);g3.connect(g);vout(R,g,p,.55);},
 ep:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+1.4;const car=OS(c,"sine",f,t,end),mod=OS(c,"sine",f,t,end);const mg=c.createGain();mg.gain.setValueAtTime(f*2,t);mg.gain.setTargetAtTime(f*.22,t,.22);mod.connect(mg);mg.connect(car.frequency);
   const tine=OS(c,"sine",f*7.02,t,t+.35);const tg=VG(c,t,.18,.001,.07,.0001,.04,.05);tine.connect(tg);const g=VG(c,t,.1*v,.004,1.2,.32,d,.35);car.connect(g);tg.connect(g);
   const tr=c.createGain();tr.gain.value=.85;const l=OS(c,"sine",4.5,t,end);const lg=c.createGain();lg.gain.value=.15;l.connect(lg);lg.connect(tr.gain);g.connect(tr);vout(R,tr,p,.28);},
 piano:(c,R,t,m,d,v,p)=>{const f=mf(m),dec=Math.max(.5,2.4-(m-48)*.035),end=t+Math.min(d+.7,dec*1.6)+.1;const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.15*v,t+.004);g.gain.setTargetAtTime(.0001,t+.004,dec/4);g.gain.setTargetAtTime(.0001,t+Math.max(d,.12),.16);
   const car=OS(c,"triangle",f,t,end),mod=OS(c,"sine",f*2,t,end);const mg=c.createGain();mg.gain.setValueAtTime(f*1.6,t);mg.gain.setTargetAtTime(f*.1,t,.09);mod.connect(mg);mg.connect(car.frequency);
   const h2=OS(c,"sine",f*2,t,end,4),hg=c.createGain();hg.gain.value=.28;h2.connect(hg);const lp=FL(c,Math.min(8000,f*7),.5);car.connect(lp);hg.connect(lp);lp.connect(g);
   const hn=VG(c,t,.05*v,.001,.015,.0001,.01,.01),hf=FL(c,2500,1,"bandpass");NZ(c,t,t+.08).connect(hf);hf.connect(hn);hn.connect(g);vout(R,g,p,.33);},
 glock:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+1.8;const car=OS(c,"sine",f,t,end),mod=OS(c,"sine",f*3.5,t,end);const mg=c.createGain();mg.gain.setValueAtTime(f*1.8,t);mg.gain.setTargetAtTime(0,t,.06);mod.connect(mg);mg.connect(car.frequency);
   const g=VG(c,t,.08*v,.002,.4,.0001,.04,1.1);car.connect(g);vout(R,g,p,.4,.12);},
 mbox:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+1.4;const g=VG(c,t,.09*v,.002,.3,.0001,.04,.8);OS(c,"sine",f,t,end).connect(g);const g2=VG(c,t,.025*v,.001,.06,.0001,.02,.1);OS(c,"sine",f*4.01,t,t+.3).connect(g2);g2.connect(g);vout(R,g,p,.45,.1);},
 vibes:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+2;const g=VG(c,t,.08*v,.003,.6,.0001,.05,1.2);OS(c,"sine",f,t,end).connect(g);const g2=VG(c,t,.02*v,.001,.05,.0001,.02,.1);OS(c,"sine",f*4,t,t+.3).connect(g2);g2.connect(g);
   const tr=c.createGain();tr.gain.value=.8;const l=OS(c,"sine",5.5,t,end),lg=c.createGain();lg.gain.value=.2;l.connect(lg);lg.connect(tr.gain);g.connect(tr);vout(R,tr,p,.4);},
 pluck:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+.7;const lp=FL(c,f*10,1.2);lp.frequency.setValueAtTime(Math.min(7000,f*10),t);lp.frequency.setTargetAtTime(f*1.5+250,t,.07);OS(c,"sawtooth",f,t,end).connect(lp);
   const g=VG(c,t,.07*v,.002,.25,.0001,Math.min(d,.25),.12);lp.connect(g);vout(R,g,p,.22,.2);},
 harp:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+2;const g=VG(c,t,.1*v,.003,.9,.0001,.04,1.1);const lp=FL(c,3800,.6);OS(c,"triangle",f,t,end).connect(lp);const g2=c.createGain();g2.gain.value=.3;OS(c,"sine",f*2,t,end).connect(g2);g2.connect(lp);lp.connect(g);vout(R,g,p,.45,.08);},
 marimba:(c,R,t,m,d,v,p)=>{const f=mf(m);const g=VG(c,t,.14*v,.002,.35,.0001,.04,.3);OS(c,"sine",f,t,t+.9).connect(g);const g2=VG(c,t,.04*v,.001,.04,.0001,.02,.03);OS(c,"sine",f*3.99,t,t+.15).connect(g2);g2.connect(g);vout(R,g,p,.3);},
 flute:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.8;const g=VG(c,t,.09*v,.07,.3,.8,d,.18);const lp=FL(c,3200,.5);const o1=OS(c,"sine",f,t,end),o2=OS(c,"triangle",f,t,end);const g2=c.createGain();g2.gain.value=.4;o1.connect(lp);o2.connect(g2);g2.connect(lp);VIB(c,t,end,5,12,.22,[o1,o2]);
   const bf=FL(c,f*2,2,"bandpass"),bg=VG(c,t,.06,.03,.15,.25,d,.1);NZ(c,t,end).connect(bf);bf.connect(bg);bg.connect(g);lp.connect(g);vout(R,g,p,.42,.15);},
 brass:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.8;const lp=FL(c,350,1.4);lp.frequency.setValueAtTime(350,t);lp.frequency.linearRampToValueAtTime(2800,t+.07);lp.frequency.setTargetAtTime(1500,t+.07,.25);
   const os=[-7,7].map(dt=>{const o=OS(c,"sawtooth",f*.985,t,end,dt);o.frequency.linearRampToValueAtTime(f,t+.06);o.connect(lp);return o;});VIB(c,t,end,5,8,.3,os);const g=VG(c,t,.065*v,.035,.3,.8,d,.18);lp.connect(g);vout(R,g,p,.35);},
 ssaw:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.6;const lp=FL(c,5200,.8);const os=[-14,0,14].map(dt=>{const o=OS(c,"sawtooth",f,t,end,dt);o.connect(lp);return o;});VIB(c,t,end,5.5,15,.2,os);const g=VG(c,t,.05*v,.008,.2,.75,d,.15);lp.connect(g);vout(R,g,p,.25,.22);},
 pulsel:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.5;const lp=FL(c,4200,.8);const o1=OS(c,"pulse",f,t,end),o2=OS(c,"sawtooth",f,t,end,10);const g2=c.createGain();g2.gain.value=.35;o1.connect(lp);o2.connect(g2);g2.connect(lp);VIB(c,t,end,5.5,12,.2,[o1,o2]);
   const g=VG(c,t,.07*v,.005,.15,.7,d,.1);lp.connect(g);vout(R,g,p,.2,.3);},
 gtrl:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.5;const g=VG(c,t,.2*v,.005,.3,.85,d,.1);const os=[-5,5].map(dt=>{const o=OS(c,"sawtooth",f*.94,t,end,dt);o.frequency.exponentialRampToValueAtTime(f,t+.05);o.connect(g);return o;});VIB(c,t,end,6,25,.25,os);
   const a=c.createGain();a.gain.value=.6;g.connect(a);a.connect(R.gtrIn);vout(R,g,0,0,.05);},
 power:(c,R,t,m,d,v,p)=>{const mute=d<.17,end=t+d+(mute?.15:.4);const lp=FL(c,mute?900:4200,.7);for(const iv of [0,7,12])OS(c,"sawtooth",mf(m+iv),t,end,iv?5:0).connect(lp);
   const g=VG(c,t,.2*v,.003,mute?.07:.5,mute?.25:.75,d,mute?.04:.12);lp.connect(g);g.connect(R.gtrIn);},
 stab:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+.6;const lp=FL(c,4000,1.5);lp.frequency.setValueAtTime(4500,t);lp.frequency.setTargetAtTime(1100,t,.1);[-12,12].forEach(dt=>OS(c,"sawtooth",f,t,end,dt).connect(lp));const g=VG(c,t,.045*v,.003,.18,.25,Math.min(d,.2),.1);lp.connect(g);vout(R,g,p,.3,.15);},
 padsaw:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.6;const lp=FL(c,2200,.6);[-12,0,12].forEach(dt=>OS(c,"sawtooth",f,t,end,dt).connect(lp));const g=VG(c,t,.035*v,.05,.2,.7,d,.12);lp.connect(g);vout(R,g,p,.35);},
 sbass:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.4;const lp=FL(c,1800,5);lp.frequency.setValueAtTime(1900,t);lp.frequency.setTargetAtTime(380,t,.07);OS(c,"sawtooth",f,t,end).connect(lp);const sq=c.createGain();sq.gain.value=.5;OS(c,"square",f,t,end).connect(sq);sq.connect(lp);
   const g=VG(c,t,.11*v,.003,.25,.6,d,.06);lp.connect(g);const sg=VG(c,t,.1*v,.003,.3,.8,d,.06);OS(c,"sine",f,t,end).connect(sg);sg.connect(g);vout(R,g,0,.04);},
 pbass:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.4;const lp=FL(c,1200,1);lp.frequency.setValueAtTime(1400,t);lp.frequency.setTargetAtTime(600,t,.1);OS(c,"sawtooth",f,t,end).connect(lp);OS(c,"triangle",f,t,end).connect(lp);
   const g=VG(c,t,.12*v,.002,.5,.45,d,.07);lp.connect(g);const sg=VG(c,t,.08*v,.002,.5,.7,d,.07);OS(c,"sine",f,t,end).connect(sg);sg.connect(g);vout(R,g,0,.04);},
 lbass:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.8;const lp=FL(c,520,1.2);OS(c,"sawtooth",f,t,end).connect(lp);const g=VG(c,t,.14*v,.01,.6,.7,d,.2);lp.connect(g);const sg=VG(c,t,.16*v,.01,.6,.8,d,.2);OS(c,"sine",f,t,end).connect(sg);sg.connect(g);vout(R,g,0,.06);},
 upright:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.5;const lp=FL(c,900,.8);OS(c,"triangle",f,t,end).connect(lp);const g=VG(c,t,.16*v,.006,.35,.3,d,.1);lp.connect(g);const sg=VG(c,t,.14*v,.006,.4,.4,d,.1);OS(c,"sine",f,t,end).connect(sg);sg.connect(g);vout(R,g,0,.1);},
 timp:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+2;const o=OS(c,"sine",f*1.08,t,end);o.frequency.exponentialRampToValueAtTime(f,t+.08);const g=VG(c,t,.3*v,.003,1,.0001,.05,.9);o.connect(g);const nf=FL(c,500),ng=VG(c,t,.12*v,.002,.08,.0001,.03,.05);NZ(c,t,t+.3).connect(nf);nf.connect(ng);ng.connect(g);vout(R,g,p,.4);},
 mtrump:(c,R,t,m,d,v,p)=>{const f=mf(m),end=t+d+.6;const bp=FL(c,1300,1.3,"bandpass"),lp=FL(c,2600,.7);const o=OS(c,"sawtooth",f,t,end);o.connect(bp);bp.connect(lp);VIB(c,t,end,5,10,.2,[o]);const g=VG(c,t,.2*v,.05,.3,.8,d,.12);lp.connect(g);vout(R,g,p,.35,.12);}};
const D2={
 k:(c,R,t,v)=>{const o=OS(c,"sine",160,t,t+.6);o.frequency.exponentialRampToValueAtTime(48,t+.09);const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.9*v,t+.002);g.gain.setTargetAtTime(.0001,t+.01,.13);o.connect(g);
   const cg=VG(c,t,.18*v,.001,.012,.0001,.005,.01);OS(c,"triangle",1500,t,t+.04).connect(cg);cg.connect(g);g.connect(R.dry);},
 s:(c,R,t,v)=>{hitG(nzBus(R,"s","highpass",1100,.6,.05,.3).g.gain,t,.3*v,.055);const o=OS(c,"triangle",210,t,t+.2);o.frequency.exponentialRampToValueAtTime(165,t+.06);const bg=VG(c,t,.25*v,.001,.08,.0001,.02,.05);o.connect(bg);vout(R,bg,.05,.3);},
 h:(c,R,t,v)=>{hitG(nzBus(R,"h","highpass",7200,.7,.28,.05).g.gain,t,.1*v,.014);},
 o:(c,R,t,v)=>{hitG(nzBus(R,"o","highpass",6800,.7,.28,.08).g.gain,t,.08*v,.1);},
 x:(c,R,t,v)=>{hitG(nzBus(R,"x","highpass",4200,.6,-.3,.35,7000).g.gain,t,.13*v,.55);},
 rd:(c,R,t,v)=>{hitG(nzBus(R,"rd","bandpass",8200,1,-.22,.12).g.gain,t,.08*v,.12);},
 cl:(c,R,t,v)=>{const bp=FL(c,1150,1.4,"bandpass"),g=c.createGain();g.gain.setValueAtTime(.0001,t);[0,.011,.022].forEach(o=>{g.gain.setValueAtTime(.3*v,t+o);g.gain.setTargetAtTime(.04*v,t+o+.001,.004);});g.gain.setTargetAtTime(.0001,t+.03,.06);NZ(c,t,t+.4).connect(bp);bp.connect(g);vout(R,g,0,.35);},
 tt:(c,R,t,v)=>{const o=OS(c,"sine",230,t,t+.5);o.frequency.exponentialRampToValueAtTime(140,t+.2);const g=VG(c,t,.42*v,.002,.25,.0001,.03,.2);o.connect(g);vout(R,g,.25,.25);},
 tl:(c,R,t,v)=>{const o=OS(c,"sine",135,t,t+.6);o.frequency.exponentialRampToValueAtTime(82,t+.25);const g=VG(c,t,.5*v,.002,.3,.0001,.03,.25);o.connect(g);vout(R,g,-.25,.25);},
 sh:(c,R,t,v)=>{const g=nzBus(R,"sh","bandpass",6500,2,.35,.05).g.gain;g.setValueAtTime(0,t);g.linearRampToValueAtTime(.09*v,t+.012);g.setTargetAtTime(0,t+.014,.02);},
 r:(c,R,t,v)=>{const g=VG(c,t,.12*v,.001,.03,.0001,.01,.02);OS(c,"triangle",1750,t,t+.08).connect(g);const bp=FL(c,2200,1.5,"bandpass");NZ(c,t,t+.08).connect(bp);bp.connect(g);vout(R,g,.12,.2);},
 br:(c,R,t,v)=>{const g=nzBus(R,"br","bandpass",3000,.7,.08,.2).g.gain;g.setValueAtTime(0,t);g.linearRampToValueAtTime(.13*v,t+.012);g.setTargetAtTime(0,t+.014,.05);},
 sw:(c,R,t,v,len)=>{len=len||1;const bp=FL(c,400,1.2,"bandpass");bp.frequency.setValueAtTime(400,t);bp.frequency.exponentialRampToValueAtTime(7000,t+len);const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16*v,t+len);g.gain.setValueAtTime(.0001,t+len+.01);
   NZ(c,t,t+len+.05).connect(bp);bp.connect(g);vout(R,g,0,.4);},
 b:(c,R,t,v)=>{const o=OS(c,"sine",85,t,t+1.4);o.frequency.exponentialRampToValueAtTime(30,t+.7);const g=VG(c,t,.8*v,.003,.8,.0001,.05,.6);o.connect(g);const lp=FL(c,700),ng=VG(c,t,.25*v,.002,.3,.0001,.05,.3);NZ(c,t,t+.8).connect(lp);lp.connect(ng);ng.connect(g);vout(R,g,0,.3);}};
/* ---------- harmony helpers ---------- */
const DEG={1:0,2:2,3:4,4:5,5:7,6:9,7:11};
const QUAL={M:[0,4,7],m:[0,3,7],"7":[0,4,7,10],M7:[0,4,7,11],m7:[0,3,7,10],"5":[0,7],sus:[0,5,7],sus2:[0,2,7],dim:[0,3,6],add9:[0,4,7,14],madd9:[0,3,7,14]};
function parseChord(tok){const x=/^(b|#)?([1-7])(.*)$/.exec(tok);const r=(DEG[x[2]]+(x[1]==="b"?-1:x[1]==="#"?1:0)+12)%12;return {r,iv:QUAL[x[3]||"M"]||QUAL.M};}
const hashS=s=>{let h=7;for(const ch of s)h=(h*31+ch.charCodeAt(0))|0;return h;};
const pcOf=m=>((m%12)+12)%12;
function voicing(T,ch,lo,hi){const o=[];for(const iv of ch.iv){let m=T.key+ch.r+iv;while(m<lo)m+=12;while(m>hi)m-=12;if(m<lo)m+=12;if(!o.includes(m))o.push(m);}return o.sort((a,b)=>a-b);}
function bassRoot(T,ch){let m=T.key-24+ch.r;while(m>T.key-17)m-=12;while(m<T.key-29)m+=12;return m;}
function powerRoot(T,ch){let m=T.key-12+ch.r;while(m>T.key-6)m-=12;while(m<T.key-17)m+=12;return m;}
const MAJ=[0,2,4,5,7,9,11],MIN=[0,2,3,5,7,8,10],HMIN=[0,2,3,5,7,8,11],DOR=[0,2,3,5,7,9,10],PHD=[0,1,4,5,7,8,10];
/* motif-based melody for one section (same section name => same melody, so themes come back) */
function genMel(T,S,key){const r=rng(T.seed*131+hashS(key)),bars=S.ch.length,dens=S.md!=null?S.md:(T.md||.5);
  const cells=["x...","x.x.","x..x","xxx.","x.xx","..x.","xxxx","x.x."],w=[1.25-dens,1+dens*.5,.7,.55*dens,.6*dens,.35,.3*dens*dens,1];
  const pick=()=>{let s=0;for(const q of w)s+=q;let x=r()*s;for(let i=0;i<cells.length;i++){x-=w[i];if(x<=0)return cells[i];}return cells[0];};
  const mot=[];for(let b=0;b<8;b++)mot.push(b===7?(r()<.5?"....":"x..."):pick());if(mot[0][0]!=="x")mot[0]="x"+mot[0].slice(1);
  const vari=mot.slice();vari[5]=pick();vari[6]=pick();vari[7]="....";const cad=mot.slice(0,4).concat(["x...","....","....","...."]);
  const shape=[0];for(let i=1;i<8;i++)shape.push(Math.max(-5,Math.min(10,shape[i-1]+[-4,-3,-2,2,3,4,5][Math.floor(r()*7)])));const wig=[];for(let i=0;i<8;i++)wig.push(r()<.5?1:-1);
  const pool=[];for(let o=-2;o<4;o++)for(const s of T.sc)pool.push(T.key+s+12*o);
  const groups=Math.ceil(bars/2),ev=[];let prev=T.key+12+(S.reg||0);
  for(let gi=0;gi<groups;gi++){const last=gi===groups-1,rh=last?cad:(gi%2===1?vari:mot),lift=(S.rise?gi*2:0)+(gi%2===1?2:0),base=T.key+12+(S.reg||0)+lift;
    const on=[];for(let b=0;b<8;b++)for(let k=0;k<4;k++)if(rh[b][k]==="x")on.push(b*4+k);
    for(let i=0;i<on.length;i++){const st=gi*32+on[i],bar=Math.floor(st/16);if(bar>=bars)break;const ch=S.ch[bar],pcs=ch.iv.map(iv=>pcOf(T.key+ch.r+iv));
      const fin=last&&i===on.length-1,nx=i+1<on.length?on[i+1]:32,len=Math.min(nx-on[i],fin?16:6),strong=on[i]%8===0||fin,tgt=base+shape[Math.floor(on[i]/4)]+[0,2,-1,1][on[i]%4]*wig[Math.floor(on[i]/4)]*1.5;
      const all=pool.concat(pool.map(x=>x).filter(()=>false));let cand;
      if(fin)cand=pool.filter(m=>pcOf(m)===pcOf(T.key+ch.r)||pcOf(m)===pcs[1]);
      else if(strong)cand=[];else cand=pool.filter(m=>{const pc=pcOf(m);return pcs.includes(pc)||!(pcs.includes((pc+1)%12)||pcs.includes((pc+11)%12));});
      if(!cand.length){cand=[];for(let o=-1;o<4;o++)for(const pc of pcs)cand.push(pc+12*o+Math.floor(T.key/12)*12-12);}
      let best=cand[0],bd=1e9;for(const m of cand){const jump=Math.abs(m-prev);const dd=Math.abs(m-tgt)+jump*.3+(m===prev?2.2:0)+(jump>7?2:0);if(dd<bd){bd=dd;best=m;}}
      prev=best;ev.push({s:st,m:best,l:len,v:strong?1:.82});}}
  return ev;}
/* ================= v9c/v9d GUITAR-ROCK ENGINE (shared by all nine themes) =================
   Original compositions, 100% WebAudio synthesis, no samples.
   Guitar rigs are PERSISTENT per route: oscillators run continuously and each pick/chug/lead note is only gain/frequency
   automation, so the guitars create ~0 new nodes per note. Distortion curves are cached per context. Each track can
   voice the rigs differently through T.rgc (rhythm), T.lgc (lead rigs by key) and T.cgc (clean/crunch arpeggio guitar). */
const GCV=new WeakMap();
function gtrCurve(c,drive,asym){let m=GCV.get(c);if(!m){m={};GCV.set(c,m);}const key=drive+"_"+asym;if(m[key])return m[key];
  const n=4096,k=new Float32Array(n),o=Math.tanh(drive*asym),nrm=Math.max(Math.abs(Math.tanh(drive*(1+asym))-o),Math.abs(Math.tanh(drive*(-1+asym))-o));
  for(let i=0;i<n;i++){const x=i/(n-1)*2-1;k[i]=(Math.tanh(drive*(x+asym))-o)/nrm;}return m[key]=k;}
/* amp + cabinet: input -> drive -> WaveShaper overdrive -> DC block -> low/mid/presence EQ -> 2 cab low-passes -> level */
function ampCab(c,inp,drive,curve,eq,lvl,os){const pre=c.createGain();pre.gain.value=drive;const sh=c.createWaveShaper();sh.curve=curve;sh.oversample=os||"2x";
  const dc=FL(c,75,.7,"highpass");inp.connect(pre);pre.connect(sh);sh.connect(dc);let last=dc;
  for(const[f,q,g]of eq){const p=FL(c,f,q,"peaking");p.gain.value=g;last.connect(p);last=p;}
  const cab1=FL(c,eq.cab||4800,.9),cab2=FL(c,(eq.cab||4800)*1.45,.55);last.connect(cab1);cab1.connect(cab2);const out=c.createGain();out.gain.value=lvl;cab2.connect(out);return out;}
/* rhythm guitar rig (one per side = double-tracked L/R): 3 detuned saws (root, 5th, octave) -> pick gate -> palm-mute low-pass -> amp/cab */
const PR=[1,Math.pow(2,7/12),2];
const RG_DEF={det:[[-6,4,-3],[5,-4,7]],og:[1,.8,.55],hp:95,drive:7,curve:[4.5,.12],eq:[[115,.9,2.5],[480,.9,-4.5],[2500,1.1,3.5]],cab:4600,lvl:.21,pan:.78,rev:.08};
const LG_DEF={drive:16,curve:[5,.18],eq:[[220,.8,-3],[900,1,4],[3100,1.2,2.5]],cab:5200,lvl:.19,hp:160,tone:3200,rev:.3,dl:.22,vib:5.7,pw:.55,vd:16,vw:34};
function rgRig(R,side){const key="rg"+side;if(R.N[key])return R.N[key];const c=R.c,t=c.currentTime,C=Object.assign({},RG_DEF,(R.T&&R.T.rgc)||{});
  const det=C.det[side?1:0],sum=c.createGain(),og=[];
  PR.forEach((r,i)=>{const o=c.createOscillator();o.type="sawtooth";o.frequency.value=82.4*r;o.detune.value=det[i];const g=c.createGain();g.gain.value=C.og[i];o.connect(g);g.connect(sum);o.start(t);R.srcs.push(o);og.push({o,g,r});});
  const hp=FL(c,C.hp,.7,"highpass"),gate=c.createGain();gate.gain.value=0;const pm=FL(c,3000,.9);sum.connect(hp);hp.connect(gate);gate.connect(pm);
  const out=ampCab(c,pm,C.drive,gtrCurve(c,C.curve[0],C.curve[1]),Object.assign(C.eq.slice(),{cab:C.cab}),C.lvl,"2x");
  const pn=pan(c,side?C.pan:-C.pan);if(pn){out.connect(pn);pn.connect(R.dry);}else out.connect(R.dry);out.connect(busS(R,"rev",C.rev));
  return R.N[key]={og,gate,pm,single:false,C};}
function rgHit(R,side,t,m,dur,v,mute,single){const g=rgRig(R,side),f=mf(m),C=g.C;
  for(const x of g.og)x.o.frequency.setValueAtTime(f*x.r,t);
  if(single!==g.single){g.og[1].g.gain.setValueAtTime(single?0:C.og[1],t);g.og[2].g.gain.setValueAtTime(single?.25:C.og[2],t);g.single=single;}
  const p=g.gate.gain;p.setTargetAtTime(0,t-.012,.0025);p.setValueAtTime(.0001,t);p.linearRampToValueAtTime(v,t+.003);
  if(mute){p.setTargetAtTime(.0001,t+.003,.045);g.pm.frequency.setValueAtTime(420+v*260,t);g.pm.frequency.setTargetAtTime(260,t,.05);}
  else{p.setTargetAtTime(v*.72,t+.003,.35);p.setTargetAtTime(.0001,t+dur,.035);g.pm.frequency.setValueAtTime(5200,t);g.pm.frequency.setTargetAtTime(2400,t,.3);}}
/* lead guitar rig: mono legato voice (saw + 25% pulse) -> amp/cab, vibrato LFO on detune, pitch automation for bends/slides */
function lgRig(R,key,p){if(R.N[key])return R.N[key];const c=R.c,t=c.currentTime,L=R.T&&R.T.lgc,C=Object.assign({},LG_DEF,(L&&(L[key]||L.all))||{});const sum=c.createGain();
  const o1=c.createOscillator();o1.type="sawtooth";const o2=c.createOscillator();o2.setPeriodicWave(pulse(c));o2.detune.value=6;const g2=c.createGain();g2.gain.value=C.pw;
  o1.connect(sum);o2.connect(g2);g2.connect(sum);const lfo=c.createOscillator();lfo.frequency.value=C.vib;const vg=c.createGain();vg.gain.value=0;lfo.connect(vg);vg.connect(o1.detune);vg.connect(o2.detune);
  [o1,o2,lfo].forEach(o=>{o.start(t);R.srcs.push(o);});
  const hp=FL(c,C.hp,.7,"highpass"),gate=c.createGain();gate.gain.value=0;const tone=FL(c,C.tone,.7);sum.connect(hp);hp.connect(gate);gate.connect(tone);
  const out=ampCab(c,tone,C.drive,gtrCurve(c,C.curve[0],C.curve[1]),Object.assign(C.eq.slice(),{cab:C.cab}),C.lvl,"4x");
  const pn=pan(c,p);if(pn){out.connect(pn);pn.connect(R.dry);}else out.connect(R.dry);out.connect(busS(R,"rev",C.rev));if(R.din)out.connect(busS(R,"din",C.dl));
  return R.N[key]={o:[o1,o2],gate,vg,last:0,C};}
function lgNote(R,t,m,dur,v,e){const L=lgRig(R,e.rig||"lg",e.pn||0),f=mf(m),c=R.c;
  for(const o of L.o){const fr=o.frequency;
    if(e.sl&&L.last){fr.setValueAtTime(L.last,t);fr.exponentialRampToValueAtTime(f,t+Math.min(.07,dur*.4));}
    else if(e.bd){const f0=f*Math.pow(2,-e.bd/12);fr.setValueAtTime(f0,t);fr.setValueAtTime(f0,t+.035);fr.exponentialRampToValueAtTime(f,t+Math.min(.2,dur*.45));}
    else if(e.rl){const f0=f*Math.pow(2,e.rl/12);fr.setValueAtTime(f0,t);fr.setValueAtTime(f0,t+Math.min(.12,dur*.3));fr.exponentialRampToValueAtTime(f,t+Math.min(.3,dur*.6));}
    else fr.setValueAtTime(f,t);}
  L.last=f;const p=L.gate.gain;
  if(!e.sl){p.setTargetAtTime(0,t-.01,.002);p.setValueAtTime(.0001,t);p.linearRampToValueAtTime(v,t+.004);}
  else p.setTargetAtTime(v,t,.02);
  p.setTargetAtTime(v*.8,t+.01,.25);if(!e.tie)p.setTargetAtTime(.0001,t+dur,.05);
  const vd=e.vb!=null?(e.vb?L.C.vw:0):(dur>.45?L.C.vd:0),vgp=L.vg.gain;vgp.setTargetAtTime(0,t,.02);
  if(vd)vgp.setTargetAtTime(vd,t+Math.min(.28,dur*.35),.1);}
M.rg=(c,R,t,m,d,v,p,e)=>{rgHit(R,0,t,m,d,v,e.pm,e.sg);rgHit(R,1,t+.009+((e.s0||0)%3)*.003,m,d,v*(.94+((e.s0||0)%5)*.015),e.pm,e.sg);};
M.lg=(c,R,t,m,d,v,p,e)=>lgNote(R,t,m,d/.95*(e.tie?1.02:.9),v,e);
/* clean / lightly overdriven arpeggio guitar: per note 5 nodes (saw + octave triangle -> pluck low-pass -> envelope),
   all notes share ONE amp/cab + chorus bus per route (one LFO). */
const CG_DEF={drive:1.6,cd:1.6,eq:[[250,.8,-2],[1500,1,1.5],[4000,1,3]],cab:6200,lvl:.42,rev:.35,dl:.18,v:.16};
function cgBus(R){let b=R.N.cgb;if(b)return b;const c=R.c,t=c.currentTime,C=Object.assign({},CG_DEF,(R.T&&R.T.cgc)||{});const inp=c.createGain();
  const out=ampCab(c,inp,C.drive,gtrCurve(c,C.cd,.05),Object.assign(C.eq.slice(),{cab:C.cab}),C.lvl,"2x");
  const dl=c.createDelay(.05);dl.delayTime.value=.011;const lfo=c.createOscillator();lfo.frequency.value=.85;const lg=c.createGain();lg.gain.value=.0022;lfo.connect(lg);lg.connect(dl.delayTime);lfo.start(t);R.srcs.push(lfo);
  out.connect(busP(R,-.35));out.connect(dl);dl.connect(busP(R,.35));out.connect(busS(R,"rev",C.rev));if(R.din)out.connect(busS(R,"din",C.dl));
  return R.N.cgb={inp,C};}
M.cg=(c,R,t,m,d,v)=>{const B=cgBus(R),f=mf(m),end=t+d+.5;const lp=FL(c,Math.min(7000,f*9),.8);lp.frequency.setValueAtTime(Math.min(7000,f*9),t);lp.frequency.setTargetAtTime(f*2.2+300,t,.18);
  OS(c,"sawtooth",f,t,end).connect(lp);const o2=OS(c,"triangle",f*2,t,end,3);const g2=c.createGain();g2.gain.value=.3;o2.connect(g2);g2.connect(lp);
  const g=VG(c,t,B.C.v*v,.002,.9,.3,d,.25);lp.connect(g);g.connect(B.inp);};
/* one-shot distorted guitar for jingles/stingers (the SFX route is persistent, so no running rigs there) */
function gOne(c,R,t,ms,dur,v,o){o=o||{};const sum=c.createGain(),end=t+dur+.6;
  for(const m of ms){const f=mf(m);[0,7].forEach(dt=>{const os=OS(c,"sawtooth",f,t,end,dt);if(o.bend){os.frequency.setValueAtTime(f*Math.pow(2,-o.bend/12),t);os.frequency.exponentialRampToValueAtTime(f,t+.16);}if(o.vib)VIB(c,t,end,5.6,o.vib,.25,[os]);os.connect(sum);});}
  const g=VG(c,t,v,.004,.6,.7,dur,.12);sum.connect(g);const hp=FL(c,110,.7,"highpass");g.connect(hp);
  const out=ampCab(c,hp,o.drive||8,gtrCurve(c,5,.15),Object.assign([[120,.9,2],[500,.9,-4],[2600,1.1,3]],{cab:o.cab||4800}),(o.lvl||.14)/Math.sqrt(ms.length),"2x");
  vout(R,out,o.p||0,o.rv==null?.25:o.rv);}
/* picked rock bass: saw + sine sub, envelope low-pass (4 nodes per note) */
M.rbass=(c,R,t,m,d,v)=>{const f=mf(m),end=t+d+.3;const lp=FL(c,1300,2.2);lp.frequency.setValueAtTime(1500,t);lp.frequency.setTargetAtTime(420,t,.06);
  const o=OS(c,"sawtooth",f,t,end),s=OS(c,"sine",f,t,end);o.connect(lp);const g=VG(c,t,.14*v,.003,.25,.55,d,.05);lp.connect(g);s.connect(g);g.connect(R.dry);};
D2.tm=(c,R,t,v)=>{const o=OS(c,"sine",180,t,t+.5);o.frequency.exponentialRampToValueAtTime(108,t+.22);const g=VG(c,t,.46*v,.002,.28,.0001,.03,.22);o.connect(g);vout(R,g,0,.25);};
D2.K=(c,R,t,v)=>{D2.k(c,R,t,v*1.05);};
/* light kick for fast double-kick runs: 2 nodes */
D2.kq=(c,R,t,v)=>{const o=OS(c,"sine",125,t,t+.25);o.frequency.exponentialRampToValueAtTime(46,t+.07);const g=c.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.62*v,t+.002);g.gain.setTargetAtTime(.0001,t+.008,.07);o.connect(g);g.connect(R.dry);};

/* ---- score builder ---- */
const NN={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const nm=s=>{const x=/^([A-G])(#|b)?(-?\d)$/.exec(s);return 12*(+x[3]+1)+NN[x[1]]+(x[2]==="#"?1:x[2]==="b"?-1:0);};
/* chords: power-chord root (low register) + triad quality */
const CH={E:[40,"M"],B:[47,"M"],"C#m":[49,"m"],A:[45,"M"],G:[43,"M"],D:[50,"M"],C:[48,"M"],"F#m":[42,"m"],Esus:[40,"sus"]};
function makeMenuEpic(T){const by=[];const add=(s,e)=>{(by[s]=by[s]||[]).push(e);};let bar=0;T.secs=[];
  const chordAt=(cs,k)=>CH[cs[Math.min(cs.length-1,Math.floor(k*cs.length/16))]];
  const triad=(ch,lo)=>{const iv=ch[1]==="m"?[0,3,7]:ch[1]==="sus"?[0,5,7]:[0,4,7];return iv.map(i=>{let m=ch[0]+i;while(m<lo)m+=12;while(m>=lo+12)m-=12;return m;}).sort((a,b)=>a-b);};
  /* lead tokens "E5:0:6" + flags: ^n bend up from n semitones below, >n release-bend from n above, / slide from previous note, ~ wide vibrato, h = harmony rig */
  const lead=(b0,bars,v,rig,pn)=>{const evs=[];bars.forEach((line,bi)=>{if(!line)return;for(const tok of line.trim().split(/\s+/)){const x=/^([A-G][#b]?-?\d):(\d+):(\d+)(.*)$/.exec(tok);const fl=x[4];
      const e={i:"lg",m:nm(x[1]),l:+x[3],v:v,rig,pn,s:(b0+bi)*16+(+x[2])};const bd=/\^(\d)/.exec(fl),rl=/>(\d)/.exec(fl);if(bd)e.bd=+bd[1];if(rl)e.rl=+rl[1];if(fl.includes("/"))e.sl=1;if(fl.includes("~"))e.vb=34;evs.push(e);}});
    evs.forEach((e,i)=>{const n=evs[i+1];if(n&&n.sl&&n.s===e.s+e.l)e.tie=1;add(e.s,e);});};
  const mel=(b0,bars,inst,v,oct)=>bars.forEach((line,bi)=>{if(!line)return;for(const tok of line.trim().split(/\s+/)){const x=/^([A-G][#b]?-?\d):(\d+):(\d+)$/.exec(tok);add((b0+bi)*16+(+x[2]),{i:inst,m:nm(x[1])+(oct||0),l:+x[3],v,p:0});}});
  /* rhythm guitar pattern: O/o open power chord (accent/normal), m palm-muted chug, n single muted note, - sustain */
  const rhythm=(b,cs,pat,v)=>{for(let k=0;k<16;k++){const ch=pat[k];if(ch==="."||ch==="-")continue;let len=1;while(k+len<16&&pat[k+len]==="-")len++;const C=chordAt(cs,k);
      add(b*16+k,{i:"rg",m:C[0],l:len,v:v*(ch==="O"?1:ch==="o"?.86:ch==="M"?.9:.72),pm:ch==="m"||ch==="M"||ch==="n",sg:ch==="n",s0:b*16+k});}};
  const riffTok=(b,str,v)=>{for(const tok of str.trim().split(/\s+/)){const[cn,s,l,ty]=tok.split(":");add(b*16+(+s),{i:"rg",m:CH[cn][0],l:+l,v:v*(ty==="m"?.74:1),pm:ty==="m",sg:false,s0:b*16+(+s)});}};
  const bass=(b,cs,pat,v)=>{for(let k=0;k<16;k++){const ch=pat[k];if(ch==="."||ch==="-")continue;let len=1;while(k+len<16&&pat[k+len]==="-")len++;const C=chordAt(cs,k);let r=C[0]-12;if(r>38)r-=12;
      add(b*16+k,{i:"rbass",m:r+(ch==="o"?12:ch==="f"?7:0),l:len,v:v*(k%4===0?1:.85)});}};
  const pad=(b,cs,inst,v,lo,len)=>{const n=cs.length;cs.forEach((cn,i)=>{const ch=CH[cn];for(const m of triad(ch,lo))add(b*16+i*16/n,{i:inst,m,l:len||16/n,v,p:(m%3-1)*.35});});};
  const drums=(b,P,v,cut)=>{for(const d in P){const pat=P[d];for(let k=0;k<16;k++){const ch=pat[k];if(ch==="."||!ch)continue;if(cut&&k>=8&&d!=="k")continue;
      const hv=(d==="h"||d==="o"||d==="rd")?(k%4===0?1:k%2===0?.8:.55):1;add(b*16+k,{d,v:v*hv*(ch==="X"?1.25:ch==="g"?.45:1)});}}};
  const fill=(b,kind,v)=>{const f=kind==="tom"?["tt","tt","tm","tm","tl","tl","tl","tl"]:["s","s","s","s","s","s","s","s"];for(let k=8;k<16;k++)add(b*16+k,{d:f[k-8],v:v*(.6+.06*(k-8))});add(b*16+8,{d:"k",v});add(b*16+12,{d:"k",v});};
  const sec=(n,bars,e)=>{T.secs.push({n,bar,bars,e});const b0=bar;bar+=bars;return b0;};
  const ROCK={k:"x.....x.x.....x.",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."},DRIVE={k:"x.x...x.x.x...x.",s:"....x.......x...",o:"..x...x...x...x.",h:"x...x...x...x..."},
        GALLOP={k:"x.x.x.x.x.x.x.x.",s:"....x.......x...",rd:"x.x.x.x.x.x.x.x."};
  /* ---- INTRO (played once): sustained power chords + lead bends, choir/strings swell, tom fills, snare roll + riser ---- */
  let b=sec("Intro",4,2);
  [["C"],["D"]].forEach((cs,i)=>{riffTok(b+i,cs[0]+":0:14:o "+cs[0]+":14:1:m "+cs[0]+":15:1:m",1);bass(b+i,cs,"x-------------xx",1);pad(b+i,cs,"strings",.9,55);pad(b+i,cs,"choir",.8,60);add((b+i)*16,{d:"x",v:1.1});add((b+i)*16,{d:"k",v:1});
    for(const k of [8,11,12,14])add((b+i)*16+k,{d:k<12?"tl":"tm",v:.7});});
  riffTok(b+2,"E:0:8:o",1);bass(b+2,["E"],"x-------........",1);pad(b+2,["E"],"strings",1,56,8);pad(b+2,["E"],"choir",.9,59,8);add((b+2)*16,{d:"x",v:1.2});add((b+2)*16,{d:"k",v:1.1});fill(b+2,"tom",.95);
  rhythm(b+3,["E"],"mmmmmmmmmmmmmmmm",.85);bass(b+3,["E"],"x.x.x.x.x.x.x.x.",.9);
  for(let k=0;k<16;k++)add((b+3)*16+k,{d:"s",v:.25+.6*k/15});for(const k of [0,4,8,12])add((b+3)*16+k,{d:"k",v:.9});add((b+3)*16,{d:"sw",v:.9,l:16});
  lead(b,["E5:0:6^2 D5:6:2 E5:8:4 G5:12:4","F#5:0:6^2 E5:6:2 F#5:8:4 A5:12:4/","B5:0:10^2~",""],.85,"lg",0);
  T.loopStep=bar*16;
  /* ---- MAIN RIFF (loop start): syncopated E-G-A-B / E-D-C-D riff with palm-muted chugs, lead plays the riff hook ---- */
  b=sec("Riff",4,3);
  const R1="E:0:2:o E:2:1:m E:3:1:m G:4:2:o E:6:1:m A:7:3:o E:10:1:m E:11:1:m B:12:2:o A:14:2:o",
        R2="E:0:3:o E:3:1:m E:4:1:m E:5:1:m D:6:2:o E:8:1:m E:9:1:m C:10:3:o D:13:3:o",
        R4="E:0:4:o E:4:1:m E:5:1:m E:6:1:m E:7:1:m G:8:2:o A:10:2:o B:12:4:o";
  [R1,R2,R1,R4].forEach((r,i)=>{riffTok(b+i,r,1);
    const roots=r.trim().split(/\s+/).map(x=>x.split(":"));for(const[cn,s,l,ty]of roots)if(ty==="o"||+s%4===0)add((b+i)*16+(+s),{i:"rbass",m:CH[cn][0]-12-(CH[cn][0]>50?12:0),l:+l,v:.95});
    drums(b+i,{k:"x.....x....x..x.",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."},1,i===3);});
  add(b*16,{d:"x",v:1.2});add((b+2)*16,{d:"x",v:1});fill(b+3,"s",.9);
  lead(b,["B4:0:2 E5:2:2 G5:4:2 A5:6:4^2 G5:10:2 E5:12:4","D5:0:3 E5:3:3 G5:6:2 E5:8:4 B4:12:4/",
          "B4:0:2 E5:2:2 G5:4:2 A5:6:4^2 G5:10:2 B5:12:4^2","A5:0:2 B5:2:2 D6:4:4^1 B5:8:8~"],.92,"lg",0);
  /* ---- VERSE: palm-muted gallop chugs, synth-lead verse melody, soft strings ---- */
  b=sec("Verse",8,1);const VC=[["C#m"],["A"],["E"],["B"],["C#m"],["A"],["F#m"],["B"]];
  VC.forEach((cs,i)=>{rhythm(b+i,cs,i%2?"m.mmm.mmm.mmm.mm":"O-mmm.mmm.mmm.mm",.82);bass(b+i,cs,"x.x.x.x.x.x.x.xo",.85);pad(b+i,cs,"strings",.55,56);
    drums(b+i,ROCK,.85,i===7);});
  add(b*16,{d:"x",v:.9});fill(b+7,"s",.75);
  mel(b,["G#4:0:2 G#4:2:2 B4:4:2 C#5:6:4 B4:10:2 G#4:12:4","A4:0:2 B4:2:2 C#5:4:4 E5:8:4 C#5:12:4","B4:0:6 G#4:6:2 E4:8:4 F#4:12:2 G#4:14:2","F#4:0:8 D#4:8:4",
         "G#4:0:2 B4:2:2 C#5:4:2 E5:6:4 D#5:10:2 C#5:12:4","C#5:0:2 E5:2:2 F#5:4:4 E5:8:2 C#5:10:2 A4:12:4","A4:0:3 B4:3:3 C#5:6:2 A4:8:4 F#4:12:4","B4:0:12"],"ssaw",.95,0);
  /* ---- BUILD: open 8th power chords, snare crescendo 8ths->16ths, choir + rising strings, riser, lead swell ---- */
  b=sec("Build",4,2);const BC=[["F#m"],["A"],["B"],["B"]];
  BC.forEach((cs,i)=>{rhythm(b+i,cs,i<3?"o.o.o.o.o.o.o.o.":"O.O.O.O.oooooooo",.9);bass(b+i,cs,i<3?"x.x.x.x.x.x.x.x.":"xxxxxxxxxxxxxxxx",.9);pad(b+i,cs,"strings",.8+i*.1,57+i*2);if(i>=2)pad(b+i,cs,"choir",.9,59);
    drums(b+i,{k:"x...x...x...x...",s:i<2?"....x.......x...":i<3?"x.x.x.x.x.x.x.x.":"xxxxxxxxxxxxxxxx"},.8+i*.07);});
  add(b*16,{d:"x",v:.9});add((b+2)*16,{d:"sw",v:1,l:32});
  lead(b,["","","F#5:0:8^2~ A5:8:8/","B5:0:12^2~"],.8,"lg",0);
  /* ---- CHORUS (x2): anthemic open chords, lead guitar hook; 2nd time with twin-lead harmony (3rd below), choir, crash every bar ---- */
  const HOOK=["E5:0:6 F#5:6:2 G#5:8:4 B5:12:4^2","A5:0:3 G#5:3:3 F#5:6:2 D#5:8:6^2","E5:0:3 F#5:3:3 G#5:6:2 B5:8:6^2 A5:14:2","G#5:0:4 F#5:4:2 E5:6:2 C#5:8:8~",
              "E5:0:6 F#5:6:2 G#5:8:4 B5:12:4^2","C#6:0:4^2 B5:4:2 A5:6:2 G#5:8:4 F#5:12:4"],
        HARM=["C#5:0:6 D#5:6:2 E5:8:4 G#5:12:4^2","F#5:0:3 E5:3:3 D#5:6:2 B4:8:6^2","C#5:0:3 D#5:3:3 E5:6:2 G#5:8:6^2 F#5:14:2","E5:0:4 D#5:4:2 C#5:6:2 A4:8:8~",
              "C#5:0:6 D#5:6:2 E5:8:4 G#5:12:4^2","A5:0:4^2 G#5:4:2 F#5:6:2 E5:8:4 D#5:12:4"];
  const chorus=(two)=>{const b=sec(two?"Chorus2":"Chorus",8,3);const CC=[["E"],["B"],["C#m"],["A"],["E"],["B"],two?["C"]:["A"],two?["D"]:["B"]];
    CC.forEach((cs,i)=>{rhythm(b+i,cs,i===7&&two?"O-----O-----O.mm":"O-----o-O-----o-",1);bass(b+i,cs,"x.xox.xox.xox.xo",1);pad(b+i,cs,"strings",1,57);if(two)pad(b+i,cs,"choir",.85,60);
      drums(b+i,DRIVE,1,i===7);if(two||i%2===0)add((b+i)*16,{d:"x",v:i===0?1.25:1});});
    fill(b+7,"tom",1);
    lead(b,HOOK.concat(two?["G5:0:4 E5:4:4 G5:8:4 C6:12:4^1","D6:0:12^2~"]:["C#6:0:4^2 B5:4:2 A5:6:2 E5:8:4 A5:12:4","B5:0:8^2~ A5:8:2 G#5:10:2 F#5:12:2 D#5:14:2"]),1,"lg",two?-.18:0);
    if(two)lead(b,HARM.concat(["E5:0:4 C5:4:4 E5:8:4 G5:12:4^1","A5:0:12^2~"]),.7,"lg2",.32);
    mel(b,HOOK.map(s=>s.replace(/[\^~\/>]\d?/g,"")),"strings",.5,-12);};
  chorus(false);
  /* ---- GUITAR SOLO: gallop rhythm, composed solo with runs, bends and slides ---- */
  b=sec("Solo",8,3);const SC=[["C#m"],["A"],["E"],["B"],["C#m"],["A"],["C"],["D"]];
  SC.forEach((cs,i)=>{rhythm(b+i,cs,i>=6?"O-mmO-mmO-mmO-mm":"o.mmo.mmo.mmo.mm",.92);bass(b+i,cs,"x.xxx.xxx.xxx.xx",.95);pad(b+i,cs,"strings",.7,56);drums(b+i,GALLOP,.95,i===7);});
  add(b*16,{d:"x",v:1.2});add((b+4)*16,{d:"x",v:1});add((b+6)*16,{d:"sw",v:.8,l:32});fill(b+7,"s",1);
  lead(b,["C#5:0:2 E5:2:2 G#5:4:2 B5:6:2 C#6:8:6^2~ B5:14:2","A5:0:2 G#5:2:1 F#5:3:1 E5:4:2 C#5:6:2 E5:8:8~",
          "B4:0:1 C#5:1:1 E5:2:1 F#5:3:1 G#5:4:1 F#5:5:1 E5:6:1 F#5:7:1 G#5:8:2 B5:10:2 E6:12:4/","D#6:0:4>1 B5:4:4 F#5:8:8~",
          "G#5:0:3 A5:3:1 B5:4:4^2 G#5:8:2 E5:10:2 C#5:12:4","A5:0:2 B5:2:2 C#6:4:4 E6:8:8^1~",
          "G5:0:2 C6:2:2 E6:4:4^2 D6:8:2 C6:10:2 B5:12:2 G5:14:2","A5:0:2 D6:2:2 E6:4:12^2~"],1,"lg",0);
  chorus(true);
  T.steps=bar*16;for(let i=0;i<T.steps;i++)by[i]=by[i]||[];return by;}

/* ---- v9d generic score builder (any steps-per-bar, chord-name parser, lead/twin-lead/rhythm/arp helpers) ---- */
const QIV={M:[0,4,7],m:[0,3,7],sus:[0,5,7],sus2:[0,2,7],"7":[0,4,7,10],m7:[0,3,7,10],maj7:[0,4,7,11],dim:[0,3,6],add9:[0,4,7,14],m9:[0,3,7,10,14],"5":[0,7]};
const NNAME=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const nmN=m=>NNAME[((m%12)+12)%12]+(Math.floor(m/12)-1);
function SB(T,spb){spb=spb||16;const by=[];let bar=0;T.secs=[];const lo=T.glo||38,blo=T.blo||28,cache={};
  const add=(s,e)=>{(by[s]=by[s]||[]).push(e);};
  const pcOf=s=>(NN[s[0]]+(s[1]==="#"?1:s[1]==="b"?-1:0)+12)%12;
  const chd=n=>{if(cache[n])return cache[n];const x=/^([A-G][#b]?)([^\/]*)(?:\/([A-G][#b]?))?$/.exec(n);const pc=pcOf(x[1]);const r=lo+((pc-lo)%12+12)%12;const q=x[2]||"M";
    let b=r-12;if(x[3]){b=blo+((pcOf(x[3])-blo)%12+12)%12;}else if(b<blo)b+=12;return cache[n]={r,q,iv:QIV[q]||QIV.M,b};};
  const chordAt=(cs,k)=>chd(cs[Math.min(cs.length-1,Math.floor(k*cs.length/spb))]);
  const tones=(ch,l)=>ch.iv.map(i=>{let m=ch.r+i;while(m<l)m+=12;while(m>=l+12&&i<12)m-=12;return m;}).sort((a,b)=>a-b);
  const tok=s=>/^([A-G][#b]?-?\d):(\d+):(\d+)(.*)$/.exec(s);
  /* lead tokens "E5:0:6" + flags: ^n bend up from n semitones below, >n release-bend from n above, / slide from previous note, ~ wide vibrato */
  const lead=(b0,bars,v,rig,pn)=>{const evs=[];bars.forEach((line,bi)=>{if(!line)return;for(const tk of line.trim().split(/\s+/)){const x=tok(tk);const fl=x[4];
      const e={i:"lg",m:nm(x[1]),l:+x[3],v:v,rig:rig||"lg",pn:pn||0,s:(b0+bi)*spb+(+x[2])};const bd=/\^(\d)/.exec(fl),rl=/>(\d)/.exec(fl);if(bd)e.bd=+bd[1];if(rl)e.rl=+rl[1];if(fl.includes("/"))e.sl=1;if(fl.includes("~"))e.vb=1;evs.push(e);}});
    evs.forEach((e,i)=>{const n=evs[i+1];if(n&&n.sl&&n.s===e.s+e.l)e.tie=1;add(e.s,e);});};
  /* diatonic harmony a third below (scale = pitch classes), keeps rhythm and articulation flags */
  const third=(bars,sc)=>bars.map(line=>line&&line.trim().split(/\s+/).map(tk=>{const x=tok(tk);const m=nm(x[1]),pc=((m%12)+12)%12;let i=sc.indexOf(pc);if(i<0){i=0;for(let j=0;j<sc.length;j++)if(sc[j]<pc)i=j;}
      const tp=sc[(i-2+sc.length*2)%sc.length];let m2=m-1;while(((m2%12)+12)%12!==tp)m2--;return nmN(m2)+":"+x[2]+":"+x[3]+x[4];}).join(" "));
  const mel=(b0,bars,inst,v,oct,p)=>bars.forEach((line,bi)=>{if(!line)return;for(const tk of line.trim().split(/\s+/)){const x=tok(tk);add((b0+bi)*spb+(+x[2]),{i:inst,m:nm(x[1])+(oct||0),l:+x[3],v,p:p||0});}});
  const plain=bars=>bars.map(s=>s&&s.replace(/[\^>]\d|[~\/]/g,""));
  /* rhythm guitar: O/o open power chord (accent/normal), M/m palm-muted chug, n single muted note, - sustain */
  const rhythm=(b,cs,pat,v)=>{for(let k=0;k<spb;k++){const ch=pat[k];if(!ch||ch==="."||ch==="-")continue;let len=1;while(k+len<spb&&pat[k+len]==="-")len++;const C=chordAt(cs,k);
      add(b*spb+k,{i:"rg",m:C.r+(T.gdrop&&(ch==="m"||ch==="M")?-12:0),l:len,v:v*(ch==="O"?1:ch==="o"?.86:ch==="M"?.9:.72),pm:ch==="m"||ch==="M"||ch==="n",sg:ch==="n",s0:b*spb+k});}};
  const riff=(b,str,v)=>{for(const tk of str.trim().split(/\s+/)){const[cn,s,l,ty]=tk.split(":");const C=chd(cn);add(b*spb+(+s),{i:"rg",m:C.r+(T.gdrop&&ty==="m"?-12:0),l:+l,v:v*(ty==="m"?.74:1),pm:ty==="m",sg:false,s0:b*spb+(+s)});
      if(ty==="o"||+s%4===0)add(b*spb+(+s),{i:T.binst||"rbass",m:C.b,l:+l,v:.95});}};
  const bass=(b,cs,pat,v,inst)=>{for(let k=0;k<spb;k++){const ch=pat[k];if(!ch||ch==="."||ch==="-")continue;let len=1;while(k+len<spb&&pat[k+len]==="-")len++;const C=chordAt(cs,k);
      add(b*spb+k,{i:inst||T.binst||"rbass",m:C.b+(ch==="o"?12:ch==="f"?7:0),l:len,v:v*(k%4===0?1:.85)});}};
  const pad=(b,cs,inst,v,l,len)=>{const n=cs.length;cs.forEach((cn,i)=>{const ch=chd(cn);for(const m of tones(ch,l))add(b*spb+i*spb/n,{i:inst,m,l:len||spb/n,v,p:(m%3-1)*.35});});};
  /* arpeggio: digits index the voiced chord tones (+octaves), '-' lets the previous note ring longer */
  const arp=(b,cs,pat,inst,v,l,ring)=>{for(let k=0;k<pat.length&&k<spb;k++){const ch=pat[k];if(!/\d/.test(ch))continue;const C=chordAt(cs,k),tn=tones(C,l);const i=+ch;
      let len=1;while(k+len<spb&&pat[k+len]==="-")len++;add(b*spb+k,{i:inst,m:tn[i%tn.length]+12*Math.floor(i/tn.length),l:ring||len,v:v*(k%4===0?1:.85),p:0});}};
  const drums=(b,P,v,cut)=>{v*=T.dv||1;for(const d in P){const pat=P[d];for(let k=0;k<spb;k++){const ch=pat[k];if(!ch||ch===".")continue;if(cut&&k>=spb/2&&d!=="k"&&d!=="kq")continue;
      const hv=(d==="h"||d==="o"||d==="rd"||d==="sh")?(k%4===0?1:k%2===0?.8:.55):1;add(b*spb+k,{d,v:v*hv*(ch==="X"?1.25:ch==="g"?.45:1)});}}};
  const fill=(b,kind,v)=>{v*=T.dv||1;const h=spb/2,f=kind==="tom"?["tt","tt","tm","tm","tl","tl","tl","tl"]:["s","s","s","s","s","s","s","s"];for(let k=0;k<h;k++)add(b*spb+h+k,{d:f[Math.floor(k*8/h)],v:v*(.6+.4*k/h)});add(b*spb+h,{d:"k",v});};
  const hit=(b,k,d,v,l)=>add(b*spb+k,l?{d,v,l}:{d,v});
  const sec=(n,bars,e)=>{T.secs.push({n,bar,bars,e});const b0=bar;bar+=bars;return b0;};
  const loop=()=>{T.loopStep=bar*spb;};
  const done=()=>{T.steps=bar*spb;for(let i=0;i<T.steps;i++)by[i]=by[i]||[];return by;};
  return {tones,add,chd,lead,third,mel,plain,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,loop,done,spb};}

/* ---- v9d scores: eight original themes in the same guitar-rock engine (each with its own key, tempo, feel and purpose) ---- */
const SCL={fsm:[1,2,4,6,8,9,11],bb:[0,2,3,5,7,9,10],apd:[1,2,4,5,7,9,10],f:[0,2,4,5,7,9,10],bhm:[1,2,4,6,7,10,11],dhm:[1,2,4,5,7,9,10]};
const bars1=a=>a.map(x=>[x]);
/* DUEL STANDBY - default duel theme: F# minor, 140 bpm, driving but with a low-energy verse and a half-time breakdown so long duels don't fatigue */
function makeDuel(T){const S=SB(T,16),{lead,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,mel,third,plain}=S;let b;
  const DR={k:"x.....x.x.....x.",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."},DRV={k:"x.x...x.x.x...x.",s:"....x.......x...",o:"..x...x...x...x.",h:"x...x...x...x..."},
    VR={k:"x.......x.x.....",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."},HALF={k:"x.......x.x.....",s:"........X.......",rd:"x...x...x...x..."},SOLO={k:"x.x...x.x.x...x.",s:"....x.......x...",rd:"x.x.x.x.x.x.x.x."};
  b=sec("Intro",2,2);rhythm(b,["F#m"],"mmmmmmmmmmmmmmmm",.8);bass(b,["F#m"],"x.x.x.x.x.x.x.x.",.85);for(let k=0;k<16;k++)hit(b,k,"s",.2+.55*k/15);for(const k of[0,4,8,12])hit(b,k,"k",.9);hit(b,0,"sw",.8,32);pad(b,["F#m"],"strings",.7,54,32);
  riff(b+1,"D:0:6:o E:6:6:o C#:12:4:o",1);hit(b+1,0,"x",1.1);hit(b+1,0,"k",1);hit(b+1,6,"k",1);hit(b+1,6,"x",.8);fill(b+1,"tom",.9);
  lead(b,["","D6:0:6^2 E6:6:6^2 F6:12:4"],.85);S.loop();
  b=sec("Riff",4,3);const RA="F#:0:2:o F#:2:1:m F#:3:1:m A:4:2:o F#:6:1:m F#:7:1:m B:8:3:o A:11:1:m F#:12:2:o E:14:2:o",
    RB="F#:0:2:o F#:2:1:m F#:3:1:m A:4:2:o F#:6:1:m F#:7:1:m C#:8:4:o D:12:2:o E:14:2:o",RC="D:0:4:o E:4:4:o F#:8:2:o F#:10:1:m F#:11:1:m C#:12:4:o";
  [RA,RB,RA,RC].forEach((r,i)=>{riff(b+i,r,1);drums(b+i,DR,1,i===3);});hit(b,0,"x",1.2);hit(b+2,0,"x",1);fill(b+3,"s",.9);
  lead(b,["F#5:0:2 A5:2:2 C#6:4:4^2 B5:8:2 A5:10:2 G#5:12:4","A5:0:2 B5:2:2 C#6:4:2 E6:6:2 D6:8:4 C#6:12:4/","F#5:0:2 A5:2:2 C#6:4:4^2 B5:8:2 A5:10:2 B5:12:4^2","D6:0:3 C#6:3:3 B5:6:2 A5:8:2 G#5:10:2 F5:12:4~"],.92);
  b=sec("Verse",8,1);const VC=bars1(["F#m","D","E","C#","F#m","D","Bm","C#"]);
  VC.forEach((cs,i)=>{rhythm(b+i,cs,i%2?"m.m.m.m.m.m.mmmm":"M.m.m.m.M.m.m.m.",.74);bass(b+i,cs,"x...x.x.x...x.x.",.8);pad(b+i,cs,"strings",.42,54);arp(b+i,cs,"0.1.2.3.2.1.2.3.","cg",.8,57,3);drums(b+i,VR,.72,i===7);});
  hit(b,0,"x",.8);fill(b+7,"s",.7);
  lead(b,["C#5:0:3 A4:3:3 F#4:6:2 A4:8:2 B4:10:2 C#5:12:4","D5:0:3 C#5:3:3 A4:6:2 F#4:8:8~","E5:0:3 D5:3:3 B4:6:2 G#4:8:2 A4:10:2 B4:12:4","C#5:0:12^2~ G#4:12:4",
    "C#5:0:3 A4:3:3 F#4:6:2 A4:8:2 C#5:10:2 F#5:12:4","E5:0:2 F#5:2:2 E5:4:2 D5:6:2 A4:8:8","B4:0:3 C#5:3:3 D5:6:2 F#5:8:4 E5:12:4","F5:0:8~ G#5:8:4 F5:12:4"],.8,"lc");
  b=sec("Build",4,2);bars1(["Bm","D","E","E"]).forEach((cs,i)=>{rhythm(b+i,cs,i<3?"o.o.o.o.o.o.o.o.":"O.O.O.O.oooooooo",.9);bass(b+i,cs,i<3?"x.x.x.x.x.x.x.x.":"xxxxxxxxxxxxxxxx",.9);pad(b+i,cs,"strings",.75+i*.1,56+i);if(i>=2)pad(b+i,cs,"choir",.85,59);
    drums(b+i,{k:"x...x...x...x...",s:i<2?"....x.......x...":i<3?"x.x.x.x.x.x.x.x.":"xxxxxxxxxxxxxxxx"},.78+i*.07);});
  hit(b,0,"x",.9);hit(b+2,0,"sw",1,32);lead(b,["","","B5:0:8^2~ C#6:8:8/","D6:0:4 E6:4:12^2~"],.82);
  const HOOK=["F#5:0:4 G#5:4:2 A5:6:2 C#6:8:6^2 B5:14:2","A5:0:4 F#5:4:4 D6:8:8^2~","C#6:0:4 B5:4:2 A5:6:2 E6:8:6^2 C#6:14:2","B5:0:6 A5:6:2 G#5:8:8~",
    "F#5:0:4 G#5:4:2 A5:6:2 C#6:8:6^2 B5:14:2","A5:0:3 B5:3:3 D6:6:2 F#6:8:8^2~","E6:0:4 D6:4:2 C#6:6:2 B5:8:4 D6:12:4","C#6:0:12^1~ F5:12:2 G#5:14:2"];
  b=sec("Chorus",8,3);bars1(["F#m","D","A","E","F#m","D","Bm","C#"]).forEach((cs,i)=>{rhythm(b+i,cs,i===7?"O-----O-----O.mm":"O-----o-O-----o-",1);bass(b+i,cs,"x.xox.xox.xox.xo",1);pad(b+i,cs,"strings",.9,57);
    drums(b+i,DRV,1,i===7);if(i%2===0)hit(b+i,0,"x",i===0?1.25:1);});
  fill(b+7,"tom",1);lead(b,HOOK,1);mel(b,plain(HOOK),"strings",.45,-12);
  b=sec("Breakdown",4,1);bars1(["F#m","D","E","C#"]).forEach((cs,i)=>{rhythm(b+i,cs,"M..mM..m.mM..m..",.84);bass(b+i,cs,"x..xx..x.xx..x..",.9);arp(b+i,cs,"0.1.2.3.4.3.2.1.","cg",1,57,3);pad(b+i,cs,"strings",.6,54);if(i>=2)pad(b+i,cs,"choir",.55,59);drums(b+i,HALF,.85,i===3);});
  hit(b,0,"x",1);fill(b+3,"s",.85);
  b=sec("Solo",8,3);const SOL=["C#5:0:2 F#5:2:2 A5:4:2 C#6:6:2 B5:8:4^2 A5:12:2 G#5:14:2","A5:0:4 F#5:4:2 D5:6:2 F#5:8:8~",
    "E5:0:1 F#5:1:1 G#5:2:1 A5:3:1 B5:4:1 C#6:5:1 B5:6:1 A5:7:1 C#6:8:4^2 E6:12:4/","D6:0:4>2 B5:4:4 G#5:8:8~","F#6:0:6^2~ E6:6:2 C#6:8:2 A5:10:2 B5:12:4",
    "A5:0:2 B5:2:2 C#6:4:2 D6:6:2 E6:8:4^2 F#6:12:4/","E6:0:2 D6:2:2 B5:4:2 G#5:6:2 E5:8:2 G#5:10:2 B5:12:4","C#6:0:8^2~ B5:8:2 G#5:10:2 F5:12:4~"];
  bars1(["F#m","D","A","E","F#m","D","E","C#"]).forEach((cs,i)=>{rhythm(b+i,cs,i>=6?"O-mmO-mmO-mmO-mm":"o.mmo.mmo.mmo.mm",.9);bass(b+i,cs,"x.xxx.xxx.xxx.xx",.9);pad(b+i,cs,"strings",.6,56);drums(b+i,SOLO,.95,i===7);});
  hit(b,0,"x",1.2);hit(b+4,0,"x",1);hit(b+6,0,"sw",.8,32);fill(b+7,"s",1);lead(b,SOL,1);lead(b+6,third(SOL.slice(6),SCL.fsm),.62,"lg2",.32);
  return S.done();}
/* BANNER OF THE DAWN - heroic arenas: Bb major, 108 bpm power-metal march, twin harmony leads, brass fanfares, timpani */
function makeHeroic(T){const S=SB(T,16),{lead,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,mel,third,plain,add}=S;let b;
  const MARCH={k:"x.......x.......",s:"....x..x....x.xx",h:"x.x.x.x.x.x.x.x."},HALF={k:"x.......x.......",s:"........x.......",rd:"x...x...x...x..."},CH={k:"x.x...x.x.x...x.",s:"....x.......x...",o:"..x...x...x...x."};
  const timp=(bb,ks,m,v)=>{for(const k of ks)add(bb*16+k,{i:"timp",m,l:2,v,p:0});};
  b=sec("Intro",2,2);riff(b,"Bb:0:16:o",1);pad(b,["Bb"],"strings",.9,53);pad(b,["Bb"],"choir",.7,58);hit(b,0,"x",1.1);hit(b,0,"k",1);for(let k=0;k<16;k++)hit(b,k,"s",.15+.4*k/15);timp(b,[0,8,12,14],34,.9);
  mel(b,["F4:0:3 F4:3:1 Bb4:4:4 D5:8:3 C5:11:1 Bb4:12:4","C5:0:3 D5:3:1 Eb5:4:4 D5:8:4 C5:12:4"],"brass",1.05);
  riff(b+1,"F:0:8:o Eb:8:4:o F:12:4:o",1);pad(b+1,["F"],"strings",.9,53);hit(b+1,0,"x",1);fill(b+1,"tom",.95);S.loop();
  const A=["D5:0:4 F5:4:4 Bb5:8:6 A5:14:2","C6:0:4 A5:4:2 F5:6:2 A5:8:8~","Bb5:0:4 G5:4:2 Bb5:6:2 D6:8:6^2 C6:14:2","Bb5:0:6 G5:6:2 Eb5:8:8~",
    "D5:0:4 F5:4:4 Bb5:8:6 C6:14:2","D6:0:4 C6:4:2 A5:6:2 F5:8:4 A5:12:4","G5:0:4 Bb5:4:4 Eb6:8:4^2 D6:12:4","C6:0:8~ D6:8:2 C6:10:2 A5:12:4"];
  b=sec("March",8,2);bars1(["Bb","F","Gm","Eb","Bb","F","Eb","F"]).forEach((cs,i)=>{rhythm(b+i,cs,"O-mmo-mmO-mmo-mm",.88);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.9);arp(b+i,cs,"0.1.2.1.0.1.2.1.","spicc",.8,58);pad(b+i,cs,"strings",.45,53);
    drums(b+i,MARCH,.85,i===7);timp(b+i,[0,8],S.chd(cs[0]).b+12,.55);});
  hit(b,0,"x",1.1);hit(b+4,0,"x",.9);fill(b+7,"s",.8);lead(b,A,.92);lead(b,third(A,SCL.bb),.6,"lg2",.32);
  b=sec("Bridge",4,1);bars1(["Gm","Eb","Cm","F"]).forEach((cs,i)=>{rhythm(b+i,cs,i===3?"O-------O.O.OOOO":"O-------O-------",.92);bass(b+i,cs,"x-------x-------",.9);pad(b+i,cs,"strings",.9,55);pad(b+i,cs,"choir",.75,58);drums(b+i,HALF,.8,i===3);});
  hit(b,0,"x",1);for(let k=0;k<16;k+=2)timp(b+3,[k],41,.3+.04*k);
  lead(b,["G5:0:6 A5:6:2 Bb5:8:8~","G5:0:4 Bb5:4:4 Eb6:8:8^2~","C6:0:6 D6:6:2 Eb6:8:4 G6:12:4","F6:0:16^2~"],.9);
  const HK=["Eb5:0:2 F5:2:2 G5:4:4 Bb5:8:4 G5:12:4","F5:0:2 G5:2:2 A5:4:4 C6:8:8^2~","D6:0:6 C6:6:2 Bb5:8:4 F5:12:4","G5:0:4 A5:4:4 Bb5:8:4 D6:12:4",
    "Eb6:0:6 D6:6:2 C6:8:4 Bb5:12:4","A5:0:4 C6:4:4 F6:8:8^2~","D6:0:4 C6:4:2 Bb5:6:2 A5:8:4 Bb5:12:4","C6:0:8 A5:8:4 F5:12:4"];
  b=sec("Chorus",8,3);bars1(["Eb","F","Bb","Gm","Eb","F","Bb","F"]).forEach((cs,i)=>{rhythm(b+i,cs,"O-------O---o-o-",1);bass(b+i,cs,"x.x.x.x.x.x.x.xo",1);pad(b+i,cs,"strings",.9,55);pad(b+i,cs,"choir",.8,58);pad(b+i,cs,"brass",.35,53,8);
    drums(b+i,CH,1,i===7);if(i%2===0)hit(b+i,0,"x",i?1:1.25);timp(b+i,[0],S.chd(cs[0]).b+12,.6);});
  fill(b+7,"tom",1);lead(b,HK,1);lead(b,third(HK,SCL.bb),.62,"lg2",.32);mel(b,plain(HK),"choir",.4,-12);
  b=sec("Fanfare",4,2);bars1(["Gm","Eb","F","F"]).forEach((cs,i)=>{rhythm(b+i,cs,"o.mmo.mmo.mmo.mm",.8);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.85);arp(b+i,cs,"0.1.2.1.0.1.2.1.","spicc",.85,58);drums(b+i,MARCH,.85,i===3);timp(b+i,[0,8],S.chd(cs[0]).b+12,.55);});
  hit(b,0,"x",1);fill(b+3,"tom",.95);
  const FF=["D5:0:3 D5:3:1 G5:4:4 Bb5:8:3 A5:11:1 G5:12:4","Bb4:0:3 C5:3:1 Eb5:4:4 G5:8:4 F5:12:4","F5:0:3 F5:3:1 A5:4:4 C6:8:3 Bb5:11:1 A5:12:4","C6:0:8 A5:8:4 F5:12:4"];
  mel(b,FF,"brass",1);mel(b,FF,"brass",.5,-12);
  return S.done();}
/* EMBER LAIR - dragon lair: A Phrygian dominant, 168 bpm dragon thrash, low chugs, double kick, choir, harmonic-minor shred */
function makeFire(T){const S=SB(T,16),{lead,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,mel,third,plain}=S;let b;
  const RF={k:"x.x.x.x.x.x.x.x.",s:"....x.......x...",h:"x...x...x...x..."},GAL={k:"x.x.x.x.x.x.x.x.",s:"....x.......x...",rd:"x...x...x...x..."},
    DK={kq:"xxxxxxxxxxxxxxxx",s:"....x.......x...",rd:"x.x.x.x.x.x.x.x."},SO={k:"x.x.x.x.x.x.x.x.",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."};
  b=sec("Intro",2,2);riff(b,"A:0:12:o Bb:12:4:o",1);pad(b,["A"],"choir",.9,57,16);hit(b,0,"x",1.2);hit(b,0,"k",1.1);for(const k of[8,10,12,13,14,15])hit(b,k,"tl",.75);hit(b,0,"sw",.8,32);
  riff(b+1,"A:0:1:m A:1:1:m A:2:1:m A:3:1:m A:4:1:m A:5:1:m A:6:1:m A:7:1:m Bb:8:2:o A:10:2:o G:12:2:o F:14:2:o",1);for(let k=0;k<16;k++){hit(b+1,k,"kq",.8);hit(b+1,k,"s",.2+.5*k/15);}S.loop();
  b=sec("Riff",4,3);const T1="A:0:1:m A:1:1:m A:2:1:m A:3:1:m Bb:4:2:o A:6:1:m A:7:1:m A:8:1:m A:9:1:m C#:10:2:o A:12:1:m A:13:1:m D:14:2:o",
    T2="A:0:1:m A:1:1:m A:2:1:m A:3:1:m Bb:4:2:o A:6:1:m A:7:1:m G:8:2:o F:10:2:o E:12:4:o",T3="F:0:4:o E:4:4:o Bb:8:4:o A:12:1:m A:13:1:m A:14:1:m A:15:1:m";
  [T1,T2,T1,T3].forEach((r,i)=>{riff(b+i,r,1);drums(b+i,RF,1,i===3);});hit(b,0,"x",1.2);fill(b+3,"tom",.95);
  lead(b,["","","A5:0:2 Bb5:2:2 C#6:4:2 D6:6:2 E6:8:8^2~","F6:0:4>1 E6:4:4 Bb5:8:4 A5:12:4"],.9);
  b=sec("Verse",8,2);bars1(["A","Bb","A","Dm","A","Bb","Gm","A"]).forEach((cs,i)=>{rhythm(b+i,cs,"O.mmm.mmm.mmm.mm",.82);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.85);if(i%2)pad(b+i,cs,"brass",.4,52,4);drums(b+i,GAL,.9,i===7);});
  hit(b,0,"x",1);hit(b+4,0,"x",.9);fill(b+7,"s",.85);
  lead(b,["A4:0:4 C#5:4:2 D5:6:2 E5:8:6 D5:14:2","F5:0:4 E5:4:2 D5:6:2 C#5:8:8~","E5:0:2 F5:2:2 E5:4:2 D5:6:2 C#5:8:4 A4:12:4","D5:0:4 F5:4:4 A5:8:8^2~",
    "A4:0:4 C#5:4:2 D5:6:2 E5:8:6 F5:14:2","G5:0:4 F5:4:2 E5:6:2 D5:8:4 F5:12:4","G5:0:4 F5:4:2 E5:6:2 D5:8:4 Bb4:12:4","C#5:0:8^2~ E5:8:4 G5:12:4"],.86);
  b=sec("Build",4,2);bars1(["Dm","Bb","A","A"]).forEach((cs,i)=>{rhythm(b+i,cs,i<3?"o.o.o.o.o.o.o.o.":"oooooooooooooooo",.88);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.9);pad(b+i,cs,"choir",.7+i*.08,57);
    drums(b+i,i<3?{k:"x...x...x...x...",s:i<2?"....x.......x...":"x.x.x.x.x.x.x.x."}:{kq:"xxxxxxxxxxxxxxxx",s:"xxxxxxxxxxxxxxxx"},.8+i*.05);});
  hit(b,0,"x",1);hit(b+2,0,"sw",1,32);
  const HK=["D5:0:2 E5:2:2 F5:4:4 A5:8:6^2 G5:14:2","F5:0:4 D5:4:4 Bb5:8:8^1~","A5:0:4 G5:4:2 F5:6:2 E5:8:4 C#5:12:4","E5:0:12~ D5:12:2 C#5:14:2",
    "D5:0:2 E5:2:2 F5:4:4 A5:8:6^2 D6:14:2","D6:0:4 C#6:4:2 Bb5:6:2 A5:8:4 G5:12:4","G5:0:2 A5:2:2 Bb5:4:4 D6:8:4^2 E6:12:4","C#6:0:12^2~ A5:12:4"];
  const chorus=two=>{const b=sec(two?"Chorus2":"Chorus",8,3);bars1(["Dm","Bb","A","A","Dm","Bb","Gm","A"]).forEach((cs,i)=>{rhythm(b+i,cs,"O-----o-O-----o-",1);bass(b+i,cs,"x.x.x.x.x.x.x.x.",1);pad(b+i,cs,"choir",.85,57);pad(b+i,cs,"strings",.6,52);
      drums(b+i,DK,1,i===7);if(two||i%2===0)hit(b+i,0,"x",i?1:1.25);});
    fill(b+7,"tom",1);lead(b,HK,1);if(two)lead(b,third(HK,SCL.apd),.62,"lg2",.3);else mel(b,plain(HK),"choir",.4,-12);};
  chorus(false);
  b=sec("Solo",8,3);bars1(["A","Bb","A","Bb","Gm","A","Bb","A"]).forEach((cs,i)=>{rhythm(b+i,cs,"O.mmm.mmO.mmm.mm",.9);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.9);drums(b+i,SO,.95,i===7);});
  hit(b,0,"x",1.2);hit(b+4,0,"x",1);fill(b+7,"s",1);
  lead(b,["A5:0:1 C#6:1:1 E6:2:1 A6:3:1 E6:4:1 C#6:5:1 A5:6:1 C#6:7:1 E6:8:8^2~","F6:0:4^1 D6:4:2 Bb5:6:2 F5:8:4 D6:12:4/",
    "C#6:0:1 D6:1:1 E6:2:1 F6:3:1 E6:4:1 D6:5:1 C#6:6:1 Bb5:7:1 A5:8:4 E6:12:4","D6:0:6^2~ C#6:6:2 Bb5:8:4 G5:12:4",
    "G5:0:1 A5:1:1 Bb5:2:1 C#6:3:1 D6:4:2 Bb5:6:2 G6:8:8^2~","F6:0:2 E6:2:2 C#6:4:2 Bb5:6:2 A5:8:8~",
    "Bb5:0:1 C#6:1:1 D6:2:1 E6:3:1 F6:4:4^2 E6:8:2 D6:10:2 Bb5:12:4","A6:0:12^2~ E6:12:2 C#6:14:2"],1);
  chorus(true);return S.done();}
/* NEON CIRCUIT - machine/robot/race arenas: C Dorian, 126 bpm cyber-rock, four-on-the-floor, arps, synth vs guitar trades */
function makeTech(T){const S=SB(T,16),{lead,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,mel,third,plain}=S;let b;
  const FF={k:"x...x...x...x...",cl:"....x.......x...",h:"..x...x...x...x."},FB={k:"x...x...x...x...",cl:"....x.......x...",h:"xxxxxxxxxxxxxxxx",o:"..x...x...x...x."};
  b=sec("Intro",2,1);[0,1].forEach(i=>{arp(b+i,["Cm"],"0123210301232103","pluck",.6,60);pad(b+i,["Cm"],"padsaw",.5,55,16);});drums(b+1,{k:"x...x...x...x...",h:"..x...x...x...x."},.85);hit(b,0,"sw",.7,32);S.loop();
  b=sec("Drive",8,2);bars1(["Cm","F","Cm","F","Eb","Bb","F","Gm"]).forEach((cs,i)=>{arp(b+i,cs,"0123210301232103","pluck",.5,60);pad(b+i,cs,"padsaw",.55,55,8);
    rhythm(b+i,cs,"M..m..M..m..M.m.",.72);bass(b+i,cs,"x.o.x.o.x.o.x.o.",.85,"sbass");drums(b+i,FF,.9,i===7);});
  hit(b,0,"x",1);fill(b+7,"s",.75);
  mel(b,["G5:0:3 Eb5:3:3 C5:6:2 D5:8:2 Eb5:10:2 G5:12:4","A5:0:3 F5:3:3 C5:6:2 Eb5:8:4 D5:12:4","G5:0:3 Eb5:3:3 C5:6:2 D5:8:2 Eb5:10:2 Bb5:12:4","A5:0:6 G5:6:2 F5:8:8",
    "G5:0:2 Bb5:2:2 Eb6:4:4 D6:8:2 Bb5:10:2 G5:12:4","F5:0:2 Bb5:2:2 D6:4:4 C6:8:2 Bb5:10:2 F5:12:4","A5:0:4 C6:4:4 F6:8:4 Eb6:12:4","D6:0:12 Bb5:12:4"],"pulsel",.95);
  const HK=["Bb5:0:4 G5:4:2 Bb5:6:2 C6:8:6^2 Bb5:14:2","A5:0:4 F5:4:2 A5:6:2 C6:8:8^2~","Eb6:0:4 D6:4:2 C6:6:2 G5:8:4 Bb5:12:4","C6:0:16~",
    "Bb5:0:4 G5:4:2 Bb5:6:2 Eb6:8:6^2 D6:14:2","C6:0:4 A5:4:2 C6:6:2 F6:8:8^2~","D6:0:4 C6:4:2 Bb5:6:2 F5:8:4 A5:12:4","C6:0:8^2~ A5:8:4 F5:12:4"];
  b=sec("Chorus",8,3);bars1(["Eb","F","Cm","Cm","Eb","F","Bb","F"]).forEach((cs,i)=>{rhythm(b+i,cs,"O-----o-O-----o-",1);bass(b+i,cs,"x.xox.xox.xox.xo",.95);pad(b+i,cs,"padsaw",.5,55,8);arp(b+i,cs,"0.1.2.3.2.1.2.3.","pluck",.4,60);
    drums(b+i,FB,1,i===7);if(i%2===0)hit(b+i,0,"x",i?1:1.2);});
  fill(b+7,"s",.9);lead(b,HK,1);mel(b,plain(HK),"ssaw",.35,0);
  b=sec("Breakdown",4,1);bars1(["Cm","Cm","F","F"]).forEach((cs,i)=>{arp(b+i,cs,"0123210301232103","pluck",.7,60);pad(b+i,cs,"padsaw",.6,55,16);bass(b+i,cs,"x-------x-------",.8,"sbass");drums(b+i,{k:"x.......x.......",h:"..x...x...x...x."},.7);});
  b=sec("Build",4,2);bars1(["Eb","F","Gm","Gm"]).forEach((cs,i)=>{rhythm(b+i,cs,i<3?"o.o.o.o.o.o.o.o.":"O.O.O.O.oooooooo",.85);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.85);arp(b+i,cs,"0123210301232103","pluck",.5,60);
    drums(b+i,{k:"x...x...x...x...",s:i<2?"....x.......x...":i<3?"x.x.x.x.x.x.x.x.":"xxxxxxxxxxxxxxxx"},.75+i*.07);});
  hit(b,0,"x",.9);hit(b+2,0,"sw",1,32);lead(b,["","","G5:0:8^2~ Bb5:8:8/","D6:0:16^2~"],.85);
  b=sec("Trade",8,3);bars1(["Cm","F","Cm","F","Eb","Bb","F","G"]).forEach((cs,i)=>{rhythm(b+i,cs,i===7?"O-----O-----O.mm":"O-mm.mmO-mm.mm.",.85);bass(b+i,cs,"x.xox.xox.xox.xo",.9);arp(b+i,cs,"0.1.2.3.2.1.2.3.","pluck",.45,60);
    drums(b+i,FB,.95,i===7);});
  hit(b,0,"x",1.2);hit(b+4,0,"x",1);fill(b+7,"tom",.95);
  mel(b,["C6:0:1 D6:1:1 Eb6:2:1 G6:3:1 F6:4:2 Eb6:6:2 D6:8:4 C6:12:4","A5:0:2 C6:2:2 F6:4:4 Eb6:8:2 D6:10:2 C6:12:4","","",
    "G6:0:2 F6:2:2 Eb6:4:2 D6:6:2 Eb6:8:4 Bb5:12:4","F6:0:2 D6:2:2 Bb5:4:2 F5:6:2 Bb5:8:8","",""],"pulsel",.95);
  lead(b,["","","G5:0:2 Bb5:2:2 C6:4:4^2 Eb6:8:4 D6:12:2 C6:14:2","A5:0:4 C6:4:4 F5:8:8~","","","A5:0:2 C6:2:2 F6:4:4^2 Eb6:8:2 C6:10:2 A5:12:4","B5:0:8^1~ D6:8:4 G6:12:4/"],1);
  return S.done();}
/* DOKI DOKI TOYBOX - cute arenas: F major, 168 bpm bright pop-punk with crunchy guitars, glockenspiel + music box hooks */
function makeCute(T){const S=SB(T,16),{lead,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,mel,third,plain}=S;let b;
  const PK={k:"x.....x.x.......",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."},VS={k:"x.......x.x.....",s:"....x.......x...",h:"x.x.x.x.x.x.x.x.",sh:"..x...x...x...x."},
    CHD={k:"x.x...x.x.x...x.",s:"....x.......x...",o:"..x...x...x...x.",h:"x...x...x...x..."},BR={k:"x.......x.......",r:"....x.......x...",sh:"x.x.x.x.x.x.x.x."};
  b=sec("Intro",2,1);const IN=["C6:0:2 F6:2:2 A6:4:2 G6:6:2 F6:8:4 C6:12:4","D6:0:2 F6:2:2 Bb6:4:4 A6:8:2 G6:10:2 E6:12:4"];mel(b,IN,"mbox",.9);mel(b,IN,"glock",.35);
  drums(b,{sh:"x.x.x.x.x.x.x.x."},.8);drums(b+1,{sh:"x.x.x.x........."},.8);fill(b+1,"tom",.8);S.loop();
  const HK=["C6:0:4 A5:4:2 C6:6:2 F6:8:6 E6:14:2","E6:0:4 D6:4:2 C6:6:2 G5:8:8~","D6:0:4 C6:4:2 D6:6:2 F6:8:6^2 E6:14:2","D6:0:4 C6:4:4 Bb5:8:8~",
    "C6:0:4 A5:4:2 C6:6:2 F6:8:6 G6:14:2","A6:0:4 G6:4:2 E6:6:2 C6:8:8","D6:0:4 F6:4:4 Bb6:8:4^2 A6:12:4","G6:0:12~ E6:12:2 C6:14:2"];
  b=sec("Riff",4,3);bars1(["F","C","Dm","Bb"]).forEach((cs,i)=>{rhythm(b+i,cs,"O.o.o.o.O.o.o.oo",.95);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.9);drums(b+i,PK,1,i===3);});
  hit(b,0,"x",1.2);fill(b+3,"s",.85);const RH=["C6:0:4 A5:4:2 C6:6:2 F6:8:6 E6:14:2","E6:0:4 D6:4:2 C6:6:2 G5:8:8","D6:0:4 C6:4:2 D6:6:2 F6:8:6 E6:14:2","D6:0:8 C6:8:4 Bb5:12:4"];
  lead(b,RH,.9);mel(b,plain(RH),"glock",.3,12);
  b=sec("Verse",8,1);const VM=["A5:0:2 A5:2:2 C6:4:2 A5:6:2 G5:8:4 F5:12:4","E5:0:2 G5:2:2 C6:4:4 D6:8:2 C6:10:2 G5:12:4","F5:0:2 A5:2:2 D6:4:2 C6:6:2 A5:8:4 F5:12:4","G5:0:4 F5:4:2 D5:6:2 F5:8:8",
    "A5:0:2 A5:2:2 C6:4:2 A5:6:2 G5:8:4 F5:12:4","E5:0:2 G5:2:2 C6:4:4 E6:8:4 D6:12:4","D6:0:2 C6:2:2 Bb5:4:2 A5:6:2 G5:8:4 F5:12:4","G5:0:12 C5:12:2 E5:14:2"];
  bars1(["F","C","Dm","Bb","F","C","Bb","C"]).forEach((cs,i)=>{rhythm(b+i,cs,"m.m.m.m.m.m.m.m.",.7);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.8);drums(b+i,VS,.8,i===7);});
  hit(b,0,"x",.8);fill(b+7,"s",.7);mel(b,VM,"glock",.5);mel(b,VM,"mbox",.75);
  b=sec("Build",4,2);bars1(["Dm","Bb","F","C"]).forEach((cs,i)=>{rhythm(b+i,cs,i<3?"o.o.o.o.o.o.o.o.":"O.O.O.O.oooooooo",.88);bass(b+i,cs,"x.x.x.x.x.x.x.x.",.88);pad(b+i,cs,"strings",.6+i*.1,57);
    drums(b+i,{k:"x...x...x...x...",s:i<2?"....x.......x...":i<3?"x.x.x.x.x.x.x.x.":"xxxxxxxxxxxxxxxx",sh:"x.x.x.x.x.x.x.x."},.76+i*.06);});
  hit(b,0,"x",.9);hit(b+2,0,"sw",.9,32);lead(b,["","","F5:0:4 G5:4:4 A5:8:8/","C6:0:16^2~"],.85);
  const chorus=two=>{const b=sec(two?"Chorus2":"Chorus",8,3);bars1(["F","C","Dm","Bb","F","C","Bb","C"]).forEach((cs,i)=>{rhythm(b+i,cs,"O.o.o.o.O.o.o.o.",1);bass(b+i,cs,"x.x.x.x.x.x.x.xo",.95);pad(b+i,cs,"strings",.7,57);
      drums(b+i,CHD,1,i===7);if(two||i%2===0)hit(b+i,0,"x",i?1:1.2);});
    fill(b+7,"tom",.95);lead(b,HK,1);mel(b,plain(HK),"glock",.32,12);if(two)lead(b,third(HK,SCL.f),.6,"lg2",.3);};
  chorus(false);
  b=sec("Bridge",8,1);bars1(["Bb","C","Am","Dm","Bb","C","Gm","C"]).forEach((cs,i)=>{arp(b+i,cs,"0.1.2.3.2.1.2.3.","cg",1,57,3);arp(b+i,cs,"..0...1...2...1.","marimba",.6,69);bass(b+i,cs,"x...x...x...x...",.8);
    if(i>=6)rhythm(b+i,cs,"o.o.o.o.o.o.o.o.",.8);drums(b+i,i<7?BR:{k:"x...x...x...x...",s:"x.x.x.x.xxxxxxxx",sh:"x.x.x.x.x.x.x.x."},.75);});
  mel(b,["D6:0:6 C6:6:2 Bb5:8:8","E6:0:6 D6:6:2 C6:8:8","C6:0:4 E6:4:4 A6:8:8","F6:0:8 D6:8:8","D6:0:6 C6:6:2 Bb5:8:4 D6:12:4","E6:0:4 F6:4:4 G6:8:8","Bb6:0:4 A6:4:4 G6:8:4 F6:12:4","E6:0:8 G6:8:8"],"flute",.9);
  chorus(true);return S.done();}
/* BLOOD MOON RITE - Nemesis Coliseum: B minor, 72 bpm. Slow, sad and dramatic: clean arpeggiated guitar, piano, strings,
   a crying lead with long bends, heavy slow power chords only at the climax. */
function makeDark(T){const S=SB(T,16),{lead,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,mel,third,plain,add}=S;let b;
  const AR="0-1-2-3-4-3-2-1-";
  b=sec("Intro",2,0);bars1(["Bm","G"]).forEach((cs,i)=>{arp(b+i,cs,AR,"cg",.85,54,6);pad(b+i,cs,"strings",.4+i*.15,54);bass(b+i,cs,"x---------------",.6,"lbass");});
  mel(b,["F#5:0:4 B5:4:4 A5:8:6 F#5:14:2","G5:0:8 E5:8:8"],"piano",.8);hit(b+1,0,"x",.35);S.loop();
  b=sec("Lament",4,0);bars1(["Bm","G","D","A"]).forEach((cs,i)=>{arp(b+i,cs,AR,"cg",.9,54,6);pad(b+i,cs,"strings",.5,54);bass(b+i,cs,"x---------------",.75,"lbass");});
  mel(b,["F#5:0:6 E5:6:2 D5:8:4 C#5:12:2 D5:14:2","B4:0:8 D5:8:4 E5:12:4","F#5:0:6 A5:6:2 G5:8:4 F#5:12:2 E5:14:2","E5:0:12 C#5:12:4"],"piano",1);
  b=sec("Cry",4,1);bars1(["Em","Bm","G","F#"]).forEach((cs,i)=>{arp(b+i,cs,AR,"cg",.8,54,6);pad(b+i,cs,"strings",.6,54);bass(b+i,cs,"x-------x-------",.8,"lbass");
    drums(b+i,{k:"x.........x.....",s:"........x.......",h:"x...x...x...x..."},.55);});
  lead(b,["B5:0:6^2~ G5:6:2 E5:8:4 F#5:12:4","D6:0:8^2~ C#6:8:2 B5:10:2 F#5:12:4","G5:0:4 A5:4:2 B5:6:2 D6:8:4^2 E6:12:4","C#6:0:12^2~ A#5:12:4"],.85);
  b=sec("Rise",4,2);bars1(["G","A","Bm","F#"]).forEach((cs,i)=>{arp(b+i,cs,AR,"cg",.8,54,6);pad(b+i,cs,"strings",.7+i*.1,55+i);if(i)pad(b+i,cs,"choir",.6+i*.1,59);bass(b+i,cs,"x-------x-------",.85,"lbass");
    if(i>=2)rhythm(b+i,cs,i===2?"O---------------":"O-------o-o-o-o-",.75);drums(b+i,{k:"x.......x.......",s:"........x.......",h:"x.x.x.x.x.x.x.x."},.62+i*.06,i===3);});
  for(let k=0;k<16;k+=2)add((b+2)*16+k,{i:"timp",m:35,l:2,v:.25+.03*k,p:0});fill(b+3,"tom",.9);hit(b,0,"x",.5);
  lead(b,["E6:0:6^2~ D6:6:2 C#6:8:4 D6:12:4","E6:0:4 F#6:4:4 A6:8:8^2~","F#6:0:16^2~","E6:0:4 C#6:4:4 A#5:8:8"],.9);
  const CL=["B5:0:4 C#6:4:2 D6:6:2 F#6:8:6^2~ E6:14:2","D6:0:4 B5:4:4 G6:8:8^2~","E6:0:4 F#6:4:2 G6:6:2 B6:8:4^2 A6:12:2 G6:14:2","F#6:0:8^1~ E6:8:2 C#6:10:2 A#5:12:4"];
  b=sec("Climax",4,3);bars1(["Bm","G","Em","F#"]).forEach((cs,i)=>{rhythm(b+i,cs,"O-------O---O---",1);bass(b+i,cs,"x.......x...x...",1,"rbass");pad(b+i,cs,"strings",1,54);pad(b+i,cs,"choir",.9,59);pad(b+i,cs,"piano",.5,50,8);
    drums(b+i,{k:"x.....x.x.......",s:"........X.......",rd:"x...x...x...x..."},.95,i===3);hit(b+i,0,"x",1.1);add((b+i)*16,{i:"timp",m:S.chd(cs[0]).b+12,l:2,v:.7,p:0});});
  fill(b+3,"tom",.85);lead(b,CL,1);lead(b,third(CL,SCL.bhm),.6,"lg2",.3);
  b=sec("Ashes",2,0);bars1(["Em","F#"]).forEach((cs,i)=>{arp(b+i,cs,AR,"cg",.75,54,6);pad(b+i,cs,"strings",.5,54);bass(b+i,cs,"x---------------",.7,"lbass");});
  mel(b,["G5:0:4 F#5:4:4 E5:8:8","F#5:0:8 E5:8:4 C#5:12:4"],"piano",.85);
  return S.done();}
/* KOPI BREAK - kopitiam / office arenas: G major, 92 bpm, laid-back swung guitar groove: clean jazzy comping, warm low-gain lead */
function makeChill(T){const S=SB(T,16),{lead,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,mel,third,plain,add,tones,chd}=S;let b;
  const comp=(bb,cs,pat,v,lo)=>{for(let k=0;k<16;k++){if(pat[k]!=="x")continue;let len=1;while(k+len<16&&pat[k+len]==="-")len++;const C=chd(cs[Math.min(cs.length-1,Math.floor(k*cs.length/16))]);for(const m of tones(C,lo))add(bb*16+k,{i:"cg",m,l:len,v:v*(k%4?.8:1),p:0});}};
  S.loop();const AC=bars1(["Gmaj7","Em7","Am7","D7","Cmaj7","Bm7","Am7","D7"]);
  const AM=["B4:0:3 D5:3:3 F#5:6:4 E5:10:2 D5:12:4","G5:0:6 F#5:6:2 E5:8:4 B4:12:4","C5:0:3 E5:3:3 G5:6:4 F#5:10:2 E5:12:4","F#5:0:8^2~ E5:8:2 D5:10:2 C5:12:4",
    "E5:0:3 G5:3:3 B5:6:4 A5:10:2 G5:12:4","F#5:0:6 D5:6:2 A5:8:8~","G5:0:3 E5:3:3 C5:6:2 E5:8:2 G5:10:2 A5:12:4","F#5:0:12^1~ D5:12:4"];
  b=sec("Groove",8,1);AC.forEach((cs,i)=>{comp(b+i,cs,"x--x--x---x--x--",.75,55);bass(b+i,cs,"x...f...o...f...",.85);pad(b+i,cs,"ep",.3,60);drums(b+i,{k:"x.......x.x.....",r:"....x.......x...",h:"x.x.x.x.x.x.x.x."},.72);});
  lead(b,AM,.8);
  b=sec("Lift",8,2);bars1(["Cmaj7","D7","Bm7","Em7","Am7","Bm7","Cmaj7","D7"]).forEach((cs,i)=>{rhythm(b+i,cs,"o-------o---o---",.6);comp(b+i,cs,"x-----x-----x---",.55,55);bass(b+i,cs,"x...f...o...f.x.",.88);pad(b+i,cs,"strings",.45,55);
    drums(b+i,{k:"x.......x.x.....",s:"....x.......x...",h:"x.x.x.x.x.x.x.x."},.8,i===7);});
  hit(b,0,"x",.8);fill(b+7,"s",.6);
  lead(b,["G5:0:4 B5:4:4 E6:8:6^2~ D6:14:2","C6:0:4 A5:4:4 F#5:8:8~","D6:0:4 B5:4:2 A5:6:2 F#5:8:4 A5:12:4","G5:0:12^2~ B5:12:4",
    "C6:0:4 B5:4:2 A5:6:2 E6:8:8^2~","D6:0:4 F#6:4:4 A6:8:8^2~","G6:0:4 E6:4:4 B5:8:4 C6:12:4","A5:0:8 F#5:8:4 D5:12:4"],.9);
  b=sec("Cafe",8,1);AC.forEach((cs,i)=>{arp(b+i,cs,"0.1.2.3.2.1.2.3.","cg",.75,55,3);bass(b+i,cs,"x...f...o...f...",.82);pad(b+i,cs,"ep",.3,60);drums(b+i,{k:"x.......x.x.....",br:"....x.......x...",rd:"x.x.x.x.x.x.x.x."},.7);});
  mel(b,plain(AM),"vibes",.85);lead(b,["","","","A5:8:2 B5:10:2 D6:12:4^2","","","","B5:4:2 A5:6:2 F#5:8:4 D5:12:4"],.75);
  return S.done();}
/* MOONLIT ARCANA - magician / theatre arenas: D minor, 6/8 (12 sixteenths per bar), dotted-quarter 64 - mystic symphonic rock:
   harp + clean guitar arpeggios, flute, choir, then a rolling 6/8 guitar section and a twin-lead choir climax */
function makeMystic(T){const S=SB(T,12),{lead,rhythm,riff,bass,pad,arp,drums,fill,hit,sec,mel,third,plain,add}=S;let b;
  const HA="0.1.2.3.2.1.",CA="0-1-2-3-2-1-",CALM={tl:"x.....x.....",sh:"..x.x...x.x."};
  b=sec("Intro",2,0);bars1(["Dm","A"]).forEach((cs,i)=>{arp(b+i,cs,HA,"harp",.75,57);pad(b+i,cs,"choir",.5,57);bass(b+i,cs,"x-----------",.6,"lbass");drums(b+i,{tl:"x.....x....."},.6);});S.loop();
  b=sec("Omen",8,1);bars1(["Dm","Bb","Gm","A","Dm","F","C","A"]).forEach((cs,i)=>{arp(b+i,cs,HA,"harp",.65,57);arp(b+i,cs,CA,"cg",.7,50,4);pad(b+i,cs,"choir",.5,57);bass(b+i,cs,"x-----x-----",.7,"lbass");drums(b+i,CALM,.7);});
  mel(b,["A5:0:4 F5:4:2 D5:6:4 E5:10:2","F5:0:6 D5:6:6","G5:0:4 A5:4:2 Bb5:6:4 A5:10:2","C#5:0:6 E5:6:6","A5:0:4 F5:4:2 D6:6:4 C6:10:2","A5:0:6 F5:6:4 G5:10:2","E5:0:4 G5:4:2 C6:6:4 Bb5:10:2","A5:0:12"],"flute",.9);
  b=sec("Ride",8,2);bars1(["Bb","C","Dm","Am","Gm","A","Dm","A"]).forEach((cs,i)=>{rhythm(b+i,cs,"O-m-m-o-m-m-",.88);bass(b+i,cs,"x.x.x.x.x.x.",.88,"rbass");pad(b+i,cs,"strings",.6,55);drums(b+i,{k:"x.....x.x...",s:"......x.....",h:"x.x.x.x.x.x."},.9,i===7);});
  hit(b,0,"x",1.1);hit(b+4,0,"x",.9);fill(b+7,"tom",.9);
  lead(b,["D6:0:4 C6:4:2 Bb5:6:4 F5:10:2","E6:0:4 D6:4:2 C6:6:4 G5:10:2","F6:0:6^2~ E6:6:2 D6:8:2 A5:10:2","C6:0:6 E6:6:6~","D6:0:4 Bb5:4:2 G5:6:4 Bb5:10:2","C#6:0:4 E6:4:2 A6:6:6^2~","F6:0:4 E6:4:2 D6:6:4 C#6:10:2","E6:0:12^2~"],.92);
  const CL=["A5:0:2 D6:2:2 F6:4:2 E6:6:4 D6:10:2","F6:0:6 D6:6:4 Bb5:10:2","C6:0:2 F6:2:2 A6:4:2 G6:6:4 F6:10:2","E6:0:6^2~ C6:6:6","D6:0:2 G6:2:2 Bb6:4:2 A6:6:4 G6:10:2","F6:0:4 G6:4:2 F6:6:4 D6:10:2","E6:0:6 C#6:6:4 E6:10:2","A6:0:12^2~"];
  b=sec("Arcana",8,3);bars1(["Dm","Bb","F","C","Gm","Bb","A","A"]).forEach((cs,i)=>{rhythm(b+i,cs,"O-----o-----",1);bass(b+i,cs,"x.....x.x...",1,"rbass");pad(b+i,cs,"choir",.9,57);pad(b+i,cs,"strings",.7,52);
    drums(b+i,{k:"x.x...x.x...",s:"......x.....",rd:"x.x.x.x.x.x."},1,i===7);if(i%2===0)hit(b+i,0,"x",i?1:1.2);add((b+i)*12,{i:"timp",m:S.chd(cs[0]).b+12,l:2,v:.6,p:0});});
  fill(b+7,"tom",1);lead(b,CL,1);lead(b,third(CL,SCL.dhm),.6,"lg2",.3);
  b=sec("Moonfall",8,1);bars1(["Dm","Bb","Gm","A","Dm","Bb","Gm","A"]).forEach((cs,i)=>{arp(b+i,cs,HA,"harp",.7,57);arp(b+i,cs,CA,"cg",.7,50,4);pad(b+i,cs,"choir",.45,57);bass(b+i,cs,"x-----x-----",.7,"lbass");drums(b+i,CALM,.6);});
  mel(b,["D6:0:6 C6:6:6","Bb5:0:6 A5:6:6","G5:0:4 A5:4:2 Bb5:6:6","A5:0:12","D6:0:4 E6:4:2 F6:6:6","G6:0:6 F6:6:6","E6:0:4 D6:4:2 Bb5:6:6","C#6:0:12"],"violin",.9);
  return S.done();}

/* ---------- the nine themes (original) ---------- */
const TR={
 /* v9c: epic rock rewrite of the main menu theme (score built by makeMenuEpic above; other tracks unchanged) */
 menu:{gain:1,name:"Chronicles Overture",style:"epic J-rock guitar anthem",bpm:150,key:64,keyName:"E major (E minor riff)",sc:MAJ,seed:101,make:makeMenuEpic,glue:true},
 /* v9d: the other eight themes rewritten in the same guitar-rock engine (scores built by make* above; all original) */
 duel:{gain:1,name:"Duel Standby",style:"driving battle rock",bpm:140,key:66,keyName:"F# minor",make:makeDuel,glue:true,
  rgc:{drive:6.5,cab:4300,lvl:.2},lgc:{lc:{drive:6,curve:[3,.12],tone:2400,cab:4200,lvl:.26,rev:.28,dl:.16,vd:12},lg2:{lvl:.14}}},
 heroic:{gain:1,name:"Banner of the Dawn",style:"heroic power-metal march",bpm:108,key:70,keyName:"Bb major",make:makeHeroic,glue:true,
  rgc:{drive:6.5,cab:4400,lvl:.2},lgc:{all:{dl:.28,rev:.34},lg2:{dl:.28,rev:.34,lvl:.14}}},
 fire:{gain:1,dv:.8,name:"Ember Lair",style:"dragon thrash metal",bpm:168,key:57,keyName:"A Phrygian dominant",make:makeFire,glue:true,glo:33,blo:30,
  rgc:{drive:9,curve:[5.5,.1],hp:70,eq:[[100,.9,3],[520,.9,-6],[2300,1.1,4]],cab:4200,lvl:.18},lgc:{all:{drive:18,cab:5000},lg2:{drive:18,cab:5000,lvl:.13}}},
 tech:{gain:1,name:"Neon Circuit",style:"synthwave cyber-rock",bpm:126,key:60,keyName:"C Dorian",make:makeTech,glue:true,
  rgc:{drive:8,curve:[5,.1],cab:4400,lvl:.2,og:[1,.85,.5]},lgc:{all:{drive:15,dl:.3,lvl:.215}}},
 cute:{gain:1,dv:.86,name:"Doki Doki Toybox",style:"cute pop-punk toy box",bpm:168,key:65,keyName:"F major",make:makeCute,glue:true,
  rgc:{drive:4,curve:[3,.08],eq:[[150,.9,1],[600,.9,-2],[2800,1,3]],cab:5400,lvl:.17,rev:.12},
  lgc:{all:{drive:8,curve:[3.5,.12],tone:3600,cab:5600,lvl:.22,rev:.3,dl:.2},lg2:{drive:8,curve:[3.5,.12],tone:3600,cab:5600,lvl:.15,rev:.3,dl:.2}}},
 dark:{gain:1.08,name:"Blood Moon Rite",style:"sad dramatic guitar ballad",bpm:72,key:59,keyName:"B minor",make:makeDark,glue:true,
  rgc:{drive:7.5,cab:4000,lvl:.2,rev:.18},cgc:{drive:2.2,cd:2,lvl:.4,v:.15},
  lgc:{all:{drive:8,curve:[3.5,.15],tone:2500,cab:4300,lvl:.25,rev:.45,dl:.32,vib:5,vd:22,vw:40},lg2:{drive:8,curve:[3.5,.15],tone:2300,cab:4100,lvl:.17,rev:.45,dl:.3,vib:4.8,vd:20,vw:36}}},
 chill:{gain:1,name:"Kopi Break",style:"laid-back guitar groove",bpm:92,key:55,keyName:"G major",make:makeChill,glue:true,swing:.3,binst:"upright",
  rgc:{drive:4,curve:[3,.08],cab:4000,lvl:.16,rev:.15},cgc:{drive:1.3,cd:1.4,lvl:.42,v:.14},
  lgc:{all:{drive:5,curve:[2.6,.1],tone:2000,cab:3800,lvl:.24,rev:.4,dl:.25,vib:5.2,vd:14,vw:28}}},
 mystic:{gain:1.12,name:"Moonlit Arcana",style:"mystic symphonic rock in 6/8",bpm:96,key:62,keyName:"D minor (6/8)",make:makeMystic,glue:true,spb:12,
  rgc:{drive:7,cab:4500,lvl:.2},cgc:{drive:1.8,lvl:.4,v:.14},lgc:{all:{drive:12,rev:.42,dl:.3},lg2:{drive:12,rev:.42,dl:.3,lvl:.14}}}};
const ARENA_TRACK={castle:"heroic",forest:"heroic",dragon_lair:"fire",machine_world:"tech",robot_hangar:"tech",racetrack:"tech",hobby_con:"tech",stadium:"duel",
  magician_room:"mystic",silent_theatre:"mystic",fairy_lake:"cute",idol_stage:"cute",toy_town:"cute",cat_cafe:"cute",nemesis_coliseum:"dark",kopitiam:"chill",cubicle_hell:"chill"};
const inSec=(L,n,e)=>L.only?L.only.includes(n):(e>=(L.emin||0)&&e<=(L.emax==null?9:L.emax));
function compose(T){if(T.score)return T.score;if(T.make){T.score=T.make(T);return T.score;}const by=[];const add=(s,e)=>{(by[s]=by[s]||[]).push(e);};const mel={};
  for(const n in T.S){const S=T.S[n];S.ch=S.p.split(/\s+/).map(parseChord);}
  const secs=T.form.map(n=>({n,S:T.S[n]}));T.loopStep=secs[0].S.intro?secs[0].S.ch.length*16:0;let bar=0;T.secs=[];const dv=T.dv||1;
  secs.forEach((X,si)=>{const S=X.S,n=S.ch.length,e=S.e,s0=bar*16;T.secs.push({n:X.n,bar,bars:n,e});
    const nextS=si+1<secs.length?secs[si+1].S:secs[T.loopStep?1:0].S;
    for(let b=0;b<n;b++){const ch=S.ch[b],t0=(bar+b)*16,nextCh=b+1<n?S.ch[b+1]:nextS.ch[0],lastBar=b===n-1;
      for(const Ly of T.L){if(!inSec(Ly,X.n,e))continue;const pat=Ly.pat,P=pat.length;
        for(let k=0;k<16;k++){const c=pat[(b*16+k)%P];if(c==="."||c==="-")continue;let len=1;while(k+len<16&&pat[(b*16+k+len)%P]==="-")len++;if(Ly.len)len=Ly.len;
          let notes;if(Ly.chord==="power")notes=[powerRoot(T,ch)];else if(Ly.chord==="root")notes=[bassRoot(T,ch)+(Ly.oct||0)];
          else{const v=voicing(T,ch,T.key-5+(Ly.oct||0),T.key+9+(Ly.oct||0));if(Ly.chord==="arp"&&c>="0"&&c<="9"){const ex=v.concat(v.map(x=>x+12));notes=[ex[(+c)%ex.length]];}else notes=v;}
          const acc=k%4===0?1:.85;notes.forEach((m,i)=>add(t0+k,{i:Ly.inst,m,l:len,v:(Ly.v||1)*acc,p:notes.length>1?(i/(notes.length-1)-.5)*.7:(Ly.p||0)}));}}
      const bp=T.bass.pat[e]||T.bass.pat[1]||"x---------------";
      for(let k=0;k<16;k++){const c=bp[k];if(c==="."||c==="-")continue;let len=1;while(k+len<16&&bp[k+len]==="-")len++;const r=bassRoot(T,ch);
        const m=c==="o"?r+12:c==="f"?r+7:c==="t"?r+ch.iv[1]:c==="a"?bassRoot(T,nextCh)-1:r;add(t0+k,{i:T.bass.inst,m,l:len,v:k%4===0?1:.85});}
      const Dp=T.dr[e];const fill=lastBar&&e>=1&&T.fill!==false;
      if(Dp)for(const key in Dp){const pat=Dp[key],P=pat.length;for(let k=0;k<16;k++){const c=pat[(b*16+k)%P];if(c===".")continue;if(fill&&k>=12&&key!=="k")continue;
        const hv=(key==="h"||key==="sh"||key==="rd"||key==="o")?(T.hatv||1)*(k%4===0?1:k%2===0?.8:.6):1;add(t0+k,{d:key,v:dv*hv*(c==="X"?1.25:1)});}}
      if(fill){const f=T.fill||"s";for(let k=12;k<16;k++)add(t0+k,{d:f==="tom"?(k<14?"tt":"tl"):"s",v:dv*(.55+.12*(k-12))});}
      if(b===0&&(e>=2||(T.crashAll&&e>=1)))add(t0,{d:"x",v:dv});
      if(T.swells&&lastBar&&nextS.e>=1)add(t0+8,{d:"sw",v:dv,l:8});}
    if(S.mel!==false&&T.lead){const mk=S.melFrom||X.n;const ml=mel[mk]||(mel[mk]=genMel(T,T.S[mk],mk));
      for(const ld of T.lead){if(!inSec(ld,X.n,e))continue;for(const q of ml)if(q.s<n*16)add(s0+q.s,{i:ld.inst,m:q.m+(ld.oct||0),l:q.l,v:q.v*(ld.v||1),p:ld.p||0});}}
    bar+=n;});
  T.steps=bar*16;for(let i=0;i<T.steps;i++)by[i]=by[i]||[];T.score=by;return by;}
function playStep(c,R,T,step,t){const sd=60/T.bpm/4,list=compose(T)[step];if(!list)return;
  const sw=T.swing?(step%4===2?sd*T.swing:step%2===1?sd*T.swing*.5:0):0;const tt=t+sw;
  for(const e of list){try{if(e.d)D2[e.d](c,R,tt,e.v,e.l?e.l*sd:0);else M[e.i](c,R,tt,e.m,e.l*sd*.95,e.v,e.p,e);}catch(err){}}}
const trackSecs=name=>{const T=TR[name];compose(T);return T.steps*60/T.bpm/4;};
/* ---------- jingles / stingers (one-shot, routed through the SFX reverb) ---------- */
const JG={
 victory:(c,R,t)=>{const N=[[67,0,.13],[72,.13,.13],[76,.26,.13],[79,.39,.42],[77,.84,.13],[79,1.0,1.5]];for(const[m,s,d]of N){M.brass(c,R,t+s,m,d,1.3,0);M.ssaw(c,R,t+s,m+12,d,.6,0);gOne(c,R,t+s,[m],d+.04,1,{lvl:.1,drive:12,p:.15,bend:s===.39?2:0,vib:s===1.0?22:0});}
   gOne(c,R,t+1.0,[48,55,60],1.45,1,{lvl:.15});for(let i=0;i<6;i++)D2.tt(c,R,t+i*.065,.5+i*.08);D2.k(c,R,t+1.0,1);D2.x(c,R,t+1.0,1.2);D2.timp(c,R,t+1.0,1);
   for(const[i,m]of[60,64,67,72].entries()){M.strings(c,R,t+1.0,m,1.7,1.4,(i-1.5)*.4);M.brass(c,R,t+1.0,m-12,1.4,.6,(i-1.5)*.3);}M.lbass(c,R,t+1.0,36,1.6,1);
   for(let i=0;i<7;i++)M.glock(c,R,t+1.15+i*.08,84+[0,4,7,12,16,19,24][i],.2,.6,(i-3)*.15);},
 defeat:(c,R,t)=>{const N=[[69,0,.45],[67,.5,.45],[65,1.0,.45],[64,1.5,1.6]];for(const[m,s,d]of N){M.piano(c,R,t+s,m,d,1.2,0);M.violin(c,R,t+s,m-12,d,.6,0);gOne(c,R,t+s,[m],d,1,{lvl:.085,drive:6,p:.2,bend:s===1.5?1:0,vib:s===1.5?28:0,rv:.4});}gOne(c,R,t+1.5,[38,45,50],1.8,.8,{lvl:.08,drive:5});
   for(const[i,m]of[50,53,57,62].entries())M.strings(c,R,t+1.5,m,2,1.3,(i-1.5)*.4);M.lbass(c,R,t+1.5,38,2,1);M.timp(c,R,t+1.5,38,1,1);D2.x(c,R,t+1.5,.5);},
 ace:(c,R,t)=>{D2.sw(c,R,t,1,1.0);D2.b(c,R,t+1.0,1);for(let i=0;i<8;i++)D2.tl(c,R,t+i*.11,.3+i*.07);
   for(const[i,m]of[62,66,69,74].entries()){M.choir(c,R,t+.4,m,1.8,1.2,(i-1.5)*.4);M.brass(c,R,t+1.0,m-12,1.2,1.1,(i-1.5)*.3);}gOne(c,R,t+1.0,[38,45,50],1.2,1,{lvl:.16});gOne(c,R,t+1.0,[86],.9,.8,{lvl:.07,bend:2,vib:30,p:.25,rv:.35});D2.k(c,R,t+1.0,1.2);D2.x(c,R,t+1.0,1.3);M.timp(c,R,t+1.0,38,1,1);},
 duelstart:(c,R,t)=>{for(const[m,s,d]of[[60,0,.11],[60,.14,.11],[67,.28,.6]]){M.brass(c,R,t+s,m,d,1.2,-.2);M.brass(c,R,t+s,m+7,d,.9,.2);gOne(c,R,t+s,[m-24,m-17,m-12],d+.04,.9,{lvl:.15});D2.k(c,R,t+s,.9);}D2.x(c,R,t+.28,1.1);D2.sw(c,R,t-.0,.6,.28);},
 coin:(c,R,t)=>{M.glock(c,R,t,96,.2,6,-.2);M.glock(c,R,t+.12,103,.3,6,.2);M.mbox(c,R,t+.12,91,.3,3,0);}};
M.timp2=M.timp;D2.timp=(c,R,t,v)=>M.timp(c,R,t,36,1,v);
/* ---------- sound effects ---------- */
const SFX={
 click:(c,o,t)=>tone(c,o,t,1250,.025,{type:"square",v:.05,lp:3000,d:.02,s:.0001,r:.02}),
 hover:(c,o,t)=>tone(c,o,t,2300,.012,{type:"sine",v:.018,d:.01,s:.0001,r:.01}),
 draw:(c,o,t)=>{noise(c,o,t,.11,{ft:"bandpass",f:1800,fEnd:5200,q:1.5,v:.16,a:.01,d:.1});tone(c,o,t+.06,1500,.03,{type:"triangle",v:.04,d:.03,s:.0001});},
 summon:(c,o,t)=>{DR.k(c,o,t,.7);tone(c,o,t,260,.28,{type:"triangle",slide:880,slideT:.25,v:.16,d:.3,s:.5,r:.1});for(let i=0;i<4;i++)INST.bell(c,o,t+.18+i*.05,84+[0,4,7,12][i],.15,.45);noise(c,o,t,.3,{ft:"highpass",f:6000,v:.05,a:.05});},
 tribute:(c,o,t)=>{noise(c,o,t,.35,{ft:"bandpass",f:4000,fEnd:300,q:2,v:.18,a:.02,d:.3});for(const m of [50,57,62])INST.choir(c,o,t+.1,m,.5,1.4);SFX.summon(c,o,t+.38);},
 set:(c,o,t)=>{tone(c,o,t,130,.12,{type:"sine",slide:55,v:.32,d:.12,s:.0001,r:.05});noise(c,o,t,.07,{ft:"lowpass",f:500,v:.18,d:.05});},
 flip:(c,o,t)=>{noise(c,o,t,.08,{ft:"bandpass",f:2500,fEnd:6000,q:1.2,v:.12,d:.07});tone(c,o,t+.06,880,.05,{type:"triangle",v:.08,slide:1320,d:.05,s:.0001});},
 spell:(c,o,t)=>{for(let i=0;i<5;i++)INST.bell(c,o,t+i*.055,76+[0,4,7,11,14][i],.3,.9);noise(c,o,t,.45,{ft:"highpass",f:7000,v:.05,a:.1,d:.3});tone(c,o,t,440,.4,{type:"sine",slide:880,v:.05,a:.05,d:.3,s:.4});},
 trap:(c,o,t)=>{tone(c,o,t,233,.35,{type:"sawtooth",v:.09,lp:1800,d:.3,s:.4,r:.1});tone(c,o,t,247,.35,{type:"sawtooth",v:.09,lp:1800,d:.3,s:.4,r:.1});tone(c,o,t+.12,466,.3,{type:"square",v:.05,lp:2000,d:.2,s:.3});noise(c,o,t,.2,{ft:"bandpass",f:1200,v:.15,d:.15});DR.k(c,o,t,.6);},
 quick:(c,o,t)=>{tone(c,o,t,2200,.09,{type:"square",slide:180,slideT:.09,v:.08,lp:5000,d:.08,s:.3,r:.02});tone(c,o,t+.07,1760,.05,{type:"pulse",v:.07,d:.04,s:.0001});tone(c,o,t+.12,2637,.06,{type:"pulse",v:.06,d:.05,s:.0001});noise(c,o,t,.06,{ft:"highpass",f:5000,v:.1,d:.05});},
 powerup:(c,o,t)=>{tone(c,o,t,180,.45,{type:"sawtooth",slide:1300,slideT:.42,v:.08,lp:800,lpEnd:4000,lpT:.4,q:4,d:.4,s:.8,r:.06});for(let i=0;i<3;i++)INST.bell(c,o,t+.38+i*.06,84+[0,7,12][i],.2,.6);},
 attack:(c,o,t)=>{noise(c,o,t,.22,{ft:"bandpass",f:500,fEnd:3500,q:1.4,v:.26,a:.06,d:.15,s:.3});},
 hit:(c,o,t)=>{DR.k(c,o,t,1);noise(c,o,t,.16,{ft:"lowpass",f:2200,v:.35,d:.1});tone(c,o,t,90,.15,{type:"square",slide:50,v:.08,lp:600,d:.1,s:.0001});},
 direct:(c,o,t)=>{DR.b(c,o,t,1);noise(c,o,t,.3,{ft:"lowpass",f:3000,v:.38,d:.2});tone(c,o,t,70,.4,{type:"sawtooth",slide:35,v:.12,lp:400,d:.3,s:.0001});},
 destroy:(c,o,t)=>{noise(c,o,t,.45,{ft:"highpass",f:3000,v:.22,d:.3});const r=rng(Math.floor(t*1000));for(let i=0;i<7;i++)tone(c,o,t+r()*.25,1800+r()*4200,.08,{type:"sine",v:.05,d:.08,s:.0001,r:.05});DR.t(c,o,t,.6);},
 destroyST:(c,o,t)=>{noise(c,o,t,.25,{ft:"highpass",f:4000,v:.16,d:.18});for(let i=0;i<4;i++)tone(c,o,t+i*.04,2600+i*500,.06,{type:"sine",v:.04,d:.06,s:.0001});},
 damage:(c,o,t,n)=>{n=Math.max(3,Math.min(14,n||8));for(let i=0;i<n;i++)tone(c,o,t+i*.045,980-i*25,.025,{type:"square",v:.04,lp:2500,d:.02,s:.0001,r:.01});},
 heal:(c,o,t)=>{for(let i=0;i<4;i++)INST.bell(c,o,t+i*.08,79+[0,4,7,12][i],.35,.9);noise(c,o,t,.5,{ft:"highpass",f:8000,v:.04,a:.15,d:.3});},
 phase:(c,o,t)=>{tone(c,o,t,660,.05,{type:"triangle",v:.09,d:.05,s:.0001});tone(c,o,t+.07,990,.07,{type:"triangle",v:.09,d:.06,s:.0001});},
 turn:(c,o,t)=>{for(const m of [72,76,79])INST.bell(c,o,t,m,.5,.6);tone(c,o,t,262,.5,{type:"triangle",v:.06,a:.05,d:.4,s:.5});},
 snap:(c,o,t)=>tone(c,o,t,620,.09,{type:"square",slide:240,v:.06,lp:2000,d:.08,s:.0001}),
 pickup:(c,o,t)=>tone(c,o,t,480,.06,{type:"sine",slide:820,v:.09,d:.06,s:.0001}),
 drop:(c,o,t)=>{tone(c,o,t,210,.08,{type:"sine",slide:120,v:.16,d:.07,s:.0001});noise(c,o,t,.04,{ft:"lowpass",f:900,v:.08,d:.03});},
 alert:(c,o,t)=>{for(let i=0;i<2;i++){tone(c,o,t+i*.16,880,.07,{type:"square",v:.06,lp:3000,d:.06,s:.5});tone(c,o,t+i*.16+.075,1175,.07,{type:"square",v:.06,lp:3000,d:.06,s:.5});}},
 fusion:(c,o,t)=>{noise(c,o,t,.9,{ft:"bandpass",f:200,fEnd:5000,q:3,v:.16,a:.8,d:.1,s:1});tone(c,o,t,110,.9,{type:"sawtooth",slide:880,slideT:.9,v:.06,lp:600,lpEnd:3000,lpT:.9});for(const m of [55,62,67,71])INST.choir(c,o,t+.5,m,.9,1.6);DR.b(c,o,t+.9,1);for(let i=0;i<6;i++)INST.bell(c,o,t+.95+i*.05,86+[0,4,7,12,16,19][i],.2,.6);},
 duelstart:(c,o,t)=>JG.duelstart(c,sfxRoute(c,o),t), coin:(c,o,t)=>JG.coin(c,sfxRoute(c,o),t), ace:(c,o,t)=>JG.ace(c,sfxRoute(c,o),t), victory:(c,o,t)=>JG.victory(c,sfxRoute(c,o),t), defeat:(c,o,t)=>JG.defeat(c,sfxRoute(c,o),t)};
/* ---------- engine ---------- */
let master,musicBus,sfxBus,sfxIn,musicRev,timer=null;const live=[];const RSM=new WeakMap();
function sfxRoute(c,o){let r=RSM.get(c);if(!r){const lim=c.createDynamicsCompressor();lim.threshold.value=-9;lim.knee.value=2;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.12;lim.connect(o);const cv=c.createConvolver();cv.buffer=impulse(c,2.2,3);cv.connect(lim);r=mkRoute(c,lim,cv,120,{glue:true});r.g.gain.value=.95;RSM.set(c,r);}return r;}
function build(){const C=window.AudioContext||window.webkitAudioContext;let c;try{c=new C({latencyHint:"playback",sampleRate:44100});}catch(e){c=new C();}A.ctx=c;
  const comp=c.createDynamicsCompressor();comp.threshold.value=-10;comp.ratio.value=4;comp.attack.value=.004;comp.release.value=.2;
  master=c.createGain();musicBus=c.createGain();sfxBus=c.createGain();
  const mc=c.createDynamicsCompressor();mc.threshold.value=-20;mc.ratio.value=2.5;mc.attack.value=.01;mc.release.value=.25;mc.knee.value=8;
  musicBus.connect(mc);mc.connect(master);sfxBus.connect(master);master.connect(comp);comp.connect(c.destination);
  musicRev=c.createConvolver();musicRev.buffer=impulse(c,2.6,3);const rr=c.createGain();rr.gain.value=.9;musicRev.connect(rr);rr.connect(musicBus);
  sfxIn=c.createGain();sfxIn.connect(sfxBus);const ss=c.createGain();ss.gain.value=.12;sfxIn.connect(ss);ss.connect(sfxRoute(c,sfxBus).rev);
  applyVol(true);timer=setInterval(tick,25);
  document.addEventListener("visibilitychange",()=>{if(!A.ctx)return;if(document.hidden)A.ctx.suspend().catch(()=>{});else if(A.unlocked)A.ctx.resume().catch(()=>{});});}
function duckLevel(){let v=1;for(const k in A.ducks)v=Math.min(v,A.ducks[k]);return v;}
function applyVol(now){if(!A.ctx)return;const t=A.ctx.currentTime,tc=now?.001:.12;
  master.gain.setTargetAtTime(set.mute?0:1,t,tc);musicBus.gain.setTargetAtTime(set.music*.9*duckLevel(),t,tc*2);sfxBus.gain.setTargetAtTime(set.sfx,t,tc);}
const LOOK=.22;
function tick(){if(!A.ctx||A.ctx.state!=="running")return;const now=A.ctx.currentTime;
  for(let i=live.length-1;i>=0;i--){const L=live[i];if(L.dead&&now>L.endAt){try{for(const s of L.R.srcs)s.stop();L.R.g.disconnect();L.R.rev.disconnect();L.R.din.disconnect();L.R.fbk.disconnect();}catch(e){}live.splice(i,1);continue;}
    const sd=60/L.T.bpm/4;if(L.next<now-.3){A.stalls=(A.stalls||0)+1;L.next=now+.05;} // recover after a stall (tab throttled / heavy frame)
    while(L.next<now+LOOK){if(!L.dead||L.next<L.endAt)playStep(A.ctx,L.R,L.T,L.step,L.next);L.step++;if(L.step>=L.T.steps)L.step=L.T.loopStep;L.next+=sd;}}}
function fadeOut(L,t,fade){L.dead=true;L.endAt=t+fade+.3;L.R.g.gain.setTargetAtTime(0.0001,t,fade/3);L.R.rev.gain.setTargetAtTime(0.0001,t,fade/3);}
function startTrack(name,fade){if(!A.ctx||A.cur===name)return;const T=TR[name];if(!T)return;fade=fade==null?1.6:fade;const c=A.ctx,t=c.currentTime;
  for(const L of live)if(!L.dead)fadeOut(L,t,fade);compose(T);
  const R=mkRoute(c,musicBus,musicRev,T.bpm,T);R.g.gain.setValueAtTime(0.0001,t);R.g.gain.setTargetAtTime(T.gain||1,t,fade/4);
  live.push({T,R,step:0,next:t+.08,dead:false});A.cur=name;}
function stopMusic(fade){if(!A.ctx)return;const t=A.ctx.currentTime;fade=fade==null?.8:fade;for(const L of live)if(!L.dead)fadeOut(L,t,fade);A.cur=null;}
A.music=name=>{A.want=name;if(!A.ctx||!A.unlocked)return;try{name?startTrack(name):stopMusic();}catch(e){A.err=String(e);}};
A.trackFor=arena=>ARENA_TRACK[arena]||"duel";
const last={};
A.play=(name,arg)=>{A.counts[name]=(A.counts[name]||0)+1;if(A.log.length<4000)A.log.push(name);
  if(!A.ctx||!A.unlocked||set.mute||set.sfx<=0||A.ctx.state!=="running")return;
  const now=performance.now();if(last[name]&&now-last[name]<(name==="hover"?60:35))return;last[name]=now;
  try{SFX[name](A.ctx,sfxIn,A.ctx.currentTime+.005,arg);}catch(e){A.err=String(e);}};
A.duckLevel=()=>duckLevel();
A.duck=(id,level)=>{if(level==null||level>=1)delete A.ducks[id];else A.ducks[id]=level;applyVol();};
A.unlock=()=>{if(!A.ok)return;try{if(!A.ctx)build();if(A.ctx.state!=="running")A.ctx.resume().then(()=>{A.unlocked=true;if(A.want&&!A.cur)A.music(A.want);}).catch(()=>{});else A.unlocked=true;
  A.unlocked=true;if(A.want&&!A.cur)A.music(A.want);}catch(e){A.ok=false;A.err=String(e);}};
A.setVol=(k,v)=>{if(k==="mute")set.mute=!!v;else set[k]=Math.max(0,Math.min(1,+v));save();applyVol();if(typeof updSpeaker==="function")updSpeaker();};
A.TR=TR;A.SFX=SFX;A.JG=JG;A.ARENA_TRACK=ARENA_TRACK;A.playStep=playStep;A.compose=compose;A.trackSecs=trackSecs;A.liveCount=()=>live.length;
/* offline renderer for previews: kind "music" (secs<=0 => intro + one full loop), "sfx" (array of names) or a jingle name; returns 16-bit stereo WAV base64 */
A.renderWav=async(kind,name,secs)=>{const sr=44100;const full=kind==="music"&&!(secs>0);if(full)secs=trackSecs(name)+3;
  const c=new OfflineAudioContext(2,Math.ceil(sr*secs),sr);
  const comp=c.createDynamicsCompressor();comp.threshold.value=-10;comp.ratio.value=4;comp.attack.value=.004;comp.release.value=.2;comp.connect(c.destination);
  const g=c.createGain();g.gain.value=kind==="music"?.9*.7:1;
  if(kind==="music"){const mc=c.createDynamicsCompressor();mc.threshold.value=-20;mc.ratio.value=2.5;mc.attack.value=.01;mc.release.value=.25;mc.knee.value=8;g.connect(mc);mc.connect(comp);
    const rv=c.createConvolver();rv.buffer=impulse(c,2.6,3);const rr=c.createGain();rr.gain.value=.9;rv.connect(rr);rr.connect(g);
    const T=TR[name],sd=60/T.bpm/4;compose(T);const R=mkRoute(c,g,rv,T.bpm,T);R.g.gain.value=T.gain||1;let step=0;
    const endT=full?trackSecs(name)+.05:secs-2.5;for(let t=.05;t<endT;t+=sd){playStep(c,R,T,step,t);step++;if(step>=T.steps)step=T.loopStep;}
    if(!full){R.g.gain.setValueAtTime(T.gain||1,secs-2.5);R.g.gain.linearRampToValueAtTime(0,secs-.2);}}
  else{g.connect(comp);const si=c.createGain();si.connect(g);const ss=c.createGain();ss.gain.value=.12;si.connect(ss);ss.connect(sfxRoute(c,g).rev);
    if(kind==="sfx"){let t=.3;for(const nm of name){SFX[nm](c,si,t);t+=nm==="fusion"||nm==="ace"?2.6:nm==="victory"||nm==="defeat"?3.6:nm==="tribute"?1.1:.75;}}
    else JG[name](c,sfxRoute(c,g),.1);}
  const buf=await c.startRendering();const L=buf.getChannelData(0),Rr=buf.getChannelData(1),N=L.length;
  const ab=new ArrayBuffer(44+N*4),dv=new DataView(ab);const ws=(o,s)=>{for(let i=0;i<s.length;i++)dv.setUint8(o+i,s.charCodeAt(i));};
  ws(0,"RIFF");dv.setUint32(4,36+N*4,true);ws(8,"WAVE");ws(12,"fmt ");dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,2,true);dv.setUint32(24,sr,true);dv.setUint32(28,sr*4,true);dv.setUint16(32,4,true);dv.setUint16(34,16,true);ws(36,"data");dv.setUint32(40,N*4,true);
  for(let i=0;i<N;i++){dv.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true);dv.setInt16(46+i*4,Math.max(-1,Math.min(1,Rr[i]))*32767,true);}
  const u=new Uint8Array(ab);let s="";for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s);};
/* CPU benchmark helper (tests only): renders `secs` of a track from `fromBar` offline and returns render-time / audio-time */
A.bench=async(name,fromBar,secs)=>{const sr=44100,c=new OfflineAudioContext(2,Math.ceil(sr*secs),sr);const g=c.createGain();g.connect(c.destination);const rv=c.createConvolver();rv.buffer=impulse(c,2.6,3);rv.connect(g);
  const T=TR[name],sd=60/T.bpm/4;compose(T);const R=mkRoute(c,g,rv,T.bpm,T);let step=fromBar*(T.spb||16);for(let t=.05;t<secs-.5;t+=sd){playStep(c,R,T,step%T.steps,t);step++;}
  const t0=performance.now();await c.startRendering();return (performance.now()-t0)/1000/secs;};
["pointerdown","keydown","touchstart"].forEach(ev=>window.addEventListener(ev,()=>A.unlock(),{capture:true,passive:true}));
return A;})();

/* ================= hooks into the game (wrappers; every hook is try/catch so audio can never break gameplay) ================= */
(function(){
const P=(n,a)=>{try{AUDIO.play(n,a);}catch(e){}};
const wrap=(name,fn)=>{const orig=window[name];if(typeof orig!=="function")return;window[name]=fn(orig);};
const MENU_SCREENS={menu:1,select:1,builder:1,versus:1};
wrap("showScreen",o=>function(name){const r=o.apply(this,arguments);try{if(MENU_SCREENS[name])AUDIO.music("menu");else if(name==="duel"&&G&&G.arena&&!G.over)AUDIO.music(AUDIO.trackFor(G.arena));}catch(e){}return r;});
wrap("startDuel",o=>function(){const r=o.apply(this,arguments);try{AUDIO.music(AUDIO.trackFor(G.arena));P("duelstart");}catch(e){}return r;});
wrap("banner",o=>function(text){try{if(/GOES FIRST|GO FIRST/.test(text))P("coin");else if(/TURN/.test(text))P("turn");}catch(e){}return o.apply(this,arguments);});
wrap("drawCards",o=>function(s,n){try{if(n>0&&S(s).deck.length)P("draw");}catch(e){}return o.apply(this,arguments);});
wrap("normalSummon",o=>function(s,uid,tributes,setMode){try{if(tributes&&tributes.length)P("tribute");else P(setMode?"set":"summon");}catch(e){}return o.apply(this,arguments);});
wrap("specialSummon",o=>function(s,card){try{if(!card.extra)P("summon");}catch(e){}return o.apply(this,arguments);});
wrap("setTrap",o=>function(){P("set");return o.apply(this,arguments);});
wrap("activateSpell",o=>function(s,uid){try{const f=find(uid);const c=f&&f.card;if(c){if(f.zone==="st"&&!c.faceUp)P("flip");
  if(isQuick(c))P("quick");else if(c.fx&&(c.fx.k==="equip"||c.fx.k==="boost"))P("powerup");else P("spell");}}catch(e){}return o.apply(this,arguments);});
wrap("resolveQuick",o=>function(s,c){try{if(c&&c.fx&&c.fx.k==="qBoost")setTimeout(()=>P("powerup"),120);}catch(e){}return o.apply(this,arguments);});
wrap("showcase",o=>function(c){try{if(c&&c.type==="trap")P("trap");}catch(e){}return o.apply(this,arguments);});
wrap("changePosition",o=>function(s,uid){try{const f=find(uid);if(f&&!f.card.faceUp)P("flip");else P("phase");}catch(e){}return o.apply(this,arguments);});
wrap("attack",o=>function(){P("attack");return o.apply(this,arguments);});
wrap("lunge",o=>function(att,tgt){try{const direct=tgt&&tgt.id&&/^duel-/.test(tgt.id);const d=Math.max(0,420*SPEED);setTimeout(()=>P(direct?"direct":"hit"),d);P("attack");}catch(e){}return o.apply(this,arguments);});
wrap("destroyMonsters",o=>function(list){try{if(list&&list.some(c=>c&&find(c.uid)&&find(c.uid).zone==="monsters"))P("destroy");}catch(e){}return o.apply(this,arguments);});
wrap("destroySTs",o=>function(list){try{if(list&&list.length)P("destroyST");}catch(e){}return o.apply(this,arguments);});
wrap("changeLP",o=>function(s,delta){try{if(delta<0)P("damage",Math.round(Math.min(14,3+(-delta)/300)));else if(delta>0)P("heal");}catch(e){}return o.apply(this,arguments);});
wrap("doFusion",o=>function(){P("fusion");return o.apply(this,arguments);});
wrap("snapBack",o=>function(){P("snap");return o.apply(this,arguments);});
wrap("dragStart",o=>function(){P("pickup");return o.apply(this,arguments);});
wrap("dragDrop",o=>function(d,e){try{const h=hoverTarget(d,e);if(h&&h.ok!==false&&!(h.field&&!(find(d.uid)&&find(d.uid).card.type==="spell")))P("drop");}catch(err){}return o.apply(this,arguments);});
wrap("promptResponse",o=>function(){P("alert");return o.apply(this,arguments);});
wrap("playClip",o=>async function(){const id="clip"+Math.random();AUDIO.duck(id,0);try{return await o.apply(this,arguments);}finally{AUDIO.duck(id,null);}});
wrap("aceClip",o=>async function(){const r=await o.apply(this,arguments);try{if(G&&!G.over)P("ace");}catch(e){}return r;});
wrap("entrance",o=>async function(){const id="ace"+Math.random();AUDIO.duck(id,.3);try{return await o.apply(this,arguments);}finally{setTimeout(()=>AUDIO.duck(id,null),300);}});
wrap("gameOver",o=>function(winner){const was=G&&G.over;const r=o.apply(this,arguments);try{if(!was&&G&&G.over){AUDIO.music(null);P(G.winner==="player"?"victory":"defeat");}}catch(e){}return r;});
wrap("bindWinVideo",o=>function(){const id="winvid";AUDIO.duck(id,0);setTimeout(()=>AUDIO.duck(id,null),4500);return o.apply(this,arguments);});
wrap("leaveDuel",o=>function(){const r=o.apply(this,arguments);try{AUDIO.duck("winvid",null);AUDIO.music("menu");}catch(e){}return r;});
/* phase changes: G.phase is assigned in many places, so watch it */
let lastPhase=null,lastG=null;setInterval(()=>{try{if(!G||G.over){lastG=G;return;}if(G!==lastG){lastG=G;lastPhase=G.phase;return;}
  if(G.phase!==lastPhase){if(["main1","battle","main2","end"].includes(G.phase)&&lastPhase!==null&&!(lastPhase==="draw"&&G.phase==="main1"))P("phase");lastPhase=G.phase;}}catch(e){}},60);
/* UI clicks + very subtle card hover */
document.addEventListener("click",e=>{try{if(e.target.closest("button,.btn,.mbtn,.tile,.achip,[data-phase],.respopt,.mitem,#menuLayer [class]"))P("click");}catch(err){}},true);
let hovUid=null;document.addEventListener("mouseover",e=>{try{const ce=e.target.closest(".card");if(!ce){hovUid=null;return;}const k=ce.dataset.uid||ce.dataset.id||ce.textContent.slice(0,20);if(k!==hovUid){hovUid=k;P("hover");}}catch(err){}});
})();

/* ================= sound settings UI ================= */
function soundPanelHTML(){const s=AUDIO.set;return `<div class="modal-bg" id="sndbg"><div class="modal sndpanel" style="width:440px">
  <h2>Sound Settings</h2>
  <label class="sndrow"><span>Music</span><input type="range" min="0" max="100" value="${Math.round(s.music*100)}" id="snd-music"><b id="snd-music-v">${Math.round(s.music*100)}</b></label>
  <label class="sndrow"><span>Sound effects</span><input type="range" min="0" max="100" value="${Math.round(s.sfx*100)}" id="snd-sfx"><b id="snd-sfx-v">${Math.round(s.sfx*100)}</b></label>
  <label class="sndrow chk"><input type="checkbox" id="snd-mute" ${s.mute?"checked":""}><span>Mute all</span></label>
  <div class="sndnote">${AUDIO.ok?"Now playing: <b id='snd-now'>"+((AUDIO.cur&&AUDIO.TR[AUDIO.cur])?AUDIO.TR[AUDIO.cur].name:"(starts after your first click)")+"</b>":"Audio is not available in this browser. The game works normally without it."}<br>
  All music and sound effects are original and generated live in your browser with the Web Audio API. No audio files are used. See Credits in How to Play.</div>
  <div class="btnrow"><button class="btn" id="snd-test">Test sound</button><button class="btn gold" id="snd-close">Close</button></div></div></div>`;}
function openSound(){const prev=$("#modalLayer").innerHTML;$("#modalLayer").innerHTML=soundPanelHTML();
  const bind=(id,k)=>{const el=$("#"+id);el.oninput=()=>{AUDIO.setVol(k,el.value/100);$("#"+id+"-v").textContent=el.value;};};
  bind("snd-music","music");bind("snd-sfx","sfx");
  $("#snd-mute").onchange=e=>AUDIO.setVol("mute",e.target.checked);
  $("#snd-test").onclick=()=>{AUDIO.unlock();setTimeout(()=>AUDIO.play("spell"),60);};
  $("#snd-close").onclick=()=>{$("#modalLayer").innerHTML="";};}
function updSpeaker(){const b=$("#btn-snd");if(b)b.classList.toggle("muted",!!AUDIO.set.mute);}
(function(){try{
  const rb=document.querySelector("#duel .rbtns");if(rb&&!$("#btn-snd")){const b=document.createElement("button");b.className="btn spk";b.id="btn-snd";b.title="Sound on/off (right-click for settings)";b.innerHTML='<i class="spkic"></i>';
    b.onclick=e=>{e.stopPropagation();AUDIO.unlock();AUDIO.setVol("mute",!AUDIO.set.mute);};b.oncontextmenu=e=>{e.preventDefault();e.stopPropagation();openSound();};rb.prepend(b);updSpeaker();}
  const q=$("#btn-quit");if(q){const o=q.onclick;q.onclick=function(){o&&o.apply(this,arguments);const row=document.querySelector("#modalLayer .btnrow");if(row&&!$("#q-snd")){const b=document.createElement("button");b.className="btn";b.id="q-snd";b.textContent="Sound Settings";b.onclick=()=>openSound();row.appendChild(b);}};}
  /* v14 menu: Sound lives in the SYSTEM panel (no separate SOUND main-menu button) */
  AUDIO.want=CUR==="duel"&&G?AUDIO.trackFor(G.arena):"menu";
}catch(e){}})();
/* new5b: theme colours + ace-entrance FX for Gloomheart / Hustler / Ki Fighter / Fried Chicken / Gallop Idol,
   the "rain" arena ambient (Gloom Cathedral) and arena music moods. Shapes only, no emoji or glyph text.
   Load LAST (after i_audio.js): needs THEME_COL, themeFX, part, rnd, pick, shakeEl, SPEED, setArena, AUDIO. */
(function(){
Object.assign(THEME_COL,{Gloomheart:"#9b6bff",Hustler:"#ffd23f","Ki Fighter":"#46c8ff","Fried Chicken":"#ff7a2f","Gallop Idol":"#e9b949"});
const W=1280,H=800;
const dot=(c,s)=>({width:s+"px",height:s+"px",borderRadius:"50%",background:c,boxShadow:`0 0 ${s*1.5}px ${c}`});
const base=themeFX;
themeFX=function(race,L){
  if(race==="Gloomheart"){
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"linear-gradient(180deg,rgba(30,10,60,.65),rgba(80,40,140,.25))"},[{opacity:0},{opacity:1,offset:.25},{opacity:.4}],2000,0);
    for(let i=0;i<70;i++)part(L,"",{left:rnd(0,W+200)+"px",top:"-80px",width:"2px",height:rnd(40,90)+"px",background:"linear-gradient(180deg,transparent,#c9b8ff)",transform:"rotate(12deg)"},[{transform:"translate(0,0) rotate(12deg)",opacity:.9},{transform:`translate(-180px,${H+160}px) rotate(12deg)`,opacity:.6}],rnd(600,1100),rnd(0,1400));
    for(let i=0;i<22;i++)part(L,"",{left:rnd(0,W)+"px",top:"-40px",width:"16px",height:"22px",borderRadius:"60% 0 60% 0",background:pick(["#5b1030","#7a1a40","#3a0a24"])},[{transform:"translate(0,0) rotate(0)",opacity:1},{transform:`translate(${rnd(-160,160)}px,${H+80}px) rotate(${rnd(-400,400)}deg)`,opacity:.7}],rnd(2000,3200),rnd(0,900));
    part(L,"",{left:"640px",top:"370px",width:"360px",height:"360px",marginLeft:"-180px",marginTop:"-180px",borderRadius:"50%",background:"radial-gradient(circle,#efe6ff,#9b6bff 35%,transparent 70%)"},[{transform:"scale(0)",opacity:.9},{transform:"scale(3.4)",opacity:0}],1500,300);
  }else if(race==="Hustler"){
    for(let i=0;i<46;i++){const s=rnd(18,34);part(L,"",{left:rnd(0,W)+"px",top:"-50px",width:s+"px",height:s+"px",borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#fff6b0,#ffd23f 45%,#b8860b)",border:"2px solid #8a6200"},[{transform:"translateY(0) rotateY(0)",opacity:1},{transform:`translateY(${H+100}px) rotateY(${rnd(720,1800)}deg)`,opacity:1}],rnd(1100,2000),rnd(0,1000));}
    for(let i=0;i<16;i++)part(L,"",{left:rnd(0,W)+"px",top:"-60px",width:"70px",height:"34px",borderRadius:"3px",background:"linear-gradient(90deg,#3fae5a,#7fe08a,#3fae5a)",border:"1px solid #1f6b30"},[{transform:"translate(0,0) rotate(0)"},{transform:`translate(${rnd(-200,200)}px,${H+100}px) rotate(${rnd(-720,720)}deg)`}],rnd(1800,2800),rnd(0,800));
    part(L,"",{left:"640px",top:"370px",width:"300px",height:"300px",marginLeft:"-150px",marginTop:"-150px",borderRadius:"50%",background:"radial-gradient(circle,#fff,#ffd23f 40%,transparent 70%)"},[{transform:"scale(0)",opacity:1},{transform:"scale(4)",opacity:0}],1000,200);
    setTimeout(()=>shakeEl("#stage",true),600*SPEED);
  }else if(race==="Ki Fighter"){
    part(L,"",{left:"540px",top:"-40px",width:"200px",height:"880px",background:"linear-gradient(90deg,transparent,rgba(255,240,150,.85),transparent)",filter:"blur(10px)"},[{transform:"scaleX(0)",opacity:0},{transform:"scaleX(2)",opacity:1,offset:.35},{transform:"scaleX(3.5)",opacity:0}],1700,0);
    for(let k=0;k<4;k++)part(L,"",{left:"640px",top:"400px",width:"260px",height:"260px",marginLeft:"-130px",marginTop:"-130px",borderRadius:"50%",border:"5px solid #ffe066",boxShadow:"0 0 30px #46c8ff, inset 0 0 30px #ffe066"},[{transform:"scale(.2)",opacity:1},{transform:"scale(4.5)",opacity:0}],1200,k*280);
    for(let i=0;i<40;i++)part(L,"",Object.assign({left:rnd(300,980)+"px",top:(H+20)+"px"},dot(pick(["#fff6b0","#ffe066","#9fe6ff"]),rnd(5,12))),[{transform:"translateY(0)",opacity:0},{opacity:1,offset:.2},{transform:`translateY(${-rnd(500,900)}px)`,opacity:0}],rnd(700,1300),rnd(0,1200));
    for(let i=0;i<8;i++)part(L,"",{left:rnd(200,1080)+"px",top:rnd(100,600)+"px",width:"4px",height:"140px",background:"#e8f8ff",boxShadow:"0 0 12px #46c8ff",transform:`rotate(${rnd(-40,40)}deg)`},[{opacity:0},{opacity:1,offset:.1},{opacity:0}],220,rnd(200,1500));
    setTimeout(()=>shakeEl("#stage",true),500*SPEED);setTimeout(()=>shakeEl("#stage",true),1100*SPEED);
  }else if(race==="Fried Chicken"){
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"radial-gradient(ellipse at 50% 100%,rgba(255,140,40,.55),rgba(120,30,0,.2) 60%,transparent)"},[{opacity:0},{opacity:1,offset:.3},{opacity:.3}],1900,0);
    for(let i=0;i<60;i++)part(L,"",Object.assign({left:rnd(200,1080)+"px",top:"700px"},dot(pick(["#ffd27a","#ffb03a","#fff0b0"]),rnd(4,10))),[{transform:"translate(0,0)",opacity:1},{transform:`translate(${rnd(-300,300)}px,${-rnd(200,600)}px)`,opacity:0}],rnd(500,1000),rnd(0,1300));
    for(let i=0;i<12;i++)part(L,"",{left:rnd(150,1130)+"px",top:"760px",width:"40px",height:"140px",borderRadius:"20px",background:"linear-gradient(0deg,transparent,rgba(255,255,255,.45))",filter:"blur(8px)"},[{transform:"translateY(0) scaleY(.5)",opacity:0},{opacity:.8,offset:.3},{transform:`translateY(${-rnd(300,600)}px) scaleY(1.5)`,opacity:0}],rnd(1500,2400),rnd(0,600));
    for(let i=0;i<20;i++)part(L,"",{left:rnd(0,W)+"px",top:(H+30)+"px",width:"26px",height:"40px",borderRadius:"50% 50% 40% 40%",background:"radial-gradient(circle at 50% 70%,#fff3a0,#ff8a1f 55%,transparent 75%)"},[{transform:"translateY(0) scale(.5)",opacity:0},{opacity:1,offset:.2},{transform:`translateY(${-rnd(300,700)}px) scale(1.3)`,opacity:0}],rnd(1200,2000),rnd(0,800));
  }else if(race==="Gallop Idol"){
    const cols=["#ffe066","#ff8fd8","#9fe6ff","#fff"];
    for(let w=0;w<5;w++)part(L,"",{left:(140+w*250)+"px",top:"-30px",width:"180px",height:"900px",marginLeft:"-90px",transformOrigin:"50% 0",clipPath:"polygon(44% 0,56% 0,100% 100%,0 100%)",background:`linear-gradient(180deg,${cols[w%4]}aa,transparent 75%)`,mixBlendMode:"screen"},[{transform:`rotate(${w%2?-25:25}deg)`,opacity:0},{opacity:1,offset:.3},{transform:`rotate(${w%2?25:-25}deg)`,opacity:0}],1900,w*80);
    for(let i=0;i<60;i++)part(L,"",{left:rnd(0,W)+"px",top:"-30px",width:rnd(8,14)+"px",height:rnd(14,22)+"px",background:pick(cols)},[{transform:"translate(0,0) rotate(0)"},{transform:`translate(${rnd(-150,150)}px,${H+80}px) rotate(${rnd(-900,900)}deg)`}],rnd(1600,2800),rnd(0,900));
    for(let i=0;i<30;i++)part(L,"",{left:"0",top:rnd(500,780)+"px",width:rnd(200,500)+"px",height:"3px",background:"linear-gradient(90deg,transparent,#fff3b0,transparent)"},[{transform:"translateX(-600px)"},{transform:"translateX(1600px)"}],rnd(350,700),rnd(0,1200));
    setTimeout(()=>shakeEl("#stage",true),600*SPEED);
  }else return base(race,L);
};
/* rain ambient */
const st=document.createElement("style");
st.textContent=`.amb .rdrop{position:absolute;top:-120px;width:1.5px;height:90px;background:linear-gradient(180deg,transparent,rgba(200,190,255,.75));transform:rotate(10deg);animation:rfall linear infinite;opacity:.7}
.amb .rmist{position:absolute;inset:0;background:linear-gradient(180deg,rgba(40,20,80,.25),transparent 40%,rgba(60,40,110,.25));animation:rmist 7s ease-in-out infinite alternate}
.amb .rflash{position:absolute;inset:0;background:#e8e0ff;opacity:0;animation:rflash 11s linear infinite}
@keyframes rfall{from{transform:translate(0,0) rotate(10deg)}to{transform:translate(-170px,1000px) rotate(10deg)}}
@keyframes rmist{from{opacity:.5}to{opacity:1}}
@keyframes rflash{0%,92%,100%{opacity:0}93%{opacity:.35}94%{opacity:0}95.5%{opacity:.2}97%{opacity:0}}`;
document.head.appendChild(st);
const baseArena=setArena;
setArena=function(id){baseArena(id);const A=ARENAS[id];if(!A||A.ambient!=="rain")return;const amb=document.querySelector("#arena .amb");if(!amb)return;
  let h='<div class="rmist"></div><div class="rflash"></div>';
  for(let i=0;i<80;i++)h+=`<div class="rdrop" style="left:${rnd(0,115)}%;animation-duration:${rnd(.6,1.2)}s;animation-delay:${-rnd(0,1.2)}s;opacity:${rnd(.3,.8)}"></div>`;
  amb.innerHTML=h;};
/* arena music moods (procedural tracks already in i_audio.js) */
try{Object.assign(AUDIO.ARENA_TRACK,{gloom_cathedral:"dark",pawn_alley:"tech",rift_peaks:"heroic",hisyam_stall:"chill",derby_dome:"cute"});}catch(e){}
})();
/* new3c: theme colours + ace-entrance FX for Bakery / Cosplayer / Songstress, the "flour" (Cosy Corner Bakery) and
   "concert" (Aria Live Concert Stage) arena ambients and arena music moods. Shapes only, no emoji or glyph text.
   Load LAST (after new5b_fx.js): needs THEME_COL, themeFX, part, rnd, pick, shakeEl, SPEED, setArena, AUDIO. */
(function(){
Object.assign(THEME_COL,{Bakery:"#e8a25a",Cosplayer:"#26b3a8",Songstress:"#3f7cff"});
const W=1280,H=800;
const dot=(c,s)=>({width:s+"px",height:s+"px",borderRadius:"50%",background:c,boxShadow:`0 0 ${s*1.5}px ${c}`});
const base=themeFX;
themeFX=function(race,L){
  if(race==="Bakery"){
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"radial-gradient(ellipse at 50% 90%,rgba(255,170,80,.55),rgba(120,60,10,.2) 60%,transparent)"},[{opacity:0},{opacity:1,offset:.3},{opacity:.35}],1900,0);
    for(let i=0;i<70;i++)part(L,"",Object.assign({left:rnd(0,W)+"px",top:"-30px"},dot(pick(["#fff8ee","#f6e7cf","#fff"]),rnd(4,10))),[{transform:"translate(0,0)",opacity:.95},{transform:`translate(${rnd(-160,160)}px,${H+60}px)`,opacity:.4}],rnd(1800,3200),rnd(0,1000));
    for(let i=0;i<14;i++)part(L,"",{left:rnd(150,1130)+"px",top:"760px",width:"46px",height:"160px",borderRadius:"23px",background:"linear-gradient(0deg,transparent,rgba(255,255,255,.5))",filter:"blur(9px)"},[{transform:"translateY(0) scaleY(.5)",opacity:0},{opacity:.85,offset:.3},{transform:`translateY(${-rnd(300,620)}px) scaleY(1.6)`,opacity:0}],rnd(1500,2400),rnd(0,700));
    part(L,"",{left:"640px",top:"380px",width:"340px",height:"340px",marginLeft:"-170px",marginTop:"-170px",borderRadius:"50%",background:"radial-gradient(circle,#fff6dc,#ffc46b 40%,transparent 70%)"},[{transform:"scale(0)",opacity:1},{transform:"scale(3.6)",opacity:0}],1400,250);
  }else if(race==="Cosplayer"){
    const cols=["#26b3a8","#ff7ac8","#ffe066","#9fe6ff","#c7a2ff"];
    for(let w=0;w<4;w++)part(L,"",{left:(220+w*280)+"px",top:"-30px",width:"200px",height:"900px",marginLeft:"-100px",transformOrigin:"50% 0",clipPath:"polygon(44% 0,56% 0,100% 100%,0 100%)",background:`linear-gradient(180deg,${cols[w]}aa,transparent 75%)`,mixBlendMode:"screen"},[{transform:`rotate(${w%2?-22:22}deg)`,opacity:0},{opacity:1,offset:.3},{transform:`rotate(${w%2?22:-22}deg)`,opacity:0}],1900,w*90);
    for(let i=0;i<14;i++)part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"#fff"},[{opacity:0},{opacity:.35,offset:.1},{opacity:0}],180,rnd(100,1600));
    for(let i=0;i<50;i++)part(L,"",{left:rnd(0,W)+"px",top:"-30px",width:rnd(10,16)+"px",height:rnd(6,10)+"px",borderRadius:"2px",background:pick(cols)},[{transform:"translate(0,0) rotate(0)"},{transform:`translate(${rnd(-160,160)}px,${H+80}px) rotate(${rnd(-900,900)}deg)`}],rnd(1600,2800),rnd(0,900));
    part(L,"",{left:"640px",top:"390px",width:"300px",height:"300px",marginLeft:"-150px",marginTop:"-150px",borderRadius:"50%",border:"6px solid #26b3a8",boxShadow:"0 0 30px #26b3a8"},[{transform:"scale(.2)",opacity:1},{transform:"scale(4)",opacity:0}],1200,300);
  }else if(race==="Songstress"){
    part(L,"",{left:"0",top:"0",width:W+"px",height:H+"px",background:"linear-gradient(180deg,rgba(20,30,90,.55),rgba(60,110,255,.2))"},[{opacity:0},{opacity:1,offset:.25},{opacity:.4}],1900,0);
    for(let k=0;k<5;k++)part(L,"",{left:"640px",top:"420px",width:"240px",height:"240px",marginLeft:"-120px",marginTop:"-120px",borderRadius:"50%",border:"4px solid #9fc0ff",boxShadow:"0 0 24px #3f7cff, inset 0 0 24px #ff6a3a"},[{transform:"scale(.2)",opacity:1},{transform:"scale(5)",opacity:0}],1100,k*230);
    for(let w=0;w<6;w++)part(L,"",{left:(120+w*210)+"px",top:"-30px",width:"160px",height:"900px",marginLeft:"-80px",transformOrigin:"50% 0",clipPath:"polygon(45% 0,55% 0,100% 100%,0 100%)",background:`linear-gradient(180deg,${w%2?"#ff6a3a":"#6fa0ff"}99,transparent 70%)`,mixBlendMode:"screen"},[{transform:`rotate(${w%2?-30:30}deg)`,opacity:0},{opacity:1,offset:.3},{transform:`rotate(${w%2?30:-30}deg)`,opacity:0}],1700,w*60);
    for(let i=0;i<50;i++)part(L,"",Object.assign({left:rnd(250,1030)+"px",top:"720px"},dot(pick(["#ffd27a","#ff6a3a","#9fc0ff"]),rnd(4,10))),[{transform:"translate(0,0)",opacity:1},{transform:`translate(${rnd(-350,350)}px,${-rnd(250,650)}px)`,opacity:0}],rnd(500,1100),rnd(0,1300));
    setTimeout(()=>shakeEl("#stage",true),500*SPEED);setTimeout(()=>shakeEl("#stage",true),1000*SPEED);
  }else return base(race,L);
};
const st=document.createElement("style");
st.textContent=`.amb .flr{position:absolute;top:-20px;border-radius:50%;background:rgba(255,248,235,.85);animation:flrfall linear infinite}
.amb .ovglow{position:absolute;left:0;right:0;bottom:0;height:45%;background:radial-gradient(ellipse at 50% 100%,rgba(255,150,60,.28),transparent 70%);animation:ovglow 4s ease-in-out infinite alternate}
@keyframes flrfall{from{transform:translate(0,0)}to{transform:translate(var(--dx),900px)}}
@keyframes ovglow{from{opacity:.55}to{opacity:1}}
.amb .cbeam{position:absolute;top:-40px;width:180px;height:950px;margin-left:-90px;transform-origin:50% 0;clip-path:polygon(45% 0,55% 0,100% 100%,0 100%);mix-blend-mode:screen;opacity:.45;animation:cbeam ease-in-out infinite alternate}
.amb .cstick{position:absolute;bottom:-6px;width:5px;height:34px;border-radius:3px;animation:cstick ease-in-out infinite alternate}
@keyframes cbeam{from{transform:rotate(-24deg)}to{transform:rotate(24deg)}}
@keyframes cstick{from{transform:rotate(-25deg) translateY(0)}to{transform:rotate(25deg) translateY(-8px)}}
/* v8 select grid: 26 duelists (+Random) fit in 3 rows of 10 inside the 1280x800 stage, no hidden row */
#select .tiles{top:74px;left:30px;right:30px;height:312px;gap:7px;padding:10px 8px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#ffd36b #0006}
#select .tiles::-webkit-scrollbar{width:8px}#select .tiles::-webkit-scrollbar-thumb{background:#ffd36b;border-radius:4px}#select .tiles::-webkit-scrollbar-track{background:#0006;border-radius:4px}
#select .tile{width:108px;height:90px;border-radius:10px}
#select .tile img{object-position:50% 12%}
#select .tile .tn{padding:10px 2px 3px;font-size:11.5px;line-height:1.15}
#select .tile .tt{font-size:8.5px;letter-spacing:.5px}
#select .tile:hover{transform:translateY(-2px) scale(1.06)}
#select .tile.random{font-size:38px;align-items:flex-start;padding-top:8px}
/* v8: 26 arenas (+Home) fit left of the DUEL button */
#select .arenapick{left:40px;right:220px;gap:4px;top:722px}
#select .achip{width:32px;height:28px;font-size:8.5px;border-radius:6px}
#select .arenapick .lab{font-size:12px}`;
document.head.appendChild(st);
const baseArena=setArena;
setArena=function(id){baseArena(id);const A=ARENAS[id];if(!A||(A.ambient!=="flour"&&A.ambient!=="concert"))return;const amb=document.querySelector("#arena .amb");if(!amb)return;let h="";
  if(A.ambient==="flour"){h='<div class="ovglow"></div>';for(let i=0;i<46;i++){const s=rnd(2,5);h+=`<div class="flr" style="left:${rnd(0,100)}%;width:${s}px;height:${s}px;--dx:${rnd(-120,120)}px;animation-duration:${rnd(9,18)}s;animation-delay:${-rnd(0,18)}s;opacity:${rnd(.3,.8)}"></div>`;}}
  else{const cols=["#6fa0ff","#ff6a3a","#c7a2ff","#9fe6ff"];
    for(let i=0;i<6;i++)h+=`<div class="cbeam" style="left:${8+i*17}%;background:linear-gradient(180deg,${cols[i%4]}aa,transparent 75%);animation-duration:${rnd(3,6)}s;animation-delay:${-rnd(0,6)}s"></div>`;
    for(let i=0;i<40;i++)h+=`<div class="cstick" style="left:${rnd(0,100)}%;background:${pick(cols)};box-shadow:0 0 8px ${pick(cols)};animation-duration:${rnd(.4,.9)}s;animation-delay:${-rnd(0,1)}s"></div>`;}
  amb.innerHTML=h;};
try{Object.assign(AUDIO.ARENA_TRACK,{cosy_bakery:"chill",cosplay_stage:"cute",concert_stage:"heroic"});}catch(e){}
})();
/* ================= v9: CHRONICLES LINK skills =================
   Once per duel, only while the owner's LP <= LINK_LP, only in the owner's own Main Phase.
   State lives in G.sides[s].lk (numbers only, so it travels in online snapshots).
   Card flags (lkSafe, lkNoFx, lkMinus, lkMinusT, lkDoom, lkDouble, lkHit, lkHitT, lkDirect, lkDef0) are scalars too.
   Tune numbers in LINK_PARAMS; names/text in LINKS. */
const LINK_LP=4000;
const LINK_PARAMS={
  you:{draw:3,discard:1}, kaito:{atk:500}, ryuga:{ratio:.5}, toma:{n:2,maxLv:4}, weiyao:{lpPer:300,atk:300}, lily:{lp:2000,draw:2},
  weisheng:{atk:500}, eryll:{ratio:.5,max:2000}, kelvin:{ratio:.5}, ben:{per:200,aiKeepDeck:8}, sabrina:{atk:500}, christopher:{lp:1000},
  lemon:{back:5,draw:2}, clement:{atk:4000,def:5000}, darkkelvin:{ratio:.5,max:2000,payMax:2000,step:100,aiFloor:1000}, jason:{draw:3,lpPer:1000,oppDraw:1},
  shaim:{mult:3}, hisyam:{lp:1000,maxLv:4}, weiyao2:{per:500}, eunice:{lp:1500}, aoiyuki:{mult:5},
  keith2:{max:3000,draw:1,aiMin:1500,aiFloor:500}, lemon2:{n:3,atk:500,lp:500}, weisheng2:{atk:500}, gdragon:{n:3,kill:1500,minus:1000,per:300}};
(function(){
const P=LINK_PARAMS;
const LK=s=>{const sd=G&&G.sides&&G.sides[s];if(!sd)return {};if(!sd.lk)sd.lk={used:0,lost:0};return sd.lk;};
window.LK=LK;
const guestNow=()=>typeof isGuest==="function"?isGuest():(typeof NET!=="undefined"&&NET&&NET.role==="guest"&&G&&G.net);
const fu=s=>mons(s).filter(m=>m.faceUp);
const isCos=c=>c&&c.type==="spell"&&c.fx&&c.fx.k==="equip"&&(c.fx.setRace||c.fx.grant||c.fx.onEquip);
const say=(s,msg)=>log(msg,sc(s));
const choose=(s,cards,opts)=>requestChoice(s,cards,opts);
/* v9h: Dark Kelvin - Shared Sorrow, optional LP sacrifice (after the damage, same activation) */
const dkTargets=s=>mons(other(s)).filter(m=>!m.destiny);
const dkKills=(s,x)=>fu(other(s)).filter(m=>!m.destiny&&atkOf(m)>0&&atkOf(m)<=x);
function dkPayMax(s){const Q=P.darkkelvin;return Math.max(0,Math.min(Q.payMax,Math.floor((S(s).lp-1)/Q.step)*Q.step));}
function dkPayOpts(s){const Q=P.darkkelvin,mx=dkPayMax(s),out=[],lp=S(s).lp,hidden=mons(other(s)).some(m=>!m.faceUp&&!m.destiny);
  for(let x=0;x<=mx;x+=Q.step){const k=dkKills(s,x);
    out.push({value:x,label:x?`Pay ${x} LP`:"Skip (pay 0)",kills:k.length,
      desc:x?`Every opponent monster loses ${x} ATK (permanent). Face-up monsters destroyed: ${k.length}${k.length?` - both players draw ${k.length}`:" - nobody draws"}.${hidden?" Face-down monsters are hit too.":""} Your LP: ${lp} → ${lp-x}.`
        :"Do not pay any LP. No ATK loss, no draws."});}
  return out;}
function dkAiPay(s,opts){const lp=S(s).lp;let best=null;
  for(const o of opts){if(!o.value||lp-o.value<P.darkkelvin.aiFloor||!o.kills)continue;if(!best||o.kills>best.kills)best=o;}
  return best;}
async function dkSacrifice(s){if(!G||G.over)return;const o=other(s);if(!dkTargets(s).length)return;
  const opts=dkPayOpts(s);if(opts.length<2)return;
  const pick=await choose(s,opts,{amount:true,title:"Shared Sorrow: sacrifice LP?",sub:`Pay up to ${opts[opts.length-1].value} LP. Every opponent monster loses that much ATK; monsters reduced to 0 ATK are destroyed and both players draw 1 card per monster destroyed.`,
    confirmLabel:"Pay",cancelLabel:"Skip",unit:"LP",ai:c=>dkAiPay(s,c)||c[0]});
  const x=pick&&+pick.value||0;if(G.over)return;
  if(!(x>0)||x>dkPayMax(s)){say(s,`${S(s).name} pays no LP.`);return;}
  say(s,`${S(s).name} pays ${x} LP to Shared Sorrow!`);await changeLP(s,-x);if(G.over)return;
  const kill=[];
  for(const m of dkTargets(s)){if(!onField(m))continue;const before=atkOf(m);const d=Math.min(x,before);m.bonus=(m.bonus||0)-d;
    floatText(elOf(m.uid),`-${x} ATK`,"dmg");if(before>0&&atkOf(m)<=0)kill.push(m);}
  render();say(o,`Every monster ${S(o).name} controls loses ${x} ATK.`);await sleep(450);
  if(kill.length)await destroyMonsters(kill);
  const n=kill.filter(m=>!onField(m)).length;
  if(!n||G.over){if(!G.over)say(s,"No monster was destroyed: nobody draws.");return;}
  say(s,`${n} monster${n>1?"s":""} destroyed: both players draw ${n}.`);
  await drawCards(s,n);if(G.over)return;await drawCards(o,n);render();}
window.dkPayOpts=dkPayOpts;window.dkAiPay=dkAiPay;window.dkSacrifice=dkSacrifice;
const lvlOK=(c,mx)=>c.type==="monster"&&!c.extra&&c.level<=mx;
const hasSlot=s=>freeIdx(S(s).monsters)>=0;
function miraOK(c){return c&&c.type==="monster"&&c.race==="Machine"&&!c.token&&!c.extra&&(c.level||0)<=4;}
async function ssDef(s,c,from,def0){if(!c||!hasSlot(s))return false;const ok=await specialSummon(s,c,from);if(ok){c.pos="def";if(def0){c.def=0;c.lkDef0=1;}render();}return ok;}
function fieldOut(c){const f=find(c.uid);if(!f||f.zone!=="monsters")return null;const sd=S(f.side);sd.monsters[f.idx]=null;
  for(const s2 of ["player","enemy"])S(s2).st.forEach((e,k)=>{if(e&&e.equippedTo===c.uid){S(s2).st[k]=null;toGY(e);log(`${e.name} is sent to the Graveyard.`);}});return f;}
function clearLk(c){for(const k of ["lkNoAtk","lkSafe","lkNoFx","lkMinus","lkMinusT","lkDoom","lkDouble","lkHit","lkHitT","lkDirect"])delete c[k];
  if(c.lkDef0){delete c.lkDef0;if(CARDS[c.id])c.def=CARDS[c.id].def;}}
const hitSet=c=>new Set(c.lkHitT===G.turn&&c.lkHit?String(c.lkHit).split(",").map(Number):[]);
function addHit(c,uid){const h=hitSet(c);h.add(uid);c.lkHit=[...h].join(",");c.lkHitT=G.turn;}
async function glow(c,col){const el=c&&elOf(c.uid);if(el)await anim(el,[{filter:"brightness(1)"},{filter:`brightness(2.6) drop-shadow(0 0 14px ${col||"#7ff"})`},{filter:"brightness(1)"}],500);}
async function boostTemp(c,d){addTemp(c,-d);floatText(elOf(c.uid),`${d>=0?"+":""}${d} ATK`,d>=0?"heal":"dmg");render();await glow(c);}
async function discardChoose(s,n,title){for(let i=0;i<n;i++){const sd=S(s);if(!sd.hand.length)return;
  const c=await choose(s,sd.hand,{title:title||"Discard 1 card",sub:"Choose a card from your hand to send to the Graveyard.",ai:l=>bestBy(l,x=>-val(x))})||sd.hand[0];
  const k=sd.hand.indexOf(c);if(k<0)continue;sd.hand.splice(k,1);toGY(c);say(s,`${sd.name} discards ${c.name}.`);render();await sleep(200);}}

/* v12 helpers (Hostile Takeover / Paid Leave / Box Box Box! / Bang Bang Bang!) */
const tagSeat=()=>G&&G.tag?G.tag.turnSeat:null;
const ownSeat=m=>!G||!G.tag||m.seat==null||m.seat===G.tag.turnSeat;
function realAtk(m){if(!m)return 0;if(m.faceUp)return atkOf(m);m.faceUp=true;try{return atkOf(m);}finally{m.faceUp=false;}}
const k2Cost=m=>Math.min(P.keith2.max,realAtk(m));
const k2Targets=s=>mons(other(s)).filter(m=>!m.destiny&&k2Cost(m)<S(s).lp);
function k2AiPick(s){const lp=S(s).lp,o=other(s),olp=S(o).lp;let best=null;
  const mine=G.turn>1?fu(s).filter(m=>m.pos==="atk"&&canAttackWithLater(s,m)).reduce((a,m)=>a+atkOf(m),0):0;
  for(const m of k2Targets(s)){const a=m.faceUp?atkOf(m):0;if(!m.faceUp||a<P.keith2.aiMin)continue;const cost=k2Cost(m);
    const rest=mons(o).filter(x=>x!==m&&!x.destiny);const lethal=G.turn>1&&!rest.length&&mine+(m.pos==="atk"?a:0)>=olp;
    if(lp-cost<P.keith2.aiFloor&&!lethal)continue;const sc=a+(lethal?100000:0);if(!best||sc>best.sc)best={m,sc,lethal};}
  return best;}
async function k2Take(s,m){const f=find(m.uid);if(!f||f.zone!=="monsters")return false;const sd=S(s);const idx=freeIdx(sd.monsters);if(idx<0)return false;
  const el=elOf(m.uid);if(el)await anim(el,[{opacity:1,filter:"brightness(1)"},{opacity:0,transform:"translateY(-30px) scale(.8)",filter:"brightness(2.4) sepia(1) saturate(3)"}],420);
  S(f.side).monsters[f.idx]=null;m.owner=s;if(G.tag)m.seat=tagSeat();sd.monsters[idx]=m;
  log(`${S(s).name} takes control of ${cname(m)} permanently!`,sc(s));render();const e2=elOf(m.uid);
  if(e2)await anim(e2,[{opacity:0,transform:"scale(1.5)",filter:"brightness(3) sepia(1) saturate(4)"},{opacity:1,transform:"scale(1)",filter:"brightness(1)"}],420);
  floatText(elOf(m.uid),"SOLD!","heal");return true;}
const l2Pool=s=>S(s).gy.filter(c=>c.type==="monster"&&c.race==="Zombie"&&!c.token&&!c.extra&&!c.destiny);
function l2Lethal(s){const o=other(s);return fu(o).filter(m=>m.pos==="atk").reduce((a,m)=>a+atkOf(m),0)>=S(s).lp&&S(s).lp>0;}
const w2Pool=s=>S(s).deck.filter(c=>c.type==="monster"&&c.race==="Racer"&&(c.level||0)>=7&&!c.extra);
const w2Mine=s=>mons(s).filter(m=>!m.destiny&&ownSeat(m));
function w2Debuffed(m){if(!m.faceUp)return false;const base=CARDS[m.id]?CARDS[m.id].atk:m.atk;return (m.bonus||0)<0||m.lkMinusT!=null&&G.turn<=m.lkMinusT&&m.lkMinus>0||atkOf(m)<base-300;}
function w2AiBack(s,l,n){const d=l.find(w2Debuffed);if(d)return d;if(n===0&&!hasSlot(s))return bestBy(l,m=>-(m.faceUp?atkOf(m):1500));return null;}
function w2Lethal(s){const o=other(s);if(mons(o).length)return false;const c=bestBy(w2Pool(s),c=>(c.id==="w2_ace"?10000:0)+c.atk);if(!c)return false;
  const a=c.atk+P.weisheng2.atk;const rest=fu(s).filter(m=>m.pos==="atk"&&canAttackWithLater(s,m)).reduce((x,m)=>x+atkOf(m),0);return (hasSlot(s)?rest:rest)+2*a>=S(o).lp;}
const gdTargets=s=>mons(other(s)).filter(m=>!m.destiny);
const gdKillEst=m=>m.faceUp&&atkOf(m)>0&&atkOf(m)<=P.gdragon.kill;
const gdMine=m=>ownSeat(m);

/* ---------- the skills ---------- */
const LINKS={
 you:{name:"Chronicle Rewrite",text:"Draw 3 cards, then discard 1.",
  can:s=>S(s).deck.length>0,ai:(s,ph)=>S(s).hand.length<=5?60:0,
  run:async s=>{await drawCards(s,Math.min(P.you.draw,S(s).deck.length));await discardChoose(s,P.you.discard,"Chronicle Rewrite: discard 1");}},
 kaito:{name:"Oath of the Last Stand",text:"Your Warriors gain 500 ATK and can't be destroyed by battle until your next Draw Phase.",
  can:s=>true,ai:(s,ph)=>fu(s).some(m=>m.race==="Warrior")?(ph===1?75:68):0,
  run:async s=>{LK(s).kaitoUntil=G.turn+2;for(const m of fu(s).filter(m=>m.race==="Warrior")){floatText(elOf(m.uid),`+${P.kaito.atk} ATK`,"heal");glow(m,"#ffd36b");}render();await sleep(300);}},
 ryuga:{name:"Dragonfire Requiem",text:"Deal damage equal to half the ATK of your strongest Dragon.",
  can:s=>fu(s).some(m=>m.race==="Dragon"),
  ai:(s,ph)=>{const d=Math.floor(Math.max(0,...fu(s).filter(m=>m.race==="Dragon").map(atkOf))*P.ryuga.ratio);return d>=S(other(s)).lp?1000:d>=1100?60:0;},
  run:async s=>{const m=bestBy(fu(s).filter(m=>m.race==="Dragon"),atkOf);await glow(m,"#ff7a3a");await changeLP(other(s),-Math.floor(atkOf(m)*P.ryuga.ratio));}},
 mira:{name:"Rebuild Protocol",text:"Special Summon 1 Machine from your Graveyard and 1 Machine from your deck (Level 4 or lower, you choose each) in Defense Position. They cannot attack this turn.",
  can:s=>hasSlot(s)&&(S(s).gy.some(miraOK)||S(s).deck.some(miraOK)),
  ai:(s,ph)=>mons(s).length<=3?62:0,
  run:async s=>{const sd=S(s);
    const g=await choose(s,sd.gy.filter(miraOK),{title:"Rebuild Protocol: Machine from your Graveyard",sub:"Level 4 or lower. Special Summoned in Defense Position; it cannot attack this turn.",score:c=>c.def+c.atk});
    if(g){if(await ssDef(s,g,"gy"))g.lkNoAtk=G.turn;}else say(s,"No Level 4 or lower Machine in the Graveyard.");
    const d=await choose(s,sd.deck.filter(miraOK),{title:"Rebuild Protocol: Machine from your deck",sub:"Level 4 or lower. Special Summoned in Defense Position; it cannot attack this turn.",score:c=>c.def+c.atk});
    if(d&&hasSlot(s)){if(await ssDef(s,d,"deck"))d.lkNoAtk=G.turn;}else if(!d)say(s,"No Level 4 or lower Machine in the deck.");render();}},
 sakura:{name:"Moonlit Recall",text:"Add 1 Spell from your Graveyard or deck to your hand.",
  can:s=>S(s).gy.concat(S(s).deck).some(c=>c.type==="spell"),ai:(s,ph)=>S(s).hand.length<=6?58:0,
  run:async s=>{const sd=S(s);const opts=[...sd.gy.filter(c=>c.type==="spell").map(c=>({card:c,note:"From your Graveyard"})),...sd.deck.filter(c=>c.type==="spell").map(c=>({card:c,note:"From your deck"}))];
    const c=await choose(s,opts,{title:"Moonlit Recall: add 1 Spell",sub:"From your Graveyard or deck.",ai:l=>bestBy(l,x=>(x.fx.k==="destroyAll"?50:x.fx.k==="fusion"?45:x.fx.k==="destroy1"?40:x.fx.k==="draw"?30:10)+Math.random())});if(!c)return;
    const z=sd.gy.includes(c)?sd.gy:sd.deck;z.splice(z.indexOf(c),1);if(z===sd.deck)shuffle(sd.deck);sd.hand.push(c);say(s,`${sd.name} adds ${isAI(s)?"a Spell":c.name} to their hand.`);render();}},
 toma:{name:"Call of the Pack",text:"Special Summon up to 2 Level 4 or lower Beasts from your deck in Defense Position.",
  can:s=>hasSlot(s)&&S(s).deck.some(c=>lvlOK(c,P.toma.maxLv)&&c.race==="Beast"),ai:(s,ph)=>60,
  run:async s=>{for(let i=0;i<P.toma.n;i++){if(!hasSlot(s))break;const c=await choose(s,S(s).deck.filter(c=>lvlOK(c,P.toma.maxLv)&&c.race==="Beast"),{title:`Call of the Pack (${i+1}/${P.toma.n})`,sub:"Special Summon a Level 4 or lower Beast in Defense Position.",optional:i>0,cancelLabel:"Done",score:c=>c.atk+c.def});
    if(!c)break;await ssDef(s,c,"deck");}}},
 weiyao:{name:"Encore Stage",text:"Gain 300 LP for each monster you control, and your Idols gain 300 ATK this turn.",
  can:s=>true,ai:(s,ph)=>(mons(s).length>=2||fu(s).some(m=>m.race==="Idol")&&ph===1)?56:S(s).lp<=1500?50:0,
  run:async s=>{const n=mons(s).length;for(const m of fu(s).filter(m=>m.race==="Idol"))await boostTemp(m,P.weiyao.atk);if(n)await changeLP(s,P.weiyao.lpPer*n);}},
 lily:{name:"Fairy Blessing",text:"Gain 2000 LP and draw 2 cards.",can:s=>true,ai:(s,ph)=>65,
  run:async s=>{await changeLP(s,P.lily.lp);if(!G.over)await drawCards(s,Math.min(P.lily.draw,S(s).deck.length));}},
 weisheng:{name:"Nitro Overdrive",text:"One Vehicle gains 500 ATK and can attack twice this turn; at the end of the turn draw 1 and discard 1.",
  can:s=>fu(s).some(m=>m.race==="Vehicle"),ai:(s,ph)=>ph===1&&G.turn>1&&fu(s).some(m=>m.race==="Vehicle"&&m.pos==="atk"&&canAttackWithLater(s,m))?72:0,
  run:async s=>{const m=await choose(s,fu(s).filter(m=>m.race==="Vehicle"),{title:"Nitro Overdrive: choose a Vehicle",score:m=>atkOf(m)+(m.pos==="atk"?1000:0)});if(!m)return;
    m.lkDouble=G.turn;LK(s).endDraw=G.turn;await boostTemp(m,P.weisheng.atk);floatText(elOf(m.uid),"DOUBLE ATTACK","info");}},
 keith:{name:"Nine Lives",text:"Revive 1 Catgirl from your Graveyard. It can't be destroyed until your next turn.",
  can:s=>hasSlot(s)&&S(s).gy.some(c=>c.type==="monster"&&c.race==="Catgirl"),ai:(s,ph)=>66,
  run:async s=>{const c=await choose(s,S(s).gy.filter(c=>c.type==="monster"&&c.race==="Catgirl"),{title:"Nine Lives: revive a Catgirl",score:c=>c.atk});
    if(c&&await specialSummon(s,c,"gy")){c.lkSafe=G.turn+2;floatText(elOf(c.uid),"NINE LIVES","heal");render();}}},
 eryll:{name:"Vengeance Rising",text:"One monster gains ATK equal to half the LP you've lost this duel (max 2000).",
  can:s=>fu(s).length>0&&LK(s).lost>0,ai:(s,ph)=>ph===1&&G.turn>1&&LK(s).lost>=3000&&fu(s).some(m=>m.pos==="atk")?70:LK(s).lost>=5000?55:0,
  run:async s=>{const v=Math.min(P.eryll.max,Math.floor(LK(s).lost*P.eryll.ratio));const m=await choose(s,fu(s),{title:`Vengeance Rising: +${v} ATK`,score:m=>atkOf(m)+(m.pos==="atk"?3000:0)});
    if(m){m.bonus=(m.bonus||0)+v;floatText(elOf(m.uid),`+${v} ATK`,"heal");render();await glow(m,"#c44dff");}}},
 kelvin:{name:"Final Lap",text:"All your monsters can attack directly this turn, but deal half damage, and this damage can't reduce the opponent below 1 LP.",
  can:s=>G.turn>1,ai:(s,ph)=>{if(ph!==1||G.turn<2)return 0;const att=fu(s).filter(m=>m.pos==="atk");const sum=att.reduce((a,m)=>a+Math.floor(atkOf(m)*P.kelvin.ratio),0);
    return mons(other(s)).length&&sum>=1500&&S(other(s)).lp>1?70:0;},
  run:async s=>{LK(s).kelvin=G.turn;for(const m of fu(s))floatText(elOf(m.uid),"FINAL LAP","info");await sleep(300);}},
 ben:{name:"Emergency Combine",text:"Special Summon a Robot from your deck or Graveyard, then send any number of cards from your field, hand or deck to the Graveyard. That Robot gains 200 ATK per card sent and is unaffected by destruction effects.",
  can:s=>hasSlot(s)&&S(s).deck.concat(S(s).gy).some(c=>c.type==="monster"&&c.race==="Robot"&&!c.extra),ai:(s,ph)=>ph===1?68:55,
  run:async s=>{const sd=S(s);const opts=[...sd.deck.filter(c=>c.type==="monster"&&c.race==="Robot"&&!c.extra).map(c=>({card:c,note:"From your deck"})),...sd.gy.filter(c=>c.type==="monster"&&c.race==="Robot"&&!c.extra).map(c=>({card:c,note:"From your Graveyard"}))];
    const r=await choose(s,opts,{title:"Emergency Combine: summon a Robot",score:c=>c.atk});if(!r)return;
    if(!await specialSummon(s,r,sd.gy.includes(r)?"gy":"deck"))return;r.lkNoFx=1;let n=0;
    if(isAI(s)){const keep=P.ben.aiKeepDeck;const fodder=[...sd.hand.filter(c=>c.type==="trap"||c.type==="monster"&&c.atk<1200),...sd.deck.slice(0,Math.max(0,sd.deck.length-keep))];
      for(const c of fodder){const z=sd.hand.includes(c)?sd.hand:sd.deck;const k=z.indexOf(c);if(k<0)continue;z.splice(k,1);toGY(c);n++;}
      if(n)say(s,`${sd.name} sends ${n} cards to the Graveyard.`);}
    else for(;;){const opts2=[...mons(s).filter(m=>m!==r).map(c=>({card:c,note:"From your field"})),...sts(s).map(c=>({card:c,note:"From your field"})),...sd.hand.map(c=>({card:c,note:"From your hand"})),...sd.deck.map(c=>({card:c,note:"From your deck"}))];
      const c=await choose(s,opts2,{title:`Emergency Combine: send a card (${n} sent, +${n*P.ben.per} ATK)`,sub:`Each card sent gives the Robot +${P.ben.per} ATK. Press Done when finished.`,optional:true,cancelLabel:"Done"});if(!c||G.over)break;
      if(fieldOut(c)){toGY(c);}else{const z=sd.hand.includes(c)?sd.hand:sd.deck.includes(c)?sd.deck:null;if(!z){const f=find(c.uid);if(f&&f.zone==="st"){sd.st[f.idx]=null;toGY(c);}else continue;}else{z.splice(z.indexOf(c),1);toGY(c);}}
      n++;say(s,`${sd.name} sends ${c.name} to the Graveyard.`);render();}
    if(onField(r)&&!r.lkBenDone){r.lkBenDone=1;r.bonus=(r.bonus||0)+n*P.ben.per;floatText(elOf(r.uid),`+${n*P.ben.per} ATK`,"heal");}render();await glow(r,"#6fd3ff");}},
 sabrina:{name:"Big Heart Hug",text:"All your opponent's monsters lose 500 ATK until the end of their next turn.",
  can:s=>fu(other(s)).length>0,ai:(s,ph)=>{const n=fu(other(s)).length;return n?(ph===1?52:48)+n*6:0;},
  run:async s=>{for(const m of fu(other(s))){m.lkMinus=P.sabrina.atk;m.lkMinusT=G.turn+1;floatText(elOf(m.uid),`-${P.sabrina.atk} ATK`,"dmg");}render();await sleep(350);}},
 christopher:{name:"Kopi Break",text:"Both players gain 1000 LP; your opponent can't attack during their next turn.",
  can:s=>true,ai:(s,ph)=>ph===2&&fu(other(s)).length?70:S(s).lp<=1500?66:0,
  run:async s=>{LK(other(s)).noAtk=G.turn+1;await changeLP(s,P.christopher.lp);if(!G.over)await changeLP(other(s),P.christopher.lp);}},
 lemon:{name:"I Quit!",text:"Destroy every monster on the field, then both players discard their whole hand. Then both players choose 5 cards from their Graveyard and shuffle them into their deck. Both players then draw 2.",
  can:s=>true,ai:(s,ph)=>{const ov=mons(other(s)).reduce((a,m)=>a+threat(m),0),mv=mons(s).reduce((a,m)=>a+threat(m),0);return ov>mv+1500||mons(other(s)).length>=2&&mons(s).length<=1?75:0;},
  run:async s=>{shakeEl("#field",true);await destroyMonsters([...mons(s),...mons(other(s))]);if(G.over)return;
    for(const x of [s,other(s)]){const sd=S(x);const h=sd.hand.splice(0);for(const c of h)toGY(c);if(h.length)log(`${sd.name} discards their whole hand (${h.length}).`,sc(x));}render();await sleep(250);
    for(const x of [s,other(s)]){const sd=S(x);for(let i=0;i<P.lemon.back;i++){const pool=sd.gy.filter(c=>!c.token);if(!pool.length)break;
      const c=await choose(x,pool,{title:`I Quit!: shuffle a card back (${i+1}/${P.lemon.back})`,sub:"Choose a card in your Graveyard to shuffle into your deck.",score:c=>c.type==="monster"?c.atk:1600});const k=sd.gy.indexOf(c);if(k<0)continue;
      sd.gy.splice(k,1);clearLk(c);Object.assign(c,{faceUp:false,pos:"atk",equippedTo:null,tempTurn:-1,bonus:0});sd.deck.push(c);}shuffle(sd.deck);log(`${sd.name} shuffles cards back into the deck.`,sc(x));}
    for(const x of [s,other(s)])if(!G.over)await drawCards(x,Math.min(P.lemon.draw,S(x).deck.length));}},
 sixing:{name:"Silent Speech",text:"Your opponent's Spells and Traps can't be activated this turn.",
  can:s=>true,ai:(s,ph)=>ph===1&&G.turn>1&&sts(other(s)).some(c=>!c.faceUp)&&fu(s).some(m=>m.pos==="atk")?66:0,
  run:async s=>{LK(other(s)).stLock=G.turn;for(const c of sts(other(s)))floatText(elOf(c.uid),"SEALED","info");await sleep(300);}},
 clement:{name:"The Ultimate Fusion!",text:"Fuse 3 monsters from your deck (1 Dragon, 1 Magician Girl, 1 Robot; you choose each) to summon THE DESTINY (4000/5000): attacks every opponent monster, unaffected by card effects, deals effect damage equal to each attacked monster's ATK (no piercing), and leaves the field at the end of the turn.",
  mats:[["Dragon","Dragon"],["Spellcaster","Magician Girl"],["Mecha","Robot"]],
  can:s=>hasSlot(s)&&LINKS.clement.mats.every(([r])=>S(s).deck.some(c=>c.type==="monster"&&c.race===r&&!c.extra)),
  ai:(s,ph)=>ph===1&&G.turn>1?95:0,
  run:async s=>{const sd=S(s);const mats=[];
    for(const [r,label] of LINKS.clement.mats){const c=await choose(s,sd.deck.filter(c=>c.type==="monster"&&c.race===r&&!c.extra&&!mats.includes(c)),{title:`The Ultimate Fusion: choose a ${label}`,sub:`Fusion material ${mats.length+1}/3 from your deck (${r}).`,score:c=>-c.atk});if(c)mats.push(c);}
    for(const c of mats){sd.deck.splice(sd.deck.indexOf(c),1);toGY(c);}shuffle(sd.deck);log(`${sd.name} fuses ${mats.map(c=>c.name).join(", ")}!`,sc(s));render();
    if(typeof AUDIO!=="undefined")try{AUDIO.play("fusion");}catch(e){}
    const d=mk("cl_destiny",s);sd.gy.push(d);await specialSummon(s,d,"gy");d.lkDestinyT=G.turn;
    floatText(elOf(d.uid),"THE DESTINY","heal");render();}},
 darkkelvin:{name:"Shared Sorrow",text:"Your opponent takes damage equal to half the LP you've lost this duel (max 2000). Then you may pay up to 2000 LP (never down to 0): every opponent monster permanently loses that much ATK, monsters reduced to 0 ATK are destroyed, and both players draw 1 card for each monster destroyed this way.",
  can:s=>LK(s).lost>0,ai:(s,ph)=>{const d=Math.min(P.darkkelvin.max,Math.floor(LK(s).lost*P.darkkelvin.ratio));if(d>=S(other(s)).lp)return 1000;
    const best=dkAiPay(s,dkPayOpts(s));return d>=1500||(best&&best.kills>=2)?60:0;},
  run:async s=>{await changeLP(other(s),-Math.min(P.darkkelvin.max,Math.floor(LK(s).lost*P.darkkelvin.ratio)));await dkSacrifice(s);}},
 jason:{name:"All-In Gamble",text:"Flip a coin. Heads: draw 3 and gain 1000 LP for each card drawn. Tails: your opponent draws 1 and you gain no LP.",
  can:s=>true,ai:(s,ph)=>S(s).hand.length<=5?56:0,
  run:async s=>{const h=Math.random()<.5;if(typeof AUDIO!=="undefined")try{AUDIO.play("coin");}catch(e){}
    log(`${S(s).name} flips a coin... ${h?"HEADS":"TAILS"}!`,sc(s));floatText($("#duel-"+s),h?"HEADS!":"TAILS...",h?"heal":"dmg");LK(s).coin=h?1:2;await sleep(500);
    if(h){let n=0;for(let i=0;i<P.jason.draw;i++){if(!S(s).deck.length)break;await drawCards(s,1);n++;}if(n)await changeLP(s,n*P.jason.lpPer);}
    else await drawCards(other(s),Math.min(P.jason.oppDraw,S(other(s)).deck.length));}},
 shaim:{name:"Limit Break Awakening",text:"One monster's ATK triples this turn; it goes to the Graveyard at the end of the turn.",
  can:s=>fu(s).length>0,ai:(s,ph)=>{if(ph!==1||G.turn<2)return 0;const m=bestBy(fu(s).filter(m=>m.pos==="atk"&&canAttackWithLater(s,m)),atkOf);if(!m)return 0;const a=atkOf(m)*P.shaim.mult;
    return !mons(other(s)).length&&a>=S(other(s)).lp?1000:a>oppMaxAny(s)+1500?66:0;},
  run:async s=>{const m=await choose(s,fu(s),{title:"Limit Break Awakening: triple a monster's ATK",score:m=>atkOf(m)+(m.pos==="atk"&&canAttackWithLater(s,m)?5000:0)-(m.ace?800:0)});if(!m)return;
    await boostTemp(m,atkOf(m)*(P.shaim.mult-1));m.lkDoom=G.turn;}},
 hisyam:{name:"Midnight Supper Rush",text:"Gain 1000 LP and Special Summon a Level 4 or lower Fried Chicken monster from your deck.",
  can:s=>true,ai:(s,ph)=>64,
  run:async s=>{await changeLP(s,P.hisyam.lp);if(G.over||!hasSlot(s))return;const c=await choose(s,S(s).deck.filter(c=>lvlOK(c,P.hisyam.maxLv)&&c.race==="Fried Chicken"),{title:"Midnight Supper Rush: Special Summon",score:c=>c.atk});
    if(c)await specialSummon(s,c,"deck");}},
 weiyao2:{name:"Photo Finish",text:"Your monsters gain 500 ATK for each monster you control this turn. Draw 1 card; if it's a monster, you may Special Summon it.",
  can:s=>true,ai:(s,ph)=>ph===1&&G.turn>1&&mons(s).length>=2?70:ph===2&&S(s).hand.length<=3?40:0,
  run:async s=>{LK(s).gallop=G.turn;for(const m of fu(s))floatText(elOf(m.uid),"PHOTO FINISH","info");render();
    if(!S(s).deck.length)return;await drawCards(s,1);const c=S(s).hand[S(s).hand.length-1];
    if(c&&c.type==="monster"&&hasSlot(s)){const y=await choose(s,[{card:c,note:"Special Summon it now?"}],{title:"Photo Finish: you drew a monster",optional:true,cancelLabel:"Keep in hand",confirmLabel:"Special Summon",ai:l=>l[0]});
      if(y)await specialSummon(s,c,"hand");}}},
 eunice:{name:"Fresh From the Oven",text:"Gain 1500 LP (your LP-gain effects trigger as normal).",can:s=>true,ai:(s,ph)=>60,
  run:async s=>{await changeLP(s,P.eunice.lp);}},
 kimberly:{name:"Quick Change",text:"Add 1 Costume Equip Spell from your deck to your hand, then move any of your Equips between your monsters.",
  can:s=>S(s).deck.some(isCos)||sts(s).some(c=>c.equippedTo)&&fu(s).length>1,ai:(s,ph)=>S(s).deck.some(isCos)?58:0,
  run:async s=>{const sd=S(s);const c=await choose(s,sd.deck.filter(isCos),{title:"Quick Change: add a Costume",score:c=>(c.fx.v||0)+Math.random()*100});
    if(c){sd.deck.splice(sd.deck.indexOf(c),1);shuffle(sd.deck);sd.hand.push(c);say(s,`${sd.name} adds ${isAI(s)?"a Costume":c.name} to their hand.`);render();}
    if(isAI(s))return;
    for(let k=0;k<10;k++){const eqs=sts(s).filter(e=>e.faceUp&&e.equippedTo&&onField(find(e.equippedTo)&&find(e.equippedTo).card));if(!eqs.length||fu(s).length<2)break;
      const e=await choose(s,eqs,{title:"Quick Change: move an Equip?",sub:"Choose an Equip to move, or press Done.",optional:true,cancelLabel:"Done"});if(!e)break;
      const t=await choose(s,fu(s).filter(m=>m.uid!==e.equippedTo),{title:`Move ${e.name} to...`,optional:true,cancelLabel:"Cancel"});if(!t)continue;
      e.equippedTo=t.uid;G._eqN=(G._eqN||0)+1;e.eqT=G._eqN;if(window.applyCostumes)applyCostumes();say(s,`${e.name} moves to ${t.name}.`);render();await glow(t,"#ff9ad5");}}},
 aoiyuki:{name:"Saigo no Uta (Last Song)",text:"Lose all but 1 LP. Deal damage equal to your strongest monster's ATK, then one monster's ATK x5 this turn. At the end of your turn, all your monsters are shuffled into the deck, then Special Summon 1 monster from your Graveyard in Defense Position with 0 DEF.",
  can:s=>fu(s).length>0,
  ai:(s,ph)=>{const best=Math.max(0,...fu(s).map(atkOf)),olp=S(other(s)).lp;if(best>=olp)return 1000;
    if(ph===1&&G.turn>1&&S(s).lp<=1500){const a=bestBy(fu(s).filter(m=>m.pos==="atk"&&canAttackWithLater(s,m)),atkOf);if(a&&!mons(other(s)).length&&best+atkOf(a)*P.aoiyuki.mult>=olp)return 900;}return 0;},
  run:async s=>{const sd=S(s);if(sd.lp>1)await changeLP(s,-(sd.lp-1));const top=bestBy(fu(s),atkOf);if(top){await glow(top,"#9fd0ff");await changeLP(other(s),-atkOf(top));}if(G.over)return;
    const m=await choose(s,fu(s),{title:"Last Song: ATK x5 this turn",score:m=>atkOf(m)+(m.pos==="atk"&&canAttackWithLater(s,m)?9000:0)});if(m&&onField(m))await boostTemp(m,atkOf(m)*(P.aoiyuki.mult-1));
    LK(s).aoiEnd=G.turn;}},
 /* ---------- v10 ---------- */
 sliver:{name:"I Hate Man!",lp:8000,lose:true,endTurn:true,text:"Send your entire Deck, your hand and every card on your field to the Graveyard, then end your turn.",
  can:s=>true,ai:()=>0,
  run:async s=>{const sd=S(s);shakeEl("#field",true);
    for(const m of mons(s)){const el=elOf(m.uid);if(el)anim(el,[{opacity:1},{opacity:0,transform:"translateY(40px) scale(.7)",filter:"grayscale(1)"}],450);}await sleep(460);
    let n=0;for(const m of mons(s)){if(fieldOut(m)){toGY(m);n++;}}
    sd.st.forEach((c,i)=>{if(c){sd.st[i]=null;toGY(c);n++;}});
    const h=sd.hand.splice(0);for(const c of h)toGY(c);const d=sd.deck.splice(0);for(const c of d)toGY(c);
    log(`${sd.name} sends ${n} field card${n===1?"":"s"}, ${h.length} card${h.length===1?"":"s"} in hand and the entire Deck (${d.length}) to the Graveyard.`,sc(s));render();await sleep(300);}},
 eryll2:{name:"THE END OF WORLD",text:"Destroy all cards on the field. Both players discard their entire hand. Then both players draw 1 card.",
  can:s=>true,
  ai:(s,ph)=>{const o=other(s),v=x=>mons(x).filter(m=>!m.destiny).reduce((a,m)=>a+threat(m),0)+sts(x).length*400+S(x).hand.length*250;
    const ov=v(o),mv=v(s);if(S(s).deck.length<2)return 0;return ov>mv+1500||mons(o).length>=2&&mons(s).length<=1&&ov>mv?76:0;},
  run:async s=>{shakeEl("#field",true);
    const all=[...mons(s),...mons(other(s))],imm=all.filter(m=>m.destiny);for(const m of imm)floatText(elOf(m.uid),"UNAFFECTED","info");
    await destroySTs([...sts(s),...sts(other(s))]);if(G.over)return;
    await destroyMonsters(all.filter(m=>!m.destiny));if(G.over)return;
    for(const x of [s,other(s)]){const sd=S(x);const h=sd.hand.splice(0);for(const c of h)toGY(c);if(h.length)log(`${sd.name} discards their entire hand (${h.length}).`,sc(x));}render();await sleep(250);
    for(const x of [s,other(s)]){if(G.over)return;if(S(x).deck.length)await drawCards(x,1);else log(`${S(x).name} has no card to draw.`,sc(x));}render();}},
 huiping:{name:"Spiral Arsenal",text:"Discard at least 1 card from your hand. Then shuffle your Deck and add up to 5 Level 7 or higher monsters from your Deck to your hand.",
  can:s=>S(s).hand.length>0,
  ai:(s,ph)=>{const n=S(s).deck.filter(c=>c.type==="monster"&&(c.level||0)>=7&&!c.extra).length;if(!n)return 0;return S(s).hand.length<=2||n>=2?(ph===1?66:58):0;},
  run:async s=>{const sd=S(s);let k=0;
    for(let i=0;i<60&&sd.hand.length;i++){const c=await choose(s,sd.hand,{title:k?"Spiral Arsenal: discard another?":"Spiral Arsenal: discard at least 1",sub:k?"Choose another card to discard, or press Done.":"Choose a card from your hand to send to the Graveyard.",optional:k>0,cancelLabel:"Done",
        ai:l=>k?null:bestBy(l,x=>-val(x))});
      const x=c||(k?null:sd.hand[0]);if(!x)break;const j=sd.hand.indexOf(x);if(j<0)break;sd.hand.splice(j,1);toGY(x);k++;say(s,`${sd.name} discards ${x.name}.`);render();await sleep(150);}
    shuffle(sd.deck);log(`${sd.name} shuffles their Deck.`,sc(s));
    const pool=()=>sd.deck.filter(c=>c.type==="monster"&&(c.level||0)>=7&&!c.extra);let got=[];
    if(pool().length<=5)got=pool();
    else for(let i=0;i<5;i++){const p=pool().filter(c=>!got.includes(c));if(!p.length)break;const c=await choose(s,p,{title:`Spiral Arsenal: add a monster (${i+1}/5)`,sub:"Choose a Level 7+ monster from your Deck.",score:c=>c.atk||0});if(c)got.push(c);else break;}
    for(const c of got){const j=sd.deck.indexOf(c);if(j<0)continue;sd.deck.splice(j,1);sd.hand.push(c);}
    say(s,got.length?`${sd.name} adds ${isAI(s)?got.length+" Level 7+ monster"+(got.length>1?"s":""):got.map(c=>c.name).join(", ")} to their hand.`:`${sd.name} has no Level 7+ monsters left in the Deck.`);render();await sleep(200);}},
 jocelyn:{name:"Oopsie Daisy!",lose:true,endTurn:true,text:"Send your entire Deck to the Graveyard, then end your turn.",
  can:s=>true,ai:()=>0,
  run:async s=>{const sd=S(s);shakeEl("#field",true);const d=sd.deck.splice(0);for(const c of d)toGY(c);
    log(`Oopsie! ${sd.name} sends the entire Deck (${d.length}) to the Graveyard.`,sc(s));render();await sleep(300);}},
 kenneth:{name:"GPA Required",text:"Send all monsters your opponent controls to the Graveyard.",
  can:s=>mons(other(s)).some(m=>!m.destiny),
  ai:(s,ph)=>{const o=other(s),t=mons(o).filter(m=>!m.destiny);if(!t.length)return 0;const ov=t.reduce((a,m)=>a+(m.faceUp?atkOf(m):1500),0),mv=mons(s).reduce((a,m)=>a+atkOf(m),0); /* spec: opp field ATK total >= his own, or lethal */
    const lethal=fu(o).filter(m=>m.pos==="atk").reduce((a,m)=>a+atkOf(m),0)>=S(s).lp;return ov>=mv||lethal?80:0;},
  run:async s=>{const o=other(s),t=mons(o).filter(m=>!m.destiny);for(const m of mons(o).filter(m=>m.destiny))floatText(elOf(m.uid),"UNAFFECTED","info");
    await Promise.all(t.map(m=>anim(elOf(m.uid),[{opacity:1},{opacity:0,transform:"translateY(-50px) scale(.8)",filter:"sepia(1) brightness(1.6)"}],500)));
    let n=0;for(const m of t){if(fieldOut(m)){toGY(m);n++;}}log(`${n} monster${n===1?"":"s"} of ${S(o).name} fail${n===1?"s":""} the exam and go${n===1?"es":""} to the Graveyard.`,sc(s));render();await sleep(250);}},
 /* ---------- v12 ---------- */
 keith2:{name:"Hostile Takeover",text:"Pay LP equal to the ATK of 1 monster your opponent controls (max 3000; never down to 0 LP) and take control of it permanently. Then draw 1 card.",
  can:s=>hasSlot(s)&&k2Targets(s).length>0,
  ai:(s,ph)=>{const p=k2AiPick(s);return p?(p.lethal?1000:76):0;},
  run:async s=>{const l=k2Targets(s);if(!l.length)return;const ai=k2AiPick(s);
    const m=await choose(s,l.map(m=>({card:m,hidden:!m.faceUp,note:m.faceUp?`Costs ${k2Cost(m)} LP (your LP ${S(s).lp} → ${S(s).lp-k2Cost(m)})`:"A face-down monster: costs its real ATK (max 3000)."})),
      {title:"Hostile Takeover: buy 1 monster",sub:`Pay LP equal to its ATK (max ${P.keith2.max}) and take control of it permanently. Then draw 1.`,ai:x=>ai&&x.find(o=>(o.card||o)===ai.m)||null,score:m=>k2Cost(m)});
    if(!m||!onField(m)||m.destiny||G.over)return;const cost=k2Cost(m);if(!(cost<S(s).lp)){say(s,"Not enough LP for that takeover.");return;}
    say(s,`${S(s).name} pays ${cost} LP for ${cname(m)}!`);if(typeof AUDIO!=="undefined")try{AUDIO.play("coin");}catch(e){}
    if(cost>0)await changeLP(s,-cost);if(G.over||!onField(m))return;
    await k2Take(s,m);if(G.over)return;if(S(s).deck.length)await drawCards(s,P.keith2.draw);render();}},
 lemon2:{name:"Paid Leave",text:"Special Summon up to 3 Zombies from your Graveyard in Attack Position (they can attack this turn). Each gains 500 ATK while on the field, and you gain 500 LP for each Zombie summoned. Their On Summon effects activate.",
  can:s=>hasSlot(s)&&l2Pool(s).length>0,
  ai:(s,ph)=>{const n=l2Pool(s).length;if(!n)return 0;if(l2Lethal(s))return 82;return n>=2?(ph===1?72:62):0;},
  run:async s=>{const sd=S(s);const got=[];
    for(let i=0;i<P.lemon2.n;i++){if(!hasSlot(s)||G.over)break;const pool=l2Pool(s).filter(c=>!got.includes(c));if(!pool.length)break;
      const c=await choose(s,pool,{title:`Paid Leave: revive a Zombie (${i+1}/${P.lemon2.n})`,sub:`Special Summoned in Attack Position with +${P.lemon2.atk} ATK while on the field. +${P.lemon2.lp} LP each.`,optional:i>0,cancelLabel:"Done",
        score:c=>(c.id==="l2_ace"?20000:c.id==="l2_buffet"?15000:0)+(c.atk||0)});
      if(!c)break;if(await specialSummon(s,c,"gy")){c.pos="atk";c.bonus=(c.bonus||0)+P.lemon2.atk;got.push(c);floatText(elOf(c.uid),`+${P.lemon2.atk} ATK`,"heal");render();await sleep(150);}}
    if(!got.length){say(s,"No Zombie could come back.");return;}
    say(s,`${got.length} Zombie${got.length>1?"s":""} come${got.length>1?"":"s"} back from Paid Leave!`);
    await changeLP(s,P.lemon2.lp*got.length);
    for(const c of got){if(G.over)return;if(onField(c)&&c.fx&&c.fx.onSummon){log(`${c.name}'s effect activates!`,sc(s));await resolveFx(s,c.fx.onSummon,c);}}render();}},
 weisheng2:{name:"Box Box Box!",text:"Return any number of your monsters to your hand (their modifiers are lost and their Equips go to the Graveyard). Then Special Summon 1 Level 7 or higher Racer from your Deck without Tribute. It gains 500 ATK while on the field and can attack twice this turn. Its On Summon effect activates.",
  can:s=>w2Pool(s).length>0&&(hasSlot(s)||w2Mine(s).length>0),
  ai:(s,ph)=>{if(ph!==1||G.turn<2||!w2Pool(s).length)return 0;const o=other(s);if(w2Lethal(s))return 1000;return mons(o).length<=2?72:0;},
  run:async s=>{let n=0;
    for(let i=0;i<5;i++){const l=w2Mine(s);if(!l.length||G.over)break;
      const m=await choose(s,l,{title:`Box Box Box!: return a monster to your hand? (${n} returned)`,sub:"Returned monsters lose their modifiers and their Equips go to the Graveyard. Press Done when finished.",optional:true,cancelLabel:"Done",ai:x=>w2AiBack(s,x,n)});
      if(!m||!onField(m))break;await bounceMonster(m);n++;}
    if(G.over)return;if(!hasSlot(s)){say(s,"No free Monster Zone: no Racer can come out of the pits.");return;}
    const c=await choose(s,w2Pool(s),{title:"Box Box Box!: Special Summon a Level 7+ Racer",sub:`From your Deck, without Tribute. +${P.weisheng2.atk} ATK while on the field and it can attack twice this turn.`,score:c=>(c.id==="w2_ace"?10000:0)+(c.atk||0)});
    if(!c||!await specialSummon(s,c,"deck"))return;c.bonus=(c.bonus||0)+P.weisheng2.atk;c.lkDouble=G.turn;
    floatText(elOf(c.uid),`+${P.weisheng2.atk} ATK · DOUBLE ATTACK`,"heal");render();await glow(c,"#ff2a2a");
    if(c.fx&&c.fx.onSummon&&!G.over){log(`${c.name}'s effect activates!`,sc(s));await resolveFx(s,c.fx.onSummon,c);}render();}},
 gdragon:{name:"Bang Bang Bang!",text:"Choose up to 3 monsters your opponent controls. Those with 1500 or less ATK are destroyed; the others lose 1000 ATK. Your Idols gain 300 ATK for each monster destroyed this way, while on the field.",
  can:s=>gdTargets(s).length>0,
  ai:(s,ph)=>{const t=gdTargets(s);if(!t.length)return 0;const k=t.filter(gdKillEst).length;if(k)return 66+k*6;
    if(ph===1&&G.turn>1){const my=fu(s).filter(m=>m.pos==="atk"&&canAttackWithLater(s,m));
      if(t.some(x=>x.faceUp&&my.some(m=>atkOf(m)<=atkOf(x)&&atkOf(m)>atkOf(x)-P.gdragon.minus)))return 62;}return 0;},
  run:async s=>{const picked=[];
    for(let i=0;i<P.gdragon.n;i++){const l=gdTargets(s).filter(m=>!picked.includes(m));if(!l.length||G.over)break;
      const m=await choose(s,l.map(m=>({card:m,hidden:!m.faceUp,note:m.faceUp?(gdKillEst(m)?"Destroyed (1500 ATK or less)":`Loses ${P.gdragon.minus} ATK`):"A face-down monster: its real ATK is checked."})),
        {title:`Bang Bang Bang!: choose a target (${i+1}/${P.gdragon.n})`,sub:`1500 ATK or less: destroyed. Otherwise: -${P.gdragon.minus} ATK. Press Done to stop choosing.`,optional:i>0,cancelLabel:"Done",
        score:m=>(gdKillEst(m)?10000:0)+threat(m)});
      if(!m)break;picked.push(m);}
    if(!picked.length)return;shakeEl("#field");const kill=[];
    for(const m of picked){if(!onField(m))continue;const a=realAtk(m);if(m.faceUp===false){}
      if(a>0&&a<=P.gdragon.kill)kill.push(m);else{m.bonus=(m.bonus||0)-P.gdragon.minus;floatText(elOf(m.uid),`-${P.gdragon.minus} ATK`,"dmg");}}
    render();await sleep(300);if(kill.length)await destroyMonsters(kill);if(G.over)return;
    const n=kill.filter(m=>!onField(m)).length;
    if(n){const ids=fu(s).filter(m=>m.race==="Idol"&&gdMine(m));for(const m of ids){m.bonus=(m.bonus||0)+P.gdragon.per*n;floatText(elOf(m.uid),`+${P.gdragon.per*n} ATK`,"heal");}
      say(s,`${n} monster${n>1?"s":""} destroyed: ${ids.length?`your Idols gain ${P.gdragon.per*n} ATK`:"no Idol to power up"}.`);}
    else say(s,"No monster was destroyed.");render();await sleep(200);}}

};
window.LINKS=LINKS;
/* v10: new duelists have no win clips or expression sheets - fall back to the still portrait */
try{for(const k of ["sliver","eryll2","huiping","jocelyn","kenneth","keith2","lemon2","weisheng2","gdragon"]){if(typeof CLIP_BAD!=="undefined")CLIP_BAD["win_"+k]=1;
  if(typeof EXPR_DATA!=="undefined"&&typeof PORTRAITS!=="undefined"&&PORTRAITS[k])for(const x of ["hurt","point","talk","win","ace","happy","sad","angry"])if(!EXPR_DATA[k+"_"+x])EXPR_DATA[k+"_"+x]=PORTRAITS[k];}}catch(e){}

try{if(typeof THEME_COL!=="undefined")Object.assign(THEME_COL,{Money:"#ffc93c",Zombie:"#8bd45a",Racer:"#ff2a2a"});}catch(e){}
/* ---------- gate + activation ---------- */
/* v10: per-Link LP gate (Sliver's "I Hate Man!" opens at 8000; everything else LINK_LP) */
function linkLP(s){const L=G&&G.sides&&G.sides[s]?LINKS[S(s).char]:null;return L&&L.lp||LINK_LP;}window.linkLP=linkLP;
let lkGuestTry=null; /* v9i: last guest Link intent (gid+turn) */
function canLink(s){if(window.LINKS_OFF||!G||!G.sides||G.over||!G.sides[s])return false;const L=LINKS[S(s).char];if(!L)return false;const k=LK(s);
  if(k.used||S(s).lp>linkLP(s)||G.current!==s||!(G.phase==="main1"||G.phase==="main2"))return false;
  if(lkGuestTry&&guestNow()&&lkGuestTry.turn===G.turn&&lkGuestTry.gid===(typeof GID!=="undefined"?GID:0))return false;
  try{return !!L.can(s);}catch(e){return false;}}
window.canLink=canLink;
function linkStatus(s){const k=LK(s);if(k.used)return "used";if(S(s).lp>linkLP(s))return "locked";return canLink(s)?"ready":"wait";}window.linkStatus=linkStatus;
async function linkCutscene(s){if(!G||!G.sides)return;const ch=S(s).char,C=CHARS[ch],L=LINKS[ch];if(!L)return;
  const old=document.getElementById("lkcut");if(old)old.remove();
  const d=document.createElement("div");d.id="lkcut";d.className="lkcut "+(s==="player"?"lk-p":"lk-e");d.style.setProperty("--c",C.color||"#7ff");
  d.innerHTML=`<div class="lkbars"></div><div class="lkport"><img src="${PORTRAITS[C.img]||""}" alt=""></div><div class="lktxt"><small>CHRONICLES LINK</small><b>${L.name}</b><i>${S(s).name}</i></div><div class="lkflash"></div>`;
  ($("#app")||document.body).appendChild(d);d.onclick=()=>d.remove();
  await realSleep(1700);d.classList.add("out");await realSleep(260);d.remove();}
window.linkCutscene=linkCutscene;
/* v9i: on an online GUEST a Link never runs locally - it always goes to the host as a "link" intent (host-authoritative;
   the host runs it and any chooser comes back through the host choice flow). Fixes the guest bot running a Link's
   chooser locally from aiMain (e.g. Wei Sheng's "choose a Vehicle"), which nobody could answer, stalling the duel.
   One attempt per turn, so a rejected intent cannot loop the AI. */
async function activateLink(s){if(guestNow()){if(s!=="player"||!canLink(s)||typeof netIntent!=="function")return false;
    lkGuestTry={gid:typeof GID!=="undefined"?GID:0,turn:G.turn};const r=await netIntent("link",{});return !!(r&&r.ok);}
  if(!canLink(s))return false;const L=LINKS[S(s).char];if(L.lose&&isAI(s))return false;/* v10: the AI never uses a duel-losing Link */const k=LK(s);k.used=1;k.usedT=G.turn;
  log(`✦ CHRONICLES LINK ✦ ${S(s).name}: ${L.name.replace(/!$/,"")}!`,sc(s));G.stats.links=(G.stats.links||0)+1;
  if(typeof netFx==="function"&&typeof NET!=="undefined"&&NET&&NET.role==="host"&&G.net)try{netFx("link",{s});}catch(e){}
  if(typeof AUDIO!=="undefined")try{AUDIO.play("link");}catch(e){}
  speak(s,"ace",.8);render();await linkCutscene(s);
  try{await L.run(s);}catch(e){if(e===ABORT)throw e;console.error(e);}
  if(L.endTurn&&G&&!G.over)linkEndTurn(s,G.turn);
  render();return true;}
/* v10: joke Links end the turn. Waits until the current action (offline act / host intent) has released G.busy, then ends
   the human turn through G.humanEnd (offline player, or the host ending its remote guest's turn). */
function linkEndTurn(s,t){let n=0;const g0=typeof GID!=="undefined"?GID:0;
  const tick=()=>{if(!G||!G.sides||G.over||G.turn!==t||G.current!==s||(typeof GID!=="undefined"&&GID!==g0))return;
    if(G.busy||!G.humanEnd||G.choice){if(++n<300)setTimeout(tick,100);return;}
    try{if(typeof closeMenu==="function")closeMenu();}catch(e){}G.ui={mode:null};log(`${S(s).name}'s turn ends.`,sc(s));G.busy=true;render();const f=G.humanEnd;G.humanEnd=null;f();};
  setTimeout(tick,60);}
window.linkEndTurn=linkEndTurn;
window.activateLink=activateLink;

/* ---------- engine hooks ---------- */
const bAtk=atkOf;atkOf=function(m){if(m&&m.destiny&&G&&G.sides)return P.clement.atk;let a=bAtk.apply(this,arguments);
  if(!m||!G||!G.sides||!m.owner||!G.sides[m.owner]||!m.faceUp)return a;
  if(m.lkMinusT!=null&&G.turn<=m.lkMinusT)a-=m.lkMinus||0;
  const k=S(m.owner).lk;if(k&&(k.kaitoUntil>G.turn&&m.race==="Warrior"||k.gallop===G.turn)&&onField(m)){
    if(k.kaitoUntil>G.turn&&m.race==="Warrior")a+=P.kaito.atk;if(k.gallop===G.turn)a+=P.weiyao2.per*mons(m.owner).length;}
  return Math.max(0,a);};
const bCLP=changeLP;changeLP=async function(s,delta){
  if(G&&G.sides&&delta<0&&G._lkHalf&&G._lkHalf.o===s){delta=-Math.ceil(-delta*P.kelvin.ratio);const lp=S(s).lp;if(lp+delta<1)delta=Math.min(0,1-lp);
    if(!delta){floatText($("#duel-"+s),"HOLDS AT 1","info");log(`${S(s).name} hangs on at 1 LP (Final Lap).`,"s");await sleep(250);return;}}
  if(G&&G.sides&&delta<0&&!guestNow()){const k=LK(s);k.lost=(k.lost||0)+Math.min(S(s).lp,-delta);}
  return bCLP.call(this,s,delta);};
function protect(c,battle){if(!G||!c)return null;if(c.lkSafe>G.turn)return "NINE LIVES";
  if(battle&&c.faceUp&&c.race==="Warrior"&&G.sides[c.owner]&&LK(c.owner).kaitoUntil>G.turn)return "LAST STAND";
  if(!battle&&c.lkNoFx)return "COMBINED";if(!battle&&c.destiny)return "UNAFFECTED";return null;}
const bBD=battleDestroy;battleDestroy=async function(list){G._lkBattle=(G._lkBattle||0)+1;try{return await bBD.apply(this,arguments);}finally{if(G)G._lkBattle--;}};
const bDM=destroyMonsters;destroyMonsters=async function(list){if(G&&G.sides&&list){const battle=G._lkBattle>0;
    list=list.filter(c=>{const p=c&&onField(c)&&protect(c,battle);if(p){floatText(elOf(c.uid),p,"info");log(`${c.name} is not destroyed (${p}).`,sc(c.owner));}return !p;});}
  return bDM.call(this,list);};
const bPB=previewBattle;previewBattle=function(att,tgt){const r=bPB.apply(this,arguments);if(tgt){if(r.killDef&&protect(tgt,true))r.killDef=false;if(r.killAtt&&protect(att,true))r.killAtt=false;
  if(att.destiny){r.dmgDef=(tgt.pos==="atk"?r.dmgDef:0)+atkOf(tgt);}}return r;};
const bTG=toGY;toGY=function(c){const r=bTG.apply(this,arguments);if(c){clearLk(c);if(c.destiny&&G&&G.sides&&G.sides[c.owner]){const g=S(c.owner).gy,i=g.indexOf(c);if(i>=0)g.splice(i,1);}}return r;};
const bBM=bounceMonster;bounceMonster=async function(m){if(m&&m.destiny){floatText(elOf(m.uid),"UNAFFECTED","info");return;}const r=await bBM.apply(this,arguments);if(m)clearLk(m);return r;};
const pre=(s,c)=>G.phase==="battle"&&G.current===s&&G.turn>1&&!G.battleEnded&&c&&c.faceUp&&c.pos==="atk";
const bCAW=canAttackWith;canAttackWith=function(s,c){if(!c||!G||!G.sides)return false;if(LK(s).noAtk===G.turn)return false;if(c.lkNoAtk===G.turn)return false;
  if(c.destiny){if(!pre(s,c))return false;if(c.attackedTurn!==G.turn)return true;if(c.lkDirect===G.turn)return false;const h=hitSet(c);return mons(other(s)).some(m=>!h.has(m.uid));}
  if(bCAW.apply(this,arguments))return true;return pre(s,c)&&c.lkDouble===G.turn&&c.attackedTurn===G.turn&&c.attackCount<2;};
const bCGD=canGoDirect;canGoDirect=function(s,c){if(c&&c.destiny)return c.attackedTurn!==G.turn&&!mons(other(s)).length;if(G&&G.sides&&LK(s).kelvin===G.turn)return true;return bCGD.apply(this,arguments);};
const bCAL=canAttackWithLater;canAttackWithLater=function(s,m){if(m&&G&&m.lkNoAtk===G.turn)return false;return bCAL.apply(this,arguments)||!!(m&&(m.destiny||m.lkDouble===G.turn&&m.attackCount<2));};
const bATK=attack;attack=async function(s,attUid,tgtUid){if(!G||!G.sides||guestNow())return bATK.apply(this,arguments);
  const af=find(attUid),att=af&&af.card,tf=tgtUid?find(tgtUid):null,tgt=tf&&tf.card;
  if(att&&att.destiny&&tgt&&hitSet(att).has(tgt.uid)){log(`${att.name} has already attacked ${cname(tgt)} this turn.`,"s");return;}
  const tAtk=att&&att.destiny&&tgt?atkOf(tgt):0;
  const half=!tgt&&LK(s).kelvin===G.turn;
  if(half)G._lkHalf={o:other(s)};let r;
  try{r=await bATK.apply(this,arguments);}finally{if(G)G._lkHalf=null;}
  if(att&&att.destiny&&G&&!G.over){if(tgt)addHit(att,tgt.uid);else att.lkDirect=G.turn;
    if(tgt&&tAtk>0&&onField(att)){log(`THE DESTINY's judgment: ${tAtk} effect damage!`,sc(s));await changeLP(other(s),-tAtk);}}
  return r;};
const bTF=trapsFor;trapsFor=function(s){const l=bTF.apply(this,arguments);return G&&G._lkImm?l.filter(c=>!["negate","destroyAttacker","shrink"].includes(c.fx.k)):l;};
const bQT=qTarget;qTarget=function(s,c,ctx){const r=bQT.apply(this,arguments);if(r&&r!==true&&r.destiny)return null;
  if(r&&c.fx.k!=="qBoost"&&ctx&&ctx.att&&ctx.att.destiny&&c.fx.k==="qNegate")return null;return r;};
if(typeof qCands==="function"){const bQC=qCands;qCands=function(){return bQC.apply(this,arguments).filter(m=>!(m&&(m.destiny||m.card&&m.card.destiny)));};}
const bRW=responseWindow;responseWindow=async function(r,kind,ctx){if(G&&G.sides&&G.sides[r]&&LK(r).stLock===G.turn)return null;
  const prev=G._lkImm;G._lkImm=!!(ctx&&ctx.att&&ctx.att.destiny);try{return await bRW.apply(this,arguments);}finally{if(G)G._lkImm=prev;}};
async function lkEnd(side){const k=LK(side);
  for(const x of ["player","enemy"])for(const m of mons(x).filter(m=>m.destiny)){const el=elOf(m.uid);if(el)await anim(el,[{opacity:1},{opacity:0,transform:"translateY(-60px) scale(1.3)",filter:"brightness(3)"}],500);
    fieldOut(m);toGY(m);log("THE DESTINY returns to the stars.",sc(x));render();}
  for(const m of mons(side).filter(m=>m.lkDoom===G.turn)){if(G.over)return;fieldOut(m);toGY(m);log(`${m.name} burns out and goes to the Graveyard (Limit Break).`,sc(side));render();await sleep(250);}
  if(k.endDraw===G.turn&&!G.over){log(`Nitro Overdrive: ${S(side).name} draws 1 and discards 1.`,sc(side));if(S(side).deck.length)await drawCards(side,1);await discardChoose(side,1,"Nitro Overdrive: discard 1");}
  if(k.aoiEnd===G.turn&&!G.over){const sd=S(side);const ms=mons(side);
    for(const m of ms){fieldOut(m);if(m.extra||m.token){toGY(m);continue;}clearLk(m);Object.assign(m,{faceUp:false,pos:"atk",equippedTo:null,guardUsed:false,tempAtk:0,tempTurn:-1,bonus:0,attackCount:0,attackedTurn:-1,summonedTurn:-1,posChangedTurn:-1});sd.deck.push(m);}
    if(ms.length){shuffle(sd.deck);log(`Last Song ends: ${sd.name}'s monsters return to the deck.`,sc(side));render();await sleep(300);}
    const c=await choose(side,sd.gy.filter(c=>c.type==="monster"&&!c.token),{title:"Last Song: Special Summon from your Graveyard",sub:"It is summoned in Defense Position with 0 DEF.",score:c=>c.atk});
    if(c)await ssDef(side,c,"gy",true);}}
const bEP=endPhase;endPhase=async function(side){if(G&&G.sides&&!G.over&&!guestNow())await lkEnd(side);return bEP.apply(this,arguments);};
const bSD=startDuel;startDuel=function(){const r=bSD.apply(this,arguments);if(G&&G.sides)for(const s of ["player","enemy"])LK(s);return r;};

/* ---------- AI ---------- */
const bAPA=aiPickAction;aiPickAction=function(s,phaseNum){const b=bAPA.apply(this,arguments);
  if(canLink(s)){let sc2=0;try{sc2=LINKS[S(s).char].ai(s,phaseNum)||0;}catch(e){}if(sc2>0&&(!b||sc2>b.sc))return {sc:sc2,f:()=>activateLink(s)};}
  return b;};
const bACT=aiChooseTarget;aiChooseTarget=function(s,att){const o=other(s);
  if(att&&att.destiny){const h=hitSet(att);const l=mons(o).filter(m=>!h.has(m.uid));if(!l.length)return mons(o).length?null:{t:null};return {t:bestBy(l,m=>m.faceUp?atkOf(m):1000)};}
  if(LK(s).kelvin===G.turn&&S(o).lp>1){const r=bACT.apply(this,arguments);if(r&&r.t&&r.t.faceUp&&r.t.pos==="atk"&&atkOf(att)>atkOf(r.t)+1000)return r;return {t:null};}
  return bACT.apply(this,arguments);};
aiBattle=async function(s){if(LK(s).noAtk===G.turn)return;
  const list=mons(s).filter(m=>m.faceUp&&m.pos==="atk").sort((a,b)=>atkOf(b)-atkOf(a));
  for(const m of list){for(let rep=0;rep<6;rep++){if(G.over||G.phase!=="battle"||G.battleEnded)return;const f=find(m.uid);if(!f||f.zone!=="monsters"||!canAttackWith(s,m))break;
    const ch=aiChooseTarget(s,m);if(!ch)break;await attack(s,m.uid,ch.t?ch.t.uid:null);await sleep(350);}}};

/* ---------- UI ---------- */
const css=document.createElement("style");css.textContent=`
.lkpanel{margin-top:6px;border-radius:9px;padding:4px 7px;font-size:11px;line-height:1.2;border:1px solid rgba(255,255,255,.18);background:linear-gradient(135deg,rgba(40,30,80,.85),rgba(15,10,35,.85));color:#cfd3ff;position:relative;cursor:default;user-select:none}
.lkpanel .lkh{display:flex;align-items:center;gap:5px;font-weight:800;letter-spacing:.06em;font-size:9.5px;color:#9aa0d8}
.lkpanel .lkh .gem{width:9px;height:9px;transform:rotate(45deg);background:#555a80;border-radius:2px;flex:none}
.lkpanel .lkn{font-weight:800;font-size:12px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lkpanel .lks{font-size:9.5px;opacity:.85}
.lkpanel.locked{opacity:.78}
.lkpanel.used{opacity:.5;filter:grayscale(.7)}
.lkpanel.ready{cursor:pointer;color:#fff;border-color:#ffe08a;background:linear-gradient(135deg,#3b1d6e,#1b3a7a 55%,#6a2c7a);box-shadow:0 0 10px #ffd36b,0 0 22px rgba(140,180,255,.6);animation:lkglow 1.2s ease-in-out infinite}
.lkpanel.ready .gem{background:#ffe08a;box-shadow:0 0 8px #fff}
.lkpanel.ready .lkh{color:#ffe08a}
.lkpanel.ready:hover{transform:scale(1.03)}
.lkpanel.wait .gem{background:#8fd1ff}
.lkpanel .lktip{display:none;position:absolute;left:104%;top:-4px;width:230px;padding:8px 10px;border-radius:9px;background:rgba(10,8,26,.96);border:1px solid #ffd36b;color:#eee;font-size:11.5px;line-height:1.35;z-index:60;box-shadow:0 6px 20px #000a}
.duelist.enemy .lkpanel .lktip{top:auto;bottom:-4px}
.lkpanel:hover .lktip{display:block}
@keyframes lkglow{0%,100%{box-shadow:0 0 8px #ffd36b,0 0 16px rgba(140,180,255,.5)}50%{box-shadow:0 0 16px #fff2b0,0 0 34px rgba(170,140,255,.9)}}
.lkcut{position:absolute;inset:0;z-index:950;pointer-events:auto;overflow:hidden;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at center,rgba(0,0,0,.35),rgba(0,0,0,.75));animation:lkin .25s ease-out}
.lkcut.out{animation:lkout .26s ease-in forwards}
.lkcut .lkbars{position:absolute;left:-10%;right:-10%;top:50%;height:190px;margin-top:-95px;transform:skewY(-6deg);background:linear-gradient(90deg,transparent,var(--c) 18%,#fff 50%,var(--c) 82%,transparent);opacity:.85;box-shadow:0 0 60px var(--c);animation:lkbar .5s cubic-bezier(.2,.9,.3,1.2)}
.lkcut .lkport{position:absolute;left:12%;top:50%;width:250px;height:250px;margin-top:-125px;border-radius:50%;overflow:hidden;border:5px solid #fff;box-shadow:0 0 40px var(--c),0 0 90px #fff8;animation:lkport .55s cubic-bezier(.2,.9,.3,1.3)}
.lkcut.lk-e .lkport{left:auto;right:12%}
.lkcut .lkport img{width:100%;height:100%;object-fit:cover}
.lkcut .lktxt{position:relative;text-align:center;margin-left:240px;animation:lktx .6s .1s both cubic-bezier(.2,.9,.3,1.2)}
.lkcut.lk-e .lktxt{margin-left:0;margin-right:240px}
.lkcut .lktxt small{display:block;font-size:20px;letter-spacing:.5em;font-weight:900;color:#1a1033;text-shadow:0 0 8px #fff}
.lkcut .lktxt b{display:block;font-size:46px;font-weight:900;color:#fff;letter-spacing:.04em;text-shadow:0 0 6px #000,0 0 18px var(--c),0 3px 0 #2b1650;-webkit-text-stroke:1px #2b1650}
.lkcut .lktxt i{display:block;font-size:16px;color:#1a1033;font-weight:800;text-shadow:0 0 6px #fff}
.lkcut .lkflash{position:absolute;inset:0;background:#fff;animation:lkfl .45s ease-out forwards;pointer-events:none}
@keyframes lkin{from{opacity:0}to{opacity:1}}@keyframes lkout{to{opacity:0;transform:scale(1.05)}}
@keyframes lkbar{from{transform:skewY(-6deg) scaleX(0)}to{transform:skewY(-6deg) scaleX(1)}}
@keyframes lkport{from{transform:translateX(-160px) scale(.6);opacity:0}to{transform:none;opacity:1}}
@keyframes lktx{from{transform:translateX(200px) scale(1.4);opacity:0}to{transform:none;opacity:1}}
@keyframes lkfl{from{opacity:.9}to{opacity:0}}
.sel-skill{margin-top:6px;padding:6px 10px;border-radius:8px;border:1px solid #ffd36b88;background:linear-gradient(135deg,rgba(60,40,110,.6),rgba(20,30,70,.6));font-size:12.5px;line-height:1.35}
.sel-skill b{color:#ffe08a;letter-spacing:.04em}
.lkconf-bg{position:fixed;inset:0;z-index:9800;background:rgba(5,3,15,.72);display:flex;align-items:center;justify-content:center;animation:lkin .2s}
.lkconf{max-width:420px;width:88vw;padding:20px 22px;border-radius:16px;border:2px solid #ff6b6b;background:linear-gradient(160deg,#2a1240,#140a26);color:#fff;text-align:center;box-shadow:0 0 40px #ff3b3b66}
.lkconf .lkch{font-size:11px;letter-spacing:.35em;color:#ffd36b}.lkconf b{display:block;font-size:28px;margin:6px 0;color:#ffe08a}
.lkconf .lkwarn{font-size:20px;font-weight:900;color:#ff7b7b;margin:8px 0}.lkconf .lktxt2{font-size:13px;opacity:.85}
.lkconf .lkbtns{display:flex;gap:12px;justify-content:center;margin-top:12px}.lkconf .btn{min-width:120px;padding:10px 14px;border-radius:10px;font-weight:800;cursor:pointer;border:0}
.lkconf .lkno{background:#3c3a5c;color:#fff}.lkconf .lkyes{background:linear-gradient(135deg,#ff4d4d,#b3122e);color:#fff}
@media (max-height:700px){.lkcut .lkport{width:190px;height:190px;margin-top:-95px}.lkcut .lktxt b{font-size:34px}.lkpanel .lks{display:none}}`;
document.head.appendChild(css);
function chips(s){const k=LK(s),t=G.turn,o=[];if(k.kaitoUntil>t)o.push("Last Stand");if(k.kelvin===t)o.push("Final Lap");if(k.stLock===t)o.push("S/T sealed");if(k.noAtk>=t)o.push("Can't attack");
  if(k.gallop===t)o.push("Photo Finish");if(k.aoiEnd===t)o.push("Last Song");if(k.endDraw===t)o.push("Nitro");return o;}
function linkPanel(s){const L=LINKS[S(s).char];if(!L)return "";const st=linkStatus(s);const mine=s==="player"&&!G.auto;
  const lab={ready:mine?"READY — CLICK TO ACTIVATE":"READY",locked:`UNLOCKS AT ${linkLP(s)} LP`,used:"USED",wait:"AVAILABLE IN YOUR MAIN PHASE"}[st];
  const ch=chips(s);const esc=x=>String(x).replace(/"/g,"&quot;");
  return `<div class="lkpanel ${st}" data-link="${s}" title=""><div class="lkh"><span class="gem"></span>CHRONICLES LINK</div><div class="lkn">${L.name}</div><div class="lks">${lab}${ch.length?" · "+ch.join(" · "):""}</div>
    <div class="lktip"><b style="color:#ffe08a">${L.name}</b><br>${esc(L.text)}<br><span style="opacity:.75;font-size:10.5px">Once per duel · LP ${linkLP(s)} or less · your Main Phase${L.lose?" · <b style=\"color:#ff8a8a\">this will lose the duel</b>":""}</span></div></div>`;}
window.linkPanel=linkPanel;
const bDH=duelistHTML;duelistHTML=function(s){let h=bDH.apply(this,arguments);
  if(s==="enemy"&&G.ui&&G.ui.mode==="attack"&&!/targetable/.test(h.slice(0,120))){const a=find(G.ui.attUid);if(a&&canGoDirect("player",a.card))h=h.replace('class="duelist enemy ','class="duelist enemy targetable ');}
  return h;};  /* v9f preview: Link moved onto the portrait (k_linkport.js) */
document.addEventListener("click",e=>{const p=e.target.closest&&e.target.closest("[data-link]");if(!p||!G||!G.sides)return;e.stopPropagation();e.stopImmediatePropagation();
  const s=p.dataset.link;if(s!=="player"||G.auto)return;
  const go=()=>{if(!G||!G.sides||G.over)return;
    if(typeof NET!=="undefined"&&NET&&NET.role==="guest"&&G.net){if(typeof netIntent==="function")netIntent("link",{});return;}
    if(!humanTurn()||!canLink("player"))return;act(()=>activateLink("player"));};
  const L=LINKS[S("player").char];
  if(L&&L.lose){if(linkStatus("player")!=="ready")return;if(!(typeof NET!=="undefined"&&NET&&NET.role==="guest"&&G.net)&&!humanTurn())return;linkLoseConfirm(L,go);return;}
  go();},true);
/* v10: "This will lose the duel" confirmation - only for Links flagged lose (I Hate Man!, Oopsie Daisy!) */
function linkLoseConfirm(L,go){const old=document.getElementById("lkconfirm");if(old)old.remove();
  const g0=typeof GID!=="undefined"?GID:0,t0=G.turn;
  const d=document.createElement("div");d.id="lkconfirm";d.className="lkconf-bg";
  d.innerHTML=`<div class="lkconf"><div class="lkch">✦ CHRONICLES LINK ✦</div><b>${L.name}</b><p class="lkwarn">⚠ This will lose the duel.</p><p class="lktxt2">${L.text}</p><p>Activate it anyway?</p>
    <div class="lkbtns"><button class="btn lkno" id="lkc-no">Cancel</button><button class="btn lkyes" id="lkc-yes">Yes, activate</button></div></div>`;
  ($("#app")||document.body).appendChild(d);
  const close=()=>{clearInterval(iv);d.remove();};
  const iv=setInterval(()=>{if(!document.body.contains(d)){clearInterval(iv);return;}if(!G||!G.sides||G.over||G.turn!==t0||(typeof GID!=="undefined"&&GID!==g0)||linkStatus("player")!=="ready")close();},250);
  d.addEventListener("click",e=>{e.stopPropagation();if(e.target===d||e.target.id==="lkc-no"){close();return;}if(e.target.id==="lkc-yes"){close();go();}});}
window.linkLoseConfirm=linkLoseConfirm;
/* select screen: show the skill */
const bDT=detailHTML;detailHTML=function(c){let h=bDT.apply(this,arguments);const L=LINKS[c];if(!L)return h;
  const add=`<div class="sel-skill"><b>✦ CHRONICLES LINK: ${L.name}</b><br>${L.text}<br><span style="opacity:.7;font-size:11px">Once per duel, when your LP is ${L.lp||LINK_LP} or less, in your Main Phase.${L.lose?' <b style="color:#ff8a8a">Activating it loses the duel.</b>':''}</span></div>`;
  const k=h.lastIndexOf('<div class="ace">');if(k<0)return h;const e=h.indexOf("</div>",k)+6;return h.slice(0,e)+add+h.slice(e);};
window.linkSelectHTML=c=>{const L=LINKS[c];return L?`<b>✦ ${L.name}</b><br>${L.text}`:"";};
/* aces: include extra-deck aces (Ben, Clement keep theirs in the Extra Deck) */
aceNames=function(ch){return Object.keys(CARDS).filter(id=>CARDS[id].ch===ch&&CARDS[id].ace&&!CARDS[id].retired&&!CARDS[id].token).map(id=>CARDS[id].name);};
/* card text for THE DESTINY */
const bCT=cardText;cardText=function(c){if(c&&c.destiny)return ["Can attack every monster your opponent controls once each. Unaffected by card effects. When it attacks: effect damage equal to the attacked monster's ATK (normal battle damage still applies vs Attack Position; no piercing). Leaves the field at the end of the turn."];return bCT.apply(this,arguments);};
/* sound: original procedural chime (no samples) */
if(typeof AUDIO!=="undefined"&&AUDIO.SFX){AUDIO.SFX.link=(c,o,t)=>{const mk2=(f,st,d,type,v)=>{const g=c.createGain(),x=c.createOscillator();x.type=type;x.frequency.setValueAtTime(f,t+st);
    g.gain.setValueAtTime(0.0001,t+st);g.gain.exponentialRampToValueAtTime(v,t+st+.03);g.gain.exponentialRampToValueAtTime(0.0001,t+st+d);x.connect(g);g.connect(o);x.start(t+st);x.stop(t+st+d+.05);};
  /* rising sweep */
  {const g=c.createGain(),x=c.createOscillator();x.type="sawtooth";x.frequency.setValueAtTime(110,t);x.frequency.exponentialRampToValueAtTime(1760,t+.6);
   const f=c.createBiquadFilter();f.type="lowpass";f.frequency.setValueAtTime(400,t);f.frequency.exponentialRampToValueAtTime(6000,t+.6);
   g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(.09,t+.4);g.gain.exponentialRampToValueAtTime(0.0001,t+.75);x.connect(f);f.connect(g);g.connect(o);x.start(t);x.stop(t+.8);}
  /* sparkle arpeggio + power chord */
  [0,4,7,11,12,16,19,24].forEach((n,i)=>mk2(523.25*Math.pow(2,n/12),.55+i*.045,.5,"triangle",.07));
  [0,7,12,16].forEach(n=>{mk2(130.81*Math.pow(2,n/12),.92,1.6,"sawtooth",.05);mk2(261.63*Math.pow(2,n/12),.92,1.8,"sine",.07);});};}
})();

/* v10 balance: Piercer lancers (Lv7 non-ace, flag tribute1) need only 1 Tribute */
(function(){const bt=tributesNeeded;tributesNeeded=function(c){return c&&c.fx&&c.fx.tribute1&&c.level>=5?1:bt(c);};
 const bc=cardText;cardText=function(c){const r=bc(c);if(c&&c.fx&&c.fx.tribute1&&Array.isArray(r))r.push("<b>Lancer's Charge:</b> can be Normal Summoned with only 1 Tribute.");return r;};
 if(window.__adc)window.__adc.tributesNeeded=tributesNeeded;})();
/* ===================== v9 UI: menu card rain, circular character select with duelist modes, VS catchphrases =====================
   Loaded last. Everything here is presentation; rules/engine are untouched. Tunables are at the top. */
const UI9={
  rain:{count:15,minW:46,maxW:96,minFall:10,maxFall:22,minSpin:3,maxSpin:9,minOp:.22,maxOp:.55,artShare:.55},
  ring:{cx:640,cy:404,rx:590,ry:330,w:84,h:112,minScale:.56,maxScale:1.12},
/* v15: rx 575->590, ry 322->330 so the 31-entry ring clears the centre panel */
  vs:{show:2400,bang:900}   /* ms at SPEED 1: plain VS presentation, then DUEL! (no catchphrases on the VS screen) */
};
/* Duelist modes: the base entry on the ring and its alternate mode (both are full CHARS entries with their own deck/ace/skill). */
const MODES={kelvin:"darkkelvin",weiyao:"weiyao2",eryll:"eryll2",keith:"keith2",lemon:"lemon2",weisheng:"weisheng2",clement:"clement2"};
const MODE_BASE={darkkelvin:"kelvin",weiyao2:"weiyao",eryll2:"eryll",keith2:"keith",lemon2:"lemon",weisheng2:"weisheng",clement2:"clement"};
const MODE_LOOK={darkkelvin:"dark",weiyao2:"gold",kelvin:"gold",weiyao:"gold",eryll2:"dark",eryll:"gold",keith2:"gold",keith:"gold",lemon2:"gold",lemon:"gold",weisheng2:"dark",weisheng:"gold",clement2:"gold",clement:"gold"};
(function(){
const RS={rot:0,mode:{},cfg:null,el:null,front:null};
window.RING9=RS;
const ringOrder=()=>CHAR_ORDER.filter(c=>!MODE_BASE[c]);
const eff=b=>RS.mode[b]&&MODES[b]?MODES[b]:b;
const baseOf=c=>MODE_BASE[c]||c;
window.ringEntries=ringOrder;window.ringEff=eff;
const nm=c=>c==="you"?playerName():CHARS[c].name;
const esc=s=>String(s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));

/* ---------------- CSS ---------------- */
const css=document.createElement("style");css.textContent=`
#menu .crain{position:absolute;inset:0;overflow:hidden;pointer-events:none;contain:strict;perspective:900px}
#menu .cr{position:absolute;top:0;will-change:transform;animation:crfall linear infinite;transform-style:preserve-3d}
#menu .cri{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:crspin linear infinite;will-change:transform}
#menu .crf,#menu .crb{position:absolute;inset:0;border-radius:7px;backface-visibility:hidden;-webkit-backface-visibility:hidden;border:2px solid #c98a3d;box-shadow:0 0 14px #0008}
#menu .crf{background-size:cover;background-position:50% 30%;background-color:#2a1f4c}
#menu .crb{transform:rotateY(180deg);background:radial-gradient(circle at 50% 50%,#ffd36b 0 8%,transparent 9%),repeating-conic-gradient(from 0deg,#5a2a0c 0 15deg,#3b1c07 15deg 30deg);}
#menu .crb::after{content:"";position:absolute;inset:6px;border:1px solid #ffd36b88;border-radius:4px}
@keyframes crfall{from{transform:translate3d(0,-180px,0) rotateZ(var(--r0))}to{transform:translate3d(var(--dx),980px,0) rotateZ(var(--r1))}}
@keyframes crspin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}
#menu.paused *,#menu.paused *::before,#menu.paused *::after{animation-play-state:paused!important}
#menu .logo,#menu .menubtns{z-index:2}
#menu .logo{z-index:3}#menu .crain{z-index:1}
#menu .logo h2{text-shadow:0 0 18px #000,0 4px 0 #0006}
/* v9f: no text-shadow on the gradient (background-clip:text) title - a black text-shadow paints THROUGH the transparent glyphs and darkened it */
#menu .logo h1{text-shadow:none;filter:drop-shadow(0 0 3px #3a1600) drop-shadow(0 0 16px rgba(255,190,80,.75)) drop-shadow(0 4px 0 #5a2a00) drop-shadow(0 6px 14px #000c)}

.ring9{position:absolute;inset:0;overflow:hidden;background:radial-gradient(ellipse at 50% 50%,#2d2260 0%,#120c26 55%,#07050e 100%)}
.ring9 .rhead{position:absolute;left:20px;top:70px;text-align:left;z-index:3}
.ring9 .rhead h2{margin:0;font-size:20px;letter-spacing:1.5px;color:#ffd36b;text-shadow:0 0 16px #ff9a3c88;font-family:Impact,"Arial Black",sans-serif}
.ring9 .rhead .sub{font-size:12px;opacity:.75;margin-top:2px;white-space:nowrap}
.ring9 .rorbit{position:absolute;left:${UI9.ring.cx-UI9.ring.rx}px;top:${UI9.ring.cy-UI9.ring.ry}px;width:${UI9.ring.rx*2}px;height:${UI9.ring.ry*2}px;border-radius:50%;border:2px dashed #ffd36b33;box-shadow:inset 0 0 60px #6b4bd022,0 0 40px #6b4bd022;pointer-events:none}
.ring9 .rt{position:absolute;left:0;top:0;width:${UI9.ring.w}px;height:${UI9.ring.h}px;cursor:pointer;transition:transform .45s cubic-bezier(.3,.9,.3,1),opacity .45s,filter .45s;will-change:transform}
.ring9 .rt .face{position:absolute;inset:0;border-radius:12px;overflow:hidden;border:2px solid #ffffff2a;background:#000;box-shadow:0 6px 16px #000a}
.ring9 .rt img{width:100%;height:100%;object-fit:cover;object-position:50% 14%;filter:saturate(.85) brightness(.8)}
.ring9 .rt .tn{position:absolute;left:0;right:0;bottom:0;padding:12px 2px 3px;text-align:center;font-weight:bold;font-size:10.5px;line-height:1.1;background:linear-gradient(transparent,#000e)}
.ring9 .rt:has(.mt) .tn{padding-bottom:13px}
.ring9 .rt:hover .face{border-color:var(--c);box-shadow:0 0 18px var(--c)}
.ring9 .rt:hover img{filter:none}
.ring9 .rt.front .face{border-color:var(--c);box-shadow:0 0 0 3px var(--c),0 0 30px var(--c)}
.ring9 .rt.front img{filter:none}
.ring9 .rt.dim .face{opacity:.35}
.ring9 .rt.alt-dark .face{border-color:#a05cff;background:#12001f}
.ring9 .rt.alt-gold .face{border-color:#ffd36b}
.ring9 .mt{position:absolute;left:50%;bottom:-13px;margin-left:-13px;width:26px;height:26px;border-radius:50%;border:2px solid #ffd36b;background:#1b1238;color:#ffd36b;font-size:14px;line-height:22px;text-align:center;cursor:pointer;z-index:2;box-shadow:0 0 10px #000}
.ring9 .mt:hover{background:#ffd36b;color:#1b1238}
.ring9 .rt.alt-dark .mt{border-color:#b77bff;color:#d6b4ff;background:#24063d}
.ring9 .rcenter{position:absolute;left:278px;top:188px;width:724px;height:404px;border-radius:34px;background:radial-gradient(ellipse at 30% 20%,#ffffff10,#0000 60%),linear-gradient(160deg,#1d1640ee,#0b0820ee);border:1px solid #ffd36b44;box-shadow:0 0 50px #000c,inset 0 0 40px #0008;padding:18px 22px;box-sizing:border-box;z-index:150;overflow:hidden}
.ring9 .rcenter .detail{position:static;height:100%;gap:22px;display:flex;align-items:flex-start}
.ring9 .rcenter .detail .big{width:208px;height:288px;margin-top:4px}
.ring9 .rcenter .detail .info{padding-top:0;min-width:0}
.ring9 .rcenter .detail .info h3{font-size:31px;letter-spacing:2px;line-height:1.05}
.ring9 .rcenter .detail .theme{font-size:13.5px;margin:2px 0 7px}
.ring9 .rcenter .detail .bio{font-size:12.5px;line-height:1.42}
.ring9 .rcenter .detail .quote{margin-top:8px;font-size:13.5px;white-space:pre-line}
.ring9 .rcenter .detail .ace{margin-top:7px;font-size:12px}
.ring9 .rcenter .sel-skill{font-size:11.5px;margin-top:7px}
.ring9 .rcenter .detail input{margin-top:8px;padding:6px 10px;font-size:14px;width:240px}
.ring9 .rmode{position:absolute;left:22px;top:318px;width:208px;padding:7px 4px;border-radius:10px;border:2px solid #ffd36b;background:linear-gradient(180deg,#3a2a6e,#1b1238);color:#ffe9a8;font-weight:bold;font-size:12.5px;cursor:pointer;z-index:2}
.ring9 .rmode:hover{filter:brightness(1.25)}
.ring9 .rmode.dark{border-color:#b77bff;background:linear-gradient(180deg,#3b0a5e,#14001f);color:#e3c8ff}
.ring9 .rmode .ico{display:inline-block;margin-right:4px}
.ring9 .rcenter.has-mode .detail .big{height:300px}
.ring9 .mfx{position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5;border-radius:34px}
.ring9 .mfx.dark{background:radial-gradient(circle at 25% 40%,#b14dff 0%,#3a0066aa 35%,#000e 75%)}
.ring9 .mfx.gold{background:radial-gradient(circle at 25% 40%,#fff3c0 0%,#ffd36baa 30%,#a0600044 70%,transparent)}
.ring9 .rarr{position:absolute;top:${UI9.ring.cy-23}px;width:46px;height:46px;border-radius:50%;border:2px solid #ffd36b;background:#1b1238cc;color:#ffd36b;font-size:20px;cursor:pointer;z-index:160;box-shadow:0 0 14px #000}
.ring9 .rarr:hover{background:#ffd36b;color:#1b1238}
.ring9 .rarr.l{left:222px}.ring9 .rarr.r{left:1012px}
.ring9 .rhint{position:absolute;left:0;right:0;top:${UI9.ring.cy+UI9.ring.ry-104}px;text-align:center;font-size:11px;opacity:.6;pointer-events:none;z-index:160}
.ring9 .selbtns{z-index:170}
.ring9 .arenapick{left:auto!important;right:22px!important;top:22px!important;z-index:170}
.ring9 .arenapick .an{top:44px!important;left:auto!important;right:0}
.ring9 .rrandom.sel{box-shadow:0 0 0 3px #ffd36b,0 0 18px #ffd36b}
#ringov{position:absolute;inset:0;z-index:400}
`;document.head.appendChild(css);

/* ---------------- MENU CARD RAIN ---------------- */
function rainHTML(){const R=UI9.rain;const r=(a,b)=>a+Math.random()*(b-a);
  const ids=Object.keys(CARDS).filter(id=>CARDS[id].type==="monster"&&!CARDS[id].token&&!CARDS[id].destiny);
  let h="";for(let i=0;i<R.count;i++){const w=Math.round(r(R.minW,R.maxW)),hh=Math.round(w*1.43);const art=Math.random()<R.artShare;
    const id=ids[Math.floor(Math.random()*ids.length)];const fall=r(R.minFall,R.maxFall);const r0=Math.round(r(-40,40));
    h+=`<div class="cr" style="left:${(i+.5)/R.count*100+r(-3,3)}%;width:${w}px;height:${hh}px;opacity:${r(R.minOp,R.maxOp).toFixed(2)};--r0:${r0}deg;--r1:${r0+(Math.random()<.5?-1:1)*Math.round(r(90,360))}deg;--dx:${Math.round(r(-120,120))}px;animation-duration:${fall.toFixed(1)}s;animation-delay:${(-r(0,fall)).toFixed(1)}s">
      <div class="cri" style="animation-duration:${r(R.minSpin,R.maxSpin).toFixed(1)}s;animation-direction:${Math.random()<.5?"normal":"reverse"}"><div class="crf" style="${art?`background-image:url(${artSrc(id)})`:""}"></div><div class="crb"></div></div></div>`;}
  return `<div class="crain">${h}</div>`;}
const bRM=renderMenu;renderMenu=function(){const fresh=!menuBuilt;const r=bRM.apply(this,arguments);
  try{injectRain();}catch(e){console.error(e);}
  return r;};
function injectRain(){const fx=document.querySelector("#menu .bgfx");if(fx&&!fx.querySelector(".crain")){fx.querySelectorAll(".floatcard").forEach(e=>e.remove());fx.insertAdjacentHTML("beforeend",rainHTML());}}
if(menuBuilt)try{injectRain();}catch(e){console.error(e);}
document.addEventListener("visibilitychange",()=>{const m=$("#menu");if(m)m.classList.toggle("paused",document.hidden);});

/* ---------------- CIRCULAR SELECT (generic; used offline for player+rival and by the online lobby) ---------------- */
function tileHTML(b){const c=eff(b),C=CHARS[c];const alt=c!==b;
  return `<div class="rt ${alt?"alt-"+MODE_LOOK[c]:""}" data-b="${b}" style="--c:${C.color}"><div class="face"><img src="${PORTRAITS[C.img]}" alt=""><div class="tn">${esc(nm(c))}</div></div>${MODES[b]?`<div class="mt" data-mt="${b}" title="Switch mode: ${esc(CHARS[MODES[b]].name)} / ${esc(CHARS[b].name)}">⇄</div>`:""}</div>`;}
function layoutRing(){const el=RS.el;if(!el)return;RS.still=performance.now()+550;const R=UI9.ring,ord=ringOrder(),N=ord.length;
  el.querySelectorAll(".rt").forEach(t=>{const i=ord.indexOf(t.dataset.b);let d=((i-RS.rot)%N+N)%N;if(d>N/2)d-=N;const th=d/N*Math.PI*2;
    const x=R.cx+R.rx*Math.sin(th),y=R.cy+R.ry*Math.cos(th),depth=(Math.cos(th)+1)/2,s=(R.minScale+(R.maxScale-R.minScale)*depth);
    t.style.transform=`translate(${(x-R.w/2).toFixed(1)}px,${(y-R.h/2).toFixed(1)}px) scale(${s.toFixed(3)})`;t.style.zIndex=String(10+Math.round(depth*100));
    t.style.opacity=(.55+.45*depth).toFixed(2);t.classList.toggle("front",d===0&&RS.pick!=="random");
    t.classList.toggle("dim",!!(RS.cfg.isDim&&RS.cfg.isDim(eff(t.dataset.b))));});}
function frontBase(){const ord=ringOrder(),N=ord.length;return ord[((Math.round(RS.rot)%N)+N)%N];}
function showCenter(c,anim){const box=RS.el&&RS.el.querySelector(".rcenter");if(!box)return;const b=baseOf(c);
  const html=(RS.cfg.detail||detailHTML)(c);const md=MODES[b]&&c!=="random";
  box.classList.toggle("has-mode",!!md);
  box.innerHTML=html+(md?`<button class="rmode ${c!==b?"dark":""}" data-mt="${b}"><span class="ico">⇄</span>${c!==b?"Back to "+esc(CHARS[b].name):"Switch to "+esc(CHARS[MODES[b]].name)}</button>`:"")+`<div class="mfx"></div>`;
  box.querySelectorAll("[data-mt]").forEach(x=>x.onclick=e=>{e.stopPropagation();toggleMode(x.dataset.mt);});
  if(RS.cfg.afterDetail)RS.cfg.afterDetail(c);}
function curPick(){return RS.pick==="random"?"random":eff(frontBase());}
function sync(){const c=curPick();RS.cfg.onChange&&RS.cfg.onChange(c);updButtons();}
function updButtons(){const ok=RS.el.querySelector("#sel-ok");if(ok){const lab=RS.cfg.confirmLabel(curPick());ok.disabled=!lab.ok;ok.innerHTML=lab.text;}
  const rr=RS.el.querySelector(".rrandom");if(rr)rr.classList.toggle("sel",RS.pick==="random");}
function rotateTo(b){const ord=ringOrder(),N=ord.length;const i=ord.indexOf(b);if(i<0)return;let d=((i-RS.rot)%N+N)%N;if(d>N/2)d-=N;RS.rot+=d;}
function step(dir){RS.pick=null;RS.rot+=dir;layoutRing();showCenter(curPick());sync();try{AUDIO.play("hover");}catch(e){}}
function toggleMode(b){if(!MODES[b])return;RS.mode[b]=!RS.mode[b];const c=eff(b);
  const t=RS.el.querySelector(`.rt[data-b="${b}"]`);
  if(t){const nt=document.createElement("div");nt.innerHTML=tileHTML(b);const n=nt.firstElementChild;n.style.cssText=t.style.cssText;t.replaceWith(n);bindTile(n);
    anim(n.querySelector(".face"),[{transform:"rotateY(90deg)"},{transform:"rotateY(0)"}],320,{easing:"ease-out"});}
  layoutRing();
  const showing=RS.hover?baseOf(RS.hover):(RS.pick==="random"?null:frontBase());
  if(showing===b||RS.pick!=="random"&&frontBase()===b){RS.hover=null;showCenter(c);const box=RS.el.querySelector(".rcenter");
    const big=box.querySelector(".detail .big");if(big)anim(big,[{transform:"rotateY(90deg)",filter:"brightness(2)"},{transform:"rotateY(0)",filter:"none"}],420,{easing:"ease-out"});
    const fx=box.querySelector(".mfx");if(fx){fx.className="mfx "+(c!==b?MODE_LOOK[c]:"gold");anim(fx,[{opacity:0},{opacity:.85,offset:.3},{opacity:0}],700);}}
  try{AUDIO.play(c!==b?"spell":"coin");}catch(e){}
  sync();}
function bindTile(t){const b=t.dataset.b;
  t.onmouseenter=()=>{if(performance.now()<(RS.still||0))return;RS.hover=eff(b);showCenter(eff(b));};
  t.onmouseleave=()=>{RS.hover=null;showCenter(curPick());};
  t.onclick=e=>{if(e.target.closest("[data-mt]"))return;RS.pick=null;rotateTo(b);layoutRing();RS.hover=null;showCenter(curPick());sync();try{AUDIO.play("click");}catch(e){}};
  const m=t.querySelector("[data-mt]");if(m)m.onclick=e=>{e.stopPropagation();toggleMode(b);};}
/* cfg: {title,sub,initial,isDim(c),onChange(c),confirmLabel(c)->{ok,text},onConfirm(c),onBack(),extraHTML,random,detail(c),afterDetail(c),btnClass} */
function ringMount(el,cfg){RS.cfg=cfg;RS.el=el;RS.hover=null;RS.pick=cfg.initial==="random"?"random":null;
  const init=cfg.initial&&cfg.initial!=="random"?cfg.initial:null;
  if(init){const b=baseOf(init);if(MODES[b])RS.mode[b]=init!==b;rotateTo(b);}
  el.innerHTML=`<div class="ring9"><button class="btn backbtn" id="sel-back">◀ Back</button>
    <div class="rhead"><h2>${cfg.title}</h2><div class="sub">${cfg.sub}</div></div><div class="rorbit"></div>
    ${ringOrder().map(tileHTML).join("")}<div class="rcenter"></div>
    <button class="rarr l" title="Rotate (←)">◀</button><button class="rarr r" title="Rotate (→)">▶</button><div class="rhint">← → / mouse wheel to rotate · click a portrait · Enter to confirm</div>
    ${cfg.extraHTML||""}<div class="selbtns">${cfg.random?`<button class="btn rrandom" id="sel-rand">🎲 Random</button>`:""}<button class="btn ${cfg.btnClass||"gold"}" id="sel-ok"></button></div></div>`;
  el.querySelectorAll(".rt").forEach(bindTile);
  el.querySelector(".rarr.l").onclick=()=>step(-1);el.querySelector(".rarr.r").onclick=()=>step(1);
  const rr=el.querySelector("#sel-rand");if(rr)rr.onclick=()=>{RS.pick="random";layoutRing();showCenter("random");sync();};
  el.querySelector("#sel-back").onclick=()=>cfg.onBack();
  el.querySelector("#sel-ok").onclick=()=>{const c=curPick();if(cfg.confirmLabel(c).ok)cfg.onConfirm(c);};
  const ring=el.querySelector(".ring9");let wt=0;ring.addEventListener("wheel",e=>{e.preventDefault();const now=performance.now();if(now-wt<140)return;wt=now;step(e.deltaY>0||e.deltaX>0?1:-1);},{passive:false});
  layoutRing();showCenter(curPick());sync();}
window.ringMount=ringMount;window.ringToggleMode=toggleMode;window.ringStep=step;
document.addEventListener("keydown",e=>{const el=RS.el;if(!el||!el.isConnected||!el.offsetParent)return;const ring=el.querySelector(".ring9");if(!ring)return;
  if(e.target&&(e.target.tagName==="INPUT"||e.target.tagName==="SELECT"||e.target.tagName==="TEXTAREA"))return;
  if($("#modalLayer")&&$("#modalLayer").children.length)return;
  if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();step(-1);}else if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();step(1);}
  else if(e.key==="Enter"){const ok=el.querySelector("#sel-ok");if(ok&&!ok.disabled){e.preventDefault();ok.click();}}
  else if(e.key==="m"||e.key==="M"){const b=RS.pick==="random"?null:frontBase();if(b&&MODES[b])toggleMode(b);}
  else if(e.key==="Escape"){e.preventDefault();const bk=el.querySelector("#sel-back");if(bk)bk.click();}});

/* offline select: both steps use the ring */
renderSelect=function(){const el=$("#select");const st=SEL.step;
  const init=st===1?(SEL.player||"you"):(SEL.rival||ringOrder().map(eff).find(c=>c!=="you"&&c!==SEL.player)||"kaito");
  ringMount(el,{title:st===1?"CHOOSE YOUR DUELIST":"CHOOSE YOUR RIVAL",sub:st===1?"Rotate the circle and pick your duelist.":"Who will you face? Pick a rival or let fate decide.",
    initial:init,random:st===2,btnClass:st===1?"gold":"red",extraHTML:"",
    isDim:c=>st===2&&c===SEL.player,
    onChange:c=>{if(st===1)SEL.player=c;else SEL.rival=(c===SEL.player?null:c);},
    confirmLabel:c=>st===1?{ok:!!c,text:"Next: Choose Rival ▶"}:(c===SEL.player?{ok:false,text:"Already your duelist"}:{ok:!!c,text:"⚔ DUEL!"}),
    onConfirm:c=>{if(st===1){SEL.player=c;SEL.step=2;SEL.rival=null;renderSelect();}else{let r=c;if(r==="random")r=pick(CHAR_ORDER.filter(x=>x!==SEL.player));(window.showFieldSelect?showFieldSelect(SEL.player,r,c):showVersus(SEL.player,r,SEL.arena));}},
    onBack:()=>{if(st===2){SEL.step=1;renderSelect();}else selectExit();},
    afterDetail:()=>bindName()});
};
bindName=function(){const i=$("#pname");if(i){i.oninput=()=>{const st=store();st.name=i.value.slice(0,16);saveStore(st);const t=document.querySelector('.rt[data-b="you"] .tn');if(t)t.textContent=playerName();const h=document.querySelector(".rcenter .detail h3");if(h)h.textContent=playerName().toUpperCase();};i.onclick=e=>e.stopPropagation();i.onkeydown=e=>e.stopPropagation();}};

/* ---------------- VS SCREEN: plain presentation, then DUEL! ----------------
   v9 user change: the catchphrase lines were removed from the VS screen entirely (they covered the portraits):
   no captions, no bubbles, no typewriter, no voice blips. CHARS[ch].quote stays (select-screen preview uses it). */
const css2=document.createElement("style");css2.textContent=`
#duelbang{position:absolute;inset:0;z-index:9500;pointer-events:none;display:flex;align-items:center;justify-content:center}
#duelbang b{font-family:Impact,"Arial Black",sans-serif;font-size:230px;letter-spacing:10px;color:#ffd36b;-webkit-text-stroke:5px #3a1600;paint-order:stroke fill;text-shadow:0 0 40px #ff9a3c,0 0 90px #ff5f2a,0 8px 0 #000}
`;document.head.appendChild(css2);
/* holds the plain VS screen for UI9.vs.show ms (scaled by speed) then calls onEnd; returns a controller {total,stop,done} */
function vsHold(v,opt){opt=opt||{};const sp=opt.speed==null?1:opt.speed;const ctl={done:false,stopped:false,total:UI9.vs.show};
  const id=setTimeout(()=>{if(ctl.stopped)return;ctl.done=true;opt.onEnd&&opt.onEnd();},UI9.vs.show*sp);
  ctl.stop=()=>{ctl.stopped=true;clearTimeout(id);};return ctl;}
function duelBang(sound){const old=$("#duelbang");if(old)old.remove();const d=document.createElement("div");d.id="duelbang";d.innerHTML="<b>DUEL!</b>";$("#app").appendChild(d);
  if(sound)try{AUDIO.play("duelstart");}catch(e){}
  const b=d.firstChild;anim(b,[{transform:"scale(3.2) rotate(-8deg)",opacity:0},{transform:"scale(.92) rotate(0)",opacity:1,offset:.35},{transform:"scale(1)",opacity:1,offset:.7},{transform:"scale(1.25)",opacity:0}],UI9.vs.bang,{easing:"ease-out"});
  setTimeout(()=>d.remove(),UI9.vs.bang+50);return d;}
window.vsHold=vsHold;window.duelBang=duelBang;
const bSV=showVersus;showVersus=function(p,e,arenaChoice){bSV.apply(this,arguments);const v=$("#versus");clearTimeout(vsTimer);
  const sk=v.querySelector(".skip");if(sk)sk.textContent="Click to skip";
  let gone=false;let ctl=null;
  const go=()=>{if(gone)return;gone=true;if(ctl)ctl.stop();clearTimeout(vsTimer);v.onclick=null;
    /* read the arena startDuel will get from the original handler: the original stored it in its closure, so recompute from G after start */
    duelBang(false);orig();};
  const orig=v.onclick;v.onclick=null;   /* original go(): startDuel(p,e,{arena}) - plays the existing "duelstart" jingle */
  ctl=vsHold(v,{speed:SPEED,onEnd:go});
  window.__vs9=ctl;v.onclick=go;};
})();
/* ===================== v9: fighting-game style character select (THE DEFAULT, offline and online lobby) =====================
   Default = fight. Hidden fallback to the old circle select: URL ?select=circle (remembered) or setSelectStyle("circle").
   ?select=fight / setSelectStyle("fight") go back. Only an explicit choice is remembered (key "adc_select_style_v2");
   the old preview-era key "adc_select_style" is ignored and cleared, so it can never keep anyone on the circle. Presentation only: it uses the same SEL state, duelist modes (RING9.mode), detail text
   (taken verbatim from detailHTML) and confirm flow (showVersus) as the circle select.
   v9h: ONE-TAP select - a single click/tap on a portrait (or Enter) selects that duelist at once; there is no separate confirm button.
   Hover still previews. The ⇄ mode icon (or M) only swaps the mode; tapping the portrait afterwards selects the shown mode. 🎲 Random picks at once. */
(function(){
const qs=(()=>{try{return new URLSearchParams(location.search).get("select");}catch(e){return null;}})();
const SK="adc_select_style_v2";try{localStorage.removeItem("adc_select_style");}catch(e){}
let style="fight";
if(qs==="fight"||qs==="circle"){style=qs;try{if(qs==="circle")localStorage.setItem(SK,"circle");else localStorage.removeItem(SK);}catch(e){}}
else{try{if(localStorage.getItem(SK)==="circle")style="circle";}catch(e){}}
window.SELECT_STYLE=style;
window.setSelectStyle=function(s){style=s==="circle"?"circle":"fight";window.SELECT_STYLE=style;try{if(style==="circle")localStorage.setItem(SK,"circle");else localStorage.removeItem(SK);}catch(e){}
  if(typeof CUR!=="undefined"&&CUR==="select")renderSelect();return style;};
const RS=window.RING9;const COLS=8; /* v12: 29 entries (G-Dragon) = 8x4 (was 7 cols, a 5th row went off-screen) */
const order=()=>ringEntries();
const eff=b=>RS.mode[b]&&MODES[b]?MODES[b]:b;
const baseOf=c=>MODE_BASE[c]||c;
const nm=c=>c==="you"?playerName():CHARS[c].name;
const esc=s=>String(s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
const FS={el:null,cur:null,hover:null,random:false,ctx:null};window.FIGHT9=FS;

const css=document.createElement("style");css.textContent=`
.fsel{position:absolute;inset:0;overflow:hidden;background:linear-gradient(115deg,#2a0d14 0%,#120a26 38%,#0a0f2c 62%,#071a2e 100%)}
.fsel::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(115deg,#ffffff06 0 2px,transparent 2px 22px);pointer-events:none}
.fsel .fhead{position:absolute;left:352px;width:576px;top:14px;text-align:center;z-index:5}
.fsel .fhead h2{margin:0;font-family:Impact,"Arial Black",sans-serif;font-size:34px;letter-spacing:4px;color:#fff;font-style:italic;text-shadow:3px 3px 0 #c8102e,0 0 20px #ff5f2a88}
.fsel .fhead .sub{font-size:12px;opacity:.75;margin-top:1px}
.fsel .fside{position:absolute;top:0;bottom:0;width:340px;overflow:hidden}
.fsel>#sel-back{z-index:40}
.fsel .fside.p1{left:0;--pc:#ff3b4e}.fsel .fside.p2{right:0;--pc:#3ba0ff}
.fsel .frender{position:absolute;left:0;right:0;top:56px;height:470px;overflow:hidden}
.fsel .fside.p1 .frender{clip-path:polygon(0 0,100% 0,88% 100%,0 100%)}.fsel .fside.p2 .frender{clip-path:polygon(0 0,100% 0,100% 100%,12% 100%)}
.fsel .frender img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 12%}
.fsel .frender::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,#0a0818 100%)}
.fsel .frender .unk{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Impact,"Arial Black",sans-serif;font-size:220px;color:#ffffff22;text-shadow:0 0 30px var(--pc);background:radial-gradient(circle at 50% 40%,#ffffff12,transparent 60%)}
.fsel .ftag{position:absolute;top:62px;z-index:3;font-family:Impact,"Arial Black",sans-serif;font-size:30px;font-style:italic;color:#fff;padding:0 14px;background:var(--pc);box-shadow:0 0 18px var(--pc)}
.fsel .fside.p1 .ftag{left:0;clip-path:polygon(0 0,100% 0,88% 100%,0 100%)}.fsel .fside.p2 .ftag{right:0;clip-path:polygon(12% 0,100% 0,100% 100%,0 100%)}
.fsel .fpanel{position:absolute;left:10px;right:10px;top:470px;bottom:12px;z-index:2;padding:12px 14px 10px;box-sizing:border-box;overflow:hidden;
  background:linear-gradient(160deg,#1d1640f2,#0b0820f2);border:1px solid #ffffff22;border-top:3px solid var(--c,var(--pc));border-radius:4px 18px 4px 18px;box-shadow:0 0 30px #000c}
.fsel .fpanel h3{margin:0;font-family:Impact,"Arial Black",sans-serif;font-size:27px;letter-spacing:1px;line-height:1.05;color:var(--c,#fff);text-shadow:0 2px 0 #000;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fsel .fpanel .theme{font-size:12px;opacity:.9;margin:2px 0 5px}
.fsel .fpanel .ace{font-size:11px;line-height:1.3}
.fsel .fpanel .sel-skill{font-size:10.5px;line-height:1.3;margin-top:5px;padding:5px 8px}
.fsel .fpanel .sel-skill span{font-size:9.5px!important}
.fsel .fside .lockd{position:absolute;z-index:3;right:22px;top:458px;font-size:10px;padding:2px 8px;border-radius:3px;background:rgba(8,10,30,.92);border:1px solid var(--pc);letter-spacing:2px;color:var(--pc);font-weight:bold}
.fsel .fcenter{position:absolute;left:352px;width:576px;top:84px;height:150px;box-sizing:border-box;padding:10px 16px;border-radius:14px;background:#0b0820cc;border:1px solid #ffd36b33;overflow:hidden;z-index:3}
.fsel .fcenter .bio{font-size:12px;line-height:1.4}
.fsel .fcenter .quote{font-size:12.5px;margin-top:6px;white-space:pre-line;color:#ffe9a8;font-style:italic}
.fsel .fcenter .who{font-size:11px;letter-spacing:2px;color:#ffd36b;font-weight:bold;margin-bottom:3px}
.fsel .fcenter input{margin-top:6px;padding:4px 8px;font-size:13px;width:230px}
.fsel .fvs{position:absolute;left:560px;width:160px;top:236px;text-align:center;font-family:Impact,"Arial Black",sans-serif;font-size:46px;font-style:italic;color:#fff;text-shadow:3px 3px 0 #c8102e,-3px -3px 0 #1d63c8;z-index:3;pointer-events:none}
.fsel .arenapick{left:352px!important;right:auto!important;top:300px!important;width:576px;flex-wrap:wrap;justify-content:center;gap:3px!important;z-index:6}
.fsel .arenapick .an{top:-16px!important;left:0!important;right:0;text-align:center}
.fsel .arenapick .lab{font-size:11px!important}
.fsel .achip{width:30px!important;height:24px!important;font-size:8px!important}
.fsel .fbtns{position:absolute;left:352px;width:576px;top:250px;display:flex;justify-content:space-between;z-index:6}
.fsel .fbtns .btn{padding:8px 16px;font-size:14px}
.fsel.st2 .fbtns{top:254px}
.fsel .fgrid{position:absolute;left:356px;top:398px;width:568px;display:grid;grid-template-columns:repeat(${COLS},69px);grid-auto-rows:81px;gap:5px 3px;z-index:4}
.fsel.st1 .fgrid{top:330px}
.fsel.lobby .fside.p2 .lockd{right:auto;left:22px}
.fsel .ft{position:relative;cursor:pointer;--c:#fff}
.fsel .ft .face{position:absolute;inset:0;overflow:hidden;background:#000;border:2px solid #ffffff2a;transform:skewX(-6deg);transition:border-color .15s,box-shadow .15s,transform .15s}
.fsel .ft img{position:absolute;left:-8px;top:0;width:calc(100% + 16px);height:100%;object-fit:cover;object-position:50% 12%;transform:skewX(6deg);filter:saturate(.75) brightness(.72);transition:filter .15s}
.fsel .ft .tn{position:absolute;left:0;right:0;bottom:0;padding:10px 2px 2px;text-align:center;font-weight:bold;font-size:9.5px;line-height:1.1;background:linear-gradient(transparent,#000e);transform:skewX(6deg)}
.fsel .ft:hover .face{border-color:var(--c);box-shadow:0 0 14px var(--c)}
.fsel .ft:hover img{filter:none}
.fsel .ft.cur .face{border-color:var(--pc);box-shadow:0 0 0 2px var(--pc),0 0 22px var(--pc);transform:skewX(-6deg) scale(1.06);animation:fglow 1s ease-in-out infinite alternate}
.fsel .ft.cur img{filter:none}
@keyframes fglow{from{box-shadow:0 0 0 2px var(--pc),0 0 10px var(--pc)}to{box-shadow:0 0 0 3px var(--pc),0 0 28px var(--pc)}}
.fsel .ft .ctag{position:absolute;left:-5px;top:-10px;z-index:5;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:13px;line-height:16px;padding:0 6px;color:#fff;background:#ff3b4e;border-radius:3px;box-shadow:0 0 10px #ff3b4e;transform:skewX(-10deg)}.fsel.st2 .ft .ctag{background:#3ba0ff;box-shadow:0 0 10px #3ba0ff}
.fsel .ft .ltag{position:absolute;right:-3px;top:-9px;z-index:3;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:12px;line-height:15px;padding:0 5px;color:#fff;background:#ff3b4e;opacity:.8}
.fsel .ft.dim .face{opacity:.35}
.fsel .ft.alt-dark .face{border-color:#a05cff;background:#12001f}
.fsel .ft .mt{position:absolute;right:-5px;bottom:-6px;width:22px;height:22px;border-radius:50%;border:2px solid #ffd36b;background:#1b1238;color:#ffd36b;font-size:12px;line-height:18px;text-align:center;cursor:pointer;z-index:4;box-shadow:0 0 8px #000}
.fsel .ft .mt:hover{background:#ffd36b;color:#1b1238}
.fsel .ft.alt-dark .mt{border-color:#b77bff;color:#d6b4ff;background:#24063d}
.fsel .ft.rnd .face{display:flex;align-items:center;justify-content:center;font-size:40px;background:radial-gradient(circle,#4a3b7a,#120c26)}
.fsel .fhint{position:absolute;left:352px;width:576px;bottom:4px;text-align:center;font-size:10px;opacity:.55;z-index:4;pointer-events:none}
.fsel .ft.picked .face{border-color:#fff;box-shadow:0 0 0 3px #fff,0 0 34px var(--pc);transform:skewX(-6deg) scale(1.12)}
.fsel .ft.picked img{filter:brightness(1.5)}
.fsel .mfx{position:absolute;inset:0;pointer-events:none;opacity:0;z-index:4}
.fsel .mfx.dark{background:radial-gradient(circle at 50% 40%,#b14dff 0%,#3a0066aa 35%,#000e 75%)}
.fsel .mfx.gold{background:radial-gradient(circle at 50% 40%,#fff3c0 0%,#ffd36baa 30%,#a0600044 70%,transparent)}
`;document.head.appendChild(css);

/* pieces of the existing detail text (verbatim) */
function parts(c){const d=document.createElement("div");d.innerHTML=detailHTML(c);const g=s=>{const e=d.querySelector(s);return e?e.outerHTML:"";};
  return {h3:(d.querySelector("h3")||{}).textContent||"",theme:g(".theme"),bio:g(".bio"),quote:g(".quote"),ace:g(".ace"),skill:g(".sel-skill"),color:c==="random"?"#ffd36b":CHARS[c].color};}
function sideHTML(side,c,locked,emptyText){const tag=side==="p1"?"P1":"P2";
  if(!c)return `<div class="fside ${side}"><div class="frender"><div class="unk">?</div></div><div class="ftag">${tag}</div><div class="fpanel"><h3>???</h3><div class="theme">${emptyText||"Choose your rival next."}</div></div></div>`;
  const p=parts(c);const img=c==="random"?`<div class="unk">?</div>`:`<img src="${PORTRAITS[CHARS[c].img]}" alt="">`;
  return `<div class="fside ${side}" style="--c:${p.color}"><div class="frender">${img}<div class="mfx"></div></div><div class="ftag">${tag}</div>
    ${locked?`<div class="lockd">${locked===true?"LOCKED":locked}</div>`:""}<div class="fpanel"><h3${p.h3.length>18?` style="font-size:${p.h3.length>23?17:p.h3.length>20?19:22}px"`:""}>${esc(p.h3)}</h3>${p.theme}${p.ace}${p.skill}</div></div>`;}
function tileHTML(b,st){const c=eff(b),C=CHARS[c];const alt=c!==b;
  return `<div class="ft ${alt?"alt-"+MODE_LOOK[c]:""}" data-b="${b}" style="--c:${C.color}"><div class="face"><img src="${PORTRAITS[C.img]}" alt=""><div class="tn">${esc(nm(c))}</div></div>${MODES[b]?`<div class="mt" data-mt="${b}" title="Switch mode: ${esc(CHARS[MODES[b]].name)} / ${esc(CHARS[b].name)}">⇄</div>`:""}</div>`;}
function centerHTML(c,st){if(!c)return "";const p=parts(c);
  return `<div class="who">${esc(p.h3)}</div>${p.bio}${p.quote}${c==="you"&&st===1&&!FS.ctx?`<div><input id="pname" maxlength="16" placeholder="Enter your duelist name" value="${(store().name||"").replace(/"/g,"&quot;")}"></div>`:""}`;}

function pickNow(){return FS.random?"random":FS.cur?eff(FS.cur):null;}
function slide(sideEl,fromLeft){const r=sideEl&&sideEl.querySelector(".frender");const p=sideEl&&sideEl.querySelector(".fpanel");
  if(r)anim(r,[{transform:`translateX(${fromLeft?-90:90}px)`,opacity:0},{transform:"none",opacity:1}],300,{easing:"cubic-bezier(.2,.9,.3,1.1)"});
  if(p)anim(p,[{transform:"translateY(26px)",opacity:0},{transform:"none",opacity:1}],320,{easing:"ease-out"});}
function paint(show,animate){const el=FS.el;if(!el)return;const X=FS.ctx;const st=X?1:SEL.step;
  /* the side being chosen follows the cursor/hover; the other side shows the locked pick */
  const live=show!==undefined?show:pickNow();
  const p1=st===1?live:SEL.player,p2=st===1?null:live;
  const s=st===1?"p1":"p2";const old=el.querySelector(".fside."+s);const h=sideHTML(s,s==="p1"?p1:p2,false);
  if(X)paintP2();
  const d=document.createElement("div");d.innerHTML=h;const n=d.firstElementChild;old.replaceWith(n);if(animate)slide(n,s==="p1");
  const cc=el.querySelector(".fcenter");if(cc){cc.innerHTML=centerHTML(live,st);bindName();}
  el.querySelectorAll(".ft").forEach(t=>{const b=t.dataset.b;const on=!FS.random&&FS.cur===b;t.classList.toggle("cur",on);
    let tg=t.querySelector(".ctag");if(on&&!tg){tg=document.createElement("div");tg.className="ctag";tg.textContent=st===1?"P1":"P2";t.appendChild(tg);}if(!on&&tg)tg.remove();
    t.classList.toggle("dim",st===2&&eff(b)===SEL.player);});
  const rt=el.querySelector(".ft.rnd");if(rt){rt.classList.toggle("cur",FS.random);let tg=rt.querySelector(".ctag");if(FS.random&&!tg){tg=document.createElement("div");tg.className="ctag";tg.textContent="P2";rt.appendChild(tg);}if(!FS.random&&tg)tg.remove();}
  const c=pickNow();
  if(X)return;if(st===1)SEL.player=c;else SEL.rival=(c===SEL.player?null:c);}
/* lobby: the P2 side mirrors the opponent's current pick (synced through the room) */
function paintP2(){const el=FS.el,X=FS.ctx;if(!el||!X)return;const o=X.p2?X.p2():null;const c=o&&o.ch&&CHARS[o.ch]?o.ch:null;
  const old=el.querySelector(".fside.p2");const key=(c||"")+"|"+(o&&o.ready?1:0)+"|"+(o?1:0);if(old&&old.dataset.k===key)return;
  const d=document.createElement("div");d.innerHTML=sideHTML("p2",c,c?(o.ready?"READY":"OPPONENT"):false,o?"Your opponent is choosing...":"Waiting for an opponent...");
  const n=d.firstElementChild;n.dataset.k=key;if(old){old.replaceWith(n);if(c&&old.dataset.k)slide(n,false);}}
window.fightP2Refresh=paintP2;
function choose(b,rand){const prev=pickNow();FS.random=!!rand;FS.cur=rand?FS.cur:b;FS.hover=null;const now=pickNow();paint(undefined,prev!==now);}
function toggleMode(b){if(!MODES[b])return;RS.mode[b]=!RS.mode[b];const c=eff(b);const t=FS.el.querySelector(`.ft[data-b="${b}"]`);const stp=FS.ctx?1:SEL.step;
  if(t){const d=document.createElement("div");d.innerHTML=tileHTML(b,SEL.step);const n=d.firstElementChild;t.replaceWith(n);bindTile(n);anim(n.querySelector(".face"),[{transform:"skewX(-6deg) rotateY(90deg)"},{transform:"skewX(-6deg) rotateY(0)"}],320,{easing:"ease-out"});}
  if(FS.cur===b&&!FS.random){paint(undefined,true);const s=FS.el.querySelector(".fside."+(stp===1?"p1":"p2"));const fx=s&&s.querySelector(".mfx");
    if(fx){fx.className="mfx "+(c!==b?MODE_LOOK[c]:"gold");anim(fx,[{opacity:0},{opacity:.85,offset:.3},{opacity:0}],700);}}else if(FS.hover===b)paint(c,true);else paint();
  try{AUDIO.play(c!==b?"spell":"coin");}catch(e){}}
function bindTile(t){const b=t.dataset.b;
  t.onmouseenter=()=>{FS.hover=b;paint(eff(b),true);};
  t.onmouseleave=()=>{FS.hover=null;paint(undefined,false);};
  t.onclick=e=>{if(e.target.closest("[data-mt]"))return;choose(b);confirmPick();};
  const m=t.querySelector("[data-mt]");if(m)m.onclick=e=>{e.stopPropagation();toggleMode(b);};}
/* v9h one-tap: lock in the current pick (tile tap, Enter, or Random) */
function confirmPick(rand){const el=FS.el;if(!el||FS.busy)return false;const X=FS.ctx;const st=X?1:SEL.step;if(rand){FS.random=true;paint(undefined,true);}
  const c=pickNow();if(!c)return false;
  if(X&&c==="random")return false;
  if(!X&&st===2&&c===SEL.player){const t=el.querySelector(`.ft[data-b="${baseOf(c)}"] .face`);if(t)anim(t,[{transform:"skewX(-6deg) translateX(-6px)"},{transform:"skewX(-6deg) translateX(6px)"},{transform:"skewX(-6deg)"}],220);
    try{AUDIO.play("alert");}catch(e){}return false;}
  FS.busy=true;const t=c==="random"?el.querySelector("#sel-rand"):el.querySelector(`.ft[data-b="${baseOf(c)}"]`);if(t)t.classList.add("picked");
  try{AUDIO.play("click");}catch(e){}
  setTimeout(()=>{FS.busy=false;if(FS.el!==el||!el.isConnected)return;
    if(X){X.onConfirm&&X.onConfirm(c);return;}
    if(st===1){SEL.player=c;SEL.step=2;SEL.rival=null;renderSelect();}
    else{let r=c;if(r==="random")r=pick(CHAR_ORDER.filter(x=>x!==SEL.player));showFieldSelect(SEL.player,r,c);}},160);
  return true;}
window.fightConfirm=confirmPick;
function fightMount(host,ctx){FS.busy=false;const el=host||$("#select");FS.ctx=ctx||null;const X=FS.ctx;const st=X?1:SEL.step;FS.el=el;FS.hover=null;
  const init=X?(X.initial||"you"):st===1?(SEL.player||"you"):(SEL.rival||order().map(eff).find(c=>c!=="you"&&c!==SEL.player)||"kaito");
  FS.random=init==="random";if(!FS.random){const b=baseOf(init);if(MODES[b])RS.mode[b]=init!==b;FS.cur=b;}else FS.cur=null;
  el.innerHTML=`<div class="fsel st${st}${X?" lobby":""}"><button class="btn backbtn" id="sel-back">${X?"◀ Cancel":"◀ Back"}</button>
    <div class="fhead"><h2>${X?(X.title||"CHOOSE YOUR DUELIST"):st===1?"SELECT YOUR DUELIST":"SELECT YOUR RIVAL"}</h2><div class="sub">${X?(X.sub||"Pick your duelist."):st===1?"Pick your duelist.":"Who will you face? Pick a rival or let fate decide."}</div></div>
    ${sideHTML("p1",null,st===2)}${sideHTML("p2",null,false)}<div class="fcenter"></div><div class="fvs">VS</div>
    
    ${st===2&&!X?`<div class="fbtns"><button class="btn" id="sel-rand" title="Pick a random rival">🎲 Random</button><span></span></div>`:""}
    <div class="fgrid">${order().map(b=>tileHTML(b,st)).join("")}</div>
    <div class="fhint">Hover to preview · tap a portrait to select · ← → ↑ ↓ move · Enter selects · ⇄ / M switches mode · Esc back</div></div>`;
  if(st===2){const s1=el.querySelector(".fside.p1");const d=document.createElement("div");d.innerHTML=sideHTML("p1",SEL.player,true);s1.replaceWith(d.firstElementChild);}
  el.querySelectorAll(".ft").forEach(bindTile);
  const rr=el.querySelector("#sel-rand");if(rr){rr.onclick=()=>confirmPick(true);rr.onmouseenter=()=>paint("random",true);rr.onmouseleave=()=>paint(undefined,false);}
  if(X){el.querySelector("#sel-back").onclick=()=>X.onBack&&X.onBack();
    paint(undefined,true);return;}
  el.querySelector("#sel-back").onclick=()=>{if(st===2){SEL.step=1;renderSelect();}else selectExit();};
  paint(undefined,true);}
window.fightMount=fightMount;
const circleRender=renderSelect;
renderSelect=function(){if(style==="fight")return fightMount();FS.el=null;FS.ctx=null;return circleRender.apply(this,arguments);};
const bBN=bindName;bindName=function(){bBN.apply(this,arguments);const i=FS.el&&FS.el.isConnected&&FS.el.querySelector("#pname");if(!i)return;const o=i.oninput;
  i.oninput=()=>{o&&o();const t=FS.el.querySelector('.ft[data-b="you"] .tn');if(t)t.textContent=playerName();const h=FS.el.querySelector(".fside.p1 h3");if(h)h.textContent=playerName().toUpperCase();const w=FS.el.querySelector(".fcenter .who");if(w)w.textContent=playerName().toUpperCase();};};
document.addEventListener("keydown",e=>{const el=FS.el;if(!el||!el.isConnected||!el.querySelector(".fsel")||!el.offsetParent)return;
  if(e.target&&(e.target.tagName==="INPUT"||e.target.tagName==="SELECT"||e.target.tagName==="TEXTAREA"))return;
  if($("#modalLayer")&&$("#modalLayer").children.length)return;
  const ord=order(),N=ord.length;let i=FS.random?0:Math.max(0,ord.indexOf(FS.cur));
  const mv=d=>{e.preventDefault();i=((i+d)%N+N)%N;choose(ord[i]);try{AUDIO.play("hover");}catch(er){}};
  if(e.key==="ArrowLeft")mv(-1);else if(e.key==="ArrowRight")mv(1);else if(e.key==="ArrowUp")mv(-COLS);else if(e.key==="ArrowDown")mv(COLS);
  else if(e.key==="Enter"){e.preventDefault();confirmPick();}
  else if(e.key==="m"||e.key==="M"){if(!FS.random&&FS.cur&&MODES[FS.cur])toggleMode(FS.cur);}
  else if(e.key==="Escape"){e.preventDefault();const bk=el.querySelector("#sel-back");if(bk)bk.click();}});
})();
/* ================= v9f: fighting-game STAGE SELECT (duelist -> rival -> STAGE -> VS -> duel) ================= */
(function(){
const FLAVOR={castle:"Torchlit stone walls where knights settle every oath.",dragon_lair:"Rivers of lava and the roar of sleeping wyrms.",machine_world:"Gears grind and circuits hum beneath your feet.",
 magician_room:"Moonlight, floating tomes and restless spells.",forest:"Ancient trees whisper as fireflies drift by.",fairy_lake:"Lotus blooms glow on a still, enchanted lake.",
 idol_stage:"Spotlights up, crowd roaring: it's showtime!",racetrack:"Neon streets, screaming engines, no brakes.",cat_cafe:"Cosy cushions, warm lattes and nine lives.",
 nemesis_coliseum:"Under the blood moon, only vengeance survives.",stadium:"Floodlights blaze; the starting gun is about to fire.",robot_hangar:"Warning lights flash as the giants power up.",
 toy_town:"A tiny town of toys with very big hearts.",kopitiam:"Kopi, kaya toast and kampung spirit at dusk.",cubicle_hell:"Endless overtime under flickering office lights.",
 silent_theatre:"No words needed: every gesture speaks.",hobby_con:"Mecha, magical girls and limited-edition figures.",gloom_cathedral:"Rain on stained glass and wilted roses.",
 pawn_alley:"Everything has a price in this neon alley.",rift_peaks:"Floating peaks where warriors break their limits.",hisyam_stall:"Sizzling woks and sambal at the night market.",
 derby_dome:"Turf, trumpets and a golden finish line.",cosy_bakery:"Warm bread, flour in the air, sweet comfort.",cosplay_stage:"Costumes on, cameras flashing, poses locked.",concert_stage:"Armoured idols sing as the arena lights up."};
const css=document.createElement("style");css.textContent=`
.stsel{position:absolute;inset:0;overflow:hidden;background:#05030c;font-family:inherit;user-select:none;z-index:5}
.stsel .stbg{position:absolute;inset:-30px;background-size:cover;background-position:center;filter:blur(18px) brightness(.35) saturate(1.3);transition:background-image .2s}
.stsel .stprev{position:absolute;left:150px;right:150px;top:60px;height:420px;border-radius:6px;overflow:hidden;border:3px solid #fff;box-shadow:0 0 0 3px #000,0 0 40px rgba(255,210,110,.45),0 18px 40px #000c;transform:skewX(-3deg);background:#000}
.stsel .stprev .im{position:absolute;inset:0;background-size:cover;background-position:center;transform:skewX(3deg) scale(1.08)}
.stsel .stprev .im.in{animation:stin .32s cubic-bezier(.2,.9,.3,1.1)}
@keyframes stin{from{opacity:.2;transform:skewX(3deg) scale(1.2) translateX(40px)}to{opacity:1;transform:skewX(3deg) scale(1.08)}}
.stsel .stprev .shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.85)),linear-gradient(90deg,rgba(0,0,0,.5),transparent 40%)}
.stsel .stprev .sweep{position:absolute;top:0;bottom:0;width:120px;left:-160px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-20deg);animation:stsweep 2.8s ease-in-out infinite}
@keyframes stsweep{0%,60%{left:-160px}100%{left:110%}}
.stsel .stname{position:absolute;left:38px;bottom:58px;transform:skewX(3deg);font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:58px;line-height:1;letter-spacing:1px;color:#fff;-webkit-text-stroke:2px #000;paint-order:stroke fill;text-shadow:0 0 18px rgba(255,190,80,.8),4px 4px 0 #b3261e;text-transform:uppercase;max-width:900px}
.stsel .stflav{position:absolute;left:42px;bottom:24px;transform:skewX(3deg);font-size:17px;font-style:italic;color:#ffe9b8;text-shadow:0 2px 4px #000}
.stsel .stbadge{position:absolute;right:30px;top:20px;transform:skewX(3deg);display:flex;gap:8px}
.stsel .stbadge span{padding:5px 12px;font-weight:900;font-size:13px;letter-spacing:.12em;color:#1a0e00;background:linear-gradient(180deg,#ffe48a,#f2a623);border:2px solid #000;transform:skewX(-12deg)}
.stsel .stbadge span.p2{background:linear-gradient(180deg,#9fd2ff,#3b8cff);color:#001433}
.stsel .sttitle{position:absolute;left:150px;top:12px;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:38px;color:#ffd36b;-webkit-text-stroke:1.5px #3a1600;paint-order:stroke fill;letter-spacing:3px;text-shadow:0 0 16px #ff8a2a}
.stsel .stcount{position:absolute;right:154px;top:24px;color:#cfc6ff;font-weight:800;letter-spacing:.2em;font-size:14px}
.stsel .stduo{position:absolute;top:150px;width:124px;text-align:center;z-index:3}
.stsel .stduo.p1{left:14px}.stsel .stduo.p2{right:14px}
.stsel .stduo .fr{width:116px;height:150px;margin:0 auto;overflow:hidden;transform:skewX(-6deg);border:3px solid var(--c);box-shadow:0 0 18px var(--c);background:#000}
.stsel .stduo .fr img{width:100%;height:100%;object-fit:cover;object-position:50% 12%;transform:skewX(6deg) scale(1.15)}
.stsel .stduo .tg{display:inline-block;margin-top:-12px;position:relative;padding:2px 12px;font-family:Impact,sans-serif;font-style:italic;font-size:20px;color:#fff;background:var(--c);transform:skewX(-12deg);-webkit-text-stroke:.5px #000}
.stsel .stduo .nm{margin-top:4px;font-weight:900;font-size:14px;color:#fff;text-shadow:0 2px 3px #000;text-transform:uppercase;letter-spacing:.06em}
.stsel .stduo.p1{--c:#ff3b4e}.stsel .stduo.p2{--c:#3ba0ff}
.stsel .stvs{position:absolute;top:330px;left:0;width:152px;text-align:center;font-family:Impact,sans-serif;font-style:italic;font-size:30px;color:#ffd36b;-webkit-text-stroke:1px #000;opacity:.0}
.stsel .stgrid{position:absolute;left:24px;right:24px;top:504px;display:grid;grid-template-columns:repeat(13,1fr);gap:7px}
.stsel .stt{position:relative;height:64px;border:2px solid rgba(255,255,255,.35);background-size:cover;background-position:center;transform:skewX(-8deg);cursor:pointer;box-shadow:0 3px 8px #000a;transition:transform .12s,filter .12s;filter:brightness(.72) saturate(.85)}
.stsel .stt:hover{filter:brightness(.95)}
.stsel .stt.on{filter:none;transform:skewX(-8deg) scale(1.1);z-index:2;border-color:#fff}
.stsel .stt .tn{position:absolute;left:0;right:0;bottom:0;padding:1px 3px;font-size:8.5px;font-weight:800;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.9));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
.stsel .stt.rnd,.stsel .stt.home{background:linear-gradient(135deg,#3a1f6c,#12204a);display:flex;align-items:center;justify-content:center;font-family:Impact,sans-serif;font-size:30px;color:#ffd36b;-webkit-text-stroke:1px #000}
.stsel .stt .hm{position:absolute;top:-2px;right:-2px;width:14px;height:14px;border-radius:50%;border:2px solid #000;background:#ffd36b}
.stsel .stt .hm.p1{background:#ff3b4e;right:12px}
.stsel .stcur{position:absolute;pointer-events:none;z-index:4;border:4px solid #ffd36b;transform:skewX(-8deg) scale(1.1);box-shadow:0 0 0 2px #000,0 0 18px #ffb43a,inset 0 0 14px rgba(255,210,110,.6);transition:left .11s ease-out,top .11s ease-out;animation:stcurp .8s ease-in-out infinite}
.stsel .stcur b{position:absolute;left:-6px;top:-22px;padding:0 6px;font-family:Impact,sans-serif;font-style:italic;font-size:15px;color:#fff;background:#ff3b4e;border:2px solid #000}
@keyframes stcurp{0%,100%{border-color:#ffd36b}50%{border-color:#fff}}
.stsel .stbtns{position:absolute;left:24px;right:24px;top:676px;display:flex;justify-content:space-between;align-items:center}
.stsel .stbtns .btn{font-size:17px;padding:10px 26px}
.stsel #st-ok{font-family:Impact,sans-serif;font-style:italic;font-size:24px;letter-spacing:2px;padding:10px 40px}
.stsel .stwait{position:absolute;left:0;right:0;top:684px;text-align:center;font:900 26px/1 Georgia,serif;letter-spacing:3px;color:#ffe9a8;text-shadow:0 0 14px #ff9a3c,0 2px 0 #000;animation:stwp 1.2s ease-in-out infinite alternate}
.stsel .stwait .onspin{display:inline-block;width:18px;height:18px;margin-right:12px;vertical-align:-2px;border:3px solid #ffe9a8;border-right-color:transparent;border-radius:50%;animation:stspin .8s linear infinite}
@keyframes stwp{from{opacity:.65}to{opacity:1}}@keyframes stspin{to{transform:rotate(360deg)}}
.stsel.view .stt{cursor:default}
.stsel .sthint{position:absolute;left:0;right:0;top:752px;text-align:center;font-size:13px;color:#b9b2e0;opacity:.8}
.stsel .stflash{position:absolute;inset:0;background:#fff;pointer-events:none;z-index:20;animation:stfl .5s ease-out forwards}
@keyframes stfl{from{opacity:.95}to{opacity:0}}
.stsel .stslam{position:absolute;left:0;right:0;top:220px;text-align:center;z-index:21;pointer-events:none;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:110px;color:#ffd36b;-webkit-text-stroke:4px #3a1600;paint-order:stroke fill;text-shadow:0 0 40px #ff9a3c,0 8px 0 #000;animation:stslam .55s cubic-bezier(.2,1.4,.4,1) forwards}
@keyframes stslam{from{transform:scale(3) rotate(-6deg);opacity:0}to{transform:scale(1) rotate(-3deg);opacity:1}}
.stsel.picked .stprev{animation:stshake .35s}
@keyframes stshake{0%,100%{transform:skewX(-3deg)}25%{transform:skewX(-3deg) translate(-8px,4px)}50%{transform:skewX(-3deg) translate(7px,-5px)}75%{transform:skewX(-3deg) translate(-4px,2px)}}
#stwipe{position:absolute;inset:0;z-index:9400;pointer-events:none;background:linear-gradient(100deg,transparent 0%,#000 18%,#000 82%,transparent 100%);animation:stwipe .7s ease-in-out forwards}
@keyframes stwipe{from{transform:translateX(-130%)}to{transform:translateX(130%)}}
`;document.head.appendChild(css);
/* sounds: original procedural blips (no samples) */
if(typeof AUDIO!=="undefined"&&AUDIO.SFX){
  const tone=(c,o,t,f,f2,d,type,v)=>{const g=c.createGain(),x=c.createOscillator();x.type=type;x.frequency.setValueAtTime(f,t);if(f2)x.frequency.exponentialRampToValueAtTime(f2,t+d);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);x.connect(g);g.connect(o);x.start(t);x.stop(t+d+.05);};
  AUDIO.SFX.stagemove=(c,o,t)=>{tone(c,o,t,1320,1760,.07,"square",.07);tone(c,o,t+.03,2640,0,.05,"triangle",.04);};
  AUDIO.SFX.stageslam=(c,o,t)=>{tone(c,o,t,110,38,.55,"sawtooth",.35);tone(c,o,t,880,220,.3,"square",.12);tone(c,o,t+.08,1760,2640,.35,"triangle",.1);};}
const snd=n=>{try{AUDIO.play(n);}catch(e){}};
function homesOf(ch){return ch&&CHARS[ch]&&CHARS[ch].home&&ARENAS[CHARS[ch].home]?CHARS[ch].home:null;}
const COLS=13;
/* ctx: {p1,p2,initial,home:bool (online "home" option),title,okText,onBack(),onConfirm(choice),
   online: onMove(choice), onPick(choice) (fires at the slam, before the wipe), view:true = read-only mirror (guest), wait:"text" banner} */
function stageMount(host,ctx){const keys=Object.keys(ARENAS);const opts=[...(ctx.home?["home"]:[]),"random",...keys];
  const h1=homesOf(ctx.p1),h2=homesOf(ctx.p2);
  let cur=Math.max(0,opts.indexOf(ctx.initial||h2||h1||"random"));let done=false,rt=null;
  const P1=CHARS[ctx.p1],P2=CHARS[ctx.p2];const nm=(ch,C)=>ch==="you"&&typeof playerName==="function"?playerName():C?C.name:"?";
  const duo=(cls,ch,C,tag)=>C?`<div class="stduo ${cls}"><div class="fr"><img src="${PORTRAITS[C.img]}" alt=""></div><div class="tg">${tag}</div><div class="nm">${nm(ch,C)}</div></div>`:"";
  host.innerHTML=`<div class="stsel"><div class="stbg"></div><div class="sttitle">SELECT STAGE</div><div class="stcount"></div>
    <div class="stprev"><div class="im"></div><div class="shade"></div><div class="sweep"></div><div class="stbadge"></div><div class="stname"></div><div class="stflav"></div></div>
    ${duo("p1",ctx.p1,P1,"P1")}${duo("p2",ctx.p2,P2,"RIVAL")}
    <div class="stgrid">${opts.map((k,i)=>{const A=ARENAS[k];
      if(!A)return `<div class="stt ${k==="home"?"home":"rnd"}" data-i="${i}" data-k="${k}" title="${k==="home"?"Home stage (either duelist)":"Random stage"}">${k==="home"?"⌂":"?"}<div class="tn">${k==="home"?"HOME":"RANDOM"}</div></div>`;
      return `<div class="stt" data-i="${i}" data-k="${k}" title="${A.name}" style="background-image:url(${FIELD_IMG[A.img]})">${k===h2?'<div class="hm"></div>':""}${k===h1&&k!==h2?'<div class="hm p1"></div>':""}<div class="tn">${A.name}</div></div>`;}).join("")}</div>
    <div class="stcur"><b>${ctx.view?"HOST":"P1"}</b></div>
    ${ctx.view?`<div class="stwait"><span class="onspin"></span>${ctx.wait||"HOST IS CHOOSING THE STAGE..."}</div>`:`<div class="stbtns"><button class="btn" id="st-back">◀ Back</button><button class="btn red" id="st-ok">${ctx.okText||"⚔ SELECT STAGE"}</button></div>`}
    ${ctx.view?"":`<div class="sthint">← → ↑ ↓ move · click / tap a stage · tap again or Enter to confirm · Esc back</div>`}</div>`;
  const el=host.querySelector(".stsel");const tiles=[...el.querySelectorAll(".stt")];const curEl=el.querySelector(".stcur");const im=el.querySelector(".stprev .im");
  function placeCursor(){const t=tiles[cur];if(!t)return;curEl.style.left=(t.offsetLeft+24-4)+"px";curEl.style.top=(t.offsetTop+504-4)+"px";curEl.style.width=(t.offsetWidth+8)+"px";curEl.style.height=(t.offsetHeight+8)+"px";}
  function show(){const k=opts[cur];const A=ARENAS[k];tiles.forEach((t,i)=>t.classList.toggle("on",i===cur));placeCursor();clearInterval(rt);
    const setImg=src=>{im.style.backgroundImage=`url(${src})`;el.querySelector(".stbg").style.backgroundImage=`url(${src})`;};
    im.classList.remove("in");void im.offsetWidth;im.classList.add("in");
    let name,flav,b=[];
    if(A){setImg(FIELD_IMG[A.img]);name=A.name;flav=FLAVOR[k]||"";if(k===h2)b.push(`<span class="p2">RIVAL'S HOME</span>`);if(k===h1)b.push(`<span>YOUR HOME</span>`);}
    else{let j=0;const cyc=()=>{setImg(FIELD_IMG[ARENAS[keys[j++%keys.length]].img]);};cyc();rt=setInterval(cyc,140);
      if(k==="home"){name="Home Stage";flav="One of the two duelists' home stages, picked at random.";}else{name="Random Stage";flav="Let fate choose the battlefield.";}}
    el.querySelector(".stname").textContent=name;el.querySelector(".stflav").textContent=flav;el.querySelector(".stbadge").innerHTML=b.join("");
    el.querySelector(".stcount").textContent=A?`STAGE ${keys.indexOf(k)+1} / ${keys.length}`:"";}
  function move(i){if(done)return;i=((i%opts.length)+opts.length)%opts.length;if(i===cur)return;cur=i;show();snd("stagemove");if(ctx.onMove)try{ctx.onMove(opts[cur]);}catch(e){}}
  function confirm(){if(done)return;done=true;clearInterval(rt);const k=opts[cur];snd("stageslam");el.classList.add("picked");if(ctx.onPick)try{ctx.onPick(k);}catch(e){}
    if(ctx.view){const w=el.querySelector(".stwait");if(w)w.textContent="STAGE LOCKED IN - GET READY!";}
    const f=document.createElement("div");f.className="stflash";el.appendChild(f);
    const s=document.createElement("div");s.className="stslam";s.textContent=ARENAS[k]?"STAGE SET!":k==="home"?"HOME STAGE!":"RANDOM!";el.appendChild(s);
    const sp=ctx.instant?0:1;
    setTimeout(()=>{const w=document.createElement("div");w.id="stwipe";($("#app")||document.body).appendChild(w);setTimeout(()=>w.remove(),760);
      setTimeout(()=>{cleanup();ctx.onConfirm&&ctx.onConfirm(k);},sp*330);},sp*650);}
  function cleanup(){clearInterval(rt);document.removeEventListener("keydown",kd,true);}
  function kd(e){if(!el.isConnected||!el.offsetParent){cleanup();return;}if(done)return;if(e.target&&/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;
    const m={ArrowLeft:-1,ArrowRight:1,ArrowUp:-COLS,ArrowDown:COLS}[e.key];
    if(m){e.preventDefault();e.stopPropagation();move(cur+m);}else if(e.key==="Enter"){e.preventDefault();e.stopPropagation();confirm();}
    else if(e.key==="Escape"){e.preventDefault();e.stopPropagation();cleanup();ctx.onBack&&ctx.onBack();}}
  if(!ctx.view){document.addEventListener("keydown",kd,true);
    tiles.forEach((t,i)=>{t.onmouseenter=()=>{if(matchMedia("(hover:hover)").matches)move(i);};t.onclick=()=>{if(i===cur)confirm();else move(i);};});
    el.querySelector("#st-ok").onclick=confirm;el.querySelector("#st-back").onclick=()=>{if(done)return;cleanup();ctx.onBack&&ctx.onBack();};}
  else el.classList.add("view");
  show();requestAnimationFrame(placeCursor);
  /* set(k): jump the cursor to a stage key (used by the online mirror); pick(k): set + slam */
  const set=k=>{const i=opts.indexOf(k);if(i>=0)move(i);};
  return {el,move,confirm,set,pick:k=>{set(k);confirm();},close:()=>{done=true;cleanup();},get cur(){return opts[cur];},get done(){return done;}};}
window.stageMount=stageMount;
/* offline: after the rival is confirmed */
function showFieldSelect(p,r,rivalPick){const host=$("#select");if(typeof CUR!=="undefined"&&CUR!=="select")showScreen("select");
  window.__stage=stageMount(host,{p1:p,p2:r,initial:SEL.arena&&SEL.arena!=="auto"&&(ARENAS[SEL.arena]||SEL.arena==="random")?SEL.arena:null,
    onBack:()=>{SEL.step=2;SEL.rival=rivalPick||r;renderSelect();},
    onConfirm:k=>{SEL.arena=k;showVersus(p,r,k);}});}
window.showFieldSelect=showFieldSelect;
})();
/* ================= v9f: CHRONICLES LINK on the duelist portrait ================= */
(function(){
const css=document.createElement("style");css.textContent=`
#duel .dport{height:158px}
/* v9f big portraits: drop the small logo + coin line between the duelist panels, give the room to the portraits */
#duel #left>div:nth-child(2){display:none}
#duel #left{justify-content:space-between}
#duel #left .dport{height:var(--dph,224px)}
/* v9f centered board: equal side columns so the field (zones+piles+phase bar+hands) sits on the screen centre */
#duel{grid-template-columns:270px 1fr 270px}
#duel #right .pinfo{width:246px}
#duel #preview .pvcard{font-size:18px}
.dport .plink{position:absolute;left:6px;right:6px;bottom:6px;z-index:5;border-radius:8px;padding:3px 6px 4px;text-align:center;font-size:10px;line-height:1.15;font-weight:800;letter-spacing:.05em;color:#cfd3ff;
  background:linear-gradient(135deg,rgba(40,30,80,.92),rgba(15,10,35,.92));border:1px solid rgba(255,255,255,.25);cursor:not-allowed;user-select:none}
.dport .plink .pn{display:block;font-size:11.5px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.02em}
.dport .plink .ps{display:block;font-size:8.5px;opacity:.85}
.dport .plink.locked,.dport .plink.wait{opacity:.62;filter:grayscale(.6)}
.dport .plink.used{opacity:.5;filter:grayscale(1)}
.dport .plink.ready{cursor:pointer;color:#ffe08a;border-color:#ffe08a;background:linear-gradient(135deg,#3b1d6e,#1b3a7a 55%,#6a2c7a);animation:plpulse 1s ease-in-out infinite}
.dport .plink.ready .ps{color:#fff;opacity:1}
@keyframes plpulse{0%,100%{transform:scale(1);box-shadow:0 0 8px #ffd36b}50%{transform:scale(1.06);box-shadow:0 0 18px #fff2b0,0 0 30px var(--c)}}
.dport.lk-glow{cursor:pointer;border-color:#ffe08a;animation:plaura 1.2s ease-in-out infinite}
.dport.lk-glow::before{content:"";position:absolute;inset:0;z-index:4;pointer-events:none;border-radius:10px;background:radial-gradient(ellipse at 50% 110%,rgba(255,215,110,.55),transparent 65%);animation:plin 1.2s ease-in-out infinite}
@keyframes plaura{0%,100%{box-shadow:0 0 12px var(--c),0 0 22px #ffd36b,inset 0 0 20px rgba(255,210,110,.35)}50%{box-shadow:0 0 26px var(--c),0 0 48px #ffd36b,0 0 70px var(--c),inset 0 0 36px rgba(255,230,150,.6)}}
@keyframes plin{0%,100%{opacity:.45}50%{opacity:1}}
.dport .elink{position:absolute;right:5px;top:5px;z-index:5;padding:2px 7px;border-radius:6px;font-size:9px;font-weight:900;letter-spacing:.08em;color:#ddd;background:rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.3)}
.dport .elink.used{color:#ffe08a;border-color:#ffe08a88}
`;document.head.appendChild(css);
const why={locked:"",wait:"Usable in your Main Phase",used:"Already used this duel",ready:"Click to activate"};
function paintPorts(){if(!G||!G.sides)return;
  const p=$("#port-player");if(p){const L=LINKS[S("player").char];let b=p.querySelector(".plink");
    if(!L){if(b)b.remove();p.classList.remove("lk-glow");}
    else{const st=linkStatus("player");const mine=!G.auto;const glow=st==="ready"&&mine;
      if(!b){b=document.createElement("div");p.appendChild(b);}
      b.className="plink "+st;b.dataset.link="player";const lp=window.linkLP?linkLP("player"):LINK_LP;b.title=`${L.name}: ${L.text}\n— ${st==="locked"?`Unlocks when your LP is ${lp} or less`:why[st]} (once per duel, LP ${lp} or less, your Main Phase)${L.lose?"\n⚠ This will lose the duel.":""}`;
      b.innerHTML=`<span class="pn">✦ ${L.name}</span><span class="ps">${st==="ready"?(mine?"CHRONICLES LINK · ACTIVATE!":"READY"):st==="used"?"LINK USED":st==="locked"?`LINK · UNLOCKS AT ${lp} LP`:"LINK · YOUR MAIN PHASE"}</span>`;
      p.classList.toggle("lk-glow",glow);if(glow)p.dataset.link="player";else delete p.dataset.link;}}
  const e=$("#port-enemy");if(e){const L=LINKS[S("enemy").char];let b=e.querySelector(".elink");const used=L&&LK("enemy").used;
    if(used){if(!b){b=document.createElement("div");e.appendChild(b);}b.className="elink used";b.textContent="✦ LINK USED";b.title=`${S("enemy").name} used ${L.name}`;}else if(b)b.remove();}}
const bR=render;render=function(){const r=bR.apply(this,arguments);try{paintPorts();}catch(er){}return r;};
window.paintLinkPorts=paintPorts;
})();
/* ================= v11: TAG DUEL (2 vs 2) - engine =================
   Seats: 0=A1 1=B1 2=A2 3=B2 (team A = "player" side, team B = "enemy" side). Turn order A1 > B1 > A2 > B2.
   Each team shares ONE field + Graveyard (G.sides[team].monsters/st/gy); every duelist (seat) keeps an own LP, deck,
   hand, Normal Summon and Chronicles Link. The per-duelist props of G.sides[team] are accessors that point at the
   team's "acting" seat (G.tag.act[team]); the engine sets the acting seat before anything that touches one duelist
   (turn start, damage routing, response windows, Link post-processing). Every wrapper is a no-op unless G.tag, so the
   1v1 game is untouched. Seat objects are generic (team + index), so a later 4-way mode can reuse them. */
(function(){
const PERS=["char","name","lp","deck","hand","normalSummoned","lk"];
const TEAMS=["player","enemy"];
const T=()=>G&&G.sides&&G.tag||null;
const live=t=>t.seats.filter(x=>!x.out);
const teamSeats=(team,all)=>{const t=T();return t?t.seats.filter(x=>x.team===team&&(all||!x.out)):[];};
const seatOfTeamAct=team=>{const t=T();return t.seats[t.act[team]];};
const tagLabel=i=>["A1","B1","A2","B2"][i];
const short=n=>String(n||"?").replace(/[^A-Za-z0-9]/g,"").slice(0,2).toUpperCase()||"??";
function setAct(team,i){const t=T();if(!t||i==null||!t.seats[i]||t.seats[i].team!==team)return;if(t.act[team]!==i){t.act[team]=i;t.actDirty=1;}}
function partnerOf(st){const t=T();return t.seats.find(x=>x.team===st.team&&x!==st)||null;}
function aliveSeat(i){const t=T();const st=t.seats[i];if(!st)return null;if(!st.out)return st;const p=partnerOf(st);return p&&!p.out?p:null;}
window.TAG_NEXT=null;

/* ---------- setup ---------- */
function tagSetup(cfg){const g=G;cfg=cfg||{};
  const human=cfg.human||[true,false,false,false];
  const seats=[];
  for(let i=0;i<4;i++){const team=i%2?"enemy":"player";const sd=g.sides[team];let st;
    if(i<2)st={char:sd.char,name:sd.name,lp:sd.lp,deck:sd.deck,hand:sd.hand,normalSummoned:false,lk:{used:0,lost:0}};
    else{const ch=cfg.chars[i];const nm=cfg.names&&cfg.names[i]||(ch==="you"?(human[i]&&!cfg.net?playerName():"Mystery Duelist"):CHARS[ch].name);
      const deck=buildDeck(cfg.decks&&cfg.decks[i]||deckFor(ch,human[i]&&!cfg.net?"player":"enemy"),team);
      st={char:ch,name:nm,lp:START_LP,deck,hand:[],normalSummoned:false,lk:{used:0,lost:0}};for(let k=0;k<5;k++)st.hand.push(st.deck.pop());}
    if(cfg.names&&cfg.names[i])st.name=cfg.names[i];
    Object.assign(st,{i,key:tagLabel(i),team,human:!!human[i],out:false,outT:0,ai:!human[i]});
    st.deck.forEach(c=>c.seat=i);st.hand.forEach(c=>c.seat=i);seats.push(st);}
  /* duplicate names: "Ryuga" + "Ryuga II" */
  const seen={};for(const st of seats){if(seen[st.name])st.name=st.name+" II";seen[st.name]=1;}
  const t={seats,order:[0,1,2,3],pos:0,act:{player:0,enemy:1},pin:null,resp:0,filt:null,allAI:!!cfg.allAI,view:cfg.view!=null?cfg.view:0,
    turnSeat:0,round:1,cfg,kill:null,killR:null,settle:null,ko:[],directPick:null};
  g.tag=t;
  for(const team of TEAMS){const sd=g.sides[team];for(const k of PERS){delete sd[k];
    Object.defineProperty(sd,k,{configurable:true,enumerable:true,get(){return t.seats[t.act[team]][k];},set(v){t.seats[t.act[team]][k]=v;}});}}
  delete g.auto;Object.defineProperty(g,"auto",{configurable:true,enumerable:true,get(){return t.allAI||!t.seats[t.act.player].human;},set(v){t.allAI=!!v;}});
  g.match=[cfg.chars[0],cfg.chars[1]];
  log(`TAG DUEL: ${seats[0].name} & ${seats[2].name} vs ${seats[1].name} & ${seats[3].name}!`,"s");
  log("Turn order: "+seats.map(s=>s.key+" "+s.name).join(" › ")+".","s");
  if(typeof window.tagBoardOn==="function")window.tagBoardOn();}
window.tagSetup=tagSetup;
/* keep card.seat in sync (cards made by effects, control changes) */
function syncSeats(){const t=T();if(!t)return;
  for(const st of t.seats){for(const c of st.hand)if(c)c.seat=st.i;for(const c of st.deck)if(c)c.seat=st.i;}
  for(const team of TEAMS){const sd=G.sides[team];const a=t.act[team];
    for(const c of sd.monsters.concat(sd.st)){if(!c)continue;const s=t.seats[c.seat];if(c.seat==null||!s||s.team!==team||s.out){const al=s&&s.team===team?aliveSeat(c.seat):null;c.seat=al?al.i:a;}}}}
window.tagSync=syncSeats;

/* ---------- upcoming turns ---------- */
function upcoming(n){const t=T();const out=[];let k=1;let turn=G.turn;
  while(out.length<(n||8)&&k<40){const st=t.seats[t.order[(t.pos+k)%4]];k++;if(st.out)continue;turn++;out.push({seat:st,turn});}return out;}
const nextTurnOf=i=>{const u=upcoming(8).find(x=>x.seat.i===i);return u?u.turn:G.turn+4;};
const nextOpp=team=>upcoming(8).find(x=>x.seat.team!==team)||null;
window.tagUpcoming=upcoming;

/* ---------- KO + result ---------- */
function teamOut(team){return teamSeats(team,true).every(x=>x.out);}
function tagKO(st,why,now){const t=T();if(!t||st.out||G.over)return;
  st.out=true;st.outT=G.turn;st.lp=Math.max(0,st.lp);st.koWhy=why;t.ko.push(st.i);
  const p=partnerOf(st);const n=st.hand.length+st.deck.length;
  st.hand.splice(0);st.deck.splice(0);
  let moved=0;if(p&&!p.out){for(const c of G.sides[st.team].monsters.concat(G.sides[st.team].st))if(c&&c.seat===st.i){c.seat=p.i;moved++;}
    if(t.act[st.team]===st.i)setAct(st.team,p.i);}
  log(`✖ ${st.name} is KNOCKED OUT${why?` (${why})`:""}!${n?` Their hand and deck leave the duel.`:""}${moved?` ${p.name} takes over ${moved} field card${moved>1?"s":""}.`:""}`,"s");
  try{if(typeof AUDIO!=="undefined")AUDIO.play("destroy");}catch(e){}
  try{speak(st.team,"lose",.9);}catch(e){}
  render();
  const delay=now?0:Math.max(60,520*SPEED+80);
  clearTimeout(t.settle);t.settle=setTimeout(()=>settle(),delay);
  if(now)settle();}
function settle(){const t=T();if(!t||G.over)return;const a=teamOut("player"),b=teamOut("enemy");
  if(a||b){tagFinish(a&&b?null:a?"enemy":"player",a&&b?"Both teams fell together":"Both partners are out");return;}
  const cur=t.seats[t.turnSeat];
  if(cur&&cur.out&&!t.killed){t.killed=1;GID++;G.humanEnd=null;G.discardDone=null;G.choice=null;try{closeMenu();}catch(e){}
    try{$("#modalLayer").innerHTML="";}catch(e){}
    for(const team of TEAMS){const sd=G.sides[team];sd.monsters.forEach((m,k)=>{if(m&&m.destiny){sd.monsters[k]=null;}});}
    G.ui={mode:null};render();if(t.killR)t.killR();}}
function tagFinish(winner,reason){const t=T();if(!t||G.over)return;G.over=true;G.winner=winner;G.busy=true;clearTimeout(t.settle);
  try{closeMenu();cineClose();}catch(e){}
  const names=team=>teamSeats(team,true).map(x=>x.name).join(" & ");
  log(winner?`★ TEAM ${winner==="player"?"A":"B"} WINS: ${names(winner)}! (${reason})`:`★ DRAW: ${reason}.`,"s");
  render();
  const view=t.seats[t.view];const won=winner&&view&&view.team===winner;
  try{if(winner)speakForce(winner,"win");}catch(e){}
  try{if(typeof AUDIO!=="undefined"&&!t.allAI)AUDIO.play(winner?(won?"victory":"defeat"):"defeat");}catch(e){}
  const gid=GID;if(t.killR)t.killR();
  setTimeout(()=>{if(gid===GID&&G&&G.tag===t&&typeof window.tagShowResult==="function")window.tagShowResult(winner,reason);},1400*SPEED);}
window.tagKO=tagKO;window.tagFinish=tagFinish;

const bGO=gameOver;gameOver=function(winner,reason){const t=T();if(!t)return bGO.apply(this,arguments);if(G.over)return;
  if(reason==="Time limit"){const lp=team=>teamSeats(team).reduce((a,x)=>a+x.lp,0);const a=lp("player"),b=lp("enemy");
    tagFinish(a===b?null:a>b?"player":"enemy","Time limit");return;}
  const loser=other(winner);const st=seatOfTeamAct(loser);
  if(reason==="Deck out"){tagKO(t.seats[t.turnSeat].team===loser?t.seats[t.turnSeat]:st,"Deck out",true);return;}
  tagKO(st,reason&&reason!=="LP"?reason:"LP 0");};

/* ---------- the loop ---------- */
const bGL=gameLoop;gameLoop=function(side,gid){const cfg=window.TAG_NEXT;if(!cfg)return bGL.apply(this,arguments);window.TAG_NEXT=null;
  tagSetup(cfg);return tagLoop(G);};
async function tagLoop(g){const t=g.tag;
  try{speak("enemy","start");}catch(e){}
  try{await banner("TAG DUEL!");}catch(e){if(e!==ABORT)throw e;return;}
  let turns=0;
  while(G===g&&!g.over){
    /* flush a pending KO settle before the next duelist starts (no post-result draws) */
    if(t.ko.length){clearTimeout(t.settle);settle();if(g.over)return;}
    const st=t.seats[t.order[t.pos]];
    if(st.out){t.pos=(t.pos+1)%4;continue;}
    t.turnSeat=st.i;t.killed=0;t.kill=new Promise(r=>{t.killR=r;});
    t.round=Math.floor(turns/live(t).length)+1;turns++;
    setAct(st.team,st.i);
    const body=(async()=>{await tagBegin(st);if(g.over||st.out)return;
      if(isAI(st.team)){G.busy=true;render();await aiTurn(st.team);}
      else{G.busy=false;render();await new Promise(r=>{G.humanEnd=r;});G.humanEnd=null;}
      if(g.over||st.out)return;setAct(st.team,st.i);await endPhase(st.team);})();
    const r=await Promise.race([body.then(()=>"ok",e=>{if(e===ABORT)return "abort";console.error(e);return "err";}),t.kill.then(()=>"kill")]);
    if(G!==g||g.over)return;
    if(r==="abort"&&!st.out){/* a stray abort (GID bumped elsewhere): the duel was left */if(!G.tag||G.over)return;}
    t.pos=(t.pos+1)%4;}}
window.tagLoop=tagLoop;
async function tagBegin(st){const t=T();setAct(st.team,st.i);
  const sd=S(st.team);
  /* first duelist: no draw / no attack (G.turn===1 in the engine) */
  if(G.turn>=1&&!sd.deck.length){G.turn++;G.current=st.team;render();log(`— Turn ${G.turn}: ${st.name} —`,"s");log(`${st.name} cannot draw — deck out!`,"s");tagKO(st,"Deck out",true);await sleep(400);return;}
  if(G.turn>=400){const lp=team=>teamSeats(team).reduce((a,x)=>a+x.lp,0);const a=lp("player"),b=lp("enemy");tagFinish(a===b?null:a>b?"player":"enemy","Time limit");return;}
  await beginTurn(st.team);
  /* tag rule: the turn seat restarts its own per-turn flags */
  setAct(st.team,st.i);render();}

/* ---------- damage routing ---------- */
function fairPick(team,dmg,attTeam){const l=teamSeats(team);if(l.length<=1)return l[0]||null;
  const fl=attTeam&&G.sides[attTeam]&&(()=>{const t=T();const a=t.seats[t.turnSeat];return a&&a.lk&&a.lk.kelvin===G.turn;})();
  let pool=l;if(fl){const p=l.filter(x=>x.lp>1);if(p.length)pool=p;}
  const lethal=pool.filter(x=>dmg>=x.lp);
  const aiFirst=a=>a.slice().sort((x,y)=>(x.human?1:0)-(y.human?1:0)||y.lp-x.lp);
  if(lethal.length)return aiFirst(lethal)[0];
  const mx=Math.max(...pool.map(x=>x.lp));return aiFirst(pool.filter(x=>x.lp===mx))[0];}
window.tagFairPick=fairPick;
/* human picker: which opponent takes it (only living opponents) */
function pickOpp(team,title,sub,amount){const t=T();const l=teamSeats(team);if(l.length<=1)return Promise.resolve(l[0]||null);
  return new Promise(res=>{const g0=GID;const old=document.getElementById("tagpick");if(old)old.remove();
    const d=document.createElement("div");d.id="tagpick";d.className="tagpick";
    d.innerHTML=`<div class="tpk"><h4>${title}</h4><div class="sub">${sub||""}</div><div class="tpkl">${l.map(x=>{const C=CHARS[x.char]||{};
      return `<button class="tpko" data-seat="${x.i}" style="--c:${C.color||"#7cf"}"><img src="${PORTRAITS[C.img]||""}" alt=""><span><b>${x.key} · ${x.name}</b><i>${x.lp} LP${amount?` → ${Math.max(0,x.lp-amount)}`:""}${x.human?" · HUMAN":" · AI"}</i></span></button>`;}).join("")}</div></div>`;
    ($("#app")||document.body).appendChild(d);
    const done=v=>{clearInterval(iv);d.remove();res(v);};
    const iv=setInterval(()=>{if(!document.body.contains(d)){clearInterval(iv);res(l[0]);return;}if(!G||!G.tag||G.over||GID!==g0)done(l[0]);},250);
    if(t.pickTimeout)setTimeout(()=>{if(document.body.contains(d))done(fairPick(team,amount||0));},t.pickTimeout);
    d.addEventListener("click",e=>{const b=e.target.closest("[data-seat]");if(!b)return;e.stopPropagation();const st=t.seats[+b.dataset.seat];if(st&&!st.out)done(st);});});}
window.tagPickOpp=pickOpp;
/* hook for online: a remote human picks (returns a promise of a seat) */
window.tagRemotePick=null;
async function choiceFor(chooser,team,title,sub,amount){const t=T();
  if(!chooser||chooser.out||!chooser.human||t.allAI)return fairPick(team,amount,chooser&&chooser.team);
  if(chooser.i!==t.view&&typeof window.tagRemotePick==="function")return (await window.tagRemotePick(chooser,team,title,sub,amount))||fairPick(team,amount,chooser.team);
  if(chooser.i!==t.view)return fairPick(team,amount,chooser.team);
  return await pickOpp(team,title,sub,amount);}
window.tagChoiceFor=choiceFor;

const bCLP=changeLP;changeLP=async function(s,delta){const t=T();if(!t||!delta)return bCLP.apply(this,arguments);
  let st=null;
  if(s===G.current&&!t.resp)st=t.seats[t.turnSeat];
  else if(t.pin&&t.pin.team===s)st=aliveSeat(t.pin.seat);
  if(!st&&(t.resp>0||delta>0))st=aliveSeat(t.act[s]);
  if(!st&&s===G.current)st=t.seats[t.turnSeat];
  if(!st){const ch=t.seats[t.turnSeat];
    st=await choiceFor(ch,s,`${-delta} DAMAGE: CHOOSE AN OPPONENT`,"Which opponent takes this damage?",-delta);if(G.over)return;
    if(st)t.pin={team:s,seat:st.i,auto:1};}
  if(st)setAct(s,st.i);
  if(!st||st.out)return;
  if(t.actDirty){t.actDirty=0;render();}
  try{return await bCLP.call(this,s,delta);}finally{if(t.pin&&t.pin.auto&&t.pin.team===s)t.pin=null;}};
/* attack: the defending owner takes the damage; a direct attack picks an opponent */
const bATK=attack;attack=async function(s,attUid,tgtUid){const t=T();if(!t)return bATK.apply(this,arguments);
  const o=other(s);let seat=null;
  if(tgtUid!=null){const f=find(tgtUid);if(f&&f.card&&f.card.seat!=null)seat=aliveSeat(f.card.seat);}
  else{const a=find(attUid);const atk=a&&a.card?atkOf(a.card):0;
    if(t.directPick!=null&&aliveSeat(t.directPick)&&t.seats[t.directPick].team===o)seat=aliveSeat(t.directPick);
    else seat=await choiceFor(t.seats[t.turnSeat],o,"DIRECT ATTACK: CHOOSE AN OPPONENT",`${a&&a.card?a.card.name:"Your monster"} attacks directly for ${atk}.`,atk);
    t.directPick=null;if(G.over)return;}
  const prev=t.pin;if(seat){t.pin={team:o,seat:seat.i};setAct(o,seat.i);if(t.actDirty){t.actDirty=0;render();}}
  try{return await bATK.apply(this,arguments);}finally{t.pin=prev;}};
/* responses: AI partner decides for its own cards first; then the human seat(s) for their own + AI/out partner cards */
const bRW=responseWindow;responseWindow=async function(r,kind,ctx){const t=T();if(!t||!G.sides||G.over||G.current===r)return bRW.apply(this,arguments);
  const team=teamSeats(r);const order=team.filter(x=>!x.human||t.allAI).concat(team.filter(x=>x.human&&!t.allAI));
  const prevAct=t.act[r];t.resp++;
  try{for(const st of order){if(G.over)return null;setAct(r,st.i);
      const isH=st.human&&!t.allAI;
      t.filt=new Set(isH?t.seats.filter(x=>x.team===r&&(x===st||x.out||!x.human)).map(x=>x.i):[st.i].concat(t.seats.filter(x=>x.team===r&&x.out).map(x=>x.i)));
      const res=await bRW.call(this,r,kind,ctx);if(res)return res;}
    return null;}
  finally{t.resp--;t.filt=null;if(!G.over)setAct(r,aliveSeat(prevAct)?aliveSeat(prevAct).i:prevAct);}};
const filtOK=c=>{const t=T();return !t||!t.filt||!c||c.seat==null||t.filt.has(c.seat);};
const bUQ=usableQuicks;usableQuicks=function(){const l=bUQ.apply(this,arguments);return T()&&T().filt?l.filter(filtOK):l;};
const bTF=trapsFor;trapsFor=function(){const l=bTF.apply(this,arguments);return T()&&T().filt?l.filter(filtOK):l;};
/* effects of the non-turn team act for the card's owner */
const bRF=resolveFx;resolveFx=async function(s,fx,src){const t=T();if(!t||s===G.current||!src||src.seat==null)return bRF.apply(this,arguments);
  const st=aliveSeat(src.seat);if(st&&st.team===s)setAct(s,st.i);t.resp++;try{return await bRF.apply(this,arguments);}finally{t.resp--;}};
const bSS=specialSummon;specialSummon=async function(s,card){const t=T();if(t&&card){const st=s===G.current?t.seats[t.turnSeat]:aliveSeat(t.act[s]);if(st&&st.team===s)card.seat=st.i;}
  return bSS.apply(this,arguments);};
const bMK=mk;mk=function(id,owner){const c=bMK.apply(this,arguments);const t=T();if(t&&G.sides[owner]){const st=owner===G.current?t.seats[t.turnSeat]:t.seats[t.act[owner]];if(st)c.seat=st.i;}return c;};
const bBM=bounceMonster;bounceMonster=async function(m){const t=T();if(!t||!m||m.seat==null)return bBM.apply(this,arguments);
  const f=find(m.uid);const team=f&&f.side;const st=team&&aliveSeat(m.seat);if(!st||st.team!==team)return bBM.apply(this,arguments);
  const prev=t.act[team];setAct(team,st.i);try{return await bBM.apply(this,arguments);}finally{if(aliveSeat(prev))setAct(team,prev);}};
/* find: also the other seats' hands / decks (zones xhand / xdeck) */
const bFind=find;find=function(uid){const r=bFind.apply(this,arguments);if(r)return r;const t=T();if(!t)return null;
  for(const st of t.seats)for(const z of ["hand","deck"]){const a=st[z];const i=a.findIndex(c=>c&&c.uid===uid);if(i>=0)return {card:a[i],side:st.team,zone:"x"+z,idx:i,seat:st.i};}
  return null;};
/* what the viewer may see: own team's hands (partners see each other's hands), public field cards, all GY */
const bCS=canSee;canSee=function(f){const t=T();if(!t)return bCS.apply(this,arguments);if(!f)return false;
  if(f.zone==="gy")return true;if(t.allAI)return true;const vt=t.seats[t.view]&&t.seats[t.view].team;
  if(f.side===vt&&!/deck/.test(f.zone))return true;
  return !!(f.card&&f.card.faceUp)&&!/hand|deck/.test(f.zone);};
const bR=render;render=function(){const t=T();if(t)syncSeats();const r=bR.apply(this,arguments);if(t&&typeof window.tagPaint==="function")try{window.tagPaint();}catch(e){console.error(e);}return r;};
/* the AI never aims at a human first when the damage target is a free choice: see fairPick */

/* ---------- Chronicles Link adaptations ---------- */
const LK2=st=>{if(!st.lk)st.lk={used:0,lost:0};return st.lk;};
const say=(s,m)=>log(m,sc(s));
async function discardAll(st){setAct(st.team,st.i);const sd=S(st.team);const h=sd.hand.splice(0);for(const c of h)toGY(c);if(h.length)log(`${st.name} discards their whole hand (${h.length}).`,sc(st.team));}
function wrapRun(id,fn){const L=window.LINKS&&LINKS[id];if(!L||!L.run)return;const base=L.run;L.run=async function(s){const t=T();if(!t)return base.apply(this,arguments);
  const me=t.seats[t.turnSeat];return fn.call(this,s,me,base,t);};}
function linkPatches(){
  wrapRun("kaito",async(s,me,base)=>{await base(s);const u=nextTurnOf(me.i);for(const x of teamSeats(s,true))LK2(x).kaitoUntil=u;setAct(s,me.i);});
  wrapRun("weiyao2",async(s,me,base)=>{await base(s);for(const x of teamSeats(s,true))LK2(x).gallop=G.turn;setAct(s,me.i);});
  wrapRun("keith",async(s,me,base)=>{await base(s);const u=nextTurnOf(me.i);for(const m of mons(s))if(m&&m.lkSafe===G.turn+2)m.lkSafe=u;});
  wrapRun("sabrina",async(s,me,base)=>{await base(s);const n=nextOpp(s);const u=n?n.turn:G.turn+1;for(const m of mons(other(s)))if(m&&m.lkMinusT===G.turn+1)m.lkMinusT=u;});
  wrapRun("sixing",async(s,me,base)=>{await base(s);for(const x of teamSeats(other(s),true))LK2(x).stLock=G.turn;});
  wrapRun("christopher",async(s,me)=>{const n=nextOpp(s);if(n)LK2(n.seat).noAtk=n.turn;
    for(const st of live(T())){if(G.over)return;setAct(st.team,st.i);T().resp++;try{await changeLP(st.team,((typeof LINK_PARAMS!=="undefined"&&LINK_PARAMS.christopher&&LINK_PARAMS.christopher.lp)||1000));}finally{T().resp--;}}
    setAct(s,me.i);if(n)say(s,`${n.seat.name} can't attack during their next turn.`);});
  wrapRun("jason",async(s,me,base)=>{const n=nextOpp(s);const prev=T().act[other(s)];if(n)setAct(other(s),n.seat.i);T().resp++;
    try{await base(s);}finally{T().resp--;if(!G.over&&aliveSeat(prev))setAct(other(s),prev);setAct(s,me.i);}});
  wrapRun("lemon",async(s,me)=>{shakeEl("#field",true);await destroyMonsters([...mons(s),...mons(other(s))]);if(G.over)return;
    for(const st of live(T()))await discardAll(st);render();await sleep(250);
    for(const st of live(T())){if(G.over)return;setAct(st.team,st.i);const sd=S(st.team);let n=0;
      for(let i=0;i<5;i++){const pool=sd.gy.filter(c=>!c.token&&!c.destiny&&c.seat===st.i);if(!pool.length)break;
        const c=await requestChoice(st.team,pool,{title:`I Quit!: ${st.name} shuffles a card back (${i+1}/5)`,sub:"Choose one of YOUR cards in the team Graveyard to shuffle into your deck.",ai:l=>bestBy(l,x=>val(x))})||pool[0];
        const k=sd.gy.indexOf(c);if(k<0)continue;sd.gy.splice(k,1);if(typeof clearLk==="function")try{clearLk(c);}catch(e){}c.faceUp=false;c.seat=st.i;sd.deck.push(c);n++;}
      shuffle(sd.deck);if(n)log(`${st.name} shuffles ${n} card${n>1?"s":""} back into their deck.`,sc(st.team));render();}
    for(const st of live(T())){if(G.over)return;setAct(st.team,st.i);await drawCards(st.team,2);}
    setAct(s,me.i);setAct(other(s),aliveSeat(T().act[other(s)])?T().act[other(s)]:teamSeats(other(s))[0].i);});
  wrapRun("eryll2",async(s,me)=>{shakeEl("#field",true);const all=[...mons(s),...mons(other(s))],imm=all.filter(m=>m.destiny);for(const m of imm)floatText(elOf(m.uid),"UNAFFECTED","info");
    await destroySTs([...sts(s),...sts(other(s))]);if(G.over)return;await destroyMonsters(all.filter(m=>!m.destiny));if(G.over)return;
    for(const st of live(T()))await discardAll(st);render();await sleep(250);
    for(const st of live(T())){if(G.over)return;setAct(st.team,st.i);await drawCards(st.team,1);}setAct(s,me.i);});
  wrapRun("darkkelvin",async(s,me)=>{const L=LK2(me);const dmg=Math.min(2000,Math.floor((L.lost||0)*.5));
    const o=other(s);const tgt=await choiceFor(me,o,`SHARED SORROW: ${dmg} DAMAGE`,"Choose the opponent who takes it.",dmg);if(G.over)return;
    if(tgt){T().pin={team:o,seat:tgt.i};try{await changeLP(o,-dmg);}finally{T().pin=null;}}if(G.over)return;
    setAct(s,me.i);await tagDK(s,me);});
  wrapRun("sliver",async(s,me)=>{const sd=S(s);shakeEl("#field",true);const mine=c=>c&&c.seat===me.i;
    const ms=mons(s).filter(mine);for(const m of ms){const el=elOf(m.uid);if(el)anim(el,[{opacity:1},{opacity:0,transform:"translateY(40px) scale(.7)",filter:"grayscale(1)"}],450);}await sleep(460);
    let n=0;for(const m of ms){const f=find(m.uid);if(f&&f.zone==="monsters"){sd.monsters[f.idx]=null;for(const x of TEAMS)S(x).st.forEach((e,k)=>{if(e&&e.equippedTo===m.uid){S(x).st[k]=null;toGY(e);}});toGY(m);n++;}}
    sd.st.forEach((c,i)=>{if(mine(c)){sd.st[i]=null;toGY(c);n++;}});
    setAct(s,me.i);const h=sd.hand.splice(0);for(const c of h)toGY(c);const d=sd.deck.splice(0);for(const c of d)toGY(c);
    log(`${me.name} sends ${n} of her field card${n===1?"":"s"}, ${h.length} card${h.length===1?"":"s"} in hand and her entire Deck (${d.length}) to the Graveyard.`,sc(s));render();await sleep(300);});
  wrapRun("ben",async(s,me,base)=>{T().benSeat=me.i;try{await base(s);}finally{T().benSeat=null;}});
}
/* Dark Kelvin sacrifice: DK draws 1 per destroyed monster; each owner draws 1 per own destroyed monster */
async function tagDK(s,me){const o=other(s);const tg=()=>mons(o).filter(m=>!m.destiny);if(!tg().length||typeof dkPayOpts!=="function")return;
  const opts=dkPayOpts(s);if(opts.length<2)return;
  const pick=await requestChoice(s,opts,{amount:true,title:"Shared Sorrow: sacrifice LP?",sub:`Pay up to ${opts[opts.length-1].value} LP. Every monster on the opposing shared field loses that much ATK; monsters reduced to 0 ATK are destroyed. ${me.name} draws 1 per destroyed monster and each owner draws 1 per own destroyed monster.`,
    confirmLabel:"Pay",cancelLabel:"Skip",unit:"LP",ai:c=>dkAiPay(s,c)||c[0]});
  const x=pick&&+pick.value||0;if(G.over)return;if(!(x>0)){say(s,`${me.name} pays no LP.`);return;}
  setAct(s,me.i);say(s,`${me.name} pays ${x} LP to Shared Sorrow!`);await changeLP(s,-x);if(G.over)return;
  const kill=[];for(const m of tg()){const before=atkOf(m);m.bonus=(m.bonus||0)-Math.min(x,before);floatText(elOf(m.uid),`-${x} ATK`,"dmg");if(before>0&&atkOf(m)<=0)kill.push(m);}
  render();await sleep(450);if(kill.length)await destroyMonsters(kill);
  const dead=kill.filter(m=>!onField(m));if(!dead.length||G.over){if(!G.over)say(s,"No monster was destroyed: nobody draws.");return;}
  setAct(s,me.i);say(s,`${dead.length} destroyed: ${me.name} draws ${dead.length}.`);await drawCards(s,dead.length);
  const per={};for(const m of dead){const st=aliveSeat(m.seat);if(st&&st.team===o)per[st.i]=(per[st.i]||0)+1;}
  for(const i in per){if(G.over)return;const st=T().seats[i];setAct(o,st.i);say(o,`${st.name} draws ${per[i]} (own monsters destroyed).`);await drawCards(o,per[i]);}
  render();}
/* Ben: field fodder only from cards he owns */
const bRC=requestChoice;requestChoice=function(side,options,opts){const t=T();
  if(t&&t.benSeat!=null&&Array.isArray(options))options=options.filter(o=>{const c=o&&o.card||o;if(!c||!c.uid)return true;const f=find(c.uid);return !(f&&(f.zone==="monsters"||f.zone==="st"))||c.seat===t.benSeat;});
  return bRC.call(this,side,options,opts);};
/* Aoi Yuki's Last Song end: only her own monsters go back */
const bEP=endPhase;endPhase=async function(side){const t=T();if(!t)return bEP.apply(this,arguments);
  const me=t.seats[t.turnSeat];setAct(side,me.i);const k=LK2(me);
  if(k.aoiEnd===G.turn&&!G.over&&!(typeof guestNow==="function"&&guestNow())){k.aoiEnd=-1;const sd=S(side);const ms=mons(side).filter(m=>m.seat===me.i);
    for(const m of ms){const f=find(m.uid);if(!f||f.zone!=="monsters")continue;sd.monsters[f.idx]=null;for(const x of TEAMS)S(x).st.forEach((e,j)=>{if(e&&e.equippedTo===m.uid){S(x).st[j]=null;toGY(e);}});
      if(m.extra||m.token){toGY(m);continue;}Object.assign(m,{faceUp:false,pos:"atk",equippedTo:null,guardUsed:false,tempAtk:0,tempTurn:-1,bonus:0,attackCount:0,attackedTurn:-1,summonedTurn:-1,posChangedTurn:-1});sd.deck.push(m);}
    if(ms.length){shuffle(sd.deck);log(`Last Song ends: ${me.name}'s monsters return to her deck.`,sc(side));render();await sleep(300);}
    const pool=sd.gy.filter(c=>c.type==="monster"&&!c.token&&!c.destiny);
    if(pool.length&&freeIdx(sd.monsters)>=0){const c=await requestChoice(side,pool,{title:"Last Song: Special Summon from the team Graveyard",sub:"It is summoned in Defense Position with 0 DEF.",score:c=>c.atk});
      if(c&&!G.over){const ok=await specialSummon(side,c,"gy");if(ok){c.pos="def";c.def=0;c.lkDef0=1;render();}}}}
  setAct(side,me.i);return bEP.apply(this,arguments);};
/* the AI's Link scoring: "lethal" checks against the opposing act seat - point it at the weakest living opponent */
const bAPA=aiPickAction;aiPickAction=function(s){const t=T();if(t&&!G.over){const o=other(s);const l=teamSeats(o);if(l.length){const w=l.slice().sort((a,b)=>a.lp-b.lp)[0];const prev=t.act[o];setAct(o,w.i);
    try{return bAPA.apply(this,arguments);}finally{setAct(o,prev);}}}return bAPA.apply(this,arguments);};
/* first duelist of the whole duel can't attack (engine: G.turn>1) - unchanged. Each monster once per turn: unchanged. */
linkPatches();
/* teardown hooks for 1v1 */
const bSD=startDuel;startDuel=function(){if(!window.TAG_NEXT&&typeof window.tagBoardOff==="function")window.tagBoardOff();return bSD.apply(this,arguments);};
const bLD=leaveDuel;leaveDuel=function(){const r=bLD.apply(this,arguments);try{const p=document.getElementById("tagpick");if(p)p.remove();const m=document.getElementById("tagres");if(m)m.remove();}catch(e){}return r;};
function startTag(cfg){leaveDuel();window.TAG_LAST=cfg;window.TAG_NEXT=cfg;
  return startDuel(cfg.chars[0],cfg.chars[1],{arena:cfg.arena,first:"player",decks:cfg.decks?{player:cfg.decks[0],enemy:cfg.decks[1]}:null,auto:!!cfg.allAI,speed:cfg.speed,net:!!cfg.net/*v13: online Tag host*/});}
window.startTag=startTag;
window.TAGAPI={T,setAct,aliveSeat,teamSeats,nextTurnOf,nextOpp,fairPick,syncSeats,short,tagLabel,partnerOf};
})();
/* ================= v11: TAG DUEL - board UI, mode menu, seat select, result, phone ================= */
(function(){
const A=()=>window.TAGAPI;const T=()=>G&&G.sides&&G.tag||null;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const css=document.createElement("style");css.id="tagcss";css.textContent=`
#duel.tag{grid-template-columns:206px 1fr 262px 206px !important}
#duel.tag #left>:not(.tslot):not(.teamlab){display:none !important}
#duel.tag #left,#duel.tag #tagR{display:flex;flex-direction:column;gap:4px;justify-content:flex-start;padding-top:4px;min-width:0}
#tagR{grid-column:4;grid-row:1/-1;position:relative;z-index:2}
#duel.tag #left{grid-column:1}#duel.tag #field{grid-column:2}#duel.tag #right{grid-column:3}
.teamlab{font-size:10px;font-weight:900;letter-spacing:2.5px;padding:2px 8px;border-radius:4px;text-align:center;white-space:nowrap;overflow:hidden}
.teamlab.b{color:#ffb3b9;background:linear-gradient(90deg,#c8102e66,transparent);border-left:3px solid #ff3b4e}
.teamlab.a{color:#b3d8ff;background:linear-gradient(90deg,#1d63c866,transparent);border-left:3px solid #3ba0ff;margin-top:auto}
.tslot{position:relative;display:flex;flex-direction:column;gap:4px}
.tslot.haslive>.tstat{display:none}
.tslot>#duel-player,.tslot>#duel-enemy{display:flex;flex-direction:column;gap:4px}
#duel.tag .tslot .dport{height:186px !important;margin:0}
#duel.tag .tslot .duelist{padding:6px 9px}
#duel.tag .tslot .lpnum{font-size:24px}
#duel.tag .tslot .lp{margin-top:2px}
#duel.tag .tslot .dsub{display:none}
.tstat .dport{position:relative;overflow:hidden;border-radius:12px;border:2px solid var(--c);background:#0008}
.tstat .dport img{width:100%;height:100%;object-fit:cover;object-position:50% 12%;display:block}
.tstat .dport .plink{position:absolute;left:6px;right:6px;bottom:6px}
.tover{position:absolute;left:0;right:0;top:0;height:186px;pointer-events:none;z-index:7}
.stag{position:absolute;left:0;top:8px;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:15px;color:#fff;padding:0 12px 0 8px;background:var(--c);box-shadow:0 0 12px var(--c);clip-path:polygon(0 0,100% 0,88% 100%,0 100%);white-space:nowrap}
.nowturn{position:absolute;right:6px;top:8px;font-size:10.5px;font-weight:900;padding:2px 8px;border-radius:8px;color:#2a1700;background:linear-gradient(180deg,#ffd36b,#c98a1c);box-shadow:0 0 12px #ffc35a}
.role{font-size:9px;font-weight:900;letter-spacing:1px;padding:1px 5px;border-radius:6px;background:#ffffff1c;border:1px solid #ffffff33;vertical-align:middle;color:#cfe8ff}
.koout{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-14deg);font-family:Impact,"Arial Black",sans-serif;font-size:46px;letter-spacing:4px;color:#ff3b4e;border:5px solid #ff3b4e;border-radius:10px;padding:0 14px;background:#0009;text-shadow:0 0 12px #000;box-shadow:0 0 22px #ff3b4e88}
.tslot.ko .dport,.tslot.ko .duelist{filter:grayscale(1) brightness(.55)}
.tslot.tgtp .duelist,.tslot.tgtp .dport{box-shadow:0 0 0 3px #ff4b4b,0 0 18px #ff4b4b;cursor:pointer}
.tslot .tchip{display:none}
.mhand{display:flex;gap:2px;flex-wrap:nowrap;overflow:hidden;margin-top:3px}.mhand .card{font-size:2.9px;flex:none}
.mhand .lab{font-size:9px;opacity:.75;margin-right:3px;align-self:center;white-space:nowrap}
#tagtop{display:flex;flex-direction:column;align-items:center;gap:3px;width:100%}
.tstrip{display:flex;align-items:center;gap:8px;padding:3px 10px;border-radius:12px;background:rgba(10,8,22,.8);border:1px solid rgba(255,211,107,.3);width:100%;box-sizing:border-box}
.tstrip .mode{font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:15px;letter-spacing:1.5px;color:#fff;text-shadow:2px 2px 0 #c8102e;white-space:nowrap}
.tstrip .order{display:flex;align-items:center;gap:4px;flex:1;justify-content:center;min-width:0}
.tstrip .order b{opacity:.5;font-size:11px}
.oc{display:flex;align-items:center;gap:4px;font-size:10.5px;font-weight:bold;padding:1px 7px 1px 1px;border-radius:13px;background:#0008;border:1px solid #ffffff30;opacity:.8;white-space:nowrap}
.oc img{width:20px;height:20px;border-radius:50%;object-fit:cover;object-position:50% 15%;border:1px solid var(--c)}
.oc.cur{opacity:1;color:#2a1700;background:linear-gradient(180deg,#ffd36b,#c98a1c);border-color:#ffe9a8;box-shadow:0 0 10px #ffc35a}
.oc.ko{opacity:.35;text-decoration:line-through;filter:grayscale(1)}
.tstrip .rnd{font-size:11px;opacity:.85;font-weight:bold;white-space:nowrap}
#tagtop .tstrip{gap:5px;padding:2px 6px}#tagtop .oc{max-width:118px;overflow:hidden;text-overflow:ellipsis;padding-right:5px}#tagtop .tstrip .order{gap:2px;overflow:hidden}
#duel.tag #left>.tslot{display:flex!important}
.ehands{display:flex;gap:24px;height:22px;align-items:center}
.eh{display:flex;align-items:center;gap:2px;font-size:10.5px;font-weight:bold;background:#0008;border-radius:8px;padding:1px 8px;white-space:nowrap}.eh .card{font-size:2.3px;margin-left:2px}
.eh.ko{opacity:.4;text-decoration:line-through}
.fieldlab{font-size:9.5px;font-weight:900;letter-spacing:2px;padding:0 12px;border-radius:8px;white-space:nowrap;align-self:center}
.fieldlab.b{color:#ffb3b9;background:#3a0a14cc;border:1px solid #ff3b4e66}.fieldlab.a{color:#b3d8ff;background:#0a1a3acc;border:1px solid #3ba0ff66}
#duel.tag #ehand{display:none}
#duel.tag .zone{width:88px;height:88px}
#duel.tag .zone .card{font-size:8.6px}
#duel.tag .pile{width:76px;height:88px}
#duel.tag .pile .card{font-size:6.4px}
#duel.tag .pile .lbl{font-size:9px;white-space:nowrap}
#duel.tag #phasebar{width:100%;box-sizing:border-box}
#duel.tag .phand{height:132px}
#duel.tag .phand .card{font-size:11px}
#duel.tag #field{gap:4px}
.own{position:absolute;left:-3px;top:-6px;z-index:6;font-size:8.5px;font-weight:900;line-height:1;padding:2px 4px;border-radius:5px;background:var(--oc);color:#fff;border:1px solid #fff8;box-shadow:0 0 6px #000;pointer-events:none;letter-spacing:.5px}
#duel.tag .zone{position:relative}
.zone.tgth .card{box-shadow:0 0 0 .3em #ff4b4b,0 0 1.6em #ff4b4b}
#tagtp{display:none;background:linear-gradient(160deg,#2b2050f0,#160f2cf0);border:1px solid #ff4b4b99;border-radius:14px;padding:8px 10px;box-shadow:0 0 24px #ff4b4b44;max-height:470px;overflow:auto}
#tagtp.on{display:block}
#duel.tag #right.tpon #preview{display:none}
#tagtp h4{margin:0 0 2px;font-size:13.5px;letter-spacing:2px;color:#ffd36b}
#tagtp .sub{font-size:11px;opacity:.9;margin-bottom:4px}
.ownt{font-size:9.5px;font-weight:bold;padding:0 6px;border-radius:6px;background:var(--oc);color:#fff}
.opt{display:flex;gap:8px;align-items:center;padding:5px;border-radius:10px;border:1px solid #ffffff22;background:#0006;margin-top:4px;font-size:11px;line-height:1.3;cursor:pointer;min-height:var(--tap,40px);box-sizing:border-box}
.opt:hover,.opt.sel{border-color:#ff4b4b;box-shadow:0 0 0 2px #ff4b4b,0 0 14px #ff4b4b88;background:#ff4b4b1c}
.opt .tpc{flex:none;width:36px;height:46px;overflow:hidden}.opt .tpc .card{font-size:3.3px}
.opt .fd2{flex:none;width:36px;height:40px;display:flex;align-items:center;justify-content:center;font-size:18px;background:#222;border-radius:6px}
.opt.off{opacity:.55;cursor:not-allowed}.opt.off:hover{box-shadow:none;border-color:#ffffff22;background:#0006}
.opt .ow{font-weight:bold}
#tagtp .note{font-size:10px;opacity:.75;margin-top:5px;line-height:1.35}
#tagtp .tpx{float:right;cursor:pointer;opacity:.8;font-size:12px;border:1px solid #fff4;border-radius:6px;padding:0 6px}
.tagpick{position:absolute;inset:0;z-index:9700;background:rgba(5,3,15,.62);display:flex;align-items:center;justify-content:center}
.tpk{min-width:420px;padding:16px 18px;border-radius:16px;border:2px solid #ff4b4b;background:linear-gradient(160deg,#2a1240,#140a26);color:#fff;text-align:center;box-shadow:0 0 40px #ff3b3b66}
.tpk h4{margin:0 0 4px;font-size:18px;letter-spacing:2px;color:#ffd36b}.tpk .sub{font-size:12px;opacity:.85;margin-bottom:10px}
.tpkl{display:flex;gap:14px;justify-content:center}
.tpko{display:flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;min-height:64px;border-radius:12px;border:2px solid var(--c);background:#0008;color:#fff;cursor:pointer;font:inherit;text-align:left}
.tpko:hover{box-shadow:0 0 18px var(--c);background:#ffffff14}
.tpko img{width:56px;height:56px;border-radius:50%;object-fit:cover;object-position:50% 15%;border:2px solid var(--c)}
.tpko b{display:block;font-size:14px}.tpko i{display:block;font-size:11.5px;opacity:.85;font-style:normal}
/* result */
.tagres{position:absolute;inset:0;z-index:9600;background:radial-gradient(ellipse at center,rgba(20,10,40,.7),rgba(0,0,0,.88));display:flex;align-items:center;justify-content:center;animation:lkin .3s}
.tagres .box{width:880px;padding:22px 26px;border-radius:20px;background:linear-gradient(160deg,#2a1a52f2,#120a26f2);border:2px solid var(--c,#ffd36b);box-shadow:0 0 50px var(--c,#ffd36b);text-align:center;color:#fff}
.tagres h1{margin:0;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:64px;letter-spacing:4px;color:#ffe08a;text-shadow:0 0 22px var(--c),3px 3px 0 #7a1020}
.tagres.lose h1{color:#ff8a8a}.tagres.draw h1{color:#cfe8ff}
.tagres .who{font-size:20px;font-weight:bold;margin:4px 0 12px}
.tagres .teams{display:flex;justify-content:center;gap:40px;align-items:center}
.tagres .tm{display:flex;gap:10px}.tagres .vs{font-family:Impact;font-style:italic;font-size:34px;color:#ff4b5c}
.tagres .pc{position:relative;width:120px}.tagres .pc img{width:120px;height:140px;object-fit:cover;object-position:50% 12%;border-radius:12px;border:3px solid var(--c)}
.tagres .pc.win img{box-shadow:0 0 22px #ffd36b}.tagres .pc.out img{filter:grayscale(1) brightness(.6)}
.tagres .pc b{display:block;font-size:13px;margin-top:3px}.tagres .pc i{display:block;font-size:11px;opacity:.8;font-style:normal}
.tagres .pc .ko2{position:absolute;left:50%;top:60px;transform:translate(-50%,-50%) rotate(-14deg);font-family:Impact;font-size:26px;color:#ff3b4e;border:3px solid #ff3b4e;border-radius:6px;padding:0 6px;background:#0009}
.tagres .meta{opacity:.75;margin-top:10px;font-size:13px}
.tagres .btnrow{display:flex;gap:12px;justify-content:center;margin-top:16px}.tagres .btn{padding:10px 18px;font-size:14px;min-height:var(--tap,40px)}
/* mode menu */
#tagmode,#tagsel{background:radial-gradient(ellipse at 50% 120%,#5a1f6e 0%,#1a0f33 45%,#06040c 100%);overflow:hidden;color:#fff}
.tmh{position:absolute;left:0;right:0;top:20px;text-align:center}
.tmh h1{margin:0;font-family:Georgia,serif;font-size:58px;letter-spacing:4px;color:#ffe08a;text-shadow:0 0 24px #ffb84d,0 3px 0 #7a4a10}
.tmh h2{margin:0;font-size:18px;letter-spacing:12px;color:#cfe8ff}
.tmh .crumb{font-size:11px;letter-spacing:3px;opacity:.65;margin-top:10px}
.mcards{position:absolute;left:0;right:0;top:150px;display:flex;justify-content:center;gap:26px}
.mcard{position:relative;width:340px;height:330px;border-radius:16px;background:linear-gradient(170deg,#2c1d5c,#160d30);border:2px solid #6c5aa8;box-shadow:0 10px 30px #0008;cursor:pointer;overflow:hidden;transition:transform .15s}
.mcard:hover{transform:translateY(-4px)}
.mcard.sel{border-color:#ffd36b;box-shadow:0 0 0 3px #ffd36b88,0 0 30px #ffb84d88}
.mcard.dis{cursor:not-allowed;filter:grayscale(.55);opacity:.8}.mcard.dis:hover{transform:none}
.mcard .art{position:relative;height:150px;margin:10px;border-radius:10px;overflow:hidden;display:flex;background:#000}
.mcard .art img{flex:1;min-width:0;object-fit:cover;object-position:50% 12%}
.mcard .art .vs{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-family:Impact;font-style:italic;font-size:40px;color:#fff;text-shadow:3px 3px 0 #c8102e,0 0 12px #000}
.mcard .art.q{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}.mcard .art.q img{width:100%;height:100%}
.mcard .art .four{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:46px;height:46px;border-radius:50%;background:#000c;border:2px solid #fff;font:900 26px Impact;display:flex;align-items:center;justify-content:center}
.mcard h3{margin:4px 14px 0;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:25px;letter-spacing:1px;text-shadow:2px 2px 0 #c8102e}
.mcard .tl{margin:0 14px;font-size:12px;font-weight:bold;color:#ffd36b}
.mcard ul{margin:6px 14px 0 30px;padding:0;font-size:11.5px;line-height:1.55;opacity:.92}
.mcard .badge{position:absolute;right:10px;top:6px;z-index:3;font:italic 900 13px Arial;color:#fff;background:#e0213d;padding:1px 8px;border-radius:4px;transform:rotate(-4deg)}
.mcard .badge.soon{background:#555;font-size:12px}
.mcard .seltag{position:absolute;left:10px;top:4px;z-index:3;font-size:10px;font-weight:900;color:#2a1700;background:#ffd36b;border-radius:8px;padding:1px 7px;display:none}.mcard.sel .seltag{display:block}
.howq{position:absolute;left:0;right:0;top:516px;text-align:center;font-size:12px;letter-spacing:5px;color:#cfe8ff;font-weight:bold}
.hows{position:absolute;left:0;right:0;top:544px;display:flex;justify-content:center;gap:18px}
.how{width:320px;min-height:64px;display:flex;align-items:center;gap:12px;padding:8px 14px;border-radius:12px;border:2px solid #6c5aa8;background:#22174acc;cursor:pointer;text-align:left;color:#fff;font:inherit}
.how.sel{border-color:#ffd36b;box-shadow:0 0 18px #ffb84d66}.how.dis{opacity:.5;cursor:not-allowed}
.how .ic{font-size:28px}.how b{display:block;font-size:16px;letter-spacing:2px}.how i{display:block;font-size:11px;opacity:.8;font-style:normal}
.tmbtns{position:absolute;left:0;right:0;top:640px;display:flex;justify-content:center;gap:16px}
.tmbtns .btn{min-width:150px;min-height:48px;font-size:16px;letter-spacing:2px}
/* v14 Choose-your-duel screen */
.dgroups{position:absolute;left:0;right:0;top:146px;display:flex;justify-content:center;gap:40px}
.dgroup{display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px 14px 14px;border-radius:18px;border:1px solid #6c5aa866;background:#0e0a2277}
.dgh{font:bold 14px Arial,sans-serif;letter-spacing:5px;color:#ffd36b;text-shadow:0 0 10px #ffb84d88}.dgh .ic{margin-right:8px;font-size:18px}
.dgroup.on .dgh{color:#9fe0ff;text-shadow:0 0 10px #3ba0ff88}.dgroup.on{border-color:#3ba0ff55}
.dgc{display:flex;gap:16px}
.mcard.dcard{display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;width:272px;height:318px;padding:0;text-align:left;color:#fff;font:inherit}
.mcard.dcard:focus-visible{outline:none;border-color:#ffd36b;box-shadow:0 0 0 3px #ffd36b88,0 0 30px #ffb84d88}
.mcard.dcard:not(.dis):hover{border-color:#ffd36b;box-shadow:0 0 0 2px #ffd36b66,0 0 26px #ffb84d66}
.dgroup.on .mcard.dcard:not(.dis):hover{border-color:#6cc4ff;box-shadow:0 0 0 2px #6cc4ff66,0 0 26px #3ba0ff66}
.dcard .art{height:140px}.dcard h3{font-size:22px}
.d4wrap{position:absolute;left:0;right:0;top:536px;display:flex;justify-content:center}
.d4way{width:600px;height:68px;display:flex;align-items:center;gap:14px;padding:0 14px;border-radius:14px;border:2px dashed #6c5aa8;background:#160d30cc;color:#fff;font:inherit;cursor:not-allowed;filter:grayscale(.6);opacity:.75}
.d4way .art{width:88px;height:50px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:25px 25px;border-radius:8px;overflow:hidden;flex:none}
.d4way .art img{width:100%;height:25px;object-fit:cover;object-position:50% 12%}
.d4way b{font:italic 900 22px Impact,"Arial Black",sans-serif;letter-spacing:1px;text-shadow:2px 2px 0 #c8102e}.d4way i{font-size:12px;opacity:.85;font-style:normal;flex:1;text-align:left}
.d4way .badge{font:italic 900 12px Arial,sans-serif;color:#fff;background:#555;padding:2px 8px;border-radius:4px;transform:rotate(-4deg)}
#tagmode .tmbtns{top:628px}
.dhint{position:absolute;left:0;right:0;top:690px;text-align:center;font-size:11px;letter-spacing:2px;opacity:.5}
/* seat select */
.tsh{position:absolute;left:0;right:0;top:12px;text-align:center}
.tsh h1{margin:0;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:36px;letter-spacing:2px;text-shadow:3px 3px 0 #c8102e}
.tsh .sub{font-size:11.5px;opacity:.75}
.tcol{position:absolute;top:70px;width:300px;display:flex;flex-direction:column;gap:12px}
.tcol.a{left:14px}.tcol.b{right:14px}
.tcol .tl{font:italic 900 16px Arial;letter-spacing:4px;text-align:center;padding:3px;border-radius:4px}
.tcol.a .tl{color:#b3d8ff;background:linear-gradient(90deg,transparent,#1d63c888,transparent)}.tcol.b .tl{color:#ffb3b9;background:linear-gradient(90deg,transparent,#c8102e88,transparent)}
.scard{position:relative;height:300px;border-radius:14px;border:2px solid #6c5aa8;background:linear-gradient(170deg,#2c1d5ccc,#160d30cc);overflow:hidden;cursor:pointer}
.scard.cur{border-color:#ffd36b;box-shadow:0 0 0 3px #ffd36b66,0 0 24px #ffb84d66}
.scard img.big{position:absolute;left:0;top:0;width:150px;height:100%;object-fit:cover;object-position:50% 10%}
.scard.b img.big{left:auto;right:0}
.scard .key{position:absolute;top:8px;left:0;z-index:3;font:italic 900 20px Impact,Arial;color:#fff;padding:0 14px 0 8px;background:var(--c);clip-path:polygon(0 0,100% 0,88% 100%,0 100%)}
.scard.b .key{left:auto;right:0;padding:0 8px 0 14px;clip-path:polygon(12% 0,100% 0,100% 100%,0 100%)}
.scard .inf{position:absolute;left:156px;right:8px;top:10px;bottom:8px;display:flex;flex-direction:column;gap:5px}
.scard.b .inf{left:8px;right:156px}
.scard .nm{font-size:22px;font-weight:bold;color:var(--c);text-shadow:0 0 8px #000}
.scard .who{font-size:11px;opacity:.8}
.tog{display:flex;border-radius:8px;overflow:hidden;border:1px solid #fff4;width:max-content}
.tog span{padding:3px 8px;font-size:11px;font-weight:bold;background:#0006;min-height:28px;display:flex;align-items:center}
.tog span.on{background:#e0213d}.tog span.on.ai{background:#e07a21}
.tog.lock{opacity:.6}
.swapi{font-size:12px;cursor:pointer;border:1px solid #fff5;border-radius:8px;padding:3px 8px;background:#0006;width:max-content;min-height:28px;display:flex;align-items:center}
.scard .lnk{font-size:11px;line-height:1.35;background:#0007;border-left:3px solid #ffd36b;border-radius:6px;padding:5px 7px}
.scard .lnk b{color:#ffe08a}
.scard .rdy{font-size:11px;font-weight:bold;color:#7dff9a}
.tmid{position:absolute;left:330px;right:330px;top:70px;display:flex;flex-direction:column;align-items:center;gap:8px}
.troom{width:100%;box-sizing:border-box;padding:8px 12px;border-radius:12px;background:#0009;border:1px solid #ffd36b55;text-align:center;font-size:12px}
.troom .code{font:900 28px monospace;letter-spacing:8px;color:#ffe08a;background:#000a;border-radius:8px;padding:0 10px;margin:0 8px}
.torder{display:flex;align-items:center;gap:6px;font-size:11px}
.torder .lab{letter-spacing:2px;opacity:.6}
.tgrid{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px;width:100%}
.tile{position:relative;height:84px;border-radius:8px;overflow:hidden;border:2px solid #ffffff22;cursor:pointer;background:#000;min-width:0}
.tile img{width:100%;height:100%;object-fit:cover;object-position:50% 12%}
.tile .tn{position:absolute;left:0;right:0;bottom:0;font-size:10px;text-align:center;background:linear-gradient(transparent,#000d);padding:6px 0 2px}
.tile:hover{border-color:#fff}
.tile .tt{position:absolute;top:2px;font:italic 900 11px Arial;color:#fff;padding:0 5px;border-radius:3px;background:var(--c)}
.tile.has{border-color:var(--c);box-shadow:0 0 10px var(--c)}
.tsbtns{position:absolute;left:0;right:0;bottom:22px;display:flex;justify-content:center;align-items:center;gap:12px}
.tsbtns .btn{min-height:44px;min-width:110px}
.tsbtns .vsx{font:italic 900 40px Impact;color:#ff4b5c;text-shadow:2px 2px 0 #fff3}
.tsfoot{position:absolute;left:0;right:0;bottom:4px;text-align:center;font-size:10.5px;opacity:.6}
/* phone (landscape) */
#duel.tag.tphone{grid-template-columns:150px 1fr 150px !important}
#duel.tag.tphone #tagR{grid-column:3}
#duel.tag.tphone #right{position:absolute;grid-column:1/-1 !important;grid-row:1/-1 !important;align-self:end;left:160px;right:160px;bottom:0;height:var(--tap,90px);z-index:30;background:rgba(8,6,20,.94);border-radius:14px 14px 0 0;border:1px solid #ffd36b55;padding:0 10px;display:flex;flex-direction:column;transition:height .2s;overflow:hidden}
#duel.tag.tphone #right.open{height:62%}
#duel.tag.tphone #right:not(.open){left:auto;right:0;width:150px;bottom:auto;top:42%;border-radius:14px 0 0 14px;padding:0}
#duel.tag.tphone #right:not(.open)>*:not(.tdrag):not(#tagtp){display:none !important}
#duel.tag.tphone #right .rbtns .btn{min-height:var(--tap,90px);min-width:var(--tap,90px);font-size:18px}
#duel.tag.tphone #right #log{font-size:17px}
#duel.tag.tphone #right:not(.open) .tdrag{font-size:18px;letter-spacing:1px}
#duel.tag.tphone #right #preview{display:none}
#duel.tag.tphone #right .tdrag{display:flex;align-items:center;justify-content:center;gap:10px;min-height:var(--tap,90px);font-weight:bold;letter-spacing:2px;font-size:22px;cursor:pointer;flex:none}
#duel.tag.tphone #right .rbtns{order:-1}
.tdrag{display:none}
#duel.tag.tphone .tslot .dport,#duel.tag.tphone .tslot .tover .stag,#duel.tag.tphone .tslot .mhand{display:none !important}
#duel.tag.tphone .tover{height:auto}
#duel.tag.tphone .tslot .tchip{display:flex;align-items:center;gap:6px;font-size:16px;font-weight:bold}
#duel.tag.tphone .tslot .tchip img{width:64px;height:64px;border-radius:50%;object-fit:cover;object-position:50% 12%;border:3px solid var(--c)}
#duel.tag.tphone .tslot .duelist .top,#duel.tag.tphone .tslot .duelist .lp,#duel.tag.tphone .tslot .duelist .counts{display:none}
#duel.tag.tphone .tslot .lpnum{font-size:26px}
#duel.tag.tphone .koout{font-size:28px;top:30px}
#duel.tag.tphone .zone{width:112px;height:112px}#duel.tag.tphone .zone .card{font-size:11px}
#duel.tag.tphone .pile{width:90px;height:112px}
#duel.tag.tphone .fieldlab,#duel.tag.tphone #hint{display:none}
#duel.tag.tphone #phasebar .btn{min-height:var(--tap,90px);font-size:20px}
#duel.tag.tphone .phand{height:150px;margin-bottom:var(--tap,90px)}
#duel.tag.tphone .phand .card{font-size:13px}
#duel.tag.tphone #tagtp{position:absolute;grid-column:1/-1;grid-row:1/-1;left:150px;right:150px;bottom:0;z-index:40;max-height:70%;border-radius:18px 18px 0 0;font-size:16px}
#duel.tag.tphone #tagtp .opt{font-size:16px;min-height:var(--tap,90px)}
#duel.tag.tphone .tstrip .mode{display:none}
`;document.head.appendChild(css);

/* ---------- board build / teardown ---------- */
function el(tag,cls,id,html){const e=document.createElement(tag);if(cls)e.className=cls;if(id)e.id=id;if(html!=null)e.innerHTML=html;return e;}
function tagBoardOn(){const d=$("#duel");if(!d)return;tagBoardOff();d.classList.add("tag");
  const left=$("#left");const R=el("aside","","tagR");d.insertBefore(R,$("#right").nextSibling);
  left.prepend(el("div","teamlab b","tlab-b1","TEAM B · OPPONENTS"),el("div","tslot","tslot-1"),el("div","teamlab a","tlab-a1","TEAM A · YOUR TEAM"),el("div","tslot","tslot-0"));
  R.append(el("div","teamlab b","tlab-b2","TEAM B"),el("div","tslot","tslot-3"),el("div","teamlab a","tlab-a2","TEAM A"),el("div","tslot","tslot-2"));
  for(let i=0;i<4;i++){const s=$("#tslot-"+i);s.dataset.tseat=i;s.append(el("div","tstat"),el("div","tover"));}
  const f=$("#field");const top=el("div","","tagtop",`<div class="tstrip"></div><div class="ehands"></div>`);f.insertBefore(top,f.firstChild);
  const rows=[...f.querySelectorAll(":scope>.row")];
  f.insertBefore(el("div","fieldlab b","flab-b",""),rows[0]);f.insertBefore(el("div","fieldlab a","flab-a",""),$("#phand"));
  const r=$("#right");r.insertBefore(el("div","","tagtp"),r.firstChild);r.insertBefore(el("div","tdrag","tdrag","📜 LOG ▲"),r.firstChild);
  phoneCheck();}
function tagBoardOff(){const d=$("#duel");if(!d||!d.classList.contains("tag"))return;
  const left=$("#left");const pe=$("#duel-enemy"),pp=$("#duel-player");const logo=[...left.children].find(x=>!x.id&&!x.classList.contains("tslot")&&!x.classList.contains("teamlab"));
  left.querySelectorAll(".tslot,.teamlab").forEach(x=>{if(x.contains(pe)||x.contains(pp)){}});
  left.prepend(pe);if(logo)left.insertBefore(logo,pe.nextSibling);left.appendChild(pp);
  ["#tagR","#tagtop","#flab-a","#flab-b","#tagtp","#tdrag"].forEach(s=>{const x=$(s);if(x)x.remove();});
  left.querySelectorAll(".tslot,.teamlab").forEach(x=>x.remove());
  d.classList.remove("tag","tphone");$("#right").classList.remove("tpon","open");}
window.tagBoardOn=tagBoardOn;window.tagBoardOff=tagBoardOff;

/* ---------- paint ---------- */
const col=st=>(CHARS[st.char]||{}).color||"#7cf";
const badge=st=>`<span class="own" style="--oc:${col(st)}" title="${esc(st.name)}'s card">${ownTag(st)}</span>`;
function ownTag(st){const t=T();const a=A().short(st.name);const dup=t.seats.some(x=>x!==st&&A().short(x.name)===a);return dup?st.key:a;}
function linkChip(st){const L=window.LINKS&&LINKS[st.char];if(!L)return "";const gate=L.lp||4000;const k=st.lk||{};const t=T();
  const s=k.used?"used":st.lp>gate?"locked":"wait";
  const txt=st.out?"KNOCKED OUT":s==="used"?"LINK USED":s==="locked"?`LINK · UNLOCKS AT ${gate} LP`:(st.human&&!t.allAI?"READY ON YOUR TURN":"READY · AI USES IT ON ITS TURN");
  return `<div class="plink ${s==="wait"?"ready":s}" style="animation:none"><span class="pn">✦ ${esc(L.name)}</span><span class="ps">${txt}</span></div>`;}
/* v13: team letter from the seat keys (online guests on Team B see their own team at the bottom) */
function TL(team){const t=T();const s=t&&t.seats.find(x=>x.team===team);return s?s.key[0]:(team==="player"?"A":"B");}
function roleOf(st){const t=T();if(t.allAI)return "AI";if(st.i===t.view)return "YOU";return st.human?(st.netName?"HUMAN · "+esc(st.netName):"HUMAN"):"AI";}
function keyLabel(st){const t=T();if(t.allAI)return st.key;const v=t.seats[t.view];if(st.i===t.view)return st.key+" · YOU";if(v&&st.team===v.team)return st.key+" · PARTNER";return st.key;}
function staticHTML(st){const t=T();const C=CHARS[st.char]||{};const v=t.seats[t.view];const partner=v&&st.team===v.team&&st.i!==v.i&&!t.allAI&&!(t.cfg&&t.cfg.net);/*v13: online hides the partner hand*/
  const hand=partner&&st.hand.length?`<div class="mhand"><span class="lab">Hand:</span>${st.hand.map(c=>`<span data-tpv="${c.uid}">${cardHTML(c,{noUid:true})}</span>`).join("")}</div>`:"";
  return `<div class="dport" style="--c:${col(st)}"><img src="${PORTRAITS[C.img]||""}" alt="">${linkChip(st)}</div>
   <div class="dinfo"><div class="duelist ${st.team}" data-tseat="${st.i}" style="--c:${col(st)}"><div class="top"><div><div class="dname">${esc(st.name)} <span class="role">${roleOf(st)}</span></div><div class="dsub">${C.race?C.race+" Duelist":"Multicolor Duelist"}</div></div></div>
   <div class="lp">LIFE POINTS</div><div class="lpnum">${st.lp}</div><div class="lpbar"><div style="width:${Math.min(100,st.lp/START_LP*100)}%"></div></div>
   <div class="counts"><span>✋ ${st.hand.length}</span><span>🂠 ${st.deck.length}</span></div>${hand}</div></div>`;}
function overHTML(st,isTurn){return `<span class="stag" style="--c:${col(st)}">${keyLabel(st)}</span>${isTurn&&!st.out?`<span class="nowturn">▶ TURN</span>`:""}${st.out?`<span class="koout">OUT</span>`:""}
  <div class="tchip" style="--c:${col(st)}"><img src="${PORTRAITS[(CHARS[st.char]||{}).img]||""}" alt=""><span>${st.key}</span></div>`;}
function tagPaint(){const t=T();const d=$("#duel");if(!t||!d)return;if(!d.classList.contains("tag"))tagBoardOn();
  phoneCheck();
  const live={player:$("#duel-player"),enemy:$("#duel-enemy")};
  for(const st of t.seats){const slot=$("#tslot-"+st.i);if(!slot)continue;const isAct=t.act[st.team]===st.i;
    if(isAct&&live[st.team].parentNode!==slot)slot.insertBefore(live[st.team],slot.querySelector(".tover"));
    slot.classList.toggle("haslive",isAct);slot.classList.toggle("ko",st.out);
    if(!isAct)slot.querySelector(".tstat").innerHTML=staticHTML(st);else slot.querySelector(".tstat").innerHTML="";
    slot.querySelector(".tover").innerHTML=overHTML(st,t.turnSeat===st.i&&!G.over);
    slot.style.setProperty("--c",col(st));
    if(isAct){const dn=live[st.team].querySelector(".dname");if(dn&&!dn.querySelector(".role"))dn.insertAdjacentHTML("beforeend",` <span class="role">${roleOf(st)}</span>`);
      const v=t.seats[t.view];const partner=v&&st.team===v.team&&st.i!==v.i&&!t.allAI&&!(t.cfg&&t.cfg.net);const dl=live[st.team].querySelector(".duelist");
      if(dl){let mh=dl.querySelector(".mhand");if(partner&&st.hand.length){if(!mh){mh=el("div","mhand");dl.appendChild(mh);}mh.innerHTML=`<span class="lab">Hand:</span>`+st.hand.map(c=>`<span data-tpv="${c.uid}">${cardHTML(c,{noUid:true})}</span>`).join("");}else if(mh)mh.remove();}}}
  /* strip */
  const order=t.order.map(i=>t.seats[i]);const tot=G.turn;
  $("#tagtop .tstrip").innerHTML=`<span class="mode">TAG 2v2</span><div class="order">${order.map((st,k)=>`${k?"<b>›</b>":""}<span class="oc ${st.out?"ko":t.turnSeat===st.i&&!G.over?"cur":""}" style="--c:${col(st)}"><img src="${PORTRAITS[(CHARS[st.char]||{}).img]||""}" alt="">${st.key} ${esc(String(st.name).split(" ")[0])}${st.i===t.view&&!t.allAI?" (you)":""}</span>`).join("")}</div><span class="rnd" title="Round ${t.round} · Turn ${tot}">R${t.round} · T${tot}</span>`;
  const v=t.seats[t.view];const oppTeam=t.allAI?"enemy":(v?other(v.team):"enemy");
  $("#tagtop .ehands").innerHTML=A().teamSeats(oppTeam,true).map(st=>`<span class="eh ${st.out?"ko":""}" title="${esc(st.name)}'s hand (hidden)">${esc(st.name)} ✋${st.hand.length} ${st.hand.slice(0,8).map(()=>cardHTML({},{hidden:true,noUid:true})).join("")}</span>`).join("");
  const names=team=>A().teamSeats(team,true).map(x=>x.name).join(" + ");
  if(t.cfg&&t.cfg.net){const L=i=>(t.seats[i]||{key:"?"}).key[0];const sx=(id,tx)=>{const e=$(id);if(e)e.textContent=tx;};sx("#tlab-b1",`TEAM ${L(1)} · OPPONENTS`);sx("#tlab-a1",`TEAM ${L(0)} · YOUR TEAM`);sx("#tlab-b2",`TEAM ${L(3)}`);sx("#tlab-a2",`TEAM ${L(2)}`);}
  $("#flab-b").textContent=`TEAM ${TL("enemy")} SHARED FIELD · ${names("enemy")}`;$("#flab-a").textContent=`TEAM ${TL("player")} SHARED FIELD · ${names("player")}`;
  /* piles */
  for(const team of ["player","enemy"]){const p=team==="player"?"p":"e";const ds=A().teamSeats(team,true);
    const dl=$(`#${p}-deck .lbl`);if(dl)dl.textContent="Deck "+ds.map(x=>A().short(x.name)[0]+(x.out?"✖":x.deck.length)).join(" · ");
    const gl=$(`#${p}-gy .lbl`);if(gl)gl.textContent="Team GY "+G.sides[team].gy.length;}
  /* owner badges */
  for(const id of ["#p-m","#p-st","#e-m","#e-st"])$(id).querySelectorAll(".zone").forEach(z=>{const c=z.querySelector("[data-uid]");if(!c)return;const f=find(+c.dataset.uid);if(!f||!f.card||f.card.seat==null)return;const st=t.seats[f.card.seat];if(st)z.insertAdjacentHTML("beforeend",badge(st));});
  /* hand: the viewer's own hand, even on a partner's / AI turn */
  if(!t.allAI&&v&&t.act[v.team]!==v.i&&v.team==="player"){const ph=$("#phand");ph.innerHTML=v.hand.map(c=>cardHTML(c,{})).join("");ph.classList.toggle("many",v.hand.length>7);}
  if(!t.allAI&&v&&!G.over){const cur=t.seats[t.turnSeat];const h=$("#hint");
    if(cur&&cur.team===v.team&&cur.i!==v.i)h.textContent=`Partner ${cur.name} is playing${t.cfg&&t.cfg.net?"":" (you can see each other's hands)"}. Your partner's monsters are yours to use on your turn.`;
    else if(cur&&cur.team!==v.team&&h&&/Auto-duel/.test(h.textContent))h.textContent=`${cur.name}'s turn.`;}
  targetPanel();
  const R=$("#right");if(R)R.classList.toggle("tpon",!!($("#tagtp")&&$("#tagtp").classList.contains("on")));}
window.tagPaint=tagPaint;

/* ---------- target panel ---------- */
function targetPanel(){const tp=$("#tagtp");const t=T();if(!tp||!t)return;
  const on=G.ui&&G.ui.mode==="attack"&&humanTurn();if(!on){tp.classList.remove("on");tp.innerHTML="";document.querySelectorAll(".tslot.tgtp").forEach(x=>x.classList.remove("tgtp"));return;}
  const af=find(G.ui.attUid);if(!af){tp.classList.remove("on");return;}const att=af.card;const me=t.seats[t.turnSeat];const ow=t.seats[att.seat]||me;
  const o=other(me.team);const A2=atkOf(att);
  let h=`<span class="tpx" data-tpcancel="1">✕</span><h4>⚔ CHOOSE ATTACK TARGET</h4><div class="sub">${esc(att.name)} · ATK ${A2} <span class="ownt" style="--oc:${col(ow)}">owner: ${esc(ow.name)}</span></div>`;
  for(const m of mons(o)){const st=t.seats[m.seat]||A().teamSeats(o)[0];if(!st)continue;const sn=`<span class="ow" style="color:${col(st)}">${esc(st.name)}'s</span>`;
    if(!m.faceUp){h+=`<div class="opt" data-tpatk="${m.uid}"><div class="tpc">${cardHTML({},{hidden:true,noUid:true})}</div><div><b>Set monster (DEF)</b> ${sn}<br>Face-down · unknown DEF</div></div>`;continue;}
    const r=previewBattle(att,m);let out=[];
    out.push(`${m.pos==="atk"?"ATK "+atkOf(m):"DEF "+m.def}`);
    if(r.killDef)out.push("destroys it");if(r.killAtt)out.push(`${esc(att.name.split(" ")[0])} is destroyed`);
    if(r.dmgDef)out.push(`<b>${r.dmgDef} dmg to ${esc(st.name)}</b> (${st.lp}→${Math.max(0,st.lp-r.dmgDef)})`);
    if(r.dmgAtt)out.push(`${r.dmgAtt} dmg to ${esc(me.name)}`);
    if(!r.killDef&&!r.killAtt&&!r.dmgDef&&!r.dmgAtt)out.push("no effect");
    h+=`<div class="opt" data-tpatk="${m.uid}"><div class="tpc">${cardHTML(m,{noUid:true})}</div><div><b>${esc(m.name)}</b> ${sn}<br>${out.join(" · ")}</div></div>`;}
  const direct=canGoDirect(me.team,att);const opps=A().teamSeats(o);
  if(direct)for(const st of opps)h+=`<div class="opt" data-tpdir="${st.i}"><div class="fd2">⚡</div><div><b>Direct attack → ${esc(st.name)}</b><br>${A2} damage (${st.lp}→${Math.max(0,st.lp-A2)})</div></div>`;
  else h+=`<div class="opt off"><div class="fd2">⚡</div><div><b>Direct attack</b> · locked<br>Opens when Team ${TL(o)}'s field has no monsters. You then pick ${opps.map(x=>`<b>${esc(x.name)}</b>`).join(" or ")} to take the damage.</div></div>`;
  h+=`<div class="note">Damage to the defending team hits the <b>owner</b> of the monster attacked. Damage to your team hits the <b>turn player</b> (${esc(me.name)})${ow!==me?`, even with ${esc(ow.name)}'s monster`:""}.</div>`;
  tp.innerHTML=h;tp.classList.add("on");
  document.querySelectorAll(".tslot").forEach(x=>{const st=t.seats[+x.dataset.tseat];x.classList.toggle("tgtp",!!(direct&&st&&st.team===o&&!st.out));});}
document.addEventListener("mouseover",e=>{const o=e.target.closest&&e.target.closest("[data-tpatk]");document.querySelectorAll(".zone.tgth").forEach(z=>z.classList.remove("tgth"));
  if(o){const c=document.querySelector(`#e-m [data-uid="${o.dataset.tpatk}"],#p-m [data-uid="${o.dataset.tpatk}"]`);if(c&&c.closest(".zone"))c.closest(".zone").classList.add("tgth");}
  const pv=e.target.closest&&e.target.closest("[data-tpv]");if(pv&&typeof showPreview==="function")showPreview(+pv.dataset.tpv);});
document.addEventListener("click",e=>{const t=T();if(!t||!G||typeof CUR==="undefined"||CUR!=="duel")return;
  const dr=e.target.closest&&e.target.closest("#tdrag");if(dr){e.stopPropagation();const o=$("#right").classList.toggle("open");dr.textContent=o?"📜 LOG ▼":"📜 LOG ▲";return;}
  const cx=e.target.closest&&e.target.closest("[data-tpcancel]");if(cx){e.stopPropagation();G.ui={mode:null};render();return;}
  const a=e.target.closest&&e.target.closest("[data-tpatk]");if(a&&G.ui.mode==="attack"&&humanTurn()){e.stopPropagation();const id=G.ui.attUid;G.ui={mode:null};act(()=>attack("player",id,+a.dataset.tpatk));return;}
  const dd=e.target.closest&&e.target.closest("[data-tpdir]");
  if(dd&&G.ui.mode==="attack"&&humanTurn()){e.stopPropagation();const id=G.ui.attUid;t.directPick=+dd.dataset.tpdir;G.ui={mode:null};act(()=>attack("player",id,null));return;}
  /* click on an opponent's portrait / panel while choosing a direct attack */
  const sl=e.target.closest&&e.target.closest(".tslot.tgtp");
  if(sl&&G.ui.mode==="attack"&&humanTurn()){const st=t.seats[+sl.dataset.tseat];const af=find(G.ui.attUid);
    if(st&&!st.out&&af&&canGoDirect("player",af.card)){e.stopPropagation();const id=G.ui.attUid;t.directPick=st.i;G.ui={mode:null};act(()=>attack("player",id,null));return;}}},true);

/* ---------- phone ---------- */
function isPhone(){return window.TAG_FORCE_PHONE||Math.min(window.innerWidth,window.innerHeight)<=520||(matchMedia("(pointer:coarse)").matches&&window.innerWidth<=1000);}
function phoneCheck(){const d=$("#duel");if(!d)return;const p=d.classList.contains("tag")&&isPhone();d.classList.toggle("tphone",p);
  d.style.setProperty("--tap",Math.ceil(44/(SCALE||1))+"px");
  const tp=$("#tagtp");if(tp){const want=p?d:$("#right");if(tp.parentNode!==want){if(p)d.appendChild(tp);else want.insertBefore(tp,want.querySelector("#preview"));}}}
window.addEventListener("resize",()=>{if(T())phoneCheck();});

/* ---------- result ---------- */
function tagShowResult(winner,reason){const t=T();if(!t)return;const v=t.seats[t.view];
  const kind=!winner?"draw":t.allAI?"win":(v&&v.team===winner?"win":"lose");
  const W=winner?A().teamSeats(winner,true):[];const c=W.length?col(W[0]):"#cfe8ff";
  const pc=st=>`<div class="pc ${st.out?"out":""} ${winner&&st.team===winner?"win":""}"><img src="${PORTRAITS[(CHARS[st.char]||{}).img]||""}" style="--c:${col(st)}" alt="">${st.out?`<span class="ko2">OUT</span>`:""}<b>${st.key} · ${esc(st.name)}</b><i>${st.lp} LP</i></div>`;
  const line=W.length?pick((CHARS[W[0].char].lines||{}).win||["…"]):"";
  const box=el("div","tagres "+kind,"tagres",`<div class="box" style="--c:${c}"><h1>${kind==="draw"?"DRAW!":kind==="win"?(t.allAI?"TEAM "+TL(winner)+" WINS!":"VICTORY!"):"DEFEAT"}</h1>
    <div class="who">${winner?`Team ${TL(winner)} wins: ${W.map(x=>esc(x.name)).join(" & ")}`:"Both teams fell together"}</div>
    <div class="teams"><div class="tm">${pc(t.seats[0])}${pc(t.seats[2])}</div><span class="vs">VS</span><div class="tm">${pc(t.seats[1])}${pc(t.seats[3])}</div></div>
    ${line?`<div class="meta" style="font-style:italic;opacity:.9">${esc(W[0].name)}: “${esc(line)}”</div>`:""}
    <div class="meta">${esc(reason)} · Turn ${G.turn} · Round ${t.round}</div>
    <div class="btnrow">${t.cfg.net?"":`<button class="btn gold" id="tr-again">⚔ Rematch</button><button class="btn" id="tr-seat">Seat Select</button>`}<button class="btn" id="tr-menu">Main Menu</button></div></div>`);
  ($("#app")||document.body).appendChild(box);
  const go=f=>()=>{box.remove();f();};
  const ag=$("#tr-again");if(ag)ag.onclick=go(()=>startTag(window.TAG_LAST));
  const ss=$("#tr-seat");if(ss)ss.onclick=go(()=>{leaveDuel();openTagSelect();});
  $("#tr-menu").onclick=go(()=>{leaveDuel();if(typeof window.tagNetLeave==="function")try{window.tagNetLeave();}catch(e){}showScreen("menu");});}
window.tagShowResult=tagShowResult;

/* ---------- mode menu ---------- */
const MODE={mode:"tag",how:"ai"};
function mkScreen(id){let s=document.getElementById(id);if(s)return s;s=el("section","screen",id);const b=$("#builder");b.parentNode.insertBefore(s,b);return s;}
const P_=ch=>PORTRAITS[(CHARS[ch]||CHARS[CHAR_ORDER[0]]).img]||"";
const has=ch=>!!CHARS[ch];
const pickCh=(l)=>l.filter(has).concat(CHAR_ORDER).slice(0,4);
function onlineOK(){return typeof window.tagOnlineOpen==="function";}
function onlineFor(m){return m==="1v1"?!!document.getElementById("m-online"):onlineOK();}
function onlineTxt(m){return onlineFor(m)?(m==="1v1"?"Host a room code or join one (1 vs 1).":"Host a room code or join one. 2–4 humans, AI fills empty seats."):(m==="1v1"?"Online play is in the online edition (website).":(document.getElementById("m-online")?"Online Tag Duel is coming in a later update. Play Tag vs AI for now.":"Online play is in the online edition (website)."));}
/* v14: one DUEL button on the main menu opens this "Choose your duel" screen (replaces the old DUEL + TAG DUEL + ONLINE buttons) */
function onlineDuelOK(){return typeof window.netOpenOnline==="function"||typeof netOpenOnline==="function";}
function openOnline1v1(){try{(window.netOpenOnline||netOpenOnline)();}catch(e){showScreen("menu");}}
function openTagMode(){const s=mkScreen("tagmode");const tq=pickCh(["kaito","clement","ryuga","mira"]),fw=pickCh(["kelvin","jason","sabrina","aoiyuki"]),on=pickCh(["sabrina","weiyao","lily","toma"]);
  const o1=onlineDuelOK(),o2=onlineOK();const offTxt="Online edition only (website version)";
  const art2=(a,b)=>`<div class="art"><img src="${P_(a)}"><img src="${P_(b)}"><span class="vs">VS</span></div>`;
  const art4=(a,b,c,d)=>`<div class="art"><img src="${P_(a)}"><img src="${P_(b)}"><img src="${P_(c)}"><img src="${P_(d)}"><span class="vs">VS</span></div>`;
  const card=(k,cls,badge,art,h,tl,li)=>`<button class="mcard dcard${cls}" data-duel="${k}">${badge}${art}<h3>${h}</h3><div class="tl">${tl}</div><ul>${li}</ul></button>`;
  s.innerHTML=`<div class="tmh"><h1>ARCANE DUEL</h1><h2>CHRONICLES</h2><div class="crumb">MAIN MENU ▸ DUEL ▸ CHOOSE YOUR DUEL</div></div>
   <div class="dgroups">
    <div class="dgroup"><div class="dgh"><span class="ic">🤖</span>VS AI</div><div class="dgc">
     ${card("ai1","","",art2(tq[0],tq[2]),"1 VS 1 DUEL","The classic duel vs one AI rival","<li>8000 LP · one Chronicles Link each</li><li>Pick your duelist, rival and stage</li>")}
     ${card("ai2","",`<span class="badge">NEW!</span>`,art4(tq[0],tq[1],tq[2],tq[3]),"TAG DUEL · 2 VS 2","You + an AI partner vs 2 AI","<li>Teams <b>share one field</b> and Graveyard</li><li>Turns go A1 → B1 → A2 → B2</li>")}
    </div></div>
    <div class="dgroup on"><div class="dgh"><span class="ic">🌐</span>ONLINE WITH FRIENDS</div><div class="dgc">
     ${card("on1",o1?"":" dis",o1?"":`<span class="badge soon">ONLINE EDITION</span>`,art2(on[0],on[1]),"ONLINE 1 VS 1","Duel a friend with a room code",o1?"<li>Host a room code or join one</li><li>Free, no account needed</li>":`<li>${offTxt}</li>`)}
     ${card("on2",o2?"":" dis",o2?`<span class="badge">NEW!</span>`:`<span class="badge soon">ONLINE EDITION</span>`,art4(on[0],on[1],on[2],on[3]),"ONLINE TAG · 2 VS 2","2–4 friends, AI fills empty seats",o2?"<li>Host a room code or join one</li><li>Pick teams and seats together</li>":`<li>${offTxt}</li>`)}
    </div></div>
   </div>
   <div class="d4wrap"><button class="d4way dis" data-duel="4way" title="Coming soon"><span class="art q"><img src="${P_(fw[0])}"><img src="${P_(fw[1])}"><img src="${P_(fw[2])}"><img src="${P_(fw[3])}"></span><b>4-WAY DUEL</b><i>Free-for-all, last one standing</i><span class="badge soon">COMING SOON</span></button></div>
   <div class="tmbtns"><button class="btn" id="tm-back">◀ BACK</button></div>
   <div class="dhint">click / tap a duel · Esc or Back returns to the main menu</div>`;
  s.onclick=e=>{const c=e.target.closest("[data-duel]");if(c){if(c.classList.contains("dis")){flash(c);try{AUDIO.play("alert");}catch(er){}return;}const k=c.dataset.duel;snd("click");
      if(k==="ai1"){MODE.mode="1v1";MODE.how="ai";SEL.step=1;openSelect();}
      else if(k==="ai2"){MODE.mode="tag";MODE.how="ai";openTagSelect();}
      else if(k==="on1"){MODE.mode="1v1";MODE.how="online";openOnline1v1();}
      else if(k==="on2"){MODE.mode="tag";MODE.how="online";window.tagOnlineOpen();}
      return;}
    if(e.target.closest("#tm-back")){showScreen("menu");return;}};
  showScreen("tagmode");}
function flash(c){c.animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"none"}],250);}
function snd(k){try{if(typeof AUDIO!=="undefined")AUDIO.play(k);}catch(e){}}
window.openTagMode=openTagMode;
/* menu entry: a TAG DUEL button next to DUEL (the 1v1 DUEL button is unchanged) */
window.openDuelSelect=openTagMode;
/* v14: the separate TAG DUEL main-menu button is gone: DUEL opens the Choose-your-duel screen above */

/* ---------- seat select ---------- */
const SEAT={chars:null,human:[true,false,false,false],cur:1,online:null,names:[]};
function defaultChars(){const pref=["kaito","ryuga","clement","mira"].filter(has);const pool=CHAR_ORDER.filter(c=>c!=="you");
  const out=pref.slice();while(out.length<4){const c=pool[Math.floor(Math.random()*pool.length)];if(!out.includes(c))out.push(c);}return out;}
function openTagSelect(opts){opts=opts||{};SEAT.online=opts.online||null;if(!SEAT.chars)SEAT.chars=[SEL&&SEL.player||"kaito",...defaultChars().slice(1)];
  if(!SEAT.online)SEAT.human=[true,false,false,false];SEAT.cur=SEAT.online?SEAT.online.mySeat:0;
  mkScreen("tagsel");showScreen("tagsel");renderTagSelect();}
window.openTagSelect=openTagSelect;window.renderTagSelect=()=>renderTagSelect();window.TAGSEAT=SEAT;
function seatCard(i){const ch=SEAT.chars[i];const C=CHARS[ch]||{};const L=window.LINKS&&LINKS[ch];const team=i%2?"b":"a";const key=["A1","B1","A2","B2"][i];
  const on=SEAT.online;const mine=on?on.mySeat===i:i===0;const canTog=on?on.isHost&&i!==on.mySeat:false;const hum=SEAT.human[i];
  const nm=ch==="you"?(hum&&mine?playerName():"Mystery Duelist"):C.name;
  const who=on?(on.who&&on.who[i]||(hum?"Waiting for a friend…":"AI")):(i===0?`${esc(playerName())} · YOU`:i===2?"Your AI partner":"AI rival");
  const togT=on?(canTog?"Host: switch this seat between Human and AI":"Only the host switches seats"):"Offline: you + AI partner vs 2 AI. Human seats are for online play.";
  return `<div class="scard ${team} ${SEAT.cur===i?"cur":""}" data-seat="${i}" style="--c:${C.color||"#7cf"}"><img class="big" src="${P_(ch)}" alt=""><span class="key">${key}</span>
    <div class="inf"><div class="nm">${esc(nm)}</div><div class="who">${esc(who)}</div>
     <div class="tog ${canTog?"":"lock"}" title="${esc(togT)}" data-tog="${i}"><span class="${hum?"on":""}">👤 HUMAN</span><span class="${hum?"":"on ai"}">🤖 AI</span></div>
     <div class="swapi" data-pickfor="${i}" title="Pick this seat's duelist">⇄ ${mine||!on?"pick duelist":"seat duelist"}</div>
     ${on&&on.ready&&on.ready[i]?`<div class="rdy">✔ READY</div>`:""}
     ${L?`<div class="lnk"><b>✦ ${esc(L.name)}</b><br>${esc(L.text)}</div>`:""}</div></div>`;}
function renderTagSelect(){const s=mkScreen("tagsel");const on=SEAT.online;
  const order=[0,1,2,3].map(i=>`<span class="oc" style="--c:${(CHARS[SEAT.chars[i]]||{}).color}"><img src="${P_(SEAT.chars[i])}" alt="">${["A1","B1","A2","B2"][i]} ${esc((CHARS[SEAT.chars[i]]||{}).name||"?")}</span>`).join("<b>›</b>");
  const tags={};SEAT.chars.forEach((c,i)=>{(tags[c]=tags[c]||[]).push(i);});
  s.innerHTML=`<div class="tsh"><h1>TAG DUEL · CHOOSE YOUR SEATS</h1><div class="sub">Tap a seat, then tap a duelist · ⇄ picks for that seat${on?" · the host runs the rules":""}</div></div>
   <div class="tcol a"><div class="tl">TEAM A</div>${seatCard(0)}${seatCard(2)}</div>
   <div class="tcol b"><div class="tl">TEAM B</div>${seatCard(1)}${seatCard(3)}</div>
   <div class="tmid">${on?`<div class="troom" id="troom">${on.roomHTML||""}</div>`:""}
    <div class="torder"><span class="lab">TURN ORDER</span>${order}</div><div style="font-size:10.5px;opacity:.7">Each team shares one field · own deck, hand, LP and Link</div>
    <div class="tgrid">${CHAR_ORDER.map(c=>{const C=CHARS[c];const tg=(tags[c]||[]).map(i=>`<span class="tt" style="--c:${CHARS[SEAT.chars[i]].color};${i%2?"right:2px":"left:2px"}">${["A1","B1","A2","B2"][i]}</span>`).join("");
      return `<div class="tile ${tags[c]?"has":""}" data-ch="${c}" style="--c:${C.color}" title="${esc(C.name)}"><img src="${PORTRAITS[C.img]}" alt="">${tg}<div class="tn">${esc(c==="you"?"You":C.name)}</div></div>`;}).join("")}</div></div>
   <div class="tsbtns"><button class="btn" id="ts-back">◀ Back</button><button class="btn" id="ts-rnd">🎲 Random</button><span class="vsx">VS</span><button class="btn" id="ts-swap">⇄ Swap teams</button><button class="btn red" id="ts-go" ${on&&!on.isHost?"disabled":""}>${on&&!on.isHost?"WAITING FOR HOST":"START DUEL ▶"}</button></div>
   <div class="tsfoot">${on?"Host only: Human ⇄ AI toggles and Start. Guests pick a duelist on their own seat. AI fills any empty seat.":"VS AI: you (A1) + an AI partner (A2) vs two AI rivals (B1, B2). Turn order A1 › B1 › A2 › B2."}</div>`;
  s.onclick=onSelClick;}
function canPick(i){const on=SEAT.online;if(!on)return true;if(i===on.mySeat)return true;return on.isHost&&!SEAT.human[i];}
function onSelClick(e){const on=SEAT.online;
  const rm=e.target.closest("[data-troom]");if(rm){if(on&&on.onRoom)on.onRoom(rm.dataset.troom,rm,e);return;} /* v13: online room controls */
  if(e.target.closest("input,select,textarea"))return;
  const tg=e.target.closest("[data-tog]");if(tg){const i=+tg.dataset.tog;if(on&&on.isHost&&i!==on.mySeat){SEAT.human[i]=!SEAT.human[i];if(on.onChange)on.onChange("human",i);renderTagSelect();}else flash(tg);return;}
  const sc=e.target.closest("[data-seat]");const tile=e.target.closest("[data-ch]");
  if(tile){const i=SEAT.cur;if(!canPick(i)){flash(tile);return;}SEAT.chars[i]=tile.dataset.ch;snd("click");if(on&&on.onChange)on.onChange("char",i);
    if(!on){const ord=[0,1,2,3];SEAT.cur=ord[(ord.indexOf(i)+1)%4];}renderTagSelect();return;}
  if(sc){const i=+sc.dataset.seat;if(canPick(i)){SEAT.cur=i;renderTagSelect();}else if(on&&on.onSeat&&on.onSeat(i)){}else flash(sc);return;}
  if(e.target.closest("#ts-back")){if(on&&on.onLeave)on.onLeave();openTagMode();return;}
  if(e.target.closest("#ts-rnd")){const pool=CHAR_ORDER.filter(c=>c!=="you");for(let i=0;i<4;i++)if(canPick(i)&&(!on||i!==on.mySeat||true))SEAT.chars[i]=pool[Math.floor(Math.random()*pool.length)];if(on&&on.onChange)on.onChange("all");renderTagSelect();return;}
  if(e.target.closest("#ts-swap")){if(on&&!on.isHost)return;const c=SEAT.chars;SEAT.chars=[c[1],c[0],c[3],c[2]];if(on){const h=SEAT.human;SEAT.human=[h[1],h[0],h[3],h[2]];if(on.onChange)on.onChange("swap");}renderTagSelect();return;}
  if(e.target.closest("#ts-go")){if(on){if(on.isHost&&on.onStart)on.onStart();return;}
    const host=$("#tagsel");window.__stage=stageMount(host,{p1:SEAT.chars[0],p2:SEAT.chars[1],initial:null,okText:"⚔ START TAG DUEL",
      onBack:()=>renderTagSelect(),onConfirm:k=>{startTag({chars:SEAT.chars.slice(),human:[true,false,false,false],arena:k});}});}}
})();
/* ================= v15: Line Change (James), Ink Copy (Uncle Ee), Trinity Titan (Clement mode 2) =================
   Loads LAST in the game script (after l_tagui.js), so every wrapper here is the outermost one and always calls the
   function it wraps. Online/Tag sync: only numbers live on cards (m.lc colour 0-4, m.icSrc Ink Copy source index,
   m.jmCnt Omniliner counters, m.c2Direct turn) plus real CARDS entries, so snapshots carry everything. Guests only
   render (v15Tick re-derives name/DEF/tint from the numbers). Tunables: LINK_PARAMS.james / clement2 / uncleee, V15. */
(function(){
const V15={qpAtk:300,blueDef:400,pinkLP:500,yellowDraw:1,omniPer:200,omniMax:3};
window.V15=V15;
const COL=[{n:"Red",attr:"FIRE",race:"Warrior",hex:"#e63946",perk:"pierce",txt:"Piercing"},
  {n:"Blue",attr:"WATER",race:"Machine",hex:"#3a86ff",perk:"guard",txt:"Guard, +400 DEF"},
  {n:"Yellow",attr:"LIGHT",race:"Spellcaster",hex:"#ffd23f",perk:null,txt:"draw 1 when it changes into Yellow (once per turn)"},
  {n:"Green",attr:"WIND",race:"Beast",hex:"#2bc96b",perk:"direct",txt:"can attack directly"},
  {n:"Pink",attr:"EARTH",race:"Fairy",hex:"#ff7eb6",perk:null,txt:"gain 500 LP when it changes into Pink"}];
window.LINE_COLOURS=COL;
const PERKS=["pierce","guard","direct"];
const guest=()=>typeof isGuest==="function"&&isGuest();
const LKs=s=>(typeof LK==="function"?LK(s):{});
const isRail=c=>!!c&&c.set==="Railmask";
const curLc=m=>m?(m.lc!=null?m.lc:(CARDS[m.id]?CARDS[m.id].lc0:null)):null;
const fu=s=>mons(s).filter(m=>m.faceUp);
const railFU=s=>fu(s).filter(isRail);
const say=(s,msg)=>log(msg,sc(s));
const hasSlot=s=>freeIdx(S(s).monsters)>=0;
async function glow(c,col){const el=c&&elOf(c.uid);if(el)await anim(el,[{filter:"brightness(1)"},{filter:`brightness(2.6) drop-shadow(0 0 14px ${col||"#7ff"})`},{filter:"brightness(1)"}],500);}
let KEYS=null;const keys=()=>KEYS||(KEYS=Object.keys(CARDS).sort());
const keyIdx=id=>keys().indexOf(id);
/* ---------- printed card adjusted for colour / Ink Copy (cached so identity stays stable) ---------- */
const VB=new Map();
window.v15Base=function(m){const b=CARDS[m.id];if(!b)return b;
  if(m.id==="ue_inkcopy"){if(m.icSrc==null)return b;const k="ic|"+m.icSrc;let o=VB.get(k);if(o)return o;
    const src=CARDS[keys()[m.icSrc]];if(!src)return b;const fx={};for(const x of ["pierce","guard","direct","double"])if(src.fx&&src.fx[x])fx[x]=src.fx[x];
    o=Object.assign({},b,{attr:src.attr,race:"Sketch",fx});VB.set(k,o);return o;}
  if(b.set!=="Railmask")return b;
  const lc=m.lc!=null?m.lc:b.lc0;if(lc==null)return b;const k=m.id+"|"+lc;let o=VB.get(k);if(o)return o;
  const fx=Object.assign({},b.fx);for(const p of PERKS)delete fx[p];const C=COL[lc];if(C.perk)fx[C.perk]=true;
  o=Object.assign({},b,{attr:C.attr,race:C.race,fx});VB.set(k,o);return o;};
function syncCard(m){if(!m||!CARDS[m.id])return;
  if(isRail(m)){const want=(CARDS[m.id].def||0)+(curLc(m)===1?V15.blueDef:0);if(!m.lkDef0&&m.def!==want)m.def=want;}
  if(m.id==="ue_inkcopy"&&m.icSrc!=null){const src=CARDS[keys()[m.icSrc]];if(src){const nm=src.name+" (Ink Copy)";if(m.name!==nm)m.name=nm;}}}
function refresh(m){syncCard(m);if(typeof applyCostumes==="function")try{applyCostumes();}catch(e){}else{const b=v15Base(m);m.race=b.race;m.attr=b.attr;m.fx=b.fx;}}
/* leaving the field: back to the printed colour; Ink Copy tokens vanish */
function wipe(c){if(!c)return;if(isRail(c)){delete c.lc;delete c.jmCnt;if(CARDS[c.id]&&!c.lkDef0)c.def=CARDS[c.id].def;const b=CARDS[c.id];if(b){c.race=b.race;c.attr=b.attr;c.fx=b.fx;}}delete c.c2Direct;}
const bTG=toGY;toGY=function(c){const r=bTG.apply(this,arguments);
  if(c&&c.id==="ue_inkcopy"){for(const s of ["player","enemy"]){const g=G&&G.sides&&G.sides[s]&&S(s).gy;const i=g?g.indexOf(c):-1;if(i>=0)g.splice(i,1);}
    try{log(`${c.name} fades back into the paper.`,"s");}catch(e){}}
  else wipe(c);return r;};
const bBM=bounceMonster;bounceMonster=async function(m){const r=await bBM.apply(this,arguments);if(m&&!onField(m))wipe(m);return r;};
/* ---------- render hook: re-derive DEF / name / tint from the synced numbers (host, offline and guest alike) ---------- */
function v15Tick(){if(!G||!G.sides)return;for(const s of ["player","enemy"]){const sd=G.sides[s];if(!sd)continue;
  for(const m of sd.monsters)if(m)syncCard(m);
  for(const z of ["hand","gy"])for(const c of sd[z]||[])if(c&&isRail(c)&&c.lc!=null&&!guest())wipe(c);}}
function tint(){if(!G||!G.sides)return;for(const s of ["player","enemy"])for(const m of (G.sides[s]?G.sides[s].monsters:[])){if(!m||!m.faceUp)continue;const el=elOf(m.uid);if(!el)continue;
  if(isRail(m)){const lc=curLc(m);const C=lc!=null?COL[lc]:null;el.classList.add("v15rail");el.style.setProperty("--lc",C?C.hex:"#fff");el.classList.toggle("v15prism",!C);
    if(!el.querySelector(".lcb")){const b=document.createElement("div");b.className="lcb";el.appendChild(b);}const b=el.querySelector(".lcb");const t=C?C.n.toUpperCase():"PRISM";if(b.textContent!==t)b.textContent=t;}
  else if(m.id==="ue_inkcopy")el.classList.add("v15ink");
  if(m.c2Direct===G.turn)el.classList.add("v15sky");}}
const bR=render;render=function(){try{v15Tick();}catch(e){}const r=bR.apply(this,arguments);try{tint();}catch(e){}return r;};
const css=document.createElement("style");css.textContent=`
.fsel .frender{top:74px!important;height:452px!important}.fsel .ftag{top:80px!important}
#duel .v15rail{box-shadow:0 0 0 2px var(--lc),0 0 12px var(--lc)!important}
#duel .v15rail .lcb{position:absolute;left:50%;bottom:-2px;transform:translateX(-50%);font:700 8px/1 system-ui,sans-serif;letter-spacing:.08em;padding:2px 5px;border-radius:6px;background:var(--lc);color:#111;pointer-events:none;z-index:3;white-space:nowrap}
#duel .v15prism{box-shadow:0 0 0 2px #fff,0 0 14px #b9f!important}
#duel .v15prism .lcb{background:linear-gradient(90deg,#e63946,#ffd23f,#2bc96b,#3a86ff,#ff7eb6)}
#duel .v15ink{filter:grayscale(.55) contrast(1.15);box-shadow:0 0 0 2px #222,0 0 10px #f4a261!important}
#duel .v15sky{box-shadow:0 0 0 2px #e8fbff,0 0 18px #7fe8ff!important}
#chooser.lcpick .chgrid{grid-template-columns:repeat(5,minmax(0,1fr))}
#chooser.lcpick .chopt{border:2px solid var(--lc);box-shadow:0 0 12px var(--lc) inset;border-radius:10px}
#chooser.lcpick .chopt.sel{box-shadow:0 0 0 3px #fff,0 0 22px var(--lc)}
#chooser.lcpick .chopt .cc{filter:drop-shadow(0 0 8px var(--lc))}
#chooser.lcpick h2{background:linear-gradient(90deg,#e63946,#ffd23f,#2bc96b,#3a86ff,#ff7eb6);-webkit-background-clip:text;background-clip:text;color:transparent}`;
document.head.appendChild(css);
/* the colour picker is a normal requestChoice (so online guests get it too); tint it wherever it appears */
const LCNAMES=COL.map(c=>c.n+" Line");
function tintChooser(){const ch=document.getElementById("chooser");if(!ch||ch.dataset.lcd)return;const opts=[...ch.querySelectorAll(".chopt")];if(!opts.length)return;
  const idx=opts.map(el=>{const b=el.querySelector(".cn b");return b?LCNAMES.indexOf(b.textContent.trim()):-1;});if(idx.some(i=>i<0))return;
  ch.dataset.lcd=1;ch.classList.add("lcpick");opts.forEach((el,k)=>el.style.setProperty("--lc",COL[idx[k]].hex));}
try{new MutationObserver(()=>{try{tintChooser();}catch(e){}}).observe(document.body,{childList:true,subtree:true});}catch(e){}
/* art for the colour options = the printed Railmask of that colour */
try{if(typeof ART_DATA!=="undefined")["jm_red","jm_blue","jm_yellow","jm_green","jm_pink"].forEach((id,i)=>{if(ART_DATA[id]&&!ART_DATA["jm_col"+i])ART_DATA["jm_col"+i]=ART_DATA[id];});}catch(e){}
/* ---------- Line Change ---------- */
function omniCount(s,m){for(const x of fu(s))if(x.id==="jm_ace"&&x!==m&&(x.jmCnt||0)<V15.omniMax){x.jmCnt=(x.jmCnt||0)+1;floatText(elOf(x.uid),`+${V15.omniPer} ATK`,"heal");}
  if(m&&m.id==="jm_ace"&&(m.jmCnt||0)<V15.omniMax)m.jmCnt=(m.jmCnt||0)+1;}
async function setLine(s,m,lc){if(!m||!onField(m)||!m.faceUp||!isRail(m)||!COL[lc])return false;const old=curLc(m);if(old===lc)return false;
  m.lc=lc;refresh(m);const C=COL[lc];
  G.stats.lineChanges=(G.stats.lineChanges||0)+1;
  say(s,`${m.name} Line Changes to ${C.n}: now ${C.attr} ${C.race}${C.perk?` (${C.txt})`:""}!`);
  floatText(elOf(m.uid),`${C.n.toUpperCase()} LINE`,"info");render();
  if(typeof AUDIO!=="undefined")try{AUDIO.play("summon");}catch(e){}
  await glow(m,C.hex);
  if(old!=null)omniCount(s,m);
  if(lc===2){const k=LKs(s);if(k.jmY!==G.turn&&S(s).deck.length){k.jmY=G.turn;say(s,"Yellow Line: draw 1.");await drawCards(s,V15.yellowDraw);}}
  if(lc===4&&!G.over){say(s,`Pink Line: ${S(s).name} gains ${V15.pinkLP} LP.`);await changeLP(s,V15.pinkLP);}
  render();return true;}
/* AI: how good is colour lc for monster m right now? */
function colScore(s,m,lc,ctx){const cur=curLc(m);if(lc===cur)return -99;const o=other(s);const opp=mons(o);const myTurn=G.current===s;
  const pre=myTurn&&G.phase!=="main2"&&G.phase!=="end"&&G.turn>1;const canHit=pre&&m.pos==="atk"&&canAttackWithLater(s,m);
  const A=atkOf(m)+(ctx&&ctx.atk||0);let v=0;
  if(ctx&&ctx.def){if(lc===1)v+=40+(m.pos==="def"?20:0);if(lc===4)v+=4;return v;}
  const beat=opp.filter(x=>x.faceUp&&(x.pos==="atk"?atkOf(x)<A:x.def<A));
  if(canHit){
    if(lc===3)v+=opp.length?(beat.length?6:26+A/100):(cur===3?0:2);
    if(lc===0){const d=opp.filter(x=>x.faceUp&&x.pos==="def"&&x.def<A);if(d.length)v+=18+Math.max(...d.map(x=>A-x.def))/100;}
    if(cur===3&&opp.length&&!beat.length)v-=25;
    if(cur===0&&opp.some(x=>x.faceUp&&x.pos==="def"&&x.def<A))v-=15;}
  if(lc===2&&LKs(s).jmY!==G.turn&&S(s).deck.length>3)v+=S(s).hand.length<=2?22:12;
  if(lc===4)v+=S(s).lp<=3000?20:7;
  if(lc===1)v+=(!canHit||m.pos==="def")?(opp.length?16:8):2;
  if(fu(s).some(x=>x.id==="jm_ace"&&x!==m&&(x.jmCnt||0)<V15.omniMax))v+=6;
  return v;}
function bestCol(s,m,list,ctx){let b=null,bv=-1e9;for(const lc of list){const v=colScore(s,m,lc,ctx);if(v>bv){bv=v;b=lc;}}return {lc:b,v:bv};}
function bestLine(s,ctx,excl){let r={m:null,lc:null,v:-1e9};for(const m of railFU(s)){if(excl&&excl.includes(m))continue;const cl=[0,1,2,3,4].filter(i=>i!==curLc(m));const b=bestCol(s,m,cl,ctx&&ctx.tgt===m?ctx:null);if(b.v>r.v)r={m,lc:b.lc,v:b.v};}return r;}
window.v15bestLine=bestLine;
async function pickColour(s,m,opts){opts=opts||{};const cur=curLc(m);const list=[0,1,2,3,4].filter(i=>i!==cur&&!(opts.exclude||[]).includes(i));if(!list.length)return null;
  const cards=list.map(i=>mk("jm_col"+i,s));const ai=bestCol(s,m,list,opts.ctx);
  const r=await requestChoice(s,cards.map((c,k)=>({card:c,note:COL[list[k]].attr+" "+COL[list[k]].race+" · "+COL[list[k]].txt})),
    {title:`Line Change: ${m.name}`,sub:`Choose its new line colour. Now: ${cur==null?"Prism (no colour)":COL[cur].n+" ("+COL[cur].attr+" "+COL[cur].race+")"}.`,
     optional:!!opts.optional,cancelLabel:"Keep colour",confirmLabel:"Change line",ai:x=>(opts.optional&&ai.v<=0)?null:(x.find(c=>c.lcOpt===ai.lc)||x[0])});
  return r&&r.lcOpt!=null?r.lcOpt:null;}
window.v15pickColour=pickColour;window.v15setLine=setLine;
async function lineChangeFx(s,fx,src){if(G.over)return;
  if(fx.self){if(!src||!onField(src)||!src.faceUp){return;}const lc=await pickColour(s,src,{});if(lc!=null)await setLine(s,src,lc);return;}
  const n=fx.n==="any"?5:(fx.n||1);const done=[];const forced=src&&src.type==="spell";
  for(let i=0;i<n&&!G.over;i++){const l=railFU(s).filter(m=>!done.includes(m));if(!l.length){if(!i)say(s,"No face-up Railmask to Line Change.");break;}
    const bl=bestLine(s,null,done);const opt=!(forced&&i===0);
    const t=await requestChoice(s,l,{title:`${src?src.name+": ":""}Line Change${n>1?` (${done.length} changed)`:""}`,sub:n>1?"Choose a Railmask to change, or Done.":"Choose 1 Railmask you control to change its line colour.",
      optional:opt,cancelLabel:n>1?"Done":"Skip",ai:x=>(opt&&bl.v<=0)?null:(bl.m&&x.includes(bl.m)?bl.m:x[0])});
    if(!t||!onField(t))break;const lc=await pickColour(s,t,{});if(lc==null)break;await setLine(s,t,lc);done.push(t);
    if(fx.atk&&onField(t)){addTemp(t,-fx.atk);floatText(elOf(t.uid),`+${fx.atk} ATK`,"heal");render();}}
  if(fx.draw&&!G.over&&S(s).deck.length)await drawCards(s,fx.draw);}
window.FX_EXT=window.FX_EXT||{};FX_EXT.lineChange=lineChangeFx;
if(!EXT_FX.includes("lineChange"))EXT_FX.push("lineChange");
/* Quick-Play "Line Change!" */
const bQT=qTarget;qTarget=function(s,c,ctx){if(c&&c.fx&&c.fx.k==="lineChange"){ctx=ctx||{};const l=railFU(s);if(!l.length)return null;if(ctx.tgt&&l.includes(ctx.tgt))return ctx.tgt;return bestBy(l,atkOf);}return bQT.apply(this,arguments);};
const bSCA=spellCanActivate;spellCanActivate=function(s,c,ctx){const r=bSCA.apply(this,arguments);if(r&&c&&c.fx&&c.fx.k==="lineChange"&&!isQuick(c))return railFU(s).length>0;return r;};
const bRQ=resolveQuick;resolveQuick=async function(s,c,ctx,targetUid){if(!c||!c.fx||c.fx.k!=="lineChange")return bRQ.apply(this,arguments);
  ctx=ctx||{};const l=railFU(s);if(!l.length){log(`${c.name} has no valid target.`,"s");return null;}
  let t=null;if(targetUid){const f=find(targetUid);if(f&&l.includes(f.card))t=f.card;}
  const defend=G.current!==s;
  if(!t){const bl=bestLine(s,defend?{def:true,tgt:ctx.tgt}:{atk:c.fx.atk},null);const aiT=defend&&ctx.tgt&&l.includes(ctx.tgt)?ctx.tgt:bl.m;
    t=l.length===1?l[0]:await requestChoice(s,l,{title:`${c.name}: choose a Railmask`,sub:`Line Change it; it gains ${c.fx.atk||0} ATK this turn.`,ai:x=>x.includes(aiT)?aiT:x[0]});}
  if(!t)t=l[0];
  const lc=await pickColour(s,t,{ctx:defend&&ctx.tgt===t?{def:true}:{atk:c.fx.atk}});if(lc!=null)await setLine(s,t,lc);
  if(onField(t)&&c.fx.atk){addTemp(t,-c.fx.atk);floatText(elOf(t.uid),`+${c.fx.atk} ATK`,"heal");say(s,`${t.name} gains ${c.fx.atk} ATK this turn!`);render();}
  return {};};
/* AI: answer an attack on a Railmask with Line Change! when it saves the monster or a lot of LP */
const bAQC=aiQuickChoice;aiQuickChoice=function(r,kind,ctx,quicks){const b=bAQC.apply(this,arguments);if(b)return b;
  try{const q=quicks.find(x=>x.fx.k==="lineChange");if(!q||kind!=="attack")return null;const t=ctx&&ctx.tgt;if(!t||!t.faceUp||!isRail(t)||t.owner!==r)return null;
    const att=ctx.att;const A=atkOf(att);const hasGuard=t.fx.guard&&!t.guardUsed;
    if(t.pos==="atk"){const D=atkOf(t);if(D<A&&D+q.fx.atk>A)return q;if(D<A&&!hasGuard&&(t.ace||D>=1500||A-D>=1000))return q;}
    else if(t.def<A&&!hasGuard&&(t.def+V15.blueDef>=A||t.ace||t.atk>=1500))return q;}catch(e){}
  return null;};
/* AI: Transfer Ticket / Line Change! on its own turn */
const bAPA=aiPickAction;aiPickAction=function(s,ph){let b=bAPA.apply(this,arguments);
  try{const sd=S(s);if(!railFU(s).length)return b;
    for(const c of [...sd.hand,...sd.st.filter(x=>x&&!x.faceUp&&x.type==="spell")]){if(!c.fx||c.fx.k!=="lineChange"||!spellCanActivate(s,c))continue;
      const q=isQuick(c);const bl=bestLine(s,q?{atk:c.fx.atk}:null);let v=0;
      if(q){if(ph===1&&G.turn>1&&bl.v>=22)v=30+bl.v/2;}
      else if(bl.v>=8||sd.hand.length<=3)v=34+Math.max(0,bl.v)/2;
      if(v>0&&(!b||v>b.sc)){const uid=c.uid;b={sc:v,f:()=>activateSpell(s,uid)};}}}catch(e){}
  return b;};
/* Omniliner: +200 ATK per colour change of your Railmasks (max +600) */
const bAtk=atkOf;atkOf=function(m){let v=bAtk.apply(this,arguments);if(m&&m.id==="jm_ace"&&m.jmCnt&&m.faceUp)v+=V15.omniPer*Math.min(V15.omniMax,m.jmCnt);return v;};
/* ---------- Trinity Titan: "can attack directly this turn" flag ---------- */
const bCGD=canGoDirect;canGoDirect=function(s,c){if(c&&c.c2Direct===G.turn&&!c.destiny)return true;return bCGD.apply(this,arguments);};
const bACT=aiChooseTarget;aiChooseTarget=function(s,att){const r=bACT.apply(this,arguments);
  if(att&&att.c2Direct===G.turn&&mons(other(s)).length){const A=atkOf(att);if(S(other(s)).lp<=A)return {t:null};
    if(r&&r.t&&r.t.faceUp&&r.t.pos==="atk"&&A>atkOf(r.t)&&(r.t.ace||atkOf(r.t)>=2000))return r;return {t:null};}
  return r;};
/* ---------- card text ---------- */
const bCT=cardText;cardText=function(c){if(c&&c.lcOpt!=null){const C=COL[c.lcOpt];return [`<b>${C.n} Line:</b> becomes ${C.attr} ${C.race}. Perk: ${C.txt}.`];}
  const r=bCT.apply(this,arguments);if(!c||!Array.isArray(r))return r;
  if(isRail(c)){const lc=curLc(c);r.push(lc==null?`<b>Prism:</b> chooses its line colour when Normal Summoned.`:`<b>Line: ${COL[lc].n}</b> (${COL[lc].attr} ${COL[lc].race}). Perk: ${COL[lc].txt}.`);
    r.push(`<b>Line Change:</b> Railmask cards can switch colour (Attribute, Type and perk). Back to the printed colour when it leaves the field.`);
    if(c.id==="jm_ace")r.push(`<b>Omniliner:</b> gains ${V15.omniPer} ATK each time a Railmask you control changes colour (max +${V15.omniPer*V15.omniMax}).${c.jmCnt?` Now +${V15.omniPer*Math.min(V15.omniMax,c.jmCnt)}.`:""}`);}
  if(c.id==="ue_inkcopy")r.push(`<b>Ink Copy token:</b> a Sketch copy (Level, Attribute, original ATK/DEF and Piercing/Guard/direct/double-attack keywords). It vanishes when it leaves the field.`);
  if(c.c2Direct&&G&&c.c2Direct===G.turn)r.push(`<b>Sky:</b> can attack directly this turn.`);
  return r;};
/* ---------- CHRONICLES LINKS ---------- */
Object.assign(LINK_PARAMS,{james:{n:2,maxLv:4,atk:400},clement2:{kill:2000,sky:500,seaMax:0},uncleee:{atk:300,aiMin:2000}});
const P=LINK_PARAMS;
const jmPool=s=>S(s).deck.filter(c=>isRail(c)&&c.type==="monster"&&!c.extra&&(c.level||0)<=P.james.maxLv);
const c2Earth=s=>fu(other(s)).filter(m=>!m.destiny&&atkOf(m)<=P.clement2.kill);
const c2Sea=s=>mons(other(s)).filter(m=>!m.destiny&&(!P.clement2.seaMax||!m.faceUp||atkOf(m)<=P.clement2.seaMax));
const c2Giants=s=>fu(s).filter(m=>raceIs(m,"Giant"));
const ueTargets=s=>[...fu(s),...fu(other(s))].filter(m=>!m.destiny&&!m.token&&CARDS[m.id]&&CARDS[m.id].type==="monster");
const ueValue=m=>{const b=CARDS[m.id];return (b.atk||0)+(b.fx&&(b.fx.pierce||b.fx.double)?150:0)+(b.fx&&b.fx.direct?100:0);};
Object.assign(LINKS,{
 james:{name:"All Aboard: Rainbow Line!",text:`Special Summon up to ${P.james.n} Level ${P.james.maxLv} or lower Railmask monsters from your Deck. Then Line Change every Railmask you control, each to a different colour. They gain ${P.james.atk} ATK while on the field.`,
  can:s=>(hasSlot(s)&&jmPool(s).length>0)||railFU(s).length>0,
  ai:(s,ph)=>{const pool=jmPool(s).length;const slots=S(s).monsters.filter(x=>!x).length;const have=railFU(s).length;const add=Math.min(P.james.n,pool,slots);
    if(!add&&have<2)return 0;if(have+add<2)return 0;return (ph===1?70:58)+add*3;},
  run:async s=>{const got=[];
    for(let i=0;i<P.james.n&&!G.over;i++){if(!hasSlot(s))break;const pool=jmPool(s).filter(c=>!got.includes(c));if(!pool.length)break;
      const c=await requestChoice(s,pool,{title:`All Aboard!: Special Summon a Railmask (${i+1}/${P.james.n})`,sub:`Level ${P.james.maxLv} or lower, from your Deck, in Attack Position.`,optional:i>0,cancelLabel:"Done",score:c=>(c.atk||0)+(c.id==="jm_green"?150:0)});
      if(!c)break;if(await specialSummon(s,c,"deck")){c.pos="atk";got.push(c);render();await sleep(150);}}
    if(G.over)return;
    const used=[];const list=railFU(s).sort((a,b)=>atkOf(b)-atkOf(a));
    for(const m of list){if(G.over||!onField(m))continue;const ex=used.slice();if([0,1,2,3,4].filter(i=>i!==curLc(m)&&!ex.includes(i)).length===0)continue;
      const lc=await pickColour(s,m,{exclude:ex});if(lc==null)continue;await setLine(s,m,lc);used.push(lc);}
    for(const m of railFU(s)){m.bonus=(m.bonus||0)+P.james.atk;floatText(elOf(m.uid),`+${P.james.atk} ATK`,"heal");}
    say(s,`All aboard! ${railFU(s).length} Railmask${railFU(s).length===1?"":"s"} gain ${P.james.atk} ATK.`);render();await sleep(250);}},
 clement2:{name:"Trinity Horizon Burst",text:`Resolve in order (skip any with no target). EARTH: destroy 1 opponent monster with ${P.clement2.kill} or less ATK. SEA: return 1 opponent monster to the hand${P.clement2.seaMax?` (${P.clement2.seaMax} or less ATK)`:""}. SKY: your Giants gain ${P.clement2.sky} ATK while on the field, and 1 Giant you choose can attack directly this turn.`,
  can:s=>c2Giants(s).length>0,
  ai:(s,ph)=>{if(!c2Giants(s).length)return 0;const e=c2Earth(s).length,w=c2Sea(s).length;if(!e&&!w)return ph===1&&G.turn>1&&c2Giants(s).some(m=>m.pos==="atk")&&S(other(s)).lp<=Math.max(...c2Giants(s).map(atkOf))+P.clement2.sky?90:0;
    return (ph===1?74:60)+(e&&w?6:0);},
  run:async s=>{const o=other(s);
    const e=c2Earth(s);if(e.length){const t=await requestChoice(s,e,{title:"Trinity Horizon Burst — EARTH",sub:`Destroy 1 opponent monster with ${P.clement2.kill} or less ATK.`,score:threat});
      if(t&&onField(t)){say(s,`EARTH: ${t.name} is crushed!`);if(typeof impact==="function")impact(elOf(t.uid));await destroyMonsters([t]);}}else say(s,"EARTH: no target.");
    if(G.over)return;
    const w=c2Sea(s);if(w.length){const t=await requestChoice(s,w.map(m=>({card:m,hidden:!m.faceUp,note:m.faceUp?"":"A face-down monster."})),{title:"Trinity Horizon Burst — SEA",sub:"Return 1 opponent monster to the hand.",score:m=>threat(m)+(m.extra?800:0)});
      if(t&&onField(t)){say(s,`SEA: a wave sweeps ${t.faceUp?t.name:"a face-down monster"} away!`);await bounceMonster(t);}}else say(s,"SEA: no target.");
    if(G.over)return;
    const g=c2Giants(s);if(!g.length){say(s,"SKY: no Giant on the field.");return;}
    for(const m of g){m.bonus=(m.bonus||0)+P.clement2.sky;floatText(elOf(m.uid),`+${P.clement2.sky} ATK`,"heal");}render();
    const ga=g.filter(m=>m.pos==="atk");const t=await requestChoice(s,g,{title:"Trinity Horizon Burst — SKY",sub:"Choose 1 Giant: it can attack directly this turn.",ai:x=>bestBy(x.filter(m=>ga.includes(m)&&canAttackWithLater(s,m)).length?x.filter(m=>ga.includes(m)&&canAttackWithLater(s,m)):x,atkOf)});
    if(t&&onField(t)){t.c2Direct=G.turn;floatText(elOf(t.uid),"SKY: DIRECT ATTACK","info");say(s,`SKY: ${t.name} can attack directly this turn!`);render();await glow(t,"#7fe8ff");}}},
 uncleee:{name:"Uncle Draw Also Can!",text:`Choose 1 face-up monster on the field (either side). Special Summon an "Ink Copy" token of it: Sketch Type, same name + "(Ink Copy)", Level, Attribute, original ATK/DEF and its Piercing / Guard / direct / double-attack keywords (no other effects). The token vanishes when it leaves the field. Then your Sketch monsters gain ${P.uncleee.atk} ATK while on the field.`,
  can:s=>hasSlot(s)&&ueTargets(s).length>0,
  ai:(s,ph)=>{if(!hasSlot(s))return 0;const l=ueTargets(s);if(!l.length)return 0;const b=bestBy(l,ueValue);const a=CARDS[b.id].atk||0;if(a<P.uncleee.aiMin)return 0;return (ph===1?66:58)+Math.min(14,(a-P.uncleee.aiMin)/100);},
  run:async s=>{const l=ueTargets(s);if(!l.length)return;
    const src=await requestChoice(s,l,{title:"Uncle Draw Also Can!: copy a monster",sub:"Choose 1 face-up monster (either side) for Uncle to ink-copy.",score:ueValue});
    if(!src||G.over||!hasSlot(s))return;const b=CARDS[src.id];
    const tok=mk("ue_inkcopy",s);tok.icSrc=keyIdx(src.id);tok.level=b.level;tok.atk=b.atk;tok.def=b.def;tok.name=b.name+" (Ink Copy)";
    const sd=S(s);sd.ink=[tok];let ok=false;try{ok=await specialSummon(s,tok,"ink");}finally{delete sd.ink;}
    if(!ok){say(s,"No room for the Ink Copy.");return;}
    tok.extra=true;
    refresh(tok);tok.pos="atk";say(s,`Uncle draws ${tok.name}!`);render();await glow(tok,"#f4a261");
    for(const m of fu(s).filter(m=>raceIs(m,"Sketch"))){m.bonus=(m.bonus||0)+P.uncleee.atk;floatText(elOf(m.uid),`+${P.uncleee.atk} ATK`,"heal");}
    say(s,`Every Sketch gains ${P.uncleee.atk} ATK.`);render();await sleep(250);}}
});
/* no win clips / expression sheets for the new duelists: fall back to the portrait (same as v10/v12) */
try{for(const k of ["james","clement2","uncleee"]){if(typeof CLIP_BAD!=="undefined")CLIP_BAD["win_"+k]=1;
  if(typeof EXPR_DATA!=="undefined"&&typeof PORTRAITS!=="undefined"&&PORTRAITS[k])for(const x of ["hurt","point","talk","win","ace","happy","sad","angry"])if(!EXPR_DATA[k+"_"+x])EXPR_DATA[k+"_"+x]=PORTRAITS[k];}}catch(e){}
try{if(typeof THEME_COL!=="undefined")Object.assign(THEME_COL,{Railmask:"#e63946",Giant:"#2ec4b6",Sketch:"#f4a261"});}catch(e){}
window.V15_READY=1;
})();
/* ===== v14 menu: SYSTEM panel (Sound + How to Play), Esc and phone/browser Back for every screen ===== */
(function(){
const css=document.createElement("style");css.textContent=`
#sys-panel{width:780px;max-width:96%;max-height:92%;display:flex;flex-direction:column;padding:16px 20px 14px}
#sys-panel h2{margin:0 0 10px}
.systabs{display:flex;gap:10px;margin-bottom:12px}
.systab{flex:1;min-height:48px;border-radius:10px;border:2px solid #6c5aa8;background:#22174a;color:#fff;font:bold 15px Arial,sans-serif;letter-spacing:2px;cursor:pointer}
.systab.sel{border-color:#ffd36b;background:#3a2766;box-shadow:0 0 14px #ffb84d55;color:#ffe08a}
.sysbody{flex:1;min-height:0;overflow:auto;padding-right:6px}
.sysbody .sndrow{display:flex;align-items:center;gap:12px;margin:12px 0;font-size:15px}.sysbody .sndrow span{min-width:130px}
.sysbody .sndrow input[type=range]{flex:1;height:28px}.sysbody .sndrow b{min-width:34px;text-align:right}
.sysbody .sndrow.chk input{width:22px;height:22px}
.sysbody .sndnote{font-size:12px;opacity:.75;line-height:1.5;margin-top:10px}
.sysbody .sysrow{display:flex;gap:10px;margin-top:14px}
#sys-panel .btnrow{display:flex;justify-content:center;gap:12px;margin-top:12px}
#sys-panel .btnrow .btn{min-width:150px;min-height:44px}
`;document.head.appendChild(css);

let helpCache=null;
function helpHTML(){if(helpCache)return helpCache;try{const ml=$("#modalLayer");const keep=ml.innerHTML;showHelp();const m=ml.querySelector(".modal");
    if(m){const c=m.cloneNode(true);c.querySelectorAll(".btnrow,h2").forEach(x=>x.remove());helpCache=c.innerHTML;}ml.innerHTML=keep;}catch(e){}
  return helpCache||"<p>How to Play is not available.</p>";}
function soundHTML(){if(typeof AUDIO==="undefined"||typeof soundPanelHTML!=="function")return "<p>Sound settings are not available.</p>";
  const t=document.createElement("div");t.innerHTML=soundPanelHTML();const m=t.querySelector(".modal");m.querySelector("h2").remove();m.querySelector(".btnrow").remove();
  return m.innerHTML+`<div class="sysrow"><button class="btn" id="snd-test">🔊 Test sound</button></div>`;}
function bindSound(){if(typeof AUDIO==="undefined")return;const bind=(id,k)=>{const e=$("#"+id);if(e)e.oninput=()=>{AUDIO.setVol(k,e.value/100);$("#"+id+"-v").textContent=e.value;};};
  bind("snd-music","music");bind("snd-sfx","sfx");const mu=$("#snd-mute");if(mu)mu.onchange=e=>AUDIO.setVol("mute",e.target.checked);
  const te=$("#snd-test");if(te)te.onclick=()=>{AUDIO.unlock();setTimeout(()=>AUDIO.play("spell"),60);};}
function openSystem(tab){tab=tab||openSystem.last||"sound";openSystem.last=tab;
  $("#modalLayer").innerHTML=`<div class="modal-bg" id="sysbg"><div class="modal" id="sys-panel">
    <h2>⚙ System</h2>
    <div class="systabs"><button class="systab${tab==="sound"?" sel":""}" data-tab="sound">🔊 SOUND</button><button class="systab${tab==="help"?" sel":""}" data-tab="help">📜 HOW TO PLAY</button></div>
    <div class="sysbody" data-tab="${tab}">${tab==="sound"?soundHTML():helpHTML()}</div>
    <div class="btnrow"><button class="btn gold" id="sys-close">◀ Back</button></div></div></div>`;
  if(tab==="sound")bindSound();
  $("#modalLayer").querySelectorAll(".systab").forEach(b=>b.onclick=()=>{if(b.dataset.tab!==openSystem.last)openSystem(b.dataset.tab);});
  $("#sys-close").onclick=()=>{$("#modalLayer").innerHTML="";};
  $("#sysbg").onclick=e=>{if(e.target.id==="sysbg")$("#modalLayer").innerHTML="";};}
window.openSystem=openSystem;

/* ---- one "go back" used by Esc and the phone / browser Back button ---- */
const vis=e=>{if(!e||!e.isConnected)return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=="hidden";};
const BACKS=["#st-back","#sel-back","#ts-back","#tn-back","#on-back","#db-back","#tm-back"];
function modalBack(){const ml=$("#modalLayer");if(!ml||!ml.children.length)return null;
  for(const id of ["#sys-close","#btn-close-help","#snd-close","#cr-close"]){const b=ml.querySelector(id);if(vis(b))return b;}
  return [...ml.querySelectorAll("button")].find(b=>vis(b)&&/^\s*(◀\s*)?(close|cancel|back|keep playing|no)\b/i.test(b.textContent))||"stay";}
function goBack(){try{
  const op=window.__opening;if(op&&op.state==="run"&&op.skip){op.skip();return true;}
  const mb=modalBack();if(mb==="stay")return true;if(mb){mb.click();return true;}
  if(typeof CUR!=="undefined"&&CUR==="duel"){const q=$("#btn-quit");if(vis(q))q.click();return true;}
  for(const s of BACKS){const b=[...document.querySelectorAll(s)].find(vis);if(b){b.click();return true;}}
  if(typeof CUR!=="undefined"&&CUR!=="menu"){showScreen("menu");return true;}
  }catch(e){}return false;}
window.adcGoBack=goBack;
/* Esc: screens without their own Esc handler (select + stage already have one) */
document.addEventListener("keydown",e=>{if(e.key!=="Escape"||e.defaultPrevented)return;const t=e.target;if(t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName)&&t.type!=="range"&&t.type!=="checkbox")return;
  const ml=$("#modalLayer");const mb=modalBack();
  if(mb&&mb!=="stay"&&ml.querySelector("#sys-panel,#btn-close-help,#snd-close")){e.preventDefault();mb.click();return;}
  if(!ml.children.length&&typeof CUR!=="undefined"&&CUR!=="menu"&&CUR!=="duel"){const b=["#ts-back","#tn-back","#on-back","#tm-back","#db-back"].map(s=>$(s)).find(vis);if(b){e.preventDefault();b.click();}}});
/* phone / browser Back: keep one guard history entry while away from the main menu (or a panel is open),
   so Back steps back inside the game instead of leaving the page */
if(history.pushState){let armed=false;
  const arm=()=>{if(armed)return;try{history.pushState({adc:1},"");armed=true;}catch(e){}};
  const need=()=>(typeof CUR!=="undefined"&&CUR!=="menu")||($("#modalLayer")&&$("#modalLayer").children.length>0);
  const sS=showScreen;showScreen=function(n){const r=sS.apply(this,arguments);if(n!=="menu")arm();return r;};
  try{new MutationObserver(()=>{if(need())arm();}).observe($("#modalLayer"),{childList:true});}catch(e){}
  window.addEventListener("popstate",()=>{armed=false;goBack();setTimeout(()=>{if(need())arm();},350);});}
})();
/* ================= v15d attach: the opening itself lives in the early <script> right after <body> (see v15d). This part only
   hooks it to the game: keep the menu theme quiet while it is up, and add SYSTEM > OPENING. ================= */
(()=>{const V=window.__vidOP;if(!V)return;
try{if(V.state!=="off")AUDIO.music(null);}catch(e){}
const oS=window.openSystem;if(typeof oS==="function")window.openSystem=function(){const r=oS.apply(this,arguments);
  try{const row=document.querySelector("#sys-panel .btnrow");if(row&&!document.getElementById("sys-opening")){const b=document.createElement("button");b.className="btn";b.id="sys-opening";b.textContent="▶ OPENING";b.onclick=()=>V.play();row.insertBefore(b,row.firstChild);}}catch(e){}return r;};
})();

/* ================= v9g: title OPENING SCENE (black -> light streak + anime spell circle charge-up (canvas) -> flash -> slam + shine + burst -> CHRONICLES letters -> menu)
   Plays once per load on the title screen; any click/tap/key skips it (v12: that press never reaches the menu buttons). Without unlocked audio it shows PRESS ANY KEY first.
   Test hook: ?nointro skips it, and automated browsers (navigator.webdriver) skip it unless ?intro is in the URL. ================= */
(()=>{
const css=`
body.op-on #menu .bgfx,body.op-on #menu .menuport,body.op-on #menu .menubtns,body.op-on #menu .ver{opacity:0!important;transition:none!important}
body.op-on #menu .logo h1,body.op-on #menu .logo h2 .opl,body.op-on #menu .logo .tag{opacity:0}
body.op-on .op-hide{visibility:hidden!important}
body.op-on #menu .menubtns,body.op-on #menu .menubtns *,body.op-guard #menu .menubtns,body.op-guard #menu .menubtns *,body.op-on .op-hide{pointer-events:none!important}
body.op-fade #menu .bgfx,body.op-fade #menu .menuport,body.op-fade #menu .menubtns,body.op-fade #menu .ver{animation:opIn 1.1s ease-out both}
#menu .menubtns,#menu .ver{animation-fill-mode:both}
@keyframes opIn{from{opacity:0;filter:blur(6px)}to{opacity:1;filter:none}}
#opstage{position:absolute;inset:0;z-index:2;pointer-events:none;background:#000;transition:background 1.2s ease}
#opstage.lift{background:transparent}
#oppress{position:absolute;left:0;right:0;top:58%;text-align:center;font:bold 18px/1 "Trebuchet MS",sans-serif;letter-spacing:8px;color:#e9d9ff;
  text-shadow:0 0 12px #9b5fff;animation:opPulse 1.6s ease-in-out infinite}
@keyframes opPulse{0%,100%{opacity:.25}50%{opacity:1}}
#opspell{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}
#opflash{position:fixed;inset:0;z-index:9999;pointer-events:none;background:radial-gradient(circle at 50% 22%,#fff 0,#fff8e0 35%,#ffd36b 70%,#ff9a3c);opacity:0}
#opflash.go{animation:opFlash .55s ease-out forwards}
@keyframes opFlash{0%{opacity:0}12%{opacity:1}100%{opacity:0}}
#menu .logo h1.opslam{opacity:1;animation:opSlam .55s cubic-bezier(.17,.89,.32,1.28) both,opShine 1.1s .45s ease-in-out both;
  background:linear-gradient(100deg,#ffd36b 0%,#fff6d0 30%,#ff9a3c 40%,#ffd36b 44%,#ffffff 50%,#fff6d0 53%,#ffd36b 58%,#ff9a3c 70%,#ffd36b 100%);background-size:300% 100%;-webkit-background-clip:text;background-clip:text}
@keyframes opSlam{0%{transform:scale(3.2);opacity:0;filter:blur(14px)}60%{opacity:1;filter:blur(0)}100%{transform:scale(1);opacity:1}}
@keyframes opShine{from{background-position:100% 0}to{background-position:0% 0}}
#menu .logo h1.opslam{filter:drop-shadow(0 0 16px rgba(255,190,80,.75)) drop-shadow(0 4px 0 #5a2a00)} /* lighter glow chain while the shine sweeps (keeps frames short) */
#menu .logo h1.opshown{opacity:1!important}
#menu.opshake{animation:opShake .45s linear}
@keyframes opShake{0%,100%{transform:none}15%{transform:translate(-9px,5px)}30%{transform:translate(8px,-6px)}45%{transform:translate(-6px,-3px)}60%{transform:translate(5px,4px)}80%{transform:translate(-2px,1px)}}
.opp{position:absolute;left:50%;top:calc(110px + 48px);width:6px;height:6px;margin:-3px;border-radius:50%;background:#fff3c4;box-shadow:0 0 8px 2px #ffb44a;z-index:4;pointer-events:none;
  animation:opP var(--t) cubic-bezier(.1,.7,.3,1) forwards}
@keyframes opP{from{transform:translate(0,0) scale(1.4);opacity:1}to{transform:translate(var(--x),var(--y)) scale(.2);opacity:0}}
#menu .logo h2 .opl{display:inline-block}
#menu .logo h2 .opl.in{animation:opLetter .45s cubic-bezier(.2,.9,.3,1.3) both}
@keyframes opLetter{from{opacity:0;transform:translateY(-26px) scale(1.8);filter:blur(5px);text-shadow:0 0 30px #fff}to{opacity:1;transform:none;filter:none}}
#menu .logo .tag.in{animation:opTag .9s ease-out both}
@keyframes opTag{from{opacity:0;letter-spacing:12px}to{opacity:.7;letter-spacing:3px}}

#menu .opports{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:0;transition:opacity 1.4s ease}
#menu .opports.in{opacity:1}
#menu .opc{position:absolute;top:13%;height:62%;width:14.5%;perspective:1400px}
#menu .opci{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.45,.05,.25,1)}
#menu .opf{position:absolute;inset:0;border-radius:14px;overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;
  background:#1a0f33 center 18%/cover no-repeat;border:2px solid #c98a3d88;box-shadow:0 0 28px #0009,inset 0 0 40px #000a;
  filter:brightness(.5) saturate(.85) blur(.6px)}
#menu .opf::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#1a0f3355 0%,transparent 35%,#1a0f33cc 85%,#1a0f33 100%)}
#menu .opf.b{transform:rotateY(180deg)}
#menu .opc.mid .opf{filter:brightness(.42) saturate(.8) blur(1.2px)}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const menu=$("#menu");
if(!menu||typeof CUR==="undefined"||CUR!=="menu")return; // only when the game opens on the title
const Q=location.search||"",SKIP=/[?&]nointro\b/.test(Q)||(navigator.webdriver&&!/[?&]intro\b/.test(Q));
const OP=window.__opening={state:SKIP?"done":"wait",t0:0,timers:[],skipped:SKIP,maxFrame:0,frames:0,longFrames:0};

// ---- 6 portrait panels behind the logo; every 3 s they flip in a domino wave to new random duelists
const PSLOTS=[{l:1.5,c:""},{l:18,c:""},{l:34.5,c:"mid"},{l:51,c:"mid"},{l:67.5,c:""},{l:84,c:""}];
const pool=()=>CHAR_ORDER.filter(c=>CHARS[c]&&PORTRAITS[CHARS[c].img]);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const pimg=c=>`url('${PORTRAITS[CHARS[c].img]}')`;
const PP=window.__opPorts={shown:shuffle(pool()).slice(0,PSLOTS.length),rot:PSLOTS.map(()=>0),last:-1,flips:0,timer:null};
const ports=document.createElement("div");ports.className="opports";
ports.innerHTML=PSLOTS.map((p,i)=>`<div class="opc ${p.c}" style="left:${p.l}%"><div class="opci"><div class="opf a" style="background-image:${pimg(PP.shown[i])}"></div><div class="opf b"></div></div></div>`).join("");
menu.insertBefore(ports,menu.firstChild);
function flipOne(){if(typeof CUR!=="undefined"&&CUR!=="menu"||document.hidden)return;
  // domino wave: panels flip one after another 150 ms apart, alternating direction each cycle (first wave left-to-right); the new set never shares a duelist with the current one
  let free=shuffle(pool().filter(c=>!PP.shown.includes(c)));if(free.length<PSLOTS.length)free=free.concat(shuffle(pool().filter(c=>!free.includes(c)))).slice(0,PSLOTS.length);
  const next=free.slice(0,PSLOTS.length);PP.flips++;
  [...ports.children].forEach((panel,i)=>{const inner=panel.querySelector(".opci");PP.rot[i]+=180;
    const hidden=panel.querySelector((PP.rot[i]/180)%2?".opf.b":".opf.a");hidden.style.backgroundImage=pimg(next[i]);
    const k=PP.flips%2?i:PSLOTS.length-1-i;setTimeout(()=>{inner.style.transform=`rotateY(${PP.rot[i]}deg)`;},k*150);});
  PP.shown=next;}
function portsIn(){ports.classList.add("in");if(!PP.timer)PP.timer=setTimeout(()=>{flipOne();PP.timer=setInterval(flipOne,3000);},1500);}
if(SKIP){portsIn();return;}

const logo=menu.querySelector(".logo"),h1=logo.querySelector("h1"),h2=logo.querySelector("h2"),tag=logo.querySelector(".tag");
h2.innerHTML=[...h2.textContent].map(ch=>`<span class="opl">${ch}</span>`).join(""); // CHRONICLES letter by letter
// hide screen-level UI that sits outside #menu (speaker, settings) during the opening
const extras=[...document.querySelectorAll("body > *")].filter(e=>e!==menu&&!e.contains(menu)&&e.id!=="modalLayer"&&getComputedStyle(e).position==="fixed");
extras.forEach(e=>e.classList.add("op-hide"));
document.body.classList.add("op-on");
const stage=document.createElement("div");stage.id="opstage";menu.appendChild(stage);
const flash=document.createElement("div");flash.id="opflash";document.body.appendChild(flash);

// ---- anime-style spell circle (one canvas): streak -> counter-rotating rings + original procedural runes + hexagram draw in ->
//      light pillars, rune/sparkle particles spiralling inward, charge glow -> boom at the slam. Layers are pre-rendered once.
const SPELL={cv:null,g:null,L:null,raf:0,t0:0,boom:0,parts:[],W:0,H:0,R:0,cx:0,cy:0,tilt:.48,d:1};
const SLAM=1900; // ms after the spell starts
function rng(s){return()=>(s=(s*1664525+1013904223)>>>0)/4294967296;}
function runePath(g,r,size){ // original glyph: 2-4 strokes on a 3x3 grid, optional stem / ring / dot
  const u=size/2,P=()=>[(Math.floor(r()*3)-1)*u*.7,(Math.floor(r()*3)-1)*u];
  if(r()<.5){g.moveTo(0,-u);g.lineTo(0,u);}
  const k=2+Math.floor(r()*3);for(let i=0;i<k;i++){const a=P(),b=P();if(a[0]===b[0]&&a[1]===b[1])continue;g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);}
  if(r()<.3){const y=(Math.floor(r()*3)-1)*u*.8;g.moveTo(u*.28,y);g.arc(0,y,u*.28,0,Math.PI*2);}
  if(r()<.35){const y=r()<.5?-u*1.25:u*1.25;g.moveTo(u*.08,y);g.arc(0,y,u*.08,0,Math.PI*2);}}
function layer(S,d,draw){const c=document.createElement("canvas");c.width=c.height=Math.ceil(S*d);const g=c.getContext("2d");g.scale(d,d);g.translate(S/2,S/2);g.lineCap="round";g.lineJoin="round";draw(g);return c;}
function glowStroke(g,path,w,col,glow){g.save();g.beginPath();path();g.shadowColor=glow;g.shadowBlur=w*6;g.strokeStyle=col;g.lineWidth=w;g.stroke();g.shadowBlur=0;g.strokeStyle="rgba(255,252,236,.95)";g.lineWidth=w*.42;g.stroke();g.restore();}
const circ=(g,r)=>{g.moveTo(r,0);g.arc(0,0,r,0,Math.PI*2);};
const poly=(g,r,n,rot,step)=>{step=step||1;for(let i=0;i<=n;i++){const a=rot+(i*step%n)/n*Math.PI*2;i?g.lineTo(Math.cos(a)*r,Math.sin(a)*r):g.moveTo(Math.cos(a)*r,Math.sin(a)*r);}};
function buildSpell(){if(SPELL.cv)return;const W=menu.clientWidth||innerWidth,H=menu.clientHeight||innerHeight,d=Math.min(devicePixelRatio||1,1.5);
  const cv=document.createElement("canvas");cv.id="opspell";cv.width=Math.round(W*d);cv.height=Math.round(H*d);stage.appendChild(cv);
  const R=Math.min(W*.27,H*.47),S=Math.ceil(2*R+48),r=rng(9137),GOLD="#ffc95a",GL="#ffa632",VIO="#d4b2ff",VG="#9b5fff";
  Object.assign(SPELL,{cv,g:cv.getContext("2d"),W,H,R,S,d,cx:W/2,cy:H*.6});
  SPELL.L=[
   {img:layer(S,d,g=>{glowStroke(g,()=>{circ(g,R);circ(g,R*.955);for(let i=0;i<120;i++){const a=i/120*Math.PI*2,l=i%5?R*.975:R*.955;g.moveTo(Math.cos(a)*l,Math.sin(a)*l);g.lineTo(Math.cos(a)*R,Math.sin(a)*R);}
       for(let i=0;i<8;i++){const a=i/8*Math.PI*2,x=Math.cos(a)*(R+12),y=Math.sin(a)*(R+12);g.moveTo(x+Math.cos(a)*9,y+Math.sin(a)*9);g.lineTo(x+Math.cos(a+1.57)*5,y+Math.sin(a+1.57)*5);g.lineTo(x-Math.cos(a)*9,y-Math.sin(a)*9);g.lineTo(x-Math.cos(a+1.57)*5,y-Math.sin(a+1.57)*5);g.closePath();}},2.2,GOLD,GL);}),sp:.32,dir:1,s:150,dd:600},
   {img:layer(S,d,g=>{glowStroke(g,()=>{circ(g,R*.9);circ(g,R*.755);},1.8,GOLD,GL);
       glowStroke(g,()=>{const n=40;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;g.save();g.rotate(a+Math.PI/2);g.translate(0,-R*.828);runePath(g,r,R*.075);g.restore();
       }},1.5,"#ffe39a",GL);}),sp:.55,dir:-1,s:300,dd:650},
   {img:layer(S,d,g=>{glowStroke(g,()=>{circ(g,R*.72);poly(g,R*.72,3,-Math.PI/2);poly(g,R*.72,3,Math.PI/2);circ(g,R*.5);poly(g,R*.5,6,0);
       for(let i=0;i<6;i++){const a=-Math.PI/2+i/6*Math.PI*2,x=Math.cos(a)*R*.72,y=Math.sin(a)*R*.72;g.moveTo(x+R*.055,y);g.arc(x,y,R*.055,0,Math.PI*2);g.moveTo(0,0);g.lineTo(Math.cos(a)*R*.5,Math.sin(a)*R*.5);}},1.9,GOLD,GL);}),sp:.22,dir:1,s:450,dd:650},
   {img:layer(S,d,g=>{glowStroke(g,()=>{circ(g,R*.31);circ(g,R*.19);poly(g,R*.17,8,0,3);},1.7,VIO,VG);
       glowStroke(g,()=>{const n=18;for(let i=0;i<n;i++){g.save();g.rotate(i/n*Math.PI*2+Math.PI/2);g.translate(0,-R*.25);runePath(g,r,R*.05);g.restore();}},1.2,VIO,VG);}),sp:.9,dir:-1,s:550,dd:550}];
  // sprites for the particles: a soft sparkle and 8 small runes
  const sp=document.createElement("canvas");sp.width=sp.height=32;const sg=sp.getContext("2d"),gr=sg.createRadialGradient(16,16,0,16,16,16);
  gr.addColorStop(0,"rgba(255,255,240,1)");gr.addColorStop(.25,"rgba(255,214,120,.8)");gr.addColorStop(1,"rgba(255,160,50,0)");sg.fillStyle=gr;sg.fillRect(0,0,32,32);SPELL.spark=sp;
  SPELL.runes=[...Array(8)].map(()=>layer(26,d,g=>glowStroke(g,()=>runePath(g,r,11),1.4,"#ffe39a",GL)));
  SPELL.parts=[...Array(90)].map((_,i)=>({a:Math.random()*6.283,r:R*(.75+Math.random()*.8),w:1.4+Math.random()*1.8,v:R*(.22+Math.random()*.35),k:i%3?-1:i%8,z:.5+Math.random()*.9}));}
const clamp=x=>x<0?0:x>1?1:x,ease=x=>1-Math.pow(1-clamp(x),3);
function drawSpell(now){const S=SPELL;if(!S.cv)return;const g=S.g,t=now-S.t0,{W,H,R,cx,cy,tilt,d}=S;
  if(S.last){const dt=now-S.last;OP.frames++;if(dt>OP.maxFrame)OP.maxFrame=Math.round(dt);if(dt>50){OP.longFrames++;(OP.long=OP.long||[]).push([Math.round(now-S.t0),Math.round(dt)]);}}const dt=S.last?Math.min(.05,(now-S.last)/1000):0;S.last=now;
  const boom=t>SLAM?clamp((t-SLAM)/650):0;if(boom>=1){S.cv.remove();S.cv=null;return;}
  g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,W,H);g.globalCompositeOperation="lighter";
  const c=Math.pow(clamp((t-600)/(SLAM-600)),1.5),fade=1-boom,bs=1+boom*1.5;
  // light streak along the circle's horizon
  if(t<520){const p=ease(t/320),a=t<300?1:1-(t-300)/220,gw=W*p,hg=g.createLinearGradient(cx-gw/2,0,cx+gw/2,0);
    hg.addColorStop(0,"rgba(255,170,60,0)");hg.addColorStop(.5,`rgba(255,250,230,${a})`);hg.addColorStop(1,"rgba(255,170,60,0)");g.fillStyle=hg;g.fillRect(cx-gw/2,cy-2,gw,4);g.globalAlpha=a*.35;g.fillRect(cx-gw/2,cy-10,gw,20);g.globalAlpha=1;}
  // ground glow (charge-up)
  g.save();g.translate(cx,cy);g.scale(bs,tilt*bs);const gg=g.createRadialGradient(0,0,0,0,0,R*1.15);const ga=(.12+.6*c)*fade*clamp(t/500);
  gg.addColorStop(0,`rgba(255,236,190,${ga})`);gg.addColorStop(.45,`rgba(255,170,70,${ga*.55})`);gg.addColorStop(1,"rgba(150,70,255,0)");g.fillStyle=gg;g.beginPath();g.arc(0,0,R*1.15,0,6.283);g.fill();g.restore();
  // counter-rotating ring layers, each drawn in with a sweeping reveal
  const fl=.9+.1*Math.sin(t*.05);
  S.L.forEach((L,i)=>{const p=clamp((t-L.s)/L.dd);if(p<=0)return;const ang=L.dir*(L.sp*t/1000+1.6*c*c);
    g.save();g.translate(cx,cy);g.scale(bs,tilt*bs);g.rotate(ang);
    if(p<1){g.beginPath();g.moveTo(0,0);g.arc(0,0,S.S,-Math.PI/2,-Math.PI/2+ease(p)*6.283);g.closePath();g.clip();}
    g.globalAlpha=(.72+.28*c)*fl*fade;g.drawImage(L.img,-S.S/2,-S.S/2,S.S,S.S);
    if(c>.25&&(i===1||i===3)){g.globalAlpha=(c-.25)*.8*fade;g.drawImage(L.img,-S.S/2,-S.S/2,S.S,S.S);} // runes blaze brighter as it charges
    g.restore();});
  // light pillars rising from the hexagram points + central beam
  const hang=S.L[2].sp*t/1000+1.6*c*c;
  for(let k=0;k<6;k++){const rise=ease((t-700-k*70)/650);if(rise<=0)continue;const a=-Math.PI/2+k/6*6.283+hang,px=cx+Math.cos(a)*R*.72*bs,py=cy+Math.sin(a)*R*.72*tilt*bs,
    h=(py+20)*rise,w=(5+9*c)*(1+boom),al=(.45+.5*c)*fade*(.85+.15*Math.sin(t*.03+k));
    const pg=g.createLinearGradient(0,py,0,py-h);pg.addColorStop(0,`rgba(255,246,215,${al})`);pg.addColorStop(.6,`rgba(255,190,90,${al*.45})`);pg.addColorStop(1,"rgba(255,150,60,0)");
    g.fillStyle=pg;g.fillRect(px-w/2,py-h,w,h);g.globalAlpha=.25;g.fillRect(px-w*2,py-h,w*4,h);g.globalAlpha=1;}
  if(t>1000){const b=ease((t-1000)/700)*fade,w=W*(.012+.06*c),bg=g.createLinearGradient(cx-w,0,cx+w,0);
    bg.addColorStop(0,"rgba(255,170,70,0)");bg.addColorStop(.5,`rgba(255,248,225,${.75*b})`);bg.addColorStop(1,"rgba(255,170,70,0)");g.fillStyle=bg;g.fillRect(cx-w,0,w*2,cy);}
  const orb=(18+70*c)*(1+boom*2),og=g.createRadialGradient(cx,cy,0,cx,cy,orb);og.addColorStop(0,`rgba(255,255,245,${(.5+.5*c)*fade})`);og.addColorStop(.4,`rgba(255,200,110,${.5*c*fade})`);og.addColorStop(1,"rgba(255,140,40,0)");
  if(t>500){g.fillStyle=og;g.fillRect(cx-orb,cy-orb,orb*2,orb*2);}
  // sparkles + rune particles spiralling inward
  const live=Math.floor(S.parts.length*clamp((t-250)/900));
  for(let i=0;i<live;i++){const q=S.parts[i];q.a+=q.w*dt*(1+1.5*c);q.r-=q.v*dt*(1+2.2*c);
    if(q.r<R*.06){if(t<SLAM-250){q.r=R*(1.05+Math.random()*.45);q.a=Math.random()*6.283;}else continue;}
    const rr=q.r*bs,x=cx+Math.cos(q.a)*rr,y=cy+Math.sin(q.a)*rr*tilt-(1-q.r/R)*R*.12,al=clamp(q.r/(R*.25))*fade*clamp((R*1.45-q.r)/(R*.3));
    g.globalAlpha=al;const s=q.k<0?10*q.z:13*q.z;g.drawImage(q.k<0?S.spark:S.runes[q.k],x-s,y-s,s*2,s*2);}
  g.globalAlpha=1;g.globalCompositeOperation="source-over";
  S.raf=requestAnimationFrame(drawSpell);}
function startSpell(){buildSpell();SPELL.t0=performance.now();SPELL.last=0;cancelAnimationFrame(SPELL.raf);SPELL.raf=requestAnimationFrame(drawSpell);}
function stopSpell(){cancelAnimationFrame(SPELL.raf);if(SPELL.cv){SPELL.cv.remove();SPELL.cv=null;}}

// ---- rising synth whoosh for the charge-up (WebAudio, no samples), cut at the slam
let WH=null;
function whoosh(dur){try{const c=AUDIO.ctx;if(!c||c.state!=="running")return null;const S=AUDIO.set||{},vol=S.mute?0:(S.sfx==null?1:S.sfx);if(vol<=0)return null;
  const t=c.currentTime+.01,out=c.createGain();out.gain.value=vol*.75;out.connect(c.destination);
  const n=Math.floor(c.sampleRate*(dur+.5)),buf=c.createBuffer(1,n,c.sampleRate),dd=buf.getChannelData(0);for(let i=0;i<n;i++)dd[i]=Math.random()*2-1;
  const src=c.createBufferSource();src.buffer=buf;const bp=c.createBiquadFilter();bp.type="bandpass";bp.Q.value=1.3;bp.frequency.setValueAtTime(240,t);bp.frequency.exponentialRampToValueAtTime(5200,t+dur);
  const ng=c.createGain();ng.gain.setValueAtTime(.0001,t);ng.gain.exponentialRampToValueAtTime(.34,t+dur);src.connect(bp);bp.connect(ng);ng.connect(out);
  const lp=c.createBiquadFilter();lp.type="lowpass";lp.Q.value=7;lp.frequency.setValueAtTime(260,t);lp.frequency.exponentialRampToValueAtTime(4200,t+dur);
  const og=c.createGain();og.gain.setValueAtTime(.0001,t);og.gain.exponentialRampToValueAtTime(.09,t+dur);lp.connect(og);og.connect(out);
  const osc=[["sawtooth",110,880,-8],["sawtooth",110,880,8],["triangle",55,440,0],["sine",440,1760,0]].map(([ty,f0,f1,det])=>{const o=c.createOscillator();o.type=ty;o.detune.value=det;
    o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);o.connect(lp);o.start(t);return o;});
  src.start(t);
  return{stop(){const e=c.currentTime;out.gain.cancelScheduledValues(e);out.gain.setValueAtTime(out.gain.value,e);out.gain.setTargetAtTime(0,e,.035);
    [src,...osc].forEach(o=>{try{o.stop(e+.35);}catch(_){}});setTimeout(()=>{try{out.disconnect();}catch(_){}},600);}};}catch(e){return null;}}

const unlocked=()=>{try{return AUDIO.ctx&&AUDIO.ctx.state==="running"||AUDIO.unlocked;}catch(e){return false;}};
try{AUDIO.music(null);}catch(e){}  // the menu theme waits for the slam
const at=(ms,f)=>OP.timers.push(setTimeout(()=>{if(OP.state!=="run")return;if(CUR!=="menu")return finish();f();},ms));
const sfx=n=>{try{AUDIO.play(n);}catch(e){}};
function burst(){const r=h1.getBoundingClientRect(),m=menu.getBoundingClientRect();
  for(let i=0;i<46;i++){const a=Math.random()*Math.PI*2,d=160+Math.random()*420,p=document.createElement("div");p.className="opp";
    p.style.left=(r.left-m.left+r.width*(.1+.8*Math.random()))+"px";p.style.top=(r.top-m.top+r.height/2)+"px";
    p.style.setProperty("--x",(Math.cos(a)*d).toFixed(0)+"px");p.style.setProperty("--y",(Math.sin(a)*d*.6).toFixed(0)+"px");p.style.setProperty("--t",(0.7+Math.random()*0.9).toFixed(2)+"s");
    menu.appendChild(p);setTimeout(()=>p.remove(),1800);}}
function letters(){h2.querySelectorAll(".opl").forEach((s,i)=>at(i*75,()=>s.classList.add("in")));}
const SL=800+SLAM; // logo slam, ms after the press
function run(){if(OP.state!=="wait")return;OP.state="run";OP.t0=performance.now();const pr=$("#oppress");if(pr)pr.remove();buildSpell();
  at(800,()=>{startSpell();sfx("spell");WH=whoosh(SLAM/1000);});
  at(SL,()=>{if(WH){WH.stop();WH=null;}flash.classList.add("go");h1.classList.add("opslam");menu.classList.add("opshake");burst();sfx("fusion");try{AUDIO.music("menu");}catch(e){}});
  at(SL+750,letters);
  at(SL+1100,()=>{portsIn();stage.classList.add("lift");});
  at(SL+1600,()=>{h1.classList.add("opshown");h1.classList.remove("opslam");}); // drop the gradient-clipped text once the shine has passed (cheaper to paint)
  at(SL+1700,()=>tag.classList.add("in"));
  at(SL+2000,()=>{document.body.classList.add("op-fade");document.body.classList.remove("op-on");stage.classList.add("lift");});
  at(SL+3200,finish);}
function finish(){if(OP.state==="done")return;OP.timers.forEach(clearTimeout);OP.state="done";stopSpell();if(WH){WH.stop();WH=null;}
  document.body.classList.remove("op-on");stage.remove();flash.remove();menu.classList.remove("opshake");
  h1.classList.remove("opslam","opshown");h2.textContent="CHRONICLES";tag.classList.remove("in");extras.forEach(e=>e.classList.remove("op-hide"));
  setTimeout(()=>document.body.classList.remove("op-fade"),1200);
  portsIn();
  try{if(CUR==="menu")AUDIO.music("menu");}catch(e){}
  OP.guardUntil=performance.now()+GUARD;document.body.classList.add("op-guard");clearTimeout(unT);unT=setTimeout(unguard,GUARD+20);}
/* v12 fix (click-through): a tap/click/key meant for the intro used to fall through to the (invisible, opacity 0 but still
   clickable) menu buttons underneath, so the first tap opened Duel / Deck Builder / Online. Now every pointer, mouse, touch,
   click and key event is swallowed in the window capture phase while the intro is up and for GUARD ms after it ends; the
   intro itself only reacts to pointerdown/keydown (start or skip). The audio unlock listener (i_audio.js, registered earlier
   on window) still sees the first press. */
const GUARD=380;OP.guardUntil=0;OP.blocked=0;OP.down=false;OP.downAt=0;
const isDown=()=>OP.down&&performance.now()-OP.downAt<4000; // safety: a lost pointerup never locks the menu for more than 4 s
const blocking=()=>OP.state!=="done"||isDown()||performance.now()<OP.guardUntil;
const BLOCK_EVS=["click","dblclick","auxclick","contextmenu","mousedown","mouseup","pointerup","pointercancel","touchstart","touchend","touchcancel","touchmove","keyup","keypress"];
const UP={pointerup:1,pointercancel:1,touchend:1,touchcancel:1,mouseup:1};
function swallow(e){if(!blocking())return;
  if(UP[e.type]&&OP.down){OP.down=false;if(OP.state==="done")OP.guardUntil=Math.max(OP.guardUntil,performance.now()+GUARD);} // a long press that skipped the intro: keep the guard until release + GUARD
  if(e.type==="touchmove"){if(e.cancelable)e.preventDefault();return;}
  if(e.cancelable)e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();OP.blocked++;}
BLOCK_EVS.forEach(t=>addEventListener(t,swallow,{capture:true,passive:false}));
let unT=0;
function unguard(){if(blocking()){unT=setTimeout(unguard,Math.max(30,OP.guardUntil-performance.now()+20));return;}
  BLOCK_EVS.forEach(t=>removeEventListener(t,swallow,{capture:true}));removeEventListener("keydown",onKey,true);removeEventListener("pointerdown",onKey,true);
  document.body.classList.remove("op-guard");}
function onKey(e){if(OP.state==="done"&&!blocking())return;
  if(e.type==="pointerdown"){OP.down=true;OP.downAt=performance.now();}
  if(e.cancelable)e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();OP.blocked++;
  if(OP.state==="wait"){run();return;}if(OP.state==="run")finish();}
addEventListener("keydown",onKey,true);addEventListener("pointerdown",onKey,true);
OP.skip=finish;OP.start=run;
function begin(){if(window.__vidOP&&window.__vidOP.state!=="off"){window.__vidOP.after=begin;return;}if(OP.state!=="wait")return;if(CUR!=="menu")return finish();if(unlocked())run();else if(!$("#oppress"))stage.insertAdjacentHTML("beforeend",`<div id="oppress">PRESS ANY KEY</div>`);}
if(document.readyState==="complete")begin();else addEventListener("load",begin,{once:true});
})();
/* ================= ONLINE DUEL: styles (net_css.js) — injected at runtime so a_head.html needs no edit ================= */
(function(){const css=`
#online{display:none}
#online.on{display:block}
#online .selhead{top:22px}
.onbody{position:absolute;left:50%;top:120px;transform:translateX(-50%);width:1160px;height:640px}
.onrow{display:flex;gap:24px;justify-content:center}
.oncard{background:linear-gradient(160deg,rgba(43,32,80,.92),rgba(22,15,44,.95));border:1px solid #ffd36b55;border-radius:16px;padding:20px 24px;box-shadow:0 14px 40px #000a}
.oncard h3{margin:0 0 10px;color:#ffd36b;letter-spacing:2px;font-size:18px}
.oncard p{margin:6px 0;font-size:13px;opacity:.85;line-height:1.45}
.oncard input[type=text],.oncard input:not([type]),.oncard select{background:#0d0920;border:1px solid #ffd36b66;color:#fff;border-radius:8px;padding:8px 10px;font-size:15px;font-weight:bold}
.oncard select{font-size:13px;padding:6px 8px}
.oncode{font-family:"Courier New",monospace;font-size:64px;letter-spacing:14px;color:#fff;text-shadow:0 0 18px #ffd36b;text-align:center;margin:10px 0 6px;user-select:all}
.oninput-code{font-family:"Courier New",monospace;font-size:28px!important;letter-spacing:8px;width:220px;text-transform:uppercase;text-align:center}
.onstatus{margin-top:14px;text-align:center;font-size:13px;min-height:20px;color:#bfe3ff}
.onstatus.err{color:#ff8a8a}
.onspin{display:inline-block;width:14px;height:14px;border:3px solid #ffd36b55;border-top-color:#ffd36b;border-radius:50%;animation:onspin 1s linear infinite;vertical-align:-2px;margin-right:6px}
@keyframes onspin{to{transform:rotate(360deg)}}
.onsmall{font-size:11px;opacity:.6}
.onlink{color:#ffd36b;cursor:pointer;text-decoration:underline}
.onadv{margin-top:10px;font-size:12px;display:none;gap:6px;flex-wrap:wrap;align-items:center}
.onadv.open{display:flex}
.onadv input{font-size:12px!important;padding:4px 6px!important;width:140px}
.ntiles{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
.ntile{position:relative;height:82px;border-radius:10px;overflow:hidden;cursor:pointer;border:2px solid #ffffff22;background:#140f26}
.ntile img{width:100%;height:100%;object-fit:cover;object-position:50% 18%;opacity:.75;transition:opacity .15s}
.ntile span{position:absolute;left:0;right:0;bottom:0;font-size:10px;font-weight:bold;text-align:center;background:#000a;padding:2px 0}
.ntile:hover img{opacity:1}
.ntile.sel{border-color:#ffd36b;box-shadow:0 0 14px #ffd36b}
.ntile.sel img{opacity:1}
.ntile.lock{cursor:default}
.npick{display:flex;gap:18px}
.npick .mine{flex:1.55}
.npick .theirs{flex:1;display:flex;flex-direction:column;gap:10px}
.nportrait{height:230px;border-radius:12px;overflow:hidden;background:#0d0920;display:flex;align-items:center;justify-content:center;border:2px solid var(--c,#ffffff33);position:relative}
.nportrait img{width:100%;height:100%;object-fit:cover;object-position:50% 15%}
.nportrait .q{font-size:90px;opacity:.3}
.nready{position:absolute;right:8px;top:8px;padding:4px 10px;border-radius:8px;font-weight:bold;font-size:12px;background:#5a2a2a}
.nready.ok{background:#1d8f4c;box-shadow:0 0 12px #3fdc84}
.nfield{display:flex;gap:10px;align-items:center;margin:8px 0;font-size:13px}
.nfield label{width:92px;opacity:.8}
.nopts{margin-top:8px;padding-top:8px;border-top:1px solid #ffffff1a}
.nbig{font-size:18px!important;padding:12px 26px!important}
.nconn{font-size:12px;opacity:.85}
.nconn b{color:#3fdc84}
#duel #netHud{display:none}
#duel.net #netHud{display:flex}
#netHud{flex-direction:column;gap:6px;margin-top:8px;align-items:stretch}
#netHud .nh-timer{text-align:center;font-weight:bold;font-size:13px;background:#0008;border-radius:8px;padding:5px 4px;border:1px solid #ffffff22}
#netHud .nh-timer.low{color:#ff6b6b;border-color:#ff6b6b;animation:nhpulse .8s infinite}
@keyframes nhpulse{50%{box-shadow:0 0 12px #ff6b6b}}
#netHud .nh-emotes{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px}
#netHud .nh-emotes .btn{padding:4px 2px;font-size:10px}
#netHud .nh-row{display:flex;gap:4px}
#netHud .nh-row .btn{flex:1;padding:4px 2px;font-size:11px}
#netHud .nh-conn{font-size:10px;text-align:center;opacity:.75}
#netHud .nh-conn.bad{color:#ff8a8a;opacity:1}
#netHud .nh-conn.slow{color:#ffc46b;opacity:1}
#duel.net #coin{display:none}
.bubble.emote{background:#ffe9a8;border-style:dashed}
.bubble.emote.player{bottom:205px}
.bubble.emote.enemy{top:96px}
#netWait{position:absolute;left:50%;top:8px;transform:translateX(-50%);z-index:79;background:linear-gradient(180deg,#2b2050,#160f2c);border:1px solid #ffd36b;border-radius:12px;padding:8px 18px;font-weight:bold;font-size:14px;box-shadow:0 6px 24px #000c;display:none;pointer-events:none}
#netWait.on{display:block}
#netDc{position:absolute;inset:0;z-index:97;background:rgba(5,3,12,.8);display:none;align-items:center;justify-content:center}
#netDc.on{display:flex}
#netDc .box{background:linear-gradient(160deg,#2b2050,#160f2c);border:1px solid #ff6b6b;border-radius:16px;padding:24px 30px;text-align:center;max-width:520px;box-shadow:0 20px 60px #000c}
#netDc h2{margin:0 0 8px;color:#ff9a9a}
#netDc .cd{font-size:40px;font-weight:bold;margin:8px 0;color:#fff}
.nettimer{margin:10px auto 0;width:80%;display:flex;align-items:center;gap:10px;font-size:12px;opacity:.9}
.nettimer .bar{flex:1;height:8px;border-radius:4px;background:#ffffff22;overflow:hidden}
.nettimer .bar i{display:block;height:100%;background:linear-gradient(90deg,#ff6b6b,#ffd36b);width:100%}
#net-rmstat{font-size:12px;opacity:.85;align-self:center}
.oncredits{font-size:12px;line-height:1.5;white-space:pre-wrap;max-height:520px;overflow:auto;background:#0006;padding:10px;border-radius:8px}
`;const st=document.createElement("style");st.id="net-css";st.textContent=css;document.head.appendChild(st);})();


;window.__adcMainDone=1;
