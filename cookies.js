let setCookie = (req, res) => {
    let id = req.cookies.id || 1;
    res.cookie(`id`, Number(id) + 1);
    req.body.id = id;
    req.body.done = false;
    res.cookie(`todo${id}`, req.body);
    console.log('Cookies: ', req.cookies);
    return id;
}

let getCookie = (req) => {
    let todo = req.cookies[`todo${req.params.id}`];
    console.log('Cookies: ', todo);
    return todo;
};

let updateCookie = (req, res) => {
    let todo = req.cookies[`todo${req.params.id}`];
    if (!todo.done){
        todo.done = !todo.done;
        res.cookie(`todo${req.params.id}`, todo);
    }
}

let delCookie = (req, res) => {
    res.clearCookie(`todo${req.params.id}`);
    // let todo = req.cookies[`todo${req.params.id}`];
    // if (!todo.done){
    //     todo.done = !todo.done;
    //     res.cookie(`todo${req.params.id}`, todo);
    // }
}
module.exports = {
    setCookie: setCookie,
    getCookie: getCookie,
    updateCookie: updateCookie,
    delCookie: delCookie,
};