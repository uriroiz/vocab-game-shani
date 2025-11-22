import React from 'react';
import { Gamepad2, Keyboard, BookOpen, Sparkles, GraduationCap, Hand } from 'lucide-react';

const GamePortal = ({ onSelectGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-6xl w-full">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-purple-500 animate-pulse" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            Welcome Shani! 🚀
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-2">
            Ready to practice your English?
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-500">
            Choose your game mode below:
          </p>
        </div>

        {/* Vocabulary Games Section */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6" />
            Vocabulary Games
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Multiple Choice Game */}
          <button
            onClick={() => onSelectGame('multiple-choice')}
            className="group relative bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-purple-500 hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
          >
            <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
              EASY
            </div>
            
            <div className="flex justify-center mb-4 sm:mb-6">
              <Gamepad2 className="w-16 h-16 sm:w-20 sm:h-20 text-purple-500 group-hover:text-purple-600 transition-colors" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Multiple Choice
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
              Choose the correct answer from 4 options
            </p>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                <span>Both English → Hebrew & Hebrew → English</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                <span>20 questions per game</span>
              </div>
            </div>
            
            <div className="mt-6 px-4 py-2 bg-purple-500 text-white font-bold rounded-xl group-hover:bg-purple-600 transition-colors">
              Start Game
            </div>
          </button>

          {/* Typing Game */}
          <button
            onClick={() => onSelectGame('typing')}
            className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-blue-500 hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
          >
            <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
              HARD
            </div>
            
            <div className="flex justify-center mb-4 sm:mb-6">
              <Keyboard className="w-16 h-16 sm:w-20 sm:h-20 text-blue-500 group-hover:text-blue-600 transition-colors" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Typing Challenge
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
              Type the English translation yourself
            </p>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                <span>Hebrew → English only</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                <span>20 questions per game</span>
              </div>
            </div>
            
            <div className="mt-6 px-4 py-2 bg-blue-500 text-white font-bold rounded-xl group-hover:bg-blue-600 transition-colors">
              Start Game
            </div>
          </button>
          </div>
        </div>

        {/* Irregular Verb Games Section */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 flex items-center justify-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Irregular Verb Games
            <span className="text-xs sm:text-sm bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full">NEW</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Verb Choice Game */}
            <button
              onClick={() => onSelectGame('verb-choice')}
              className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 border-4 border-emerald-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-emerald-500 hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
                MEDIUM
              </div>
              
              <div className="flex justify-center mb-4 sm:mb-6">
                <Gamepad2 className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Verb Quiz
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                Choose the correct Past Simple & Past Participle
              </p>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2 text-emerald-500" />
                  <span>Sequential V2 & V3 questions</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 mr-2 text-emerald-500" />
                  <span>80+ irregular verbs</span>
                </div>
              </div>
              
              <div className="mt-6 px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl group-hover:bg-emerald-600 transition-colors">
                Start Game
              </div>
            </button>

            {/* Verb Drag Game */}
            <button
              onClick={() => onSelectGame('verb-drag')}
              className="group relative bg-gradient-to-br from-rose-50 to-orange-50 border-4 border-rose-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-rose-500 hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
                FUN
              </div>
              
              <div className="flex justify-center mb-4 sm:mb-6">
                <Hand className="w-16 h-16 sm:w-20 sm:h-20 text-rose-500 group-hover:text-rose-600 transition-colors" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Drag & Match
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                Drag colorful words to match V2 & V3 forms
              </p>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2 text-rose-500" />
                  <span>Interactive drag & drop</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 mr-2 text-rose-500" />
                  <span>Visual feedback & hints</span>
                </div>
              </div>
              
              <div className="mt-6 px-4 py-2 bg-rose-500 text-white font-bold rounded-xl group-hover:bg-rose-600 transition-colors">
                Start Game
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            📚 Vocabulary: 84 words • Irregular Verbs: 80+ verbs
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePortal;

