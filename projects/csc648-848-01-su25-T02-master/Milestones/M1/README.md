# 📍 CSC 648-848-05 Milestone 1 (14 points)

This milestone **includes three checkpoints**

## Table of Contents
- **Checkpoint 1:** Brainstorming and List of Technologies
  - [Brainstorm Ideas for Your Project](#head1)
  - [Submitting Your Software Stack for Approval](#head2)
- **Checkpoint 2:** Technical Documentation
  - [Technical Documentation](#head4)
  - [Background Reading](#head5)
  - [Collaborative Approach](#head6)
  - [How Checkpoint #2 Will Be Graded](#head8)
  - [Submission Guidelines](#head9)
  - [Revisions](#head10)
- **Checkpoint 3:** Throwaway Prototype
  - [Cloud Server Configuration and Dependencies ](#head11)
  - [Credentials Folder Configuration in Your Remote Repository](#head12)
  - [Throwaway Prototype](#head13)
  - [Grading Rubrics for Checkpoint #3](#head14)
  - [How Checkpoint #3 Will Be Graded](#head15)
  - [Submission Guidelines](#head16)


The following sections provide detailed descriptions of the tasks required for each checkpoint. All team members are 
expected to read the entire document. The Team Lead is responsible for coordinating and leading the team's efforts 
throughout all checkpoints in this milestone.


## 💡 Checkpoint #1: Brainstorming and List of Technologies

**Objective:** 
- **Brainstorming Ideas:** Generate project ideas, an executive summary, and initial high-level personas and use cases.
- **List Of Technologies** Obtain approval for your tech stack from the class instructor, who will act as your CTO 
  for this milestone.

**Initial Input:** Consider the instructor's guidance and feedback before finalizing your topic decision.


### Brainstorming and List of Technologies

Before diving into the technical details of your project, it's essential to start with a clear and 
focused brainstorming session. This will help your team identify potential project ideas and ensure that the chosen 
technologies align with the project's goals and requirements.

#### <a id="head1"></a> Brainstorm Ideas for Your Project 
   + Teams will collaboratively brainstorm potential project topics, focusing on a high-level discussion. The aim is to 
   establish a solid foundation for evaluating the pros and cons of each idea and ensuring that the chosen tech stack 
   aligns with the concept. In the industry, this process involves discussing various use cases for the product to 
   ensure it fits the primary audience and to provide initial validation of the chosen idea.

   + The instructor will offer guidance and provide feedback on the selected topic. It's essential that this brainstorming 
   session occurs during a team meeting with all members present, ensuring everyone contributes and agrees on 
   the project's direction.

   + You do not need to submit your selected idea to the instructor separately. The motivations for your choice will be 
   detailed in the executive summary section of the technical documentation (explained further below).



#### <a id="head2"></a> Submitting Your Software Stack for Approval

   - Once your team has discussed and validated your project idea through use cases and identified some high-level requirements and specifications, you will be ready to select the list of technologies for the project. This list of technologies **MUST** be approved by the CTO (the instructor will assume this role for Milestone 1).
   
   - While teams have the freedom to choose their own project ideas and tech stack, there are some limitations to consider. The approved technologies for this class are as follows:
     - **Cloud Servers:** AWS, Google Cloud, Microsoft Azure.
       - If you wish to use a different cloud server to host your application, you must first discuss it with the instructor.
       - **Important:** The university, CS department, or instructor are not responsible for any additional charges incurred by your chosen cloud server. Students are responsible for setting up free tier instances for this class and ensuring that the resources installed in the cloud remain within the free tier capacity.
     - **Backend Languages:** Java, JavaScript, TypeScript, Rust, Python, Go, C++, C#, and PHP.
     - **Frontend Languages:** Any language is allowed.
     - **Frameworks:** Any framework is allowed.
     - **APIs:** Only open-source APIs are permitted.
     - **Databases:** Only relational databases are allowed. MySQL and PostgreSQL are recommended for this class. NoSQL databases are not permitted—not because they are inferior, but because other courses cover NoSQL architectures. We want students to gain experience in building projects with both SQL and NoSQL architectures.

   - The **Team Lead** must email the class instructor, cc’ing all team members, with the details of your software stack. It is recommended to choose a tech stack that aligns with the project use cases and where the team's knowledge of these technologies is balanced.

     - The email **must** follow this format:

       - **Receiver:** Class Instructor ([jortizco@sfsu.edu](mailto:jortizco@sfsu.edu))
       - **Subject:** CSC 648-848 Fall 2024 Section 05 Team 09: Tech Stack Approval
       - **N** is your section number; **M** is your team number.
       - **List the Technologies Used in Your Software Stack:**
         - Cloud server host, instance size (CPU and RAM)
         - Operating system and version number
         - Database and version number
           - **Only DBMS SQL (relational) based databases are allowed.**
         - Web server and version number
         - Backend languages, frameworks, and version numbers
         - Frontend languages, frameworks, and version numbers
         - List any other important technologies or packages. (You can exclude things like Git and SSH.) There is no wrong answer here—just list what you can. The more detailed, the better, as it helps the instructor determine how sound your software stack is.
       - **Rate each team member's familiarity with all the listed technologies on a scale of `1–5`, where `1` indicates `no knowledge at all` and `5` indicates `expert level.`**
         - **Example: Balanced Team**
           - Nina Pickles: 5
           - Ivana Drago: 2
           - Lulu Joy: 4
           - Ozzie Bear: 5
           - Clea Bean: 4
           - Tobi Love: 3
           - Howie Bowie: 4
         - **Example: Unbalanced Team**  
           In this case, Lulu Joy and Ozzie Bear will need to spend time teaching the other members the technologies instead of focusing on other important concepts of the course.
           - Nina Pickles: 2
           - Ivana Drago: 1
           - Lulu Joy: 5
           - Ozzie Bear: 2
           - Clea Bean: 2
           - Tobi Love: 1
           - Howie Bowie: 3

     - Below is an example of the email format you should follow. Please note that this example is not your list of technologies; it is provided solely as a format reference.

      ```
      Nina Pickles
      Subject: CSC 648-848 Fall 2024 Section 05 Team 09: Tech Stack Approval
      To: jortizco@sfsu.edu
      Cc: <all the members of the team must be (cc'd) on this email>
      
      Hello CTO,

      We are finalizing the requirements for our project and wanted to get approval for our tech stack:
      
         - Server: AWS EC2
         - Operation System: Ubuntu 22.04
         - Database: MySQL 8.0.37
         - Web Server: Express 4.19.2
         - Backend Language: JavaScript
         - Frontend Language: Javascript
         - Additional Tech:
             - Frontend Framework: React
             - Backend Framework: Node.js
             - IDE: Visual Studio Code, MySQL Workbench
             - SSL Cert: Lets Encrypt (Cert Bot)
             - Docker: Docker Container on the EC2 instance
      
         - Team members ranked from 1 to 5 on familiarity with the chosen Server Side Language:
             - Nina Pickles: 5
             - Ivana Drago: 2
             - Lulu Joy: 4
             - Ozzie Bear: 5
             - Clea Bean: 4
             - Tobi Love: 3
             - Howie Bowie: 4

      Thanks,
      Nina Pickles
      Team Lead
      ```
      
   -  After the instructor approves your software stack, immediately start installing and configuring your server (Checkpoint #2) while working on Checkpoint #1 tasks (technical documentation).

 ---

## 📝 Checkpoint #2 Documentation, Content, and Structure (7 points)

**Objective:** Develop the following:
- **Use Cases and High Level Requirements:** Develop high-level functional requirements based on use cases.
- **Competitive Analysis** Conduct a comprehensive competitive analysis of your potential competitors to identify unique 
    features and better understand your primary audience.
- **Team Collaboration:** Initiate teamwork and coordination.

**Initial Input:** Use instructor guidance, and consult class materials on Use Cases, Requirements, Specs and 
competitive analysis

### <a id="head4"></a> Technical Documentation

In the document for Milestone 1 version 1 (M1v1), you must include **all** the following sections in the exact order listed 
below. Each section of this document should start on a new page within the same PDF file:

1. **Title Page:** MUST include:
   - “SW Engineering CSC648-848-05 Fall 2024”
   - Project/application title and name (use the name chosen for your application)
   - Team number
   - Names of students (Team Lead first) with the Team Lead's email. Mark the roles of Team Lead, Front End Lead, Back End Lead, and GitHub Master.
   - “Milestone 1”
   - Date
   - History table (revisions) (This will be updated based on instructor feedback, so it is important).
       - The history table should follow the following format:

      | Milestone    | Version    | Date                            |
      |--------------|------------|---------------------------------|
      | Milestone 1  | Version 1  | date the milestone was submitted|

      - Once Version 2 of this milestone is created, the history table in your `M1v2.pdf` file 
        should be updated with a new row that includes Version 2 and the date it was last modified.
      - Once the table contains more than one row, it should be sorted in descending order, 
        with the newest milestone listed first.
     

2. **Table of Contents** 

   - The Table of Contents should serve as a navigational guide for your document. 
   - Each entry in the Table of Contents must be a link that directs to the corresponding section within the document. 
   - Additionally, ensure that each entry includes the correct page number where the section can be found. This will 
     allow readers to quickly locate and access the information they need. The format should be clear and organized, 
     providing a seamless experience for anyone reviewing the document.


3. **Executive Summary:** 
   - A short description of the final product/application, highlighting its key advantages, novelty, 
   and value (up to 1 page). This summary should be written as an executive summary, 
   explaining why the project should be funded. Assign a name to your project for easier reference and better "marketing." 
   - The summary should be understandable to a general manager/executive who is not a CS specialist and should serve 
     to explain and promote your project. 
   - The typical outline is: one paragraph on the motivation and importance of the application, followed 
     by a paragraph on what the application will do, how it helps users (high level, no jargon), and what is unique and special in your design.
   

4. **Main Use Cases:** 
   - Summarize the key categories of users/actors for your application, their general characteristics, 
  goals, skills, and pain points related to the application. About 1/3 of a page per actor—refer to class notes. 
 (Note: Stay general in key categories and describe how actors/users will use your app at a high level.)
   - Provide 8-10 main **use cases** (one paragraph for each use case). Refer to class notes for a more detailed format for requirements. Focus on the main use cases.
       - **For each Use Case:** First create it in text format, then describe it using a Use Case diagram. Consider possible 
    situations where the user or your app/actors do not perform actions as expected, and describe a possible solution. 
   (Refer to class slides for details.) 
       - Focus on **what** users do, their skill level, not **how** the software is implemented. Avoid specifics on **how** 
    functions will be done and text resembling a user manual—this is supposed to guide the design of the future product 
    and is **not** a description of how the product will work (you don’t know that yet). Assign a descriptive title to each use case for tracking.
     

5. **List of Main Data Items and Entities:** 
   - Define the main terms, data structures, and "items" or "entities" at a high or logical (not implementation) level 
    (e.g., name, meaning, usage, and **not** how the data is stored in memory) to make them easier to reference in the document. 
   - Focus on key terms (main data elements/records used in your app, types of users and their privileges, etc.). 
    These terms and their names **must be used consistently** in all documents, user interfaces, naming SE components, database elements, etc. 
    In cases where behavior and privileges are attached to data items (e.g., user types), this also drives the software design. You will later expand this section with more implementation details.
   

6. **Initial List of Functional Requirements:** 
   - This refers to the high-level functions and services you plan to develop to the best of your knowledge at this point. 
   - Focus on **what** and not **how**. Keep the user in mind. Develop these functions to be consistent with use cases
   - Group these requirements by the actor or entity that performs the action and number each requirement with a unique numeric value and use these numbers consistently from then on. 
   - Aim for at least 50 functional requirements, but remember that quality is more important than quantity in this class. You will have the opportunity to adjust, add, or remove functional requirements in future milestones.
   

7. **List of Non-Functional Requirements:** 
   - This section should detail non-functional requirements across various categories, including performance, 
     reliability, security, usability, maintainability, portability, scalability, compatibility, compliance, 
     supportability, efficiency, coding standards, and environmental sustainability.
   - These requirements must be followed in your design and development from this point forward. Any changes require prior approval.
   - Non-functional requirements should be customized to meet the specific needs of your project. However, 
     they cannot be altered without the consent of all teams involved, not just the engineering team. 
     For instance, the engineering team would need approval from the marketing team to modify a non-functional requirement related to the product.
   

8. **Competitive Analysis:** 
   - Identify five competitive products and compare their features with those you plan to implement.
   - Start by creating a table, similar to the one in the ‘Competitive Analysis For Software Products’ slides, listing important features of all competitive products that are similar to yours.
   - Next, create a high-level comparison table with key features of the competitors versus your planned features (limit to 5 entries as shown in class). Clearly mark your product in the table, such as by shading its column/data.
   - After the second table, write a brief summary (one paragraph) explaining the planned advantages or competitive edge of your product compared to what is currently available.
   - Your product must include at least three unique features, functionality, or service that other similar products do not have. Additionally, it should improve upon shared functionalities common to all these products.


9. **Checklist:**
   - For each item below, respond with one of the following: **DONE**; **ON TRACK** (indicating it will be completed on time with no issues); or **ISSUE** (indicating a problem, which should be described in 1-3 lines).
     - The team has found a time slot to meet outside of class.
     - GitHub Master has been chosen.
     - The team has collectively decided on and agreed to use the listed software tools and deployment server.
     - The team is ready to use the chosen front-end and back-end frameworks, and those who need to learn are actively working on it.
     - The Team Lead has ensured that all members have read and understand the final M1 before submission.
     - GitHub is organized as discussed in class (e.g., master branch, development branch, folder for milestone documents, etc.).


10. **High-Level System Architecture and Technologies Used:** 
    - Provide a brief, itemized list of all technologies approved by the instructor. 
    - If you plan to add any new technologies to this list, they must be approved by the instructor beforehand.
    

8. **List of Team Contributions:**
    - **Part #1 (Must be completed by team lead Only):**
      - Provide a detailed list of contributions made by each team member for both Checkpoint #2 and Checkpoint #3 of this milestone
      - Assign a contribution score to each member, using a scale from 1 to 10 (1 = no contribution, 10 = maximum contribution). 
        The instructor also tracks each member's contributions. Misrepresenting contributions will not be tolerated. 
        The Team Lead must be honest in evaluating team members. If a discrepancy arises between the Team Lead’s score 
        and the instructor’s observations (e.g., an 8 versus a 2), it will be assumed that the team is covering up for 
        a lack of effort, negatively impacting the overall team grade. While being a Team Lead is rewarding for learning 
        and leadership development, it carries significant responsibility, as the team’s grade depends on the Lead's actions.
    - **Part #2 (Must be completed by all team members):**
      - Every team member, including the Team Lead, must email the CTO ([jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with any feedback or 
        complaints about other team members or the team as a whole. 
      - You can follow the following template for guidance: [Feedback-Complaints Email](#head9). 
          - **Note:** This template is provided as a reference only. Please personalize your feedback based on your 
            unique experiences with your team. Do not copy and paste the content directly; instead, use it as a starting 
            point to craft your own detailed and honest feedback.
      - **Complaints will remain anonymous, known only to the instructor.** If necessary, the instructor may address 
        issues with the Team Lead, but the identities of those who provided feedback will not be disclosed. 
        This process is similar to performance evaluations in software companies, where HR or managers use feedback 
        to make decisions about promotions and team dynamics.
      

      

### <a id="head5"></a> Background Reading

- Class material on high-level vision of our application (use cases, high level requirements, competitive analysis slides).
- Relevant existing applications and products.
- M1 document and documentation on software tools and frameworks you plan to use.
- Git Cheat Sheet posted on Canvas.
- Your notes from lectures.

### <a id="head6"></a> Collaborative Approach

To effectively create and complete the M1 document, I recommend the following collaborative approach:

1. **Assignment of Roles:**
   - The Team Lead assigns a **Technical Writer** to oversee the creation and edition of the document.

2. **Division of Work:**
   - The Technical Writer assigns individual chapters to each team member.
   - It is strongly recommended that all team members collaborate on the **Executive Summary** and **High Level Requirements** components simultaneously. 
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


### <a id="head8"></a> How Grading Works

- **Team Grade:** The grade your team receives for the `M1v1.pdf` document is provisional (we'll refer to it as grade **G**), 
  unless otherwise specified. This grade reflects the overall team performance.

- **Individual Grade:** Your individual grade is determined by two factors: the team grade **G** and your personal 
   contributions. The maximum grade you can achieve for `M1v1.pdf` is **G**. 
  - If you fully contributed to the milestone, you will receive the full **G** grade.
  - If your contributions were less than expected, your grade will be lower than **G**, depending on the extent of your involvement.

- **Final Grade for this Checkpoint:** After your team revises the work in the `M1v2.pdf` document based on our feedback, 
  the grade **G** may be adjusted **upward**. This adjustment will only apply to students who contributed fully to the 
  revisions. Your grade in `M1v2.pdf` will be your **final grade** for this checkpoint.


### <a id="head9"></a> Submission Guidelines (Checkpoint #2)

- **You must follow the instructions below PRECISELY:**

1. ***Submission Required from All Team Members***

> **DO NOT add (Cc'd) your team members in this email** 

- All the team members will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
  - **Subject:** CSC648.848.05 Team 0N Milestone 1 Feedback-Complaints
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
     Subject: CSC648.848.05 Team 09 Milestone 1 Feedback-Complaints

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

- Upload into milestone 1 folder a document named `M1v1.pdf` with all work
- The Team Lead will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
   - **Cc:** All team members and the TA, Cole ([cchiodo@sfsu.edu](mailto:cchiodo@sfsu.edu)).
   - **Subject:** CSC648.848.05 Team 0N M1v1 Submission, where N must be replaced with your team number
   - **Body:**
     - A brief greeting and a sentence explaining the purpose of the email.
     - A link (not the PDF document) to your Milestone 1 folder in your repository, where the document `M1v1.pdf` 
       containing all the technical documentation for this milestone is located.

### <a id="head10"></a> Revisions (Checkpoint #2)

- The instructor or grader will assign a grade and provide detailed feedback on your `M1v1.pdf` document. This feedback 
  will be sent to all team members via email.
  
- After receiving the feedback, the team must **freeze** the `M1v1.pdf` document in the Milestone 1 folder and apply 
  all necessary revisions to a new document named `M1v2.pdf`, which should also be placed in the same folder.


- Whenever a new milestone (V1) is graded, we will also re-grade the `V2` version of the previous milestone to ensure 
  all required revisions were properly made. This process is in place to help you base your new milestones (V1) on 
  the corrected work in `V2` of the previous milestones, preventing the continuation of any mistakes from earlier versions.


--- 

## 🧮 Checkpoint #3: Server Configuration, Credentials, and Throwaway Prototype

**Important:** You cannot begin your work on Checkpoint #3 until your tech stack has been approved. **No Exceptions**

**Objective:** The primary goal is to have student teams select, install, and prepare the IT infrastructure needed for 
the final project in CSC 648.848.05. The following goals must be completed in this checkpoint:

- **Cloud Server Configuration and Dependencies:** Configure and install your tech stack on your cloud server, and ensure all necessary dependencies are installed on your local machines to match the project’s requirements.
- **Credentials Configuration in GitHub:** Set up GitHub to facilitate team-based software development.
- **Throwaway Prototype:** Develop a throwaway prototype—a simple web page with information about team members—using the chosen infrastructure. This page may later be reused in your final product.

**Deadlines:**
- The Throwaway Prototype (TP) must be completed by **September 18 at 11:59 PM**.
- The README file in the `application/credentials/` folder, including all required credentials and tutorials, must be completed by **September 18 at 11:59 PM**.

### <a id="head11"></a> Cloud Server Configuration and Dependencies 

*This section must be completed by the backend team.*

1. **Approved Tech Stack:** Set up a new free tier instance on your cloud server. Install all the required technologies and dependencies from your approved tech stack.

2. **Security Group and Inbound Rules:**
   - Create a new security group to manage your server’s firewall settings.
   - **Database Access:** Open the port for your database (e.g., port 3306 for MySQL) to allow external IPv4 addresses to connect.
   - **Web Server Access:** Open the necessary HTTP/HTTPS ports (e.g., port 80 for HTTP and port 443 for HTTPS) based on your web server configuration.
   - **SSH Access:** Open the SSH port (typically port 22) to enable secure remote access to your server for managing your application and database components.
   - **PEM File:** Create and download the necessary PEM file for secure SSH access to your cloud server. Store this file securely, as it will be required for accessing your server.
   - **Change Permissions for PEM File:** Change the permissions of the PEM file to ensure it is secure and can only be read by you. This step is crucial for security.

     **Example:**
     ```bash
     chmod 400 your-key-file.pem
     ```

     This command sets the permissions so that only the file's owner can read it, which is necessary for SSH access.

3. **Final Step:**
   - **Turn On the Instance:** Start the cloud server instance and ensure it is running.
   - **Deploy a Test Website:** Verify that the server is correctly configured by deploying a simple test website. This confirms that your setup is ready for further development.


### <a id="head12"></a> Credentials Folder Configuration in Your Remote Repository

The credentials folder is located in the `/applications/credentials` directory of your remote repository. 
The main README file **MUST** contain essential tutorials, credentials, and information to allow the CTO or 
other authorized members of the team to securely access various components of the application. 
Follow these instructions carefully to ensure proper access and management of the infrastructure. 
The `GitHub Master`, with assistance from the `Technical Writer`, is responsible for keeping this section up to date.

#### Contents

- **SSH Access to Cloud Server**
  - A guide on securely connecting to the cloud server via SSH.
  - Includes instructions on key management, login procedures, PEM files (if required), and troubleshooting common issues.

- **SSH Access to Database**
  - A tutorial on securely accessing the database server using SSH.
  - Provides details on database credentials, security best practices, and maintaining access logs.

- **API Keys and Secrets Management**
  - Instructions on securely storing, retrieving, and rotating API keys and other sensitive secrets.
  - Includes guidance on using vaults or environment variables for enhanced security.

#### Security Guidelines

- **Access Control**
  - Ensure that only authorized personnel have access to the credentials in this folder.
  - Regularly review and update access permissions to maintain security.

- **Key Rotation**
  - Follow best practices for rotating SSH keys, API keys, and other sensitive credentials.
  - Update the documentation in this folder whenever changes are made.

- **Incident Reporting**
  - Report any suspicious activity or potential security breaches immediately.
  - Follow the company's incident response procedures as outlined in the security policy.


### <a id="head13"></a> Throwaway Prototype

In this prototype, the team will create the About page for their web app. This prototype can be reused in future 
iterations or discarded to create a better version as the team gains more experience with the selected technologies.

The primary goal of this prototype is to test all chosen technologies and ensure that every 
team member can work without conflicts related to missing local dependencies or version control issues. 
By the end of this prototype, all team members should be able to:

1. Commit and push changes to the remote repository from their local machines.
2. Acquire basic knowledge of all the technologies selected by the team.
3. Effectively interact with their assigned responsibilities within the team. Note that 
   the responsibilities of each role will expand as we progress through future milestones.

#### About Page

**Note:** All team members must make measurable contributions to this prototype to receive credit.

The About page should include images of all team members, along with one or two sentences about each member. While the UI/UX is not a focus at this stage and won’t be graded, keep in mind that you may want to reuse this About page in your final project. Doing quality work now can save you valuable time later, allowing you to focus on other important components of the project.

**Recommended Steps for Implementing the About Page:**

1. **Create a Development Branch:**
   - The GitHub Master creates a new branch named `development` in the remote repository.

2. **Create the Template:**
   - The Team Lead or GitHub Master creates a template for the About page using the approved frontend technologies.

3. **Modify the Template:**
   - Each team member pulls the template from the `development` branch into their local machine and modifies it to add their image and description.

4. **Commit and Push Changes:**
   - After making their changes, each team member commits and pushes their modifications to the `development` branch in the remote repository.

5. **Merge to Main Branch:**
   - The Team Lead tests the work pushed by all team members. If everything is satisfactory, the work in the `development` 
     branch will be merged into the `master` or `main` branch. Only the work found in these branches will be graded.
   
6. **Deployment**
   - Once all work in the repository is completed, deploy it to your cloud instance. For this milestone, 
     manual deployment is acceptable. However, in future milestones, teams must use CI/CD pipelines via GitHub Actions 
     to automatically deploy code when specific conditions are met, such as when new code is pushed to a designated 
     branch. This milestone is an excellent opportunity to explore and familiarize yourself with these options in 
     preparation for future requirements.


### <a id="head15"></a> How Checkpoint #3 Will Be Graded

- **Team Grade:** The overall grade for your team is final for this checkpoint. However, the feedback provided by the 
  instructor should be used to improve subsequent prototypes, as each one builds upon the last.

- **Individual Assessment:** If any team member’s contribution to this checkpoint is deemed insufficient, 
  their individual grade may be adjusted accordingly. The grading will reflect the level of participation and the quality of work each team member has provided.

#### Evaluation Steps:

1. **Review of Credentials:** We will review your `/application/credentials/README.md` file in your repository. 
   Using the provided credentials and guidelines, we will SSH into your cloud and database instances to verify access.
   - Note: Your database instance does not need to have tables yet; we are checking for the existence of a created instance.

2. **Prototype Evaluation:** We will click on the URL to your prototype provided in the main `README` file of your 
   repository and grade it according to the rubrics outlined above.

3. **Cloud Server and Dependencies Check:** We will inspect your cloud server configuration and ensure all required 
   dependencies are correctly installed.


### <a id="head16"></a> Submission Guidelines (Checkpoint #3)

**You must follow the instructions below PRECISELY. Additionally, We will consider only for grading work hosted 
in your default branch (Master or Main branch)**

- All your code for this prototype must be hosted in your cloud instance and application folder of your repository
- The Team Lead will email the CTO (instructor: [jortizco@sfsu.edu](mailto:jortizco@sfsu.edu)) with the following details:
   - **Cc:** All team members 
   - **Subject:** CSC648.848.05 Team 0N Checkpoint #3 Submission
   - **Body:**
     **Credentials and Access Information:**

      | **Item**               | **Credentials**                                      |
      |------------------------|------------------------------------------------------|
      | **Website URL**        | [Insert URL]                                         |
      | **SSH URL**            | [Insert SSH URL]                                     |
      | **SSH Username**       | [Insert SSH Username]                                |
      | **SSH Password/Key**   | [Insert SSH Password/Key]                            |
      | **Database URL**       | [Insert Database URL]                                |
      | **Database Username**  | [Insert Database Username]                           |
      | **Database Password**  | [Insert Database Password]                           |

      **Additional Information:**

     | **Notes:**  |
     |-------------|
     | Please include any additional information that may assist with executing or grading the current task. This could include setup instructions, known issues, or any special considerations we should be aware of during the evaluation. |



--- 

**Good luck, everyone!** 🎯 May your code be bug-free, your servers be stable, and your submissions be flawless!

---


 
