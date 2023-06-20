import React from "react";
import prof from "../img/prof.png";
import "./About.css";
import DashBoard from "./DashBoard";

const About = () => {
  return (
    <div>
      <DashBoard />
      <div className="about-container">
        <img src={prof} alt="prof" className="profile-img" />
        <div className="about-content">
          <h2 className="about-heading">Martin Wolak</h2>
          <p className="about-info">B.A., B.Ed., M.A., OCT.</p>
          <p className="about-description">
            Hello! My name is Martin Wolak. I have taught kindergarten virtually
            and in person for 4 years! A few words about myself. I am a
            passionate individual who loves to read, listen to podcasts, and
            learn new things! In my spare time, I enjoy playing sports, such as
            basketball, snowboarding, and golf. My goal is to provide effective
            evidence-based learning that will be present in your child’s future
            as a life-long learner, and they will remember for the rest of their
            lives. I will continue to mentor your children to become
            well-rounded, competent, and responsible individuals. If you have
            any questions or concerns, please do not hesitate to communicate
            with me via email, and I will return your message as soon as
            possible. I am very excited to see your children succeed with all
            the engaged learning to come!
          </p>
          <div>
            <p className="about-quote">
              “I've learned that people will forget what you said, people will
              forget what you did, but people will never forget how you made
              them feel.” - Maya Angelou
            </p>
            <h3 className="about-subheading">
              How would you describe the mission of this project to a friend?
            </h3>
            <h4 className="about-history-heading">A brief history</h4>
            <p className="about-history-info">
              For the past several years, I have noticed the education system is
              failing all children and students at each level. I am starting my
              journey to make a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
