"use client"; // Indica que este componente é um Client Component no Next.js

import { useState } from "react"; // Importa o hook useState para gerenciar estados
import { FiEdit, FiX } from "react-icons/fi"; // Ícones de edição e fechar do pacote React Icons

// Componente que exibe e permite editar o nome de um jogo favorito
export function FavoriteCard() {
  // Estado para armazenar o valor do input
  const [input, setInput] = useState("");

  // Estado para controlar a exibição do campo de input
  const [showInput, setShowInput] = useState(false);

  // Estado para armazenar o nome do jogo favorito
  const [gameName, setGameName] = useState("");

  // Função para alternar a exibição do input e salvar o nome do jogo
  function handleButton() {
    setShowInput(!showInput); // Alterna entre mostrar e esconder o input

    // Se o input não estiver vazio, define o nome do jogo favorito
    if (input !== "") {
      setGameName(input);
    }

    setInput(""); // Limpa o campo de input
  }

  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
      {/* Se showInput for verdadeiro, exibe o campo de input */}
      {showInput ? (
        <div className="flex items-center justify-center gap-3 cursor-pointer">
          <input
            className="w-full rounded-md h-8 text-black px-2 border-2 border-gray-300 bg-white" // Adicionando borda e fundo branco
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)} // Atualiza o estado do input ao digitar
          />
          <button onClick={handleButton}>
            <FiX size={24} color="#FFF" /> {/* Ícone de fechar */}
          </button>
        </div>
      ) : (
        // Se showInput for falso, exibe o botão de edição
        <button
          className="self-start hover:scale-110 duration-200 transition-all"
          onClick={handleButton}
        >
          <FiEdit size={24} color="#FFF" /> {/* Ícone de edição */}
        </button>
      )}

      {/* Se houver um jogo salvo, exibe o nome dele */}
      {gameName && (
        <div>
          <span className="text-white">Jogo Favorito:</span>
          <p className="font-bold text-white">{gameName}</p>
        </div>
      )}

      {/* Se nenhum jogo foi adicionado, exibe a mensagem padrão */}
      {!gameName && <p className="font-bold text-white">Adicionar jogo</p>}
    </div>
  );
}
