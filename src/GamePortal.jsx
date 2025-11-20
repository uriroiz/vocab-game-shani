import React from 'react';
import { Gamepad2, Keyboard, BookOpen, Sparkles } from 'lucide-react';

const GamePortal = ({ onSelectGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-purple-500 animate-pulse" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            Welcome Shani! 🚀
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-2">
            Ready to practice your English & Hebrew?
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-500">
            Choose your game mode below:
          </p>
        </div>

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

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            📚 Using 84 words from your vocabulary list
          </p>
        </div>
      </div>
    </div>
  );
};

export default GamePortal;

