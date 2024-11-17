import { BookOpen, Users, Zap } from 'lucide-react';
import HomeSection from '../commons/HomeSection';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function About() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Sobre nós
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Somos uma equipe dedicada a revolucionar a forma como as pessoas
              interagem com a tecnologia. Nossa missão é criar soluções
              intuitivas e poderosas que façam a diferença na vida das pessoas.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Zap className="h-8 w-8" />
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We're constantly pushing the boundaries of what's possible,
                developing cutting-edge solutions for tomorrow's challenges.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Users className="h-8 w-8" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our vibrant community of users and developers is at the heart of
                everything we do, driving our growth and success.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <BookOpen className="h-8 w-8" />
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We believe in empowering our users through education, providing
                resources and support to help them succeed.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-8">
          <Button size="lg">Learn More About Us</Button>
        </div>
      </div>
    </section>
  );

  return (
    <HomeSection sectionClassName="bg-gray-50 mt-[0.75rem]" id="about">
      <div className="flex flex-col gap-8 px-4">
        <h2 className="font-bold text-4xl text-center ">Sobre nós</h2>
        <div>
          <p>
            Projeto desenvolvido por alunos do Instituto Federal do Triângulo
            Mineiro, durante a disciplina de Laboratório de Engenharia de
            Software e com a supervisão de Prof. Mauro Borges.
          </p>
          <p>
            O software “Busca Pet” consiste em uma ferramenta para encontrar
            animais perdidos, além de ser também uma plataforma que possibilita
            a divulgação de animais para adoção.
          </p>
        </div>
      </div>
    </HomeSection>
  );
}
