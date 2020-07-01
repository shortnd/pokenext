import Link from 'next/link'

export default function Home({ pokemon }){
  return (
    <>
      <h1>Pokemon Home</h1>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index}>
            <Link href="/[name]" as={`/${poke.name}`}>
              <a>
              {poke.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=300");
  const pokemon = await res.json();
  return {
    props: {
      nextPage: pokemon.next,
      pokemon: pokemon.results
    }
  }
}
