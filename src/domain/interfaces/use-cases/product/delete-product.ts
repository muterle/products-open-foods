export interface IDeleteProductUseCase {
  execute(code: string): Promise<boolean>;
}
