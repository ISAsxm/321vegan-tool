import toast from "react-hot-toast";

import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import SpinnerMini from "@/ui/SpinnerMini";

import { HiOutlineCircleStack } from "react-icons/hi2";
import { useFileDownloader } from "@/hooks/useFileDownloader";

function ExportAction({
  filename = "products",
  ext = "sqlite",
  variante = "btn",
}) {
  const { isDownloading, error, downloadFile } = useFileDownloader();

  if (error) toast.error(error);

  if (variante === "btn") {
    return (
      <Button
        disabled={isDownloading}
        onClick={() => downloadFile(filename, ext)}
      >
        {isDownloading ? <SpinnerMini /> : <HiOutlineCircleStack />}
        Exporter
      </Button>
    );
  }

  return (
    <ButtonIcon
      disabled={isDownloading}
      onClick={() => downloadFile(filename, ext)}
    >
      {isDownloading ? <SpinnerMini /> : <HiOutlineCircleStack />}
    </ButtonIcon>
  );
}

export default ExportAction;
