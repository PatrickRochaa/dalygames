// Importa o tipo ReactNode que representa qualquer conteúdo que pode ser renderizado, como elementos, texto, ou componentes
import { ReactNode } from "react";

// Função do componente Container, que recebe as props com um único valor 'children' do tipo ReactNode
export function Container({ children }: { children: ReactNode }) {
  return (
    // A 'div' é um contêiner que limita a largura máxima da tela e centraliza o conteúdo
    <div className="max-w-screen-lg mx-auto px-3">
      {/* Renderiza o conteúdo que é passado para o Container via prop 'children' */}
      {children}
    </div>
  );
}
