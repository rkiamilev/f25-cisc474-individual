'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface VocabularyWord {
  id: string;
  word: string;
  pinyin: string;
  translation: string;
  hskLevel: number;
  status: 'learning' | 'known' | 'review';
  frequency: number;
  dateAdded: string;
}

export default function Vocabulary() {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [filter, setFilter] = useState<'all' | 'learning' | 'known' | 'review'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data based on your wireframe
    const mockWords: VocabularyWord[] = [
      { id: '1', word: 'де', pinyin: "of, -'s (possessive particle), (used after an attribute), (used to form a nominal expression), (used at the end of a declarative sentence for emphasis)", translation: 'of, possessive particle', hskLevel: 1, status: 'known', frequency: 2, dateAdded: 'Sep 17, 25' },
      { id: '2', word: '很', pinyin: 'hěn', translation: 'very, quite, (also, often used before an adjective without meaning "very")', hskLevel: 1, status: 'known', frequency: 48, dateAdded: 'Sep 17, 25' },
      { id: '3', word: '他', pinyin: 'tā', translation: 'he, him (used for either sex when the sex is unknown or unimportant)', hskLevel: 1, status: 'known', frequency: 14, dateAdded: 'Sep 17, 25' },
      { id: '4', word: '在', pinyin: 'zài', translation: 'to exist, to be alive, (of sb or sth) to be (located) at, (used before a verb to indicate an action in progress)', hskLevel: 1, status: 'known', frequency: 4, dateAdded: 'Sep 17, 25' },
      { id: '5', word: '学校', pinyin: 'xuéxiào', translation: 'school', hskLevel: 1, status: 'known', frequency: 409, dateAdded: 'Sep 17, 25' },
      { id: '6', word: '一', pinyin: 'yī', translation: 'one, single, a (article), as soon as, entire, whole, all, throughout', hskLevel: 1, status: 'known', frequency: 302, dateAdded: 'Sep 17, 25' },
      { id: '7', word: '听', pinyin: 'tīng', translation: 'to listen to, to hear, to heed, to obey, a can (loanword from English)', hskLevel: 1, status: 'known', frequency: 302, dateAdded: 'Sep 17, 25' },
      { id: '8', word: '二', pinyin: 'èr', translation: 'two, 2, (Beijing dialect) stupid', hskLevel: 1, status: 'known', frequency: 0, dateAdded: 'Sep 17, 25' }
    ];
    setWords(mockWords);
  }, []);

  const filteredWords = words.filter(word => {
    const matchesFilter = filter === 'all' || word.status === filter;
    const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.translation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'known': return 'text-green-600';
      case 'learning': return 'text-yellow-600';
      case 'review': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'known': return '✓';
      case 'learning': return '●';
      case 'review': return '!';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Vocabulary</h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
            ← Back to Dashboard
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="flex gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Base vocabulary:</p>
            <p className="font-semibold">newbie</p>
            <button className="text-blue-600 text-sm hover:underline">Change base</button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Your known words:</p>
            <p className="font-semibold">234</p>
            <button className="text-blue-600 text-sm hover:underline">Import words</button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('known')}
              className={`px-3 py-1 rounded ${filter === 'known' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              Known
            </button>
            <button 
              onClick={() => setFilter('learning')}
              className={`px-3 py-1 rounded ${filter === 'learning' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            >
              Learning
            </button>
            <button 
              onClick={() => setFilter('review')}
              className={`px-3 py-1 rounded ${filter === 'review' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              Review
            </button>
          </div>
          
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Sort ↕
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Filter
          </button>
        </div>
      </div>

      {/* Vocabulary Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">Word</th>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">Pinyin & Translation</th>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">HSK</th>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">Changed ↓</th>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">Status</th>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {filteredWords.map((word, index) => (
                <tr key={word.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3">
                    <span className="text-2xl font-semibold text-green-600">{word.word}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-600">{word.pinyin}</div>
                    <div className="text-sm">{word.translation}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">{word.hskLevel}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{word.dateAdded}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xl ${getStatusColor(word.status)}`}>
                      {getStatusIcon(word.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">{word.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}