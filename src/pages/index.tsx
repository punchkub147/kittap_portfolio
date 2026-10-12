import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
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

  @media print {
    grid-row-gap: 12px;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media print {
    display: none;
  }
`;

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font: inherit;
  font-size: 14px;
  color: #fff;
  background-color: #333;
  border: 1px solid #333;
  border-radius: ${(props) => props.theme.border.radius};
  cursor: pointer;

  &:hover {
    background-color: #111;
  }

  &:focus-visible {
    outline: 2px solid #4a90d9;
    outline-offset: 2px;
  }
`;

const PrintButton = styled.button`
  ${buttonStyles}
`;

const DownloadLink = styled.a`
  ${buttonStyles}
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #fff;
  }
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

    @media print {
      border-color: #999;
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
`;

/** Keeps a whole job / education entry on one printed page. */
const WorkItem = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
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

  @media print {
    box-shadow: none;
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
      <Toolbar>
        <DownloadLink
          href={`${process.env.PUBLIC_URL}/kittapard-puaime-resume.pdf`}
          download="kittapard-puaime-resume.pdf"
          title="Download the portfolio as PDF (no browser header or footer)"
        >
          <FontAwesomeIcon icon={faDownload} /> Download PDF
        </DownloadLink>
        <PrintButton
          type="button"
          onClick={() => window.print()}
          title="Print this page — turn off 'Headers and footers' in the print dialog to drop the date, title and page numbers"
          aria-label="Print this page"
        >
          <FontAwesomeIcon icon={faPrint} /> Print
        </PrintButton>
      </Toolbar>
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
              <WorkItem key={work.locationName}>
                <div className="place">
                  <a href={work.link} target="_blank" rel="noreferrer">
                    <b>{work.locationName}</b>
                  </a>
                  <p>{work.time}</p>
                </div>
                <div className="detail">
                  <p>
                    <b>{work.position}</b>
                  </p>
                  <p>{work.workDetail}</p>
                  {work.highlights.map((highlight, index) => (
                    <p className="highlight" key={index}>
                      {highlight}
                    </p>
                  ))}
                </div>
              </WorkItem>
            ))}
          </WorkSection>
          <h5>
            <i>EDUCATION</i>
          </h5>
          <WorkSection>
            {educationsData.map((work) => (
              <WorkItem key={work.locationName}>
                <div className="place">
                  <a href={work.link} target="_blank" rel="noreferrer">
                    <b>{work.locationName}</b>
                  </a>
                  <p>{work.time}</p>
                </div>
                <div className="detail">
                  <p>
                    <b>{work.position}</b>
                  </p>
                  <p>{work.workDetail}</p>
                  {work.highlights.map((highlight, index) => (
                    <p className="highlight" key={index}>
                      {highlight}
                    </p>
                  ))}
                </div>
              </WorkItem>
            ))}
          </WorkSection>
        </Profile>
        <Profile>
          <ProfileSection>
            <h5>
              <i>SKILLS</i>
            </h5>
            {skillsData.map((skill) => (
              <Fragment key={skill.name}>
                <p>
                  <b>{skill.name}</b>
                </p>
                <TagGroup>
                  {skill.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
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
              <Fragment key={interest.name}>
                <p>
                  <b>{interest.name}</b>
                </p>
                <TagGroup>
                  {interest.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
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
              <div className="label" key={item.text}>
                <span className="icon">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer">
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
