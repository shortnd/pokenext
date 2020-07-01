export default function PokemonPage({ pokemon }) {
    return (
        <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt="" />
            <div>
                <h2>Abilities</h2>
                {pokemon.abilities.map((ability, index) => (
                    <p key={ability.slot}>
                        {ability.ability.name}
                    </p>
                ))}
            </div>
            <div>
                <h2>Moves</h2>
                {pokemon.moves.map((move, index) => (
                    <p key={index}>
                        {move.move.name} - Learned at {move.version_group_details[0].level_learned_at}
                    </p>
                ))}
            </div>
            {/* <pre>
                {JSON.stringify(pokemon, null, 2)}
            </pre> */}
        </>
    )
}

export async function getStaticPaths() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150")
    const pokemon = await res.json();

    const paths = pokemon.results.map((poke) => ({
        params: { name: poke.name }
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
    const pokemon = await res.json();

    return {
        props: {
            pokemon
        }
    }
}
