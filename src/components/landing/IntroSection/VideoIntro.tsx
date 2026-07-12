"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "video-react-player/dist/video-react-player.css";

const Player = dynamic(
  () => import("video-react-player").then((m) => m.Player),
  { ssr: false },
);

const VideoIntro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-14">
          {/* ================= سمت راست - ویدئو ================= */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="relative">
              {/* کارت اصلی ویدئو */}
              <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] md:rounded-[38px] bg-[#d9d9d9] aspect-[16/12]">
                <Player
                  ref={playerRef}
                  src="/video/معرفی کسب و کار کاراکتری.mp4"
                  poster="/images/IntroSection/video-poster.jpg"
                  width="100%"
                  height="100%"
                  controls={isPlaying}
                  playing={isPlaying}
                />

                {/* دکمه پلی سفارشی - فقط وقتی پلی نشده نمایش داده بشه */}
                {!isPlaying && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 w-full h-full flex items-center justify-center z-10 cursor-pointer group"
                  >
                    {/* عکس تامبنیل - آدرس یکسان با poster */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src="/images/IntroSection/video-poster.jpg"
                        alt="تماشای ویدئو"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                      />
                      {/* اوورلی تیره برای بهتر دیدن پلی دکمه */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    </div>

                    {/* دکمه پلی */}
                    <div className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white/90 shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                      <svg
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#0D4C92] ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>

              {/* برش گوشه */}
              <div className="absolute left-0 top-0 w-[80px] sm:w-[100px] md:w-[130px] h-[75px] sm:h-[90px] md:h-[120px] bg-white rounded-br-[28px] sm:rounded-br-[32px] md:rounded-br-[40px] z-20" />

              {/* لوگو */}
              <div className="absolute left-[5px] sm:left-[10px] md:left-[-15px] top-[5px] sm:top-[8px] md:top-[-40px] w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] lg:w-[190px] lg:h-[190px] rounded-full flex items-center justify-center z-30 ">
                <Image
                  src="/logos/IMG_7066 1.svg"
                  alt="پیچیدی"
                  width={110}
                  height={110}
                  className="sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px]"
                />
              </div>
            </div>
          </div>

          {/* ================= سمت چپ - محتوای متنی ================= */}
          <div className="flex-1 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-right">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight sm:leading-[60px] md:leading-[70px]">
              معرفی حضور غیاب آنلاین
              <br />
              پیچیدی
            </h2>

            <p className="mt-6 sm:mt-8 md:mt-10 max-w-lg text-gray-700 leading-7 sm:leading-8 md:leading-9 text-base sm:text-lg">
              سامانه آنلاین حضور و غیاب و مدیریت پرسنل،
              <br className="hidden sm:block" />
              با حذف نیاز به هرگونه سخت افزار فیزیکی.
              <br className="hidden sm:block" />
              (شامل اپلیکیشن و پنل تحت وب)
            </p>

            <button className="mt-8 sm:mt-10 md:mt-12 h-12 sm:h-14 px-6 sm:px-8 md:px-10 rounded-full border-2 border-[#0D4C92] text-[#0D4C92] flex items-center gap-2 sm:gap-3 hover:bg-[#0D4C92] hover:text-white duration-300 text-sm sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                className="sm:w-[22px] sm:h-[22px]"
              >
                <path
                  d="M5 12h14M5 12l6-6M5 12l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              دریافت مشاوره رایگان
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoIntro;
