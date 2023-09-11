import {
  ShieldCheckIcon,
  LockClosedIcon,
  ArrowPathIcon,
  FingerPrintIcon
} from '@heroicons/react/20/solid';

const features = [
  {
    name: 'Criptografia de Dados',
    description:
      'Aplicamos tecnologias de criptografia de ponta para garantir que todas as suas informações permaneçam totalmente protegidas',
    icon: LockClosedIcon
  },
  {
    name: 'Recuperação de Senha',
    description:
      'O processo foi projetado para ser simples e seguro, assegurando que apenas o proprietário da conta possa redefinir com sucesso.',
    icon: ShieldCheckIcon
  },
  {
    name: 'Rotas Protegidas',
    description:
      'Nossas rotas protegidas garantem que apenas usuários autorizados tenham acesso, reforçando a segurança e a privacidade.',
    icon: ArrowPathIcon
  },
  {
    name: 'Monitoramento de Atividades Suspeitas',
    description:
      'Nossa monitorização ativa identifica atividades suspeitas, assegurando a proteção das suas ações e informações em cada etapa.',
    icon: FingerPrintIcon
  }
];

export default function Feature() {
  return (
    <div
      id="feature"
      className="w-full flex flex-col justify-center items-center p-5 mb-40"
    >
      <div className="max-w-2xl lg:text-center">
        <h2 className="font-semibold font-inter text-primary">Segurança</h2>
        <p className="mt-2 text-3xl font-bold font-poppins sm:text-4xl">
          Sua segurança é nossa prioridade
        </p>
        <p className="mt-6 text-lg font-inter">
          Saiba como implementamos medidas de segurança rigorosas para garantir
          que seus dados pessoais estejam sempre protegidas enquanto você
          utiliza nosso serviço.
        </p>
      </div>
      <div className="mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16 font-inter">
              <dt className="font-semibold">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 leading-7">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
