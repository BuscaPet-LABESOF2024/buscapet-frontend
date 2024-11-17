import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HomeSection from '../commons/HomeSection';

function ProcessSteps({
  steps,
}: {
  steps: { number: number; title: string; description: string }[];
}) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      <div className="space-y-8">
        {steps.slice(0, 2).map((step) => (
          <div key={step.number} className="relative">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6EDF3] text-lg font-semibold text-[#0B4F82]">
                {step.number}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-8">
        {steps.slice(2, 4).map((step) => (
          <div key={step.number} className="relative">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6EDF3] text-lg font-semibold text-[#0B4F82]">
                {step.number}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdoptionProcess() {
  const adoptionSteps = [
    {
      number: 1,
      title: 'Encontre um pet',
      description:
        'Navegue pelos animais disponíveis para adoção em nosso site.',
    },
    {
      number: 2,
      title: 'Preencha o formulário',
      description: 'Complete o formulário de adoção com suas informações.',
    },
    {
      number: 3,
      title: 'Conheça o pet',
      description: 'Agende uma visita para conhecer o animal pessoalmente.',
    },
    {
      number: 4,
      title: 'Finalize a adoção',
      description:
        'Complete o processo de adoção e leve seu novo amigo para casa.',
    },
  ];

  const lostPetSteps = [
    {
      number: 1,
      title: 'Cadastre-se',
      description: 'Crie uma conta em nosso site se ainda não tiver uma.',
    },
    {
      number: 2,
      title: 'Registre o pet perdido',
      description:
        'Preencha o formulário com informações detalhadas sobre seu pet.',
    },
    {
      number: 3,
      title: 'Adicione fotos',
      description: 'Faça upload de fotos recentes do seu animal de estimação.',
    },
    {
      number: 4,
      title: 'Compartilhe',
      description:
        'Compartilhe o anúncio nas redes sociais para aumentar a visibilidade.',
    },
  ];

  const foundPetSteps = [
    {
      number: 1,
      title: 'Registre-se',
      description: 'Crie uma conta em nosso site se ainda não tiver uma.',
    },
    {
      number: 2,
      title: 'Informe os detalhes',
      description:
        'Preencha o formulário com informações sobre o animal encontrado.',
    },
    {
      number: 3,
      title: 'Adicione fotos',
      description:
        'Faça upload de fotos do animal para ajudar na identificação.',
    },
    {
      number: 4,
      title: 'Aguarde contato',
      description:
        'Fique atento a possíveis contatos de tutores procurando seus pets.',
    },
  ];

  return (
    <HomeSection id='register-process' sectionClassName='bg-gray-100'>
      <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-4xl text-center mb-8">
          Processos de Cadastro de Animais
        </h2>
        <Tabs defaultValue="adoption" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-full bg-[#E6EDF3] p-1">
            <TabsTrigger
              value="adoption"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0B4F82] data-[state=active]:shadow"
            >
              Adoção
            </TabsTrigger>
            <TabsTrigger
              value="lost"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0B4F82] data-[state=active]:shadow"
            >
              Animal Perdido
            </TabsTrigger>
            <TabsTrigger
              value="found"
              className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0B4F82] data-[state=active]:shadow"
            >
              Animal Encontrado
            </TabsTrigger>
          </TabsList>
          <TabsContent value="adoption">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Processo de Adoção
            </h3>
            <ProcessSteps steps={adoptionSteps} />
          </TabsContent>
          <TabsContent value="lost">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Cadastro de Animal Desaparecido
            </h3>
            <ProcessSteps steps={lostPetSteps} />
          </TabsContent>
          <TabsContent value="found">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Cadastro de Animal Encontrado
            </h3>
            <ProcessSteps steps={foundPetSteps} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
    </HomeSection>
  );
}
