import { ReplyIcon } from "@heroicons/react/outline";
import FeedbackForm from "components/Forms/FeedbackForm";
import Modal from "components/Modal";
import { useState } from "react";

const GiveFeedback = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} setOpen={setOpen} title="Anna palautetta">
        <FeedbackForm />
      </Modal>
      <div className="fixed right-8 bottom-8 w-10 h-10 border border-gray-600 px-2 py-2 hover:text-white hover:bg-teal-500 rounded-md">
        <span onClick={() => setOpen(true)}>
          <ReplyIcon />
        </span>
      </div>
    </>
  );
};

export default GiveFeedback;
