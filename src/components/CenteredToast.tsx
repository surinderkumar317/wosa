import { Toaster, toast } from "sonner";

export default function CenteredToast() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <button
        onClick={() => toast("This is a centered toast!")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Show Toast
      </button>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "text-center",
        }}
      />
    </div>
  );
}
