import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed top-24 left-2 z-50">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 
          hover:text-red-800 rounded-lg shadow-lg hover:shadow-xl 
          transition-all duration-200 border border-gray-200
          hover:border-blue-100"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">العودة</span>
      </button>
    </div>
  );
};

export default BackButton;
