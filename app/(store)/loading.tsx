import { LucideLoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <LucideLoaderCircle className="animate-spin mx-auto mt-20 w-20 h-20 text-blue-400" />
    </div>
  );
};

export default Loading;
