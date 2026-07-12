// components/HeroSection/HeroDescription.tsx
import React from "react";

const HeroDescription: React.FC = () => {
  return (
    <div className="text-right rtl space-y-3 sm:space-y-4 px-2 sm:px-4 md:px-0">
      {/* تاتیتل */}
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 max-w-2xl mx-auto md:mx-0">
        با پیچیدی، غیبت‌ها پیچیده نیستن!{" "}
      </h2>

      {/* توضیحات */}
      <div className="space-y-1.5 sm:space-y-2 mt-2 sm:mt-4">
        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
          اپلیکیشن حضور غیاب هوشمند، طراحی شده برای تیم‌های منظم، خلاق و دقیق
        </p>
        <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto md:mx-0 leading-relaxed">
          سریع، دقیق، قابل اعتماد؛ با طراحی کاربرپسند و مجهز به هوش مصنوعی
        </p>
      </div>
    </div>
  );
};

export default HeroDescription;