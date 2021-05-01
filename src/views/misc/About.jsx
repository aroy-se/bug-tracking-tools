import React from "react";
import about_img from "../../assets/images/btt-brand.jpg";

const About = () => {
  return (
    <div className="container text-secondary font-weight-lighter mt-5 shadow-lg">
      <p>
        <small className="text-muted font-weight-lighter">
          <span>
            <img
              className="about_image mt-2"
              alt="btt-welcome-img"
              src={about_img}
              style={{ width: 125, height: 125 }}
            />
          </span>
          A bug tracking system or defect tracking system is a software
          application that keeps track of reported software bugs in software
          development projects. It may be regarded as a type of issue tracking
          system. Many bug tracking systems, such as those used by most
          open-source software projects, allow end-users to enter bug reports
          directly.[1] Other systems are used only internally in a company or
          organization doing software development. Typically bug tracking
          systems are integrated with other project management software. A bug
          tracking system is usually a necessary component of a professional
          software development infrastructure, and consistent use of a bug or
          issue tracking system is considered one of the "hallmarks of a good
          software team".
        </small>
      </p>
      <p>
        <small className="text-muted font-weight-lighter">
          A major component of a bug tracking system is a database that records
          facts about known bugs. Facts may include the time a bug was reported,
          its severity, the erroneous program behavior, and details on how to
          reproduce the bug; as well as the identity of the person who reported
          it and any programmers who may be working on fixing it.[3] Typical bug
          tracking systems support the concept of the life cycle for a bug which
          is tracked through the status assigned to the bug. A bug tracking
          system should allow administrators to configure permissions based on
          status, move the bug to another status, or delete the bug. The system
          should also allow administrators to configure the bug statuses and to
          what extent a bug in a particular status can be moved. Some systems
          will e-mail interested parties, such as the submitter and assigned
          programmers, when new records are added or the status changes. It is
          possible to perform automated diagnosis based on the content of the
          bug report. For instance, one can do automated detection of bug
          duplicates[4] or automatic bug fixing.[5]
        </small>
      </p>
      <p>
        <small className="text-muted font-weight-lighter">
          The main benefit of a bug-tracking system is to provide a clear
          centralized overview of development requests (including both bugs and
          improvements, the boundary is often fuzzy), and their state. The
          prioritized list of pending items (often called backlog) provides
          valuable input when defining the product road map, or maybe just "the
          next release". In a corporate environment, a bug-tracking system may
          be used to generate reports on the productivity of programmers at
          fixing bugs. However, this may sometimes yield inaccurate results
          because different bugs may have different levels of severity and
          complexity. The severity of a bug may not be directly related to the
          complexity of fixing the bug. There may be different opinions among
          the managers and architects. A local bug tracker (LBT) is usually a
          computer program used by a team of application support professionals
          (often a help desk) to keep track of issues communicated to software
          developers. Using an LBT allows support professionals to track bugs in
          their "own language" and not the "language of the developers." In
          addition, an LBT allows a team of support professionals to track
          specific information about users who have called to complain—this
          information may not always be needed in the actual development queue.
          Thus, there are two tracking systems when an LBT is in place.
        </small>
      </p>
      <p>
        <small className="text-muted font-weight-lighter">
          Bug and issue tracking systems are often implemented as a part of
          integrated project management systems. This approach allows including
          bug tracking and fixing in a general product development process,
          fixing bugs in several product versions, automatic generation of a
          product knowledge base and release notes.
        </small>
      </p>
      <p>
        <small className="text-muted font-weight-lighter">
          Some bug trackers are designed to be used with distributed revision
          control software. These distributed bug trackers allow bug reports to
          be conveniently read, added to the database or updated while a
          developer is offline.[6] Fossil and Veracity both include distributed
          bug trackers. Recently, commercial bug tracking systems have also
          begun to integrate with distributed version control. FogBugz, for
          example, enables this functionality via the source-control tool,
          Kiln.[7] Although wikis and bug tracking systems are conventionally
          viewed as distinct types of software, ikiwiki can also be used as a
          distributed bug tracker. It can manage documents and code as well, in
          an integrated distributed manner. However, its query functionality is
          not as advanced or as user-friendly as some other, non-distributed bug
          trackers such as Bugzilla.[8] Similar statements can be made about
          org-mode, although it is not wiki software as such.
        </small>
      </p>
      <p></p>
    </div>
  );
};

export default About;
