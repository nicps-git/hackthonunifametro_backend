import { HasherGateway } from '@/application/gateways/hasher.gatway';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHasherRepository implements HasherGateway {
  async hash(plain: string): Promise<string> {
    const salt = bcrypt.genSaltSync();

    const hash = bcrypt.hashSync(plain, salt);

    return hash;
  }

  async compare(plan: string, hash: string): Promise<boolean> {
    const isMatch = bcrypt.compareSync(plan, hash);

    return isMatch;
  }
}
