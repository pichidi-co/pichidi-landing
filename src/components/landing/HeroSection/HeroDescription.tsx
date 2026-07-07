// components/HeroSection/HeroDescription.tsx
import React from "react";

const HeroDescription: React.FC = () => {
  return (
    <div className="text-right rtl space-y-4">
      {/*تاتیتل*/}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 max-w-2xl mx-auto md:mx-0">
        با پیچیدی، غیبت ها پیچیده نیستن!{" "}
      </h2>

      {/* توضیحات */}
      <div className="space-y-2 mt-4">
        <p className="text-base   max-w-2xl mx-auto md:mx-0 leading-relaxed">
          اپلیکیشن حضور غیاب هوشمند، طراحی شده برای تیم‌های منظم، خلاق و دقیق
        </p>
        <p className="text-base   max-w-2xl mx-auto md:mx-0 leading-relaxed">
          سریع، دقیق، قابل اعتماد؛ با طراحی کاربرپسند و مجهز به هوش مصنوعی
        </p>
      </div>
    </div>
  );
};

export default HeroDescription;
