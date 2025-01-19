import axios from "axios";
import { IGetFilesOpenFoods } from "../../domain/interfaces/integrations/get-files-open-foods";

export class GetFilesOpenFoods implements IGetFilesOpenFoods {
  async execute(): Promise<string[]> {
    const files = await axios.get(`${process.env.OPEN_FOODS_URL}/index.txt`).then((response) => {
      const files = response.data.split("\n");
      return files as string[];
    });

    return files.filter((f) => f !== "");
  }
}
