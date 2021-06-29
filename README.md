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
    "rapidapiHost": "bing image search through RapidAPI", // Required for image command to work
    "currconv": "free currency conversion api key", // Required for exchange command to work. get key at https://free.currencyconverterapi.com/
}
```
To compile from TypeScript to javascript, open the root directory and run `tsc -p .` 

If you want it to compile automatically while you edit, run `npm run watch`.

To start the bot run `npm start`. This will use nodemon to automatically restart the bot after changes are detected.

## Currently implemented commands

### Utility
```,avatar <@user>```

Returns the avatar from the chosen user. If no user is provided, returns your own avatar.
> No argument         |  Pinging user
> :------------------:|:--------------------:
> ![image](https://user-images.githubusercontent.com/61264517/123861750-ee397300-d8fd-11eb-934c-bb2ed3f5278d.png) | ![image](https://user-images.githubusercontent.com/61264517/123861829-ff827f80-d8fd-11eb-8e83-785755dd1a89.png)

<br/>

```,user <@user>```

Returns information about a user, such as account creation date, ID and custom status. If user is in the server you called the command on, will also provide information such as the roles they have and when they joined the server. If no user is profided, returns information about yourself.
**Also works if you provide user IDs**
> Mentioning user     |  Using ID
> :------------------:|:--------------------:
> ![image](https://user-images.githubusercontent.com/61264517/123862022-35276880-d8fe-11eb-8a26-b11931b3dbb6.png) | ![image](https://user-images.githubusercontent.com/61264517/123862047-3ce70d00-d8fe-11eb-88c5-9934f8eaec13.png)

<br/>

```,calc <expression>```

Takes a mathematical expression and returns the answer. You can use "^" or "**" for exponents.
> ![image](https://user-images.githubusercontent.com/61264517/123863501-1033f500-d900-11eb-9fef-13b2b7461311.png)

### Conversion

```,convert <10m> <ft>```

Converts the given value and its unit to the desired unit. Works to convert from different units.
> System conversion   |  Temperature conversion
> :------------------:|:--------------------:
> ![image](https://user-images.githubusercontent.com/61264517/123862237-7c155e00-d8fe-11eb-9488-9b9808c30ccf.png) | ![image](https://user-images.githubusercontent.com/61264517/123862260-820b3f00-d8fe-11eb-83af-c421808f1892.png)

<br/>

```,exchange [<amount>]<from currency> <to currency>```

Performs currency exchange. If no amount is passed, returns the regular value. Currencies do not need to be in uppercase
> With amount         |  Without amount
> :------------------:|:--------------------:
> ![image](https://user-images.githubusercontent.com/61264517/123862512-cbf42500-d8fe-11eb-92cb-d5ca4683253a.png) | ![image](https://user-images.githubusercontent.com/61264517/123862528-d2829c80-d8fe-11eb-94ef-3d5cc563b4c3.png)

### Random

```,r <dice amount>d<dice size> [<operation> <number>]```

Rolls the desired amount of die and then performs the appropriate calculations.
> Example Wrong usage   |  Correct usage
> :------------------:|:--------------------:
> ![image](https://user-images.githubusercontent.com/61264517/123863687-48d3ce80-d900-11eb-94f1-408d54fb5b23.png) | ![image](https://user-images.githubusercontent.com/61264517/123863762-5db06200-d900-11eb-99b5-28f7c1b072bd.png)

<br/>

```,8ball <yes or no question>```

Replies to a yes or no question.
> ![image](https://user-images.githubusercontent.com/61264517/123863141-97cd3400-d8ff-11eb-8cec-d8422467fabb.png)

### Web

```,wiki <query>```

Searches Wikipedia for an article and returns a 3 sentence summary.
> ![image](https://user-images.githubusercontent.com/61264517/123863923-8cc6d380-d900-11eb-984c-ca49149126ee.png)

<br/>

```,image <query>```

Searches for images and returns a reaction meny with the different images.
> ![image](https://user-images.githubusercontent.com/61264517/123864141-c5ff4380-d900-11eb-9d6a-7a0ccca6c6ab.png)

<br/>
