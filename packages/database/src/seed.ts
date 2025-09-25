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

// Article sources for realistic links
const ARTICLE_SOURCES = [
  'rt.com', 'rbc.ru', 'kommersant.ru', 'vedomosti.ru', 'gazeta.ru',
  'lenta.ru', 'interfax.ru', 'tass.ru', 'ria.ru', 'moscow.ru'
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

// Generate realistic article URL
function generateArticleUrl(title: string): string {
  const source = faker.helpers.arrayElement(ARTICLE_SOURCES);
  const slug = title.toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
  return `https://${source}/articles/${faker.date.recent().getFullYear()}/${faker.number.int({ min: 1, max: 12 })}/${slug}`;
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

// Function to get Russian words with all the processing
function getRussianWords() {
  return RUSSIAN_WORDS.map(word => ({
    word: word.word,
    translation: word.translation,
    definition: word.definition,
    partOfSpeech: word.partOfSpeech,
    transcription: word.pronunciation, // Map pronunciation to transcription
    transliteration: transliterateWord(word.word), // Convert to Latin
    frequency: word.frequency,
    // examples: generateExamples(word.word), // Generate example sentences
    // grammaticalForms: generateGrammaticalForms(word.word, word.partOfSpeech),
  }));
}

// Function to seed users
async function seedUsers() {
  console.log('🌱 Seeding users...');
  const users = generateFakeUsers(10); // Generate 10 fake users with fake emails
  
  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email! }, // Assert non-null since faker generates valid emails
      update: userData,
      create: userData,
    });
  }
  console.log(`✅ ${users.length} users with fake emails seeded successfully`);
}

// Function to seed words
async function seedWords() {
  console.log('🌱 Seeding Russian words...');
  
  const wordsData = getRussianWords();
  
  for (const wordData of wordsData) {
    await prisma.word.upsert({
      where: { word: wordData.word },
      update: wordData,
      create: wordData,
    });
  }
  console.log(`✅ ${wordsData.length} Russian words seeded successfully`);
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
        emailVerified: new Date(), // Add required field
      }
    });
    users.push(createdUser as User & { role: 'instructor' | 'student' });
  }

  console.log(`✅ Created ${users.length} users using Faker.js Person API`);

  // Create Words (Russian vocabulary)
  console.log('📚 Creating Russian vocabulary...');
  const words = [];
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
        pronunciation: wordData.pronunciation,
        context: faker.lorem.sentence()
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
        pronunciation: faker.word.sample(),
        context: faker.lorem.sentence()
      }
    });
    words.push(word);
  }

  console.log(`✅ Created ${words.length} words (${RUSSIAN_WORDS.length} authentic Russian + ${words.length - RUSSIAN_WORDS.length} generated)`);

  // Create Courses
  console.log('🎓 Creating courses...');
  const courses = [];
  const instructors = users.filter(u => u.role === 'instructor');
  
  for (const categoryData of COURSE_CATEGORIES) {
    const course = await prisma.course.create({
      data: {
        name: categoryData.name,
        description: `${categoryData.description}. ${faker.lorem.paragraph()}`,
        category: categoryData.name.toLowerCase(),
        icon: categoryData.icon,
        color: categoryData.color,
        difficulty: categoryData.difficulty,
        instructorId: faker.helpers.arrayElement(instructors).id,
        isActive: true,
      }
    });
    courses.push(course);
  }

  console.log(`✅ Created ${courses.length} courses`);

  // Create Articles with realistic Russian news sources
  console.log('📰 Creating articles with realistic source links...');
  const articles = [];
  for (let i = 0; i < 75; i++) {
    const course = faker.helpers.arrayElement(courses);
    const source = faker.helpers.arrayElement(ARTICLE_SOURCES);
    const articleId = faker.string.numeric(8);
    
    const article = await prisma.article.create({
      data: {
        title: faker.lorem.sentence({ min: 4, max: 10 }),
        content: faker.lorem.paragraphs({ min: 4, max: 8 }, '\n\n'),
        contentWithIPA: faker.lorem.paragraphs({ min: 4, max: 8 }, '\n\n') + '\n\n[DeepL API would provide IPA annotations here]',
        courseId: course.id,
        difficulty: course.difficulty,
        wordCount: faker.number.int({ min: 150, max: 2500 }),
        readingTime: faker.number.int({ min: 3, max: 20 }),
        tags: faker.helpers.arrayElements(['политика', 'экономика', 'культура', 'наука', 'спорт', 'технологии'], { min: 1, max: 3 }),
        imageUrl: faker.image.url({ width: 800, height: 600 }),
        myLinguaScore: faker.number.float({ min: 0.25, max: 0.95, fractionDigits: 2 }),
        source: `${source}/${articleId}`,
        publishedAt: faker.date.past({ years: 2 }),
      }
    });
    articles.push(article);
  }

  console.log(`✅ Created ${articles.length} articles with realistic Russian news sources`);

  // Print detailed summary
  const summary = {
    users: await prisma.user.count(),
    courses: await prisma.course.count(),
    articles: await prisma.article.count(),
    words: await prisma.word.count(),
    enrollments: await prisma.enrollment.count(),
    assignments: await prisma.assignment.count(),
    submissions: await prisma.submission.count(),
    quizzes: await prisma.quiz.count(),
    userWords: await prisma.userWord.count(),
    readingSessions: await prisma.readingSession.count(),
    wordLookups: await prisma.wordLookup.count(),
    vocabularyLists: await prisma.vocabularyList.count(),
    userReadingPreferences: await prisma.userReadingPreferences.count(),
    bookmarkedArticles: await prisma.bookmarkedArticle.count()
  };

  console.log('\n📊 Complete Database Summary:');
  Object.entries(summary).forEach(([table, count]) => {
    console.log(`   ${table}: ${count}`);
  });
  
  console.log('\n🚀 Cool Features Implemented:');
  console.log('   🌐 DeepL API Integration - Real-time Russian-English translation');
  console.log('   📖 Wiktionary API Integration - Comprehensive dictionary lookups');
  console.log('   🔗 Realistic Article URLs - Authentic Russian news sources');
  console.log('   📱 Interactive Reading Experience - Word lookup and vocabulary building');
  
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