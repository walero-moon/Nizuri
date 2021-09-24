#########################
# First stage: Compile. #
#########################
FROM node:16 AS build
WORKDIR /usr/src/Nizuri

# Installing dependencies.
COPY ["package.json", "package-lock.json*", "tsconfig.json*", "./"]
RUN npm install
RUN npm install typescript -g
COPY . .

# Compile
RUN "/usr/src/Nizuri/node_modules/.bin/tsc" -p .

#########################
# Second stage: Run.    #
#########################
FROM node:16 AS deploy
WORKDIR /usr/src/Nizuri

COPY package.json /usr/src/Nizuri
RUN npm install --production
COPY ./ ./

# Copying the compiled directory from the first stage
COPY --from=build /usr/src/Nizuri/dist/ ./

# Environment variables would go here if not set at runtime
# ENV PREFIX=""
# ENV TOKEN=""
# ENV RAPIDKEY=""
# ENV RAPIDHOST=""
# ENV CURRCONV=""

# Exposing ports required for discord.js
EXPOSE 80 443

CMD ["node", "./index.js"]
