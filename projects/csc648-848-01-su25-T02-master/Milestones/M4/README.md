# CSC 648-848-05 Milestone 4  (14 points)

This milestone **includes three checkpoints**:

## Table of Contents
- **Checkpoint 1:** Technical Documentation
  - [Collaborative Approach](#head1)
  - [Technical Documentation](#head2)
  - [Submission Guidelines](#head4)
  - [Revisions](#head5)
- **Checkpoint 2:** Beta Prototype (BP) 
  - [Objectives](#head6)
  - [Beta Prototype Description](#head7)
  - [Submission Guidelines](#head9)
- **Checkpoint #3:** Demo Presentation 
  - [Presentation Guidelines](#head10)

---

The following sections provide detailed descriptions of the tasks required for each checkpoint. All team members are 
expected to read the entire document. The Team Lead is responsible for coordinating and leading the team's efforts 
throughout all checkpoints in this milestone.

##  Checkpoint #1: Technical Documentation (4 points)

**Objective:** 
  - To make a final commitment for functions to be delivered (e.g., list of Priority 1 and Priority 2 functions) and which will be used in grading
  - To check that all required non-functional specs are satisfied or on track
  - To practice formal usability testing plan development 
  - To practice formal QA testing
  - To practice code review


**Initial Input:** The technical documentation from this milestone must have to be reasonably consistent with the 
one created in Milestone 3 (version 2) and instructors or grader feedback, but it can also differ 
from Milestone 3 based on what you discover and develop in your design process in the spirit of iterative SE process and based on the feedback you get. 

### <a id="head1"></a> Collaborative Approach

To effectively create and complete the M4 document, I recommend the following collaborative approach:

1. **Assignment of Roles:**
   - The Team Lead assigns a **Technical Writer** to oversee the creation and edition of the document.

2. **Division of Work:**
   - The Technical Writer assigns individual chapters to each team member.
   - It is strongly recommended that all team members collaborate on testing the most important unique features of your project. 
     This approach ensures high-quality, synchronized work.

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

In the document for Milestone 3 version 1 (`M4v1.pdf`), you must include **all** the following sections in the exact order listed below. Each section of this document should start on a new page within the same PDF file:

#### 1) Title Page: MUST include:
   - “SW Engineering CSC648-848-05 Fall 2024”
   - Project/application title and name (use the name chosen for your application)
   - Team number
   - Names of students (Team Lead first) with the Team Lead's email. Mark the roles of Team Lead, Front End Lead, Back End Lead, and GitHub Master.
   - “Milestone 4”
   - Date
   - History table (revisions) (This will be updated based on instructor feedback, so it is important).
     - The history table should follow the following format:

       | Milestone   | Version   | Date                                                  |
       |-------------|-----------|-------------------------------------------------------|
       | Milestone 4 | Version 1 | date the milestone was submitted                      |
       | Milestone 3 | Version 2 | date of the most recent modification of this version  |
       | Milestone 3 | Version 1 | date the milestone was submitted                      |
       | Milestone 2 | Version 2 | date of the most recent modification of this version  |
       | Milestone 2 | Version 1 | date the milestone was submitted                      |
       | Milestone 1 | Version 2 | date of the most recent modification of this version  |
       | Milestone 1 | Version 1 | date the milestone was submitted                      |

     - Once Version 2 of this milestone is created, the history table in your `M4v2.pdf` file should be updated with a new row that includes Version 2 and the date it was last modified.
     - This history table should be sorted in descending order, with the newest version at the top.

#### 2) Table of Contents
   - The Table of Contents should serve as a navigational guide for your document.
   - Each entry in the Table of Contents must be a link that directs to the corresponding section within the document.
   - Additionally, ensure that each entry includes the correct page number where the section can be found. 
     This will allow readers to quickly locate and access the information they need. 
     The format should be clear and organized, providing a seamless experience for anyone reviewing the document.

#### 3) Product Summary
- **Product Name**
- **Final P1 and P2 Functional Requirements:** Provide an itemized list of all major committed functions
(FINAL P1 and P2 functions or services) that will be delivered and tested. This is your final functional commitment—failure to deliver these will affect your grade.
- **Unique Features:** Describe what makes your product unique or superior, comparing it with a competitor's product. 
  Note that you will have to test functions of your unique features in this milestone.
- **Deployment URL:** Include the URL where your product can be accessed. The same url that is in your main README file

#### 4) Usability Test Plan
- **Test Functions:** Select FIVE major functions (excluding login or registration) from your superior features for usability testing.
- **Test Components:**
  - **Test Objectives:** Briefly describe what is being tested and why (0.5 page).
  - **Test Description:** Outline the system setup, starting point, intended users, and the URL of the system being tested (up to 1 page).
  - **Effectiveness Table:** Measure the effectiveness of the functions tested.
  - **Efficiency Table:** Measure the efficiency of the functions tested.
  - **User Satisfaction:** Use a Likert questionnaire with 3 statements per function tested (total 15 statements)

**Note:** Ensure that tests are performed by people not familiar with the project or who are part of your target audience.

#### 5) QA Test Plan
- **Test Plan:** Select FIVE non-functional requirements (each from a different category) and write a QA test plan for each, including:
  - Test Objectives
  - HW and SW Setup (including URL)
  - Feature to be Tested
  - QA Test Plan: Provide 3 test cases and results (per non-functional requirement), using a tabular format with columns 
    for test #, title, task description, input, expected output, and results (PASS/FAIL).

- **Testing Execution:** Perform the tests across all supported browser versions and record the results.

#### 8) Localization Testing
- **Localization Plan:** Describe your plan for testing the application in different languages or regions.
- **Test Cases:** Provide test cases for verifying that all elements (text, UI, etc.) are properly localized.
- **Results:** Record and analyze the results of localization tests, noting any issues found.

#### 6) Code Review
- **Coding Standards:** Detail the team's coding best practices.
- **GitHub Code Review:** Include screenshots of your internal (done within the team) code review process, showing pull requests and comments.
- **External Code Review:** Perform a code review for another team, via email, and attach screenshots of the collaboration.

#### 7) Self-Check on Security Practices
- **Major Assets:** List the major assets you are protecting.
- **Password Encryption:** Confirm and describe the process of encrypting passwords in the database, with screenshots.
- **Input Validation:** List validated inputs and provide examples of validation code, including search bar input.

#### 8) Self-Check: Adherence to Non-Functional Specs
- **Status Update:** Copy all original non-functional specs from M1V2 and mark each as DONE, ON TRACK, or ISSUE, with explanations if there are problems.


##### 9) List of Team Contributions:
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
  - You can follow the following template for guidance: [Feedback-Complaints Email](#head4). 
      - **Note:** This template is provided as a reference only. Please personalize your feedback based on your 
        unique experiences with your team. Do not copy and paste the content directly; instead, use it as a starting 
        point to craft your own detailed and honest feedback.
  - **Complaints will remain anonymous, known only to the instructor.** If necessary, the instructor may address 
    issues with the Team Lead, but the identities of those who provided feedback will not be disclosed. 
    This process is similar to performance evaluations in software companies, where HR or managers use feedback 
    to make decisions about promotions and team dynamics.


### <a id="head4"></a> Submission Guidelines (Checkpoint #1)

1. ***Submission Required from All Team Members***

> **DO NOT add (Cc'd) your team members in this email** 

- All the team members will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
  - **Subject:** CSC648.848.05 Team 0N Milestone 4 Feedback-Complaints
  - **Body:**
    - Provide individual feedback or/and complaints for every member of your team. Note that you are not 
      allowed to score nor mention detailed contributions in this email. Team lead will already do that in the document. 
      The goal of this email is to learn more about your perspective of every member of the team, or to voice anything that, in
      your opinion, is not quite working about this individual
    - Provide feedback or/and complaints for the team as a whole. Talk about the dynamics of the team so far and in your opinion, 
      what could be done to make your team more effective.
    - Follow the template email show below

     ```
     To: jortizco@sfsu.edu  
     Subject: CSC648.848.05 Team 09 Milestone 4 Feedback-Complaints

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

- Upload into milestone 4 folder a document named `M4v1.pdf` with all work
- The Team Lead will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
   - **Cc:** All team members and the TA, Cole ([cchiodo@sfsu.edu](mailto:cchiodo@sfsu.edu)).
   - **Subject:** CSC648.848.05 Team 0N M4v1 Submission, where N must be replaced with your team number
   - **Body:**
     - A brief greeting and a sentence explaining the purpose of the email.
     - A link (not the PDF document) to your Milestone 4 folder in your repository, where the document `M4v1.pdf` 
       containing all the technical documentation for this milestone is located.

### <a id="head5"></a> Revisions (Checkpoint #1)

- The instructor or grader will assign a grade and provide detailed feedback on your `M4v1.pdf` document. This feedback 
  will be sent to all team members via email.
  
- After receiving the feedback, the team must **freeze** the `M4v1.pdf` document in the Milestone 1 folder and apply 
  all necessary revisions to a new document named `M4v2.pdf`, which should also be placed in the same folder.


- Whenever a new milestone (V1) is graded, we will also re-grade the `V2` version of the previous milestone to ensure 
  all required revisions were properly made. This process is in place to help you base your new milestones (V1) on 
  the corrected work in `V2` of the previous milestones, preventing the continuation of any mistakes from earlier versions.


---

## Checkpoint #2: Beta Prototype (BP)

### <a id="head6"></a> Objectives
- **Implementation:** Ensure that at least 85% of your functional (P1 only) and non-functional requirements are fully implemented.
- **Feature Testing:** Focus on fully implementing your unique/special/superior feature as described in your M4 documentation.
- **Offline Testing:** Prepare for offline testing and grading, ensuring the prototype is stable and meets the project’s objectives.

### <a id="head7"></a> Beta Prototype

A good beta prototype should serve as a near-final version of your application, where the majority of the core functionalities and non-functional requirements are in place and fully operational. Testing of the beta prototype should focus on the following areas:

1. **Core Functionalities:** 
   - Ensure that most of your functional requirements are fully implemented. These are the most critical features that define your application’s primary purpose. Each function should be thoroughly tested to confirm that it performs as expected under different scenarios and conditions.

2. **Non-Functional Requirements:**
   - Test for key non-functional requirements, such as performance, security, and usability. This includes evaluating the system’s responsiveness, load handling, and overall user experience. Ensure that these elements are in line with the standards you set out in your earlier milestones.

3. **Unique/Special/Superior Features:**
   - A major focus of the beta prototype testing should be on your unique or special features. This feature should be fully implemented and must be tested for both functionality and user experience. The feature should stand out as a key differentiator from competitors, delivering the value proposition you outlined in your M4 documentation.

4. **System Stability and Integration:**
   - The beta prototype should demonstrate system stability with all integrated components working harmoniously. Test for any potential issues that could arise from the interaction between different system modules, including the backend, frontend, and database. Ensure that data flows smoothly and that there are no critical bugs or crashes during operation.

5. **User Experience:**
   - Perform usability testing to ensure that the interface is intuitive and user-friendly. Test navigation flows, accessibility features, and overall satisfaction of end-users. The prototype should provide a polished user experience, with clear feedback and error handling in place.

6. **Demo Testing Preparedness:**
   - A real time demo of your beta prototype will be done in class to demonstrate your implemented unique features, ensure that it is robust and self-contained. The system should function correctly without requiring live updates or fixes during the testing process.


### <a id="head9"></a> Submission Guidelines for Checkpoint #2

> **You must follow the instructions below PRECISELY. Additionally, We will consider only for grading work hosted 
in your default branch (Master or Main branch)**

- All your code for this prototype must be hosted in your cloud instance and application folder of your repository
- The Team Lead will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
   - **Cc:** All team members 
   - **Subject:** CSC648.848.05 Team NN M4 Checkpoint #2 (Beta Prototype) Submission, where NN must be replaced by your team number.
   - **Body:** 
       - The URL pointing to your prototype. Note that this URL should be exactly the same as the one found in your main README file.
   - **Notes:** Please include any additional information that may assist with executing or grading the current task. 
     This could include setup instructions, known issues, or any special considerations we should be aware of during the evaluation.

--- 

## Checkpoint #3: Demo Presentation 

#### <a id="head10"></a> Demo Presentation Guidelines

**Important:**
- The entire team will present in front of the class on May 08, starting at 4:00 PM. Please designate a main speaker 
  (preferably the team lead) and another team member to handle the demo.
- The presentation is graded (3 points) based on all aspects of the application as defined below.
- The web app must run from your cloud server.
- The team will use their own laptop connected to the classroom projector for the presentation. Please ensure that the 
  connectivity between your laptop and the projector is tested and working properly before the presentation.
- Attendance will be taken on that day, and all students are required to stay and watch all demo presentations out of respect for the other teams.
- The instructor will randomly choose the order of the teams for the presentation.
- Public communication is crucial in software development. In the industry, you will frequently give demo presentations.

**Presentation Tips:**
- Test the demo on a neutral laptop.
- Speak clearly and confidently.
- Engage the audience; make the demo fun.


The demo presentation will serve as a live demonstration of your application's unique features, excluding basic 
functionalities like signup and login. The goal is to showcase the distinguishing aspects of your product in a 
real-world scenario, highlighting both functionality and user experience. The following goals will guide the testing process during the demo:

1. **Showcase Unique Features:**
   - **Objective:** Present the unique or special features of your application that set it apart from competitors. 
     These features should be fully operational and demonstrate the core value of your product.
   - **Testing:** Verify that these features work as intended during the live demo, with seamless interaction and no glitches. 
     The focus will be on how these features enhance the user experience and fulfill the specific needs of your target audience.

2. **Real-Time User Interaction:**
   - **Objective:** Demonstrate the usability and intuitiveness of your unique features by simulating real-time user 
    interactions. This includes showing how users navigate through these features, complete tasks, and receive feedback from the system.
   - **Testing:** Assess the fluidity and responsiveness of the application during the demo. Ensure that transitions 
    between different features are smooth and that the application remains stable under typical usage conditions.

3. **Error Handling and Robustness:**
   - **Objective:** Highlight the robustness of your unique features by intentionally testing for edge cases or 
    potential errors during the demo. This will demonstrate how the system handles unexpected inputs or situations 
    without crashing or producing incorrect results.
   - **Testing:** Test for proper error handling and user-friendly error messages. Ensure that the system maintains 
    its integrity and provides clear guidance to users when things go wrong.

4. **Performance Under Load:**
   - **Objective:** Evaluate the performance of your unique features when subjected to multiple simultaneous 
    actions or data-intensive operations. This will showcase the scalability and efficiency of your application in handling real-world usage.
   - **Testing:** Monitor the application's performance metrics during the demo, including response time and 
    resource usage. Ensure that the application remains responsive and functional even under higher loads.

5. **Visual Appeal and User Engagement:**
   - **Objective:** Demonstrate the visual design and overall user engagement of your unique features. 
    The presentation should emphasize how the design contributes to a positive user experience and encourages continued use of the application.
   - **Testing:** Ensure that the visual elements are polished and consistent with the application's branding. 
    Assess how users interact with and respond to the visual design during the demo, focusing on user engagement and satisfaction.

--- 

Best of luck, team! 🛠️ May your documentation be clear and thorough, your beta prototype shines with stability and 
innovation, and your demo WoWs the audience with flawless execution and seamless performance! 🚀📄

---
