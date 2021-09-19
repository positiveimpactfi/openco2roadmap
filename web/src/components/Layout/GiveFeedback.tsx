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
      <div className="fixed right-8 bottom-8 w-10 h-10 border border-gray-600 px-2 py-2 hover:text-white hover:bg-teal-500 rounded-md">
        <span className="sr-only">Avaa anna palautetta lomake</span>
        <button onClick={() => setModalOpen(true)} className="w-full h-full">
          <ReplyIcon />
        </button>
      </div>
    </>
  );
};

export default GiveFeedback;
