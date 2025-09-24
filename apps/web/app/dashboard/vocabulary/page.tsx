export default function VocabularyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vocabulary</h1>
      <p className="text-gray-600 mb-4">Review and study your saved words</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Word List</h3>
          {/* Your vocabulary list component goes here */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Practice</h3>
          {/* Flashcard or practice component goes here */}
        </div>
      </div>
    </div>
  );
}
