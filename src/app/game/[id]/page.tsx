// Importa os tipos e componentes necessários
import { GameProps } from "@/utils/types/game"; // Tipo para as propriedades do jogo
import { redirect } from "next/navigation"; // Função para redirecionamento de página
import Image from "next/image"; // Componente para renderizar imagens otimizadas no Next.js
import { Container } from "@/components/container"; // Componente de container para agrupar conteúdo
import { Label } from "./components/label"; // Componente para exibir labels (plataformas, categorias)
import { GameCard } from "@/components/gameCard"; // Componente para exibir os detalhes do jogo recomendado
import { Metadata } from "next";

// Define a interface para os parâmetros recebidos na função
interface PropsParams {
  params: {
    id: string; // O ID do jogo passado pela URL
  };
}

// Função responsável por gerar metadados dinâmicos para a página do jogo
export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  try {
    // Faz uma requisição para obter os detalhes do jogo pelo ID
    const response: GameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } } // Revalida os dados a cada 60 segundos para manter atualizado
    )
      .then((res) => res.json()) // Converte a resposta para JSON
      .catch(() => {
        // Caso ocorra um erro na requisição, retorna um título padrão
        return {
          title: "DalyGames - Descubra novos jogos para se divertir.",
        };
      });

    // Retorna os metadados dinâmicos baseados nos dados do jogo
    return {
      title: response.title, // Define o título da página como o nome do jogo
      description: `${response.description.slice(0, 100)}...`, // Define a descrição cortando os primeiros 100 caracteres
      openGraph: {
        title: response.title, // Define o título para compartilhamento no Open Graph (Facebook, WhatsApp, etc.)
        images: [response.image_url], // Define a imagem usada ao compartilhar a página
      },
      robots: {
        index: true, // Permite que os mecanismos de busca indexem a página
        follow: true, // Permite que os mecanismos de busca sigam os links da página
        nocache: true, // Indica para não armazenar cache nos resultados da pesquisa
        googleBot: {
          index: true, // Especificamente para o Google, permite indexação
          follow: true, // Permite seguir links da página
          noimageindex: true, // Evita que imagens sejam indexadas separadamente
        },
      },
    };
  } catch (err) {
    // Caso ocorra um erro na requisição, retorna um título padrão para evitar falhas
    return {
      title: "DalyGames - Descubra novos jogos para se divertir.",
    };
  }
}

// Função assíncrona para buscar os dados do jogo baseado no ID
async function getData(id: string) {
  try {
    // Realiza a requisição para a API usando o ID fornecido
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } } // Configura o tempo de revalidação do cache da requisição
    );
    return res.json(); // Retorna os dados da API em formato JSON
  } catch (err) {
    throw new Error("Failed to fetch data"); // Caso ocorra erro na requisição, lança erro
  }
}

// Função assíncrona para buscar o jogo do dia (sugestão de jogo)
async function getGameSorted() {
  try {
    // Realiza a requisição para obter o jogo recomendado (sugestão do dia)
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" } // Desabilita o cache para garantir que sempre pegue o jogo mais atual
    );
    return res.json(); // Retorna os dados da API em formato JSON
  } catch (err) {
    throw new Error("Failed to fetch data"); // Lança erro se ocorrer falha na requisição
  }
}

// Função principal do componente, responsável por renderizar os detalhes do jogo
export default async function Detail({
  params: { id },
}: {
  params: { id: string }; // Recebe o parâmetro 'id' da URL
}) {
  // Chama as funções assíncronas para buscar os dados do jogo específico e o jogo recomendado
  const data: GameProps = await getData(id);
  const sortedGame: GameProps = await getGameSorted();

  // Caso os dados do jogo não sejam encontrados, redireciona o usuário para a página inicial
  if (!data) {
    redirect("/");
  }

  return (
    <main className="w-full text-black">
      {" "}
      {/* Container principal da página */}
      {/* Seção de imagem do jogo */}
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          className="object-cover w-full h-80 sm:h-96 opacity-75" // Definições de estilo para a imagem
          src={data.image_url} // A URL da imagem do jogo
          alt={data.title} // Texto alternativo da imagem
          priority={true} // Marca a imagem como prioritária para carregamento
          fill={true} // Faz a imagem preencher o container
          quality={100} // Define a qualidade da imagem (máxima)
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw" // Definição do tamanho da imagem dependendo da largura da tela
        />
      </div>
      <Container>
        {" "}
        {/* Contêiner para o conteúdo da página */}
        <h1 className="font-bold text-xl my-4">{data.title}</h1>{" "}
        {/* Título do jogo */}
        <p>{data.description}</p> {/* Descrição do jogo */}
        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        {/* Exibe uma lista de plataformas com o componente Label */}
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item) => (
            <Label name={item} key={item} /> // Exibe cada plataforma como um label
          ))}
        </div>
        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        {/* Exibe uma lista de categorias com o componente Label */}
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item) => (
            <Label name={item} key={item} /> // Exibe cada categoria como um label
          ))}
        </div>
        <p className="mt-7 mb-2">
          <strong>Data de lançamento:</strong> {data.release}{" "}
          {/* Exibe a data de lançamento do jogo */}
        </p>
        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        {/* Seção de jogo recomendado */}
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />{" "}
            {/* Exibe o card do jogo recomendado */}
          </div>
        </div>
      </Container>
    </main>
  );
}
