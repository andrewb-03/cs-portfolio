# CSC 648-848-05 Milestone 3  

This milestone **includes three checkpoints**:

## Table of Contents
- **Checkpoint 1:** Technical Documentation
  - [Collaborative Approach](#head1)
  - [Technical Documentation](#head2)
  - [Background Reading](#head3)
  - [How Checkpoint #1 Will Be Graded](#head5)
  - [Submission Guidelines](#head6)
  - [Revisions](#head7)
- **Checkpoint 2:** Horizontal Prototype (HP)
  - [Collaborative Approach](#head8)
  - [HP: User Interface (UI)](#head9)
  - [HP: User Experience (UX)](#head10)
  - [Submission Guidelines](#head12)
- **Checkpoint 3:** Software Review and Backend Components 
  - [GitHub Organization](#head13)
  - [Coding Standards](#head14)
  - [Frameworks Deployment](#head15)
  - [Database Organization](#head16)
  - [Security Practices](#head17)
  - [Grading Rubrics for Checkpoint #3](#head18)
  

---

The following sections provide detailed descriptions of the tasks required for each checkpoint. All team members are 
expected to read the entire document. The Team Lead is responsible for coordinating and leading the team's efforts 
throughout all checkpoints in this milestone.

##  Checkpoint #1: Technical Documentation 

**Objective:** Develop the following components to establish the foundation of your project:

- **Define exactly what product you are delivering.** We will come to “temporal” agreement on what the final 
  application is going to look like in terms of functionality, especially which functional items are priority 1 (P1). 
  This will be  the base for your final commitment to the instructor/client that will be made in M4

- **Ensure software development is on track.** We will verify that all the SW components are installed and integrated 
   and that most major functions work.  The software you present must follow adopted coding style, be reasonably 
   documented and deployed on the final deployment platform. GitHub usage (organization, comments to postings etc.) will also be checked. 

- **Provide feedback on all major UI screens and functionality.** This will be done through a review of the so-called horizontal or UI prototype (see below). 

- **Check software architecture** by reviewing your code, the database and overall design at a high level (may be done partially off-line, remotely)

- **Check all algorithms** like search and filtering

- **Ensure** basic best practices for security are followed

- **Ensure effective teamwork** by verifying that all team members are contributing to the team’s work

- **Ensure software development is effective** by verifying your team’s coding practices, software engineering practices and usage of team development tools


**Initial Input:** The technical documentation from this milestone must have to be reasonably consistent with the 
one created in Milestone 2 (version 2) and instructors or grader feedback, but it can also differ 
from Milestone 2 based on what you discover and develop in your design process in the spirit of iterative SE process and based on the feedback you get. 

### <a id="head1"></a> Collaborative Approach

To effectively create and complete the M3 document, I recommend the following collaborative approach:

1. **Assignment of Roles:**
   - The Team Lead assigns a **Technical Writer** to oversee the creation and edition of the document.

2. **Division of Work:**
   - The Technical Writer assigns individual chapters to each team member.
   - It is strongly recommended that all team members collaborate on the most important sections of this checkpoint simultaneously. 
     This approach ensures high-quality and synchronized work.

3. **Document Integration:**
   - The Technical Writer collects the chapters, edits, and corrects them, and integrates them into a well-formatted 
     document with consistent fonts and formatting. Repeat this step as needed. 
   - Recommended tools to create-edit your document include [GitBook](https://www.gitbook.com/) or [Notion](https://www.notion.so/) 
     (note that Notion's free tier is limited). Google Docs can also be used.

4. **Team Review:**
   - The Technical Writer, with the supervision of the Team Lead, posts the final draft document on the team repository. 
     All team members should read the full document for one last review and provide any feedback.

5. **Finalization:**
   - The **Technical Writer** finalizes the document based on the team's feedback.
   - The Team Lead is responsible for approving the document for final submission. If the document is returned by 
     the CTO (instructor), it will be considered the Team Lead's responsibility, as ensuring the submission of high-quality
     work is one of the key duties of the Team Lead.
   

### <a id="head2"></a> Technical Documentation

In the document for Milestone 3 version 1 (`M3v1.pdf`), you must include **all** the following sections in the exact order listed below. Each section of this document should start on a new page within the same PDF file:

1. **Title Page:** MUST include:
   - “SW Engineering CSC648-848-05 Fall 2024”
   - Project/application title and name (use the name chosen for your application)
   - Team number
   - Names of students (Team Lead first) with the Team Lead's email. Mark the roles of Team Lead, Front End Lead, Back End Lead, and GitHub Master.
   - “Milestone 3”
   - Date
   - History table (revisions) (This will be updated based on instructor feedback, so it is important).
     - The history table should follow the following format:

       | Milestone   | Version   | Date                                                 |
       |-------------|-----------|------------------------------------------------------|
       | Milestone 3 | Version 1 | date the milestone was submitted                     |
       | Milestone 2 | Version 2 | date of the most recent modification of this version |
       | Milestone 2 | Version 1 | date the milestone was submitted                     |
       | Milestone 1 | Version 2 | date of the most recent modification of this version |
       | Milestone 1 | Version 1 | date the milestone was submitted                     |

     - Once Version 2 of this milestone is created, the history table in your `M3v2.pdf` file should be updated with a new row that includes Version 2 and the date it was last modified.
     - This history table should be sorted in descending order, with the newest version at the top.

2. **Table of Contents**
   - The Table of Contents should serve as a navigational guide for your document.
   - Each entry in the Table of Contents must be a link that directs to the corresponding section within the document.
   - Additionally, ensure that each entry includes the correct page number where the section can be found. This will allow readers to quickly locate and access the information they need. The format should be clear and organized, providing a seamless experience for anyone reviewing the document.

3. **Data Definitions:**
   - Expand and refine the data definitions from Milestone 2 Version 2.
   - This is the final version of your data definitions, and the ones you will fully implement in your project.
   - You are allowed to copy and paste your final data definitions from M2V2 here if there are no further modifications.

4. **Prioritized High-Level Functional Requirements:**
   - Gather your entire team for an online meeting to carefully review each prioritized functional requirement in detail, including P2 and P3 requirements. Discuss and decide which requirements should be dropped, downgraded, or upgraded in priority (e.g., moving P2 requirements to P1).
   - Be realistic in your discussions, weighing the pros and cons of lowering priority or dropping certain requirements. Remember, P1, P2, and P3 functional requirements are always implemented, but P3s are typically addressed during the maintenance phase of the product. In this class, due to time constraints, P3 functional requirements will not be implemented. Therefore, focus all your efforts on ensuring that your P1 and P2 requirements are solid, non-trivial, and important for your application.

5. **UI/UX Wireframes:**

   - **I recommend assigning this task to the frontend team.**

   - **Wireframe Creation**: Develop an updated and detailed version of your mockups/storyboards using a wireframe approach for all use cases. 

   - **Purpose of Wireframes:** Your wireframes should clearly demonstrate the sequence of steps a user takes to achieve specific goals within the application. For example, an effective wireframe will illustrate the step-by-step process of a successful sign-up flow, highlighting the UI/UX transitions between screens. Ensure that each wireframe includes lines or arrows pointing to the next screen that appears after a user action, such as clicking a button or editing an item.

   - **Consistency:** The wireframes in this milestone (M3) must align with the mockups and storyboards you submitted in Milestone 2 Version 2 (M2v2), incorporating any feedback provided by the instructor. Additionally, the final wireframes in M3 must be consistent with the UI/UX of your horizontal prototype.

   - **Testing and Usability:** Thoroughly "test" your wireframes by simulating user interactions as if they were live. Walk through the mockups/wireframes with someone playing the role of the user, ensuring that the design is user-friendly and matches the defined use cases. Prioritize ease of use and consistency with your data dictionary and use cases throughout this process.

   - **Tool Recommendation:** I recommend using [Figma](https://www.figma.com/) to create your wireframes for this section. Figma provides robust tools for creating detailed and interactive wireframes that align with professional standards.

   - **Presentation:** 
       - Ensure that the wireframes are presented clearly in the hard copy of your Milestone 3 document. If the wireframes are not easy to read, they cannot be graded. Pay attention to the layout and readability to facilitate a smooth review process. 
       - Please provide a link to your wireframes created in [Figma](https://www.figma.com/).


6. **High-Level System Design**

   **I recommend assigning this task to the backend team.**

   This section is divided into several subsections as follows:

   6.1 **High-Level Database Architecture**
      - **Entity-Relationship Diagram (ERD):** Include your revised ERD from Milestone 2 Version 2 (M2V2).
      - **Enhanced Entity-Relationship (EER) Diagram:** Based on your ERD from Milestone 2, create an EER diagram to model all the objects (tables) in your database. For this section, I recommend using [MySQL Workbench](https://www.mysql.com/products/workbench/).
  
   6.2 **Backend Architecture**
      - **Expand and refine** the backend architecture you developed in Milestone 2 Version 2 (M2V2). 
      - **Incorporate any new components or services** required to support additional features, improve scalability, 
        or enhance the overall system design. Ensure that the updated architecture aligns with the current project 
        requirements and supports seamless integration with the frontend and database components.



7. **List of Team Contributions:**
    - **Part #1 (Must be completed by team lead Only):**
      - Provide a detailed list of contributions made by each team member for both Checkpoint #1 and Checkpoint #2 of this milestone
      - Assign a contribution score to each member, using a scale from 1 to 10 (1 = no contribution, 10 = maximum contribution). 
        The instructor also tracks each member's contributions. Misrepresenting contributions will not be tolerated. 
        The Team Lead must be honest in evaluating team members. If a discrepancy arises between the Team Lead’s score 
        and the instructor’s observations (e.g., an 8 versus a 2), it will be assumed that the team is covering up for 
        a lack of effort, negatively impacting the overall team grade. While being a Team Lead is rewarding for learning 
        and leadership development, it carries significant responsibility, as the team’s grade depends on the Lead's actions.
    - **Part #2 (Must be completed by all team members):**
      - Every team member, including the Team Lead, must email the CTO ([jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with any feedback or 
        complaints about other team members or the team as a whole. 
      - You can follow the following template for guidance: [Feedback-Complaints Email](#head6). 
          - **Note:** This template is provided as a reference only. Please personalize your feedback based on your 
            unique experiences with your team. Do not copy and paste the content directly; instead, use it as a starting 
            point to craft your own detailed and honest feedback.
      - **Complaints will remain anonymous, known only to the instructor.** If necessary, the instructor may address 
        issues with the Team Lead, but the identities of those who provided feedback will not be disclosed. 
        This process is similar to performance evaluations in software companies, where HR or managers use feedback 
        to make decisions about promotions and team dynamics.



### <a id="head3"></a> Background Reading

- Class notes, slides or other relevant material covered in class for this milestone.

### <a id="head5"></a> How Checkpoint #1 Will Be Graded

In Checkpoint #1, students can earn a maximum of 7 points. Here’s how the grading process will work:

- **Team Grade:** The grade your team receives for the `M3v1.pdf` document is provisional (we'll refer to it as grade **G**), 
  unless otherwise specified. This grade reflects the overall team performance.

- **Individual Grade:** Your individual grade is determined by two factors: the team grade **G** and your personal 
   contributions. The maximum grade you can achieve for `M3v1.pdf` is **G**. 
  - If you fully contributed to the milestone, you will receive the full **G** grade.
  - If your contributions were less than expected, your grade will be lower than **G**, depending on the extent of your involvement.

- **Final Grade for this Checkpoint:** After your team revises the work in the `M3v2.pdf` document based on our feedback, 
  the grade **G** may be adjusted **upward**. This adjustment will only apply to students who contributed fully to the 
  revisions. Your grade in `M3v2.pdf` will be your **final grade** for this checkpoint.


### <a id="head6"></a> Submission Guidelines (Checkpoint #1)

**You must follow the instructions below PRECISELY:**

1. ***Submission Required from All Team Members***

> **DO NOT add (Cc'd) your team members in this email** 
- All the team members will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
  - **Subject:** CSC648.848.05 Team 0N Milestone 3 Feedback-Complaints
  - **Body:**
    - Provide individual feedback or/and complaints for every individual member of your team. Note that you are not 
      allowed to score nor mention detailed contributions in this email. Team lead will already do that in the document. 
      The goal of this email is to learn more about your perspective of every member of the team, or to voice anything that in
      your opinion is not quite working about this individual
    - Provide feedback or/and complaints for the team as a whole. Talk about the dynamics of the team so far and in your opinion, 
      what could be done to make your team more effective.
    - Follow the template email show below

     ```
     To: jortizco@sfsu.edu  
     Subject: CSC648.848.05 Team 09 Milestone 3 Feedback-Complaints

     Hi Professor,

     The following is my feedback-complaints for all my team members and my team as a whole:

     1. Individual Feedback:

         - Nina Pickles (Team Lead): Nina has been excellent at organizing meetings and keeping everyone on track, but 
           sometimes the instructions could be clearer to avoid misunderstandings. 

         - Ivana Drago: Ivana's coding skills are top-notch, and she consistently delivers on time, but she sometimes 
           hesitates to ask for help when stuck, which could improve team collaboration.

         - Lulu Joy: Lulu brings great ideas to the table and is always ready to contribute, but her documentation 
           could be more detailed to help others understand her work better.

         - Ozzie Bear: Ozzie is proactive and often takes initiative, which is appreciated, but occasionally he overcommits, 
          leading to rushed work.

         - Clea Bean (Myself): I have been diligent in completing my tasks and communicating with the team, but I need to 
          work on providing more feedback to others' contributions.

         - Tobi Love: Tobi is very creative and brings fresh perspectives, but sometimes struggles to meet deadlines, 
          which affects our progress.

         - Howie Bowie: Howie is reliable and always follows through, but he could be more engaged during team discussions 
          to provide valuable input.
    
     2. Team Feedback:

         Our team works well together, with strong communication and a willingness to help each other out. However, 
         we need to improve our time management, especially when it comes to balancing individual workloads to prevent 
         last-minute rushes. We could benefit from setting clearer milestones and regularly checking in on our progress 
         to ensure that everyone is aligned and on track.
    
     Let me know if you have any questions.

     Best,  
     Clea Bean

     
     ```

2. ***Submission Required from the Team Lead Only***

**You must follow the instructions below PRECISELY. Additionally, We will consider only for grading work hosted 
in your default branch (Master or Main branch)**

- Upload into milestone 3 folder a document named `M3v1.pdf` with all work
- The Team Lead will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
   - **Cc:** All team members and the TA, Cole ([cchiodo@sfsu.edu](mailto:cchiodo@sfsu.edu)).
   - **Subject:** CSC648.848.05 Team 0N M3v1 Submission, where N must be replaced with your team number
   - **Body:**
     - A brief greeting and a sentence explaining the purpose of the email.
     - A link (not the PDF document) to your Milestone 3 folder in your repository, where the document `M3v1.pdf` 
       containing all the technical documentation for this milestone is located.

### <a id="head7"></a> Revisions (Checkpoint #1)

- The instructor or grader will assign a grade and provide detailed feedback on your `M3v1.pdf` document. This feedback 
  will be sent to all team members via email.
  
- After receiving the feedback, the team must **freeze** the `M3v1.pdf` document in the Milestone 1 folder and apply 
  all necessary revisions to a new document named `M3v2.pdf`, which should also be placed in the same folder.


- Whenever a new milestone (V1) is graded, we will also re-grade the `V2` version of the previous milestone to ensure 
  all required revisions were properly made. This process is in place to help you base your new milestones (V1) on 
  the corrected work in `V2` of the previous milestones, preventing the continuation of any mistakes from earlier versions.


---

---

## Checkpoint #2: Horizontal Prototype (HP) 

**Objective:** Develop a horizontal prototype (HP) based on the wireframes created in previous milestones.  
This prototype should focus on the following components:

- **User Interface (UI):** Implement the UI based on your wireframes to create a consistent and interactive frontend. The UI should cover key user interactions, such as:
  - Navigation between major sections of the application.
  - Form handling for actions like login or registration.
  - Interactive elements like buttons, menus, and search bars, reflecting the flow defined in the wireframes.

- **User Experience (UX):** Ensure the prototype is easy to navigate and user-friendly, reflecting the wireframe’s focus on intuitive design and usability.


### <a id="head8"></a> Collaborative Approach

For this assignment, each team member must take responsibility for specific components based on their strengths and expertise. To ensure full coverage of the rubric criteria:

1. **Assign Roles:** Designate roles such as UI Designer, UX Specialist, Frontend Developer, and Quality Assurance within the team. Each member should focus on their assigned areas while collaborating closely with others to ensure seamless integration.

2. **Regular Check-Ins:** Schedule regular team meetings to discuss progress, troubleshoot issues, and ensure that all components—UI, UX, frontend logic—are aligning with the project’s overall architecture and grading rubrics.

3. **Peer Reviews:** Implement a peer-review process where team members review each other's work before submission. This will help catch errors, optimize design, and ensure adherence to the wireframe specifications, enhancing the overall quality of the project.

4. **Documentation and Integration:** Each member must document their work and ensure it integrates smoothly with the team's prototype. This documentation should be clear enough for any team member to understand and build upon.

### <a id="head9"></a> HP: User Interface (UI)

In this section, your focus should be on translating the wireframes into an interactive and consistent user interface:

1. **Wireframe Implementation:**
   - **Objective:** Implement the wireframes into a functioning UI that matches the design specifications.
   - **Implementation:** Develop the frontend using your preferred tools (e.g., HTML/CSS, JavaScript frameworks) to create the key screens and interactive elements defined in the wireframes.
   - **Testing:** Ensure that all UI components work as expected, with a focus on navigation, responsiveness, and visual consistency with the wireframes.

2. **Form Handling:**
   - **Objective:** Implement forms (e.g., login, registration) as outlined in the wireframes.
   - **Implementation:** Develop the necessary form fields, validation, and submission handling to mimic real-world interactions.
   - **Testing:** Test form functionality, including input validation, error handling, and submission flows, to ensure they meet usability standards.

3. **Interactive Elements:**
   - **Objective:** Create and link all interactive UI elements as defined in the wireframes.
   - **Implementation:** Implement buttons, menus, search bars, and other elements, ensuring they function as intended and lead to the appropriate screens or actions.
   - **Testing:** Verify that all interactive elements respond correctly to user actions, providing feedback or navigation as expected.

### <a id="head10"></a> HP: User Experience (UX)

This section focuses on ensuring that the UI provides a smooth and intuitive user experience:

1. **Navigation Flow:**
   - **Objective:** Implement the navigation flow as per the wireframes, ensuring a logical and user-friendly path through the application.
   - **Implementation:** Create navigation menus, links, and routes that allow users to move seamlessly between different sections of the application.
   - **Testing:** Test the navigation flow to ensure that users can easily find and access all key features of the application without confusion.

2. **Usability Testing:**
   - **Objective:** Conduct usability testing to identify and resolve any issues that might hinder the user experience.
   - **Implementation:** During class, the instructor will project your prototype on the classroom screen and walk through it as if they were a first-time user. The instructor will navigate through the application, testing key features and functionalities in real-time to simulate actual user interaction.
   - **Testing:** The instructor will provide immediate feedback on the usability, design clarity, and overall user satisfaction. The team should be prepared to observe this live testing, take notes, and ask questions to clarify any points of confusion. After class, the team will make the necessary adjustments to improve the user experience based on the feedback received.


**Note:** Although this prototype focuses primarily on the frontend UI/UX, the backend team should continue working 
concurrently on all other functionalities, whether they are included in the prototype or not. This will ensure that the 
team is well-prepared and ahead of schedule for the beta prototype in Milestone 4.


> **You must follow the instructions below PRECISELY. Additionally, We will consider only for grading work hosted 
in your default branch (Master or Main branch)**

- All your code for this prototype must be hosted in your cloud instance and application folder of your repository
- The Team Lead will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
   - **Cc:** All team members 
   - **Subject:** CSC648.848.05 Team NN M3 Checkpoint #2 (HP Prototype) Submission, where NN must be replaced by your team number.
   - **Body:** 
       - The URL pointing to your prototype. Note that this URL should be exactly the same as the one found in your main README file.
   - **Notes:** Please include any additional information that may assist with executing or grading the current task. 
     This could include setup instructions, known issues, or any special considerations we should be aware of during the evaluation.

---

## Checkpoint 3: Software Review and Backend Components 

### <a id="head13"></a> GitHub Organization
   - **Description:** This section evaluates how well your team has organized the project repository on GitHub. Key aspects include branch management, use of pull requests, clear commit messages, and an organized file structure. The goal is to ensure that the repository is easy to navigate, collaborative, and follows best practices for version control.

### <a id="head14"></a> Coding Standards
   - **Description:** This section assesses adherence to the coding standards defined by your team or project guidelines. This includes consistency in code formatting, use of comments, variable naming conventions, and overall code readability. The objective is to maintain a clean, readable, and maintainable codebase.

### <a id="head15"></a> Frameworks Deployment
   - **Description:** This section evaluates the deployment and integration of frameworks used in your project. This includes ensuring that the chosen frameworks are properly set up, correctly integrated with other components, and effectively utilized to enhance the functionality of the application.

### <a id="head16"></a> Database Organization
   - **Description:** This section focuses on the structure and organization of the database. This includes evaluating the schema design, normalization, and how well the database supports the application's needs. The goal is to ensure that the database is efficient, scalable, and well-organized.

### <a id="head17"></a> Security Practices
   - **Description:** This section assesses the implementation of security practices within the project. This includes secure coding practices, data encryption, access control, and protection against common vulnerabilities. The objective is to ensure that the application is secure and resilient against attacks.


---

Best of luck, team! 💻 May your wireframes transform into a seamless user experience, your code be clean and secure, 
your repository be organized and pristine, and your backend runs like a well-oiled machine! 🚀 🎯

---

