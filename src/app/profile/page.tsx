// Importa o componente Container que encapsula o conteúdo da página
import { Container } from "@/components/container";

// Importa o componente de imagem otimizada do Next.js
import Image from "next/image";

// Importa a imagem padrão do usuário para exibição no perfil
import userImg from "../../../public/user.png";

// Importa o ícone de compartilhamento da biblioteca de ícones react-icons
import { FaShareAlt } from "react-icons/fa";

// Importa o componente FavoriteCard, responsável por exibir um jogo favorito do usuário
import { FavoriteCard } from "./components/favorite";

// Define o componente principal da página de perfil
export default function Profile() {
  return (
    // Estrutura principal da página de perfil
    <main className="w-full text-black">
      {/* Componente Container que define a largura e estrutura do conteúdo */}
      <Container>
        {/* Seção do topo do perfil que exibe a imagem do usuário, nome e botões */}
        <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
          {/* Container que agrupa a imagem do usuário e o nome */}
          <div className="w-full flex items-center justify-center gap-4 text-lg flex-col sm:flex-row sm:justify-normal">
            {/* Exibição da imagem do usuário */}
            <Image
              className="rounded-full w-56 h-56" // Define a imagem como arredondada e seu tamanho
              src={userImg} // Define a imagem que será exibida
              alt="imagem do usuario" // Texto alternativo para acessibilidade
            />

            {/* Nome do usuário em destaque */}
            <h1 className="font-bold text-2xl">Patrick Rocha</h1>

            {/* Container dos botões de ações (Configurações e Compartilhamento) */}
            <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
              {/* Botão para acessar as configurações do perfil */}
              <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
                Configurações
              </button>

              {/* Botão de compartilhamento do perfil com ícone */}
              <button className="bg-gray-700 px-4 py-3 rounded-lg">
                <FaShareAlt size={24} color="#fff" />
              </button>
            </div>
          </div>
        </section>

        {/* Seção que exibe os cartões de jogos favoritos do usuário */}
        <section className="flex flex-wrap gap-5 flex-col md:flex-row">
          {/* Exibição do primeiro jogo favorito */}
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

          {/* Exibição do segundo jogo favorito */}
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>

          {/* Exibição do terceiro jogo favorito */}
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
        </section>
      </Container>
    </main>
  );
}
