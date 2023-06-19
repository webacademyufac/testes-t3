import CitacaoEntity from "../../entities/CitacaoEntity";
import CitacaoInterface from "../entities/CitacaoInterface";

export interface CitacaoRepositoryInterface {
  findAll(titulo: string): Promise<CitacaoEntity[]>;
  findById(id: number): Promise<CitacaoEntity>;
  create(citacao: CitacaoInterface): Promise<CitacaoEntity>;
  update(id: number, citacao: CitacaoInterface): Promise<CitacaoEntity>;
  delete(id: number): Promise<void>;
  getCitacaoOnly(id: number): Promise<CitacaoEntity>
}