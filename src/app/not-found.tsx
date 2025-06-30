"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Simple 404 */}
        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-300">
          Página No Encontrada
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto">
          La página que buscas no existe. Puede que haya sido movida o
          eliminada.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Volver al Inicio
          </Link>

          <Link
            href="/#projects"
            className="px-8 py-3 border-2 border-gray-600 hover:border-blue-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Ver Proyectos
          </Link>
        </div>
      </div>
    </div>
  );
}
