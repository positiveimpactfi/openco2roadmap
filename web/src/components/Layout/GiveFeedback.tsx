import { ReplyIcon } from "@heroicons/react/outline";
import FeedbackForm from "components/Forms/FeedbackForm";
import Modal from "components/Modal";
import Notification from "components/Notification";
import { useState } from "react";

const GiveFeedback = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen} title="Anna palautetta">
        <FeedbackForm
          setShowNotification={setShowNotification}
          setShowModal={setModalOpen}
        />
      </Modal>
      <Notification
        title="Kiitos palautteestasi"
        description="Olemme vastaanottaneet palautteesi"
        show={showNotification}
        setShow={setShowNotification}
      />
      <div className="fixed right-8 bottom-8 w-10 h-10 border border-gray-600 px-2 py-2 hover:text-white hover:bg-teal-500 rounded-md bg-white group">
        <span className="sr-only">Avaa anna palautetta lomake</span>
        <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-3/4 ml-5 mb-2 px-3 pointer-events-none">
          Anna palautetta
          <svg
            className="absolute text-black h-2 w-full left-0 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
        <button onClick={() => setModalOpen(true)} className="w-full h-full">
          <ReplyIcon />
        </button>
      </div>
    </>
  );
};

export default GiveFeedback;
