import ResultsPageClient from "./ResultsPageClient";

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default async function ResultsPage({ params }: Props) {
  const { sessionId } = await params;
  return <ResultsPageClient sessionId={sessionId} />;
}
