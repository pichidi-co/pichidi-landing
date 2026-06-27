export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}