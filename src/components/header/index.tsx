// Importa a imagem do logo do site
import logoImg from "../../../public/logo.png";

// Importa o componente Image do Next.js para otimização de imagens
import Image from "next/image";

// Importa o componente Link do Next.js para navegação entre páginas sem recarregar a aplicação
import Link from "next/link";

// Importa o ícone de controle de videogame da biblioteca react-icons
import { LiaGamepadSolid } from "react-icons/lia";

// Componente Header que representa o cabeçalho do site
export function Header() {
  return (
    <header className="w-full h-28 bg-slate-100 text-black px-2">
      {/* Container principal do cabeçalho */}
      <div className="max-w-screen-lg mx-auto flex justify-center items-center h-28 sm:justify-between">
        {/* Menu de navegação */}
        <nav className="flex justify-center items-center gap-4">
          {/* Logo do site com link para a página inicial */}
          <Link href="/">
            <Image
              src={logoImg} // Caminho da imagem do logo
              alt="logo site dalygames" // Texto alternativo para acessibilidade
              quality={100} // Qualidade máxima da imagem
              priority={true} // Define a imagem como prioritária para carregamento rápido
              className="w-full" // Classe CSS para ajuste da imagem
            />
          </Link>

          {/* Links de navegação para as páginas Games e Profile */}
          <Link href="/">Games</Link>
          <Link href="/profile">Profile</Link>
        </nav>

        {/* Ícone de controle de videogame (somente visível em telas maiores) */}
        <div className="hidden sm:flex justify-center items-center">
          <Link href="/profile">
            <LiaGamepadSolid size={34} color="#475569" />{" "}
            {/* Ícone estilizado */}
          </Link>
        </div>
      </div>
    </header>
  );
}
