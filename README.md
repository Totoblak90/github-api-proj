# github-api-proj
This is a project to see the commit history of every public repository on my github account

## Project Objective

**
The objective of this project is to use the Github API to display the commit history of this reopsitory. While thinking about what else could be added to the project, I decided to make all my public repositories available for users to browse and view the commit history for each repository. Additionally, to make it easier for users, I highlighted the item button that will open the commits for this repository with a different color. I hope you like it!
**

I decided to implement a database because it would allow me to efficiently filter and query commits and repositories.

------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Getting Started

## Dependencies

To run this project, you will need to have the following dependencies installed:

- Node.js v18+ and npm v7.23.0+ LTS (If you don't have it, go to www.nodejs.org, download, and install)
- Angular CLI v15 (If you don't have it, open a terminal and run the following command: `npm install -g @angular/cli`)
- NestJS (If you don't have it, open a terminal and run the following command: `npm install -g @nestjs/cli`)
- Docker

## Installing Docker

To download and install Docker on your system, follow these steps:

### Windows:

1. Go to the official Docker website: https://www.docker.com/products/docker-desktop
2. Click on the "Download Docker Desktop for Windows" button to download the Docker installer for Windows.
3. Once the installer is downloaded, double-click it to run it.
4. Follow the on-screen instructions to complete the installation of Docker. Make sure to select the option to install both Docker Engine and Docker CLI during the installation.

### Mac:

1. Go to the official Docker website: https://www.docker.com/products/docker-desktop
2. Click on the "Download Docker Desktop for Mac" button to download the Docker installer for Mac.
3. Once the installer is downloaded, double-click it to mount the disk image file.
4. Drag the Docker Desktop icon to the Applications folder to install Docker.
5. Open Docker Desktop from the Applications folder.

### Linux:

The specific steps to download and install Docker on Linux vary depending on the Linux distribution you are using. Below are some Docker resources for the most popular Linux distributions:

- Ubuntu: https://docs.docker.com/engine/install/ubuntu/
- Debian: https://docs.docker.com/engine/install/debian/
- CentOS: https://docs.docker.com/engine/install/centos/
- Fedora: https://docs.docker.com/engine/install/fedora/

Once you have completed the installation of Docker, you can test if the installation was successful by running the following command in your terminal: `docker version`

This command will show the version of Docker installed on your system, indicating that Docker is installed correctly.

## Running the Project

**IMPORTANT**:The Github access token expires on Sun, Mar 19 2023.

1. Open a terminal and clone the project with the following command: `git clone https://github.com/Totoblak90/github-api-proj.git`
2. **IMPORTANT**: Paste the `.env` file that was sent on the email inside the server folder at root level **BEFORE** doing the next steps. (The email automatically added some name before the extension name, delete the name of the file and leave only the extension name: ".env")
3. Navigate from the terminal to the server folder, which is located inside the github-api-proj folder.
4. Run the command:  
    -   On mac or linux: `npm run init`;
    -   On windows: `npm run init:windows`
    This command will install all the packages and perform all the necessary actions to run the project. Wait for it to finish.
5. Once finished, run the command `npm run start:dev` to start the server and keep it running!
6. Open another terminal and navigate to the client folder, which is located inside the github-api-proj folder that you cloned.
7. Once inside, run the command `npm run init`, which will install the necessary dependencies and open the web page in your browser.

