import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

const RelocationAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Gateway question
  const gatewayQuestion = {
    id: 'gateway',
    text: 'Are you planning to relocate to another country for more than two years for reasons other than the requirements of the military, the government, or your job?',
    options: [
      { text: 'Yes, I plan to relocate', score: 0 },
      { text: 'I am very seriously considering it and am likely to do it', score: 0 },
      { text: 'I am somewhat seriously considering it and may do it', score: 0 },
      { text: 'No, I do not plan to relocate full-time, but I am seriously considering buying a vacation home or other property outside the US', score: 0 },
      { text: 'No, I have considered it and decided against it', score: 0 },
      { text: 'No, I do not plan to relocate', score: 0 },
      { text: 'Not sure', score: 0 }
    ],
    category: 'gateway'
  };

  // Assessment questions with categories
  const assessmentQuestions = [
    {
      id: 'q1',
      text: 'If you had to choose between these two job opportunities, which would you choose?',
      options: [
        { text: 'A job where your responsibilities, the work environment, and the people you would work with were regularly changing', score: 3 },
        { text: 'A job where your responsibilities, the work environment, and the people you would work with were stable and unlikely to change', score: 1 }
      ],
      category: 'comfort_with_change'
    },
    {
      id: 'q2',
      text: 'You have the opportunity to travel to an exotic tropical nation where people live a very different lifestyle than you. Do you stay in the "safe" areas where tourists are welcome or do you visit areas where tourists rarely are seen?',
      options: [
        { text: 'I wouldn\'t visit an exotic nation, I prefer to travel near my home, if at all', score: 0 },
        { text: 'I would stick to the areas that the guidebooks said were best for tourists', score: 1 },
        { text: 'I would set out on my own to visit any area that looked interesting', score: 3 }
      ],
      category: 'adaptability'
    },
    {
      id: 'q3',
      text: 'When planning a vacation, which approach sounds most like you?',
      options: [
        { text: 'I prefer detailed itineraries with reservations made well in advance', score: 1 },
        { text: 'I like having a general plan but leaving room for spontaneity', score: 2 },
        { text: 'I prefer minimal planning and figuring things out as I go', score: 3 }
      ],
      category: 'comfort_with_change'
    },
    {
      id: 'q4',
      text: 'How do you feel about meeting people from very different backgrounds and cultures?',
      options: [
        { text: 'I find it exciting and energizing', score: 3 },
        { text: 'I\'m open to it but it takes effort', score: 2 },
        { text: 'I prefer spending time with people similar to me', score: 1 },
        { text: 'It makes me uncomfortable', score: 0 }
      ],
      category: 'adaptability'
    },
    {
      id: 'q5',
      text: 'You\'re in a foreign country and encounter a problem (lost reservation, language barrier, unexpected situation). How do you typically react?',
      options: [
        { text: 'I see it as part of the adventure and work to solve it', score: 3 },
        { text: 'I feel stressed but manage to figure it out', score: 2 },
        { text: 'I prefer to avoid such situations by careful planning', score: 1 },
        { text: 'I would likely seek help from someone who speaks my language', score: 1 }
      ],
      category: 'independence'
    },
    {
      id: 'q6',
      text: 'Which statement better describes you?',
      options: [
        { text: 'I thrive on routine and find comfort in predictability', score: 1 },
        { text: 'I appreciate some routine but enjoy occasional changes', score: 2 },
        { text: 'I get bored easily and actively seek new experiences', score: 3 }
      ],
      category: 'comfort_with_change'
    },
    {
      id: 'q7',
      text: 'When making a major life decision (career change, moving, big purchase):',
      options: [
        { text: 'I rely heavily on advice from family and friends', score: 1 },
        { text: 'I gather input but ultimately decide based on my own judgment', score: 2 },
        { text: 'I make decisions independently, trusting my own research and instincts', score: 3 },
        { text: 'I tend to avoid major changes when possible', score: 0 }
      ],
      category: 'independence'
    },
    {
      id: 'q8',
      text: 'How often do you deliberately do things that push you outside your comfort zone?',
      options: [
        { text: 'Regularly - I seek out new challenges', score: 3 },
        { text: 'Occasionally - when opportunities arise', score: 2 },
        { text: 'Rarely - I\'m comfortable where I am', score: 1 },
        { text: 'Never - I prefer to stay within familiar territory', score: 0 }
      ],
      category: 'comfort_with_change'
    },
    {
      id: 'q9',
      text: 'If you had to move away from where you currently live, what would you miss most?',
      options: [
        { text: 'My daily routines and familiar places', score: 1 },
        { text: 'Being near family and long-time friends', score: 1 },
        { text: 'Specific amenities or cultural aspects unique to this place', score: 2 },
        { text: 'Honestly, not much - I could recreate what matters to me anywhere', score: 3 }
      ],
      category: 'flexibility'
    },
    {
      id: 'q10',
      text: 'When faced with a rule or regulation that seems unnecessary or inefficient:',
      options: [
        { text: 'I follow it - rules exist for good reasons', score: 0 },
        { text: 'I follow it but feel frustrated', score: 1 },
        { text: 'I look for legitimate workarounds or alternatives', score: 3 },
        { text: 'I question it and may choose not to comply if it doesn\'t make sense', score: 3 }
      ],
      category: 'independence'
    },
    {
      id: 'q11',
      text: 'You\'re considering a place where internet is slower, mail delivery unreliable, and some services you take for granted aren\'t available. How do you react?',
      options: [
        { text: 'That\'s a deal-breaker for me', score: 0 },
        { text: 'I\'d be frustrated but could probably adapt', score: 1 },
        { text: 'I\'d find it inconvenient but workable', score: 2 },
        { text: 'I\'d see it as trading conveniences for other benefits', score: 3 }
      ],
      category: 'flexibility'
    },
    {
      id: 'q12',
      text: 'Which best describes your view of time and schedules?',
      options: [
        { text: 'Punctuality and deadlines are important; I get stressed when things run late', score: 1 },
        { text: 'I prefer structure but can be flexible when needed', score: 2 },
        { text: 'I\'m relaxed about time - things happen when they happen', score: 3 },
        { text: 'Depends entirely on the situation', score: 2 }
      ],
      category: 'adaptability'
    },
    {
      id: 'q13',
      text: 'In a new place where you don\'t know anyone:',
      options: [
        { text: 'I\'d feel lonely and actively seek out other expats from my country', score: 1 },
        { text: 'I\'d be open to friendships but gravitate toward familiar cultural groups', score: 2 },
        { text: 'I\'d deliberately try to build relationships with locals', score: 3 },
        { text: 'I\'m comfortable being on my own and connections happen naturally', score: 3 }
      ],
      category: 'adaptability'
    }
  ];

  // Shuffle answers for each question on mount
  useEffect(() => {
    const shuffled = assessmentQuestions.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));
    setShuffledQuestions([gatewayQuestion, ...shuffled]);
  }, []);

  const handleAnswer = (score, optionText) => {
    const question = shuffledQuestions[currentQuestion];
    setAnswers({
      ...answers,
      [question.id]: { score, text: optionText, category: question.category }
    });
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    // Re-shuffle questions
    const shuffled = assessmentQuestions.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));
    setShuffledQuestions([gatewayQuestion, ...shuffled]);
  };

  const calculateResults = () => {
    let totalScore = 0;
    const categoryScores = {
      comfort_with_change: { score: 0, max: 0 },
      adaptability: { score: 0, max: 0 },
      independence: { score: 0, max: 0 },
      flexibility: { score: 0, max: 0 }
    };

    Object.values(answers).forEach(answer => {
      if (answer.category !== 'gateway') {
        totalScore += answer.score;
        if (categoryScores[answer.category]) {
          categoryScores[answer.category].score += answer.score;
        }
      }
    });

    // Calculate max scores per category
    assessmentQuestions.forEach(q => {
      const maxScore = Math.max(...q.options.map(o => o.score));
      if (categoryScores[q.category]) {
        categoryScores[q.category].max += maxScore;
      }
    });

    const maxScore = assessmentQuestions.reduce((sum, q) => 
      sum + Math.max(...q.options.map(o => o.score)), 0
    );

    return { totalScore, maxScore, categoryScores };
  };

  const getInterpretation = (score, max) => {
    const percentage = (score / max) * 100;
    
    if (percentage >= 75) {
      return {
        level: 'High Relocation Readiness',
        description: 'You demonstrate strong characteristics associated with successful international relocation. You show comfort with change, cultural adaptability, independence in decision-making, and flexibility in challenging situations. People with profiles like yours in our research showed the strongest intent to relocate.',
        color: 'bg-green-100 border-green-500 text-green-900'
      };
    } else if (percentage >= 50) {
      return {
        level: 'Moderate Relocation Readiness',
        description: 'You show a balanced profile with both strengths and areas that might need attention when considering international relocation. You have some comfort with change and new experiences, but may benefit from gradually expanding your comfort zone. Many successful relocators started with similar profiles.',
        color: 'bg-blue-100 border-blue-500 text-blue-900'
      };
    } else if (percentage >= 25) {
      return {
        level: 'Developing Relocation Readiness',
        description: 'Your profile suggests that international relocation would require significant adjustment. You may prefer stability, familiar environments, and established routines. This doesn\'t mean relocation is impossible, but it would be important to carefully consider whether the benefits outweigh the challenges for your particular situation.',
        color: 'bg-yellow-100 border-yellow-500 text-yellow-900'
      };
    } else {
      return {
        level: 'Lower Relocation Readiness',
        description: 'Based on your responses, you appear to have strong preferences for stability, familiar environments, and established social networks. International relocation would likely be very challenging. If you\'re still considering it, extensive preparation and possibly shorter trial visits would be advisable.',
        color: 'bg-orange-100 border-orange-500 text-orange-900'
      };
    }
  };

  const getCategoryName = (category) => {
    const names = {
      comfort_with_change: 'Comfort with Change',
      adaptability: 'Cultural Adaptability',
      independence: 'Independent Decision-Making',
      flexibility: 'Flexibility & Resilience'
    };
    return names[category] || category;
  };

  if (shuffledQuestions.length === 0) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (showResults) {
    const { totalScore, maxScore, categoryScores } = calculateResults();
    const interpretation = getInterpretation(totalScore, maxScore);
    const gatewayAnswer = answers['gateway']?.text || 'Not answered';

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Relocation Readiness Results</h1>
          
          {/* Gateway Response */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Your Relocation Status:</h3>
            <p className="text-gray-600">{gatewayAnswer}</p>
          </div>

          {/* Overall Score */}
          <div className={`mb-8 p-6 rounded-lg border-l-4 ${interpretation.color}`}>
            <h2 className="text-2xl font-bold mb-3">{interpretation.level}</h2>
            <div className="text-4xl font-bold mb-4">
              {totalScore} / {maxScore}
            </div>
            <p className="text-lg leading-relaxed">{interpretation.description}</p>
          </div>

          {/* Category Breakdown */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Category Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(categoryScores).map(([category, data]) => {
                const percentage = (data.score / data.max) * 100;
                return (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">
                        {getCategoryName(category)}
                      </span>
                      <span className="text-gray-600">
                        {data.score} / {data.max}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Context */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">About This Assessment</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              This assessment is based on research from surveys of over 103,000 Americans conducted between 2005-2006. 
              The questions identify characteristics that differentiated those seriously planning to relocate from those 
              who were not. Your results reflect tendencies associated with relocation readiness, not a prediction of success.
            </p>
          </div>

          {/* Video Section - Add your video URL here */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">📹 A Personal Message About Your Results</h3>
            <p className="text-gray-700 mb-4">
              Scores don't tell the whole story. Some people with serious doubts find relocation surprisingly pleasant, 
              while others expecting it to be simple discover they need more adaptation than anticipated. 
              Watch this brief message about interpreting your results:
            </p>
            {/* Replace YOUR_VIDEO_URL_HERE with your actual video URL */}
            <div className="aspect-video w-full bg-gray-200 rounded flex items-center justify-center">
              <p className="text-gray-500 text-sm">Video coming soon - Check back later!</p>
              {/* Uncomment and add your video URL when ready:
              <iframe 
                width="100%" 
                height="100%" 
                src="YOUR_VIDEO_URL_HERE" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded"
              ></iframe>
              */}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw size={20} />
            Take Assessment Again
          </button>
        </div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  const isAnswered = answers[question.id] !== undefined;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Relocation Readiness Assessment
          </h1>
          <p className="text-gray-600 mb-4">
            Answer each question honestly. <strong className="text-gray-800">The order of answers is randomized, so read each option carefully.</strong>
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {shuffledQuestions.length}
          </p>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {question.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = answers[question.id]?.text === option.text;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.score, option.text)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-gray-800">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              !isAnswered
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {currentQuestion === shuffledQuestions.length - 1 ? 'See Results' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelocationAssessment;
