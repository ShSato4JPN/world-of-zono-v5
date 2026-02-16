import { Link } from "@/i18n/navigation";
import { Blog } from "@/types/microcms";
import dayjs from "dayjs";
import { stripHtml } from "string-strip-html";

type Props = {
  content: Blog;
};

export default function BlogCard({ content }: Props) {
  const publishedAt = dayjs(content.publishedAt).format("YYYY-MM-DD");
  const stripedArticle = stripHtml(content.content).result.replace(/\n/g, " ");

  return (
    <Link href={`/blogs/${content.id}`} className="block">
      <article className="flex flex-col border rounded-lg backdrop-blur-[3px] p-2 gap-2 lg:p-4 lg:cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105">
        <time className="text-xs lg:text-sm">{publishedAt}</time>
        <h2 className="font-bold text-sm lg:text-xl ">{content.title}</h2>
        <div className="hidden lg:flex gap-2">
          {content.category.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="rounded-full py-1 px-2 border duration-300 hover:bg-(--focus) text-[14px] lg:text-xs"
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <p className="line-clamp-3 lg:line-clamp-2 text-xs lg:text-sm leading-5 lg:leading-7">
          {stripedArticle}
        </p>
      </article>
    </Link>
  );
}
