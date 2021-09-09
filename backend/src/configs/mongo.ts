const config = {
    user: 'test',
    password: 'test',
    host: 'localhost',
    port: 27017,
    database: 'todoDB',
}

const mongoURI = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

export default mongoURI;