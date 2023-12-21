import {error} from '../AppMessages';

export const onFinishFailed = (errorInfo) => {
  errorInfo.errorFields.map((p) => error(p.errors[0]));
};
