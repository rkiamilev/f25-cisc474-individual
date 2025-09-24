export default function ReadingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reading</h1>
      <p className="text-gray-600 mb-4">Practice reading Russian texts</p>
      
      {/* Your text scanner component, hover detection, etc. goes here */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Russian Text Reader</h3>
        <div className="prose">
          <p>Здесь будет ваш русский текст для чтения...</p>
          {/* Text Scanner Component would go here */}
        </div>
      </div>
    </div>
  );
}
