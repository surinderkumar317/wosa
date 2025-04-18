import React from "react";

// Define valid HTML tags
type HTMLTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface EventText {
  id: number;
  tag: HTMLTags; // Restrict tag to valid HTML tags
  title: string;
}

const eventText: EventText[] = [
  {
    id: 1,
    tag: "h3",
    title: "We are professional Expert in Immigration Visa",
  },
  { id: 2, tag: "h2", title: "Upcoming Events" },
];

const Heading: React.FC = () => {
  return (
    <div className="event-content">
      {eventText.map((content) => {
        return React.createElement(
          content.tag,
          { key: content.id },
          content.title
        );
      })}
    </div>
  );
};

export default Heading;
