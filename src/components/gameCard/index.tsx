// Importa os componentes necessários do Next.js e React
import Link from "next/link"; // Componente para criar links internos no Next.js
import Image from "next/image"; // Componente otimizado para imagens no Next.js
import { BiRightArrowCircle } from "react-icons/bi"; // Ícone de seta do pacote React Icons
import { GameProps } from "@/utils/types/game"; // Tipo de dados para os jogos

// Define a interface para as propriedades do componente
interface GameCardProps {
  data: GameProps; // Espera um objeto do tipo GameProps contendo os dados do jogo
}

// Componente que exibe um card de jogo
export function GameCard({ data }: GameCardProps) {
  return (
    // Link para a página de detalhes do jogo usando seu ID
    <Link href={`game/${data.id}`}>
      <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">
        {/* Imagem do jogo */}
        <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
          <Image
            className="rounded-lg object-cover" // Estilização da imagem para arredondar e cobrir o espaço
            src={data.image_url} // URL da imagem do jogo
            alt={data.title} // Texto alternativo para acessibilidade
            fill={true} // Faz a imagem preencher o container
            quality={100} // Define a qualidade máxima para a imagem
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw" // Ajusta o tamanho da imagem conforme a largura da tela
          />
        </div>

        {/* Nome do jogo e ícone de seta */}
        <div className="flex items-center mt-4 justify-between">
          <p className="text-sm font-bold text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">
            {data.title} {/* Exibe o título do jogo */}
          </p>
          <BiRightArrowCircle size={24} color="#000" />{" "}
          {/* Ícone de seta para indicar clique */}
        </div>
      </section>
    </Link>
  );
}
