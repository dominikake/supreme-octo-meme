// app/page.tsx

import { DateCalculator } from "@/components/date-calculator";

export default function Home() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Date Calculator</h1>
      <DateCalculator />
    </main>
  );
}