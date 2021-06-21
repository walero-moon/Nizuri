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

## Currently implemented commands
```,avatar <@user>```
Returns the avatar from the chosen user. If no user is provided, returns your own avatar.
> ![image](https://user-images.githubusercontent.com/61264517/122697734-5b714800-d21c-11eb-9c52-95273ebf8b89.png)

```,user <@user>```
Returns information about a user, such as account creation date, ID and custom status. If user is in the server you called the command on, will also provide information such as the roles they have and when they joined the server. If no user is profided, returns information about yourself.
** Also works if you provide user IDs **
> ![image](https://user-images.githubusercontent.com/61264517/122698311-71333d00-d21d-11eb-8d1b-104e026f913a.png)
