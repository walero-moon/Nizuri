# Nizuri
Discord.js bot

run `npm install` to install all dependencies
create a JSON file named `config.json`, that will contain the token and the prefix for your version of the bot.
```js
{
  "prefix": "<prefix>",
  "token": "<token>"
}
```
To compile from TypeScript to javascript, open the root directory and run `tsc -p .` 

If you want it to compile automatically while you edit, run `npm run watch`.

To start the bot run `npm start`. This will use nodemon to automatically restart the bot after changes are detected.
