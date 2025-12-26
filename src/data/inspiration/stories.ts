/**
 * Inspirational Stories: Reformed Hebrew Scholars
 *
 * Historical accounts of how Reformers, Puritans, and Westminster Divines
 * learned Hebrew and used it to advance the gospel.
 */

export type StoryCategory = 'reformer' | 'puritan' | 'westminster';

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
  reformer: {
    label: 'Reformers',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500',
    description: 'The founders of the Protestant Reformation who recovered the original languages',
  },
  puritan: {
    label: 'Puritans',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500',
    description: 'English Reformed theologians who pursued deep biblical scholarship',
  },
  westminster: {
    label: 'Westminster Divines',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500',
    description: 'The scholars who crafted the Westminster Standards',
  },
};

export const stories: InspirationStory[] = [
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

// Get all unique categories
export function getCategories(): StoryCategory[] {
  return ['reformer', 'puritan', 'westminster'];
}
