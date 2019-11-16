export default (req)=>{
    let url = req.url;
    $(`.sidebar-menu a[href="#${url}"]`).parent().addClass('active').siblings().removeClass('active');
}