import { useEffect } from "react";

const useDocTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - SoundTech`;
    } else {
      document.title = "SoundTech | The Perfect Audio Store";
    }
  }, [title]);

  return null;
};

export default useDocTitle;
