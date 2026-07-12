"use client";

import { FormEvent, useMemo, useState } from "react";

type Reservation = {
  id: number;
  name: string;
  time: string;
  party: number;
  source: "Phone" | "Chat" | "Walk-in";
  status: "Confirmed" | "Pending";
};

const initialReservations: Reservation[] = [
  { id: 1, name: "Maya Johnson", time: "6:30 PM", party: 4, source: "Phone", status: "Confirmed" },
  { id: 2, name: "Derek Cole", time: "7:00 PM", party: 2, source: "Chat", status: "Confirmed" },
  { id: 3, name: "The Bennett Family", time: "7:30 PM", party: 6, source: "Phone", status: "Pending" },
  { id: 4, name: "Rosa Martinez", time: "8:15 PM", party: 3, source: "Walk-in", status: "Confirmed" },
];

const activity = [
  ["12:42 PM", "Harbor answered a gluten-free menu question", "Chat"],
  ["12:31 PM", "Reservation booked for four guests", "Phone"],
  ["12:18 PM", "Catering inquiry captured for Saturday", "Lead"],
  ["11:56 AM", "Directions and parking information sent", "SMS"],
];

export default function Home() {
  const [reservations, setReservations] = useState(initialReservations);
  const [restaurantOpen, setRestaurantOpen] = useState(true);
  const [aiOnline, setAiOnline] = useState(true);
  const [notice, setNotice] = useState("Reception desk operating normally");

  const confirmedGuests = useMemo(
    () => reservations.filter((item) => item.status === "Confirmed").reduce((sum, item) => sum + item.party, 0),
    [reservations],
  );

  function addReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "Guest");
    const time = String(form.get("time") || "7:00 PM");
    const party = Number(form.get("party") || 2);

    setReservations((current) => [
      ...current,
      { id: Date.now(), name, time, party, source: "Walk-in", status: "Confirmed" },
    ]);
    setNotice(`${name}'s reservation is confirmed for ${time}`);
    event.currentTarget.reset();
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">H</div>
          <div>
            <strong>Harbor</strong>
            <span>Reception Desk</span>
          </div>
        </div>

        <nav>
          {[
            ["⌂", "Overview"],
            ["☎", "Calls"],
            ["◫", "Reservations"],
            ["✦", "AI Host"],
            ["☰", "Menu Knowledge"],
            ["◎", "Customers"],
          ].map(([icon, label], index) => (
            <button className={index === 0 ? "navItem active" : "navItem"} key={label}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </nav>

        <div className="restaurantCard">
          <small>ACTIVE RESTAURANT</small>
          <strong>Harbor Table Demo</strong>
          <span>Atlanta, Georgia</span>
          <button onClick={() => setRestaurantOpen((value) => !value)}>
            <i className={restaurantOpen ? "dot open" : "dot"} />
            {restaurantOpen ? "Open now" : "Closed"}
          </button>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p>Sunday operations</p>
            <h1>Good evening, William</h1>
          </div>
          <div className="topActions">
            <button className="statusButton" onClick={() => setAiOnline((value) => !value)}>
              <i className={aiOnline ? "dot open pulse" : "dot"} />
              AI Host {aiOnline ? "Online" : "Paused"}
            </button>
            <button className="avatar">WP</button>
          </div>
        </header>

        <div className="notice">✦ {notice}</div>

        <section className="statsGrid">
          {[
            ["Calls answered", "24", "+18%", "☎"],
            ["Reservations", String(reservations.length), "+3 today", "◫"],
            ["Guests confirmed", String(confirmedGuests), "Tonight", "♟"],
            ["Leads captured", "6", "$1,240 est.", "◇"],
          ].map(([label, value, detail, icon]) => (
            <article className="statCard" key={label}>
              <div className="statIcon">{icon}</div>
              <p>{label}</p>
              <div><strong>{value}</strong><span>{detail}</span></div>
            </article>
          ))}
        </section>

        <section className="mainGrid">
          <article className="panel reservationsPanel">
            <div className="panelHeader">
              <div><p>TONIGHT</p><h2>Reservation board</h2></div>
              <button>View calendar</button>
            </div>
            <div className="reservationList">
              {reservations.map((reservation) => (
                <div className="reservationRow" key={reservation.id}>
                  <div className="timeBadge">{reservation.time}</div>
                  <div className="guestInfo">
                    <strong>{reservation.name}</strong>
                    <span>Party of {reservation.party} · {reservation.source}</span>
                  </div>
                  <span className={reservation.status === "Confirmed" ? "pill confirmed" : "pill pending"}>
                    {reservation.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel aiPanel">
            <div className="aiOrb"><span>✦</span></div>
            <p>HARBOR AI HOST</p>
            <h2>{aiOnline ? "Listening for guests" : "Host is paused"}</h2>
            <span className="muted">Answers calls, menu questions, reservations, directions, and catering inquiries.</span>
            <div className="aiMetrics">
              <div><strong>96%</strong><span>Resolved</span></div>
              <div><strong>0:18</strong><span>Avg. call</span></div>
              <div><strong>4.9</strong><span>Guest rating</span></div>
            </div>
            <button className="primary" onClick={() => setNotice("Opening a simulated live call workspace")}>Open live console</button>
          </article>
        </section>

        <section className="lowerGrid">
          <article className="panel activityPanel">
            <div className="panelHeader"><div><p>LIVE</p><h2>Recent activity</h2></div><button>See all</button></div>
            {activity.map(([time, text, type]) => (
              <div className="activityRow" key={time}>
                <span>{time}</span><p>{text}</p><b>{type}</b>
              </div>
            ))}
          </article>

          <article className="panel quickAdd">
            <div className="panelHeader"><div><p>FRONT DESK</p><h2>Add reservation</h2></div></div>
            <form onSubmit={addReservation}>
              <label>Guest name<input name="name" placeholder="Guest or family name" required /></label>
              <div className="formRow">
                <label>Time<input name="time" type="time" required /></label>
                <label>Party<input name="party" type="number" min="1" max="30" defaultValue="2" required /></label>
              </div>
              <button className="primary" type="submit">Confirm reservation</button>
            </form>
          </article>
        </section>
      </section>
    </main>
  );
}
