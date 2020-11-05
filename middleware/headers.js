module.exports= (req, res, next) =>{
    res.header('access-control-allow-origin', '*');
    res.header('access-contol-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
}