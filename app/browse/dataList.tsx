import CarouselList from "./carouselList";

export default async function DataList({ query }: any) {
  const movie = await fetch(
    `https://api.themoviedb.org/${query}?api_key=${process.env.NEXT_API_SECRET}`
  );
  const res = await movie.json();
  console.log(res);
  return <>{res && <CarouselList data={res} />}</>;
}
