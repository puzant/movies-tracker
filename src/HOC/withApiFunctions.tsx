import { ComponentType } from "react";
import apiFunctions from "@/apiManager";
import { IApiFunction } from "@/interfaces";

interface IComponentProps {
  apiFunctions: IApiFunction;
}

const withApiFunctions = (WrappedComponent: ComponentType<IComponentProps>) => {
  const WithApiFunctions = (props: IApiFunction) => {
    return <WrappedComponent {...props} apiFunctions={apiFunctions} />;
  };

  return WithApiFunctions;
};

export default withApiFunctions;
