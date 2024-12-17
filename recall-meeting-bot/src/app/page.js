"use client"

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [meetingURL, setMeetingURL] = useState("");
  const [botId, setBotId] = useState("")

  const launchBot = async (meetingURL) => {

    const headers = {
      Authorization: `Token ${process.env.RECALL_API_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    }

    const body = {
      meeting_url: meetingURL,
      bot_name: "Svix Meeting Bot",
      transcription_options: {
        provider: "meeting_captions"
      }
    }

    try {
      const response = await axios.post("../../api/create-meeting", body, {headers: headers})

      setBotId(response.data.id)

    } catch (error) {
      console.error("Error calling API route:", error);
    }
  }
  

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <h2>Meeting URL</h2>
          <input
            type="text"
            value={meetingURL}
            onChange={(e) => setMeetingURL(e.target.value)}
            placeholder="Enter meeting URL"
          />
          <button onClick={() => launchBot(meetingURL)}>Launch Meeting Bot</button>
        </div>
      </main>
    </div>
  )
};