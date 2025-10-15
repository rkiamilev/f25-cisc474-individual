'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentData, ReadingProgress, VocabularyStats } from './types';
import { Sidebar } from 'lucide-react';

export default function Navbar() {
  // State management using React hooks
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [readingProgress, setReadingProgress] = useState<ReadingProgress | null>(null);
  const [vocabularyStats, setVocabularyStats] = useState<VocabularyStats | null>(null);
  //const [recommendedArticles, setRecommendedArticles] = useState([]);

  // Simulate data fetching (replace with actual API calls later)
  useEffect(() => {
    // Temporary mock data - replace with actual API calls
    setStudentData({
      id: '1',
      name: 'Student',
      level: 'Intermediate',
      favoriteTopics: [
        { name: 'Technology', articleCount: 5 },
        { name: 'Science', articleCount: 3 }
      ]
    });

    setReadingProgress({
      dailyStreak: 5,
      weeklyCount: 10
    });

    setVocabularyStats({
      knownWords: 500,
      newWords: 25,
      hskLevel: 3,
      hskProgress: 75
    });
  }, []);

  if (!studentData || !readingProgress || !vocabularyStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {studentData.name}
        </h1>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Reading Progress Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reading Progress</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Daily Streak</p>
              <p className="text-2xl font-bold">{readingProgress.dailyStreak} days</p>
            </div>
            <div>
              <p className="text-gray-600">Articles This Week</p>
              <p className="text-2xl font-bold">{readingProgress.weeklyCount}</p>
            </div>
          </div>
        </div>

        {/* Vocabulary Progress Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Vocabulary Progress</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Known Words</p>
              <p className="text-2xl font-bold">{vocabularyStats.knownWords}</p>
            </div>
            <div>
              <p className="text-gray-600">New Words This Week</p>
              <p className="text-2xl font-bold">{vocabularyStats.newWords}</p>
            </div>
            <div>
              <p className="text-gray-600">HSK Level Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${vocabularyStats.hskProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Topics Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Favorite Topics</h2>
          <div className="space-y-4">
            {studentData.favoriteTopics.map((topic, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{topic.name}</span>
                <span className="text-gray-800">{topic.articleCount} articles</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link 
          href="/reading"
          className="bg-blue-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 transition"
        >
          Continue Reading
        </Link>
        <Link 
          href="/vocabulary"
          className="bg-purple-500 text-white p-4 rounded-lg text-center hover:bg-purple-600 transition"
        >
          Review Vocabulary
        </Link>
        <Link 
          href="/library"
          className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600 transition"
        >
          Browse Library
        </Link>
        <Link 
          href="/progress"
          className="bg-orange-500 text-white p-4 rounded-lg text-center hover:bg-orange-600 transition"
        >
          View Progress
        </Link>
        <button
          onClick={() => alert('Feature coming soon!')}
          className="bg-gray-500 text-white p-4 rounded-lg text-center hover:bg-gray-600 transition"
        >
          Join Community
        </button>
        <Sidebar className="mx-auto my-4 text-gray-700" />
      </div>
    </div>
  );
}