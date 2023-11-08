import CarouselList from "../CarouselList/carouselList";

export default async function DataList({ query, lang, page }: any) {
  const movie = await fetch(
    `https://api.themoviedb.org/${query}?language=${lang}&page=${
      page || 1
    }&api_key=${process.env.NEXT_API_SECRET}`
  );
  const res = await movie.json();

  return <>{res && <CarouselList data={res} />}</>;
}
