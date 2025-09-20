---
description: Credit Score Inquiry
---

# Main Use Case 11

* **Actors:**&#x20;
  * John
  * LemonAid
* **Assumptions:**
  * John has linked his credit tracking service to his _Limóney_ account.
  * John understands the basics of a credit score and knows it will fluctuate over time.
  * John is comfortable sharing just enough personal data with LemonAid to receive his score, and trusts that no full SSN or sensitive PII data is stored.
* **Use Case:**&#x20;
  * John logs into _Limóney_ and clicks the “LemonAid” chat icon. LemonAid greets John and offers a list of quick actions: “Check my current credit score.” ,“Explain what hurts my score.”, “Show me tips on how I can improve my score.” John clicks “Check my current credit score.” LemonAid prompts: “Please confirm the last four digits of your SSN to fetch your score securely.” John enters the digits; LemonAid calls the credit API. LemonAid displays John’s FICO score (ex., 740), the date pulled, and a simple grade tier (Good, Fair, etc.). John asks a follow-up: “What factors pulled me down this month?” LemonAid lists the top 3 factors (ex., “Credit utilization rose to 42%,” “One late payment 30 days past due,” “New hard inquiry”). LemonAid then asks: “Would you like personalized tips to boost your score?” and offers buttons like “Lower utilization,” “Automate payments,” or “Order a sec. trade-line.” John selects “Automate payments,” and LemonAid walks him through setting up auto-pay on his credit cards.Session ends; John closes the chat, feeling informed about his current score and concrete next steps.
*   **Benefits for ...:**

    * Users:
      * Users can instantly see your up-to-date credit score and major contributing factors without navigating a complex dashboard.
      * Users can get targeted, personalized tips that tie directly to your credit report data.
      *   Users are promised to have their privacy preserve&#x64;**.** Only minimal, encrypted data (last four of SSN, account tokens) is used—no full PII is stored or shared.


    *   Company:

        * The company will have users spend more time in _Limóney_ and perceive higher value in the platform’s AI assistance.
        * The company has cross-sell opportunities. When LemonAid suggests paid services (ex., identity monitoring and credit builder loans), conversion rates rise.
        * The company can refine LemonAid’s credit-score recommendations with opt-in anonymized transcripts and expand to new credit products.



    \


    <figure><img src="../.gitbook/assets/image (24).png" alt=""><figcaption></figcaption></figure>
