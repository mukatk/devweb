const auth = function (to, from, next) {
    const usuariologado = sessionStorage.getItem('usuariologado');
    const routeName = to.fullPath;

    if (usuariologado && routeName == '/Login')
    {
        next('/Dashboard');
        return;
    }

    if (!usuariologado && (routeName != '/Login' && routeName != '/')) {
        next('/Login');
        return;
    }

    next();
}

export default auth