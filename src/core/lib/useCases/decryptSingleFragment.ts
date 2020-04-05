import { IDecryptor } from "../services/Decryptor";
import { ILoader } from "../services/Loader";
import { Key } from "../entities/key";

export const decryptSingleFragmentFactory = (loader: ILoader, decryptor: IDecryptor) => {
  const run = async (key: Key, data: ArrayBuffer): Promise<ArrayBuffer> => {
    if (!key.uri || !key.iv) {
      return data;
    }
    const keyArrayBuffer = await loader.fetchArrayBuffer(key.uri);
    const decryptedData = decryptor.decrypt(data, keyArrayBuffer, key.iv);
    return decryptedData;
  };
  return run;
};
