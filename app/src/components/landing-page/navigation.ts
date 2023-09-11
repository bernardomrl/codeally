import {
  InformationCircleIcon,
  ShieldCheckIcon,
  RectangleStackIcon,
  UserIcon,
  UserPlusIcon
} from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Início', anchor: '#about', icon: InformationCircleIcon },
  { name: 'Segurança', anchor: '#feature', icon: ShieldCheckIcon },
  { name: 'Planos', anchor: '#pricing', icon: RectangleStackIcon },
  { name: 'Login', anchor: '/auth/signin', icon: UserIcon },
  { name: 'Cadastro', anchor: '/auth/signup', icon: UserPlusIcon }
];

export default navigation;
