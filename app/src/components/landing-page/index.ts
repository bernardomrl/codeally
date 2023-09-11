export { default as Header } from '@/components/landing-page/Header';
export { default as Hero } from '@/components/landing-page/Hero';
export { default as Feature } from '@/components/landing-page/Feature';
export { default as Pricing } from '@/components/landing-page/Pricing';
export { default as Footer } from '@/components/landing-page/Footer';

import {
  InformationCircleIcon,
  ShieldCheckIcon,
  RectangleStackIcon,
  UserIcon,
  UserPlusIcon
} from '@heroicons/react/20/solid';

export const navigation = [
  { name: 'Início', anchor: '#about', icon: InformationCircleIcon },
  { name: 'Segurança', anchor: '#feature', icon: ShieldCheckIcon },
  { name: 'Planos', anchor: '#pricing', icon: RectangleStackIcon },
  { name: 'Login', anchor: '/auth/signin', icon: UserIcon },
  { name: 'Cadastro', anchor: '/auth/signup', icon: UserPlusIcon }
];
