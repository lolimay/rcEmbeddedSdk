import { randomString } from "../utils";
import { ID_LENGTH } from "../constants";

let listener;
const callbacks = {};

const initListener = () => {
  if (!listener) {
    listener = ({ data: { res, id } }) => {
      if (id in callbacks) {
        callbacks[id](res);
        delete callbacks[id];
      }
    };
  }
  window.addEventListener("message", listener);
};

const call = (action, payload) =>
  new Promise(resolve => {
    const id = randomString(ID_LENGTH);
    initListener();
    window.parent.postMessage({ action, payload, id });
    callbacks[id] = resolve;
  });

export const getUserInfo = appName => call("getUserInfo", { appName });
