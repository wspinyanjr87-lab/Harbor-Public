"use client";

import { FormEvent, useState } from "react";
import styles from "./profile.module.css";

export default function RestaurantProfilePage() {
  const [saved, setSaved] = useState(false);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3500);
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <a href="/" className={styles.back}>← Reception Desk</a>
          <p>AI KNOWLEDGE SETUP</p>
          <h1>Restaurant profile</h1>
          <span>Give Harbor the facts it needs to answer guests accurately.</span>
        </div>
        <div className={styles.readiness}>
          <strong>82%</strong>
          <span>Host readiness</span>
        </div>
      </header>

      {saved && <div className={styles.success}>✓ Restaurant profile saved. Harbor&apos;s knowledge is refreshed.</div>}

      <form className={styles.grid} onSubmit={saveProfile}>
        <section className={styles.card}>
          <div className={styles.cardTitle}>
            <span>01</span>
            <div><p>IDENTITY</p><h2>Restaurant details</h2></div>
          </div>
          <label>Restaurant name<input name="restaurantName" defaultValue="Harbor Table Demo" required /></label>
          <div className={styles.twoCol}>
            <label>Public phone<input name="phone" defaultValue="(770) 555-0148" required /></label>
            <label>Website<input name="website" defaultValue="harbortabledemo.com" /></label>
          </div>
          <label>Address<input name="address" defaultValue="125 Market Street, Atlanta, GA" required /></label>
          <label>Parking information<textarea name="parking" defaultValue="Free parking behind the restaurant. Overflow parking is available across Market Street." /></label>
        </section>

        <section className={styles.card}>
          <div className={styles.cardTitle}>
            <span>02</span>
            <div><p>SERVICE</p><h2>Guest options</h2></div>
          </div>
          <div className={styles.checkGrid}>
            {[
              ["reservations", "Accept reservations"],
              ["takeout", "Takeout available"],
              ["delivery", "Delivery available"],
              ["catering", "Catering inquiries"],
              ["privateDining", "Private dining"],
              ["walkins", "Walk-ins welcome"],
            ].map(([name, label]) => (
              <label className={styles.check} key={name}>
                <input type="checkbox" name={name} defaultChecked />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <label>Reservation policy<textarea name="policy" defaultValue="Reservations are held for 15 minutes. Parties larger than eight should call for assistance." /></label>
          <label>Delivery partners<input name="partners" defaultValue="DoorDash, Uber Eats" /></label>
        </section>

        <section className={styles.card}>
          <div className={styles.cardTitle}>
            <span>03</span>
            <div><p>TODAY</p><h2>Specials and announcements</h2></div>
          </div>
          <label>Featured special<input name="special" defaultValue="Sunday Family Pasta Dinner · $42" /></label>
          <label>Special description<textarea name="specialDescription" defaultValue="Feeds four and includes baked ziti, house salad, garlic bread, and four chocolate chip cookies." /></label>
          <label>Guest announcement<textarea name="announcement" defaultValue="Live acoustic music begins at 6:30 PM. Patio seating is available weather permitting." /></label>
        </section>

        <aside className={styles.preview}>
          <p>HARBOR HOST PREVIEW</p>
          <div className={styles.orb}>✦</div>
          <h2>Ready to welcome guests</h2>
          <blockquote>
            “Thanks for calling Harbor Table Demo. We&apos;re open tonight, and our Sunday Family Pasta Dinner feeds four for $42. How may I help you?”
          </blockquote>
          <ul>
            <li><span>✓</span> Hours and location loaded</li>
            <li><span>✓</span> Reservation policy loaded</li>
            <li><span>✓</span> Daily special loaded</li>
            <li><span>○</span> Full menu still needed</li>
          </ul>
          <button type="submit">Save and refresh Harbor</button>
        </aside>
      </form>
    </main>
  );
}
