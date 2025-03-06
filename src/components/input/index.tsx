"use client" // Indica que este componente deve ser executado no lado do cliente

import { useState, FormEvent } from "react"; // Importa useState para gerenciar o estado e FormEvent para tipar o evento do formulário
import { FiSearch } from "react-icons/fi"; // Importa o ícone de pesquisa do react-icons
import { useRouter } from "next/navigation"; // Importa o useRouter para navegação no Next.js

export function Input() {
    // Estado para armazenar o valor digitado no campo de pesquisa
    const [input, setInput] = useState("");

    // Hook para acessar a função de navegação do Next.js
    const router = useRouter();

    // Função chamada ao enviar o formulário de pesquisa
    function handleSearch(event: FormEvent) {
        event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

        // Verifica se o campo de pesquisa está vazio
        if (input === "") {
            alert("Campo vazio!!"); // Exibe um alerta se o usuário tentar pesquisar sem digitar nada
            return;
        }

        // Redireciona o usuário para a página de busca com o termo digitado
        router.push(`/game/search/${input}`);
    }

    return (
        <form
            onSubmit={handleSearch} // Chama a função handleSearch ao enviar o formulário
            className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
        >
            <input
                type="text"
                placeholder="Digite o nome do jogo..." // Texto de dica dentro do campo
                value={input} // Define o valor do campo como o estado input
                onChange={(event) => setInput(event.target.value)} // Atualiza o estado ao digitar no campo
                className="bg-slate-200 outline-none w-11/12"
            />
            <button type="submit"> {/* Botão para enviar a pesquisa */}
                <FiSearch size={24} color="#ea580c" className="cursor-pointer" /> {/* Ícone de pesquisa */}
            </button>
        </form>
    );
}
