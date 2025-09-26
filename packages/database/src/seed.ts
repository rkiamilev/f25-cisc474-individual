import { prisma } from "./client";
import { faker } from '@faker-js/faker';
import type { User } from "../generated/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
] as Array<Partial<User>>;

// Russian words with translations for realistic data
const RUSSIAN_WORDS = [
  { word: 'здравствуйте', translation: 'hello (formal)', definition: 'formal greeting', partOfSpeech: 'interjection', pronunciation: 'zdra-stvuy-tye', frequency: 1000 },
  { word: 'спасибо', translation: 'thank you', definition: 'expression of gratitude', partOfSpeech: 'interjection', pronunciation: 'spa-si-bo', frequency: 950 },
  { word: 'пожалуйста', translation: 'please/you\'re welcome', definition: 'polite request or acknowledgment', partOfSpeech: 'adverb', pronunciation: 'po-zha-luy-sta', frequency: 900 },
  { word: 'извините', translation: 'excuse me/sorry', definition: 'apology or attention-getting phrase', partOfSpeech: 'verb', pronunciation: 'iz-vi-ni-tye', frequency: 800 },
  { word: 'работа', translation: 'work/job', definition: 'employment or labor', partOfSpeech: 'noun', pronunciation: 'ra-bo-ta', frequency: 750 },
  { word: 'дом', translation: 'house/home', definition: 'dwelling or residence', partOfSpeech: 'noun', pronunciation: 'dom', frequency: 700 },
  { word: 'время', translation: 'time', definition: 'temporal measurement', partOfSpeech: 'noun', pronunciation: 'vre-mya', frequency: 650 },
  { word: 'деньги', translation: 'money', definition: 'currency or financial resources', partOfSpeech: 'noun', pronunciation: 'den-gi', frequency: 600 },
  { word: 'хорошо', translation: 'good/well', definition: 'positive evaluation', partOfSpeech: 'adverb', pronunciation: 'kho-ro-sho', frequency: 580 },
  { word: 'плохо', translation: 'bad/poorly', definition: 'negative evaluation', partOfSpeech: 'adverb', pronunciation: 'plo-kho', frequency: 500 }
];

// 5 sample Russian articles
const SAMPLE_ARTICLES = [
  {
    title: "Политические новости в России",
    content: `Российская политика продолжает развиваться. Правительство обсуждает новые законы. 
    Граждане активно участвуют в политической жизни страны. Выборы приближаются, и все готовятся.
    Политические партии представляют свои программы. Народ внимательно следит за событиями.`,
    difficulty: "intermediate",
    source: "rt.com/politics/12345"
  },
  {
    title: "Экономика и бизнес сегодня",
    content: `Российская экономика показывает стабильный рост. Многие компании увеличивают прибыль.
    Новые технологии помогают бизнесу развиваться. Рынок товаров и услуг расширяется.
    Предприниматели инвестируют в инновационные проекты. Работа становится более эффективной.`,
    difficulty: "beginner",
    source: "rbc.ru/business/67890"
  },
  {
    title: "Современные технологии в жизни",
    content: `Интернет изменил нашу повседневную жизнь. Компьютеры стали незаменимыми помпомощниками.
    Мобильные телефоны позволяют общаться в любое время. Социальные сети объединяют людей.
    Искусственный интеллект развивается очень быстро. Будущее технологий выглядит многообещающе.`,
    difficulty: "intermediate",
    source: "tass.ru/tech/54321"
  },
  {
    title: "Русская культура и традиции",
    content: `Россия славится своими культурными традициями. Музеи хранят богатое наследие.
    Театры продолжают радовать зрителей классическими спектаклями. Литература остается важной частью культуры.
    Народные праздники объединяют семьи и друзей. Искусство вдохновляет новые поколения.`,
    difficulty: "beginner",
    source: "culture.ru/articles/98765"
  },
  {
    title: "Путешествия по России",
    content: `Путешествовать по России - это удивительный опыт. Красивые города ждут туристов.
    Природа поражает своим разнообразием и красотой. Гостиницы предлагают комфортное размещение.
    Местная кухня удивляет вкусными блюдами. Каждый регион имеет свои особенности и достопримечательности.`,
    difficulty: "beginner",
    source: "travel.ru/guide/13579"
  }
];

const COURSE_CATEGORIES = [
  { name: 'Politics', description: 'Political news and discussions', difficulty: 'advanced', icon: '🏛️', color: '#3B82F6' },
  { name: 'Business', description: 'Business and economics content', difficulty: 'intermediate', icon: '💼', color: '#10B981' },
  { name: 'Technology', description: 'Tech news and innovation', difficulty: 'intermediate', icon: '💻', color: '#8B5CF6' },
  { name: 'Culture', description: 'Russian culture and traditions', difficulty: 'beginner', icon: '🎭', color: '#F59E0B' },
  { name: 'Travel', description: 'Travel guides and experiences', difficulty: 'beginner', icon: '✈️', color: '#EF4444' },
  { name: 'Science', description: 'Scientific discoveries and research', difficulty: 'advanced', icon: '🔬', color: '#06B6D4' }
];

// Function to generate fake users
function generateFakeUsers(count: number): Array<{
  name: string;
  email: string;
  role: string;
}> {
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['instructor', 'student'])
  }));
}

// Add this function to your existing seed.ts main() function
async function seedArticles(courses: any[]) {
  console.log('📰 Creating sample Russian articles...');
  const articles = [];
  
  for (const articleData of SAMPLE_ARTICLES) {
    // Find the corresponding course by category
    const course = courses.find(c => c.title.includes(articleData));
    
    const article = await prisma.article.create({
      data: {
        title: articleData.title,
        content: articleData.content,
        difficulty: articleData.difficulty,
        wordCount: articleData.content.split(/\s+/).length,
        readingTime: Math.ceil(articleData.content.split(/\s+/).length / 150), // ~150 words per minute
        source: `https://${articleData.source}`,
        publishedAt: faker.date.past({ years: 0.5 }), // Fixed: use years instead of months
        createdAt: faker.date.past({ years: 0.5 }), // Fixed: use years instead of months
      }
    });
    articles.push(article);
  }
  
  console.log(`✅ Created ${articles.length} Russian articles`);
  return articles;
}

// Helper function to transliterate Russian to Latin
function transliterateWord(russianWord: string): string {
  const transliterationMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };
  
  return russianWord.toLowerCase().split('').map(char => 
    transliterationMap[char] || char
  ).join('');
}

// Generate example sentences using the word
function generateExamples(word: string): string[] {
  return [
    `Пример с словом ${word}.`,
    `Другой пример с ${word}.`
  ];
}

// Function to seed users
async function seedUsers() {
  console.log('🌱 Seeding users...');
  const users = generateFakeUsers(100); 
  
  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email! }, 
      update: userData,
      create: userData,
    });
  }
  console.log(`✅ ${users.length} users with fake emails seeded successfully`);
}

// Function to seed words
async function seedWords() {
  console.log('🌱 Seeding Russian words...');
  
  // Use the expanded word list
  const wordsData = RUSSIAN_WORDS.map(word => ({
    word: word.word,                    // "здравствуйте" → word field
    translation: word.translation,      // "hello (formal)" → translation field
    definition: word.definition,        // "formal greeting" → definition field
    partOfSpeech: word.partOfSpeech,   // "interjection" → partOfSpeech field
    transcription: word.pronunciation,  // "zdra-stvuy-tye" → transcription field
    transliteration: transliterateWord(word.word),
    frequency: word.frequency,
    examples: generateExamples(word.word),
    // grammaticalForms: generateGrammaticalForms(word.word, word.partOfSpeech),
  }));

}

// Main seed function
async function main() {
  // Create Users using Faker.js Person API
  console.log('👤 Creating users with Faker.js Person API...');
  const users: Array<User & { role: 'instructor' | 'student' }> = [];

  // Generate and create users
  const userData = generateFakeUsers(15); // Generate 15 users
  
  for (const user of userData) {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: new Date(),
      }
    });
    users.push(createdUser as User & { role: 'instructor' | 'student' });
  }

  console.log(`✅ Created ${users.length} users using Faker.js Person API`);

  // Create Articles (simplified - no courses needed for basic 3-table setup)
    console.log('📰 Creating sample Russian articles...');
    const articles = [];
    
    for (const articleData of SAMPLE_ARTICLES) {
      const article = await prisma.article.create({
        data: {
          title: articleData.title,
          content: articleData.content,
          difficulty: articleData.difficulty,
          wordCount: articleData.content.split(/\s+/).length,
          readingTime: Math.ceil(articleData.content.split(/\s+/).length / 150),
          source: `https://${articleData.source}`,
          publishedAt: faker.date.past({ years: 0.5 }),
          createdAt: faker.date.past({ years: 0.5 }),
        }
      });
      articles.push(article);
    }
    
    console.log(`✅ Created ${articles.length} Russian articles`);

  // Create Words (Russian vocabulary)
  console.log('📚 Creating Russian vocabulary...');
  const words = [];
  console.log(RUSSIAN_WORDS);
  for (const wordData of RUSSIAN_WORDS) {
    const word = await prisma.word.create({
      data: {
        word: wordData.word,
        translation: wordData.translation,
        definition: wordData.definition,
        partOfSpeech: wordData.partOfSpeech,
        frequency: wordData.frequency,
        examples: [
          `${wordData.word} - пример предложения с этим словом.`,
          `Example: ${wordData.translation} used in context.`
        ],
        pronunciation: wordData.pronunciation
      }
    });
    words.push(word);
  }

  // Add more generated Russian-like words
  for (let i = 0; i < 85; i++) {
    const word = await prisma.word.create({
      data: {
        word: faker.lorem.word() + faker.helpers.arrayElement(['ый', 'ой', 'ий', 'ая', 'ое', 'ать', 'ить', 'еть']),
        translation: faker.word.words({ count: { min: 1, max: 3 } }),
        definition: faker.lorem.sentence(),
        partOfSpeech: faker.helpers.arrayElement(['noun', 'verb', 'adjective', 'adverb', 'preposition']),
        frequency: faker.number.int({ min: 1, max: 1000 }),
        examples: [faker.lorem.sentence(), faker.lorem.sentence()],
        pronunciation: faker.word.sample()
      }
    });
    words.push(word);
  }

  console.log(`✅ Created ${words.length} words (${RUSSIAN_WORDS.length} authentic Russian + ${words.length - RUSSIAN_WORDS.length} generated)`);

  // Print detailed summary
    const summary = {
      users: await prisma.user.count(),
      articles: await prisma.article.count(),
      words: await prisma.word.count()
    };

    console.log('\n📊 Complete Database Summary:');
    Object.entries(summary).forEach(([table, count]) => {
      console.log(`   ${table}: ${count}`);
    });
    
    console.log('\n🎯 Your Russian Language Learning LMS is fully seeded and ready!');
}

// (async () => {
//   try {
//     await Promise.all(
//       DEFAULT_USERS.map((user) =>
//         prisma.user.upsert({
//           where: {
//             email: user.email!,
//           },
//           update: {
//             ...user,
//           },
//           create: {
//             ...user,
//           },
//         })
//       )
//     );
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   } finally {
//     await prisma.$disconnect();
//   }
// })();

// Execute the seed function

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });