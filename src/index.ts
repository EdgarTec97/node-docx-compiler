import { DOCXSerializer } from "./infraestructure/doc.serializer";
import { GlobalParams } from "@/domain/global.types";
import { resolve, dirname } from "path";

(() => {
  const publicPath: string = resolve(dirname("") + "/public");
  const params: GlobalParams = {
    inputPath: `${publicPath}/file.docx`,
    metadata: {
      name: "Soporte",
    },
    outputPath: `${publicPath}/compiled.docx`,
  };

  const instance = DOCXSerializer.getInstance(params);

  instance.render();
})();
