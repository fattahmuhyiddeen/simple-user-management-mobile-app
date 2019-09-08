import endpoints from 'config/endpoints';
import { getStore } from 'root-of-redux/store';

export default class RestAPI {
  static call = async ({
    endpoint,
    data = null,
    onSuccess = () => null,
    onFail = () => null,
  }) => {
    const xhr = new XMLHttpRequest();
    xhr.open(endpoint[0], endpoints.base_api + endpoint[1]);
    const requestHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const { token } = getStore().getState().persist.account;

    if (token) {
      requestHeaders['Authorization'] = 'Bearer ' + token;
    }

    for (let header in requestHeaders) {
      xhr.setRequestHeader(header, requestHeaders[header]);
    }

    xhr.onload = ({ target }) => {
      if (target.status > 299 || target.status < 200) {
        onFail(target);
        return;
      }
      onSuccess(JSON.parse(target.responseText));
    };

    xhr.onerror = onFail;
    !!data ? xhr.send(JSON.stringify(data)) : xhr.send();
  };
}
