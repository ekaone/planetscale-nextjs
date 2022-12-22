import Head from "next/head";
import Link from "next/link";
import Product from "../components/Product";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>PlanetScale Next.js Quickstart</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10 mx-auto max-w-4xl">
        <Layout>
          <h1 className="text-6xl font-bold mb-4 text-center">
            Next.js Starter
          </h1>
          <p className="mb-20 text-xl text-center">
            🔥 Shop from the hottest items in the world 🔥
          </p>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center gap-10">
            {products.map((product) => (
              <Link
                href={`/photo/${product.id}`}
                scroll={false}
                key={product.id}
              >
                <a className="overflow-hidden flex rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl hover:z-10 transition-all ease-in-out">
                  <Product product={product} key={product.id} />
                </a>
              </Link>
            ))}
          </div>
        </Layout>
      </main>
      <footer></footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  //convert decimal value to string to pass through as json
  const products = data.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));
  return {
    props: { products },
  };
}
