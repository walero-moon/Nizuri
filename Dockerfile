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
ENV PREFIX=","
ENV TOKEN="NzAwMzM2NjIzMDM2MDA2NDYw.XphdTg.j7JJVvkOuwsz4Eq7BxwqJercUSM"
ENV RAPIDKEY="b96ecb48e6msh8e7e9fd72f5a851p1c63c7jsn4c6cf0a823dc"
ENV RAPIDHOST="bing-image-search1.p.rapidapi.com"
ENV CURRCONV="fcc75f47af7a071d2bbb"

# Exposing ports required for discord.js
EXPOSE 80 443

CMD ["node", "./index.js"]
