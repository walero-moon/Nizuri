module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`\nLogged in as ${client.user.tag}. Ready!`);
    },
};
