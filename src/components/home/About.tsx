import { Heart, Search, Home, GraduationCap, Users } from 'lucide-react';
import HomeSection from '../commons/HomeSection';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function About() {
  return (
    <HomeSection
      id="about"
      divClassName="py-16 bg-gradient-to-b from-white to-gray-100"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              Sobre o Projeto
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Desenvolvido no Instituto Federal do Triângulo Mineiro (IFTM) como
              parte da disciplina de Laboratório de Engenharia de Software,
              ministrada pelo Professor Mauro Borges.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center gap-4 text-center">
              <Heart className="h-12 w-12 text-red-500" />
              <CardTitle className="text-xl font-semibold">Adoção</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Facilitamos o processo de adoção de animais, conectando pessoas
                dispostas a oferecer um lar amoroso com animais que precisam de
                uma família.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center gap-4 text-center">
              <Search className="h-12 w-12 text-blue-500" />
              <CardTitle className="text-xl font-semibold">Busca</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Nossa plataforma ajuda a localizar animais desaparecidos,
                aumentando as chances de reencontro entre pets e seus donos.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center gap-4 text-center">
              <Home className="h-12 w-12 text-green-500" />
              <CardTitle className="text-xl font-semibold">Abrigo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Disponibilizamos uma plataforma web para o registro de animais
                encontrados, facilitando a divulgação e aumentando as chances de
                localização pelos seus tutores.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl text-primary">
            Nosso Time
          </h3>
          <p className="max-w-[700px] text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed dark:text-gray-400">
            Um grupo de quatro estudantes apaixonados por tecnologia e bem-estar
            animal, trabalhando juntos para fazer a diferença.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl items-center gap-6 py-12 md:grid-cols-2 md:gap-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <GraduationCap className="h-8 w-8 text-purple-500" />
              <CardTitle>Projeto Acadêmico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Desenvolvido como parte do currículo de Engenharia de Software,
                este projeto demonstra a aplicação prática de conceitos
                aprendidos em sala de aula.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8 text-yellow-500" />
              <CardTitle>Impacto Social</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Além de um exercício acadêmico, nosso sistema visa ter um
                impacto real na comunidade, promovendo o bem-estar animal e a
                responsabilidade social.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </HomeSection>
  );
}
