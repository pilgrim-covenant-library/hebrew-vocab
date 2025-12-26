/**
 * Inspirational Stories: Hebrew Scholars Throughout Church History
 *
 * Historical accounts of how scholars across all ages of church history
 * learned Hebrew and used it to advance the gospel.
 */

export type StoryCategory =
  | 'patristic'      // Early Church Fathers (100-500 AD)
  | 'medieval'       // Medieval Period (500-1400 AD)
  | 'renaissance'    // Renaissance/Pre-Reformation (1400-1517)
  | 'reformer'       // Protestant Reformation (1517-1600)
  | 'puritan'        // Puritan Era (1600-1700)
  | 'westminster'    // Westminster Divines (1643-1653)
  | 'enlightenment'  // Post-Reformation/Enlightenment (1700-1800)
  | 'modern'         // Modern Era (1800-present)
  ;

export interface InspirationStory {
  slug: string;
  name: string;
  title: string;
  years: string;
  location: string;
  category: StoryCategory;
  summary: string;
  quote: string;
  quoteSource: string;
  content: string[];
  lessons: string[];
  sources: string[];
}

export const CATEGORY_INFO: Record<StoryCategory, { label: string; color: string; bgColor: string; description: string }> = {
  patristic: {
    label: 'Early Church',
    color: 'text-violet-600 dark:text-violet-400',
    bgColor: 'bg-violet-500',
    description: 'Church Fathers who recognized the importance of the Hebrew Scriptures (100-500 AD)',
  },
  medieval: {
    label: 'Medieval',
    color: 'text-stone-600 dark:text-stone-400',
    bgColor: 'bg-stone-500',
    description: 'Medieval scholars who preserved and studied Hebrew learning (500-1400 AD)',
  },
  renaissance: {
    label: 'Renaissance',
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-500',
    description: 'Humanist scholars who revived Hebrew studies before the Reformation (1400-1517)',
  },
  reformer: {
    label: 'Reformers',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500',
    description: 'The founders of the Protestant Reformation who recovered the original languages (1517-1600)',
  },
  puritan: {
    label: 'Puritans',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500',
    description: 'English Reformed theologians who pursued deep biblical scholarship (1600-1700)',
  },
  westminster: {
    label: 'Westminster',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500',
    description: 'The scholars who crafted the Westminster Standards (1643-1653)',
  },
  enlightenment: {
    label: 'Post-Reformation',
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-500',
    description: 'Scholars who advanced Hebrew studies in the 17th-18th centuries',
  },
  modern: {
    label: 'Modern Era',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500',
    description: 'Hebrew scholars from the 19th century to present day',
  },
};

export const stories: InspirationStory[] = [
  // ============================================================================
  // EARLY CHURCH (PATRISTIC)
  // ============================================================================
  {
    slug: 'origen-of-alexandria',
    name: 'Origen of Alexandria',
    title: 'The Hexapla Scholar',
    years: '185-254',
    location: 'Alexandria & Caesarea',
    category: 'patristic',
    summary: 'Origen created the Hexapla—a monumental six-column comparison of Hebrew and Greek Old Testament texts—representing the ancient church\'s most ambitious Hebrew scholarship.',
    quote: 'The Scriptures were composed through the Spirit of God, and have both a meaning which is obvious, and another which is hidden from most readers.',
    quoteSource: 'On First Principles, Book IV',
    content: [
      'In the bustling intellectual center of Alexandria, a young Origen grew up in a Christian household where Scripture was revered. His father Leonides was martyred when Origen was seventeen, leaving him to support his family through teaching. This early trauma deepened his commitment to understanding God\'s Word in its original form.',
      'Origen recognized that the Greek Septuagint, while inspired, sometimes differed from the Hebrew text used by Jews. Rather than dismiss these differences, he determined to investigate them systematically. He undertook a project that would consume decades of his life: the Hexapla.',
      'The Hexapla arranged six versions of the Old Testament in parallel columns: the Hebrew text, a Greek transliteration of the Hebrew, and four Greek translations (Aquila, Symmachus, the Septuagint, and Theodotion). Creating this work required Origen to learn Hebrew—a rare accomplishment for a Christian scholar of his era.',
      'Origen studied Hebrew under Jewish teachers, likely in Caesarea where he later settled. He learned not merely the language but the Jewish interpretive traditions that illuminated the text. His commentaries show deep engagement with Hebrew vocabulary and grammar, even when filtered through his allegorical method.',
      'Though the original Hexapla was too massive to copy completely and is now lost, fragments survived for centuries and influenced biblical scholarship. Origen\'s commitment to the Hebrew text established a precedent: serious Christian interpretation must engage the original languages.'
    ],
    lessons: [
      'Engaging with the original Hebrew honors the text God inspired',
      'Massive scholarly projects require decades of patient work',
      'Learning from Jewish teachers enriches Christian understanding',
      'Textual comparison deepens rather than threatens faith'
    ],
    sources: [
      'Trigg, Joseph Wilson. Origen: The Bible and Philosophy in the Third-Century Church. SCM Press, 1983.',
      'Grafton, Anthony and Megan Williams. Christianity and the Transformation of the Book. Harvard University Press, 2006.',
    ],
  },
  {
    slug: 'jerome',
    name: 'Jerome',
    title: 'Translator of the Vulgate',
    years: '347-420',
    location: 'Bethlehem',
    category: 'patristic',
    summary: 'Jerome moved to Bethlehem to learn Hebrew from Jewish teachers, then produced the Latin Vulgate—a translation from the original Hebrew that shaped Western Christianity for over a millennium.',
    quote: 'Let us learn upon earth that knowledge which will continue with us in heaven.',
    quoteSource: 'Letter to Paulinus',
    content: [
      'Jerome was already the most learned Christian scholar in the Latin-speaking world when he made a radical decision: he would move to Bethlehem and learn Hebrew from scratch. His friends were scandalized. Why would a renowned scholar humble himself to study under Jewish rabbis?',
      'The answer lay in Jerome\'s growing conviction that the Latin translations of his day were inadequate. They were based on the Greek Septuagint, a translation of a translation. "The truth of the Hebrew" (Hebraica veritas), as Jerome called it, was needed for accurate interpretation.',
      'In Bethlehem, Jerome hired a Jewish teacher who would come to him secretly at night—the rabbi feared persecution from his own community for teaching a Christian. Night after night, Jerome labored over the Hebrew alphabet, vocabulary, and grammar. The difficulty was immense; he complained that Hebrew consonants scraped his throat like grinding millstones.',
      'Over twenty years, Jerome produced the Vulgate—a fresh Latin translation of the Old Testament made directly from the Hebrew. His work was revolutionary and controversial. Many Christians preferred the familiar Septuagint; Augustine himself questioned Jerome\'s reliance on the "Jewish" text.',
      'Jerome defended his work vigorously. "The Jews cannot accuse us of falsifying their Scriptures," he wrote, "if we have access to their sources." His translation became the standard Bible of Western Christianity for over a thousand years, and his emphasis on the Hebrew original planted seeds that would flower in the Reformation.'
    ],
    lessons: [
      'True scholarship requires humility—even experts must become students again',
      'Returning to the original languages reveals truths hidden in translations',
      'Controversy often accompanies genuine scholarly breakthroughs',
      'Patient daily labor over years produces lasting fruit'
    ],
    sources: [
      'Kelly, J.N.D. Jerome: His Life, Writings, and Controversies. Harper & Row, 1975.',
      'Williams, Megan Hale. The Monk and the Book: Jerome and the Making of Christian Scholarship. University of Chicago Press, 2006.',
    ],
  },

  // ============================================================================
  // MEDIEVAL
  // ============================================================================
  {
    slug: 'nicholas-of-lyra',
    name: 'Nicholas of Lyra',
    title: 'The Doctor Planus et Utilis',
    years: '1270-1349',
    location: 'Paris, France',
    category: 'medieval',
    summary: 'Nicholas of Lyra\'s Hebrew-based commentaries so profoundly influenced Luther that scholars said "Si Lyra non lyrasset, Lutherus non saltasset" (If Lyra had not played his lyre, Luther would not have danced).',
    quote: 'The literal sense is the foundation of all other senses, and especially of the allegorical.',
    quoteSource: 'Postilla Litteralis',
    content: [
      'In an age when allegorical interpretation dominated Christian exegesis, Nicholas of Lyra championed the literal sense of Scripture. This Franciscan friar from Normandy believed that accurate interpretation required understanding what the human author actually meant—and that required knowing Hebrew.',
      'Nicholas was likely of Jewish descent, which may explain his facility with Hebrew and his extensive knowledge of rabbinic interpretation. He studied the great Jewish commentator Rashi so thoroughly that his work has been called "the baptism of Rashi" into Christian scholarship.',
      'His masterwork, the Postilla Litteralis ("Literal Commentary"), covered the entire Bible and became the most widely copied biblical commentary of the medieval period. Unlike many Christian interpreters who rushed past the plain meaning to find allegories, Nicholas insisted on establishing the literal sense first. "The mystical sense," he wrote, "presupposes the literal as a foundation."',
      'To understand the literal sense of the Old Testament, Nicholas argued, Christians must learn from Jewish scholars. He engaged extensively with Hebrew grammar, compared translations, and explained Hebrew idioms for Latin readers. His commentaries include detailed discussions of Hebrew vocabulary and syntax.',
      'When printing was invented, Nicholas\'s Postilla was among the first books published. Luther owned a copy and cited it frequently. The reformer\'s emphasis on the plain sense of Scripture and the importance of Hebrew had deep roots in this medieval Franciscan\'s work.'
    ],
    lessons: [
      'The literal sense of Scripture is foundational—don\'t skip to application',
      'Learning from Jewish interpreters enriches Christian understanding',
      'Scholarly work can have influence centuries after it\'s written',
      'Hebrew knowledge prevents arbitrary interpretations'
    ],
    sources: [
      'Klepper, Deeana Copeland. The Insight of Unbelievers: Nicholas of Lyra and Christian Reading of Jewish Text. University of Pennsylvania Press, 2007.',
      'Krey, Philip D.W. and Lesley Smith, eds. Nicholas of Lyra: The Senses of Scripture. Brill, 2000.',
    ],
  },
  {
    slug: 'andrew-of-st-victor',
    name: 'Andrew of St. Victor',
    title: 'The Hebraist of Paris',
    years: 'c. 1110-1175',
    location: 'Paris & Wigmore, England',
    category: 'medieval',
    summary: 'Andrew pioneered Christian-Jewish dialogue for biblical interpretation, consulting Jewish scholars in Paris to understand the Hebrew Scriptures more accurately.',
    quote: 'In expounding the sacred text, we ought to follow the letter where possible.',
    quoteSource: 'Commentary on the Prophets',
    content: [
      'The Abbey of St. Victor in Paris was a center of intellectual ferment in the twelfth century. Here, Andrew developed an approach to Scripture that scandalized many of his contemporaries: he prioritized the literal meaning of the text and consulted Jewish scholars to understand it.',
      'Andrew had learned from his teacher Hugh of St. Victor that the literal sense of Scripture was important, but he took this principle further than anyone before him. He regularly visited the Jewish quarter of Paris to discuss biblical passages with rabbis, learning Hebrew and absorbing Jewish interpretive traditions.',
      'His commentaries on the Old Testament are remarkable for their time. Where other Christian interpreters found Christ on every page through allegory, Andrew often simply explained what the Hebrew text meant in its original context. He cited Jewish interpretations respectfully, sometimes preferring them to traditional Christian readings.',
      'This approach provoked controversy. Richard of St. Victor, his own student, criticized him for "Judaizing" and abandoning Christian interpretation. But Andrew persisted, believing that understanding the human author\'s meaning was essential before seeking deeper spiritual senses.',
      'Andrew\'s legacy was significant. He helped establish a tradition of literal exegesis that would culminate in the Reformation. His willingness to learn from Jews—at a time of significant Christian-Jewish tensions—demonstrated scholarly integrity and intellectual humility.'
    ],
    lessons: [
      'Seek understanding from those who know the text best, even across boundaries',
      'The literal meaning of Scripture deserves careful attention',
      'Scholarly integrity sometimes requires going against popular opinion',
      'Dialogue across traditions enriches interpretation'
    ],
    sources: [
      'Smalley, Beryl. The Study of the Bible in the Middle Ages. University of Notre Dame Press, 1964.',
      'Signer, Michael A. "Andrew of St. Victor and the Rabbis." Studia Patristica 28 (1993): 113-119.',
    ],
  },

  // ============================================================================
  // RENAISSANCE / PRE-REFORMATION
  // ============================================================================
  {
    slug: 'johann-reuchlin',
    name: 'Johann Reuchlin',
    title: 'The Father of Hebrew Studies',
    years: '1455-1522',
    location: 'Germany',
    category: 'renaissance',
    summary: 'Reuchlin\'s Hebrew grammar and defense of Jewish books against destruction laid the foundation for all Protestant Hebrew scholarship, directly influencing Luther\'s generation.',
    quote: 'I do not wish to be Luther\'s enemy, for we both aim at the same goal: the study of the biblical languages.',
    quoteSource: 'Letter to Philip Melanchthon',
    content: [
      'Johann Reuchlin was not a theologian but a lawyer and humanist—yet his contribution to biblical studies proved revolutionary. Convinced that true learning required access to the sources, he determined to master Hebrew, the language of the Old Testament.',
      'Reuchlin learned Hebrew from Jewish teachers in Italy and Germany, including the emperor\'s Jewish physician. In 1506, he published De Rudimentis Hebraicis, the first comprehensive Hebrew grammar and dictionary written by a Christian. This textbook would train an entire generation of Reformers, including Luther himself.',
      'His Hebrew learning soon drew him into controversy. When a Jewish convert named Pfefferkorn campaigned to destroy all Jewish books except the Bible, Reuchlin defended the value of rabbinic literature for Christian scholarship. The ensuing conflict—the Reuchlin Affair—divided German intellectuals and foreshadowed the Reformation.',
      'Reuchlin argued that Jewish writings, while not Christian, contained genuine wisdom about the Hebrew Scriptures. Christians who wished to interpret the Old Testament properly needed access to Jewish commentaries and grammars. Destroying these books would impoverish Christian learning.',
      'Though Reuchlin never joined the Reformation, his work made it possible. His grammar trained the scholars who would translate Scripture into vernacular languages. His defense of Hebrew learning established the principle that original languages were essential for interpretation. Luther called him "the man who first opened the way for Hebrew studies in Germany."'
    ],
    lessons: [
      'Tools for learning (grammars, dictionaries) can have outsized impact',
      'Defending scholarship sometimes requires courage against popular movements',
      'Humanist learning and Christian faith can work together',
      'Those who prepare the way often don\'t see the full fruit of their labor'
    ],
    sources: [
      'Rummel, Erika. The Case Against Johann Reuchlin. University of Toronto Press, 2002.',
      'Price, David H. Johannes Reuchlin and the Campaign to Destroy Jewish Books. Oxford University Press, 2010.',
    ],
  },
  {
    slug: 'pico-della-mirandola',
    name: 'Giovanni Pico della Mirandola',
    title: 'The Prince of Concord',
    years: '1463-1494',
    location: 'Florence, Italy',
    category: 'renaissance',
    summary: 'Pico learned Hebrew and Aramaic to study Kabbalah, arguing that Jewish mystical texts contained hidden confirmations of Christian truth—sparking Renaissance interest in Hebrew.',
    quote: 'No science can better convince us of the divinity of Christ than magic and Kabbalah.',
    quoteSource: 'Oration on the Dignity of Man',
    content: [
      'Giovanni Pico della Mirandola was only twenty-three when he proposed to defend nine hundred theses in Rome on every branch of human knowledge. Among the most controversial were his claims about Hebrew and Kabbalah—the Jewish mystical tradition.',
      'Pico had learned Hebrew and Aramaic from Jewish teachers in Italy, gaining access to kabbalistic texts that few Christians had ever read. He became convinced that Kabbalah, properly understood, confirmed Christian doctrines including the Trinity and the divinity of Christ.',
      'This was not merely academic curiosity. Pico believed that God had revealed truth through multiple channels, and that the ancient Hebrew sages had preserved genuine spiritual knowledge. By learning Hebrew, Christians could recover insights lost to the Latin tradition.',
      'The Pope condemned thirteen of Pico\'s theses as heretical, and he fled Rome. But his ideas spread nonetheless. His Christian Kabbalah influenced Reuchlin and through him the entire Renaissance Hebrew revival. He demonstrated that Hebrew opened doors to an entire world of spiritual literature.',
      'Pico died at thirty-one, possibly poisoned, but his impact endured. He had shown that Hebrew was not just useful for translation but opened access to profound theological reflection. Renaissance scholars rushed to learn the language of Moses—and of the kabbalists.'
    ],
    lessons: [
      'Hebrew opens doors to entire traditions of spiritual wisdom',
      'Young scholars can make lasting contributions',
      'Intellectual courage sometimes brings persecution',
      'Engaging with unfamiliar traditions can yield unexpected insights'
    ],
    sources: [
      'Farmer, S.A. Syncretism in the West: Pico\'s 900 Theses. Medieval & Renaissance Texts & Studies, 1998.',
      'Copenhaver, Brian P. "Number, Shape, and Meaning in Pico\'s Christian Kabbalah." Natural Particulars, ed. A. Grafton and N. Siraisi, MIT Press, 1999.',
    ],
  },

  // ============================================================================
  // REFORMERS
  // ============================================================================
  {
    slug: 'martin-luther',
    name: 'Martin Luther',
    title: 'The Father of the Reformation',
    years: '1483-1546',
    location: 'Wittenberg, Germany',
    category: 'reformer',
    summary: 'Luther taught himself Hebrew in his 30s to translate the Old Testament, believing that without the original languages, Scripture would be lost to future generations.',
    quote: 'The languages are the sheath in which the sword of the Spirit is contained.',
    quoteSource: 'To the Councilmen of All Cities in Germany, 1524',
    content: [
      'In 1521, Martin Luther found himself in hiding at Wartburg Castle, a fugitive from both Pope and Emperor. Rather than despair, he saw this exile as divine providence—an opportunity to give the German people the Scriptures in their own tongue.',
      'Luther had already learned Greek, but Hebrew presented a greater challenge. There were few Hebrew grammars available, and fewer still who could teach the language. Yet Luther was undeterred. He obtained Johannes Reuchlin\'s Hebrew grammar and lexicon and began the painstaking work of self-instruction.',
      'The Reformer spent hours each day wrestling with the Hebrew text. He would later describe Hebrew as "the holiest of all languages" and insisted that the nuances of the original could never be fully captured in translation. "The Hebrew language is the best and richest in words," he wrote, "for it contains things that cannot be expressed in other languages."',
      'By 1534, Luther had completed his translation of the entire Bible. His Old Testament translation, born from his Hebrew studies, shaped the German language itself and became the foundation for Protestant biblical scholarship. He trained a generation of students in Hebrew, establishing it as essential for pastoral ministry.',
      'Even in his final years, Luther continued studying Hebrew daily. When asked why an old man would still labor over grammar, he replied that he was "still a child learning the ABC\'s of the Hebrew language" and would remain so until he met his Lord.'
    ],
    lessons: [
      'Start where you are—Luther began learning Hebrew in his 30s with limited resources',
      'Consistency matters more than conditions—he studied even while in hiding',
      'The original languages unlock depths that translations cannot fully convey',
      'Remain a humble student throughout life'
    ],
    sources: [
      'Brecht, Martin. Martin Luther: Shaping and Defining the Reformation. Fortress Press, 1990.',
      'Hendrix, Scott. Martin Luther: Visionary Reformer. Yale University Press, 2015.',
    ],
  },
  {
    slug: 'john-calvin',
    name: 'John Calvin',
    title: 'The Theologian of Geneva',
    years: '1509-1564',
    location: 'Geneva, Switzerland',
    category: 'reformer',
    summary: 'Calvin\'s Hebrew expertise shaped his influential commentaries on nearly every Old Testament book, setting the standard for Reformed exegesis for centuries.',
    quote: 'We must read the Scriptures with the purpose of finding Christ in them. Whoever turns aside from this object, even though he wears himself out in learning, will never reach the knowledge of the truth.',
    quoteSource: 'Commentary on John 5:39',
    content: [
      'John Calvin arrived in Paris as a young man destined for a career in law. But providence had other plans. At the Collège Royal, he encountered the revolutionary idea that Scripture should be read in its original languages. This encounter would change the course of church history.',
      'Under the influence of humanist scholars, Calvin devoted himself to Greek and Hebrew. Unlike many of his contemporaries who relied on the Latin Vulgate, Calvin insisted on going "ad fontes"—back to the sources. He would spend hours each day with his Hebrew Bible, often working by candlelight into the early morning.',
      'When Calvin settled in Geneva, he established the Academy with Hebrew instruction at its core. Every minister trained there would learn to read the Old Testament in its original language. Calvin himself lectured on the Hebrew text, working through entire books of the Bible with his students.',
      'His commentaries on the Old Testament remain models of careful exegesis. Calvin refused to spiritualize away difficult passages or impose foreign meanings onto the Hebrew text. "Let the author\'s genuine meaning be our goal," he taught. This commitment to the original languages produced commentaries that scholars still consult today.',
      'Calvin\'s Hebrew scholarship was not mere academic exercise. He believed that the original languages were God\'s chosen vessels for revelation. "God has spoken in Hebrew," he wrote, "and we must listen in Hebrew if we would hear Him rightly."'
    ],
    lessons: [
      'The original languages connect us directly to God\'s revelation',
      'Scholarly rigor and devotional reading are not opposed but united',
      'Training others multiplies our own efforts',
      'Faithful interpretation requires linguistic humility'
    ],
    sources: [
      'Parker, T.H.L. Calvin\'s Old Testament Commentaries. Westminster John Knox Press, 1986.',
      'Gordon, Bruce. Calvin. Yale University Press, 2009.',
    ],
  },
  {
    slug: 'huldrych-zwingli',
    name: 'Huldrych Zwingli',
    title: 'The Reformer of Zurich',
    years: '1484-1531',
    location: 'Zurich, Switzerland',
    category: 'reformer',
    summary: 'Zwingli pioneered the "Prophezei"—daily public Scripture readings in Hebrew and Greek that trained an entire generation of Reformed pastors.',
    quote: 'The Word of God will take its course, even though we oppose it... For the Word is a fire and a hammer, capable of breaking rocky hearts.',
    quoteSource: 'On the Clarity and Certainty of the Word of God, 1522',
    content: [
      'In 1519, Ulrich Zwingli took up his post as the people\'s priest at the Great Minster in Zurich. On his first Sunday, he did something revolutionary: instead of following the prescribed lectionary, he opened the Greek New Testament and began expounding Matthew\'s Gospel verse by verse. The Reformation in Zurich had begun.',
      'But Zwingli knew that true reformation required the Old Testament as well. He set himself to master Hebrew, studying under the converted Jewish scholar Moses of Winterthur. The language came slowly at first, but Zwingli persevered, convinced that pastors must be able to read God\'s Word in its original form.',
      'In 1525, Zwingli established the "Prophezei" (Prophecy)—daily gatherings where the clergy and advanced students would work through the Hebrew and Greek texts together. Each morning at 7 AM, the Great Minster would fill with men eager to learn. They would read the Hebrew text, compare it with the Greek Septuagint and Latin Vulgate, and then discuss the meaning together.',
      'This innovative approach produced a generation of linguistically skilled pastors. The Prophezei became the model for theological education throughout the Reformed world. Heinrich Bullinger, Zwingli\'s successor, continued the practice for another forty years.',
      'Zwingli died on the battlefield at Kappel in 1531, defending Zurich against Catholic forces. But his legacy lived on in the hundreds of pastors he had trained to read and teach from the original Scriptures.'
    ],
    lessons: [
      'Corporate study strengthens individual learning',
      'Daily discipline in the languages builds lasting skill',
      'Training future leaders is essential kingdom work',
      'The original languages serve the preaching of the Word'
    ],
    sources: [
      'Stephens, W.P. Zwingli: An Introduction to His Thought. Oxford University Press, 1992.',
      'Gordon, Bruce. The Swiss Reformation. Manchester University Press, 2002.',
    ],
  },
  {
    slug: 'martin-bucer',
    name: 'Martin Bucer',
    title: 'The Ecumenical Reformer',
    years: '1491-1551',
    location: 'Strasbourg & Cambridge',
    category: 'reformer',
    summary: 'Bucer brought continental Hebrew scholarship to England, influencing the translation of the Book of Common Prayer and training the next generation of English Reformers.',
    quote: 'No one can understand the Scriptures unless he understands the languages in which they were written.',
    quoteSource: 'De Regno Christi, 1550',
    content: [
      'Martin Bucer was a Dominican friar when he first heard Luther debate at Heidelberg in 1518. That encounter changed everything. Within years, he had left the monastery, married, and become a leading Reformer in Strasbourg.',
      'In Strasbourg, Bucer established one of the most rigorous programs of biblical training in Europe. Hebrew was central to his curriculum. He believed that the Reformation could only advance if its ministers could access Scripture directly, without dependence on medieval Latin commentaries.',
      'Bucer\'s Hebrew expertise showed in his commentaries, particularly on the Psalms and the Gospels. He demonstrated how knowledge of Hebrew idiom illuminated the Greek New Testament, since its authors thought in Semitic patterns. This insight influenced Reformed hermeneutics for generations.',
      'When Catholic forces threatened Strasbourg in 1549, Bucer fled to England at the invitation of Archbishop Cranmer. At Cambridge, he continued teaching Hebrew and contributed to the revision of the Book of Common Prayer. His emphasis on the original languages shaped Anglican biblical scholarship.',
      'Bucer died in Cambridge in 1551, worn out by exile and labor. But his students carried his love for Hebrew back to their parishes. When Mary Tudor came to the throne, she ordered his bones exhumed and burned. But nothing could destroy what he had planted in his students\' hearts.'
    ],
    lessons: [
      'Hebrew knowledge illuminates the entire Bible, including the New Testament',
      'Exile and hardship cannot stop faithful teaching',
      'Cross-cultural ministry spreads linguistic learning',
      'What we teach lives on in our students'
    ],
    sources: [
      'Wright, D.F. Martin Bucer: Reforming Church and Community. Cambridge University Press, 1994.',
      'Greschat, Martin. Martin Bucer: A Reformer and His Times. Westminster John Knox Press, 2004.',
    ],
  },
  {
    slug: 'john-knox',
    name: 'John Knox',
    title: 'The Thundering Scot',
    years: '1514-1572',
    location: 'Scotland & Geneva',
    category: 'reformer',
    summary: 'Knox studied Hebrew under Calvin in Geneva and brought that learning back to Scotland, shaping the rigorous biblical training of the Scottish Kirk.',
    quote: 'A man with God is always in the majority.',
    quoteSource: 'Attributed',
    content: [
      'John Knox\'s path to Hebrew was marked by galley chains and exile. In 1547, he was captured by French forces and spent nineteen months as a galley slave, rowing in chains. Even in this brutal captivity, he clung to his calling to preach God\'s Word.',
      'After his release, Knox made his way to Geneva, where he encountered Calvin\'s rigorous approach to Scripture. Here was a city where every minister was trained in the biblical languages. Knox threw himself into study, adding Hebrew to his Greek. The discipline of the galleys had prepared him for the discipline of learning.',
      'In Geneva, Knox worshipped in a congregation of English exiles and worked on the Geneva Bible—the most accurate English translation of its era. His Hebrew training showed in the marginal notes, which revealed depths of meaning hidden in the original text.',
      'When Knox returned to Scotland in 1559, he brought this love of the original languages with him. The Book of Discipline he helped draft required that every parish school teach Latin, and that promising students advance to Greek and Hebrew. Scotland would become a nation of biblical readers.',
      'Knox preached with fire because he knew the text in its original form. He could trace the Hebrew words and show their force. His sermons at St. Giles\' Cathedral shook a nation because they were grounded in the very words God had spoken.'
    ],
    lessons: [
      'Suffering can prepare us for deeper study',
      'Exile can become an opportunity for learning',
      'National reformation requires an educated ministry',
      'Hebrew knowledge empowers bold preaching'
    ],
    sources: [
      'Dawson, Jane. John Knox. Yale University Press, 2015.',
      'Reid, W. Stanford. Trumpeter of God: A Biography of John Knox. Scribner, 1974.',
    ],
  },

  // ============================================================================
  // PURITANS
  // ============================================================================
  {
    slug: 'john-owen',
    name: 'John Owen',
    title: 'The Prince of Puritans',
    years: '1616-1683',
    location: 'Oxford, England',
    category: 'puritan',
    summary: 'Owen\'s Hebrew mastery informed his massive theological works, including his 7-volume commentary on Hebrews that remains unsurpassed in its depth.',
    quote: 'The vigour, and power, and compass of the wit and mind of man is commendable; but unless it be piously cultivated in the study of the Scriptures, it will never be able to guide us to eternal life.',
    quoteSource: 'Biblical Theology',
    content: [
      'John Owen entered Queen\'s College, Oxford at just twelve years of age. By nineteen, he had his M.A. But his education was only beginning. As the English Civil War raged, Owen devoted himself to the biblical languages with an intensity that would make him the most learned Puritan of his generation.',
      'Owen believed that Hebrew was essential not just for ministers but for anyone who would plumb the depths of Scripture. He spent hours each day with his Hebrew Bible, even when serving as Vice-Chancellor of Oxford University and chaplain to Oliver Cromwell. Power and position never distracted him from his first love.',
      'His seven-volume Exposition of Hebrews demonstrates his Hebrew mastery. Owen traces Greek expressions back to their Hebrew roots, showing how the New Testament authors thought in Semitic categories. He cross-references thousands of Old Testament passages, illuminating connections that only knowledge of the original languages could reveal.',
      'Even in his final years, when ejected from Oxford by the Act of Uniformity and forced to preach in barns and private homes, Owen continued his Hebrew studies. His works on Biblical Theology and the Holy Spirit show the fruit of a lifetime with the sacred languages.',
      'On his deathbed, Owen was still working on his final manuscript. "I am leaving the ship of the church in a storm," he said, "but whilst the great Pilot is in it, the loss of a poor under-rower will be inconsiderable." That under-rower had taught generations to read God\'s Word in its original beauty.'
    ],
    lessons: [
      'Start young and never stop learning',
      'High office is no excuse to neglect study',
      'The deepest theology grows from careful language work',
      'Persecution cannot stop the devoted student'
    ],
    sources: [
      'Trueman, Carl. John Owen: Reformed Catholic, Renaissance Man. Ashgate, 2007.',
      'Goold, William H., ed. The Works of John Owen. Banner of Truth, 1965.',
    ],
  },
  {
    slug: 'thomas-goodwin',
    name: 'Thomas Goodwin',
    title: 'The President of Magdalen',
    years: '1600-1680',
    location: 'Cambridge & Oxford',
    category: 'puritan',
    summary: 'Goodwin learned Hebrew at Cambridge and later, as President of Magdalen College, ensured that every Oxford student engaged with the biblical languages.',
    quote: 'Never was truth so precious as when you have paid for it with suffering.',
    quoteSource: 'Exposition of Ephesians',
    content: [
      'Thomas Goodwin arrived at Cambridge in 1613, a brilliant but unconverted young man. His intellectual gifts were evident, but his heart remained cold to spiritual things. Then, at age twenty, while walking to a funeral, the Spirit of God awakened him. From that day forward, Goodwin devoted his considerable intellect to understanding Scripture.',
      'At Cambridge, Goodwin discovered the power of the original languages. He had learned Latin as a boy, but now he added Greek and Hebrew. His tutor remarked that young Goodwin seemed to live in the library, emerging only for meals and prayer. The Hebrew especially captivated him—here was the very language God had used to reveal His covenant with Israel.',
      'Goodwin\'s preaching transformed under the influence of his Hebrew studies. He could trace a word through the Old Testament, showing how God had progressively revealed His purposes. His sermons on Christ in the Old Testament drew crowds who marveled at his insights.',
      'During the Civil War, Goodwin served as an Independent representative to the Westminster Assembly. Later, Cromwell appointed him President of Magdalen College, Oxford. In this role, he championed Hebrew instruction, insisting that every student for the ministry must be grounded in the sacred languages.',
      'Goodwin\'s expositions of Ephesians, Revelation, and Christ\'s Heart demonstrate his Hebrew learning. He traces New Testament concepts to their Old Testament roots, showing the unity of Scripture. Even today, his works reward readers who share his love for the original text.'
    ],
    lessons: [
      'Conversion ignites a passion for Scripture in its original form',
      'Intensive study seasons produce lifelong fruit',
      'Leadership positions are opportunities to promote language learning',
      'The Old Testament illuminates the New'
    ],
    sources: [
      'Lawrence, Michael. Conversion: A Healing of the Understanding. Reformation Heritage Books, 2019.',
      'Beeke, Joel, and Randall Pederson. Meet the Puritans. Reformation Heritage Books, 2006.',
    ],
  },
  {
    slug: 'william-perkins',
    name: 'William Perkins',
    title: 'The Father of Puritanism',
    years: '1558-1602',
    location: 'Cambridge, England',
    category: 'puritan',
    summary: 'Perkins established Hebrew study as foundational for Reformed ministry in England, training an entire generation of Puritan preachers at Cambridge.',
    quote: 'The heart of religion is in the practice part.',
    quoteSource: 'The Art of Prophesying',
    content: [
      'William Perkins arrived at Christ\'s College, Cambridge as a wayward youth given to drinking and astrology. But during his student years, the gospel transformed him. The same brilliance he had wasted on sin he now devoted to Scripture. He emerged as the most influential English theologian of his generation.',
      'Perkins understood that powerful preaching required deep scholarship. He mastered Hebrew not merely as an academic exercise but as essential preparation for gospel ministry. His lectures at Cambridge drew students from across England who wanted to learn his method.',
      'His masterwork, "The Art of Prophesying," laid out a method of biblical interpretation that began with the original languages. Perkins taught his students to work from Hebrew and Greek, not Latin translations. "You must understand the fountain," he said, "before you can direct the stream."',
      'Though Perkins died at just forty-four, his influence was immense. His students included William Ames, who shaped Dutch Reformed theology, and many of the leaders of early New England. His insistence on Hebrew learning became the standard for Puritan ministerial training.',
      'Perkins often visited prisoners in Cambridge jail, teaching them the gospel in simple terms. But his simplicity was hard-won, the fruit of years with the original text. He could make the deep things of God plain because he had first understood them in their depth.'
    ],
    lessons: [
      'God can redirect misspent brilliance toward His purposes',
      'Original language study serves plain preaching, not prideful display',
      'Training future ministers multiplies our impact',
      'Deep scholarship and practical ministry go together'
    ],
    sources: [
      'Muller, Richard. Grace and Freedom: William Perkins and the Early Modern Reformed Understanding of Free Choice and Divine Grace. Oxford University Press, 2020.',
      'Breward, Ian, ed. The Work of William Perkins. Sutton Courtenay Press, 1970.',
    ],
  },
  {
    slug: 'matthew-poole',
    name: 'Matthew Poole',
    title: 'The Indefatigable Commentator',
    years: '1624-1679',
    location: 'London, England',
    category: 'puritan',
    summary: 'Poole spent his entire fortune and health producing the Synopsis Criticorum—a massive compilation of Hebrew scholarship that took scholars across denominational lines to complete.',
    quote: 'The Scripture is the most perfect rule of faith and manners.',
    quoteSource: 'Synopsis Criticorum Preface',
    content: [
      'Matthew Poole conceived an audacious vision: to compile all the best biblical scholarship in one massive work, organized verse by verse, drawing on the Hebrew and Greek expertise of scholars across Europe. The Synopsis Criticorum Sacrorum Biblicorum would consume his fortune, his health, and ultimately his life—but it would serve the church for centuries.',
      'Poole began the Synopsis in 1669. He corresponded with scholars across denominational and national lines, Catholic and Protestant, English and Continental. What united them was a shared commitment to understanding Scripture in its original languages. The Hebrew sections drew on the best Jewish and Christian scholarship available.',
      'The work required extraordinary Hebrew knowledge. Poole had to evaluate competing translations, weigh grammatical arguments, and synthesize hundreds of scholarly opinions. He often worked sixteen hours a day, comparing Hebrew manuscripts and rabbinic commentaries.',
      'The first volumes of the Synopsis appeared to wide acclaim. But Poole had spent his entire fortune on the project. When the Great Plague struck London in 1665, he continued working. When the Great Fire consumed much of the city in 1666, he kept on. Nothing would stop him from completing his service to the church.',
      'Poole died in 1679 with the Synopsis unfinished. His friends completed it and published the five massive folio volumes. For the next two centuries, no serious Bible student was without Poole\'s Synopsis. It stands as a monument to what one man\'s devotion to the original languages can accomplish.'
    ],
    lessons: [
      'Great works require great sacrifice',
      'Scholarship can unite believers across divisions',
      'One person\'s labor serves countless future students',
      'Financial security is less valuable than kingdom impact'
    ],
    sources: [
      'Pryde, George S. "Matthew Poole." Oxford Dictionary of National Biography.',
      'Muller, Richard. Post-Reformation Reformed Dogmatics. Baker Academic, 2003.',
    ],
  },
  {
    slug: 'john-gill',
    name: 'John Gill',
    title: 'The Baptist Hebraist',
    years: '1697-1771',
    location: 'London, England',
    category: 'puritan',
    summary: 'Gill wrote one of the first Hebrew grammars in English and produced a 9-volume commentary drawing extensively on rabbinic sources and Hebrew linguistics.',
    quote: 'Nothing short of almighty power can take a sinner from the dunghill of sin and set him among princes.',
    quoteSource: 'Commentary on Psalm 113',
    content: [
      'John Gill was eleven years old when he began teaching himself Hebrew. His father was a poor cloth merchant who could not afford formal education, but young John borrowed books and studied by firelight after his chores were done. By his teenage years, he could read the Hebrew Bible fluently.',
      'At nineteen, Gill was called to pastor the Baptist congregation at Horsleydown, Southwark. He would serve there for fifty-one years, never taking a vacation. Every morning before dawn, he was at his desk with his Hebrew Bible and rabbinic commentaries. Every evening after pastoral duties, he returned to study.',
      'Gill\'s self-taught Hebrew eventually surpassed that of university-trained scholars. He produced "A Dissertation Concerning the Antiquity of the Hebrew Language," arguing for Hebrew as the original human language. His Hebrew grammar, written for English readers, opened the language to those without Latin.',
      'His magnum opus was his Exposition of the Old and New Testaments—nine volumes produced over thirty years. Gill drew extensively on rabbinic literature, the Targums, and Jewish commentators. He believed that Jewish scholarship, properly evaluated, could illuminate the Hebrew Scriptures for Christian readers.',
      'Gill never grew wealthy from his pastoral work. He turned down higher-paying positions to stay with his congregation. But he died rich in the only currency that mattered to him: a lifetime of insight into God\'s Word in its original form, shared freely with his people and preserved for future generations.'
    ],
    lessons: [
      'Formal education is not required—determination is',
      'Consistency over decades produces massive output',
      'Jewish scholarship illuminates the Hebrew Bible',
      'Faithful pastoral ministry and deep scholarship can coexist'
    ],
    sources: [
      'Rippon, John. A Brief Memoir of the Life and Writings of the Late Rev. John Gill, D.D. 1838.',
      'Haykin, Michael. "John Gill." Reformation and Revival Journal, 1995.',
    ],
  },

  // ============================================================================
  // WESTMINSTER DIVINES
  // ============================================================================
  {
    slug: 'westminster-assembly',
    name: 'The Westminster Assembly',
    title: 'The Great Gathering',
    years: '1643-1653',
    location: 'Westminster Abbey, London',
    category: 'westminster',
    summary: 'Over 150 theologians, many trained in Hebrew, gathered for five years to produce the Westminster Standards—confession and catechisms that have shaped Reformed Christianity for centuries.',
    quote: 'The whole counsel of God concerning all things necessary for His own glory, man\'s salvation, faith and life, is either expressly set down in Scripture, or by good and necessary consequence may be deduced from Scripture.',
    quoteSource: 'Westminster Confession of Faith, Chapter 1.6',
    content: [
      'In the summer of 1643, as civil war raged across England, Parliament summoned an assembly of divines to reform the doctrine, worship, and government of the English church. Over 150 men gathered in the Jerusalem Chamber of Westminster Abbey—ministers, scholars, and a few laymen. What united them was a shared commitment to Scripture in its original languages.',
      'The Assembly included some of the finest Hebraists in Europe. John Lightfoot had spent years studying rabbinic literature. Edward Reynolds was renowned for his linguistic precision. Herbert Palmer had mastered the languages while still a student. Together, they would labor for over five years to produce documents that would shape Reformed Christianity for centuries.',
      'The debates were rigorous. Every claim had to be grounded in Scripture, and that meant consulting the Hebrew and Greek texts. When the divines discussed covenant theology, they traced the Hebrew word "berith" through its Old Testament occurrences. When they addressed the law of God, they parsed the Hebrew of the Decalogue.',
      'The Confession of Faith they produced was a masterpiece of careful theological formulation, every clause hammered out in debate. The Larger and Shorter Catechisms distilled their Hebrew-informed theology into questions and answers that children could memorize and adults could spend a lifetime unpacking.',
      'The Assembly completed its work in 1647, though it continued meeting until 1653. Many of its members would suffer for their faith—ejected from their pulpits, imprisoned, or exiled. But the documents they produced, rooted in the original languages, continue to guide Reformed churches around the world.'
    ],
    lessons: [
      'Collaborative scholarship produces enduring documents',
      'Crisis and conflict can occasion great theological work',
      'Grounding theology in the original languages protects from error',
      'Work done faithfully outlasts those who do it'
    ],
    sources: [
      'Van Dixhoorn, Chad. The Minutes and Papers of the Westminster Assembly, 1643-1653. Oxford University Press, 2012.',
      'Fesko, J.V. The Theology of the Westminster Standards. Crossway, 2014.',
    ],
  },
  {
    slug: 'john-lightfoot',
    name: 'John Lightfoot',
    title: 'The Rabbinic Scholar',
    years: '1602-1675',
    location: 'Cambridge, England',
    category: 'westminster',
    summary: 'Lightfoot mastered rabbinic Hebrew and Aramaic literature, showing how Jewish sources illuminate the New Testament world and the Hebrew Scriptures.',
    quote: 'I have searched into every part of the Jewish writings, and the truth is, I have found very great helps from them.',
    quoteSource: 'Horae Hebraicae et Talmudicae',
    content: [
      'John Lightfoot was not content to know biblical Hebrew. He wanted to understand the world in which the Bible was written—the customs, the idioms, the debates of ancient Israel. So he did something few Christian scholars of his era attempted: he mastered rabbinic literature.',
      'Lightfoot learned not only biblical Hebrew but the Aramaic of the Targums and Talmud, the Hebrew of the Mishnah and Midrash. He read texts that Christian scholars typically ignored, convinced that they held keys to understanding both Testaments. His persistence opened treasures that had been locked to the church for centuries.',
      'His great work, "Horae Hebraicae et Talmudicae" (Hebrew and Talmudic Hours), placed New Testament passages alongside rabbinic parallels. Suddenly, obscure sayings of Jesus blazed with meaning. The customs of the Pharisees, the debates about the law, the festivals and practices—all became clear when set against their Jewish background.',
      'At the Westminster Assembly, Lightfoot was invaluable. When debates turned on the meaning of a Hebrew term, the divines looked to him. His understanding of Jewish interpretive methods shaped how the Assembly read the Old Testament promises.',
      'Lightfoot died in 1675, still working on his rabbinic studies. He had opened a door that scholars continue to walk through today. Every commentary that draws on Jewish sources, every study of the Jewish background of the New Testament, builds on the foundation he laid.'
    ],
    lessons: [
      'Go beyond the biblical text to understand its world',
      'Unfamiliar sources may hold unexpected treasures',
      'Jewish scholarship illuminates Christian Scripture',
      'Specialized knowledge serves the whole church'
    ],
    sources: [
      'Todd, J.H. "John Lightfoot." Dictionary of National Biography.',
      'Lightfoot, John. Horae Hebraicae et Talmudicae. Oxford University Press, 1859 reprint.',
    ],
  },
  {
    slug: 'edward-reynolds',
    name: 'Edward Reynolds',
    title: 'The Peaceable Bishop',
    years: '1599-1676',
    location: 'Oxford & Norwich',
    category: 'westminster',
    summary: 'Reynolds contributed linguistic precision to the Westminster Assembly\'s work and later became one of the few Puritans willing to serve as bishop to preserve Reformed influence in the restored Church of England.',
    quote: 'The Scripture is a rich mine, and every godly man is a refiner that should search for the ore.',
    quoteSource: 'An Explication of the Hundredth and Tenth Psalm',
    content: [
      'Edward Reynolds was a man of peace in an age of conflict. Trained at Oxford in the biblical languages, he became known for combining scholarly precision with irenic temperament. When others thundered, Reynolds persuaded. When others divided, he sought unity.',
      'His Hebrew scholarship appeared in his careful expositions. His work on Psalm 110 traced the Messianic prophecy through the Hebrew text with meticulous attention to grammar and syntax. He showed how the Hebrew revealed Christ in ways that translations could only approximate.',
      'At the Westminster Assembly, Reynolds served as a moderating voice. He insisted that theological formulations must be tested against the original languages. His linguistic precision helped shape some of the Confession\'s most carefully worded passages.',
      'When the monarchy was restored in 1660, Reynolds faced a choice. He could refuse the Act of Uniformity and join his ejected Puritan brethren, or he could accept a bishopric and try to preserve Reformed influence within the established church. After much prayer, he chose to serve as Bishop of Norwich.',
      'Some criticized him. Others understood. Reynolds used his position to protect Nonconformist ministers where he could and to maintain Reformed preaching in his diocese. His Hebrew learning continued to inform his ministry. He died having served Christ faithfully in both the tumult of revolution and the compromises of restoration.'
    ],
    lessons: [
      'Linguistic precision serves theological clarity',
      'Peaceful temperament can accomplish what conflict cannot',
      'Faithfulness sometimes requires difficult choices',
      'Scholarship serves unity, not division'
    ],
    sources: [
      'Appleby, David. Black Bartholomew\'s Day: Preaching, Polemic and Restoration Nonconformity. Manchester University Press, 2007.',
      'Reynolds, Edward. The Whole Works. B. Holdsworth, 1826.',
    ],
  },
  {
    slug: 'herbert-palmer',
    name: 'Herbert Palmer',
    title: 'The Catechist',
    years: '1601-1647',
    location: 'Cambridge & Westminster',
    category: 'westminster',
    summary: 'Palmer helped draft the Westminster Shorter Catechism, distilling complex Hebrew-informed theology into memorable questions and answers that have taught millions.',
    quote: 'What is the chief end of man? To glorify God and enjoy Him forever.',
    quoteSource: 'Westminster Shorter Catechism, Q. 1',
    content: [
      'Herbert Palmer believed that the deepest theology should be accessible to the simplest believer. At Cambridge, he had mastered Hebrew and Greek, but his passion was teaching ordinary people the truths he found in the original text. His catechisms and primers became some of the most popular religious education tools in England.',
      'Palmer\'s linguistic training showed in his precision. When he crafted questions for catechisms, he weighed every word. The definitions had to be exact enough to guard against error yet simple enough for a child to memorize. This required him to distill his Hebrew-informed understanding into the plainest English.',
      'At the Westminster Assembly, Palmer was appointed to the committee that drafted the Shorter Catechism. Here his gifts found their fullest expression. The catechism\'s 107 questions and answers compressed the Confession\'s theology into a form that families could use for daily instruction.',
      'The opening question reflects Palmer\'s approach: "What is the chief end of man?" The answer—"Man\'s chief end is to glorify God and enjoy Him forever"—distills volumes of covenant theology into eleven words. Behind that simple sentence lay years of Hebrew study and theological reflection.',
      'Palmer died in 1647, exhausted by his labors, before the catechism was completed. But his colleagues finished what he had begun. For nearly four centuries, children have learned the faith through questions he helped frame—proof that deep scholarship can produce the simplest, most enduring teaching.'
    ],
    lessons: [
      'Deep learning should serve clear teaching',
      'Precision in language protects truth for generations',
      'The best theology can be stated simply',
      'Work begun faithfully will be completed by others'
    ],
    sources: [
      'Van Dixhoorn, Chad. "Herbert Palmer." Oxford Dictionary of National Biography.',
      'Carruthers, S.W. The Westminster Shorter Catechism: For Study Classes. Presbyterian Board of Publications, 1908.',
    ],
  },

  // ============================================================================
  // POST-REFORMATION / ENLIGHTENMENT (17th-18th Century)
  // ============================================================================
  {
    slug: 'johannes-buxtorf',
    name: 'Johannes Buxtorf the Elder',
    title: 'Master of the Rabbis',
    years: '1564-1629',
    location: 'Basel, Switzerland',
    category: 'enlightenment',
    summary: 'Buxtorf created the essential tools for Protestant Hebrew scholarship—grammars, lexicons, and editions of rabbinic texts—earning the title "Master of the Rabbis" from Jewish scholars themselves.',
    quote: 'The Hebrew language is the key to the sanctuary of Scripture.',
    quoteSource: 'Thesaurus Grammaticus Linguae Sanctae Hebraeae',
    content: [
      'In Basel, a young Johannes Buxtorf inherited his father\'s passion for Hebrew and exceeded it beyond all expectations. He would become the greatest Christian Hebraist of his generation, producing tools that scholars would use for centuries.',
      'Buxtorf\'s accomplishments were staggering. His Hebrew and Chaldee Lexicon remained the standard reference for two hundred years. His Tiberias explained the Masoretic system of vowel points. His editions of rabbinic texts made Jewish scholarship accessible to Christian readers for the first time.',
      'What made Buxtorf exceptional was his mastery of rabbinic literature. He read not just the Hebrew Bible but the Talmud, Midrash, and medieval Jewish commentators in their original languages. Jewish scholars were so impressed that they called him "Master of the Rabbis"—an extraordinary honor from a community often persecuted by Christians.',
      'Buxtorf\'s home became an academy where students from across Europe came to learn Hebrew. He trained them not just in biblical Hebrew but in the full range of Jewish literature. His son, Johannes Buxtorf the Younger, continued his work, creating a scholarly dynasty.',
      'The Buxtorf legacy shaped Protestant scholarship for generations. Their tools made serious Hebrew study possible for pastors who lacked access to Jewish teachers. When missionaries later sought to share the gospel with Jewish people, they turned to Buxtorf\'s works to understand Jewish thought from the inside.'
    ],
    lessons: [
      'Creating scholarly tools multiplies your impact exponentially',
      'Mastering a field requires engaging with its full tradition',
      'Respect from those you study is the highest scholarly honor',
      'Teaching the next generation extends your work beyond your lifetime'
    ],
    sources: [
      'Burnett, Stephen G. From Christian Hebraism to Jewish Studies. Brill, 1996.',
      'Muller, Richard A. Post-Reformation Reformed Dogmatics, Vol. 2. Baker Academic, 2003.',
    ],
  },
  {
    slug: 'brian-walton',
    name: 'Brian Walton',
    title: 'Editor of the London Polyglot',
    years: '1600-1661',
    location: 'London, England',
    category: 'enlightenment',
    summary: 'Walton assembled the London Polyglot Bible—presenting Scripture in nine languages including Hebrew—the most ambitious biblical publishing project in English history.',
    quote: 'The variety of translations serves not to breed doubt but to establish certainty.',
    quoteSource: 'Prolegomena to the Polyglot Bible',
    content: [
      'In 1653, with England still recovering from civil war, Brian Walton proposed an audacious project: a Bible presenting the text in Hebrew, Greek, Latin, Syriac, Ethiopic, Arabic, Persian, and two Aramaic versions—all in parallel columns.',
      'The project seemed impossible. Walton was a royalist clergyman who had lost his position during the Commonwealth. He had no institutional backing and limited funds. Yet he believed that comparing texts in their original languages was essential for understanding Scripture.',
      'Walton assembled a team of the finest scholars in England. They worked for four years, wrestling with ancient manuscripts and unfamiliar scripts. The Hebrew text received particular attention—Walton included both the consonantal text and variant readings from different manuscript traditions.',
      'The London Polyglot appeared in six massive volumes between 1654 and 1657. It included extensive scholarly apparatus explaining textual variants and translation choices. For the first time, English scholars had access to the full range of biblical languages without traveling to continental libraries.',
      'Walton\'s achievement demonstrated that Protestant England could match the great Catholic Polyglot Bibles. More importantly, it established the principle that serious biblical study required comparing texts across languages. The Hebrew original, standing alongside its translations, could speak more clearly than any single version alone.'
    ],
    lessons: [
      'Great projects require assembling teams with diverse skills',
      'Comparison across translations illuminates the original',
      'Scholarly work can be done even in difficult circumstances',
      'Making resources accessible democratizes learning'
    ],
    sources: [
      'Todd, Henry John. Memoirs of the Life and Writings of the Right Rev. Brian Walton. London, 1821.',
      'Miller, Peter N. "The "Antiquarianization" of Biblical Scholarship." Journal of the History of Ideas 54 (1993): 463-498.',
    ],
  },
  {
    slug: 'robert-lowth',
    name: 'Robert Lowth',
    title: 'Discoverer of Hebrew Poetry',
    years: '1710-1787',
    location: 'Oxford & London, England',
    category: 'enlightenment',
    summary: 'Lowth revolutionized biblical interpretation by discovering the principles of Hebrew parallelism, showing that the Psalms and Prophets were sophisticated poetry, not primitive prose.',
    quote: 'The poems of the Hebrews abound with splendid imagery and bold metaphor.',
    quoteSource: 'Lectures on the Sacred Poetry of the Hebrews',
    content: [
      'When Robert Lowth became Professor of Poetry at Oxford in 1741, he faced an unusual question: Was Hebrew poetry actually poetry? Many scholars assumed that ancient Hebrew was too primitive for true literary artistry.',
      'Lowth demolished this assumption. In his famous Lectures on the Sacred Poetry of the Hebrews, he demonstrated that Hebrew poetry operated on principles different from Greek and Latin but equally sophisticated. His key discovery was parallelism—the way Hebrew poets structured meaning by balancing lines against each other.',
      'Lowth identified three types of parallelism: synonymous (where the second line echoes the first), antithetic (where lines contrast), and synthetic (where the second line develops the first). This framework unlocked the poetry of the Psalms, Proverbs, and Prophets for generations of readers.',
      'His work transformed biblical interpretation. Passages that had seemed repetitive or awkward suddenly revealed artistic intention. Translators began arranging poetic texts in verse form rather than prose. The Hebrew Bible emerged as great literature, not just sacred history.',
      'Lowth\'s influence extended beyond academia. As Bishop of London, he helped revise the King James Bible and produced his own influential translation of Isaiah. His work showed that Hebrew scholarship could illuminate Scripture for ordinary readers, not just specialists.'
    ],
    lessons: [
      'Understanding literary form unlocks meaning',
      'Ancient texts may follow unfamiliar but sophisticated patterns',
      'Scholarly discoveries should serve the church, not just the academy',
      'Fresh eyes on familiar texts can yield transformative insights'
    ],
    sources: [
      'Jarick, John, ed. Sacred Conjectures: The Context and Legacy of Robert Lowth and Jean Astruc. T&T Clark, 2007.',
      'Kugel, James L. The Idea of Biblical Poetry. Yale University Press, 1981.',
    ],
  },
  {
    slug: 'john-gill-baptist',
    name: 'John Gill',
    title: 'The Baptist Hebraist',
    years: '1697-1771',
    location: 'London, England',
    category: 'enlightenment',
    summary: 'Gill wrote one of the first Hebrew grammars in English and produced a massive 9-volume commentary drawing extensively on rabbinic sources and Hebrew linguistics.',
    quote: 'Nothing short of almighty power can take a sinner from the dunghill of sin and set him among princes.',
    quoteSource: 'Commentary on Psalm 113:7-8',
    content: [
      'John Gill was eleven years old when he began learning Latin and Greek on his own. By nineteen, he had taught himself Hebrew and was preaching in Baptist churches. This autodidact would become one of the most learned theologians of the eighteenth century.',
      'Gill\'s Hebrew learning was extraordinary for his time. He not only mastered biblical Hebrew but read extensively in rabbinic literature—the Talmud, Targums, and medieval commentators. His nine-volume Exposition of the Old and New Testaments drew on this learning to illuminate every verse.',
      'In 1767, Gill published A Dissertation Concerning the Antiquity of the Hebrew Language, defending the priority of Hebrew among ancient languages. He also wrote a Hebrew grammar designed for English readers—one of the first to make Hebrew accessible without Latin.',
      'As pastor of the same London congregation for fifty-one years, Gill demonstrated that deep scholarship could coexist with faithful pastoral ministry. He preached through entire books of the Bible, sharing his Hebrew insights with ordinary believers.',
      'Gill\'s work influenced Charles Spurgeon, who kept Gill\'s commentary in his study and recommended it to his students. The Baptist tradition of Hebrew scholarship that Gill exemplified continues to shape evangelical biblical study today.'
    ],
    lessons: [
      'Self-education can produce world-class scholarship',
      'Deep learning enriches pastoral ministry rather than hindering it',
      'Making scholarly tools accessible opens learning to many',
      'Long faithful service in one place allows deep impact'
    ],
    sources: [
      'Haykin, Michael A.G. Kiffin, Knollys, and Keach: Rediscovering English Baptist Heritage. Reformation Today Trust, 1996.',
      'Nettles, Thomas J. By His Grace and for His Glory. Baker Book House, 1986.',
    ],
  },

  // ============================================================================
  // MODERN ERA (19th Century - Present)
  // ============================================================================
  {
    slug: 'wilhelm-gesenius',
    name: 'Wilhelm Gesenius',
    title: 'Father of Modern Hebrew Lexicography',
    years: '1786-1842',
    location: 'Halle, Germany',
    category: 'modern',
    summary: 'Gesenius created the Hebrew grammar and lexicon that remain standard today, transforming Hebrew studies from ecclesiastical tradition into rigorous linguistic science.',
    quote: 'The interpreter must determine the meaning of words from their usage, not from etymology.',
    quoteSource: 'Hebrew Grammar',
    content: [
      'Wilhelm Gesenius revolutionized Hebrew studies by applying the methods of comparative linguistics to the biblical text. Where previous scholars had relied on tradition or speculation, Gesenius insisted on evidence from usage and cognate languages.',
      'His Hebrew Grammar, first published in 1813, went through dozens of editions and remains in use today. The current edition, revised by E. Kautzsch and A.E. Cowley, is still the standard reference for serious Hebrew study. Generations of seminarians have cut their teeth on "GKC."',
      'Equally influential was his Hebrew and Chaldee Lexicon, which became the foundation for all subsequent Hebrew dictionaries. Gesenius organized definitions by usage rather than speculation, compared Hebrew with Arabic and other Semitic languages, and acknowledged uncertainty where evidence was lacking.',
      'Some conservative scholars criticized Gesenius for his rationalist theological views. But even his critics used his tools. The precision and rigor he brought to Hebrew scholarship benefited everyone who sought to understand the original text.',
      'Gesenius died at fifty-six, exhausted by his labors. But his legacy lives on in every seminary classroom where students learn Hebrew grammar, and in every study where pastors consult his lexicon. He gave the church tools that make Scripture\'s original language accessible.'
    ],
    lessons: [
      'Rigorous method produces enduring results',
      'Good tools transcend theological differences',
      'Comparative study illuminates individual languages',
      'Acknowledging uncertainty is more honest than false confidence'
    ],
    sources: [
      'Gesenius, Wilhelm. Hebrew Grammar. Ed. E. Kautzsch. Trans. A.E. Cowley. Clarendon Press, 1910.',
      'Miller, Edward Frederick. The Influence of Gesenius on Hebrew Lexicography. Columbia University, 1927.',
    ],
  },
  {
    slug: 'franz-delitzsch',
    name: 'Franz Delitzsch',
    title: 'The Evangelical Hebraist',
    years: '1813-1890',
    location: 'Leipzig, Germany',
    category: 'modern',
    summary: 'Delitzsch combined rigorous Hebrew scholarship with evangelical faith, producing commentaries that remain valuable today and translating the New Testament into Hebrew.',
    quote: 'The Old Testament is the revelation of God in the moonlight of promise; the New is the revelation in the sunlight of fulfillment.',
    quoteSource: 'Commentary on Hebrews',
    content: [
      'Franz Delitzsch stood against the tide of his era. While German scholarship increasingly treated the Bible as merely human literature, Delitzsch maintained that rigorous scholarship and evangelical faith were compatible—indeed, inseparable.',
      'His commentaries on the Old Testament, produced with Carl Friedrich Keil, became standard references for conservative scholars. The Keil-Delitzsch commentary series combined careful attention to Hebrew grammar and syntax with theological sensitivity and pastoral application.',
      'Delitzsch\'s most unusual project was his Hebrew translation of the New Testament. Convinced that Jewish people should encounter Jesus in their ancestral language, he spent decades producing a translation that was both linguistically accurate and stylistically beautiful.',
      'He also founded the Institutum Judaicum in Leipzig, dedicated to scholarly engagement with Judaism and respectful evangelism among Jewish people. Unlike many of his contemporaries, Delitzsch opposed antisemitism and sought genuine dialogue with Jewish scholars.',
      'Delitzsch showed that evangelical conviction need not mean intellectual retreat. His Hebrew scholarship met the highest standards of his day while serving the church\'s mission. His commentaries continue to nourish pastors and students who seek to preach the Old Testament faithfully.'
    ],
    lessons: [
      'Scholarly rigor and evangelical faith strengthen each other',
      'Scripture should be shared in people\'s heart languages',
      'Opposing prejudice is part of faithful Christian witness',
      'Commentaries can serve both academy and church'
    ],
    sources: [
      'Wagner, Siegfried. Franz Delitzsch: Leben und Werk. Brunnen Verlag, 1978.',
      'Keil, C.F. and Franz Delitzsch. Commentary on the Old Testament. Hendrickson, 1996 [reprint].',
    ],
  },
  {
    slug: 'charles-hodge',
    name: 'Charles Hodge',
    title: 'The Princeton Theologian',
    years: '1797-1878',
    location: 'Princeton, New Jersey',
    category: 'modern',
    summary: 'Hodge established Hebrew as essential for ministerial training at Princeton Seminary, teaching thousands of students and shaping American Reformed theology for generations.',
    quote: 'The Bible is to the theologian what nature is to the man of science. It is his storehouse of facts.',
    quoteSource: 'Systematic Theology',
    content: [
      'When Charles Hodge arrived at Princeton Seminary as a student in 1815, he found that Hebrew instruction was minimal. When he died sixty-three years later, having taught three thousand students, Hebrew had become central to Princeton\'s theological method.',
      'Hodge spent two years in Germany (1826-1828) studying Hebrew and biblical criticism under the finest scholars of his era. He returned convinced that American ministers needed rigorous biblical language training to combat the rationalist theology threatening the church.',
      'As professor at Princeton for over fifty years, Hodge trained his students to read the Old Testament in Hebrew. His theological method—building doctrine from careful exegesis of the original text—required linguistic competence. "The Bible is to the theologian what nature is to the man of science," he taught.',
      'Hodge\'s Systematic Theology, published when he was seventy-five, demonstrated his method. Every doctrine was grounded in biblical texts examined in their original languages. His students learned that theology divorced from exegesis was speculation, not science.',
      'The Princeton theology that Hodge championed—confessional, exegetical, and rigorous—shaped American Presbyterianism and influenced evangelicalism broadly. His insistence on Hebrew learning ensured that generations of ministers could engage Scripture directly.'
    ],
    lessons: [
      'Theological training requires linguistic foundation',
      'Learning from critics can strengthen faithful scholarship',
      'Systematic theology must be grounded in exegesis',
      'Long faithful teaching shapes future generations'
    ],
    sources: [
      'Hoffecker, W. Andrew. Charles Hodge: The Pride of Princeton. P&R Publishing, 2011.',
      'Noll, Mark A. Princeton and the Republic: The Search for a Christian Enlightenment. Princeton University Press, 1989.',
    ],
  },
  {
    slug: 'bb-warfield',
    name: 'B.B. Warfield',
    title: 'The Lion of Princeton',
    years: '1851-1921',
    location: 'Princeton, New Jersey',
    category: 'modern',
    summary: 'Warfield defended biblical inerrancy with world-class scholarship, demonstrating that commitment to Scripture\'s authority required, not avoided, rigorous engagement with the original languages.',
    quote: 'It is the distinction of Christianity that it has come into the world clothed with the authority of being the truth of God.',
    quoteSource: 'The Inspiration and Authority of the Bible',
    content: [
      'Benjamin Breckinridge Warfield succeeded Charles Hodge\'s son A.A. Hodge at Princeton and became the most formidable defender of biblical authority in his generation. His defense rested not on avoiding scholarship but on mastering it.',
      'Warfield was trained in Hebrew at Princeton and furthered his studies in Leipzig. He believed that the doctrine of biblical inerrancy applied to the original Hebrew and Greek texts—which meant that defenders of Scripture must know those texts intimately.',
      'His scholarly output was immense: thousands of pages on biblical inspiration, Christology, Calvinism, and biblical criticism. Throughout, he engaged the Hebrew text carefully, arguing that careful exegesis confirmed rather than undermined confidence in Scripture.',
      'Warfield\'s article on "The Inerrancy of the Original Autographs" shaped evangelical theology for a century. He argued that affirming Scripture\'s authority meant taking the original languages seriously—not as a defensive retreat but as the proper ground of Christian confidence.',
      'Critics dismissed Warfield as a defender of the indefensible. But his scholarship was too good to ignore. He demonstrated that evangelical conviction could hold its own in the academy when combined with rigorous learning. His example inspired generations of scholars who refused to choose between faith and scholarship.'
    ],
    lessons: [
      'Defending Scripture requires mastering the original languages',
      'Scholarly rigor serves rather than threatens faith',
      'Engagement with critics strengthens one\'s own position',
      'Inerrancy applies to the original text, making Hebrew study essential'
    ],
    sources: [
      'Noll, Mark A. and David N. Livingstone, eds. B.B. Warfield: Evolution, Science, and Scripture. Baker Books, 2000.',
      'Warfield, B.B. The Inspiration and Authority of the Bible. P&R Publishing, 1948.',
    ],
  },
  {
    slug: 'geerhardus-vos',
    name: 'Geerhardus Vos',
    title: 'Father of Reformed Biblical Theology',
    years: '1862-1949',
    location: 'Princeton, New Jersey',
    category: 'modern',
    summary: 'Vos pioneered biblical theology as a discipline, showing how Hebrew thought patterns and progressive revelation shaped the Bible\'s unified message.',
    quote: 'Biblical Theology is that branch of exegetical theology which deals with the process of the self-revelation of God deposited in the Bible.',
    quoteSource: 'Biblical Theology: Old and New Testaments',
    content: [
      'Geerhardus Vos arrived at Princeton Seminary in 1893 to occupy a newly created chair in biblical theology. Over the next four decades, he would transform how Reformed Christians read Scripture.',
      'Vos had studied Semitic languages at Berlin and Strasbourg under the finest scholars of his era. His Hebrew expertise was formidable—but he put it to work not just for lexical study but for understanding how Hebrew thought shaped biblical revelation.',
      'His key insight was that revelation is progressive—God disclosed His plan gradually through history, and each stage built on what came before. Understanding any biblical text required grasping where it stood in this unfolding drama.',
      'This approach required deep engagement with the Hebrew text. Vos showed how Hebrew concepts like covenant, kingdom, and redemption developed through the Old Testament, reaching their fulfillment in Christ. His Biblical Theology traced these themes with meticulous attention to the original languages.',
      'Vos\'s influence grew slowly but steadily. His students included John Murray and others who carried his approach forward. Today, biblical theology as Vos conceived it—attentive to Hebrew thought forms and progressive revelation—shapes evangelical scholarship and preaching worldwide.'
    ],
    lessons: [
      'Understanding the Bible\'s unity requires tracing themes through the original languages',
      'Hebrew thought patterns shape biblical revelation',
      'Progressive revelation means earlier texts prepare for later fulfillment',
      'Deep influence often comes through patient teaching, not popular fame'
    ],
    sources: [
      'Dennison, James T., ed. Letters of Geerhardus Vos. P&R Publishing, 2005.',
      'Vos, Geerhardus. Biblical Theology: Old and New Testaments. Banner of Truth, 1975 [reprint].',
    ],
  },
  {
    slug: 'bruce-waltke',
    name: 'Bruce Waltke',
    title: 'The Evangelical Grammarian',
    years: '1930-',
    location: 'United States',
    category: 'modern',
    summary: 'Waltke\'s Hebrew grammar and Old Testament theology have trained a generation of evangelical pastors and scholars to read the Hebrew Bible with both precision and faith.',
    quote: 'The text has the right to impose itself upon the interpreter, not the other way around.',
    quoteSource: 'An Old Testament Theology',
    content: [
      'Bruce Waltke began his career at a time when evangelicals were often accused of anti-intellectualism. His response was not defensiveness but world-class scholarship that earned respect across theological boundaries.',
      'His Introduction to Biblical Hebrew Syntax, co-authored with M. O\'Connor, became the standard advanced grammar for evangelical seminaries. The massive work demonstrates exhaustive knowledge of the Hebrew text while remaining accessible to serious students.',
      'Waltke\'s commentaries on Genesis and Proverbs model how careful attention to Hebrew yields theological insight. He shows that grammatical precision and spiritual depth are not opposed but united. His discussions of Hebrew syntax open windows into the text\'s meaning.',
      'His magnum opus, An Old Testament Theology, synthesizes decades of Hebrew study into a unified biblical theology. Throughout, Waltke insists that faithful interpretation requires submitting to the text\'s authority—which means knowing the text in its original form.',
      'Now in his nineties, Waltke has trained thousands of students who serve as pastors, missionaries, and professors. His example demonstrates that evangelical scholarship can match any in rigor while serving the church\'s mission.'
    ],
    lessons: [
      'Mastering grammar opens the text\'s theological depths',
      'Evangelical conviction and scholarly rigor belong together',
      'Long careers of faithful work multiply through students',
      'The text must be allowed to speak on its own terms'
    ],
    sources: [
      'Waltke, Bruce K. and M. O\'Connor. An Introduction to Biblical Hebrew Syntax. Eisenbrauns, 1990.',
      'Waltke, Bruce K. An Old Testament Theology. Zondervan, 2007.',
    ],
  },
  {
    slug: 'meredith-kline',
    name: 'Meredith G. Kline',
    title: 'The Covenant Theologian',
    years: '1922-2007',
    location: 'United States',
    category: 'modern',
    summary: 'Kline revolutionized understanding of biblical covenants by applying Ancient Near Eastern treaty forms to Hebrew texts, illuminating Scripture\'s structure and theology.',
    quote: 'The covenant is the architecture of the Bible.',
    quoteSource: 'The Structure of Biblical Authority',
    content: [
      'Meredith Kline combined expertise in Hebrew with knowledge of Ancient Near Eastern languages to transform covenant theology. His insight that biblical covenants followed the pattern of ancient suzerainty treaties opened new vistas for understanding Scripture.',
      'Kline\'s doctoral work at Dropsie College gave him command of Akkadian, Ugaritic, and other Semitic languages alongside Hebrew. This breadth enabled him to see connections that scholars limited to Hebrew alone had missed.',
      'His Treaty of the Great King showed that Deuteronomy follows the structure of Hittite suzerainty treaties: preamble, historical prologue, stipulations, witnesses, and blessings and curses. This wasn\'t just academic curiosity—it revealed Deuteronomy\'s theology of God as covenant Lord.',
      'Kline extended these insights across the canon. He argued that the entire Bible is structured covenantally, with each covenant administration advancing God\'s kingdom purposes. His work influenced generations of Reformed pastors and theologians.',
      'Though his writing could be dense, Kline\'s students found him electrifying. He modeled how technical Hebrew scholarship could yield profound theological insight, and how Ancient Near Eastern background illuminated rather than threatened Scripture\'s message.'
    ],
    lessons: [
      'Comparative Semitic study illuminates Hebrew texts',
      'Literary structures carry theological meaning',
      'Ancient context clarifies rather than threatens Scripture',
      'Technical scholarship should serve theological understanding'
    ],
    sources: [
      'Kline, Meredith G. Treaty of the Great King. Eerdmans, 1963.',
      'Kline, Meredith G. Kingdom Prologue. Two Age Press, 2000.',
    ],
  },
];

// Get all stories for a category
export function getStoriesByCategory(category: StoryCategory): InspirationStory[] {
  return stories.filter(story => story.category === category);
}

// Get a story by slug
export function getStoryBySlug(slug: string): InspirationStory | undefined {
  return stories.find(story => story.slug === slug);
}

// Get a random quote for display
export function getRandomQuote(): { quote: string; name: string; source: string } {
  const story = stories[Math.floor(Math.random() * stories.length)];
  return {
    quote: story.quote,
    name: story.name,
    source: story.quoteSource,
  };
}

// Get all unique categories in chronological order
export function getCategories(): StoryCategory[] {
  return ['patristic', 'medieval', 'renaissance', 'reformer', 'puritan', 'westminster', 'enlightenment', 'modern'];
}
