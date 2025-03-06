import Image from "next/image"; // Importa o componente de imagem do Next.js
import { Container } from "@/components/container"; // Importa o Container, que provavelmente envolve o conteúdo da página
import { GameCard } from "@/components/gameCard"; // Importa o componente de exibição de jogos
import { Input } from "@/components/input"; // Importa o componente de Input para a pesquisa
import { GameProps } from "@/utils/types/game"; // Importa o tipo de dados de jogo
import Link from "next/link"; // Importa o componente Link do Next.js para navegação
import { BsArrowRightSquare } from "react-icons/bs"; // Importa o ícone de seta da biblioteca react-icons

// Função assíncrona para pegar o jogo do dia
async function getDalyGame() {
  try {
    // Faz a requisição para obter o jogo do dia, com revalidação após 320 segundos
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );
    return res.json(); // Retorna os dados em formato JSON
  } catch (err) {
    // Caso haja erro, lança um erro
    throw new Error("Failed to fetch data");
  }
}

// Função assíncrona para pegar os dados dos jogos
async function getGamesData() {
  try {
    // Faz a requisição para obter todos os jogos, com revalidação após 320 segundos
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {
      next: { revalidate: 320 },
    });
    return res.json(); // Retorna os dados em formato JSON
  } catch (err) {
    // Caso haja erro, lança um erro
    throw new Error("Failed to fetch data");
  }
}

// Função principal da página (Home)
export default async function Home() {
  // Chama as funções assíncronas para obter o jogo do dia e a lista de jogos
  const dalyGame: GameProps = await getDalyGame(); // Obtém o jogo do dia
  const data: GameProps[] = await getGamesData(); // Obtém a lista de jogos

  return (
    <main className="w-full">
      {/* Contêiner principal da página */}
      <Container>
        {/* Título da seção do jogo exclusivo */}
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um jogo exclusivo pra você
        </h1>
        {/* Link para a página do jogo do dia */}
        <Link href={`/game/${dalyGame.id}`}>
          {/* Seção de sugestão de jogo */}
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative rounded-lg">
              {/* Nome do jogo exibido na parte inferior da imagem */}
              <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2">
                <p className="font-bold text-xl text-white">{dalyGame.title}</p>
                {/* Ícone de seta apontando para a direita */}
                <BsArrowRightSquare size={24} color="#fff" />
              </div>
              {/* Imagem do jogo */}
              <Image
                src={dalyGame.image_url} // URL da imagem do jogo
                alt={dalyGame.title} // Texto alternativo da imagem (o título do jogo)
                priority={true} // Define a prioridade de carregamento da imagem
                quality={100} // Define a qualidade da imagem (máxima)
                fill={true} // Faz a imagem preencher o container
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw" // Tamanhos diferentes para responsividade
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-80 transition-all duration-300" // Estilo da imagem
              />
            </div>
          </section>
        </Link>

        {/* Input de pesquisa para procurar jogos */}
        <Input />

        {/* Título da seção de jogos sugeridos */}
        <h2 className="text-lg font-bold mt-8 mb-5">Jogos para conhecer</h2>
        {/* Grid exibindo os jogos */}
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            // Exibe um card para cada jogo
            <GameCard key={item.id} data={item} />
          ))}
        </section>
      </Container>
    </main>
  );
}
