import I18n from './i18n';
import Context from './context'
import Render from './render'
import Http from './http'
import './index.css'

const TYPES = ['book', 'movie', 'game', 'song']
const ACTIONS = ['do', 'wish', 'collect']

async function init(opt) {
    Context.options = Object.assign(Context.options, opt)

    if (!Context.options.douban_id) {
        console.error(`douban_id invalid for ${Context.options.type}`)
        return
    }

    if (!TYPES.includes(Context.options.type)) {
        console.error(`type invalid for ${Context.options.type}`)
        return
    }

    Context.node = document.querySelector(Context.options.selector)
    if (!Context.node) {
        console.error("root selector not found")
        return
    }

    await Http.request_user()

    if (!Context.data_user) {
        return
    }

    Context.node.append(build_tabs(Context.options.type))
    Context.node.append(build_items())
    Context.node.append(build_pagination())

    document.querySelectorAll(".idouban-tab")[2].click()
}


function build_tabs(type) {
    let tabs = document.createElement("div")
    tabs.className = "idouban-tabs"

    for (let action of ACTIONS) {
        let action_tab = document.createElement("a")
        action_tab.className = "idouban-tab"
        action_tab.href = "javascript:"
        action_tab.classList.add('idouban-tab-' + action)
        action_tab.onclick = () => tab_click(action_tab, action)
        action_tab.text = I18n.t(type + '_' + action) + `(${Context.data_user[type + '_' + action]})`
        tabs.append(action_tab)
    }

    return tabs
}

function build_items() {
    let items = document.createElement("div")
    items.className = "idouban-items"
    return items
}

function build_pagination() {
    let pagination = document.createElement("div")
    pagination.className = 'idouban-pagination'

    let firstBtn = document.createElement("a")
    firstBtn.classList.add("idouban-button", "idouban-first-page")
    firstBtn.href = "javascript:"
    firstBtn.text = I18n.t("first_page")
    firstBtn.onclick = () => Render.render_list(1)
    pagination.append(firstBtn)

    let prevBtn = document.createElement("a")
    prevBtn.classList.add("idouban-button", "idouban-prev-page")
    prevBtn.href = "javascript:"
    prevBtn.text = I18n.t("prev_page")
    prevBtn.onclick = () => Render.render_list(Math.max(1, Render.page_num - 1))
    pagination.append(prevBtn)

    let num = document.createElement("span")
    num.className = 'idouban-page-num'
    num.innerText = '1 / 1'
    pagination.append(num)

    let nextBtn = document.createElement("a")
    nextBtn.classList.add("idouban-button", "idouban-next-page")
    nextBtn.href = "javascript:"
    nextBtn.text = I18n.t("next_page")
    nextBtn.onclick = () => Render.render_list(Math.min(Render.page_num + 1, Render.page_max))
    pagination.append(nextBtn)

    let lastBtn = document.createElement("a")
    lastBtn.classList.add("idouban-button", "idouban-last-page")
    lastBtn.href = "javascript:"
    lastBtn.text = I18n.t("last_page")
    lastBtn.onclick = () => Render.render_list(Render.page_max)
    pagination.append(lastBtn)

    return pagination;
}


async function tab_click(node, action) {
    for (let childNode of node.parentNode.childNodes) {
        if (childNode.classList.contains('idouban-tab-' + action)) {
            childNode.classList.add('idouban-tab-active');
        } else {
            childNode.classList.remove('idouban-tab-active');
        }
    }

    if (!Context.data_items[action]) {
        await Http.request_item(Context.options.douban_id, Context.options.type, action)
    }
    Render.switch_action(action)
}

window.idouban = {
    items: Context.data_items,
    user: Context.data_user,
    init: init,
}