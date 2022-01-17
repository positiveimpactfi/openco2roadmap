interface AnnouncementLocalization {
  description: {
    html: string;
  };
  title: string;
  locale: "en" | "fi";
}

export interface Announcement {
  stage: "PUBLISHED" | "DRAFT";
  id: string;
  publishedAt: string;
  updatedAt: string;
  createdBy: {
    name: string;
    picture: string;
  };
  localizations: AnnouncementLocalization[];
}
