// https://remix.run/docs/en/1.16.1/guides/streaming
// https://www.youtube.com/watch?v=IKPVSV34slA&ab_channel=Remix

import { Suspense } from "react";
import { useLoaderData, Await } from "@remix-run/react";
import { defer } from "@remix-run/node";

export async function loader() {
  // fast data, critical, above the fold, awaiting
  const mainContent = await queryMainContent().then(slow(250));

  // slow data, non-critical, below the fold
  const collections = queryCollections().then(slow(3000));

  return defer({ // defer instead of json
    mainContent,
    collections,
  })
}

export default function DeferWithTailwind() {
  const { mainContent, collections } = useLoaderData<typeof loader>();

  return (
    <>
      <h2>Defer</h2>
      <Suspense fallback={<Skeleton />}>
        <Await resolve={mainContent}>
          {(mainContent: Collection) => (
            <List data={mainContent.data} />
          )}
        </Await>
      </Suspense>

      <pre className="my-4">--- Fold: slow data below me deferred ---</pre>

      <Suspense fallback={<Skeleton />}>
        <Await resolve={collections}>
          {(collections: Collection) => (
            <List data={collections.data} />
          )}
        </Await>
      </Suspense>
    </>
  );
}

const slow = <T,>(timeout: number = 1000) => (res: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(res), timeout));

type Entry = {
  id: number;
  title: string;
  description: string;
}

type Collection = {
  data: Entry[];
}

const queryMainContent = (): Promise<Collection> => Promise.resolve({
  data: [
    { id: 1, title: 'Main 1', description: 'Main Description 1' },
    { id: 2, title: 'Main 2', description: 'Main Description 2' },
    { id: 3, title: 'Main 3', description: 'Main Description 3' },
  ],
});

const queryCollections = (): Promise<Collection> => Promise.resolve({
  data: [
    { id: 1, title: 'Collection 1', description: 'Collection Description 1' },
    { id: 2, title: 'Collection 2', description: 'Collection Description 2' },
    { id: 3, title: 'Collection 3', description: 'Collection Description 3' },
  ],
});

const List = ({ data }: Collection) => (
  <section>
    {data.length ? (
      <ul >
        {data.map(({ id, title, description }) => (
          <li key={id}>
            <h3>{title}</h3>
            <div>{description}</div>
          </li>
        ))}
      </ul>
    ) : null}
  </section>
);

const SkeletonLine = ({ extraClasses = "h-[1.4rem] w-32" }) => (
  <div
    className={`
      relative
      overflow-hidden
      bg-white
      bg-opacity-5
      rounded-xl
      after:absolute
      after:top-0
      after:right-0
      after:bottom-0
      after:left-0
      after:translate-x-[-100%]
      after:bg-shimmer
      after:animate-shimmer
      ${extraClasses}`}
  />
);

const Skeleton = () => (
  <ul>
    {[1, 2, 3].map(key =>
      <li key={key}>
        <div className="flex flex-col gap-2 mb-2">
          <SkeletonLine />
          <SkeletonLine extraClasses="h-[1.1rem] w-[180px]" />
        </div>
      </li>
    )}
  </ul>
)
