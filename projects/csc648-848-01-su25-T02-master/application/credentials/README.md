

# **Limoney Credentials & Access Guide**

This document provides all required instructions and best practices for securely accessing and managing the Limoney application infrastructure. This will be updated as the project progressing. Guide is for bash/linux.

## Table of Contents

- [Generating SSH-Key](#generating-ssh-key)
- [Access to Cloud Server](#access-to-cloud-server)
  - [PEM File Access (for Team Lead/CTO)](#pem-file-access-for-team-leadcto)
  - [SSH Key Access](#ssh-key-access)
- [SSH Access to Database](#ssh-access-to-database)
- [For Team Lead/Backend Developer/CTO](#for-team-leadbackend-developercto)
- [API Keys and Best Security Practices](#api-keys-and-best-security-practices)
- [Security Guidelines](#security-guidelines)
- [Troubleshooting](#troubleshooting)
---

## **Generating SSH-Key:**

In order to get access to the server/databases, you need to generate a ssh-key first.

1. You must generate your own SSH key pair on your local machine:  
   `ssh-keygen \-t rsa \-b 4096 \-C \<\[KEY-NAME\]\>  `
2. Copy your public key through the following command(if you gave it the default location):  
   `cat \~/.ssh/id\_rsa.pub`

   It should look like any of the following:  
   		“ssh-ed25519… \<User’s Key\>”

   “ssh-rsa..\<User’s Key\>”  
   “ssh-dsa…\<User’s Key\>”  
3. Send your public key to the Team Lead/Backend Developer. (Make sure it ends with a .pub\!)  
4. The Team Lead/Backend Developer will get back to you once they give you access.

---

## **ACCESS TO CLOUD SERVER** 

* EC2 Server Details:  
* Cloud Host: AWS EC2  
* Instance Type: t2.micro  
* Operating System: Ubuntu 22.04 LTS  
* Public DNS/IP: [ec2-3-145-95-194.us-east-2.compute.amazonaws.com](mailto:ubuntu@ec2-18-220-117-143.us-east-2.compute.amazonaws.com)  
* SSH Port: 22  
* User: ubuntu

### PEM FILE ACCESS (for Team Lead/CTO):

#### Important: Pem File Safety:

* Anyone with PEM File access can:  
* View files

* Modify or delete your project

* Install malware or crypto miners

* Lock you out

* Wipe the server or access the database  
* Which is why it is important to do the following:

| DO  | DO NOT  |
| ----- | ----- |
| **Keep the `.pem` file private and secure** |  **Don’t email the `.pem` file without encryption** |
| **Set file permissions before use** |  |
| **Use only when necessary (ex: CTO Access)** |  |

#### How to Connect to Cloud Server via PEM file:

1. Download or receive the .pem file securely (Ex: emily-key.pem)  
2. Move it to a safe local directory like:

\~/Documents/keys/emily-key.pem

3. Change directory to where the emily-key.pem is placed

   `cd /Documents/keys/`

4. If first time entering the server, set the correct permissions with the following command:  
   `chmod 400 emily-key.pem`  
5. Connect to the server:  
   For Windows: `ssh -i “emily-key.pem” ubuntu@ec2-3-145-95-194.us-east-2.compute.amazonaws.com`
   For Linux: `ssh -i emily-key.pem ubuntu@ec2-3-147-195-154.us-east-2.compute.amazonaws.com`

### SSH KEY ACCESS:

####  IMPORTANT Private Key Safety:

*  **Never share your private key.**

*  **Private vs Public Key:**  
   Your **private key** does ***not*** have a `.pub` extension.  
   Only share the file that **ends in `.pub`** (your **public key**).

*  **Don't regenerate a new key if you already have one\!**  
   Generating a new SSH key will break your current server access.  
   \-*Use your existing key to avoid losing access.*

#### How to Access Cloud Server via SSH key: 

1. Prerequisites:  
   * Your SSH key is already configured   
2. Enter the following command into the terminal to access the cloud server:  
   `ssh \-i \~/.ssh/\<KEY-NAME\> ubuntu@ec2-18-220-117-143.us-east-2.compute.amazonaws.com`

### How to Run Server:
1. Prerequisites  
   * Make sure your SSH key is already configured
2. Move to the application file within the server (e.g: cd csc648/application)
3. type in "docker-compose up --build"... wait for everything to deploy 
4. now you can connect to the server using "http://3.145.95.194/"
    - it should result in the website properly showing up 
5. making sure the backend is properly working "http://3.145.95.194:5000/api/test"
    - it should result in : {"message":"Backend is working!","host":"..."}

### To inspect and clean docker:
(all within /application)
inspect: "docker ps" 
clean: "docker-compose down --volumes --remove-orphans"
   

---

## **SSH ACCESS TO DATABASE**



### Important: Database Safety and Security:

* Never disable logging, auditing, or triggers.  
* Encrypt or hash sensitive data before storing it.  
* Never share the password to anyone.

---

## **FOR TEAM LEAD/BACKEND DEVELOPER/CTO**

### Connecting to mysql:
1. go to the server directory (e.g: ubuntu@ip-172-31-1-107:~$)
2. mysql -h db-instance-1.c5au22smk36m.us-east-2.rds.amazonaws.com -u admin -p -P 3306
3. it will prompt for a password, enter "Password_123"
4. Once in SQL,
   -SHOW TABLES IN signupdemo;
   -USE signupdemo;
   -SELECT  * from users;

### Adding SSH-key to Grant Access(for backend/team lead): 1\. Two ways:

- `sudo nano /home/ubuntu/.ssh/authorized\_keys \`- entire cloud server access

2\. Paste in key and add the user…example: 

- \<ssh-ed25519 AAAAC3Nza……. \== \<User’s Key\>  
- Make sure to replace \<User’s Key\> with who it belongs to so we can keep track of who has access

### Dealing with the keys:

- How to view all authorized keys for the cloud server: 

  `cat \~/.ssh/authorized\_keys`


### Maintaining Server Access Logs: 

1. To see all the logs for the cloud server, enter the following command:  
   `sudo cat /var/log/auth.log | grep 'sshd ` 
2. To see all the signout  logs for the cloud server, enter the following command:  
    `sudo cat /var/log/auth.log | grep 'Connection closed by auth'`  
   

---

## **API Keys and Best Security Practices:**

1. Use .env Files to Store Secrets  
   * Store sensitive information like API keys, database passwords, or tokens in a `.env` file, like this:

     API\_KEY=sk-abc123def456

     DB\_PASSWORD=mySecurePass

2. Never hardcode secrets in your actual code.  
3. Keep .env Files Out of Github  
   * Add `.env` to your `.gitignore` so it’s never uploaded  
4. If You Need to Rotate/Change a Key  
   * If a key gets shared accidently,  
     * Go to the service

     * Revoke or delete the old key

     * Generate a new one

     * Update the `.env` file and re-share it securely

---

## **Security Guidelines**

* Access Control  
  * Ensure that only authorized personnel have access to the credentials in this folder.  
  * Regularly review and update access permissions to maintain security.  
* Key Rotation  
  * Follow best practices for rotating SSH keys, API keys, and other sensitive credentials.  
  * Update the documentation in this folder whenever changes are made.  
* Incident Reporting  
  * Report any suspicious activity or potential security breaches immediately.  
  * Follow the company's incident response procedures as outlined in the security policy.

---
## **Troubleshooting**
* Will be updated as users come upon problems with accessing :).
  * Commands are for bash/linux
  * Make sure you are running from the correct path

