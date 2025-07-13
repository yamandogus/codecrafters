import React from 'react'
import { BackgroundBeamsWithCollision } from './background-beams-with-collision'

const Header = () => {
  return (
    <BackgroundBeamsWithCollision>
    <div className="relative z-20 text-center">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-sans tracking-tight mb-4">
        CodeCrafters Topluluğuna{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Hoş Geldiniz</span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">Hoş Geldiniz</span>
          </div>
        </div>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Yazılım geliştirme yolculuğunuzda size rehberlik eden modern araçlar ve topluluk desteği
      </p>
    </div>
  </BackgroundBeamsWithCollision>
  )
}

export default Header