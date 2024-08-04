export class Role {
  public readonly id: string;
  public name: string;
  public description: string | null = null;
  public permissions: string[] = [];
}
