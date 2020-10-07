import {
  CategoryArticleType,
  CategoryListItemType,
  CategoryType,
  getCategoriesList,
  getCategoryArticles,
  getCategoryDetails,
} from '../../../utils/datasource';

interface ContextParams {
  params: CategoryListItemType;
}

interface Props {
  category: CategoryType;
  articles: CategoryArticleType[];
}

export default function CategoryPage({ category, articles }: Props) {
  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>

      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <p>
              <a href={article.url}>{article.meta.title}</a>
            </p>

            <p>{article.meta.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps({ params }: ContextParams) {
  const articles = await getCategoryArticles(params.lang, params.category);
  const category = getCategoryDetails(params.lang, params.category);

  return {
    props: { category, articles },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getCategoriesList().map((category) => ({ params: category })),
  };
}
