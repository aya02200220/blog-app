import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import styles from "./styles.module.css";

function App() {
  return (
    <main className={styles.main}>
      <header className={styles.navBar}>
        <a href="" className={styles.logo}>
          My Blog
        </a>
        <nav className={styles.nav}>
          <a href="">Login</a>
          <a href="">Resister</a>
        </nav>
      </header>
      <section className={styles.posts}>
        <div className={styles.post}>
          <img
            src="https://i.cbc.ca/1.6859913.1685488783!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/poland-south-korea-weapons.jpg"
            alt=""
          />
          <h2 className={styles.postTitle}>
            Poland is rearming itself at high speed — could Canada take a lesson
            from Warsaw?
          </h2>
          <p className={styles.postContent}>
            A wind-swept pier at a naval port in Gdynia, Poland was the scene
            last December of an extraordinary display — one that Canada's
            defence community looks upon today with envy. Lined up
            track-to-track on the pier that day, their gun barrels elevated,
            were two-dozen Thunder K9-A1 self-propelled howitzers manufactured
            in South Korea. Nearby, 10 Black Panther K2 54-tonne main battle
            tanks were parked.
          </p>
        </div>
        <div className={styles.post}>
          <img
            src="https://i.cbc.ca/1.6859913.1685488783!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/poland-south-korea-weapons.jpg"
            alt=""
          />
          <h2 className={styles.postTitle}>
            Poland is rearming itself at high speed — could Canada take a lesson
            from Warsaw?
          </h2>
          <p className={styles.postContent}>
            A wind-swept pier at a naval port in Gdynia, Poland was the scene
            last December of an extraordinary display — one that Canada's
            defence community looks upon today with envy. Lined up
            track-to-track on the pier that day, their gun barrels elevated,
            were two-dozen Thunder K9-A1 self-propelled howitzers manufactured
            in South Korea. Nearby, 10 Black Panther K2 54-tonne main battle
            tanks were parked.
          </p>
        </div>
        <div className={styles.post}>
          <img
            src="https://i.cbc.ca/1.6859913.1685488783!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/poland-south-korea-weapons.jpg"
            alt=""
          />
          <h2 className={styles.postTitle}>
            Poland is rearming itself at high speed — could Canada take a lesson
            from Warsaw?
          </h2>
          <p className={styles.postContent}>
            A wind-swept pier at a naval port in Gdynia, Poland was the scene
            last December of an extraordinary display — one that Canada's
            defence community looks upon today with envy. Lined up
            track-to-track on the pier that day, their gun barrels elevated,
            were two-dozen Thunder K9-A1 self-propelled howitzers manufactured
            in South Korea. Nearby, 10 Black Panther K2 54-tonne main battle
            tanks were parked.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
