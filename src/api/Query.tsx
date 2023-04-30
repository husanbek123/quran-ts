import axios from "axios";

import { useQuery } from "@tanstack/react-query";

function GetData1(key: string[], api: string) {
  let data = useQuery(
    key,
    async () => {
      let res = await axios.get(api);
      return res.data;
    },
    {
      cacheTime: Infinity,
    }
  );
  return data;
}

function GetData2(key: [], api: string) {
  let data = useQuery(key, async () => {
    let res = await axios.get(api);
    return res;
  });
  return data;
}

export default GetData1;
export { GetData2 };
