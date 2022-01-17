import SingleAnnouncement from "./SingleAnnouncement";

const Announcements = () => {
  const announcements = JSON.parse(localStorage.getItem("announcements"));
  return (
    <div className="flex flex-col gap-y-4">
      {announcements.map((a) => (
        <SingleAnnouncement announcement={a} key={a.id} />
      ))}
    </div>
  );
};

export default Announcements;
