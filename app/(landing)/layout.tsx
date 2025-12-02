import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NextTopLoader from "nextjs-toploader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <>
      <NextTopLoader showSpinner={false} />

      <Header />
      {children}
      <Footer />
    </>
  );
}
