import Footer from "@/components/layout/footer/index";
import Header from "@/components/layout/Header";
import NextTopLoader from "nextjs-toploader";
import { LandingProviders } from "@/components/providers/LandingProviders";
import { QueryProvider } from "@/components/providers/QueryProvider";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <LandingProviders>
        <NextTopLoader showSpinner={false} />
        <Header />
        {children}
        <Footer />
      </LandingProviders>
    </QueryProvider>
  );
}
