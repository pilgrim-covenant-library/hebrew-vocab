'use client';

import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

// Hebrew alphabet data
const hebrewLetters = [
  { hebrew: 'א', name: 'Aleph', latin: '(silent)', sound: 'Glottal stop or silent' },
  { hebrew: 'בּ', name: 'Bet', latin: 'b', sound: 'b as in boy' },
  { hebrew: 'ב', name: 'Vet', latin: 'v', sound: 'v as in vine' },
  { hebrew: 'ג', name: 'Gimel', latin: 'g', sound: 'g as in go' },
  { hebrew: 'ד', name: 'Dalet', latin: 'd', sound: 'd as in day' },
  { hebrew: 'ה', name: 'He', latin: 'h', sound: 'h as in hay' },
  { hebrew: 'ו', name: 'Vav', latin: 'v/w/u/o', sound: 'v, or vowel letter (u/o)' },
  { hebrew: 'ז', name: 'Zayin', latin: 'z', sound: 'z as in zoo' },
  { hebrew: 'ח', name: 'Chet', latin: 'ch', sound: 'ch as in Bach (guttural)' },
  { hebrew: 'ט', name: 'Tet', latin: 't', sound: 't (emphatic)' },
  { hebrew: 'י', name: 'Yod', latin: 'y/i', sound: 'y as in yes, or vowel (i)' },
  { hebrew: 'כּ', name: 'Kaf', latin: 'k', sound: 'k as in king' },
  { hebrew: 'כ/ך', name: 'Khaf', latin: 'kh/ch', sound: 'ch as in Bach' },
  { hebrew: 'ל', name: 'Lamed', latin: 'l', sound: 'l as in love' },
  { hebrew: 'מ/ם', name: 'Mem', latin: 'm', sound: 'm as in mother' },
  { hebrew: 'נ/ן', name: 'Nun', latin: 'n', sound: 'n as in no' },
  { hebrew: 'ס', name: 'Samekh', latin: 's', sound: 's as in sun' },
  { hebrew: 'ע', name: 'Ayin', latin: '(silent)', sound: 'Guttural sound or silent' },
  { hebrew: 'פּ', name: 'Pe', latin: 'p', sound: 'p as in pay' },
  { hebrew: 'פ/ף', name: 'Fe', latin: 'f/ph', sound: 'f as in far' },
  { hebrew: 'צ/ץ', name: 'Tsade', latin: 'ts/tz', sound: 'ts as in cats' },
  { hebrew: 'ק', name: 'Qof', latin: 'q/k', sound: 'k (emphatic, from throat)' },
  { hebrew: 'ר', name: 'Resh', latin: 'r', sound: 'r (slightly rolled)' },
  { hebrew: 'שׁ', name: 'Shin', latin: 'sh', sound: 'sh as in shoe' },
  { hebrew: 'שׂ', name: 'Sin', latin: 's', sound: 's as in sun' },
  { hebrew: 'ת', name: 'Tav', latin: 't', sound: 't as in top' },
];

const finalForms = [
  { regular: 'כ', final: 'ך', name: 'Final Khaf' },
  { regular: 'מ', final: 'ם', name: 'Final Mem' },
  { regular: 'נ', final: 'ן', name: 'Final Nun' },
  { regular: 'פ', final: 'ף', name: 'Final Fe' },
  { regular: 'צ', final: 'ץ', name: 'Final Tsade' },
];

export default function TransliterationHelpPage() {
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
            <h1 className="text-3xl font-bold">Hebrew Transliteration Guide</h1>
            <p className="text-muted-foreground mt-2">
              Learn how to transliterate Hebrew letters into Latin (English) characters.
            </p>
          </div>

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                What is Transliteration?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Transliteration converts Hebrew letters to their closest Latin (English)
                equivalents, allowing you to read Hebrew words using familiar characters.
              </p>
              <p>
                Unlike translation, which conveys meaning, transliteration represents
                the sounds of the original letters. For example: <span className="hebrew-text text-lg" dir="rtl">שָׁלוֹם</span> becomes
                <strong> shalom</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Hebrew Alphabet Table */}
          <Card>
            <CardHeader>
              <CardTitle>The Hebrew Alphabet (22 Letters)</CardTitle>
              <CardDescription>
                Hebrew has 22 consonants. Some letters have two forms depending on whether
                they have a dagesh (dot) inside.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Hebrew</th>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Latin</th>
                      <th className="text-left py-3 px-4 font-medium">Sound</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hebrewLetters.map((letter, index) => (
                      <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <span className="text-2xl hebrew-text" dir="rtl">{letter.hebrew}</span>
                        </td>
                        <td className="py-3 px-4 font-medium">{letter.name}</td>
                        <td className="py-3 px-4 font-mono text-primary">{letter.latin}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{letter.sound}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Final Forms */}
          <Card>
            <CardHeader>
              <CardTitle>Final Forms (Sofit)</CardTitle>
              <CardDescription>
                Five letters have special forms when they appear at the end of a word.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-5">
                {finalForms.map((form, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex justify-center gap-4 mb-2">
                      <div>
                        <span className="text-2xl hebrew-text" dir="rtl">{form.regular}</span>
                        <p className="text-xs text-muted-foreground">Regular</p>
                      </div>
                      <div className="text-muted-foreground self-center">=</div>
                      <div>
                        <span className="text-2xl hebrew-text" dir="rtl">{form.final}</span>
                        <p className="text-xs text-muted-foreground">Final</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{form.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Begadkefat */}
          <Card>
            <CardHeader>
              <CardTitle>Begadkefat Letters</CardTitle>
              <CardDescription>
                Six letters change pronunciation with or without a dagesh (dot).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  The letters <strong>Bet, Gimel, Dalet, Kaf, Pe, Tav</strong> (remembered
                  as "begadkefat") can have two pronunciations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>With dagesh</strong>: Hard sound (בּ=b, כּ=k, פּ=p)</li>
                  <li><strong>Without dagesh</strong>: Soft/fricative sound (ב=v, כ=kh, פ=f)</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  In Biblical Hebrew, all six had distinct forms, but in Modern Hebrew,
                  only Bet/Vet, Kaf/Khaf, and Pe/Fe are distinguished in pronunciation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Tips for the Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  For silent letters (Aleph, Ayin), you can leave the answer empty or type the letter name.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  Answers are case-insensitive: <code>SH</code> = <code>sh</code>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  Multiple spellings are often accepted (e.g., <code>ch</code> or <code>kh</code> for Chet/Khaf)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  Final forms have the same transliteration as their regular forms.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
