import Head from 'next/head';

interface MetatagsProps {
  title: string;
  description: string;
  imageURL?: string;
}

export default function Metatags({
  title,
  description,
  imageURL,
}: MetatagsProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />

      <meta name="twitter:card" content={description} />
      <meta name="twitter:site" content="@haltarys" />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />

      {imageURL && (
        <>
          <meta name="image" content={imageURL} />
          <meta property="og:image" content={imageURL} />
          <meta property="og:image:alt" content={description} />
          <meta property="twitter:image" content={imageURL} />
          <meta property="twitter:image:alt" content={description} />
        </>
      )}
    </Head>
  );
}
