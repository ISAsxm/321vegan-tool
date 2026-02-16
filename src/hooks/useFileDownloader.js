import { useState, useCallback } from "react";

import { API_URL } from "@/utils/constants";
import axiosInstance from "@/services/axiosInstance";

export function useFileDownloader() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  const downloadFile = useCallback((endpoint, ext) => {
    const handleDownload = async () => {
      try {
        setIsDownloading(true);
        const res = await axiosInstance.get(
          `${API_URL}/export/${endpoint}/${ext}`,
          {
            responseType: "blob",
          },
        );
        const blob = await res.data;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${endpoint}.${ext}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error(error);
        setError(
          "Une erreur est survenue. Veuillez réessayer utlérieurement ou contacter le support si le problème persiste",
        );
      } finally {
        setIsDownloading(false);
      }
    };
    handleDownload();
  }, []);

  return { isDownloading, error, downloadFile };
}
