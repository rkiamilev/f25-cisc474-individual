'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentData, ReadingProgress, VocabularyStats } from '@/components/navbar/types'; 

export default function Dashboard() {
  // Initialize state variables (following your pseudocode)
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [readingProgress, setReadingProgress] = useState<ReadingProgress | null>(null);
  const [vocabularyStats, setVocabularyStats] = useState<VocabularyStats | null>(null);
  //const [recommendedArticles, setRecommendedArticles] = useState([]);

  // Helper functions (as per your pseudocode)
  const getCurrentStudent = () => {
    // Mock data - replace with actual API call
    return {
      id: '1',
      name: 'Student',
      level: 'Intermediate',
      favoriteTopics: [
        { name: 'Technology', articleCount: 8 },
        { name: 'Science', articleCount: 5 },
        { name: 'Culture', articleCount: 3 }
      ]
    };
  };

  const getReadingProgress = (userId: string) => {
    // Mock data - replace with actual API call
    return {
      dailyStreak: 7,
      weeklyCount: 12
    };
  };

  const getVocabularyStats = (userId: string) => {
    // Mock data - replace with actual API call
    return {
      knownWords: 234,
      newWords: 15,
      hskLevel: 3,
      hskProgress: 68
    };
  };

  const getRecommendedArticles = (studentLevel: string) => {
    // Mock data - replace with actual API call
    return [];
  };

  useEffect(() => {
    // Following your pseudocode structure
    const student = getCurrentStudent();
    const progress = getReadingProgress(student.id);
    const vocab = getVocabularyStats(student.id);
    //const articles = getRecommendedArticles(student.level);

    setStudentData(student);
    setReadingProgress(progress);
    setVocabularyStats(vocab);
    //setRecommendedArticles(articles);
  }, []);

  if (!studentData || !readingProgress || !vocabularyStats) {
    return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Display welcome message (from pseudocode) */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome back, {studentData.name}
        </h1>
        <p className="text-gray-600 mt-2">Continue your Russian learning journey</p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Reading Progress Section (from pseudocode) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Reading Progress</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Daily Streak</p>
              <p className="text-3xl font-bold text-blue-500">{readingProgress.dailyStreak} days</p>
            </div>
            <div>
              <p className="text-gray-600">Articles finished this week</p>
              <p className="text-2xl font-bold text-gray-800">{readingProgress.weeklyCount}</p>
            </div>
          </div>
        </div>

        {/* Vocabulary Progress Section (from pseudocode) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Vocabulary Progress</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Total known words</p>
              <p className="text-3xl font-bold text-purple-500">{vocabularyStats.knownWords}</p>
            </div>
            <div>
              <p className="text-gray-600">Words added this week</p>
              <p className="text-2xl font-bold text-gray-800">{vocabularyStats.newWords}</p>
            </div>
            <div>
              <p className="text-gray-600">Current HSK Level Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div 
                  className="bg-purple-500 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${vocabularyStats.hskProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{vocabularyStats.hskProgress}% to HSK {vocabularyStats.hskLevel + 1}</p>
            </div>
          </div>
        </div>

        {/* Recommended Content Section (from pseudocode) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Your favorite topics</h2>
          <div className="space-y-3">
            {studentData.favoriteTopics.map((topic, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-700 font-medium">{topic.name}</span>
                <span className="text-green-600 font-semibold">{topic.articleCount} articles</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions (from pseudocode) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link 
          href="dashboard/reading"
          className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 transition-all duration-200 font-semibold"
        >
          Continue Reading
        </Link>
        <Link 
          href="dashboard/vocabulary"
          className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600 transition-all duration-200 font-semibold"
        >
          Review Vocabulary
        </Link>
        <Link 
          href="/dashboard/library"
          className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition-all duration-200 font-semibold"
        >
          Browse Library
        </Link>
        <Link 
          href="/dashboard/progress"
          className="bg-orange-500 text-white p-4 rounded-lg text-center hover:bg-orange-600 transition-all duration-200 font-semibold"
        >
          View Progress
        </Link>
      </div>
    </div>
  );
}