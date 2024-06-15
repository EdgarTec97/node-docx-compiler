import fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
//import Handlebars from "handlebars";
import { ISerializer } from "@/domain/serializer.interface";
import { GlobalParams } from "@/domain/global.types";

export class DOCXSerializer implements ISerializer<Docxtemplater> {
  private static instance?: DOCXSerializer;
  private zipService: PizZip;
  private template: Docxtemplater;

  private constructor(
    private params: GlobalParams,
    private logger: Console = console
  ) {
    const content = fs.readFileSync(params.inputPath, "binary");

    this.zipService = new PizZip(content);
    this.template = new Docxtemplater(this.zipService, {
      paragraphLoop: true,
      linebreaks: true,
    });
  }

  static getInstance(params: GlobalParams): ISerializer<Docxtemplater> {
    if (this.instance) return this.instance;
    this.instance = new DOCXSerializer(params);
    return this.instance;
  }

  public async render(): Promise<Docxtemplater> {
    this.template.render(this.params.metadata);
    const buffer = this.template.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });
    fs.writeFileSync(this.params.outputPath, buffer);
    this.logger.log("El archivo Word ha sido generado correctamente.");

    return this.template;
  }
}
