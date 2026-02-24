import { ReactNode } from "react";

type Props = {
  nav: ReactNode;
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
};

export default function ArticleLayout({ nav, header, content, footer }: Props) {
  return (
    <article className="flex flex-col gap-4 mx-auto w-full max-w-4xl overflow-x-hidden px-1 lg:mt-4">
      <div className="py-2 px-2 lg:px-10 backdrop-blur-xs shadow-lg rounded-lg border">
        {nav}
        {header}
        {content}
        {footer}
      </div>
    </article>
  );
}
