import HomeSection from '../commons/HomeSection';

export default function About() {
  return (
    <HomeSection sectionClassName="bg-gray-50 mt-[0.75rem]" id="about">
      <>
        <h2 className="font-bold text-4xl">Sobre nós</h2>
        <p>
          Projeto desenvolvido por alunos do Instituto Federal do Triângulo
          Mineiro, durante a disciplina de Laboratório de Engenharia de Software
          e com a supervisão de Prof. Mauro Borges.
        </p>
        <p>
          O software “Busca Pet” consiste em uma ferramenta para encontrar
          animais perdidos, além de ser também uma plataforma que possibilita a
          divulgação de animais para adoção.
        </p>
      </>
    </HomeSection>
  );
}
