import { accessProvider } from './access/access.provider';
import { userProvider } from './user/user.provider';

export const Providers = [...accessProvider, ...userProvider];
