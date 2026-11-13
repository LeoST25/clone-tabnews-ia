import UnderConstruction from "./under-construction";

export const revalidate = 3600;

async function getTotalContents(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?page=1&per_page=1&strategy=new",
      {
        next: { revalidate },
        signal: AbortSignal.timeout(5000),
      },
    );
    const totalHeader = res.headers.get("x-pagination-total-rows");
    if (totalHeader) {
      const parsed = Number.parseInt(totalHeader, 10);
      if (!Number.isNaN(parsed)) return parsed;
    }
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data.length : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const total = await getTotalContents();
  return <UnderConstruction total={total} />;
}
