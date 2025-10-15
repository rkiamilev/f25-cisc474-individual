export interface StudentData {
  id: string;
  name: string;
  level: string;
  favoriteTopics: Array<{
    name: string;
    articleCount: number;
  }>;
}

export interface ReadingProgress {
  dailyStreak: number;
  weeklyCount: number;
}

export interface VocabularyStats {
  knownWords: number;
  newWords: number;
  hskLevel: number;
  hskProgress: number;
  //fix this later to acftcl_prof_level
}