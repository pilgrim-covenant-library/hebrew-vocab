#!/usr/bin/env python3
"""
Fetch Hebrew vocabulary from online sources and transform to app format.

Sources:
- OpenScriptures Strong's Hebrew Dictionary (primary)
- Frequency data from corpus analysis

Output: src/data/vocabulary.json
"""

import json
import re
import urllib.request
from typing import Any

# URLs
OPENSCRIPTURES_URL = "https://raw.githubusercontent.com/openscriptures/strongs/master/hebrew/strongs-hebrew-dictionary.js"

# Frequency data from Hebrew OT corpus (based on standard BHS frequency lists)
# This is a curated list of the most common Hebrew words with their frequencies
FREQUENCY_DATA = {
    # Tier 1: freq >= 500 (most common ~100 words)
    "H3068": 6828,  # יְהוָה YHWH
    "H430": 2602,   # אֱלֹהִים elohim
    "H559": 5316,   # אָמַר amar (say)
    "H1121": 4932,  # בֵּן ben (son)
    "H776": 2505,   # אֶרֶץ erets (land)
    "H3605": 5415,  # כֹּל kol (all)
    "H1": 1210,     # אָב ab (father)
    "H802": 781,    # אִשָּׁה ishshah (woman)
    "H3117": 2304,  # יוֹם yom (day)
    "H5971": 1869,  # עַם am (people)
    "H1004": 2055,  # בַּיִת bayit (house)
    "H3478": 2514,  # יִשְׂרָאֵל yisrael
    "H4428": 2530,  # מֶלֶךְ melek (king)
    "H6213": 2632,  # עָשָׂה asah (make/do)
    "H1697": 1454,  # דָּבָר davar (word)
    "H3027": 1627,  # יָד yad (hand)
    "H5869": 887,   # עַיִן ayin (eye)
    "H8085": 1165,  # שָׁמַע shama (hear)
    "H935": 2592,   # בּוֹא bo (come)
    "H3318": 1069,  # יָצָא yatsa (go out)
    "H5414": 2014,  # נָתַן natan (give)
    "H7200": 1311,  # רָאָה raah (see)
    "H3045": 947,   # יָדַע yada (know)
    "H1980": 1554,  # הָלַךְ halak (walk/go)
    "H7725": 1066,  # שׁוּב shuv (return)
    "H5650": 807,   # עֶבֶד eved (servant)
    "H6440": 2126,  # פָּנִים panim (face)
    "H8064": 421,   # שָׁמַיִם shamayim (heaven)
    "H1471": 567,   # גּוֹי goy (nation)
    "H3820": 853,   # לֵב lev (heart)
    "H4725": 401,   # מָקוֹם maqom (place)
    "H5892": 1094,  # עִיר ir (city)
    "H1419": 527,   # גָּדוֹל gadol (great)
    "H6963": 506,   # קוֹל qol (voice)
    "H7451": 663,   # רַע ra (evil)
    "H2896": 559,   # טוֹב tov (good)
    "H4191": 845,   # מוּת mut (die)
    "H2421": 283,   # חָיָה chayah (live)
    "H7971": 847,   # שָׁלַח shalach (send)
    "H3947": 969,   # לָקַח laqach (take)
    "H5975": 521,   # עָמַד amad (stand)
    "H3427": 1088,  # יָשַׁב yashav (sit/dwell)
    "H6680": 496,   # צָוָה tsavah (command)
    "H8104": 468,   # שָׁמַר shamar (keep)
    "H1696": 1136,  # דָּבַר davar (speak)
    "H7121": 739,   # קָרָא qara (call)
    "H5647": 290,   # עָבַד avad (serve)
    "H3212": 1061,  # יָלַךְ yalak (go)
    "H7760": 585,   # שִׂים sim (put)
    "H2009": 1061,  # הִנֵּה hinneh (behold)
    "H4310": 424,   # מִי mi (who)
    "H4100": 751,   # מָה mah (what)
    "H2088": 612,   # זֶה zeh (this)
    "H1931": 1867,  # הוּא hu (he)
    "H1992": 565,   # הֵם hem (they)
    "H859": 749,    # אַתָּה attah (you m.s.)
    "H589": 874,    # אֲנִי ani (I)
    "H2063": 605,   # זֹאת zot (this f.)
    "H834": 5503,   # אֲשֶׁר asher (which)
    "H3588": 4487,  # כִּי ki (for/because)
    "H5921": 5777,  # עַל al (upon)
    "H413": 5518,   # אֶל el (to)
    "H4480": 7592,  # מִן min (from)
    "H5704": 1263,  # עַד ad (until)
    "H996": 409,    # בֵּין beyn (between)
    "H854": 890,    # אֵת et (with)
    "H5973": 1048,  # עִם im (with)
    "H6996": 101,   # קָטָן qatan (small)
    "H7227": 458,   # רַב rav (many)
    "H2719": 413,   # חֶרֶב cherev (sword)
    "H4421": 319,   # מִלְחָמָה milchamah (war)
    "H7965": 237,   # שָׁלוֹם shalom (peace)
    "H1285": 287,   # בְּרִית berit (covenant)
    "H8451": 223,   # תּוֹרָה torah (law)
    "H5030": 317,   # נָבִיא navi (prophet)
    "H3548": 750,   # כֹּהֵן kohen (priest)
    "H2403": 296,   # חַטָּאת chattat (sin)
    "H6666": 157,   # צְדָקָה tsedaqah (righteousness)
    "H2617": 248,   # חֶסֶד chesed (lovingkindness)
    "H571": 127,    # אֱמֶת emet (truth)
    "H4941": 425,   # מִשְׁפָּט mishpat (judgment)
    "H3519": 200,   # כָּבוֹד kavod (glory)
    "H6918": 116,   # קָדוֹשׁ qadosh (holy)
    "H7307": 389,   # רוּחַ ruach (spirit)
    "H5315": 755,   # נֶפֶשׁ nefesh (soul)
    "H1320": 273,   # בָּשָׂר basar (flesh)
    "H5769": 439,   # עוֹלָם olam (eternity)
    "H4194": 153,   # מָוֶת mavet (death)
    "H2416": 508,   # חַי chay (living)
    "H1870": 706,   # דֶּרֶךְ derek (way)
    "H2451": 153,   # חָכְמָה chokmah (wisdom)
    "H4639": 235,   # מַעֲשֶׂה maaseh (work)
    "H3068": 6828,  # already listed but showing tier 1 importance

    # Tier 2: freq 200-499 (~150 words)
    "H120": 546,    # אָדָם adam (man)
    "H376": 2188,   # אִישׁ ish (man)
    "H251": 629,    # אָח ach (brother)
    "H1323": 587,   # בַּת bat (daughter)
    "H7218": 600,   # רֹאשׁ rosh (head)
    "H3899": 340,   # לֶחֶם lechem (bread)
    "H4325": 585,   # מַיִם mayim (water)
    "H784": 378,    # אֵשׁ esh (fire)
    "H68": 273,     # אֶבֶן even (stone)
    "H6086": 330,   # עֵץ ets (tree/wood)
    "H2022": 558,   # הַר har (mountain)
    "H5104": 119,   # נָהָר nahar (river)
    "H3220": 396,   # יָם yam (sea)
    "H4057": 271,   # מִדְבָּר midbar (wilderness)
    "H1241": 183,   # בָּקָר baqar (cattle)
    "H6629": 274,   # צֹאן tson (flock)
    "H2091": 392,   # זָהָב zahav (gold)
    "H3701": 403,   # כֶּסֶף keseph (silver)
    "H5178": 139,   # נְחֹשֶׁת nechoshet (bronze)
    "H899": 216,    # בֶּגֶד beged (garment)
    "H8081": 193,   # שֶׁמֶן shemen (oil)
    "H3196": 141,   # יַיִן yayin (wine)
    "H7704": 333,   # שָׂדֶה sadeh (field)
    "H3754": 93,    # כֶּרֶם kerem (vineyard)
    "H2233": 229,   # זֶרַע zera (seed)
    "H6529": 119,   # פְּרִי peri (fruit)
    "H1818": 361,   # דָּם dam (blood)
    "H3709": 195,   # כַּף kaph (palm/hand)
    "H7272": 247,   # רֶגֶל regel (foot)
    "H241": 188,    # אֹזֶן ozen (ear)
    "H6310": 498,   # פֶּה peh (mouth)
    "H3956": 117,   # לָשׁוֹן lashon (tongue)
    "H8193": 176,   # שָׂפָה saphah (lip)
    "H639": 277,    # אַף aph (nose/anger)
    "H2534": 125,   # חֵמָה chemah (wrath)
    "H3374": 45,    # יִרְאָה yirah (fear)
    "H160": 231,    # אַהֲבָה ahavah (love)
    "H8055": 156,   # שָׂמַח samach (rejoice)
    "H1058": 115,   # בָּכָה bakah (weep)
    "H6419": 84,    # פָּלַל palal (pray)
    "H3034": 111,   # יָדָה yadah (praise)
    "H7891": 87,    # שִׁיר shir (sing)
    "H1288": 330,   # בָּרַךְ barak (bless)
    "H7043": 82,    # קָלַל qalal (curse)
    "H2398": 240,   # חָטָא chata (sin)
    "H5545": 46,    # סָלַח salach (forgive)
    "H6942": 172,   # קָדַשׁ qadash (sanctify)
    "H2930": 162,   # טָמֵא tame (unclean)
    "H2891": 94,    # טָהֵר taher (clean)
    "H6663": 41,    # צָדַק tsadaq (be righteous)
    "H7561": 35,    # רָשַׁע rasha (be wicked)
    "H539": 108,    # אָמַן aman (believe)
    "H982": 120,    # בָּטַח batach (trust)
    "H3176": 42,    # יָחַל yachal (hope)
    "H157": 217,    # אָהַב ahav (love)
    "H8130": 148,   # שָׂנֵא sane (hate)
    "H3372": 435,   # יָרֵא yare (fear)
    "H1245": 225,   # בָּקַשׁ baqash (seek)
    "H4672": 457,   # מָצָא matsa (find)
    "H7993": 125,   # שָׁלַךְ shalak (throw)
    "H622": 200,    # אָסַף asaph (gather)
    "H6908": 127,   # קָבַץ qabats (gather)
    "H6327": 68,    # פּוּץ puts (scatter)
    "H5307": 435,   # נָפַל naphal (fall)
    "H6965": 629,   # קוּם qum (arise)
    "H3381": 382,   # יָרַד yarad (go down)
    "H5927": 894,   # עָלָה alah (go up)
    "H5674": 559,   # עָבַר avar (pass over)
    "H7126": 280,   # קָרַב qarav (draw near)
    "H7368": 59,    # רָחַק rachaq (be far)
    "H2388": 290,   # חָזַק chazaq (be strong)
    "H7503": 46,    # רָפָה raphah (be weak)
    "H3513": 114,   # כָּבֵד kaved (be heavy)
    "H7043": 82,    # קָלַל qalal (be light)
    "H4390": 253,   # מָלֵא male (be full)
    "H7324": 19,    # רִיק riq (be empty)
    "H5462": 91,    # סָגַר sagar (shut)
    "H6605": 145,   # פָּתַח patach (open)
    "H1129": 377,   # בָּנָה banah (build)
    "H2040": 43,    # הָרַס haras (tear down)
    "H5193": 59,    # נָטַע nata (plant)
    "H5428": 22,    # נָתַשׁ natash (uproot)
    "H2232": 56,    # זָרַע zara (sow)
    "H7114": 36,    # קָצַר qatsar (reap)
    "H398": 820,    # אָכַל akal (eat)
    "H8354": 217,   # שָׁתָה shatah (drink)
    "H3885": 83,    # לוּן lun (lodge)
    "H3462": 19,    # יָשֵׁן yashen (sleep)
    "H6974": 23,    # קוּץ quts (awake)
    "H3947": 969,   # לָקַח laqach (take) - already listed
    "H5800": 215,   # עָזַב azav (forsake)
    "H5337": 213,   # נָצַל natsal (deliver)
    "H3467": 205,   # יָשַׁע yasha (save)
    "H1350": 44,    # גָּאַל gaal (redeem)
    "H6299": 60,    # פָּדָה padah (ransom)
    "H977": 172,    # בָּחַר bachar (choose)
    "H3988": 76,    # מָאַס maas (reject)
    "H8199": 204,   # שָׁפַט shaphat (judge)
    "H6485": 304,   # פָּקַד paqad (visit/appoint)
    "H4427": 350,   # מָלַךְ malak (reign)
    "H4910": 81,    # מָשַׁל mashal (rule)
    "H3898": 177,   # לָחַם lacham (fight)
    "H5221": 501,   # נָכָה nakah (strike)
    "H2026": 167,   # הָרַג harag (kill)
    "H7311": 197,   # רוּם rum (be high)
    "H8213": 30,    # שָׁפֵל shaphel (be low)
    "H1431": 117,   # גָּדַל gadal (be great)

    # Continue with more common words...
    "H6662": 206,   # צַדִּיק tsaddiq (righteous)
    "H7563": 263,   # רָשָׁע rasha (wicked)
    "H2450": 138,   # חָכָם chakam (wise)
    "H191": 26,     # אֱוִיל evil (fool)
    "H5288": 240,   # נַעַר naar (youth)
    "H2205": 178,   # זָקֵן zaqen (elder)
    "H1368": 160,   # גִּבּוֹר gibbor (mighty)
    "H1800": 48,    # דַּל dal (poor)
    "H6041": 76,    # עָנִי ani (afflicted)
    "H6223": 23,    # עָשִׁיר ashir (rich)
    "H8269": 421,   # שַׂר sar (prince)
    "H5387": 130,   # נָשִׂיא nasi (chief)
    "H8199": 204,   # שֹׁפֵט shophet (judge)
    "H5892": 1094,  # עִיר ir (city) - already listed
    "H2346": 133,   # חוֹמָה chomah (wall)
    "H8179": 373,   # שַׁעַר shaar (gate)
    "H168": 345,    # אֹהֶל ohel (tent)
    "H4908": 139,   # מִשְׁכָּן mishkan (tabernacle)
    "H1964": 80,    # הֵיכָל heykal (temple)
    "H4196": 403,   # מִזְבֵּחַ mizbeach (altar)
    "H3627": 325,   # כְּלִי keli (vessel)
    "H4501": 40,    # מְנוֹרָה menorah (lampstand)
    "H7979": 71,    # שֻׁלְחָן shulchan (table)
    "H727": 202,    # אָרוֹן aron (ark)
    "H3742": 91,    # כְּרוּב keruv (cherub)
    "H6944": 469,   # קֹדֶשׁ qodesh (holiness)
    "H2077": 162,   # זֶבַח zevach (sacrifice)
    "H5930": 289,   # עֹלָה olah (burnt offering)
    "H4503": 211,   # מִנְחָה minchah (offering)
    "H8002": 87,    # שֶׁלֶם shelem (peace offering)
    "H817": 46,     # אָשָׁם asham (guilt offering)
}

# Part of speech mapping based on Strong's patterns
def determine_pos(strongs_def: str, derivation: str) -> str:
    """Determine part of speech from Strong's definition."""
    def_lower = strongs_def.lower()
    deriv_lower = derivation.lower() if derivation else ""

    # Check for verb indicators
    if any(word in def_lower for word in ["to ", "a primitive root"]):
        return "verb"
    if "primitive root" in deriv_lower:
        return "verb"

    # Check for adjective indicators
    if any(word in def_lower for word in ["adjective", " great", " good", " holy", " evil"]):
        if not any(word in def_lower for word in ["to be", "to make"]):
            return "adjective"

    # Check for adverb
    if "adverb" in def_lower:
        return "adverb"

    # Check for preposition
    if any(word in def_lower for word in ["preposition", "upon", "from", "to", "in"]) and len(def_lower) < 50:
        return "preposition"

    # Check for conjunction
    if "conjunction" in def_lower:
        return "conjunction"

    # Check for pronoun
    if any(word in def_lower for word in ["pronoun", " i ", " he ", " she ", " you ", " they "]):
        return "pronoun"

    # Check for particle
    if "particle" in def_lower or "interjection" in def_lower:
        return "particle"

    # Default to noun
    return "noun"

def determine_semantic_category(definition: str, hebrew: str) -> str:
    """Categorize word into semantic domain."""
    def_lower = definition.lower()

    categories = {
        "theological": ["god", "lord", "holy", "worship", "pray", "sacred", "divine", "covenant", "salvation"],
        "creation": ["heaven", "earth", "sea", "land", "mountain", "water", "sun", "moon", "star", "tree", "animal"],
        "human": ["man", "woman", "son", "daughter", "father", "mother", "brother", "child", "people", "nation"],
        "body": ["hand", "eye", "heart", "face", "mouth", "head", "foot", "blood", "bone", "flesh"],
        "action": ["walk", "go", "come", "give", "take", "make", "do", "say", "speak", "hear", "see"],
        "emotion": ["love", "hate", "fear", "joy", "anger", "sorrow", "peace"],
        "legal": ["law", "judge", "command", "righteous", "wicked", "sin", "guilt"],
        "warfare": ["sword", "war", "battle", "fight", "enemy", "army", "victory"],
        "royalty": ["king", "prince", "throne", "reign", "rule", "kingdom"],
        "worship": ["priest", "sacrifice", "altar", "temple", "offering", "tabernacle"],
        "time": ["day", "night", "year", "month", "morning", "evening", "eternity"],
        "quantity": ["all", "many", "few", "great", "small", "number"],
        "abstract": ["truth", "wisdom", "knowledge", "glory", "power", "righteousness"],
        "domestic": ["house", "bread", "food", "wine", "oil", "garment", "gold", "silver"],
    }

    for category, keywords in categories.items():
        if any(kw in def_lower for kw in keywords):
            return category

    return "general"

def extract_gloss(definition: str) -> str:
    """Extract short gloss from full definition."""
    # Remove parentheticals and take first part
    clean = re.sub(r'\([^)]*\)', '', definition)
    clean = re.sub(r'\{[^}]*\}', '', clean)
    clean = re.sub(r'\[[^\]]*\]', '', clean)

    # Split on common delimiters and take first meaning
    parts = re.split(r'[;,]', clean)
    gloss = parts[0].strip() if parts else definition[:50]

    # Capitalize first letter
    if gloss:
        gloss = gloss[0].upper() + gloss[1:] if len(gloss) > 1 else gloss.upper()

    return gloss[:60] if len(gloss) > 60 else gloss

def calculate_tier(frequency: int) -> int:
    """Calculate tier based on frequency."""
    if frequency >= 500:
        return 1
    elif frequency >= 200:
        return 2
    elif frequency >= 100:
        return 3
    elif frequency >= 50:
        return 4
    else:
        return 5

def clean_transliteration(xlit: str) -> str:
    """Clean up transliteration for consistency."""
    if not xlit:
        return ""
    # Remove special characters and normalize
    clean = xlit.replace("ʼ", "'").replace("ʻ", "'")
    return clean

def fetch_openscriptures_data() -> dict:
    """Fetch and parse OpenScriptures Strong's Hebrew dictionary."""
    print("Fetching OpenScriptures Strong's Hebrew dictionary...")

    with urllib.request.urlopen(OPENSCRIPTURES_URL) as response:
        content = response.read().decode('utf-8')

    # The file is JavaScript, need to extract the JSON object
    # Format: var strongsHebrewDictionary = { ... };\nmodule.exports = ...
    match = re.search(r'var\s+strongsHebrewDictionary\s*=\s*(\{.*?\});\s*(?:module\.exports|$)', content, re.DOTALL)
    if not match:
        raise ValueError("Could not parse OpenScriptures dictionary")

    json_str = match.group(1)
    # Fix potential JSON issues (trailing commas, etc.)
    json_str = re.sub(r',\s*}', '}', json_str)
    json_str = re.sub(r',\s*]', ']', json_str)

    data = json.loads(json_str)
    print(f"Parsed {len(data)} entries from OpenScriptures")
    return data

def transform_to_app_format(openscriptures_data: dict) -> list:
    """Transform OpenScriptures data to app vocabulary format."""
    words = []

    for strongs_num, entry in openscriptures_data.items():
        if not strongs_num.startswith('H'):
            continue

        # Get frequency from our data or default to low
        frequency = FREQUENCY_DATA.get(strongs_num, 5)
        tier = calculate_tier(frequency)

        # Extract fields
        hebrew = entry.get('lemma', '')
        transliteration = clean_transliteration(entry.get('xlit', ''))
        strongs_def = entry.get('strongs_def', '')
        kjv_def = entry.get('kjv_def', '')
        derivation = entry.get('derivation', '')

        # Combined definition
        definition = f"{strongs_def}. {kjv_def}".strip('. ')
        if not definition:
            definition = derivation

        gloss = extract_gloss(strongs_def if strongs_def else kjv_def)
        pos = determine_pos(strongs_def, derivation)
        semantic_category = determine_semantic_category(definition, hebrew)

        word_entry = {
            "id": strongs_num,
            "hebrew": hebrew,
            "transliteration": transliteration,
            "gloss": gloss,
            "definition": definition,
            "partOfSpeech": pos,
            "frequency": frequency,
            "tier": tier,
            "strongs": strongs_num,
            "semanticCategory": semantic_category,
            "morphology": {}
        }

        # Add basic morphology for nouns
        if pos == "noun":
            # Try to detect gender from definition
            if any(word in definition.lower() for word in ["feminine", "woman", "wife", "daughter", "mother"]):
                word_entry["morphology"]["gender"] = "feminine"
            else:
                word_entry["morphology"]["gender"] = "masculine"

        words.append(word_entry)

    # Sort by tier (most common first) then by Strong's number
    words.sort(key=lambda w: (w['tier'], int(w['id'][1:])))

    return words

def main():
    """Main function to fetch and transform vocabulary data."""
    try:
        # Fetch data from OpenScriptures
        openscriptures_data = fetch_openscriptures_data()

        # Transform to app format
        words = transform_to_app_format(openscriptures_data)

        print(f"\nTransformed {len(words)} words")

        # Count by tier
        tier_counts = {}
        for word in words:
            tier = word['tier']
            tier_counts[tier] = tier_counts.get(tier, 0) + 1

        print("\nTier distribution:")
        for tier in sorted(tier_counts.keys()):
            print(f"  Tier {tier}: {tier_counts[tier]} words")

        # Write output
        output = {"words": words}
        output_path = "/home/jonathan/hebrew-vocab/src/data/vocabulary.json"

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

        print(f"\nWrote vocabulary to {output_path}")
        print(f"Total words: {len(words)}")

    except Exception as e:
        print(f"Error: {e}")
        raise

if __name__ == "__main__":
    main()
