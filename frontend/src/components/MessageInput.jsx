import { useRef, useState } from "react";
import useKeyboardSound from "../hook/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="
        shrink-0
        border-t
        border-slate-700/50
        bg-slate-900/90
        backdrop-blur-sm
        p-3
        md:p-4
      "
    >
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />

            <button
              onClick={removeImage}
              type="button"
              className="
                absolute
                -top-2
                -right-2
                w-6
                h-6
                rounded-full
                bg-slate-800
                flex
                items-center
                justify-center
                text-slate-200
                hover:bg-slate-700
              "
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="
          max-w-3xl
          mx-auto
          w-full
          flex
          items-center
          gap-2
          md:gap-4
        "
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);

            if (isSoundEnabled) {
              playRandomKeyStrokeSound();
            }
          }}
          placeholder="Type your message..."
          className="
            flex-1
            min-w-0
            bg-slate-800/50
            border
            border-slate-700/50
            rounded-lg
            py-2
            px-3
            md:px-4
            outline-none
            focus:border-cyan-500
          "
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`
            shrink-0
            rounded-lg
            p-2
            bg-slate-800/50
            transition-colors
            ${
              imagePreview
                ? "text-cyan-500"
                : "text-slate-400 hover:text-slate-200"
            }
          `}
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="
            shrink-0
            rounded-lg
            p-2
            md:px-4
            md:py-2
            bg-gradient-to-r
            from-cyan-500
            to-cyan-600
            text-white
            hover:from-cyan-600
            hover:to-cyan-700
            transition-all
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;