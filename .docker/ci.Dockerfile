FROM buildpack-deps:jessie-scm

ENV HOME /angular-seed

WORKDIR ${HOME}
ADD . $HOME

# chrome --
ENV CHROME_BIN /usr/bin/chromium

RUN \
  apt-get update && \
  apt-get install -y xvfb chromium libgconf-2-4
# -- chrome

# node --
ENV NODE 7
ENV PATH $HOME/.yarn/bin:$PATH

RUN \
  curl -sL https://deb.nodesource.com/setup_$NODE.x | bash - && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  apt-get update && \
  apt-get install -y nodejs
# -- node

# java --
ENV LANG C.UTF-8
ENV JAVA_HOME /docker-java-home
ENV JAVA_VERSION 8u131
ENV JAVA_DEBIAN_VERSION 8u131-b11-1~bpo8+1
ENV CA_CERTIFICATES_JAVA_VERSION 20161107~bpo8+1

RUN \
  apt-get update && \
  apt-get install -y bzip2 unzip xz-utils && \
  echo 'deb http://deb.debian.org/debian jessie-backports main' > /etc/apt/sources.list.d/jessie-backports.list && \
  { \
    echo '#!/bin/sh'; \
    echo 'set -e'; \
    echo; \
    echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
  } > /usr/local/bin/docker-java-home && \
  chmod +x /usr/local/bin/docker-java-home && \
  ln -svT "/usr/lib/jvm/java-8-openjdk-$(dpkg --print-architecture)" /docker-java-home && \
  set -ex; \
  apt-get update; \
  apt-get install -y openjdk-8-jdk="$JAVA_DEBIAN_VERSION" ca-certificates-java="$CA_CERTIFICATES_JAVA_VERSION"; \
  [ "$(readlink -f "$JAVA_HOME")" = "$(docker-java-home)" ]; \
  update-alternatives --get-selections | awk -v home="$(readlink -f "$JAVA_HOME")" 'index($3, home) == 1 { $2 = "manual"; print | "update-alternatives --set-selections" }'; \
  update-alternatives --query java | grep -q 'Status: manual' && \
  /var/lib/dpkg/info/ca-certificates-java.postinst configure
# -- java

RUN rm -rf /var/lib/apt/lists/*

RUN yarn

RUN chmod a+x scripts/window.sh
ENTRYPOINT ["/angular-seed/scripts/window.sh"]

EXPOSE 5555
