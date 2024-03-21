import errorIllustration from "@/assets/error-illustration.svg";

export const ErrorMessage = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-8 py-12">
      <img src={errorIllustration} />
      <p className="text-3xl text-gray-500">There was an error</p>
    </div>
  );
};
