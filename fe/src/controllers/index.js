import homeTpl from '../views/home.hbs'
import menuTpl from '../views/menu.html'
import Users from './users'

export const render = (req, res, next) => {
    $('.sidebar-menu').html(menuTpl)

    new Users()
    
    res.render(homeTpl({}))
}