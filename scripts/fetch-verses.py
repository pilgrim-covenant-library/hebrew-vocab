#!/usr/bin/env python3
"""
Fetch Hebrew OT verses from online sources and transform to app format.

Source: Bolls.life API (Westminster Leningrad Codex)

Output: src/data/ot-verses.json
"""

import json
import urllib.request
import time
from typing import Any

# Bolls.life API base URL
API_BASE = "https://bolls.life/get-text/WLC"

# Curated verse selections with pedagogical annotations
# Format: (book_id, chapter, verse, difficulty, key_terms, notes)
CURATED_VERSES = [
    # ==================== GENESIS (Torah) ====================
    # Creation narrative - foundational vocabulary
    ("gen", 1, 1, 1, ["beginning", "create", "God", "heaven", "earth"], "Opening verse of Torah. Contains bara (create)."),
    ("gen", 1, 2, 1, ["earth", "formless", "void", "darkness", "deep", "spirit", "God", "waters"], "The 'tohu va-vohu' verse."),
    ("gen", 1, 3, 1, ["say", "light", "be"], "First divine speech act. Simple syntax."),
    ("gen", 1, 4, 1, ["see", "light", "good", "separate", "darkness"], "Divine evaluation pattern."),
    ("gen", 1, 5, 1, ["call", "light", "day", "darkness", "night", "evening", "morning"], "Naming vocabulary."),
    ("gen", 1, 26, 2, ["make", "man", "image", "likeness", "rule", "fish", "birds", "animals"], "Image of God passage."),
    ("gen", 1, 27, 1, ["create", "man", "image", "God", "male", "female"], "Creation of humanity."),
    ("gen", 1, 28, 2, ["bless", "be fruitful", "multiply", "fill", "earth", "subdue"], "Blessing and mandate."),
    ("gen", 2, 4, 2, ["generations", "heaven", "earth", "create", "LORD God", "make"], "Toledot formula introduction."),
    ("gen", 2, 7, 2, ["LORD God", "form", "man", "dust", "ground", "breathe", "life", "soul"], "Formation of Adam."),
    ("gen", 2, 18, 2, ["LORD God", "say", "good", "man", "alone", "make", "helper"], "Creation of woman begins."),
    ("gen", 3, 1, 2, ["serpent", "crafty", "beast", "field", "LORD God", "say", "woman"], "Fall narrative begins."),
    ("gen", 3, 15, 2, ["put", "enmity", "serpent", "woman", "seed", "head", "heel"], "Protoevangelium."),
    ("gen", 12, 1, 2, ["LORD", "say", "Abram", "go", "land", "kindred", "father", "house"], "Call of Abraham."),
    ("gen", 12, 2, 2, ["make", "great", "nation", "bless", "name", "blessing"], "Abrahamic blessing."),
    ("gen", 12, 3, 2, ["bless", "curse", "families", "earth"], "Universal blessing."),
    ("gen", 15, 1, 2, ["word", "LORD", "Abram", "vision", "fear", "shield", "reward"], "Covenant ceremony begins."),
    ("gen", 15, 6, 2, ["believe", "LORD", "count", "righteousness"], "Faith and righteousness."),
    ("gen", 22, 1, 2, ["test", "God", "Abraham", "say", "here I am"], "Binding of Isaac begins."),
    ("gen", 22, 2, 2, ["take", "son", "only", "love", "Isaac", "go", "land", "Moriah", "offer", "burnt offering"], "Command to sacrifice."),

    # ==================== EXODUS (Torah) ====================
    ("exod", 3, 14, 2, ["God", "Moses", "I AM", "send"], "Divine name revelation."),
    ("exod", 6, 6, 2, ["LORD", "say", "bring out", "Egypt", "burdens", "deliver", "bondage", "redeem"], "Redemption vocabulary."),
    ("exod", 6, 7, 2, ["take", "people", "God", "know", "LORD", "bring out", "Egypt"], "Covenant formula."),
    ("exod", 12, 1, 2, ["LORD", "speak", "Moses", "Aaron", "land", "Egypt"], "Passover instructions begin."),
    ("exod", 20, 1, 1, ["God", "speak", "words", "say"], "Ten Commandments preamble."),
    ("exod", 20, 2, 1, ["LORD", "God", "bring out", "land", "Egypt", "house", "bondage"], "First commandment context."),
    ("exod", 20, 3, 1, ["other", "gods", "before"], "No other gods."),
    ("exod", 20, 7, 1, ["take", "name", "LORD", "God", "vain", "hold guiltless"], "Name in vain."),
    ("exod", 20, 8, 1, ["remember", "Sabbath", "day", "keep holy"], "Remember Sabbath."),
    ("exod", 20, 12, 1, ["honor", "father", "mother", "days", "long", "land", "LORD", "give"], "Honor parents."),
    ("exod", 20, 13, 1, ["murder"], "Do not murder."),
    ("exod", 20, 14, 1, ["adultery"], "Do not commit adultery."),
    ("exod", 20, 15, 1, ["steal"], "Do not steal."),

    # ==================== LEVITICUS (Torah) ====================
    ("lev", 19, 2, 2, ["speak", "congregation", "Israel", "holy", "LORD", "God"], "Holiness call."),
    ("lev", 19, 18, 2, ["love", "neighbor", "yourself", "LORD"], "Love your neighbor."),

    # ==================== DEUTERONOMY (Torah) ====================
    ("deut", 6, 4, 1, ["hear", "Israel", "LORD", "God", "one"], "The Shema - most famous verse."),
    ("deut", 6, 5, 1, ["love", "LORD", "God", "heart", "soul", "might"], "Greatest commandment."),
    ("deut", 6, 6, 1, ["words", "command", "today", "heart"], "Words on heart."),
    ("deut", 6, 7, 2, ["teach", "children", "speak", "sit", "house", "walk", "way", "lie down", "rise"], "Teaching command."),
    ("deut", 10, 12, 2, ["Israel", "LORD", "God", "require", "fear", "walk", "ways", "love", "serve", "heart", "soul"], "What God requires."),
    ("deut", 30, 19, 2, ["call", "witness", "heaven", "earth", "life", "death", "blessing", "curse", "choose", "life"], "Choose life."),
    ("deut", 32, 1, 2, ["give ear", "heavens", "speak", "hear", "earth", "words", "mouth"], "Song of Moses begins."),

    # ==================== JOSHUA ====================
    ("josh", 1, 8, 2, ["book", "law", "depart", "mouth", "meditate", "day", "night", "observe", "do", "prosper", "success"], "Meditation command."),
    ("josh", 1, 9, 2, ["command", "strong", "courageous", "fear", "dismayed", "LORD", "God", "wherever", "go"], "Be strong and courageous."),
    ("josh", 24, 15, 2, ["evil", "serve", "LORD", "choose", "today", "serve", "gods", "fathers", "Amorites", "house", "serve", "LORD"], "Choose this day."),

    # ==================== PSALMS (Wisdom/Poetry) ====================
    ("ps", 1, 1, 1, ["blessed", "man", "walk", "counsel", "wicked", "stand", "way", "sinners", "sit", "seat", "scoffers"], "Psalm 1:1 - Two ways."),
    ("ps", 1, 2, 1, ["delight", "law", "LORD", "meditate", "day", "night"], "Delight in Torah."),
    ("ps", 1, 3, 2, ["tree", "planted", "streams", "water", "fruit", "season", "leaf", "wither", "prosper"], "Tree metaphor."),
    ("ps", 8, 1, 2, ["LORD", "Lord", "majestic", "name", "earth", "glory", "heavens"], "Psalm 8:1 - Divine majesty."),
    ("ps", 8, 4, 2, ["man", "mindful", "son", "man", "care"], "What is man?"),
    ("ps", 19, 1, 1, ["heavens", "declare", "glory", "God", "sky", "proclaim", "work", "hands"], "Heavens declare."),
    ("ps", 19, 7, 2, ["law", "LORD", "perfect", "reviving", "soul", "testimony", "sure", "making wise", "simple"], "Torah praise."),
    ("ps", 23, 1, 1, ["LORD", "shepherd", "want"], "The LORD is my shepherd."),
    ("ps", 23, 2, 1, ["lie down", "green", "pastures", "lead", "still", "waters"], "Green pastures."),
    ("ps", 23, 3, 1, ["restore", "soul", "lead", "paths", "righteousness", "name", "sake"], "Restores my soul."),
    ("ps", 23, 4, 2, ["walk", "valley", "shadow", "death", "fear", "evil", "with me", "rod", "staff", "comfort"], "Valley of shadow."),
    ("ps", 23, 5, 2, ["prepare", "table", "presence", "enemies", "anoint", "head", "oil", "cup", "overflows"], "Table prepared."),
    ("ps", 23, 6, 2, ["goodness", "mercy", "follow", "days", "life", "dwell", "house", "LORD", "forever"], "Goodness and mercy."),
    ("ps", 27, 1, 1, ["LORD", "light", "salvation", "fear", "stronghold", "life", "afraid"], "The LORD is my light."),
    ("ps", 34, 8, 2, ["taste", "see", "LORD", "good", "blessed", "man", "takes refuge"], "Taste and see."),
    ("ps", 46, 1, 1, ["God", "refuge", "strength", "help", "trouble"], "God is our refuge."),
    ("ps", 46, 10, 1, ["still", "know", "God", "exalted", "nations", "earth"], "Be still and know."),
    ("ps", 51, 1, 2, ["mercy", "God", "lovingkindness", "multitude", "compassion", "blot out", "transgressions"], "Have mercy on me."),
    ("ps", 51, 10, 2, ["create", "clean", "heart", "God", "renew", "right", "spirit", "within"], "Create in me."),
    ("ps", 91, 1, 2, ["dwell", "shelter", "Most High", "abide", "shadow", "Almighty"], "Dwelling in shelter."),
    ("ps", 100, 1, 1, ["shout for joy", "LORD", "earth"], "Make a joyful noise."),
    ("ps", 100, 2, 1, ["serve", "LORD", "gladness", "come", "presence", "singing"], "Serve with gladness."),
    ("ps", 100, 3, 1, ["know", "LORD", "God", "made", "not ourselves", "people", "sheep", "pasture"], "Know that the LORD."),
    ("ps", 103, 1, 1, ["bless", "LORD", "soul", "within", "holy", "name"], "Bless the LORD my soul."),
    ("ps", 103, 8, 2, ["LORD", "merciful", "gracious", "slow", "anger", "abounding", "steadfast love"], "Merciful and gracious."),
    ("ps", 118, 24, 1, ["day", "LORD", "made", "rejoice", "glad"], "This is the day."),
    ("ps", 119, 105, 1, ["word", "lamp", "feet", "light", "path"], "Lamp to my feet."),
    ("ps", 121, 1, 1, ["lift", "eyes", "hills", "help", "come"], "I lift my eyes."),
    ("ps", 121, 2, 1, ["help", "LORD", "maker", "heaven", "earth"], "Help from the LORD."),
    ("ps", 139, 1, 2, ["LORD", "search", "know"], "O LORD you have searched me."),
    ("ps", 139, 14, 2, ["praise", "fearfully", "wonderfully", "made", "wonderful", "works", "soul", "knows"], "Fearfully and wonderfully made."),
    ("ps", 145, 3, 2, ["great", "LORD", "greatly", "praised", "greatness", "unsearchable"], "Great is the LORD."),
    ("ps", 150, 1, 1, ["praise", "God", "sanctuary", "mighty", "heavens"], "Praise God."),
    ("ps", 150, 6, 1, ["everything", "breath", "praise", "LORD"], "Let everything praise."),

    # ==================== PROVERBS (Wisdom) ====================
    ("prov", 1, 7, 1, ["fear", "LORD", "beginning", "knowledge", "fools", "despise", "wisdom", "instruction"], "Fear of the LORD."),
    ("prov", 3, 5, 1, ["trust", "LORD", "heart", "lean", "understanding"], "Trust in the LORD."),
    ("prov", 3, 6, 1, ["ways", "acknowledge", "direct", "paths"], "Acknowledge him."),
    ("prov", 9, 10, 2, ["fear", "LORD", "beginning", "wisdom", "knowledge", "Holy One", "understanding"], "Beginning of wisdom."),
    ("prov", 22, 6, 2, ["train", "child", "way", "go", "old", "depart"], "Train up a child."),

    # ==================== ISAIAH (Major Prophet) ====================
    ("isa", 1, 18, 2, ["come", "reason", "LORD", "sins", "scarlet", "white", "snow", "red", "crimson", "wool"], "Though your sins be scarlet."),
    ("isa", 6, 1, 2, ["year", "king", "Uzziah", "die", "see", "Lord", "sitting", "throne", "high", "lifted up", "train", "fill", "temple"], "Isaiah's vision."),
    ("isa", 6, 3, 2, ["holy", "holy", "holy", "LORD", "hosts", "earth", "full", "glory"], "Holy holy holy."),
    ("isa", 6, 8, 2, ["hear", "voice", "Lord", "send", "go", "here am I", "send me"], "Here am I, send me."),
    ("isa", 7, 14, 2, ["Lord", "give", "sign", "virgin", "conceive", "bear", "son", "call", "Immanuel"], "Virgin birth prophecy."),
    ("isa", 9, 6, 2, ["child", "born", "son", "given", "government", "shoulder", "name", "Wonderful", "Counselor", "Mighty God", "Everlasting Father", "Prince", "Peace"], "Unto us a child."),
    ("isa", 40, 1, 1, ["comfort", "comfort", "people", "says", "God"], "Comfort my people."),
    ("isa", 40, 8, 2, ["grass", "withers", "flower", "fades", "word", "God", "stand", "forever"], "Word stands forever."),
    ("isa", 40, 31, 2, ["wait", "LORD", "renew", "strength", "mount up", "wings", "eagles", "run", "weary", "walk", "faint"], "Mount up with wings."),
    ("isa", 53, 1, 2, ["who", "believe", "report", "arm", "LORD", "revealed"], "Suffering Servant begins."),
    ("isa", 53, 5, 2, ["wounded", "transgressions", "crushed", "iniquities", "chastisement", "peace", "stripes", "healed"], "By his stripes."),
    ("isa", 53, 6, 2, ["sheep", "gone astray", "turned", "own way", "LORD", "laid", "iniquity", "all"], "All we like sheep."),
    ("isa", 55, 8, 2, ["thoughts", "not", "thoughts", "ways", "not", "ways", "declares", "LORD"], "My thoughts not yours."),
    ("isa", 55, 11, 2, ["word", "goes out", "mouth", "return", "empty", "accomplish", "purpose", "succeed"], "Word will not return void."),

    # ==================== JEREMIAH (Major Prophet) ====================
    ("jer", 1, 5, 2, ["before", "formed", "womb", "knew", "before", "born", "consecrated", "appointed", "prophet", "nations"], "Before I formed you."),
    ("jer", 17, 7, 2, ["blessed", "man", "trusts", "LORD", "trust", "LORD"], "Blessed is the man."),
    ("jer", 29, 11, 2, ["know", "plans", "plans", "welfare", "evil", "future", "hope"], "Plans for you."),
    ("jer", 31, 31, 2, ["days", "coming", "declares", "LORD", "make", "new", "covenant", "house", "Israel", "house", "Judah"], "New covenant."),
    ("jer", 31, 33, 2, ["covenant", "make", "house", "Israel", "put", "law", "within", "write", "hearts", "God", "people"], "Law on hearts."),

    # ==================== DANIEL (Prophet) ====================
    ("dan", 2, 20, 2, ["blessed", "name", "God", "forever", "wisdom", "might"], "Blessed be the name."),
    ("dan", 6, 10, 3, ["Daniel", "know", "document", "signed", "went", "house", "windows", "open", "chamber", "toward", "Jerusalem", "knelt", "knees", "three times", "day", "prayed", "gave thanks", "before", "God", "done", "previously"], "Daniel's prayer discipline."),

    # ==================== MICAH (Minor Prophet) ====================
    ("mic", 6, 8, 2, ["told", "man", "good", "LORD", "require", "do", "justice", "love", "kindness", "walk", "humbly", "God"], "Do justice, love kindness."),

    # ==================== HABAKKUK (Minor Prophet) ====================
    ("hab", 2, 4, 2, ["behold", "soul", "puffed up", "upright", "righteous", "live", "faith"], "The just shall live by faith."),
    ("hab", 2, 14, 2, ["earth", "filled", "knowledge", "glory", "LORD", "waters", "cover", "sea"], "Earth filled with glory."),

    # ==================== MALACHI (Minor Prophet) ====================
    ("mal", 3, 1, 2, ["behold", "send", "messenger", "prepare", "way", "before", "Lord", "seek", "suddenly", "come", "temple", "messenger", "covenant", "delight"], "Messenger of the covenant."),
    ("mal", 3, 10, 2, ["bring", "whole", "tithe", "storehouse", "food", "house", "test", "open", "windows", "heaven", "pour", "blessing", "room"], "Bring the tithe."),
]

# Book name mappings
BOOK_NAMES = {
    "gen": ("Genesis", "בְּרֵאשִׁית"),
    "exod": ("Exodus", "שְׁמוֹת"),
    "lev": ("Leviticus", "וַיִּקְרָא"),
    "num": ("Numbers", "בְּמִדְבַּר"),
    "deut": ("Deuteronomy", "דְּבָרִים"),
    "josh": ("Joshua", "יְהוֹשֻׁעַ"),
    "ps": ("Psalms", "תְּהִלִּים"),
    "prov": ("Proverbs", "מִשְׁלֵי"),
    "isa": ("Isaiah", "יְשַׁעְיָהוּ"),
    "jer": ("Jeremiah", "יִרְמְיָהוּ"),
    "dan": ("Daniel", "דָּנִיֵּאל"),
    "mic": ("Micah", "מִיכָה"),
    "hab": ("Habakkuk", "חֲבַקּוּק"),
    "mal": ("Malachi", "מַלְאָכִי"),
}

# Book numbers for bolls.life API (1-indexed)
BOOK_NUMBERS = {
    "gen": 1,
    "exod": 2,
    "lev": 3,
    "num": 4,
    "deut": 5,
    "josh": 6,
    "ps": 19,
    "prov": 20,
    "isa": 23,
    "jer": 24,
    "dan": 27,
    "mic": 33,
    "hab": 35,
    "mal": 39,
}

# Cache for fetched chapters to avoid re-fetching
CHAPTER_CACHE = {}

def fetch_verse(book: str, chapter: int, verse: int) -> str:
    """Fetch a single verse from bolls.life API."""
    book_num = BOOK_NUMBERS.get(book, 1)
    cache_key = f"{book_num}_{chapter}"

    # Check cache first
    if cache_key not in CHAPTER_CACHE:
        url = f"{API_BASE}/{book_num}/{chapter}/"

        try:
            with urllib.request.urlopen(url, timeout=30) as response:
                data = json.loads(response.read().decode('utf-8'))
                if isinstance(data, list):
                    # Build a dict mapping verse numbers to text
                    CHAPTER_CACHE[cache_key] = {v.get('verse', 0): v.get('text', '') for v in data}
                else:
                    CHAPTER_CACHE[cache_key] = {}
        except Exception as e:
            print(f"  Warning: Failed to fetch chapter {book} {chapter}: {e}")
            CHAPTER_CACHE[cache_key] = {}

    # Get specific verse from cache
    return CHAPTER_CACHE.get(cache_key, {}).get(verse, "")

def get_reference(book: str, chapter: int, verse: int) -> str:
    """Generate human-readable reference."""
    name, _ = BOOK_NAMES.get(book, (book.title(), ""))
    return f"{name} {chapter}:{verse}"

def main():
    """Main function to fetch verses and build JSON."""
    print("Fetching Hebrew OT verses from bolls.life...")

    verses = []
    total = len(CURATED_VERSES)

    for i, (book, chapter, verse, difficulty, key_terms, notes) in enumerate(CURATED_VERSES):
        print(f"  [{i+1}/{total}] Fetching {book} {chapter}:{verse}...")

        hebrew_text = fetch_verse(book, chapter, verse)

        if not hebrew_text:
            print(f"    Skipping - no text returned")
            continue

        verse_entry = {
            "id": f"{book}_{chapter}_{verse}",
            "book": book,
            "chapter": chapter,
            "verse": verse,
            "reference": get_reference(book, chapter, verse),
            "hebrew": hebrew_text,
            "transliteration": "",  # Would need separate transliteration source
            "referenceTranslation": "",  # Would need English translation source
            "keyTerms": key_terms,
            "difficulty": difficulty,
            "notes": notes
        }

        verses.append(verse_entry)

        # Be nice to the API
        time.sleep(0.2)

    # Build books list
    books_used = set(v["book"] for v in verses)
    books = []
    for book_id in sorted(books_used, key=lambda x: BOOK_NUMBERS.get(x, 99)):
        name, hebrew_name = BOOK_NAMES.get(book_id, (book_id.title(), ""))
        chapters = max(v["chapter"] for v in verses if v["book"] == book_id)
        books.append({
            "id": book_id,
            "name": name,
            "hebrewName": hebrew_name,
            "chapters": chapters
        })

    output = {
        "books": books,
        "verses": verses
    }

    output_path = "/home/jonathan/hebrew-vocab/src/data/ot-verses.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\nWrote {len(verses)} verses to {output_path}")

    # Statistics
    difficulty_counts = {}
    for v in verses:
        d = v["difficulty"]
        difficulty_counts[d] = difficulty_counts.get(d, 0) + 1

    print("\nDifficulty distribution:")
    for d in sorted(difficulty_counts.keys()):
        print(f"  Level {d}: {difficulty_counts[d]} verses")

    book_counts = {}
    for v in verses:
        b = v["book"]
        book_counts[b] = book_counts.get(b, 0) + 1

    print("\nBook distribution:")
    for b, count in sorted(book_counts.items(), key=lambda x: -x[1]):
        print(f"  {BOOK_NAMES.get(b, (b,))[0]}: {count} verses")

if __name__ == "__main__":
    main()
