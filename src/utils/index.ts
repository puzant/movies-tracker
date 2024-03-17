export const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const getMovieLanguage = (lang: string | undefined) => {
  switch (lang) {
    case "en":
      return "English";
    case "fr":
      return "French";
  }
};
