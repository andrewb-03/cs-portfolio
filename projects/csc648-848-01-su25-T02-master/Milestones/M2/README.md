# 📍 CSC 648-848-05 Milestone 2 

This milestone **includes two checkpoints**:

## Table of Contents
- **Checkpoint 1:** Technical Documentation
  - [Collaborative Approach](#head1)
  - [Technical Documentation](#head2)
  - [Background Reading](#head3)
  - [Grading Rubrics for Checkpoint #1](#head4)
  - [How Checkpoint #1 Will Be Graded](#head5)
  - [Submission Guidelines](#head6)
  - [Revisions](#head7)
- **Checkpoint 2:** Vertical Prototype (VP)
  - [Collaborative Approach](#head8)
  - [VP: Connectivity](#head9)
  - [VP: Algorithms](#head10)
  - [Grading Rubrics for Checkpoint #2](#head11)
  - [Submission Guidelines](#head12)

---

The following sections provide detailed descriptions of the tasks required for each checkpoint. All team members are 
expected to read the entire document. The Team Lead is responsible for coordinating and leading the team's efforts 
throughout all checkpoints in this milestone.

##  ✏️ Checkpoint #1: Technical Documentation

**Objective:** Develop the following components to establish the foundation of your project:

- **Data Definitions:** With a deeper understanding of your entities, provide more detailed information about them.
- **Prioritized High-Level Functional Requirements:** Prioritize your functional requirements into three categories: P1 (Critical), P2 (Important), and P3 (Nice-to-Have).
- **UI Mockups and Storyboards:** Begin designing your UI/UX by creating mockups and storyboards based on your use cases.
- **High-Level System Design:** Draft an initial design for your backend, network, and database components.
- **Actual Risks:** Identify and address the current risks that your application faces at this stage of development.
- **Project Management:** Select and set up a robust team management tool to facilitate collaboration.
- **Team Contributions:** Outline the contributions of each team member for this milestone.


**Initial Input:** The technical documentation from this milestone must have to be reasonably consistent with the 
one created in Milestone 1 (version 2) and instructors or grader feedback, but it can also differ 
from Milestone 1 based on what you discover and develop in your design process in the spirit of iterative SE process and based on the feedback you get. 

### <a id="head1"></a> Collaborative Approach

To effectively create and complete the M2 document, I recommend the following collaborative approach:

1. **Assignment of Roles:**
   - The Team Lead assigns a **Technical Writer** to oversee the creation and edition of the document.

2. **Division of Work:**
   - The Technical Writer assigns individual chapters to each team member.
   - It is strongly recommended that all team members collaborate on prioritizing the high level functional requirements simultaneously. 
     This approach ensures high-quality, synchronized work that will later support the development of solid high-level requirements.

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

In the document for Milestone 2 version 1 (`M2v1.pdf`), you must include **all** the following sections in the exact order listed 
below. Each section of this document should start on a new page within the same PDF file:


1. **Title Page:** MUST include:
   - “SW Engineering CSC648-848-05 Fall 2024”
   - Project/application title and name (use the name chosen for your application)
   - Team number
   - Names of students (Team Lead first) with the Team Lead's email. Mark the roles of Team Lead, Front End Lead, Back End Lead, and GitHub Master.
   - “Milestone 2”
   - Date
   - History table (revisions) (This will be updated based on instructor feedback, so it is important).
       - The history table should follow the following format:

      | Milestone   | Version   | Date                                                 |
      |-------------|-----------|------------------------------------------------------|
      | Milestone 2 | Version 1 | date the milestone was submitted                     |
      | Milestone 1 | Version 2 | Date of the most recent modification of this version |
      | Milestone 1 | Version 1 | date the milestone was submitted                     |

      - Once Version 2 of this milestone is created, the history table in your `M2v2.pdf` file 
        should be updated with a new row that includes Version 2 and the date it was last modified.
      - This history table should be sorted in descending order, with the newest version at the top.
     

2. **Table of Contents** 

   - The Table of Contents should serve as a navigational guide for your document. 
   - Each entry in the Table of Contents must be a link that directs to the corresponding section within the document. 
   - Additionally, ensure that each entry includes the correct page number where the section can be found. This will 
     allow readers to quickly locate and access the information they need. The format should be clear and organized, 
     providing a seamless experience for anyone reviewing the document.
   

3. **Data Definitions:** 

   - Expand and refine the data definitions from Milestone 1 Version 2  
   - Fully define major data items, including all sub-data items and known attributes (e.g., formats, max sizes for images/videos). 
   - Use consistent naming across all documents and software components, including UI text, variables, classes, and database elements. 
   - Focus on unique, critical data items essential to your application, particularly those offering a competitive advantage. 
   - Ensure user privileges, registration info, and key data (raw, metadata, supporting data) are well-defined at this stage.
   


3. **Prioritized High-Level Functional Requirements:** 
   - Expand the functional requirements from Milestone 1 into Milestone 2, providing additional details as necessary. 
     Maintain the same reference numbers used in Milestone 1 (e.g., if a requirement was numbered 3 in Milestone 1, 
     then the more detailed requirements of requirement 3 in Milestone 2 should be labeled as 3.1, 3.2, etc.). 
     Ensure that all features, especially the unique aspects of your product, are thoroughly covered. 
     It is acceptable to add new or remove previous functional requirements from Milestone 1, provided you can justify these changes.
   - Prioritize each requirement/specification using the following scale:
       - **Priority 1 - Critical**
       - **Priority 2 - Important**
       - **Priority 3 - Nice-to-have** (as defined in the class)

   - To establish these priorities, consider the user experience, use cases, and the completeness of your application from 
     usability, marketing, and business perspectives. Additionally, base your decisions on your team’s skills, 
     resources, and schedule. The instructor will review and validate the final priorities. 
     Note that the priorities you set later in Milestone 3 and 4 will reflect your commitment, especially for priority 1 items.
   - For ease of review, please group all requirements by priority first (e.g., list all Priority 1 requirements, 
      followed by Priority 2, and so on). Within each priority section, group the requirements by entities (e.g., users, admin).
   

4. **Mockups/Storyboards:**

   **I recommend assigning this task to the frontend team.** 

   - Create mockups/storyboards for all use cases, limiting to one or two mockups per page for easy readability and feedback.
   - Start with black-and-white wire diagrams focusing on layout and function descriptions in each main GUI area.
   - Organize simple storyboards (mockup sequences) by use cases to test navigation and flow, including a brief use case summary with each storyboard.
   - Mockups should be hand-drawn, avoiding graphics or colors unless necessary to emphasize basic UI concepts. In Milestone 3, these will become wireframes in Figma.
   - "Test" mockups by walking through them as if they were live, ensuring ease of use and alignment with use cases.
   - Consistently use data terms and names from the Data Definitions section.
   - Ensure mockups in the Milestone 2 document are easy to read.
   

5. **High-Level System Design**
   
   **I recommend assigning this task to the backend team.**
   
   This section is divided into several subsections as follows:

   5.1 **High Level Database Architecture**
      - **Initial Database Requirements:** Create the first iteration based on P1 functional and non-functional requirements. Refer to lectures for format guidance.
      - **DBMS Selection:** In 1-2 sentences, define the DBMS (or SQL frameworks) you’ll use and justify why they’re best for this project.
      - **Database Organization:** 
          1. Describe entities, attributes, relationships, and domains at a high level, focused on database organization.
          2. Create an Entity Relationship Diagram (ERD) using a tool like [draw.io](https://www.drawio.com/), focusing on key database functionalities.
      - **Media Storage:** Decide by the end of M2 whether to store images/video/audio in file systems or DB BLOBs. Describe any special data format needs (e.g., video/audio/GPS).
  
   5.2 **Backend Architecture**
      - **Scalability Diagrams:** 
           - Create diagrams using microservices architecture, load balancing and replication components to illustrate the scalability of your system.
           - Focus on solutions for future scalability, beyond what a monolithic architecture can handle. Use [draw.io](https://www.drawio.com/) for diagram creation.

      - **Architecture Summary:**
           - Summarize the key components of your system architecture in plain English, including:
           - Microservices architecture
           - Load balancers
           - Caching strategies
           - Reliability and fault tolerance
           - Containers
           - Data replication and consistency
           - Security considerations
        
     - **UML Class Diagrams:**
           - Create UML Class diagrams to represent your main classes and APIs, showing their interactions.
           - Incorporate relevant design patterns covered in class that align with your system architecture.
           - Justify the design patterns used in your UML diagrams, explaining in a short summary, how they benefit your system’s architecture and design.
           - Be detailed, focusing on the scope and needs of your application.

     - **Consistency:** 
           - Ensure all data terms and names are consistent with the Data Definition Section.
   
   5.3 **High Level Application Network Protocols and Deployment Design**
   
      - **Network and Deployment Diagrams:**
           - Create a high-level diagram that combines both application network and deployment components.
  
      - **Application Networks Diagram:** 
           - Illustrate the logical and physical networks used by your product from host to end-systems.
           - Include protocols for each service, network configuration, security measures, gateways, firewalls, and proxies.

      - **Deployment Diagram:**
           - Show the architecture of the system as the deployment (distribution) of software artifacts or modules to deployment targets.

      - **Integration with External Components:**
           - Base the network and deployment diagram on how your application interacts with internal and external components at runtime.
           - If your application uses external libraries, research their network protocols and deployment architecture, and include them in your diagrams.
  
   
   5.4 **High Level APIs and Main Algorithms**
      - Provide a high-level description of any major APIs you will create, focusing on key features (not basic methods like POST, GET, etc.).
      - Describe any significant non-trivial algorithms or processes (e.g., rating, advanced search, ranking).
      - If you've changed or added any software tools or frameworks, describe them here. Ensure any new tools are approved by the CTO (instructor) in writing by this time.


6. **Key Project Risks**
   - List actual, specific risks in your current work, such as:
      - Skills risks (Do you have the right skills?)
      - Schedule risks (Can you meet deadlines with available resources?)
      - Technical risks (Any technical unknowns?)
      - Teamwork risks (Any team-related issues?)
      - Legal/content risks (Can you legally obtain the content/software you need?)
      - Briefly explain how you will address each risk (2-3 lines each). Focus on resolving risks quickly. 
        Categorize risks as above for effective management.


7. **Project Management**
   - In half a page or less, describe how you managed M2 tasks and plan to manage future tasks. Use [Notion](https://www.notion.so/)
     for task management and invite the instructor to your workspace.



8. **List of Team Contributions:**
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


### <a id="head6"></a> Submission Guidelines (Checkpoint #1)

1. ***Submission Required from All Team Members***

> **DO NOT add (Cc'd) your team members in this email** 
- All the team members will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
  - **Subject:** CSC648.848.05 Team 0N Milestone 2 Feedback-Complaints
  - **Body:**
    - Provide individual feedback or/and complaints for every individual member of your team. Note that you are not 
      allowed to score nor mention detailed contributions in this email. Team lead will already do that in the document. 
      The goal of this email is to learn more about your perspective of every member of the team, or to voice anything that in
      your opinion, is not quite working about this individual
    - Provide feedback or/and complaints for the team as a whole. Talk about the dynamics of the team so far and in your opinion, 
      what could be done to make your team more effective.
    - Follow the template email show below

     ```
     To: jortizco@sfsu.edu  
     Subject: CSC648.848.05 Team 09 Milestone 2 Feedback-Complaints

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

- Upload into milestone 2 folder a document named `M2v1.pdf` with all work
- The Team Lead will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
   - **Cc:** All team members and the TA, Cole ([cchiodo@sfsu.edu](mailto:cchiodo@sfsu.edu)).
   - **Subject:** CSC648.848.05 Team 0N M2v1 Submission, where N must be replaced with your team number
   - **Body:**
     - A brief greeting and a sentence explaining the purpose of the email.
     - A link (not the PDF document) to your Milestone 2 folder in your repository, where the document `M2v1.pdf` 
       containing all the technical documentation for this milestone is located.


### <a id="head7"></a> Revisions (Checkpoint #1)

- The instructor or grader will assign a grade and provide detailed feedback on your `M2v1.pdf` document. This feedback 
  will be sent to all team members via email.
  
- After receiving the feedback, the team must **freeze** the `M2v1.pdf` document in the Milestone 1 folder and apply 
  all necessary revisions to a new document named `M2v2.pdf`, which should also be placed in the same folder.


- Whenever a new milestone (V1) is graded, we will also re-grade the `V2` version of the previous milestone to ensure 
  all required revisions were properly made. This process is in place to help you base your new milestones (V1) on 
  the corrected work in `V2` of the previous milestones, preventing the continuation of any mistakes from earlier versions.


--- 

## 🔧 Checkpoint #2: Vertical Prototype (VP) 

**Objective:** Develop a vertical prototype (VP) as an early starting point for your minimum viable product (MVP).  
This prototype should focus on the following components:

- **Connectivity:** Test the connection between your backend, frontend, and database components. Develop testable features such as:
  - A signup page to insert data into your database.
  - A search bar to retrieve data from your database.
  - Ensure your database aligns with the initial high-level database architecture defined in Checkpoint #1.

- **Algorithms:** Implement a search bar component to test your algorithms for features like rating, advanced search, and ranking defined in checkpoint #1

### <a id="head8"></a> Collaborative Approach

For this assignment, each team member must take responsibility for specific components based on their strengths and expertise. To ensure full coverage of the rubric criteria:

1. **Assign Roles**: Designate roles such as Backend Developer, Frontend Developer, Database Manager, and Algorithm Specialist within the team. Each member should focus on their assigned areas while collaborating closely with others to ensure seamless integration.

2. **Regular Check-Ins**: Schedule regular team meetings to discuss progress, troubleshoot issues, and ensure that all components—frontend, backend, database, and algorithms—are aligning with the project’s overall architecture and grading rubrics.

3. **Peer Reviews**: Implement a peer-review process where team members review each other's work before submission. This will help catch errors, optimize code, and ensure adherence to coding standards, enhancing the overall quality of the project.

4. **Documentation and Integration**: Each member must document their code and ensure it integrates smoothly with the team's work. This documentation should be clear enough for any team member to understand and build upon.


### <a id="head9"></a> VP: Connectivity

In this section, your focus should be on establishing and verifying the communication between the different layers of your system:

1. **Backend-Frontend Connection:**
   - **Objective:** Ensure that your frontend can successfully communicate with your backend APIs. 
   - **Implementation:** Develop a basic frontend component, such as a signup page, that sends user input data (e.g., email, password) to the backend. The backend should receive this data, process it (e.g., validate, encrypt), and store it in the database.
   - **Testing:** Implement basic error handling and feedback on the frontend to confirm that the data submission was successful or to display relevant error messages.

2. **Backend-Database Connection:**
   - **Objective:** Verify that your backend can correctly interact with your database to perform CRUD (Create, Read, Update, Delete) operations.
   - **Implementation:** Create backend endpoints that interact with the database. For instance, develop an API that allows the frontend to submit a query through a search bar, which the backend processes to retrieve matching records from the database.
   - **Testing:** Run tests to ensure that data is being correctly inserted, retrieved, and updated in the database according to the operations initiated from the frontend.

3. **Database Setup:**
   - **Objective:** Your database should be a very early implementation of the high-level architecture you outlined in Checkpoint #1.
   - **Implementation:** Set up your database with the essential tables and relationships needed to support the initial features of the VP, such as user information for signup and searchable content for the search bar.
   - **Testing:** Test the integrity of your database structure and ensure it can handle the operations required by the VP without errors.

### <a id="head10"></a> VP: Algorithms

This section focuses on implementing and testing key algorithms that are critical to your application’s functionality:

1. **Search Functionality:**
   - **Objective:** Implement a basic search algorithm to allow users to query the database through a search bar on the frontend.
   - **Implementation:** 
     - **Simple Search:** Begin with a straightforward search algorithm that matches user input with records in your database (e.g., searching by name, keyword).
     - **Advanced Search:** If applicable, implement an advanced search feature that includes filters or sorts results based on criteria like rating, relevance, or date.
   - **Testing:** Ensure that the search bar returns accurate and relevant results. Test with various inputs, including edge cases (e.g., empty search, non-existent terms).

2. **Rating and Ranking:**
   - **Objective:** Implement algorithms for rating and ranking content within your application.
   - **Implementation:** 
     - **Rating System:** Develop an algorithm that calculates and stores ratings for items (e.g., user reviews, product ratings).
     - **Ranking System:** Create a ranking algorithm that orders search results or content listings based on criteria such as user ratings, popularity, or relevance.
   - **Testing:** Verify that these algorithms work correctly and integrate smoothly with the search functionality. Ensure that results are consistently ranked according to the intended logic.

3. **Optimization:**
   - **Objective:** Begin to consider the efficiency of your algorithms, particularly if they will be used on large datasets or require real-time performance.
   - **Implementation:** Optimize the initial implementations by reducing unnecessary computations and improving the responsiveness of the search and ranking functions.
   - **Testing:** Perform load testing to evaluate how well the algorithms perform under different conditions (e.g., large amounts of data, multiple simultaneous queries).

By thoroughly developing and testing these components, you will create a solid foundation for your MVP and ensure that your system can handle the basic functionalities required for your final product.

     
     
### <a id="head12"></a> Submission Guidelines for Checkpoint #2

> **You must follow the instructions below PRECISELY. Additionally, We will consider only for grading work hosted 
in your default branch (Master or Main branch)**

- All your code for this prototype must be hosted in your cloud instance and application folder of your repository
- The Team Lead will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
   - **Cc:** All team members 
   - **Subject:** CSC648.848.05 Team NN M2 Checkpoint #2 (VP Prototype) Submission, where NN must be replaced by your team number
   - **Body:** 
       - The url pointing to your prototype. Note that this url should be exactly the same as the one found in your 
         main readme file
   - **Notes:** Please include any additional information that may assist with executing or grading the current task. 
    This could include setup instructions, known issues, or any special considerations we should be aware of during the evaluation.


--- 

**Best of luck, team!** 🚀 May your APIs never 404, your algorithms always find the optimal path, and your debug sessions be short and sweet! 🎉

---

