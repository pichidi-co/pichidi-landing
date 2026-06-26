import { FOOTER_TEXT } from "@/components/constant/footer";

export function FooterBottom() {
  return (
    <div 
      className="pt-8"
      style={{
        height: "200px",
        background: "linear-gradient(0deg, #07437A 0%, #87A4BE 7.67%, #FFFFFF 15.01%)"
      }}
    >
      <p className="text-center text-sm leading-relaxed text-black">
        {FOOTER_TEXT.copyright}
      </p>
    </div>
  );
}