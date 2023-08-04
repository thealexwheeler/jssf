FROM ubuntu:lunar

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Configure apt and install packages
RUN apt-get update \
    #
    # Install required packages
    && apt-get install -y \
        git \
        make \
		build-essential \
		ruby \
        ruby-dev \
        npm \
    #
    # Install gulp-cli (globally)
    && npm install --global gulp-cli \
    #
    # Install bundler
    && gem install \
        bundler \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog