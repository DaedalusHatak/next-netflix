import { ResponseData } from "@/types";
import CarouselList from "../CarouselList/carouselList";

export default async function DataList({
  query,
  lang,
  page,
}: {
  query?: string;
  lang?: string;
  page?: number;
}) {
  const movie = await fetch(
    `https://api.themoviedb.org/${query}?language=${lang}&page=${
      page || 1
    }&api_key=${process.env.NEXT_API_SECRET}`
  );
  const res: ResponseData = await movie.json();

  return <>{res && <CarouselList data={res} />}</>;
}
