export default function() {
    // 认证
    return $.ajax({
      url: '/api/users/issignin',
      headers: {
        'X-Access-Token': localStorage.getItem('token') || ''
      },
      // dataType: 'json',
      success: (result) => {
        // let { username, isSignin } = result.data
        // this._renderUerTpl({...result.data})
        $("#Zztai").children('p').html(result.data.username)
        $("#Zztai").children('a').html("在线")
        return result
      },
  
      error: (err) => {
        // this._renderUerTpl({isSignin: false})
        return false
      }
    })
  }