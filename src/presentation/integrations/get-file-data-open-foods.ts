import axios from "axios";
const zlib = require("zlib");
import { IGetFileDataOpenFoods } from "../../domain/interfaces/integrations/get-file-data-open-foods";

export class GetFileDataOpenFoods implements IGetFileDataOpenFoods {
  async execute(file: string): Promise<any[]> {
    const output = await axios
      .get(`${process.env.OPEN_FOODS_URL}/${file}`, {
        responseType: "arraybuffer",
        decompress: true,
      })
      .then((response) => {
        const { data } = response;
        const output = zlib.gunzipSync(data);
        return output;
      });

    const items = output.toString("utf8", 0, output.length / 7).split("\n");

    return items;
  }
}
