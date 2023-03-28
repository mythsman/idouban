export default {
    table: {
        'book_do': '在读',
        'book_wish': '想读',
        'book_collect': '读过',
        'movie_do': '在看',
        'movie_wish': '想看',
        'movie_collect': '看过',
        'game_do': '在玩',
        'game_wish': '想玩',
        'game_collect': '玩过',
        'song_do': '在听',
        'song_wish': '想听',
        'song_collect': '听过',
        'first_page': '首页',
        'prev_page': '上一页',
        'next_page': '下一页',
        'last_page': '末页',
    },
    t(key) {
        return this.table[key]
    }
}