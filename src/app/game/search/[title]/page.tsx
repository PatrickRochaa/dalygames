import { GameProps } from "@/utils/types/game"; // Importa o tipo GameProps para tipar os dados do jogo
import { Container } from "@/components/container"; // Importa o componente Container para estruturar a página
import { Input } from "@/components/input"; // Importa o componente Input, responsável pela busca de jogos
import { GameCard } from "@/components/gameCard"; // Importa o componente GameCard para exibir os jogos encontrados

// Função assíncrona para buscar um jogo pelo nome na API
async function getData(title: string) {
  try {
    const decodeTitle = decodeURI(title); // Decodifica o título caso tenha caracteres especiais na URL
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`
    ); // Faz a requisição para a API com o título pesquisado
    return res.json(); // Retorna os dados da API convertidos para JSON
  } catch (err) {
    throw new Error("Failed to fetch data"); // Retorna um erro caso a requisição falhe
  }
}

// Componente principal da página de pesquisa de jogos
export default async function Search({
  params: { title },
}: {
  params: { title: string };
}) {
  // Chama a função getData para buscar os jogos com base no título pesquisado
  const games: GameProps[] = await getData(title);

  return (
    <main className="w-full text-black">
      <Container>
        {/* Componente de input para pesquisa de jogos */}
        <Input />

        <h1 className="font-bold text-xl mt-8 mb-5">
          Veja o que encontramos na nossa base:
        </h1>

        {/* Exibe uma mensagem caso nenhum jogo seja encontrado */}
        {!games && <p>Esse jogo não foi encontrado...</p>}

        {/* Se houver jogos encontrados, exibe-os em uma grade de cards */}
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games &&
            games.map((item) => (
              <GameCard key={item.id} data={item} /> // Renderiza um card para cada jogo encontrado
            ))}
        </section>
      </Container>
    </main>
  );
}
