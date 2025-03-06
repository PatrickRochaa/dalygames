// Definição da interface LabelProps para garantir que o parâmetro 'name' seja uma string
interface LabelProps {
  name: string; // 'name' é a string que será exibida no componente
}

// Função do componente Label, que recebe as props do tipo LabelProps
export function Label({ name }: LabelProps) {
  return (
    // O componente exibe uma div com uma série de estilos aplicados via classes do Tailwind CSS
    <div className="flex-grow sm:flex-grow-0 py-1 px-3 bg-slate-200 text-black text-center rounded-lg hover:font-bold duration-200">
      {/* Exibe o nome que é passado como prop */}
      {name}
    </div>
  );
}
