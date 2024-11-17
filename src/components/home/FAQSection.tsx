import HomeSection from '../commons/HomeSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: 'Como posso divulgar um animal para adoção?',
      answer:
        'Para divulgar um animal para adoção, você precisa criar uma conta no "Busca Pet". Após o cadastro, acesse sua conta e clique na opção "Cadastrar Anúncio". Preencha as informações sobre o animal, como idade, raça, porte, e adicione fotos. Assim que a publicação for aprovada, o animal será exibido na plataforma para que outros usuários possam encontrá-lo.',
    },
    {
      question:
        'Perdi meu animal de estimação. Como posso utilizar o site para tentar encontrá-lo?',
      answer:
        'Primeiro, registre-se no "Busca Pet" e acesse sua conta. Em seguida, vá até a seção de animais perdidos e clique em "Cadastrar Animal Perdido". Insira informações detalhadas sobre seu animal, como nome, raça, características físicas, última localização e fotos. Sua publicação será exibida na seção de animais perdidos para que outras pessoas possam ajudar na busca.',
    },
    {
      question:
        'Como posso ajudar a encontrar animais perdidos na minha região?',
      answer:
        'No "Busca Pet", você pode acessar a seção de animais perdidos e filtrar por localização para ver pets desaparecidos próximos de você. Caso encontre um animal com características semelhantes ao que está sendo procurado, entre em contato com o responsável pela publicação ou informe a localização onde avistou o animal.',
    },
    {
      question:
        'Existe alguma taxa para divulgar um animal perdido ou para adoção no site?',
      answer:
        'Não, o "Busca Pet" é uma plataforma gratuita para todos os usuários. Você pode divulgar tanto animais para adoção quanto animais perdidos sem nenhum custo. Nosso objetivo é facilitar a conexão entre quem deseja adotar, quem procura por pets perdidos, e aqueles que querem ajudar.',
    },
  ];

  return (
    <HomeSection id='faq' divClassName='w-full' sectionClassName='bg-gray-100'>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-bold text-4xl ">Perguntas Frequentes</h2>
          <p className="mt-4 text-lg text-gray-600">
            Encontre respostas para as dúvidas mais comuns sobre nossa
            plataforma.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-200 py-2"
            >
              <AccordionTrigger className="flex w-full items-center justify-between text-left text-lg font-medium text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-2 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </HomeSection>
  );
}
