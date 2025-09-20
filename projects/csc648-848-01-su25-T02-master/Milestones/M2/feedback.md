# Milestone 2 Docs Revision

## General Feedback

- Overall, this is a solid milestone and shows clear improvement over the previous one. Nice work pushing things forward. That said, the UML Class Diagrams are missing. It looks like there was a misunderstanding about what's expected here. We don’t cover UML class diagrams in this class because they’re covered in other courses like CSC413 (which is a prerequisite). I’ve posted slides on Canvas with all the info you need regarding UML Class Diagrams. 

  Usually, missing an entire section would trigger a “no revision” policy, and a 30% deduction and final grade issued for M2v1. But I’ll make an exception this time (just this once). I know this team has strong potential, and I’d rather support that than penalize you harshly. Just make sure to include the missing section in M2v2.

## Table Of Contents 

- In the PDF version, the links to the sections don’t work. It’s a good idea to include both links and page numbers for better navigation.

## Data Definitions

- As mentioned in class, we’re not looking for detailed attributes at this stage. Keep things exploratory and high-level for now. No attributes yet. You'll include them in your milestone 3


## Initial List of Functional Requirements

This part still needs quite a bit of work:

 - This was flagged in M1 too; entities listed in the data definitions should have a direct tie to specific functional requirements. If something isn’t part of any functionality, it probably shouldn’t be listed as an entity.
 
 - The list itself is too short. I suggest promoting some of your P3 items to P2. For instance: 2.5, 2.8, 4.7, 8.4, and 11.5 are good candidates to move up.

## Mockups/Storyboards

- Go ahead and remove the content on page 13. It’s redundant if the mockups/storyboards are already covered on the following pages.

- The storyboards are looking great! One thing that’s missing is arrows showing the sequence within a specific use case. No need to fix that here, but keep it in mind for M3, your wireframes will need to include those arrows.

## System Design 

- **Database Architecture**: There are some minor issues in the ERD. A few entities you’ve marked as strong are actually weak (e.g., Account, Notifications, LemonAidLogs).

- **Backend Architecture**: UML Class Diagrams are missing.

- **Network and Deployment**:
  
    - Deployment diagram looks solid. The network diagram, on the other hand, needs more work. I’d recommend merging the network and deployment diagrams into one, and doing a deeper dive into the protocols involved. For example: What protocol does your app use to talk to the database? What about the firewall to your cloud instance?
  
    - Also, make sure the user’s local environment shows all relevant device-to-device protocols (e.g., router-to-laptop, router-to-phone, etc.).

## High Level Apis and Main Algorithms

- This section looks good!

## List of Contributions

- **Emily:** It’s clear you care about your team and want everyone to succeed, which is great. But keep in mind that performance-based scores need to reflect actual contributions. The scores you gave some teammates don’t quite align with the feedback I received from others. As team lead, part of your role is to fairly evaluate your team. Those scores inform decisions like bonuses, promotions, or even staffing changes in real-world settings. Try to be more objective in future reports.

## Next Steps

1. Freeze `m2v1.pdf` (no further edits allowed). This serves as a time snapshot to evaluate progress.
2. Create a copy named `m2v2` and revise all feedback provided above.
3. Submit `m2v2` to the same directory once revisions are complete.
4. Begin work on `m3v1`.

> **Note:**  
> `m2v2` is due by the same deadline as `m3v1`, but it should be revised before starting your work on m3v1. The quality and clarity of `m3v1` depend directly on how well you revise `m2v2`.

