import Context from "./context";

function concat_data(...data) {
    let result = []
    for (let datum of data) {
        if (datum) {
            result.push(datum)
        }
    }
    return result.join(' / ')
}

function render_star(rate) {
    switch (rate) {
        case 1:
            return '★☆☆☆☆ 很差';
        case 2:
            return '★★☆☆☆ 较差';
        case 3:
            return '★★★☆☆ 还行';
        case 4:
            return '★★★★☆ 推荐';
        case 5:
            return '★★★★★ 力荐';
        default:
            return '';
    }
}

function build_comments(comments, type) {
    switch (type) {
        case 'book':
            return build_book(comments)
        case 'movie':
            return build_movie(comments)
        case 'game':
            return build_game(comments)
        case 'song':
            return build_song(comments)
    }
}

function build_book(comments) {
    let items = []
    for (let comment of comments) {
        items.push({
            img: comment.item.thumbnail,
            link: "https://book.douban.com/subject/" + comment.item.douban_id + "/",
            title: comment.item.title,
            meta: concat_data(comment.item.author, comment.item.translator, comment.item.press, comment.item.producer),
            rating: concat_data(comment.mark_date, comment.label, render_star(comment.rate)),
            comment: comment.comment,
        })
    }
    return items
}

function build_movie(comments) {
    let items = []
    for (let comment of comments) {
        items.push({
            img: comment.item.thumbnail,
            link: "https://movie.douban.com/subject/" + comment.item.douban_id + "/",
            title: comment.item.title,
            meta: concat_data(comment.item.style, comment.item.director, comment.item.writer, comment.item.actor, comment.item.publish_date,),
            rating: concat_data(comment.mark_date, comment.label, render_star(comment.rate)),
            comment: comment.comment,
        })
    }
    return items
}

function build_game(comments) {
    let items = []
    for (let comment of comments) {
        items.push({
            img: comment.item.thumbnail,
            link: "https://www.douban.com/game/" + comment.item.douban_id + "/",
            title: comment.item.title,
            meta: concat_data(comment.item.platform, comment.item.genre, comment.item.developer, comment.item.publisher),
            rating: concat_data(comment.mark_date, comment.label, render_star(comment.rate)),
            comment: comment.comment,
        })
    }
    return items
}

function build_song(comments) {
    let items = []
    for (let comment of comments) {
        items.push({
            img: comment.item.thumbnail,
            link: "https://music.douban.com/subject/" + comment.item.douban_id + "/",
            title: comment.item.title,
            meta: concat_data(comment.item.alias, comment.item.musician, comment.item.album_type, comment.item.genre, comment.item.media, comment.item.publisher, comment.item.publish_date),
            rating: concat_data(comment.mark_date, comment.label, render_star(comment.rate)),
            comment: comment.comment,
        })
    }
    return items
}

export default {
    async request_user() {
        return fetch(`https://mouban.mythsman.com/guest/check_user?id=${Context.options.douban_id}`)
          .then(res => res.json())
          .then(response => {
              if (response.success) {
                  Context.data_user = response.result
              } else {
                  console.error(response.msg)
              }
          })
    },

    async request_item(douban_id, type, action) {
        return fetch(`https://mouban.mythsman.com/guest/user_${type}?id=${douban_id}&action=${action}`)
          .then(res => res.json())
          .then(response => {
              if (response.success) {
                  Context.data_items[action] = build_comments(response.result.comment, type)
              } else {
                  console.error(response.msg)
              }
          })
    }
}