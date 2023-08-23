This repo is a starter framework for Jekyll static site builder which has a standard install of Jekyll, an NPM-based command structure, a Gulp-powered content pipeline, and a containerised Docker build environment.  Dependencies are managed through NPM.

You should use this repo if you need any of the following things:
* static website
* dependency management
* prebuilt build environment ready for devops
* configurable content pipeline

This project has been created as I couldn't find a way to ensure I could easily update and maintain multiple static websites.  It may be overkill for a smaller single project but when working and maintaining multiple sites this standardisation is helpful.

In the spirit of community I thought this would be worth sharing for anyone to use, update, fix, or otherwise exploit for any purpose personal, community, or commercial with my only ask being that you attribute its use to me appropriately.  In that spirit please see the [credits section](#credits) which contains appropriate attribution to other people who's information or code has influenced this project.

# Getting Started
Read the following section to understand how to get started with this framework.  It will outline:
1. [Configuration of a development/build environment](#environment-setup)
2. [Basic configuration](#basic-configuration)
3. [How to structure your project](#project-structure)
4. [Developing and building your project](#building-your-project).

## Environment Setup
There are four options for setting up a development environment:
1. [Pre-configured Dev Container](#1-use-provided-dev-container-with-vscode-preferred)
2. [Run project Docker Image](#2-use-the-hosted-docker-hub-image)
2. [Create a container from project Dockerfile](#3-use-provided-dockerfile)
3. [Manually build environment](#4-manually-building-a-dev-environment)

### 1. Use provided Dev Container with VSCode (preferred)
This starter framework comes with a pre-configured devcontainer.  You can read about devcontainers [here](https://code.visualstudio.com/docs/devcontainers/containers).  To use Dev Containers with VSCode a number of pre-requisites must be completed.  Follow [this](https://code.visualstudio.com/docs/devcontainers/tutorial) Microsoft tutorial for guidance.

To run the dev container run the following command in the Command Pallette (Ctrl+Shift+P):

`Dev Containers: Rebuild Container`

The Dev Container system will handle mapping of your project directories and is therefore the most simple option.  You can alter the configuration of the dev container by altering the contents of *.devcontainer/devcontainer.json*.

### 2. Use the hosted Docker Hub Image
If you development process doesn't use Dev Containers and/or you are using automated builds you may need a container image to run in your Dev/CI environment. The Dev Container uses a Docker Hub hosted Image ([thealexwheeler/jssf](https://hub.docker.com/r/thealexwheeler/jssf)) which is directly built from the Dockerfile in the root directory of this project.  You will need to map your project directories appropriately.

Once a container is running, use the following command in the project directory to install the project dependencies:

`bundle install && npm install`

### 3. Use provided Dockerfile
This starter framework includes a Dockerfile (./Dockerfile) which contains the Docker definition for the project Docker Image hosted on Docker Hub. Whenever there is a commit to the Dockerfile an updated version of the image is pushed to Docker Hub.  For this reason **you should use the Docker Hub hosted Docker Image unless you need to customise the build environment**.

The provided Dev Container definition uses the provided Docker Hub Image (that is generated via this Dockerfile) to create a development environment.  Dev Containers manage the mapping of files automatically to your project directory, however, if using the dockerfile directly you'll need to build the image using `Docker Build` and then map the appropriate project directories to this container when using the `Docker Run` command.

Once a container is running, use the following command in the project directory to install the project dependencies:

`npm run setup`

### 4. Manually building a dev environment
To recreate an environment on bare-metal or in your own container or virtual machine you should satisfy the follow dependencies on a Linux (or WSL) environment:
1. git
2. make & build-essential
3. ruby & ruby-dev
4. npm
5. gulp-cli (globally installed)
6. bundler

On a Debian based Linux environment such as Ubuntu use the following commands:

1. `apt-get update`
2. `apt-get install -y git make build-essential ruby ruby-dev npm`
3. `npm install --global gulp-cli`
4. `gem install bundler`
5. `bundle install`
6. `npm install`

Once a container is running, use the following command in the project directory to install the project dependencies:
`npm run setup`

## Basic Configuration

### Scripting
The framework uses NPM to orchestrate all actions.  You can see what the NPM scripts are doing in *package.json* in the project root directory. See the [Content Pipeline](#content-pipeline) section for altering content pipeline scripts.

### Dependencies
Dependencies are managed with NPM with the exception of Jekyll itself and any relevant plugins/themes.  You can add dependencies using `npm install ...` and `bundle install ...` as necessary.  Alternatively, you can manually add records in ./package.json and ./Gemfile respectively in the root folder.

### Content Pipeline
The content pipeline processes static content in the ./_assets folder according to the ./gulpfile.js configuration file.  Gulp has been configured to process styles, javascript, fonts and images and place them in the ./assets folder that Jekyll uses for compilation.  All the heavy lifting is done by Gulp and then Jekyll is only copying those assets into the _site directory.

Rather than manually copying dependencies the Gulp scripts are able to fetch dependencies directly from the ./node_modules directory which means that when a dependency is updated no further work is needed to recompile the project.  You can configure which NPM packages are included by including relevant paths in ./venderincludes.js.  Fonts will be copied to the output directory, sass content is included in the path so that it can be @included in sass files in ./_assets/styles, and javascript files are combined with other content in ./assets/js.

For simplicity and ease of change a series of variables have been initialised in ./gulppaths.js which include appropriate paths/globs which are used in references throughout the Gulp routines in ./gulpfile.js.  This means it is easy to reconfigure the folder structure and/or supported files by each operation without altering ./gulpfile.js directly.

## Project Structure
The directories and configuration files are listed below with their intended purpose.
* _assets - where the fixed assets are placed to be processed by the Gulp asset pipeline independently of Jekyll
* devcontainer/devcontainer.json - where the devcontainer configuration is kept
* gulpfile.js - where the Gulp-based content pipeline logic is contained
* gulppaths.js - where the paths/globs for the content pipeline are defined
* package.json - where the NPM dependencies and NPM scripts are defined
* vendorincludes.js - where NPM dependencies in node_modules are defined to be included in the content pipeline processing

The following directories and files operate in a stock manner as per a standard Jekyll install:
* _data - data files
* _draft - draft posts
* _includes - layout and page components that are reused
* _layouts - theme files
* _posts - blog posts
* _sass - sass partials specific to the project
* _site - the generated output
* assets - the file that jekyll will process and put into the generated output
* config.yml - Jekyll configuration
* Gemfile - Jekyll version and Jekyll plugin dependency management


## Developing and Building Your Project
When developing running `npm run serve` in the main command that is required.  This will complete a full "clean" of the assets folder and the _site folder to ensure all previous content is removed.  It will then run a Jekyll build and the asset pipeline.  It will also open a new browser tab with browser sync where changes can be viewed.  While this task continues to run (exit by using ctrl+c in terminal) any changes made to the project files will result in a recompile of the relevant areas of the project so that the results can be viewed instantly.

The `npm run build` command is used to build the project without serving a copy of the site locally for development.  This is used to compile the project locally or in CI.

In either case, the full website will be compiled in the _site directory ready to be moved to the web server manually or via CI.

The command `npm run clean` will clear all output directories including the jekyll cache.

For other commands see the package.json file in the project root directory where all of the available NPM scripts are defined.  By looking in gulpfile.js in the project root directory you can see what operations are being completed for each script.

# Credits
Anne Tomasevich wrote an article ["Optimizing Jekyll Performance with Gulp"](https://savaslabs.com/blog/optimizing-jekyll-performance-gulp) at Savas Labs.  This article is influenced by an article ["Integrating Gulp into Your Jekyll Workflow"](https://robwise.github.io/blog/jekyll-and-gulp) by Rob Wise.  Both articles have served as inspiration for this framework and I have used some techniques including a variation on the paths.js file Anne used for this project.