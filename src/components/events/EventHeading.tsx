import React from "react";

const eventText = [
  {
    id: 1,
    tag: "h3",
    title: "We are professional Expert in Immigration Visa",
  },
  { id: 2, tag: "h2", title: "Upcoming Events" },
];

const Heading = () => {
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
