import { getDictionary } from "./dictionaries";

export default async function Page({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang); // en, de, fr, es, ru, ar

  return (
    <div>
      <h1>{dict["addToCart"]}</h1> {/* Example usage */}
    </div>
  );
}
