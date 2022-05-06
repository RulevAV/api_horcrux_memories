import { breckTestApi, getAskApi } from "../endpoints/test";
import { refresh } from "../refresh";

export const getAskData = async (IdRoot: string, type: string) => {
  const _getAskApi = async () => {
    return await getAskApi(IdRoot, type);
  }
  return refresh(_getAskApi);
}

export const breckTestData = async (IdRoot: string, type: string) => {
  const _breckTestApi = async () => {
    return await breckTestApi(IdRoot, type);
  }
  return refresh(_breckTestApi);
}
