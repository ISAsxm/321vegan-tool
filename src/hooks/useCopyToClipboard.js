import { useState, useCallback } from "react";

export function useCopyToClipboard() {
  const [isCopying, setIsCopying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const copyToClipboard = useCallback((value) => {
    const handleCopy = async () => {
      try {
        setIsCopying(true);
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          throw new Error("writeText not supported");
        }
        setIsCopied(true);
      } catch (error) {
        console.error(error);
        setError("Impossible de copier le texte dans votre presse-papier");
      } finally {
        setText(value);
        setTimeout(() => setIsCopying(false), 2000);
      }
    };
    handleCopy();
  }, []);

  return { isCopying, isCopied, error, text, copyToClipboard };
}
