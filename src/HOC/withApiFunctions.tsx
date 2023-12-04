import apiFunctions from "@/apiManager";

const withApiFunctions = (WrappedComponent) => {
  const WithApiFunctions = (props) => {
    return <WrappedComponent {...props} apiFunctions={apiFunctions} />;
  };

  return WithApiFunctions;
};

export default withApiFunctions;
