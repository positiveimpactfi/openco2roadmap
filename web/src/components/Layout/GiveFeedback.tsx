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
      <div className="group fixed right-8 bottom-8 h-10 w-10 rounded-md border border-gray-600 bg-white px-2 py-2 hover:bg-teal-500 hover:text-white">
        <span className="sr-only">Avaa anna palautetta lomake</span>
        <div className="pointer-events-none absolute bottom-full -right-3/4 z-10 ml-5 mb-2 w-28 rounded-lg bg-black py-2 px-3 text-center text-xs text-white opacity-0 group-hover:opacity-100">
          Anna palautetta
          <svg
            className="absolute left-0 top-full h-2 w-full text-black"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
        <button onClick={() => setModalOpen(true)} className="h-full w-full">
          <ReplyIcon />
        </button>
      </div>
    </>
  );
};

export default GiveFeedback;
