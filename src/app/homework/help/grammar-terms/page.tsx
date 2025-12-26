'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const grammarTerms = [
  {
    term: 'Noun',
    definition: 'A word that names a person, place, thing, or idea.',
    examples: ['אֱלֹהִים (God)', 'דָּבָר (word)', 'שָׁלוֹם (peace)'],
    notes: 'Hebrew nouns have gender (masculine/feminine) and number (singular/plural/dual).',
  },
  {
    term: 'Verb',
    definition: 'A word that expresses action, occurrence, or state of being.',
    examples: ['אָמַר (he said)', 'הָיָה (he was)', 'שָׁמַר (he kept)'],
    notes: 'Hebrew verbs are organized into 7 stems (binyanim) and conjugate for person, gender, and number.',
  },
  {
    term: 'Adjective',
    definition: 'A word that describes or modifies a noun.',
    examples: ['טוֹב (good)', 'גָּדוֹל (great)', 'קָדוֹשׁ (holy)'],
    notes: 'Hebrew adjectives agree with their nouns in gender, number, and definiteness.',
  },
  {
    term: 'Adverb',
    definition: 'A word that modifies a verb, adjective, or another adverb.',
    examples: ['מְאֹד (very)', 'עַתָּה (now)', 'שָׁם (there)'],
    notes: 'Many Hebrew adverbs are formed from other parts of speech or are standalone particles.',
  },
  {
    term: 'Pronoun',
    definition: 'A word that replaces a noun to avoid repetition.',
    examples: ['אֲנִי (I)', 'אַתָּה (you, m.)', 'הוּא (he)'],
    notes: 'Hebrew has independent pronouns and pronominal suffixes attached to verbs, nouns, and prepositions.',
  },
  {
    term: 'Article',
    definition: 'A word that indicates definiteness.',
    examples: ['הַ־ (the)', 'הַמֶּלֶךְ (the king)', 'הַתּוֹרָה (the Torah)'],
    notes: 'Hebrew only has a definite article (הַ). There is no indefinite article ("a/an").',
  },
  {
    term: 'Preposition',
    definition: 'A word that shows relationship between other words.',
    examples: ['בְּ (in)', 'לְ (to)', 'מִן (from)', 'עַל (upon)'],
    notes: 'Hebrew has inseparable prepositions (prefixed) and independent prepositions.',
  },
  {
    term: 'Conjunction',
    definition: 'A word that connects words, phrases, or clauses.',
    examples: ['וְ (and)', 'כִּי (for/because)', 'אֲשֶׁר (which/that)'],
    notes: 'The vav conjunction (וְ) is extremely common, often called "vav consecutive" with verbs.',
  },
  {
    term: 'Participle',
    definition: 'A verb form that functions as an adjective or noun.',
    examples: ['אֹמֵר (saying/one who says)', 'כֹּתֵב (writing)', 'הֹלֵךְ (walking)'],
    notes: 'Participles can express ongoing action or serve as substantives (nouns).',
  },
  {
    term: 'Infinitive',
    definition: 'The basic form of a verb, often translated as "to + verb".',
    examples: ['לִשְׁמֹר (to keep)', 'לָלֶכֶת (to go)', 'לַעֲשׂוֹת (to do)'],
    notes: 'Hebrew has two infinitives: construct (with לְ) and absolute (for emphasis).',
  },
];

export default function GrammarTermsHelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link
            href="/homework/hw1"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Homework</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Page title */}
          <div>
            <h1 className="text-3xl font-bold">Grammar Terms</h1>
            <p className="text-muted-foreground mt-2">
              Essential grammatical terminology with Hebrew examples.
            </p>
          </div>

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>Why Learn Grammar Terms?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Understanding grammatical terminology helps you analyze Hebrew texts
                and use reference materials effectively. These terms are universal
                across languages, though Hebrew has some unique features.
              </p>
            </CardContent>
          </Card>

          {/* Terms grid */}
          <div className="grid gap-6">
            {grammarTerms.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{item.term}</CardTitle>
                  <CardDescription>{item.definition}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Hebrew Examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.examples.map((example, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-muted rounded-md text-sm hebrew-text"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                    {item.notes}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Tips for the Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  Focus on the primary function of each part of speech.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  Remember that nouns name things, verbs show action/state, and adjectives describe.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  Participles are "verbal adjectives" - they come from verbs but act like adjectives.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  Hebrew's definite article (הַ) is a prefix, not a separate word.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
