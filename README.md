# Nizuri
Discord.js bot

run `npm install` to install all dependencies
create a JSON file named `config.json`, that will contain the token and the prefix for your version of the bot.
```js
{
    "prefix": "prefix",
    "token": "token",
    "errColour": "#ff2424",
    "successColour": "#5cff5f",
    "rapidapiKey": "bing image search through RapidAPI", // Required for image command to work
    "rapidapiHost": "bing image search through RapidAPI" // Required for image command to work
}
```
To compile from TypeScript to javascript, open the root directory and run `tsc -p .` 

If you want it to compile automatically while you edit, run `npm run watch`.

To start the bot run `npm start`. This will use nodemon to automatically restart the bot after changes are detected.

## Currently implemented commands
```,avatar <@user>```

Returns the avatar from the chosen user. If no user is provided, returns your own avatar.
> ![image](https://user-images.githubusercontent.com/61264517/122698822-7ba20680-d21e-11eb-8d89-4756ec6a79e9.png)

<br/>

```,user <@user>```

Returns information about a user, such as account creation date, ID and custom status. If user is in the server you called the command on, will also provide information such as the roles they have and when they joined the server. If no user is profided, returns information about yourself.
**Also works if you provide user IDs**
> Mentioning user     |  Using ID
> :------------------:|:--------------------:
> ![image](https://user-images.githubusercontent.com/61264517/122698711-3b428880-d21e-11eb-9c76-f5e78f546f08.png) | ![image](https://user-images.githubusercontent.com/61264517/122698852-93798a80-d21e-11eb-9a50-5342e451c796.png)

<br/>

```,convert <10m> <ft>```

Converts the given value and its unit to the desired unit. Works to convert from different units.
> System conversion   |  Temperature conversion
> :------------------:|:--------------------:
> ![image](https://user-images.githubusercontent.com/61264517/122831898-edcb2780-d2c0-11eb-8a1e-3dfb56044818.png) | ![image](https://user-images.githubusercontent.com/61264517/122831946-020f2480-d2c1-11eb-847d-e2d3879ac92e.png)

<br/>

```,r <dice amount>d<dice size> [<operation> <number>]```

Rolls the desired amount of die and then performs the appropriate calculations.
> Example Wrong usage   |  Correct usage
> :------------------:|:--------------------:
> ![image](https://user-images.githubusercontent.com/61264517/123117050-cd61b100-d417-11eb-8983-1625518219a5.png) | ![image](https://user-images.githubusercontent.com/61264517/123116623-7065fb00-d417-11eb-94a5-c3270abb8408.png)


<br/>
