import { ArticlesListItemType, ArticleType, getArticle, getArticlesList } from '../../../utils/datasource';

interface ContextParams {
  params: ArticlesListItemType;
}

interface Props {
  article: ArticleType;
  category: string;
}

export default function ArticlePage({ article }: Props) {
  return (
    <div>
      <h1>{article.meta.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}

export async function getStaticProps({ params }: ContextParams) {
  const article = await getArticle(params.lang, params.category, params.slug);

  return {
    props: { category: params.category, article },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getArticlesList().map((article) => ({ params: article })),
  };
}
