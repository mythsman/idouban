import Context from './context'

function render_item(data) {

    let item = document.createElement('div')
    item.className = 'idouban-item'

    let picture = document.createElement('div')
    picture.className = 'idouban-picture'

    let img = document.createElement('img')
    img.src = data.img
    img.loading = 'lazy'
    img.referrerPolicy = 'no-referrer'
    picture.append(img)

    let info = document.createElement('div')
    info.className = 'idouban-info'

    let title = document.createElement('div')
    title.className = 'idouban-title'

    let link = document.createElement('a')
    link.href = data.link
    link.target = '_blank'
    link.textContent = data.title
    title.append(link)

    let meta = document.createElement('div')
    meta.className = 'idouban-meta'
    meta.textContent = data.meta

    let rating = document.createElement('div')
    rating.className = 'idouban-rating'
    rating.textContent = data.rating

    let comment = document.createElement('div')
    comment.className = 'idouban-comment'
    comment.textContent = data.comment

    info.append(title, meta, rating, comment)

    item.append(picture, info)
    return item
}


export default {
    page_num: 0,
    page_max: 0,
    page_size: 0,
    data: [],
    action: '',
    switch_action(action) {
        if (action === this.action) {
            return
        }
        this.action = action
        this.data = Context.data_items[action]
        this.page_size = Context.options.page_size
        this.page_max = Math.floor((this.data.length - 1) / this.page_size) + 1
        this.render_list(1)
    },
    render_list(page) {
        this.page_num = page
        document.querySelector('.idouban-page-num').textContent = `${this.page_num} / ${this.page_max}`

        let container = document.querySelector('.idouban-items')
        container.innerHTML = ''
        for (let i = (page - 1) * this.page_size; i < Math.min(page * this.page_size, this.data.length); i++) {
            container.append(render_item(this.data[i], this.action))
        }
    }
}