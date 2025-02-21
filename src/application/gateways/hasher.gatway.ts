export abstract class HasherGateway {
  abstract hash(plain: string): Promise<string>;

  abstract compare(plan: string, hash: string): Promise<boolean>;
}
