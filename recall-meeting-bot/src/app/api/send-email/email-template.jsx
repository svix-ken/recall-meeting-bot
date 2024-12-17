import * as React from "react";

export const EmailTemplate = ({
  firstName, actionItems
}) => (
  <div>
    <h1>Hi, {firstName}!</h1>
    <p>Here are the action items from your meeting</p>
    {actionItems.forEach(item => {
        <p>Action Item: {item}</p>
    })}
  </div>
);