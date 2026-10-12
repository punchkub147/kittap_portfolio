import React, { Fragment, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStoreState } from "easy-peasy";
import {
  faPhone,
  faTasks,
  faUniversity,
  faHeart,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import portfolio from "../portfolio";
import ImageProfile from "../static/img/display.jpg";

import Layout from "../components/Layout";

const Portfolio = styled.div`
  p {
    padding: 0px;
    margin: 5px 0;
  }
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const ProfileHeader = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  grid-column-gap: 20px;
`;

const ProfileContent = styled.div`
  display: grid;
  grid-column-gap: 25px;
  grid-template-columns: auto 300px;
`;

const Profile = styled.div`
  /* display: grid; */
  /* grid-row-gap: 25px; */
`;

const ProfileSection = styled.div`
  margin-bottom: 25px;
  .label {
    display: grid;
    grid-template-columns: 30px auto;
    .icon {
      padding-top: 5px;
    }
  }
`;

const WorkSection = styled.div`
  margin-bottom: 25px;
  .place {
    width: 100%;
    padding: 10px 20px;
    background: #eee;
    border-radius: ${(props) => props.theme.border.radius};
    margin-bottom: 10px;
  }
  .detail {
    padding: 0 20px;
    margin-bottom: 10px;
  }
  .highlight {
    border: 1px solid #ccc;
    padding: 5px;
  }
`;

const Display = styled.div`
  width: 150px;
  height: 150px;
  box-shadow: ${(props) => props.theme.shadow[0]};
  img {
    width: 100%;
    height: 100%;
    border-radius: 100px 100px 100px 100px;
  }
`;

const TagGroup = styled.div`
  padding-left: 10px;
`;

const Tag = styled.div`
  display: inline-block;
  padding: 2px 10px;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: ${(props) => props.theme.border.radius};
  margin: 0 5px 5px 0;
`;

const PortFolioPaper = () => {
  const { profileData, skillsData, interesData, worksData, educationsData } =
    portfolio;
  return (
    <Portfolio>
      <ProfileHeader>
        <Display>
          <img src={ImageProfile} alt="display" />
        </Display>
        <span>
          <br />
          <h4>Kittapard Puaime</h4>
          <h6>
            Senior Fullstack Developer with hands-on experience in Rust
            microservices and React/TypeScript frontends,
            <br />
            focused on developer experience, security, and delivery quality.
          </h6>
        </span>
      </ProfileHeader>
      <ProfileContent>
        <Profile>
          <h5>
            <i>WORK EXPERIENCE</i>
          </h5>
          <WorkSection>
            {worksData.map((work) => (
              <Fragment>
                <div className="place">
                  <a href={work.link} target="_blank">
                    <b>{work.locationName}</b>
                  </a>
                  <p>{work.time}</p>
                </div>
                <div className="detail">
                  <p>
                    <b>{work.position}</b>
                  </p>
                  <p>{work.workDetail}</p>
                  {work.highlights.map((highlight) => (
                    <p className="highlight">{highlight}</p>
                  ))}
                </div>
              </Fragment>
            ))}
          </WorkSection>
          <h5>
            <i>EDUCATION</i>
          </h5>
          <WorkSection>
            {educationsData.map((work) => (
              <Fragment>
                <div className="place">
                  <a href={work.link} target="_blank">
                    <b>{work.locationName}</b>
                  </a>
                  <p>{work.time}</p>
                </div>
                <div className="detail">
                  <p>
                    <b>{work.position}</b>
                  </p>
                  <p>{work.workDetail}</p>
                  {work.highlights.map((highlight) => (
                    <p className="highlight">{highlight}</p>
                  ))}
                </div>
              </Fragment>
            ))}
          </WorkSection>
        </Profile>
        <Profile>
          <ProfileSection>
            <h5>
              <i>SKILLS</i>
            </h5>
            {skillsData.map((skill) => (
              <Fragment>
                <p>
                  <b>{skill.name}</b>
                </p>
                <TagGroup>
                  {skill.items.map((item) => (
                    <Tag>{item}</Tag>
                  ))}
                </TagGroup>
              </Fragment>
            ))}
          </ProfileSection>

          <ProfileSection>
            <h5>
              <i>INTERESTS</i>
            </h5>

            {interesData.map((interest) => (
              <Fragment>
                <p>
                  <b>{interest.name}</b>
                </p>
                <TagGroup>
                  {interest.items.map((item) => (
                    <Tag>{item}</Tag>
                  ))}
                </TagGroup>
              </Fragment>
            ))}
          </ProfileSection>
          <ProfileSection>
            <h5>
              <i>CONTACT</i>
            </h5>
            {profileData.contract.map((item) => (
              <div className="label">
                <span className="icon">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                {item.link ? (
                  <a href={item.link} target="_blank">
                    <p>{item.text}</p>
                  </a>
                ) : (
                  <p>{item.text}</p>
                )}
              </div>
            ))}
          </ProfileSection>
        </Profile>
      </ProfileContent>
    </Portfolio>
  );
};

const Index = () => {
  return (
    <Layout>
      <PortFolioPaper />
    </Layout>
  );
};

export default Index;
