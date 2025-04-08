import Header from "./components/ui/Header";
import FullImgesSider from "./components/FullImgesSider";
import { supabase } from "./lib/supabaseClient";
import { Template } from "./types/supabase";

export default async function Page() {
  const { data, error }: { data: Template[] | null; error: unknown } =
    await supabase
      .from("template")
      .select("*")
      .order("created_at", { ascending: false });
  console.log({ data });

  if (!data || error) {
    throw Error("에러 발생");
  }

  const images = data
    ?.filter((item) => item.thumbnail_image_url)
    .map((item) => ({
      id: item.id,
      src: item.thumbnail_image_url!,
    }));

  return (
    <div className="p-4">
      <Header />
      <div id="content">
        {/* 슬라이드 */}
        <div className="flex justify-center items-center w-full my-5">
          <div className="flex justify-center items-center w-80 h-80">
            <FullImgesSider images={images} />
            {/* {data?.map((el) => {
              
              return 
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
